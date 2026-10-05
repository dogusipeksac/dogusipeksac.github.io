import { useState } from 'react'
import { Card, Empty, Field, GhostButton, PrimaryButton, inputCls } from '../components/ui'
import { formatDate, todayIso } from '../lib/money'
import { useStore } from '../state/store'

export function Decisions() {
  const { state, addDecision, deleteDecision } = useStore()
  const [date, setDate] = useState(todayIso())
  const [decision, setDecision] = useState('')
  const [reason, setReason] = useState('')

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Kararlar</h1>
        <p className="mt-1 text-sm text-neutral-500">Neden başladığını ve neden vazgeçtiğini sonra unutma.</p>
      </header>

      <Card>
        <div className="grid gap-3">
          <Field label="Tarih">
            <input className={inputCls} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="Karar">
            <textarea className={inputCls} rows={3} value={decision} onChange={(e) => setDecision(e.target.value)} placeholder="Ne yapacağız?" />
          </Field>
          <Field label="Neden">
            <textarea className={inputCls} rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Neden bu?" />
          </Field>
        </div>
        <div className="mt-4">
          <PrimaryButton
            onClick={() => {
              if (!decision.trim()) return
              addDecision({ date, decision: decision.trim(), reason: reason.trim() })
              setDecision('')
              setReason('')
            }}
          >
            Kararı kaydet
          </PrimaryButton>
        </div>
      </Card>

      {state.decisions.length === 0 && (
        <Empty>Henüz karar yok. İlk kararını sen yaz; panel örnek karar uydurmaz.</Empty>
      )}
      <div className="space-y-2">
        {state.decisions.map((d) => (
          <Card key={d.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-neutral-400">{formatDate(d.date)}</p>
                <p className="mt-1 text-sm font-medium">{d.decision}</p>
                {d.reason && <p className="mt-2 text-sm text-neutral-600">{d.reason}</p>}
              </div>
              <GhostButton onClick={() => deleteDecision(d.id)}>Sil</GhostButton>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
