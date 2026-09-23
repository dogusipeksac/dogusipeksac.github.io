import { useEffect, useRef, useState } from 'react'
import type { Business, BusinessCategoryId, DistanceKm, LatLng } from '../types/business'
import { fetchNearbyBusinesses, OverpassError } from '../services/overpass'

interface UseBusinessesOptions {
  user: LatLng | null
  radiusKm: DistanceKm
  category: BusinessCategoryId
  enabled: boolean
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

      setLoading(true)
      setError(null)

      fetchNearbyBusinesses({
        user,
        radiusKm,
        category,
        signal: controller.signal,
      })
        .then((data) => {
          if (!controller.signal.aborted) {
            setItems(data)
            setLoading(false)
          }
        })
        .catch((err: unknown) => {
          if (controller.signal.aborted) return
          setItems([])
          setLoading(false)
          setError(
            err instanceof OverpassError
              ? err.message
              : 'İşletmeler yüklenirken bir hata oluştu.',
          )
        })
    }, 350)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      abortRef.current?.abort()
    }
  }, [user?.lat, user?.lng, radiusKm, category, enabled])

  return { items, loading, error, setItems }
}
