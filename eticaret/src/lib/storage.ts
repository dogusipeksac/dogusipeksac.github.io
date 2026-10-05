import { createInitialState } from '../data/seed'
import type { AppState } from '../types'

const KEY = 'eticaret-os-v1'

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return createInitialState()
    const parsed = JSON.parse(raw) as AppState
    if (parsed?.version !== 1 || !Array.isArray(parsed.stages)) return createInitialState()
    return parsed
  } catch {
    return createInitialState()
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(KEY, JSON.stringify(state))
}
