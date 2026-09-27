import OpeningHours from 'opening_hours'

export type OpenStatus = 'open' | 'closed' | 'unknown'

/** OSM opening_hours → şu an açık mı? Parse edilemezse unknown. */
export function resolveOpenStatus(openingHours: string | undefined | null): {
  status: OpenStatus
  raw: string
} {
  const raw = (openingHours || '').trim()
  if (!raw) return { status: 'unknown', raw: '' }

  try {
    // eslint-disable-next-line new-cap
    const oh = new OpeningHours(raw)
    const state = oh.getState()
    if (state === true) return { status: 'open', raw }
    if (state === false) return { status: 'closed', raw }
    return { status: 'unknown', raw }
  } catch {
    return { status: 'unknown', raw }
  }
}

export function openStatusLabel(status: OpenStatus): string {
  switch (status) {
    case 'open':
      return 'Şu an açık'
    case 'closed':
      return 'Şu an kapalı'
    default:
      return 'Saat bilinmiyor'
  }
}

const DAY: Record<string, string> = {
  mo: 'Pzt',
  tu: 'Sal',
  we: 'Çar',
  th: 'Per',
  fr: 'Cum',
  sa: 'Cmt',
  su: 'Paz',
}

const DAY_FULL: Record<string, string> = {
  mo: 'Pazartesi',
  tu: 'Salı',
  we: 'Çarşamba',
  th: 'Perşembe',
  fr: 'Cuma',
  sa: 'Cumartesi',
  su: 'Pazar',
}

function translateDayToken(token: string): string {
  const t = token.trim().toLowerCase()
  if (!t) return ''
  if (t === 'ph') return 'Resmi tatil'
  if (t === 'sh') return 'Okul tatili'
  // Mo-Fr / Mo–Fr / Mo Fr
  const range = t.match(/^(mo|tu|we|th|fr|sa|su)\s*[-–—]\s*(mo|tu|we|th|fr|sa|su)$/i)
  if (range) {
    const a = DAY[range[1].toLowerCase()]
    const b = DAY[range[2].toLowerCase()]
    return `${a}–${b}`
  }
  if (DAY[t]) return DAY[t]
  // Mo,Tu,We
  if (t.includes(',')) {
    return t
      .split(',')
      .map((p) => DAY[p.trim().toLowerCase()] || p.trim())
      .join(', ')
  }
  return token.trim()
}

/** Tek kural: "Mo-Fr 07:00-13:30" → "Pzt–Cum 07:00–13:30" */
function formatRule(rule: string): string {
  let r = rule.trim()
  if (!r) return ''

  const lower = r.toLowerCase()
  if (lower === '24/7' || lower === 'open') return '7/24 açık'
  if (lower === 'closed' || lower === 'off') return 'Kapalı'

  // "Su off" / "PH off"
  const offMatch = r.match(/^(.+?)\s+(off|closed)$/i)
  if (offMatch) {
    return `${translateDayToken(offMatch[1])}: kapalı`
  }

  r = r.replace(/\boff\b/gi, 'kapalı')
  r = r.replace(/\bclosed\b/gi, 'kapalı')
  r = r.replace(/\bopen\b/gi, 'açık')

  // Split days from times: days usually at start, times like 07:00-13:30
  const timeMatch = r.match(
    /(\d{1,2}:\d{2}\s*[-–—]\s*\d{1,2}:\d{2}(?:\s*,\s*\d{1,2}:\d{2}\s*[-–—]\s*\d{1,2}:\d{2})*)/i,
  )
  if (timeMatch) {
    const timesRaw = timeMatch[1]
    const daysRaw = r.slice(0, timeMatch.index).trim()
    const times = timesRaw
      .replace(/[-–—]/g, '–')
      .replace(/\s*,\s*/g, ', ')
      .replace(/\s+/g, '')
      .replace(/,/g, ', ')
    const days = daysRaw ? translateDayToken(daysRaw.replace(/\s+/g, ' ')) : ''
    if (days) return `${days}: ${times}`
    return times
  }

  const justDays = translateDayToken(r)
  return justDays || r
}

/**
 * OSM opening_hours → Türkçe okunabilir metin.
 * Örn: "Mo-Fr 07:00-13:30; Mo-Fr 17:00-20:00"
 *   → "Pzt–Cum: 07:00–13:30 · Pzt–Cum: 17:00–20:00"
 * Aynı gün birleşirse: "Pzt–Cum: 07:00–13:30, 17:00–20:00"
 */
export function formatOpeningHoursTr(raw: string | undefined | null): string {
  const src = (raw || '').trim()
  if (!src) return ''

  const lower = src.toLowerCase()
  if (lower === '24/7') return '7/24 açık'
  if (lower === 'closed' || lower === 'off') return 'Kapalı'

  const rules = src
    .split(';')
    .map((p) => p.trim())
    .filter(Boolean)
    .map(formatRule)
    .filter(Boolean)

  if (!rules.length) return src

  // Aynı gün etiketi olan kuralları birleştir
  const grouped = new Map<string, string[]>()
  const order: string[] = []

  for (const rule of rules) {
    const m = rule.match(/^(.+?):\s*(.+)$/)
    if (m) {
      const day = m[1]
      const time = m[2]
      if (!grouped.has(day)) {
        grouped.set(day, [])
        order.push(day)
      }
      grouped.get(day)!.push(time)
    } else {
      const key = `__solo_${order.length}`
      grouped.set(key, [rule])
      order.push(key)
    }
  }

  return order
    .map((key) => {
      const times = grouped.get(key)!
      if (key.startsWith('__solo_')) return times[0]
      return `${key}: ${times.join(', ')}`
    })
    .join(' · ')
}

/** Tooltip / detay için daha uzun gün adları (isteğe bağlı) */
export function formatOpeningHoursTrLong(raw: string | undefined | null): string {
  const short = formatOpeningHoursTr(raw)
  if (!short) return ''
  let out = short
  for (const [en, tr] of Object.entries(DAY)) {
    const full = DAY_FULL[en]
    // Only replace standalone short day tokens carefully
    out = out.replace(new RegExp(`\\b${tr}\\b`, 'g'), full)
  }
  return out
}
