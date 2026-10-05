import { useState } from 'react'
import { Card, Empty, Field, GhostButton, PrimaryButton, inputCls } from '../components/ui'
import { formatDate, money, num, todayIso } from '../lib/money'
import { useStore } from '../state/store'

export function Journal() {
  const { state, addJournal, deleteJournal } = useStore()
  const [date, setDate] = useState(todayIso())
  const [did, setDid] = useState('')
  const [learned, setLearned] = useState('')
  const [spent, setSpent] = useState('')
  const [decided, setDecided] = useState('')
  const [next, setNext] = useState('')

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Günlük</h1>
        <p className="mt-1 text-sm text-neutral-500">Birkaç ay sonra ne yaptığını buradan okuyacaksın.</p>
      </header>

      <Card>
        <div className="grid gap-3">
          <Field label="Tarih"><input className={inputCls} type="date" value={date} onChange={(e) => setDate(e.target.value)} /></Field>
          <Field label="Ne yaptım?"><textarea className={inputCls} rows={2} value={did} onChange={(e) => setDid(e.target.value)} /></Field>
          <Field label="Ne öğrendim?"><textarea className={inputCls} rows={2} value={learned} onChange={(e) => setLearned(e.target.value)} /></Field>
          <Field label="Ne harcadım? (₺)"><input className={inputCls} inputMode="decimal" value={spent} onChange={(e) => setSpent(e.target.value)} /></Field>
          <Field label="Ne karar verdim?"><textarea className={inputCls} rows={2} value={decided} onChange={(e) => setDecided(e.target.value)} /></Field>
          <Field label="Sonraki adım"><textarea className={inputCls} rows={2} value={next} onChange={(e) => setNext(e.target.value)} /></Field>
        </div>
        <div className="mt-4">
          <PrimaryButton
            onClick={() => {
              if (!did.trim() && !learned.trim() && !next.trim()) return
              addJournal({ date, did: did.trim(), learned: learned.trim(), spent: num(spent), decided: decided.trim(), next: next.trim() })
              setDid('')
              setLearned('')
              setSpent('')
              setDecided('')
              setNext('')
            }}
          >
            Günü kaydet
          </PrimaryButton>
        </div>
      </Card>

      {state.journal.length === 0 && <Empty>Henüz kayıt yok.</Empty>}
      <div className="space-y-2">
        {state.journal.map((j) => (
          <Card key={j.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 text-sm">
                <p className="font-semibold">{formatDate(j.date)}</p>
                {j.did && <p>Yaptım: {j.did}</p>}
                {j.learned && <p>Öğrendim: {j.learned}</p>}
                {j.spent > 0 && <p>Harcadım: {money(j.spent)}</p>}
                {j.decided && <p>Karar: {j.decided}</p>}
                {j.next && <p>Sonraki: {j.next}</p>}
              </div>
              <GhostButton onClick={() => deleteJournal(j.id)}>Sil</GhostButton>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
