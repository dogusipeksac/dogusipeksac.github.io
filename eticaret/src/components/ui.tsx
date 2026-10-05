import type { ReactNode } from 'react'
import type { StageStatus } from '../types'

export const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900'

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-neutral-500">{label}</span>
      {children}
    </label>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </section>
  )
}

export function PrimaryButton({
  children,
  type = 'button',
  disabled,
  onClick,
}: {
  children: ReactNode
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  )
}

export function GhostButton({
  children,
  onClick,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
    >
      {children}
    </button>
  )
}

const STATUS: Record<StageStatus, string> = {
  LOCKED: 'Kilitli',
  CURRENT: 'Şu an',
  COMPLETED: 'Bitti',
}

export function StatusPill({ status }: { status: StageStatus }) {
  const cls =
    status === 'CURRENT'
      ? 'bg-neutral-900 text-white'
      : status === 'COMPLETED'
        ? 'bg-neutral-100 text-neutral-600'
        : 'bg-neutral-50 text-neutral-400'
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide ${cls}`}>
      {STATUS[status]}
    </span>
  )
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-neutral-200 px-4 py-8 text-center text-sm text-neutral-500">
      {children}
    </p>
  )
}
