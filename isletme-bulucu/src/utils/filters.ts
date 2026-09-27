import type { Business, FiltersState } from '../types/business'

const SALON_IDS = new Set(['hairdresser', 'beauty', 'salon'])

function matchesCategory(b: Business, category: FiltersState['category']): boolean {
  if (category === 'all') return true
  if (category === 'salon') return SALON_IDS.has(b.categoryId)
  return b.categoryId === category
}

function matchesQuery(b: Business, query: string): boolean {
  const q = query.trim().toLocaleLowerCase('tr-TR')
  if (!q) return true
  const hay = [b.name, b.address, b.phone, b.categoryLabel, b.website]
    .join(' ')
    .toLocaleLowerCase('tr-TR')
  return hay.includes(q)
}

export function filterAndSortBusinesses(
  items: Business[],
  filters: FiltersState,
): Business[] {
  let list = [...items]

  const maxMeters = filters.distanceKm * 1000
  list = list.filter((b) => b.distanceMeters <= maxMeters)
  list = list.filter((b) => matchesCategory(b, filters.category))
  list = list.filter((b) => matchesQuery(b, filters.query))

  if (filters.website === 'missing') {
    list = list.filter((b) => !b.hasWebsite)
  } else if (filters.website === 'present') {
    list = list.filter((b) => b.hasWebsite)
  }

  if (filters.hasPhone) {
    list = list.filter((b) => Boolean(b.phone.trim()))
  }

  if (filters.openNow === 'open') {
    list = list.filter((b) => b.openStatus === 'open')
  } else if (filters.openNow === 'closed') {
    list = list.filter((b) => b.openStatus === 'closed')
  }

  switch (filters.sort) {
    case 'nearest':
      list.sort((a, b) => a.distanceMeters - b.distanceMeters)
      break
    case 'farthest':
      list.sort((a, b) => b.distanceMeters - a.distanceMeters)
      break
    case 'no_website':
      list.sort((a, b) => {
        if (a.hasWebsite !== b.hasWebsite) return a.hasWebsite ? 1 : -1
        const ap = b.phone ? 1 : 0
        const bp = a.phone ? 1 : 0
        if (ap !== bp) return ap - bp
        return a.distanceMeters - b.distanceMeters
      })
      break
    case 'lead_score':
      list.sort((a, b) => {
        if (b.leadScore !== a.leadScore) return b.leadScore - a.leadScore
        if (Boolean(b.phone) !== Boolean(a.phone)) return b.phone ? 1 : -1
        return a.distanceMeters - b.distanceMeters
      })
      break
    case 'rating':
      list.sort((a, b) => {
        const ar = a.rating ?? -1
        const br = b.rating ?? -1
        if (br !== ar) return br - ar
        const arc = a.reviewCount ?? -1
        const brc = b.reviewCount ?? -1
        if (brc !== arc) return brc - arc
        return a.distanceMeters - b.distanceMeters
      })
      break
  }

  return list
}

export function computeStats(items: Business[], radiusKm = 5) {
  const total = items.length
  const noWebsite = items.filter((b) => !b.hasWebsite).length
  const withWebsite = total - noWebsite
  const withPhone = items.filter((b) => Boolean(b.phone.trim())).length
  const withinRadius = items.filter((b) => b.distanceMeters <= radiusKm * 1000).length
  return { total, noWebsite, withWebsite, withPhone, withinRadius }
}
