import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Dumbbell } from 'lucide-react'
import { EQUIPMENTS } from '../data/equipment'
import { getExercisesByEquipment } from '../data/exercises'
import { MUSCLE_GROUP_MAP } from '../data/muscleGroups'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function EquipmentsPage() {
  useDocumentMeta(
    'Ekipman Rehberi — Vücut Ağırlığı, Dumbbell, Barbell, Kablo ve Makineler',
    'Spor ekipmanlarının kullanım alanları, uygun olduğu kas grupları, güvenlik notları ve ekipmana göre hareket listeleri.'
  )

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
      <div className="mb-10 border-b border-white/10 pb-8">
        <span className="text-xs font-extrabold tracking-widest text-sky-400 uppercase">
          Donanım &amp; İstasyon Rehberi
        </span>
        <h1 className="mt-1 font-['Space_Grotesk'] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Ekipman Kategorileri
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          Elinizdeki ekipmana göre hangi kas gruplarını nasıl çalıştırabileceğinizi inceleyin.
          Birden fazla ekipman gerektiren hareketlerde (örneğin Dumbbell + Bench / Sehpa) tüm
          gerekli ekipmanlar hareket kartlarında açıkça belirtilmiştir.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {EQUIPMENTS.map((eq) => {
          const exercises = getExercisesByEquipment(eq.id)
          return (
            <Link
              key={eq.id}
              to={`/ekipmanlar/${eq.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#121521] p-6 transition duration-200 hover:-translate-y-1 hover:border-sky-400/50"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300">
                    <Dumbbell className="h-5 w-5" />
                  </span>
                  <span className="rounded-xl border border-sky-400/35 bg-sky-400/10 px-3 py-1 text-xs font-extrabold text-sky-300">
                    {exercises.length} Hareket
                  </span>
                </div>

                <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white group-hover:text-sky-300">
                  {eq.name}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {eq.description}
                </p>

                <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3.5">
                  <span className="block text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                    Başlıca Kullanım Alanları:
                  </span>
                  {eq.usageAreas.slice(0, 2).map((area) => (
                    <div key={area} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime-400" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {eq.suitableMuscles.slice(0, 6).map((mId) => (
                    <span
                      key={mId}
                      className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-slate-300"
                    >
                      {MUSCLE_GROUP_MAP[mId]?.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-white transition group-hover:bg-sky-400 group-hover:text-slate-950">
                <span>{eq.name} Hareketlerini İncele</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
