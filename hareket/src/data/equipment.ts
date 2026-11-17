import type { EquipmentInfo, EquipmentId } from '../types/fitness.ts'

export const EQUIPMENTS: EquipmentInfo[] = [
  {
    id: 'vucut-agirligi',
    slug: 'vucut-agirligi',
    name: 'Vücut Ağırlığı / Ekipmansız',
    shortSummary: 'Hiçbir ek ekipman gerektirmeden evde, açık alanda veya seyahatte uygulanabilen temel direnç hareketleri.',
    description:
      'Vücut ağırlığı (kaliszenik) egzersizleri, kendi kütlenizi yerçekimine karşı kontrol etmeyi öğretir. Gövde açısını, kaldıraç kolunu veya tempoyu değiştirerek başlangıç seviyesinden ileri seviyeye kadar uyarlanabilir.',
    usageAreas: [
      'Evde hiç ekipman olmadan yapılan antrenmanlar',
      'Yeni başlayanlar için temel motor kontrol ve eklem farkındalığı geliştirme',
      'Seyahatlerde veya ısınma/bitiriş bloklarında pratik uygulama'
    ],
    suitableMuscles: ['gogus', 'omuz', 'triceps', 'on-bacak', 'kalca', 'karin-core', 'baldir'],
    safetyNotes: [
      'Kaymayan, düz bir zemin veya egzersiz matı tercih edin.',
      'Yükselti kullanılan varyasyonlarda (Incline Push-up, Elevated Pike Push-up, Bulgarian Split Squat) destek aldığınız yüzeyin sabit ve devrilmez olduğundan emin olun.',
      'İleri seviye hareketlerde (örneğin Wall Walk) omuz ve el bileği hazırlığını atlamayın.'
    ],
    homeNote: 'Tamamen ekipmansız veya evde bulunan sabit bir yükselti ile doğrudan uygulanabilir.'
  },
  {
    id: 'dumbbell',
    slug: 'dumbbell',
    name: 'Dumbbell (Dambıl)',
    shortSummary: 'Hem evde hem spor salonunda en geniş hareket çeşitliliğini sunan, sağ ve sol tarafı bağımsız çalıştıran serbest ağırlık.',
    description:
      'Dumbbell; doğal bilek ve omuz açılarına uyum sağlaması, iki kol veya bacak arasındaki kuvvet farklarını dengelemesi ve az yer kaplaması nedeniyle hem ev hem salon antrenmanlarının temel taşıdır.',
    usageAreas: [
      'Üst ve alt vücut bileşik itiş, çekiş, çömelme ve menteşe hareketleri',
      'Sağ ve sol tarafı ayrı ayrı çalıştıran (unilateral) dengeleyici egzersizler',
      'Omuz, biceps ve triceps için eklem dostu izolasyon çalışmaları'
    ],
    suitableMuscles: ['gogus', 'sirt', 'omuz', 'biceps', 'triceps', 'on-kol', 'on-bacak', 'arka-bacak', 'kalca', 'karin-core', 'baldir'],
    safetyNotes: [
      'Ayarlanabilir dambıl kullanıyorsanız sete başlamadan önce sıkıştırma klipslerini mutlaka kontrol edin.',
      'Ağırlığı yerden alırken ve yere bırakırken belinizi yuvarlamayın; dizlerinizi bükerek bacaklarınızdan güç alın.',
      'Bazı dumbbell hareketleri ek olarak bir bench/sehpa gerektirir; hareket kartlarında tüm gerekli ekipmanlar ayrı ayrı belirtilmiştir.'
    ],
    homeNote: 'Evde bir çift sabit veya ayarlanabilir dambıl bulunduğunda uygulanabilir; sehpa gerektiren hareketler için ayrıca bench veya yer varyasyonu (Floor Press) seçilmelidir.'
  },
  {
    id: 'barbell',
    slug: 'barbell',
    name: 'Barbell (Halter Barı)',
    shortSummary: 'İki elle kavranan yapısıyla yüksek ağırlık kapasitesi ve kademeli yük artışı sağlayan klasik kuvvet ekipmanı.',
    description:
      'Barbell (olimpik veya standart halter barı), tüm vücudun koordineli çalıştığı temel bileşik hareketlerde (Squat, Bench Press, Overhead Press, Romanian Deadlift, Row) düzenli ve ölçülebilir ağırlık artışına olanak tanır.',
    usageAreas: [
      'Temel kuvvet ve kas geliştirme odaklı çok eklemli hareketler',
      'Alt vücut (Squat, RDL, Hip Thrust) ve üst vücut (Bench Press, Overhead Press, Row) ana kaldırışları',
      'Küçük plaka artışlarıyla uzun vadeli yük takibi'
    ],
    suitableMuscles: ['gogus', 'sirt', 'omuz', 'biceps', 'triceps', 'on-bacak', 'arka-bacak', 'kalca'],
    safetyNotes: [
      'Plakaların kaymaması için barın iki ucuna her zaman emniyet mandalı (klips) takın.',
      'Squat ve Bench Press gibi hareketlerde güç kafesi (rack) emniyet barlarını uygun yüksekliğe ayarlayın veya bir gözlemci (spotter) ile çalışın.',
      'Barı kancalardan alırken iki elin simetrik mesafede olduğundan emin olun.'
    ],
    homeNote: 'Genellikle spor salonunda veya bar/plaka seti ve rack bulunan kapsamlı ev istasyonlarında uygulanır.'
  },
  {
    id: 'kettlebell',
    slug: 'kettlebell',
    name: 'Kettlebell (Girya)',
    shortSummary: 'Ağırlık merkezi tutamağın dışında olan; dinamik kalça menteşesi, kavrama ve core stabilitesi için ideal ekipman.',
    description:
      'Kettlebell, küre gövdesi ve kulp yapısıyla hem dinamik/ritmik arka zincir egzersizlerinde (Kettlebell Swing) hem de önde tutuşlu çömelme ve taşıma (Goblet Squat, Farmer’s Carry) hareketlerinde benzersiz bir denge yükü sunar.',
    usageAreas: [
      'Patlayıcı kalça menteşesi ve arka zincir dayanıklılığı (Swing)',
      'Önde ağırlıkla dik gövdeli çömelme (Goblet Squat)',
      'Kavrama ve gövde stabilitesi odaklı taşıma çalışmaları'
    ],
    suitableMuscles: ['kalca', 'arka-bacak', 'on-bacak', 'karin-core', 'sirt', 'omuz', 'on-kol'],
    safetyNotes: [
      'Swing gibi dinamik hareketlerde önünde ve arkasında yeterli boş alan bulunduğundan emin olun.',
      'Avuç içlerinizin terleyip kaymaması için kulpu kuru tutun ve bileğinizi geriye kırmadan nötr kavrayın.'
    ],
    homeNote: 'Evde tek bir orta ağırlıkta kettlebell bulunduğunda oldukça az alanda uygulanabilir.'
  },
  {
    id: 'direnc-bandi',
    slug: 'direnc-bandi',
    name: 'Direnç Bandı',
    shortSummary: 'Taşınabilir, eklem dostu ve bant uzadıkça artan direnç profiliyle ev ve ısınma antrenmanlarının pratik aracı.',
    description:
      'Elastik direnç bantları, yerçekimi yönünden bağımsız olarak yatay ve çapraz açılarda direnç üretmenizi sağlar. Özellikle evde sırt çekişleri, omuz sağlığı ve core anti-rotasyon çalışmaları için çok değerlidir.',
    usageAreas: [
      'Evde yatay çekiş ve omuz izolasyonu',
      'Barfiks gibi zorlu hareketlerde ağırlık desteği (Assisted Pull-up)',
      'Omuz kuşağı hazırlığı ve postür destekleyici egzersizler'
    ],
    suitableMuscles: ['sirt', 'omuz', 'biceps', 'triceps', 'gogus', 'kalca', 'karin-core'],
    safetyNotes: [
      'Her antrenmandan önce bandın üzerinde yırtık, aşınma veya kesik olup olmadığını kontrol edin.',
      'Bandı bir yere sabitleyecekseniz keskin köşelere bağlamayın; kapı aparatının kapının kapanma yönünde güvenli şekilde kilitlendiğinden emin olun.',
      'Bandı yüz veya göz hizasına doğru kontrolsüzce bırakmayın.'
    ],
    homeNote: 'Çantaya sığacak kadar hafif olduğu için ev ve seyahat antrenmanları için en erişilebilir ekipmanlardan biridir.'
  },
  {
    id: 'kablo-makinesi',
    slug: 'kablo-makinesi',
    name: 'Kablo Makinesi (Cable)',
    shortSummary: 'Hareket açıklığının başından sonuna kadar kesintisiz ve ayarlanabilir açıda gerilim sunan makara sistemi.',
    description:
      'Serbest ağırlıklarda yerçekimi her zaman dikey aşağı çekerken, kablo makinesinde makaranın yüksekliğini değiştirerek kuvvet yönünü kas liflerinin doğrultusuna tam olarak hizalayabilirsiniz.',
    usageAreas: [
      'Hareketin her noktasında sabit gerilim istenen izolasyon hareketleri (Cable Lateral Raise, Chest Fly, Pushdown, Curl)',
      'Dikey ve yatay sırt çekişleri (Lat Pulldown, Seated Cable Row)',
      'Arka omuz ve rotasyon direnci egzersizleri (Face Pull, Pallof Press)'
    ],
    suitableMuscles: ['gogus', 'sirt', 'omuz', 'biceps', 'triceps', 'kalca', 'karin-core'],
    safetyNotes: [
      'Ağırlık pimini (pin) plakaya tam olarak yerleştirdiğinizden ve makara yüksekliği kilidinin oturduğundan emin olun.',
      'Tekrar sonunda ağırlık plakalarının birbirine hızla çarpmasına izin vermeyin; dönüş fazını kontrollü tamamlayın.'
    ],
    homeNote: 'Spor salonu ekipmanıdır; ev ortamında benzer açılar çoğunlukla direnç bandı ile taklit edilebilir.'
  },
  {
    id: 'spor-salonu-makineleri',
    slug: 'spor-salonu-makineleri',
    name: 'Spor Salonu Makineleri',
    shortSummary: 'Sabit hareket yörüngesi sayesinde denge ihtiyacını azaltıp hedef kasa odaklanmayı kolaylaştıran istasyonlar.',
    description:
      'Rehberli makineler (Chest Press, Leg Press, Leg Extension, Lying Leg Curl, Calf Raise makinesi vb.), özellikle yeni başlayanların hareket yolunu güvenle öğrenmesine ve deneyimli sporcuların denge sınırlaması olmadan hedef kası çalıştırmasına yardımcı olur.',
    usageAreas: [
      'Başlangıç seviyesinde güvenli itiş ve bacak kuvvetlendirme',
      'Ön bacak (Leg Extension) ve arka bacak (Lying Leg Curl) gibi tek eklemli hedeflemeler',
      'Antrenman sonlarında yorgunluk arttığında dengeli ve kontrollü çalışma'
    ],
    suitableMuscles: ['gogus', 'omuz', 'sirt', 'on-bacak', 'arka-bacak', 'kalca', 'baldir'],
    safetyNotes: [
      'Sete başlamadan önce koltuk yüksekliğini ve sırt/ayak pedlerini kendi boyunuza ve eklem hizanıza göre ayarlayın.',
      'Leg Press gibi makinelerde dizlerinizi tepe noktada sertçe kilitlemekten ve kalçanızın koltuktan kalkacak kadar derin inmekten kaçının.'
    ],
    homeNote: 'Ticari spor salonu ekipmanlarıdır; evde serbest ağırlık veya vücut ağırlığı alternatifleri tercih edilebilir.'
  },
  {
    id: 'barfiks-bari',
    slug: 'barfiks-bari',
    name: 'Barfiks Barı',
    shortSummary: 'Üst vücut dikey çekiş kuvveti, kavrama dayanıklılığı ve asılarak yapılan core egzersizleri için temel istasyon.',
    description:
      'Duvara/tavana monte veya güvenli kapı barfiks barları; sırt, biceps ve core kaslarını kendi vücut ağırlığınızla çalıştırmanın en etkili yollarından biridir.',
    usageAreas: [
      'Üst vücut dikey çekiş egzersizleri (Pull-up, Chin-up, Assisted Pull-up)',
      'Asılarak yapılan karın ve kalça bükme hareketleri (Hanging Knee Raise)',
      'Omuz kuşağı ve kavrama dayanıklılığı için asılı kalma (Dead Hang)'
    ],
    suitableMuscles: ['sirt', 'biceps', 'on-kol', 'karin-core'],
    safetyNotes: [
      'Kapı tipi sıkıştırmalı bar kullanıyorsanız her kullanımdan önce sabitleme vidalarını ve taşıma kapasitesini kontrol edin; bar üzerinde sallanma (kipping) yapmayın.',
      'Barfikste zorlanıyorsanız direnç bandı desteği veya Inverted Row ile kademeli geçiş yapın.'
    ],
    homeNote: 'Evde güvenli şekilde monte edilmiş bir barfiks barı varsa uygulanabilir; aksi halde spor salonunda yapılır.'
  },
  {
    id: 'bench-sehpa',
    slug: 'bench-sehpa',
    name: 'Bench / Antrenman Sehpası',
    shortSummary: 'Düz ve eğimli açılarda gövdeyi destekleyerek itiş, çekiş, kalça ve tek bacak hareketlerinin çeşitliliğini artıran sehpa.',
    description:
      'Düz (flat) veya açı ayarlı (incline/decline) antrenman sehpası; tek başına bir direnç üretmese de serbest ağırlık ve vücut ağırlığı egzersizlerinde hareket açıklığını ve destek yüzeyini belirleyen temel yardımcı ekipmandır.',
    usageAreas: [
      'Düz ve eğimli göğüs/omuz itişleri (Bench Press, Incline Press, Seated Shoulder Press)',
      'Sırt desteği gerektiren kalça ve tek bacak hareketleri (Hip Thrust, Bulgarian Split Squat, Step-up)',
      'Tek kol sırt çekişlerinde (One-arm Dumbbell Row) gövde desteği'
    ],
    suitableMuscles: ['gogus', 'omuz', 'sirt', 'triceps', 'kalca', 'on-bacak'],
    safetyNotes: [
      'Açı ayarlı sehpalarda sırt dayanağı piminin yuvaya tam kilitlendiğini ağırlık almadan önce elinizle test edin.',
      'Hip Thrust veya Bulgarian Split Squat yaparken sehpanın geriye kaymayacağından emin olun (gerekirse sehpayı duvara veya ağırlıkla sabitleyin).'
    ],
    homeNote: 'Evde sehpa yoksa düz itişlerde zemin (Floor Press), yükselti gerektiren vücut ağırlığı hareketlerinde ise sağlam ve sabit bir ev mobilyası/kutu alternatif olarak değerlendirilebilir.'
  }
]

export const EQUIPMENT_MAP: Record<EquipmentId, EquipmentInfo> = Object.fromEntries(
  EQUIPMENTS.map((e) => [e.id, e])
) as Record<EquipmentId, EquipmentInfo>
