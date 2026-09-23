import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useMemo } from 'react'
import { OSM_ATTRIBUTION, OSM_TILE_URL } from '../constants/categories'
import type { Business, LatLng } from '../types/business'

const userIcon = L.divIcon({
  className: '',
  html: `<div style="width:18px;height:18px;border-radius:999px;background:#0f766e;border:3px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.35)"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

const bizIcon = (hasWebsite: boolean) =>
  L.divIcon({
    className: '',
    html: `<div style="width:12px;height:12px;border-radius:999px;background:${hasWebsite ? '#64748b' : '#b91c1c'};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3)"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  })

function Recenter({ center }: { center: LatLng }) {
  const map = useMap()
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom(), { animate: true })
  }, [center.lat, center.lng, map])
  return null
}

function FlyTo({ target }: { target: LatLng | null }) {
  const map = useMap()
  useEffect(() => {
    if (!target) return
    map.flyTo([target.lat, target.lng], 16, { duration: 0.8 })
  }, [target, map])
  return null
}

function ClickPicker({
  enabled,
  onPick,
}: {
  enabled: boolean
  onPick: (pos: LatLng) => void
}) {
  useMapEvents({
    click(e) {
      if (!enabled) return
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })
  return null
}

interface BusinessMapProps {
  user: LatLng | null
  businesses: Business[]
  focus: LatLng | null
  pickMode: boolean
  onPickLocation: (pos: LatLng) => void
  onSelectBusiness: (id: string) => void
}

const DEFAULT_CENTER: LatLng = { lat: 41.0082, lng: 28.9784 }

export function BusinessMap({
  user,
  businesses,
  focus,
  pickMode,
  onPickLocation,
  onSelectBusiness,
}: BusinessMapProps) {
  const center = user || DEFAULT_CENTER

  const markers = useMemo(() => {
    // Cap markers for performance on dense areas
    return businesses.slice(0, 400)
  }, [businesses])

  return (
    <div className="h-full min-h-[280px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer attribution={OSM_ATTRIBUTION} url={OSM_TILE_URL} />
        {user && <Recenter center={user} />}
        <FlyTo target={focus} />
        <ClickPicker enabled={pickMode || !user} onPick={onPickLocation} />

        {user && (
          <Marker position={[user.lat, user.lng]} icon={userIcon}>
            <Popup>Konumunuz</Popup>
          </Marker>
        )}

        {markers.map((b) => (
          <Marker
            key={b.id}
            position={[b.lat, b.lng]}
            icon={bizIcon(b.hasWebsite)}
            eventHandlers={{ click: () => onSelectBusiness(b.id) }}
          >
            <Popup>
              <strong>{b.name}</strong>
              <br />
              {b.categoryLabel}
              <br />
              {b.hasWebsite ? 'Web sitesi var' : 'Web sitesi yok'}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
