import type { Business, BusinessCategoryId, LatLng, OverpassElement } from '../types/business'
import { buildOverpassQuery, normalizeOverpassElements } from './normalize'
import { fetchNominatimBusinesses } from './nominatim'

export class OverpassError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OverpassError'
  }
}

/** FR sunucusu genelde hızlı; de/kumi sık 406 veya asılı */
const OVERPASS_ENDPOINTS = [
  'https://overpass.openstreetmap.fr/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass-api.de/api/interpreter',
]

const PER_ENDPOINT_MS = 8_000

function withTimeout(signal: AbortSignal | undefined, ms: number): AbortSignal {
  const t =
    typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(ms) : undefined
  if (!signal) return t || new AbortController().signal
  if (!t) return signal
  if (typeof AbortSignal.any === 'function') return AbortSignal.any([signal, t])
  return t
}

async function postQuery(endpoint: string, query: string, signal?: AbortSignal) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: `data=${encodeURIComponent(query)}`,
    signal,
  })
  if (!res.ok) throw new OverpassError(`Overpass HTTP ${res.status}`)
  const text = await res.text()
  if (text.trimStart().startsWith('<')) {
    throw new OverpassError('Overpass HTML hata döndü')
  }
  return JSON.parse(text) as { elements?: OverpassElement[] }
}

async function fetchOverpassElements(
  query: string,
  outerSignal?: AbortSignal,
): Promise<OverpassElement[]> {
  return new Promise((resolve, reject) => {
    let pending = OVERPASS_ENDPOINTS.length
    let lastError: unknown
    let settled = false

    for (const endpoint of OVERPASS_ENDPOINTS) {
      const signal = withTimeout(outerSignal, PER_ENDPOINT_MS)
      postQuery(endpoint, query, signal)
        .then((data) => {
          if (settled) return
          const elements = Array.isArray(data.elements) ? data.elements : []
          if (elements.length === 0) {
            pending -= 1
            if (pending <= 0 && !settled) {
              settled = true
              resolve([])
            }
            return
          }
          settled = true
          resolve(elements)
        })
        .catch((err) => {
          lastError = err
          pending -= 1
          if (pending <= 0 && !settled) {
            settled = true
            reject(
              lastError instanceof Error
                ? lastError
                : new OverpassError('Overpass yanıt vermedi'),
            )
          }
        })
    }
  })
}

export async function fetchNearbyBusinesses(opts: {
  user: LatLng
  radiusKm: number
  category: BusinessCategoryId
  signal?: AbortSignal
}): Promise<Business[]> {
  const query = buildOverpassQuery(
    opts.user.lat,
    opts.user.lng,
    opts.radiusKm * 1000,
    opts.category,
  )

  // Nominatim + Overpass paralel — ilk dolu sonuç kazanır (max ~8 sn)
  const nominatimP = fetchNominatimBusinesses({
    user: opts.user,
    radiusKm: opts.radiusKm,
    category: opts.category,
    signal: opts.signal,
  }).catch(() => [] as Business[])

  const overpassP = fetchOverpassElements(query, opts.signal)
    .then((els) => normalizeOverpassElements(els, opts.user))
    .catch(() => [] as Business[])

  const winner = await new Promise<Business[]>((resolve) => {
    let done = 0
    let resolved = false
    const consider = (items: Business[]) => {
      if (resolved) return
      if (items.length > 0) {
        resolved = true
        resolve(items)
        return
      }
      done += 1
      if (done >= 2) {
        resolved = true
        resolve([])
      }
    }
    nominatimP.then(consider)
    overpassP.then(consider)
  })

  if (opts.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError')
  }

  if (winner.length > 0) return winner

  throw new OverpassError(
    'İşletmeler alınamadı (zaman aşımı veya boş sonuç). Konumu değiştirip tekrar deneyin.',
  )
}
