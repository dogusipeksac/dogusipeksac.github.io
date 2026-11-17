import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Target } from 'lucide-react'
import { getExercisesByMuscleGroup } from '../data/exercises'
import { MUSCLE_GROUPS } from '../data/muscleGroups'
import { BodyDiagram } from '../components/BodyDiagram'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function MuscleGroupsPage() {
  useDocumentMeta(
    'Kas Grupları Rehberi — 11 Anatomik Bölge ve Egzersizler',
    'Göğüs, sırt, omuz, biceps, triceps, ön kol, karın/core, kalça, ön bacak, arka bacak ve baldır kas gruplarının anatomisi ve egzersizleri.'
  )

  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
      <div className="mb-10 grid grid-cols-1 items-center gap-8 border-b border-white/10 pb-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
            Vücut Haritası &amp; Anatomi
          </span>
          <h1 className="mt-1 font-['Space_Grotesk'] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Kas Grupları Rehberi
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Her kas grubu kendi içinde farklı lif yönlerine ve görevlere sahip alt bölgelerden
            oluşur. Örneğin omuz çalışırken ön, orta (yan) ve arka deltoid bölgelerini dengeli
            hedeflemek hem kuvvet hem de eklem sağlığı için kritik önem taşır.
          </p>
        </div>

        <div className="lg:col-span-5">
          <BodyDiagram
            compact
            onSelectMuscle={(mId) => navigate(`/kas-gruplari/${mId}`)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MUSCLE_GROUPS.map((muscle) => {
          const primaryList = getExercisesByMuscleGroup(muscle.id, false)
          const allRelatedList = getExercisesByMuscleGroup(muscle.id, true)
          const secondaryCount = allRelatedList.length - primaryList.length

          return (
            <Link
              key={muscle.id}
              to={`/kas-gruplari/${muscle.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#121521] p-6 transition duration-200 hover:-translate-y-1 hover:border-lime-400/50"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-lime-400/35 bg-lime-400/10 px-3 py-1 text-xs font-extrabold text-lime-300">
                    <Target className="h-3.5 w-3.5" />
                    <span>{primaryList.length} Birincil Hareket</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    +{secondaryCount} İkincil Hareket
                  </span>
                </div>

                <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white group-hover:text-lime-300">
                  {muscle.name}
                </h2>
                <p className="text-xs font-semibold text-slate-400">{muscle.latinName}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-300">
                  {muscle.shortSummary}
                </p>

                <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3.5">
                  <span className="block text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                    Alt Bölgeler ve Görevleri:
                  </span>
                  {muscle.subRegions.map((sub) => (
                    <div
                      key={sub.id}
                      className="rounded-lg border border-white/5 bg-slate-950/50 px-2.5 py-1.5 text-xs"
                    >
                      <span className="font-bold text-slate-200">{sub.name}:</span>{' '}
                      <span className="text-slate-400">{sub.roleSummary}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-white transition group-hover:bg-lime-400 group-hover:text-slate-950">
                <span>{muscle.name} Rehberini ve Hareketleri Aç</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
