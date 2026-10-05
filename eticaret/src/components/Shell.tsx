import { NavLink, Outlet } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Panel', end: true },
  { to: '/asamalar', label: 'Aşamalar' },
  { to: '/urunler', label: 'Ürünler' },
  { to: '/rakipler', label: 'Rakipler' },
  { to: '/tedarikciler', label: 'Tedarikçiler' },
  { to: '/finans', label: 'Finans' },
  { to: '/gunluk', label: 'Günlük' },
  { to: '/kararlar', label: 'Kararlar' },
]

export function Shell() {
  return (
    <div className="min-h-full lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="border-b border-neutral-200 bg-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="px-5 py-5">
          <p className="text-[11px] font-medium tracking-[0.16em] text-neutral-400">GİRİŞİM</p>
          <p className="mt-1 text-sm font-semibold text-neutral-900">E-Ticaret Paneli</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3 lg:pb-6">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-3 py-2 text-sm ${
                  isActive ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  )
}
