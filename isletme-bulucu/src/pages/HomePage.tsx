import { useMemo, useState } from 'react'
import { BusinessCard } from '../components/BusinessCard'
import { BusinessMap } from '../components/BusinessMap'
import { DetailPanel } from '../components/DetailPanel'
import { FilterPanel } from '../components/FilterPanel'
import { StatsBar } from '../components/StatsBar'
import { DEFAULT_CATEGORY, DEFAULT_RADIUS_KM } from '../constants/categories'
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
  sort: 'no_website',
}

export function HomePage() {
  const geo = useGeolocation()
  const [filters, setFilters] = useState<FiltersState>(initialFilters)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [focus, setFocus] = useState<LatLng | null>(null)
  const [detail, setDetail] = useState<Business | null>(null)
  const [demoMsg, setDemoMsg] = useState<string | null>(null)

  const { items, loading, error } = useBusinesses({
    user: geo.position,
    radiusKm: filters.distanceKm,
    category: filters.category,
    enabled: Boolean(geo.position),
  })

  const filtered = useMemo(
    () => filterAndSortBusinesses(items, filters),
    [items, filters],
  )

  const stats = useMemo(() => computeStats(items, filters.distanceKm), [items, filters.distanceKm])

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
          </div>
          <div className="flex flex-wrap gap-2">
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
          radiusLabel={`${filters.distanceKm} km İçinde`}
        />

        {/* Mobile filters */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
          <FilterPanel filters={filters} onChange={updateFilters} compact />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[260px_minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-5">
          {/* Desktop filters */}
          <aside className="hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:block">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Filtreler
            </h2>
            <FilterPanel filters={filters} onChange={updateFilters} />
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Veriler OpenStreetMap üzerinden gelir. Eksik telefon veya website alanları
              tahmin edilmez.
            </p>
          </aside>

          {/* Map */}
          <section className="h-[360px] lg:h-[calc(100vh-220px)] lg:min-h-[520px]">
            <BusinessMap
              user={geo.position}
              businesses={filtered}
              focus={focus}
              pickMode={geo.status !== 'ready'}
              onPickLocation={geo.setManualPosition}
              onSelectBusiness={(id) => {
                setSelectedId(id)
                const b = filtered.find((x) => x.id === id) || items.find((x) => x.id === id)
                if (b) setDetail(b)
              }}
            />
            {(geo.status === 'denied' || geo.status === 'error' || geo.status === 'idle') && (
              <p className="mt-2 text-center text-xs text-slate-500">
                Haritaya tıklayarak konum seçebilirsiniz.
              </p>
            )}
          </section>

          {/* List */}
          <section className="flex max-h-[70vh] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm lg:max-h-[calc(100vh-220px)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-800">
                İşletmeler{' '}
                <span className="font-normal text-slate-400">({filtered.length})</span>
              </h2>
              {loading && (
                <span className="text-xs font-medium text-teal-700">Yükleniyor…</span>
              )}
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-3 scrollbar-thin">
              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

              {!loading && !error && geo.position && filtered.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
                  Bu filtrelerle işletme bulunamadı. Mesafeyi artırın veya kategoriyi
                  değiştirin.
                </div>
              )}

              {!geo.position && !loading && (
                <div className="rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
                  Konum alınana kadar liste boş. İzin verin veya haritadan seçin.
                </div>
              )}

              {filtered.map((b) => (
                <BusinessCard
                  key={b.id}
                  business={b}
                  selected={selectedId === b.id}
                  onShowOnMap={showOnMap}
                  onDetails={(biz) => setDetail(biz)}
                />
              ))}
            </div>
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
