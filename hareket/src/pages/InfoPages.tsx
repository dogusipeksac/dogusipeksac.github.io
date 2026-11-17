import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Compass, ShieldCheck, FileText } from 'lucide-react'
import { EDITORIAL_REFERENCES, EXERCISES } from '../data/exercises'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function SourcesPage() {
  useDocumentMeta(
    'Bilimsel Kaynaklar, Metodoloji ve Editoryal İlkeler',
    'HAREKET egzersiz kütüphanesinde kullanılan biyomekanik kaynaklar, kas sınıflandırma metodolojisi ve SEO/mimari notlar.'
  )

  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-200 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Ana Sayfaya Dön</span>
      </Link>

      <div className="rounded-3xl border border-white/10 bg-[#121521] p-6 sm:p-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/15 text-lime-300">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white sm:text-3xl">
              Kaynaklar ve Editoryal Metodoloji
            </h1>
            <p className="text-xs text-slate-400">
              Doğrulanmış içerik prensipleri ve şeffaflık bildirimi
            </p>
          </div>
        </div>

        <div className="space-y-6 text-xs leading-relaxed text-slate-300 sm:text-sm">
          <p>
            <strong className="text-white">HAREKET</strong> kütüphanesinde yer alan{' '}
            <strong className="text-lime-300">{EXERCISES.length} temel egzersiz</strong>; hareketin
            gerçekleştiği ana eklem ekseni, kuvvet yönü ve elektromiyografik (EMG) literatürdeki
            genel kabul görmüş kas katılımlarına göre sınıflandırılmıştır.
          </p>

          <div className="space-y-4">
            <h2 className="font-['Space_Grotesk'] text-lg font-bold text-white">
              Başvurulan Temel Referans Çerçeveleri
            </h2>
            {EDITORIAL_REFERENCES.map((ref) => (
              <div
                key={ref.title}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
              >
                <h3 className="font-bold text-lime-300">{ref.title}</h3>
                <p className="mt-1 text-slate-200">{ref.scope}</p>
                <p className="mt-1 text-xs text-slate-400">{ref.note}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <h2 className="font-['Space_Grotesk'] text-base font-bold text-white">
              Görsel Gösterim ve Kinematik Animasyon Notu
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
              Her hareket detay sayfasında yer alan animasyonlar, ilgili egzersizin başlangıç ve
              bitiş (kasılma) pozisyonlarındaki eklem açılarını temsil eden harekete özgü kinematik
              vektör şemalarıdır. Vücut kas diyagramları ise çalışan birincil ve ikincil bölgeleri
              hızlıca ayırt etmeyi sağlayan şematik çizimlerdir; tıbbi/klinik anatomi atlası
              kesinliği iddiası taşımaz.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <h2 className="font-['Space_Grotesk'] text-base font-bold text-white">
              Teknik Mimari ve Arama Motoru Görünürlüğü (SEO) Notu
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
              Bu uygulama istemci taraflı çalışan (Client-Side Rendered SPA) bir React + TypeScript
              mimarisiyle geliştirilmiştir. Her sayfa geçişinde dinamik başlık (
              <code className="text-lime-300">document.title</code>), açıklama ve Open Graph
              etiketleri güncellenir; tüm filtre durumları URL parametreleriyle paylaşılabilir.
              Arama motoru botlarının JavaScript çalıştırmadığı statik indeksleme senaryolarında
              tam HTML ön-üretimi için ileride SSG/SSR (ör. Vite SSG veya Next.js) katmanı
              eklenebilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PrivacyPage() {
  useDocumentMeta('Gizlilik Politikası', 'HAREKET yerel veri saklama ve gizlilik ilkeleri.')

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-[#121521] p-6 sm:p-10">
        <div className="mb-5 flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-lime-400" />
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white sm:text-3xl">
            Gizlilik Politikası
          </h1>
        </div>
        <div className="space-y-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
          <p>
            <strong className="text-white">HAREKET</strong>, kullanıcılarından üyelik, kişisel kimlik
            bilgisi veya sağlık verisi toplamaz.
          </p>
          <p>
            <strong className="text-white">Yerel Depolama (localStorage):</strong> Favorilere
            eklediğiniz hareketler ve açık/koyu tema tercihiniz yalnızca kendi cihazınızdaki web
            tarayıcısında saklanır; hiçbir uzak sunucuya iletilmez.
          </p>
          <p>
            Tarayıcı geçmişinizi veya site verilerinizi temizlediğinizde ya da Favorilerim
            sayfasındaki sıfırlama butonunu kullandığınızda bu kayıtlar cihazınızdan tamamen
            silinir.
          </p>
        </div>
      </div>
    </div>
  )
}

export function TermsPage() {
  useDocumentMeta('Kullanım Koşulları ve Sağlık Beyanı', 'HAREKET kullanım koşulları ve sorumluluk beyanı.')

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-[#121521] p-6 sm:p-10">
        <div className="mb-5 flex items-center gap-3">
          <FileText className="h-7 w-7 text-lime-400" />
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white sm:text-3xl">
            Kullanım Koşulları ve Sağlık Beyanı
          </h1>
        </div>
        <div className="space-y-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
          <p>
            Bu platformda yer alan tüm egzersiz açıklamaları, görsel şemalar, sık yapılan hata
            notları ve örnek set/tekrar aralıkları yalnızca genel spor kültürü ve eğitim amaçlıdır.
          </p>
          <p>
            Sitedeki hiçbir içerik tıbbi tavsiye, fizik tedavi protokolü veya kişiye özel antrenman
            reçetesi niteliği taşımaz. Herhangi bir egzersiz programına başlamadan önce, özellikle
            mevcut bir eklem, kalp-damar veya omurga rahatsızlığınız varsa bir tıp doktoruna
            danışmanız önerilir.
          </p>
        </div>
      </div>
    </div>
  )
}

export function NotFoundPage() {
  useDocumentMeta('404 — Sayfa Bulunamadı')

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-400/15 text-lime-300">
        <Compass className="h-8 w-8" />
      </div>
      <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
        404 Hata Kodu
      </span>
      <h1 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold text-white sm:text-4xl">
        Aradığınız sayfa bulunamadı
      </h1>
      <p className="mt-3 text-sm text-slate-400">
        Gitmek istediğiniz adres taşınmış veya yanlış yazılmış olabilir. Ana sayfaya veya hareket
        kütüphanesine dönerek keşfe devam edebilirsiniz.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-2xl bg-lime-400 px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-lime-300"
        >
          Ana Sayfaya Dön
        </Link>
        <Link
          to="/hareketler"
          className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-lime-400/40"
        >
          Tüm Hareketleri Gör
        </Link>
      </div>
    </div>
  )
}
