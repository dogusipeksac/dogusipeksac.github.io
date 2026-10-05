import { Link } from 'react-router-dom'
import { Card } from '../components/ui'
import { money } from '../lib/money'
import { currentStage, nextStage, progress, todayTasks } from '../state/selectors'
import { useStore } from '../state/store'

export function Dashboard() {
  const { state, setTaskStatus } = useStore()
  const stage = currentStage(state)
  const upcoming = nextStage(state)
  const { percent, done, total } = progress(state)
  const focusTask = stage.tasks.find((t) => t.status !== 'done')
  const today = todayTasks(state)
  const { profile } = state

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] font-medium tracking-[0.16em] text-neutral-400">PROJE</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{profile.projectName}</h1>
        <div className="mt-4 flex items-end justify-between gap-4">
          <p className="text-3xl font-semibold tabular-nums">{percent}%</p>
          <p className="text-xs text-neutral-500">{done}/{total} görev</p>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200">
          <div className="h-full rounded-full bg-neutral-900" style={{ width: `${percent}%` }} />
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="text-[11px] font-medium tracking-[0.14em] text-neutral-400">MEVCUT AŞAMA</p>
          <h2 className="mt-2 text-lg font-semibold">Aşama {stage.id} — {stage.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">Şu anda yapman gereken: {stage.summary}</p>
          <Link to={`/asamalar/${stage.id}`} className="mt-4 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4">
            Aşamayı aç
          </Link>
        </Card>

        <Card className="bg-neutral-900 text-white">
          <p className="text-[11px] font-medium tracking-[0.14em] text-neutral-400">ŞİMDİ BUNU YAP</p>
          <h2 className="mt-2 text-lg font-semibold">
            {focusTask ? focusTask.title : 'Bu aşamadaki görevler bitti'}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            {focusTask ? focusTask.description : 'Aşamayı tamamlayıp bir sonrakine geçebilirsin.'}
          </p>
          <Link
            to={`/asamalar/${stage.id}`}
            className="mt-5 inline-block rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-neutral-900"
          >
            Göreve başla
          </Link>
        </Card>
      </div>

      <Card>
        <p className="text-[11px] font-medium tracking-[0.14em] text-neutral-400">ŞU ANDA NE YAPMALIYIM?</p>
        <h2 className="mt-2 text-lg font-semibold">{stage.adviceTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{stage.advice}</p>
        <p className="mt-3 text-sm text-neutral-800">{stage.focus}</p>
      </Card>

      <Card>
        <h2 className="text-base font-semibold">Bugün</h2>
        <p className="mt-1 text-sm text-neutral-500">
          {today.length === 0
            ? 'Bugün için açık görev kalmadı.'
            : `Bugün yapman gereken ${today.length} görev`}
        </p>
        <ul className="mt-4 space-y-2">
          {today.map((t, i) => (
            <li key={t.id} className="flex items-start gap-3 rounded-xl border border-neutral-100 px-3 py-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={false}
                onChange={() => setTaskStatus(stage.id, t.id, 'done')}
              />
              <div>
                <p className="text-sm font-medium">{i + 1}. {t.title}</p>
                <p className="text-xs text-neutral-500">{t.estimateMinutes} dk · {t.priority === 'high' ? 'Yüksek' : t.priority === 'medium' ? 'Orta' : 'Düşük'}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-xs text-neutral-500">Bütçe</p>
          <p className="mt-1 text-lg font-semibold">{profile.budget == null ? '—' : money(profile.budget)}</p>
        </Card>
        <Card>
          <p className="text-xs text-neutral-500">Haftalık süre</p>
          <p className="mt-1 text-lg font-semibold">{profile.weeklyHours == null ? '—' : `${profile.weeklyHours} sa`}</p>
        </Card>
        <Card>
          <p className="text-xs text-neutral-500">Şirket</p>
          <p className="mt-1 text-lg font-semibold">{profile.companyStatus || '—'}</p>
        </Card>
      </div>

      {upcoming && (
        <p className="text-sm text-neutral-500">
          Sonraki aşama kilitli: <span className="text-neutral-800">Aşama {upcoming.id} — {upcoming.title}</span>
        </p>
      )}
    </div>
  )
}
