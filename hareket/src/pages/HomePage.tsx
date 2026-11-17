import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Compass,
  Dumbbell,
  Home,
  Layers,
  Sparkles,
  Target,
} from 'lucide-react'
import { EQUIPMENTS } from '../data/equipment'
import {
  EXERCISES,
  getExercisesByEquipment,
  getExercisesByMuscleGroup,
  getFeaturedExercises,
} from '../data/exercises'
import { MUSCLE_GROUPS } from '../data/muscleGroups'
import { BodyDiagram } from '../components/BodyDiagram'
import { ExerciseCard } from '../components/ExerciseCard'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const FAQ_ITEMS = [
  {
    q: 'Evde ekipmansız kas geliştirebilir miyim?',
    a: 'Evet. Vücut ağırlığıyla yapılan şınav (Push-up), çömelme (Squat), ters V omuz şınavı (Pike Push-up), kalça köprüsü (Glute Bridge) ve core egzersizleri düzenli uygulandığında ve zamanla zorluk seviyesi (tekrar sayısı, tempo veya kaldıraç açısı) kademeli olarak artırıldığında kas kuvvetini ve dayanıklılığını anlamlı biçimde geliştirir.',
  },
  {
    q: 'Başlangıç seviyesinde hangi hareketleri seçmeliyim?',
    a: 'Yeni başlayanlar için öncelik; hareket açıklığını ve gövde kontrolünü güvenli şekilde öğreten temel kalıplardır. Bodyweight Squat, Incline Push-up veya Push-up, Glute Bridge, Dumbbell Row, Lat Pulldown ve Plank / Dead Bug gibi başlangıç seviyesi hareketlerle temel oluşturup teknik oturduktan sonra ağırlık veya zorluk artışı yapmak en sağlıklı yaklaşımdır.',
  },
  {
    q: 'Aynı kas grubu için farklı ekipmanlar kullanabilir miyim?',
    a: 'Kesinlikle. Kaslar elinizdeki ekipmanın markasını değil, maruz kaldıkları mekanik gerilimi ve hareket açısını algılar. Örneğin omuz gelişimi için salonda Barbell Overhead Press veya Cable Lateral Raise yapabileceğiniz gibi, evde Dumbbell Shoulder Press, Band Shoulder Press veya Pike Push-up ile de aynı kas grubunu farklı direnç profilleriyle çalıştırabilirsiniz.',
  },
  {
    q: 'Bir hareketin çalıştırdığı birincil ve ikincil kaslar ne demek?',
    a: 'Birincil (ana) kaslar, hareketin gerçekleşmesi için en büyük kuvveti üreten hedef kaslardır. İkincil (yardımcı) kaslar ise harekete eşlik eden eklemlerde kuvvet üretimine destek olur. Örneğin Bench Press hareketinde göğüs kası birincil çalışırken, ön omuz ve arka kol (triceps) ikincil olarak güçlü biçimde devreye girer.',
  },
  {
    q: 'Hareket sırasında ağrı hissedersem ne yapmalıyım?',
    a: 'Hedef kasta oluşan çalışma yanması ve yorgunluk hissi ile eklem içinde hissedilen keskin, batıcı veya elektriklenme tarzı ağrı birbirinden farklıdır. Eklem veya bel bölgesinde keskin bir ağrı hissederseniz hareketi hemen durdurun, ağırlığı bırakın ve zorlamayın. Şikayet devam ederse bir hekim veya fizyoterapist değerlendirmesine başvurun.',
  },
]

