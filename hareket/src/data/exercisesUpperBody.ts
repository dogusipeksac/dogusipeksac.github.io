import type { Exercise } from '../types/fitness.ts'

export const UPPER_BODY_EXERCISES: Exercise[] = [
  // =========================================================================
  // GÖĞÜS (9 HAREKET)
  // =========================================================================
  {
    id: 'push-up',
    slug: 'push-up',
    trName: 'Şınav',
    enName: 'Push-up',
    aliases: ['sinav', 'şınav', 'push up', 'pushup', 'klasik şınav', 'vücut ağırlığı göğüs'],
    shortDescription:
      'Ekipman gerektirmeden göğüs, ön omuz ve arka kol kaslarını gövde stabilitesiyle birlikte çalıştıran temel yatay itiş hareketi.',
    primaryMuscleGroup: 'gogus',
    secondaryMuscleGroups: ['omuz', 'triceps', 'karin-core'],
    primaryMuscles: ['Pectoralis Major (Orta ve Alt Lifler)'],
    secondaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Triceps Brachii', 'Serratus Anterior (Ön Dişli Kas)'],
    stabilizerMuscles: ['Rectus Abdominis (Ön Karın)', 'Gluteus Maximus (Kalça)', 'Derin Omurga Sabitleyiciler'],
    subRegionTag: 'Orta Göğüs & Core İtiş',
    equipment: ['vucut-agirligi'],
    environments: ['ev', 'salon'],
    environmentNote: 'Düz ve kaymayan herhangi bir zeminde tamamen ekipmansız uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    featured: true,
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ellerinizi omuz genişliğinden biraz daha açık olacak şekilde yere yerleştirin. Ayak parmak uçlarınız yerde, başınızdan topuklarınıza kadar vücudunuz düz bir çizgi oluşturacak şekilde yüksek plank pozisyonu alın.'
      },
      {
        title: 'Hareketin Uygulanışı (İniş Fazı)',
        detail:
          'Karın ve kalça kaslarınızı hafifçe sıkarak gövdenizi tek parça halinde aşağı indirin. Dirseklerinizi yanlara 90 derece açmak yerine gövdenizle yaklaşık 30–45 derecelik doğal bir açı yapacak şekilde geriye-yana yönlendirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu (Dip Nokta)',
        detail:
          'Göğsünüz yere birkaç santimetre yaklaşana ve omuz ön kısmında kontrollü bir esneme hissedene kadar inişi sürdürün; belinizin çukurlaşmasına izin vermeyin.'
      },
      {
        title: 'Kontrollü Dönüş (İtiş Fazı)',
        detail:
          'Avuç içlerinizle yeri güçlüce iterek dirseklerinizi düzleştirin ve kürek kemiklerinizin hareketin sonunda doğal olarak birbirinden uzaklaşmasına izin vererek başlangıç pozisyonuna dönün.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Aşağı inerken yaklaşık 2 saniyede burundan nefes alın, yeri iterken 1–1.5 saniyede kontrollü şekilde nefes verin.'
      }
    ],
    cues: [
      'Boynunuzu öne sarkıtmayın; bakışlarınızı ellerinizin biraz ilerisindeki zeminde tutarak omurga hizasını koruyun.',
      'El bileklerinizde hassasiyet varsa parmaklarınızı hafifçe dışa çevirebilir veya paralel tutamaklardan (push-up bar / dambıl) destek alabilirsiniz.',
      'Göğsünüzden önce kalçanızın veya karnınızın yere değmemesine dikkat edin.'
    ],
    commonMistakes: [
      {
        mistake: 'Dirsekleri T harfi gibi tam yana (90 derece) açmak.',
        correction: 'Omuz eklemini rahatlatmak için dirsekleri gövdeye 30–45 derece yakınlaştırarak ok ucu formu oluşturun.'
      },
      {
        mistake: 'Yoruldukça belin aşağı sarkması veya kalçanın yukarı kalkması.',
        correction: 'Kaburgaları aşağı çekip kalçayı sıkarak gövdeyi sert bir tahta gibi sabit tutun; form bozuluyorsa Incline Push-up varyasyonuna geçin.'
      },
      {
        mistake: 'Yarım tekrar yapmak ve sadece dirsekleri hafifçe büküp açmak.',
        correction: 'Tekrar sayısını azaltıp göğsün yere yaklaştığı tam ve kontrollü hareket açıklığını hedefleyin.'
      }
    ],
    programming: {
      beginner: '3 set × 6–10 kontrollü tekrar (zorlanılırsa yükseltide)',
      intermediate: '3–4 set × 12–20 tekrar (2 saniye kontrollü iniş temposuyla)',
      note: 'Tekrar sayıları kişinin vücut ağırlığı kontrolüne göre değişir; son tekrarlarda gövde bütünlüğü bozulmamalıdır.'
    },
    alternatives: {
      easier: 'incline-push-up',
      harder: 'dumbbell-bench-press',
      equipmentAlt: ['dumbbell-floor-press', 'barbell-bench-press', 'chest-press-machine'],
      homeAlt: 'incline-push-up'
    },
    animation: {
      poseId: 'pushup',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Yüksek plank pozisyonundaki sporcunun gövdesini düz bir hat halinde yere yaklaştırıp tekrar yukarı itmesini gösteren kinematik animasyon.',
      startLabel: 'Yüksek Plank (Kollar Uzun)',
      endLabel: 'Alt İniş (Göğüs Zemine Yakın)'
    },
    editorialSource: 'ACSM Direnç Antrenmanı İlkeleri & NSCA Temel Egzersiz Tekniği Rehberi'
  },
  {
    id: 'incline-push-up',
    slug: 'incline-push-up',
    trName: 'Yükseltide Eğimli Şınav',
    enName: 'Incline Push-up',
    aliases: ['eğimli şınav', 'yükseltide şınav', 'kolay şınav', 'sehpa şınav', 'incline pushup'],
    shortDescription:
      'Ellerin bir sehpa veya sabit yükselti üzerine konularak vücut ağırlığı yükünün azaltıldığı, başlangıç seviyesi için ideal şınav varyasyonu.',
    primaryMuscleGroup: 'gogus',
    secondaryMuscleGroups: ['omuz', 'triceps', 'karin-core'],
    primaryMuscles: ['Pectoralis Major (Orta ve Alt Göğüs Lifleri)'],
    secondaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Triceps Brachii'],
    stabilizerMuscles: ['Rectus Abdominis', 'Serratus Anterior', 'Kalça Kasları'],
    subRegionTag: 'Orta-Alt Göğüs (Başlangıç Dostu)',
    equipment: ['vucut-agirligi', 'bench-sehpa'],
    environments: ['ev', 'salon'],
    environmentNote: 'Spor salonunda bench üzerinde, evde ise kaymayan sağlam bir koltuk, masa veya basamak kenarında uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ellerinizi omuz genişliğinden hafif açık şekilde sabit bir sehpanın veya yükseltinin kenarına yerleştirin. Ayaklarınızı geriye alarak vücudunuzu baştan topuğa düz bir çizgide hizalayın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirseklerinizi kontrollü biçimde bükerek göğsünüzün alt kısmını sehpanın kenarına doğru yaklaştırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Göğsünüz sehpaya birkaç santimetre yaklaştığında omuzlarınızın öne yuvarlanmadığından emin olun ve kısa bir an formu koruyun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Sehpayı avuç içlerinizle iterek kollarınızı başlangıçtaki uzun pozisyona getirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Sehpaya yaklaşırken nefes alın, yukarı iterken nefes verin. Yükselti ne kadar yüksekse hareket o kadar kolaylaşır.'
      }
    ],
    cues: [
      'Destek aldığınız sehpa veya mobilyanın itiş sırasında kesinlikle kaymayacağından emin olun.',
      'Kalçanızı geride bırakıp sadece üst gövdeyi eğmek yerine tüm vücudu tek parça halinde indirin.'
    ],
    commonMistakes: [
      {
        mistake: 'Ellerin konulduğu yükseltinin göğüs yerine boyun/çene hizasına gelmesi.',
        correction: 'Ayak mesafenizi ayarlayarak alt noktada sehpa kenarının göğüs kemiğinizin alt-orta hizasına denk gelmesini sağlayın.'
      },
      {
        mistake: 'Dizleri yere koyarak şınav çekmeye çalışırken gövde kontrolünü kaybetmek.',
        correction: 'Tam plank hattını öğrenmek için diz üstü yerine yüksek bir yüzeyde Incline Push-up yapmak core aktivasyonunu daha iyi öğretir.'
      },
      {
        mistake: 'Omuzları kulaklara doğru çekmek.',
        correction: 'Kürek kemiklerini hafifçe aşağı bastırarak boynunuzu uzun tutun.'
      }
    ],
    programming: {
      beginner: '3 set × 8–12 tekrar',
      intermediate: '3 set × 15 tekrar (daha alçak bir yükselti ile)',
      note: '12–15 tekrarı rahatça çıkardığınızda yükseltiyi kademeli olarak alçaltarak yer şınavına geçiş yapabilirsiniz.'
    },
    alternatives: {
      harder: 'push-up',
      equipmentAlt: ['chest-press-machine', 'dumbbell-floor-press'],
      homeAlt: 'push-up'
    },
    animation: {
      poseId: 'incline-pushup',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ellerini sabit bir sehpa üzerine yerleştiren sporcunun eğimli açıda şınav çekmesini gösteren animasyon.',
      startLabel: 'Eğimli Başlangıç',
      endLabel: 'Göğüs Sehpaya Yakın'
    },
    editorialSource: 'ACE & NSCA Vücut Ağırlığı İlerleme (Progression) Protokolleri'
  },
  {
    id: 'dumbbell-bench-press',
    slug: 'dumbbell-bench-press',
    trName: 'Dambıl Göğüs Pres',
    enName: 'Dumbbell Bench Press',
    aliases: ['dambıl bench press', 'dumbbell press', 'düz sehpa dambıl pres', 'göğüs dambıl itiş'],
    shortDescription:
      'Düz sehpa üzerinde iki dambıl ile yapılan, her iki kolun bağımsız çalışmasını ve doğal hareket açıklığını destekleyen temel göğüs itişi.',
    primaryMuscleGroup: 'gogus',
    secondaryMuscleGroups: ['omuz', 'triceps'],
    primaryMuscles: ['Pectoralis Major (Sternal / Orta Lifler)', 'Pectoralis Major (Klaviküler Lifler)'],
    secondaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Triceps Brachii'],
    stabilizerMuscles: ['Rotator Manşet (Omuz Sabitleyiciler)', 'Serratus Anterior', 'Ön Kol Kavrama Kasları'],
    subRegionTag: 'Orta Göğüs & Bağımsız Kol Kontrolü',
    equipment: ['dumbbell', 'bench-sehpa'],
    environments: ['ev', 'salon'],
    environmentNote: 'Evde uygulanabilmesi için bir çift dambıl yanında düz bir antrenman sehpası (bench) gereklidir; sehpa yoksa Dumbbell Floor Press tercih edilmelidir.',
    level: 'baslangic',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Dambılları alarak düz sehpaya oturun, ağırlıkları uyluklarınızın üzerine koyun. Sırtüstü uzanırken bacaklarınızın yardımıyla dambılları göğüs hizasına kaldırın ve ayaklarınızı yere sağlamca basın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Kürek kemiklerinizi sehpaya hafifçe sabitleyin. Dambılları göğüs kafesinizin üzerine doğru kontrollü şekilde yukarı itin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kollarınız omuz hizasında uzandığında dambılları birbirine sertçe çarptırmadan göğüs kaslarınızdaki kasılmayı hissedin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Dirseklerinizi gövdenizle yaklaşık 45–60 derece açıda tutarak dambılları göğüs yan hizasına kadar yavaşça indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Ağırlıkları indirirken 2–3 saniyede nefes alın, yukarı iterken nefes verin. Set bittiğinde dambılları yana fırlatmak yerine dizlerinizi kaldırıp uyluklarınızla oturur pozisyona dönün.'
      }
    ],
    cues: [
      'El bileklerinizi geriye bükmeden, ön kol kemiklerinizle aynı dikey doğrultuda tutun.',
      'Ayak tabanlarınızı hareket boyunca yerden kaldırmayın; bu destek gövde dengenizi korur.'
    ],
    commonMistakes: [
      {
        mistake: 'Tepe noktada dambılları birbirine hızla vurmak.',
        correction: 'Dambılları birbirine çarptırmak omuz dengesini bozar; ağırlıkları omuz genişliğinde paralel durdurun.'
      },
      {
        mistake: 'Dambılları omuz eklemini zorlayacak kadar kontrolsüzce derin indirmek.',
        correction: 'Dambıl saplarının göğüs hizasına yaklaştığı, omuz önünde ağrı değil kontrollü kas esnemesi hissettiğiniz derinlikte durun.'
      },
      {
        mistake: 'İtiş sırasında omuzları sehpada öne yuvarlamak.',
        correction: 'Hareketin sonunda bile kürek kemiklerinizin sehpaya temasını koruyun.'
      }
    ],
    programming: {
      beginner: '3 set × 8–12 tekrar',
      intermediate: '3–4 set × 8–12 tekrar',
      note: 'Her iki kol ayrı çalıştığı için dengeleyici kaslar halter prese göre daha erken yorulabilir; kontrol edebileceğiniz bir ağırlıkla başlayın.'
    },
    alternatives: {
      easier: 'dumbbell-floor-press',
      harder: 'barbell-bench-press',
      equipmentAlt: ['barbell-bench-press', 'push-up', 'chest-press-machine'],
      homeAlt: 'dumbbell-floor-press'
    },
    animation: {
      poseId: 'bench-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Düz sehpaya uzanan sporcunun dambılları göğüs hizasından yukarı doğru kontrollü biçimde itip indirmesini gösteren animasyon.',
      startLabel: 'Alt Esneme (Göğüs Hizası)',
      endLabel: 'Tepe İtiş (Kollar Uzun)'
    },
    editorialSource: 'NSCA Essentials of Strength Training and Conditioning'
  },
  {
    id: 'dumbbell-floor-press',
    slug: 'dumbbell-floor-press',
    trName: 'Yerde Dambıl Göğüs Pres',
    enName: 'Dumbbell Floor Press',
    aliases: ['floor press', 'yerde göğüs pres', 'sehpasız dambıl pres', 'evde dambıl göğüs'],
    shortDescription:
      'Antrenman sehpası gerektirmeden doğrudan yerde uygulanan, üst kolların zemine temasıyla omuz eklemini koruyan dambıl itiş hareketi.',
    primaryMuscleGroup: 'gogus',
    secondaryMuscleGroups: ['triceps', 'omuz'],
    primaryMuscles: ['Pectoralis Major (Orta Göğüs)', 'Triceps Brachii'],
    secondaryMuscles: ['Ön Omuz (Anterior Deltoid)'],
    stabilizerMuscles: ['Rotator Manşet', 'Core Sabitleyiciler'],
    subRegionTag: 'Orta Göğüs & Triceps (Sehpasız Ev Uygun)',
    equipment: ['dumbbell'],
    environments: ['ev', 'salon'],
    environmentNote: 'Sehpa gerektirmez; evde yalnızca bir çift dambıl ve mat ile güvenle uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Mat üzerine sırtüstü uzanın, dizlerinizi bükerek ayak tabanlarınızı yere basın. Dambılları göğüs hizasında kavrayın; üst kollarınızın arka kısmı yerde dinlensin, ön kollarınız yere dik olsun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Kürek kemiklerinizi zemine sabitleyerek dambılları göğsünüzün üzerine doğru dikey bir hatla yukarı itin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kollarınız tamamen uzandığında göğüs ve arka kol kaslarınızdaki kasılmayı kısa bir an koruyun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Dirseklerinizi yere çarptırmadan, üst kollarınızın arkası zemine yumuşakça değene kadar yavaşça indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Aşağı inerken nefes alın, zemine hafifçe dokunduktan sonra nefes vererek yukarı itin.'
      }
    ],
    cues: [
      'Zemin hareket açıklığını doğal olarak sınırlar; bu nedenle dirseklerinizi yere vurup sektirmemeye özen gösterin.',
      'Belinizi aşırı çukurlaştırmadan kaburgalarınızı dengede tutun.'
    ],
    commonMistakes: [
      {
        mistake: 'Dirsekleri zemine sertçe çarptırıp sekme kuvvetiyle ağırlığı kaldırmak.',
        correction: 'Üst kollarınız yere yumuşakça değsin, yarım saniye duraksayıp kas kuvvetiyle itin.'
      },
      {
        mistake: 'Bileklerin ağırlık altında geriye doğru bükülmesi.',
        correction: 'Dambıl sapını avuç tabanınıza yakın kavrayarak bileği düz tutun.'
      },
      {
        mistake: 'Ağırlıkları baş veya boyun hizasına doğru itmek.',
        correction: 'İtiş hattını her zaman orta göğüs kemiği hizasında tutun.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3–4 set × 8–12 tekrar (dipte 1 sn duraksamalı)',
      note: 'Evde bench bulunmayan kullanıcılar için en güvenli serbest ağırlık göğüs pres alternatifidir.'
    },
    alternatives: {
      easier: 'incline-push-up',
      harder: 'dumbbell-bench-press',
      equipmentAlt: ['push-up', 'dumbbell-bench-press', 'chest-press-machine'],
      homeAlt: 'push-up'
    },
    animation: {
      poseId: 'floor-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Zeminde sırtüstü yatan sporcunun üst kolları yere değene kadar dambılları indirip tekrar yukarı itmesini gösteren animasyon.',
      startLabel: 'Üst Kollar Zeminde',
      endLabel: 'Tepe İtiş'
    },
    editorialSource: 'NSCA & ACSM Ev Antrenmanı Uyarlamaları'
  },
  {
    id: 'dumbbell-fly',
    slug: 'dumbbell-fly',
    trName: 'Dambıl Göğüs Açış',
    enName: 'Dumbbell Fly',
    aliases: ['dumbbell chest fly', 'dambıl yana açış göğüs', 'kelebek dambıl', 'göğüs açış'],
    shortDescription:
      'Dirsek açısını sabit tutarak kolları gövde önünde geniş bir yay çizerek birleştiren, göğüs kaslarını izole eden hareket.',
    primaryMuscleGroup: 'gogus',
    secondaryMuscleGroups: ['omuz'],
    primaryMuscles: ['Pectoralis Major (Sternal / Orta Lifler)'],
    secondaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Biceps Brachii (İzometrik Dengeleyici)'],
    stabilizerMuscles: ['Rotator Manşet', 'Serratus Anterior'],
    subRegionTag: 'Orta Göğüs İzolasyon (Yatay Addüksiyon)',
    equipment: ['dumbbell', 'bench-sehpa'],
    environments: ['ev', 'salon'],
    environmentNote: 'Düz sehpa üzerinde uygulanır; omuz güvenliği için evde sehpasız zeminde de kısmi açıklıkla yapılabilir.',
    level: 'orta',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Düz sehpaya sırtüstü uzanın, dambılları avuç içleriniz birbirine bakacak (nötr) şekilde göğsünüzün üzerinde tutun ve dirseklerinizi hafifçe (yaklaşık 15–20 derece) bükün.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirsek bükülme açısını değiştirmeden, kollarınızı geniş bir ağaca sarılır gibi yanlara doğru kontrollü bir yay çizerek açın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Üst kollarınız gövde hizasına yaklaştığında ve göğüs kaslarınızda rahat bir gerilim hissettiğinizde inişi durdurun; omuz eklemini zorlayacak kadar aşağı sarkıtmayın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Aynı geniş yay yörüngesini koruyarak göğüs kaslarınızı sıkıştırıp kollarınızı tekrar göğüs üzerinde birleştirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Kolları açarken 2–3 saniyede nefes alın, kolları kapatırken nefes verin.'
      }
    ],
    cues: [
      'Bu bir pres hareketi değildir; ağırlık fazla geldiğinde dirsekleri 90 derece bükerek prese çevirmek yerine daha hafif bir dambıl seçin.',
      'Dip noktada dambılların omuz hizasından çok aşağı inmesine izin vermeyin.'
    ],
    commonMistakes: [
      {
        mistake: 'Ağır dambıl seçip omuz ön kapsülünü dip noktada aşırı zorlamak.',
        correction: 'Kontrollü durabileceğiniz orta-hafif bir ağırlık kullanın ve üst kolları gövde düzleminin altına indirmeyin.'
      },
      {
        mistake: 'Dirsekleri tamamen düz ve kilitli tutmak.',
        correction: 'Biceps tendonunu ve dirsek eklemini korumak için dirseklerde her zaman hafif, sabit bir bükülme bırakın.'
      },
      {
        mistake: 'Tepe noktada dambılları birbirine çarptırıp gerilimi sıfırlamak.',
        correction: 'Dambıllar omuz genişliğine yaklaştığında durun, böylece göğüs üzerindeki gerilim kesilmez.'
      }
    ],
    programming: {
      beginner: '2–3 set × 12–15 tekrar (hafif ağırlıkla form odaklı)',
      intermediate: '3 set × 10–15 tekrar',
      note: 'Uzun kaldıraç kolu nedeniyle pres hareketlerinde kullandığınız ağırlığın çok daha altında bir yük tercih edilmelidir.'
    },
    alternatives: {
      easier: 'cable-chest-fly',
      harder: 'dumbbell-bench-press',
      equipmentAlt: ['cable-chest-fly', 'push-up'],
      homeAlt: 'push-up'
    },
    animation: {
      poseId: 'chest-fly',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Sehpada yatan sporcunun hafif bükülü kollarını yanlara doğru yay çizerek açıp göğüs üzerinde birleştirmesini gösteren animasyon.',
      startLabel: 'Kollar Yukarıda',
      endLabel: 'Yanlara Geniş Açış'
    },
    editorialSource: 'NSCA Egzersiz Tekniği Kılavuzu'
  },
  {
    id: 'barbell-bench-press',
    slug: 'barbell-bench-press',
    trName: 'Halter Göğüs Pres',
    enName: 'Barbell Bench Press',
    aliases: ['bench press', 'barbell press', 'halter bench', 'düz bench press'],
    shortDescription:
      'Göğüs, ön omuz ve arka kol kaslarında yüksek kuvvet üretimi sağlayan, düz sehpada halterle yapılan klasik bileşik itiş hareketi.',
    primaryMuscleGroup: 'gogus',
    secondaryMuscleGroups: ['omuz', 'triceps'],
    primaryMuscles: ['Pectoralis Major (Orta ve Üst Lifler)'],
    secondaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Triceps Brachii'],
    stabilizerMuscles: ['Rotator Manşet', 'Latissimus Dorsi (Sırt Sabitlemesi)', 'Bacak ve Kalça Dengeleyicileri'],
    subRegionTag: 'Temel Yatay İtiş & Kuvvet',
    equipment: ['barbell', 'bench-sehpa'],
    environments: ['salon'],
    environmentNote: 'Güvenli uygulama için halter sehpası (rack), olimpik/standart bar ve mümkünse emniyet kolları gerektirir.',
    level: 'orta',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Sehpaya uzanın ve gözleriniz barın tam altına gelecek şekilde konumlanın. Ayaklarınızı yere sağlam basın, kürek kemiklerinizi geriye-aşağıya çekerek sehpaya sabitleyin ve barı omuz genişliğinden biraz daha açık kavrayın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Barı kancalardan çıkarıp omuz hizasına getirin. Dirseklerinizi gövdenizle yaklaşık 45–60 derece açıda tutarak barı kontrollü şekilde alt-orta göğüs kemiğinize doğru indirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Bar göğsünüze hafifçe temas ettiğinde (göğüs kafesinden sektirmeden) ön kollarınızın yere dik konumda olduğundan emin olun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ayaklarınızdan ve sırt sabitlemenizden destek alarak barı hafifçe yukarı ve omuz hizasına doğru geri itin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İniş öncesi derin nefes alıp gövdeyi sabitleyin, barı göğüsten yukarı iterken zorlu noktayı geçtikten sonra nefes verin.'
      }
    ],
    cues: [
      'Barı başparmaklarınızla tam sararak (kapalı tutuş) kavrayın; başparmaksız "intihar tutuşu" güvenlik açısından önerilmez.',
      'Ağır setlerde mutlaka emniyet barlarını ayarlayın veya bir gözlemci (spotter) ile çalışın.'
    ],
    commonMistakes: [
      {
        mistake: 'Barı göğüs kafesine hızla çarptırıp sektirerek kaldırmak.',
        correction: 'İnişi kontrollü yapın ve barın göğüse sadece yumuşakça dokunmasına izin verin.'
      },
      {
        mistake: 'Barı alt göğüs yerine boyun veya köprücük kemiği hizasına indirmek.',
        correction: 'Omuz sıkışmasını önlemek için barı hafif eğimli bir yörüngeyle alt-orta göğüs hizasına indirin.'
      },
      {
        mistake: 'İtiş sırasında kalçayı sehpadan havaya kaldırmak.',
        correction: 'Bacak itişini (leg drive) kalçayı sehpadan ayırmadan, geriye-sehpa içine doğru uygulayın.'
      }
    ],
    programming: {
      beginner: '3 set × 8–10 tekrar (boş bar veya hafif ağırlıkla teknik odaklı)',
      intermediate: '3–4 set × 6–10 tekrar',
      note: 'Serbest bar kullanımına yeni başlayanlar önce Dumbbell Bench Press veya Push-up ile omuz kontrolü kazanabilir.'
    },
    alternatives: {
      easier: 'dumbbell-bench-press',
      harder: 'incline-barbell-bench-press',
      equipmentAlt: ['dumbbell-bench-press', 'push-up', 'chest-press-machine'],
      homeAlt: 'push-up'
    },
    animation: {
      poseId: 'bench-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Sehpa üzerinde yatan sporcunun halter barını alt-orta göğüs hizasına indirip omuz hizasına geri itmesini gösteren animasyon.',
      startLabel: 'Bar Omuz Hizasında',
      endLabel: 'Bar Göğüs Hizasında'
    },
    editorialSource: 'NSCA & IPF Temel Bench Press Biyomekaniği'
  },
  {
    id: 'incline-barbell-bench-press',
    slug: 'incline-barbell-bench-press',
    trName: 'Eğimli Sehpada Üst Göğüs Halter Pres',
    enName: 'Incline Barbell Bench Press',
    aliases: ['incline bench press', 'üst göğüs pres', 'eğimli halter pres', 'incline press'],
    shortDescription:
      '15–30 derece eğimli sehpada uygulanarak göğsün üst (klaviküler) liflerini ve ön omuzu daha fazla devreye sokan bileşik itiş hareketi.',
    primaryMuscleGroup: 'gogus',
    secondaryMuscleGroups: ['omuz', 'triceps'],
    primaryMuscles: ['Pectoralis Major (Klaviküler / Üst Göğüs Lifleri)'],
    secondaryMuscles: ['Pectoralis Major (Orta Lifler)', 'Ön Omuz (Anterior Deltoid)', 'Triceps Brachii'],
    stabilizerMuscles: ['Rotator Manşet', 'Üst Sırt ve Kürek Kemiği Sabitleyicileri'],
    subRegionTag: 'Üst Göğüs (Klaviküler Odak)',
    equipment: ['barbell', 'bench-sehpa'],
    environments: ['salon'],
    environmentNote: 'Açı ayarlı sehpa ve halter istasyonu gerektirir.',
    level: 'orta',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Sehpa sırtlığını yaklaşık 15–30 derece eğime ayarlayın (çok dik açı yükü göğüsten omuza kaydırır). Uzanıp kürek kemiklerinizi geriye sabitleyin ve barı omuz genişliğinden biraz açık kavrayın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Barı yuvasından çıkarın ve dirseklerinizi hafifçe içeri alarak üst göğüs / köprücük kemiğinin hemen alt hizasına doğru kontrollü şekilde indirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Bar üst göğsünüze yaklaştığında ön kollarınızın yere dik kaldığından emin olun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Üst göğüs kaslarınızı sıkarak barı dikey bir hatla başlangıç noktasına itin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İnişte 2–3 saniyede nefes alın, yukarı iterken nefes verin.'
      }
    ],
    cues: [
      'Sehpa açısını 45 dereceden daha dik yapmak yerine 20–30 derece aralığında tutmak üst göğüs aktivasyonu için genellikle daha dengelidir.',
      'Düz bench prese kıyasla biraz daha düşük ağırlık kullanmak normaldir.'
    ],
    commonMistakes: [
      {
        mistake: 'Sehpayı 60 derece gibi çok dik ayarlayıp hareketi omuz presine dönüştürmek.',
        correction: 'Üst göğüs odağı için sehpayı 15–30 derece (genellikle 1. veya 2. kademe) eğimde kullanın.'
      },
      {
        mistake: 'Barı karın veya alt göğüs hizasına indirmek.',
        correction: 'Eğimli açıda bar yörüngesi üst göğse (köprücük kemiğinin birkaç parmak altına) inmeli ve oradan dikey çıkmalıdır.'
      },
      {
        mistake: 'Dirsekleri yanlara aşırı açmak.',
        correction: 'Dirsekleri gövdeye yaklaşık 45 derece açıda tutarak omuz ön eklemini koruyun.'
      }
    ],
    programming: {
      beginner: '3 set × 8–10 tekrar',
      intermediate: '3–4 set × 8–12 tekrar',
      note: 'Dambıl ile uygulamak isterseniz aynı sehpa açısında dambıl kullanarak da benzer üst göğüs etkisini yakalayabilirsiniz.'
    },
    alternatives: {
      easier: 'dumbbell-bench-press',
      harder: 'barbell-bench-press',
      equipmentAlt: ['dumbbell-bench-press', 'cable-chest-fly', 'push-up'],
      homeAlt: 'push-up'
    },
    animation: {
      poseId: 'incline-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        '30 derece eğimli sehpada uzanan sporcunun halteri üst göğüs hizasına indirip yukarı itmesini gösteren animasyon.',
      startLabel: 'Üstte Başlangıç',
      endLabel: 'Üst Göğüs Hizasına İniş'
    },
    editorialSource: 'Journal of Strength and Conditioning Research — Eğim Açısı ve Pektoral EMG Çalışmaları'
  },
  {
    id: 'cable-chest-fly',
    slug: 'cable-chest-fly',
    trName: 'Kablo Göğüs Sıkıştırma',
    enName: 'Cable Chest Fly',
    aliases: ['cable crossover', 'kablo göğüs açış', 'cable fly', 'makara göğüs sıkıştırma'],
    shortDescription:
      'Çift taraflı kablo istasyonunda hareket açıklığının her noktasında kesintisiz gerilim sağlayarak göğüs kaslarını çalıştıran izolasyon hareketi.',
    primaryMuscleGroup: 'gogus',
    secondaryMuscleGroups: ['omuz'],
    primaryMuscles: ['Pectoralis Major (Orta, Üst veya Alt Lifler — Makara Yüksekliğine Göre)'],
    secondaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Serratus Anterior'],
    stabilizerMuscles: ['Core ve Gövde Dengeleyicileri', 'Biceps Brachii (İzometrik)'],
    subRegionTag: 'Kesintisiz Gerilim Göğüs İzolasyon',
    equipment: ['kablo-makinesi'],
    environments: ['salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Her iki makarayı omuz veya göğüs hizasına ayarlayın. Tutamakları kavrayıp istasyonun ortasında bir ayağınız yarım adım önde olacak şekilde dengeli bir duruş alın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Gövdenizi sabit tutup dirseklerinizi hafif bükülü kilitleyerek kollarınızı göğsünüzün önünde geniş bir yay çizerek birleştirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Elleriniz göğüs önünde buluştuğunda 1 saniye boyunca göğüs kaslarınızı bilinçli olarak sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ağırlığın kollarınızı hızla geriye çekmesine izin vermeden, göğsünüzde kontrollü bir esneme hissedene kadar kollarınızı yanlara açın.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Kolları birleştirirken nefes verin, yanlara açarken 2–3 saniyede nefes alın.'
      }
    ],
    cues: [
      'Öne bir adım atarak durmak belinize binen yükü azaltır ve dengenizi artırır.',
      'Başlangıçta ellerinizin omuz çizginizin çok gerisine gitmesine izin vermeyin.'
    ],
    commonMistakes: [
      {
        mistake: 'Ağırlığı gövdeyle öne abanarak ve dirsekleri büküp iterek kaldırmak.',
        correction: 'Gövde açınızı sabit tutun ve hareketi sadece omuz eklemindeki sarılma yayından üretin.'
      },
      {
        mistake: 'Geri dönüşte kolları omuz hizasının çok arkasına kaçırmak.',
        correction: 'Dirsekleriniz gövde yan çizgisiyle aynı hizaya geldiğinde dönüşü durdurup yeni tekrara başlayın.'
      },
      {
        mistake: 'Omuzları kulaklara doğru kaldırmak.',
        correction: 'Göğsü dik, kürek kemiklerini hafifçe aşağıda ve sabit tutun.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 tekrar',
      intermediate: '3–4 set × 12–15 tekrar (tepede 1 sn sıkıştırmalı)',
      note: 'Dumbbell Fly hareketinden farklı olarak eller göğüs önünde birleştiğinde de kablo açısı sayesinde göğüs üzerindeki gerilim devam eder.'
    },
    alternatives: {
      easier: 'chest-press-machine',
      harder: 'dumbbell-fly',
      equipmentAlt: ['dumbbell-fly', 'push-up', 'chest-press-machine'],
      homeAlt: 'push-up'
    },
    animation: {
      poseId: 'cable-fly',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Kablo istasyonu ortasında duran sporcunun kollarını iki yandan gövde önüne doğru yay çizerek birleştirmesini gösteren animasyon.',
      startLabel: 'Kollar Yanda Açık',
      endLabel: 'Göğüs Önünde Birleşim'
    },
    editorialSource: 'ACE Egzersiz Kütüphanesi & Biyomekanik İncelemeler'
  },
  {
    id: 'chest-press-machine',
    slug: 'chest-press-machine',
    trName: 'Makinede Göğüs Pres',
    enName: 'Chest Press Machine',
    aliases: ['makine göğüs pres', 'seated chest press', 'göğüs itiş makinesi'],
    shortDescription:
      'Rehberli makine yörüngesi sayesinde denge ihtiyacını azaltarak göğüs, ön omuz ve triceps kaslarını güvenle çalıştıran oturarak itiş hareketi.',
    primaryMuscleGroup: 'gogus',
    secondaryMuscleGroups: ['omuz', 'triceps'],
    primaryMuscles: ['Pectoralis Major (Orta Göğüs)'],
    secondaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Triceps Brachii'],
    stabilizerMuscles: ['Serratus Anterior'],
    subRegionTag: 'Rehberli Göğüs İtişi (Başlangıç Dostu)',
    equipment: ['spor-salonu-makineleri'],
    environments: ['salon'],
    level: 'baslangic',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Koltuk yüksekliğini, tutamaklar orta-alt göğüs hizanıza gelecek şekilde ayarlayın. Sırtınızı mindere yaslayın, kürek kemiklerinizi geriye çekin ve ayaklarınızı yere basın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Tutamakları kavrayıp dirseklerinizi bileklerinizle aynı hizada tutarak kollarınızı ileri doğru itin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Dirseklerinizi sertçe kilitlemeden kollarınız uzayana kadar itin ve göğüs kaslarınızı hissedin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ağırlık plakalarını birbirine çarptırmadan, tutamaklar göğüs hizanıza yaklaşana kadar yavaşça geri dönün.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İterken nefes verin, kontrollü şekilde geri dönerken 2 saniyede nefes alın.'
      }
    ],
    cues: [
      'Koltuk çok alçaksa tutamaklar omuz hizasına çıkar ve omuz eklemini yorabilir; koltuğu mutlaka göğüs hizasına göre ayarlayın.',
      'İtiş sonunda omuzlarınızı minderde sabit tutun.'
    ],
    commonMistakes: [
      {
        mistake: 'Koltuk yüksekliğini ayarlamadan oturup omuz hizasından itiş yapmak.',
        correction: 'Tutamakların orta göğüs çizginizle aynı hizada olduğundan emin olun.'
      },
      {
        mistake: 'Her tekrarda ağırlık plakalarını bırakıp ses çıkaracak şekilde çarptırmak.',
        correction: 'Plakalar birbirine değmeden hemen önce durup yeni tekrara geçerek kas gerilimini koruyun.'
      },
      {
        mistake: 'Sırtı ve başı minderden ayırarak boynu öne uzatmak.',
        correction: 'Başınızı ve sırtınızı hareket boyunca sırt desteğinde sabit tutun.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3–4 set × 10–15 tekrar',
      note: 'Serbest ağırlıklara geçmeden önce temel itiş paternini ve göğüs hissiyatını öğrenmek için çok uygundur.'
    },
    alternatives: {
      easier: 'incline-push-up',
      harder: 'dumbbell-bench-press',
      equipmentAlt: ['dumbbell-bench-press', 'barbell-bench-press', 'push-up'],
      homeAlt: 'push-up'
    },
    animation: {
      poseId: 'machine-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Göğüs pres makinesinde oturan sporcunun tutamakları göğüs hizasından ileri doğru itip kontrollü geri getirmesini gösteren animasyon.',
      startLabel: 'Tutamaklar Göğüs Hizasında',
      endLabel: 'İleri Tam İtiş'
    },
    editorialSource: 'ACE & ACSM Makine Tabanlı Direnç Egzersizi Rehberi'
  },

  // =========================================================================
  // SIRT (9 HAREKET)
  // =========================================================================
  {
    id: 'pull-up',
    slug: 'pull-up',
    trName: 'Barfiks (Üstten Tutuş)',
    enName: 'Pull-up',
    aliases: ['barfiks', 'pullup', 'pull up', 'geniş tutuş barfiks', 'kanat çekiş'],
    shortDescription:
      'Avuç içleri karşıya bakacak şekilde barfiks barından asılarak vücudu yukarı çeken, kanat ve üst sırt kaslarını güçlü şekilde çalıştıran temel dikey çekiş hareketi.',
    primaryMuscleGroup: 'sirt',
    secondaryMuscleGroups: ['biceps', 'on-kol', 'karin-core'],
    primaryMuscles: ['Latissimus Dorsi (Kanat Kasları)', 'Teres Major'],
    secondaryMuscles: ['Trapezius (Orta ve Alt)', 'Rhomboideus', 'Biceps Brachii', 'Brachialis ve Brachioradialis'],
    stabilizerMuscles: ['Rectus Abdominis ve Derin Core', 'Ön Kol Kavrama Kasları'],
    subRegionTag: 'Dikey Çekiş & Kanat Genişliği',
    equipment: ['barfiks-bari', 'vucut-agirligi'],
    environments: ['ev', 'salon'],
    environmentNote: 'Spor salonunda veya evde güvenli şekilde sabitlenmiş bir barfiks barında uygulanır.',
    level: 'orta',
    movementPattern: 'cekis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Barı omuz genişliğinden biraz daha açık, avuç içleriniz karşıya bakacak (pronasyon) şekilde kavrayın. Kollarınız tamamen uzunken bacaklarınızı sabit tutarak asılın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Önce kürek kemiklerinizi aşağı ve geriye çekerek omuzlarınızı kulaklarınızdan uzaklaştırın, ardından dirseklerinizi kalçanıza doğru çekiyormuş gibi düşünerek gövdenizi yukarı yükseltin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Çeneniz bar hizasına yaklaştığında veya üst göğsünüz bara doğru yükseldiğinde sırt kaslarınızdaki kasılmayı hissedin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Kendinizi bir anda aşağı bırakmadan, 2–3 saniyede kollarınız tekrar uzayana kadar kontrollü şekilde inin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yukarı çekerken nefes verin, aşağı inerken kontrollü nefes alın.'
      }
    ],
    cues: [
      'Gövdenizi sallayarak (kipping) çıkmak yerine karın ve kalçanızı sıkarak sabit bir hat koruyun.',
      'Henüz tam barfiks çekemiyorsanız Assisted Pull-up veya Lat Pulldown ile kuvvet inşa edebilirsiniz.'
    ],
    commonMistakes: [
      {
        mistake: 'Bacakları savurarak ivmeyle yukarı çıkmak.',
        correction: 'Bacakları düz ve karın kaslarını aktif tutarak hareketi sırt kaslarınızla başlatın.'
      },
      {
        mistake: 'Çeneyi bara yetiştirmek için boynu aşırı yukarı uzatıp omuzları öne yuvarlamak.',
        correction: 'Göğsünüzü bara yaklaştırmayı hedefleyin ve omuzlarınızı geride tutun.'
      },
      {
        mistake: 'Alt noktaya kadar inmeden sadece üst yarıda kısa tekrarlar yapmak.',
        correction: 'Her tekrarda dirseklerin kontrollü biçimde açıldığı tam hareket açıklığını kullanın.'
      }
    ],
    programming: {
      beginner: 'Assisted Pull-up veya Inverted Row ile 3 set × 6–10 tekrar',
      intermediate: '3–4 set × 5–10 kontrollü tekrar',
      note: 'Vücut ağırlığının tamamını kaldırmayı gerektirdiği için tekrar sayıları kişiden kişiye büyük farklılık gösterir.'
    },
    alternatives: {
      easier: 'assisted-pull-up',
      harder: 'chin-up',
      equipmentAlt: ['lat-pulldown', 'assisted-pull-up', 'inverted-row'],
      homeAlt: 'resistance-band-row'
    },
    animation: {
      poseId: 'pullup',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Barfiks barından asılan sporcunun dirseklerini aşağı çekerek göğsünü ve çenesini bar hizasına yükseltmesini gösteren animasyon.',
      startLabel: 'Tam Asılış (Dead Hang)',
      endLabel: 'Tepe Çekiş (Çene Bar Üstü)'
    },
    editorialSource: 'NSCA & ACSM Üst Vücut Çekiş Biyomekaniği'
  },
  {
    id: 'assisted-pull-up',
    slug: 'assisted-pull-up',
    trName: 'Destekli Barfiks',
    enName: 'Assisted Pull-up',
    aliases: ['bant destekli barfiks', 'makinede destekli barfiks', 'kolay barfiks', 'band assisted pull-up'],
    shortDescription:
      'Direnç bandı veya destekli barfiks makinesi yardımıyla vücut ağırlığının bir kısmını hafifleterek doğru barfiks tekniğini öğreten dikey çekiş hareketi.',
    primaryMuscleGroup: 'sirt',
    secondaryMuscleGroups: ['biceps', 'on-kol', 'karin-core'],
    primaryMuscles: ['Latissimus Dorsi (Kanat Kasları)', 'Teres Major'],
    secondaryMuscles: ['Orta ve Alt Trapezius', 'Rhomboideus', 'Biceps Brachii'],
    stabilizerMuscles: ['Core Kasları', 'Ön Kol Kavrama Kasları'],
    subRegionTag: 'Dikey Çekiş (Başlangıç Geçişi)',
    equipment: ['barfiks-bari', 'direnc-bandi'],
    environments: ['ev', 'salon'],
    environmentNote: 'Evde veya salonda barfiks barına bağlanan kapalı halka direnç bandıyla ya da salondaki destekli barfiks makinesinde uygulanır.',
    level: 'baslangic',
    movementPattern: 'cekis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Uzun halka direnç bandını barfiks barının ortasına düğümleyip sabitleyin. Ayağınızı veya dizinizi bandın alt halkasına yerleştirin ve barı omuz genişliğinden biraz açık kavrayın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Kürek kemiklerinizi aşağı çekerek hareketi başlatın ve bandın dip noktada sağladığı destekle göğsünüzü bara doğru çekin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Çeneniz bar hizasına geldiğinde omuzlarınızı kulaklarınızdan uzak tutarak 1 saniye bekleyin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Bandın sizi hızla bırakmasına izin vermeden kollarınız uzayana kadar kontrollü şekilde aşağı inin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yukarı çekerken nefes verin, inişte 2–3 saniyede nefes alın.'
      }
    ],
    cues: [
      'Set bittiğinde ayağınızı banttan çıkarırken bandın hızla yukarı fırlamamasına dikkat edin; önce bir ayağınızla sağlam bir basamağa basın.',
      'Kuvvetiniz arttıkça daha ince bir direnç bandına geçerek desteği azaltabilirsiniz.'
    ],
    commonMistakes: [
      {
        mistake: 'Ayağı banttan dikkatsizce çıkarıp bandın yüze doğru fırlamasına yol açmak.',
        correction: 'Set sonunda önce serbest ayağınızla kutu/basamak üzerine basın, bandı elinizle tutarak diğer ayağınızı çıkarın.'
      },
      {
        mistake: 'Gereğinden kalın bant seçip hiç sırt eforu harcamadan yaylanmak.',
        correction: 'Son 2 tekrarın sizi tatlı şekilde zorlayacağı direnç seviyesinde bir bant seçin.'
      },
      {
        mistake: 'Bant içindeki bacağı gevşek bırakıp kalçayı bükmek.',
        correction: 'Bandın içindeki bacağınızı düz bastırarak gövde hattınızı dik tutun.'
      }
    ],
    programming: {
      beginner: '3 set × 8–10 tekrar',
      intermediate: '3 set × 8–12 tekrar (ince bant ile)',
      note: 'Serbest barfikse geçiş sürecinde en etkili köprü hareketlerinden biridir.'
    },
    alternatives: {
      easier: 'lat-pulldown',
      harder: 'pull-up',
      equipmentAlt: ['lat-pulldown', 'inverted-row', 'resistance-band-row'],
      homeAlt: 'resistance-band-row'
    },
    animation: {
      poseId: 'pullup',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Direnç bandı desteğiyle barfiks barında kendini yukarı çeken ve kontrollü inen sporcuyu gösteren animasyon.',
      startLabel: 'Bant Destekli Asılış',
      endLabel: 'Tepe Çekiş'
    },
    editorialSource: 'NSCA Kuvvet İlerleme Rehberi'
  },
  {
    id: 'chin-up',
    slug: 'chin-up',
    trName: 'Alttan Tutuş Barfiks',
    enName: 'Chin-up',
    aliases: ['chin up', 'chinup', 'ters tutuş barfiks', 'biceps barfiks'],
    shortDescription:
      'Avuç içleri kendinize bakacak şekilde omuz genişliğinde tutuşla yapılan, kanat kaslarıyla birlikte biceps kaslarını da güçlü biçimde devreye sokan barfiks varyasyonu.',
    primaryMuscleGroup: 'sirt',
    secondaryMuscleGroups: ['biceps', 'on-kol', 'karin-core'],
    primaryMuscles: ['Latissimus Dorsi (Kanat Kasları)', 'Biceps Brachii'],
    secondaryMuscles: ['Teres Major', 'Alt ve Orta Trapezius', 'Brachialis'],
    stabilizerMuscles: ['Rectus Abdominis', 'Ön Kol Kavrama Kasları'],
    subRegionTag: 'Kanat & Biceps Odaklı Dikey Çekiş',
    equipment: ['barfiks-bari', 'vucut-agirligi'],
    environments: ['ev', 'salon'],
    level: 'orta',
    movementPattern: 'cekis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Barı omuz genişliğinde veya biraz daha dar, avuç içleriniz size bakacak (süpinasyon) şekilde kavrayın ve kollarınız uzun olacak şekilde asılın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Omuzlarınızı aşağı bastırıp dirseklerinizi gövdenizin ön-yan kısmından aşağı doğru çekerek kendinizi yukarı kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Üst göğsünüz bara yaklaştığında ve çeneniz barı geçtiğinde hem sırt hem de biceps kaslarınızdaki kasılmayı hissedin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Dirseklerinizi aniden bırakmadan 2–3 saniyede tam asılış pozisyonuna geri inin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yukarı çıkarken nefes verin, aşağı inerken kontrollü nefes alın.'
      }
    ],
    cues: [
      'Biceps kasları daha avantajlı bir açıda çalıştığı için çoğu kişi Chin-up hareketini klasik Pull-up hareketinden biraz daha rahat uygulayabilir.',
      'El bilekleriniz düz barda rahatsız oluyorsa birbirine bakan paralel (nötr) tutamakları da deneyebilirsiniz.'
    ],
    commonMistakes: [
      {
        mistake: 'Sadece kolları büküp kürek kemiklerini hiç hareket ettirmemek.',
        correction: 'Çekişin başında kürek kemiklerinizi aşağı çekerek sırt kaslarınızı harekete dahil edin.'
      },
      {
        mistake: 'Alt noktada dirsekleri yarı bükülü bırakmak.',
        correction: 'Biceps tendonlarını ani yükten korumak için kontrollü şekilde tam uzanışa inin.'
      },
      {
        mistake: 'Omuzları tepe noktada öne doğru kapatmak.',
        correction: 'Göğsünüzü açık tutarak barı köprücük kemiğinize yaklaştırın.'
      }
    ],
    programming: {
      beginner: 'Assisted varyasyon ile 3 set × 6–10 tekrar',
      intermediate: '3–4 set × 6–10 tekrar',
      note: 'Hem sırt hem de ön kol üstü (biceps) için en verimli çok eklemli hareketlerden biridir.'
    },
    alternatives: {
      easier: 'assisted-pull-up',
      harder: 'pull-up',
      equipmentAlt: ['lat-pulldown', 'inverted-row'],
      homeAlt: 'assisted-pull-up'
    },
    animation: {
      poseId: 'pullup',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Avuç içleri kendine dönük tutuşla barfiks barında gövdesini yukarı çeken sporcuyu gösteren animasyon.',
      startLabel: 'Alttan Tutuş Asılış',
      endLabel: 'Göğüs Bara Yakın'
    },
    editorialSource: 'NSCA Egzersiz Tekniği Rehberi'
  },
  {
    id: 'inverted-row',
    slug: 'inverted-row',
    trName: 'Yatay Vücut Çekişi (Avustralya Barfiksi)',
    enName: 'Inverted Row',
    aliases: ['bodyweight row', 'avustralya barfiksi', 'yatay barfiks', 'ters şınav çekiş'],
    shortDescription:
      'Bel hizasına sabitlenmiş bir barın altına uzanarak göğsü bara doğru çeken, orta sırt ve kürek kemiği kontrolünü geliştiren vücut ağırlığı çekişi.',
    primaryMuscleGroup: 'sirt',
    secondaryMuscleGroups: ['biceps', 'omuz', 'karin-core'],
    primaryMuscles: ['Trapezius (Orta ve Alt)', 'Rhomboideus', 'Latissimus Dorsi'],
    secondaryMuscles: ['Arka Omuz (Posterior Deltoid)', 'Biceps Brachii', 'Brachioradialis'],
    stabilizerMuscles: ['Erector Spinae', 'Gluteus Maximus', 'Rectus Abdominis'],
    subRegionTag: 'Orta Sırt & Kürek Kemiği Kontrolü',
    equipment: ['barbell', 'vucut-agirligi'],
    environments: ['salon', 'ev'],
    environmentNote: 'Güç kafesine (rack) yerleştirilmiş sabit bir halter barında, Smith makinesinde veya parklardaki alçak paralel barlarda uygulanır.',
    level: 'baslangic',
    movementPattern: 'cekis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Bel veya kalça hizasına sabitlenmiş barın altına uzanın. Barı omuz genişliğinden biraz açık kavrayın; topuklarınız yerde, vücudunuz baştan topuğa düz bir çizgi olsun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Kalçanızı ve karnınızı sıkarak gövdenizi düz tutun. Kürek kemiklerinizi birbirine yaklaştırarak göğsünüzü bara doğru çekin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Göğsünüz bara yaklaştığında veya değdiğinde üst sırtınızı 1 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Kollarınız tamamen uzayana kadar vücudunuzu tek parça halinde kontrollü biçimde aşağı indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Kendinizi bara çekerken nefes verin, aşağı inerken 2 saniyede nefes alın.'
      }
    ],
    cues: [
      'Dizlerinizi büküp ayak tabanlarınızı yere basarsanız hareket kolaylaşır; bacaklarınızı düz uzatırsanız zorlaşır.',
      'Barı kancalara yerleştirdiğinizde çekiş yönünüzün barı kancalara doğru bastırdığından (dışarı çıkarmadığından) mutlaka emin olun.'
    ],
    commonMistakes: [
      {
        mistake: 'Kalçayı aşağı sarkıtıp sadece kollarla çekiş yapmak.',
        correction: 'Plank yapar gibi kalça ve karın kaslarınızı sıkarak gövdenizi düz bir hat halinde yükseltin.'
      },
      {
        mistake: 'Göğsü bara yaklaştırmak yerine başı ve çeneyi öne uzatmak.',
        correction: 'Boynunuzu nötr tutun ve göğüs kemiğinizi bara yaklaştırmaya odaklanın.'
      },
      {
        mistake: 'Barı kancaların açık tarafına doğru çekmek.',
        correction: 'Güvenlik için her zaman barı J-kancaların kapalı sırt kısmına doğru çekecek yönde altına girin.'
      }
    ],
    programming: {
      beginner: '3 set × 8–12 tekrar (dizler bükülü veya bar daha yüksekte)',
      intermediate: '3–4 set × 10–15 tekrar (bacaklar düz)',
      note: 'Şınavın tam zıt (çekiş) karşılığıdır; omuz sağlığı için mükemmel bir dengeleyicidir.'
    },
    alternatives: {
      easier: 'resistance-band-row',
      harder: 'pull-up',
      equipmentAlt: ['seated-cable-row', 'one-arm-dumbbell-row', 'resistance-band-row'],
      homeAlt: 'resistance-band-row'
    },
    animation: {
      poseId: 'inverted-row',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Alçak barın altında topukları yerde asılı duran sporcunun gövdesini düz tutarak göğsünü bara doğru çekmesini gösteren animasyon.',
      startLabel: 'Altta Kollar Uzun',
      endLabel: 'Göğüs Bara Yakın'
    },
    editorialSource: 'NSCA & ACE Yatay Çekiş Rehberi'
  },
  {
    id: 'one-arm-dumbbell-row',
    slug: 'one-arm-dumbbell-row',
    trName: 'Tek Kol Dambıl Sırt Çekiş',
    enName: 'One-arm Dumbbell Row',
    aliases: ['tek kol dambıl row', 'dumbbell row', 'testere hareketi', 'sehpa destekli dambıl çekiş'],
    shortDescription:
      'Boştaki el ile sehpadan destek alarak bel üzerindeki yükü azaltan, kanat ve orta sırt kaslarını sağ-sol bağımsız çalıştıran temel çekiş hareketi.',
    primaryMuscleGroup: 'sirt',
    secondaryMuscleGroups: ['biceps', 'omuz', 'on-kol'],
    primaryMuscles: ['Latissimus Dorsi (Kanat Kası)', 'Trapezius (Orta)', 'Rhomboideus'],
    secondaryMuscles: ['Arka Omuz (Posterior Deltoid)', 'Biceps Brachii', 'Brachialis'],
    stabilizerMuscles: ['Core Anti-Rotasyon Kasları', 'Erector Spinae'],
    subRegionTag: 'Kanat & Orta Sırt (Tek Taraflı)',
    equipment: ['dumbbell', 'bench-sehpa'],
    environments: ['ev', 'salon'],
    environmentNote: 'Sehpa üzerinde veya evde elinizi sabit bir koltuk/masa kenarına dayayarak üç nokta destekli duruşla uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'cekis',
    mechanic: 'bilesik',
    laterality: 'tek-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Sol elinizi ve dilerseniz sol dizinizi düz sehpaya yerleştirin, sağ ayağınızı yere sağlam basın. Sırtınızı yere paralel ve düz tutarak sağ elinizle dambılı aşağı sarkıtın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dambılı doğrudan yukarı, omuzunuza doğru değil; dirseğinizi geriye ve kalça cebinize doğru bir yay çizerek çekin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Üst kolunuz gövde hizasını hafifçe geçtiğinde sırtınızın yan ve orta kısmındaki sıkışmayı hissedin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Gövdenizi döndürmeden dambılı başlangıçtaki uzun pozisyona yavaşça indirin ve kürek kemiğinizin kontrollü esnemesine izin verin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Çekerken nefes verin, indirirken 2 saniyede nefes alın. Bir kolu tamamladıktan sonra diğer kola geçin.'
      }
    ],
    cues: [
      'Ağırlığı elinizle değil, dirseğinizin arkasıyla geriye itiyormuş gibi düşünün; bu odak yükü bicepsten sırt kaslarına aktarır.',
      'Destek aldığınız kolun omuzunu çökertmeyin; sehpayı aktif olarak itin.'
    ],
    commonMistakes: [
      {
        mistake: 'Ağırlığı çekerken gövdeyi hızla yana döndürüp çekiştirme yapmak.',
        correction: 'Omuzlarınızı ve kalçanızı yere paralel sabit tutarak sadece kol ve kürek kemiğini hareket ettirin.'
      },
      {
        mistake: 'Dambılı kalça yerine omuz/göğüs yanına doğru dik çekip ön kolu yormak.',
        correction: 'Kanat kaslarını daha iyi hedeflemek için dambılı hafif geriye, kalça hizasına doğru yönlendirin.'
      },
      {
        mistake: 'Sırtı kamburlaştırmak.',
        correction: 'Kalçayı hafif geriye verip göğsü karşıya-yere doğru açık tutarak omurgayı nötr koruyun.'
      }
    ],
    programming: {
      beginner: '3 set × her kol için 10–12 tekrar',
      intermediate: '3–4 set × her kol için 8–12 tekrar',
      note: 'Zayıf olan tarafınızla sete başlamak ve güçlü tarafta da aynı tekrar sayısını yapmak simetriyi korur.'
    },
    alternatives: {
      easier: 'resistance-band-row',
      harder: 'barbell-bent-over-row',
      equipmentAlt: ['barbell-bent-over-row', 'seated-cable-row', 'resistance-band-row'],
      homeAlt: 'resistance-band-row'
    },
    animation: {
      poseId: 'one-arm-row',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Bir eliyle sehpadan destek alan sporcunun diğer elindeki dambılı kalça hizasına doğru geriye çekip indirmesini gösteren animasyon.',
      startLabel: 'Kol Aşağıda Uzun',
      endLabel: 'Dirsek Geride (Kalça Hizası)'
    },
    editorialSource: 'NSCA Essentials of Strength Training and Conditioning'
  },
  {
    id: 'barbell-bent-over-row',
    slug: 'barbell-bent-over-row',
    trName: 'Eğilerek Halter Sırt Çekiş',
    enName: 'Barbell Bent-over Row',
    aliases: ['barbell row', 'bent over row', 'halter row', 'eğilerek halter çekiş'],
    shortDescription:
      'Kalça menteşesi pozisyonunda öne eğilerek halterin karın/alt göğüs hizasına çekildiği, tüm üst sırt, kanat ve arka zincir kaslarını güçlendiren temel hareket.',
    primaryMuscleGroup: 'sirt',
    secondaryMuscleGroups: ['biceps', 'omuz', 'arka-bacak', 'karin-core'],
    primaryMuscles: ['Latissimus Dorsi', 'Trapezius (Orta ve Alt)', 'Rhomboideus'],
    secondaryMuscles: ['Arka Omuz (Posterior Deltoid)', 'Erector Spinae (Omurga Destek Kasları)', 'Biceps Brachii'],
    stabilizerMuscles: ['Hamstring ve Kalça (Menteşe Sabitleyicileri)', 'Derin Karın Kasları'],
    subRegionTag: 'Tüm Sırt Kalınlığı & Arka Zincir Kuvveti',
    equipment: ['barbell'],
    environments: ['salon'],
    level: 'orta',
    movementPattern: 'cekis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    featured: true,
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızı kalça genişliğinde açın, barı omuz genişliğinden biraz açık kavrayın. Dizlerinizi hafifçe büküp kalçanızı geriye iterek gövdenizi yere 30–45 derece yaklaşacak şekilde öne eğin; sırtınız düz olsun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Karın kaslarınızı sıkarak gövde açınızı sabitleyin. Dirseklerinizi geriye çekerek barı bacaklarınıza yakın bir hatla alt göğüs veya üst karın bölgenize doğru çekin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Bar gövdenize temas ettiğinde kürek kemiklerinizi birbirine yaklaştırarak sırtınızı sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Gövdenizi dikleştirmeden barı diz hizanıza doğru kontrollü şekilde indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Çekiş öncesi ve sırasında gövde içi basıncı koruyun; tepe noktada nefes verip inişte nefes alın.'
      }
    ],
    cues: [
      'Beli korumak için ağırlığı belinizden eğilerek değil, kalçanızı geriye menteşe yaparak (RDL duruşu gibi) taşıyın.',
      'Bel yorgunluğu hissediyorsanız destekli One-arm Dumbbell Row veya Seated Cable Row tercih edebilirsiniz.'
    ],
    commonMistakes: [
      {
        mistake: 'Ağır kiloyla gövdeyi her tekrarda yukarı kaldırıp indirerek ivme kullanmak.',
        correction: 'Ağırlığı azaltıp gövde açısını hareket boyunca sabit tutun.'
      },
      {
        mistake: 'Bel ve sırtı yuvarlayarak barı taşımak.',
        correction: 'Göğsü karşıya-yere doğru açık tutun ve kalçayı geriye iterek arka bacaklardan destek alın.'
      },
      {
        mistake: 'Barı vücuttan çok uzakta tutmak.',
        correction: 'Barı uyluklarınıza yakın bir yörüngede hareket ettirerek bel üzerindeki kaldıracı azaltın.'
      }
    ],
    programming: {
      beginner: 'Önce One-arm Dumbbell Row veya Seated Cable Row önerilir',
      intermediate: '3–4 set × 8–10 tekrar',
      note: 'Alt sırt dayanıklılığı sınırlayıcı faktör olabileceği için teknik bozulduğunda seti sonlandırın.'
    },
    alternatives: {
      easier: 'one-arm-dumbbell-row',
      harder: 'pull-up',
      equipmentAlt: ['one-arm-dumbbell-row', 'seated-cable-row', 'inverted-row', 'resistance-band-row'],
      homeAlt: 'one-arm-dumbbell-row'
    },
    animation: {
      poseId: 'bent-over-row',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Kalçadan öne eğilmiş düz sırtlı sporcunun halter barını diz hizasından üst karın bölgesine doğru çekip indirmesini gösteren animasyon.',
      startLabel: 'Menteşe Duruşu (Bar Aşağıda)',
      endLabel: 'Bar Gövdeye Çekili'
    },
    editorialSource: 'NSCA Kuvvet Antrenmanı Temelleri'
  },
  {
    id: 'lat-pulldown',
    slug: 'lat-pulldown',
    trName: 'Göğse Çekiş Makinesi',
    enName: 'Lat Pulldown',
    aliases: ['lat pulldown', 'kanat çekiş makinesi', 'üstten göğse çekiş', 'pulldown'],
    shortDescription:
      'Kablo istasyonunda dizleri ped altına sabitleyerek üstteki barı üst göğse doğru çeken, kanat kaslarını her seviyede güvenle çalıştıran dikey çekiş hareketi.',
    primaryMuscleGroup: 'sirt',
    secondaryMuscleGroups: ['biceps', 'omuz', 'on-kol'],
    primaryMuscles: ['Latissimus Dorsi (Kanat Kasları)', 'Teres Major'],
    secondaryMuscles: ['Alt ve Orta Trapezius', 'Rhomboideus', 'Biceps Brachii'],
    stabilizerMuscles: ['Rotator Manşet', 'Core Sabitleyiciler'],
    subRegionTag: 'Dikey Kanat Çekişi (Ayarlanabilir Yük)',
    equipment: ['kablo-makinesi', 'spor-salonu-makineleri'],
    environments: ['salon'],
    level: 'baslangic',
    movementPattern: 'cekis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Uyluk pedini dizlerinizi sıkıca sabitleyecek yüksekliğe ayarlayın. Barı omuz genişliğinden biraz daha açık, avuç içleri karşıya bakacak şekilde kavrayıp oturun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Göğsünüzü yukarı kaldırıp gövdenizi çok hafif (10–15 derece) geriye yaslayın. Kürek kemiklerinizi aşağı bastırıp dirseklerinizi yanlardan aşağı doğru çekerek barı üst göğsünüze yaklaştırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Bar köprücük kemiği / üst göğüs hizanıza geldiğinde kanat kaslarınızı 1 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Gövdenizi sallamadan kollarınız yukarıda tamamen uzayana kadar barı kontrollü şekilde bırakın.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Barı göğsünüze çekerken nefes verin, yukarı salarken 2–3 saniyede nefes alın.'
      }
    ],
    cues: [
      'Barı kesinlikle ense arkasına çekmeyin; enseye çekiş omuz eklemini ve boyun omurlarını gereksiz yere zorlar, her zaman üst göğse çekin.',
      'Bileklerinizi bükmeyin, ellerinizi sadece birer kanca gibi kullanıp çekişi dirseklerden başlatın.'
    ],
    commonMistakes: [
      {
        mistake: 'Barı ense arkasına (boyun arkasına) doğru çekmek.',
        correction: 'Omuz sağlığı ve daha iyi kanat aktivasyonu için barı her zaman ön taraftan üst göğüs hizasına çekin.'
      },
      {
        mistake: 'Gövdeyle geriye doğru yatıp kalkarak ağırlığı bel ivmesiyle çekmek.',
        correction: 'Gövde açınızı hafif geride sabit tutun ve hareketi sadece kol-kürek kemiği hattından yapın.'
      },
      {
        mistake: 'Barı karın hizasına kadar aşırı aşağı bastırıp omuzları öne yuvarlamak.',
        correction: 'Çekişi üst göğüs / köprücük kemiği hizasında tamamlayın.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3–4 set × 8–12 tekrar',
      note: 'Barfiks kuvvetini geliştirmek isteyenler için en doğrudan makine alternatifidir.'
    },
    alternatives: {
      easier: 'resistance-band-row',
      harder: 'pull-up',
      equipmentAlt: ['pull-up', 'assisted-pull-up', 'seated-cable-row'],
      homeAlt: 'assisted-pull-up'
    },
    animation: {
      poseId: 'lat-pulldown',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Lat pulldown istasyonunda oturan sporcunun üstteki geniş barı üst göğüs hizasına doğru çekip kontrollü yukarı bırakmasını gösteren animasyon.',
      startLabel: 'Kollar Yukarıda Uzun',
      endLabel: 'Bar Üst Göğüste'
    },
    editorialSource: 'ACSM & NSCA Güvenli Lat Pulldown Tekniği'
  },
  {
    id: 'seated-cable-row',
    slug: 'seated-cable-row',
    trName: 'Oturarak Kablo Sırt Çekiş',
    enName: 'Seated Cable Row',
    aliases: ['cable row', 'oturarak makara çekiş', 'seated row', 'kürek çekiş'],
    shortDescription:
      'Oturarak yatay kablo istasyonunda uygulanan, orta sırt kalınlığını, kanat kaslarını ve dik duruş kaslarını dengeli şekilde çalıştıran çekiş hareketi.',
    primaryMuscleGroup: 'sirt',
    secondaryMuscleGroups: ['biceps', 'omuz', 'on-kol'],
    primaryMuscles: ['Trapezius (Orta ve Alt)', 'Rhomboideus', 'Latissimus Dorsi'],
    secondaryMuscles: ['Arka Omuz (Posterior Deltoid)', 'Biceps Brachii', 'Erector Spinae (İzometrik)'],
    stabilizerMuscles: ['Core Kasları', 'Hamstring ve Kalça Sabitleyicileri'],
    subRegionTag: 'Yatay Çekiş & Orta Sırt',
    equipment: ['kablo-makinesi'],
    environments: ['salon'],
    level: 'baslangic',
    movementPattern: 'cekis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızı platforma yerleştirin, dizlerinizi hafif bükülü tutun. V-tutamak veya geniş barı kavrayarak gövdenizi dik konuma getirin; göğsünüz açık, sırtınız düz olsun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Gövdenizi geriye savurmadan, kürek kemiklerinizi birbirine yaklaştırıp dirseklerinizi geriye çekerek tutamağı alt göğüs / üst karın hizanıza getirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Dirsekleriniz gövde yanını geçtiğinde omuzlarınızı aşağıda tutarak sırtınızın ortasını 1 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Belinizi kamburlaştırmadan kollarınızı ileri uzatın ve kürek kemiklerinizin hafifçe açılmasına izin verin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Tutamağı kendinize çekerken nefes verin, ileri uzatırken 2 saniyede nefes alın.'
      }
    ],
    cues: [
      'Gövdeniz bir sarkaç gibi öne-arkaya sallanmamalı; omurganızı yere neredeyse dik ve sabit koruyun.',
      'Omuzlarınızın kulaklarınıza doğru kalkmasına izin vermeyin.'
    ],
    commonMistakes: [
      {
        mistake: 'Her tekrarda belden aşırı öne kapanıp geriye yatarak ağırlığı çekmek.',
        correction: 'Bel disklerini korumak ve yükü sırtta tutmak için gövdeyi sabit dik pozisyonda koruyun.'
      },
      {
        mistake: 'Çekiş sonunda omuzları öne yuvarlamak.',
        correction: 'Göğsü karşıya doğru çıkarıp kürek kemiklerini geride birleştirin.'
      },
      {
        mistake: 'Dizleri tamamen kilitleyip arka bacakları germek.',
        correction: 'Dizlerde her zaman rahat ve sabit bir bükülme bırakın.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3–4 set × 10–12 tekrar',
      note: 'Dar V-tutamak kanatların alt-orta kısmını, daha geniş tutamak ise üst sırt ve arka omuzu biraz daha fazla vurgular.'
    },
    alternatives: {
      easier: 'resistance-band-row',
      harder: 'barbell-bent-over-row',
      equipmentAlt: ['one-arm-dumbbell-row', 'resistance-band-row', 'inverted-row'],
      homeAlt: 'resistance-band-row'
    },
    animation: {
      poseId: 'seated-row',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Oturarak kablo istasyonunda dik gövdeyle tutamağı karnına doğru çeken ve kontrollü uzatan sporcuyu gösteren animasyon.',
      startLabel: 'Kollar İleride Uzun',
      endLabel: 'Dirsekler Geride (Sıkıştırma)'
    },
    editorialSource: 'ACE & NSCA Kablo Egzersizleri Rehberi'
  },
  {
    id: 'resistance-band-row',
    slug: 'resistance-band-row',
    trName: 'Direnç Bandı ile Sırt Çekiş',
    enName: 'Resistance Band Row',
    aliases: ['bant row', 'lastikle sırt çekiş', 'evde sırt hareketi', 'band seated row'],
    shortDescription:
      'Evde direnç bandını ayak tabanlarına veya sabit bir noktaya geçirerek yapılan, sırt ve kürek kemiği çevresi kaslarını güvenle çalıştıran yatay çekiş hareketi.',
    primaryMuscleGroup: 'sirt',
    secondaryMuscleGroups: ['omuz', 'biceps'],
    primaryMuscles: ['Trapezius (Orta ve Alt)', 'Rhomboideus', 'Latissimus Dorsi'],
    secondaryMuscles: ['Arka Omuz (Posterior Deltoid)', 'Biceps Brachii'],
    stabilizerMuscles: ['Erector Spinae', 'Core Sabitleyiciler'],
    subRegionTag: 'Ev Dostu Yatay Sırt Çekişi',
    equipment: ['direnc-bandi'],
    environments: ['ev', 'salon'],
    environmentNote: 'Oturarak bandı ayak tabanlarınıza geçirerek hiçbir sabitleme noktası olmadan da evde güvenle uygulayabilirsiniz.',
    level: 'baslangic',
    movementPattern: 'cekis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Yere oturun, bacaklarınızı hafif bükülü uzatın ve direnç bandını ayak tabanlarınızın ortasından sağlamca geçirin (veya göğüs hizasında sağlam bir noktaya sabitleyin). Sırtınızı dikleştirin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Omuzlarınızı aşağı bastırıp dirseklerinizi gövdenizin yanından geriye doğru çekin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Elleriniz alt kaburga hizasına geldiğinde kürek kemiklerinizi birbirine yaklaştırıp 1–2 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Bandın kollarınızı hızla öne çekmesine izin vermeden yavaşça başlangıç pozisyonuna dönün.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Geriye çekerken nefes verin, tepe noktada 1 saniye bekleyin ve dönerken nefes alın.'
      }
    ],
    cues: [
      'Bandı ayak tabanınıza geçiriyorsanız bandın kayıp yüzünüze gelmemesi için tam ayak çukuruna oturduğundan emin olun.',
      'Bandın direnci çekişin sonunda en yüksek seviyeye ulaştığı için tepe noktada 1–2 saniye duraksamak verimi çok artırır.'
    ],
    commonMistakes: [
      {
        mistake: 'Bandı sadece ayak parmak uçlarına takıp kayma riski oluşturmak.',
        correction: 'Bandı ayakkabı tabanının veya ayağın tam orta çukuruna yerleştirin ve ayak bileklerinizi sabit tutun.'
      },
      {
        mistake: 'Omuzları kulaklara çekerek boyun kaslarını sıkıştırmak.',
        correction: 'Göğsü dik tutup dirsekleri aşağı-geriye doğru yönlendirin.'
      },
      {
        mistake: 'Dönüş fazında bandı bir anda gevşetmek.',
        correction: 'Negatif fazı 2 saniyede kontrollü tamamlayın.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 tekrar',
      intermediate: '3–4 set × 15–20 tekrar (tepede 2 sn sıkıştırmalı)',
      note: 'Evde sırt çalışmak isteyenler için en erişilebilir ve güvenli temel harekettir.'
    },
    alternatives: {
      easier: 'bird-dog',
      harder: 'one-arm-dumbbell-row',
      equipmentAlt: ['seated-cable-row', 'one-arm-dumbbell-row', 'inverted-row'],
      homeAlt: 'one-arm-dumbbell-row'
    },
    animation: {
      poseId: 'band-row',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ayaklarına veya karşı noktaya sabitli direnç bandını dik gövdeyle geriye doğru çeken sporcuyu gösteren animasyon.',
      startLabel: 'Bant Gergin (Kollar Uzun)',
      endLabel: 'Kürek Kemikleri Sıkışık'
    },
    editorialSource: 'ACSM Evde Direnç Bandı Antrenman Kılavuzu'
  },

  // =========================================================================
  // OMUZ (15 HAREKET — TÜM ALT BÖLGELER VE EKİPMAN KATEGORİLERİYLE)
  // =========================================================================
  {
    id: 'pike-push-up',
    slug: 'pike-push-up',
    trName: 'Pike Şınav (Vücut Ağırlığı Omuz İtişi)',
    enName: 'Pike Push-up',
    aliases: ['pike pushup', 'omuz şınavı', 'v şınav', 'ekipmansız omuz hareketi'],
    shortDescription:
      'Kalçayı yukarı kaldırıp ters V formu oluşturarak itiş açısını dikeyleştiren, evde ekipmansız ön ve orta omuz çalıştırmanın en temel yolu.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['triceps', 'gogus', 'karin-core'],
    primaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Orta Omuz (Lateral Deltoid)'],
    secondaryMuscles: ['Triceps Brachii', 'Üst Göğüs (Klaviküler Pektoral)', 'Üst Trapezius ve Serratus Anterior'],
    stabilizerMuscles: ['Core Kasları', 'Rotator Manşet'],
    subRegionTag: 'Ön & Orta Omuz (Evde / Ekipmansız)',
    equipment: ['vucut-agirligi'],
    environments: ['ev', 'salon'],
    level: 'orta',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Şınav pozisyonu alın, ardından ayaklarınızı ellerinize doğru yürüterek kalçanızı tavana doğru kaldırın; vücudunuz ters bir V (aşağı bakan köpek) şekli alsın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirseklerinizi bükerek başınızın tepesini ellerinizin tam arasına değil, parmak uçlarınızın biraz ilerisindeki bir noktaya doğru (üçgen oluşturacak şekilde) indirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Başınız yere hafifçe yaklaştığında omuzlarınızdaki yüklenmeyi hissedin; boynunuzun üzerine ağırlık bindirmeyin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Avuç içlerinizle yeri güçlüce iterek başınızı tekrar kollarınızın arasına, başlangıçtaki ters V pozisyonuna geri itin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İnerken 2 saniyede nefes alın, yukarı iterken nefes verin.'
      }
    ],
    cues: [
      'Arka bacaklarınız gerginse dizlerinizi hafifçe bükebilirsiniz; önemli olan sırt ve kol hattınızın dik açısını korumaktır.',
      'Başınızı ellerinizin arasına dik indirmek yerine ellerin biraz önüne indirerek dirseklerin ön kol üzerinde kalmasını sağlayın.'
    ],
    commonMistakes: [
      {
        mistake: 'Başın tepesini tam iki elin arasına indirip dirsekleri yana açmak.',
        correction: 'Elleriniz iki taban köşesi, başınızın indiği nokta ise tepe köşesi olacak şekilde yerde bir eşkenar üçgen hayal edin.'
      },
      {
        mistake: 'Kalçayı indirip hareketi normal şınava çevirmek.',
        correction: 'Kalçanızı hareket boyunca yukarıda tutarak yükün göğüs yerine omuzlarda kalmasını sağlayın.'
      },
      {
        mistake: 'Başın üstünü yere sertçe değdirip boyna yük bindirmek.',
        correction: 'Yere değmeden hemen önce kontrollü şekilde durup yukarı itin.'
      }
    ],
    programming: {
      beginner: '3 set × 5–8 kontrollü tekrar',
      intermediate: '3–4 set × 8–12 tekrar',
      note: 'Evde dambıl olmadan baş üstü itiş kuvveti kazanmak için en etkili temel harekettir.'
    },
    alternatives: {
      easier: 'push-up',
      harder: 'elevated-pike-push-up',
      equipmentAlt: ['dumbbell-shoulder-press', 'band-shoulder-press', 'barbell-overhead-press'],
      homeAlt: 'band-shoulder-press'
    },
    animation: {
      poseId: 'pike-pushup',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ters V (pike) duruşundaki sporcunun başını ellerinin biraz ilerisine doğru indirip tekrar yukarı itmesini gösteren animasyon.',
      startLabel: 'Ters V Duruşu',
      endLabel: 'Alt İniş (Üçgen Hat)'
    },
    editorialSource: 'NSCA & Kaliszenik Üst Vücut İtiş Mekanikleri'
  },
  {
    id: 'elevated-pike-push-up',
    slug: 'elevated-pike-push-up',
    trName: 'Ayaklar Yükseltilmiş Pike Şınav',
    enName: 'Elevated Pike Push-up',
    aliases: ['yüksek pike şınav', 'box pike push-up', 'ileri seviye omuz şınavı'],
    shortDescription:
      'Ayakları bir sehpa veya kutu üzerine yerleştirerek gövdeyi yere daha dik hale getiren, omuz ve triceps üzerindeki yükü belirgin şekilde artıran ileri seviye vücut ağırlığı itişi.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['triceps', 'gogus', 'karin-core'],
    primaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Orta Omuz (Lateral Deltoid)'],
    secondaryMuscles: ['Triceps Brachii', 'Üst Trapezius', 'Üst Göğüs (Klaviküler Lifler)'],
    stabilizerMuscles: ['Rotator Manşet', 'Core ve Kalça Sabitleyicileri'],
    subRegionTag: 'Ön & Orta Omuz (Yüksek Yük / Vücut Ağırlığı)',
    equipment: ['vucut-agirligi', 'bench-sehpa'],
    environments: ['ev', 'salon'],
    level: 'ileri',
    levelWarning:
      'İleri seviye harekettir: Baş aşağı açıda omuz ve el bileği eklemlerine yüksek yük biner. Bu harekete geçmeden önce yerde standart Pike Push-up ile en az 10–12 temiz tekrar çıkarabiliyor olmanız önerilir.',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayak parmak uçlarınızı sabit bir sehpa veya kutunun üzerine yerleştirin. Ellerinizi omuz genişliğinde yere basıp kalçanızı yukarı kaldırarak üst gövdenizi yere olabildiğince dik konuma getirin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirseklerinizi gövdeye yakın (yaklaşık 45 derece) bükerek başınızı ellerinizin biraz ilerisindeki zemine doğru kontrollü biçimde indirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Başınız yere birkaç santimetre yaklaştığında duraksayın; dengenizi ve karın sıkılığınızı koruyun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Yeri güçlüce iterek başınızı tekrar kollarınızın arasına alın ve omuzlarınızı yukarı doğru uzatın.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İnerken 2–3 saniyede nefes alın, yukarı iterken nefes verin. Yorulduğunuzda baş üstü düşmemek için seti güvenli noktada sonlandırın.'
      }
    ],
    cues: [
      'Tükenişe (başarısız tekrara) kadar zorlamayın; son tekrarda yukarı çıkamayacak kadar yorulursanız dizlerinizi kontrollüce sehpaya koyarak inin.',
      'El bileklerinizi önceden mutlaka ısıtın.'
    ],
    commonMistakes: [
      {
        mistake: 'Yeterli Pike Push-up kuvveti olmadan doğrudan yüksek sehpada denemek.',
        correction: 'Önce yerde Pike Push-up, ardından alçak bir basamakla kademeli geçiş yapın.'
      },
      {
        mistake: 'Beli aşırı çukurlaştırıp gövde kontrolünü kaybetmek.',
        correction: 'Kaburgaları içeri çekip karın kaslarını aktif tutun.'
      },
      {
        mistake: 'Tükeniş noktasına kadar gidip boyun üzerinde dengesiz kalmak.',
        correction: 'Her zaman cepte 1–2 tekrar yedek bırakarak (RIR 2) seti bitirin.'
      }
    ],
    programming: {
      beginner: 'Başlangıç seviyesi için uygun değildir; Pike Push-up veya Dumbbell Shoulder Press tercih edin',
      intermediate: '3 set × 5–8 kontrollü tekrar',
      note: 'Vücut ağırlığıyla dikey itiş kuvveti geliştiren ileri seviye bir harekettir.'
    },
    alternatives: {
      easier: 'pike-push-up',
      harder: 'wall-walk',
      equipmentAlt: ['dumbbell-shoulder-press', 'barbell-overhead-press'],
      homeAlt: 'pike-push-up'
    },
    animation: {
      poseId: 'pike-pushup',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ayakları yükselti üzerinde, üst gövdesi yere dik açıda olan sporcunun omuz itişi yapmasını gösteren animasyon.',
      startLabel: 'Dik Pike Başlangıç',
      endLabel: 'Kontrollü Alt Nokta'
    },
    editorialSource: 'NSCA & İleri Kaliszenik Kuvvet Rehberi'
  },
  {
    id: 'wall-walk',
    slug: 'wall-walk',
    trName: 'Duvarda El Yürüyüşü',
    enName: 'Wall Walk',
    aliases: ['wall walk', 'duvar yürüyüşü', 'handstand walk wall', 'duvarda omuz yürüyüşü'],
    shortDescription:
      'Şınav pozisyonundan başlayarak ayaklarla duvarda yukarı, ellerle duvara doğru adım adım yürüyerek tüm omuz kuşağını ve core bölgesini yoğun gerilim altında çalıştıran ileri seviye hareket.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['karin-core', 'triceps', 'sirt'],
    primaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Orta Omuz (Lateral Deltoid)', 'Üst Trapezius ve Serratus Anterior'],
    secondaryMuscles: ['Triceps Brachii', 'Rotator Manşet (Omuz Stabilizatörleri)', 'Üst Göğüs'],
    stabilizerMuscles: ['Rectus Abdominis', 'Transversus Abdominis', 'Erector Spinae', 'El Bileği Sabitleyicileri'],
    subRegionTag: 'Tüm Omuz Kuşağı & İzometrik Stabilite (İleri Seviye)',
    equipment: ['vucut-agirligi'],
    environments: ['ev', 'salon'],
    environmentNote: 'Ayak tabanlarının iz bırakmayacağı sağlam bir duvar ve kaymayan zemin gerektirir.',
    level: 'ileri',
    levelWarning:
      'İleri Seviye Güvenlik Uyarısı: Baş aşağı pozisyonda omuz stabilitesi, el bileği dayanıklılığı ve güçlü core kontrolü gerektirir. Omuz sıkışması, yüksek tansiyon veya el bileği ağrısı olanlar için uygun değildir. İlk denemelerde duvara tamamen yaklaşmak yerine sadece 1–2 küçük adımlı kısmi mesafe kullanılmalıdır.',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayak tabanlarınız duvara değecek şekilde yüzüstü şınav pozisyonu alın. Ellerinizi omuzlarınızın tam altına yerleştirin ve gövdenizi sıkı bir plank hattına getirin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Önce ayaklarınızla duvarda küçük adımlarla yukarı çıkarken, eşzamanlı olarak ellerinizle duvara doğru küçük ve kontrollü adımlarla geriye yürüyün.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kendinizi tamamen güvende hissettiğiniz açıda (veya ileri seviyede göğsünüz duvara yaklaşana kadar) karın kaslarınızı sıkarak 1–2 saniye dengede kalın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'İnişte asla acele etmeyin; ellerinizle ileri, ayaklarınızla duvardan aşağı adım adım yürüyerek başlangıçtaki şınav pozisyonuna kontrollüce dönün.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yürüyüş boyunca nefesinizi tutmayın; kısa ve ritmik nefeslerle gövde gerginliğini koruyun.'
      }
    ],
    cues: [
      'İniş için her zaman enerjinizi saklayın; duvara çok yaklaşıp geri yürüyecek gücünüzün kalmaması düşme riski yaratır.',
      'Başlangıçta sadece 2 adım geriye gidip 2 adım ileri dönerek (kısmi Wall Walk) güvenle çalışabilirsiniz.'
    ],
    commonMistakes: [
      {
        mistake: 'Yorgunken duvara sonuna kadar yaklaşıp dönüşte kolların boşalması.',
        correction: 'Dönüş yürüyüşü çıkıştan daha zordur; enerjinizin yarısı varken geri dönüşe başlayın.'
      },
      {
        mistake: 'Belin muz gibi aşırı çukurlaşmasına izin vermek.',
        correction: 'Kalçayı ve karnı sıkarak kaburgaları içeri toplayın; bel çukurlaşıyorsa daha az yukarı çıkın.'
      },
      {
        mistake: 'Aynı anda çok büyük el adımları atarak omuz dengesini kaybetmek.',
        correction: 'Her adımda bir el genişliği kadar kısa ve kontrollü adımlar atın.'
      }
    ],
    programming: {
      beginner: 'Başlangıç seviyesi için önerilmez; Pike Push-up veya Dumbbell Shoulder Press uygulayın',
      intermediate: '3 set × 2–4 kontrollü tekrar (dinlenme: 90–120 saniye)',
      note: 'Yüksek tekrarlı değil, düşük tekrarlı ve tam odak gerektiren bir beceri-kuvvet egzersizidir.'
    },
    alternatives: {
      easier: 'pike-push-up',
      harder: 'elevated-pike-push-up',
      equipmentAlt: ['dumbbell-shoulder-press', 'barbell-overhead-press', 'band-shoulder-press'],
      homeAlt: 'pike-push-up'
    },
    animation: {
      poseId: 'wall-walk',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Şınav pozisyonundan ayaklarıyla duvarda yukarı ve elleriyle duvara doğru kontrollü adımlarla yürüyen sporcuyu gösteren animasyon.',
      startLabel: 'Yatay Başlangıç (Ayaklar Duvarda)',
      endLabel: 'Dik Duvar Duruşu'
    },
    editorialSource: 'Fonksiyonel Cimnastik & NSCA Omuz Stabilite İlkeleri'
  },
  {
    id: 'dumbbell-shoulder-press',
    slug: 'dumbbell-shoulder-press',
    trName: 'Ayakta Dambıl Omuz Pres',
    enName: 'Dumbbell Shoulder Press',
    aliases: ['dumbbell overhead press', 'dambıl omuz pres', 'ayakta omuz pres', 'omuz itiş dambıl'],
    shortDescription:
      'Ayakta iki dambılı omuz hizasından baş üstüne iterek ön ve orta omuz kaslarını tüm gövde stabilitesiyle birlikte çalıştıran temel dikey itiş hareketi.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['triceps', 'karin-core', 'sirt'],
    primaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Orta Omuz (Lateral Deltoid)'],
    secondaryMuscles: ['Triceps Brachii', 'Üst Trapezius', 'Serratus Anterior (Kürek Kemiği Yukarı Rotasyonu)'],
    stabilizerMuscles: ['Rotator Manşet', 'Rectus Abdominis ve Oblikler', 'Gluteus Maximus'],
    subRegionTag: 'Ön & Orta Omuz (Temel Dikey İtiş)',
    equipment: ['dumbbell'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    featured: true,
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızı omuz genişliğinde açarak dik durun. Dambılları omuz hizanıza kaldırın; dirsekleriniz tam yanda (90 derece) değil, gövde düzleminin yaklaşık 30 derece önünde (skapular düzlemde) dursun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Kalça ve karın kaslarınızı sıkarak belinizi sabitleyin. Dambılları başınızın üzerine doğru dikey bir hatla yukarı itin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kollarınız kulaklarınızın yanında tamamen uzandığında dambılları birbirine çarptırmadan omuz hizasında dengede tutun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Dambılları 2–3 saniyede kontrollü şekilde çene/omuz hizanıza kadar geri indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yukarı iterken nefes verin, omuz hizasına indirirken nefes alın.'
      }
    ],
    cues: [
      'Dirseklerinizi hafifçe önde (skapular düzlemde) tutmak, omuz eklemi için tam yana açık pozisyondan çok daha konforludur.',
      'Ağırlığı yukarı iterken göğsünüzü aşırı yukarı kaldırıp belinizi geriye bükmeyin.'
    ],
    commonMistakes: [
      {
        mistake: 'Ağırlığı kaldırmak için belden geriye doğru aşırı kaykılmak.',
        correction: 'Kaburgalarınızı aşağı bastırıp kalçanızı sıkın; beliniz zorlanıyorsa Seated Dumbbell Shoulder Press varyasyonuna geçin.'
      },
      {
        mistake: 'Dirsekleri tam yana açıp boynu omuzların arasına gömmek.',
        correction: 'Dirsekleri 30 derece öne alın ve boynunuzu rahat tutun.'
      },
      {
        mistake: 'Dambılları sadece baş hizasına kadar indirip yarım tekrar yapmak.',
        correction: 'Omuz esnekliğinizin izin verdiği ölçüde dambılları çene/omuz seviyesine kadar kontrollü indirin.'
      }
    ],
    programming: {
      beginner: '3 set × 8–12 tekrar',
      intermediate: '3–4 set × 8–12 tekrar',
      note: 'Omuz kaslarının ön ve orta başlarını çalıştırır; arka omuz için ayrıca Rear Delt Raise veya Face Pull eklenmelidir.'
    },
    alternatives: {
      easier: 'band-shoulder-press',
      harder: 'barbell-overhead-press',
      equipmentAlt: ['seated-dumbbell-shoulder-press', 'barbell-overhead-press', 'pike-push-up', 'band-shoulder-press'],
      homeAlt: 'pike-push-up'
    },
    animation: {
      poseId: 'overhead-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ayakta dik duran sporcunun omuz hizasındaki dambılları baş üstüne doğru dikey olarak itip kontrollü indirmesini gösteren animasyon.',
      startLabel: 'Omuz Hizası (Skapular Düzlem)',
      endLabel: 'Baş Üstü Tam Uzatma'
    },
    editorialSource: 'NSCA & ACSM Baş Üstü İtiş Biyomekaniği'
  },
  {
    id: 'seated-dumbbell-shoulder-press',
    slug: 'seated-dumbbell-shoulder-press',
    trName: 'Oturarak Dambıl Omuz Pres',
    enName: 'Seated Dumbbell Shoulder Press',
    aliases: ['oturarak omuz pres', 'seated shoulder press', 'sehpa destekli dambıl omuz'],
    shortDescription:
      'Dik açılı sehpada sırt desteğiyle uygulanarak bacak ivmesini ve bel bükülmesini azaltan, yükü doğrudan omuz kaslarına odaklayan itiş hareketi.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['triceps', 'sirt'],
    primaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Orta Omuz (Lateral Deltoid)'],
    secondaryMuscles: ['Triceps Brachii', 'Üst Trapezius', 'Serratus Anterior'],
    stabilizerMuscles: ['Rotator Manşet', 'Core Kasları'],
    subRegionTag: 'Ön & Orta Omuz (Sırt Destekli)',
    equipment: ['dumbbell', 'bench-sehpa'],
    environments: ['salon', 'ev'],
    environmentNote: 'Sırtlığı dik (yaklaşık 75–85 derece) ayarlanabilen bir antrenman sehpası ve dambıl gerektirir.',
    level: 'baslangic',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Sehpa sırtlığını 75–85 derece dikliğe ayarlayın. Sırtınızı mindere yaslayın, ayaklarınızı yere sağlam basın ve dambılları dizlerinizin yardımıyla omuz hizasına kaldırın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Sırtınızı minderden ayırmadan dambılları başınızın üzerine doğru kontrollü şekilde itin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kollarınız yukarıda uzandığında dambılları birbirine çarptırmadan omuz hizasında durdurun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Dirseklerinizi hafifçe önde tutarak dambılları kulak/omuz hizanıza kadar yavaşça indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İterken nefes verin, indirirken 2–3 saniyede nefes alın.'
      }
    ],
    cues: [
      'Sehpayı tam 90 derece yerine 75–80 derece hafif eğimli ayarlamak çoğu kişinin omuz hareket açıklığı için daha rahattır.',
      'Kalçanızı sehpanın önüne kaydırıp sırtınızı boşlukta bırakmayın.'
    ],
    commonMistakes: [
      {
        mistake: 'Kalçayı öne kaydırıp hareketi eğimli göğüs presine çevirmek.',
        correction: 'Kalçanızı ve üst sırtınızı sırt dayanağına tam yaslayın.'
      },
      {
        mistake: 'Tepe noktada dambılları birbirine çarptırmak.',
        correction: 'Dambılları omuz genişliği hizasında paralel kontrol edin.'
      },
      {
        mistake: 'Başı minderden öne doğru uzatıp boynu kasmak.',
        correction: 'Başınızı sırtlıkla aynı doğal hizada tutun.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3–4 set × 8–12 tekrar',
      note: 'Sırt desteği sayesinde yeni başlayanların gövde sallanması olmadan omuz itişini öğrenmesini kolaylaştırır.'
    },
    alternatives: {
      easier: 'band-shoulder-press',
      harder: 'dumbbell-shoulder-press',
      equipmentAlt: ['dumbbell-shoulder-press', 'barbell-overhead-press', 'arnold-press', 'pike-push-up'],
      homeAlt: 'dumbbell-shoulder-press'
    },
    animation: {
      poseId: 'seated-shoulder-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Dik sehpada oturan sporcunun dambılları omuz hizasından baş üstüne doğru itip indirmesini gösteren animasyon.',
      startLabel: 'Oturarak Omuz Hizası',
      endLabel: 'Baş Üstü İtiş'
    },
    editorialSource: 'NSCA Egzersiz Tekniği Rehberi'
  },
  {
    id: 'dumbbell-lateral-raise',
    slug: 'dumbbell-lateral-raise',
    trName: 'Dambıl Yana Açış',
    enName: 'Dumbbell Lateral Raise',
    aliases: ['lateral raise', 'yana açış', 'yan omuz dambıl', 'side lateral raise'],
    shortDescription:
      'Kolları gövdenin hafif ön-yan düzleminde omuz hizasına kaldırarak omuzun orta (lateral) başını doğrudan hedefleyen temel izolasyon hareketi.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['sirt'],
    primaryMuscles: ['Orta / Yan Omuz (Lateral Deltoid)'],
    secondaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Üst Trapezius', 'Supraspinatus (Rotator Manşet)'],
    stabilizerMuscles: ['Core Kasları', 'Ön Kol Ekstansörleri'],
    subRegionTag: 'Orta (Yan) Omuz İzolasyonu',
    equipment: ['dumbbell'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızı kalça genişliğinde açarak dik durun, gövdenizi çok hafif öne eğin. Dambılları yanlarınızda avuç içleriniz gövdenize bakacak şekilde tutun ve dirseklerinizde hafif (15–20 derece) bir bükülme bırakın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Omuzlarınızı kulaklarınıza çekmeden, kollarınızı tam yana değil gövdenizin yaklaşık 20–30 derece ön-yanına (skapular düzleme) doğru kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Elleriniz ve dirsekleriniz omuz hizasına (yere paralel konuma) ulaştığında yan omuzlarınızdaki kasılmayı kısa bir an hissedin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ağırlıkların bir anda düşmesine izin vermeden 2–3 saniyede yavaşça başlangıç pozisyonuna indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Kaldırırken nefes verin, kontrollü indirirken nefes alın.'
      }
    ],
    cues: [
      'Ağırlığı yukarı değil, sanki iki yanınızdaki duvarlara doğru uzağa uzatıyormuş gibi düşünün; bu ipucu trapez (boyun) kaslarının devreye girmesini azaltır.',
      'Serçe parmağınızı yukarı çevirmeye (sürahi boşaltma hareketine) çalışmayın; bu iç rotasyon omuz sıkışması riskini artırabilir, avuç içinizi yere paralel tutun.'
    ],
    commonMistakes: [
      {
        mistake: 'Çok ağır dambıl seçip diz ve belden sallanarak ağırlığı fırlatmak.',
        correction: 'Hafif-orta bir dambıl seçerek tepe noktada yarım saniye durabileceğiniz bir kontrolle çalışın.'
      },
      {
        mistake: 'Dirsekleri 90 derece büküp elleri dirseklerden daha yukarı kaldırmak.',
        correction: 'Kolları uzun (sadece hafif bükülü) tutun; omuz hizasında dirsek ve bilek aynı seviyede olsun.'
      },
      {
        mistake: 'Omuzları kulaklara doğru silkerek yükü üst trapez kasına kaçırmak.',
        correction: 'Kürek kemiklerinizi aşağıda sabit tutun ve kolları omuz hizasının çok üzerine çıkarmayın.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 tekrar',
      intermediate: '3–4 set × 12–20 tekrar',
      note: 'Baş üstü presler ön omuzu yeterince çalıştırdığı için omuz genişliği ve dengesi adına en kritik tamamlayıcı harekettir.'
    },
    alternatives: {
      easier: 'cable-lateral-raise',
      harder: 'dumbbell-shoulder-press',
      equipmentAlt: ['cable-lateral-raise', 'band-shoulder-press'],
      homeAlt: 'band-shoulder-press'
    },
    animation: {
      poseId: 'lateral-raise',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ayakta duran sporcunun kollarını gövde yanından omuz hizasına kadar kontrollü şekilde açıp indirmesini gösteren animasyon.',
      startLabel: 'Kollar Gövde Yanında',
      endLabel: 'Kollar Omuz Hizasında'
    },
    editorialSource: 'JOSPT & NSCA Skapular Düzlem Abdüksiyon Çalışmaları'
  },
  {
    id: 'dumbbell-front-raise',
    slug: 'dumbbell-front-raise',
    trName: 'Dambıl Öne Kaldırış',
    enName: 'Dumbbell Front Raise',
    aliases: ['front raise', 'ön omuz dambıl', 'dambıl öne açış'],
    shortDescription:
      'Kolları vücudun önünde omuz hizasına kaldırarak ön omuz (anterior deltoid) ve üst göğüs liflerini izole eden hareket.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['gogus'],
    primaryMuscles: ['Ön Omuz (Anterior Deltoid)'],
    secondaryMuscles: ['Üst Göğüs (Klaviküler Pektoral)', 'Orta Omuz (Lateral Deltoid)', 'Serratus Anterior'],
    stabilizerMuscles: ['Core ve Sırt Dengeleyicileri', 'Ön Kol Kavrama Kasları'],
    subRegionTag: 'Ön Omuz İzolasyonu',
    equipment: ['dumbbell'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızı omuz genişliğinde açarak dik durun. Dambılları uyluklarınızın önünde (avuç içleri size veya birbirine bakacak şekilde) dirsekleriniz hafif bükülü tutun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Gövdenizi geriye sallamadan kollarınızı öne doğru omuz hizasına (yere paralel konuma) kadar kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Dambıllar omuz hizasına geldiğinde 1 saniye duraksayın; göz hizasının çok üzerine çıkarmayın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ağırlıkları 2–3 saniyede kontrollü biçimde uyluk hizanıza geri indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Öne kaldırırken nefes verin, indirirken nefes alın.'
      }
    ],
    cues: [
      'Avuç içlerinin birbirine baktığı (nötr/çekiç) tutuş, omuz eklemi için genellikle daha konforlu bir yol sunar.',
      'Gövde sallanmasını azaltmak için sağ ve sol kolu sırayla (alternatif) da kaldırabilirsiniz.'
    ],
    commonMistakes: [
      {
        mistake: 'Kalçayı ileri-geri sallayarak ağırlığı ivmeyle fırlatmak.',
        correction: 'Karın kaslarınızı sıkın veya sırtınızı duvara/dik sehpaya yaslayarak sadece omuzdan kaldırın.'
      },
      {
        mistake: 'Ağırlığı başın çok üstüne kadar savurmak.',
        correction: 'Omuz hizasında (yere paralel noktada) hareketi sonlandırın.'
      },
      {
        mistake: 'Aynı antrenmanda çok fazla pres yaptıktan sonra yüksek ağırlıkla Front Raise eklemek.',
        correction: 'Ön omuz tüm göğüs ve omuz preslerinde zaten çalıştığı için bu hareketi hafif-orta kiloyla ve kontrollü hacimde uygulayın.'
      }
    ],
    programming: {
      beginner: '2–3 set × 10–12 tekrar',
      intermediate: '3 set × 12–15 tekrar',
      note: 'Programınızda zaten çok sayıda Bench Press ve Overhead Press varsa ön omuz hacmini abartmamaya dikkat edin.'
    },
    alternatives: {
      easier: 'band-shoulder-press',
      harder: 'barbell-front-raise',
      equipmentAlt: ['barbell-front-raise', 'dumbbell-shoulder-press', 'pike-push-up'],
      homeAlt: 'dumbbell-shoulder-press'
    },
    animation: {
      poseId: 'front-raise',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ayakta dik duran sporcunun dambılları uyluk önünden omuz hizasına kadar öne kaldırıp indirmesini gösteren animasyon.',
      startLabel: 'Kollar Uyluk Önünde',
      endLabel: 'Kollar Önde Omuz Hizasında'
    },
    editorialSource: 'NSCA Egzersiz Tekniği Kılavuzu'
  },
  {
    id: 'rear-delt-raise',
    slug: 'rear-delt-raise',
    trName: 'Eğilerek Arka Omuz Açış',
    enName: 'Bent-over Rear Delt Raise',
    aliases: ['rear delt fly', 'arka omuz dambıl', 'eğilerek yana açış', 'reverse fly'],
    shortDescription:
      'Kalçadan öne eğilerek gövdeyi yere yaklaştırıp dambılları yanlara açan, arka omuz (posterior deltoid) ve üst sırt kaslarını hedefleyen hareket.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['sirt'],
    primaryMuscles: ['Arka Omuz (Posterior Deltoid)'],
    secondaryMuscles: ['Orta Trapezius', 'Rhomboideus', 'Infraspinatus ve Teres Minor'],
    stabilizerMuscles: ['Erector Spinae', 'Hamstring ve Kalça', 'Core Kasları'],
    subRegionTag: 'Arka Omuz & Postür Desteği',
    equipment: ['dumbbell'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızı kalça genişliğinde açın, dizlerinizi hafif bükün ve kalçanızı geriye iterek üst gövdenizi yere neredeyse paralel olana kadar öne eğin (veya eğimli sehpaya göğsünüzü yaslayın). Dambılları omuzlarınızın altında sarkıtın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirseklerinizi hafif bükülü tutarak kollarınızı gövdenizin yanlarına (90 derece açıyla dışarı) doğru geniş bir yay çizerek kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Üst kollarınız yere paralel hizaya geldiğinde omuzlarınızın arkasındaki kasılmayı 1 saniye hissedin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ağırlıkları savurmadan 2 saniyede başlangıç pozisyonuna indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Kolları açarken nefes verin, indirirken nefes alın.'
      }
    ],
    cues: [
      'Kürek kemiklerinizi en baştan birbirine sıkıştırıp ağırlığı sırtla çekmek yerine, kolları yana-uzaklara doğru açarak arka omuzu hedefleyin.',
      'Beliniz yoruluyorsa bir sehpaya oturup göğsünüzü dizlerinize yaklaştırarak veya eğimli sehpaya yüzüstü uzanarak da yapabilirsiniz.'
    ],
    commonMistakes: [
      {
        mistake: 'Gövdeyi yeterince eğmeden dik durup hareketi orta omuz (Lateral Raise) açısına çevirmek.',
        correction: 'Arka omuzun yerçekimine karşı çalışması için göğsünüz yere bakacak kadar öne eğilin.'
      },
      {
        mistake: 'Ağır dambıl seçip dirsekleri geriye çekerek hareketi Row (sırt çekişi) haline getirmek.',
        correction: 'Hafif dambıl kullanın ve dirseklerinizi kalçaya değil, iki yana doğru açın.'
      },
      {
        mistake: 'Boynu yukarı kaldırıp karşıdaki aynaya bakmaya çalışmak.',
        correction: 'Bakışlarınızı doğrudan altınızdaki zeminde tutarak boyun omurlarınızı düz koruyun.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 tekrar',
      intermediate: '3–4 set × 15–20 tekrar',
      note: 'Masa başı çalışanlarda ve yoğun göğüs/ön omuz çalışanlarda omuz dengesi için vazgeçilmez bir harekettir.'
    },
    alternatives: {
      easier: 'face-pull',
      harder: 'one-arm-dumbbell-row',
      equipmentAlt: ['face-pull', 'resistance-band-row'],
      homeAlt: 'resistance-band-row'
    },
    animation: {
      poseId: 'rear-delt-raise',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Kalçadan öne eğilmiş sporcunun aşağı sarkan dambılları iki yana doğru açarak arka omuzlarını çalıştırmasını gösteren animasyon.',
      startLabel: 'Eğik Duruş (Kollar Aşağıda)',
      endLabel: 'Kollar Yana Açık'
    },
    editorialSource: 'ACE & JOSPT Arka Deltoid Aktivasyon Çalışmaları'
  },
  {
    id: 'arnold-press',
    slug: 'arnold-press',
    trName: 'Arnold Omuz Pres',
    enName: 'Arnold Press',
    aliases: ['arnold shoulder press', 'dönüşlü dambıl omuz pres', 'arnold itiş'],
    shortDescription:
      'Çene önünde avuç içleri yüze dönük başlayıp yukarı iterken dışa döndürülen, ön ve orta omuz liflerini geniş hareket açıklığıyla çalıştıran dambıl pres varyasyonu.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['triceps', 'sirt'],
    primaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Orta Omuz (Lateral Deltoid)'],
    secondaryMuscles: ['Triceps Brachii', 'Üst Trapezius', 'Serratus Anterior'],
    stabilizerMuscles: ['Rotator Manşet', 'Core Sabitleyicileri'],
    subRegionTag: 'Ön & Orta Omuz (Rotasyonlu Geniş Açıklık)',
    equipment: ['dumbbell', 'bench-sehpa'],
    environments: ['salon', 'ev'],
    environmentNote: 'Oturarak sırt destekli sehpada veya ayakta yalnızca dambıl ile uygulanabilir.',
    level: 'orta',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Dik sehpaya oturun (veya ayakta dik durun). Dambılları bir biceps curl hareketinin tepe noktası gibi çene hizanızda, avuç içleriniz yüzünüze bakacak şekilde tutun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirseklerinizi yanlara doğru açarken eşzamanlı olarak bileklerinizi dışa döndürün ve dambılları baş üstüne doğru itin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Tepe noktada avuç içleriniz karşıya bakar ve kollarınız baş üstünde uzanır.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ağırlıkları indirirken hareketi tersine çevirerek dirseklerinizi öne toplayın ve avuç içlerinizi tekrar yüzünüze döndürün.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Döndürüp yukarı iterken nefes verin, kontrollü indirirken 2–3 saniyede nefes alın.'
      }
    ],
    cues: [
      'Dönüş (rotasyon) ile yukarı itişi iki ayrı kopuk hareket gibi değil, tek bir akıcı yay halinde birleştirin.',
      'Standart Dumbbell Shoulder Press hareketine göre biraz daha hafif ağırlık seçmek omuz kontrolünü artırır.'
    ],
    commonMistakes: [
      {
        mistake: 'Alt noktada dirsekleri tamamen düşürüp yükü dinlendirmek.',
        correction: 'Çene önünde dambılları tutarken ön omuzdaki aktif gerilimi koruyun.'
      },
      {
        mistake: 'Ağır kiloyla hızlıca savurarak omuz rotasyonunu zorlamak.',
        correction: 'Omuz eklemi yük altında dönerken kontrollü tempo şarttır; ağırlığı %10–15 düşürüp akıcı çalışın.'
      },
      {
        mistake: 'Bel boşluğunu aşırı açarak üst göğüsten destek almak.',
        correction: 'Kaburgalarınızı içeride ve sırtınızı mindere yaslı tutun.'
      }
    ],
    programming: {
      beginner: 'Önce standart Seated Dumbbell Shoulder Press önerilir',
      intermediate: '3 set × 8–12 tekrar',
      note: 'Uzun hareket yolu sayesinde orta ağırlıklarla bile yüksek metabolik ve kas gerilimi oluşturur.'
    },
    alternatives: {
      easier: 'seated-dumbbell-shoulder-press',
      harder: 'barbell-overhead-press',
      equipmentAlt: ['dumbbell-shoulder-press', 'seated-dumbbell-shoulder-press', 'barbell-overhead-press'],
      homeAlt: 'dumbbell-shoulder-press'
    },
    animation: {
      poseId: 'seated-shoulder-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Çene önünde avuç içleri kendine dönük başlayan dambılların dışa döndürülerek baş üstüne itilmesini gösteren animasyon.',
      startLabel: 'Çene Önü (Avuç İçi İçe)',
      endLabel: 'Baş Üstü (Avuç İçi Karşıya)'
    },
    editorialSource: 'Indian Journal of Orthopaedics & NSCA Omuz Pres Varyasyon Analizi'
  },
  {
    id: 'barbell-overhead-press',
    slug: 'barbell-overhead-press',
    trName: 'Ayakta Halter Omuz Pres',
    enName: 'Barbell Overhead Press',
    aliases: ['overhead press', 'ohp', 'military press', 'ayakta halter omuz itiş'],
    shortDescription:
      'Ayakta bacaklardan ivme almadan halter barını köprücük kemiğinden baş üstüne iten, omuz, triceps ve tüm gövde stabilitesini geliştiren klasik kuvvet hareketi.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['triceps', 'karin-core', 'sirt'],
    primaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Orta Omuz (Lateral Deltoid)'],
    secondaryMuscles: ['Triceps Brachii', 'Üst Göğüs (Klaviküler Pektoral)', 'Üst Trapezius ve Serratus Anterior'],
    stabilizerMuscles: ['Rectus Abdominis ve Oblikler', 'Gluteus Maximus', 'Erector Spinae'],
    subRegionTag: 'Temel Halter Baş Üstü Kuvvet',
    equipment: ['barbell'],
    environments: ['salon'],
    level: 'orta',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Rack üzerinde göğüs hizasında duran barı omuz genişliğinden hemen biraz açık kavrayın. Barı üst göğüs / köprücük kemiği üzerine alın, bir adım geri çıkın ve ayaklarınızı kalça-omuz genişliğinde sabitleyin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Kalçanızı, uyluklarınızı ve karnınızı sıkın. Çenenizi hafifçe geriye çekerek barın yüzünüzün önünden dikey bir hatla yukarı çıkmasına yol açın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Bar alnınızın hizasını geçer geçmez başınızı hafifçe ileri (kollarınızın arasına) alarak barı omuzlarınızın ve ayak ortanızın tam üzerinde kilitleyin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Başınızı tekrar hafifçe geriye çekerek barı yüzünüze çarpmadan köprücük kemiği hizanıza kontrollü biçimde indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Dip noktada nefes alıp gövdeyi sıkın, tepe noktada veya iniş sonunda nefes yenileyin.'
      }
    ],
    cues: [
      'Dirsekleriniz başlangıçta barın hemen altında veya çok hafif önünde olmalı; dirsekleri geriye kaçırmayın.',
      'Kalçanızı sıkmak, belinizin geriye doğru aşırı bükülmesini önleyen en önemli güvenlik kilididir.'
    ],
    commonMistakes: [
      {
        mistake: 'Çeneyi geriye çekmek yerine barı yüzün çok önünden geniş bir yayla itmek.',
        correction: 'Bar vücut ağırlık merkezinden uzaklaşırsa bel zorlanır; çeneyi hafif geriye alıp barı dikey hatta tutun.'
      },
      {
        mistake: 'Beli aşırı geriye bükerek ayakta Incline Press yapmaya çalışmak.',
        correction: 'Kalçayı ve karın kaslarını sıkarak göğüs kafesini pelvisin üzerinde sabit tutun.'
      },
      {
        mistake: 'Bileklerin barın altında geriye kırılması.',
        correction: 'Barı avuç içinin alt-etli kısmına oturtup bilekleri ön kolla düz hizalayın.'
      }
    ],
    programming: {
      beginner: 'Boş bar ile 3 set × 8–10 tekrar (veya Dumbbell Shoulder Press)',
      intermediate: '3–4 set × 5–8 tekrar',
      note: 'Üst vücut dikey itiş kuvvetinin temel ölçütüdür; küçük ağırlık artışlarına dahi hassas tepki verir.'
    },
    alternatives: {
      easier: 'dumbbell-shoulder-press',
      harder: 'push-press',
      equipmentAlt: ['dumbbell-shoulder-press', 'seated-dumbbell-shoulder-press', 'push-press', 'pike-push-up'],
      homeAlt: 'dumbbell-shoulder-press'
    },
    animation: {
      poseId: 'overhead-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ayakta dik duran sporcunun halter barını köprücük kemiği hizasından baş üstüne dikey olarak itip indirmesini gösteren animasyon.',
      startLabel: 'Bar Köprücük Kemiğinde',
      endLabel: 'Baş Üstü Tam Kilit'
    },
    editorialSource: 'NSCA & Starting Strength Baş Üstü Pres Analizi'
  },
  {
    id: 'push-press',
    slug: 'push-press',
    trName: 'Bacak İtişli Halter Omuz Pres',
    enName: 'Push Press',
    aliases: ['push press', 'patlayıcı omuz pres', 'bacak destekli overhead press'],
    shortDescription:
      'Kısa ve kontrollü bir diz büküp patlayıcı bacak itişiyle başlatılan, halterin baş üstüne taşınmasını sağlayan atletik güç ve omuz hareketi.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['on-bacak', 'triceps', 'kalca', 'karin-core'],
    primaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Orta Omuz (Lateral Deltoid)'],
    secondaryMuscles: ['Quadriceps (Ön Bacak)', 'Triceps Brachii', 'Gluteus Maximus', 'Baldır (Gastrocnemius & Soleus)'],
    stabilizerMuscles: ['Core ve Omurga Sabitleyicileri', 'Üst Trapezius', 'Rotator Manşet'],
    subRegionTag: 'Patlayıcı Baş Üstü Güç & Omuz',
    equipment: ['barbell'],
    environments: ['salon'],
    level: 'ileri',
    levelWarning:
      'İleri seviye koordinasyon gerektirir: Önce standart Barbell Overhead Press tekniğinde ve baş üstü bar kontrolünde yeterli deneyime sahip olunmalıdır.',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Barı köprücük kemiğinizin ve ön omuzlarınızın üzerine yerleştirin. Gövdenizi dik, dirseklerinizi barın hafif önünde tutun.'
      },
      {
        title: 'Hareketin Uygulanışı (Dip & Drive)',
        detail:
          'Gövdenizi öne eğmeden dizlerinizi yaklaşık 10–15 cm bükerek dikey olarak hafifçe çömelin (Dip), ardından bacaklarınızı ve kalçanızı patlayıcı şekilde açarak barı yukarı fırlatın (Drive) ve kollarınızla itişi tamamlayın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Dizleriniz düz, bar başınızın ve omuzlarınızın tam üzerinde kilitli konumda dengede kalın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Barı omuzlarınıza kontrollü biçimde indirirken dizlerinizi hafifçe esneterek yükü yumuşakça karşılayın.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Çömelmeden önce nefes alıp gövdeyi kilitleyin, bar baş üstünde sabitlendiğinde nefes verin.'
      }
    ],
    cues: [
      'İlk diz büküşte (Dip) gövdeniz asansör gibi dimdik aşağı inmeli; öne eğilirseniz bar öne kaçar.',
      'Push Jerk hareketinden farklı olarak barı iterken dizlerinizi ikinci kez büküp altına girmeyin; bacaklar itişten sonra düz kalır.'
    ],
    commonMistakes: [
      {
        mistake: 'Diz bükerken gövdeyi öne yatırıp barı öne fırlatmak.',
        correction: 'Sırtınız duvara sürtünüyormuş gibi dikey çöküp dikey yükselin.'
      },
      {
        mistake: 'Bacak itişi bitmeden kollarla erken itmeye çalışmak.',
        correction: 'Önce bacak ve kalça patlamasıyla barı omuzlardan ayırın, hemen ardından kollarla kilitleyin.'
      },
      {
        mistake: 'İnişte barı köprücük kemiğine kontrolsüzce düşürmek.',
        correction: 'Kollarınızla hızı kesip dizlerinizi hafif bükerek ağırlığı amortisör gibi karşılayın.'
      }
    ],
    programming: {
      beginner: 'Başlangıç seviyesi için Barbell Overhead Press veya Dumbbell Shoulder Press önerilir',
      intermediate: '3–4 set × 4–6 patlayıcı tekrar',
      note: 'Alt ve üst vücut arasındaki kinetik zincir güç aktarımını geliştirir.'
    },
    alternatives: {
      easier: 'barbell-overhead-press',
      harder: 'wall-walk',
      equipmentAlt: ['barbell-overhead-press', 'dumbbell-shoulder-press'],
      homeAlt: 'dumbbell-shoulder-press'
    },
    animation: {
      poseId: 'overhead-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Kısa bir diz büküşün ardından bacak ve kol kuvvetiyle halteri patlayıcı biçimde baş üstüne iten sporcuyu gösteren animasyon.',
      startLabel: 'Kısa Diz Büküş (Dip)',
      endLabel: 'Baş Üstü Tam İtiş'
    },
    editorialSource: 'NSCA Atletik Performans ve Güç Antrenmanı Rehberi'
  },
  {
    id: 'barbell-front-raise',
    slug: 'barbell-front-raise',
    trName: 'Halter ile Öne Kaldırış',
    enName: 'Barbell Front Raise',
    aliases: ['barbell front raise', 'barla ön omuz kaldırış', 'halter ön omuz'],
    shortDescription:
      'İki elle kavranan düz barı uyluk önünden omuz hizasına kaldırarak ön omuz (anterior deltoid) liflerini çalıştıran izolasyon hareketi.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['gogus', 'on-kol'],
    primaryMuscles: ['Ön Omuz (Anterior Deltoid)'],
    secondaryMuscles: ['Üst Göğüs (Klaviküler Pektoral)', 'Orta Omuz', 'Üst Trapezius'],
    stabilizerMuscles: ['Core ve Bel Sabitleyicileri', 'El Bileği Ekstansörleri'],
    subRegionTag: 'Ön Omuz İzolasyonu (Barbell)',
    equipment: ['barbell'],
    environments: ['salon'],
    environmentNote:
      'Form ve Alternatif Notu: Düz bar bilekleri sabit (pronasyon) açıda kilitlediği için omuzda veya bilekte rahatsızlık hisseden kullanıcılar, doğal tutuş açısı sunan Dumbbell Front Raise veya plaka ile nötr tutuş alternatifini tercih etmelidir.',
    level: 'orta',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Hafif bir halter barını (veya EZ barı) omuz genişliğinde, avuç içleriniz uyluklarınıza bakacak şekilde kavrayın. Ayaklarınızı omuz genişliğinde açıp dik durun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Karın ve kalçanızı sıkarak gövdenizi sabitleyin. Dirseklerinizde hafif bir bükülme koruyarak barı öne doğru omuz hizanıza kadar kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Bar omuz/köprücük kemiği hizasına (yere paralel seviyeye) ulaştığında yarım saniye duraksayın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Gövdenizi sallamadan barı 2–3 saniyede uyluklarınızın önüne kontrollü şekilde indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Kaldırırken nefes verin, indirirken nefes alın.'
      }
    ],
    cues: [
      'Olimpik 20 kg bar bu hareket için çoğu kişiye ağır gelebilir; daha hafif sabit barlar veya EZ bar kullanmak formu korumanızı sağlar.',
      'Omuz önünde sıkışma hissederseniz barı göz hizasına çıkarmayın veya nötr tutuşlu Dumbbell Front Raise hareketine geçin.'
    ],
    commonMistakes: [
      {
        mistake: 'Ağır olimpik bar kullanıp belden geriye yaylanarak barı savurmak.',
        correction: 'Sadece omuz kaslarınızla sallanmadan kaldırabileceğiniz hafif bir bar seçin.'
      },
      {
        mistake: 'Barı omuz hizasının çok üstüne kaldırıp omuz eklemini sıkıştırmak.',
        correction: 'Üstten tutuşta kolları yere paralel (omuz hizası) seviyede durdurmak omuz konforu için daha uygundur.'
      },
      {
        mistake: 'Bilekleri yukarı veya aşağı doğru bükmek.',
        correction: 'Bilekleri ön kol ile düz bir çizgide sabit tutun.'
      }
    ],
    programming: {
      beginner: 'Dumbbell Front Raise ile başlanması daha ergonomiktir',
      intermediate: '3 set × 10–12 kontrollü tekrar',
      note: 'Yalnızca ön omuzu hedefler; orta ve arka omuz hareketleriyle dengelenmelidir.'
    },
    alternatives: {
      easier: 'dumbbell-front-raise',
      harder: 'barbell-overhead-press',
      equipmentAlt: ['dumbbell-front-raise', 'barbell-overhead-press', 'band-shoulder-press'],
      homeAlt: 'dumbbell-front-raise'
    },
    animation: {
      poseId: 'front-raise',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ayakta dik duran sporcunun elindeki halter barını uyluk önünden omuz hizasına kaldırıp kontrollü indirmesini gösteren animasyon.',
      startLabel: 'Bar Uyluk Önünde',
      endLabel: 'Bar Omuz Hizasında'
    },
    editorialSource: 'NSCA Egzersiz Tekniği ve Eklem Ergonomisi Notları'
  },
  {
    id: 'cable-lateral-raise',
    slug: 'cable-lateral-raise',
    trName: 'Kablo ile Yana Açış',
    enName: 'Cable Lateral Raise',
    aliases: ['cable side raise', 'makara yana açış', 'tek kol kablo yan omuz'],
    shortDescription:
      'Alt makaradan gelen kablo açısı sayesinde hareketin en dip noktasından itibaren orta (yan) omuz kasına kesintisiz gerilim uygulayan izolasyon hareketi.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['sirt'],
    primaryMuscles: ['Orta / Yan Omuz (Lateral Deltoid)'],
    secondaryMuscles: ['Supraspinatus', 'Ön Omuz', 'Üst Trapezius'],
    stabilizerMuscles: ['Core ve Gövde Sabitleyicileri'],
    subRegionTag: 'Orta (Yan) Omuz (Kesintisiz Kablo Gerilimi)',
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
          'Makarayı en alt (veya bilek/diz) seviyesine ayarlayın. Makineye yan dönün, içteki elinizle direk/gövdeden hafifçe destek alın ve dıştaki elinizle tutamağı vücudunuzun önünden kavrayın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirseğinizde hafif bir bükülme koruyarak kolunuzu yan-ön düzlemde omuz hizanıza doğru kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'El ve dirseğiniz omuz yüksekliğine ulaştığında yan omuzunuzdaki kasılmayı 1 saniye koruyun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Kablo gerilimini kaybetmeden kolunuzu 2–3 saniyede yavaşça başlangıç noktasına indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Kaldırırken nefes verin, kontrollü indirirken nefes alın.'
      }
    ],
    cues: [
      'Dambıl ile yana açışta kol aşağıdayken yerçekimi dikey çektiği için ilk 20–30 derecede yük azdır; kabloda ise en alttan itibaren yan omuz tam yük altındadır.',
      'Makarayı el bileği veya diz hizasına ayarlamak, hareketin başlangıç açısını omuz lifleriyle daha iyi hizalar.'
    ],
    commonMistakes: [
      {
        mistake: 'Ağır plaka seçip gövdeyle yana doğru abanarak çekmek.',
        correction: 'Çok düşük bir ağırlık kademesi seçip gövdeyi sabit tutarak sadece omuzdan açış yapın.'
      },
      {
        mistake: 'Omuzu kulağa doğru kaldırmak.',
        correction: 'Kürek kemiğini aşağıda sabit tutarak elinizi uzağa doğru açın.'
      },
      {
        mistake: 'Dirseği büküp çekiş hareketine dönüştürmek.',
        correction: 'Dirsek açısını hareket boyunca sabit ve uzun koruyun.'
      }
    ],
    programming: {
      beginner: '3 set × her kol için 12–15 tekrar',
      intermediate: '3–4 set × her kol için 12–15 tekrar',
      note: 'Orta omuz (lateral deltoid) gelişimi için biyomekanik olarak en verimli izolasyon hareketlerinden biridir.'
    },
    alternatives: {
      easier: 'dumbbell-lateral-raise',
      harder: 'dumbbell-shoulder-press',
      equipmentAlt: ['dumbbell-lateral-raise', 'band-shoulder-press'],
      homeAlt: 'dumbbell-lateral-raise'
    },
    animation: {
      poseId: 'lateral-raise',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Alt makaradan gelen kabloyu tek koluyla yan-yukarı doğru omuz hizasına kaldıran sporcuyu gösteren animasyon.',
      startLabel: 'Alt Makara Başlangıç',
      endLabel: 'Kol Omuz Hizasında'
    },
    editorialSource: 'Biyomekanik Direnç Profilleri & ACE Egzersiz Rehberi'
  },
  {
    id: 'face-pull',
    slug: 'face-pull',
    trName: 'Halatla Yüze Çekiş',
    enName: 'Face Pull',
    aliases: ['face pull', 'halat arka omuz', 'yüze çekiş', 'rotator manşet egzersizi'],
    shortDescription:
      'Kablo makinesinde halat aparatını yüz/alın hizasına doğru çekip dış rotasyonla tamamlayan, arka omuz, orta trapez ve omuz sağlığı için en değerli hareketlerden biri.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['sirt'],
    primaryMuscles: ['Arka Omuz (Posterior Deltoid)', 'Infraspinatus ve Teres Minor (Dış Rotatörler)'],
    secondaryMuscles: ['Orta ve Alt Trapezius', 'Rhomboideus'],
    stabilizerMuscles: ['Core ve Gövde Dengeleyicileri'],
    subRegionTag: 'Arka Omuz, Dış Rotasyon & Omuz Sağlığı',
    equipment: ['kablo-makinesi'],
    environments: ['salon'],
    environmentNote: 'Spor salonunda halatlı kablo makinesinde, evde ise göz hizasına sabitlenmiş bir direnç bandıyla uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'cekis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Makarayı üst göğüs veya yüz hizasına ayarlayın ve halat (rope) aparatını takın. Halatın iki ucunu başparmaklarınız geriye (size) bakacak şekilde kavrayıp bir adım geri çekilin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirseklerinizi omuz hizasında yüksek tutarak halatın iki ucunu birbirinden ayırıp yüzünüze / alnınıza doğru çekin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Elleriniz kulaklarınızın yanına geldiğinde ve başparmaklarınız geriyi gösterdiğinde (çift biceps pozu gibi) arka omuz ve kürek kemiklerinizin arasını 1–2 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Kollarınızı kontrollü şekilde ileri uzatarak başlangıç pozisyonuna dönün.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yüzünüze doğru çekerken nefes verin, tepe noktada 1 saniye bekleyin ve dönerken nefes alın.'
      }
    ],
    cues: [
      'Sadece dirsekleri geriye çekmekle kalmayın; ellerinizi de kulaklarınızın yanına açarak omuz dış rotasyonunu mutlaka tamamlayın.',
      'Bu bir ağır kilo hareketi değildir; hafif-orta ağırlıkla yüksek kontrol ve sıkıştırma hedeflenmelidir.'
    ],
    commonMistakes: [
      {
        mistake: 'Çok ağır kilo takıp belden geriye yatarak halatı göğse/boğaza çekmek.',
        correction: 'Ağırlığı düşürün ve halatı ikiye ayırarak alın/kulak hizasına çekin.'
      },
      {
        mistake: 'Dirseklerin aşağı düşmesine izin vermek.',
        correction: 'Dirsekleri hareket sonunda omuz hizasında tutun.'
      },
      {
        mistake: 'Başı öne doğru uzatarak halata yaklaşmak.',
        correction: 'Boynunuzu dik ve nötr tutun; halatı yüzünüze doğru siz çekin.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 tekrar',
      intermediate: '3–4 set × 15–20 tekrar (tepede 1–2 sn duraksamalı)',
      note: 'Yoğun Bench Press ve Overhead Press yapılan programlarda omuz kuşağı dengesini korumak için her antrenmana eklenebilir.'
    },
    alternatives: {
      easier: 'resistance-band-row',
      harder: 'rear-delt-raise',
      equipmentAlt: ['rear-delt-raise', 'resistance-band-row'],
      homeAlt: 'rear-delt-raise'
    },
    animation: {
      poseId: 'face-pull',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Üst makaradaki halatı yüz hizasına doğru çekip ellerini kulak yanlarına açarak arka omuzlarını sıkıştıran sporcuyu gösteren animasyon.',
      startLabel: 'Kollar İleride',
      endLabel: 'Yüz Hizası Dış Rotasyon'
    },
    editorialSource: 'JOSPT Omuz Kuşağı Rehabilitasyon ve Kuvvetlendirme İlkeleri'
  },
  {
    id: 'band-shoulder-press',
    slug: 'band-shoulder-press',
    trName: 'Direnç Bandı Omuz Pres',
    enName: 'Band Shoulder Press',
    aliases: ['lastikle omuz pres', 'direnç bandı baş üstü itiş', 'evde bant omuz'],
    shortDescription:
      'Ayakların altına sabitlenen direnç bandını omuz hizasından baş üstüne iterek ön ve orta omuz kaslarını evde güvenle çalıştıran hareket.',
    primaryMuscleGroup: 'omuz',
    secondaryMuscleGroups: ['triceps', 'karin-core'],
    primaryMuscles: ['Ön Omuz (Anterior Deltoid)', 'Orta Omuz (Lateral Deltoid)'],
    secondaryMuscles: ['Triceps Brachii', 'Üst Trapezius', 'Serratus Anterior'],
    stabilizerMuscles: ['Rotator Manşet', 'Core Kasları'],
    subRegionTag: 'Ön & Orta Omuz (Direnç Bandı / Ev)',
    equipment: ['direnc-bandi'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Uzun direnç bandının üzerine bir veya iki ayağınızla sağlamca basın. Bandın üst kısmını ellerinizle kavrayıp omuz/köprücük kemiği hizanıza getirin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Karın ve kalçanızı sıkarak dirseklerinizi hafif önde tutup bandı başınızın üzerine doğru dikey olarak itin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kollarınız baş üstünde uzandığında bandın artan direncine karşı 1 saniye dengede kalın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Bandın kollarınızı hızla aşağı çekmesine izin vermeden 2–3 saniyede omuz hizanıza geri indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yukarı iterken nefes verin, kontrollü indirirken nefes alın.'
      }
    ],
    cues: [
      'Bant gerginliği fazla gelirse iki ayağınız yerine tek ayağınızla bandın üzerine basarak direnci azaltabilirsiniz.',
      'Bileklerinizi geriye bükmeden düz tutun.'
    ],
    commonMistakes: [
      {
        mistake: 'Bandı ayak parmak ucuna basıp kayma riski oluşturmak.',
        correction: 'Bandı her zaman ayağınızın tam ortasına sağlamca sabitleyin.'
      },
      {
        mistake: 'Bandın tepe noktadaki yüksek direncine karşı belden geriye bükülmek.',
        correction: 'Karın kaslarınızı sıkın; bel bükülüyorsa daha hafif bir bant seçin.'
      },
      {
        mistake: 'İniş fazında bandı kontrolsüz bırakmak.',
        correction: 'Negatif fazda dirence karşı koyarak yavaşça inin.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 tekrar',
      intermediate: '3–4 set × 12–15 tekrar',
      note: 'Evde veya seyahatte dambıl olmadan baş üstü itiş paternini korumak için çok pratiktir.'
    },
    alternatives: {
      easier: 'incline-push-up',
      harder: 'dumbbell-shoulder-press',
      equipmentAlt: ['dumbbell-shoulder-press', 'pike-push-up', 'barbell-overhead-press'],
      homeAlt: 'pike-push-up'
    },
    animation: {
      poseId: 'overhead-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ayaklarının altına sabitlediği direnç bandını omuz hizasından baş üstüne doğru iten sporcuyu gösteren animasyon.',
      startLabel: 'Bant Omuz Hizasında',
      endLabel: 'Baş Üstü Gergin İtiş'
    },
    editorialSource: 'ACSM Direnç Bandı Egzersiz İlkeleri'
  },

  // =========================================================================
  // BICEPS (6 HAREKET)
  // =========================================================================
  {
    id: 'dumbbell-biceps-curl',
    slug: 'dumbbell-biceps-curl',
    trName: 'Dambıl Biceps Curl',
    enName: 'Dumbbell Biceps Curl',
    aliases: ['biceps curl', 'dambıl ön kol', 'dumbbell curl', 'pazu hareketi'],
    shortDescription:
      'Avuç içlerini yukarı çevirerek dirsekleri büken, üst kolun ön kısmındaki Biceps Brachii kasını doğrudan çalıştıran temel izolasyon hareketi.',
    primaryMuscleGroup: 'biceps',
    secondaryMuscleGroups: ['on-kol'],
    primaryMuscles: ['Biceps Brachii (Uzun ve Kısa Baş)', 'Brachialis'],
    secondaryMuscles: ['Brachioradialis', 'Ön Kol Fleksörleri'],
    stabilizerMuscles: ['Ön Omuz (İzometrik)', 'Core ve Kürek Kemiği Sabitleyicileri'],
    subRegionTag: 'Temel Biceps & Süpinasyon',
    equipment: ['dumbbell'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızı kalça genişliğinde açarak dik durun. Dambılları yanlarınızda kollarınız uzun olacak şekilde tutun, omuzlarınızı geriye-aşağıya sabitleyin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Üst kollarınızı gövdenizin yanında sabit tutarak dirseklerinizi bükün ve ağırlıkları kaldırırken avuç içlerinizi yukarı (süpinasyon) çevirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Dambıllar omuz hizasına yaklaştığında dirseklerinizi öne kaçırmadan biceps kaslarınızı 1 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Ağırlıkları 2–3 saniyede, dirsekleriniz tamamen açılana kadar kontrollü şekilde başlangıç pozisyonuna indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Bükerken nefes verin, indirirken nefes alın.'
      }
    ],
    cues: [
      'Biceps kasının iki görevi vardır: dirseği bükmek ve ön kolu dışa çevirmek (süpinasyon). Kaldırış sırasında serçe parmağınızı hafifçe dışa-yukarı çevirmek kasılmayı güçlendirir.',
      'İki kolu aynı anda veya sağ-sol sırayla (alternatif) uygulayabilirsiniz.'
    ],
    commonMistakes: [
      {
        mistake: 'Belden geriye sallanarak ağırlığı ivmeyle kaldırmak.',
        correction: 'Gövdenizi sabit tutun; sallanma ihtiyacı duyuyorsanız dambıl ağırlığını azaltın.'
      },
      {
        mistake: 'Tepe noktada dirsekleri öne-yukarı kaldırıp yükü ön omuza bindirmek.',
        correction: 'Üst kolunuzu gövde yanında yere dik tutun.'
      },
      {
        mistake: 'İnişte kolları tam açmadan yarım tekrar yapmak.',
        correction: 'Her tekrarın sonunda kolları kontrollü biçimde tam uzatın.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3–4 set × 8–12 tekrar',
      note: 'Hem evde hem salonda biceps gelişimi için en temel başlangıç hareketidir.'
    },
    alternatives: {
      easier: 'resistance-band-curl',
      harder: 'barbell-curl',
      equipmentAlt: ['barbell-curl', 'cable-curl', 'resistance-band-curl', 'hammer-curl'],
      homeAlt: 'resistance-band-curl'
    },
    animation: {
      poseId: 'biceps-curl',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ayakta dik duran sporcunun üst kollarını sabit tutarak dirseklerini büküp dambılları omuz hizasına kaldırmasını gösteren animasyon.',
      startLabel: 'Kollar Yanda Uzun',
      endLabel: 'Dirsek Bükülü (Tepe Sıkıştırma)'
    },
    editorialSource: 'ACE & NSCA İzolasyon Egzersizleri Rehberi'
  },
  {
    id: 'hammer-curl',
    slug: 'hammer-curl',
    trName: 'Çekiç Tutuş Dambıl Curl',
    enName: 'Hammer Curl',
    aliases: ['hammer curl', 'çekiç curl', 'nötr tutuş biceps', 'brachialis curl'],
    shortDescription:
      'Avuç içleri birbirine bakacak (nötr) şekilde uygulanan, Biceps Brachii ile birlikte derin Brachialis ve ön kolun üst kısmındaki Brachioradialis kaslarını güçlendiren hareket.',
    primaryMuscleGroup: 'biceps',
    secondaryMuscleGroups: ['on-kol'],
    primaryMuscles: ['Brachialis', 'Biceps Brachii (Özellikle Uzun Baş)', 'Brachioradialis (Üst Ön Kol)'],
    secondaryMuscles: ['Ön Kol Kavrama Kasları (Fleksör ve Ekstansörler)'],
    stabilizerMuscles: ['Ön Omuz', 'Core Sabitleyicileri'],
    subRegionTag: 'Biceps, Brachialis & Üst Ön Kol',
    equipment: ['dumbbell'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayakta dik durun, dambılları avuç içleriniz birbirine (gövdenize) bakacak ve başparmaklarınız karşıyı gösterecek şekilde yanlarınızda tutun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Bilek açınızı hiç değiştirmeden (çekiç vurur gibi nötr tutuşta) dirseklerinizi bükerek dambılları omuz hizanıza doğru kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Tepe noktada üst kolunuzu öne kaçırmadan ön kol ve biceps kaslarınızı 1 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Aynı nötr tutuşla dambılları 2–3 saniyede başlangıç noktasına indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Kaldırırken nefes verin, indirirken nefes alın.'
      }
    ],
    cues: [
      'Nötr tutuş el bileği için en doğal açılardan biridir; düz barda bilek ağrısı yaşayanlar için çok konforludur.',
      'Dambılın üst ucunu tutamağın ortasından sıkıca kavrayarak bileğinizi sabit tutun.'
    ],
    commonMistakes: [
      {
        mistake: 'Omuzları öne yuvarlayıp gövdeyle sallanmak.',
        correction: 'Göğsü dik, kürek kemiklerini geride ve üst kolu gövde yanında sabit tutun.'
      },
      {
        mistake: 'Bileği yukarı-aşağı bükerek ağırlığı kaldırmaya çalışmak.',
        correction: 'El bileğinizi ön kol kemiğinizle düz bir hat halinde kilitleyin.'
      },
      {
        mistake: 'Ağırlığı aşağı hızla bırakıp kolları sallandırmak.',
        correction: 'Alt noktada dambılların bacak yanlarınızda sallanmasına izin vermeden kontrollü durun.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3–4 set × 10–12 tekrar',
      note: 'Hem üst kol kalınlığı (Brachialis) hem de ön kol/kavrama kuvveti için çift yönlü fayda sağlar.'
    },
    alternatives: {
      easier: 'dumbbell-biceps-curl',
      harder: 'reverse-barbell-curl',
      equipmentAlt: ['dumbbell-biceps-curl', 'cable-curl', 'reverse-barbell-curl'],
      homeAlt: 'dumbbell-biceps-curl'
    },
    animation: {
      poseId: 'biceps-curl',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Avuç içleri birbirine dönük çekiç tutuşla dambılları omuz hizasına kaldıran ve indiren sporcuyu gösteren animasyon.',
      startLabel: 'Nötr Tutuş Başlangıç',
      endLabel: 'Tepe Çekiç Büküş'
    },
    editorialSource: 'NSCA & Üst Ekstremite Biyomekaniği'
  },
  {
    id: 'concentration-curl',
    slug: 'concentration-curl',
    trName: 'Oturarak Konsantrasyon Curl',
    enName: 'Concentration Curl',
    aliases: ['concentration curl', 'konsantre biceps', 'oturarak tek kol curl'],
    shortDescription:
      'Oturarak üst kolun arkasını iç uyluğa dayayıp gövde ivmesini tamamen devre dışı bırakan, biceps kasını yüksek odakla izole eden tek kol hareketi.',
    primaryMuscleGroup: 'biceps',
    secondaryMuscleGroups: ['on-kol'],
    primaryMuscles: ['Biceps Brachii (Kısa ve Uzun Baş)', 'Brachialis'],
    secondaryMuscles: ['Brachioradialis', 'Ön Kol Fleksörleri'],
    stabilizerMuscles: ['Omuz Kuşağı Sabitleyicileri'],
    subRegionTag: 'Saf Biceps İzolasyonu (Sallantısız)',
    equipment: ['dumbbell', 'bench-sehpa'],
    environments: ['ev', 'salon'],
    environmentNote: 'Sehpa kenarında veya evde sağlam bir sandalye/tabure üzerinde oturarak uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'tek-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Sehpanın ucuna oturun, bacaklarınızı genişçe açın. Sağ elinize dambılı alın, hafifçe öne eğilin ve sağ üst kolunuzun arka (triceps) kısmını sağ iç uyluğunuza yaslayın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Üst kolunuzu bacağınızdan ayırmadan dirseğinizi bükerek dambılı yüzünüze/omuzunuza doğru kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Tepe noktada avuç içinizi tamamen yukarı çevirip biceps kasınızı 1–2 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Kolunuz tamamen uzayana kadar dambılı 2–3 saniyede kontrollü şekilde indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Kaldırırken nefes verin, yavaşça indirirken nefes alın.'
      }
    ],
    cues: [
      'Uyluğunuza dirseğinizin sivri kemiğini değil, dirseğin hemen üstündeki arka kol (triceps) etli kısmını yaslayın.',
      'Boştaki elinizle diğer dizinizden destek alarak sırtınızı rahat ve sabit tutun.'
    ],
    commonMistakes: [
      {
        mistake: 'Kaldırış sırasında dirseği uyluktan havaya kaldırıp omuzdan yardım almak.',
        correction: 'Üst kolunuzun arkasını hareket boyunca iç uyluğunuza yapışık tutun.'
      },
      {
        mistake: 'Gövdeyi geriye çekerek ağırlığı kaldırmak.',
        correction: 'Gövde açınızı sabit tutun ve daha hafif bir dambıl seçin.'
      },
      {
        mistake: 'Alt noktada dirseği sertçe kilitleyip ağırlığı boşa bırakmak.',
        correction: 'Kolunuzu tam uzatın ancak eklemi sertçe çarptırmadan kas kontrolünü sürdürün.'
      }
    ],
    programming: {
      beginner: '3 set × her kol için 10–12 tekrar',
      intermediate: '3 set × her kol için 10–15 tekrar',
      note: 'EMG ölçümlerinde omuz müdahalesini en aza indirerek yüksek biceps aktivasyonu sağlayan hareketler arasında yer alır.'
    },
    alternatives: {
      easier: 'resistance-band-curl',
      harder: 'dumbbell-biceps-curl',
      equipmentAlt: ['dumbbell-biceps-curl', 'cable-curl', 'barbell-curl'],
      homeAlt: 'dumbbell-biceps-curl'
    },
    animation: {
      poseId: 'concentration-curl',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Sehpada oturup üst kolunu iç uyluğuna sabitleyen sporcunun tek kolla dambılı büküp indirmesini gösteren animasyon.',
      startLabel: 'Kol Uylukta Uzun',
      endLabel: 'Tam Konsantre Büküş'
    },
    editorialSource: 'ACE Biceps EMG Araştırması & NSCA Egzersiz Rehberi'
  },
  {
    id: 'barbell-curl',
    slug: 'barbell-curl',
    trName: 'Ayakta Halter Biceps Curl',
    enName: 'Barbell Curl',
    aliases: ['barbell curl', 'halter ön kol', 'z bar curl', 'ez bar curl', 'barla pazu'],
    shortDescription:
      'İki elle kavranan düz bar veya EZ bar ile yapılan, her iki kolun birlikte yüksek direnç üretmesini sağlayan klasik biceps hareketi.',
    primaryMuscleGroup: 'biceps',
    secondaryMuscleGroups: ['on-kol'],
    primaryMuscles: ['Biceps Brachii (Kısa ve Uzun Baş)', 'Brachialis'],
    secondaryMuscles: ['Brachioradialis', 'Ön Kol Fleksörleri'],
    stabilizerMuscles: ['Ön Omuz', 'Core ve Üst Sırt Sabitleyicileri'],
    subRegionTag: 'Temel Çift El Biceps Kuvveti',
    equipment: ['barbell'],
    environments: ['salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayaklarınızı omuz genişliğinde açarak dik durun. Halter barını (veya bilek dostu açılı EZ barı) omuz genişliğinde, avuç içleriniz karşıya bakacak şekilde kavrayın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirseklerinizi gövdenizin iki yanında sabit tutarak barı yarım daire şeklinde bir yayla göğüs/omuz hizanıza doğru kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Ön kollarınız dikeye yaklaştığında biceps kaslarınızı 1 saniye sıkıştırın; barı omuzlarınızın üzerine dinlendirmeyin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Gövdenizi öne eğmeden barı 2–3 saniyede uyluklarınızın önüne kontrollü şekilde indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Kaldırırken nefes verin, indirirken nefes alın.'
      }
    ],
    cues: [
      'Düz bar el bileklerinizde veya dirsek iç kısmında hassasiyet yaratıyorsa kıvrımlı EZ-Bar kullanmak çok daha ergonomiktir.',
      'Omuz genişliğinden biraz dar tutuş uzun başı, biraz geniş tutuş ise iç/kısa başı hafifçe daha fazla vurgulayabilir.'
    ],
    commonMistakes: [
      {
        mistake: 'Kalçayı ve beli ileri iterek barı vücut ivmesiyle savurmak.',
        correction: 'Karın ve kalçanızı sıkın; gerekirse sırtınızı duvara yakın tutarak gövde sallanmasını önleyin.'
      },
      {
        mistake: 'Tepe noktada dirsekleri ileri kaldırıp barı göğüs üzerinde dinlendirmek.',
        correction: 'Dirsekleri gövde yanında sabit tutun ve ön kol yere dik olmadan hemen önce sıkıştırıp dönüşe geçin.'
      },
      {
        mistake: 'Bilekleri kendinize doğru bükerek ön kolları aşırı kasmak.',
        correction: 'Bilekleri nötr ve düz tutarak yükü biceps üzerinde bırakın.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3–4 set × 8–12 tekrar',
      note: 'İki kol aynı bara bağlı olduğu için sağ ve sol kolun eşit güç ürettiğinden emin olun.'
    },
    alternatives: {
      easier: 'dumbbell-biceps-curl',
      harder: 'chin-up',
      equipmentAlt: ['dumbbell-biceps-curl', 'cable-curl', 'resistance-band-curl'],
      homeAlt: 'dumbbell-biceps-curl'
    },
    animation: {
      poseId: 'biceps-curl',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ayakta dik duran sporcunun halter barını uyluk önünden göğüs hizasına doğru dirseklerini bükerek kaldırmasını gösteren animasyon.',
      startLabel: 'Bar Uyluk Önünde',
      endLabel: 'Bar Göğüs Hizasında'
    },
    editorialSource: 'NSCA Egzersiz Tekniği Kılavuzu'
  },
  {
    id: 'cable-curl',
    slug: 'cable-curl',
    trName: 'Kablo ile Biceps Curl',
    enName: 'Cable Curl',
    aliases: ['cable biceps curl', 'makara ön kol', 'halat biceps curl'],
    shortDescription:
      'Alt makaraya takılan düz bar veya halat ile yapılan, hareket açıklığının her noktasında sabit gerilim sağlayan biceps izolasyon hareketi.',
    primaryMuscleGroup: 'biceps',
    secondaryMuscleGroups: ['on-kol'],
    primaryMuscles: ['Biceps Brachii', 'Brachialis'],
    secondaryMuscles: ['Brachioradialis', 'Ön Kol Fleksörleri'],
    stabilizerMuscles: ['Ön Omuz', 'Core Sabitleyicileri'],
    subRegionTag: 'Sabit Gerilimli Biceps İzolasyonu',
    equipment: ['kablo-makinesi'],
    environments: ['salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Makarayı en alt konuma getirin, düz bar veya halat aparatını takın. Makineden yarım adım geride dik durun ve dirseklerinizi gövdenizin yanına sabitleyin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Üst kollarınızı oynatmadan aparatı omuzlarınıza doğru bükerek çekin (halat kullanıyorsanız tepe noktada avuç içlerinizi dışa çevirebilirsiniz).'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Tepe noktada kablo hala ileri-aşağı çektiği için biceps kaslarınızı 1 saniye boyunca güçlüce sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Plakaları birbirine çarptırmadan 2–3 saniyede kollarınız uzayana kadar kontrollü inin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Çekerken nefes verin, kontrollü salarken nefes alın.'
      }
    ],
    cues: [
      'Serbest ağırlıkta tepe noktada yerçekimi dik indiği için yük azalırken, kabloda yarım adım geride durduğunuzda tepe noktada da güçlü gerilim sürer.',
      'Omuzlarınızı geride ve göğsünüzü dik tutun.'
    ],
    commonMistakes: [
      {
        mistake: 'Makineye çok yapışık durup kablonun dikey çekmesine neden olmak.',
        correction: 'Kablo açısının avantajını kullanmak için makaradan 1 küçük adım geride durun.'
      },
      {
        mistake: 'Dirsekleri geriye çekerek hareketi dar row hareketine çevirmek.',
        correction: 'Dirseklerinizi gövde yanında sabit bir menteşe noktası gibi koruyun.'
      },
      {
        mistake: 'Negatif fazda ağırlığın kolları hızla aşağı çekmesine izin vermek.',
        correction: 'İniş fazını 2–3 saniyede kontrol ederek kas gerilim süresini koruyun.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 tekrar',
      intermediate: '3–4 set × 10–15 tekrar',
      note: 'Hem düz bar hem de halat (çekiç tutuş) aparatıyla çeşitlendirilebilir.'
    },
    alternatives: {
      easier: 'resistance-band-curl',
      harder: 'barbell-curl',
      equipmentAlt: ['dumbbell-biceps-curl', 'barbell-curl', 'resistance-band-curl'],
      homeAlt: 'resistance-band-curl'
    },
    animation: {
      poseId: 'biceps-curl',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Alt makaradaki kablo barını dirseklerini sabit tutarak omuz hizasına doğru büken sporcuyu gösteren animasyon.',
      startLabel: 'Alt Makara Başlangıç',
      endLabel: 'Tepe Kablo Sıkıştırma'
    },
    editorialSource: 'ACE Kablo Direnç Antrenmanı Rehberi'
  },
  {
    id: 'resistance-band-curl',
    slug: 'resistance-band-curl',
    trName: 'Direnç Bandı Biceps Curl',
    enName: 'Resistance Band Curl',
    aliases: ['bant biceps curl', 'lastikle ön kol', 'evde biceps hareketi'],
    shortDescription:
      'Ayakların altına sabitlenen direnç bandıyla evde ekipmansız veya minimal ekipmanla biceps kaslarını çalıştıran eklem dostu hareket.',
    primaryMuscleGroup: 'biceps',
    secondaryMuscleGroups: ['on-kol'],
    primaryMuscles: ['Biceps Brachii', 'Brachialis'],
    secondaryMuscles: ['Brachioradialis'],
    stabilizerMuscles: ['Core ve Omuz Kuşağı Sabitleyicileri'],
    subRegionTag: 'Ev Dostu Biceps İzolasyonu',
    equipment: ['direnc-bandi'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Direnç bandının ortasına ayaklarınızla basın ve uçlarını avuç içleriniz karşıya bakacak şekilde kavrayın. Kollarınız aşağıdayken bantta hafif bir başlangıç gerginliği olsun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirseklerinizi gövdenizin yanına sabitleyerek ellerinizi omuzlarınıza doğru bükün.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Bandın en yüksek direnç ürettiği tepe noktada 1–2 saniye duraksayıp biceps kaslarınızı sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Bandın ellerinizi hızla aşağı çekmesine izin vermeden yavaşça başlangıç pozisyonuna dönün.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Bükerken nefes verin, kontrollü indirirken nefes alın.'
      }
    ],
    cues: [
      'Ayaklarınızı birbirine yakın basarsanız direnç azalır, daha geniş açarak basarsanız bant kısaldığı için direnç artar.',
      'Tepe noktada 1 saniyelik duraksama, bandın elastik direnç eğrisinden en yüksek verimi almanızı sağlar.'
    ],
    commonMistakes: [
      {
        mistake: 'Kollar aşağıdayken bandın tamamen gevşek kalması.',
        correction: 'Bandı biraz daha aşağıdan kavrayarak hareketin en alt noktasında da hafif gerginlik oluşturun.'
      },
      {
        mistake: 'Bilekleri geriye bükerek bandı tutmak.',
        correction: 'Bileklerinizi düz ve sıkı tutun.'
      },
      {
        mistake: 'Bandın çekişiyle iniş fazını kontrolsüzce bırakmak.',
        correction: '2–3 saniyelik yavaş iniş temposu uygulayın.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 tekrar',
      intermediate: '3–4 set × 15–20 tekrar (tepede 2 sn sıkıştırmalı)',
      note: 'Evde veya seyahatte eklem üzerinde ani yük oluşturmadan kol çalıştırmak için idealdir.'
    },
    alternatives: {
      easier: 'dumbbell-biceps-curl',
      harder: 'chin-up',
      equipmentAlt: ['dumbbell-biceps-curl', 'cable-curl', 'barbell-curl'],
      homeAlt: 'dumbbell-biceps-curl'
    },
    animation: {
      poseId: 'biceps-curl',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Ayaklarının altına bastığı direnç bandını dirseklerini bükerek omuz hizasına çeken sporcuyu gösteren animasyon.',
      startLabel: 'Bant Altta Gergin',
      endLabel: 'Tepe Sıkıştırma'
    },
    editorialSource: 'ACSM Direnç Bandı Egzersiz Kılavuzu'
  },

  // =========================================================================
  // TRICEPS (6 HAREKET)
  // =========================================================================
  {
    id: 'close-grip-push-up',
    slug: 'close-grip-push-up',
    trName: 'Dar Tutuş Şınav',
    enName: 'Close-grip Push-up',
    aliases: ['dar şınav', 'arka kol şınav', 'elmas şınav', 'triceps push-up'],
    shortDescription:
      'Ellerin omuz genişliğinden biraz daha dar yerleştirilmesi ve dirseklerin gövdeye yakın bükülmesiyle arka kol (triceps) ve iç-orta göğüs aktivasyonunu artıran vücut ağırlığı hareketi.',
    primaryMuscleGroup: 'triceps',
    secondaryMuscleGroups: ['gogus', 'omuz', 'karin-core'],
    primaryMuscles: ['Triceps Brachii (Yan ve Medial Baş)'],
    secondaryMuscles: ['Pectoralis Major', 'Ön Omuz (Anterior Deltoid)'],
    stabilizerMuscles: ['Rectus Abdominis', 'Serratus Anterior', 'Kalça Kasları'],
    subRegionTag: 'Vücut Ağırlığı Triceps & İtiş',
    equipment: ['vucut-agirligi'],
    environments: ['ev', 'salon'],
    level: 'orta',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ellerinizi omuz genişliğinden biraz daha dar (bileklerinizi zorlayacak kadar tamamen bitişik değil, yaklaşık göğüs genişliğinde) yere yerleştirin ve düz bir plank hattı oluşturun.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirseklerinizi yanlara açmadan, kaburgalarınıza teğet geçecek şekilde geriye doğru bükerek gövdenizi indirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Alt göğsünüz ellerinize yaklaştığında arka kollarınızdaki gerilimi hissedin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Avuç içlerinizle yeri iterek dirseklerinizi düzleştirin ve başlangıç pozisyonuna yükselin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İnerken 2 saniyede nefes alın, yukarı iterken nefes verin.'
      }
    ],
    cues: [
      'Ellerinizi elmas şeklinde tamamen bitiştirmek bilek ve dirseklerde rahatsızlık veriyorsa, eller arasında 15–20 cm boşluk bırakmak hem eklem dostudur hem de triceps kasını çok güçlü çalıştırır.',
      'Zorlanırsanız ellerinizi bir sehpa üzerine koyarak (Incline Dar Şınav) hareketi kolaylaştırabilirsiniz.'
    ],
    commonMistakes: [
      {
        mistake: 'Eller dar iken dirsekleri yanlara doğru açmak.',
        correction: 'Dirsekleri gövdeye yakın ve geriye doğru yönlendirin; aksi halde el bilekleri ve omuzlar zorlanır.'
      },
      {
        mistake: 'Beli aşağı sarkıtıp yarım tekrar yapmak.',
        correction: 'Gövdeyi tek parça halinde düz tutun; zor geliyorsa yükselti kullanın.'
      },
      {
        mistake: 'Omuzları kulaklara doğru çekmek.',
        correction: 'Boynu uzun, kürek kemiklerini dengeli tutun.'
      }
    ],
    programming: {
      beginner: 'Yükseltide 3 set × 8–10 tekrar',
      intermediate: '3–4 set × 8–15 tekrar',
      note: 'Evde ekipmansız arka kol geliştirmek için en etkili bileşik harekettir.'
    },
    alternatives: {
      easier: 'push-up',
      harder: 'close-grip-bench-press',
      equipmentAlt: ['close-grip-bench-press', 'cable-triceps-pushdown', 'dumbbell-triceps-kickback'],
      homeAlt: 'push-up'
    },
    animation: {
      poseId: 'pushup',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Dar el yerleşimiyle dirseklerini gövdeye yakın bükerek şınav çeken ve arka kollarını çalıştıran sporcuyu gösteren animasyon.',
      startLabel: 'Dar Plank Başlangıç',
      endLabel: 'Dirsekler Gövde Yanında Alt Nokta'
    },
    editorialSource: 'Journal of Strength and Conditioning Research — El Genişliği ve Triceps EMG Analizi'
  },
  {
    id: 'dumbbell-overhead-triceps-extension',
    slug: 'dumbbell-overhead-triceps-extension',
    trName: 'Baş Üstü Dambıl Triceps Uzatma',
    enName: 'Dumbbell Overhead Triceps Extension',
    aliases: ['overhead triceps extension', 'baş üstü arka kol', 'fransız pres dambıl', 'triceps uzatma'],
    shortDescription:
      'Kolların baş üstüne kaldırılması sayesinde kürek kemiğine bağlanan Triceps uzun başını tam esneme altında çalıştıran izolasyon hareketi.',
    primaryMuscleGroup: 'triceps',
    secondaryMuscleGroups: [],
    primaryMuscles: ['Triceps Brachii (Özellikle Uzun Baş / Caput Longum)', 'Triceps Yan ve Medial Baş'],
    secondaryMuscles: ['Anconeus (Dirsek Destek Kası)'],
    stabilizerMuscles: ['Rotator Manşet', 'Core ve Gövde Sabitleyicileri'],
    subRegionTag: 'Triceps Uzun Baş (Baş Üstü Esneme)',
    equipment: ['dumbbell'],
    environments: ['ev', 'salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayakta dik durun veya sırt destekli bir sehpaya oturun. Tek bir dambılın üst plakasını iki elinizin avuç içiyle alttan elmas şeklinde kavrayıp başınızın üzerine kaldırın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Üst kollarınızı kulaklarınızın yanında sabit tutarak sadece dirseklerinizi bükün ve dambılı başınızın arkasına doğru kontrollü şekilde indirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Ön kollarınız yere paralel seviyenin biraz altına indiğinde arka kolunuzun uzun başında güçlü bir esneme hissedin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Dirseklerinizi yanlara açmadan ağırlığı baş üstüne doğru geri uzatarak kollarınızı düzleştirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Baş arkasına indirirken 2–3 saniyede nefes alın, yukarı uzatırken nefes verin.'
      }
    ],
    cues: [
      'Dambılı başınızın üzerinden geçirirken sabitleme klipslerinin sağlam olduğundan emin olun ve ağırlığı her zaman başınızın arkasındaki güvenli hatta tutun.',
      'Kaburgalarınızı aşağı bastırarak belinizin aşırı çukurlaşmasını önleyin.'
    ],
    commonMistakes: [
      {
        mistake: 'İniş sırasında dirsekleri iki yana doğru aşırı açmak.',
        correction: 'Dirseklerinizi karşıya-yukarıya doğru yönlendirerek üst kolları sabit tutun.'
      },
      {
        mistake: 'Beli aşırı çukurlaştırıp boynu öne bükmek.',
        correction: 'Karın kaslarınızı sıkın ve bakışlarınızı karşıda tutun; gerekirse sırt destekli oturun.'
      },
      {
        mistake: 'Ağırlığı ensenin arkasından zıplatarak kaldırmak.',
        correction: 'Dip noktada kontrollü durup sarsıntısız şekilde yukarı uzatın.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3–4 set × 10–15 tekrar',
      note: 'Triceps uzun başı omuz eklemini de geçtiği için kolun baş üstünde olduğu bu açı uzun baş gelişimi için çok etkilidir.'
    },
    alternatives: {
      easier: 'dumbbell-triceps-kickback',
      harder: 'skull-crusher',
      equipmentAlt: ['skull-crusher', 'cable-triceps-pushdown', 'dumbbell-triceps-kickback'],
      homeAlt: 'dumbbell-triceps-kickback'
    },
    animation: {
      poseId: 'overhead-triceps',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Başının üzerinde iki eliyle tuttuğu dambılı dirseklerini bükerek baş arkasına indirip tekrar yukarı uzatan sporcuyu gösteren animasyon.',
      startLabel: 'Kollar Baş Üstünde Uzun',
      endLabel: 'Dirsek Bükülü (Baş Arkası Esneme)'
    },
    editorialSource: 'European Journal of Sport Science — Baş Üstü Triceps Hipertrofi Çalışmaları'
  },
  {
    id: 'dumbbell-triceps-kickback',
    slug: 'dumbbell-triceps-kickback',
    trName: 'Eğilerek Dambıl Arka Kol İtişi',
    enName: 'Dumbbell Triceps Kickback',
    aliases: ['triceps kickback', 'dambıl arka kol itiş', 'kickback'],
    shortDescription:
      'Gövde öne eğikken üst kolu yere paralel sabitleyip dirseği geriye doğru düzleştiren, triceps kasının tam kasılma (kısalmış) pozisyonunu çalıştıran hareket.',
    primaryMuscleGroup: 'triceps',
    secondaryMuscleGroups: ['omuz'],
    primaryMuscles: ['Triceps Brachii (Yan, Medial ve Uzun Baş)'],
    secondaryMuscles: ['Arka Omuz (İzometrik Üst Kol Sabitleyici)'],
    stabilizerMuscles: ['Core ve Sırt Sabitleyicileri'],
    subRegionTag: 'Triceps Tam Sıkıştırma (Kısalmış Pozisyon)',
    equipment: ['dumbbell', 'bench-sehpa'],
    environments: ['ev', 'salon'],
    environmentNote: 'Sehpadan destek alarak veya ayakta kalçadan öne eğilerek yalnızca dambıl ile uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'tek-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Bir elinizle sehpadan (veya uyluğunuzdan) destek alarak üst gövdenizi yere paralel eğin. Diğer elinizdeki dambulla üst kolunuzu gövdenizin yanına ve yere paralel olacak şekilde kaldırıp sabitleyin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Üst kolunuzu hiç oynatmadan sadece dirseğinizi açarak dambılı geriye doğru düzleştirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kolunuz yere paralel şekilde tamamen düzleştiğinde arka kolunuzu 1 saniye boyunca güçlüce sıkın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Dirseğinizi düşürmeden ön kolunuzu kontrollü şekilde 90 derece bükülü başlangıç noktasına geri getirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Geriye uzatırken nefes verin, bükerken nefes alın.'
      }
    ],
    cues: [
      'Ağırlığı sarkaç gibi ileri-geri sallamayın; ön kol yere dik noktaya geldiğinde durup tekrar geriye uzatın.',
      'Tepe noktada 1 saniye duraksamak bu hareketin etkinliğini iki katına çıkarır.'
    ],
    commonMistakes: [
      {
        mistake: 'Üst kolu ve dirseği aşağı düşürüp dambılı omuzdan sallamak.',
        correction: 'Dirseğinizi gövde yan çizgisinde yüksek ve sabit tutun.'
      },
      {
        mistake: 'Ağır dambıl seçip kolu tam düzleştirememek.',
        correction: 'Kickback hareketinde en yüksek yük kol tam düzleştiğinde oluşur; kolu tam açabileceğiniz hafif bir dambıl seçin.'
      },
      {
        mistake: 'Gövdeyi dik tutup yerçekimi açısını kaybetmek.',
        correction: 'Üst gövdenizi yere paralel eğin ki kol geriye açıldığında yerçekimine karşı çalışsın.'
      }
    ],
    programming: {
      beginner: '3 set × her kol için 12–15 tekrar',
      intermediate: '3 set × her kol için 12–15 tekrar (tepede 1 sn sıkıştırmalı)',
      note: 'Evde sadece dambıl ile arka kolun sıkışma fazını çalıştırmak için çok pratiktir.'
    },
    alternatives: {
      easier: 'close-grip-push-up',
      harder: 'dumbbell-overhead-triceps-extension',
      equipmentAlt: ['cable-triceps-pushdown', 'dumbbell-overhead-triceps-extension', 'close-grip-push-up'],
      homeAlt: 'dumbbell-overhead-triceps-extension'
    },
    animation: {
      poseId: 'kickback',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Öne eğilmiş sporcunun üst kolunu yere paralel sabit tutarak ön kolunu geriye doğru düzleştirip bükmesini gösteren animasyon.',
      startLabel: 'Dirsek 90 Derece Bükülü',
      endLabel: 'Kol Geride Tam Düz'
    },
    editorialSource: 'ACE Triceps Aktivasyon Çalışması'
  },
  {
    id: 'cable-triceps-pushdown',
    slug: 'cable-triceps-pushdown',
    trName: 'Kablo ile Arka Kol İtişi',
    enName: 'Cable Triceps Pushdown',
    aliases: ['triceps pushdown', 'rope pushdown', 'halat arka kol', 'makara triceps itiş'],
    shortDescription:
      'Üst makaradan halat veya düz barı aşağı doğru iterek dirsekleri düzleştiren, salon antrenmanlarının en popüler ve eklem dostu triceps izolasyon hareketi.',
    primaryMuscleGroup: 'triceps',
    secondaryMuscleGroups: [],
    primaryMuscles: ['Triceps Brachii (Yan ve Medial Baş)', 'Triceps Uzun Baş'],
    secondaryMuscles: ['Anconeus'],
    stabilizerMuscles: ['Latissimus Dorsi ve Omuz Kuşağı Sabitleyicileri', 'Core Kasları'],
    subRegionTag: 'Temel Kablo Triceps İzolasyonu',
    equipment: ['kablo-makinesi'],
    environments: ['salon'],
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Makarayı en üst konuma ayarlayın, halat veya düz/V bar aparatını takın. Aparatı kavrayıp bir adım geri çıkın, gövdenizi çok hafif (10–15 derece) öne eğin ve dirseklerinizi gövdenizin yanına sabitleyin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Üst kollarınızı oynatmadan aparatı uyluklarınıza doğru aşağı itin (halat kullanıyorsanız alt noktada uçları hafifçe iki yana açın).'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Kollarınız tamamen düzleştiğinde arka kol kaslarınızı 1 saniye sıkıştırın.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Dirseklerinizi öne-yukarı kaçırmadan, ön kollarınız yere paralel seviyenin biraz üstüne çıkana kadar yavaşça geri bırakın.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Aşağı iterken nefes verin, kontrollü yukarı bırakırken 2 saniyede nefes alın.'
      }
    ],
    cues: [
      'Omuzlarınızı aşağı bastırıp göğsünüzü dik tutun; ağırlığın üzerine vücudunuzla abanmayın.',
      'Halat aparatı, bileklerin doğal açıda kalmasını ve alt noktada tam sıkıştırma yapılmasını kolaylaştırır.'
    ],
    commonMistakes: [
      {
        mistake: 'Ağır kiloyu basmak için omuzları öne düşürüp gövde ağırlığıyla barın üstüne abanmak.',
        correction: 'Gövdeyi sabit tutun; sadece dirsek eklemi bükülüp açılsın.'
      },
      {
        mistake: 'Her tekrarda dirsekleri ileri-geri sallamak.',
        correction: 'Üst kollarınızı kaburgalarınızın yanında sabit bir menteşe gibi koruyun.'
      },
      {
        mistake: 'Alt noktada dirsekleri tam açmadan yarım tekrar yapmak.',
        correction: 'Triceps kası tam uzatmada (ekstansiyonda) en güçlü şekilde kasılır; alt noktada kolları kontrollüce düzleştirin.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 tekrar',
      intermediate: '3–4 set × 10–15 tekrar',
      note: 'Isınması kolay ve dirsek dostu olduğu için triceps çalışmasına başlamak adına ideal bir seçimdir.'
    },
    alternatives: {
      easier: 'dumbbell-triceps-kickback',
      harder: 'skull-crusher',
      equipmentAlt: ['dumbbell-overhead-triceps-extension', 'skull-crusher', 'close-grip-push-up'],
      homeAlt: 'close-grip-push-up'
    },
    animation: {
      poseId: 'triceps-pushdown',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Üst makaradaki aparatı dirseklerini gövde yanında sabit tutarak aşağı doğru itip düzleştiren sporcuyu gösteren animasyon.',
      startLabel: 'Ön Kollar Yukarıda',
      endLabel: 'Kollar Aşağıda Tam Düz'
    },
    editorialSource: 'NSCA & ACE Kablo Triceps Tekniği'
  },
  {
    id: 'skull-crusher',
    slug: 'skull-crusher',
    trName: 'Yatarak Alna Triceps İndiriş',
    enName: 'Skull Crusher (Lying Triceps Extension)',
    aliases: ['skull crusher', 'lying triceps extension', 'alna триseps', 'yatarak z bar arka kol'],
    shortDescription:
      'Düz sehpada sırtüstü uzanarak barın alın/baş gerisine indirilip uzatıldığı, triceps kasının üç başını da yüksek gerilimle çalıştıran hareket.',
    primaryMuscleGroup: 'triceps',
    secondaryMuscleGroups: [],
    primaryMuscles: ['Triceps Brachii (Uzun, Yan ve Medial Baş)'],
    secondaryMuscles: ['Anconeus'],
    stabilizerMuscles: ['Ön Omuz ve Sırt (Üst Kol Sabitleyicileri)', 'Ön Kol Fleksörleri'],
    subRegionTag: 'Yüksek Gerilimli Triceps Uzatma',
    equipment: ['barbell', 'bench-sehpa'],
    environments: ['salon'],
    environmentNote: 'Bilek konforu için genellikle kıvrımlı EZ-Bar ve düz sehpa ile uygulanır; dambıl ile de yapılabilir.',
    level: 'orta',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Düz sehpaya sırtüstü uzanın, EZ barı (veya düz barı) omuz genişliğinden biraz dar kavrayıp kollarınızı uzatın. Üst kollarınızı tam dikey değil, başınızın gerisine doğru hafif (10–15 derece) eğimli sabitleyin.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Üst kol açınızı bozmadan sadece dirseklerinizi bükerek barı alnınıza veya başınızın hemen üst-gerisine doğru kontrollü şekilde indirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Ön kollarınız esnediğinde dirseklerinizi yanlara açmadan kısa bir an kontrolü koruyun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Triceps kaslarınızı sıkarak ön kollarınızı başlangıçtaki hafif eğimli uzatma pozisyonuna geri itin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İndirirken 2–3 saniyede nefes alın, yukarı uzatırken nefes verin.'
      }
    ],
    cues: [
      'Üst kollarınızı tam 90 derece dik tutmak yerine başınızın gerisine doğru 10–15 derece yatırmak, tepe noktada bile triceps üzerindeki gerilimin sıfırlanmasını önler.',
      'Dirseklerinizde hassasiyet varsa barı alnınıza değil, başınızın biraz gerisine doğru indirip kaldırmak eklem üzerindeki stresi azaltır.'
    ],
    commonMistakes: [
      {
        mistake: 'Dirsekleri yanlara doğru tamamen açıp hareketi dar bench prese çevirmek.',
        correction: 'Dirseklerinizi tavanı ve ayak uçlarınızı gösterecek şekilde paralel tutun.'
      },
      {
        mistake: 'Tepe noktada barı göğüs üzerine getirip gerilimi tamamen kaybetmek.',
        correction: 'Üst kolları hafif geriye eğimli tutarak kas üzerindeki yükü koruyun.'
      },
      {
        mistake: 'Kontrolsüz ağırlıkla barı yüze/alna çok hızlı indirmek.',
        correction: 'Güvenlik ve dirsek sağlığı için her zaman kontrollü bir negatif tempo (2–3 sn) kullanın.'
      }
    ],
    programming: {
      beginner: 'Önce Cable Triceps Pushdown veya Dumbbell Overhead Extension önerilir',
      intermediate: '3–4 set × 8–12 tekrar',
      note: 'İyi ısıtılmış dirseklerle uygulandığında en etkili arka kol hacim hareketlerinden biridir.'
    },
    alternatives: {
      easier: 'cable-triceps-pushdown',
      harder: 'close-grip-bench-press',
      equipmentAlt: ['dumbbell-overhead-triceps-extension', 'cable-triceps-pushdown', 'close-grip-bench-press'],
      homeAlt: 'dumbbell-overhead-triceps-extension'
    },
    animation: {
      poseId: 'skull-crusher',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Düz sehpada yatan sporcunun üst kollarını sabit tutarak elindeki barı alın/baş gerisine indirip tekrar uzatmasını gösteren animasyon.',
      startLabel: 'Kollar Hafif Geride Uzun',
      endLabel: 'Bar Alın Hizasında'
    },
    editorialSource: 'NSCA Egzersiz Tekniği Kılavuzu'
  },
  {
    id: 'close-grip-bench-press',
    slug: 'close-grip-bench-press',
    trName: 'Dar Tutuş Halter Göğüs Pres',
    enName: 'Close-grip Bench Press',
    aliases: ['dar bench press', 'close grip bench press', 'dar tutuş halter pres', 'ağır triceps pres'],
    shortDescription:
      'Halter barını omuz genişliğinde kavrayıp dirsekleri gövdeye yakın tutarak yapılan, arka kol (triceps) ve göğüs kaslarında yüksek kuvvet üreten bileşik itiş hareketi.',
    primaryMuscleGroup: 'triceps',
    secondaryMuscleGroups: ['gogus', 'omuz'],
    primaryMuscles: ['Triceps Brachii (Tüm Başlar)', 'Pectoralis Major (Orta ve Üst Lifler)'],
    secondaryMuscles: ['Ön Omuz (Anterior Deltoid)'],
    stabilizerMuscles: ['Rotator Manşet', 'Üst Sırt Sabitleyicileri'],
    subRegionTag: 'Bileşik Triceps & Göğüs Kuvveti',
    equipment: ['barbell', 'bench-sehpa'],
    environments: ['salon'],
    level: 'orta',
    movementPattern: 'itis',
    mechanic: 'bilesik',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Düz sehpaya uzanın, kürek kemiklerinizi geriye sabitleyin. Barı elleriniz birbirine değecek kadar aşırı dar değil, tam omuz genişliğinde (işaret parmaklarınız tırtıklı kısmın başlangıcında) kavrayın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Barı yuvasından çıkarın. Dirseklerinizi yanlara açmadan, kaburgalarınıza yakın tutarak barı alt göğüs / üst karın sınırına doğru kontrollü şekilde indirin.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Bar alt göğsünüze hafifçe dokunduğunda dirseklerinizin bileklerinizle dikey hizada olduğundan emin olun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Triceps ve göğüs kaslarınızla barı güçlüce yukarı, omuz hizanıza doğru itin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'İnerken 2 saniyede nefes alın, yukarı iterken nefes verin.'
      }
    ],
    cues: [
      '"Dar tutuş" ellerin birbirine değmesi demek değildir; elleri 5–10 cm mesafede tutmak el bileklerini aşırı bükerek sakatlık riski yaratır. Omuz genişliği tutuş triceps için hem en güvenli hem de en güçlü açıdır.',
      'Normal bench prese göre bar göğsün biraz daha alt noktasına iner.'
    ],
    commonMistakes: [
      {
        mistake: 'Elleri birbirine değecek kadar dar tutup el bileklerini aşırı bükmek.',
        correction: 'Eller arasında tam omuz genişliği (yaklaşık 35–45 cm) mesafe bırakın.'
      },
      {
        mistake: 'Dirsekleri yanlara doğru açıp hareketi normal bench prese çevirmek.',
        correction: 'Dirseklerinizi gövdenize yakın tutarak yükü arka kollara yönlendirin.'
      },
      {
        mistake: 'Barı boyun/üst göğüs hizasına indirmek.',
        correction: 'Dar tutuşta doğal dirsek açısı için barı alt göğüs kemiğine doğru indirin.'
      }
    ],
    programming: {
      beginner: 'Önce Close-grip Push-up veya Dumbbell Floor Press önerilir',
      intermediate: '3–4 set × 6–10 tekrar',
      note: 'Triceps kaslarını yüksek ağırlıklarla güvenli biçimde yüklemenin en etkili yollarından biridir.'
    },
    alternatives: {
      easier: 'close-grip-push-up',
      harder: 'barbell-bench-press',
      equipmentAlt: ['close-grip-push-up', 'dumbbell-floor-press', 'skull-crusher'],
      homeAlt: 'close-grip-push-up'
    },
    animation: {
      poseId: 'bench-press',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Düz sehpada omuz genişliği tutuşla dirseklerini gövdeye yakın tutarak halteri alt göğse indirip iten sporcuyu gösteren animasyon.',
      startLabel: 'Omuz Genişliği Başlangıç',
      endLabel: 'Alt Göğüs Hizası (Dirsekler Yakın)'
    },
    editorialSource: 'NSCA & Journal of Strength and Conditioning Research'
  },

  // =========================================================================
  // ÖN KOL VE KAVRAMA (2 ÖZEL HAREKET)
  // =========================================================================
  {
    id: 'dumbbell-wrist-curl',
    slug: 'dumbbell-wrist-curl',
    trName: 'Dambıl Bilek Bükme',
    enName: 'Dumbbell Wrist Curl',
    aliases: ['wrist curl', 'bilek bükme', 'ön kol dambıl', 'forearm curl'],
    shortDescription:
      'Ön kolu sehpa veya uyluk üzerine sabitleyerek sadece el bileğini büküp açan, ön kol iç (fleksör) kaslarını ve kavrama dayanıklılığını hedefleyen izolasyon hareketi.',
    primaryMuscleGroup: 'on-kol',
    secondaryMuscleGroups: [],
    primaryMuscles: ['Ön Kol Fleksör Kasları (Flexor Carpi Radialis & Ulnaris)', 'Palmaris Longus'],
    secondaryMuscles: ['Parmak Fleksörleri (Kavrama Kasları)'],
    stabilizerMuscles: ['Biceps Brachii (İzometrik)'],
    subRegionTag: 'Ön Kol İç & Kavrama Kuvveti',
    equipment: ['dumbbell', 'bench-sehpa'],
    environments: ['ev', 'salon'],
    environmentNote: 'Sehpa üzerinde veya evde bir sandalyede oturup ön kollarınızı uyluklarınızın üzerine koyarak uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Sehpaya oturun, ön kollarınızı avuç içleriniz yukarı bakacak şekilde uyluklarınızın (veya sehpanın) üzerine yerleştirin; el bilekleriniz diz kapağınızın hemen önünde boşlukta kalsın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Ön kollarınızı bacağınızdan hiç kaldırmadan sadece el bileklerinizi yukarı doğru bükerek dambılları kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Bilekleriniz yukarı büküldüğünde ön kolunuzun iç kısmındaki kasılmayı 1 saniye koruyun.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Bileklerinizi kontrollü biçimde aşağı esneterek başlangıç noktasına indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Yukarı bükerken nefes verin, aşağı esnetirken 2 saniyede nefes alın.'
      }
    ],
    cues: [
      'El bileği küçük ve hassas bir eklemdir; çok ağır kilolarla zorlamak yerine orta-hafif ağırlık ve 12–20 tekrar aralığı kullanın.',
      'Ön kolunuzun bacağınızdan kalkmasına izin vermeyin.'
    ],
    commonMistakes: [
      {
        mistake: 'Dirsekleri büküp ön kolları havaya kaldırarak biceps ile yardım almak.',
        correction: 'Ön kollarınızın tamamını uyluğunuza veya sehpaya sabit tutun.'
      },
      {
        mistake: 'Ağırlığı parmak uçlarından düşecek kadar gevşek bırakıp bileği zorlamak.',
        correction: 'Dambılı avuç içinde güvenli kontrol altında tutarak hareket açıklığını yönetin.'
      },
      {
        mistake: 'Çok hızlı ve kısa zıplatmalar yapmak.',
        correction: 'Tepe noktada 1 saniye sıkıştırma ve 2 saniye kontrollü iniş uygulayın.'
      }
    ],
    programming: {
      beginner: '3 set × 12–15 tekrar',
      intermediate: '3 set × 15–20 tekrar',
      note: 'Ağır sırt antrenmanlarından önce ön kolları yormamak için genellikle antrenman sonunda uygulanması önerilir.'
    },
    alternatives: {
      easier: 'hammer-curl',
      harder: 'farmers-carry',
      equipmentAlt: ['reverse-barbell-curl', 'hammer-curl', 'farmers-carry'],
      homeAlt: 'hammer-curl'
    },
    animation: {
      poseId: 'wrist-curl',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Oturarak ön kollarını uylukları üzerine sabitleyen sporcunun el bileklerini yukarı doğru büküp esnetmesini gösteren animasyon.',
      startLabel: 'Bilek Aşağıda Esnek',
      endLabel: 'Bilek Yukarıda Sıkışık'
    },
    editorialSource: 'NSCA Ön Kol ve Kavrama Antrenmanı İlkeleri'
  },
  {
    id: 'reverse-barbell-curl',
    slug: 'reverse-barbell-curl',
    trName: 'Üstten Tutuş Halter Curl',
    enName: 'Reverse Barbell Curl',
    aliases: ['reverse curl', 'ters tutuş curl', 'üst ön kol hareketi', 'brachioradialis curl'],
    shortDescription:
      'Avuç içleri yere bakacak (pronasyon) şekilde barı kavrayarak yapılan, ön kolun üst kısmı (Brachioradialis), bilek ekstansörleri ve Brachialis kaslarını güçlendiren hareket.',
    primaryMuscleGroup: 'on-kol',
    secondaryMuscleGroups: ['biceps'],
    primaryMuscles: ['Brachioradialis (Üst Ön Kol)', 'El Bileği Ekstansörleri (Extensor Carpi Radialis)'],
    secondaryMuscles: ['Brachialis', 'Biceps Brachii'],
    stabilizerMuscles: ['Ön Omuz', 'Core Sabitleyicileri'],
    subRegionTag: 'Üst Ön Kol (Brachioradialis) & Bilek Dengesi',
    equipment: ['barbell'],
    environments: ['salon', 'ev'],
    environmentNote: 'Düz bar, EZ bar veya evde bir çift dambıl ile üstten tutuşla uygulanabilir.',
    level: 'baslangic',
    movementPattern: 'izolasyon',
    mechanic: 'izolasyon',
    laterality: 'cift-tarafli',
    steps: [
      {
        title: 'Başlangıç Pozisyonu',
        detail:
          'Ayakta dik durun, barı omuz genişliğinde ve avuç içleriniz yere/uyluklarınıza bakacak (pronasyon) şekilde üstten kavrayın. Başparmaklarınızla barı tam sarın.'
      },
      {
        title: 'Hareketin Uygulanışı',
        detail:
          'Dirseklerinizi gövde yanında sabit tutarak ve el bileklerinizi düz kilitleyerek barı omuz hizanıza doğru kaldırın.'
      },
      {
        title: 'Hareketin Son Pozisyonu',
        detail:
          'Bar göğüs hizasına geldiğinde üst ön kolunuzdaki sıkışmayı 1 saniye hissedin.'
      },
      {
        title: 'Kontrollü Dönüş',
        detail:
          'Barı 2–3 saniyede yavaşça başlangıç pozisyonuna indirin.'
      },
      {
        title: 'Nefes ve Tempo',
        detail:
          'Kaldırırken nefes verin, kontrollü indirirken nefes alın.'
      }
    ],
    cues: [
      'Normal Barbell Curl hareketine göre %30–40 daha hafif bir ağırlık kullanmak doğaldır; amaç ön kol ekstansörlerini ve Brachioradialis kasını kontrollü çalıştırmaktır.',
      'El bileklerinizin aşağı bükülmesine izin vermeyin; yumruğunuz ön kolunuzla düz bir çizgide kalsın.'
    ],
    commonMistakes: [
      {
        mistake: 'Kaldırış sırasında el bileklerinin aşağı doğru bükülmesi.',
        correction: 'Bileklerinizi düz tutabileceğiniz daha hafif bir bar seçin.'
      },
      {
        mistake: 'Dirsekleri yanlara doğru açıp omuzlarla çekmek.',
        correction: 'Dirseklerinizi kaburgalarınıza yakın sabitleyin.'
      },
      {
        mistake: 'Başparmaksız tutuş yapıp barın elden kayma riskini artırmak.',
        correction: 'Üstten tutuşta başparmağınızı her zaman barın altından sararak tam kavrayın.'
      }
    ],
    programming: {
      beginner: '3 set × 10–12 tekrar',
      intermediate: '3 set × 12–15 tekrar',
      note: 'Dirsek çevresi kas dengesini desteklemek için Biceps ve Ön Kol çalışmalarında çok faydalıdır.'
    },
    alternatives: {
      easier: 'hammer-curl',
      harder: 'farmers-carry',
      equipmentAlt: ['hammer-curl', 'dumbbell-wrist-curl', 'farmers-carry'],
      homeAlt: 'hammer-curl'
    },
    animation: {
      poseId: 'biceps-curl',
      visualType: 'kinematic-svg',
      accessibleDescription:
        'Avuç içleri yere bakan üstten tutuşla barı göğüs hizasına kaldıran ve üst ön kol kaslarını çalıştıran sporcuyu gösteren animasyon.',
      startLabel: 'Üstten Tutuş Başlangıç',
      endLabel: 'Tepe Ön Kol Kasılması'
    },
    editorialSource: 'NSCA Egzersiz Tekniği Rehberi'
  }
]
