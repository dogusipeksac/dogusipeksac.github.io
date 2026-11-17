import { useState } from 'react'
import type { MuscleGroupId } from '../types/fitness'
import { MUSCLE_GROUP_MAP } from '../data/muscleGroups'

interface BodyDiagramProps {
  primaryGroups?: MuscleGroupId[]
  secondaryGroups?: MuscleGroupId[]
  onSelectMuscle?: (muscleId: MuscleGroupId) => void
  initialView?: 'both' | 'front' | 'back'
  compact?: boolean
}

interface RegionShape {
  muscleId: MuscleGroupId
  label: string
  d: string
}

const FRONT_REGIONS: RegionShape[] = [
  // Omuz (Ön-Yan Deltoid)
  {
    muscleId: 'omuz',
    label: 'Ön ve Yan Omuz',
    d: 'M57 56 C46 58 40 67 42 79 C46 80 54 75 59 66 Z M143 56 C154 58 160 67 158 79 C154 80 146 75 141 66 Z',
  },
  // Göğüs (Pectoralis Major)
  {
    muscleId: 'gogus',
    label: 'Göğüs (Pectoralis)',
    d: 'M61 60 L98 62 L98 88 C82 91 66 86 59 75 Z M139 60 L102 62 L102 88 C118 91 134 86 141 75 Z',
  },
  // Biceps (Ön Kol Üstü)
  {
    muscleId: 'biceps',
    label: 'Biceps (Ön Üst Kol)',
    d: 'M42 81 C37 92 36 105 40 114 C46 114 51 103 53 84 Z M158 81 C163 92 164 105 160 114 C154 114 149 103 147 84 Z',
  },
  // Ön Kol (Forearm)
  {
    muscleId: 'on-kol',
    label: 'Ön Kol ve Kavrama',
    d: 'M38 117 C32 130 29 144 33 153 C39 152 44 138 47 119 Z M162 117 C168 130 171 144 167 153 C161 152 156 138 153 119 Z',
  },
  // Karın ve Core (Rectus Abdominis & Oblikler)
  {
    muscleId: 'karin-core',
    label: 'Karın ve Core',
    d: 'M66 90 L134 90 L129 146 C112 152 88 152 71 146 Z',
  },
  // Ön Bacak (Quadriceps)
  {
    muscleId: 'on-bacak',
    label: 'Ön Bacak (Quadriceps)',
    d: 'M66 152 L96 154 L93 220 C80 223 68 218 64 205 Z M134 152 L104 154 L107 220 C120 223 132 218 136 205 Z',
  },
  // Baldır Ön-Yan (Gastrocnemius / Tibialis)
  {
    muscleId: 'baldir',
    label: 'Baldır (Alt Bacak)',
    d: 'M67 228 L91 228 L88 282 L71 282 Z M133 228 L109 228 L112 282 L129 282 Z',
  },
]

const BACK_REGIONS: RegionShape[] = [
  // Arka Omuz
  {
    muscleId: 'omuz',
    label: 'Arka ve Yan Omuz',
    d: 'M58 55 C46 58 40 67 43 78 C49 78 56 72 61 63 Z M142 55 C154 58 160 67 157 78 C151 78 144 72 139 63 Z',
  },
  // Sırt (Trapez, Rhomboid, Kanat / Lat)
  {
    muscleId: 'sirt',
    label: 'Sırt (Kanat, Trapez ve Orta Sırt)',
    d: 'M62 56 L138 56 L132 136 L100 144 L68 136 Z',
  },
  // Triceps (Arka Kol)
  {
    muscleId: 'triceps',
    label: 'Triceps (Arka Kol)',
    d: 'M42 80 C37 92 36 106 41 115 C47 114 52 102 54 83 Z M158 80 C163 92 164 106 159 115 C153 114 148 102 146 83 Z',
  },
  // Ön Kol Arka (Ekstansörler)
  {
    muscleId: 'on-kol',
    label: 'Ön Kol ve Bilek Ekstansörleri',
    d: 'M38 117 C32 130 29 144 33 153 C39 152 44 138 47 119 Z M162 117 C168 130 171 144 167 153 C161 152 156 138 153 119 Z',
  },
  // Kalça (Gluteus Maximus & Medius)
  {
    muscleId: 'kalca',
    label: 'Kalça (Gluteus)',
    d: 'M66 139 L134 139 C139 154 137 172 128 179 L100 176 L72 179 C63 172 61 154 66 139 Z',
  },
  // Arka Bacak (Hamstring)
  {
    muscleId: 'arka-bacak',
    label: 'Arka Bacak (Hamstring)',
    d: 'M67 181 L96 180 L93 224 L69 224 Z M133 181 L104 180 L107 224 L131 224 Z',
  },
  // Baldır Arka (Gastrocnemius & Soleus)
  {
    muscleId: 'baldir',
    label: 'Baldır (Gastrocnemius & Soleus)',
    d: 'M67 229 C64 246 67 268 72 284 L88 284 C92 268 93 246 91 229 Z M133 229 C136 246 133 268 128 284 L112 284 C108 268 107 246 109 229 Z',
  },
]

