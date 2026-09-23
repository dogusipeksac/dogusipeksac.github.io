import type { ReactNode } from 'react'
import type { Business } from '../types/business'
import { formatDistance, formatPhoneDisplay, toTelHref, toWhatsAppLink } from '../utils/geo'
import { openStatusLabel } from '../utils/openingHours'
import { formatStars } from '../utils/rating'
import { leadTierColor, leadTierLabel } from '../utils/scoring'

interface DetailPanelProps {
  business: Business
  onClose: () => void
  onShowOnMap: (b: Business) => void
  onCreateWebsite: (b: Business) => void
}

export function DetailPanel({
  business: b,
  onClose,
  onShowOnMap,
  onCreateWebsite,
}: DetailPanelProps) {
  const primaryPhone = (b.phone.split('·')[0] || b.phone).trim()
  const wa = primaryPhone ? toWhatsAppLink(primaryPhone) : null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-3 sm:items-center">
      <div
        role="dialog"
        aria-modal
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl scrollbar-thin"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              {b.categoryLabel}
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">{b.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200"
          >
            Kapat
          </button>
        </div>

        {!b.hasWebsite && (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center">
            <div className="text-lg font-bold tracking-wide text-rose-700">
              WEB SİTESİ YOK
            </div>
            <p className="mt-1 text-sm text-rose-600">
              Bu işletme potansiyel web sitesi müşterisi olabilir.
            </p>
          </div>
        )}

        <dl className="mt-5 space-y-3 text-sm">
          <Row label="Adres" value={b.address || '—'} />
          <Row
            label="Telefon"
            value={
              b.phone ? (
                <span className="inline-flex flex-col items-end gap-1">
                  {b.phone.split('·').map((p) => {
                    const part = p.trim()
                    const href = toTelHref(part)
                    return href ? (
                      <a key={part} href={href} className="text-teal-700 underline">
                        {formatPhoneDisplay(part)}
                      </a>
                    ) : (
                      <span key={part}>{formatPhoneDisplay(part)}</span>
                    )
                  })}
                </span>
              ) : (
                'OSM’de kayıtlı değil'
              )
            }
          />
          <Row
            label="Website"
            value={
              b.website ? (
                <a
                  href={b.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline"
                >
                  {b.website}
                </a>
              ) : (
                'Yok'
              )
            }
          />
          <Row
            label="Müşteri puanı"
            value={
              b.rating != null ? (
                <span>
                  <span className="text-amber-600">{formatStars(b.rating)}</span>{' '}
                  {b.rating.toFixed(1)} / 5
                </span>
              ) : (
                'OSM’de kayıt yok'
              )
            }
          />
          <Row
            label="Yorum sayısı"
            value={
              b.reviewCount != null
                ? b.reviewCount.toLocaleString('tr-TR')
                : 'OSM’de kayıt yok'
            }
          />
          <Row label="Açık / kapalı" value={openStatusLabel(b.openStatus)} />
          <Row
            label="Çalışma saatleri"
            value={b.openingHours || 'OSM’de kayıt yok'}
          />
          <Row label="Mesafe" value={formatDistance(b.distanceMeters)} />
          <Row label="Latitude" value={b.lat.toFixed(6)} />
          <Row label="Longitude" value={b.lng.toFixed(6)} />
          <Row
            label="OpenStreetMap"
            value={
              <a
                href={`https://www.openstreetmap.org/${b.osmType}/${b.osmId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 underline"
              >
                {b.osmType}/{b.osmId}
              </a>
            }
          />
          <Row
            label="Website durumu"
            value={b.hasWebsite ? 'Web Sitesi Var' : 'Web Sitesi Yok'}
          />
          <Row
            label="Potansiyel puan"
            value={
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${leadTierColor(b.leadTier)}`}>
                {b.leadScore} — {leadTierLabel(b.leadTier)}
              </span>
            }
          />
          {b.social && <Row label="Sosyal medya" value={b.social} />}
        </dl>

        <div className="mt-6 flex flex-col gap-2">
          {!b.hasWebsite && (
            <button
              type="button"
              onClick={() => onCreateWebsite(b)}
              className="w-full rounded-2xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Bu işletme için web sitesi oluştur
            </button>
          )}
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-2xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700"
            >
              WhatsApp&apos;tan İletişime Geç
            </a>
          )}
          <button
            type="button"
            onClick={() => onShowOnMap(b)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Haritada Göster
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-2">
      <dt className="shrink-0 text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-800">{value}</dd>
    </div>
  )
}
