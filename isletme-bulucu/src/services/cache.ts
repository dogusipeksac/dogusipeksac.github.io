import type { Business, BusinessCategoryId, DistanceKm, LatLng } from '../types/business'

const TTL_MS = 15 * 60 * 1000
const PREFIX = 'isletme-cache:v1:'

interface CacheEntry {
  savedAt: number
  items: Business[]
}

function roundCoord(n: number): string {
  // ~110 m precision — daha fazla cache isabeti
  return n.toFixed(3)
}

export function businessCacheKey(
  user: LatLng,
  radiusKm: DistanceKm,
  category: BusinessCategoryId,
): string {
  return `${PREFIX}${roundCoord(user.lat)},${roundCoord(user.lng)}:${radiusKm}:${category}`
}

export function readBusinessCache(key: string): Business[] | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    if (!entry?.savedAt || !Array.isArray(entry.items)) return null
    if (Date.now() - entry.savedAt > TTL_MS) {
      localStorage.removeItem(key)
      return null
    }
    return entry.items
  } catch {
    return null
  }
}

export function writeBusinessCache(key: string, items: Business[]) {
  try {
    const entry: CacheEntry = { savedAt: Date.now(), items }
    localStorage.setItem(key, JSON.stringify(entry))
  } catch {
    // quota / private mode — ignore
  }
}
