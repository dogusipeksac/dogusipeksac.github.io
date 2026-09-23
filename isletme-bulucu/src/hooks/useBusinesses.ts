import { useCallback, useRef, useState } from 'react'
import { RADIUS_STEPS } from '../constants/categories'
import type { Business, BusinessCategoryId, DistanceKm, LatLng } from '../types/business'
import {
  businessCacheKey,
  readBusinessCache,
  writeBusinessCache,
} from '../services/cache'
import { fetchNearbyBusinesses, OverpassError } from '../services/overpass'

function mergeById(primary: Business[], extra: Business[]): Business[] {
  const map = new Map<string, Business>()
  for (const b of primary) map.set(b.id, b)
  for (const b of extra) map.set(b.id, b)
  return Array.from(map.values())
}

function nextRadius(current: DistanceKm, target: DistanceKm): DistanceKm | null {
  const curIdx = RADIUS_STEPS.indexOf(current)
  const tgtIdx = RADIUS_STEPS.indexOf(target)
  if (curIdx < 0 || tgtIdx < 0) return null
  if (curIdx >= tgtIdx) return null
  return RADIUS_STEPS[curIdx + 1] ?? null
}

export function useBusinesses() {
  const [items, setItems] = useState<Business[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadedKm, setLoadedKm] = useState<DistanceKm | null>(null)
  const [activeCategory, setActiveCategory] = useState<BusinessCategoryId>('salon')
  const [lastUser, setLastUser] = useState<LatLng | null>(null)

  const abortRef = useRef<AbortController | null>(null)

  const search = useCallback(
    async (user: LatLng, _radiusKm: DistanceKm, category: BusinessCategoryId) => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      setActiveCategory(category)
      setLastUser(user)
      setError(null)

      const firstKm: DistanceKm = 1
      const cacheKey = businessCacheKey(user, firstKm, category)
      const cached = readBusinessCache(cacheKey)

      if (cached && cached.length > 0) {
        setItems(cached)
        setLoadedKm(firstKm)
        setLoading(false)
        return
      }

      setLoading(true)
      setItems([])
      setLoadedKm(null)

      try {
        const near = await fetchNearbyBusinesses({
          user,
          radiusKm: firstKm,
          category,
          signal: controller.signal,
        })
        if (controller.signal.aborted) return
        setItems(near)
        setLoadedKm(firstKm)
        writeBusinessCache(cacheKey, near)
        setLoading(false)
      } catch (err: unknown) {
        if (controller.signal.aborted) return
        setLoading(false)
        setItems([])
        setLoadedKm(null)
        setError(
          err instanceof OverpassError
            ? err.message
            : 'İşletmeler yüklenirken bir hata oluştu.',
        )
      }
    },
    [],
  )

  const loadMore = useCallback(
    async (targetKm: DistanceKm) => {
      if (!lastUser || loadedKm == null || loading || loadingMore) return
      const step = nextRadius(loadedKm, targetKm)
      if (!step) return

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      const cacheKey = businessCacheKey(lastUser, step, activeCategory)
      const cached = readBusinessCache(cacheKey)
      if (cached && cached.length > 0) {
        setItems((prev) => mergeById(prev, cached))
        setLoadedKm(step)
        return
      }

      setLoadingMore(true)
      setError(null)

      try {
        const extra = await fetchNearbyBusinesses({
          user: lastUser,
          radiusKm: step,
          category: activeCategory,
          signal: controller.signal,
        })
        if (controller.signal.aborted) return
        setItems((prev) => {
          const merged = mergeById(prev, extra)
          writeBusinessCache(cacheKey, merged)
          return merged
        })
        setLoadedKm(step)
        setLoadingMore(false)
      } catch (err: unknown) {
        if (controller.signal.aborted) return
        setLoadingMore(false)
        setError(
          err instanceof OverpassError
            ? err.message
            : 'Daha fazla işletme yüklenemedi.',
        )
      }
    },
    [lastUser, loadedKm, activeCategory, loading, loadingMore],
  )

  const getNextKm = useCallback(
    (targetKm: DistanceKm): DistanceKm | null => {
      if (loadedKm == null) return null
      return nextRadius(loadedKm, targetKm)
    },
    [loadedKm],
  )

  return {
    items,
    loading,
    loadingMore,
    error,
    loadedKm,
    search,
    loadMore,
    getNextKm,
    hasSearched: loadedKm != null || loading,
  }
}
