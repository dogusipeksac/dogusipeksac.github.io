import type { LatLng } from '../types/business'

const R = 6371000

export function haversineMeters(a: LatLng, b: LatLng): number {
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)))
}

export function formatDistance(meters: number): string {
  if (!Number.isFinite(meters)) return '—'
  if (meters < 1000) return `${Math.round(meters)} m`
  return `${(meters / 1000).toFixed(1)} km`
}

export function formatPhoneDisplay(phone: string): string {
  const raw = phone.trim()
  if (!raw) return 'Telefon yok'
  const digits = raw.replace(/\D/g, '')
  // TR mobile: 05xxxxxxxxx or 905xxxxxxxxx
  let d = digits
  if (d.startsWith('90') && d.length === 12) d = `0${d.slice(2)}`
  if (d.length === 11 && d.startsWith('0')) {
    return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9)}`
  }
  if (d.length === 10 && d.startsWith('5')) {
    return `0${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`
  }
  return raw
}

export function toTelHref(phone: string): string | null {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 10) return null
  let n = digits
  if (n.startsWith('0') && n.length === 11) n = `+90${n.slice(1)}`
  else if (n.startsWith('90') && n.length === 12) n = `+${n}`
  else if (n.length === 10 && n.startsWith('5')) n = `+90${n}`
  else if (!n.startsWith('+')) n = `+${n}`
  return `tel:${n}`
}

/** Build wa.me link from raw phone; returns null if unusable */
export function toWhatsAppLink(phone: string): string | null {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 10) return null
  let normalized = digits
  if (normalized.startsWith('0') && normalized.length === 11) {
    normalized = `90${normalized.slice(1)}`
  } else if (normalized.length === 10 && normalized.startsWith('5')) {
    normalized = `90${normalized}`
  } else if (normalized.startsWith('90') && normalized.length >= 12) {
    // already ok
  } else if (normalized.length > 12 && normalized.startsWith('90')) {
    normalized = normalized.slice(0, 12)
  }
  return `https://wa.me/${normalized}`
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout> | undefined
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t)
    t = setTimeout(() => fn(...args), ms)
  }
}
