import type { Business, BusinessCategoryId, LatLng } from '../types/business'
import { ALL_CATEGORIES } from '../constants/categories'
import { haversineMeters } from '../utils/geo'
import { resolveOpenStatus } from '../utils/openingHours'
import { computeLeadScore } from '../utils/scoring'
import { detectCategoryFromTags } from './normalize'

interface NominatimResult {
  osm_type?: string
  osm_id?: number
  lat: string
  lon: string
  name?: string
  display_name?: string
  category?: string
  type?: string
  extratags?: Record<string, string> | null
  address?: Record<string, string>
}

/** Kategori → Nominatim structured search parametreleri */
function nominatimQueries(
  category: BusinessCategoryId,
): Array<Record<string, string>> {
  switch (category) {
    case 'salon':
      return [{ amenity: 'hairdresser' }, { shop: 'beauty' }, { shop: 'cosmetics' }]
    case 'hairdresser':
      return [{ amenity: 'hairdresser' }, { shop: 'hairdresser' }]
    case 'beauty':
      return [{ shop: 'beauty' }, { shop: 'cosmetics' }]
    case 'restaurant':
      return [{ amenity: 'restaurant' }]
    case 'cafe':
      return [{ amenity: 'cafe' }]
    case 'dentist':
      return [{ amenity: 'dentist' }]
    case 'car_repair':
      return [{ shop: 'car_repair' }, { amenity: 'car_wash' }]
    case 'car_wash':
      return [{ amenity: 'car_wash' }]
    case 'estate':
      return [{ office: 'estate_agent' }]
    case 'gym':
      return [{ leisure: 'fitness_centre' }, { leisure: 'sports_centre' }]
    case 'market':
      return [{ shop: 'supermarket' }, { shop: 'convenience' }]
    case 'bakery':
      return [{ shop: 'bakery' }]
    case 'pet':
      return [{ shop: 'pet' }]
    case 'florist':
      return [{ shop: 'florist' }]
    case 'photographer':
      return [{ shop: 'photo' }, { craft: 'photographer' }]
    case 'other':
      return [{ shop: 'laundry' }, { amenity: 'veterinary' }]
    case 'all':
    default:
      return [
        { amenity: 'hairdresser' },
        { amenity: 'restaurant' },
        { amenity: 'cafe' },
        { shop: 'beauty' },
      ]
  }
}

function viewbox(lat: number, lng: number, radiusKm: number): string {
  const dLat = radiusKm / 111
  const dLng = radiusKm / (111 * Math.max(0.2, Math.cos((lat * Math.PI) / 180)))
  // left, top, right, bottom
  return `${lng - dLng},${lat + dLat},${lng + dLng},${lat - dLat}`
}

function buildAddress(addr?: Record<string, string>): string {
  if (!addr) return ''
  const parts = [
    addr.road,
    addr.house_number,
    addr.neighbourhood || addr.suburb,
    addr.city_district || addr.town || addr.city,
  ].filter(Boolean)
  return parts.join(' ')
}

function toBusiness(row: NominatimResult, user: LatLng): Business | null {
  const lat = parseFloat(row.lat)
  const lng = parseFloat(row.lon)
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null

  const tags: Record<string, string> = { ...(row.extratags || {}) }
  if (row.category && row.type) {
    tags[row.category] = row.type
  }
  const name = (row.name || tags.name || '').trim()
  if (!name) return null

  const osmType = row.osm_type || 'node'
  const osmId = row.osm_id || 0
  const id = `${osmType}/${osmId}`

  const website = (
    tags.website ||
    tags['contact:website'] ||
    tags.url ||
    ''
  ).trim()
  const phone = (tags.phone || tags['contact:phone'] || tags['contact:mobile'] || '').trim()
  const address = buildAddress(row.address) || (row.display_name || '').split(',').slice(0, 3).join(',')
  const social = (tags['contact:instagram'] || tags.instagram || '').trim()
  const { status: openStatus, raw: openingHours } = resolveOpenStatus(tags.opening_hours)
  const { id: categoryId, label: categoryLabel } = detectCategoryFromTags(tags)
  const hasWebsite = Boolean(website)
  const distanceMeters = haversineMeters(user, { lat, lng })
  const { score, tier } = computeLeadScore({
    hasWebsite,
    phone,
    address,
    name,
    social,
    hasCategory: categoryId !== 'other',
  })

  // Fallback label from Nominatim type
  const label =
    categoryLabel ||
    ALL_CATEGORIES.find((c) => c.value === categoryId)?.label ||
    row.type ||
    'İşletme'

  return {
    id,
    osmType,
    osmId,
    name,
    categoryId,
    categoryLabel: label,
    address,
    phone,
    website,
    social,
    hasWebsite,
    rating: null,
    reviewCount: null,
    openingHours,
    openStatus,
    lat,
    lng,
    distanceMeters,
    leadScore: score,
    leadTier: tier,
    tags,
  }
}

