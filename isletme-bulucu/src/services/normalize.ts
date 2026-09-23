import { ALL_CATEGORIES, CATEGORY_OVERPASS } from '../constants/categories'
import type {
  Business,
  BusinessCategoryId,
  LatLng,
  OverpassElement,
} from '../types/business'
import { haversineMeters } from '../utils/geo'
import { resolveOpenStatus } from '../utils/openingHours'
import { computeLeadScore } from '../utils/scoring'

function buildAddress(tags: Record<string, string>): string {
  const parts = [
    tags['addr:street'],
    tags['addr:housenumber'],
    tags['addr:neighbourhood'] || tags['addr:suburb'],
    tags['addr:district'] || tags['addr:city'] || tags['addr:town'],
  ].filter(Boolean)
  if (parts.length) return parts.join(' ')
  return tags['addr:full'] || ''
}

function pickWebsite(tags: Record<string, string>): string {
  const raw = (
    tags.website ||
    tags['contact:website'] ||
    tags['contact:website:1'] ||
    ''
  ).trim()
  if (!raw) return ''
  // Prefer http(s) links; ignore social URLs mistaken as website later
  return raw.split(/[;\s]+/).find((u) => /^https?:\/\//i.test(u) || u.includes('.')) || raw
}

const PHONE_TAG_KEYS = [
  'phone',
  'contact:phone',
  'contact:mobile',
  'mobile',
  'phone:mobile',
  'contact:whatsapp',
  'phone:1',
  'phone:2',
  'contact:phone:1',
  'contact:phone:2',
]

/** Collect every plausible phone from OSM tags (never invent). */
export function extractPhones(tags: Record<string, string>): string[] {
  const found: string[] = []
  const seen = new Set<string>()

  const consider = (raw: string) => {
    for (const part of raw.split(/[;/|]/)) {
      const cleaned = part.trim()
      if (!cleaned) continue
      const digits = cleaned.replace(/\D/g, '')
      if (digits.length < 10) continue
      const key = digits.replace(/^0/, '').replace(/^90/, '')
      if (seen.has(key)) continue
      seen.add(key)
      found.push(cleaned)
    }
  }

  for (const key of PHONE_TAG_KEYS) {
    if (tags[key]) consider(tags[key])
  }

  // Any other contact:* or phone* keys we might have missed
  for (const [key, value] of Object.entries(tags)) {
    if (!value) continue
    const k = key.toLowerCase()
    if (k.includes('fax')) continue
    if (
      (k.includes('phone') || k.includes('mobile') || k.includes('whatsapp')) &&
      !PHONE_TAG_KEYS.includes(key)
    ) {
      consider(value)
    }
  }

  return found
}

function pickSocial(tags: Record<string, string>): string {
  return (
    tags['contact:instagram'] ||
    tags['contact:facebook'] ||
    tags['contact:twitter'] ||
    tags.instagram ||
    tags.facebook ||
    ''
  ).trim()
}

/** Parse OSM rating/stars into 0–5. Never invent. */
export function pickRating(tags: Record<string, string>): number | null {
  const raw =
    tags.stars ||
    tags.rating ||
    tags['rating:stars'] ||
    tags['stars:rating'] ||
    tags['guest_house:stars'] ||
    tags['hotel:stars'] ||
    ''
  if (!raw.trim()) return null

  // "4", "4.5", "4/5", "★★★★"
  const starChars = (raw.match(/★|⭐/g) || []).length
  if (starChars > 0) return Math.min(5, starChars)

  const fraction = raw.match(/(\d+[.,]?\d*)\s*\/\s*(\d+)/)
  if (fraction) {
    const n = parseFloat(fraction[1].replace(',', '.'))
    const d = parseFloat(fraction[2].replace(',', '.'))
    if (d > 0 && Number.isFinite(n)) return Math.min(5, Math.round((n / d) * 5 * 10) / 10)
  }

  const num = parseFloat(raw.replace(',', '.').replace(/[^\d.]/g, ''))
  if (!Number.isFinite(num)) return null
  // Some tags use 0–10 or 0–100
  if (num > 5 && num <= 10) return Math.round((num / 2) * 10) / 10
  if (num > 10 && num <= 100) return Math.round((num / 20) * 10) / 10
  if (num < 0 || num > 5) return null
  return Math.round(num * 10) / 10
}

/** Parse OSM review count. Never invent. */
export function pickReviewCount(tags: Record<string, string>): number | null {
  const raw =
    tags.reviews ||
    tags.review_count ||
    tags['review:count'] ||
    tags['reviews:count'] ||
    tags['rating:count'] ||
    tags['stars:count'] ||
    ''
  if (!raw.trim()) return null
  const n = parseInt(raw.replace(/\D/g, ''), 10)
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

function detectCategory(tags: Record<string, string>): {
  id: BusinessCategoryId
  label: string
} {
  const amenity = tags.amenity
  const shop = tags.shop
  const office = tags.office
  const leisure = tags.leisure
  const craft = tags.craft

  const map: Array<{ test: boolean; id: BusinessCategoryId }> = [
    { test: amenity === 'hairdresser' || shop === 'hairdresser', id: 'hairdresser' },
    { test: shop === 'beauty' || shop === 'cosmetics', id: 'beauty' },
    { test: amenity === 'restaurant', id: 'restaurant' },
    { test: amenity === 'cafe', id: 'cafe' },
    { test: amenity === 'dentist', id: 'dentist' },
    { test: shop === 'car_repair', id: 'car_repair' },
    { test: amenity === 'car_wash', id: 'car_wash' },
    { test: office === 'estate_agent', id: 'estate' },
    {
      test: leisure === 'fitness_centre' || leisure === 'sports_centre',
      id: 'gym',
    },
    { test: shop === 'supermarket' || shop === 'convenience', id: 'market' },
    { test: shop === 'bakery', id: 'bakery' },
    { test: shop === 'pet', id: 'pet' },
    { test: shop === 'florist', id: 'florist' },
    { test: shop === 'photo' || craft === 'photographer', id: 'photographer' },
  ]

  for (const row of map) {
    if (row.test) {
      const label =
        ALL_CATEGORIES.find((c) => c.value === row.id)?.label || row.id
      return { id: row.id, label }
    }
  }

  return { id: 'other', label: 'Diğer' }
}

/** Nominatim / diğer kaynaklar için dışa açık kategori tespiti */
export function detectCategoryFromTags(tags: Record<string, string>) {
  return detectCategory(tags)
}

function getCoords(el: OverpassElement): LatLng | null {
  if (typeof el.lat === 'number' && typeof el.lon === 'number') {
    return { lat: el.lat, lng: el.lon }
  }
  if (el.center && typeof el.center.lat === 'number') {
    return { lat: el.center.lat, lng: el.center.lon }
  }
  return null
}

export function normalizeOverpassElements(
  elements: OverpassElement[],
  user: LatLng,
): Business[] {
  const seen = new Set<string>()
  const out: Business[] = []

  for (const el of elements) {
    const tags = el.tags || {}
    const coords = getCoords(el)
    if (!coords) continue

    const name = (tags.name || tags['name:tr'] || '').trim()
    if (!name) continue

    const id = `${el.type}/${el.id}`
    if (seen.has(id)) continue
    seen.add(id)

    const website = pickWebsite(tags)
    const phones = extractPhones(tags)
    const phone = phones.join(' · ')
    const address = buildAddress(tags)
    const social = pickSocial(tags)
    const rating = pickRating(tags)
    const reviewCount = pickReviewCount(tags)
    const hasWebsite = Boolean(website)
    const { status: openStatus, raw: openingHours } = resolveOpenStatus(
      tags.opening_hours || tags['opening_hours:covid19'],
    )
    const { id: categoryId, label: categoryLabel } = detectCategory(tags)
    const distanceMeters = haversineMeters(user, coords)
    const { score, tier } = computeLeadScore({
      hasWebsite,
      phone,
      address,
      name,
      social,
      hasCategory: categoryId !== 'other' || Boolean(tags.amenity || tags.shop || tags.office),
    })

    out.push({
      id,
      osmType: el.type,
      osmId: el.id,
      name,
      categoryId,
      categoryLabel,
      address,
      phone,
      website,
      social,
      hasWebsite,
      rating,
      reviewCount,
      openingHours,
      openStatus,
      lat: coords.lat,
      lng: coords.lng,
      distanceMeters,
      leadScore: score,
      leadTier: tier,
      tags,
    })
  }

  // Default: no-website first, then nearest
  out.sort((a, b) => {
    if (a.hasWebsite !== b.hasWebsite) return a.hasWebsite ? 1 : -1
    return a.distanceMeters - b.distanceMeters
  })

  return out
}

function selectorsForCategory(category: BusinessCategoryId): string[] {
  if (category === 'all') {
    // Sadece node — way/relation daha yavaş
    return [
      'node["amenity"~"^(hairdresser|restaurant|cafe|dentist|car_wash)$"]',
      'node["shop"~"^(beauty|cosmetics|car_repair|supermarket|convenience|bakery|pet|florist|photo)$"]',
      'node["office"="estate_agent"]',
      'node["leisure"~"^(fitness_centre|sports_centre)$"]',
    ]
  }
  if (category === 'car_repair') {
    return [...CATEGORY_OVERPASS.car_repair, ...CATEGORY_OVERPASS.car_wash]
  }
  return CATEGORY_OVERPASS[category] || CATEGORY_OVERPASS.other
}

export function buildOverpassQuery(
  lat: number,
  lng: number,
  radiusMeters: number,
  category: BusinessCategoryId,
): string {
  const around = `(around:${Math.round(radiusMeters)},${lat},${lng})`
  const selectors = selectorsForCategory(category)
  const body = selectors.map((s) => `${s}${around};`).join('\n  ')

  return `
[out:json][timeout:10];
(
  ${body}
);
out center tags;
`.trim()
}
