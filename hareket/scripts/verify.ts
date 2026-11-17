import assert from 'node:assert/strict'
import { EQUIPMENTS, EQUIPMENT_MAP } from '../src/data/equipment.ts'
import {
  EXERCISES,
  EXERCISE_BY_SLUG,
  getExercisesByEquipment,
  getExercisesByMuscleGroup,
  getFeaturedExercises,
} from '../src/data/exercises.ts'
import { MUSCLE_GROUPS, MUSCLE_GROUP_MAP } from '../src/data/muscleGroups.ts'
import {
  DEFAULT_FILTERS,
  filterAndSortExercises,
  normalizeSearchText,
} from '../src/utils/search.ts'

console.log('=== HAREKET VERİ VE İŞLEV DOĞRULAMA TESTİ ===')

// 1. Toplam hareket sayısı ve benzersizlik kontrolü
assert(EXERCISES.length >= 60, `En az 60 hareket olmalı, mevcut: ${EXERCISES.length}`)
const slugSet = new Set(EXERCISES.map((e) => e.slug))
assert.equal(slugSet.size, EXERCISES.length, 'Tüm hareket slug değerleri benzersiz olmalı')
console.log(`✓ [1/8] Toplam ${EXERCISES.length} benzersiz ve eksiksiz hareket doğrulandı.`)

// 2. Her hareketin zorunlu alanları, adım sayısı, en az 3 hatası ve geçerli alternatif bağlantıları
for (const ex of EXERCISES) {
  assert(ex.trName.length > 2, `${ex.slug}: Türkçe isim eksik`)
  assert(ex.enName.length > 2, `${ex.slug}: İngilizce isim eksik`)
  assert(ex.shortDescription.length > 20, `${ex.slug}: Kısa açıklama çok kısa`)
  assert(MUSCLE_GROUP_MAP[ex.primaryMuscleGroup], `${ex.slug}: Geçersiz ana kas grubu`)
  assert(ex.primaryMuscles.length >= 1, `${ex.slug}: Birincil kas listesi boş`)
  assert(ex.stabilizerMuscles.length >= 1, `${ex.slug}: Dengeleyici kas listesi boş`)
  assert(ex.equipment.length >= 1, `${ex.slug}: Ekipman listesi boş`)
  for (const eq of ex.equipment) {
    assert(EQUIPMENT_MAP[eq], `${ex.slug}: Geçersiz ekipman ID: ${eq}`)
  }
  assert(ex.steps.length >= 5, `${ex.slug}: En az 5 adım olmalı`)
  assert(ex.cues.length >= 2, `${ex.slug}: Dikkat edilmesi gerekenler eksik`)
  assert(
    ex.commonMistakes.length >= 3,
    `${ex.slug}: En az 3 harekete özgü hata olmalı`
  )

  // Alternatif hareket bağlantılarının gerçek sayfalara gittiğini doğrula
  const altIds = [
    ex.alternatives.easier,
    ex.alternatives.harder,
    ex.alternatives.homeAlt,
    ...(ex.alternatives.equipmentAlt ?? []),
  ].filter((x): x is string => Boolean(x))

  assert(altIds.length >= 2, `${ex.slug}: Alternatif hareket bağlantıları eksik`)
  for (const altSlug of altIds) {
    assert(
      EXERCISE_BY_SLUG[altSlug],
      `${ex.slug}: Var olmayan alternatif hareket bağlantısı -> ${altSlug}`
    )
  }
}
console.log(
  '✓ [2/8] Tüm hareketlerin 5 aşamalı adımları, 3+ hatası, ekipmanları ve alternatif linkleri geçerli.'
)

// 3. 11 Kas grubunun tamamında birincil ve ikincil hareketlerin bulunması
assert.equal(MUSCLE_GROUPS.length, 11, '11 kas grubu bulunmalı')
for (const m of MUSCLE_GROUPS) {
  const primary = getExercisesByMuscleGroup(m.id, false)
  const withSecondary = getExercisesByMuscleGroup(m.id, true)
  assert(primary.length >= 2, `${m.name} için en az 2 birincil hareket olmalı`)
  assert(
    withSecondary.length >= primary.length,
    `${m.name} ikincil dahil sayı birincilden az olamaz`
  )
}
console.log('✓ [3/8] 11 kas grubunun tamamında birincil ve ikincil hareket dağılımı doğrulandı.')

