import type { AppState, Priority, Stage, Task } from '../types'
import { PROJECT_NAME } from '../types'

function task(
  id: string,
  title: string,
  description: string,
  priority: Priority,
  estimateMinutes: number,
): Task {
  return { id, title, description, priority, estimateMinutes, status: 'todo', notes: '' }
}

function stage(
  partial: Omit<Stage, 'status' | 'notes' | 'outcome' | 'documents' | 'tasks'> & {
    tasks: Task[]
  },
  status: Stage['status'],
): Stage {
  return {
    ...partial,
    status,
    notes: '',
    outcome: '',
    documents: [],
  }
}

export function createInitialState(): AppState {
  const stages: Stage[] = [
    stage(
      {
        id: 0,
        title: 'Başlangıç ve bütçe',
        summary: 'Para, zaman ve yasal çerçeveyi yaz. Ürüne bunlardan sonra bak.',
        adviceTitle: 'Henüz ürün alma.',
        advice: 'Bütçe, haftalık süre ve şirket durumu yazılmadan alış fiyatı karar değildir.',
        focus: 'Başlangıç bütçeni, haftalık süreni ve şirket durumunu panele gir.',
        tasks: [
          task('s0-1', 'Bütçeyi yaz', 'Bu işe ayıracağın nakit tutarı gir. Tahmin etme, elindeki rakamı yaz.', 'high', 15),
          task('s0-2', 'Haftalık süreyi yaz', 'Bu işe gerçekten ayırabileceğin saat sayısını gir.', 'high', 10),
          task('s0-3', 'Şirket durumunu seç', 'Henüz yok, şahıs, limited veya kararsız. Sonra değiştirilebilir.', 'high', 10),
          task('s0-4', '90 günlük hedefi tek cümle yaz', 'Örnek yön: ilk numuneyi almak veya ilk satış. Kendi cümlen olsun.', 'medium', 20),
        ],
      },
      'CURRENT',
    ),
    stage(
      {
        id: 1,
        title: 'Pazar araştırması',
        summary: 'Araba aksesuarında talep, sezon ve şikayetleri gör.',
        adviceTitle: 'Önce pazar, sonra ürün listesi.',
        advice: 'Hangi alt kategoride arama ve şikayet olduğunu bilmeden 20 ürün toplamak dağınık kalır.',
        focus: 'En az 10 alt kategori ve 5 tekrar eden müşteri şikayeti yaz.',
        tasks: [
          task('s1-1', '10 alt kategori listele', 'Örnek yön: telefon tutucu, paspas, bagaj düzenleyici. Kendi listen olsun.', 'high', 45),
          task('s1-2', 'Sezonu ayır', 'Yaz / kış / yıl boyu satılanları işaretle.', 'medium', 30),
          task('s1-3', '5 müşteri şikayeti çıkar', 'Yorumlarda tekrar eden kalite, koku, uyum, kırılma gibi konuları not et.', 'high', 40),
        ],
      },
      'LOCKED',
    ),
    stage(
      {
        id: 2,
        title: 'Ürün araştırması',
        summary: 'Aday ürünleri tabloya gir, fiyat ve maliyeti yaz, 5 tanesini seç.',
        adviceTitle: 'Şimdi ürün ara, stoklama.',
        advice: 'Önce 20 aday. Sonra maliyet ve rakip fiyatı dolu olan 5 ürün kalsın.',
        focus: 'Türkiye’de satılabilecek ilk 20 araba aksesuarını araştır ve tabloya gir.',
        tasks: [
          task('s2-1', '20 ürün bul', 'Ürünler ekranına ad ve kategori ile ekle.', 'high', 90),
          task('s2-2', 'Rakip fiyatlarını yaz', 'Her aday için gördüğün satış fiyatını ürüne işle.', 'high', 60),
          task('s2-3', 'Tahmini maliyeti gir', 'Alış, kargo, komisyon, ambalaj. Net kâr otomatik hesaplanır.', 'high', 60),
          task('s2-4', '5 ürün seç', 'Listeden elenecekleri not düş, kalan 5’i işaretle.', 'high', 30),
          task('s2-5', '5 ürünü puanla', 'Talep, kâr, rekabet ve risk kriterlerini doldur.', 'medium', 40),
        ],
      },
      'LOCKED',
    ),
    stage(
      {
        id: 3,
        title: 'Rakip analizi',
        summary: 'Seçilen ürünlerde kimin ne sattığını ve nerede zayıf olduğunu yaz.',
        adviceTitle: 'Rakibi kopyalama, açığını yaz.',
        advice: 'Fiyat yetmez. Yorum, şikayet ve eksik vaat bu ürünü alıp almayacağını belirler.',
        focus: 'Kısa listedeki her ürün için en az 3 rakip kartı aç.',
        tasks: [
          task('s3-1', 'Her ürün için 3 rakip ekle', 'Platform, fiyat, puan, yorum sayısı.', 'high', 80),
          task('s3-2', 'Şikayetleri ayıkla', 'Tekrar eden 3 şikayeti rakip notuna yaz.', 'high', 40),
          task('s3-3', 'Senin farkın tek cümle olsun', 'Daha ucuz değilse ne daha iyi olacak, yaz.', 'medium', 30),
        ],
      },
      'LOCKED',
    ),
    stage(
      {
        id: 4,
        title: 'Tedarikçi araştırması',
        summary: 'Aynı ürün için en az iki fiyat ve koşul topla.',
        adviceTitle: 'Tek teklifle sipariş verme.',
        advice: 'Birim fiyat, minimum adet, numune ve teslim süresi yan yana durmadan karar yok.',
        focus: 'Kısa listedeki ürünler için en az 2 tedarikçi kartı aç.',
        tasks: [
          task('s4-1', '2 tedarikçi bul', 'İletişim ve ürün adını kaydet.', 'high', 60),
          task('s4-2', 'Birim fiyat ve minimum siparişi yaz', 'Karşılaştırma ancak rakamla olur.', 'high', 30),
          task('s4-3', 'Numune fiyatı ve süreyi sor', 'Cevabı tedarikçi kartına işle.', 'high', 30),
        ],
      },
      'LOCKED',
    ),
    stage(
      {
        id: 5,
        title: 'Numune alma',
        summary: 'Stok yok. Önce az adet, elde gör.',
        adviceTitle: 'Bu ürünü henüz stoklama.',
        advice: 'Önce numune al. Kalite, koku, uyum ve ambalajı elinle gör.',
        focus: 'Seçtiğin üründen numune siparişi ver ve masrafı finansa işle.',
        tasks: [
          task('s5-1', 'Numune siparişi ver', 'En fazla 1–2 ürün. Hepsinden alma.', 'high', 40),
          task('s5-2', 'Numune giderini işle', 'Finans veya aşama harcamasına yaz.', 'medium', 10),
          task('s5-3', 'Kargo ve paket notu tut', 'Kırık, eksik, yanlış model var mı yaz.', 'medium', 20),
        ],
      },
      'LOCKED',
    ),
    stage(
      {
        id: 6,
        title: 'Ürün testi',
        summary: 'Numuneyi arabada veya kullanımda dene.',
        adviceTitle: 'Beğenmezsen siparişi büyütme.',
        advice: 'Uyum, koku, malzeme ve iade ihtimali net değilse bir sonraki aşamaya geçme.',
        focus: 'Numuneyi test et ve sonucu aşama notuna yaz.',
        tasks: [
          task('s6-1', 'Kullanım testi yap', 'Takılıyor mu, kayıyor mu, koku var mı.', 'high', 40),
          task('s6-2', 'Fotoğraf çek', 'İlan ve içerik için ham görüntü. Belge olarak link veya not ekle.', 'medium', 30),
          task('s6-3', 'Geçti / kaldı kararı yaz', 'Kararlar bölümüne tek cümle bırak.', 'high', 15),
        ],
      },
      'LOCKED',
    ),
    stage(
      {
        id: 7,
        title: 'Finansal doğrulama',
        summary: 'Numune sonrası gerçek maliyetle kâr hâlâ duruyor mu bak.',
        adviceTitle: 'Kâr kâğıt üzerinde kalsın diye stok alma.',
        advice: 'Gerçek alış, kargo ve fire ile net kâr zayıfsa ürünü ele.',
        focus: 'Ürün kartındaki maliyetleri numune sonrası güncelle.',
        tasks: [
          task('s7-1', 'Gerçek maliyetleri güncelle', 'Alış, kargo, fire, ambalaj.', 'high', 30),
          task('s7-2', 'İlk sipariş adedini hesapla', 'Bütçeyi aşmayan, testi geçen adet.', 'high', 25),
          task('s7-3', 'Zarar senaryosunu yaz', 'Satılmazsa ne kadar para kilitlenir.', 'medium', 20),
        ],
      },
      'LOCKED',
    ),
    stage(
      {
        id: 8,
        title: 'Marka oluşturma',
        summary: 'İsim, vaat ve ambalaj. Mağaza açmadan önce.',
        adviceTitle: 'Marka, logo koleksiyonu değildir.',
        advice: 'Müşteriye tek cümlelik vaat ve iade politikası lazım.',
        focus: 'Marka adı ve tek cümlelik vaadi karar olarak kaydet.',
        tasks: [
          task('s8-1', 'Marka adı adaylarını yaz', 'En az 5 isim, kararlarda tut.', 'high', 40),
          task('s8-2', 'Tek cümlelik vaat yaz', 'Ne satıyorsun, kime, neden sen.', 'high', 25),
          task('s8-3', 'Ambalaj ihtiyacını not et', 'Tedarikçi logo basabiliyor mu, kontrol et.', 'medium', 20),
        ],
      },
      'LOCKED',
    ),
    stage(
      {
        id: 9,
        title: 'Pazaryeri kurulumu',
        summary: 'Hesap, ürün, görsel, fiyat. Reklamdan önce liste yayında olsun.',
        adviceTitle: 'Önce liste, sonra reklam.',
        advice: 'Yayında net fiyat, stok ve kargo süresi olmayan ürüne trafik alma.',
        focus: 'Seçtiğin pazaryerinde satıcı hesabını aç ve ilk ürünü taslak olarak gir.',
        tasks: [
          task('s9-1', 'Satıcı hesabını aç', 'Hangi pazaryeri olduğunu aşama notuna yaz.', 'high', 40),
          task('s9-2', 'İlk ürün taslağını gir', 'Başlık, fiyat, stok, kargo süresi.', 'high', 50),
          task('s9-3', 'Görselleri yükle', 'Numune fotoğrafları. Belge notuna nerede durduğunu yaz.', 'medium', 30),
        ],
      },
      'LOCKED',
    ),
    stage(
      {
        id: 10,
        title: 'İlk satış',
        summary: 'Küçük stok, ilk sipariş, ilk dekont.',
        adviceTitle: 'İlk satış öğrenmek içindir.',
        advice: 'Büyük stok değil. İlk siparişin kargo, iade ve mesaj yükünü göreceksin.',
        focus: 'İlk siparişi kargola ve gelir ile gideri finansa işle.',
        tasks: [
          task('s10-1', 'Küçük stok al', 'Finansal doğrulamadaki adet. Fazlası yok.', 'high', 30),
          task('s10-2', 'İlk siparişi gönder', 'Süre ve sorun varsa günlük’e yaz.', 'high', 30),
          task('s10-3', 'Geliri işle', 'Finans ekranına satış tutarını gir.', 'medium', 10),
        ],
      },
      'LOCKED',
    ),
    stage(
      {
        id: 11,
        title: 'Reklam ve içerik',
        summary: 'Satış gördükten sonra az bütçeyle dene.',
        adviceTitle: 'Reklamı satışsız ürüne gömme.',
        advice: 'Önce organik veya çok küçük bütçe. Hangi görselin tık aldığını yaz.',
        focus: 'Tek ürün, tek görsel, küçük bir reklam veya içerik dene ve harcamayı işle.',
        tasks: [
          task('s11-1', 'Tek görsel / kısa video hazırla', 'Ürünün tek vaadi görünsün.', 'high', 45),
          task('s11-2', 'Küçük test bütçesi ayır', 'Tutarı önceden yaz, aşınca dur.', 'high', 20),
          task('s11-3', 'Sonucu not et', 'Harcama, tıklama, satış. Günlüğe.', 'medium', 20),
        ],
      },
      'LOCKED',
    ),
    stage(
      {
        id: 12,
        title: 'Ölçekleme',
        summary: 'Tutan ürünü büyüt, tutmayanı kes.',
        adviceTitle: 'Her ürünü büyütme.',
        advice: 'Kâr ve iade temiz olan SKU’ya stok ekle. Diğerini kapat.',
        focus: 'Tutan tek ürün için sonraki sipariş adedini ve nedenini karar olarak yaz.',
        tasks: [
          task('s12-1', 'SKU’ları ayır', 'Tutan / izlenen / kapatılacak.', 'high', 30),
          task('s12-2', 'Sonraki sipariş adedini yaz', 'Bütçe ve satış hızına göre.', 'high', 25),
          task('s12-3', 'Kapatılacak ürünü gerekçeyle yaz', 'Kararlar bölümüne.', 'medium', 15),
        ],
      },
      'LOCKED',
    ),
  ]

  return {
    version: 1,
    profile: {
      onboarded: false,
      projectName: PROJECT_NAME,
      budget: null,
      weeklyHours: null,
      companyStatus: '',
      goal90: '',
    },
    stages,
    products: [],
    competitors: [],
    suppliers: [],
    expenses: [],
    incomes: [],
    decisions: [],
    journal: [],
  }
}
