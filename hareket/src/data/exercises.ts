import type {
  DifficultyLevel,
  EnvironmentType,
  EquipmentId,
  Exercise,
  LateralityType,
  MechanicType,
  MovementPattern,
  MuscleGroupId,
} from '../types/fitness.ts'
import { UPPER_BODY_EXERCISES } from './exercisesUpperBody.ts'
import { LOWER_AND_CORE_EXERCISES } from './exercisesLowerAndCore.ts'

export const EXERCISES: Exercise[] = [...UPPER_BODY_EXERCISES, ...LOWER_AND_CORE_EXERCISES]

export const EXERCISE_BY_SLUG: Record<string, Exercise> = Object.fromEntries(
  EXERCISES.map((ex) => [ex.slug, ex])
)

export const LEVEL_LABELS: Record<DifficultyLevel, string> = {
  baslangic: 'Başlangıç',
  orta: 'Orta',
  ileri: 'İleri',
}

export const LEVEL_ORDER: Record<DifficultyLevel, number> = {
  baslangic: 1,
  orta: 2,
  ileri: 3,
}

export const ENVIRONMENT_LABELS: Record<EnvironmentType, string> = {
  ev: 'Evde Uygun',
  salon: 'Spor Salonu',
}

export const MOVEMENT_PATTERN_LABELS: Record<MovementPattern, string> = {
  itis: 'İtiş',
  cekis: 'Çekiş',
  squat: 'Squat (Çömelme)',
  'kalca-mentesesi': 'Kalça Menteşesi',
  core: 'Core & Stabilite',
  izolasyon: 'İzolasyon',
  tasima: 'Taşıma',
}

export const MECHANIC_LABELS: Record<MechanicType, string> = {
  bilesik: 'Bileşik (Çok Eklemli)',
  izolasyon: 'İzolasyon (Tek Eklemli)',
}

export const LATERALITY_LABELS: Record<LateralityType, string> = {
  'cift-tarafli': 'Çift Taraflı',
  'tek-tarafli': 'Tek Taraflı',
}

export function getExercisesByMuscleGroup(
  muscleId: MuscleGroupId,
  includeSecondary = false
): Exercise[] {
  return EXERCISES.filter((ex) =>
    includeSecondary
      ? ex.primaryMuscleGroup === muscleId || ex.secondaryMuscleGroups.includes(muscleId)
      : ex.primaryMuscleGroup === muscleId
  )
}

export function getExercisesByEquipment(equipmentId: EquipmentId): Exercise[] {
  return EXERCISES.filter((ex) => ex.equipment.includes(equipmentId))
}

export function getFeaturedExercises(): Exercise[] {
  const featuredSlugs = [
    'push-up',
    'dumbbell-shoulder-press',
    'barbell-back-squat',
    'barbell-bent-over-row',
    'plank',
    'romanian-deadlift',
  ]
  return featuredSlugs
    .map((slug) => EXERCISE_BY_SLUG[slug])
    .filter((ex): ex is Exercise => Boolean(ex))
}

export const EDITORIAL_REFERENCES = [
  {
    title: 'American College of Sports Medicine (ACSM) — Direnç Antrenmanı İlkeleri',
    scope: 'Hareket seçimi, başlangıç/orta seviye yükleme prensipleri, güvenlik ve eklem hareket açıklığı standartları.',
    note: 'Genel egzersiz fizyolojisi ve güvenli direnç antrenmanı rehberliği için temel alınmıştır.',
  },
  {
    title: 'National Strength and Conditioning Association (NSCA) — Egzersiz Tekniği Kılavuzu',
    scope: 'Serbest ağırlık (Barbell, Dumbbell, Kettlebell) ve vücut ağırlığı hareketlerinin adım adım biyomekanik fazları, nefes/gövde sabitleme (bracing) kuralları.',
    note: 'Squat, Bench Press, Overhead Press, Row ve RDL gibi temel bileşik hareketlerin teknik anlatımlarında referans alınmıştır.',
  },
  {
    title: 'Journal of Orthopaedic & Sports Physical Therapy (JOSPT) & Omurga/Omuz Biyomekaniği Araştırmaları',
    scope: 'Skapular düzlemde omuz egzersizleri, dış rotasyon (Face Pull), Lunge diz yükü dağılımı ve bel dostu core stabilizasyon (Dead Bug, Bird Dog, Side Plank) ilkeleri.',
    note: 'Eklem konforu ve sık yapılan hataların düzeltme önerilerinde kullanılmıştır.',
  },
]
