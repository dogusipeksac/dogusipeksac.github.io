import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const FAVORITES_STORAGE_KEY = 'hareket_favoriler_v1'
const THEME_STORAGE_KEY = 'hareket_tema_v1'

interface AppStoreContextValue {
  favorites: string[]
  isFavorite: (slug: string) => boolean
  toggleFavorite: (slug: string) => void
  clearFavorites: () => void
  lastToggledSlug: string | null
  theme: 'dark' | 'light'
  toggleTheme: () => void
  prefersReducedMotion: boolean
}

const AppStoreContext = createContext<AppStoreContextValue | null>(null)

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
    } catch {
      return []
    }
  })

  const [lastToggledSlug, setLastToggledSlug] = useState<string | null>(null)

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      return saved === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // localStorage erişimi kısıtlıysa sessizce devam et
    }
  }, [favorites])

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // ignore
    }
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
    }
  }, [theme])

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites])

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((item) => item !== slug)
      }
      setLastToggledSlug(slug)
      return [...prev, slug]
    })
  }, [])

  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      clearFavorites,
      lastToggledSlug,
      theme,
      toggleTheme,
      prefersReducedMotion,
    }),
    [
      favorites,
      isFavorite,
      toggleFavorite,
      clearFavorites,
      lastToggledSlug,
      theme,
      toggleTheme,
      prefersReducedMotion,
    ]
  )

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
}

export function useAppStore(): AppStoreContextValue {
  const ctx = useContext(AppStoreContext)
  if (!ctx) {
    throw new Error('useAppStore, AppStoreProvider içinde kullanılmalıdır.')
  }
  return ctx
}
