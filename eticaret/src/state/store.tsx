import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { loadState, saveState } from '../lib/storage'
import { uid } from '../lib/money'
import type {
  AppState,
  Competitor,
  Decision,
  Expense,
  Income,
  JournalEntry,
  Product,
  Supplier,
  TaskStatus,
} from '../types'

interface Store {
  state: AppState
  reset: () => void
  completeOnboarding: (input: {
    budget: number
    weeklyHours: number
    companyStatus: string
    goal90: string
  }) => void
  updateProfile: (patch: Partial<AppState['profile']>) => void
  setTaskStatus: (stageId: number, taskId: string, status: TaskStatus) => void
  setTaskNotes: (stageId: number, taskId: string, notes: string) => void
  updateStage: (stageId: number, patch: { notes?: string; outcome?: string }) => void
  addDocument: (stageId: number, title: string, note: string) => void
  completeStage: (stageId: number) => void
  saveProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  saveCompetitor: (row: Competitor) => void
  deleteCompetitor: (id: string) => void
  saveSupplier: (row: Supplier) => void
  deleteSupplier: (id: string) => void
  addExpense: (row: Omit<Expense, 'id'>) => void
  deleteExpense: (id: string) => void
  addIncome: (row: Omit<Income, 'id'>) => void
  deleteIncome: (id: string) => void
  addDecision: (row: Omit<Decision, 'id'>) => void
  deleteDecision: (id: string) => void
  addJournal: (row: Omit<JournalEntry, 'id'>) => void
  deleteJournal: (id: string) => void
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  const api = useMemo<Store>(() => {
    const patch = (fn: (prev: AppState) => AppState) => setState(fn)

    return {
      state,
      reset: () => {
        localStorage.removeItem('eticaret-os-v1')
        setState(loadState())
      },
      completeOnboarding: (input) =>
        patch((prev) => ({
          ...prev,
          profile: { ...prev.profile, ...input, onboarded: true },
          stages: prev.stages.map((s) =>
            s.id !== 0
              ? s
              : {
                  ...s,
                  tasks: s.tasks.map((t) => {
                    if (t.id === 's0-1' || t.id === 's0-2' || t.id === 's0-3') {
                      return { ...t, status: 'done' }
                    }
                    if (t.id === 's0-4' && input.goal90.trim()) return { ...t, status: 'done' }
                    return t
                  }),
                },
          ),
        })),
      updateProfile: (p) =>
        patch((prev) => ({ ...prev, profile: { ...prev.profile, ...p } })),
      setTaskStatus: (stageId, taskId, status) =>
        patch((prev) => ({
          ...prev,
          stages: prev.stages.map((s) =>
            s.id !== stageId
              ? s
              : {
                  ...s,
                  tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
                },
          ),
        })),
      setTaskNotes: (stageId, taskId, notes) =>
        patch((prev) => ({
          ...prev,
          stages: prev.stages.map((s) =>
            s.id !== stageId
              ? s
              : {
                  ...s,
                  tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, notes } : t)),
                },
          ),
        })),
      updateStage: (stageId, p) =>
        patch((prev) => ({
          ...prev,
          stages: prev.stages.map((s) => (s.id === stageId ? { ...s, ...p } : s)),
        })),
      addDocument: (stageId, title, note) =>
        patch((prev) => ({
          ...prev,
          stages: prev.stages.map((s) =>
            s.id === stageId
              ? { ...s, documents: [...s.documents, { id: uid(), title, note }] }
              : s,
          ),
        })),
      completeStage: (stageId) =>
        patch((prev) => {
          const stage = prev.stages.find((s) => s.id === stageId)
          if (!stage || stage.status !== 'CURRENT') return prev
          if (stage.tasks.some((t) => t.status !== 'done')) return prev
          return {
            ...prev,
            stages: prev.stages.map((s) => {
              if (s.id === stageId) return { ...s, status: 'COMPLETED' }
              if (s.id === stageId + 1 && s.status === 'LOCKED') return { ...s, status: 'CURRENT' }
              return s
            }),
          }
        }),
      saveProduct: (product) =>
        patch((prev) => {
          const exists = prev.products.some((p) => p.id === product.id)
          return {
            ...prev,
            products: exists
              ? prev.products.map((p) => (p.id === product.id ? product : p))
              : [...prev.products, product],
          }
        }),
      deleteProduct: (id) =>
        patch((prev) => ({
          ...prev,
          products: prev.products.filter((p) => p.id !== id),
          competitors: prev.competitors.filter((c) => c.productId !== id),
        })),
      saveCompetitor: (row) =>
        patch((prev) => {
          const exists = prev.competitors.some((c) => c.id === row.id)
          return {
            ...prev,
            competitors: exists
              ? prev.competitors.map((c) => (c.id === row.id ? row : c))
              : [...prev.competitors, row],
          }
        }),
      deleteCompetitor: (id) =>
        patch((prev) => ({
          ...prev,
          competitors: prev.competitors.filter((c) => c.id !== id),
        })),
      saveSupplier: (row) =>
        patch((prev) => {
          const exists = prev.suppliers.some((s) => s.id === row.id)
          return {
            ...prev,
            suppliers: exists
              ? prev.suppliers.map((s) => (s.id === row.id ? row : s))
              : [...prev.suppliers, row],
          }
        }),
      deleteSupplier: (id) =>
        patch((prev) => ({
          ...prev,
          suppliers: prev.suppliers.filter((s) => s.id !== id),
        })),
      addExpense: (row) =>
        patch((prev) => ({ ...prev, expenses: [...prev.expenses, { ...row, id: uid() }] })),
      deleteExpense: (id) =>
        patch((prev) => ({ ...prev, expenses: prev.expenses.filter((e) => e.id !== id) })),
      addIncome: (row) =>
        patch((prev) => ({ ...prev, incomes: [...prev.incomes, { ...row, id: uid() }] })),
      deleteIncome: (id) =>
        patch((prev) => ({ ...prev, incomes: prev.incomes.filter((e) => e.id !== id) })),
      addDecision: (row) =>
        patch((prev) => ({
          ...prev,
          decisions: [{ ...row, id: uid() }, ...prev.decisions],
        })),
      deleteDecision: (id) =>
        patch((prev) => ({ ...prev, decisions: prev.decisions.filter((d) => d.id !== id) })),
      addJournal: (row) =>
        patch((prev) => ({
          ...prev,
          journal: [{ ...row, id: uid() }, ...prev.journal],
        })),
      deleteJournal: (id) =>
        patch((prev) => ({ ...prev, journal: prev.journal.filter((j) => j.id !== id) })),
    }
  }, [state])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useStore(): Store {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('Store missing')
  return ctx
}
