import type { Business } from '../types/business'
import {
  formatDistance,
  formatPhoneDisplay,
  toTelHref,
  toWhatsAppLink,
} from '../utils/geo'
import { openStatusLabel } from '../utils/openingHours'
import {
  formatRatingLabel,
  formatStars,
  googleMapsSearchUrl,
} from '../utils/rating'
import { leadTierColor, leadTierLabel } from '../utils/scoring'

interface BusinessCardProps {
  business: Business
  selected?: boolean
  onShowOnMap: (b: Business) => void
  onDetails: (b: Business) => void
}

function openBadgeClass(status: Business['openStatus']): string {
  switch (status) {
    case 'open':
      return 'bg-emerald-50 text-emerald-700'
    case 'closed':
      return 'bg-slate-100 text-slate-500'
    default:
      return 'bg-slate-50 text-slate-400'
  }
}

export function BusinessCard({
  business: b,
  selected,
  onShowOnMap,
  onDetails,
}: BusinessCardProps) {
  const primary = (b.phone.split('·')[0] || b.phone).trim()
  const tel = primary ? toTelHref(primary) : null
  const wa = primary ? toWhatsAppLink(primary) : null
  const hasPublicRating = b.rating != null || b.reviewCount != null
  const googleUrl = googleMapsSearchUrl(b.name, b.lat, b.lng)

  return (
    <article
      className={`rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md ${
        selected ? 'border-teal-500 ring-2 ring-teal-100' : 'border-slate-200'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{b.name}</h3>
          <p className="mt-0.5 text-sm text-slate-500">⭐ {b.categoryLabel}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              b.hasWebsite
                ? 'bg-slate-100 text-slate-600'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {b.hasWebsite ? 'Web Sitesi Var' : 'Web Sitesi Yok'}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${openBadgeClass(b.openStatus)}`}
          >
            {openStatusLabel(b.openStatus)}
          </span>
        </div>
      </div>

      <div
        className={`mt-3 rounded-xl px-3 py-2 text-sm ${
          hasPublicRating ? 'bg-amber-50 text-amber-900' : 'bg-slate-50 text-slate-600'
        }`}
      >
        {hasPublicRating ? (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {b.rating != null && (
              <span className="font-semibold tracking-tight text-amber-700">
                {formatStars(b.rating)} {b.rating.toFixed(1)}
              </span>
            )}
            {b.reviewCount != null && (
              <span className="text-amber-800/80">
                · {b.reviewCount.toLocaleString('tr-TR')} yorum
              </span>
            )}
            <span className="text-xs text-amber-700/70">(OSM)</span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-slate-500">⭐ OSM’de puan yok (Google’da olabilir)</span>
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-teal-800 shadow-sm ring-1 ring-slate-200 hover:bg-teal-50"
            >
              Google’da bak →
            </a>
          </div>
        )}
      </div>

      <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
        <li>📍 {formatDistance(b.distanceMeters)}</li>
        <li>📍 {b.address || 'Adres yok'}</li>
        {b.openingHours && (
          <li className="text-slate-500">🕒 {b.openingHours}</li>
        )}
        <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>📞</span>
          {tel ? (
            <a
              href={tel}
              className="font-semibold text-teal-800 underline-offset-2 hover:underline"
            >
              {formatPhoneDisplay(primary)}
              {b.phone.includes('·') ? ' +' : ''}
            </a>
          ) : (
            <span className="text-slate-400">Telefon yok (OSM’de kayıtlı değil)</span>
          )}
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
            >
              WhatsApp
            </a>
          )}
        </li>
        <li>
          🌐{' '}
          {b.hasWebsite ? (
            <a
              href={b.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline-offset-2 hover:underline"
            >
              {b.website.replace(/^https?:\/\//, '').slice(0, 40)}
            </a>
          ) : (
            'Web sitesi yok'
          )}
        </li>
      </ul>

      <div className="mt-3 flex flex-wrap gap-2">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${leadTierColor(b.leadTier)}`}
        >
          Satış {b.leadScore} · {leadTierLabel(b.leadTier)}
        </span>
        {hasPublicRating && (
          <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
            {formatRatingLabel(b.rating, b.reviewCount)}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onShowOnMap(b)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Haritada Göster
        </button>
        <button
          type="button"
          onClick={() => onDetails(b)}
          className="rounded-xl bg-teal-700 px-3 py-2 text-sm font-medium text-white hover:bg-teal-800"
        >
          Detay
        </button>
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
        >
          Google yorum
        </a>
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            WhatsApp
          </a>
        )}
      </div>
    </article>
  )
}
