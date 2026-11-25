/* ==========================================================================
   DOGUS IPEKSAC — GAME, 3D MODEL & UNITY ASSET CATALOG MANIFEST
   --------------------------------------------------------------------------
   Yeni bir asset paketi eklemek icin:
   1) Indirilebilir dosyayi /assets/packs/<slug>/ klasorune koyun.
   2) Kapak gorselini   /assets/previews/<slug>.png (veya .webp) olarak ekleyin.
   3) Asagidaki window.ASSET_PACKS dizisine bir obje ekleyin.
   ========================================================================== */

window.ASSET_CATEGORIES = [
  { id: 'all', label: { tr: 'Tümü', en: 'All' }, icon: '🧩' },
  { id: '3d-models', label: { tr: '3D Modeller & Low-Poly', en: '3D Models & Low-Poly' }, icon: '🧊' },
  { id: 'environments', label: { tr: 'Çevre & Prop', en: 'Environments & Props' }, icon: '🏙️' },
  { id: 'shaders-vfx', label: { tr: 'Shader & VFX', en: 'Shaders & VFX' }, icon: '✨' },
  { id: 'ui-hud', label: { tr: 'UI & HUD Kit', en: 'UI & HUD Kits' }, icon: '🎮' },
  { id: 'tools-scripts', label: { tr: 'C# Araç & Sistemler', en: 'C# Tools & Systems' }, icon: '⚙️' }
];

window.ASSET_PIPELINES = [
  { id: 'all', label: { tr: 'Tüm Pipeline', en: 'All Pipelines' } },
  { id: 'URP', label: { tr: 'URP', en: 'URP' } },
  { id: 'HDRP', label: { tr: 'HDRP', en: 'HDRP' } },
  { id: 'Built-in', label: { tr: 'Built-in', en: 'Built-in' } },
  { id: 'FBX / GLB', label: { tr: 'FBX / GLB', en: 'FBX / GLB' } }
];

/* Ornek Paket Semasi:
{
  id: 'lowpoly-street-props',
  slug: 'lowpoly-street-props',
  category: 'environments',           // '3d-models' | 'environments' | 'shaders-vfx' | 'ui-hud' | 'tools-scripts'
  pipelines: ['URP', 'Built-in', 'FBX / GLB'],
  unityVersion: '2022.3 LTS+',
  version: 'v1.0.0',
  fileFormat: '.unitypackage + .glb',
  fileSize: '24.6 MB',
  polyCount: '320 – 2.4k tris',
  textures: '1024px PBR / Palette',
  license: 'Commercial · CC0 / MIT',
  priceLabel: { tr: 'Ücretsiz', en: 'Free' },
  featured: true,
  badge: { tr: 'YENİ', en: 'NEW' },
  title: {
    tr: 'Low-Poly Şehir & Sokak Prop Paketi',
    en: 'Low-Poly City & Street Props Pack'
  },
  summary: {
    tr: 'Modüler sokak lambaları, banklar, trafik konileri ve kaldırım setleri; hazır prefab ve collider ile.',
    en: 'Modular street lamps, benches, traffic cones, and sidewalk pieces with ready prefabs and colliders.'
  },
  description: {
    tr: 'Mobil ve masaüstü Unity projeleri için optimize edilmiş 45+ low-poly sokak propu. Tek atlas materyaliyle minimum draw-call.',
    en: '45+ low-poly street props optimized for mobile and desktop Unity builds with single-atlas materials for minimal draw calls.'
  },
  tags: ['Low-Poly', 'URP', 'Prefab', 'Mobile Ready'],
  previewImage: '/assets/previews/lowpoly-street-props.webp',
  downloadUrl: '/assets/packs/lowpoly-street-props/lowpoly-street-props-v1.0.0.unitypackage',
  externalLinks: [
    { label: 'Unity Asset Store', url: 'https://assetstore.unity.com/' },
    { label: 'GitHub', url: 'https://github.com/dogusipeksac' }
  ],
  contents: [
    '45+ Prefab (LOD0 + Collider)',
    '1 Shared Color Palette Texture (1024x1024)',
    'URP & Built-in Material Variants',
    'FBX + GLB Source Files & Demo Scene'
  ]
}
*/

window.ASSET_PACKS = [];
