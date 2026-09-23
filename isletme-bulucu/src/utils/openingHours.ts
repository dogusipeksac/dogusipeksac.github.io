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
