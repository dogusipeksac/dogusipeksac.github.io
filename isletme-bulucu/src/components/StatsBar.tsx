interface StatsBarProps {
  total: number
  noWebsite: number
  withWebsite: number
  withinRadius: number
  radiusLabel?: string
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="text-2xl font-semibold tracking-tight text-slate-900">
        {value.toLocaleString('tr-TR')}
      </div>
      <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </div>
    </div>
  )
}

export function StatsBar({
  total,
  noWebsite,
  withWebsite,
  withinRadius,
  radiusLabel = '5 km İçinde',
}: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Stat value={total} label="Toplam İşletme" />
      <Stat value={noWebsite} label="Web Sitesi Yok" />
      <Stat value={withWebsite} label="Web Sitesi Var" />
      <Stat value={withinRadius} label={radiusLabel} />
    </div>
  )
}
