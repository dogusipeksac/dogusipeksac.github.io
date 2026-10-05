import { useState } from 'react'
import { useStore } from '../state/store'
import { Field, PrimaryButton, inputCls } from '../components/ui'
import { num } from '../lib/money'
import { PROJECT_NAME } from '../types'

const STATUSES = ['Henüz şirket yok', 'Şahıs şirketi', 'Limited şirket', 'Kararsızım']

export function Onboarding() {
  const { completeOnboarding } = useStore()
  const [budget, setBudget] = useState('')
  const [hours, setHours] = useState('')
  const [companyStatus, setCompanyStatus] = useState('')
  const [goal90, setGoal90] = useState('')
  const [error, setError] = useState('')

  const submit = () => {
    if (budget.trim() === '' || hours.trim() === '' || !companyStatus) {
      setError('Bütçe, haftalık süre ve şirket durumu senden gelmeli. Boş bırakılamaz.')
      return
    }
    completeOnboarding({
      budget: num(budget),
      weeklyHours: num(hours),
      companyStatus,
      goal90: goal90.trim(),
    })
  }

  return (
    <div className="mx-auto flex min-h-full max-w-lg flex-col justify-center px-4 py-16">
      <p className="text-[11px] font-medium tracking-[0.16em] text-neutral-400">AŞAMA 0</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">{PROJECT_NAME}</h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
        Panel kişisel rakam uydurmaz. Devam etmek için bütçeni, ayırabileceğin süreyi ve şirket
        durumunu sen yaz.
      </p>

      <div className="mt-8 space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
        <Field label="Başlangıç bütçesi (₺)">
          <input className={inputCls} inputMode="decimal" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Örn. 15000" />
        </Field>
        <Field label="Bu işe haftada ayıracağın saat">
          <input className={inputCls} inputMode="decimal" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Örn. 8" />
        </Field>
        <Field label="Şirket durumu">
          <select className={inputCls} value={companyStatus} onChange={(e) => setCompanyStatus(e.target.value)}>
            <option value="">Seç</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="90 günlük hedef (isteğe bağlı)">
          <textarea className={inputCls} rows={3} value={goal90} onChange={(e) => setGoal90(e.target.value)} placeholder="Kendi cümlen" />
        </Field>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <PrimaryButton onClick={submit}>Panele geç</PrimaryButton>
      </div>
    </div>
  )
}
