import { Link } from 'react-router-dom'
import { ArrowUpRight, Bookmark, Dumbbell, Home, Building2 } from 'lucide-react'
import type { Exercise } from '../types/fitness'
import { EQUIPMENT_MAP } from '../data/equipment'
import { LEVEL_LABELS } from '../data/exercises'
import { MUSCLE_GROUP_MAP } from '../data/muscleGroups'
import { useAppStore } from '../hooks/useAppStore'
import { ExerciseAnimator } from './ExerciseAnimator'

interface ExerciseCardProps {
  exercise: Exercise
  highlightSecondaryMatch?: boolean
}

export function ExerciseCard({ exercise, highlightSecondaryMatch = false }: ExerciseCardProps) {
  const { isFavorite, toggleFavorite, lastToggledSlug } = useAppStore()
  const fav = isFavorite(exercise.slug)
  const isJustAdded = lastToggledSlug === exercise.slug && fav

  const primaryGroup = MUSCLE_GROUP_MAP[exercise.primaryMuscleGroup]
  const bothEnvs =
    exercise.environments.includes('ev') && exercise.environments.includes('salon')

  const levelBadgeClass =
    exercise.level === 'baslangic'
      ? 'border-emerald-400/35 bg-emerald-400/10 text-emerald-300'
      : exercise.level === 'orta'
        ? 'border-sky-400/35 bg-sky-400/10 text-sky-300'
        : 'border-amber-400/40 bg-amber-400/15 text-amber-300'

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121521] p-4 shadow-lg transition duration-200 hover:-translate-y-1 hover:border-lime-400/45 hover:shadow-lime-400/5">
      <div>
        {/* Üst Görsel / Kinematik Önizleme + Favori Butonu */}
        <div className="relative mb-3.5">
          <Link
            to={`/hareketler/${exercise.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className="block overflow-hidden rounded-xl focus:outline-none"
          >
            <ExerciseAnimator
              meta={exercise.animation}
              primaryMuscleGroup={exercise.primaryMuscleGroup}
              compact
            />
          </Link>

          {/* Sol Üst Kas Grubu Rozeti */}
          <div className="pointer-events-none absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            <span className="rounded-lg border border-lime-400/40 bg-slate-950/85 px-2.5 py-1 text-[11px] font-bold text-lime-300 backdrop-blur-sm">
              {primaryGroup?.name}
            </span>
            {highlightSecondaryMatch && (
              <span className="rounded-lg border border-sky-400/40 bg-slate-950/85 px-2 py-1 text-[10px] font-semibold text-sky-300 backdrop-blur-sm">
                İkincil Kas Eşleşmesi
              </span>
            )}
          </div>

          {/* Sağ Üst Favori Butonu */}
          <button
            type="button"
            onClick={() => toggleFavorite(exercise.slug)}
            aria-pressed={fav}
            aria-label={
              fav
                ? `${exercise.trName} hareketini favorilerden çıkar`
                : `${exercise.trName} hareketini favorilere ekle`
            }
            className={`absolute top-2.5 right-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border transition focus:ring-2 focus:ring-lime-400 focus:outline-none ${
              fav
                ? 'border-lime-400 bg-lime-400 text-slate-950 shadow-md shadow-lime-400/20'
                : 'border-white/15 bg-slate-950/80 text-slate-300 hover:border-lime-400/50 hover:text-white'
            } ${isJustAdded ? 'scale-110' : 'scale-100'}`}
          >
            <Bookmark className={`h-4 w-4 ${fav ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Seviye ve Ortam Rozetleri */}
        <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
          <span className={`rounded-md border px-2 py-0.5 ${levelBadgeClass}`}>
            {LEVEL_LABELS[exercise.level]}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300">
            {bothEnvs ? (
              <>
                <Home className="h-3 w-3 text-lime-400" />
                <span>Ev &amp; Salon</span>
              </>
            ) : exercise.environments.includes('ev') ? (
              <>
                <Home className="h-3 w-3 text-lime-400" />
                <span>Ev Uygun</span>
              </>
            ) : (
              <>
                <Building2 className="h-3 w-3 text-sky-400" />
                <span>Spor Salonu</span>
              </>
            )}
          </span>
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-slate-400">
            {exercise.subRegionTag}
          </span>
        </div>

        {/* Hareket Başlığı (Türkçe + İngilizce) */}
        <h3 className="text-lg font-extrabold tracking-tight text-white transition group-hover:text-lime-300">
          <Link
            to={`/hareketler/${exercise.slug}`}
            className="focus:underline focus:outline-none"
          >
            {exercise.trName}
          </Link>
        </h3>
        <p className="text-xs font-semibold text-slate-400">{exercise.enName}</p>

        {/* Kısa Açıklama */}
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-300">
          {exercise.shortDescription}
        </p>
      </div>

      {/* Alt Bölüm: Tüm Gerekli Ekipmanlar + Detay Bağlantısı */}
      <div className="mt-4 border-t border-white/10 pt-3">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <Dumbbell className="h-3.5 w-3.5 shrink-0 text-lime-400" aria-hidden="true" />
          <span className="sr-only">Gerekli Ekipmanlar:</span>
          {exercise.equipment.map((eqId) => (
            <span
              key={eqId}
              className="rounded-md border border-white/10 bg-slate-900 px-2 py-0.5 text-[11px] font-medium text-slate-200"
            >
              {EQUIPMENT_MAP[eqId]?.name}
            </span>
          ))}
        </div>

        <Link
          to={`/hareketler/${exercise.slug}`}
          className="inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-bold text-white transition group-hover:border-lime-400/50 group-hover:bg-lime-400 group-hover:text-slate-950 focus:ring-2 focus:ring-lime-400 focus:outline-none"
        >
          <span>Detayları İncele</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  )
}
