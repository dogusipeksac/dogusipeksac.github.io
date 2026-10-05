import { Link } from 'react-router-dom'
import { margin, netProfit, scoreTotal } from '../lib/calc'
import { money } from '../lib/money'
import { useStore } from '../state/store'
import { Card, Empty } from '../components/ui'

const RISK = { low: 'Düşük', mid: 'Orta', high: 'Yüksek' }

export function Products() {
  const { state } = useStore()
  const rows = [...state.products].sort((a, b) => scoreTotal(b.scores) - scoreTotal(a.scores))

  return (
    <div className="space-y-4">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Ürünler</h1>
          <p className="mt-1 text-sm text-neutral-500">Skora göre sıralı. Net kâr satıştan tüm maliyetler düşülerek hesaplanır.</p>
        </div>
        <Link to="/urunler/yeni" className="rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white">
          Ürün ekle
        </Link>
      </header>
      {rows.length === 0 && <Empty>Henüz ürün yok. İlk 20 adayı buraya ekle.</Empty>}
      <div className="space-y-2">
        {rows.map((p) => {
          const profit = netProfit(p)
          return (
            <Link key={p.id} to={`/urunler/${p.id}`} className="block">
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">{p.name || 'Adsız ürün'}</h2>
                    <p className="mt-1 text-sm text-neutral-500">
                      {p.category || 'Kategori yok'} · Risk {RISK[p.risk]} · Rakip {p.competitorCount || '—'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold tabular-nums">{scoreTotal(p.scores)}</p>
                    <p className="text-xs text-neutral-400">/ 100</p>
                  </div>
                </div>
                <p className="mt-3 text-sm">
                  Net kâr <span className={profit >= 0 ? 'text-neutral-900' : 'text-red-700'}>{money(profit)}</span>
                  <span className="text-neutral-400"> · %{margin(p).toFixed(0)} marj</span>
                </p>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
