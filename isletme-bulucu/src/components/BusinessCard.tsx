import { useState } from 'react'
import type { Business } from '../types/business'
import {
  formatDistance,
  formatPhoneDisplay,
  toTelHref,
  toWhatsAppLink,
} from '../utils/geo'
import { formatOpeningHoursTr, openStatusLabel } from '../utils/openingHours'
import { googleMapsSearchUrl } from '../utils/rating'
import { leadTierLabel } from '../utils/scoring'

interface BusinessCardProps {
  business: Business
  selected?: boolean
  onShowOnMap: (b: Business) => void
  onDetails: (b: Business) => void
}

export function BusinessCard({
  business: b,
  selected,
  onShowOnMap,
  onDetails,
}: BusinessCardProps) {
  const [copied, setCopied] = useState(false)
  const primary = (b.phone.split('·')[0] || b.phone).trim()
  const tel = primary ? toTelHref(primary) : null
  const wa = primary ? toWhatsAppLink(primary) : null
  const googleUrl = googleMapsSearchUrl(b.name, b.lat, b.lng)

  const copyPhone = async () => {
    if (!primary) return
    try {
      await navigator.clipboard.writeText(primary)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <article
      className={`rounded-2xl border bg-white p-3.5 shadow-sm transition hover:shadow-md ${
        selected ? 'border-teal-500 ring-2 ring-teal-100' : 'border-slate-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onDetails(b)}
          className="min-w-0 flex-1 text-left"
        >
          <div className="flex flex-wrap items-center gap-1.5">
            {!b.hasWebsite && (
              <span className="rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rose-700">
                Web yok
              </span>
            )}
            {b.openStatus === 'open' && (
              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                Açık
              </span>
            )}
            <span className="text-[10px] font-medium text-slate-400">
              {leadTierLabel(b.leadTier)} · {b.leadScore}
            </span>
          </div>
          <h3 className="mt-1 text-[15px] font-semibold leading-snug text-slate-900">
            {b.name}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            {b.categoryLabel} · {formatDistance(b.distanceMeters)}
            {b.address ? ` · ${b.address}` : ''}
          </p>
        </button>
      </div>

      {primary ? (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
          <a
            href={tel || undefined}
            className="min-w-0 flex-1 truncate text-sm font-semibold text-teal-900"
          >
            {formatPhoneDisplay(primary)}
          </a>
          <button
            type="button"
            onClick={() => void copyPhone()}
            className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 hover:bg-white hover:text-slate-800"
          >
            {copied ? 'Kopyalandı' : 'Kopyala'}
          </button>
        </div>
      ) : (
        <p className="mt-3 text-xs text-slate-400">Telefon OSM’de yok — Google’dan bakın</p>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {tel ? (
          <a
            href={tel}
            className="rounded-xl bg-teal-700 px-2 py-2.5 text-center text-xs font-semibold text-white hover:bg-teal-800"
          >
            Ara
          </a>
        ) : (
          <span className="rounded-xl bg-slate-100 px-2 py-2.5 text-center text-xs font-medium text-slate-400">
            Ara
          </span>
        )}
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-emerald-600 px-2 py-2.5 text-center text-xs font-semibold text-white hover:bg-emerald-700"
          >
            WhatsApp
          </a>
        ) : (
          <span className="rounded-xl bg-slate-100 px-2 py-2.5 text-center text-xs font-medium text-slate-400">
            WhatsApp
          </span>
        )}
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Google
        </a>
        <button
          type="button"
          onClick={() => onShowOnMap(b)}
          className="rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Harita
        </button>
      </div>

      {(b.openingHours || b.openStatus !== 'unknown') && (
        <p className="mt-2 text-[11px] leading-snug text-slate-400">
          {b.openingHours
            ? `🕒 ${formatOpeningHoursTr(b.openingHours)}`
            : openStatusLabel(b.openStatus)}
        </p>
      )}
    </article>
  )
}
