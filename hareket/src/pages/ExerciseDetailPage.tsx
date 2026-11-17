import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Building2,
  CheckCircle2,
  Clock,
  Dumbbell,
  Home,
  Info,
  Repeat,
  ShieldAlert,
  Sparkles,
  XCircle,
} from 'lucide-react'
import { EQUIPMENT_MAP } from '../data/equipment'
import {
  EXERCISE_BY_SLUG,
  getExercisesByMuscleGroup,
  LATERALITY_LABELS,
  LEVEL_LABELS,
  MECHANIC_LABELS,
  MOVEMENT_PATTERN_LABELS,
} from '../data/exercises'
import { MUSCLE_GROUP_MAP } from '../data/muscleGroups'
import { BodyDiagram } from '../components/BodyDiagram'
import { ExerciseAnimator } from '../components/ExerciseAnimator'
import { ExerciseCard } from '../components/ExerciseCard'
import { useAppStore } from '../hooks/useAppStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { Exercise } from '../types/fitness'

export function ExerciseDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useAppStore()

  const exercise = slug ? EXERCISE_BY_SLUG[slug] : undefined

  useDocumentMeta(
    exercise
      ? `${exercise.trName} (${exercise.enName}) Nasıl Yapılır? — Çalışan Kaslar & Form`
      : 'Hareket Bulunamadı',
    exercise?.shortDescription
  )

  if (!exercise) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
          Aradığınız hareket bulunamadı
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Bağlantı adresi değişmiş olabilir. Tüm hareket kütüphanesine dönerek aramanızı
          yenileyebilirsiniz.
        </p>
        <Link
          to="/hareketler"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-lime-400 px-6 py-3 text-sm font-extrabold text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Tüm Hareketlere Dön</span>
        </Link>
      </div>
    )
  }

  const fav = isFavorite(exercise.slug)
  const primaryGroup = MUSCLE_GROUP_MAP[exercise.primaryMuscleGroup]

  // Gerçek veri setinde var olan alternatif hareketleri çözümle
  const easierEx = exercise.alternatives.easier
    ? EXERCISE_BY_SLUG[exercise.alternatives.easier]
    : undefined
  const harderEx = exercise.alternatives.harder
    ? EXERCISE_BY_SLUG[exercise.alternatives.harder]
    : undefined
  const homeAltEx = exercise.alternatives.homeAlt
    ? EXERCISE_BY_SLUG[exercise.alternatives.homeAlt]
    : undefined
  const equipmentAltList = (exercise.alternatives.equipmentAlt ?? [])
    .map((id) => EXERCISE_BY_SLUG[id])
    .filter((item): item is Exercise => Boolean(item))

  // Aynı kas grubundaki ilişkili diğer hareketler
  const relatedExercises = getExercisesByMuscleGroup(exercise.primaryMuscleGroup, false)
    .filter((item) => item.slug !== exercise.slug)
    .slice(0, 3)

  const levelBadgeClass =
    exercise.level === 'baslangic'
      ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300'
      : exercise.level === 'orta'
        ? 'border-sky-400/40 bg-sky-400/15 text-sky-300'
        : 'border-amber-400/45 bg-amber-400/15 text-amber-300'

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
      {/* Üst Gezinme Çubuğu */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <Link
            to="/hareketler"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-bold text-slate-200 transition hover:border-lime-400/40 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Hareketler</span>
          </Link>
          <span>/</span>
          <Link
            to={`/kas-gruplari/${exercise.primaryMuscleGroup}`}
            className="font-semibold text-lime-400 hover:underline"
          >
            {primaryGroup?.name}
          </Link>
          <span>/</span>
          <span className="font-semibold text-white">{exercise.trName}</span>
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(exercise.slug)}
          aria-pressed={fav}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-extrabold transition focus:ring-2 focus:ring-lime-400 focus:outline-none ${
            fav
              ? 'border-lime-400 bg-lime-400 text-slate-950 shadow-md shadow-lime-400/20'
              : 'border-white/15 bg-white/5 text-white hover:border-lime-400/50'
          }`}
        >
          <Bookmark className={`h-4 w-4 ${fav ? 'fill-current' : ''}`} />
          <span>{fav ? 'Favorilerimde Kayıtlı' : 'Favorilere Ekle'}</span>
        </button>
      </div>

      {/* =====================================================================
          A) ÜST BÖLÜM: BAŞLIK, ETİKETLER VE ÖZET METADATA
          ===================================================================== */}
      <header className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#131726] via-[#0e111c] to-[#121623] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <Link
            to={`/kas-gruplari/${exercise.primaryMuscleGroup}`}
            className="rounded-lg border border-lime-400/40 bg-lime-400/15 px-3 py-1 text-lime-300 hover:bg-lime-400/25"
          >
            Ana Kas: {primaryGroup?.name}
          </Link>
          <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
            {exercise.subRegionTag}
          </span>
          <span className={`rounded-lg border px-3 py-1 ${levelBadgeClass}`}>
            Seviye: {LEVEL_LABELS[exercise.level]}
          </span>
          <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
            Tip: {MOVEMENT_PATTERN_LABELS[exercise.movementPattern]}
          </span>
          <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
            {MECHANIC_LABELS[exercise.mechanic]} · {LATERALITY_LABELS[exercise.laterality]}
          </span>
        </div>

        <h1 className="mt-4 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {exercise.trName}
        </h1>
        <p className="mt-1 text-base font-bold text-lime-400 sm:text-lg">
          {exercise.enName}
        </p>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
          {exercise.shortDescription}
        </p>

        {/* İleri Seviye Uyarısı (Varsa) */}
        {exercise.levelWarning && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-400/35 bg-amber-400/10 p-4 text-xs leading-relaxed text-amber-200">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div>{exercise.levelWarning}</div>
          </div>
        )}

        {/* Gerekli Ekipmanlar ve Uygun Ortam */}
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/10 pt-5 md:grid-cols-2">
          <div>
            <span className="mb-2 block text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
              Gerekli Tüm Ekipmanlar
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {exercise.equipment.map((eqId) => (
                <Link
                  key={eqId}
                  to={`/ekipmanlar/${eqId}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-xs font-bold text-sky-300 transition hover:bg-sky-400/20"
                >
                  <Dumbbell className="h-3.5 w-3.5" />
                  <span>{EQUIPMENT_MAP[eqId]?.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-2 block text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
              Uygun Çalışma Ortamı
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {exercise.environments.includes('ev') && (
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-lime-400/30 bg-lime-400/10 px-3 py-1.5 text-xs font-bold text-lime-300">
                  <Home className="h-3.5 w-3.5" />
                  <span>Ev Ortamına Uygun</span>
                </span>
              )}
              {exercise.environments.includes('salon') && (
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-200">
                  <Building2 className="h-3.5 w-3.5 text-sky-400" />
                  <span>Spor Salonu</span>
                </span>
              )}
            </div>
            {exercise.environmentNote && (
              <p className="mt-2 text-xs text-slate-400">{exercise.environmentNote}</p>
            )}
          </div>
        </div>
      </header>

      {/* =====================================================================
          B) HAREKET ANİMASYONU & C) ÇALIŞAN KASLARI GÖSTEREN VÜCUT DİYAGRAMI
          ===================================================================== */}
      <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Sol: Harekete Özgü Kinematik Animasyon */}
        <section className="lg:col-span-6" aria-labelledby="animasyon-baslik">
          <div className="mb-3 flex items-center justify-between">
            <h2
              id="animasyon-baslik"
              className="font-['Space_Grotesk'] text-xl font-bold text-white"
            >
              Hareket Yörüngesi ve Pozisyonlar
            </h2>
            <span className="text-xs font-medium text-slate-400">
              Başlangıç &amp; Bitiş Fazı
            </span>
          </div>
          <ExerciseAnimator
            meta={exercise.animation}
            primaryMuscleGroup={exercise.primaryMuscleGroup}
          />
          <p className="mt-2.5 text-xs text-slate-400">
            <strong className="text-slate-200">Görsel Açıklama:</strong>{' '}
            {exercise.animation.accessibleDescription}
          </p>
        </section>

        {/* Sağ: Çalışan Kaslar ve İnteraktif Vücut Diyagramı */}
        <section className="lg:col-span-6" aria-labelledby="calisan-kaslar-baslik">
          <div className="mb-3 flex items-center justify-between">
            <h2
              id="calisan-kaslar-baslik"
              className="font-['Space_Grotesk'] text-xl font-bold text-white"
            >
              Çalışan Kaslar ve Anatomik Dağılım
            </h2>
            <span className="text-xs font-medium text-slate-400">
              Ön ve Arka Görünüm
            </span>
          </div>

          <BodyDiagram
            primaryGroups={[exercise.primaryMuscleGroup]}
            secondaryGroups={exercise.secondaryMuscleGroups}
            onSelectMuscle={(mId) => navigate(`/kas-gruplari/${mId}`)}
          />
        </section>
      </div>

      {/* Çalışan Kasların Ayrıntılı Listesi (Birincil, İkincil, Dengeleyici) */}
      <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3" aria-label="Kas rolleri detayı">
        <div className="rounded-2xl border border-lime-400/30 bg-lime-400/[0.06] p-5">
          <div className="mb-2 flex items-center gap-2 text-xs font-extrabold tracking-wider text-lime-300 uppercase">
            <span className="inline-block h-3 w-3 rounded-sm bg-lime-400" />
            <span>Birincil Çalışan Kaslar</span>
          </div>
          <p className="mb-3 text-[11px] text-slate-400">
            Hareketin ana kuvvetini üreten birincil hedef kas lifleri:
          </p>
          <ul className="space-y-1.5 text-xs font-bold text-white">
            {exercise.primaryMuscles.map((m) => (
              <li key={m} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-sky-400/30 bg-sky-400/[0.06] p-5">
          <div className="mb-2 flex items-center gap-2 text-xs font-extrabold tracking-wider text-sky-300 uppercase">
            <span className="inline-block h-3 w-3 rounded-sm bg-sky-400" />
            <span>İkincil (Yardımcı) Kaslar</span>
          </div>
          <p className="mb-3 text-[11px] text-slate-400">
            Harekete eşlik eden eklemlerde kuvvet üretimine destek olan kaslar:
          </p>
          {exercise.secondaryMuscles.length > 0 ? (
            <ul className="space-y-1.5 text-xs font-semibold text-slate-200">
              {exercise.secondaryMuscles.map((m) => (
                <li key={m} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">
              Bu hareket tek eklemli saf izolasyon odaklıdır; ikincil dinamik kas katılımı minimaldir.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121521] p-5">
          <div className="mb-2 flex items-center gap-2 text-xs font-extrabold tracking-wider text-amber-300 uppercase">
            <span className="inline-block h-3 w-3 rounded-sm bg-amber-400" />
            <span>Dengeleyici (Stabilizatör) Kaslar</span>
          </div>
          <p className="mb-3 text-[11px] text-slate-400">
            Omurga ve eklem hizasını korumak için izometrik çalışan kaslar:
          </p>
          <ul className="space-y-1.5 text-xs font-medium text-slate-300">
            {exercise.stabilizerMuscles.map((m) => (
              <li key={m} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =====================================================================
          D) ADIM ADIM YAPILIŞ & E) DİKKAT EDİLMESİ GEREKENLER
          ===================================================================== */}
      <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Adım Adım Yapılış */}
        <section className="lg:col-span-7" aria-labelledby="adim-adim-baslik">
          <div className="rounded-3xl border border-white/10 bg-[#121521] p-6 sm:p-8">
            <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
              Uygulama Rehberi
            </span>
            <h2
              id="adim-adim-baslik"
              className="mt-1 mb-6 font-['Space_Grotesk'] text-2xl font-bold text-white"
            >
              Adım Adım Doğru Yapılış
            </h2>

            <ol className="space-y-4">
              {exercise.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-lime-400 font-['Space_Grotesk'] text-sm font-extrabold text-slate-950">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-white">{step.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Dikkat Edilmesi Gerekenler + Örnek Set/Tekrar */}
        <div className="space-y-6 lg:col-span-5">
          {/* E) Dikkat Edilmesi Gerekenler */}
          <section
            className="rounded-3xl border border-white/10 bg-[#121521] p-6"
            aria-labelledby="ipucu-baslik"
          >
            <span className="text-xs font-extrabold tracking-widest text-sky-400 uppercase">
              Teknik İpuçları
            </span>
            <h2
              id="ipucu-baslik"
              className="mt-1 mb-4 font-['Space_Grotesk'] text-xl font-bold text-white"
            >
              Dikkat Edilmesi Gerekenler
            </h2>
            <ul className="space-y-3">
              {exercise.cues.map((cue) => (
                <li
                  key={cue}
                  className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-slate-950/50 p-3 text-xs leading-relaxed text-slate-200"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" />
                  <span>{cue}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
              * Her bireyin kemik uzunluğu ve eklem yapısı farklıdır; ağrısız ve kontrollü
              hissettiğiniz doğal hareket açıklığını esas alın.
            </p>
          </section>

          {/* H) Örnek Set ve Tekrar / Süre Aralıkları */}
          <section
            className="rounded-3xl border border-white/10 bg-[#121521] p-6"
            aria-labelledby="set-tekrar-baslik"
          >
            <div className="flex items-center gap-2 text-xs font-extrabold tracking-widest text-lime-400 uppercase">
              {exercise.programming.isIsometric ? (
                <Clock className="h-4 w-4" />
              ) : (
                <Repeat className="h-4 w-4" />
              )}
              <span>
                {exercise.programming.isIsometric
                  ? 'Örnek Süre ve Set Planı'
                  : 'Örnek Set ve Tekrar Aralıkları'}
              </span>
            </div>
            <h2
              id="set-tekrar-baslik"
              className="mt-1 mb-4 font-['Space_Grotesk'] text-xl font-bold text-white"
            >
              Genel Başlangıç Noktası
            </h2>

            <div className="space-y-3">
              <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-3.5">
                <span className="text-[11px] font-extrabold text-emerald-300 uppercase">
                  Başlangıç Seviyesi İçin Örnek
                </span>
                <p className="mt-1 text-sm font-bold text-white">
                  {exercise.programming.beginner}
                </p>
              </div>

              <div className="rounded-2xl border border-sky-400/25 bg-sky-400/[0.06] p-3.5">
                <span className="text-[11px] font-extrabold text-sky-300 uppercase">
                  Orta Seviye İçin Örnek
                </span>
                <p className="mt-1 text-sm font-bold text-white">
                  {exercise.programming.intermediate}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/10 bg-slate-950/60 p-3 text-[11px] leading-relaxed text-slate-400">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
              <span>
                {exercise.programming.note} Bu aralıklar kesin bir antrenman reçetesi değildir;
                kişinin deneyimine, hedefine ve kullandığı yüke göre uyarlanmalıdır.
              </span>
            </div>
          </section>
        </div>
      </div>

      {/* =====================================================================
          F) SIK YAPILAN HATALAR VE DÜZELTME ÖNERİLERİ
          ===================================================================== */}
      <section className="mb-10" aria-labelledby="hatalar-baslik">
        <div className="rounded-3xl border border-white/10 bg-[#121521] p-6 sm:p-8">
          <span className="text-xs font-extrabold tracking-widest text-rose-400 uppercase">
            Form Kontrol Listesi
          </span>
          <h2
            id="hatalar-baslik"
            className="mt-1 mb-6 font-['Space_Grotesk'] text-2xl font-bold text-white"
          >
            Sık Yapılan Hatalar ve Doğru Düzeltmeler
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {exercise.commonMistakes.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/70 p-5"
              >
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-rose-300">
                    <XCircle className="h-4 w-4 shrink-0 text-rose-400" />
                    <span>Hata #{idx + 1}</span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed text-white">
                    {item.mistake}
                  </p>
                </div>

                <div className="mt-4 border-t border-white/10 pt-3">
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold text-lime-300">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-lime-400" />
                    <span>Nasıl Düzeltilir?</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">
                    {item.correction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          G) ALTERNATİFLER VE VARYASYONLAR
          ===================================================================== */}
      <section className="mb-12" aria-labelledby="alternatifler-baslik">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#121624] to-[#0e111b] p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
                Uyarlanabilir Antrenman
              </span>
              <h2
                id="alternatifler-baslik"
                className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-white"
              >
                Alternatifler ve Varyasyonlar
              </h2>
              <p className="mt-1 max-w-2xl text-xs text-slate-400">
                Seviyenize veya elinizdeki ekipmana göre tercih edebileceğiniz gerçek hareket
                alternatifleri. Her varyasyonun direnç eğrisi ve dengeleyici kas ihtiyacı
                farklılık gösterebilir.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Daha Kolay Alternatif */}
            {easierEx && (
              <Link
                to={`/hareketler/${easierEx.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-4 transition hover:-translate-y-0.5 hover:border-emerald-400"
              >
                <div>
                  <span className="inline-block rounded-md bg-emerald-400/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-300 uppercase">
                    Daha Kolay Alternatif
                  </span>
                  <h3 className="mt-2.5 text-base font-extrabold text-white group-hover:text-emerald-300">
                    {easierEx.trName}
                  </h3>
                  <p className="text-xs text-slate-400">{easierEx.enName}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-300">
                  <span>Hareketi Aç</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )}

            {/* Daha Zor Alternatif */}
            {harderEx && (
              <Link
                to={`/hareketler/${harderEx.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-amber-400/30 bg-amber-400/[0.06] p-4 transition hover:-translate-y-0.5 hover:border-amber-400"
              >
                <div>
                  <span className="inline-block rounded-md bg-amber-400/20 px-2 py-0.5 text-[10px] font-extrabold text-amber-300 uppercase">
                    Daha Zor / İleri Alternatif
                  </span>
                  <h3 className="mt-2.5 text-base font-extrabold text-white group-hover:text-amber-300">
                    {harderEx.trName}
                  </h3>
                  <p className="text-xs text-slate-400">{harderEx.enName}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                  <span>Hareketi Aç</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )}

            {/* Evde Yapılabilecek Alternatif */}
            {homeAltEx && homeAltEx.slug !== easierEx?.slug && (
              <Link
                to={`/hareketler/${homeAltEx.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-lime-400/30 bg-lime-400/[0.06] p-4 transition hover:-translate-y-0.5 hover:border-lime-400"
              >
                <div>
                  <span className="inline-block rounded-md bg-lime-400/20 px-2 py-0.5 text-[10px] font-extrabold text-lime-300 uppercase">
                    Evde Uygun Alternatif
                  </span>
                  <h3 className="mt-2.5 text-base font-extrabold text-white group-hover:text-lime-300">
                    {homeAltEx.trName}
                  </h3>
                  <p className="text-xs text-slate-400">{homeAltEx.enName}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-lime-300">
                  <span>Hareketi Aç</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )}

            {/* Farklı Ekipman Alternatifleri */}
            {equipmentAltList.slice(0, 2).map((alt) => (
              <Link
                key={alt.slug}
                to={`/hareketler/${alt.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-sky-400/30 bg-sky-400/[0.06] p-4 transition hover:-translate-y-0.5 hover:border-sky-400"
              >
                <div>
                  <span className="inline-block rounded-md bg-sky-400/20 px-2 py-0.5 text-[10px] font-extrabold text-sky-300 uppercase">
                    Farklı Ekipman ({EQUIPMENT_MAP[alt.equipment[0]]?.name})
                  </span>
                  <h3 className="mt-2.5 text-base font-extrabold text-white group-hover:text-sky-300">
                    {alt.trName}
                  </h3>
                  <p className="text-xs text-slate-400">{alt.enName}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-sky-300">
                  <span>Hareketi Aç</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          I) İLİŞKİLİ HAREKETLER (AYNI KAS GRUBU)
          ===================================================================== */}
      {relatedExercises.length > 0 && (
        <section className="mb-10" aria-labelledby="iliskili-baslik">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
                Benzer Hedef Bölge
              </span>
              <h2
                id="iliskili-baslik"
                className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-white"
              >
                {primaryGroup?.name} İçin Diğer Hareketler
              </h2>
            </div>
            <Link
              to={`/kas-gruplari/${exercise.primaryMuscleGroup}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-400 hover:underline"
            >
              <span>Tüm {primaryGroup?.name} Hareketleri</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedExercises.map((rel) => (
              <ExerciseCard key={rel.id} exercise={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Kaynak ve Editoryal Doğrulama Notu */}
      <footer className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#11141f] px-5 py-3.5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-lime-400" />
          <span>
            <strong className="text-slate-200">Editoryal Kaynak &amp; Doğrulama:</strong>{' '}
            {exercise.editorialSource}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-4 w-4 text-amber-400" />
          <Link to="/kaynaklar" className="font-bold text-lime-400 hover:underline">
            Metodoloji ve Kaynaklar →
          </Link>
        </div>
      </footer>
    </div>
  )
}
