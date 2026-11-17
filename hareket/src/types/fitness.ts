export type MuscleGroupId =
  | 'gogus'
  | 'sirt'
  | 'omuz'
  | 'biceps'
  | 'triceps'
  | 'on-kol'
  | 'karin-core'
  | 'kalca'
  | 'on-bacak'
  | 'arka-bacak'
  | 'baldir'

export type EquipmentId =
  | 'vucut-agirligi'
  | 'dumbbell'
  | 'barbell'
  | 'kettlebell'
  | 'direnc-bandi'
  | 'kablo-makinesi'
  | 'spor-salonu-makineleri'
  | 'barfiks-bari'
  | 'bench-sehpa'

export type DifficultyLevel = 'baslangic' | 'orta' | 'ileri'

export type EnvironmentType = 'ev' | 'salon'

export type MovementPattern =
  | 'itis'
  | 'cekis'
  | 'squat'
  | 'kalca-mentesesi'
  | 'core'
  | 'izolasyon'
  | 'tasima'

export type MechanicType = 'bilesik' | 'izolasyon'

export type LateralityType = 'cift-tarafli' | 'tek-tarafli'

export type AnimationPoseId =
  | 'pushup'
  | 'incline-pushup'
  | 'pike-pushup'
  | 'wall-walk'
  | 'bench-press'
  | 'incline-press'
  | 'floor-press'
  | 'chest-fly'
  | 'cable-fly'
  | 'machine-press'
  | 'pullup'
  | 'inverted-row'
  | 'one-arm-row'
  | 'bent-over-row'
  | 'lat-pulldown'
  | 'seated-row'
  | 'band-row'
  | 'overhead-press'
  | 'seated-shoulder-press'
  | 'lateral-raise'
  | 'front-raise'
  | 'rear-delt-raise'
  | 'face-pull'
  | 'biceps-curl'
  | 'concentration-curl'
  | 'triceps-pushdown'
  | 'overhead-triceps'
  | 'kickback'
  | 'skull-crusher'
  | 'squat-bodyweight'
  | 'goblet-squat'
  | 'back-squat'
  | 'front-squat'
  | 'lunge'
  | 'bulgarian-split-squat'
  | 'romanian-deadlift'
  | 'leg-press'
  | 'leg-extension'
  | 'leg-curl'
  | 'calf-raise'
  | 'seated-calf-raise'
  | 'glute-bridge'
  | 'hip-thrust'
  | 'step-up'
  | 'glute-kickback'
  | 'kettlebell-swing'
  | 'plank'
  | 'side-plank'
  | 'dead-bug'
  | 'bird-dog'
  | 'reverse-crunch'
  | 'hanging-knee-raise'
  | 'pallof-press'
  | 'farmers-carry'
  | 'wrist-curl'

export interface ExerciseStep {
  title: string
  detail: string
}

export interface ExerciseMistake {
  mistake: string
  correction: string
}

export interface ExerciseProgramming {
  isIsometric?: boolean
  beginner: string
  intermediate: string
  note: string
}

export interface ExerciseAlternatives {
  easier?: string
  harder?: string
  equipmentAlt?: string[]
  homeAlt?: string
}

export interface ExerciseAnimationMeta {
  poseId: AnimationPoseId
  visualType: 'kinematic-svg' | 'schematic-svg'
  accessibleDescription: string
  startLabel: string
  endLabel: string
}

export interface Exercise {
  id: string
  slug: string
  trName: string
  enName: string
  aliases: string[]
  shortDescription: string
  primaryMuscleGroup: MuscleGroupId
  secondaryMuscleGroups: MuscleGroupId[]
  primaryMuscles: string[]
  secondaryMuscles: string[]
  stabilizerMuscles: string[]
  subRegionTag: string
  equipment: EquipmentId[]
  environments: EnvironmentType[]
  environmentNote?: string
  level: DifficultyLevel
  levelWarning?: string
  movementPattern: MovementPattern
  mechanic: MechanicType
  laterality: LateralityType
  steps: ExerciseStep[]
  cues: string[]
  commonMistakes: ExerciseMistake[]
  programming: ExerciseProgramming
  alternatives: ExerciseAlternatives
  animation: ExerciseAnimationMeta
  editorialSource: string
  featured?: boolean
}

export interface MuscleSubRegionInfo {
  id: string
  name: string
  anatomicalName: string
  roleSummary: string
  exampleMovementTypes: string
}

export interface MuscleGroupInfo {
  id: MuscleGroupId
  slug: MuscleGroupId
  name: string
  latinName: string
  bodySide: 'front' | 'back' | 'both'
  shortSummary: string
  anatomicalOverview: string
  trainingTip: string
  subRegions: MuscleSubRegionInfo[]
  relatedCategories: MovementPattern[]
}

export interface EquipmentInfo {
  id: EquipmentId
  slug: EquipmentId
  name: string
  shortSummary: string
  description: string
  usageAreas: string[]
  suitableMuscles: MuscleGroupId[]
  safetyNotes: string[]
  homeNote: string
}
