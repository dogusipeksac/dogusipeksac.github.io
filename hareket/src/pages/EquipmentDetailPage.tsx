import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  Dumbbell,
  Home,
  ShieldAlert,
} from 'lucide-react'
import type {
  DifficultyLevel,
  EquipmentId,
  MuscleGroupId,
} from '../types/fitness'
import { EQUIPMENTS, EQUIPMENT_MAP } from '../data/equipment'
import { getExercisesByEquipment } from '../data/exercises'
import { MUSCLE_GROUPS, MUSCLE_GROUP_MAP } from '../data/muscleGroups'
import { ExerciseCard } from '../components/ExerciseCard'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function EquipmentDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const equipment = slug ? EQUIPMENT_MAP[slug as EquipmentId] : undefined

  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroupId | 'all'>('all')
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all')
  const [onlySingleEquipment, setOnlySingleEquipment] = useState<boolean>(false)

  useDocumentMeta(
    equipment
      ? `${equipment.name} Hareketleri — Kullanım Rehberi ve Egzersizler`
      : 'Ekipman Bulunamadı',
    equipment?.description
  )

  const allExercises = useMemo(
    () => (equipment ? getExercisesByEquipment(equipment.id) : []),
    [equipment]
  )

  const filteredExercises = useMemo(() => {
    return allExercises.filter((ex) => {
      if (selectedMuscle !== 'all' && ex.primaryMuscleGroup !== selectedMuscle) {
        return false
      }
      if (selectedLevel !== 'all' && ex.level !== selectedLevel) {
        return false
      }
      if (onlySingleEquipment && ex.equipment.length > 1) {
        return false
      }
      return true
    })
  }, [allExercises, selectedMuscle, selectedLevel, onlySingleEquipment])

  if (!equipment) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
          Ekipman kategorisi bulunamadı
        </h1>
        <Link
          to="/ekipmanlar"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-lime-400 px-6 py-3 text-sm font-extrabold text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Tüm Ekipmanlara Dön</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
      {/* Üst Gezinme */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <Link
          to="/ekipmanlar"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-bold text-slate-200 hover:border-lime-400/40 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Ekipmanlar</span>
        </Link>
        <span>/</span>
        <span className="font-bold text-white">{equipment.name}</span>
      </div>

      {/* Üst Bilgi Alanı */}
      <header className="mb-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#131726] via-[#0e111c] to-[#121623] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-sky-300">
            <Dumbbell className="h-3.5 w-3.5" />
            <span>{allExercises.length} İlgili Hareket</span>
          </span>
        </div>

        <h1 className="mt-4 font-['Space_Grotesk'] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {equipment.name} Hareketleri ve Kullanım Rehberi
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
          {equipment.description}
        </p>

        {/* Ev Uygunluğu ve Ekipman Şeffaflık Notu */}
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-lime-400/25 bg-lime-400/[0.06] p-4 text-xs leading-relaxed text-slate-200">
          <Home className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" />
          <div>
            <strong className="font-bold text-lime-300">Ev ve Ekipman Gereksinimi Notu:</strong>{' '}
            {equipment.homeNote} Bir harekette {equipment.name.toLocaleLowerCase('tr-TR')} dışında
            ek bir ekipman (örneğin Bench / Sehpa) gerekiyorsa, hareket kartında her iki ekipman da
            ayrı ayrı gösterilir.
          </div>
        </div>

        {/* Kullanım Alanları, Uygun Kas Grupları ve Güvenlik Notları */}
        <div className="mt-6 grid grid-cols-1 gap-6 border-t border-white/10 pt-6 lg:grid-cols-3">
          <div>
            <h2 className="mb-2.5 text-xs font-extrabold tracking-wider text-white uppercase">
              Kullanım Alanları
            </h2>
            <ul className="space-y-2 text-xs text-slate-300">
              {equipment.usageAreas.map((area) => (
                <li key={area} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-400" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-2.5 text-xs font-extrabold tracking-wider text-white uppercase">
              Çalıştırılabilecek Kas Grupları
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {equipment.suitableMuscles.map((mId) => (
                <Link
                  key={mId}
                  to={`/kas-gruplari/${mId}`}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-200 transition hover:border-lime-400/50 hover:text-lime-300"
                >
                  {MUSCLE_GROUP_MAP[mId]?.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2.5 text-xs font-extrabold tracking-wider text-amber-300 uppercase">
              Temel Kullanım ve Güvenlik Notları
            </h2>
            <ul className="space-y-2 text-xs text-slate-300">
              {equipment.safetyNotes.map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Filtre Çubuğu ve Hareket Listesi */}
      <section aria-labelledby="ekipman-hareket-baslik">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#121521] p-4 sm:p-5">
          <div>
            <h2
              id="ekipman-hareket-baslik"
              className="font-['Space_Grotesk'] text-xl font-bold text-white"
            >
              {equipment.name} İle Yapılan Hareketler ({filteredExercises.length})
            </h2>
            <p className="text-xs text-slate-400">
              Hedef kas grubuna ve zorluk seviyesine göre filtreleyin
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              aria-label="Kas grubuna göre filtrele"
              value={selectedMuscle}
              onChange={(e) => setSelectedMuscle(e.target.value as MuscleGroupId | 'all')}
              className="rounded-xl border border-white/15 bg-slate-900 px-3 py-2 text-xs font-bold text-white focus:border-lime-400 focus:outline-none"
            >
              <option value="all">Tüm Kas Grupları</option>
              {MUSCLE_GROUPS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
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

            {equipment.id !== 'bench-sehpa' && (
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200">
                <input
                  type="checkbox"
                  checked={onlySingleEquipment}
                  onChange={(e) => setOnlySingleEquipment(e.target.checked)}
                  className="h-3.5 w-3.5 accent-lime-400"
                />
                <span>Ek ekipman (sehpa vb.) gerektirmeyenler</span>
              </label>
            )}
          </div>
        </div>

        {filteredExercises.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredExercises.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#121521] p-8 text-center">
            <p className="text-sm font-bold text-white">
              Seçilen filtrelerle eşleşen hareket bulunamadı.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedMuscle('all')
                setSelectedLevel('all')
                setOnlySingleEquipment(false)
              }}
              className="mt-4 rounded-xl bg-lime-400 px-4 py-2 text-xs font-extrabold text-slate-950"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        )}
      </section>

      {/* Diğer Ekipmanlara Hızlı Geçiş */}
      <section className="mt-14 border-t border-white/10 pt-8">
        <h3 className="mb-3 text-xs font-extrabold tracking-wider text-slate-400 uppercase">
          Diğer Ekipman Kategorileri
        </h3>
        <div className="flex flex-wrap gap-2">
          {EQUIPMENTS.map((eq) => (
            <Link
              key={eq.id}
              to={`/ekipmanlar/${eq.slug}`}
              className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                eq.id === equipment.id
                  ? 'border-sky-400 bg-sky-400 text-slate-950'
                  : 'border-white/10 bg-[#121521] text-slate-300 hover:border-sky-400/40 hover:text-white'
              }`}
            >
              {eq.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
