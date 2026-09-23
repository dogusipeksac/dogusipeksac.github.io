export type BusinessCategoryId =
  | 'all'
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
export type SortOption = 'nearest' | 'farthest' | 'no_website' | 'lead_score'
export type DistanceKm = 1 | 3 | 5 | 10

export type LeadTier = 'very_high' | 'high' | 'medium' | 'low'

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
