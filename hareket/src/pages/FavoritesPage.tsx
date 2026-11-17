import { Link } from 'react-router-dom'
import { ArrowRight, Bookmark, HardDrive, Trash2 } from 'lucide-react'
import { EXERCISE_BY_SLUG } from '../data/exercises'
import { ExerciseCard } from '../components/ExerciseCard'
import { useAppStore } from '../hooks/useAppStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { Exercise } from '../types/fitness'

export function FavoritesPage() {
  useDocumentMeta(
    'Favorilerim — Kaydettiğim Egzersizler',
    'Kendi antrenman planınız için kaydettiğiniz favori spor hareketleri.'
  )

  const { favorites, clearFavorites } = useAppStore()

  const favoriteExercises = favorites
    .map((slug) => EXERCISE_BY_SLUG[slug])
    .filter((ex): ex is Exercise => Boolean(ex))

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-extrabold tracking-widest text-lime-400 uppercase">
            Kişisel Antrenman Listem
          </span>
          <h1 className="mt-1 font-['Space_Grotesk'] text-3xl font-bold text-white sm:text-4xl">
            Favorilerim ({favoriteExercises.length})
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Hızlıca ulaşmak istediğiniz hareketleri buradan inceleyebilir ve detay sayfalarına
            geçebilirsiniz.
          </p>
        </div>

        {favoriteExercises.length > 0 && (
          <button
            type="button"
            onClick={clearFavorites}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-400/35 bg-rose-400/10 px-4 py-2.5 text-xs font-bold text-rose-300 transition hover:bg-rose-400/20"
          >
            <Trash2 className="h-4 w-4" />
            <span>Tüm Favorileri Temizle</span>
          </button>
        )}
      </div>

      {/* Tarayıcı Depolama Bilgilendirmesi */}
      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#11141f] p-4 text-xs text-slate-300">
        <HardDrive className="h-4 w-4 shrink-0 text-lime-400" />
        <span>
          <strong className="text-white">Veri Saklama Bilgisi:</strong> Favori listeniz üyelik
          gerektirmeden yalnızca şu an kullandığınız tarayıcının yerel hafızasında (
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-lime-300">localStorage</code>)
          saklanır. Sayfayı yenilediğinizde korunur; tarayıcı verilerini sıfırlamadığınız sürece
          kaybolmaz.
        </span>
      </div>

      {favoriteExercises.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteExercises.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-[#121521] p-10 text-center sm:p-16">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-400/15 text-lime-300">
            <Bookmark className="h-8 w-8" />
          </div>
          <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
            Henüz favori hareket eklemediniz
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-400 sm:text-sm">
            Hareket kartlarının sağ üst köşesindeki yer imi butonuna veya hareket detay
            sayfasındaki &ldquo;Favorilere Ekle&rdquo; butonuna tıklayarak kendi çalışma listenizi
            oluşturabilirsiniz.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/hareketler"
              className="inline-flex items-center gap-2 rounded-2xl bg-lime-400 px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-lime-300"
            >
              <span>Hareketleri Keşfetmeye Başla</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/kas-gruplari"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-lime-400/40"
            >
              <span>Kas Gruplarını İncele</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
