import { useState } from 'react'
import { Card, Empty, Field, GhostButton, PrimaryButton, inputCls } from '../components/ui'
import { money, num, uid } from '../lib/money'
import { useStore } from '../state/store'
import type { RiskLevel, Supplier } from '../types'

const TRUST = { low: 'Düşük', mid: 'Orta', high: 'Yüksek' }

function blank(): Supplier {
  return {
    id: uid(),
    company: '',
    contact: '',
    product: '',
    unitPrice: 0,
    moq: '',
    shipping: '',
    samplePrice: 0,
    branding: '',
    leadTime: '',
    trust: 'mid',
    notes: '',
  }
}

export function Suppliers() {
  const { state, saveSupplier, deleteSupplier } = useStore()
  const [row, setRow] = useState<Supplier>(() => blank())
  const set = (patch: Partial<Supplier>) => setRow((r) => ({ ...r, ...patch }))

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Tedarikçiler</h1>
        <p className="mt-1 text-sm text-neutral-500">Aynı ürün için en az iki teklif yan yana durmadan sipariş yok.</p>
      </header>

      {state.suppliers.length === 0 && <Empty>Tedarikçi yok.</Empty>}
      <div className="space-y-2">
        {state.suppliers.map((s) => (
          <Card key={s.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{s.company}</h2>
                <p className="text-sm text-neutral-500">{s.product} · {money(s.unitPrice)} · Min. {s.moq || '—'}</p>
                <p className="mt-1 text-sm text-neutral-600">{s.contact}</p>
                <p className="mt-1 text-xs text-neutral-400">Numune {money(s.samplePrice)} · Teslim {s.leadTime || '—'} · Güven {TRUST[s.trust]}</p>
                {s.notes && <p className="mt-2 text-sm">{s.notes}</p>}
              </div>
              <GhostButton onClick={() => deleteSupplier(s.id)}>Sil</GhostButton>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-sm font-semibold">Tedarikçi ekle</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Firma"><input className={inputCls} value={row.company} onChange={(e) => set({ company: e.target.value })} /></Field>
          <Field label="İletişim"><input className={inputCls} value={row.contact} onChange={(e) => set({ contact: e.target.value })} /></Field>
          <Field label="Ürün"><input className={inputCls} value={row.product} onChange={(e) => set({ product: e.target.value })} /></Field>
          <Field label="Birim fiyat (₺)"><input className={inputCls} inputMode="decimal" value={row.unitPrice} onChange={(e) => set({ unitPrice: num(e.target.value) })} /></Field>
          <Field label="Minimum sipariş"><input className={inputCls} value={row.moq} onChange={(e) => set({ moq: e.target.value })} /></Field>
          <Field label="Kargo"><input className={inputCls} value={row.shipping} onChange={(e) => set({ shipping: e.target.value })} /></Field>
          <Field label="Numune fiyatı (₺)"><input className={inputCls} inputMode="decimal" value={row.samplePrice} onChange={(e) => set({ samplePrice: num(e.target.value) })} /></Field>
          <Field label="Logo / ambalaj"><input className={inputCls} value={row.branding} onChange={(e) => set({ branding: e.target.value })} /></Field>
          <Field label="Teslim süresi"><input className={inputCls} value={row.leadTime} onChange={(e) => set({ leadTime: e.target.value })} /></Field>
          <Field label="Güven">
            <select className={inputCls} value={row.trust} onChange={(e) => set({ trust: e.target.value as RiskLevel })}>
              <option value="low">Düşük</option>
              <option value="mid">Orta</option>
              <option value="high">Yüksek</option>
            </select>
          </Field>
          <Field label="Notlar"><input className={inputCls} value={row.notes} onChange={(e) => set({ notes: e.target.value })} /></Field>
        </div>
        <div className="mt-4">
          <PrimaryButton
            onClick={() => {
              if (!row.company.trim()) return
              saveSupplier(row)
              setRow(blank())
            }}
          >
            Kaydet
          </PrimaryButton>
        </div>
      </Card>
    </div>
  )
}
