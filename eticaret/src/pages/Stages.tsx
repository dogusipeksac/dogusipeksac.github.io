import { Link } from 'react-router-dom'
import { Card, StatusPill } from '../components/ui'
import { useStore } from '../state/store'

export function Stages() {
  const { state } = useStore()

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Aşamalar</h1>
        <p className="mt-1 text-sm text-neutral-500">Bir aşama bitmeden sonraki açılmaz.</p>
      </header>
      <div className="space-y-2">
        {state.stages.map((s) => {
          const done = s.tasks.filter((t) => t.status === 'done').length
          return (
            <Link key={s.id} to={`/asamalar/${s.id}`} className="block">
              <Card className={s.status === 'LOCKED' ? 'opacity-70' : ''}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-neutral-400">Aşama {s.id}</p>
                    <h2 className="mt-0.5 font-semibold">{s.title}</h2>
                    <p className="mt-1 text-sm text-neutral-500">{done}/{s.tasks.length} görev</p>
                  </div>
                  <StatusPill status={s.status} />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
