import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Empty, Field, GhostButton, PrimaryButton, inputCls } from '../components/ui'
import { money, num, uid } from '../lib/money'
import { useStore } from '../state/store'
import type { Competitor } from '../types'

function blank(productId: string): Competitor {
  return {
    id: uid(),
    productId,
    name: '',
    platform: '',
    price: 0,
    reviewCount: 0,
    rating: 0,
    advantage: '',
    disadvantage: '',
    complaints: '',
    link: '',
    notes: '',
  }
}

export function Competitors() {
  const { state, saveCompetitor, deleteCompetitor } = useStore()
  const [productId, setProductId] = useState(state.products[0]?.id ?? '')
  const [row, setRow] = useState<Competitor>(() => blank(state.products[0]?.id ?? ''))
  const list = state.competitors.filter((c) => c.productId === productId)

  const set = (patch: Partial<Competitor>) => setRow((r) => ({ ...r, ...patch }))

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Rakipler</h1>
        <p className="mt-1 text-sm text-neutral-500">Her ürün için ayrı kart. Fiyat ve şikayet uydurulmaz, gördüğünü yaz.</p>
      </header>

      {state.products.length === 0 ? (
        <Empty>
          Önce bir ürün ekle. <Link to="/urunler/yeni" className="underline">Ürün ekle</Link>
        </Empty>
      ) : (
        <>
          <Field label="Ürün">
            <select
              className={inputCls}
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value)
                setRow(blank(e.target.value))
              }}
            >
              {state.products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </Field>

          {list.length === 0 && <Empty>Bu üründe rakip yok.</Empty>}
          <div className="space-y-2">
            {list.map((c) => (
              <Card key={c.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">{c.name}</h2>
                    <p className="text-sm text-neutral-500">{c.platform} · {money(c.price)} · {c.rating || '—'} puan · {c.reviewCount} yorum</p>
                    {c.complaints && <p className="mt-2 text-sm">Şikayet: {c.complaints}</p>}
                    {c.link && (
                      <a href={c.link} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm underline">
                        Link
                      </a>
                    )}
                  </div>
                  <GhostButton onClick={() => deleteCompetitor(c.id)}>Sil</GhostButton>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <h2 className="text-sm font-semibold">Rakip ekle</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Rakip adı"><input className={inputCls} value={row.name} onChange={(e) => set({ name: e.target.value })} /></Field>
              <Field label="Platform"><input className={inputCls} value={row.platform} onChange={(e) => set({ platform: e.target.value })} placeholder="Trendyol, Hepsiburada…" /></Field>
              <Field label="Satış fiyatı"><input className={inputCls} inputMode="decimal" value={row.price} onChange={(e) => set({ price: num(e.target.value) })} /></Field>
              <Field label="Yorum sayısı"><input className={inputCls} inputMode="numeric" value={row.reviewCount} onChange={(e) => set({ reviewCount: num(e.target.value) })} /></Field>
              <Field label="Puan"><input className={inputCls} inputMode="decimal" value={row.rating} onChange={(e) => set({ rating: num(e.target.value) })} /></Field>
              <Field label="Link"><input className={inputCls} value={row.link} onChange={(e) => set({ link: e.target.value })} /></Field>
              <Field label="Avantaj"><input className={inputCls} value={row.advantage} onChange={(e) => set({ advantage: e.target.value })} /></Field>
              <Field label="Dezavantaj"><input className={inputCls} value={row.disadvantage} onChange={(e) => set({ disadvantage: e.target.value })} /></Field>
              <Field label="Müşteri şikayetleri"><input className={inputCls} value={row.complaints} onChange={(e) => set({ complaints: e.target.value })} /></Field>
              <Field label="Notlar"><input className={inputCls} value={row.notes} onChange={(e) => set({ notes: e.target.value })} /></Field>
            </div>
            <div className="mt-4">
              <PrimaryButton
                onClick={() => {
                  if (!row.name.trim() || !productId) return
                  saveCompetitor({ ...row, productId })
                  setRow(blank(productId))
                }}
              >
                Kaydet
              </PrimaryButton>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
