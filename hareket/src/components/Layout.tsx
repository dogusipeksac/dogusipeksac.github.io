import { useEffect, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity,
  Bookmark,
  Dumbbell,
  Menu,
  Moon,
  Search,
  ShieldAlert,
  Sun,
  X,
} from 'lucide-react'
import { useAppStore } from '../hooks/useAppStore'
import { MUSCLE_GROUPS } from '../data/muscleGroups'
import { EQUIPMENTS } from '../data/equipment'
import { EXERCISES } from '../data/exercises'

export function Layout() {
  const { favorites, theme, toggleTheme } = useAppStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quickQuery, setQuickQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // Sayfa değiştiğinde en üste kaydır ve mobil menüyü kapat
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    setMobileMenuOpen(false)
  }, [location.pathname])

  const handleQuickSearch = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = quickQuery.trim()
    if (trimmed) {
      navigate(`/hareketler?q=${encodeURIComponent(trimmed)}`)
    } else {
      navigate('/hareketler')
    }
    setMobileMenuOpen(false)
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-xl px-3.5 py-2 text-sm font-bold transition ${
      isActive
        ? 'bg-lime-400 text-slate-950 shadow-sm shadow-lime-400/20'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`

  return (
    <div className="flex min-h-screen flex-col bg-[#090a0f] text-slate-100">
      {/* Klavye Kullanıcıları İçin İçeriğe Atla Bağlantısı */}
      <a
        href="#ana-icerik"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-xl focus:bg-lime-400 focus:px-4 focus:py-2 focus:font-bold focus:text-slate-950"
      >
        Ana içeriğe atla
      </a>

      {/* Üst Menü (Header) */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090a0f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Logo ve Marka Adı */}
          <Link
            to="/"
            className="flex items-center gap-2.5 focus:ring-2 focus:ring-lime-400 focus:outline-none rounded-xl"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-lime-400 to-emerald-500 text-slate-950 shadow-md shadow-lime-400/20">
              <Activity className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-white">
                HAREKET
              </span>
              <span className="block text-[10px] font-bold tracking-widest text-lime-400 uppercase">
                Kas &amp; Form Rehberi
              </span>
            </div>
          </Link>

          {/* Masaüstü Navigasyon Bağlantıları */}
          <nav className="hidden items-center gap-1.5 md:flex" aria-label="Ana menü">
            <NavLink to="/hareketler" className={navLinkClass}>
              Hareketler ({EXERCISES.length})
            </NavLink>
            <NavLink to="/kas-gruplari" className={navLinkClass}>
              Kas Grupları
            </NavLink>
            <NavLink to="/ekipmanlar" className={navLinkClass}>
              Ekipmanlar
            </NavLink>
            <NavLink to="/favorilerim" className={navLinkClass}>
              <span className="inline-flex items-center gap-1.5">
                <Bookmark className="h-4 w-4" />
                <span>Favorilerim</span>
                {favorites.length > 0 && (
                  <span className="rounded-full bg-lime-400/20 px-1.5 py-0.2 text-xs font-extrabold text-lime-300">
                    {favorites.length}
                  </span>
                )}
              </span>
            </NavLink>
          </nav>

          {/* Hızlı Arama + Tema Seçici + Mobil Menü Butonu */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleQuickSearch} className="relative hidden lg:block" role="search">
              <label htmlFor="header-quick-search" className="sr-only">
                Hareket veya kas ara
              </label>
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="header-quick-search"
                type="search"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="Hareket veya kas ara (örn. Omuz, Squat)..."
                className="w-64 rounded-xl border border-white/15 bg-slate-900/90 py-2 pr-3 pl-9 text-xs font-medium text-white placeholder-slate-400 transition focus:w-72 focus:border-lime-400 focus:outline-none"
              />
            </form>

            {/* Açık / Koyu Tema Seçeneği */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}
              title={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-lime-400/40 hover:text-white focus:ring-2 focus:ring-lime-400 focus:outline-none"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-lime-400" />
              ) : (
                <Moon className="h-4 w-4 text-sky-400" />
              )}
            </button>

            {/* Mobil Menü Açma/Kapama Butonu */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobil-menu"
              aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 md:hidden focus:ring-2 focus:ring-lime-400 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobil Açılır Menü */}
        {mobileMenuOpen && (
          <div
            id="mobil-menu"
            className="border-t border-white/10 bg-[#0d1018] px-4 pt-3 pb-5 md:hidden"
          >
            <form onSubmit={handleQuickSearch} className="relative mb-3" role="search">
              <label htmlFor="mobile-quick-search" className="sr-only">
                Hareket veya kas ara
              </label>
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="mobile-quick-search"
                type="search"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="Hareket, kas veya ekipman ara..."
                className="w-full rounded-xl border border-white/15 bg-slate-900 py-2.5 pr-4 pl-10 text-sm text-white placeholder-slate-400 focus:border-lime-400 focus:outline-none"
              />
            </form>

            <nav className="flex flex-col gap-1.5" aria-label="Mobil menü">
              <NavLink to="/hareketler" className={navLinkClass}>
                Tüm Hareketler ({EXERCISES.length})
              </NavLink>
              <NavLink to="/kas-gruplari" className={navLinkClass}>
                Kas Grupları (11 Bölge)
              </NavLink>
              <NavLink to="/ekipmanlar" className={navLinkClass}>
                Ekipmanlar (9 Kategori)
              </NavLink>
              <NavLink to="/favorilerim" className={navLinkClass}>
                Favorilerim ({favorites.length})
              </NavLink>
              <NavLink to="/kaynaklar" className={navLinkClass}>
                Kaynaklar ve Metodoloji
              </NavLink>
            </nav>
          </div>
        )}
      </header>

      {/* Ana İçerik */}
      <main id="ana-icerik" className="flex-1">
        <Outlet />
      </main>

      {/* Alt Bilgi (Footer) */}
      <footer className="mt-20 border-t border-white/10 bg-[#07080d] pt-14 pb-10 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Sağlık Bilgilendirmesi Kutusu */}
          <div className="mb-10 flex items-start gap-3.5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4 sm:p-5">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
            <div className="text-xs leading-relaxed text-slate-300">
              <strong className="font-bold text-amber-300">Sağlık ve Güvenlik Bilgilendirmesi:</strong>{' '}
              HAREKET üzerindeki tüm egzersiz açıklamaları, kas diyagramları ve örnek set/tekrar
              aralıkları yalnızca genel eğitim ve bilgilendirme amaçlıdır; tıbbi teşhis, fizik
              tedavi veya kişiye özel antrenman reçetesi yerine geçmez. Egzersiz sırasında keskin
              eklem ağrısı, baş dönmesi veya olağandışı rahatsızlık hissederseniz hareketi
              durdurup bir hekime ya da fizyoterapiste danışın.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {/* Marka ve Açıklama */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-400 text-slate-950">
                  <Dumbbell className="h-5 w-5 stroke-[2.5]" />
                </div>
                <span className="font-['Space_Grotesk'] text-lg font-bold text-white">
                  HAREKET
                </span>
              </Link>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-400">
                Kas grubuna, ekipmana ve seviyeye göre {EXERCISES.length} temel egzersizi adım adım
                form rehberi, çalışan birincil/ikincil kas diyagramları ve güvenli alternatiflerle
                sunan Türkçe egzersiz kütüphanesi.
              </p>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                <span className="font-bold text-slate-200">İletişim (Yer Tutucu):</span>{' '}
                <span className="text-slate-400">
                  iletisim@hareket-rehberi.ornek (Kurumsal iletişim adresi yapılandırma alanı)
                </span>
              </div>
            </div>

            {/* Kas Grupları */}
            <div>
              <h3 className="mb-3 text-xs font-extrabold tracking-wider text-white uppercase">
                Kas Grupları
              </h3>
              <ul className="space-y-1.5 text-xs">
                {MUSCLE_GROUPS.map((m) => (
                  <li key={m.id}>
                    <Link
                      to={`/kas-gruplari/${m.slug}`}
                      className="transition hover:text-lime-400"
                    >
                      {m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ekipmanlar */}
            <div>
              <h3 className="mb-3 text-xs font-extrabold tracking-wider text-white uppercase">
                Ekipmanlar
              </h3>
              <ul className="space-y-1.5 text-xs">
                {EQUIPMENTS.map((eq) => (
                  <li key={eq.id}>
                    <Link
                      to={`/ekipmanlar/${eq.slug}`}
                      className="transition hover:text-lime-400"
                    >
                      {eq.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sayfalar ve Yasal */}
            <div>
              <h3 className="mb-3 text-xs font-extrabold tracking-wider text-white uppercase">
                Keşfet &amp; Bilgi
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/hareketler" className="transition hover:text-lime-400">
                    Tüm Hareketler ({EXERCISES.length})
                  </Link>
                </li>
                <li>
                  <Link to="/favorilerim" className="transition hover:text-lime-400">
                    Favorilerim
                  </Link>
                </li>
                <li>
                  <Link to="/kaynaklar" className="transition hover:text-lime-400">
                    Bilimsel Kaynaklar &amp; Metodoloji
                  </Link>
                </li>
                <li>
                  <Link to="/gizlilik" className="transition hover:text-lime-400">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link to="/kullanim-kosullari" className="transition hover:text-lime-400">
                    Kullanım Koşulları
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} HAREKET — Türkçe Egzersiz ve Kas Rehberi.</p>
            <p>Favorileriniz yalnızca kendi tarayıcınızda (localStorage) saklanır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
