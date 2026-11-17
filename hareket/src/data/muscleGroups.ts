import type { MuscleGroupInfo, MuscleGroupId } from '../types/fitness.ts'

export const MUSCLE_GROUPS: MuscleGroupInfo[] = [
  {
    id: 'gogus',
    slug: 'gogus',
    name: 'Göğüs',
    latinName: 'Pectoralis Major & Minor',
    bodySide: 'front',
    shortSummary: 'Kolları vücudun önünde birleştirme ve ileri doğru itiş kuvveti üreten ön gövde kas grubu.',
    anatomicalOverview:
      'Göğüs kasları esas olarak köprücük kemiğinden (üst/klaviküler lifler) ve göğüs kemiğinden (orta-alt/sternal lifler) başlayarak üst kol kemiğine bağlanan Pectoralis Major kasından oluşur. İtiş açısı değiştikçe (örneğin eğimli sehpa veya düz zemin) üst ya da orta-alt liflerin yük paylaşımı değişir.',
    trainingTip:
      'Göğüs antrenmanlarında hem çok eklemli yatay itişleri (şınav, bench press) hem de omuz ekleminde kolları kavuşturma hareketlerini (fly varyasyonları) dengeli kullanmak, kürek kemiği kontrolünü korumak açısından faydalıdır.',
    subRegions: [
      {
        id: 'ust-gogus',
        name: 'Üst Göğüs',
        anatomicalName: 'Pectoralis Major (Klaviküler Baş)',
        roleSummary: 'Kolların yukarı-ileri açıyla itildiği ve omuz fleksiyonunun eşlik ettiği açılarda daha fazla devreye girer.',
        exampleMovementTypes: 'Incline Barbell/Dumbbell Bench Press, Ayaklar Yükseltilmiş Şınav'
      },
      {
        id: 'orta-gogus',
        name: 'Orta Göğüs',
        anatomicalName: 'Pectoralis Major (Sternal Lifler)',
        roleSummary: 'Yatay düzlemdeki temel itiş ve kolları gövde önünde birleştirme (yatay addüksiyon) görevini üstlenir.',
        exampleMovementTypes: 'Push-up, Düz Bench Press, Dumbbell/Cable Chest Fly'
      },
      {
        id: 'serratus',
        name: 'Ön Dişli ve Yardımcı Kaslar',
        anatomicalName: 'Serratus Anterior & Pectoralis Minor',
        roleSummary: 'İtişin sonunda kürek kemiklerinin göğüs kafesi üzerinde sağlıklı hareket etmesine ve sabitlenmesine destek olur.',
        exampleMovementTypes: 'Tam açıklıklı Push-up, Plank destekli itişler'
      }
    ],
    relatedCategories: ['itis', 'izolasyon']
  },
  {
    id: 'sirt',
    slug: 'sirt',
    name: 'Sırt',
    latinName: 'Latissimus Dorsi, Trapezius & Rhomboideus',
    bodySide: 'back',
    shortSummary: 'Çekiş kuvveti, kürek kemiği kontrolü ve dik duruş bütünlüğünü sağlayan geniş arka gövde kasları.',
    anatomicalOverview:
      'Sırt tek bir kas değil; kolları yukarıdan aşağı ve önden geriye çeken kanat kasları (Latissimus Dorsi), kürek kemiklerini birbirine yaklaştıran orta sırt kasları (Rhomboidler, Orta/Alt Trapezius) ve omurgayı destekleyen derin sırt kaslarının (Erector Spinae) birleşimidir.',
    trainingTip:
      'Sırtı dengeli çalıştırmak için hem dikey çekiş (barfiks, lat pulldown) hem de yatay çekiş (row varyasyonları) hareketlerine yer vermek önerilir.',
    subRegions: [
      {
        id: 'kanat',
        name: 'Kanat Kasları (Lat)',
        anatomicalName: 'Latissimus Dorsi & Teres Major',
        roleSummary: 'Kolları baş üstünden aşağıya veya vücut yanından geriye doğru çekerek gövdeye yaklaştırır.',
        exampleMovementTypes: 'Pull-up, Chin-up, Lat Pulldown, Vücuda Yakın Tek Kol Row'
      },
      {
        id: 'orta-ust-sirt',
        name: 'Orta ve Üst Sırt',
        anatomicalName: 'Trapezius (Orta/Alt) & Rhomboideus',
        roleSummary: 'Kürek kemiklerini geriye (retraksiyon) ve aşağıya (depresyon) çekerek omuz kuşağı dengesini sağlar.',
        exampleMovementTypes: 'Inverted Row, Barbell Bent-over Row, Seated Cable Row, Band Row'
      },
      {
        id: 'omurga-destek',
        name: 'Omurga Çevresi Destek Kasları',
        anatomicalName: 'Erector Spinae',
        roleSummary: 'Öne eğilerek yapılan çekişlerde ve menteşe hareketlerinde omurganın doğal dizilimini izometrik olarak korur.',
        exampleMovementTypes: 'Bent-over Row, Romanian Deadlift, Bird Dog'
      }
    ],
    relatedCategories: ['cekis', 'kalca-mentesesi']
  },
  {
    id: 'omuz',
    slug: 'omuz',
    name: 'Omuz',
    latinName: 'Deltoideus (Anterior, Lateral, Posterior) & Rotator Manşet',
    bodySide: 'both',
    shortSummary: 'Kolu her yönde hareket ettiren üç başlı deltoid yapısı ve omuz eklemini merkezleyen derin dengeleyici kaslar.',
    anatomicalOverview:
      'Omuz kası (Deltoid); ön (anterior), yan/orta (lateral) ve arka (posterior) olmak üzere üç farklı lif demetinden oluşur. Bir hareketin "omuz hareketi" olması, üç bölgeyi eşit çalıştırdığı anlamına gelmez: baş üstü itişler ağırlıklı olarak ön ve orta omuzu yüklerken, yana açışlar orta omuzu, geriye açışlar ve yüz çekişleri (face pull) ise arka omuzu ve üst sırtı hedefler.',
    trainingTip:
      'Ön omuz, göğüs itişlerinde de yoğun çalıştığı için omuz programlarında orta (lateral) ve arka (posterior) deltoid hareketlerine özel yer ayırmak dengeli bir gelişim sağlar.',
    subRegions: [
      {
        id: 'on-omuz',
        name: 'Ön Omuz',
        anatomicalName: 'Anterior Deltoid',
        roleSummary: 'Kolu öne doğru kaldırır (omuz fleksiyonu) ve baş üstü/yatay tüm itiş hareketlerinde güçlü şekilde çalışır.',
        exampleMovementTypes: 'Dumbbell/Barbell Overhead Press, Pike Push-up, Arnold Press, Front Raise'
      },
      {
        id: 'orta-omuz',
        name: 'Orta (Yan) Omuz',
        anatomicalName: 'Lateral / Medial Deltoid',
        roleSummary: 'Kolu gövdeden yana doğru uzaklaştırır (omuz abdüksiyonu) ve omuz genişliği görünümüne en çok katkı veren bölgedir.',
        exampleMovementTypes: 'Dumbbell Lateral Raise, Cable Lateral Raise, Baş Üstü Press Varyasyonları'
      },
      {
        id: 'arka-omuz',
        name: 'Arka Omuz ve Dış Rotatörler',
        anatomicalName: 'Posterior Deltoid, Infraspinatus & Teres Minor',
        roleSummary: 'Kolu yatay düzlemde geriye açar ve omuz eklemini dışa döndürerek duruşu ve eklem sağlığını destekler.',
        exampleMovementTypes: 'Bent-over Rear Delt Raise, Face Pull, Yatay Çekişler'
      }
    ],
    relatedCategories: ['itis', 'izolasyon', 'cekis']
  },
  {
    id: 'biceps',
    slug: 'biceps',
    name: 'Biceps (Ön Kol Üstü)',
    latinName: 'Biceps Brachii & Brachialis',
    bodySide: 'front',
    shortSummary: 'Dirsek eklemini büken (fleksiyon) ve ön kolu dışa çeviren (süpinasyon) üst kol ön bölge kasları.',
    anatomicalOverview:
      'Üst kolun ön kısmında iki başlı Biceps Brachii ve hemen altında dirsek bükme kuvvetine doğrudan katkı sağlayan Brachialis kası yer alır. Avuç içinin yukarı baktığı (süpinasyon) tutuşlarda Biceps Brachii, avuç içlerinin birbirine baktığı (nötr/çekiç) tutuşlarda ise Brachialis ve Brachioradialis daha fazla devreye girer.',
    trainingTip:
      'Biceps hareketlerinde gövdeyi sallamadan, dirsek konumunu kontrol ederek tam hareket açıklığıyla çalışmak yükün hedef kasta kalmasını sağlar.',
    subRegions: [
      {
        id: 'biceps-brachii',
        name: 'Biceps Uzun ve Kısa Baş',
        anatomicalName: 'Biceps Brachii (Caput Longum & Breve)',
        roleSummary: 'Dirseği büker ve ön kolu avuç içi yukarı bakacak şekilde döndürür.',
        exampleMovementTypes: 'Dumbbell Biceps Curl, Barbell Curl, Concentration Curl, Cable Curl'
      },
      {
        id: 'brachialis',
        name: 'Derin Dirsek Bükücü',
        anatomicalName: 'Brachialis',
        roleSummary: 'Tutuş açısından bağımsız olarak saf dirsek bükme kuvveti üretir; nötr tutuşlarda payı artar.',
        exampleMovementTypes: 'Hammer Curl, Halat ile Cable Curl'
      }
    ],
    relatedCategories: ['izolasyon', 'cekis']
  },
  {
    id: 'triceps',
    slug: 'triceps',
    name: 'Triceps (Arka Kol)',
    latinName: 'Triceps Brachii (Uzun, Lateral ve Medial Baş)',
    bodySide: 'back',
    shortSummary: 'Dirsek eklemini açan (ekstansiyon) ve üst kol hacminin büyük bölümünü oluşturan üç başlı arka kol kası.',
    anatomicalOverview:
      'Triceps; yan (lateral), iç/derin (medial) ve kürek kemiğine bağlanan uzun (long) baştan oluşur. Kolların gövde yanında olduğu itiş ve pushdown hareketlerinde yan ve medial başlar etkin çalışırken, kolların baş üstüne kaldırıldığı uzatma (overhead extension) hareketlerinde uzun baş daha güçlü bir gerilim altında çalışır.',
    trainingTip:
      'Dirsek eklemine aşırı stres bindirmemek için hareketleri kontrollü tempoda uygulamak ve hem yanda hem de baş üstü açıları dönüşümlü kullanmak faydalıdır.',
    subRegions: [
      {
        id: 'triceps-uzun-bas',
        name: 'Triceps Uzun Baş',
        anatomicalName: 'Triceps Brachii (Caput Longum)',
        roleSummary: 'Omuz eklemini de geçtiği için kol baş üstündeyken veya gerideyken daha fazla esner ve çalışır.',
        exampleMovementTypes: 'Dumbbell Overhead Triceps Extension, Skull Crusher'
      },
      {
        id: 'triceps-yan-medial',
        name: 'Triceps Yan ve Medial Baş',
        anatomicalName: 'Caput Laterale & Caput Mediale',
        roleSummary: 'Tüm dirsek açma (ekstansiyon) ve dar tutuşlu itiş hareketlerinde ana kuvveti üretir.',
        exampleMovementTypes: 'Cable Triceps Pushdown, Close-grip Push-up, Close-grip Bench Press, Kickback'
      }
    ],
    relatedCategories: ['izolasyon', 'itis']
  },
  {
    id: 'on-kol',
    slug: 'on-kol',
    name: 'Ön Kol ve Kavrama',
    latinName: 'Brachioradialis, Bilek Fleksörleri ve Ekstansörleri',
    bodySide: 'both',
    shortSummary: 'Kavrama kuvvetini (grip), el bileği dengesini ve çekiş/taşıma hareketlerindeki güç aktarımını sağlayan kaslar.',
    anatomicalOverview:
      'Dirsek ile el bileği arasında yer alan ön kol kasları; parmakları kapatarak ağırlığı kavramaktan, bileği içe/dışa bükmekten ve nötr tutuşlu dirsek bükme hareketlerine destek olmaktan sorumludur.',
    trainingTip:
      'Ağır çekişler (row, barfiks) ve taşıma egzersizleri (Farmer’s Carry) ön kolu doğal olarak çalıştırır; gerektiğinde bilek ve çekiç tutuş egzersizleriyle desteklenebilir.',
    subRegions: [
      {
        id: 'brachioradialis',
        name: 'Üst Ön Kol',
        anatomicalName: 'Brachioradialis',
        roleSummary: 'Özellikle başparmağın yukarı baktığı veya avuç içinin yere baktığı dirsek bükme hareketlerinde çalışır.',
        exampleMovementTypes: 'Hammer Curl, Reverse Curl'
      },
      {
        id: 'kavrama-bilek',
        name: 'Kavrama ve Bilek Kasları',
        anatomicalName: 'Flexor & Extensor Carpi Grubu',
        roleSummary: 'Ağırlığı elde tutma süresini uzatır ve el bileğini yük altında sabitler.',
        exampleMovementTypes: 'Farmer’s Carry, Dumbbell Wrist Curl, Dead Hang / Barfiks'
      }
    ],
    relatedCategories: ['tasima', 'izolasyon', 'cekis']
  },
  {
    id: 'karin-core',
    slug: 'karin-core',
    name: 'Karın ve Core',
    latinName: 'Rectus Abdominis, Obliquus & Transversus Abdominis',
    bodySide: 'front',
    shortSummary: 'Omurgayı sabit tutan, gövde bükme/dönme kontrolünü sağlayan ve alt-üst vücut arasında güç köprüsü kuran merkez bölge.',
    anatomicalOverview:
      'Core bölgesi yalnızca önde görünen karın kaslarından (Rectus Abdominis) ibaret değildir; yan karın kasları (iç ve dış oblikler), korse görevi gören derin karın kası (Transversus Abdominis), bel çevresi kasları ve kalça-pelvis sabitleyicilerini kapsar. İyi bir core antrenmanı hem kontrollü gövde bükme hem de harekete direnme (anti-ekstansiyon, anti-rotasyon, anti-lateral fleksiyon) egzersizlerini içerir.',
    trainingTip:
      'Sadece mekik tarzı hareketlere odaklanmak yerine Plank, Dead Bug, Pallof Press ve Farmer’s Carry gibi omurgayı koruyan dengeleyici hareketlere öncelik vermek günlük yaşam ve ağır kaldırışlar için çok daha işlevseldir.',
    subRegions: [
      {
        id: 'on-karin',
        name: 'Ön Karın (Rectus Abdominis)',
        anatomicalName: 'Rectus Abdominis',
        roleSummary: 'Göğüs kafesi ile leğen kemiğini birbirine yaklaştırır ve belin aşırı çukurlaşmasını önler.',
        exampleMovementTypes: 'Plank, Dead Bug, Reverse Crunch, Hanging Knee Raise'
      },
      {
        id: 'yan-karin-oblik',
        name: 'Yan Karın (Oblikler) ve Derin Core',
        anatomicalName: 'Obliquus Internus/Externus & Transversus Abdominis',
        roleSummary: 'Gövdenin yana bükülmesini ve istenmeyen dönme kuvvetlerini (anti-rotasyon) kontrol eder.',
        exampleMovementTypes: 'Side Plank, Pallof Press, Farmer’s Carry, Bird Dog'
      }
    ],
    relatedCategories: ['core', 'tasima']
  },
  {
    id: 'kalca',
    slug: 'kalca',
    name: 'Kalça (Glute)',
    latinName: 'Gluteus Maximus, Medius & Minimus',
    bodySide: 'back',
    shortSummary: 'Kalça açma (ekstansiyon), tek ayak üzerinde pelvis dengesi ve alt vücut patlayıcı kuvvetinin merkezi.',
    anatomicalOverview:
      'Vücudun en güçlü ve hacimli kas gruplarından biri olan kalça; arkaya itiş ve doğrulma kuvvetini üreten Gluteus Maximus ile bacağı yana açan ve yürürken/çömelirken leğen kemiğini dengede tutan Gluteus Medius ve Minimus kaslarından oluşur.',
    trainingTip:
      'Kalçayı tam kapsamlı çalıştırmak için doğrudan kalça itişlerini (Hip Thrust, Glute Bridge), menteşe hareketlerini (Romanian Deadlift, Swing) ve tek bacak egzersizlerini (Split Squat, Step-up) bir arada kullanabilirsiniz.',
    subRegions: [
      {
        id: 'gluteus-maximus',
        name: 'Büyük Kalça Kası',
        anatomicalName: 'Gluteus Maximus',
        roleSummary: 'Kalça eklemini güçlü şekilde açarak gövdeyi doğrultur ve kalçayı ileri iter.',
        exampleMovementTypes: 'Barbell/Dumbbell Hip Thrust, Glute Bridge, Kettlebell Swing, Bulgarian Split Squat'
      },
      {
        id: 'gluteus-medius',
        name: 'Yan Kalça ve Pelvis Sabitleyiciler',
        anatomicalName: 'Gluteus Medius & Minimus',
        roleSummary: 'Tek bacak üzerindeki hareketlerde dizin içe çökmesini önler ve leğen kemiğini dengeler.',
        exampleMovementTypes: 'Step-up, Bulgarian Split Squat, Reverse Lunge, Cable Glute Kickback'
      }
    ],
    relatedCategories: ['kalca-mentesesi', 'squat', 'izolasyon']
  },
  {
    id: 'on-bacak',
    slug: 'on-bacak',
    name: 'Ön Bacak (Quadriceps)',
    latinName: 'Quadriceps Femoris (4 Başlı Uyluk Kası)',
    bodySide: 'front',
    shortSummary: 'Diz eklemini açan (ekstansiyon), çömelip kalkmayı ve merdiven/yokuş çıkmayı sağlayan dört başlı ön uyluk kası.',
    anatomicalOverview:
      'Ön bacakta Vastus Lateralis (dış), Vastus Medialis (iç/dize yakın), Vastus Intermedius (derin) ve hem kalça hem diz eklemini geçen Rectus Femoris olmak üzere dört kas başı bulunur. Çömelme (squat) ve hamle (lunge) hareketlerinde kalça ile birlikte çalışırken, Leg Extension gibi hareketlerde doğrudan izole edilir.',
    trainingTip:
      'Ayak tabanının tamamını yerde hissederek ve dizlerin ayak parmak uçlarıyla uyumlu doğrultuda hareket etmesine özen göstererek çalışmak diz konforunu artırır.',
    subRegions: [
      {
        id: 'vastus-grubu',
        name: 'İç, Dış ve Derin Ön Uyluk',
        anatomicalName: 'Vastus Medialis, Lateralis & Intermedius',
        roleSummary: 'Diz bükülme açısı arttıkça çömelme ve itiş hareketlerinde temel yükü üstlenir.',
        exampleMovementTypes: 'Barbell Back/Front Squat, Goblet Squat, Leg Press, Bulgarian Split Squat'
      },
      {
        id: 'rectus-femoris',
        name: 'Orta Ön Uyluk',
        anatomicalName: 'Rectus Femoris',
        roleSummary: 'Hem dizi açar hem de kalçayı büker; gövdenin sabit kaldığı diz uzatma hareketlerinde güçlü çalışır.',
        exampleMovementTypes: 'Leg Extension, Reverse Lunge, Step-up'
      }
    ],
    relatedCategories: ['squat', 'izolasyon']
  },
  {
    id: 'arka-bacak',
    slug: 'arka-bacak',
    name: 'Arka Bacak (Hamstring)',
    latinName: 'Biceps Femoris, Semitendinosus & Semimembranosus',
    bodySide: 'back',
    shortSummary: 'Hem kalça menteşesiyle gövdeyi doğrultmada hem de diz eklemini bükmede görev alan arka uyluk kas grubu.',
    anatomicalOverview:
      'Hamstring kaslarının büyük bölümü hem kalça hem de diz eklemini kat eder. Bu nedenle arka bacak gelişimi için yalnızca kalçadan eğilip doğrululan menteşe hareketleri (Romanian Deadlift) veya yalnızca diz bükme hareketleri (Leg Curl) tek başına eksik kalabilir; her iki fonksiyonu da çalıştırmak daha bütüncül bir yaklaşımdır.',
    trainingTip:
      'Menteşe (hinge) hareketlerinde ağırlığı yere değdirmeye çalışmak yerine, omurga nötr kalırken arka bacakta tatlı bir gerilim hissettiğiniz açıklıkta hareket etmek çok daha verimlidir.',
    subRegions: [
      {
        id: 'kalca-uzatici-hamstring',
        name: 'Kalça Menteşesi Odaklı Arka Bacak',
        anatomicalName: 'Semimembranosus, Semitendinosus & Biceps Femoris (Uzun Baş)',
        roleSummary: 'Dizler hafif bükülü sabitken kalçanın geriye gitmesi ve açılması sırasında yoğun gerilim altında çalışır.',
        exampleMovementTypes: 'Barbell Romanian Deadlift, Dumbbell Romanian Deadlift, Kettlebell Swing'
      },
      {
        id: 'diz-bukucu-hamstring',
        name: 'Diz Bükme Odaklı Arka Bacak',
        anatomicalName: 'Biceps Femoris (Kısa ve Uzun Baş)',
        roleSummary: 'Topuğu kalçaya doğru yaklaştıran saf diz fleksiyonu hareketlerinde doğrudan çalışır.',
        exampleMovementTypes: 'Lying Leg Curl, Glute Bridge (topuk çekiş odaklı)'
      }
    ],
    relatedCategories: ['kalca-mentesesi', 'izolasyon']
  },
  {
    id: 'baldir',
    slug: 'baldir',
    name: 'Baldır (Kalf)',
    latinName: 'Gastrocnemius & Soleus',
    bodySide: 'back',
    shortSummary: 'Ayak bileği itişini, yürüyüş/koşu sırasındaki yaylanma kuvvetini ve alt bacak stabilitesini sağlayan kaslar.',
    anatomicalOverview:
      'Baldır bölgesi iki ana kastan oluşur: diz eklemini de geçen yüzeyel iki başlı Gastrocnemius ve onun altında yer alan Soleus. Dizler düzken yapılan parmak ucu yükselişlerde (Standing Calf Raise) Gastrocnemius daha baskınken, dizler bükülü oturarak yapılan yükselişlerde (Seated Calf Raise) yük ağırlıklı olarak Soleus kasına geçer.',
    trainingTip:
      'Aşil tendonu doğal bir yay gibi çalıştığı için baldır hareketlerinde hızlıca zıplamak yerine, dip noktada 1–2 saniye bekleyip tepe noktada tam sıkıştırma yapmak kas aktivasyonunu belirgin şekilde artırır.',
    subRegions: [
      {
        id: 'gastrocnemius',
        name: 'Üst / Yüzeyel Baldır',
        anatomicalName: 'Gastrocnemius (Medial ve Lateral Baş)',
        roleSummary: 'Diz düz konumdayken ayak bileğini aşağı doğru (plantar fleksiyon) güçlü şekilde iter.',
        exampleMovementTypes: 'Standing Calf Raise'
      },
      {
        id: 'soleus',
        name: 'Alt / Derin Baldır',
        anatomicalName: 'Soleus',
        roleSummary: 'Diz bükülüyken ayak bileği itişinin ana yükünü taşır ve uzun süreli ayakta duruş dayanıklılığını sağlar.',
        exampleMovementTypes: 'Seated Calf Raise, Squat/Lunge alt pozisyon dengesi'
      }
    ],
    relatedCategories: ['izolasyon', 'tasima']
  }
]

export const MUSCLE_GROUP_MAP: Record<MuscleGroupId, MuscleGroupInfo> = Object.fromEntries(
  MUSCLE_GROUPS.map((m) => [m.id, m])
) as Record<MuscleGroupId, MuscleGroupInfo>
