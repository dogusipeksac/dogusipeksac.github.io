import type {
  DifficultyLevel,
  EquipmentId,
  Exercise,
  LateralityType,
  MechanicType,
  MovementPattern,
  MuscleGroupId,
} from '../types/fitness.ts'
import { EQUIPMENT_MAP } from '../data/equipment.ts'
import { LEVEL_ORDER } from '../data/exercises.ts'
import { MUSCLE_GROUP_MAP } from '../data/muscleGroups.ts'

/**
 * Türkçe karakter farklarına ve tire/boşluk ayrımlarına toleranslı arama normalizasyonu.
 * Örn: "Şınav", "sinav", "Push-up", "push up", "göğüs", "gogus", "omuz" -> eşleşir.
 */
export function normalizeSearchText(input: string): string {
  return input
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/û/g, 'u')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export interface ExerciseFilterState {
  q: string
  muscle: MuscleGroupId | 'all'
  muscleScope: 'primary' | 'both'
  equipment: EquipmentId | 'all'
  level: DifficultyLevel | 'all'
  environment: 'all' | 'ev' | 'salon' | 'ev-ekipmansiz'
  pattern: MovementPattern | 'all'
  mechanic: MechanicType | 'all'
  laterality: LateralityType | 'all'
  sort: 'recommended' | 'az' | 'level' | 'equipment'
}

export const DEFAULT_FILTERS: ExerciseFilterState = {
  q: '',
  muscle: 'all',
  muscleScope: 'primary',
  equipment: 'all',
  level: 'all',
  environment: 'all',
  pattern: 'all',
  mechanic: 'all',
  laterality: 'all',
  sort: 'recommended',
}

export function filterAndSortExercises(
  exercises: Exercise[],
  filters: ExerciseFilterState
): Exercise[] {
  const queryNorm = normalizeSearchText(filters.q)
  const queryTokens = queryNorm ? queryNorm.split(' ').filter(Boolean) : []

  const filtered = exercises.filter((ex) => {
    // 1. Kas grubu filtresi (yalnızca birincil veya birincil + ikincil)
    if (filters.muscle !== 'all') {
      const matchesPrimary = ex.primaryMuscleGroup === filters.muscle
      const matchesSecondary = ex.secondaryMuscleGroups.includes(filters.muscle)
      if (filters.muscleScope === 'primary' && !matchesPrimary) return false
      if (filters.muscleScope === 'both' && !matchesPrimary && !matchesSecondary) return false
    }

    // 2. Ekipman filtresi
    if (filters.equipment !== 'all') {
      if (!ex.equipment.includes(filters.equipment)) return false
    }

    // 3. Seviye filtresi
    if (filters.level !== 'all') {
      if (ex.level !== filters.level) return false
    }

    // 4. Ortam filtresi
    if (filters.environment === 'ev') {
      if (!ex.environments.includes('ev')) return false
    } else if (filters.environment === 'salon') {
      if (!ex.environments.includes('salon')) return false
    } else if (filters.environment === 'ev-ekipmansiz') {
      if (!ex.environments.includes('ev') || !ex.equipment.includes('vucut-agirligi')) return false
    }

    // 5. Hareket tipi (pattern) filtresi
    if (filters.pattern !== 'all') {
      if (ex.movementPattern !== filters.pattern) return false
    }

    // 6. Mekanik (bileşik / izolasyon) filtresi
    if (filters.mechanic !== 'all') {
      if (ex.mechanic !== filters.mechanic) return false
    }

    // 7. Taraf (çift / tek taraflı) filtresi
    if (filters.laterality !== 'all') {
      if (ex.laterality !== filters.laterality) return false
    }

    // 8. Metin araması (Türkçe ad, İngilizce ad, alternatif isimler, kas grubu, alt bölge, ekipman)
    if (queryTokens.length > 0) {
      const muscleGroupName = MUSCLE_GROUP_MAP[ex.primaryMuscleGroup]?.name ?? ''
      const secondaryNames = ex.secondaryMuscleGroups
        .map((m) => MUSCLE_GROUP_MAP[m]?.name ?? '')
        .join(' ')
      const equipNames = ex.equipment.map((eq) => EQUIPMENT_MAP[eq]?.name ?? '').join(' ')

      const searchableBlob = normalizeSearchText(
        [
          ex.trName,
          ex.enName,
          ...ex.aliases,
          ex.shortDescription,
          ex.subRegionTag,
          muscleGroupName,
          secondaryNames,
          equipNames,
          ...ex.primaryMuscles,
          ...ex.secondaryMuscles,
        ].join(' ')
      )
      const searchableCompact = searchableBlob.replace(/\s+/g, '')

      for (const token of queryTokens) {
        if (!searchableBlob.includes(token) && !searchableCompact.includes(token)) {
          return false
        }
      }
    }

    return true
  })

  // Sıralama
  const sorted = [...filtered]
  if (filters.sort === 'az') {
    sorted.sort((a, b) => a.trName.localeCompare(b.trName, 'tr'))
  } else if (filters.sort === 'level') {
    sorted.sort(
      (a, b) =>
        LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] ||
        a.trName.localeCompare(b.trName, 'tr')
    )
  } else if (filters.sort === 'equipment') {
    sorted.sort((a, b) => {
      const eqA = EQUIPMENT_MAP[a.equipment[0]]?.name ?? ''
      const eqB = EQUIPMENT_MAP[b.equipment[0]]?.name ?? ''
      return eqA.localeCompare(eqB, 'tr') || a.trName.localeCompare(b.trName, 'tr')
    })
  } else {
    // Önerilen: Öne çıkanlar önce, eğer birincil+ikincil kas seçiliyse birincil hedefleyenler önce
    sorted.sort((a, b) => {
      if (filters.muscle !== 'all' && filters.muscleScope === 'both') {
        const aPrimary = a.primaryMuscleGroup === filters.muscle ? 0 : 1
        const bPrimary = b.primaryMuscleGroup === filters.muscle ? 0 : 1
        if (aPrimary !== bPrimary) return aPrimary - bPrimary
      }
      const aFeat = a.featured ? 0 : 1
      const bFeat = b.featured ? 0 : 1
      if (aFeat !== bFeat) return aFeat - bFeat
      return 0
    })
  }

  return sorted
}
