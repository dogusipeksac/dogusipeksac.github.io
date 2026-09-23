import {
  ALL_CATEGORIES,
  DISTANCE_OPTIONS,
  OPEN_FILTERS,
  SORT_OPTIONS,
  WEBSITE_FILTERS,
} from '../constants/categories'
import type {
  BusinessCategoryId,
  DistanceKm,
  FiltersState,
  OpenFilter,
  SortOption,
  WebsiteFilter,
} from '../types/business'

interface FilterPanelProps {
  filters: FiltersState
  onChange: (next: Partial<FiltersState>) => void
  compact?: boolean
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string | number
  options: { value: string | number; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-slate-600">{label}</span>
      <select
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      >
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function FilterPanel({ filters, onChange, compact }: FilterPanelProps) {
  return (
    <div className={`space-y-3 ${compact ? '' : 'p-1'}`}>
      <SelectField
        label="İşletme kategorisi"
        value={filters.category}
        options={ALL_CATEGORIES}
        onChange={(category) => onChange({ category: category as BusinessCategoryId })}
      />
      <SelectField
        label="Mesafe"
        value={filters.distanceKm}
        options={DISTANCE_OPTIONS}
        onChange={(v) => onChange({ distanceKm: Number(v) as DistanceKm })}
      />
      <SelectField
        label="Web sitesi durumu"
        value={filters.website}
        options={WEBSITE_FILTERS}
        onChange={(website) => onChange({ website: website as WebsiteFilter })}
      />
      <SelectField
        label="Açık / kapalı"
        value={filters.openNow}
        options={OPEN_FILTERS}
        onChange={(openNow) => onChange({ openNow: openNow as OpenFilter })}
      />
      <SelectField
        label="Sıralama"
        value={filters.sort}
        options={SORT_OPTIONS}
        onChange={(sort) => onChange({ sort: sort as SortOption })}
      />
    </div>
  )
}
