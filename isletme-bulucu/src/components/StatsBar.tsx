interface StatsBarProps {
  total: number
  noWebsite: number
  withPhone: number
  withinRadius: number
  radiusLabel?: string
  onFilterNoWebsite?: () => void
  onFilterPhone?: () => void
  onFilterAll?: () => void
}

function Stat({
  value,
  label,
  onClick,
  accent,
}: {
  value: number
  label: string
  onClick?: () => void
  accent?: boolean
}) {
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`rounded-2xl border bg-white px-4 py-3 text-left shadow-sm transition ${
        onClick ? 'cursor-pointer hover:border-teal-300 hover:shadow-md' : ''
      } ${accent ? 'border-rose-200 bg-rose-50/40' : 'border-slate-200'}`}
    >
      <div className="text-2xl font-semibold tracking-tight text-slate-900">
        {value.toLocaleString('tr-TR')}
      </div>
      <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </div>
    </Comp>
  )
}

export function StatsBar({
  total,
  noWebsite,
  withPhone,
  withinRadius,
  radiusLabel = '5 km İçinde',
  onFilterNoWebsite,
  onFilterPhone,
  onFilterAll,
}: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Stat value={total} label="Toplam" onClick={onFilterAll} />
      <Stat
        value={noWebsite}
        label="Websitesiz lead"
        onClick={onFilterNoWebsite}
        accent
      />
      <Stat value={withPhone} label="Telefonu var" onClick={onFilterPhone} />
      <Stat value={withinRadius} label={radiusLabel} />
    </div>
  )
}
