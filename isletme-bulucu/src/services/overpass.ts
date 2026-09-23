import { OVERPASS_ENDPOINTS } from '../constants/categories'
import type { Business, BusinessCategoryId, LatLng, OverpassElement } from '../types/business'
import { buildOverpassQuery, normalizeOverpassElements } from './normalize'

export class OverpassError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OverpassError'
  }
}

async function postQuery(endpoint: string, query: string, signal?: AbortSignal) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: `data=${encodeURIComponent(query)}`,
    signal,
  })
  if (!res.ok) {
    throw new OverpassError(`Overpass HTTP ${res.status}`)
  }
  return res.json() as Promise<{ elements?: OverpassElement[] }>
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

  let lastError: unknown
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const data = await postQuery(endpoint, query, opts.signal)
      const elements = Array.isArray(data.elements) ? data.elements : []
      return normalizeOverpassElements(elements, opts.user)
    } catch (err) {
      if (opts.signal?.aborted) throw err
      lastError = err
    }
  }

  throw new OverpassError(
    lastError instanceof Error
      ? `İşletmeler alınamadı: ${lastError.message}`
      : 'İşletmeler alınamadı. Lütfen tekrar deneyin.',
  )
}