// 4. Omuz sayfasının özel gereksinimlerinin kontrolü (Ev, Dumbbell, Barbell, Kablo/Bant + Wall Walk & Barbell Front Raise)
const omuzPrimary = getExercisesByMuscleGroup('omuz', false)
const omuzSlugs = new Set(omuzPrimary.map((e) => e.slug))
for (const reqSlug of [
  'pike-push-up',
  'elevated-pike-push-up',
  'wall-walk',
  'dumbbell-shoulder-press',
  'seated-dumbbell-shoulder-press',
  'dumbbell-lateral-raise',
  'dumbbell-front-raise',
  'rear-delt-raise',
  'arnold-press',
  'barbell-overhead-press',
  'push-press',
  'barbell-front-raise',
  'cable-lateral-raise',
  'face-pull',
  'band-shoulder-press',
]) {
  assert(omuzSlugs.has(reqSlug), `Omuz grubunda ${reqSlug} bulunmalı`)
}
console.log(
  `✓ [4/8] Omuz sayfası özel gereksinimleri (${omuzPrimary.length} omuz hareketi, alt bölgeler ve tüm ekipman kırılımları) doğrulandı.`
)

// 5. 9 Ekipman kategorisinin tamamında hareket bulunması ve çoklu ekipman kontrolü
assert.equal(EQUIPMENTS.length, 9, '9 ekipman kategorisi bulunmalı')
for (const eq of EQUIPMENTS) {
  const list = getExercisesByEquipment(eq.id)
  assert(list.length >= 2, `${eq.name} için en az 2 hareket bulunmalı`)
}
const dbBench = EXERCISE_BY_SLUG['dumbbell-bench-press']
assert(
  dbBench.equipment.includes('dumbbell') && dbBench.equipment.includes('bench-sehpa'),
  'Dumbbell Bench Press hem dumbbell hem bench-sehpa gerektirmeli'
)
console.log('✓ [5/8] 9 ekipman kategorisi ve çoklu ekipman (ör. Dumbbell + Bench) eşleşmeleri doğrulandı.')

// 6. Türkçe & İngilizce, harf ve Türkçe karakter duyarsız arama kontrolü
assert.equal(normalizeSearchText('Şınav (Push-Up)'), 'sinav push up')
const searchSinav = filterAndSortExercises(EXERCISES, { ...DEFAULT_FILTERS, q: 'sinav' })
const searchTurkishSinav = filterAndSortExercises(EXERCISES, { ...DEFAULT_FILTERS, q: 'ŞINAV' })
const searchEnglishPushup = filterAndSortExercises(EXERCISES, { ...DEFAULT_FILTERS, q: 'push-up' })
assert(searchSinav.some((e) => e.slug === 'push-up'), '"sinav" araması Push-up getirmeli')
assert.equal(searchSinav.length, searchTurkishSinav.length, '"sinav" ve "ŞINAV" aynı sonucu vermeli')
assert(searchEnglishPushup.some((e) => e.slug === 'push-up'), '"push-up" araması çalışmalı')
console.log('✓ [6/8] Türkçe/İngilizce ve Türkçe karakter toleranslı arama doğrulandı.')

// 7. Birincil vs Birincil+İkincil kas filtreleme mantığı kontrolü
const tricepsPrimaryOnly = filterAndSortExercises(EXERCISES, {
  ...DEFAULT_FILTERS,
  muscle: 'triceps',
  muscleScope: 'primary',
})
const tricepsWithSecondary = filterAndSortExercises(EXERCISES, {
  ...DEFAULT_FILTERS,
  muscle: 'triceps',
  muscleScope: 'both',
})
assert(
  tricepsWithSecondary.length > tricepsPrimaryOnly.length,
  'Triceps birincil+ikincil filtresi, yalnızca birincil filtresinden daha fazla hareket (ör. Push-up, Bench Press) getirmeli'
)
console.log(
  `✓ [7/8] Birincil (${tricepsPrimaryOnly.length}) ve Birincil+İkincil (${tricepsWithSecondary.length}) kas filtreleme mantığı doğrulandı.`
)

// 8. Öne çıkan hareketler kontrolü
assert.equal(getFeaturedExercises().length, 6, 'Ana sayfada 6 öne çıkan hareket bulunmalı')
console.log('✓ [8/8] Öne çıkan 6 temel hareket doğrulandı.')
console.log('=== TÜM DOĞRULAMA TESTLERİ BAŞARIYLA GEÇTİ ===')