export function BodyDiagram({
  primaryGroups = [],
  secondaryGroups = [],
  onSelectMuscle,
  initialView = 'both',
  compact = false,
}: BodyDiagramProps) {
  const [view, setView] = useState<'both' | 'front' | 'back'>(initialView)
  const [hoveredMuscle, setHoveredMuscle] = useState<MuscleGroupId | null>(null)

  const getRole = (id: MuscleGroupId): 'primary' | 'secondary' | 'none' => {
    if (primaryGroups.includes(id)) return 'primary'
    if (secondaryGroups.includes(id)) return 'secondary'
    return 'none'
  }

  const renderSilhouette = (side: 'front' | 'back', regions: RegionShape[]) => (
    <div className="flex flex-col items-center">
      <span className="mb-2 rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
        {side === 'front' ? 'Ön Görünüm' : 'Arka Görünüm'}
      </span>
      <svg
        viewBox="0 0 200 310"
        className={compact ? 'h-60 w-auto' : 'h-72 w-auto sm:h-80'}
        role="img"
        aria-label={
          side === 'front'
            ? 'Şematik insan vücudu ön kas diyagramı'
            : 'Şematik insan vücudu arka kas diyagramı'
        }
      >
        {/* Baş ve Boyun Silüeti */}
        <circle
          cx="100"
          cy="28"
          r="16"
          className="fill-slate-800/80 stroke-slate-600/70"
          strokeWidth="1.5"
        />
        <rect
          x="92"
          y="44"
          width="16"
          height="12"
          rx="4"
          className="fill-slate-800/80 stroke-slate-600/60"
          strokeWidth="1.2"
        />

        {/* Gövde Dış Konturu */}
        <path
          d="M58 55 L142 55 L162 82 L169 152 L152 155 L143 92 L135 148 L136 286 L110 286 L104 185 L96 185 L90 286 L64 286 L65 148 L57 92 L48 155 L31 152 L38 82 Z"
          className="fill-slate-900/90 stroke-slate-700/60"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Arka Görünüm Omurga Hattı */}
        {side === 'back' && (
          <line
            x1="100"
            y1="56"
            x2="100"
            y2="138"
            className="stroke-slate-700"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        )}

        {/* Kas Bölgeleri */}
        {regions.map((region) => {
          const role = getRole(region.muscleId)
          const isHovered = hoveredMuscle === region.muscleId
          const fillClass =
            role === 'primary'
              ? 'fill-lime-400/90 stroke-lime-200'
              : role === 'secondary'
                ? 'fill-sky-400/75 stroke-sky-200'
                : isHovered
                  ? 'fill-lime-400/45 stroke-lime-300'
                  : 'fill-slate-800/95 stroke-slate-600/80 hover:fill-slate-700'

          return (
            <path
              key={`${side}-${region.muscleId}`}
              d={region.d}
              tabIndex={0}
              role={onSelectMuscle ? 'button' : 'graphics-symbol'}
              aria-label={`${region.label} — ${
                role === 'primary'
                  ? 'Birincil çalışan kas'
                  : role === 'secondary'
                    ? 'İkincil çalışan kas'
                    : 'Kas bölgesi'
              }`}
              onMouseEnter={() => setHoveredMuscle(region.muscleId)}
              onMouseLeave={() => setHoveredMuscle(null)}
              onFocus={() => setHoveredMuscle(region.muscleId)}
              onBlur={() => setHoveredMuscle(null)}
              onClick={() => onSelectMuscle?.(region.muscleId)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && onSelectMuscle) {
                  e.preventDefault()
                  onSelectMuscle(region.muscleId)
                }
              }}
              className={`${fillClass} transition-colors duration-200 ${
                onSelectMuscle ? 'cursor-pointer' : 'cursor-help'
              } focus:outline-none`}
              strokeWidth={role !== 'none' || isHovered ? '1.8' : '1.1'}
            />
          )
        })}
      </svg>
    </div>
  )

  const activeInfo = hoveredMuscle ? MUSCLE_GROUP_MAP[hoveredMuscle] : null
  const activeRole = hoveredMuscle ? getRole(hoveredMuscle) : 'none'

  return (
    <div className="rounded-2xl border border-white/10 bg-[#11141f] p-4 sm:p-5">
      {/* Üst Kontroller: Görünüm Seçici ve Renk Anahtarı */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex rounded-xl border border-white/10 bg-slate-900/90 p-1"
          role="group"
          aria-label="Vücut görünümü seçici"
        >
          <button
            type="button"
            onClick={() => setView('both')}
            aria-pressed={view === 'both'}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              view === 'both'
                ? 'bg-lime-400 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Ön + Arka
          </button>
          <button
            type="button"
            onClick={() => setView('front')}
            aria-pressed={view === 'front'}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              view === 'front'
                ? 'bg-lime-400 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Yalnızca Ön
          </button>
          <button
            type="button"
            onClick={() => setView('back')}
            aria-pressed={view === 'back'}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              view === 'back'
                ? 'bg-lime-400 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Yalnızca Arka
          </button>
        </div>

        {/* Renk ve Sembol Anahtarı (Yalnızca renge bağlı kalmayan açıklama) */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="inline-block h-3 w-3 rounded-sm border border-lime-200 bg-lime-400" />
            <span>● Birincil Kas</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="inline-block h-3 w-3 rounded-sm border border-sky-200 bg-sky-400" />
            <span>◆ İkincil Kas</span>
          </span>
        </div>
      </div>

      {/* SVG Diyagram Alanı */}
      <div className="flex flex-wrap items-center justify-center gap-6 py-2 sm:gap-10">
        {(view === 'both' || view === 'front') && renderSilhouette('front', FRONT_REGIONS)}
        {(view === 'both' || view === 'back') && renderSilhouette('back', BACK_REGIONS)}
      </div>

      {/* Etkileşimli Bilgi Çubuğu (Hover / Dokunma / Odak Durumu) */}
      <div
        className="mt-3 min-h-[54px] rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2.5 text-xs"
        aria-live="polite"
      >
        {activeInfo ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-bold text-white">{activeInfo.name}</span>{' '}
              <span className="text-slate-400">({activeInfo.latinName})</span>
              <p className="mt-0.5 text-slate-300">{activeInfo.shortSummary}</p>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                activeRole === 'primary'
                  ? 'bg-lime-400/20 text-lime-300 border border-lime-400/40'
                  : activeRole === 'secondary'
                    ? 'bg-sky-400/20 text-sky-300 border border-sky-400/40'
                    : 'bg-white/10 text-slate-300'
              }`}
            >
              {activeRole === 'primary'
                ? '● Birincil Çalışan Bölge'
                : activeRole === 'secondary'
                  ? '◆ İkincil Yardımcı Bölge'
                  : onSelectMuscle
                    ? 'İncelemek için tıkla →'
                    : 'Diğer Bölge'}
            </span>
          </div>
        ) : (
          <p className="text-slate-400">
            Kas adını ve görevini görmek için diyagram üzerindeki bölgelerin üzerine gelin veya dokunun.{' '}
            <span className="text-slate-500">
              (Şematik gösterimdir; klinik anatomik kesinlik iddiası taşımaz.)
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
