import type {
  BusinessCategoryId,
  DistanceKm,
  OpenFilter,
  SortOption,
  WebsiteFilter,
} from '../types/business'

/** Hızlı varsayılan: dar kategori + 1 km (ilk sayfa) */
export const DEFAULT_RADIUS_KM: DistanceKm = 1
export const DEFAULT_CATEGORY: BusinessCategoryId = 'salon'
export const PAGE_SIZE = 10

/** Progressive yükleme sırası (sayfa sayfa mesafe) */
export const RADIUS_STEPS: DistanceKm[] = [1, 3, 5, 10]

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

export const OPEN_FILTERS: { value: OpenFilter; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'open', label: 'Şu an açık' },
  { value: 'closed', label: 'Şu an kapalı' },
]

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'nearest', label: 'En yakın' },
  { value: 'farthest', label: 'En uzak' },
  { value: 'no_website', label: 'Web sitesi olmayanlar' },
  { value: 'lead_score', label: 'Potansiyel müşteri puanı' },
  { value: 'rating', label: 'En yüksek puan' },
]

export const ALL_CATEGORIES: { value: BusinessCategoryId; label: string }[] = [
  { value: 'salon', label: 'Kuaför & Güzellik (hızlı)' },
  { value: 'all', label: 'Tümü (yavaş)' },
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
 * Overpass selectors — nwr = node+way+relation (tek satır, daha hızlı).
 */
export const CATEGORY_OVERPASS: Record<Exclude<BusinessCategoryId, 'all'>, string[]> = {
  salon: [
    'nwr["amenity"="hairdresser"]',
    'nwr["shop"="beauty"]',
    'nwr["shop"="cosmetics"]',
  ],
  hairdresser: ['nwr["amenity"="hairdresser"]'],
  beauty: ['nwr["shop"="beauty"]', 'nwr["shop"="cosmetics"]'],
  restaurant: ['nwr["amenity"="restaurant"]'],
  cafe: ['nwr["amenity"="cafe"]'],
  dentist: ['nwr["amenity"="dentist"]'],
  car_repair: ['nwr["shop"="car_repair"]'],
  car_wash: ['nwr["amenity"="car_wash"]'],
  estate: ['nwr["office"="estate_agent"]'],
  gym: ['nwr["leisure"="fitness_centre"]', 'nwr["leisure"="sports_centre"]'],
  market: ['nwr["shop"="supermarket"]', 'nwr["shop"="convenience"]'],
  bakery: ['nwr["shop"="bakery"]'],
  pet: ['nwr["shop"="pet"]'],
  florist: ['nwr["shop"="florist"]'],
  photographer: ['nwr["shop"="photo"]', 'nwr["craft"="photographer"]'],
  other: [
    'nwr["shop"="laundry"]',
    'nwr["shop"="dry_cleaning"]',
    'nwr["shop"="tailor"]',
    'nwr["craft"="electronics_repair"]',
    'nwr["amenity"="veterinary"]',
    'nwr["office"="lawyer"]',
    'nwr["office"="accountant"]',
  ],
}

export const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]

export const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
