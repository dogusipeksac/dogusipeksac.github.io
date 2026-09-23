export type BusinessCategoryId =
  | 'all'
  | 'salon'
  | 'hairdresser'
  | 'beauty'
  | 'restaurant'
  | 'cafe'
  | 'dentist'
  | 'car_repair'
  | 'car_wash'
  | 'estate'
  | 'gym'
  | 'market'
  | 'bakery'
  | 'pet'
  | 'florist'
  | 'photographer'
  | 'other'

export type WebsiteFilter = 'all' | 'missing' | 'present'
export type OpenFilter = 'all' | 'open' | 'closed'
export type SortOption = 'nearest' | 'farthest' | 'no_website' | 'lead_score' | 'rating'
export type DistanceKm = 1 | 3 | 5 | 10

export type LeadTier = 'very_high' | 'high' | 'medium' | 'low'
export type OpenStatus = 'open' | 'closed' | 'unknown'

export interface LatLng {
  lat: number
  lng: number
}

export interface Business {
  id: string
  osmType: string
  osmId: number
  name: string
  categoryId: BusinessCategoryId
  categoryLabel: string
  address: string
  phone: string
  website: string
  social: string
  hasWebsite: boolean
  /** OSM yıldız/puan (varsa), 0–5. Uydurulmaz. */
  rating: number | null
  /** OSM yorum/review sayısı (varsa). Uydurulmaz. */
  reviewCount: number | null
  openingHours: string
  openStatus: OpenStatus
  lat: number
  lng: number
  distanceMeters: number
  leadScore: number
  leadTier: LeadTier
  tags: Record<string, string>
}

export interface FiltersState {
  category: BusinessCategoryId
  distanceKm: DistanceKm
  website: WebsiteFilter
  openNow: OpenFilter
  sort: SortOption
}

export interface OverpassElement {
  type: 'node' | 'way' | 'relation'
  id: number
  lat?: number
  lon?: number
  center?: { lat: number; lon: number }
  tags?: Record<string, string>
}
