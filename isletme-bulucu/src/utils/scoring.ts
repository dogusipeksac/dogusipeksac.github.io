import type { Business, LeadTier } from '../types/business'

export function computeLeadScore(input: {
  hasWebsite: boolean
  phone: string
  address: string
  name: string
  social: string
  hasCategory: boolean
}): { score: number; tier: LeadTier } {
  let score = 0
  if (!input.hasWebsite) score += 30
  if (input.phone.trim()) score += 20
  if (input.address.trim()) score += 15
  if (input.name.trim()) score += 10
  if (input.social.trim()) score += 10
  if (input.hasCategory) score += 15

  score = Math.min(100, score)

  let tier: LeadTier
  if (score >= 80) tier = 'very_high'
  else if (score >= 60) tier = 'high'
  else if (score >= 40) tier = 'medium'
  else tier = 'low'

  return { score, tier }
}

export function leadTierLabel(tier: LeadTier): string {
  switch (tier) {
    case 'very_high':
      return 'Çok yüksek potansiyel'
    case 'high':
      return 'Yüksek potansiyel'
    case 'medium':
      return 'Orta potansiyel'
    case 'low':
      return 'Düşük potansiyel'
  }
}

export function leadTierColor(tier: LeadTier): string {
  switch (tier) {
    case 'very_high':
      return 'bg-emerald-100 text-emerald-800'
    case 'high':
      return 'bg-teal-100 text-teal-800'
    case 'medium':
      return 'bg-amber-100 text-amber-800'
    case 'low':
      return 'bg-slate-100 text-slate-600'
  }
}

export function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`
  return value
}

export function businessesToCsv(items: Business[]): string {
  const header = [
    'name',
    'category',
    'address',
    'phone',
    'website',
    'distance',
    'latitude',
    'longitude',
    'website_status',
    'lead_score',
  ].join(',')

  const rows = items.map((b) =>
    [
      csvEscape(b.name),
      csvEscape(b.categoryLabel),
      csvEscape(b.address),
      csvEscape(b.phone),
      csvEscape(b.website),
      String(Math.round(b.distanceMeters)),
      String(b.lat),
      String(b.lng),
      b.hasWebsite ? 'present' : 'missing',
      String(b.leadScore),
    ].join(','),
  )

  return [header, ...rows].join('\n')
}

export function downloadCsv(filename: string, content: string) {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
