import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { emptyScores, margin, netProfit, scoreTotal } from '../lib/calc'
import { money, num, uid } from '../lib/money'
import { useStore } from '../state/store'
import { Card, Field, GhostButton, PrimaryButton, inputCls } from '../components/ui'
import { SCORE_LIMITS, type Product, type ProductScores, type RiskLevel } from '../types'

const SCORE_LABELS: { key: keyof ProductScores; label: string }[] = [
  { key: 'demand', label: 'Talep' },
  { key: 'profit', label: 'Kârlılık' },
  { key: 'competition', label: 'Rekabet (kolay pazar = yüksek puan)' },
  { key: 'startupRisk', label: 'Başlangıç riski (düşük risk = yüksek puan)' },
  { key: 'content', label: 'İçerik potansiyeli' },
  { key: 'brand', label: 'Markalaşma' },
  { key: 'shipping', label: 'Kargo kolaylığı' },
  { key: 'returns', label: 'İade riski (düşük iade = yüksek puan)' },
]

function blank(): Product {
  return {
    id: uid(),
    name: '',
    category: '',
    supplier: '',
    buyPrice: 0,
    sellPrice: 0,
    shipping: 0,
    commission: 0,
    ads: 0,
    packaging: 0,
    competitorCount: 0,
    competitorPrice: 0,
    reviewCount: 0,
    scores: emptyScores(),
    risk: 'mid',
    notes: '',
  }
}

export function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, saveProduct, deleteProduct } = useStore()
  const existing = state.products.find((p) => p.id === id)
  const [product, setProduct] = useState<Product>(() => existing ?? blank())

  const set = (patch: Partial<Product>) => setProduct((p) => ({ ...p, ...patch }))
  const setScore = (key: keyof ProductScores, value: number) =>
    setProduct((p) => ({ ...p, scores: { ...p.scores, [key]: value } }))

  const profit = netProfit(product)
  const mar = margin(product)

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault()
        if (!product.name.trim()) return
        saveProduct(product)
        navigate('/urunler')
      }}
    >
      <Link to="/urunler" className="text-sm text-neutral-500">← Ürünler</Link>
      <h1 className="text-2xl font-semibold tracking-tight">{existing ? 'Ürünü düzenle' : 'Yeni ürün'}</h1>

      <Card>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Ürün adı">
            <input className={inputCls} value={product.name} onChange={(e) => set({ name: e.target.value })} />
          </Field>
          <Field label="Kategori">
            <input className={inputCls} value={product.category} onChange={(e) => set({ category: e.target.value })} />
          </Field>
          <Field label="Tedarikçi">
            <input className={inputCls} value={product.supplier} onChange={(e) => set({ supplier: e.target.value })} />
          </Field>
          <Field label="Risk">
            <select className={inputCls} value={product.risk} onChange={(e) => set({ risk: e.target.value as RiskLevel })}>
              <option value="low">Düşük</option>
              <option value="mid">Orta</option>
              <option value="high">Yüksek</option>
            </select>
          </Field>
        </div>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Maliyet</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Num label="Alış fiyatı (₺)" value={product.buyPrice} onChange={(buyPrice) => set({ buyPrice })} />
          <Num label="Satış fiyatı (₺)" value={product.sellPrice} onChange={(sellPrice) => set({ sellPrice })} />
          <Num label="Kargo (₺)" value={product.shipping} onChange={(shipping) => set({ shipping })} />
          <Num label="Pazaryeri komisyonu (₺)" value={product.commission} onChange={(commission) => set({ commission })} />
          <Num label="Reklam maliyeti (₺)" value={product.ads} onChange={(ads) => set({ ads })} />
          <Num label="Ambalaj (₺)" value={product.packaging} onChange={(packaging) => set({ packaging })} />
        </div>
        <div className="mt-4 rounded-xl bg-neutral-50 px-4 py-3 text-sm">
          <p>Net kâr = satış − alış − kargo − komisyon − reklam − ambalaj</p>
          <p className="mt-1 text-lg font-semibold">{money(profit)} · %{mar.toFixed(1)} marj</p>
        </div>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Pazar</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Num label="Rakip sayısı" value={product.competitorCount} onChange={(competitorCount) => set({ competitorCount })} />
          <Num label="Rakip fiyatı (₺)" value={product.competitorPrice} onChange={(competitorPrice) => set({ competitorPrice })} />
          <Num label="Yorum sayısı" value={product.reviewCount} onChange={(reviewCount) => set({ reviewCount })} />
        </div>
      </Card>

      <Card>
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold">Puan</h2>
          <p className="text-2xl font-semibold tabular-nums">{scoreTotal(product.scores)}<span className="text-sm font-normal text-neutral-400"> / 100</span></p>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {SCORE_LABELS.map((row) => (
            <Field key={row.key} label={`${row.label} (0–${SCORE_LIMITS[row.key]})`}>
              <input
                className={inputCls}
                inputMode="numeric"
                value={product.scores[row.key]}
                onChange={(e) => {
                  const max = SCORE_LIMITS[row.key]
                  const n = Math.min(max, Math.max(0, num(e.target.value)))
                  setScore(row.key, n)
                }}
              />
            </Field>
          ))}
        </div>
      </Card>

      <Card>
        <Field label="Notlar">
          <textarea className={inputCls} rows={4} value={product.notes} onChange={(e) => set({ notes: e.target.value })} />
        </Field>
      </Card>

      <div className="flex flex-wrap gap-2">
        <PrimaryButton type="submit">Kaydet</PrimaryButton>
        {existing && (
          <GhostButton
            onClick={() => {
              deleteProduct(existing.id)
              navigate('/urunler')
            }}
          >
            Sil
          </GhostButton>
        )}
      </div>
    </form>
  )
}

function Num({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <Field label={label}>
      <input className={inputCls} inputMode="decimal" value={value} onChange={(e) => onChange(num(e.target.value))} />
    </Field>
  )
}
