import { useCallback, useEffect, useState } from 'react'
import type { LatLng } from '../types/business'

export type GeoStatus = 'idle' | 'loading' | 'ready' | 'denied' | 'error'
export type LocationSource = 'gps' | 'manual'

interface UseGeolocationResult {
  status: GeoStatus
  position: LatLng | null
  placeLabel: string | null
  source: LocationSource | null
  error: string | null
  requestLocation: () => void
  setManualPosition: (pos: LatLng, label?: string) => void
}

export function useGeolocation(): UseGeolocationResult {
  const [status, setStatus] = useState<GeoStatus>('idle')
  const [position, setPosition] = useState<LatLng | null>(null)
  const [placeLabel, setPlaceLabel] = useState<string | null>(null)
  const [source, setSource] = useState<LocationSource | null>(null)
  const [error, setError] = useState<string | null>(null)

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('error')
      setError('Tarayıcınız konum servisini desteklemiyor. Adres arayın veya haritadan seçin.')
      return
    }

    setStatus('loading')
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setPlaceLabel('GPS konumunuz')
        setSource('gps')
        setStatus('ready')
      },
      (err) => {
        const denied = err.code === err.PERMISSION_DENIED
        setStatus(denied ? 'denied' : 'error')
        setError(
          denied
            ? 'Konum izni reddedildi. Adres arayın veya haritaya tıklayın.'
            : 'GPS alınamadı. Adres arayın veya haritaya tıklayın.',
        )
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60_000 },
    )
  }, [])

  const setManualPosition = useCallback((pos: LatLng, label?: string) => {
    setPosition(pos)
    setPlaceLabel(label || `Harita (${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)})`)
    setSource('manual')
    setStatus('ready')
    setError(null)
  }, [])

  useEffect(() => {
    requestLocation()
  }, [requestLocation])

  return {
    status,
    position,
    placeLabel,
    source,
    error,
    requestLocation,
    setManualPosition,
  }
}
