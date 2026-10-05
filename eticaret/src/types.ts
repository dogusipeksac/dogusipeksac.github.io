export type StageStatus = 'LOCKED' | 'CURRENT' | 'COMPLETED'
export type TaskStatus = 'todo' | 'doing' | 'done'
export type Priority = 'high' | 'medium' | 'low'
export type RiskLevel = 'low' | 'mid' | 'high'
export type ExpenseCategory = 'stock' | 'ads' | 'sample' | 'packaging' | 'other'

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  estimateMinutes: number
  status: TaskStatus
  notes: string
}

export interface StageDocument {
  id: string
  title: string
  note: string
}

export interface Stage {
  id: number
  title: string
  summary: string
  adviceTitle: string
  advice: string
  focus: string
  status: StageStatus
  notes: string
  outcome: string
  documents: StageDocument[]
  tasks: Task[]
}

export interface ProductScores {
  demand: number
  profit: number
  competition: number
  startupRisk: number
  content: number
  brand: number
  shipping: number
  returns: number
}

export interface Product {
  id: string
  name: string
  category: string
  supplier: string
  buyPrice: number
  sellPrice: number
  shipping: number
  commission: number
  ads: number
  packaging: number
  competitorCount: number
  competitorPrice: number
  reviewCount: number
  scores: ProductScores
  risk: RiskLevel
  notes: string
}

export interface Competitor {
  id: string
  productId: string
  name: string
  platform: string
  price: number
  reviewCount: number
  rating: number
  advantage: string
  disadvantage: string
  complaints: string
  link: string
  notes: string
}

export interface Supplier {
  id: string
  company: string
  contact: string
  product: string
  unitPrice: number
  moq: string
  shipping: string
  samplePrice: number
  branding: string
  leadTime: string
  trust: RiskLevel
  notes: string
}

export interface Expense {
  id: string
  date: string
  category: ExpenseCategory
  amount: number
  note: string
  stageId: number | null
}

export interface Income {
  id: string
  date: string
  amount: number
  note: string
}

export interface Decision {
  id: string
  date: string
  decision: string
  reason: string
}

export interface JournalEntry {
  id: string
  date: string
  did: string
  learned: string
  spent: number
  decided: string
  next: string
}

export interface Profile {
  onboarded: boolean
  projectName: string
  budget: number | null
  weeklyHours: number | null
  companyStatus: string
  goal90: string
}

export interface AppState {
  version: 1
  profile: Profile
  stages: Stage[]
  products: Product[]
  competitors: Competitor[]
  suppliers: Supplier[]
  expenses: Expense[]
  incomes: Income[]
  decisions: Decision[]
  journal: JournalEntry[]
}

export const PROJECT_NAME = 'Araba Aksesuarları E-Ticaret Girişimi'

export const SCORE_LIMITS = {
  demand: 20,
  profit: 20,
  competition: 15,
  startupRisk: 15,
  content: 10,
  brand: 10,
  shipping: 5,
  returns: 5,
} as const

export const EXPENSE_LABELS: Record<ExpenseCategory, string> = {
  stock: 'Stok',
  ads: 'Reklam',
  sample: 'Numune',
  packaging: 'Ambalaj',
  other: 'Diğer',
}
