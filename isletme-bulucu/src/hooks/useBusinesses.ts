import { useEffect, useRef, useState } from 'react'
import type { Business, BusinessCategoryId, DistanceKm, LatLng } from '../types/business'
import {
  businessCacheKey,
  readBusinessCache,
  writeBusinessCache,
} from '../services/cache'
import { fetchNearbyBusinesses, OverpassError } from '../services/overpass'

interface UseBusinessesOptions {
  user: LatLng | null
  radiusKm: DistanceKm
  category: BusinessCategoryId
  enabled: boolean
}

function mergeById(primary: Business[], extra: Business[]): Business[] {
  const map = new Map<string, Business>()
  for (const b of primary) map.set(b.id, b)
  for (const b of extra) map.set(b.id, b)
  return Array.from(map.values())
}

export function useBusinesses({ user, radiusKm, category, enabled }: UseBusinessesOptions) {
  const [items, setItems] = useState<Business[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!enabled || !user) return

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      const cacheKey = businessCacheKey(user, radiusKm, category)
      const cached = readBusinessCache(cacheKey)
      if (cached) {
        setItems(cached)
        setLoading(false)
        setError(null)
        return
      }

      setLoading(true)
      setError(null)
      setItems([])

      const run = async () => {
        let near: Business[] = []
        try {
          // 1) Hızlı ilk sonuç: 1 km
          near = await fetchNearbyBusinesses({
            user,
            radiusKm: 1,
            category,
            signal: controller.signal,
          })
          if (controller.signal.aborted) return
          setItems(near)
          setLoading(false)

          // 2) Tam yarıçap (1 km ise bitti)
          if (radiusKm <= 1) {
            writeBusinessCache(cacheKey, near)
            return
          }

          const full = await fetchNearbyBusinesses({
            user,
            radiusKm,
            category,
            signal: controller.signal,
          })
          if (controller.signal.aborted) return
          const merged = mergeById(near, full)
          setItems(merged)
          writeBusinessCache(cacheKey, merged)
        } catch (err: unknown) {
          if (controller.signal.aborted) return
          setLoading(false)
          if (near.length) {
            // Yakın sonuçlar kalsın; tam yarıçap başarısız olduysa sessizce devam
            writeBusinessCache(
              businessCacheKey(user, 1, category),
              near,
            )
            return
          }
          setItems([])
          setError(
            err instanceof OverpassError
              ? err.message
              : 'İşletmeler yüklenirken bir hata oluştu.',
          )
        }
      }

      void run()
    }, 350)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      abortRef.current?.abort()
    }
  }, [user?.lat, user?.lng, radiusKm, category, enabled])

  return { items, loading, error, setItems }
}
