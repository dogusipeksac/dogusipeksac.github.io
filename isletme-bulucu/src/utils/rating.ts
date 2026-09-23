export function formatStars(rating: number | null): string {
  if (rating == null) return ''
  const full = Math.floor(rating)
  const half = rating - full >= 0.4
  const empty = Math.max(0, 5 - full - (half ? 1 : 0))
  return '★'.repeat(Math.min(5, full)) + (half ? '½' : '') + '☆'.repeat(empty)
}

export function formatRatingLabel(rating: number | null, reviewCount: number | null): string {
  if (rating == null && reviewCount == null) return 'OSM’de puan yok'
  const parts: string[] = []
  if (rating != null) parts.push(`${rating.toFixed(1)} / 5`)
  if (reviewCount != null) parts.push(`${reviewCount.toLocaleString('tr-TR')} yorum`)
  return parts.join(' · ')
}

/** Google Maps arama linki — puan/yorumu Places API olmadan gösterir (yeni sekme). */
export function googleMapsSearchUrl(name: string, lat: number, lng: number): string {
  const q = `${name} ${lat},${lng}`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
}