async function fetchOne(
  params: Record<string, string>,
  box: string,
  signal?: AbortSignal,
): Promise<NominatimResult[]> {
  const url = new URL('https://nominatim.openstreetmap.org/search')
  url.searchParams.set('format', 'jsonv2')
  url.searchParams.set('addressdetails', '1')
  url.searchParams.set('extratags', '1')
  url.searchParams.set('limit', '40')
  url.searchParams.set('bounded', '1')
  url.searchParams.set('viewbox', box)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }

  const res = await fetch(url.toString(), {
    signal,
    headers: {
      Accept: 'application/json',
    },
  })
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`)
  const data = (await res.json()) as NominatimResult[]
  return Array.isArray(data) ? data : []
}

/**
 * Hızlı yedek kaynak. Overpass başarısız/yavaşsa kullanılır.
 * Nominatim usage policy: makul istek; tarayıcı User-Agent otomatik gider.
 */
export async function fetchNominatimBusinesses(opts: {
  user: LatLng
  radiusKm: number
  category: BusinessCategoryId
  signal?: AbortSignal
}): Promise<Business[]> {
  const box = viewbox(opts.user.lat, opts.user.lng, opts.radiusKm)
  const queries = nominatimQueries(opts.category)
  const seen = new Set<string>()
  const out: Business[] = []

  // İlk 2 sorguyu paralel (salon = hairdresser + beauty)
  const batch = queries.slice(0, 2)
  const rest = queries.slice(2)

  const results = await Promise.all(
    batch.map((q) => fetchOne(q, box, opts.signal).catch(() => [] as NominatimResult[])),
  )

  for (const rows of results) {
    for (const row of rows) {
      const b = toBusiness(row, opts.user)
      if (!b || seen.has(b.id)) continue
      if (b.distanceMeters > opts.radiusKm * 1000) continue
      seen.add(b.id)
      out.push(b)
    }
  }

  // Ek sorgular sırayla (rate limit)
  for (const q of rest) {
    if (opts.signal?.aborted) break
    try {
      const rows = await fetchOne(q, box, opts.signal)
      for (const row of rows) {
        const b = toBusiness(row, opts.user)
        if (!b || seen.has(b.id)) continue
        if (b.distanceMeters > opts.radiusKm * 1000) continue
        seen.add(b.id)
        out.push(b)
      }
    } catch {
      // ignore
    }
  }

  out.sort((a, b) => {
    if (a.hasWebsite !== b.hasWebsite) return a.hasWebsite ? 1 : -1
    return a.distanceMeters - b.distanceMeters
  })

  return out
}

export interface PlaceHit {
  lat: number
  lng: number
  label: string
  displayName: string
}

/** Adres / semt / şehir araması (başka yerde ara) */
export async function searchPlaces(
  query: string,
  signal?: AbortSignal,
): Promise<PlaceHit[]> {
  const q = query.trim()
  if (q.length < 2) return []

  const url = new URL('https://nominatim.openstreetmap.org/search')
  url.searchParams.set('format', 'jsonv2')
  url.searchParams.set('q', q)
  url.searchParams.set('addressdetails', '1')
  url.searchParams.set('limit', '6')
  url.searchParams.set('countrycodes', 'tr')

  const res = await fetch(url.toString(), {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`)
  const data = (await res.json()) as NominatimResult[]
  if (!Array.isArray(data)) return []

  return data
    .map((row) => {
      const lat = parseFloat(row.lat)
      const lng = parseFloat(row.lon)
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
      const short =
        row.name ||
        row.address?.suburb ||
        row.address?.town ||
        row.address?.city ||
        row.display_name?.split(',')[0] ||
        'Konum'
      return {
        lat,
        lng,
        label: short,
        displayName: row.display_name || short,
      } satisfies PlaceHit
    })
    .filter((x): x is PlaceHit => x != null)
}
