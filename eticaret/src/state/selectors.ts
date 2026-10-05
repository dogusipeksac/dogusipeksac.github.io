import type { AppState, Stage, Task } from '../types'

export function currentStage(state: AppState): Stage {
  return state.stages.find((s) => s.status === 'CURRENT') ?? state.stages[0]
}

export function nextStage(state: AppState): Stage | null {
  const current = currentStage(state)
  return state.stages.find((s) => s.id === current.id + 1) ?? null
}

export function openTasks(stage: Stage): Task[] {
  return stage.tasks.filter((t) => t.status !== 'done')
}

export function todayTasks(state: AppState): Task[] {
  return openTasks(currentStage(state)).slice(0, 3)
}

export function progress(state: AppState): { done: number; total: number; percent: number } {
  const tasks = state.stages.flatMap((s) => s.tasks)
  const done = tasks.filter((t) => t.status === 'done').length
  const total = tasks.length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)
  return { done, total, percent }
}

export function stageReady(stage: Stage): boolean {
  return stage.tasks.every((t) => t.status === 'done')
}
