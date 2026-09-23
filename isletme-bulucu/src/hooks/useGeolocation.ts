import { useCallback, useEffect, useState } from 'react'
import type { LatLng } from '../types/business'

export type GeoStatus = 'idle' | 'loading' | 'ready' | 'denied' | 'error'

interface UseGeolocationResult {
  status: GeoStatus
  position: LatLng | null
  error: string | null
  requestLocation: () => void
  setManualPosition: (pos: LatLng) => void
}

export function useGeolocation(): UseGeolocationResult {
  const [status, setStatus] = useState<GeoStatus>('idle')
  const [position, setPosition] = useState<LatLng | null>(null)
  const [error, setError] = useState<string | null>(null)

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('error')
      setError('Tarayıcınız konum servisini desteklemiyor. Haritadan konum seçin.')
      return
    }

    setStatus('loading')
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setStatus('ready')
      },
      (err) => {
        const denied = err.code === err.PERMISSION_DENIED
        setStatus(denied ? 'denied' : 'error')
        setError(
          denied
            ? 'Konum izni reddedildi. Haritaya tıklayarak konum seçebilirsiniz.'
            : 'Konum alınamadı. Haritaya tıklayarak konum seçebilirsiniz.',
        )
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60_000 },
    )
  }, [])

  const setManualPosition = useCallback((pos: LatLng) => {
    setPosition(pos)
    setStatus('ready')
    setError(null)
  }, [])

  useEffect(() => {
    requestLocation()
  }, [requestLocation])

  return { status, position, error, requestLocation, setManualPosition }
}
