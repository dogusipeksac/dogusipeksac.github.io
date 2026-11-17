import type { Exercise } from '../types/fitness.ts'

export const LOWER_AND_CORE_EXERCISES: Exercise[] = [
  // =========================================================================
  // BACAK — ÖN BACAK, ARKA BACAK VE BALDIR (14 HAREKET)
  // =========================================================================
  {
    id: 'bodyweight-squat',
    slug: 'bodyweight-squat',
    trName: 'Vücut Ağırlığıyla Çömelme',
    enName: 'Bodyweight Squat (Air Squat)',
    aliases: ['squat', 'çömelme', 'air squat', 'ekipmansız bacak', 'evde squat'],
    shortDescription:
      'Ekipman gerektirmeden kalça ve diz eklemlerini uyumlu şekilde bükerek ön bacak, kalça ve core kaslarını çalıştıran en temel alt vücut hareketi.',
    primaryMuscleGroup: 'on-bacak',
    secondaryMuscleGroups: ['kalca', 'karin-core', 'baldir'],
    primaryMuscles: ['Quadriceps Femoris (Vastus Lateralis, Medialis, Intermedius & Rectus Femoris)'],
    secondaryMuscles: ['Gluteus Maximus (Kalça)', 'Adductor Magnus (İç Uyluk Destek)'],
    stabilizerMuscles: ['Erector Spinae', 'Rectus Abdominis ve Derin Core', 'Gastrocnemius & Soleus'],
    subRegionTag: 'Temel Çömelme & Ön Bacak (Ekipmansız)',
    equipment: ['vucut-agirligi'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'squat',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızı omuz genişliğinde veya biraz daha açık yerleştirin, ayak parmak uçlarınızı doğal anatomik yapınıza göre 10–25 derece dışa çevirin. Göğsünüzü dik tutun ve kollarınızı denge için önünüzde uzatın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Sanki arkanızdaki alçak bir sandalyeye oturuyormuş gibi kalçanızı ve dizlerinizi aynı anda bükerek kontrollü biçimde aşağı çömelin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Uyluklarınız yere paralel seviyeye yaklaştığında (veya omurga nötrlüğünü koruyabildiğiniz rahat derinlikte) topuklarınızın yerden kalkmadığından emin olun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ayak tabanınızın tamamıyla (topuk, başparmak kökü ve serçe parmak kökü — "üç nokta temas") yeri iterek başlangıçtaki dik duruşa yükselin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Çömelirken 2 saniyede nefes alın, yukarı kalkarken nefes verin.'
      }
    ],
    cues: [
      'Dizlerinizin içe doğru birbirine yaklaşmasına (valgus çöküşü) izin vermeyin; diz kapaklarınız ayak parmak uçlarınızla aynı doğrultuyu takip etsin.',
      'Herkesin kalça yapısı ve ayak bileği esnekliği farklıdır; rahat ettiğiniz ayak genişliğini küçük denemelerle bulun.'
    ],
    commonMistakes: [
      {
        mistake: 'Çömelirken topukların yerden kalkması ve ağırlığın sadece parmak uçlarına binmesi.',
        correction: 'Ağırlığı ayak tabanınızın ortasına ve topuğunuza dağıtın; bilek esnekliğiniz kısıtlıysa topuk altına ince bir destek koyarak pratik yapabilirsiniz.'
      },
      {
        mistake: 'Kalkış sırasında dizlerin birbirine doğru içe çökmesi.',
        correction: 'Ayaklarınızla yeri hafifçe iki yana ayırıyormuş gibi düşünerek yan kalça kaslarınızı aktif tutun.'
      },
      {
        mistake: 'Dizleri hiç bükmeden sadece belden öne eğilmek.',
        correction: 'Göğsünüzü karşıya bakar durumda tutarak kalça ve dizleri birlikte bükün.'
      }
    ],
    programming: {
      beginner: '3 set × 10–15 tekrar',
      intermediate: '3–4 set × 15–25 tekrar (veya Goblet Squat geçişi)',
      note: 'Ağırlıklı squat varyasyonlarına geçmeden önce hareket kalitesini oturtmak için en temel basamaktır.'
    },
    alternatives: {
      easier: 'glute-bridge',
      harder: 'goblet-squat',
      equipmentAlt: ['goblet-squat', 'barbell-back-squat', 'leg-press'],
      homeAlt: 'reverse-lunge'
    },
    animation: {
      poseId: 'squat-bodyweight',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Kollarını denge için öne uzatan sporcunun kalça ve dizlerini bükerek paralel seviyeye çömelip tekrar doğrulmasını gösteren animasyon.',
      startLabel: 'Ayakta Dik Başlangıç',
      endLabel: 'Paralel Çömelme (Dip)'
    },
    editorialSource: 'ACSM & NSCA Temel Çömelme Mekanikleri'
  },
  {
    id: 'goblet-squat',
    slug: 'goblet-squat',
    trName: 'Göğüste Ağırlıkla Çömelme (Goblet Squat)',
    enName: 'Goblet Squat',
    aliases: ['goblet squat', 'dambıl squat', 'kettlebell squat', 'kadeh squat'],
    shortDescription:
      'Göğüs önünde tutulan bir dambıl veya kettlebell ile yapılan, ağırlığın önde olması sayesinde gövdeyi doğal olarak dik tutmayı kolaylaştıran çömelme hareketi.',
    primaryMuscleGroup: 'on-bacak',
    secondaryMuscleGroups: ['kalca', 'karin-core', 'sirt'],
    primaryMuscles: ['Quadriceps Femoris (Ön Bacak)', 'Gluteus Maximus (Kalça)'],
    secondaryMuscles: ['Adductor Magnus', 'Üst Sırt ve Core (İzometrik Gövde Tutuşu)'],
    stabilizerMuscles: ['Rectus Abdominis', 'Oblikler', 'Biceps ve Ön Kol (Ağırlık Taşıma)'],
    subRegionTag: 'Dik Gövdeli Ön Bacak & Kalça Squat',
    equipment: ['dumbbell', 'kettlebell'],
    environments: ['ev', 'salon'],
    environmentNote: 'Evde veya salonda tek bir dambıl ya da kettlebell ile güvenle uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'squat',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Bir dambılı dikey olarak üst plakasından (kadeh tutar gibi) veya bir kettlebell’i boynuzlarından iki elinizle göğüs kemiğinizin hemen önünde kavrayın. Dirseklerinizi aşağı-içeri toplayın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Ağırlığı göğsünüze yakın tutarak ve gövdenizi dik koruyarak kalçanızı bacaklarınızın arasına doğru kontrollü şekilde indirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Alt noktada dirsekleriniz dizlerinizin iç kısmına hafifçe yaklaşır; sırtınızın yuvarlanmadığı derinlikte kısa bir an dengede kalın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ayak tabanlarınızla yeri güçlüce iterek göğsünüzü düşürmeden başlangıç pozisyonuna yükselin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İnerken 2–3 saniyede nefes alın, kalkarken nefes verin.'
      }
    ],
    cues: [
      'Ağırlığı gövdenizden ileri uzatmayın; dambıl göğsünüze ne kadar yakın durursa üst sırtınız ve kollarınız o kadar az yorulur.',
      'Önde tutulan ağırlık karşı denge (counterbalance) yarattığı için dik gövdeyle çömelmeyi öğrenmek adına en öğretici harekettir.'
    ],
    commonMistakes: [
      {
        mistake: 'Ağırlığı göğüsten uzak tutup kolları erken yormak.',
        correction: 'Dambılı göğüs kemiğinize neredeyse temas edecek kadar yakın tutun.'
      },
      {
        mistake: 'Alt noktada dirsekleri dizlerin üzerine dayayıp gevşemek.',
        correction: 'Gövde ve kalça gerginliğini dip noktada da aktif koruyun.'
      },
      {
        mistake: 'Kalkışta önce kalçayı hızla kaldırıp göğsü öne düşürmek.',
        correction: 'Kalça ve omuzlarınız aynı anda, tek parça halinde yükselsin.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3–4 set × 10–15 tekrar',
      note: 'Hem yeni başlayanlar için harika bir temel hareket hem de ileri seviye sporcular için yüksek tekrarlı ön bacak çalışmasıdır.'
    },
    alternatives: {
      easier: 'bodyweight-squat',
      harder: 'barbell-front-squat',
      equipmentAlt: ['barbell-back-squat', 'barbell-front-squat', 'leg-press', 'bodyweight-squat'],
      homeAlt: 'bodyweight-squat'
    },
    animation: {
      poseId: 'goblet-squat',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Göğüs önünde dambıl/kettlebell tutan sporcunun dik gövdeyle çömelip kalkmasını gösteren animasyon.',
      startLabel: 'Göğüste Ağırlıkla Dik Duruş',
      endLabel: 'Derin Dik Çömelme'
    },
    editorialSource: 'Dan John & NSCA Goblet Squat Öğretim Protokolü'
  },
  {
    id: 'barbell-back-squat',
    slug: 'barbell-back-squat',
    trName: 'Sırtta Halterle Çömelme (Back Squat)',
    enName: 'Barbell Back Squat',
    aliases: ['back squat', 'halter squat', 'barbell squat', 'sırtta squat'],
    shortDescription:
      'Üst sırt (trapez) kasları üzerine yerleştirilen halter barıyla yapılan, ön bacak, kalça ve tüm gövde stabilizatörlerini çalıştıran temel alt vücut kuvvet hareketi.',
    primaryMuscleGroup: 'on-bacak',
    secondaryMuscleGroups: ['kalca', 'arka-bacak', 'karin-core', 'sirt'],
    primaryMuscles: ['Quadriceps Femoris (Ön Bacak)', 'Gluteus Maximus (Kalça)'],
    secondaryMuscles: ['Adductor Magnus (İç Bacak)', 'Hamstring (Kalça Kontrolü)', 'Erector Spinae (Omurga Sabitleyici)'],
    stabilizerMuscles: ['Transversus Abdominis ve Oblikler', 'Üst Sırt ve Trapezius', 'Gastrocnemius & Soleus'],
    subRegionTag: 'Temel Alt Vücut & Tüm Gövde Kuvveti',
    equipment: ['barbell'],
    environments: ['salon'],
    environmentNote: 'Güvenli uygulama için squat kafesi (power rack) ve ayarlanabilir emniyet kolları gerektirir.',
    level: 'orta',
    movementPattern: 'squat',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    featured: true,
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Rack üzerinde göğüs hizasında duran barın altına girin ve barı boyun omurlarınızın üzerine değil, kürek kemiklerinizi birleştirdiğinizde oluşan üst trapez kas yastığının üzerine yerleştirin. İki adımla geriye çıkıp ayaklarınızı omuz genişliğinde sabitleyin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Diyaframdan derin bir nefes alıp karın duvarınızı 360 derece sertleştirin (bracing). Kalça ve dizlerinizi aynı anda bükerek barı ayak ortanızın üzerindeki dikey hatta tutarak çömelin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Omurganızın doğal kıvrımını bozmadan uyluklarınız yere paralel seviyeye (veya uygun derinliğe) ulaştığında dizlerinizin ayak uçlarınızla aynı yöne baktığından emin olun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ayak tabanlarınızla yeri itip üst sırtınızı bara doğru güçlüce bastırarak başlangıç pozisyonuna yükselin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İniş öncesi nefes alıp gövdeyi kilitleyin, kalkışın en zorlu orta noktasını geçtikten sonra nefes verin.'
      }
    ],
    cues: [
      'Barı asla boyun kemiğinizin (C7 omuru) tam üstüne koymayın; kürek kemiklerinizi birbirine yaklaştırarak oluşturduğunuz kas rafına oturtun.',
      'Her zaman rack emniyet barlarını dip noktanızın birkaç santimetre altına ayarlayarak çalışın.'
    ],
    commonMistakes: [
      {
        mistake: 'Nefes kilitlemesi (bracing) yapmadan gevşek gövdeyle ağır yükün altına girmek.',
        correction: 'Her tekrar öncesi karnınıza nefes alıp kemer takmış gibi gövde içi basıncı oluşturun.'
      },
      {
        mistake: 'Dip noktadan çıkarken kalçanın hızla yükselip göğsün öne kapanması (Good Morning squat).',
        correction: 'Kalkarken göğsünüzü ve dirseklerinizi yukarı-ileri yönlendirerek kalça ile omuzları aynı hızda yükseltin.'
      },
      {
        mistake: 'Dizlerin ayak uçlarını hiç geçmemesi gerektiği yanılgısıyla kalçayı aşırı geriye atıp beli zorlamak.',
        correction: 'Sağlıklı dizlerde topuklar yerde kaldığı sürece dizlerin ayak parmak uçlarına yaklaşması veya hafif geçmesi doğal anatomik bir durumdur.'
      }
    ],
    programming: {
      beginner: 'Önce Bodyweight Squat ve Goblet Squat ile 3 set × 10 tekrar temelini oturtun',
      intermediate: '3–4 set × 5–10 tekrar',
      note: 'Femur (uyluk kemiği) uzunluğunuza göre gövde eğim açınız kişiden kişiye doğal olarak farklılık gösterir.'
    },
    alternatives: {
      easier: 'goblet-squat',
      harder: 'barbell-front-squat',
      equipmentAlt: ['goblet-squat', 'leg-press', 'barbell-front-squat', 'bulgarian-split-squat'],
      homeAlt: 'goblet-squat'
    },
    animation: {
      poseId: 'back-squat',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Üst sırtında halter barı taşıyan sporcunun nötr omurga ve dengeli diz-kalça bükülmesiyle çömelip doğrulmasını gösteren animasyon.',
      startLabel: 'Bar Sırtta Dik Duruş',
      endLabel: 'Paralel Squat Pozisyonu'
    },
    editorialSource: 'NSCA Squat Position Statement & Biomechanics of Resistance Exercise'
  },
  {
    id: 'barbell-front-squat',
    slug: 'barbell-front-squat',
    trName: 'Önde Halterle Çömelme (Front Squat)',
    enName: 'Barbell Front Squat',
    aliases: ['front squat', 'ön squat', 'halter ön çömelme'],
    shortDescription:
      'Halter barının ön omuzlar ve köprücük kemiği üzerinde taşındığı, gövdeyi dik kalmaya zorlayarak ön bacak (quadriceps) ve üst sırt kaslarını yoğun çalıştıran ileri seviye hareket.',
    primaryMuscleGroup: 'on-bacak',
    secondaryMuscleGroups: ['kalca', 'karin-core', 'sirt'],
    primaryMuscles: ['Quadriceps Femoris (Özellikle Vastus Grubu)', 'Gluteus Maximus'],
    secondaryMuscles: ['Erector Spinae ve Üst Sırt (Torakal Ekstansörler)', 'Rectus Abdominis'],
    stabilizerMuscles: ['Ön Omuz', 'Bilek ve Ön Kol Esneklik/Dengeleyicileri'],
    subRegionTag: 'Dik Gövde & Yoğun Ön Bacak (Quadriceps)',
    equipment: ['barbell'],
    environments: ['salon'],
    level: 'ileri',
    levelWarning:
      'İleri seviye hareketlilik ve kontrol gerektirir: Üst sırt dikliği, el bileği/omuz esnekliği ve ayak bileği hareketliliği kısıtlı olan kullanıcılar önce Goblet Squat ile çalışmalıdır.',
    movementPattern: 'squat',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Barı ön omuzlarınızın (anterior deltoid) oluşturduğu rafa yerleştirin. Parmak uçlarınızla barı alttan destekleyerek (temiz tutuş / clean rack) veya kollarınızı çapraz kavuşturarak dirseklerinizi karşıya doğru yüksek kaldırın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirseklerinizi aşağı düşürmeden ve göğsünüzü dik tutarak kalçanızı doğrudan topuklarınızın arasına doğru indirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Dip noktada gövdeniz Back Squat’a göre çok daha dik durur; dirseklerinizi yüksek tutarak barın öne yuvarlanmasını önleyin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Dirseklerinizi tavana doğru yönlendirip ayak tabanlarınızla yeri iterek dik bir hatla yükselin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Üstte derin nefes alıp gövdeyi sabitleyin, kalkışı tamamlarken nefes verin.'
      }
    ],
    cues: [
      'El bileği esnekliğiniz klasik parmak ucu tutuşuna izin vermiyorsa, kolları çapraz yapıp elleri barın üstüne koymak veya baraparat/kayış kullanmak güvenli bir alternatiftir.',
      'Hareket boyunca "dirsekler yukarıda" komutunu aklınızda tutun.'
    ],
    commonMistakes: [
      {
        mistake: 'Alt noktada dirseklerin aşağı düşmesi ve barın öne doğru kaçması.',
        correction: 'Üst sırtınızı dik tutun ve dirseklerinizi karşıdaki duvara işaret edecek kadar yüksek koruyun.'
      },
      {
        mistake: 'Barı ön omuz kası yerine doğrudan boğaza dayamak.',
        correction: 'Omuzlarınızı hafif öne-yukarı kaldırarak deltoid kası üzerinde bir yastık oluşturun.'
      },
      {
        mistake: 'Back Squat’ta kullanılan aynı ağır kiloyla denemeye başlamak.',
        correction: 'Front Squat’ta kaldırılan ağırlık doğal olarak Back Squat’ın %75–85’i civarındadır; daha hafif başlayın.'
      }
    ],
    programming: {
      beginner: 'Başlangıç seviyesi için Goblet Squat önerilir',
      intermediate: '3–4 set × 5–8 tekrar',
      note: 'Bel üzerindeki makaslama kuvvetini azaltırken ön bacak ve üst sırt postür kaslarını güçlü şekilde geliştirir.'
    },
    alternatives: {
      easier: 'goblet-squat',
      harder: 'barbell-back-squat',
      equipmentAlt: ['goblet-squat', 'barbell-back-squat', 'leg-press'],
      homeAlt: 'goblet-squat'
    },
    animation: {
      poseId: 'front-squat',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ön omuzlarında halter taşıyan ve dirseklerini yüksek tutan sporcunun dik gövdeyle çömelip kalkmasını gösteren animasyon.',
      startLabel: 'Ön Omuz Rafı (Dirsekler Yüksek)',
      endLabel: 'Dik Gövdeli Dip Çömelme'
    },
    editorialSource: 'Journal of Biomechanics — Front vs. Back Squat Karşılaştırmalı Analizi'
  },
  {
    id: 'reverse-lunge',
    slug: 'reverse-lunge',
    trName: 'Geriye Adım Hamle (Reverse Lunge)',
    enName: 'Reverse Lunge',
    aliases: ['reverse lunge', 'geriye lunge', 'geri adım komando', 'tek bacak çömelme'],
    shortDescription:
      'Bir bacakla geriye adım atarak yapılan, ileri adıma kıyasla ön diz üzerindeki yavaşlatma yükünü azaltıp kalça ve ön bacağı dengeli çalıştıran hamle hareketi.',
    primaryMuscleGroup: 'on-bacak',
    secondaryMuscleGroups: ['kalca', 'arka-bacak', 'karin-core'],
    primaryMuscles: ['Quadriceps Femoris (Ön Bacak)', 'Gluteus Maximus (Kalça)'],
    secondaryMuscles: ['Gluteus Medius (Pelvis Dengeleyici)', 'Hamstring'],
    stabilizerMuscles: ['Core Kasları', 'Ayak Bileği Dengeleyicileri'],
    subRegionTag: 'Diz Dostu Tek Bacak Ön Bacak & Kalça',
    equipment: ['vucut-agirligi', 'dumbbell'],
    environments: ['ev', 'salon'],
    environmentNote: 'Evde tamamen ekipmansız veya iki elde dambıl tutarak uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'squat',
    mechanic: 'bilesik',
    laterality: 'tek-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızı kalça genişliğinde açarak dik durun (dilerseniz iki elinizde dambıl tutun veya ellerinizi belinize koyun).'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Ağırlığınızı öndeki ayağınızda tutarak diğer ayağınızla kontrollü bir şekilde geriye doğru bir adım atın ve her iki dizinizi yaklaşık 90 derece bükerek alçalın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Arka diziniz yere birkaç santimetre yaklaştığında öndeki uyluğunuz yere paralel olmalı; arka dizinizi yere sertçe vurmayın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Öndeki ayağınızın tam tabanıyla yeri güçlüce iterek arkadaki ayağınızı tekrar başlangıç noktasına yanına çekin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Geriye adım alıp inerken nefes alın, öndeki bacakla yukarı iterken nefes verin.'
      }
    ],
    cues: [
      'Adımınızı ip üzerinde yürür gibi tam arkaya değil, tren rayları üzerinde durur gibi kalça genişliğinde geriye atın; bu duruş dengenizi çok kolaylaştırır.',
      'Gövdenizi hafifçe (10–15 derece) öne eğmek kalça aktivasyonunu artırır ve belinizi korur.'
    ],
    commonMistakes: [
      {
        mistake: 'Ayağı ip üstünde yürür gibi tam diğer ayağın arkasına atıp dengeyi kaybetmek.',
        correction: 'Ayaklarınız arasında yatayda her zaman kalça genişliği kadar mesafe koruyun.'
      },
      {
        mistake: 'Arka dizi hızla yere çarptırmak.',
        correction: 'İnişi kontrollü yapın ve yere değmeden 2–3 cm yukarıda durun.'
      },
      {
        mistake: 'Kalkarken arkadaki ayakla yerden zıplayarak çıkmak.',
        correction: 'İtişin %80–90’ını önde sabit duran bacağınızdan üretin.'
      }
    ],
    programming: {
      beginner: '3 set × her bacak için 8–10 tekrar (ekipmansız)',
      intermediate: '3–4 set × her bacak için 10–12 tekrar (dambıl ile)',
      note: 'Öndeki kaval kemiği daha sabit kaldığı için ileri lunge hareketine göre diz eklemi için genellikle daha konforludur.'
    },
    alternatives: {
      easier: 'bodyweight-squat',
      harder: 'bulgarian-split-squat',
      equipmentAlt: ['dumbbell-walking-lunge', 'bulgarian-split-squat', 'step-up'],
      homeAlt: 'bodyweight-squat'
    },
    animation: {
      poseId: 'lunge',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Bir bacağıyla geriye adım atarak her iki dizini 90 derece büken ve öndeki bacakla doğrulup başlangıca dönen sporcuyu gösteren animasyon.',
      startLabel: 'Ayakta Dengeli Duruş',
      endLabel: 'Geri Hamle (Çift Diz 90°)'
    },
    editorialSource: 'JOSPT Lunge Varyasyonlarında Diz Eklem Yükü Analizi'
  },
  {
    id: 'dumbbell-walking-lunge',
    slug: 'dumbbell-walking-lunge',
    trName: 'Dambıl ile Yürüyerek Hamle',
    enName: 'Dumbbell Walking Lunge',
    aliases: ['walking lunge', 'yürüyerek lunge', 'dambıl komando yürüyüşü'],
    shortDescription:
      'İki elde dambıl tutarak her adımda ileri doğru çömelip bir sonraki adıma geçilen, ön bacak, kalça, denge ve kondisyonu birlikte geliştiren dinamik hareket.',
    primaryMuscleGroup: 'on-bacak',
    secondaryMuscleGroups: ['kalca', 'arka-bacak', 'on-kol', 'karin-core'],
    primaryMuscles: ['Quadriceps Femoris (Ön Bacak)', 'Gluteus Maximus (Kalça)'],
    secondaryMuscles: ['Gluteus Medius (Kalça Yan Dengeleyici)', 'Hamstring', 'Baldır'],
    stabilizerMuscles: ['Core Kasları', 'Ön Kol Kavrama Kasları', 'Üst Sırt'],
    subRegionTag: 'Dinamik Tek Bacak Kuvvet & Denge',
    equipment: ['dumbbell'],
    environments: ['salon', 'ev'],
    environmentNote: 'İleri doğru birkaç adım yürüyebileceğiniz açık bir koridor veya salon alanı gerektirir; dar alanda Reverse Lunge tercih edilebilir.',
    level: 'orta',
    movementPattern: 'squat',
    mechanic: 'bilesik',
    laterality: 'tek-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'İki elinize birer dambıl alın, omuzlarınızı geriye-aşağıya sabitleyin ve önünüzde yürüyebileceğiniz açık bir hat bırakın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Sağ ayağınızla ileri doğru kontrollü bir adım atın; topuğunuz ve ardından tüm tabanınız yere bastığında her iki dizinizi bükerek alçalın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Öndeki uyluğunuz yere paralel olduğunda öndeki dizinizin içe çökmediğinden emin olun.'
      },
      {
        title: 'Kontrollü Dönüş (Sonraki Adım)',
        detail:
          'Öndeki sağ ayağınızla yeri güçlüce iterek vücudunuzu ileri-yukarı taşıyın ve doğrudan sol ayağınızla bir sonraki ileri adıma geçin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Her adım inişinde nefes alın, yukarı-ileri kalkarken nefes verin. Adımlar arasında acele etmeyin.'
      }
    ],
    cues: [
      'Adım sonrası dengeniz bozuluyorsa bir sonraki adıma direkt geçmek yerine ortada ayakları kısa bir an yan yana getirip nefes yenileyin.',
      'Dambılların bacaklarınıza çarpmasına ve gövdenizi öne çekmesine izin vermeyin.'
    ],
    commonMistakes: [
      {
        mistake: 'Çok kısa veya aşırı uzun adım atarak diz ve kalça dengesini bozmak.',
        correction: 'Alt noktada her iki dizin yaklaşık 90 derece açı oluşturduğu doğal bir adım mesafesi kullanın.'
      },
      {
        mistake: 'Öndeki dizin adım anında içe doğru dönmesi.',
        correction: 'Diz kapağınızı ikinci ayak parmağınızla aynı çizgide tutun.'
      },
      {
        mistake: 'Yoruldukça omuzları düşürüp sırtı kamburlaştırmak.',
        correction: 'Göğsü dik, kürek kemiklerini sabit koruyun.'
      }
    ],
    programming: {
      beginner: 'Önce yerinde Reverse Lunge ile denge kazanılması önerilir',
      intermediate: '3 set × her bacak için 8–12 adım (toplam 16–24 adım)',
      note: 'Yüksek kas kütlesini aynı anda çalıştırdığı için nabzı hızlı yükseltir; set aralarında yeterli dinlenme bırakın.'
    },
    alternatives: {
      easier: 'reverse-lunge',
      harder: 'bulgarian-split-squat',
      equipmentAlt: ['reverse-lunge', 'bulgarian-split-squat', 'step-up'],
      homeAlt: 'reverse-lunge'
    },
    animation: {
      poseId: 'lunge',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ellerinde dambıl tutarak ileri adım alıp çömelerek yürüyen sporcuyu gösteren animasyon.',
      startLabel: 'Dik Adım Hazırlığı',
      endLabel: 'İleri Adım Çömelme'
    },
    editorialSource: 'NSCA Tek Bacak (Unilateral) Kuvvet Rehberi'
  },
  {
    id: 'bulgarian-split-squat',
    slug: 'bulgarian-split-squat',
    trName: 'Arka Ayak Yükseltilmiş Tek Bacak Squat',
    enName: 'Bulgarian Split Squat',
    aliases: ['bulgarian split squat', 'bulgar squat', 'sehpa destekli tek bacak squat'],
    shortDescription:
      'Arkadaki ayağı bir sehpa üzerine yerleştirip yükün büyük bölümünü öndeki bacağa veren, ön bacak ve kalça gelişimi için en etkili tek taraflı hareketlerden biri.',
    primaryMuscleGroup: 'on-bacak',
    secondaryMuscleGroups: ['kalca', 'arka-bacak', 'karin-core'],
    primaryMuscles: ['Quadriceps Femoris (Ön Bacak)', 'Gluteus Maximus (Kalça)'],
    secondaryMuscles: ['Gluteus Medius (Kalça Yan Stabilizatörü)', 'Adductor Magnus'],
    stabilizerMuscles: ['Core Kasları', 'Ayak Bileği Sabitleyicileri', 'Ön Kol Kavrama (Dambıl ile)'],
    subRegionTag: 'Yoğun Tek Bacak Ön Bacak & Kalça',
    equipment: ['dumbbell', 'bench-sehpa', 'vucut-agirligi'],
    environments: ['salon', 'ev'],
    environmentNote: 'Önce vücut ağırlığıyla dengesi öğrenilmeli, ardından elde dambıl ile yüklenmelidir.',
    level: 'orta',
    movementPattern: 'squat',
    mechanic: 'bilesik',
    laterality: 'tek-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Sehpadan yaklaşık iki ayak boyu önde, sırtınız sehpaya dönük durun. Bir ayağınızın üst kısmını (bağcık bölgesini) gerideki sehpanın kenarına rahatça yerleştirin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Yükün %85–90’ını öndeki ayağınızda tutarak arka dizinizi yere doğru kontrollü şekilde indirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Öndeki uyluğunuz yere paralel konuma geldiğinde kalça ve ön bacağınızdaki derin gerilimi hissedin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Arkadaki ayağınızdan güç almamaya çalışarak, öndeki ayağınızın tam tabanıyla yeri itip başlangıç pozisyonuna yükselin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İnerken 2–3 saniyede nefes alın, yukarı iterken nefes verin.'
      }
    ],
    cues: [
      'Gövdenizi çok dik tutarsanız ön bacak (quadriceps), gövdenizi kalçadan 15–20 derece öne eğerseniz kalça (gluteus maximus) daha fazla devreye girer.',
      'Sehpa çok yüksekse beliniz çukurlaşabilir; diz hizasında veya biraz daha alçak bir yükselti çok daha konforludur.'
    ],
    commonMistakes: [
      {
        mistake: 'Sehpaya çok yakın veya aşırı uzak durup dengeyi kaybetmek.',
        correction: 'Önce sehpaya oturup bacağınızı düz uzatın; topuğunuzun değdiği nokta öndeki ayağınız için ideal başlangıç yeridir.'
      },
      {
        mistake: 'Arkadaki bacağı kasıp sehpayı iterek kalkmaya çalışmak.',
        correction: 'Arka ayağınızı sadece hafif bir denge çıpası gibi bırakın; tüm itişi öndeki bacakla yapın.'
      },
      {
        mistake: 'Öndeki dizin içe doğru devrilmesi.',
        correction: 'Öndeki dizinizi ayak orta parmağınızla aynı hizada tutun; gerekirse boştaki elinizle duvardan hafif denge desteği alın.'
      }
    ],
    programming: {
      beginner: 'Vücut ağırlığıyla 3 set × her bacak için 8 tekrar',
      intermediate: 'Dambıl ile 3–4 set × her bacak için 8–12 tekrar',
      note: 'Bel üzerine ağır halter yükü bindirmeden bacakları ve kalçayı maksimum düzeyde çalıştırma imkânı sunar.'
    },
    alternatives: {
      easier: 'reverse-lunge',
      harder: 'barbell-back-squat',
      equipmentAlt: ['reverse-lunge', 'step-up', 'goblet-squat', 'leg-press'],
      homeAlt: 'reverse-lunge'
    },
    animation: {
      poseId: 'bulgarian-split-squat',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Arka ayağını sehpa üzerine yerleştiren sporcunun öndeki bacağı üzerinde derin şekilde çömelip doğrulmasını gösteren animasyon.',
      startLabel: 'Arka Ayak Sehpada Dik Duruş',
      endLabel: 'Derin Tek Bacak Çömelme'
    },
    editorialSource: 'International Journal of Exercise Science — Bulgarian Split Squat Biyomekaniği'
  },
  {
    id: 'romanian-deadlift',
    slug: 'romanian-deadlift',
    trName: 'Halter Romen Deadlift (RDL)',
    enName: 'Romanian Deadlift',
    aliases: ['rdl', 'romanian deadlift', 'romen deadlift', 'arka bacak halter', 'kalça menteşesi'],
    shortDescription:
      'Dizleri hafif ve sabit bir bükülmede tutarak kalçayı geriye itme (menteşe) prensibiyle yapılan, arka bacak (hamstring), kalça ve sırt destek kaslarını geliştiren temel hareket.',
    primaryMuscleGroup: 'arka-bacak',
    secondaryMuscleGroups: ['kalca', 'sirt', 'on-kol', 'karin-core'],
    primaryMuscles: ['Hamstring (Biceps Femoris, Semitendinosus, Semimembranosus)', 'Gluteus Maximus (Kalça)'],
    secondaryMuscles: ['Erector Spinae (Omurga Sabitleyicileri)', 'Adductor Magnus'],
    stabilizerMuscles: ['Latissimus Dorsi (Barı Vücuda Yakın Tutma)', 'Trapezius', 'Ön Kol Kavrama Kasları', 'Core'],
    subRegionTag: 'Temel Kalça Menteşesi & Arka Bacak',
    equipment: ['barbell'],
    environments: ['salon'],
    level: 'orta',
    movementPattern: 'kalca-mentesesi',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    featured: true,
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Barı rack üzerinden (veya yerden deadlift tekniğiyle) alarak uyluklarınızın önünde, omuz genişliğinde tutuşla dik durun. Ayaklarınızı kalça genişliğinde yerleştirin ve dizlerinizi hafifçe (yaklaşık 15–20 derece) büküp bu açıyı sabitleyin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Barı bacaklarınıza temas edecek kadar yakın tutarak, sanki arkanızdaki bir kapıyı kalçanızla kapatıyormuş gibi kalçanızı yatay olarak geriye doğru itin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kalçanız daha fazla geriye gidemediğinde (genellikle bar diz kapağının hemen altına veya kaval kemiği ortasına geldiğinde) ve arka bacaklarınızda güçlü bir gerilim hissettiğinizde durun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Sırtınızı düz tutarak kalçanızı ileri doğru itin ve başlangıçtaki dik duruşa dönün.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İnişte 2–3 saniyede nefes alın, kalçayı ileri iterken nefes verin.'
      }
    ],
    cues: [
      'Amacınız barı yere değdirmek değildir! Kalçanız geriye gitmeyi bıraktığı anda daha aşağı inmeye çalışırsanız hareket arka bacaktan çıkıp belinizin yuvarlanmasına dönüşür.',
      'Kanat kaslarınızı sıkarak barın bacaklarınızdan uzaklaşmasını önleyin.'
    ],
    commonMistakes: [
      {
        mistake: 'Esneklik sınırını aşıp plakaları yere değdirmek için beli kamburlaştırmak.',
        correction: 'Hareket açıklığını kalçanızın geriye gidebildiği mesafe belirler; kaval kemiği ortasında durmak çoğu kişi için idealdir.'
      },
      {
        mistake: 'Barın bacaklardan öne doğru uzaklaşmasına izin vermek.',
        correction: 'Bar uyluk ve kaval kemiğinize neredeyse sürtünecek kadar yakın inip çıkmalıdır.'
      },
      {
        mistake: 'Tepe noktada beli aşırı geriye bükerek (hiper-ekstansiyon) sıkıştırmak.',
        correction: 'Tepe noktada sadece kalçanızı sıkıp tam dik (nötr) duruşta hareketi bitirin.'
      }
    ],
    programming: {
      beginner: 'Önce Dumbbell Romanian Deadlift ile menteşe tekniğini öğrenin',
      intermediate: '3–4 set × 8–10 tekrar',
      note: 'Arka zincir (hamstring ve kalça) kuvveti için en temel egzersizlerden biridir.'
    },
    alternatives: {
      easier: 'dumbbell-romanian-deadlift',
      harder: 'barbell-hip-thrust',
      equipmentAlt: ['dumbbell-romanian-deadlift', 'lying-leg-curl', 'kettlebell-swing', 'glute-bridge'],
      homeAlt: 'dumbbell-romanian-deadlift'
    },
    animation: {
      poseId: 'romanian-deadlift',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Dizlerini hafif bükülü sabit tutan sporcunun kalçasını geriye iterek halteri kaval kemiği ortasına kadar indirip doğrulmasını gösteren animasyon.',
      startLabel: 'Ayakta Dik Başlangıç',
      endLabel: 'Kalça Geride (Arka Bacak Gergin)'
    },
    editorialSource: 'NSCA & Journal of Strength and Conditioning Research — RDL Biyomekaniği'
  },
  {
    id: 'dumbbell-romanian-deadlift',
    slug: 'dumbbell-romanian-deadlift',
    trName: 'Dambıl Romen Deadlift',
    enName: 'Dumbbell Romanian Deadlift',
    aliases: ['dumbbell rdl', 'dambıl arka bacak', 'dambıl romen deadlift', 'evde arka bacak'],
    shortDescription:
      'İki elde tutulan dambıllarla kalça menteşesi yapılarak uygulanan, arka bacak ve kalça kaslarını evde veya salonda güvenle çalıştıran hareket.',
    primaryMuscleGroup: 'arka-bacak',
    secondaryMuscleGroups: ['kalca', 'sirt', 'on-kol', 'karin-core'],
    primaryMuscles: ['Hamstring (Arka Bacak Kas Grubu)', 'Gluteus Maximus (Kalça)'],
    secondaryMuscles: ['Erector Spinae', 'Adductor Magnus'],
    stabilizerMuscles: ['Üst Sırt ve Kanat Kasları', 'Core', 'Ön Kol Kavrama Kasları'],
    subRegionTag: 'Arka Bacak & Kalça Menteşesi (Dambıl)',
    equipment: ['dumbbell'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'kalca-mentesesi',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızı kalça genişliğinde açın, dambılları uyluklarınızın ön-yan kısmında tutun. Omuzlarınızı geriye sabitleyin ve dizlerinizi hafifçe bükün.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Sırtınızı düz tutarak kalçanızı yatay olarak geriye doğru itin; dambıllar bacaklarınızın yanından/önünden aşağı doğru kaysın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Dambıllar kaval kemiğinizin ortasına yaklaştığında ve arka bacaklarınızda belirgin bir esneme hissettiğinizde durun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Topuklarınızla yeri itip kalçanızı ileri taşıyarak dik duruşa dönün.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          '3 saniyede kontrollü inerken nefes alın, doğrulurken nefes verin.'
      }
    ],
    cues: [
      'Dambılları bacaklarınızın tam önünde değil, hafifçe dış-ön yanında tutmak ağırlık merkezini vücuda daha yakın tutar ve beli rahatlatır.',
      'Başınızı yukarı kaldırmayın; boynunuz omurganızla aynı düz çizgide kalsın.'
    ],
    commonMistakes: [
      {
        mistake: 'Dizleri çok fazla bükerek hareketi squat (çömelme) formuna dönüştürmek.',
        correction: 'Dizlerinizdeki 15–20 derecelik bükülmeyi başlangıçta sabitleyin ve hareketi sadece kalça ekleminden yapın.'
      },
      {
        mistake: 'Sırtı yuvarlayıp omuzları öne düşürmek.',
        correction: 'Kürek kemiklerinizi cebinize koyuyormuş gibi geriye-aşağıya sabitleyin.'
      },
      {
        mistake: 'Bakışları karşıdaki aynaya dikip boynu geriye kırmak.',
        correction: 'İniş sırasında bakışlarınızı birkaç metre önünüzdeki zemine yönlendirin.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3–4 set × 10–12 tekrar',
      note: 'Halter versiyonuna geçmeden önce kalça menteşesi (hip hinge) motor becerisini kazanmak için en uygun harekettir.'
    },
    alternatives: {
      easier: 'glute-bridge',
      harder: 'romanian-deadlift',
      equipmentAlt: ['romanian-deadlift', 'kettlebell-swing', 'lying-leg-curl', 'glute-bridge'],
      homeAlt: 'glute-bridge'
    },
    animation: {
      poseId: 'romanian-deadlift',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ellerindeki dambılları bacaklarına yakın tutarak kalçadan öne menteşe yapan ve doğrulan sporcuyu gösteren animasyon.',
      startLabel: 'Dik Duruş (Dambıllar Yanda)',
      endLabel: 'Kalça Menteşesi (Kaval Hizası)'
    },
    editorialSource: 'ACSM & NSCA Temel Menteşe Hareketleri Rehberi'
  },
  {
    id: 'leg-press',
    slug: 'leg-press',
    trName: 'Makinede Bacak İtiş (Leg Press)',
    enName: 'Leg Press',
    aliases: ['leg press', 'bacak itiş makinesi', '45 derece leg press'],
    shortDescription:
      'Sırt ve bel desteği sağlayan kızaklı makinede platformu bacaklarla iterek ön bacak ve kalça kaslarını yüksek yük altında çalıştıran bileşik hareket.',
    primaryMuscleGroup: 'on-bacak',
    secondaryMuscleGroups: ['kalca', 'arka-bacak', 'baldir'],
    primaryMuscles: ['Quadriceps Femoris (Ön Bacak)', 'Gluteus Maximus (Kalça)'],
    secondaryMuscles: ['Adductor Magnus', 'Hamstring'],
    stabilizerMuscles: ['Core Kasları (Koltuk Sabitlemesi)'],
    subRegionTag: 'Sırt Destekli Yüksek Yük Ön Bacak & Kalça',
    equipment: ['spor-salonu-makineleri'],
    environments: ['salon'],
    level: 'baslangic',
    movementPattern: 'squat',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Makineye oturun, kalçanızı ve sırtınızı mindere tam yerleştirin. Ayaklarınızı platformun ortasına omuz genişliğinde yerleştirin, bacaklarınızı uzatıp yanlardaki emniyet kilitlerini açın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Yan tutamaklardan sıkıca tutunarak kalçanızı koltuktan ayırmadan dizlerinizi göğsünüze doğru kontrollü biçimde bükün.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Dizleriniz yaklaşık 90 derece büküldüğünde (veya beliniz minderden kalkmadan inebildiğiniz güvenli derinlikte) durun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ayak tabanlarınızın tamamıyla platformu iterek bacaklarınızı uzatın; ancak tepe noktada dizlerinizi asla sertçe kilitlemeyin!'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Platform inerken nefes alın, iterken nefes verin. Set bitince emniyet mandallarını kapattığınızdan emin olmadan bacaklarınızı gevşetmeyin.'
      }
    ],
    cues: [
      'Güvenlik kuralı #1: Tepe noktada dizlerinizi geriye doğru kilitlemeyin (hiper-ekstansiyon yapmayın); dizlerde her zaman çok hafif bir bükülme bırakın.',
      'Ayaklarınızı platformun biraz alt kısmına koyarsanız ön bacak (quadriceps), biraz üst kısmına koyarsanız kalça ve arka bacak payı artar.'
    ],
    commonMistakes: [
      {
        mistake: 'Tepe noktada diz eklemlerini sertçe kilitlemek.',
        correction: 'Yükü eklem yerine kas üzerinde tutmak ve güvenliği sağlamak için tepe noktada dizleri tam kilitlemeden durun.'
      },
      {
        mistake: 'Platformu kalçanın ve belin koltuktan havaya kalkacağı kadar derin indirmek.',
        correction: 'Kuyruk sokumunuz koltuktan ayrıldığı anda bel disklerinize yüksek yük biner; kalçanızın minderde kaldığı derinlikte durun.'
      },
      {
        mistake: 'Ellerle dizlerin üstünden iterek yardımcı olmaya çalışmak.',
        correction: 'Ellerinizle koltuğun yanındaki tutamakları çekerek kalçanızı koltuğa sabitleyin.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3–4 set × 10–15 tekrar',
      note: 'Omurga üzerine dikey yük bindirmeden bacak kaslarını güçlü şekilde çalıştırmak için mükemmel bir makinedir.'
    },
    alternatives: {
      easier: 'bodyweight-squat',
      harder: 'barbell-back-squat',
      equipmentAlt: ['goblet-squat', 'barbell-back-squat', 'bulgarian-split-squat'],
      homeAlt: 'goblet-squat'
    },
    animation: {
      poseId: 'leg-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Eğimli leg press koltuğunda oturan sporcunun ayaklarıyla platformu kontrollü indirip dizlerini kilitlemeden itmesini gösteren animasyon.',
      startLabel: 'Platform Yukarıda (Dizler Hafif Esnek)',
      endLabel: 'Dizler 90 Derece Bükülü'
    },
    editorialSource: 'NSCA & ACSM Makine Güvenlik Kılavuzu'
  },
  {
    id: 'leg-extension',
    slug: 'leg-extension',
    trName: 'Makinede Ön Bacak Uzatma',
    enName: 'Leg Extension',
    aliases: ['leg extension', 'ön bacak makinesi', 'quadriceps uzatma'],
    shortDescription:
      'Oturarak sadece diz eklemini açma (ekstansiyon) hareketiyle dört başlı ön uyluk kasını (Quadriceps), özellikle de Rectus Femoris başını doğrudan izole eden makine hareketi.',
    primaryMuscleGroup: 'on-bacak',
    secondaryMuscleGroups: [],
    primaryMuscles: ['Quadriceps Femoris (Rectus Femoris, Vastus Medialis, Lateralis & Intermedius)'],
    secondaryMuscles: [],
    stabilizerMuscles: ['Core ve Kalça (Yan Tutamaklarla Koltuk Sabitlemesi)'],
    subRegionTag: 'Saf Ön Bacak (Quadriceps) İzolasyonu',
    equipment: ['spor-salonu-makineleri'],
    environments: ['salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Sırt dayanağını diz kapağınızın arkası koltuk kenarına tam oturacak ve diz ekleminiz makinenin dönme ekseniyle aynı hizada olacak şekilde ayarlayın. Alt pedi ayak bileğinizin hemen üstüne yerleştirin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Yan tutamakları kavrayıp kalçanızı koltuğa bastırın. Ön bacak kaslarınızı sıkarak bacaklarınızı karşıya doğru kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Bacaklarınız düzleştiğinde tepe noktada 1 saniye duraksayıp ön uyluk kaslarınızı bilinçli olarak sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ağırlığın hızla düşmesine izin vermeden 2–3 saniyede başlangıç pozisyonuna indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Uzatırken nefes verin, kontrollü indirirken nefes alın.'
      }
    ],
    cues: [
      'Rectus Femoris kası hem kalça hem diz eklemini geçtiği için squat sırasında kalça da büküldüğünden tam kısalmaz; Leg Extension ise kalça sabit olduğu için bu kası doğrudan çalıştırır.',
      'Ayak parmak uçlarınızı hafifçe kendinize (tavana) doğru çekili tutun.'
    ],
    commonMistakes: [
      {
        mistake: 'Ağır kiloyu fırlatıp tepe noktada hiç durmadan bırakmak.',
        correction: 'Diz eklemini korumak için savurma yapmayın; tepe noktada 1 saniye durabileceğiniz bir ağırlık seçin.'
      },
      {
        mistake: 'Sırt dayanağını ayarlamayıp dizleri makinenin dönme ekseninden çok önde veya geride bırakmak.',
        correction: 'Makine yanındaki kırmızı/sarı pivot noktasını diz ekleminizle tam hizalayın.'
      },
      {
        mistake: 'Kalkışta kalçayı koltuktan havaya kaldırmak.',
        correction: 'Yan tutamakları aşağı çekerek kalçanızı koltuğa kilitleyin.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 tekrar',
      intermediate: '3–4 set × 12–15 tekrar (tepede 1 sn sıkıştırmalı)',
      note: 'Ön diz (patellofemoral) hassasiyeti olan kişiler yüksek ağırlıklar yerine kontrollü orta yükleri veya kapalı zincir hareketleri (Goblet Squat, Step-up) tercih edebilir.'
    },
    alternatives: {
      easier: 'bodyweight-squat',
      harder: 'goblet-squat',
      equipmentAlt: ['goblet-squat', 'leg-press', 'reverse-lunge'],
      homeAlt: 'reverse-lunge'
    },
    animation: {
      poseId: 'leg-extension',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Makinede oturan sporcunun alt bacaklarını karşıya doğru düzleştirerek ön uyluk kaslarını sıkıştırmasını gösteren animasyon.',
      startLabel: 'Dizler 90 Derece Bükülü',
      endLabel: 'Bacaklar Karşıda Düz'
    },
    editorialSource: 'JOSPT & NSCA Açık Kinetik Zincir Diz Egzersizleri İncelemesi'
  },
  {
    id: 'lying-leg-curl',
    slug: 'lying-leg-curl',
    trName: 'Yatarak Arka Bacak Bükme',
    enName: 'Lying Leg Curl',
    aliases: ['leg curl', 'lying leg curl', 'arka bacak makinesi', 'hamstring curl'],
    shortDescription:
      'Yüzüstü uzanarak topukları kalçaya doğru çeken, arka bacak (hamstring) kaslarının diz bükme fonksiyonunu doğrudan izole eden makine hareketi.',
    primaryMuscleGroup: 'arka-bacak',
    secondaryMuscleGroups: ['baldir'],
    primaryMuscles: ['Hamstring (Biceps Femoris — Kısa ve Uzun Baş, Semitendinosus, Semimembranosus)'],
    secondaryMuscles: ['Gastrocnemius (Baldır Üst Kısmı — Diz Bükme Yardımı)'],
    stabilizerMuscles: ['Gluteus Maximus ve Core (Kalçayı Mindere Sabitleme)'],
    subRegionTag: 'Diz Bükme Odaklı Arka Bacak İzolasyonu',
    equipment: ['spor-salonu-makineleri'],
    environments: ['salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Makineye yüzüstü uzanın; diz kapaklarınız minderin bittiği kenarın hemen dışında kalsın ve arka ped aşil tendonunuzun / ayak bileğinizin arkasına otursun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Kalçanızı mindere bastırarak (kalçanızı havaya kaldırmadan) topuklarınızı kalçanıza doğru kontrollü biçimde çekin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Ped kalçanıza yaklaştığında arka bacak kaslarınızı 1 saniye boyunca güçlüce sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ağırlığı çarptırmadan 2–3 saniyede bacaklarınız neredeyse düzleşene kadar yavaşça başlangıç pozisyonuna indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Bükerken nefes verin, kontrollü indirirken nefes alın.'
      }
    ],
    cues: [
      'Hamstring kaslarının kısa başı (Biceps Femoris Short Head) kalça eklemini geçmez, sadece dizi büker; bu nedenle RDL yanında bir Leg Curl varyasyonu yapmak arka bacağı eksiksiz çalıştırır.',
      'Kalçanızı minderden kaldırmamak için hareket boyunca leğen kemiğinizi mindere doğru hafifçe itin.'
    ],
    commonMistakes: [
      {
        mistake: 'Ağırlığı çekerken kalçayı minderden havaya kaldırıp beli çukurlaştırmak.',
        correction: 'Kalça kalkıyorsa ağırlık fazladır; ağırlığı düşürüp leğen kemiğinizi mindere yapışık tutun.'
      },
      {
        mistake: 'İniş fazında ağırlığı hızla bırakıp dizleri sertçe çarptırmak.',
        correction: 'Arka bacak gelişimi için 2–3 saniyelik yavaş iniş fazı çok değerlidir.'
      },
      {
        mistake: 'Diz kapaklarını minderin tam üstünde bırakıp eklemi sıkıştırmak.',
        correction: 'Ped uzunluğunu ayarlayarak diz kapaklarınızın minder kenarının hemen dışında rahatça bükülmesini sağlayın.'
      }
    ],
    programming: {
      beginner: '3 set × 10–15 tekrar',
      intermediate: '3–4 set × 10–15 tekrar',
      note: 'Romanian Deadlift gibi kalça menteşesi hareketleriyle mükemmel bir ikili oluşturur.'
    },
    alternatives: {
      easier: 'glute-bridge',
      harder: 'romanian-deadlift',
      equipmentAlt: ['romanian-deadlift', 'dumbbell-romanian-deadlift', 'glute-bridge'],
      homeAlt: 'glute-bridge'
    },
    animation: {
      poseId: 'leg-curl',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Makinede yüzüstü uzanan sporcunun kalçasını sabit tutarak topuklarını kalçasına doğru çekip kontrollü uzatmasını gösteren animasyon.',
      startLabel: 'Bacaklar Uzun Başlangıç',
      endLabel: 'Topuklar Kalçaya Yakın'
    },
    editorialSource: 'NSCA & Medicine & Science in Sports & Exercise — Hamstring Bölgesel Aktivasyonu'
  },
  {
    id: 'standing-calf-raise',
    slug: 'standing-calf-raise',
    trName: 'Ayakta Baldır Yükselişi',
    enName: 'Standing Calf Raise',
    aliases: ['calf raise', 'ayakta kalf', 'baldır hareketi', 'parmak ucu yükselme'],
    shortDescription:
      'Dizler düz konumdayken ayak parmak uçlarında yükselip topukları aşağı esneten, baldırın yüzeyel ve hacimli Gastrocnemius kasını hedefleyen temel hareket.',
    primaryMuscleGroup: 'baldir',
    secondaryMuscleGroups: [],
    primaryMuscles: ['Gastrocnemius (İç ve Dış Baş)', 'Soleus'],
    secondaryMuscles: ['Tibialis Posterior ve Ayak Tabanı Dengeleyicileri'],
    stabilizerMuscles: ['Core ve Kalça Sabitleyicileri'],
    subRegionTag: 'Üst Baldır (Gastrocnemius — Diz Düz)',
    equipment: ['vucut-agirligi', 'dumbbell', 'spor-salonu-makineleri'],
    environments: ['ev', 'salon'],
    environmentNote: 'Evde bir basamak kenarında vücut ağırlığı veya tek elde dambıl ile, salonda ise Standing Calf Raise makinesinde uygulanır.',
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızın ön kısmı (tarak bölgesi) bir basamak veya platform üzerinde, topuklarınız ise boşlukta kalacak şekilde dik durun. Denge için bir elinizle duvardan veya makine tutamağından destek alın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dizlerinizi bükmeden ayak parmak köklerinizle platformu iterek topuklarınızı olabildiğince yukarı kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'En üst noktada baldır kaslarınızı 1–2 saniye boyunca güçlüce sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Topuklarınızı basamak seviyesinin hafif altına kadar 2–3 saniyede yavaşça indirip dip noktada 1 saniye esnetin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yukarı çıkarken nefes verin, dip noktada esnerken nefes alın. Asla yaylanarak hızlı zıplamalar yapmayın.'
      }
    ],
    cues: [
      'Aşil tendonu elastik enerjiyi çok iyi depolar; eğer dip noktada 1 saniye beklemeden hızla zıplarsanız kas yerine tendon yaylanması kullanmış olursunuz.',
      'Evde vücut ağırlığı kolay gelirse hareketi tek ayak üzerinde yaparak yükü iki katına çıkarabilirsiniz.'
    ],
    commonMistakes: [
      {
        mistake: 'Dip noktada hiç beklemeden yaylanarak hızlı ve kısa tekrarlar yapmak.',
        correction: 'Dipte 1 saniye tam esneme, tepede 1 saniye tam sıkıştırma kuralını uygulayın.'
      },
      {
        mistake: 'Yükselirken dizleri büküp bacaklardan ivme almak.',
        correction: 'Gastrocnemius kasının tam çalışması için dizlerinizi kilitli değil ama düz tutun.'
      },
      {
        mistake: 'Ağırlığı serçe parmak tarafına yıkıp ayak bileğini dışa burkmak.',
        correction: 'Başparmak kökünüzle platformu güçlüce iterek bileği düz hat üzerinde yükseltin.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 yavaş tekrar',
      intermediate: '3–4 set × 12–20 tekrar (veya tek bacak dambıl ile 10–15 tekrar)',
      note: 'Tam hareket açıklığı ve yavaş tempo, baldır gelişiminde kullanılan kilodan çok daha belirleyicidir.'
    },
    alternatives: {
      easier: 'seated-calf-raise',
      harder: 'farmers-carry',
      equipmentAlt: ['seated-calf-raise', 'farmers-carry'],
      homeAlt: 'seated-calf-raise'
    },
    animation: {
      poseId: 'calf-raise',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Basamak üzerinde dizleri düz duran sporcunun parmak uçlarında tam yükselip topuklarını kontrollü aşağı esnetmesini gösteren animasyon.',
      startLabel: 'Topuklar Aşağıda (Esneme)',
      endLabel: 'Parmak Ucunda Tam Yükseliş'
    },
    editorialSource: 'NSCA Alt Ekstremite ve Baldır Antrenman Rehberi'
  },
  {
    id: 'seated-calf-raise',
    slug: 'seated-calf-raise',
    trName: 'Oturarak Baldır Yükselişi',
    enName: 'Seated Calf Raise',
    aliases: ['seated calf raise', 'oturarak kalf', 'soleus hareketi'],
    shortDescription:
      'Dizlerin 90 derece bükülü olduğu oturur pozisyonda uygulanarak baldırın derin ve dayanıklı Soleus kasını doğrudan çalıştıran hareket.',
    primaryMuscleGroup: 'baldir',
    secondaryMuscleGroups: [],
    primaryMuscles: ['Soleus (Derin Baldır Kası)'],
    secondaryMuscles: ['Gastrocnemius'],
    stabilizerMuscles: ['Ayak Bileği Sabitleyicileri'],
    subRegionTag: 'Alt / Derin Baldır (Soleus — Diz Bükülü)',
    equipment: ['spor-salonu-makineleri', 'dumbbell', 'bench-sehpa'],
    environments: ['salon', 'ev'],
    environmentNote: 'Salonda Seated Calf Raise makinesinde; evde ise bir sehpaya oturup ayak uçlarınızın altına kalın bir kitap/plaka koyarak ve dizlerinizin üzerine dambıl yerleştirerek kolayca uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Makineye (veya sehpaya) oturun, ayak taraklarınızı basamağa yerleştirin ve üst pedi (veya dambılları) diz kapaklarınızın hemen üzerindeki uyluk kısmına sabitleyin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Topuklarınızı olabildiğince yukarı kaldırarak emniyet mandalını açın ve yavaşça topuklarınızı aşağı indirerek hareketi başlatın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Topuklarınızı en üst noktaya itip alt baldırınızdaki kasılmayı 1–2 saniye koruyun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          '2–3 saniyede topuklarınızı basamak hizasının altına indirip 1 saniye esnetin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yukarı iterken nefes verin, aşağı esnetirken nefes alın.'
      }
    ],
    cues: [
      'Diz 90 derece büküldüğünde üstteki Gastrocnemius kası gevşer ve yükün büyük kısmını alttaki Soleus kası üstlenir; bu nedenle hem ayakta hem oturarak baldır çalışmak birbirini tamamlar.',
      'Yavaş lif oranı yüksek olan Soleus kası, kontrollü yüksek tekrarlara (15–20 tekrar) çok iyi yanıt verir.'
    ],
    commonMistakes: [
      {
        mistake: 'Pedi tam diz kapağının üzerine koyup eklemi ezmek.',
        correction: 'Pedi veya dambılları diz kapağının 4–5 cm gerisindeki alt uyluk üzerine yerleştirin.'
      },
      {
        mistake: 'Yarım santimetrelik hızlı zıplatmalar yapmak.',
        correction: 'En alt esnemeden en üst sıkıştırmaya kadar tam açıklık kullanın.'
      },
      {
        mistake: 'Gövdeyle geriye sallanarak ağırlığı kaldırmaya çalışmak.',
        correction: 'Üst gövdenizi dik ve sabit tutun.'
      }
    ],
    programming: {
      beginner: '3 set × 15 tekrar',
      intermediate: '3–4 set × 15–20 tekrar (dipte ve tepede 1 sn duraksamalı)',
      note: 'Koşu ve yürüyüş dayanıklılığı ile ayak bileği stabilitesi için çok değerli bir tamamlayıcıdır.'
    },
    alternatives: {
      easier: 'standing-calf-raise',
      harder: 'standing-calf-raise',
      equipmentAlt: ['standing-calf-raise'],
      homeAlt: 'standing-calf-raise'
    },
    animation: {
      poseId: 'seated-calf-raise',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Dizleri 90 derece bükülü oturan sporcunun diz üzerindeki ağırlığa karşı topuklarını kaldırıp indirmesini gösteren animasyon.',
      startLabel: 'Oturarak Topuk Aşağıda',
      endLabel: 'Oturarak Parmak Ucu Yükseliş'
    },
    editorialSource: 'NSCA Baldır Kas Anatomisi ve Direnç Antrenmanı'
  },

  // =========================================================================
  // KALÇA (6 HAREKET)
  // =========================================================================
  {
    id: 'glute-bridge',
    slug: 'glute-bridge',
    trName: 'Yerde Kalça Köprüsü',
    enName: 'Glute Bridge',
    aliases: ['glute bridge', 'kalça köprüsü', 'köprü hareketi', 'evde kalça'],
    shortDescription:
      'Sırtüstü yerde yatarken dizler bükülü şekilde kalçayı yukarı kaldırıp sıkıştıran, bel üzerinde yük oluşturmadan kalça kaslarını aktive eden temel hareket.',
    primaryMuscleGroup: 'kalca',
    secondaryMuscleGroups: ['arka-bacak', 'karin-core'],
    primaryMuscles: ['Gluteus Maximus (Büyük Kalça Kası)'],
    secondaryMuscles: ['Hamstring (Arka Bacak)', 'Gluteus Medius'],
    stabilizerMuscles: ['Rectus Abdominis ve Transversus Abdominis (Pelvis Kontrolü)', 'Erector Spinae'],
    subRegionTag: 'Temel Kalça Aktivasyonu (Ekipmansız)',
    equipment: ['vucut-agirligi'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'kalca-mentesesi',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Mat üzerine sırtüstü uzanın, dizlerinizi bükün ve ayak tabanlarınızı kalçanızdan yaklaşık bir karış ileride, kalça genişliğinde yere basın. Kollarınızı yanlarınıza uzatın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Karın kaslarınızı hafifçe sıkıp bel boşluğunuzu dengeleyin. Topuklarınızla yeri iterek kalçanızı tavana doğru kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Dizlerinizden omuzlarınıza kadar düz bir köprü hattı oluştuğunda kalçanızı 1–2 saniye sıkın; belinizi aşırı yukarı kavisленdirmeyin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Kalçanızı kontrollü şekilde yere yaklaştırıp bir sonraki tekrara geçin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yukarı kaldırırken nefes verin, tepede 1–2 saniye sıkıştırın ve inerken nefes alın.'
      }
    ],
    cues: [
      'Arka bacağınızda kramp hissediyorsanız ayaklarınız kalçanızdan çok uzakta kalmış demektir; topuklarınızı kalçanıza biraz daha yaklaştırın.',
      'Tepe noktada hareketi belinizle değil, kalçanızı sıkarak tamamlayın.'
    ],
    commonMistakes: [
      {
        mistake: 'Tepe noktada kaburgaları havaya kaldırıp beli aşırı çukurlaştırmak.',
        correction: 'Karın kaslarınızı hafifçe sıkarak diz-kalça-omuz düz çizgisinde durun.'
      },
      {
        mistake: 'Ayakları kalçadan çok uzağa koyup yükü tamamen arka bacağa kaçırmak.',
        correction: 'Tepe noktada kaval kemikleriniz yere dik olacak şekilde ayak mesafesini ayarlayın.'
      },
      {
        mistake: 'Parmak uçlarından iterek topukları yerden kaldırmak.',
        correction: 'Topuklarınızı ve tüm ayak tabanınızı yere sağlam basın.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 tekrar (tepede 2 sn sıkıştırmalı)',
      intermediate: '3–4 set × 15–20 tekrar (veya tek bacak Glute Bridge)',
      note: 'Hem başlangıç seviyesi kalça antrenmanları hem de Squat/Deadlift öncesi kalça aktivasyonu için idealdir.'
    },
    alternatives: {
      harder: 'dumbbell-hip-thrust',
      equipmentAlt: ['dumbbell-hip-thrust', 'barbell-hip-thrust', 'cable-glute-kickback'],
      homeAlt: 'dumbbell-hip-thrust'
    },
    animation: {
      poseId: 'glute-bridge',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Sırtüstü dizleri bükülü yatan sporcunun topuklarıyla yeri iterek kalçasını köprü pozisyonuna kaldırıp sıkıştırmasını gösteren animasyon.',
      startLabel: 'Kalça Zeminde',
      endLabel: 'Tepe Köprü Sıkıştırma'
    },
    editorialSource: 'JOSPT & Bret Contreras Glute Aktivasyon Araştırmaları'
  },
  {
    id: 'barbell-hip-thrust',
    slug: 'barbell-hip-thrust',
    trName: 'Sehpada Halter Kalça İtişi',
    enName: 'Barbell Hip Thrust',
    aliases: ['hip thrust', 'barbell hip thrust', 'halter kalça itiş', 'sehpa kalça kaldırma'],
    shortDescription:
      'Üst sırtı bir sehpaya dayayıp kalça üzerine yerleştirilen halter barını yukarı iterek Gluteus Maximus kasında en yüksek tepe kasılmasını üreten temel kalça hareketi.',
    primaryMuscleGroup: 'kalca',
    secondaryMuscleGroups: ['arka-bacak', 'on-bacak', 'karin-core'],
    primaryMuscles: ['Gluteus Maximus (Üst ve Alt Lifler)', 'Gluteus Medius'],
    secondaryMuscles: ['Hamstring', 'Quadriceps', 'Adductor Magnus'],
    stabilizerMuscles: ['Rectus Abdominis ve Oblikler (Pelvik Tilt Kontrolü)', 'Erector Spinae'],
    subRegionTag: 'Maksimum Kalça Kuvveti & Hacmi',
    equipment: ['barbell', 'bench-sehpa'],
    environments: ['salon'],
    environmentNote: 'Kaymayan sabit bir sehpa (bench), halter barı ve kalça kemiğini korumak için bar süngeri (hip thrust pad) gerektirir.',
    level: 'orta',
    movementPattern: 'kalca-mentesesi',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Yere oturun, kürek kemiklerinizin alt ucunu sabit bir sehpanın kenarına dayayın. Koruyucu sünger takılı barı kalça katlanma çizginizin üzerine yuvarlayın ve ayaklarınızı omuz genişliğinde yere basın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Ellerinizle barı dengede tutun, çenenizi göğsünüze yakın (bakışlarınız karşıda) koruyun ve topuklarınızla yeri iterek kalçanızı yukarı kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Tepe noktada uyluklarınız yere paralel ve kaval kemikleriniz yere tam dik (90 derece) olmalı; kalçanızı 1–2 saniye sıkın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Göğüs kafesinizle leğen kemiğiniz arasındaki açıyı bozmadan kalçanızı kontrollü şekilde aşağı indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yukarı iterken nefes verin, tepede 1 saniye sıkıştırın ve 2 saniyede inerken nefes alın.'
      }
    ],
    cues: [
      'Bakışlarınızı tavana çevirip başınızı geriye atmayın; çenenizi içeride ve bakışlarınızı karşıda tutmak belin aşırı çukurlaşmasını önler ve kalça kasılmasını artırır.',
      'Tepe noktada kaval kemiğiniz yere dik (90 derece) olmalı; ayaklar çok yakınsa ön bacak, çok uzaksa arka bacak devreye girer.'
    ],
    commonMistakes: [
      {
        mistake: 'Başı geriye atıp tavana bakarak beli çukurlaştırmak.',
        correction: 'Çeneyi hafif içeride tutup göğüs kafesini aşağıda koruyarak sadece kalça ekleminden menteşe yapın.'
      },
      {
        mistake: 'Sehpanın geriye kayması nedeniyle formu bozmak.',
        correction: 'Sehpayı duvara dayayın veya arkasına ağır plakalar koyarak mutlaka sabitleyin.'
      },
      {
        mistake: 'Bar süngeri kullanmayıp kalça kemiğinde ağrı nedeniyle kısa tekrar yapmak.',
        correction: 'Kalın bir bar süngeri veya katlanmış mat kullanarak tam tepe kasılmasına odaklanın.'
      }
    ],
    programming: {
      beginner: 'Önce Glute Bridge ve Dumbbell Hip Thrust ile tekniği oturtun',
      intermediate: '3–4 set × 8–12 tekrar (tepede 1–2 sn duraksamalı)',
      note: 'Kalça tam açıldığında (üst noktada) en yüksek direnci sunduğu için Squat ve RDL hareketlerini mükemmel şekilde tamamlar.'
    },
    alternatives: {
      easier: 'dumbbell-hip-thrust',
      harder: 'romanian-deadlift',
      equipmentAlt: ['dumbbell-hip-thrust', 'glute-bridge', 'kettlebell-swing', 'step-up'],
      homeAlt: 'dumbbell-hip-thrust'
    },
    animation: {
      poseId: 'hip-thrust',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Üst sırtını sehpaya dayayan sporcunun kalçası üzerindeki halteri uyluklar yere paralel olana kadar yukarı itip indirmesini gösteren animasyon.',
      startLabel: 'Kalça Aşağıda (Sırt Sehpada)',
      endLabel: 'Tepe Masa Pozisyonu (90° Diz)'
    },
    editorialSource: 'Journal of Applied Biomechanics — Barbell Hip Thrust vs. Squat EMG Karşılaştırması'
  },
  {
    id: 'dumbbell-hip-thrust',
    slug: 'dumbbell-hip-thrust',
    trName: 'Sehpada Dambıl Kalça İtişi',
    enName: 'Dumbbell Hip Thrust',
    aliases: ['dumbbell hip thrust', 'dambıl kalça itiş', 'evde hip thrust'],
    shortDescription:
      'Halter kurulumuna gerek kalmadan kalça üzerine yerleştirilen bir dambıl ile sehpada uygulanan, kalça kaslarını pratik ve etkili şekilde çalıştıran hareket.',
    primaryMuscleGroup: 'kalca',
    secondaryMuscleGroups: ['arka-bacak', 'on-bacak', 'karin-core'],
    primaryMuscles: ['Gluteus Maximus', 'Gluteus Medius'],
    secondaryMuscles: ['Hamstring', 'Quadriceps'],
    stabilizerMuscles: ['Core Kasları'],
    subRegionTag: 'Pratik Sehpa Kalça İtişi (Dambıl)',
    equipment: ['dumbbell', 'bench-sehpa'],
    environments: ['ev', 'salon'],
    environmentNote: 'Evde sabit bir koltuk/yatak kenarına üst sırtı dayayarak ve kucakta bir dambıl tutarak kolayca uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'kalca-mentesesi',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Üst sırtınızı sabit bir sehpa veya koltuk kenarına dayayın, bir dambılı kalça katlanma çizginizin üzerine yerleştirip iki elinizle yanlarından tutun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Bakışlarınızı karşıda tutarak topuklarınızla yeri itin ve kalçanızı yukarı kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Dizleriniz 90 derece açıda ve gövdeniz yere paralel olduğunda kalçanızı 1–2 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Kalçanızı kontrollü biçimde aşağı indirip yeni tekrara başlayın.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yukarı kaldırırken nefes verin, 2 saniyede inerken nefes alın.'
      }
    ],
    cues: [
      'Dambılın kalça kemiğinizi rahatsız etmemesi için altına katlanmış küçük bir havlu veya mat koyabilirsiniz.',
      'Evdeki dambıl ağırlığınız zamanla hafif gelirse hareketi tek bacak üzerinde (Single-leg Hip Thrust) uygulayarak zorluk seviyesini artırabilirsiniz.'
    ],
    commonMistakes: [
      {
        mistake: 'Boynu geriye yatırıp belden bükülmek.',
        correction: 'Çeneyi göğse yakın tutup bakışları karşıdaki bir noktaya sabitleyin.'
      },
      {
        mistake: 'Tepe noktada kalçayı tam açmadan yarım kalkmak.',
        correction: 'Kalçanın en çok çalıştığı son 20 derecelik tam açılma ve sıkıştırma kısmını eksiksiz tamamlayın.'
      },
      {
        mistake: 'Ayakları çok yakına veya çok uzağa koymak.',
        correction: 'Tepe noktada kaval kemiğiniz yere tam dik olacak ayak mesafesini koruyun.'
      }
    ],
    programming: {
      beginner: '3 set × 10–15 tekrar',
      intermediate: '3–4 set × 12–15 tekrar (tepede 2 sn duraksamalı)',
      note: 'Halter kurulumu gerektirmeden hızlı geçiş yapılan antrenmanlar ve ev ortamı için çok uygundur.'
    },
    alternatives: {
      easier: 'glute-bridge',
      harder: 'barbell-hip-thrust',
      equipmentAlt: ['barbell-hip-thrust', 'glute-bridge', 'step-up', 'cable-glute-kickback'],
      homeAlt: 'glute-bridge'
    },
    animation: {
      poseId: 'hip-thrust',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Üst sırtı sehpada olan sporcunun kalçası üzerindeki dambılı yukarı itip kalçasını sıkıştırmasını gösteren animasyon.',
      startLabel: 'Kalça Aşağıda (Dambıl Kucakta)',
      endLabel: 'Tepe Kalça Sıkıştırma'
    },
    editorialSource: 'NSCA & ACSM Alt Vücut Egzersiz Rehberi'
  },
  {
    id: 'step-up',
    slug: 'step-up',
    trName: 'Yükseltiye Adım Çıkışı (Step-up)',
    enName: 'Step-up',
    aliases: ['step up', 'kutuya çıkış', 'sehpa adım', 'dambıl step up'],
    shortDescription:
      'Bir ayağı sehpa veya kutu üzerine yerleştirip sadece o bacaktan güç alarak yukarı çıkılan, kalça, ön bacak ve tek ayak pelvis dengesini geliştiren işlevsel hareket.',
    primaryMuscleGroup: 'kalca',
    secondaryMuscleGroups: ['on-bacak', 'arka-bacak', 'baldir', 'karin-core'],
    primaryMuscles: ['Gluteus Maximus (Kalça)', 'Gluteus Medius (Pelvis Sabitleyici)', 'Quadriceps Femoris (Ön Bacak)'],
    secondaryMuscles: ['Hamstring', 'Gastrocnemius & Soleus'],
    stabilizerMuscles: ['Core Kasları', 'Ayak Bileği Dengeleyicileri'],
    subRegionTag: 'Tek Bacak Kalça, Ön Bacak & Denge',
    equipment: ['bench-sehpa', 'dumbbell', 'vucut-agirligi'],
    environments: ['ev', 'salon'],
    environmentNote: 'Evde sağlam bir basamak/kutu üzerinde vücut ağırlığı veya dambıl ile, salonda plyo box veya bench üzerinde uygulanır.',
    level: 'baslangic',
    movementPattern: 'squat',
    mechanic: 'bilesik',
    laterality: 'tek-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Diz hizanızda (veya biraz daha alçak) sağlam bir kutu/sehpa önünde durun. Sağ ayağınızın tamamını kutunun üzerine yerleştirin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Gövdenizi hafifçe öne eğerek ağırlığınızı kutudaki sağ topuğunuza aktarın ve yerdeki sol ayağınızla zıplamadan, sadece sağ bacağınızla kutuyu iterek yukarı çıkın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kutunun üzerinde sağ bacağınız ve kalçanız tamamen dikleştiğinde dengenizi sağlayın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Kendinizi bir anda aşağı bırakmadan, sağ kalça ve bacağınızın kontrolüyle 2–3 saniyede yavaşça yere geri inin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yukarı çıkarken nefes verin, kontrollü inerken nefes alın.'
      }
    ],
    cues: [
      'En önemli nokta: Yerdeki ayağınızın parmak ucunu havaya kaldırın (sadece topuğunuz yerde değsin); bu küçük hile yerdeki bacakla yaylanıp zıplamanızı engeller ve tüm işi üstteki kalçaya yaptırır.',
      'İniş fazını yavaş yapmak diz kontrolünü ve kas gelişimini çok artırır.'
    ],
    commonMistakes: [
      {
        mistake: 'Yerdeki arka ayakla yaylanıp zıplayarak kutuya çıkmak.',
        correction: 'Gövdeyi hafif öne eğip ağırlığı üstteki ayağa verin ve yerdeki bacakla itiş yapmayın.'
      },
      {
        mistake: 'Ayağın sadece yarısını kutuya basıp topuğu dışarıda bırakmak.',
        correction: 'Tüm ayak tabanınızı kutunun üzerine tam ve güvenli şekilde yerleştirin.'
      },
      {
        mistake: 'Çıkış ve iniş sırasında üstteki dizin içe çökmesi.',
        correction: 'Dizinizi ayak orta parmağınızla aynı hizada dışa doğru dengeli tutun.'
      }
    ],
    programming: {
      beginner: '3 set × her bacak için 8–10 tekrar (ekipmansız)',
      intermediate: '3–4 set × her bacak için 10–12 tekrar (dambıl ile)',
      note: 'Günlük yaşam kuvveti, merdiven/yokuş performansı ve kalça stabilitesi için en işlevsel egzersizlerden biridir.'
    },
    alternatives: {
      easier: 'glute-bridge',
      harder: 'bulgarian-split-squat',
      equipmentAlt: ['reverse-lunge', 'bulgarian-split-squat', 'dumbbell-hip-thrust'],
      homeAlt: 'reverse-lunge'
    },
    animation: {
      poseId: 'step-up',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Bir ayağını kutu üzerine yerleştiren sporcunun üstteki bacak ve kalça kuvvetiyle kutunun üzerine çıkıp kontrollü inmesini gösteren animasyon.',
      startLabel: 'Bir Ayak Kutuda Hazırlık',
      endLabel: 'Kutu Üzerinde Tam Doğrulma'
    },
    editorialSource: 'Journal of Sports Science & Medicine — Step-up Kalça EMG Analizi'
  },
  {
    id: 'cable-glute-kickback',
    slug: 'cable-glute-kickback',
    trName: 'Kablo ile Geriye Kalça İtişi',
    enName: 'Cable Glute Kickback',
    aliases: ['glute kickback', 'cable kickback', 'kablo arka kalça', 'ayak bileği kayışı kalça'],
    shortDescription:
      'Alt makaraya takılan ayak bileği kayışıyla bacağı geriye doğru uzatarak kalça kaslarını (Gluteus Maximus ve Medius) bel yükü olmadan izole eden hareket.',
    primaryMuscleGroup: 'kalca',
    secondaryMuscleGroups: ['arka-bacak', 'karin-core'],
    primaryMuscles: ['Gluteus Maximus (Kalça)', 'Gluteus Medius (Hafif Dış Açılı İtişte)'],
    secondaryMuscles: ['Hamstring'],
    stabilizerMuscles: ['Destek Bacağı Kalça Kasları', 'Core ve Bel Sabitleyicileri'],
    subRegionTag: 'Saf Kalça İzolasyonu (Kablo)',
    equipment: ['kablo-makinesi'],
    environments: ['salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'tek-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Alt makaraya ayak bileği kayışını (ankle strap) takıp bir bileğinize sabitleyin. Makineye dönük durun, gövdenizi kalçadan yaklaşık 30–45 derece öne eğip makine gövdesinden tutunun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Karın kaslarınızı sıkarak belinizi sabit tutun. Çalışan bacağınızı diziniz çok hafif bükülü şekilde geriye (veya yan kalça odağı için 20–30 derece çapraz geriye) doğru itin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Beliniz çukurlaşmadan bacağınızın kalça ekleminden geriye gidebildiği son noktada kalçanızı 1 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Bacağınızı kontrollü biçimde destek ayağınızın hizasına (veya hafif önüne) kadar geri getirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Geriye iterken nefes verin, kontrollü dönerken nefes alın.'
      }
    ],
    cues: [
      'Kalça ekleminin saf geriye açılma (ekstansiyon) açısı sınırlıdır; bacağınızı çok yukarı kaldırmaya çalışırsanız hareket kalçadan çıkıp belinizin bükülmesine dönüşür.',
      'Yerde duran destek bacağınızın dizini hafif bükülü tutun.'
    ],
    commonMistakes: [
      {
        mistake: 'Bacağı çok yukarı savurup her tekrarda beli çukurlaştırmak.',
        correction: 'Karın kaslarınızı kilitleyin ve sadece beliniz sabit kalırken gidebildiğiniz mesafeye kadar itin.'
      },
      {
        mistake: 'Ağır plaka seçip gövdeyi ileri-geri sallayarak ivme kullanmak.',
        correction: 'Hafif-orta bir ağırlık seçip tepe noktada 1 saniye durabileceğiniz bir kontrolle çalışın.'
      },
      {
        mistake: 'Dizi büküp açarak hareketi arka bacak (leg curl) hareketine çevirmek.',
        correction: 'Diz açısını sabit tutun ve hareketi kalça ekleminden başlatın.'
      }
    ],
    programming: {
      beginner: '3 set × her bacak için 12–15 tekrar',
      intermediate: '3–4 set × her bacak için 12–20 tekrar',
      note: 'Ağır bileşik bacak hareketlerinden sonra kalçayı yormadan tamamlamak için harika bir bitiriş egzersizidir.'
    },
    alternatives: {
      easier: 'glute-bridge',
      harder: 'dumbbell-hip-thrust',
      equipmentAlt: ['glute-bridge', 'dumbbell-hip-thrust', 'bird-dog'],
      homeAlt: 'glute-bridge'
    },
    animation: {
      poseId: 'glute-kickback',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Kablo istasyonundan tutunarak öne eğilen sporcunun bileğindeki kabloyu kalçadan geriye doğru itip sıkıştırmasını gösteren animasyon.',
      startLabel: 'Ayak Önde Başlangıç',
      endLabel: 'Bacak Geride (Kalça Sıkışık)'
    },
    editorialSource: 'ACE & Bret Contreras Kalça İzolasyon Rehberi'
  },
  {
    id: 'kettlebell-swing',
    slug: 'kettlebell-swing',
    trName: 'Kettlebell Savurma (Swing)',
    enName: 'Kettlebell Swing',
    aliases: ['kettlebell swing', 'kb swing', 'girya savurma', 'patlayıcı kalça menteşesi'],
    shortDescription:
      'Kollarla kaldırmak yerine patlayıcı kalça menteşesi (hip hinge) kuvvetiyle kettlebell’i göğüs hizasına savuran, kalça, arka bacak ve kardiyovasküler gücü geliştiren dinamik hareket.',
    primaryMuscleGroup: 'kalca',
    secondaryMuscleGroups: ['arka-bacak', 'karin-core', 'sirt', 'on-kol'],
    primaryMuscles: ['Gluteus Maximus (Patlayıcı Kalça Açma)', 'Hamstring (Arka Bacak)'],
    secondaryMuscles: ['Erector Spinae', 'Rectus Abdominis ve Oblikler', 'Latissimus Dorsi'],
    stabilizerMuscles: ['Omuz Kuşağı', 'Ön Kol Kavrama Kasları'],
    subRegionTag: 'Patlayıcı Kalça Menteşesi & Arka Zincir Gücü',
    equipment: ['kettlebell'],
    environments: ['salon', 'ev'],
    environmentNote: 'Önünüzde ve arkanızda en az 1.5–2 metre boş alan bulunan güvenli bir zeminde uygulanmalıdır.',
    level: 'orta',
    movementPattern: 'kalca-mentesesi',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızı omuz genişliğinden biraz açık yerleştirin; kettlebell ayak uçlarınızın yaklaşık 30 cm önünde yerde dursun. Kalçanızı geriye menteşe yaparak eğilin, sırtınızı düz tutun ve kulpu iki elinizle kavrayın.'
      },
      {
        title: 'Hareketin Uygulanışı (Geriye Çekiş ve Patlama)',
        detail:
          'Kettlebell’i bacaklarınızın arasından (kalçanızın hemen altından) Amerikan futbolu pası verir gibi geriye çekin, ardından kalçanızı ve dizlerinizi patlayıcı şekilde ileri-dik konuma kilitleyerek ağırlığı ileri savurun.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kettlebell kalça patlamasının ivmesiyle göğüs/omuz hizasına yükseldiğinde vücudunuz ayakta dimdik bir plank gibi (kalça, uyluk ve karın sıkı) durmalıdır.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ağırlık aşağı inerken erken eğilmeyin; kollarınız gövdenize yaklaşana kadar dik bekleyin, son anda kalçanızı tekrar geriye menteşe yaparak ağırlığı bacaklarınızın arasına yönlendirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Geriye menteşede burundan keskin nefes alın, kalçayı patlatırken güçlüce nefes verin.'
      }
    ],
    cues: [
      'Bu bir ön omuz kaldırışı (Front Raise) veya squat DEĞİLDİR! Kollarınız sadece birer halat gibidir; tüm kuvveti kalçanızın geriye gidip ileri şaklamasından üretin.',
      'Kettlebell’i baş üstüne (Amerikan Swing) çıkarmak yerine göğüs/göz hizasında (Rus Swing) tutmak omuz ve bel güvenliği için çok daha uygundur.'
    ],
    commonMistakes: [
      {
        mistake: 'Kalçayı geriye itmek yerine dizleri çok büküp yukarı-aşağı squat yapmak.',
        correction: 'Kaval kemiklerinizi yere dikeye yakın tutun ve kalçanızı yatay olarak geriye-ileri çalıştırın.'
      },
      {
        mistake: 'Ağırlığı omuz ve kol kaslarıyla yukarı kaldırmaya çalışmak.',
        correction: 'Kollarınızı gevşek bir sarkaç ipi gibi bırakın; ağırlığı kalçanızın ileri itişi uçursun.'
      },
      {
        mistake: 'Tepe noktada beli geriye doğru bükerek durmak.',
        correction: 'Tepe noktada kaburgaları aşağıda, karın ve kalçayı sıkı tutarak tam dik bir çizgide durun.'
      }
    ],
    programming: {
      beginner: 'Önce Dumbbell Romanian Deadlift ile kalça menteşesi tekniğini öğrenin',
      intermediate: '3–4 set × 12–15 ritmik tekrar',
      note: 'Hem patlayıcı arka zincir kuvveti hem de yüksek nabızlı kondisyon için eşsiz bir egzersizdir.'
    },
    alternatives: {
      easier: 'dumbbell-romanian-deadlift',
      harder: 'romanian-deadlift',
      equipmentAlt: ['romanian-deadlift', 'dumbbell-romanian-deadlift', 'barbell-hip-thrust'],
      homeAlt: 'dumbbell-romanian-deadlift'
    },
    animation: {
      poseId: 'kettlebell-swing',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Kalça menteşesiyle bacaklarının arasına aldığı kettlebell’i patlayıcı kalça açışıyla göğüs hizasına savuran sporcuyu gösteren animasyon.',
      startLabel: 'Bacak Arası Menteşe (Hinge)',
      endLabel: 'Göğüs Hizası Tam Dik Kilit'
    },
    editorialSource: 'JSCR Kettlebell Swing Biyomekaniği & SFG Standartları'
  },

  // =========================================================================
  // KARIN VE CORE (8 HAREKET)
  // =========================================================================
  {
    id: 'plank',
    slug: 'plank',
    trName: 'Ön Kol Plank Duruşu',
    enName: 'Plank',
    aliases: ['plank', 'dirsek plank', 'karın duruşu', 'core hareketi', 'izometrik karın'],
    shortDescription:
      'Ön kollar ve ayak parmak uçları üzerinde vücudu düz bir hat halinde sabit tutarak derin karın, yan karın, kalça ve omuz kuşağı kaslarını izometrik olarak güçlendiren temel core hareketi.',
    primaryMuscleGroup: 'karin-core',
    secondaryMuscleGroups: ['omuz', 'kalca'],
    primaryMuscles: ['Rectus Abdominis (Ön Karın)', 'Transversus Abdominis (Derin Korse Kası)'],
    secondaryMuscles: ['İç ve Dış Oblikler (Yan Karın)', 'Gluteus Maximus (Kalça)', 'Serratus Anterior'],
    stabilizerMuscles: ['Ön Omuz ve Rotator Manşet', 'Quadriceps (Diz Kilidi)'],
    subRegionTag: 'Temel Anti-Ekstansiyon Core Stabilitesi',
    equipment: ['vucut-agirligi'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'core',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    featured: true,
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Mat üzerinde yüzüstü uzanın, dirseklerinizi tam omuzlarınızın altına yerleştirin ve ön kollarınızı yere paralel basın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Ayak parmak uçlarınızı yere takıp dizlerinizi yerden kaldırın; başınızdan topuklarınıza kadar düz bir çizgi oluşturun.'
      },
      {
        title: 'Hareketin Son Pozisyonu (Aktif Tutuş)',
        detail:
          'Kalçanızı sıkın, göbek deliğinizi hafifçe içeri çekin ve dirseklerinizi ayak uçlarınıza doğru çekiyormuş gibi yeri kavrayarak tüm gövdenizi aktif tutun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Belirlediğiniz süre dolduğunda veya belinizin çukurlaşmaya başladığını hissettiğiniz anda dizlerinizi kontrollüce yere koyarak dinlenin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Süre boyunca nefesinizi asla tutmayın! Karın gerginliğini bozmadan burundan alıp ağızdan kontrollü nefes alıp vermeyi sürdürün.'
      }
    ],
    cues: [
      'Dakikalarca belinizi sarkıtarak pasif beklemek yerine, kalça ve karnınızı tüm gücünüzle sıkarak 20–40 saniyelik aktif (RKC tarzı) plank yapmak çok daha etkilidir.',
      'Omuzlarınızın üzerine çökmeyin; ön kollarınızla yeri aktif olarak itin.'
    ],
    commonMistakes: [
      {
        mistake: 'Yoruldukça belin aşağı çökmesine izin verip bel omurlarına yük bindirmek.',
        correction: 'Kalçanızı sıkıp leğen kemiğinizi hafifçe kendinize doğru toplayın (posterior pelvik tilt); bel çöküyorsa seti bitirin.'
      },
      {
        mistake: 'Kalçayı çadır gibi çok yukarı kaldırıp yükü karından kaçırmak.',
        correction: 'Omuz, kalça ve ayak bileklerinizi aynı düz çizgide hizalayın.'
      },
      {
        mistake: 'Nefesi tamamen tutup yüzü kızartmak.',
        correction: 'Karın duvarını sıkı tutarken kısa ve düzenli diyafram nefesleri alın.'
      }
    ],
    programming: {
      isIsometric: true,
      beginner: '3 set × 20–30 saniye aktif tutuş',
      intermediate: '3–4 set × 40–60 saniye aktif tutuş',
      note: 'Statik (izometrik) bir hareket olduğu için tekrar sayısı yerine saniye cinsinden süre ile uygulanır.'
    },
    alternatives: {
      easier: 'dead-bug',
      harder: 'side-plank',
      equipmentAlt: ['dead-bug', 'bird-dog', 'pallof-press', 'side-plank'],
      homeAlt: 'dead-bug'
    },
    animation: {
      poseId: 'plank',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ön kolları ve ayak parmak uçları üzerinde baştan topuğa düz ve aktif bir gövde hattı koruyan sporcuyu gösteren animasyon.',
      startLabel: 'Hazırlık',
      endLabel: 'Aktif İzometrik Plank Hattı'
    },
    editorialSource: 'Dr. Stuart McGill Omurga Stabilitesi & ACSM Core Rehberi'
  },
  {
    id: 'side-plank',
    slug: 'side-plank',
    trName: 'Yan Plank Duruşu',
    enName: 'Side Plank',
    aliases: ['side plank', 'yan plank', 'oblik plank', 'yan karın duruşu'],
    shortDescription:
      'Tek ön kol üzerinde yan durarak gövdenin yana çökmesine direnen, yan karın (oblikler), derin bel sabitleyicileri (Quadratus Lumborum) ve yan kalça kaslarını çalıştıran izometrik hareket.',
    primaryMuscleGroup: 'karin-core',
    secondaryMuscleGroups: ['kalca', 'omuz'],
    primaryMuscles: ['İç ve Dış Oblikler (Yan Karın)', 'Quadratus Lumborum (Derin Yan Gövde Sabitleyici)'],
    secondaryMuscles: ['Transversus Abdominis', 'Gluteus Medius (Alttaki Yan Kalça)'],
    stabilizerMuscles: ['Alt Omuz Kuşağı ve Rotator Manşet'],
    subRegionTag: 'Yan Karın (Oblik) & Omurga Yanal Destek',
    equipment: ['vucut-agirligi'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'core',
    mechanic: 'izolasyon',
    laterality: 'tek-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Sağ yanınıza uzanın, sağ dirseğinizi tam sağ omuzunuzun altına yerleştirin. Bacaklarınızı düz uzatıp sol ayağınızı sağ ayağınızın üstüne (veya daha iyi denge için hemen önüne) koyun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Alt yan karın ve kalça kaslarınızı sıkarak kalçanızı yerden kaldırın; başınız, omurganız ve bacaklarınız düz bir çizgi oluştursun.'
      },
      {
        title: 'Hareketin Son Pozisyonu (Aktif Tutuş)',
        detail:
          'Kalçanızın yere doğru sarkmasına veya gövdenizin öne devrilmesine izin vermeden belirlenen süre boyunca sabit kalın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Süre sonunda kalçanızı yavaşça yere indirip diğer tarafa geçin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Tutuş boyunca düzenli nefes alıp verin. Zorlanırsanız alttaki dizinizi 90 derece bükerek yerde destek bırakabilirsiniz.'
      }
    ],
    cues: [
      'Dirseğiniz omuzunuzun tam altında olmalı; dirsek çok ileride kalırsa omuz ekleminiz yorulur.',
      'Başlangıçta tam bacak uzatmak zor gelirse alttaki dizinizi büküp diz-dirsek arasında kısa Side Plank yapabilirsiniz.'
    ],
    commonMistakes: [
      {
        mistake: 'Süre ilerledikçe kalçanın yere doğru sarkması.',
        correction: 'Alttaki yan belinizi ve kalçanızı tavana doğru iterek düz çizgiyi koruyun.'
      },
      {
        mistake: 'Üstteki omuzun ve gövdenin yere doğru öne dönmesi.',
        correction: 'Sırtınız hayali bir duvara yaslıymış gibi göğsünüzü ve kalçanızı tam karşıya açık tutun.'
      },
      {
        mistake: 'Alt omuzun kulağa doğru çökmesi.',
        correction: 'Ön kolunuzla yeri güçlüce iterek omuzunuzu kulağınızdan uzak tutun.'
      }
    ],
    programming: {
      isIsometric: true,
      beginner: '3 set × her taraf için 15–25 saniye (gerekirse diz destekli)',
      intermediate: '3 set × her taraf için 30–45 saniye',
      note: 'Dr. Stuart McGill’in bel sağlığını destekleyen "Big 3" temel core egzersizlerinden biridir.'
    },
    alternatives: {
      easier: 'plank',
      harder: 'pallof-press',
      equipmentAlt: ['pallof-press', 'farmers-carry', 'plank'],
      homeAlt: 'plank'
    },
    animation: {
      poseId: 'side-plank',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Tek ön kol ve ayak kenarı üzerinde yan durarak kalçasını yüksek ve düz bir hatta sabit tutan sporcuyu gösteren animasyon.',
      startLabel: 'Yan Hazırlık',
      endLabel: 'Aktif Yan Plank Hattı'
    },
    editorialSource: 'McGill "Big 3" Core Stabilizasyon Protokolü'
  },
  {
    id: 'dead-bug',
    slug: 'dead-bug',
    trName: 'Sırtüstü Çapraz Kol-Bacak Uzatma (Dead Bug)',
    enName: 'Dead Bug',
    aliases: ['dead bug', 'deadbug', 'sırtüstü core', 'bel dostu karın hareketi'],
    shortDescription:
      'Sırtüstü yatarken beli yere sabitleyip çapraz kol ve bacağı kontrollü şekilde uzatan, omurgayı hiç bükmeden derin karın kaslarını ve koordinasyonu çalıştıran güvenli hareket.',
    primaryMuscleGroup: 'karin-core',
    secondaryMuscleGroups: ['kalca'],
    primaryMuscles: ['Transversus Abdominis (Derin Korse Kası)', 'Rectus Abdominis (Ön Karın)'],
    secondaryMuscles: ['Oblikler', 'İliopsoas ve Rectus Femoris (Kalça Fleksörleri)'],
    stabilizerMuscles: ['Omuz Kuşağı', 'Pelvik Taban ve Diyafram'],
    subRegionTag: 'Derin Core & Bel Koruma Kontrolü',
    equipment: ['vucut-agirligi'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'core',
    mechanic: 'izolasyon',
    laterality: 'tek-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Mat üzerine sırtüstü uzanın. Kollarınızı tavana doğru dik uzatın, kalça ve dizlerinizi 90 derece bükerek masa (tabletop) pozisyonuna kaldırın. Karın kaslarınızı sıkarak bel boşluğunuzu yere tam bastırın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Belinizin yerle temasını milim bile kaybetmeden, sağ kolunuzu başınızın gerisine ve eşzamanlı olarak sol bacağınızı ileri doğru yavaşça uzatın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kolunuz ve bacağınız yere birkaç santimetre yaklaştığında 1 saniye duraksayın; kaburgalarınızın yukarı kalkmasına izin vermeyin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Karın kontrolünüzle kol ve bacağınızı başlangıçtaki masa pozisyonuna geri çekip diğer çapraz tarafa (sol kol – sağ bacak) geçin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Kol ve bacağı uzatırken 3 saniyede yavaşça nefes vererek kaburgalarınızı aşağı bastırın, merkeze dönerken nefes alın.'
      }
    ],
    cues: [
      'Altın kural: Belinizin altında bir kağıt varmış ve kimsenin o kağıdı çekip alamaması gerekiyormuş gibi belinizi yere bastırın.',
      'Bacağınızı tam uzattığınızda beliniz yerden kalkıyorsa, bacağınızı yere paralel değil biraz daha yukarı (45 derece) açıyla uzatarak başlayın.'
    ],
    commonMistakes: [
      {
        mistake: 'Bacak uzandığında belin yerden kalkıp çukurlaşması.',
        correction: 'Hareket açıklığını küçültün; belinizin yerde kaldığı açıya kadar bacağınızı uzatın.'
      },
      {
        mistake: 'Kolları ve bacakları hızlıca sallayarak ritmik ama kontrolsüz yapmak.',
        correction: 'Her uzatmayı 2–3 saniyede yavaşlatarak derin karın kaslarını çalıştırın.'
      },
      {
        mistake: 'Sabit kalan dizin göğse doğru çekilmesi.',
        correction: 'Sabit kalan bacağın dizini kalçanın tam üzerinde (90 derecede) koruyun.'
      }
    ],
    programming: {
      beginner: '3 set × her taraf için 6–8 yavaş tekrar (toplam 12–16)',
      intermediate: '3 set × her taraf için 10–12 tekrar',
      note: 'Boyun ve bel ağrısı çekmeden karın kaslarını güvenli şekilde güçlendirmek için en iyi başlangıç egzersizlerinden biridir.'
    },
    alternatives: {
      easier: 'bird-dog',
      harder: 'reverse-crunch',
      equipmentAlt: ['plank', 'bird-dog', 'reverse-crunch'],
      homeAlt: 'bird-dog'
    },
    animation: {
      poseId: 'dead-bug',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Sırtüstü masa pozisyonunda yatan sporcunun belini yerden ayırmadan çapraz kol ve bacağını yere paralel uzatıp merkeze çekmesini gösteren animasyon.',
      startLabel: 'Masa Pozisyonu (Dizler 90°)',
      endLabel: 'Çapraz Kol-Bacak Uzatma'
    },
    editorialSource: 'JOSPT & Fizyoterapi Core Motor Kontrol Kılavuzları'
  },
  {
    id: 'bird-dog',
    slug: 'bird-dog',
    trName: 'Dört Ayak Üzerinde Çapraz Uzatma (Bird Dog)',
    enName: 'Bird Dog',
    aliases: ['bird dog', 'birddog', 'dört ayak çapraz uzatma', 'bel güçlendirme hareketi'],
    shortDescription:
      'Eller ve dizler üzerinde dururken omurgayı sabit tutup çapraz kol ve bacağı uzatan, derin sırt, kalça ve karın sabitleyicilerini eklem dostu şekilde çalıştıran hareket.',
    primaryMuscleGroup: 'karin-core',
    secondaryMuscleGroups: ['sirt', 'kalca', 'omuz'],
    primaryMuscles: ['Erector Spinae ve Multifidus (Derin Omurga Sabitleyicileri)', 'Transversus Abdominis ve Oblikler'],
    secondaryMuscles: ['Gluteus Maximus (Kalça)', 'Ön ve Arka Omuz'],
    stabilizerMuscles: ['Kürek Kemiği ve Pelvis Sabitleyicileri'],
    subRegionTag: 'Omurga Dengesi, Bel Sağlığı & Anti-Rotasyon',
    equipment: ['vucut-agirligi'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'core',
    mechanic: 'izolasyon',
    laterality: 'tek-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Mat üzerinde elleriniz tam omuzlarınızın altında, dizleriniz tam kalçalarınızın altında olacak şekilde dört ayak pozisyonu alın. Sırtınızı düz bir masa gibi nötr tutun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Gövdenizi sağa-sola yatırmadan ve belinizi çukurlaştırmadan sağ kolunuzu ileri, sol bacağınızı ise geriye doğru düz bir hat halinde uzatın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kolunuz ve bacağınız gövdenizle aynı yatay çizgiye geldiğinde (daha yukarı kaldırıp beli bükmeden) kalçanızı sıkarak 1–2 saniye bekleyin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Kontrollü biçimde başlangıç pozisyonuna dönüp diğer çapraz tarafa (sol kol – sağ bacak) geçin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Uzatırken nefes verin, uç noktada 1–2 saniye duraksayın ve dönerken nefes alın.'
      }
    ],
    cues: [
      'Bacağınızı tavana doğru yükseğe savurmaya çalışmayın; topuğunuzla arkanızdaki duvarı geriye doğru itiyormuş gibi yatay uzatın.',
      'Sırtınızın üzerinde bir bardak su varmış ve onu dökmemeniz gerekiyormuş gibi leğen kemiğinizi sabit tutun.'
    ],
    commonMistakes: [
      {
        mistake: 'Bacağı kalça hizasının çok üstüne kaldırıp beli aşırı çukurlaştırmak.',
        correction: 'Bacağı sadece gövdeyle düz bir çizgi oluşturacak yüksekliğe kadar kaldırın.'
      },
      {
        mistake: 'Kalkan bacak tarafındaki kalçayı dışa doğru devirmek (pelvis rotasyonu).',
        correction: 'Her iki kalça kemiğinizin de yere paralel bakmasını sağlayın.'
      },
      {
        mistake: 'Başı yukarı kaldırıp boynu kasmak.',
        correction: 'Bakışlarınızı ellerinizin arasındaki zeminde tutarak enseyi uzun koruyun.'
      }
    ],
    programming: {
      beginner: '3 set × her taraf için 8–10 tekrar (uçta 2 sn beklemeli)',
      intermediate: '3 set × her taraf için 10–12 tekrar',
      note: 'Dr. Stuart McGill’in bel sağlığı için önerdiği temel egzersizlerden biridir; her antrenman öncesi ısınmaya da eklenebilir.'
    },
    alternatives: {
      easier: 'dead-bug',
      harder: 'plank',
      equipmentAlt: ['dead-bug', 'plank', 'glute-bridge'],
      homeAlt: 'dead-bug'
    },
    animation: {
      poseId: 'bird-dog',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Dört ayak üzerinde nötr omurgayla duran sporcunun çapraz kolunu ileri, bacağını geriye yatay bir hat halinde uzatmasını gösteren animasyon.',
      startLabel: 'Dört Ayak Nötr Duruş',
      endLabel: 'Çapraz Yatay Uzatma'
    },
    editorialSource: 'McGill Spine Biomechanics & ACSM Egzersiz Rehberi'
  },
  {
    id: 'reverse-crunch',
    slug: 'reverse-crunch',
    trName: 'Yatarak Ters Karın Sıkıştırma (Reverse Crunch)',
    enName: 'Reverse Crunch',
    aliases: ['reverse crunch', 'ters mekik', 'alt karın sıkıştırma', 'pelvik tilt crunch'],
    shortDescription:
      'Bacakları sallamak yerine leğen kemiğini yerden kaldırıp göğüs kafesine doğru yuvarlayarak ön karın kaslarını (özellikle alt-orta lifleri) çalıştıran hareket.',
    primaryMuscleGroup: 'karin-core',
    secondaryMuscleGroups: [],
    primaryMuscles: ['Rectus Abdominis (Ön Karın Kasının Tamamı — Alt Kısım Vurgulu)'],
    secondaryMuscles: ['İç ve Dış Oblikler', 'Transversus Abdominis'],
    stabilizerMuscles: ['Üst Gövde ve Kollar (Zemin/Sehpa Tutuşu)'],
    subRegionTag: 'Ön Karın & Pelvik Yuvarlama',
    equipment: ['vucut-agirligi', 'bench-sehpa'],
    environments: ['ev', 'salon'],
    environmentNote: 'Evde mat üzerinde elleri yerde sabitleyerek veya salonda sehpa üzerinde başın arkasından sehpayı tutarak uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'core',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Sırtüstü uzanın, ellerinizi yanlarınızda yere basın (veya başınızın arkasındaki sabit bir sehpa kenarını tutun). Dizlerinizi 90 derece bükerek bacaklarınızı masa pozisyonuna kaldırın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Karın kaslarınızı büzerek dizlerinizi göğsünüze doğru çekerken kuyruk sokumunuzu ve kalçanızı yerden birkaç santimetre yukarı yuvarlayın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Leğen kemiğiniz göğüs kafesinize yaklaştığında karın kaslarınızı 1 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Omurlarınızı tek tek yere geri yerleştirerek bacaklarınızı 2–3 saniyede başlangıçtaki 90 derece masa pozisyonuna indirin; belinizin yerden kalkmasına izin vermeyin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Dizleri göğse yuvarlarken nefes verin, kontrollü indirirken nefes alın.'
      }
    ],
    cues: [
      'Sadece bacakları ileri-geri sallamak karın kaslarını değil kalça bükücüleri (psoas) çalıştırır; karın kasının çalışması için kuyruk sokumunuzun yerden yukarı kıvrılması gerekir.',
      'İnişte ayaklarınızı yere kadar indirip belinizi çukurlaştırmayın; kalçalar 90 dereceye geldiğinde durup yeni tekrara başlayın.'
    ],
    commonMistakes: [
      {
        mistake: 'Kalçayı yerden hiç yuvarlamadan sadece bacakları indirip kaldırmak.',
        correction: 'Leğen kemiğinizi göğüs kafesinize doğru kıvırmaya odaklanın.'
      },
      {
        mistake: 'Hızlı ivmeyle bacakları başın üstüne savurup boyna yük bindirmek.',
        correction: 'Hareketi yavaş yapın ve sadece alt sırt/kalça kısmını yerden kaldırın; kürek kemikleriniz yerde kalsın.'
      },
      {
        mistake: 'İniş sonunda belin yerden kalkıp aşırı çukurlaşması.',
        correction: 'Belinizi yere bastırarak kontrolü koruyabileceğiniz açıya kadar bacakları indirin.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 kontrollü tekrar',
      intermediate: '3–4 set × 12–15 tekrar',
      note: 'Klasik boyundan çekmeli mekiklere göre boyun omurları üzerinde stres yaratmayan çok daha konforlu bir ön karın hareketidir.'
    },
    alternatives: {
      easier: 'dead-bug',
      harder: 'hanging-knee-raise',
      equipmentAlt: ['dead-bug', 'hanging-knee-raise', 'plank'],
      homeAlt: 'dead-bug'
    },
    animation: {
      poseId: 'reverse-crunch',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Sırtüstü yatan sporcunun dizlerini göğsüne doğru çekerek leğen kemiğini yerden yukarı yuvarlayıp kontrollü indirmesini gösteren animasyon.',
      startLabel: 'Sırtüstü Masa Pozisyonu',
      endLabel: 'Pelvik Yuvarlama (Kalça Kalkık)'
    },
    editorialSource: 'ACE & NSCA Karın Fleksiyon Mekanikleri'
  },
  {
    id: 'hanging-knee-raise',
    slug: 'hanging-knee-raise',
    trName: 'Barda Asılarak Diz Çekiş',
    enName: 'Hanging Knee Raise',
    aliases: ['hanging knee raise', 'barfikste karın', 'asılarak diz çekme', 'alt karın barfiks'],
    shortDescription:
      'Barfiks barından asılı dururken dizleri göğse doğru çekip leğen kemiğini yukarı yuvarlayan, ön karın, kalça fleksörleri ve kavrama kuvvetini çalıştıran orta-ileri seviye hareket.',
    primaryMuscleGroup: 'karin-core',
    secondaryMuscleGroups: ['on-kol', 'sirt'],
    primaryMuscles: ['Rectus Abdominis (Ön Karın)', 'İç ve Dış Oblikler'],
    secondaryMuscles: ['İliopsoas ve Rectus Femoris (Kalça Fleksörleri)'],
    stabilizerMuscles: ['Ön Kol Kavrama Kasları', 'Latissimus Dorsi ve Omuz Kuşağı (Aktif Asılış)'],
    subRegionTag: 'İleri Ön Karın & Kavrama Dayanıklılığı',
    equipment: ['barfiks-bari'],
    environments: ['salon', 'ev'],
    level: 'orta',
    movementPattern: 'core',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Barfiks barını omuz genişliğinde kavrayıp asılın. Omuzlarınızın kulaklarınıza çökmesine izin vermeyin; kürek kemiklerinizi hafifçe aşağı çekerek "aktif asılış" pozisyonu alın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Vücudunuzu ileri-geri sallamadan dizlerinizi bükerek göğsünüze doğru çekin ve hareketin üst kısmında leğen kemiğinizi yukarı doğru yuvarlayın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Dizleriniz göğüs hizasına yaklaştığında karın kaslarınızı 1 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Bacaklarınızı bir anda düşürüp sallanma başlatmadan, 2–3 saniyede kontrollü şekilde başlangıç pozisyonuna indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Dizleri yukarı çekerken nefes verin, kontrollü indirirken nefes alın.'
      }
    ],
    cues: [
      'Dizlerinizi sadece bel hizasına (90 dereceye) kaldırıp bırakırsanız yalnızca kalça fleksörleri çalışır; karın kasları için dizleri göğse doğru çekip leğen kemiğinizi yukarı kıvırın.',
      'İniş fazını yavaş yapmak vücudun sarkaç gibi sallanmasını önler.'
    ],
    commonMistakes: [
      {
        mistake: 'Vücudu ileri-geri sallayarak ivmeyle dizleri fırlatmak.',
        correction: 'Her tekrar sonunda gövdeyi tamamen sabit durdurup kas kuvvetiyle kaldırın.'
      },
      {
        mistake: 'Dizleri sadece 90 dereceye kaldırıp leğen kemiğini hiç yuvarlamamak.',
        correction: 'Dizlerinizi göğsünüze yaklaştırarak karın kaslarınızı gerçekten kısaltın.'
      },
      {
        mistake: 'Omuzları tamamen gevşek bırakıp kulaklara gömülmek.',
        correction: 'Omuz eklemini korumak için hafif aktif asılış (skapular depresyon) koruyun.'
      }
    ],
    programming: {
      beginner: 'Önce yerde Reverse Crunch ile pelvik yuvarlama kontrolünü öğrenin',
      intermediate: '3–4 set × 8–15 kontrollü tekrar',
      note: 'Kavrama kuvveti sınırlayıcı oluyorsa dirsek destekli istasyon (Captain’s Chair) de alternatif olarak kullanılabilir.'
    },
    alternatives: {
      easier: 'reverse-crunch',
      harder: 'pull-up',
      equipmentAlt: ['reverse-crunch', 'dead-bug', 'plank'],
      homeAlt: 'reverse-crunch'
    },
    animation: {
      poseId: 'hanging-knee-raise',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Barfiks barından aktif asılan sporcunun sallanmadan dizlerini göğsüne doğru çekip kontrollü indirmesini gösteren animasyon.',
      startLabel: 'Aktif Asılış',
      endLabel: 'Dizler Göğüste (Pelvik Kıvrım)'
    },
    editorialSource: 'NSCA Core Antrenman Mekanikleri'
  },
  {
    id: 'pallof-press',
    slug: 'pallof-press',
    trName: 'Gövde Dönme Direnci İtişi (Pallof Press)',
    enName: 'Pallof Press',
    aliases: ['pallof press', 'anti rotasyon core', 'kablo karın itiş', 'bant pallof press'],
    shortDescription:
      'Yandan gelen kablo veya direnç bandını göğüs önünden ileri uzatıp gövdenin dönmesine direnen, yan karın (oblikler) ve derin core stabilitesini geliştiren modern fonksiyonel hareket.',
    primaryMuscleGroup: 'karin-core',
    secondaryMuscleGroups: ['omuz', 'kalca'],
    primaryMuscles: ['İç ve Dış Oblikler (Yan Karın)', 'Transversus Abdominis (Derin Core)'],
    secondaryMuscles: ['Rectus Abdominis', 'Gluteus Medius (Kalça Sabitlemesi)'],
    stabilizerMuscles: ['Omuz Kuşağı ve Göğüs (Kolları İleride Tutma)'],
    subRegionTag: 'Anti-Rotasyon (Dönme Direnci) Core',
    equipment: ['kablo-makinesi', 'direnc-bandi'],
    environments: ['salon', 'ev'],
    environmentNote: 'Salonda göğüs hizasındaki kablo makinesinde, evde ise kapı kolu veya direğe sabitlenmiş direnç bandıyla uygulanır.',
    level: 'baslangic',
    movementPattern: 'core',
    mechanic: 'izolasyon',
    laterality: 'tek-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Makarayı (veya direnç bandını) göğüs kemiği hizanıza sabitleyin. İstasyona yan dönün, tutamağı iki elinizle göğsünüzün önünde kavrayın ve yan adım atarak kabloda gerginlik oluşturun. Ayaklarınızı omuz genişliğinde açıp dizlerinizi hafif bükün.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Kablo sizi yana döndürmeye çalışırken omuzlarınızı ve kalçanızı tam karşıya kilitli tutarak ellerinizi göğsünüzden tam ileri doğru düz bir hatla uzatın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kollarınız ileride tamamen uzandığında (kaldıraç kolu en uzunken) 2 saniye boyunca dönmeye direnerek sabit bekleyin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ellerinizi yavaşça göğsünüzün önüne geri çekin ve tekrar ileri uzatın.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İleri uzatırken nefes verin, ileride 2 saniye beklerken sakin nefes alın ve göğse dönerken kontrolü koruyun.'
      }
    ],
    cues: [
      'Ayaklarınızı çok dar tutarsanız dengeniz bozulur; omuz genişliğinde atletik bir duruş alın ve kalçanızı sıkın.',
      'Ağırlık omuzlarınızı yana bükecek kadar ağır olmamalı; kusursuz simetriyle durabileceğiniz bir direnç seçin.'
    ],
    commonMistakes: [
      {
        mistake: 'Kolları uzattığında gövdenin ve omuzların makineye doğru dönmesi.',
        correction: 'Direnci biraz azaltın ve göğüs kemiğinizle kemer tokalarınızın tam karşıya bakmasını sağlayın.'
      },
      {
        mistake: 'İleride hiç beklemeden hızlıca basıp çekmek.',
        correction: 'Asıl core çalışması kollar ileride uzunken geçen 2 saniyelik bekleme anında gerçekleşir.'
      },
      {
        mistake: 'Omuzları kulaklara doğru kasmak.',
        correction: 'Omuzları aşağıda rahat, karın ve kalçayı sıkı tutun.'
      }
    ],
    programming: {
      beginner: '3 set × her yön için 10 tekrar (ileride 2 sn beklemeli)',
      intermediate: '3–4 set × her yön için 10–12 tekrar (ileride 2–3 sn beklemeli)',
      note: 'Fizyoterapist John Pallof tarafından geliştirilen bu egzersiz, omurgayı döndürmeden oblik kaslarını çalıştırmanın en güvenli yoludur.'
    },
    alternatives: {
      easier: 'side-plank',
      harder: 'farmers-carry',
      equipmentAlt: ['side-plank', 'plank', 'farmers-carry'],
      homeAlt: 'side-plank'
    },
    animation: {
      poseId: 'pallof-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Yandan gelen kablo/bant direncine karşı gövdesini döndürmeden ellerini göğüs önünden ileri uzatıp sabit tutan sporcuyu gösteren animasyon.',
      startLabel: 'Eller Göğüs Önünde',
      endLabel: 'Kollar İleride (Anti-Rotasyon Tutuş)'
    },
    editorialSource: 'John Pallof & NSCA Fonksiyonel Anti-Rotasyon Core İlkeleri'
  },
  {
    id: 'farmers-carry',
    slug: 'farmers-carry',
    trName: 'Ağırlıkla Çift El Yürüyüşü (Farmer’s Carry)',
    enName: 'Farmer’s Carry (Farmer’s Walk)',
    aliases: ['farmers walk', 'farmers carry', 'çiftçi yürüyüşü', 'ağırlık taşıma', 'kavrama yürüyüşü'],
    shortDescription:
      'İki elde ağır dambıl veya kettlebell taşıyarak dik duruşla yürüyen; kavrama (ön kol), üst sırt/trapez, core stabilitesi ve tüm vücut dayanıklılığını aynı anda geliştiren temel taşıma hareketi.',
    primaryMuscleGroup: 'karin-core',
    secondaryMuscleGroups: ['on-kol', 'sirt', 'omuz', 'kalca', 'baldir'],
    primaryMuscles: ['Transversus Abdominis ve Oblikler (Dinamik Gövde Stabilitesi)', 'Ön Kol Kavrama Kasları'],
    secondaryMuscles: ['Üst ve Orta Trapezius', 'Gluteus Medius (Adım Sırasında Pelvis Dengesi)', 'Gastrocnemius & Soleus'],
    stabilizerMuscles: ['Rotator Manşet', 'Erector Spinae', 'Quadriceps'],
    subRegionTag: 'Tüm Vücut Taşıma, Core & Kavrama Kuvveti',
    equipment: ['dumbbell', 'kettlebell'],
    environments: ['salon', 'ev'],
    environmentNote: 'Evde veya salonda ileri-geri yürüyebileceğiniz birkaç metrelik güvenli bir alan ve bir çift dambıl/kettlebell gerektirir.',
    level: 'baslangic',
    movementPattern: 'tasima',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Bir çift dambıl veya kettlebell’in arasına geçin. Belinizden eğilmeden, dizlerinizi ve kalçanızı bükerek (deadlift gibi) ağırlıkları sıkıca kavrayıp dik konuma kalkın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Omuzlarınızı geriye-aşağıya sabitleyin, göğsünüzü dik tutun, karın kaslarınızı sıkın ve kontrollü, kısa-orta adımlarla ileri doğru yürüyün.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Yürüyüş boyunca ağırlıkların bacaklarınıza çarpmasına veya gövdenizin sağa-sola yalpalamasına izin vermeyin.'
      },
      {
        title: 'Kontrollü Dönüş (Bitiş)',
        detail:
          'Hedeflediğiniz mesafe veya süre dolduğunda tamamen durun ve yine dizlerinizi bükerek ağırlıkları güvenli biçimde yere bırakın.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yürürken karın duvarınızı sıkı tutarak burundan kısa ve kontrollü nefes alıp verin.'
      }
    ],
    cues: [
      'Ağırlıkları yerden alırken ve set sonunda yorgunken yere bırakırken asla belinizi yuvarlamayın; her zaman bacaklarınızı bükerek indirin.',
      'Başınızın tepesinden bir ip sizi tavana çekiyormuş gibi uzun ve dik yürüyün.'
    ],
    commonMistakes: [
      {
        mistake: 'Yoruldukça omuzların öne-aşağı çökmesine ve boynun öne uzamasına izin vermek.',
        correction: 'Kürek kemiklerinizi geride ve aşağıda aktif tutun; duruşunuz bozulduğunda ağırlıkları yere bırakın.'
      },
      {
        mistake: 'Koşar gibi çok büyük ve sarsıntılı adımlar atmak.',
        correction: 'Kontrollü, dengeli ve sarsıntısız adımlarla yürüyün.'
      },
      {
        mistake: 'Set sonunda ağırlıkları belden eğilerek yere atmak.',
        correction: 'Sakatlıkların çoğu set biterken dikkatsizce ağırlık bırakırken olur; çömelerek yere koyun.'
      }
    ],
    programming: {
      isIsometric: true,
      beginner: '3 set × 30–40 saniye (veya 20–30 metre) kontrollü yürüyüş',
      intermediate: '3–4 set × 40–60 saniye (daha yüksek ağırlıkla veya tek el Suitcase Carry ile)',
      note: 'Taşıma (loaded carry) hareketleri tekrar sayısı yerine yürüyüş süresi (saniye) veya mesafe (metre) üzerinden planlanır.'
    },
    alternatives: {
      easier: 'plank',
      harder: 'romanian-deadlift',
      equipmentAlt: ['plank', 'side-plank', 'pallof-press', 'dumbbell-wrist-curl'],
      homeAlt: 'plank'
    },
    animation: {
      poseId: 'farmers-carry',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'İki elinde ağır dambıl/kettlebell tutarak dik duruş ve sıkı core ile kontrollü adımlarla yürüyen sporcuyu gösteren animasyon.',
      startLabel: 'Dik Duruş & Sıkı Kavrama',
      endLabel: 'Dengeli Yürüyüş Adımı'
    },
    editorialSource: 'Dan John & McGill Loaded Carry (Yüklü Taşıma) Araştırmaları'
  }
]
