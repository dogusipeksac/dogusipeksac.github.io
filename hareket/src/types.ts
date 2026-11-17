export type Group = 'gogus' | 'sirt' | 'omuz' | 'biceps' | 'triceps' | 'on-kol' | 'core' | 'kalca' | 'on-bacak' | 'arka-bacak' | 'baldir'
export type Equipment = 'vucut-agirligi' | 'dumbbell' | 'barbell' | 'kettlebell' | 'direnc-bandi' | 'kablo' | 'makine' | 'barfiks-bari' | 'sehpa' | 'rack' | 'duvar' | 'sabit-destek' | 'band-sabitleyici'
export type Level = 'baslangic' | 'orta' | 'ileri'
export type Pattern = 'itis' | 'cekis' | 'squat' | 'kalca-mentesesi' | 'core' | 'izolasyon' | 'tasima'
export type Muscle = { group: Group; name: string }
export type Exercise = {
  id: string; slug: string; name: string; english: string; aliases: string[]; description: string;
  group: Group; primary: Muscle[]; secondary: Muscle[]; stabilizers: string[];
  equipment: Equipment[]; environments: ('ev' | 'salon')[]; level: Level;
  pattern: Pattern; compound: boolean; unilateral: boolean;
  steps: string[]; cautions: string[]; mistakes: { mistake: string; correction: string }[];
  prescription: { beginner: string; intermediate: string; unit: 'tekrar' | 'süre' | 'mesafe' };
  alternatives: { id: string; label: string }[];
  media: { type: 'schematic' | 'pending'; alt: string };
  editorial: { sourceIds: string[]; status: string; reviewed: string };
}
