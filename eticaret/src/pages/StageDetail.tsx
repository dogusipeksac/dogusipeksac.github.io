import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Empty, GhostButton, PrimaryButton, StatusPill, inputCls } from '../components/ui'
import { money, num, todayIso } from '../lib/money'
import { stageReady } from '../state/selectors'
import { useStore } from '../state/store'
import { EXPENSE_LABELS, type ExpenseCategory, type TaskStatus } from '../types'

const PRIORITY = { high: 'Yüksek', medium: 'Orta', low: 'Düşük' }

export function StageDetail() {
  const { id } = useParams()
  const stageId = Number(id)
  const { state, setTaskStatus, setTaskNotes, updateStage, addDocument, addExpense, completeStage } = useStore()
  const stage = state.stages.find((s) => s.id === stageId)
  const [docTitle, setDocTitle] = useState('')
  const [docNote, setDocNote] = useState('')
  const [amount, setAmount] = useState('')
  const [expNote, setExpNote] = useState('')
  const [category, setCategory] = useState<ExpenseCategory>('other')

  if (!stage) {
    return <p className="text-sm text-neutral-500">Aşama yok. <Link to="/asamalar">Listeye dön</Link></p>
  }

  const locked = stage.status === 'LOCKED'
  const expenses = state.expenses.filter((e) => e.stageId === stage.id)
  const ready = stageReady(stage)

  const cycle = (taskId: string, status: TaskStatus) => {
    if (locked) return
    const next: TaskStatus = status === 'todo' ? 'doing' : status === 'doing' ? 'done' : 'todo'
    setTaskStatus(stage.id, taskId, next)
  }

  return (
    <div className="space-y-5">
      <Link to="/asamalar" className="text-sm text-neutral-500 hover:text-neutral-900">← Aşamalar</Link>
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-neutral-400">Aşama {stage.id}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{stage.title}</h1>
          <p className="mt-2 text-sm text-neutral-600">{stage.summary}</p>
        </div>
        <StatusPill status={stage.status} />
      </header>

      {locked && (
        <p className="rounded-xl bg-neutral-100 px-4 py-3 text-sm text-neutral-600">
          Bu aşama kilitli. Önceki aşama tamamlanınca açılır.
        </p>
      )}

      <Card>
        <h2 className="text-sm font-semibold">Görevler</h2>
        <ul className="mt-3 space-y-3">
          {stage.tasks.map((t) => (
            <li key={t.id} className="rounded-xl border border-neutral-100 p-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  disabled={locked}
                  checked={t.status === 'done'}
                  onChange={() => setTaskStatus(stage.id, t.id, t.status === 'done' ? 'todo' : 'done')}
                />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium ${t.status === 'done' ? 'text-neutral-400 line-through' : ''}`}>{t.title}</p>
                  <p className="mt-1 text-sm text-neutral-500">{t.description}</p>
                  <p className="mt-1 text-xs text-neutral-400">{PRIORITY[t.priority]} · {t.estimateMinutes} dk</p>
                  <button type="button" className="mt-1 text-xs text-neutral-500 underline" disabled={locked} onClick={() => cycle(t.id, t.status)}>
                    Durum: {t.status === 'todo' ? 'Yapılacak' : t.status === 'doing' ? 'Yapılıyor' : 'Bitti'}
                  </button>
                  <textarea
                    className={`${inputCls} mt-2`}
                    rows={2}
                    disabled={locked}
                    placeholder="Görev notu"
                    value={t.notes}
                    onChange={(e) => setTaskNotes(stage.id, t.id, e.target.value)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
        {stage.status === 'CURRENT' && (
          <div className="mt-4">
            <PrimaryButton disabled={!ready} onClick={() => completeStage(stage.id)}>
              {ready ? 'Aşamayı tamamla' : 'Tüm görevler bitince aşama kapanır'}
            </PrimaryButton>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Notlar</h2>
        <textarea
          className={`${inputCls} mt-3`}
          rows={4}
          disabled={locked}
          value={stage.notes}
          onChange={(e) => updateStage(stage.id, { notes: e.target.value })}
        />
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Sonuç</h2>
        <textarea
          className={`${inputCls} mt-3`}
          rows={3}
          disabled={locked}
          placeholder="Bu aşamadan ne çıktı?"
          value={stage.outcome}
          onChange={(e) => updateStage(stage.id, { outcome: e.target.value })}
        />
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Belgeler</h2>
        <p className="mt-1 text-xs text-neutral-500">Dosya yüklenmez. Başlık ve link ya da kısa not tut.</p>
        {stage.documents.length === 0 && <div className="mt-3"><Empty>Belge yok.</Empty></div>}
        <ul className="mt-3 space-y-2 text-sm">
          {stage.documents.map((d) => (
            <li key={d.id} className="rounded-lg bg-neutral-50 px-3 py-2">
              <p className="font-medium">{d.title}</p>
              <p className="text-neutral-500">{d.note}</p>
            </li>
          ))}
        </ul>
        {!locked && (
          <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <input className={inputCls} placeholder="Başlık" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} />
            <input className={inputCls} placeholder="Link veya not" value={docNote} onChange={(e) => setDocNote(e.target.value)} />
            <GhostButton
              onClick={() => {
                if (!docTitle.trim()) return
                addDocument(stage.id, docTitle.trim(), docNote.trim())
                setDocTitle('')
                setDocNote('')
              }}
            >
              Ekle
            </GhostButton>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Bu aşamadaki harcamalar</h2>
        {expenses.length === 0 && <div className="mt-3"><Empty>Harcama yok.</Empty></div>}
        <ul className="mt-3 space-y-1 text-sm">
          {expenses.map((e) => (
            <li key={e.id} className="flex justify-between gap-3">
              <span>{EXPENSE_LABELS[e.category]} · {e.note || 'Not yok'}</span>
              <span className="tabular-nums">{money(e.amount)}</span>
            </li>
          ))}
        </ul>
        {!locked && (
          <div className="mt-3 grid gap-2 sm:grid-cols-4">
            <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value as ExpenseCategory)}>
              {(Object.keys(EXPENSE_LABELS) as ExpenseCategory[]).map((k) => (
                <option key={k} value={k}>{EXPENSE_LABELS[k]}</option>
              ))}
            </select>
            <input className={inputCls} inputMode="decimal" placeholder="Tutar" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input className={inputCls} placeholder="Not" value={expNote} onChange={(e) => setExpNote(e.target.value)} />
            <GhostButton
              onClick={() => {
                const value = num(amount)
                if (value <= 0) return
                addExpense({ date: todayIso(), category, amount: value, note: expNote.trim(), stageId: stage.id })
                setAmount('')
                setExpNote('')
              }}
            >
              Harcama ekle
            </GhostButton>
          </div>
        )}
      </Card>
    </div>
  )
}
