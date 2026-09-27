import { useEffect, useMemo, useRef, useState } from 'react'
import { BusinessCard } from '../components/BusinessCard'
import { BusinessMap } from '../components/BusinessMap'
import { DetailPanel } from '../components/DetailPanel'
import { FilterPanel } from '../components/FilterPanel'
import { LocationPicker } from '../components/LocationPicker'
import { Pagination } from '../components/Pagination'
import { QuickFilters } from '../components/QuickFilters'
import { StatsBar } from '../components/StatsBar'
import {
  DEFAULT_CATEGORY,
  DEFAULT_RADIUS_KM,
  PAGE_SIZE,
} from '../constants/categories'
import { useBusinesses } from '../hooks/useBusinesses'
import { useGeolocation } from '../hooks/useGeolocation'
import type { Business, FiltersState, LatLng } from '../types/business'
import { computeStats, filterAndSortBusinesses } from '../utils/filters'
import { businessesToCsv, downloadCsv } from '../utils/scoring'

const initialFilters: FiltersState = {
  category: DEFAULT_CATEGORY,
  distanceKm: DEFAULT_RADIUS_KM,
  website: 'missing',
  openNow: 'all',
  sort: 'lead_score',
  query: '',
  hasPhone: false,
}

export function HomePage() {
  const geo = useGeolocation()
  const [filters, setFilters] = useState<FiltersState>(initialFilters)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [focus, setFocus] = useState<LatLng | null>(null)
  const [detail, setDetail] = useState<Business | null>(null)
  const [demoMsg, setDemoMsg] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const lastSearchKey = useRef<string | null>(null)

  const {
    items,
    loading,
    loadingMore,
    error,
    loadedKm,
    search,
    loadMore,
    getNextKm,
    hasSearched,
  } = useBusinesses()

  const nextKm = getNextKm(filters.distanceKm)
  const canLoadMore = nextKm != null

  const filtered = useMemo(
    () => filterAndSortBusinesses(items, filters),
    [items, filters],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageSafe = Math.min(page, totalPages)
  const pageItems = useMemo(() => {
    const start = (pageSafe - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, pageSafe])

  useEffect(() => {
    setPage(1)
  }, [filters, items])

  const stats = useMemo(
    () => computeStats(items, loadedKm ?? filters.distanceKm),
    [items, loadedKm, filters.distanceKm],
  )

  const updateFilters = (partial: Partial<FiltersState>) => {
    setFilters((prev) => ({ ...prev, ...partial }))
  }

  const showOnMap = (b: Business) => {
    setSelectedId(b.id)
    setFocus({ lat: b.lat, lng: b.lng })
    setMobileTab('map')
  }

  const exportCsv = () => {
    const csv = businessesToCsv(filtered)
    downloadCsv(`isletmeler-${Date.now()}.csv`, csv)
  }

  const runSearch = (pos: LatLng) => {
    const key = `${pos.lat.toFixed(4)},${pos.lng.toFixed(4)}:${filters.category}:${filters.distanceKm}`
    lastSearchKey.current = key
    void search(pos, filters.distanceKm, filters.category)
  }

  const handleSearch = () => {
    if (!geo.position) return
    runSearch(geo.position)
  }

  const handlePickLocation = (pos: LatLng, label?: string) => {
    geo.setManualPosition(pos, label)
    setFocus(pos)
    void search(pos, filters.distanceKm, filters.category)
  }

  useEffect(() => {
    if (!geo.position || geo.source !== 'gps') return
    const key = `${geo.position.lat.toFixed(4)},${geo.position.lng.toFixed(4)}`
    if (lastSearchKey.current?.startsWith(key)) return
    if (!hasSearched && !loading) {
      runSearch(geo.position)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo.position, geo.source])

  const locationHint =
    geo.placeLabel ||
    (geo.status === 'loading'
      ? 'GPS alınıyor…'
      : geo.position
        ? `${geo.position.lat.toFixed(4)}, ${geo.position.lng.toFixed(4)}`
        : 'Konum seçilmedi')

  const listPanel = (
    <section className="flex max-h-[70vh] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm lg:max-h-[calc(100vh-200px)]">
      <div className="border-b border-slate-100 px-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-800">
            Lead listesi{' '}
            <span className="font-normal text-slate-400">({filtered.length})</span>
          </h2>
          {(loading || loadingMore) && (
            <span className="text-xs font-medium text-teal-700">Yükleniyor…</span>
          )}
        </div>
        <input
          type="search"
          value={filters.query}
          onChange={(e) => updateFilters({ query: e.target.value })}
          placeholder="İsim, telefon veya adres ara…"
          className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
        />
      </div>

      <div className="flex-1 space-y-2.5 overflow-y-auto p-3 scrollbar-thin">
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-3 text-sm text-rose-700">
            {error}
            <button
              type="button"
              onClick={handleSearch}
              className="mt-2 block font-semibold underline"
            >
              Tekrar dene
            </button>
          </div>
        )}

        {loading && items.length === 0 && (
          <div className="rounded-xl border border-dashed border-teal-200 bg-teal-50/50 px-4 py-10 text-center text-sm text-teal-800">
            İşletmeler aranıyor… (~10 sn)
          </div>
        )}

        {!loading && !error && geo.position && hasSearched && filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
            {items.length > 0 ? (
              <>
                Filtreye uyan yok. Üstteki chip’lerden{' '}
                <button
                  type="button"
                  className="font-semibold text-teal-700 underline"
                  onClick={() =>
                    updateFilters({
                      website: 'all',
                      hasPhone: false,
                      openNow: 'all',
                      query: '',
                    })
                  }
                >
                  Tümü
                </button>{' '}
                deneyin.
              </>
            ) : (
              <>Bu alanda sonuç yok. Konumu değiştirin veya “Daha fazla yükle”.</>
            )}
          </div>
        )}

        {!geo.position && !loading && (
          <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
            Soldan / üstten konum seçin veya haritaya tıklayın.
          </div>
        )}

        {pageItems.map((b) => (
          <BusinessCard
            key={b.id}
            business={b}
            selected={selectedId === b.id}
            onShowOnMap={showOnMap}
            onDetails={(biz) => setDetail(biz)}
          />
        ))}

        {canLoadMore && nextKm && (
          <button
            type="button"
            onClick={() => void loadMore(filters.distanceKm)}
            disabled={loadingMore}
            className="w-full rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-800 hover:bg-teal-100 disabled:opacity-50"
          >
            {loadingMore ? `${nextKm} km…` : `Daha fazla yükle (${nextKm} km)`}
          </button>
        )}
      </div>

      <Pagination
        page={pageSafe}
        totalPages={totalPages}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
        onChange={setPage}
      />
    </section>
  )

  const mapPanel = (
    <section className="h-[360px] lg:h-[calc(100vh-200px)] lg:min-h-[520px]">
      <BusinessMap
        user={geo.position}
        businesses={filtered}
        focus={focus}
        pickMode
        placeLabel={geo.placeLabel}
        onPickLocation={(pos) => handlePickLocation(pos)}
        onSelectBusiness={(id) => {
          setSelectedId(id)
          const b =
            filtered.find((x) => x.id === id) || items.find((x) => x.id === id)
          if (b) setDetail(b)
        }}
      />
    </section>
  )

  return (
    <div className="min-h-full bg-[#f4f6f9]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Lead bulucu
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Websitesiz işletmeleri bul · ara · WhatsApp’la
            </p>
            <p className="mt-1 text-xs font-medium text-slate-600">📍 {locationHint}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSearch}
              disabled={!geo.position || loading}
              className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-40"
            >
              {loading ? 'Aranıyor…' : 'Yeniden ara'}
            </button>
            <button
              type="button"
              onClick={exportCsv}
              disabled={!filtered.length}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              CSV ({filtered.length})
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-4 px-4 py-4 sm:px-6 sm:py-5">
        <StatsBar
          total={stats.total}
          noWebsite={stats.noWebsite}
          withPhone={stats.withPhone}
          withinRadius={stats.withinRadius}
          radiusLabel={`${loadedKm ?? filters.distanceKm} km`}
          onFilterAll={() =>
            updateFilters({ website: 'all', hasPhone: false, openNow: 'all', query: '' })
          }
          onFilterNoWebsite={() =>
            updateFilters({ website: 'missing', sort: 'lead_score' })
          }
          onFilterPhone={() => updateFilters({ hasPhone: true })}
        />

        <QuickFilters
          filters={filters}
          counts={{
            total: stats.total,
            noWebsite: stats.noWebsite,
            withPhone: stats.withPhone,
          }}
          onChange={updateFilters}
        />

        {/* Mobile location + advanced */}
        <div className="space-y-3 lg:hidden">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <LocationPicker
              position={geo.position}
              placeLabel={geo.placeLabel}
              source={geo.source}
              onSelect={handlePickLocation}
              onUseGps={geo.requestLocation}
              gpsLoading={geo.status === 'loading'}
            />
          </div>
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="text-xs font-semibold text-teal-700"
          >
            {showAdvanced ? 'Gelişmiş filtreleri gizle' : 'Gelişmiş filtreler'}
          </button>
          {showAdvanced && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <FilterPanel filters={filters} onChange={updateFilters} compact />
            </div>
          )}
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-200/60 p-1">
            <button
              type="button"
              onClick={() => setMobileTab('list')}
              className={`rounded-lg py-2 text-sm font-semibold ${
                mobileTab === 'list' ? 'bg-white text-slate-900 shadow' : 'text-slate-600'
              }`}
            >
              Liste ({filtered.length})
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('map')}
              className={`rounded-lg py-2 text-sm font-semibold ${
                mobileTab === 'map' ? 'bg-white text-slate-900 shadow' : 'text-slate-600'
              }`}
            >
              Harita
            </button>
          </div>
          {mobileTab === 'list' ? listPanel : mapPanel}
        </div>

        {/* Desktop */}
        <div className="hidden gap-4 lg:grid lg:grid-cols-[270px_minmax(0,1.15fr)_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Konum
              </h2>
              <LocationPicker
                position={geo.position}
                placeLabel={geo.placeLabel}
                source={geo.source}
                onSelect={handlePickLocation}
                onUseGps={geo.requestLocation}
                gpsLoading={geo.status === 'loading'}
              />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Filtreler
              </h2>
              <FilterPanel filters={filters} onChange={updateFilters} />
              <button
                type="button"
                onClick={handleSearch}
                disabled={!geo.position || loading}
                className="mt-4 w-full rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-40"
              >
                {loading ? 'Aranıyor…' : 'Yeniden ara'}
              </button>
            </div>
          </aside>

          {mapPanel}
          {listPanel}
        </div>
      </main>

      {detail && (
        <DetailPanel
          business={detail}
          onClose={() => setDetail(null)}
          onShowOnMap={(b) => {
            showOnMap(b)
            setDetail(null)
          }}
          onCreateWebsite={(b) => {
            setDemoMsg(`Demo: “${b.name}” için web sitesi akışı yakında.`)
            setTimeout(() => setDemoMsg(null), 3500)
          }}
        />
      )}

      {demoMsg && (
        <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
          {demoMsg}
        </div>
      )}
    </div>
  )
}
