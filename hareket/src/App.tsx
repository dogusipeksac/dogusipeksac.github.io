import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'

const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
)
const ExercisesPage = lazy(() =>
  import('./pages/ExercisesPage').then((m) => ({ default: m.ExercisesPage }))
)
const ExerciseDetailPage = lazy(() =>
  import('./pages/ExerciseDetailPage').then((m) => ({ default: m.ExerciseDetailPage }))
)
const MuscleGroupsPage = lazy(() =>
  import('./pages/MuscleGroupsPage').then((m) => ({ default: m.MuscleGroupsPage }))
)
const MuscleGroupDetailPage = lazy(() =>
  import('./pages/MuscleGroupDetailPage').then((m) => ({ default: m.MuscleGroupDetailPage }))
)
const EquipmentsPage = lazy(() =>
  import('./pages/EquipmentsPage').then((m) => ({ default: m.EquipmentsPage }))
)
const EquipmentDetailPage = lazy(() =>
  import('./pages/EquipmentDetailPage').then((m) => ({ default: m.EquipmentDetailPage }))
)
const FavoritesPage = lazy(() =>
  import('./pages/FavoritesPage').then((m) => ({ default: m.FavoritesPage }))
)
const SourcesPage = lazy(() =>
  import('./pages/InfoPages').then((m) => ({ default: m.SourcesPage }))
)
const PrivacyPage = lazy(() =>
  import('./pages/InfoPages').then((m) => ({ default: m.PrivacyPage }))
)
const TermsPage = lazy(() =>
  import('./pages/InfoPages').then((m) => ({ default: m.TermsPage }))
)
const NotFoundPage = lazy(() =>
  import('./pages/InfoPages').then((m) => ({ default: m.NotFoundPage }))
)

function SmartRouter({ children }: { children: ReactNode }) {
  const isStaticSubpath =
    typeof window !== 'undefined' &&
    (window.location.pathname.startsWith('/hareket') ||
      window.location.hostname.includes('dogusipeksac.com') ||
      window.location.hostname.includes('github.io'))

  if (isStaticSubpath) {
    return <HashRouter>{children}</HashRouter>
  }
  return <BrowserRouter>{children}</BrowserRouter>
}

function PageLoader() {
  return (
    <div
      className="mx-auto flex max-w-7xl items-center justify-center px-4 py-24"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#121521] px-5 py-3 text-xs font-bold text-slate-300">
        <span className="h-3 w-3 animate-ping rounded-full bg-lime-400" />
        <span>Sayfa yükleniyor...</span>
      </div>
    </div>
  )
}

export function App() {
  return (
    <SmartRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="hareketler" element={<ExercisesPage />} />
            <Route path="hareketler/:slug" element={<ExerciseDetailPage />} />
            <Route path="kas-gruplari" element={<MuscleGroupsPage />} />
            <Route path="kas-gruplari/:slug" element={<MuscleGroupDetailPage />} />
            <Route path="ekipmanlar" element={<EquipmentsPage />} />
            <Route path="ekipmanlar/:slug" element={<EquipmentDetailPage />} />
            <Route path="favorilerim" element={<FavoritesPage />} />
            <Route path="kaynaklar" element={<SourcesPage />} />
            <Route path="gizlilik" element={<PrivacyPage />} />
            <Route path="kullanim-kosullari" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </SmartRouter>
  )
}
