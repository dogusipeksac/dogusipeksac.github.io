import { useEffect, useMemo, useState } from 'react'
import { BusinessCard } from '../components/BusinessCard'
import { BusinessMap } from '../components/BusinessMap'
import { DetailPanel } from '../components/DetailPanel'
import { FilterPanel } from '../components/FilterPanel'
import { Pagination } from '../components/Pagination'
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
  website: 'all',
  openNow: 'all',
  sort: 'no_website',
}

export function HomePage() {
  const geo = useGeolocation()
  const [filters, setFilters] = useState<FiltersState>(initialFilters)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [focus, setFocus] = useState<LatLng | null>(null)
  const [detail, setDetail] = useState<Business | null>(null)
  const [demoMsg, setDemoMsg] = useState<string | null>(null)
  const [page, setPage] = useState(1)

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

  const locationLabel =
    geo.status === 'ready'
      ? '📍 Konumunuz bulundu'
      : geo.status === 'loading'
        ? '📍 Konum alınıyor…'
        : '📍 Konum alınamadı'

  const updateFilters = (partial: Partial<FiltersState>) => {
    setFilters((prev) => ({ ...prev, ...partial }))
  }

  const showOnMap = (b: Business) => {
    setSelectedId(b.id)
    setFocus({ lat: b.lat, lng: b.lng })
  }

  const exportCsv = () => {
    const csv = businessesToCsv(filtered)
    downloadCsv(`isletmeler-${Date.now()}.csv`, csv)
  }

  const handleSearch = () => {
    if (!geo.position) return
    void search(geo.position, filters.distanceKm, filters.category)
  }

  // Konum ilk kez gelince otomatik ilk arama (1 km)
  useEffect(() => {
    if (geo.position && !hasSearched && !loading) {
      void search(geo.position, filters.distanceKm, filters.category)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when position becomes ready
  }, [geo.position])

  return (
    <div className="min-h-full bg-[#f4f6f9]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
              OpenStreetMap · Overpass · Leaflet
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Yakınımdaki İşletmeleri Bul
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-500 sm:text-base">
              Web sitesi olmayan işletmeleri keşfet ve yeni müşteriler bul.
            </p>
            <p className="mt-2 text-sm font-medium text-slate-700">{locationLabel}</p>
            {geo.error && (
              <p className="mt-1 text-sm text-amber-700">
                {geo.error}{' '}
                <button
                  type="button"
                  className="font-semibold underline"
                  onClick={geo.requestLocation}
                >
                  Tekrar dene
                </button>
              </p>
            )}
            {loadedKm != null && (
              <p className="mt-1 text-xs text-slate-500">
                Yüklü alan: {loadedKm} km
                {filters.distanceKm > loadedKm
                  ? ` · Hedef: ${filters.distanceKm} km`
                  : ''}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSearch}
              disabled={!geo.position || loading}
              className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? 'Yükleniyor…' : 'Ara / Yükle'}
            </button>
            <button
              type="button"
              onClick={geo.requestLocation}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Konumu yenile
            </button>
            <button
              type="button"
              onClick={exportCsv}
              disabled={!filtered.length}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              CSV olarak dışa aktar
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 sm:py-6">
        <StatsBar
          total={stats.total}
          noWebsite={stats.noWebsite}
          withWebsite={stats.withWebsite}
          withinRadius={stats.withinRadius}
          radiusLabel={`${loadedKm ?? filters.distanceKm} km İçinde`}
        />

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
          <FilterPanel filters={filters} onChange={updateFilters} compact />
          <button
            type="button"
            onClick={handleSearch}
            disabled={!geo.position || loading}
            className="mt-3 w-full rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-40"
          >
            {loading ? 'Yükleniyor…' : 'Ara / Yükle'}
          </button>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[260px_minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-5">
          <aside className="hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:block">
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
              {loading ? 'Yükleniyor…' : 'Ara / Yükle'}
            </button>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Önce 1 km yüklenir; “Daha fazla” ile mesafeyi adım adım genişletirsiniz.
              Liste sayfa sayfa gösterilir.
            </p>
          </aside>

          <section className="h-[360px] lg:h-[calc(100vh-220px)] lg:min-h-[520px]">
            <BusinessMap
              user={geo.position}
              businesses={filtered}
              focus={focus}
              pickMode={geo.status !== 'ready'}
              onPickLocation={geo.setManualPosition}
              onSelectBusiness={(id) => {
                setSelectedId(id)
                const b =
                  filtered.find((x) => x.id === id) || items.find((x) => x.id === id)
                if (b) setDetail(b)
              }}
            />
            {(geo.status === 'denied' ||
              geo.status === 'error' ||
              geo.status === 'idle') && (
              <p className="mt-2 text-center text-xs text-slate-500">
                Haritaya tıklayarak konum seçebilirsiniz.
              </p>
            )}
          </section>

          <section className="flex max-h-[70vh] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm lg:max-h-[calc(100vh-220px)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-800">
                İşletmeler{' '}
                <span className="font-normal text-slate-400">
                  ({filtered.length}
                  {items.length !== filtered.length ? ` / ${items.length}` : ''})
                </span>
              </h2>
              {(loading || loadingMore) && (
                <span className="text-xs font-medium text-teal-700">Yükleniyor…</span>
              )}
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-3 scrollbar-thin">
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
                  1 km içindeki işletmeler yükleniyor…
                </div>
              )}

              {!loading && !error && geo.position && hasSearched && filtered.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
                  {items.length > 0 ? (
                    <>
                      {items.length} işletme geldi ama filtreler hepsini gizliyor.
                      <br />
                      Web sitesi / açık-kapalı filtresini “Tümü” yapın.
                    </>
                  ) : (
                    <>
                      Bu alanda işletme bulunamadı. Mesafeyi artırıp “Daha fazla yükle”
                      veya kategoriyi değiştirin.
                    </>
                  )}
                </div>
              )}

              {!geo.position && !loading && (
                <div className="rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
                  Konum alınana kadar liste boş. İzin verin veya haritadan seçin.
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
                  {loadingMore
                    ? `${nextKm} km yükleniyor…`
                    : `Daha fazla yükle (${nextKm} km)`}
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
            setDemoMsg(
              `Demo: “${b.name}” için web sitesi oluşturma akışı yakında. (AI yok)`,
            )
            setTimeout(() => setDemoMsg(null), 4000)
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
