import { useEffect, useRef, useState } from 'react'
import type { LatLng } from '../types/business'
import { searchPlaces, type PlaceHit } from '../services/nominatim'

export const CITY_PRESETS: { label: string; lat: number; lng: number }[] = [
  { label: 'İstanbul · Kadıköy', lat: 40.9901, lng: 29.0292 },
  { label: 'İstanbul · Beşiktaş', lat: 41.0422, lng: 29.0067 },
  { label: 'İstanbul · Fatih', lat: 41.0186, lng: 28.9647 },
  { label: 'Ankara · Çankaya', lat: 39.9208, lng: 32.8541 },
  { label: 'İzmir · Konak', lat: 38.4192, lng: 27.1287 },
  { label: 'Bursa', lat: 40.1885, lng: 29.061 },
  { label: 'Antalya', lat: 36.8969, lng: 30.7133 },
]

interface LocationPickerProps {
  position: LatLng | null
  placeLabel: string | null
  source: 'gps' | 'manual' | null
  onSelect: (pos: LatLng, label: string) => void
  onUseGps: () => void
  gpsLoading?: boolean
}

export function LocationPicker({
  position,
  placeLabel,
  source,
  onSelect,
  onUseGps,
  gpsLoading,
}: LocationPickerProps) {
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState<PlaceHit[]>([])
  const [searching, setSearching] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    const q = query.trim()
    if (q.length < 2) {
      setHits([])
      setSearching(false)
      return
    }

    debounceRef.current = setTimeout(() => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller
      setSearching(true)
      setErr(null)
      searchPlaces(q, controller.signal)
        .then((rows) => {
          if (!controller.signal.aborted) {
            setHits(rows)
            setSearching(false)
          }
        })
        .catch(() => {
          if (!controller.signal.aborted) {
            setHits([])
            setSearching(false)
            setErr('Adres aranamadı')
          }
        })
    }, 400)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      abortRef.current?.abort()
    }
  }, [query])

  const pick = (hit: PlaceHit) => {
    onSelect({ lat: hit.lat, lng: hit.lng }, hit.label)
    setQuery('')
    setHits([])
  }

  const coordsLabel =
    position != null
      ? `${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`
      : null

  return (
    <div className="space-y-3">
      <div>
        <p className="mb-1.5 text-sm font-medium text-slate-600">Arama konumu</p>
        <p className="mb-2 text-xs leading-relaxed text-slate-400">
          Adres yazın, şehir seçin veya haritaya tıklayın — GPS şart değil.
        </p>

        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Örn: Kadıköy, Ankara Çankaya, İstiklal Cd…"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            autoComplete="off"
          />
          {searching && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-teal-600">
              …
            </span>
          )}
          {hits.length > 0 && (
            <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
              {hits.map((h) => (
                <li key={`${h.lat}-${h.lng}-${h.displayName}`}>
                  <button
                    type="button"
                    onClick={() => pick(h)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-teal-50"
                  >
                    <span className="font-medium text-slate-800">{h.label}</span>
                    <span className="mt-0.5 block truncate text-xs text-slate-500">
                      {h.displayName}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {err && <p className="mt-1 text-xs text-rose-600">{err}</p>}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {CITY_PRESETS.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => onSelect({ lat: c.lat, lng: c.lng }, c.label)}
            className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onUseGps}
          disabled={gpsLoading}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {gpsLoading ? 'GPS…' : 'GPS konumum'}
        </button>
        {(placeLabel || coordsLabel) && (
          <p className="min-w-0 flex-1 truncate text-xs text-slate-600">
            {source === 'gps' ? 'GPS · ' : 'Seçili · '}
            <span className="font-medium text-slate-800">
              {placeLabel || coordsLabel}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