export function HomePage() {
  useDocumentMeta(
    'HAREKET — Kas Pusulası & Türkçe Egzersiz Kütüphanesi',
    `Kas grubuna, ekipmana ve seviyene göre ${EXERCISES.length} temel spor hareketini keşfet. Doğru formu öğren ve antrenmanını daha bilinçli planla.`
  )

  const navigate = useNavigate()
  const featuredExercises = getFeaturedExercises()
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div>
      {/* =====================================================================
          HERO ALANI
          ===================================================================== */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0d101b] via-[#090a0f] to-[#090a0f] pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Arka Plan Sportif Işık Efektleri */}
        <div
          className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-20 right-10 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Sol: Başlık, Açıklama, CTA ve İstatistikler */}
            <div className="lg:col-span-7">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3.5 py-1.5 text-xs font-bold text-lime-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {EXERCISES.length} Doğrulanmış Egzersiz · 11 Kas Grubu · 9 Ekipman Kategorisi
                </span>
              </div>

              <h1 className="font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Vücudunu tanı.{' '}
                <span className="bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
                  Hareketini seç.
                </span>{' '}
                Güçlen.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Kas grubuna, ekipmana ve seviyene göre özenle hazırlanmış{' '}
                <strong className="font-bold text-white">{EXERCISES.length} temel hareketi</strong>{' '}
                keşfet. Birincil ve ikincil çalışan kasları görsel diyagramda incele, adım adım
                doğru formu öğren ve antrenmanını daha bilinçli planla.
              </p>

              {/* Ana Butonlar */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/hareketler"
                  className="inline-flex items-center gap-2 rounded-2xl bg-lime-400 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-lime-400/20 transition hover:bg-lime-300 focus:ring-2 focus:ring-lime-300 focus:outline-none"
                >
                  <span>Hareketleri Keşfet</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#kas-gruplari-bolumu"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:border-lime-400/50 hover:bg-white/10 focus:ring-2 focus:ring-lime-400 focus:outline-none"
                >
                  <Target className="h-4 w-4 text-lime-400" />
                  <span>Kas Grubuna Göre İncele</span>
                </a>
              </div>

              {/* Güven ve İçerik Özeti Bantları */}
              <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-7 sm:gap-6">
                <div>
                  <div className="font-['Space_Grotesk'] text-2xl font-bold text-white sm:text-3xl">
                    {EXERCISES.length}
                  </div>
                  <div className="text-xs font-medium text-slate-400">
                    Adım Adım Form Rehberli Hareket
                  </div>
                </div>
                <div>
                  <div className="font-['Space_Grotesk'] text-2xl font-bold text-lime-400 sm:text-3xl">
                    11
                  </div>
                  <div className="text-xs font-medium text-slate-400">
                    Anatomik Kas Grubu &amp; Alt Bölge
                  </div>
                </div>
                <div>
                  <div className="font-['Space_Grotesk'] text-2xl font-bold text-sky-400 sm:text-3xl">
                    %100
                  </div>
                  <div className="text-xs font-medium text-slate-400">
                    Harekete Özgü Kinematik Gösterim
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ: İnteraktif Vücut Kas Haritası */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="text-xs font-bold tracking-wider text-lime-400 uppercase">
                    İnteraktif Kas Pusulası
                  </span>
                  <span className="text-xs text-slate-400">
                    Bölgeye tıkla → hareketleri gör
                  </span>
                </div>
                <BodyDiagram
                  compact
                  onSelectMuscle={(muscleId) => navigate(`/kas-gruplari/${muscleId}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          HIZLI BAŞLANGIÇ ALANI
          ===================================================================== */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8" aria-labelledby="hizli-baslangic-baslik">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
              Tek Tıkla Filtrele
            </span>
            <h2 id="hizli-baslangic-baslik" className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-white">
              Hızlı Başlangıç
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Bulunduğun ortama ve elindeki ekipmana göre hemen başla
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          <Link
            to="/hareketler?ortam=ev-ekipmansiz"
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121521] p-4 transition hover:-translate-y-0.5 hover:border-lime-400/50"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/15 text-lime-300">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-lime-300">
                Evde, Ekipmansız
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Yalnızca vücut ağırlığıyla evde yapılabilen hareketler
              </p>
            </div>
          </Link>

          <Link
            to="/hareketler?ekipman=dumbbell"
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121521] p-4 transition hover:-translate-y-0.5 hover:border-lime-400/50"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-lime-300">
                Dumbbell ile
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Bir çift dambıl ile tüm vücut egzersizleri
              </p>
            </div>
          </Link>

          <Link
            to="/hareketler?ekipman=barbell"
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121521] p-4 transition hover:-translate-y-0.5 hover:border-lime-400/50"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/15 text-purple-300">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-lime-300">
                Barbell ile
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Halter barıyla temel bileşik kuvvet hareketleri
              </p>
            </div>
          </Link>

          <Link
            to="/hareketler?ortam=salon"
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121521] p-4 transition hover:-translate-y-0.5 hover:border-lime-400/50"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-lime-300">
                Spor Salonunda
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Kablo, makine ve serbest ağırlık istasyonları
              </p>
            </div>
          </Link>

          <Link
            to="/hareketler?seviye=baslangic"
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121521] p-4 transition hover:-translate-y-0.5 hover:border-lime-400/50"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-lime-300">
                Başlangıç Seviyesi
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Yeni başlayanlar için güvenli ve öğretici temel hareketler
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* =====================================================================
          KAS GRUPLARI BÖLÜMÜ (11 KAS GRUBU)
          ===================================================================== */}
      <section
        id="kas-gruplari-bolumu"
        className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8"
        aria-labelledby="kas-gruplari-baslik"
      >
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
              Anatomik Rehber · 11 Bölge
            </span>
            <h2
              id="kas-gruplari-baslik"
              className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-white sm:text-3xl"
            >
              Çalıştırmak İstediğin Kas Grubunu Seç
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Her kas grubunun alt bölgelerini (örneğin ön, orta ve arka omuz) ve ekipmana göre
              ayrılmış hareketlerini incele.
            </p>
          </div>
          <Link
            to="/kas-gruplari"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-400 hover:underline"
          >
            <span>Tüm Kas Gruplarını Gör</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MUSCLE_GROUPS.map((muscle) => {
            const primaryCount = getExercisesByMuscleGroup(muscle.id, false).length
            const totalWithSecondary = getExercisesByMuscleGroup(muscle.id, true).length
            return (
              <Link
                key={muscle.id}
                to={`/kas-gruplari/${muscle.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121521] p-5 transition duration-200 hover:-translate-y-1 hover:border-lime-400/50"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-lg border border-lime-400/30 bg-lime-400/10 px-2.5 py-1 text-xs font-extrabold text-lime-300">
                      {primaryCount} Birincil Hareket
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      +{totalWithSecondary - primaryCount} İkincil
                    </span>
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white transition group-hover:text-lime-300">
                    {muscle.name}
                  </h3>
                  <p className="text-[11px] font-medium text-slate-400">{muscle.latinName}</p>
                  <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-300">
                    {muscle.shortSummary}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1 border-t border-white/10 pt-3">
                  {muscle.subRegions.map((sub) => (
                    <span
                      key={sub.id}
                      className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-slate-300"
                    >
                      {sub.name}
                    </span>
                  ))}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* =====================================================================
          EKİPMAN KATEGORİLERİ (9 EKİPMAN)
          ===================================================================== */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8" aria-labelledby="ekipmanlar-baslik">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-sky-400 uppercase">
              Donanım Seçimi · 9 Kategori
            </span>
            <h2
              id="ekipmanlar-baslik"
              className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-white sm:text-3xl"
            >
              Ekipmana Göre Hareketler
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Evinizdeki dambıl veya direnç bandından tam donanımlı spor salonu makinelerine kadar
              elinizdeki ekipmana uygun hareketleri filtreleyin.
            </p>
          </div>
          <Link
            to="/ekipmanlar"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:underline"
          >
            <span>Tüm Ekipman Rehberleri</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {EQUIPMENTS.map((eq) => {
            const count = getExercisesByEquipment(eq.id).length
            return (
              <Link
                key={eq.id}
                to={`/ekipmanlar/${eq.slug}`}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-[#121521] p-5 transition hover:-translate-y-0.5 hover:border-sky-400/50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-white group-hover:text-sky-300">
                      {eq.name}
                    </h3>
                    <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-[11px] font-bold text-sky-300">
                      {count} hareket
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                    {eq.shortSummary}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-sky-300" />
              </Link>
            )
          })}
        </div>
      </section>

      {/* =====================================================================
          ÖNE ÇIKAN HAREKETLER (6 TEMEL HAREKET)
          ===================================================================== */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8" aria-labelledby="one-cikanlar-baslik">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
              Temel Yapı Taşları
            </span>
            <h2
              id="one-cikanlar-baslik"
              className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-white sm:text-3xl"
            >
              Öne Çıkan Temel Hareketler
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Farklı kas gruplarından ve ekipmanlardan seçilmiş, her antrenman programının temelini
              oluşturan klasik egzersizler.
            </p>
          </div>
          <Link
            to="/hareketler"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white transition hover:border-lime-400/50 hover:text-lime-300"
          >
            <span>Tüm {EXERCISES.length} Hareketi İncele</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredExercises.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} />
          ))}
        </div>
      </section>

      {/* =====================================================================
          NASIL ÇALIŞIR BÖLÜMÜ (3 BASİT ADIM)
          ===================================================================== */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8" aria-labelledby="nasil-calisir-baslik">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#121624] via-[#0e111b] to-[#131929] p-6 sm:p-10">
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
              Bilinçli Antrenman Rehberi
            </span>
            <h2
              id="nasil-calisir-baslik"
              className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-white sm:text-3xl"
            >
              3 Basit Adımda Doğru Hareketi Bul
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 font-['Space_Grotesk'] text-base font-extrabold text-slate-950">
                01
              </div>
              <h3 className="text-base font-extrabold text-white">
                Kas Grubunu veya Ekipmanı Seç
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                İnteraktif vücut haritasından hedeflediğin kası (örneğin omuz veya sırt) ya da
                elindeki ekipmanı (ekipmansız, dumbbell, barbell, kablo) filtrele.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400 font-['Space_Grotesk'] text-base font-extrabold text-slate-950">
                02
              </div>
              <h3 className="text-base font-extrabold text-white">
                Sana Uygun Hareketleri İncele
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Deneyim seviyene (başlangıç, orta, ileri) ve bulunduğun ortama (ev veya spor
                salonu) uygun alternatifleri karşılaştır; birincil ve ikincil kasları gör.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 font-['Space_Grotesk'] text-base font-extrabold text-slate-950">
                03
              </div>
              <h3 className="text-base font-extrabold text-white">
                Doğru Formu Öğren ve Antrenmanına Ekle
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Harekete özgü kinematik animasyonu yavaşlatarak incele, sık yapılan hatalardan
                kaçın ve beğendiğin hareketleri Favorilerim listene kaydet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SIKÇA SORULAN SORULAR (SSS)
          ===================================================================== */}
      <section className="mx-auto max-w-4xl px-4 pt-16 sm:px-6 lg:px-8" aria-labelledby="sss-baslik">
        <div className="mb-7 text-center">
          <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
            Merak Edilenler
          </span>
          <h2
            id="sss-baslik"
            className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-white sm:text-3xl"
          >
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#121521]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-white transition hover:text-lime-300 focus:outline-none"
                >
                  <span className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-lime-400" />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-lime-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-white/10 px-5 py-4 text-xs leading-relaxed text-slate-300">
                    {item.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
