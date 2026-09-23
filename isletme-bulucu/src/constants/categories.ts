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
 * Overpass selectors — sadece node (way/relation yavaş).
 */
export const CATEGORY_OVERPASS: Record<Exclude<BusinessCategoryId, 'all'>, string[]> = {
  salon: [
    'node["amenity"="hairdresser"]',
    'node["shop"="beauty"]',
    'node["shop"="cosmetics"]',
  ],
  hairdresser: ['node["amenity"="hairdresser"]', 'node["shop"="hairdresser"]'],
  beauty: ['node["shop"="beauty"]', 'node["shop"="cosmetics"]'],
  restaurant: ['node["amenity"="restaurant"]'],
  cafe: ['node["amenity"="cafe"]'],
  dentist: ['node["amenity"="dentist"]'],
  car_repair: ['node["shop"="car_repair"]'],
  car_wash: ['node["amenity"="car_wash"]'],
  estate: ['node["office"="estate_agent"]'],
  gym: ['node["leisure"="fitness_centre"]', 'node["leisure"="sports_centre"]'],
  market: ['node["shop"="supermarket"]', 'node["shop"="convenience"]'],
  bakery: ['node["shop"="bakery"]'],
  pet: ['node["shop"="pet"]'],
  florist: ['node["shop"="florist"]'],
  photographer: ['node["shop"="photo"]', 'node["craft"="photographer"]'],
  other: [
    'node["shop"="laundry"]',
    'node["shop"="dry_cleaning"]',
    'node["amenity"="veterinary"]',
    'node["office"="lawyer"]',
  ],
}

/** @deprecated — overpass.ts içindeki liste kullanılıyor */
export const OVERPASS_ENDPOINTS = [
  'https://overpass.openstreetmap.fr/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass-api.de/api/interpreter',
]

export const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
