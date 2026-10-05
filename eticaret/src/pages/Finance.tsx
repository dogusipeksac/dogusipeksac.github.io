import { useState } from 'react'
import { Card, Empty, Field, GhostButton, inputCls } from '../components/ui'
import { formatDate, money, num, todayIso } from '../lib/money'
import { useStore } from '../state/store'
import { EXPENSE_LABELS, type ExpenseCategory } from '../types'

export function Finance() {
  const { state, addExpense, deleteExpense, addIncome, deleteIncome, updateProfile } = useStore()
  const [budget, setBudget] = useState(state.profile.budget == null ? '' : String(state.profile.budget))
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [category, setCategory] = useState<ExpenseCategory>('other')
  const [incomeAmount, setIncomeAmount] = useState('')
  const [incomeNote, setIncomeNote] = useState('')

  const spent = state.expenses.reduce((s, e) => s + e.amount, 0)
  const income = state.incomes.reduce((s, e) => s + e.amount, 0)
  const by = (c: ExpenseCategory) => state.expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0)
  const budgetValue = state.profile.budget
  const remaining = budgetValue == null ? null : budgetValue + income - spent
  const maxBar = Math.max(1, ...Object.keys(EXPENSE_LABELS).map((k) => by(k as ExpenseCategory)))

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Finans</h1>
        <p className="mt-1 text-sm text-neutral-500">Rakamlar yalnızca senin girdiğin kayıtlardan gelir.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Başlangıç bütçesi" value={budgetValue == null ? 'Girilmedi' : money(budgetValue)} />
        <Stat label="Harcanan" value={money(spent)} />
        <Stat label="Kalan" value={remaining == null ? '—' : money(remaining)} />
        <Stat label="Kâr" value={money(income - spent)} />
      </div>

      <Card>
        <h2 className="text-sm font-semibold">Bütçeyi güncelle</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <input className={`${inputCls} max-w-xs`} inputMode="decimal" value={budget} onChange={(e) => setBudget(e.target.value)} />
          <GhostButton onClick={() => updateProfile({ budget: budget.trim() === '' ? null : num(budget) })}>Kaydet</GhostButton>
        </div>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Gider dağılımı</h2>
        <ul className="mt-4 space-y-3">
          {(Object.keys(EXPENSE_LABELS) as ExpenseCategory[]).map((key) => {
            const value = by(key)
            return (
              <li key={key}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{EXPENSE_LABELS[key]}</span>
                  <span className="tabular-nums">{money(value)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-neutral-100">
                  <div className="h-full rounded-full bg-neutral-900" style={{ width: `${(value / maxBar) * 100}%` }} />
                </div>
              </li>
            )
          })}
        </ul>
        <p className="mt-4 text-sm text-neutral-500">Toplam gelir {money(income)}</p>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Gider ekle</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value as ExpenseCategory)}>
            {(Object.keys(EXPENSE_LABELS) as ExpenseCategory[]).map((k) => (
              <option key={k} value={k}>{EXPENSE_LABELS[k]}</option>
            ))}
          </select>
          <input className={inputCls} inputMode="decimal" placeholder="Tutar" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input className={inputCls} placeholder="Not" value={note} onChange={(e) => setNote(e.target.value)} />
          <GhostButton
            onClick={() => {
              const value = num(amount)
              if (value <= 0) return
              addExpense({ date: todayIso(), category, amount: value, note: note.trim(), stageId: null })
              setAmount('')
              setNote('')
            }}
          >
            Ekle
          </GhostButton>
        </div>
        {state.expenses.length === 0 ? (
          <div className="mt-3"><Empty>Gider yok.</Empty></div>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {state.expenses.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3">
                <span>{formatDate(e.date)} · {EXPENSE_LABELS[e.category]} · {e.note || '—'}</span>
                <span className="flex items-center gap-3">
                  <span className="tabular-nums">{money(e.amount)}</span>
                  <button type="button" className="text-xs text-neutral-400" onClick={() => deleteExpense(e.id)}>Sil</button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Gelir ekle</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Field label="Tutar">
            <input className={inputCls} inputMode="decimal" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} />
          </Field>
          <Field label="Not">
            <input className={inputCls} value={incomeNote} onChange={(e) => setIncomeNote(e.target.value)} />
          </Field>
          <div className="flex items-end">
            <GhostButton
              onClick={() => {
                const value = num(incomeAmount)
                if (value <= 0) return
                addIncome({ date: todayIso(), amount: value, note: incomeNote.trim() })
                setIncomeAmount('')
                setIncomeNote('')
              }}
            >
              Ekle
            </GhostButton>
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          {state.incomes.map((e) => (
            <li key={e.id} className="flex justify-between gap-3">
              <span>{formatDate(e.date)} · {e.note || 'Satış'}</span>
              <span className="flex items-center gap-3">
                {money(e.amount)}
                <button type="button" className="text-xs text-neutral-400" onClick={() => deleteIncome(e.id)}>Sil</button>
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </Card>
  )
}
