import { HashRouter, Route, Routes } from 'react-router-dom'
import { Shell } from './components/Shell'
import { Competitors } from './pages/Competitors'
import { Dashboard } from './pages/Dashboard'
import { Decisions } from './pages/Decisions'
import { Finance } from './pages/Finance'
import { Journal } from './pages/Journal'
import { Onboarding } from './pages/Onboarding'
import { ProductForm } from './pages/ProductForm'
import { Products } from './pages/Products'
import { StageDetail } from './pages/StageDetail'
import { Stages } from './pages/Stages'
import { Suppliers } from './pages/Suppliers'
import { useStore } from './state/store'

export function App() {
  const { state } = useStore()

  if (!state.profile.onboarded) return <Onboarding />

  return (
    <HashRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path="asamalar" element={<Stages />} />
          <Route path="asamalar/:id" element={<StageDetail />} />
          <Route path="urunler" element={<Products />} />
          <Route path="urunler/yeni" element={<ProductForm />} />
          <Route path="urunler/:id" element={<ProductForm />} />
          <Route path="rakipler" element={<Competitors />} />
          <Route path="tedarikciler" element={<Suppliers />} />
          <Route path="finans" element={<Finance />} />
          <Route path="gunluk" element={<Journal />} />
          <Route path="kararlar" element={<Decisions />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
