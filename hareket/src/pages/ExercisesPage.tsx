import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import type {
  DifficultyLevel,
  EquipmentId,
  LateralityType,
  MechanicType,
  MovementPattern,
  MuscleGroupId,
} from '../types/fitness'
import { EQUIPMENTS, EQUIPMENT_MAP } from '../data/equipment'
import {
  EXERCISES,
  LATERALITY_LABELS,
  LEVEL_LABELS,
  MECHANIC_LABELS,
  MOVEMENT_PATTERN_LABELS,
} from '../data/exercises'
import { MUSCLE_GROUPS, MUSCLE_GROUP_MAP } from '../data/muscleGroups'
import { ExerciseCard } from '../components/ExerciseCard'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import {
  DEFAULT_FILTERS,
  filterAndSortExercises,
  type ExerciseFilterState,
} from '../utils/search'

export function ExercisesPage() {
  useDocumentMeta(
    'Hareketler Kütüphanesi — Tüm Spor ve Fitness Egzersizleri',
    'Kas grubu, ekipman, seviye, ortam ve hareket tipine göre anlık filtreleme ile doğru spor hareketini bul.'
  )

  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  // URL parametrelerinden filtre durumunu oku
  const filters: ExerciseFilterState = useMemo(() => {
    const q = searchParams.get('q') ?? DEFAULT_FILTERS.q
    const muscle = (searchParams.get('kas') as MuscleGroupId | 'all') || 'all'
    const muscleScope =
      (searchParams.get('kapsam') as 'primary' | 'both') === 'both' ? 'both' : 'primary'
    const equipment = (searchParams.get('ekipman') as EquipmentId | 'all') || 'all'
    const level = (searchParams.get('seviye') as DifficultyLevel | 'all') || 'all'
    const environment =
      (searchParams.get('ortam') as ExerciseFilterState['environment']) || 'all'
    const pattern = (searchParams.get('tip') as MovementPattern | 'all') || 'all'
    const mechanic = (searchParams.get('mekanik') as MechanicType | 'all') || 'all'
    const laterality = (searchParams.get('taraf') as LateralityType | 'all') || 'all'
    const sort =
      (searchParams.get('sirala') as ExerciseFilterState['sort']) || 'recommended'

    return {
      q,
      muscle,
      muscleScope,
      equipment,
      level,
      environment,
      pattern,
      mechanic,
      laterality,
      sort,
    }
  }, [searchParams])

  const updateFilter = <K extends keyof ExerciseFilterState>(
    key: K,
    value: ExerciseFilterState[K]
  ) => {
    const next = new URLSearchParams(searchParams)
    const paramKeyMap: Record<keyof ExerciseFilterState, string> = {
      q: 'q',
      muscle: 'kas',
      muscleScope: 'kapsam',
      equipment: 'ekipman',
      level: 'seviye',
      environment: 'ortam',
      pattern: 'tip',
      mechanic: 'mekanik',
      laterality: 'taraf',
      sort: 'sirala',
    }
    const paramName = paramKeyMap[key]
    const defaultValue = DEFAULT_FILTERS[key]
    if (!value || value === defaultValue) {
      next.delete(paramName)
    } else {
      next.set(paramName, String(value))
    }
    setSearchParams(next, { replace: true })
  }

  const resetAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true })
  }

  const results = useMemo(
    () => filterAndSortExercises(EXERCISES, filters),
    [filters]
  )

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.q.trim()) count++
    if (filters.muscle !== 'all') count++
    if (filters.equipment !== 'all') count++
    if (filters.level !== 'all') count++
    if (filters.environment !== 'all') count++
    if (filters.pattern !== 'all') count++
    if (filters.mechanic !== 'all') count++
    if (filters.laterality !== 'all') count++
    return count
  }, [filters])

  const renderFilterControls = () => (
    <div className="space-y-5">
      {/* 1. Kas Grubu ve Birincil/İkincil Kapsamı */}
      <div>
        <label
          htmlFor="filter-muscle"
          className="mb-1.5 block text-xs font-extrabold tracking-wider text-slate-200 uppercase"
        >
          1. Kas Grubu
        </label>
        <select
          id="filter-muscle"
          value={filters.muscle}
          onChange={(e) =>
            updateFilter('muscle', e.target.value as MuscleGroupId | 'all')
          }
          className="w-full rounded-xl border border-white/15 bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white focus:border-lime-400 focus:outline-none"
        >
          <option value="all">Tüm Kas Grupları (11)</option>
          {MUSCLE_GROUPS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Birincil vs Birincil + İkincil Seçimi */}
        <div className="mt-2 rounded-xl border border-white/10 bg-slate-950/70 p-2">
          <span className="mb-1.5 block text-[11px] font-bold text-slate-400">
            Kas Eşleşme Kapsamı:
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => updateFilter('muscleScope', 'primary')}
              aria-pressed={filters.muscleScope === 'primary'}
              className={`rounded-lg px-2 py-1.5 text-[11px] font-bold transition ${
                filters.muscleScope === 'primary'
                  ? 'bg-lime-400 text-slate-950'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              Yalnızca Birincil
            </button>
            <button
              type="button"
              onClick={() => updateFilter('muscleScope', 'both')}
              aria-pressed={filters.muscleScope === 'both'}
              className={`rounded-lg px-2 py-1.5 text-[11px] font-bold transition ${
                filters.muscleScope === 'both'
                  ? 'bg-sky-400 text-slate-950'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              Birincil + İkincil
            </button>
          </div>
        </div>
      </div>

      {/* 2. Ekipman */}
      <div>
        <label
          htmlFor="filter-equipment"
          className="mb-1.5 block text-xs font-extrabold tracking-wider text-slate-200 uppercase"
        >
          2. Ekipman
        </label>
        <select
          id="filter-equipment"
          value={filters.equipment}
          onChange={(e) =>
            updateFilter('equipment', e.target.value as EquipmentId | 'all')
          }
          className="w-full rounded-xl border border-white/15 bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white focus:border-lime-400 focus:outline-none"
        >
          <option value="all">Tüm Ekipmanlar (9)</option>
          {EQUIPMENTS.map((eq) => (
            <option key={eq.id} value={eq.id}>
              {eq.name}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Seviye */}
      <div>
        <span className="mb-1.5 block text-xs font-extrabold tracking-wider text-slate-200 uppercase">
          3. Zorluk Seviyesi
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {(['all', 'baslangic', 'orta', 'ileri'] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => updateFilter('level', lvl)}
              aria-pressed={filters.level === lvl}
              className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${
                filters.level === lvl
                  ? 'border-lime-400 bg-lime-400/20 text-lime-300'
                  : 'border-white/10 bg-slate-900 text-slate-300 hover:border-white/25'
              }`}
            >
              {lvl === 'all' ? 'Tümü' : LEVEL_LABELS[lvl]}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Ortam */}
      <div>
        <span className="mb-1.5 block text-xs font-extrabold tracking-wider text-slate-200 uppercase">
          4. Çalışma Ortamı
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {(
            [
              { id: 'all', label: 'Tümü' },
              { id: 'ev-ekipmansiz', label: 'Ev (Ekipmansız)' },
              { id: 'ev', label: 'Ev Uygun' },
              { id: 'salon', label: 'Spor Salonu' },
            ] as const
          ).map((env) => (
            <button
              key={env.id}
              type="button"
              onClick={() => updateFilter('environment', env.id)}
              aria-pressed={filters.environment === env.id}
              className={`rounded-xl border px-2.5 py-2 text-xs font-bold transition ${
                filters.environment === env.id
                  ? 'border-lime-400 bg-lime-400/20 text-lime-300'
                  : 'border-white/10 bg-slate-900 text-slate-300 hover:border-white/25'
              }`}
            >
              {env.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Hareket Tipi */}
      <div>
        <label
          htmlFor="filter-pattern"
          className="mb-1.5 block text-xs font-extrabold tracking-wider text-slate-200 uppercase"
        >
          5. Hareket Tipi
        </label>
        <select
          id="filter-pattern"
          value={filters.pattern}
          onChange={(e) =>
            updateFilter('pattern', e.target.value as MovementPattern | 'all')
          }
          className="w-full rounded-xl border border-white/15 bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white focus:border-lime-400 focus:outline-none"
        >
          <option value="all">Tüm Hareket Tipleri</option>
          {(Object.keys(MOVEMENT_PATTERN_LABELS) as MovementPattern[]).map((pat) => (
            <option key={pat} value={pat}>
              {MOVEMENT_PATTERN_LABELS[pat]}
            </option>
          ))}
        </select>
      </div>

      {/* 6. Bileşik / İzolasyon & 7. Tek / Çift Taraflı */}
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label
            htmlFor="filter-mechanic"
            className="mb-1 block text-[11px] font-extrabold text-slate-300 uppercase"
          >
            6. Mekanik
          </label>
          <select
            id="filter-mechanic"
            value={filters.mechanic}
            onChange={(e) =>
              updateFilter('mechanic', e.target.value as MechanicType | 'all')
            }
            className="w-full rounded-xl border border-white/15 bg-slate-900 px-2.5 py-2 text-xs font-semibold text-white focus:border-lime-400 focus:outline-none"
          >
            <option value="all">Tümü</option>
            <option value="bilesik">Bileşik</option>
            <option value="izolasyon">İzolasyon</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filter-laterality"
            className="mb-1 block text-[11px] font-extrabold text-slate-300 uppercase"
          >
            7. Taraf
          </label>
          <select
            id="filter-laterality"
            value={filters.laterality}
            onChange={(e) =>
              updateFilter('laterality', e.target.value as LateralityType | 'all')
            }
            className="w-full rounded-xl border border-white/15 bg-slate-900 px-2.5 py-2 text-xs font-semibold text-white focus:border-lime-400 focus:outline-none"
          >
            <option value="all">Tümü</option>
            <option value="cift-tarafli">{LATERALITY_LABELS['cift-tarafli']}</option>
            <option value="tek-tarafli">{LATERALITY_LABELS['tek-tarafli']}</option>
          </select>
        </div>
      </div>

      {/* Filtreleri Temizle */}
      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={resetAllFilters}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-2.5 text-xs font-bold text-rose-300 transition hover:bg-rose-400/20"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Tüm Filtreleri Temizle ({activeFilterCount})</span>
        </button>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
      {/* Sayfa Başlığı */}
      <div className="mb-8 border-b border-white/10 pb-6">
        <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
          Egzersiz Keşif Merkezi
        </span>
        <h1 className="mt-1 font-['Space_Grotesk'] text-3xl font-bold text-white sm:text-4xl">
          Hareket Kütüphanesi
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Türkçe veya yaygın İngilizce adıyla arama yapın; kas grubu, ekipman, seviye ve ortama
          göre filtreleyerek aradığınız hareketi saniyeler içinde bulun.
        </p>
      </div>

      {/* Üst Arama, Sıralama ve Mobil Filtre Çubuğu */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Arama Kutusu */}
        <div className="relative flex-1">
          <label htmlFor="exercises-search-input" className="sr-only">
            Hareket veya kas adıyla ara
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="exercises-search-input"
            type="search"
            value={filters.q}
            onChange={(e) => updateFilter('q', e.target.value)}
            placeholder="Hareket adı, İngilizce isim veya kas ara (örn. Şınav, Lateral Raise, Omuz)..."
            className="w-full rounded-2xl border border-white/15 bg-[#121521] py-3 pr-10 pl-11 text-sm font-medium text-white placeholder-slate-400 transition focus:border-lime-400 focus:outline-none"
          />
          {filters.q && (
            <button
              type="button"
              onClick={() => updateFilter('q', '')}
              aria-label="Aramayı temizle"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sıralama ve Mobil Filtre Çekmecesi Butonu */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-bold text-slate-400 whitespace-nowrap">
              Sırala:
            </label>
            <select
              id="sort-select"
              value={filters.sort}
              onChange={(e) =>
                updateFilter('sort', e.target.value as ExerciseFilterState['sort'])
              }
              className="rounded-2xl border border-white/15 bg-[#121521] px-3.5 py-3 text-xs font-bold text-white focus:border-lime-400 focus:outline-none"
            >
              <option value="recommended">Önerilen</option>
              <option value="az">İsme Göre (A–Z)</option>
              <option value="level">Başlangıç Seviyesine Göre</option>
              <option value="equipment">Ekipmana Göre</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            aria-expanded={mobileDrawerOpen}
            className="inline-flex items-center gap-2 rounded-2xl border border-lime-400/40 bg-lime-400/15 px-4 py-3 text-xs font-extrabold text-lime-300 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filtreler</span>
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-lime-400 px-1.5 py-0.2 text-[10px] font-black text-slate-950">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Ana İki Sütunlu Alan: Sol Kenar Filtre Paneli + Sağ Hareket Listesi */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Masaüstü Kenar Filtre Paneli */}
        <aside className="hidden lg:col-span-3 lg:block" aria-label="Hareket filtreleri">
          <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#121521] p-5">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <span className="inline-flex items-center gap-2 text-sm font-extrabold text-white">
                <Filter className="h-4 w-4 text-lime-400" />
                <span>Detaylı Filtreler</span>
              </span>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs font-bold text-lime-400 hover:underline"
                >
                  Temizle
                </button>
              )}
            </div>
            {renderFilterControls()}
          </div>
        </aside>

        {/* Sağ Sütun: Aktif Filtre Etiketleri, Sonuç Sayısı ve Kartlar */}
        <div className="lg:col-span-9">
          {/* Sonuç Sayısı ve Aktif Filtre Rozetleri */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#11141f] px-4 py-3">
            <div className="text-xs font-semibold text-slate-300" aria-live="polite">
              Toplam <strong className="font-extrabold text-white">{EXERCISES.length}</strong> hareket
              içinden <strong className="font-extrabold text-lime-400">{results.length}</strong> sonuç
              listeleniyor
            </div>

            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {filters.muscle !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-lg border border-lime-400/30 bg-lime-400/10 px-2.5 py-1 text-[11px] font-bold text-lime-300">
                    {MUSCLE_GROUP_MAP[filters.muscle]?.name} (
                    {filters.muscleScope === 'both' ? 'Birincil+İkincil' : 'Birincil'})
                    <button
                      type="button"
                      onClick={() => updateFilter('muscle', 'all')}
                      aria-label="Kas grubu filtresini kaldır"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.equipment !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-lg border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 text-[11px] font-bold text-sky-300">
                    {EQUIPMENT_MAP[filters.equipment]?.name}
                    <button
                      type="button"
                      onClick={() => updateFilter('equipment', 'all')}
                      aria-label="Ekipman filtresini kaldır"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.level !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
                    {LEVEL_LABELS[filters.level]}
                    <button
                      type="button"
                      onClick={() => updateFilter('level', 'all')}
                      aria-label="Seviye filtresini kaldır"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.environment !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
                    {filters.environment === 'ev-ekipmansiz'
                      ? 'Ev (Ekipmansız)'
                      : filters.environment === 'ev'
                        ? 'Ev Uygun'
                        : 'Spor Salonu'}
                    <button
                      type="button"
                      onClick={() => updateFilter('environment', 'all')}
                      aria-label="Ortam filtresini kaldır"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.pattern !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
                    {MOVEMENT_PATTERN_LABELS[filters.pattern]}
                    <button
                      type="button"
                      onClick={() => updateFilter('pattern', 'all')}
                      aria-label="Hareket tipi filtresini kaldır"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.mechanic !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
                    {MECHANIC_LABELS[filters.mechanic]}
                    <button
                      type="button"
                      onClick={() => updateFilter('mechanic', 'all')}
                      aria-label="Mekanik filtresini kaldır"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="ml-1 text-xs font-bold text-rose-300 hover:underline"
                >
                  Tümünü Sıfırla
                </button>
              </div>
            )}
          </div>

          {/* Sonuç Listesi veya Boş Durum Ekranı */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((ex) => {
                const isSecondaryMatch =
                  filters.muscle !== 'all' &&
                  filters.muscleScope === 'both' &&
                  ex.primaryMuscleGroup !== filters.muscle &&
                  ex.secondaryMuscleGroups.includes(filters.muscle)

                return (
                  <ExerciseCard
                    key={ex.id}
                    exercise={ex}
                    highlightSecondaryMatch={isSecondaryMatch}
                  />
                )
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-[#121521] p-8 text-center sm:p-12">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400/15 text-lime-300">
                <Sparkles className="h-7 w-7" />
              </div>
              <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                Seçtiğiniz filtrelere uygun hareket bulunamadı
              </h2>
              <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-400">
                Çok dar bir ekipman ve kas kombinasyonu seçmiş olabilirsiniz. İkincil kasları da
                dahil etmeyi deneyebilir veya tüm filtreleri sıfırlayabilirsiniz.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {filters.muscle !== 'all' && filters.muscleScope === 'primary' && (
                  <button
                    type="button"
                    onClick={() => updateFilter('muscleScope', 'both')}
                    className="rounded-xl border border-sky-400/40 bg-sky-400/15 px-4 py-2.5 text-xs font-bold text-sky-300 transition hover:bg-sky-400/25"
                  >
                    İkincil Çalışan Kasları da Dahil Et
                  </button>
                )}
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-lime-300"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Filtreleri Temizle</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobil Filtre Çekmecesi (Drawer) */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobil filtre çekmecesi"
        >
          <div className="flex h-full w-full max-w-sm flex-col justify-between overflow-y-auto border-l border-white/10 bg-[#0e111a] p-5">
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-['Space_Grotesk'] text-lg font-bold text-white">
                  Filtreler ({results.length} Sonuç)
                </span>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  aria-label="Filtre panelini kapat"
                  className="rounded-xl border border-white/10 p-2 text-slate-300 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {renderFilterControls()}
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full rounded-xl bg-lime-400 py-3 text-sm font-extrabold text-slate-950"
              >
                {results.length} Hareketi Göster
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
