interface PaginationProps {
  page: number
  totalPages: number
  totalItems: number
  pageSize: number
  onChange: (page: number) => void
}

export function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onChange,
}: PaginationProps) {
  if (totalItems <= pageSize) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-3 py-2.5">
      <p className="text-xs text-slate-500">
        {from}–{to} / {totalItems}
      </p>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Önceki
        </button>
        <span className="min-w-[4.5rem] text-center text-xs font-semibold text-slate-700">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Sonraki →
        </button>
      </div>
    </div>
  )
}
