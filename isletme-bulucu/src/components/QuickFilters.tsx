import type { FiltersState } from '../types/business'

interface QuickFiltersProps {
  filters: FiltersState
  counts: {
    total: number
    noWebsite: number
    withPhone: number
  }
  onChange: (next: Partial<FiltersState>) => void
}

function Chip({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean
  label: string
  count?: number
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? 'bg-teal-700 text-white shadow-sm'
          : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
      }`}
    >
      {label}
      {typeof count === 'number' && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
            active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  )
}

export function QuickFilters({ filters, counts, onChange }: QuickFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip
        active={filters.website === 'all' && !filters.hasPhone && filters.openNow === 'all'}
        label="Tümü"
        count={counts.total}
        onClick={() =>
          onChange({ website: 'all', hasPhone: false, openNow: 'all', sort: 'lead_score' })
        }
      />
      <Chip
        active={filters.website === 'missing'}
        label="Websitesiz (lead)"
        count={counts.noWebsite}
        onClick={() =>
          onChange({
            website: filters.website === 'missing' ? 'all' : 'missing',
            sort: 'lead_score',
          })
        }
      />
      <Chip
        active={filters.hasPhone}
        label="Telefonu var"
        count={counts.withPhone}
        onClick={() => onChange({ hasPhone: !filters.hasPhone })}
      />
      <Chip
        active={filters.openNow === 'open'}
        label="Şu an açık"
        onClick={() =>
          onChange({ openNow: filters.openNow === 'open' ? 'all' : 'open' })
        }
      />
      <Chip
        active={filters.sort === 'nearest'}
        label="En yakın"
        onClick={() => onChange({ sort: 'nearest' })}
      />
      <Chip
        active={filters.sort === 'lead_score'}
        label="En iyi lead"
        onClick={() => onChange({ sort: 'lead_score' })}
      />
    </div>
  )
}
