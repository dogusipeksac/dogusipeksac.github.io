import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Building2,
  Dumbbell,
  Home,
  Info,
  Layers,
  Target,
} from 'lucide-react'
import type {
  DifficultyLevel,
  EquipmentId,
  MuscleGroupId,
} from '../types/fitness'
import { EQUIPMENTS } from '../data/equipment'
import {
  getExercisesByMuscleGroup,
  LEVEL_LABELS,
  MOVEMENT_PATTERN_LABELS,
} from '../data/exercises'
import { MUSCLE_GROUP_MAP } from '../data/muscleGroups'
import { BodyDiagram } from '../components/BodyDiagram'
import { ExerciseCard } from '../components/ExerciseCard'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function MuscleGroupDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const muscle = slug ? MUSCLE_GROUP_MAP[slug as MuscleGroupId] : undefined

  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentId | 'all'>('all')
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all')
  const [selectedEnv, setSelectedEnv] = useState<'all' | 'ev' | 'salon' | 'ev-ekipmansiz'>('all')
  const [includeSecondary, setIncludeSecondary] = useState<boolean>(false)

  useDocumentMeta(
    muscle
      ? `${muscle.name} Hareketleri — Evde, Dumbbell ve Barbell ile ${muscle.name} Egzersizleri`
      : 'Kas Grubu Bulunamadı',
    muscle?.anatomicalOverview
  )

  const allPrimaryExercises = useMemo(
    () => (muscle ? getExercisesByMuscleGroup(muscle.id, false) : []),
    [muscle]
  )

  const allExercisesForMuscle = useMemo(
    () => (muscle ? getExercisesByMuscleGroup(muscle.id, includeSecondary) : []),
    [muscle, includeSecondary]
  )

  const filteredExercises = useMemo(() => {
    return allExercisesForMuscle.filter((ex) => {
      if (selectedEquipment !== 'all' && !ex.equipment.includes(selectedEquipment)) {
        return false
      }
      if (selectedLevel !== 'all' && ex.level !== selectedLevel) {
        return false
      }
      if (selectedEnv === 'ev' && !ex.environments.includes('ev')) {
        return false
      }
      if (selectedEnv === 'salon' && !ex.environments.includes('salon')) {
        return false
      }
      if (
        selectedEnv === 'ev-ekipmansiz' &&
        (!ex.environments.includes('ev') || !ex.equipment.includes('vucut-agirligi'))
      ) {
        return false
      }
      return true
    })
  }, [allExercisesForMuscle, selectedEquipment, selectedLevel, selectedEnv])

  if (!muscle) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
          Kas grubu bulunamadı
        </h1>
        <Link
          to="/kas-gruplari"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-lime-400 px-6 py-3 text-sm font-extrabold text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kas Gruplarına Dön</span>
        </Link>
      </div>
    )
  }

  // Ekipman bazlı gruplama (Ev/Vücut Ağırlığı, Dumbbell, Barbell, Kablo/Bant/Makine)
  const bodyweightGroup = allPrimaryExercises.filter((ex) =>
    ex.equipment.includes('vucut-agirligi')
  )
  const dumbbellGroup = allPrimaryExercises.filter((ex) =>
    ex.equipment.includes('dumbbell')
  )
  const barbellGroup = allPrimaryExercises.filter((ex) =>
    ex.equipment.includes('barbell')
  )
  const cableBandMachineGroup = allPrimaryExercises.filter(
    (ex) =>
      ex.equipment.includes('kablo-makinesi') ||
      ex.equipment.includes('direnc-bandi') ||
      ex.equipment.includes('spor-salonu-makineleri') ||
      ex.equipment.includes('kettlebell')
  )

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
      {/* Üst Gezinme */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <Link
          to="/kas-gruplari"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-bold text-slate-200 hover:border-lime-400/40 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kas Grupları</span>
        </Link>
        <span>/</span>
        <span className="font-bold text-white">{muscle.name}</span>
      </div>

      {/* Üst Hero: Anatomik Açıklama + Şematik Vücut Görseli */}
      <header className="mb-10 grid grid-cols-1 items-center gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#131726] via-[#0e111c] to-[#121623] p-6 sm:p-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-lime-400/40 bg-lime-400/15 px-3 py-1 text-lime-300">
              <Target className="h-3.5 w-3.5" />
              <span>{allPrimaryExercises.length} Birincil Hareket</span>
            </span>
            {muscle.relatedCategories.map((cat) => (
              <span
                key={cat}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-slate-300"
              >
                Kategori: {MOVEMENT_PATTERN_LABELS[cat]}
              </span>
            ))}
          </div>

          <h1 className="mt-4 font-['Space_Grotesk'] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {muscle.name} Hareketleri ve Anatomisi
          </h1>
          <p className="mt-1 text-sm font-semibold text-lime-400">{muscle.latinName}</p>

          <p className="mt-4 text-sm leading-relaxed text-slate-200">
            {muscle.anatomicalOverview}
          </p>

          <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-lime-400/25 bg-lime-400/[0.06] p-4 text-xs leading-relaxed text-slate-200">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" />
            <div>
              <strong className="font-bold text-lime-300">Programlama İpucu:</strong>{' '}
              {muscle.trainingTip}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <BodyDiagram
            primaryGroups={[muscle.id]}
            initialView={muscle.bodySide === 'both' ? 'both' : muscle.bodySide}
            compact
          />
        </div>
      </header>

      {/* Anatomik Alt Bölgeler (Örn. Omuz için Ön, Orta ve Arka Omuz Ayrımı) */}
      <section className="mb-12" aria-labelledby="alt-bolgeler-baslik">
        <div className="mb-5">
          <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
            Bölgesel Kas Mekaniği
          </span>
          <h2
            id="alt-bolgeler-baslik"
            className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-white"
          >
            {muscle.name} Alt Bölgeleri ve Hedefleme Farkları
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Bir hareketin {muscle.name.toLocaleLowerCase('tr-TR')} grubuyla ilişkili olması tüm alt
            bölgeleri eşit çalıştırdığı anlamına gelmez:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {muscle.subRegions.map((sub) => (
            <div
              key={sub.id}
              className="rounded-2xl border border-white/10 bg-[#121521] p-5"
            >
              <h3 className="text-base font-extrabold text-white">{sub.name}</h3>
              <p className="text-[11px] font-semibold text-lime-400">
                {sub.anatomicalName}
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-300">
                {sub.roleSummary}
              </p>
              <div className="mt-3 border-t border-white/10 pt-2.5 text-[11px] text-slate-400">
                <strong className="text-slate-200">Örnek Hareketler:</strong>{' '}
                {sub.exampleMovementTypes}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ekipman Kategorilerine Göre Hızlı Rehber Özeti */}
      <section className="mb-12 rounded-3xl border border-white/10 bg-[#11141f] p-6 sm:p-8">
        <div className="mb-6">
          <span className="text-xs font-extrabold tracking-widest text-sky-400 uppercase">
            Ekipmana Göre Seçim Rehberi
          </span>
          <h2 className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-white">
            Farklı Ekipmanlarla {muscle.name} Hareketleri
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* A) Evde / Vücut Ağırlığıyla */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-lime-300">
              <Home className="h-4 w-4" />
              <span>Evde / Vücut Ağırlığıyla</span>
            </div>
            {bodyweightGroup.length > 0 ? (
              <ul className="space-y-1.5 text-xs">
                {bodyweightGroup.map((ex) => (
                  <li key={ex.id}>
                    <Link
                      to={`/hareketler/${ex.slug}`}
                      className="font-bold text-white hover:text-lime-300 hover:underline"
                    >
                      • {ex.trName} ({ex.enName})
                    </Link>
                    <span className="block pl-2.5 text-[11px] text-slate-400">
                      {ex.subRegionTag} · {LEVEL_LABELS[ex.level]}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">
                Bu bölge için dambıl veya direnç bandı kullanılması önerilir.
              </p>
            )}
          </div>

          {/* B) Dumbbell ile */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-sky-300">
              <Dumbbell className="h-4 w-4" />
              <span>Dumbbell (Dambıl) ile</span>
            </div>
            {dumbbellGroup.length > 0 ? (
              <ul className="space-y-1.5 text-xs">
                {dumbbellGroup.map((ex) => (
                  <li key={ex.id}>
                    <Link
                      to={`/hareketler/${ex.slug}`}
                      className="font-bold text-white hover:text-sky-300 hover:underline"
                    >
                      • {ex.trName} ({ex.enName})
                    </Link>
                    <span className="block pl-2.5 text-[11px] text-slate-400">
                      {ex.subRegionTag}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">
                Diğer ekipman gruplarındaki alternatifleri inceleyebilirsiniz.
              </p>
            )}
          </div>

          {/* C) Barbell ile */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-purple-300">
              <Layers className="h-4 w-4" />
              <span>Barbell (Halter Barı) ile</span>
            </div>
            {barbellGroup.length > 0 ? (
              <ul className="space-y-1.5 text-xs">
                {barbellGroup.map((ex) => (
                  <li key={ex.id}>
                    <Link
                      to={`/hareketler/${ex.slug}`}
                      className="font-bold text-white hover:text-purple-300 hover:underline"
                    >
                      • {ex.trName} ({ex.enName})
                    </Link>
                    <span className="block pl-2.5 text-[11px] text-slate-400">
                      {ex.subRegionTag}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">
                Bu kas grubunda vücut ağırlığı, dambıl veya kablo/makine hareketleri öne çıkar.
              </p>
            )}
          </div>

          {/* D) Kablo, Direnç Bandı veya Makine ile */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-amber-300">
              <Building2 className="h-4 w-4" />
              <span>Kablo, Bant &amp; Makine</span>
            </div>
            {cableBandMachineGroup.length > 0 ? (
              <ul className="space-y-1.5 text-xs">
                {cableBandMachineGroup.map((ex) => (
                  <li key={ex.id}>
                    <Link
                      to={`/hareketler/${ex.slug}`}
                      className="font-bold text-white hover:text-amber-300 hover:underline"
                    >
                      • {ex.trName} ({ex.enName})
                    </Link>
                    <span className="block pl-2.5 text-[11px] text-slate-400">
                      {ex.subRegionTag}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">
                Serbest ağırlık varyasyonlarını aşağıda filtreleyebilirsiniz.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Filtrelenebilir Hareket Kartları Bölümü */}
      <section aria-labelledby="kas-hareketleri-baslik">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#121521] p-4 sm:p-5">
          <div>
            <h2
              id="kas-hareketleri-baslik"
              className="font-['Space_Grotesk'] text-xl font-bold text-white"
            >
              {muscle.name} Hareketlerini Filtrele ({filteredExercises.length} Sonuç)
            </h2>
            <p className="text-xs text-slate-400">
              Ekipman, seviye ve çalışma ortamına göre daraltın
            </p>
          </div>

          {/* Filtre Kontrolleri */}
          <div className="flex flex-wrap items-center gap-2.5">
            <select
              aria-label="Ekipmana göre filtrele"
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value as EquipmentId | 'all')}
              className="rounded-xl border border-white/15 bg-slate-900 px-3 py-2 text-xs font-bold text-white focus:border-lime-400 focus:outline-none"
            >
              <option value="all">Tüm Ekipmanlar</option>
              {EQUIPMENTS.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.name}
                </option>
              ))}
            </select>

            <select
              aria-label="Seviyeye göre filtrele"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as DifficultyLevel | 'all')}
              className="rounded-xl border border-white/15 bg-slate-900 px-3 py-2 text-xs font-bold text-white focus:border-lime-400 focus:outline-none"
            >
              <option value="all">Tüm Seviyeler</option>
              <option value="baslangic">Başlangıç</option>
              <option value="orta">Orta</option>
              <option value="ileri">İleri</option>
            </select>

            <select
              aria-label="Ortama göre filtrele"
              value={selectedEnv}
              onChange={(e) =>
                setSelectedEnv(
                  e.target.value as 'all' | 'ev' | 'salon' | 'ev-ekipmansiz'
                )
              }
              className="rounded-xl border border-white/15 bg-slate-900 px-3 py-2 text-xs font-bold text-white focus:border-lime-400 focus:outline-none"
            >
              <option value="all">Ev &amp; Spor Salonu</option>
              <option value="ev-ekipmansiz">Evde (Ekipmansız)</option>
              <option value="ev">Evde Yapılabilecekler</option>
              <option value="salon">Spor Salonu</option>
            </select>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200">
              <input
                type="checkbox"
                checked={includeSecondary}
                onChange={(e) => setIncludeSecondary(e.target.checked)}
                className="h-3.5 w-3.5 accent-lime-400"
              />
              <span>İkincil Çalıştıranları da Göster</span>
            </label>
          </div>
        </div>

        {filteredExercises.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredExercises.map((ex) => (
              <ExerciseCard
                key={ex.id}
                exercise={ex}
                highlightSecondaryMatch={ex.primaryMuscleGroup !== muscle.id}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#121521] p-8 text-center">
            <p className="text-sm font-bold text-white">
              Bu filtre kombinasyonunda hareket bulunamadı.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedEquipment('all')
                setSelectedLevel('all')
                setSelectedEnv('all')
                setIncludeSecondary(true)
              }}
              className="mt-4 rounded-xl bg-lime-400 px-4 py-2 text-xs font-extrabold text-slate-950"
            >
              Filtreleri Sıfırla ve İkincil Kasları Dahil Et
            </button>
          </div>
        )}
      </section>

      {/* Diğer Kas Gruplarına Hızlı Geçiş */}
      <section className="mt-14 border-t border-white/10 pt-8">
        <h3 className="mb-3 text-xs font-extrabold tracking-wider text-slate-400 uppercase">
          Diğer Kas Gruplarını İncele
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.values(MUSCLE_GROUP_MAP).map((m) => (
            <Link
              key={m.id}
              to={`/kas-gruplari/${m.slug}`}
              className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                m.id === muscle.id
                  ? 'border-lime-400 bg-lime-400 text-slate-950'
                  : 'border-white/10 bg-[#121521] text-slate-300 hover:border-lime-400/40 hover:text-white'
              }`}
            >
              {m.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
