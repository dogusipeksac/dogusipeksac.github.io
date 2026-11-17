import type { Exercise, Muscle } from '../types'
import { sourceStatus } from './catalog.ts'

export type Draft = Pick<Exercise, 'id' | 'name' | 'english' | 'group' | 'equipment' | 'level' | 'pattern' | 'description'> & {
  primary: string; secondary: string; steps: string; errors: string; caution: string;
  sources?: string[]; alternatives: string[]; unilateral?: boolean;
  dose?: Exercise['prescription']; stabilizers?: string[];
}
const parseMuscles = (value: string): Muscle[] => value ? value.split('|').map(entry => {
  const [group, name] = entry.split(':'); return { group: group as Muscle['group'], name }
}) : []
export function define(d: Draft): Exercise {
  return {
    id: d.id, slug: d.id, name: d.name, english: d.english,
    aliases: [d.english.replaceAll('-', ' '), d.name.replaceAll('Dambıl', 'Dumbbell')],
    description: d.description, group: d.group, primary: parseMuscles(d.primary), secondary: parseMuscles(d.secondary),
    stabilizers: d.stabilizers ?? ['Gövde çevresi kasları'], equipment: d.equipment,
    environments: d.equipment.some(e => ['kablo', 'makine', 'rack'].includes(e)) ? ['salon'] : ['ev', 'salon'],
    level: d.level, pattern: d.pattern, compound: !['izolasyon'].includes(d.pattern), unilateral: d.unilateral ?? false,
    steps: [...d.steps.split('|'), 'Nefesini uzun süre tutmadan, kontrol edebildiğin bir tempoda devam et; form bozulmadan seti bitir.'],
    cautions: [d.caution, 'Ağrı hissedersen hareketi durdur. Devam eden yakınmalar veya özel sağlık durumları için uygun bir sağlık uzmanına danış.'],
    mistakes: d.errors.split('|').map(e => { const [mistake, correction] = e.split('>'); return { mistake, correction } }),
    prescription: d.dose ?? { beginner: d.level === 'ileri' ? 'Önce daha kolay alternatifi öğren; eğitmenle ilerle.' : '1–2 set × 6–10 kontrollü tekrar', intermediate: d.pattern === 'izolasyon' ? '2–3 set × 10–15 tekrar' : '2–3 set × 8–12 tekrar', unit: 'tekrar' },
    alternatives: d.alternatives.map((id, i) => ({ id, label: ['Daha kolay yaklaşım', 'Farklı varyasyon', 'Farklı ekipman'][i] ?? 'İlgili alternatif' })),
    media: { type: ['push-up', 'bodyweight-squat', 'dumbbell-shoulder-press', 'dumbbell-curl', 'plank', 'glute-bridge'].includes(d.id) ? 'schematic' : 'pending', alt: `${d.name}: şematik kas haritası; kişiye özel anatomik veya teknik değerlendirme değildir.` },
    editorial: { sourceIds: d.sources ?? ['nhs'], status: sourceStatus, reviewed: '2026-11-17' },
  }
}
