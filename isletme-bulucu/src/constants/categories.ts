import type { BusinessCategoryId, DistanceKm, SortOption, WebsiteFilter } from '../types/business'

export const DEFAULT_RADIUS_KM: DistanceKm = 5

export const DISTANCE_OPTIONS: { value: DistanceKm; label: string }[] = [
  { value: 1, label: '1 km' },
  { value: 3, label: '3 km' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
]

export const WEBSITE_FILTERS: { value: WebsiteFilter; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'missing', label: 'Web sitesi olmayanlar' },
  { value: 'present', label: 'Web sitesi olanlar' },
]

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'nearest', label: 'En yakın' },
  { value: 'farthest', label: 'En uzak' },
  { value: 'no_website', label: 'Web sitesi olmayanlar' },
  { value: 'lead_score', label: 'Potansiyel müşteri puanı' },
]

/** Filter UI categories (broader groups) */
export const FILTER_CATEGORIES: { value: BusinessCategoryId; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'hairdresser', label: 'Kuaför' },
  { value: 'beauty', label: 'Güzellik' },
  { value: 'restaurant', label: 'Restoran' },
  { value: 'cafe', label: 'Kafe' },
  { value: 'car_repair', label: 'Oto' },
  { value: 'estate', label: 'Emlak' },
  { value: 'other', label: 'Diğer' },
]

/** Full category list for search / Overpass mapping */
export const ALL_CATEGORIES: { value: BusinessCategoryId; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'hairdresser', label: 'Kuaför' },
  { value: 'beauty', label: 'Güzellik merkezi' },
  { value: 'restaurant', label: 'Restoran' },
  { value: 'cafe', label: 'Kafe' },
  { value: 'dentist', label: 'Diş kliniği' },
  { value: 'car_repair', label: 'Oto servis' },
  { value: 'car_wash', label: 'Oto yıkama' },
  { value: 'estate', label: 'Emlak' },
  { value: 'gym', label: 'Spor salonu' },
  { value: 'market', label: 'Market' },
  { value: 'bakery', label: 'Fırın' },
  { value: 'pet', label: 'Pet shop' },
  { value: 'florist', label: 'Çiçekçi' },
  { value: 'photographer', label: 'Fotoğrafçı' },
  { value: 'other', label: 'Diğer' },
]

/**
 * Overpass tag selectors per category.
 * "all" unions the core commercial set.
 * "other" = remaining common local businesses not in the named list.
 */
export const CATEGORY_OVERPASS: Record<Exclude<BusinessCategoryId, 'all'>, string[]> = {
  hairdresser: ['node["amenity"="hairdresser"]', 'way["amenity"="hairdresser"]'],
  beauty: [
    'node["shop"="beauty"]',
    'way["shop"="beauty"]',
    'node["shop"="cosmetics"]',
    'way["shop"="cosmetics"]',
  ],
  restaurant: ['node["amenity"="restaurant"]', 'way["amenity"="restaurant"]'],
  cafe: ['node["amenity"="cafe"]', 'way["amenity"="cafe"]'],
  dentist: ['node["amenity"="dentist"]', 'way["amenity"="dentist"]'],
  car_repair: ['node["shop"="car_repair"]', 'way["shop"="car_repair"]'],
  car_wash: ['node["amenity"="car_wash"]', 'way["amenity"="car_wash"]'],
  estate: ['node["office"="estate_agent"]', 'way["office"="estate_agent"]'],
  gym: [
    'node["leisure"="fitness_centre"]',
    'way["leisure"="fitness_centre"]',
    'node["leisure"="sports_centre"]',
    'way["leisure"="sports_centre"]',
  ],
  market: [
    'node["shop"="supermarket"]',
    'way["shop"="supermarket"]',
    'node["shop"="convenience"]',
    'way["shop"="convenience"]',
  ],
  bakery: ['node["shop"="bakery"]', 'way["shop"="bakery"]'],
  pet: ['node["shop"="pet"]', 'way["shop"="pet"]'],
  florist: ['node["shop"="florist"]', 'way["shop"="florist"]'],
  photographer: [
    'node["shop"="photo"]',
    'way["shop"="photo"]',
    'node["craft"="photographer"]',
    'way["craft"="photographer"]',
  ],
  other: [
    'node["shop"="laundry"]',
    'way["shop"="laundry"]',
    'node["shop"="dry_cleaning"]',
    'way["shop"="dry_cleaning"]',
    'node["shop"="tailor"]',
    'way["shop"="tailor"]',
    'node["craft"="electronics_repair"]',
    'way["craft"="electronics_repair"]',
    'node["amenity"="veterinary"]',
    'way["amenity"="veterinary"]',
    'node["office"="lawyer"]',
    'way["office"="lawyer"]',
    'node["office"="accountant"]',
    'way["office"="accountant"]',
  ],
}

export const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]

export const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
