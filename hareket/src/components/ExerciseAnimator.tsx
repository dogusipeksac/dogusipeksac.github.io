import { useEffect, useState } from 'react'
import { Pause, Play, Eye, Gauge } from 'lucide-react'
import type { AnimationPoseId, ExerciseAnimationMeta, MuscleGroupId } from '../types/fitness'
import { useAppStore } from '../hooks/useAppStore'

interface JointPose {
  head: [number, number]
  shoulder: [number, number]
  elbow: [number, number]
  wrist: [number, number]
  hip: [number, number]
  knee: [number, number]
  ankle: [number, number]
  propType?: 'none' | 'barbell' | 'dumbbell' | 'bench' | 'pullup-bar' | 'cable-high' | 'cable-low' | 'kettlebell' | 'box' | 'wall' | 'machine-leg'
}

interface PosePair {
  start: JointPose
  end: JointPose
  focusZone: 'chest' | 'shoulder' | 'back' | 'arm' | 'core' | 'glute' | 'quad' | 'hamstring' | 'calf'
}

const POSE_LIBRARY: Record<AnimationPoseId, PosePair> = {
  pushup: {
    focusZone: 'chest',
    start: { head: [222, 88], shoulder: [198, 102], elbow: [196, 136], wrist: [198, 168], hip: [132, 128], knee: [86, 148], ankle: [44, 168], propType: 'none' },
    end: { head: [226, 134], shoulder: [198, 144], elbow: [176, 132], wrist: [198, 168], hip: [130, 154], knee: [86, 162], ankle: [44, 168], propType: 'none' },
  },
  'incline-pushup': {
    focusZone: 'chest',
    start: { head: [216, 62], shoulder: [194, 78], elbow: [198, 110], wrist: [204, 138], hip: [132, 122], knee: [86, 146], ankle: [44, 168], propType: 'box' },
    end: { head: [224, 98], shoulder: [200, 112], elbow: [176, 110], wrist: [204, 138], hip: [134, 140], knee: [88, 155], ankle: [44, 168], propType: 'box' },
  },
  'pike-pushup': {
    focusZone: 'shoulder',
    start: { head: [190, 124], shoulder: [176, 104], elbow: [192, 136], wrist: [206, 168], hip: [122, 62], knee: [86, 116], ankle: [56, 168], propType: 'none' },
    end: { head: [216, 156], shoulder: [194, 132], elbow: [182, 142], wrist: [206, 168], hip: [128, 76], knee: [90, 122], ankle: [56, 168], propType: 'none' },
  },
  'wall-walk': {
    focusZone: 'shoulder',
    start: { head: [216, 104], shoulder: [192, 114], elbow: [192, 142], wrist: [192, 168], hip: [124, 124], knee: [80, 134], ankle: [42, 144], propType: 'wall' },
    end: { head: [96, 98], shoulder: [92, 118], elbow: [94, 144], wrist: [96, 168], hip: [72, 74], knee: [56, 48], ankle: [42, 28], propType: 'wall' },
  },
  'bench-press': {
    focusZone: 'chest',
    start: { head: [76, 126], shoulder: [106, 128], elbow: [112, 152], wrist: [112, 112], hip: [168, 130], knee: [212, 126], ankle: [216, 168], propType: 'bench' },
    end: { head: [76, 126], shoulder: [106, 128], elbow: [108, 96], wrist: [108, 62], hip: [168, 130], knee: [212, 126], ankle: [216, 168], propType: 'bench' },
  },
  'incline-press': {
    focusZone: 'chest',
    start: { head: [86, 86], shoulder: [110, 106], elbow: [114, 134], wrist: [116, 94], hip: [158, 136], knee: [206, 132], ankle: [212, 168], propType: 'bench' },
    end: { head: [86, 86], shoulder: [110, 106], elbow: [112, 74], wrist: [114, 42], hip: [158, 136], knee: [206, 132], ankle: [212, 168], propType: 'bench' },
  },
  'floor-press': {
    focusZone: 'chest',
    start: { head: [72, 154], shoulder: [102, 156], elbow: [110, 166], wrist: [110, 126], hip: [166, 158], knee: [204, 124], ankle: [226, 168], propType: 'dumbbell' },
    end: { head: [72, 154], shoulder: [102, 156], elbow: [104, 122], wrist: [104, 86], hip: [166, 158], knee: [204, 124], ankle: [226, 168], propType: 'dumbbell' },
  },
  'chest-fly': {
    focusZone: 'chest',
    start: { head: [76, 126], shoulder: [106, 128], elbow: [106, 94], wrist: [108, 62], hip: [168, 130], knee: [212, 126], ankle: [216, 168], propType: 'bench' },
    end: { head: [76, 126], shoulder: [106, 128], elbow: [124, 146], wrist: [138, 124], hip: [168, 130], knee: [212, 126], ankle: [216, 168], propType: 'bench' },
  },
  'cable-fly': {
    focusZone: 'chest',
    start: { head: [138, 42], shoulder: [136, 68], elbow: [104, 78], wrist: [84, 74], hip: [134, 114], knee: [142, 142], ankle: [132, 168], propType: 'cable-high' },
    end: { head: [138, 42], shoulder: [136, 68], elbow: [162, 82], wrist: [186, 86], hip: [134, 114], knee: [142, 142], ankle: [132, 168], propType: 'cable-high' },
  },
  'machine-press': {
    focusZone: 'chest',
    start: { head: [108, 52], shoulder: [110, 78], elbow: [92, 96], wrist: [122, 92], hip: [112, 124], knee: [154, 126], ankle: [158, 168], propType: 'bench' },
    end: { head: [108, 52], shoulder: [110, 78], elbow: [142, 86], wrist: [176, 84], hip: [112, 124], knee: [154, 126], ankle: [158, 168], propType: 'bench' },
  },
  pullup: {
    focusZone: 'back',
    start: { head: [140, 68], shoulder: [140, 88], elbow: [132, 58], wrist: [136, 30], hip: [140, 134], knee: [140, 160], ankle: [134, 176], propType: 'pullup-bar' },
    end: { head: [140, 32], shoulder: [140, 52], elbow: [124, 68], wrist: [136, 30], hip: [140, 98], knee: [140, 126], ankle: [134, 144], propType: 'pullup-bar' },
  },
  'inverted-row': {
    focusZone: 'back',
    start: { head: [96, 130], shoulder: [118, 136], elbow: [126, 108], wrist: [132, 82], hip: [166, 150], knee: [204, 158], ankle: [232, 168], propType: 'barbell' },
    end: { head: [106, 98], shoulder: [128, 104], elbow: [116, 122], wrist: [132, 82], hip: [174, 128], knee: [208, 148], ankle: [232, 168], propType: 'barbell' },
  },
  'one-arm-row': {
    focusZone: 'back',
    start: { head: [192, 76], shoulder: [168, 84], elbow: [168, 118], wrist: [168, 148], hip: [110, 92], knee: [98, 132], ankle: [88, 168], propType: 'dumbbell' },
    end: { head: [192, 76], shoulder: [168, 84], elbow: [136, 68], wrist: [144, 102], hip: [110, 92], knee: [98, 132], ankle: [88, 168], propType: 'dumbbell' },
  },
  'bent-over-row': {
    focusZone: 'back',
    start: { head: [184, 66], shoulder: [162, 78], elbow: [162, 112], wrist: [162, 142], hip: [110, 98], knee: [122, 134], ankle: [112, 168], propType: 'barbell' },
    end: { head: [184, 66], shoulder: [162, 78], elbow: [128, 66], wrist: [138, 98], hip: [110, 98], knee: [122, 134], ankle: [112, 168], propType: 'barbell' },
  },
  'lat-pulldown': {
    focusZone: 'back',
    start: { head: [136, 66], shoulder: [134, 88], elbow: [142, 56], wrist: [148, 28], hip: [128, 132], knee: [168, 132], ankle: [168, 168], propType: 'cable-high' },
    end: { head: [132, 68], shoulder: [130, 90], elbow: [122, 114], wrist: [144, 84], hip: [128, 132], knee: [168, 132], ankle: [168, 168], propType: 'cable-high' },
  },
  'seated-row': {
    focusZone: 'back',
    start: { head: [116, 62], shoulder: [116, 86], elbow: [148, 96], wrist: [180, 98], hip: [114, 136], knee: [162, 130], ankle: [204, 156], propType: 'cable-low' },
    end: { head: [110, 62], shoulder: [110, 86], elbow: [92, 104], wrist: [124, 106], hip: [114, 136], knee: [162, 130], ankle: [204, 156], propType: 'cable-low' },
  },
  'band-row': {
    focusZone: 'back',
    start: { head: [112, 62], shoulder: [112, 86], elbow: [146, 96], wrist: [178, 98], hip: [112, 136], knee: [160, 134], ankle: [202, 156], propType: 'cable-low' },
    end: { head: [108, 62], shoulder: [108, 86], elbow: [90, 104], wrist: [122, 106], hip: [112, 136], knee: [160, 134], ankle: [202, 156], propType: 'cable-low' },
  },
  'overhead-press': {
    focusZone: 'shoulder',
    start: { head: [140, 48], shoulder: [140, 72], elbow: [152, 94], wrist: [150, 68], hip: [140, 118], knee: [142, 144], ankle: [140, 168], propType: 'barbell' },
    end: { head: [140, 48], shoulder: [140, 70], elbow: [142, 42], wrist: [142, 16], hip: [140, 118], knee: [142, 144], ankle: [140, 168], propType: 'barbell' },
  },
  'seated-shoulder-press': {
    focusZone: 'shoulder',
    start: { head: [118, 56], shoulder: [118, 80], elbow: [130, 100], wrist: [128, 74], hip: [118, 128], knee: [158, 128], ankle: [162, 168], propType: 'dumbbell' },
    end: { head: [118, 56], shoulder: [118, 78], elbow: [120, 48], wrist: [120, 22], hip: [118, 128], knee: [158, 128], ankle: [162, 168], propType: 'dumbbell' },
  },
  'lateral-raise': {
    focusZone: 'shoulder',
    start: { head: [140, 44], shoulder: [140, 68], elbow: [144, 98], wrist: [146, 124], hip: [140, 116], knee: [142, 142], ankle: [140, 168], propType: 'dumbbell' },
    end: { head: [140, 44], shoulder: [140, 68], elbow: [174, 70], wrist: [204, 72], hip: [140, 116], knee: [142, 142], ankle: [140, 168], propType: 'dumbbell' },
  },
  'front-raise': {
    focusZone: 'shoulder',
    start: { head: [132, 44], shoulder: [132, 68], elbow: [136, 98], wrist: [142, 122], hip: [132, 116], knee: [134, 142], ankle: [132, 168], propType: 'dumbbell' },
    end: { head: [132, 44], shoulder: [132, 68], elbow: [164, 68], wrist: [196, 68], hip: [132, 116], knee: [134, 142], ankle: [132, 168], propType: 'dumbbell' },
  },
  'rear-delt-raise': {
    focusZone: 'shoulder',
    start: { head: [184, 68], shoulder: [162, 78], elbow: [162, 110], wrist: [162, 138], hip: [110, 96], knee: [122, 134], ankle: [112, 168], propType: 'dumbbell' },
    end: { head: [184, 68], shoulder: [162, 78], elbow: [154, 58], wrist: [146, 44], hip: [110, 96], knee: [122, 134], ankle: [112, 168], propType: 'dumbbell' },
  },
  'face-pull': {
    focusZone: 'shoulder',
    start: { head: [122, 46], shoulder: [122, 70], elbow: [154, 72], wrist: [186, 72], hip: [124, 116], knee: [130, 142], ankle: [124, 168], propType: 'cable-high' },
    end: { head: [118, 46], shoulder: [118, 70], elbow: [104, 68], wrist: [116, 44], hip: [124, 116], knee: [130, 142], ankle: [124, 168], propType: 'cable-high' },
  },
  'biceps-curl': {
    focusZone: 'arm',
    start: { head: [134, 44], shoulder: [134, 68], elbow: [136, 98], wrist: [142, 126], hip: [134, 116], knee: [136, 142], ankle: [134, 168], propType: 'dumbbell' },
    end: { head: [134, 44], shoulder: [134, 68], elbow: [138, 98], wrist: [160, 72], hip: [134, 116], knee: [136, 142], ankle: [134, 168], propType: 'dumbbell' },
  },
  'concentration-curl': {
    focusZone: 'arm',
    start: { head: [148, 62], shoulder: [138, 84], elbow: [150, 116], wrist: [154, 148], hip: [108, 122], knee: [156, 124], ankle: [158, 168], propType: 'dumbbell' },
    end: { head: [148, 62], shoulder: [138, 84], elbow: [150, 116], wrist: [166, 86], hip: [108, 122], knee: [156, 124], ankle: [158, 168], propType: 'dumbbell' },
  },
  'triceps-pushdown': {
    focusZone: 'arm',
    start: { head: [134, 44], shoulder: [132, 68], elbow: [132, 98], wrist: [162, 82], hip: [126, 116], knee: [132, 142], ankle: [128, 168], propType: 'cable-high' },
    end: { head: [134, 44], shoulder: [132, 68], elbow: [132, 98], wrist: [142, 128], hip: [126, 116], knee: [132, 142], ankle: [128, 168], propType: 'cable-high' },
  },
  'overhead-triceps': {
    focusZone: 'arm',
    start: { head: [140, 48], shoulder: [140, 72], elbow: [144, 42], wrist: [144, 16], hip: [140, 118], knee: [142, 144], ankle: [140, 168], propType: 'dumbbell' },
    end: { head: [140, 48], shoulder: [140, 72], elbow: [144, 42], wrist: [118, 62], hip: [140, 118], knee: [142, 144], ankle: [140, 168], propType: 'dumbbell' },
  },
  kickback: {
    focusZone: 'arm',
    start: { head: [184, 68], shoulder: [160, 78], elbow: [132, 78], wrist: [132, 110], hip: [110, 94], knee: [120, 132], ankle: [112, 168], propType: 'dumbbell' },
    end: { head: [184, 68], shoulder: [160, 78], elbow: [132, 78], wrist: [100, 76], hip: [110, 94], knee: [120, 132], ankle: [112, 168], propType: 'dumbbell' },
  },
  'skull-crusher': {
    focusZone: 'arm',
    start: { head: [76, 126], shoulder: [106, 128], elbow: [100, 92], wrist: [96, 58], hip: [168, 130], knee: [212, 126], ankle: [216, 168], propType: 'bench' },
    end: { head: [76, 126], shoulder: [106, 128], elbow: [100, 92], wrist: [68, 108], hip: [168, 130], knee: [212, 126], ankle: [216, 168], propType: 'bench' },
  },
  'squat-bodyweight': {
    focusZone: 'quad',
    start: { head: [140, 38], shoulder: [138, 62], elbow: [158, 76], wrist: [182, 74], hip: [136, 110], knee: [140, 138], ankle: [136, 168], propType: 'none' },
    end: { head: [146, 72], shoulder: [140, 94], elbow: [168, 96], wrist: [196, 92], hip: [110, 134], knee: [154, 134], ankle: [136, 168], propType: 'none' },
  },
  'goblet-squat': {
    focusZone: 'quad',
    start: { head: [140, 38], shoulder: [138, 62], elbow: [148, 86], wrist: [156, 68], hip: [136, 110], knee: [140, 138], ankle: [136, 168], propType: 'kettlebell' },
    end: { head: [144, 72], shoulder: [138, 94], elbow: [148, 116], wrist: [156, 98], hip: [112, 136], knee: [154, 134], ankle: [136, 168], propType: 'kettlebell' },
  },
  'back-squat': {
    focusZone: 'quad',
    start: { head: [140, 38], shoulder: [136, 62], elbow: [124, 78], wrist: [134, 62], hip: [136, 110], knee: [140, 138], ankle: [136, 168], propType: 'barbell' },
    end: { head: [148, 72], shoulder: [140, 92], elbow: [126, 106], wrist: [138, 92], hip: [108, 134], knee: [154, 134], ankle: [136, 168], propType: 'barbell' },
  },
  'front-squat': {
    focusZone: 'quad',
    start: { head: [138, 38], shoulder: [136, 62], elbow: [166, 62], wrist: [144, 60], hip: [136, 110], knee: [140, 138], ankle: [136, 168], propType: 'barbell' },
    end: { head: [140, 72], shoulder: [136, 94], elbow: [166, 92], wrist: [144, 92], hip: [116, 136], knee: [156, 134], ankle: [136, 168], propType: 'barbell' },
  },
  lunge: {
    focusZone: 'quad',
    start: { head: [148, 38], shoulder: [148, 62], elbow: [148, 90], wrist: [148, 114], hip: [148, 110], knee: [150, 138], ankle: [148, 168], propType: 'dumbbell' },
    end: { head: [148, 66], shoulder: [146, 90], elbow: [146, 116], wrist: [146, 140], hip: [142, 132], knee: [182, 132], ankle: [182, 168], propType: 'dumbbell' },
  },
  'bulgarian-split-squat': {
    focusZone: 'quad',
    start: { head: [156, 40], shoulder: [154, 64], elbow: [154, 92], wrist: [154, 116], hip: [152, 110], knee: [164, 138], ankle: [164, 168], propType: 'box' },
    end: { head: [156, 68], shoulder: [152, 92], elbow: [152, 118], wrist: [152, 142], hip: [144, 134], knee: [182, 134], ankle: [164, 168], propType: 'box' },
  },
  'romanian-deadlift': {
    focusZone: 'hamstring',
    start: { head: [142, 38], shoulder: [140, 62], elbow: [142, 92], wrist: [144, 116], hip: [136, 108], knee: [140, 138], ankle: [136, 168], propType: 'barbell' },
    end: { head: [188, 66], shoulder: [166, 78], elbow: [162, 110], wrist: [158, 138], hip: [108, 98], knee: [128, 138], ankle: [136, 168], propType: 'barbell' },
  },
  'leg-press': {
    focusZone: 'quad',
    start: { head: [76, 126], shoulder: [96, 136], elbow: [110, 150], wrist: [126, 152], hip: [132, 154], knee: [168, 122], ankle: [208, 94], propType: 'machine-leg' },
    end: { head: [76, 126], shoulder: [96, 136], elbow: [110, 150], wrist: [126, 152], hip: [132, 154], knee: [134, 110], ankle: [172, 116], propType: 'machine-leg' },
  },
  'leg-extension': {
    focusZone: 'quad',
    start: { head: [110, 56], shoulder: [112, 80], elbow: [114, 108], wrist: [122, 128], hip: [116, 126], knee: [160, 126], ankle: [158, 168], propType: 'bench' },
    end: { head: [110, 56], shoulder: [112, 80], elbow: [114, 108], wrist: [122, 128], hip: [116, 126], knee: [160, 126], ankle: [206, 124], propType: 'bench' },
  },
  'leg-curl': {
    focusZone: 'hamstring',
    start: { head: [212, 124], shoulder: [186, 128], elbow: [194, 152], wrist: [214, 152], hip: [136, 132], knee: [92, 134], ankle: [48, 136], propType: 'bench' },
    end: { head: [212, 124], shoulder: [186, 128], elbow: [194, 152], wrist: [214, 152], hip: [136, 132], knee: [92, 134], ankle: [98, 92], propType: 'bench' },
  },
  'calf-raise': {
    focusZone: 'calf',
    start: { head: [140, 44], shoulder: [140, 68], elbow: [144, 96], wrist: [148, 122], hip: [140, 114], knee: [140, 142], ankle: [138, 170], propType: 'dumbbell' },
    end: { head: [140, 32], shoulder: [140, 56], elbow: [144, 84], wrist: [148, 110], hip: [140, 102], knee: [140, 130], ankle: [142, 156], propType: 'dumbbell' },
  },
  'seated-calf-raise': {
    focusZone: 'calf',
    start: { head: [112, 56], shoulder: [112, 80], elbow: [128, 102], wrist: [152, 116], hip: [114, 126], knee: [160, 126], ankle: [158, 168], propType: 'dumbbell' },
    end: { head: [112, 56], shoulder: [112, 80], elbow: [128, 102], wrist: [152, 110], hip: [114, 126], knee: [160, 116], ankle: [162, 154], propType: 'dumbbell' },
  },
  'glute-bridge': {
    focusZone: 'glute',
    start: { head: [68, 156], shoulder: [94, 158], elbow: [118, 164], wrist: [144, 166], hip: [148, 160], knee: [184, 122], ankle: [208, 168], propType: 'none' },
    end: { head: [68, 156], shoulder: [94, 158], elbow: [118, 164], wrist: [144, 166], hip: [146, 124], knee: [188, 118], ankle: [208, 168], propType: 'none' },
  },
  'hip-thrust': {
    focusZone: 'glute',
    start: { head: [80, 102], shoulder: [100, 118], elbow: [122, 136], wrist: [142, 144], hip: [144, 154], knee: [186, 120], ankle: [194, 168], propType: 'barbell' },
    end: { head: [84, 96], shoulder: [102, 116], elbow: [126, 122], wrist: [148, 116], hip: [148, 116], knee: [192, 116], ankle: [194, 168], propType: 'barbell' },
  },
  'step-up': {
    focusZone: 'glute',
    start: { head: [126, 48], shoulder: [126, 72], elbow: [128, 100], wrist: [130, 124], hip: [126, 116], knee: [164, 116], ankle: [168, 144], propType: 'box' },
    end: { head: [166, 24], shoulder: [166, 48], elbow: [168, 76], wrist: [170, 100], hip: [166, 92], knee: [168, 118], ankle: [168, 144], propType: 'box' },
  },
  'glute-kickback': {
    focusZone: 'glute',
    start: { head: [176, 56], shoulder: [158, 72], elbow: [176, 92], wrist: [196, 88], hip: [124, 106], knee: [132, 138], ankle: [136, 168], propType: 'cable-low' },
    end: { head: [176, 56], shoulder: [158, 72], elbow: [176, 92], wrist: [196, 88], hip: [124, 106], knee: [94, 122], ankle: [62, 132], propType: 'cable-low' },
  },
  'kettlebell-swing': {
    focusZone: 'glute',
    start: { head: [184, 68], shoulder: [162, 80], elbow: [142, 106], wrist: [122, 128], hip: [108, 100], knee: [128, 136], ankle: [132, 168], propType: 'kettlebell' },
    end: { head: [140, 38], shoulder: [138, 64], elbow: [168, 68], wrist: [198, 70], hip: [138, 112], knee: [138, 140], ankle: [132, 168], propType: 'kettlebell' },
  },
  plank: {
    focusZone: 'core',
    start: { head: [222, 122], shoulder: [196, 130], elbow: [194, 166], wrist: [222, 166], hip: [132, 142], knee: [86, 154], ankle: [44, 166], propType: 'none' },
    end: { head: [222, 118], shoulder: [196, 126], elbow: [194, 166], wrist: [222, 166], hip: [132, 138], knee: [86, 152], ankle: [44, 166], propType: 'none' },
  },
  'side-plank': {
    focusZone: 'core',
    start: { head: [212, 108], shoulder: [188, 118], elbow: [186, 166], wrist: [206, 166], hip: [128, 136], knee: [84, 152], ankle: [44, 166], propType: 'none' },
    end: { head: [212, 102], shoulder: [188, 112], elbow: [186, 166], wrist: [206, 166], hip: [128, 128], knee: [84, 148], ankle: [44, 166], propType: 'none' },
  },
  'dead-bug': {
    focusZone: 'core',
    start: { head: [72, 154], shoulder: [98, 156], elbow: [98, 124], wrist: [98, 92], hip: [156, 158], knee: [156, 116], ankle: [194, 116], propType: 'none' },
    end: { head: [72, 154], shoulder: [98, 156], elbow: [74, 142], wrist: [48, 138], hip: [156, 158], knee: [194, 146], ankle: [232, 144], propType: 'none' },
  },
  'bird-dog': {
    focusZone: 'core',
    start: { head: [204, 102], shoulder: [178, 106], elbow: [178, 138], wrist: [178, 166], hip: [116, 108], knee: [116, 166], ankle: [82, 166], propType: 'none' },
    end: { head: [204, 102], shoulder: [178, 106], elbow: [208, 104], wrist: [238, 102], hip: [116, 108], knee: [78, 108], ankle: [42, 108], propType: 'none' },
  },
  'reverse-crunch': {
    focusZone: 'core',
    start: { head: [72, 154], shoulder: [98, 156], elbow: [124, 162], wrist: [152, 166], hip: [156, 158], knee: [158, 118], ankle: [194, 120], propType: 'none' },
    end: { head: [72, 154], shoulder: [98, 156], elbow: [124, 162], wrist: [152, 166], hip: [144, 136], knee: [118, 104], ankle: [144, 92], propType: 'none' },
  },
  'hanging-knee-raise': {
    focusZone: 'core',
    start: { head: [140, 58], shoulder: [140, 76], elbow: [140, 52], wrist: [140, 28], hip: [140, 122], knee: [140, 150], ankle: [140, 174], propType: 'pullup-bar' },
    end: { head: [140, 58], shoulder: [140, 76], elbow: [140, 52], wrist: [140, 28], hip: [144, 116], knee: [172, 98], ankle: [164, 128], propType: 'pullup-bar' },
  },
  'pallof-press': {
    focusZone: 'core',
    start: { head: [132, 44], shoulder: [132, 68], elbow: [124, 92], wrist: [142, 88], hip: [132, 116], knee: [136, 142], ankle: [132, 168], propType: 'cable-high' },
    end: { head: [132, 44], shoulder: [132, 68], elbow: [162, 84], wrist: [192, 84], hip: [132, 116], knee: [136, 142], ankle: [132, 168], propType: 'cable-high' },
  },
  'farmers-carry': {
    focusZone: 'core',
    start: { head: [136, 40], shoulder: [136, 64], elbow: [136, 94], wrist: [136, 122], hip: [136, 112], knee: [128, 140], ankle: [120, 168], propType: 'kettlebell' },
    end: { head: [144, 38], shoulder: [144, 62], elbow: [144, 92], wrist: [144, 120], hip: [144, 110], knee: [156, 138], ankle: [164, 168], propType: 'kettlebell' },
  },
  'wrist-curl': {
    focusZone: 'arm',
    start: { head: [116, 56], shoulder: [116, 80], elbow: [136, 114], wrist: [166, 122], hip: [114, 126], knee: [160, 126], ankle: [162, 168], propType: 'dumbbell' },
    end: { head: [116, 56], shoulder: [116, 80], elbow: [136, 114], wrist: [168, 106], hip: [114, 126], knee: [160, 126], ankle: [162, 168], propType: 'dumbbell' },
  },
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function lerpPoint(p1: [number, number], p2: [number, number], t: number): [number, number] {
  return [lerp(p1[0], p2[0], t), lerp(p1[1], p2[1], t)]
}

interface ExerciseAnimatorProps {
  meta: ExerciseAnimationMeta
  primaryMuscleGroup: MuscleGroupId
  compact?: boolean
}

export function ExerciseAnimator({
  meta,
  compact = false,
}: ExerciseAnimatorProps) {
  const { prefersReducedMotion } = useAppStore()
  const [isPlaying, setIsPlaying] = useState<boolean>(() => !prefersReducedMotion)
  const [speed, setSpeed] = useState<0.5 | 1>(1)
  const [phaseMode, setPhaseMode] = useState<'loop' | 'start' | 'end'>(() =>
    prefersReducedMotion ? 'end' : 'loop'
  )
  const [progress, setProgress] = useState<number>(prefersReducedMotion ? 1 : 0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPlaying(false)
      setPhaseMode('end')
      setProgress(1)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (compact) {
      setProgress(0.85)
      return
    }
    if (phaseMode === 'start') {
      setProgress(0)
      return
    }
    if (phaseMode === 'end') {
      setProgress(1)
      return
    }
    if (!isPlaying) return

    let rafId = 0
    const startTs = performance.now()
    const cycleMs = speed === 0.5 ? 4400 : 2200

    const tick = (now: number) => {
      const elapsed = (now - startTs) % cycleMs
      const norm = elapsed / cycleMs
      // Smooth sine wave 0 -> 1 -> 0
      const ease = 0.5 - 0.5 * Math.cos(norm * Math.PI * 2)
      setProgress(ease)
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [compact, isPlaying, phaseMode, speed])

  const posePair = POSE_LIBRARY[meta.poseId] ?? POSE_LIBRARY.pushup
  const t = compact ? 0.85 : progress

  const head = lerpPoint(posePair.start.head, posePair.end.head, t)
  const shoulder = lerpPoint(posePair.start.shoulder, posePair.end.shoulder, t)
  const elbow = lerpPoint(posePair.start.elbow, posePair.end.elbow, t)
  const wrist = lerpPoint(posePair.start.wrist, posePair.end.wrist, t)
  const hip = lerpPoint(posePair.start.hip, posePair.end.hip, t)
  const knee = lerpPoint(posePair.start.knee, posePair.end.knee, t)
  const ankle = lerpPoint(posePair.start.ankle, posePair.end.ankle, t)

  const focusNode: [number, number] =
    posePair.focusZone === 'chest' || posePair.focusZone === 'shoulder' || posePair.focusZone === 'back'
      ? shoulder
      : posePair.focusZone === 'arm'
        ? elbow
        : posePair.focusZone === 'core'
          ? [(shoulder[0] + hip[0]) / 2, (shoulder[1] + hip[1]) / 2]
          : posePair.focusZone === 'glute'
            ? hip
            : posePair.focusZone === 'quad' || posePair.focusZone === 'hamstring'
              ? [(hip[0] + knee[0]) / 2, (hip[1] + knee[1]) / 2]
              : [(knee[0] + ankle[0]) / 2, (knee[1] + ankle[1]) / 2]

  const propType = posePair.start.propType ?? 'none'

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#10131e] via-[#0c0e17] to-[#131826] ${
        compact ? 'p-2' : 'p-4 sm:p-5'
      }`}
    >
      {/* Üst Bilgi Rozetleri (Yalnızca Detay Görünümünde) */}
      {!compact && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-xs font-bold text-lime-300">
              <span
                className={`h-2 w-2 rounded-full bg-lime-400 ${
                  isPlaying && phaseMode === 'loop' ? 'animate-ping' : ''
                }`}
              />
              {phaseMode === 'loop' && isPlaying
                ? `Canlı Kinematik Gösterim (${speed}x)`
                : phaseMode === 'start'
                  ? `1. Faz: ${meta.startLabel}`
                  : `2. Faz: ${meta.endLabel}`}
            </span>
            {prefersReducedMotion && (
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-200">
                Azaltılmış hareket modu aktif
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            Yeşil halka: Hedef eklem / kas bölgesi
          </span>
        </div>
      )}

      {/* SVG Kinematik Sahne */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 280 190"
          className={compact ? 'h-36 w-full' : 'h-60 w-full sm:h-72'}
          role="img"
          aria-label={meta.accessibleDescription}
        >
          <defs>
            <radialGradient id={`focusGlow-${meta.poseId}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Arka Plan Referans Izgarası ve Zemin */}
          <line x1="20" y1="170" x2="260" y2="170" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="45" x2="260" y2="45" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="20" y1="105" x2="260" y2="105" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

          {/* Sabit Ekipman Çizimleri */}
          {propType === 'bench' && (
            <g stroke="#475569" strokeWidth="4" strokeLinecap="round">
              <line x1="65" y1="138" x2="180" y2="138" />
              <line x1="85" y1="138" x2="85" y2="170" />
              <line x1="165" y1="138" x2="165" y2="170" />
            </g>
          )}
          {propType === 'box' && (
            <rect
              x="150"
              y="142"
              width="66"
              height="28"
              rx="4"
              fill="#1e293b"
              stroke="#475569"
              strokeWidth="2"
            />
          )}
          {propType === 'wall' && (
            <line x1="38" y1="15" x2="38" y2="170" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          )}
          {propType === 'pullup-bar' && (
            <g stroke="#64748b" strokeWidth="3.5" strokeLinecap="round">
              <line x1="90" y1="24" x2="190" y2="24" />
              <line x1="96" y1="24" x2="96" y2="170" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="184" y1="24" x2="184" y2="170" strokeWidth="2" strokeDasharray="3 3" />
            </g>
          )}
          {propType === 'cable-high' && (
            <g>
              <line x1="226" y1="20" x2="226" y2="170" stroke="#475569" strokeWidth="4" />
              <circle cx="226" cy="32" r="5" fill="#38bdf8" />
              <line
                x1="226"
                y1="32"
                x2={wrist[0]}
                y2={wrist[1]}
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="3 2"
              />
            </g>
          )}
          {propType === 'cable-low' && (
            <g>
              <line x1="226" y1="20" x2="226" y2="170" stroke="#475569" strokeWidth="4" />
              <circle cx="226" cy="148" r="5" fill="#38bdf8" />
              <line
                x1="226"
                y1="148"
                x2={meta.poseId === 'glute-kickback' ? ankle[0] : wrist[0]}
                y2={meta.poseId === 'glute-kickback' ? ankle[1] : wrist[1]}
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="3 2"
              />
            </g>
          )}
          {propType === 'machine-leg' && (
            <g stroke="#475569" strokeWidth="3.5" strokeLinecap="round">
              <line x1="65" y1="128" x2="135" y2="162" />
              <line
                x1={ankle[0] - 10}
                y1={ankle[1] - 16}
                x2={ankle[0] + 12}
                y2={ankle[1] + 16}
                stroke="#38bdf8"
                strokeWidth="5"
              />
            </g>
          )}

          {/* Başlangıç Pozisyonu Hayalet İskeleti (Yalnızca Detay Görünümünde) */}
          {!compact && (
            <g opacity="0.22" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" fill="none">
              <line
                x1={posePair.start.shoulder[0]}
                y1={posePair.start.shoulder[1]}
                x2={posePair.start.hip[0]}
                y2={posePair.start.hip[1]}
              />
              <line
                x1={posePair.start.shoulder[0]}
                y1={posePair.start.shoulder[1]}
                x2={posePair.start.elbow[0]}
                y2={posePair.start.elbow[1]}
              />
              <line
                x1={posePair.start.elbow[0]}
                y1={posePair.start.elbow[1]}
                x2={posePair.start.wrist[0]}
                y2={posePair.start.wrist[1]}
              />
              <line
                x1={posePair.start.hip[0]}
                y1={posePair.start.hip[1]}
                x2={posePair.start.knee[0]}
                y2={posePair.start.knee[1]}
              />
              <line
                x1={posePair.start.knee[0]}
                y1={posePair.start.knee[1]}
                x2={posePair.start.ankle[0]}
                y2={posePair.start.ankle[1]}
              />
            </g>
          )}

          {/* Hedef Kas Odak Halkası */}
          <circle cx={focusNode[0]} cy={focusNode[1]} r="24" fill={`url(#focusGlow-${meta.poseId})`} />
          <circle
            cx={focusNode[0]}
            cy={focusNode[1]}
            r="12"
            fill="none"
            stroke="#a3e635"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />

          {/* Ana Artiküle İnsan Figürü */}
          {/* Gövde (Torso) */}
          <line
            x1={shoulder[0]}
            y1={shoulder[1]}
            x2={hip[0]}
            y2={hip[1]}
            stroke="#e2e8f0"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Üst Bacak (Femur) */}
          <line
            x1={hip[0]}
            y1={hip[1]}
            x2={knee[0]}
            y2={knee[1]}
            stroke="#cbd5e1"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Alt Bacak (Tibia) */}
          <line
            x1={knee[0]}
            y1={knee[1]}
            x2={ankle[0]}
            y2={ankle[1]}
            stroke="#94a3b8"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Üst Kol (Humerus) */}
          <line
            x1={shoulder[0]}
            y1={shoulder[1]}
            x2={elbow[0]}
            y2={elbow[1]}
            stroke="#a3e635"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          {/* Ön Kol (Radius/Ulna) */}
          <line
            x1={elbow[0]}
            y1={elbow[1]}
            x2={wrist[0]}
            y2={wrist[1]}
            stroke="#bef264"
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* Eklem Noktaları ve Baş */}
          <circle cx={head[0]} cy={head[1]} r="10.5" fill="#0f172a" stroke="#e2e8f0" strokeWidth="3" />
          <circle cx={shoulder[0]} cy={shoulder[1]} r="4.5" fill="#a3e635" />
          <circle cx={elbow[0]} cy={elbow[1]} r="4" fill="#38bdf8" />
          <circle cx={hip[0]} cy={hip[1]} r="4.5" fill="#a3e635" />
          <circle cx={knee[0]} cy={knee[1]} r="4" fill="#38bdf8" />
          <circle cx={ankle[0]} cy={ankle[1]} r="3.5" fill="#e2e8f0" />

          {/* Elde Taşınan Ağırlıklar (Dumbbell / Barbell / Kettlebell) */}
          {propType === 'dumbbell' && (
            <g transform={`translate(${wrist[0]}, ${wrist[1]})`}>
              <rect x="-8" y="-3" width="16" height="6" rx="2" fill="#38bdf8" />
              <rect x="-10" y="-6" width="4" height="12" rx="1.5" fill="#f8fafc" />
              <rect x="6" y="-6" width="4" height="12" rx="1.5" fill="#f8fafc" />
            </g>
          )}
          {propType === 'barbell' && (
            <g
              transform={`translate(${
                meta.poseId === 'hip-thrust' ? hip[0] : wrist[0]
              }, ${meta.poseId === 'hip-thrust' ? hip[1] - 4 : wrist[1]})`}
            >
              <circle cx="0" cy="0" r="11" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="0" cy="0" r="3.5" fill="#f8fafc" />
            </g>
          )}
          {propType === 'kettlebell' && (
            <g transform={`translate(${wrist[0]}, ${wrist[1] + 6})`}>
              <circle cx="0" cy="4" r="8" fill="#f59e0b" stroke="#fef3c7" strokeWidth="1.5" />
              <path d="M-4 -2 C-4 -7 4 -7 4 -2" fill="none" stroke="#fef3c7" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>

      {/* Alt Animasyon Kontrolleri (Yalnızca Detay Görünümünde) */}
      {!compact && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
          {/* Oynat / Duraklat ve Hız */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPhaseMode('loop')
                setIsPlaying((p) => !p)
              }}
              aria-pressed={isPlaying && phaseMode === 'loop'}
              className="inline-flex items-center gap-1.5 rounded-xl bg-lime-400 px-3.5 py-2 text-xs font-bold text-slate-950 transition hover:bg-lime-300"
            >
              {isPlaying && phaseMode === 'loop' ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Duraklat</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  <span>Oynat</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setSpeed((s) => (s === 1 ? 0.5 : 1))}
              aria-label="Animasyon hızını değiştir"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-lime-400/50 hover:text-white"
            >
              <Gauge className="h-3.5 w-3.5 text-lime-400" />
              <span>{speed === 1 ? '1x Normal Hız' : '0.5x Yavaş İncele'}</span>
            </button>
          </div>

          {/* Pozisyon / Faz Seçici */}
          <div
            className="inline-flex rounded-xl border border-white/10 bg-slate-900/90 p-1"
            role="group"
            aria-label="Hareket pozisyonu inceleme seçici"
          >
            <button
              type="button"
              onClick={() => {
                setPhaseMode('start')
                setIsPlaying(false)
              }}
              aria-pressed={phaseMode === 'start'}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                phaseMode === 'start'
                  ? 'bg-sky-400 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="h-3 w-3" />
              <span>1. Başlangıç</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPhaseMode('end')
                setIsPlaying(false)
              }}
              aria-pressed={phaseMode === 'end'}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                phaseMode === 'end'
                  ? 'bg-sky-400 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="h-3 w-3" />
              <span>2. Bitiş / Kasılma</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
