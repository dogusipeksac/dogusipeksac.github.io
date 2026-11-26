/* ==========================================================================
   MOBILE APP PRODUCT WEBSITE ENGINE (3D Phone Tilt, 4-Screen Switcher,
   3-Phone 3D Perspective Showcase, Live Theme Swatches, Per-App Simulators,
   Store QR Codes & 6-App Ecosystem Dock)
   ========================================================================== */
(function () {
  'use strict';

  var APP_META = {
    ydskelime: {
      name: 'YDS Kelime KitApp',
      kicker: 'EDUCATION · YDS · YÖKDİL · YDT',
      rating: '4.9 ★ · Akademik İngilizce & SRS',
      icon: '/assets/apps/ydskelime.png',
      chipL: { ic: '📘', k: '3 ADIMLI DERS', t: 'Kelime · Eşleştir · Quiz' },
      chipR: { ic: '🧠', k: 'ARALIKLI TEKRAR', t: '3 Modlu Akıllı SRS' },
      triTitle: 'Kitaptaki Gibi 3 Adımlı Ders & SRS Ekranları',
      triSub: 'Her günün 20 kelimesini 3 aşamada kalıcı hafızaya taşıyan uygulama içi ekran akışı.',
      screens: ['1. Ana Ekran & Gün Haritası', '2. Akademik Kelime Kartı', '3. Eşleştirme & Quiz'],
      iosUrl: 'https://apps.apple.com/us/app/yds-kelime-kitapp/id6824856129',
      androidUrl: 'https://play.google.com/store/apps/details?id=com.dogusipeksac.ydskelimekitapp'
    },
    mydiary: {
      name: 'My Diary',
      kicker: 'LIFESTYLE · JOURNAL · VOICE · PDF',
      rating: '4.9 ★ · Android & iOS Günlük',
      icon: '/assets/apps/mydiary.png',
      chipL: { ic: '🎙️', k: 'ÇOKLU MEDYA', t: 'Ses · Fotoğraf · Checklist' },
      chipR: { ic: '📄', k: 'KİTAP FORMATI', t: 'Tek Tıkla PDF Çıktısı' },
      triTitle: 'Zaman Tüneli, Çoklu Medya Editörü & Duygu Analizi',
      triSub: '8 özel renk teması, sesli notlar ve biyometrik kilit ile korunan kişisel anı defteri.',
      screens: ['1. Günlük Akışı & Ses', '2. Zengin Medya Editörü', '3. Takvim & Mood Analizi'],
      iosUrl: 'https://apps.apple.com/us/app/my-diary/id6824458504',
      androidUrl: 'https://play.google.com/store/apps/details?id=com.product.mydiary'
    },
    kuberush: {
      name: 'Kube Rush',
      kicker: 'ARCADE RUNNER · UNITY 6 URP · 60 FPS',
      rating: '4.9 ★ · iOS & Android 3D Oyun',
      icon: '/assets/apps/kuberush.png',
      chipL: { ic: '⚡', k: '60 FPS URP', t: 'Anlık Küp Ölçekleme' },
      chipR: { ic: '💎', k: '6 VOLT SKIN', t: 'Prosedürel Sonsuz Pist' },
      triTitle: 'Kube Rush Oyun İçi 3B Ekran Vitrini',
      triSub: 'Volt-neon menüden 60 FPS sonsuz koşu pistine ve 6 özel skin marketine kesintisiz geçiş.',
      screens: ['1. Volt Ana Menü', '2. 60 FPS Canlı Koşu HUD', '3. 6 Volt Skin Market'],
      iosUrl: 'https://apps.apple.com/tr/app/kube-rush-3d-2d-adventure/id6790684293',
      androidUrl: 'https://play.google.com/store/apps/details?id=com.dogusipeksac.kuberush'
    },
    appplaka: {
      name: 'App Plaka Kontrol',
      kicker: 'AI VISION · TRAFİK YÖNETMELİĞİ · 7 KRİTER',
      rating: '4.9 ★ · Yapay Zeka Plaka Denetimi',
      icon: '/assets/apps/appplaka.png',
      chipL: { ic: '🔍', k: '7 KRİTER AI', t: 'DIN 1451 Font & Mühür' },
      chipR: { ic: '🛡️', k: 'TÜVTÜRK UYUMU', t: '2024+ QR & Hologram' },
      triTitle: 'Saniyeler İçinde 7 Kriterde AI Plaka Raporu',
      triSub: 'Kamera veya galeriden plaka seçin; standart DIN 1451 veya APP baskıyı anında tespit edin.',
      screens: ['1. Kamera & Plaka Tarama', '2. 7 Kriter Detaylı Denetim', '3. Standart / APP Karar Raporu'],
      iosUrl: 'https://apps.apple.com/us/app/app-plaka-kontrol/id6760252433',
      androidUrl: 'https://play.google.com/store/apps/details?id=com.product.appplakakontrol'
    },
    aniyakala: {
      name: 'Anı Yakala',
      kicker: 'GPS KAMERA · HAVA DURUMU · PİNLİ HARİTA',
      rating: '4.9 ★ · Konum Damgalı Anı Kamerası',
      icon: '/assets/apps/aniyakala.png',
      chipL: { ic: '📍', k: 'CANLI EXIF & GPS', t: 'Koordinat · Bayrak · °C' },
      chipR: { ic: '🗺️', k: 'ANI HARİTASI', t: 'Pinli Fotoğraf Galerisi' },
      triTitle: 'Canlı GPS Vizör, Filigran Stüdyosu & Pinli Harita',
      triSub: 'Çektiğiniz her kareye konum, ülke bayrağı ve hava durumunu estetik şablonlarla işleyin.',
      screens: ['1. Canlı GPS Kamera Vizörü', '2. Filigran Şablon Stüdyosu', '3. Pinli Anı Haritası'],
      iosUrl: 'https://apps.apple.com/tr/app/an%C4%B1-yakala/id6764663335',
      androidUrl: 'https://play.google.com/store/apps/details?id=com.dogusipeksac.capturethemoment'
    },
    suicme: {
      name: 'Su İçme Hatırlatıcısı',
      kicker: 'SAĞLIK & HİDRASYON · WIDGET · STREAK',
      rating: '4.9 ★ · Akıllı Su Takip Asistanı',
      icon: '/assets/apps/suicme.png',
      chipL: { ic: '💧', k: 'DALGALI HALKA', t: 'Kişisel Günlük ml Hedefi' },
      chipR: { ic: '🔔', k: 'UYKU DUYARLI', t: 'Akıllı Bildirim & Widget' },
      triTitle: 'Dalgalı Hidrasyon Halkası, Akıllı Bildirim & Seri',
      triSub: 'Ocean, Lagoon ve Midnight temalarıyla günlük su hedefinizi zahmetsizce tamamlayın.',
      screens: ['1. Günlük Su Halkası', '2. Uyku Duyarlı Bildirimler', '3. Ateş Serisi & Rozetler'],
      iosUrl: 'https://apps.apple.com/us/app/su-i-%C3%A7me-hat%C4%B1rlatmac%C4%B1s%C4%B1/id6764664946',
      androidUrl: 'https://play.google.com/store/apps/details?id=com.dogusipeksac.dailyhydrate'
    },
    lifesimulation: {
      name: 'Hayat Simülasyonu - Kararlar',
      kicker: 'SIMULATION · RPG · 10 ÜLKE · 103 MESLEK',
      rating: '4.9 ★ · Android & iOS Yaşam Simülasyonu',
      icon: '/assets/apps/lifesimulation.png',
      chipL: { ic: '🎲', k: '70+ MİNİ AN', t: 'Kriz, Refleks & Mülakat' },
      chipR: { ic: '⛴️', k: 'SON VAPUR', t: 'Ücretsiz İnteraktif Kitap' },
      triTitle: 'Kader Ülkesi, 70+ Mini An & 103 Meslek Ekranları',
      triSub: 'Doğumdan 100 yaşına kadar her kararınla şekillenen dallanan yaşam çizgisi.',
      screens: ['1. Hayat Akışı & Kararlar', '2. 70+ Etkileşimli Mini An', '3. 103 Meslek & Soy Ağacı'],
      iosUrl: 'https://apps.apple.com/tr/app/hayat-sim%C3%BClasyonu-kararlar/id6830319257',
      androidUrl: 'https://play.google.com/store/apps/details?id=com.dogusipeksac.lifesimulation'
    },
    ourworld: {
      name: 'Bizim Dünyamız: Açık Dünya',
      kicker: '3D OPEN WORLD · FARMING · GARAGE · 5 SPORTS',
      rating: '4.9 ★ · 3B Açık Dünya Sandbox',
      icon: '/assets/apps/ourworld.png',
      chipL: { ic: '🏙️', k: '8 CANLI CADDE', t: 'Aydos Çiftlik · No:73 Garaj' },
      chipR: { ic: '🏆', k: '5 SPOR + POLİGON', t: 'Reklamsız · %100 Offline' },
      triTitle: 'Aydos Çiftliği, No:73 Oto Garaj & 5 Spor Sahnesi',
      triSub: 'Tarımdan hidrolik araç tamirine, göl balıkçılığından spora yaşayan 3B mahalle.',
      screens: ['1. 8 Cadde Açık Dünya', '2. Çiftlik & Hidrolik Garaj', '3. 5 Spor & Atış Poligonu'],
      iosUrl: 'https://apps.apple.com/tr/app/our-world-3d-sandbox-city/id6838324963',
      androidUrl: ''
    },
    passthephone: {
      name: 'Telefonu Ver: Gizli Görev',
      kicker: 'PARTY GAME · 8 MOD · 1.000 GÖREV',
      rating: '4.9 ★ · Tek Telefon Sosyal Blöf Oyunu',
      icon: '/assets/apps/passthephone.png',
      chipL: { ic: '🕵️', k: 'BASILI TUT', t: 'Gizli Görevini Gör & Gizle' },
      chipR: { ic: '🎉', k: '8 OYUN MODU', t: '2–10 Oyuncu · Reklamsız' },
      triTitle: 'Tek Telefonla 2–10 Kişilik Yüz Yüze Parti Akışı',
      triSub: 'Basılı tutarak gizli görevini öğren, sohbetin akışında çaktırmadan tamamla!',
      screens: ['1. 8 Mod & 1.000 Görev', '2. Basılı Tut & Gizli Gör', '3. Ortak Sayaç & İtiraflar'],
      iosUrl: 'https://apps.apple.com/tr/app/telefonu-ver-gizli-g%C3%B6rev/id6836370199',
      androidUrl: ''
    },
    hareket: {
      name: 'Hareket: Egzersiz & Kas',
      kicker: 'SPORTS · 75+ EGZERSİZ · ANATOMİK HARİTA',
      rating: '4.9 ★ · Türkçe Kineziyoloji & Form Rehberi',
      icon: '/assets/apps/hareket.png',
      chipL: { ic: '🦴', k: '11 KAS BÖLGESİ', t: 'Ön & Arka Vücut Haritası' },
      chipR: { ic: '🎯', k: 'KİNEMATİK FORM', t: '75+ Hareket · 5 Gün Program' },
      triTitle: 'Kinematik Animasyon, Kas Haritası & 5 Günlük Program',
      triSub: 'Yapılış, Kas & Ekipman, Sık Hatalar ve Alternatifler sekmeleriyle odaklı antrenman.',
      screens: ['1. 75+ Türkçe Egzersiz', '2. Canlı Kinematik Animasyon', '3. Ön/Arka Kas Haritası'],
      iosUrl: 'https://apps.apple.com/tr/app/hareket-egzersiz-kas/id6836225456',
      androidUrl: ''
    }
  };

  var slug = document.body.getAttribute('data-app-slug') || 'ydskelime';
  var meta = APP_META[slug] || APP_META.ydskelime;

  var wrap = document.querySelector('.app-phone-3d-wrap');
  var phone = document.querySelector('.app-phone-3d');

  /* 0. Enhance Hero Identity, Phone Tab Placement & Outer Floating Chips */
  if (document.body.classList.contains('app-site-body')) {
    var heroCopy = document.querySelector('.app-hero-copy');
    var heroH1 = heroCopy ? heroCopy.querySelector('h1') : null;
    if (heroCopy && heroH1 && !heroCopy.querySelector('.app-hero-identity')) {
      var idRow = document.createElement('div');
      idRow.className = 'app-hero-identity';
      idRow.innerHTML =
        '<div class="app-hero-identity-icon"><img src="' + meta.icon + '" alt="' + meta.name + '" /></div>' +
        '<div class="app-hero-identity-meta">' +
          '<span class="app-hero-identity-kicker">' + meta.kicker + '</span>' +
          '<span class="app-hero-identity-rating"><b>★★★★★</b> ' + meta.rating + '</span>' +
        '</div>';
      heroCopy.insertBefore(idRow, heroH1);
    }

    // Move .phone-tabs below .app-phone-3d so phone is aligned with Hero title
    var stageTabs = wrap ? wrap.querySelector('.phone-tabs') : null;
    if (wrap && phone && stageTabs && stageTabs.nextElementSibling === phone) {
      wrap.appendChild(stageTabs);
    }
  }

  // Add sleek outer floating callout chips around the 3D Hero phone
  if (wrap && phone && !wrap.querySelector('.app-float-chip')) {
    var chipL = document.createElement('div');
    chipL.className = 'app-float-chip left';
    chipL.innerHTML =
      '<span class="app-float-chip-ic">' + meta.chipL.ic + '</span>' +
      '<div><small>' + meta.chipL.k + '</small><strong>' + meta.chipL.t + '</strong></div>';

    var chipR = document.createElement('div');
    chipR.className = 'app-float-chip right';
    chipR.innerHTML =
      '<span class="app-float-chip-ic">' + meta.chipR.ic + '</span>' +
      '<div><small>' + meta.chipR.k + '</small><strong>' + meta.chipR.t + '</strong></div>';

    wrap.insertBefore(chipL, phone);
    wrap.insertBefore(chipR, phone);
  }

  /* 1. 3D Interactive Phone Tilt */
  if (wrap && phone) {
    wrap.addEventListener('pointermove', function (e) {
      var r = wrap.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      var rotY = -6 + x * 22;
      var rotX = 4 - y * 16;
      phone.style.transform =
        'rotateY(' + rotY.toFixed(2) + 'deg) rotateX(' + rotX.toFixed(2) + 'deg) scale(1.02)';
    });

    wrap.addEventListener('pointerleave', function () {
      phone.style.transform = '';
    });
  }

  /* 2. 4-Screen Phone Tab Switcher */
  var phoneTabs = document.querySelectorAll('[data-phone-tab]');
  var phonePanes = phone ? phone.querySelectorAll('[data-phone-pane]') : document.querySelectorAll('[data-phone-pane]');
  function activatePhonePaneByIndex(idx) {
    if (!phoneTabs.length || !phonePanes.length) return;
    var btn = phoneTabs[idx % phoneTabs.length];
    if (!btn) return;
    var target = btn.getAttribute('data-phone-tab');
    phoneTabs.forEach(function (b) { b.classList.toggle('active', b === btn); });
    phonePanes.forEach(function (p) {
      p.classList.toggle('active', p.getAttribute('data-phone-pane') === target);
    });
  }
  if (phoneTabs.length && phonePanes.length) {
    phoneTabs.forEach(function (btn, idx) {
      btn.addEventListener('click', function () {
        activatePhonePaneByIndex(idx);
      });
    });
  }

  /* 2B. Build 3-Phone 3D Perspective Fan Showcase inside #ekranlar */
  var ekranSec = document.getElementById('ekranlar');
  if (ekranSec && phone && phonePanes.length >= 3 && !document.querySelector('.app-tri-showcase')) {
    var triBox = document.createElement('div');
    triBox.className = 'app-tri-showcase';
    var statusBarEl = phone.querySelector('.aps-status');
    var statusHtml = statusBarEl ? statusBarEl.outerHTML : '';

    var cardsHtml = '';
    for (var ti = 0; ti < 3; ti++) {
      var paneClone = phonePanes[ti].cloneNode(true);
      paneClone.classList.add('active');
      paneClone.removeAttribute('data-phone-pane');
      var capTitle = (meta.screens && meta.screens[ti]) ? meta.screens[ti] : ('Ekran 0' + (ti + 1));
      cardsHtml +=
        '<div class="tri-phone-item" data-tri-idx="' + ti + '">' +
          '<div class="tri-phone-device">' +
            '<div class="app-phone-screen">' +
              '<div class="app-phone-island"></div>' +
              statusHtml +
              '<div class="aps-body">' + paneClone.outerHTML + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="tri-phone-caption">' +
            '<small>EKRAN 0' + (ti + 1) + '</small>' +
            '<strong>' + capTitle + '</strong>' +
          '</div>' +
        '</div>';
    }

    triBox.innerHTML =
      '<div class="app-tri-head">' +
        '<span>3B ÜÇLÜ CİHAZ SAHNESİ · CANLI ARAYÜZ VİTRİNİ</span>' +
        '<h3>' + meta.triTitle + '</h3>' +
        '<p>' + meta.triSub + '</p>' +
      '</div>' +
      '<div class="tri-phone-grid">' + cardsHtml + '</div>';

    var firstGrid = ekranSec.querySelector('.app-screens-grid, .app-flow-strip');
    if (firstGrid) {
      ekranSec.insertBefore(triBox, firstGrid);
    } else {
      ekranSec.appendChild(triBox);
    }

    triBox.querySelectorAll('[data-tri-idx]').forEach(function (item) {
      item.addEventListener('click', function () {
        var idx = parseInt(item.getAttribute('data-tri-idx') || '0', 10);
        activatePhonePaneByIndex(idx);
      });
    });
  }

  /* 2C. Inject Store QR Codes (#qr) & 10-App Ecosystem Switcher across all app sites */
  var ECOSYSTEM_APPS = [
    { slug: 'ydskelime', href: '/ydskelime/', img: '/assets/apps/ydskelime.png', name: 'YDS Kelime KitApp', sub: 'Eğitim · YDS & SRS' },
    { slug: 'mydiary', href: '/mydiary/', img: '/assets/apps/mydiary.png', name: 'My Diary', sub: 'Günlük · Ses & PDF' },
    { slug: 'kuberush', href: '/kuberush/', img: '/assets/apps/kuberush.png', name: 'Kube Rush', sub: '3D Hypercasual Oyun' },
    { slug: 'appplaka', href: '/appplaka/', img: '/assets/apps/appplaka.png', name: 'App Plaka Kontrol', sub: 'AI · Plaka Denetimi' },
    { slug: 'aniyakala', href: '/aniyakala/', img: '/assets/apps/aniyakala.png', name: 'Anı Yakala', sub: 'Kamera · GPS Damga' },
    { slug: 'suicme', href: '/suicme/', img: '/assets/apps/suicme.png', name: 'Su İçme Hatırlatıcısı', sub: 'Sağlık · Su Takibi' },
    { slug: 'lifesimulation', href: '/lifesimulation/', img: '/assets/apps/lifesimulation.png', name: 'Hayat Simülasyonu', sub: 'Yaşam · 70+ Mini An' },
    { slug: 'ourworld', href: '/ourworld/', img: '/assets/apps/ourworld.png', name: 'Bizim Dünyamız', sub: '3B Açık Dünya Şehir' },
    { slug: 'passthephone', href: '/passthephone/', img: '/assets/apps/passthephone.png', name: 'Telefonu Ver', sub: 'Parti · 1.000 Görev' },
    { slug: 'hareket', href: '/hareket/', img: '/assets/apps/hareket.png', name: 'Hareket', sub: '75+ Egzersiz & Kas' }
  ];

  function buildEcosystemHtml() {
    return ECOSYSTEM_APPS.map(function (item) {
      return '<a href="' + item.href + '" class="app-other-item' + (slug === item.slug ? ' active' : '') + '">' +
        '<img src="' + item.img + '" alt="" /><div>' + item.name + '<small>' + item.sub + '</small></div></a>';
    }).join('');
  }

  var existingOtherGrids = document.querySelectorAll('.app-other-grid');
  if (existingOtherGrids.length) {
    existingOtherGrids.forEach(function (grid) {
      grid.innerHTML = buildEcosystemHtml();
    });
  }

  if (!document.getElementById('qr')) {
    var mainShell = document.querySelector('main.app-shell, main.app-qr-page-main');
    var ctaBanner = document.querySelector('.app-cta-banner');
    if (mainShell) {
      var qrSec = document.createElement('section');
      qrSec.className = 'app-qr-showcase';
      qrSec.id = 'qr';
      var androidCardHtml = meta.androidUrl
        ? '<a href="' + meta.androidUrl + '" class="store-qr-card android" target="_blank" rel="noopener noreferrer">' +
            '<div class="store-qr-card-head"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.37.21.8.21 1.18.01L19.96 12 4.36.23C3.98.03 3.55.03 3.18.24A1.3 1.3 0 0 0 2.5 1.4v21.2c0 .48.26.92.68 1.16z"/></svg><span>Android</span></div>' +
            '<p class="store-qr-card-store">Google Play</p>' +
            '<div class="qr-frame"><div class="qr-frame-corners" aria-hidden="true"><span></span><span></span><span></span><span></span></div>' +
              '<img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&ecc=M&color=000000&bgcolor=ffffff&data=' + encodeURIComponent(meta.androidUrl) + '" width="260" height="260" alt="' + meta.name + ' Android QR" />' +
            '</div>' +
            '<span class="store-qr-card-link">Google Play’e git →</span>' +
          '</a>'
        : '<div class="store-qr-card pending" aria-label="Android Yakında">' +
            '<div class="store-qr-card-head"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.37.21.8.21 1.18.01L19.96 12 4.36.23C3.98.03 3.55.03 3.18.24A1.3 1.3 0 0 0 2.5 1.4v21.2c0 .48.26.92.68 1.16z"/></svg><span>Android</span></div>' +
            '<p class="store-qr-card-store">Google Play · Yakında</p>' +
            '<div class="pending-box"><span>⏳</span><b>Android Sürümü Yakında</b><p>Google Play mağaza sayfası yayınlandığında indirme bağlantısı ve QR kod burada aktif olacaktır.</p></div>' +
            '<span class="store-qr-card-link">Çok Yakında Google Play’de</span>' +
          '</div>';

      qrSec.innerHTML =
        '<h2 class="app-qr-showcase-title">QR Kod ile Hemen İndir</h2>' +
        '<p class="app-qr-showcase-sub">Telefon kameranızla QR kodu okutarak ' + meta.name + ' uygulamasını doğrudan App Store' + (meta.androidUrl ? ' veya Google Play Store’dan' : '’dan') + ' indirebilirsiniz.</p>' +
        '<div class="app-qr-grid">' +
          '<a href="' + meta.iosUrl + '" class="store-qr-card ios" target="_blank" rel="noopener noreferrer">' +
            '<div class="store-qr-card-head"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg><span>iOS</span></div>' +
            '<p class="store-qr-card-store">App Store</p>' +
            '<div class="qr-frame"><div class="qr-frame-corners" aria-hidden="true"><span></span><span></span><span></span><span></span></div>' +
              '<img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&ecc=M&color=000000&bgcolor=ffffff&data=' + encodeURIComponent(meta.iosUrl) + '" width="260" height="260" alt="' + meta.name + ' iOS QR" />' +
            '</div>' +
            '<span class="store-qr-card-link">App Store’a git →</span>' +
          '</a>' +
          androidCardHtml +
        '</div>';

      if (ctaBanner) {
        mainShell.insertBefore(qrSec, ctaBanner);
      } else {
        mainShell.appendChild(qrSec);
      }

      if (!document.querySelector('.app-other-sec')) {
        var otherSec = document.createElement('section');
        otherSec.className = 'app-other-sec';
        otherSec.innerHTML =
          '<div class="app-sec-head" style="margin-bottom:1rem">' +
            '<span class="app-sec-kicker">DOĞUŞ İPEKSAÇ MOBİL EKOSİSTEMİ</span>' +
            '<h2>Diğer Mobil Uygulamalarımız</h2>' +
          '</div>' +
          '<div class="app-other-grid">' + buildEcosystemHtml() + '</div>';
        mainShell.appendChild(otherSec);
      }
    }
  }

  /* 3. Dynamic Brand Theme / Skin Swatches */
  var swatches = document.querySelectorAll('.app-swatch[data-theme-json]');
  swatches.forEach(function (sw) {
    sw.addEventListener('click', function () {
      swatches.forEach(function (s) { s.classList.toggle('active', s === sw); });
      try {
        var vars = JSON.parse(sw.getAttribute('data-theme-json'));
        Object.keys(vars).forEach(function (k) {
          document.body.style.setProperty(k, vars[k]);
        });
      } catch (err) {}
    });
  });

  /* 4. Interactive Simulator Tabs (.als-tab) */
  var alsTabs = document.querySelectorAll('[data-als-tab]');
  var alsPanes = document.querySelectorAll('[data-als-pane]');
  if (alsTabs.length && alsPanes.length) {
    alsTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-als-tab');
        alsTabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
        alsPanes.forEach(function (p) {
          p.style.display = p.getAttribute('data-als-pane') === id ? '' : 'none';
        });
      });
    });
  }

  /* 5. YDS KELİME KİTAPP — Live Vocabulary & Quiz Simulator */
  var ydsWords = [
    {
      w: 'ubiquitous',
      ph: '/juːˈbɪk.wɪ.təs/',
      type: 'Sıfat (Adjective) · Akademik / YDS',
      tr: 'Her yerde bulunan, yaygın, hazır ve nazır',
      syn: 'omnipresent, pervasive, universal',
      ant: 'rare, scarce, uncommon',
      pat: 'ubiquitous in + isim (ubiquitous in modern society)',
      ex: 'Smartphones have become ubiquitous in everyday life across the globe.',
      qOpt: ['Nadir görülen', 'Her yerde bulunan / yaygın', 'Geçici olan', 'Tartışmalı'],
      qAns: 1
    },
    {
      w: 'mitigate',
      ph: '/ˈmɪt.ɪ.ɡeɪt/',
      type: 'Fiil (Verb) · YDS & YÖKDİL Fen/Sağlık',
      tr: 'Hafifletmek, azaltmak, yatıştırmak',
      syn: 'alleviate, reduce, diminish, ease',
      ant: 'aggravate, intensify, worsen',
      pat: 'mitigate the effects / risks / impact of',
      ex: 'Planting more trees can help mitigate the effects of climate change.',
      qOpt: ['Şiddetlendirmek', 'Görmezden gelmek', 'Hafifletmek / azaltmak', 'Ertelemek'],
      qAns: 2
    },
    {
      w: 'ambiguous',
      ph: '/æmˈbɪɡ.ju.əs/',
      type: 'Sıfat (Adjective) · YDS & YDT',
      tr: 'Belirsiz, muğlak, iki anlamlı',
      syn: 'vague, equivocal, obscure, unclear',
      ant: 'explicit, clear, unambiguous',
      pat: 'remain ambiguous / ambiguous statement',
      ex: 'The wording of the agreement was deliberately ambiguous.',
      qOpt: ['Kesin ve net', 'Belirsiz / muğlak', 'Zorunlu', 'Geleneksel'],
      qAns: 1
    },
    {
      w: 'detrimental',
      ph: '/ˌdet.rɪˈmen.təl/',
      type: 'Sıfat (Adjective) · YÖKDİL Sağlık & Sosyal',
      tr: 'Zararlı, yıpratıcı, olumsuz etkili',
      syn: 'harmful, damaging, adverse, deleterious',
      ant: 'beneficial, favorable, advantageous',
      pat: 'detrimental to + isim (detrimental to health)',
      ex: 'Chronic sleep deprivation is detrimental to cognitive performance.',
      qOpt: ['Zararlı / olumsuz', 'Faydalı', 'Tarafsız', 'Hızlı gelişen'],
      qAns: 0
    },
    {
      w: 'scrutinize',
      ph: '/ˈskruː.tɪ.naɪz/',
      type: 'Fiil (Verb) · Akademik Okuma',
      tr: 'Dikkatle incelemek, didik didik etmek',
      syn: 'examine, inspect, analyze closely',
      ant: 'glance at, overlook, ignore',
      pat: 'closely scrutinize + data / evidence',
      ex: 'The committee will closely scrutinize all financial documents.',
      qOpt: ['Özetlemek', 'Dikkatle incelemek', 'Reddetmek', 'Gizlemek'],
      qAns: 1
    }
  ];

  var ydsCardEl = document.getElementById('ydsLiveWord');
  if (ydsCardEl) {
    var yIdx = 0, knownCount = 14, reviewCount = 4;
    var elW = document.getElementById('ydsW');
    var elPh = document.getElementById('ydsPh');
    var elType = document.getElementById('ydsType');
    var elTr = document.getElementById('ydsTr');
    var elSyn = document.getElementById('ydsSyn');
    var elAnt = document.getElementById('ydsAnt');
    var elPat = document.getElementById('ydsPat');
    var elEx = document.getElementById('ydsEx');
    var elStat = document.getElementById('ydsStatText');
    var elQuizOpts = document.getElementById('ydsQuizOpts');
    var elQuizFeedback = document.getElementById('ydsQuizFeedback');

    function renderYds(idx) {
      var item = ydsWords[idx % ydsWords.length];
      if (elW) elW.textContent = item.w;
      if (elPh) elPh.textContent = item.ph;
      if (elType) elType.textContent = item.type;
      if (elTr) elTr.textContent = item.tr;
      if (elSyn) elSyn.textContent = item.syn;
      if (elAnt) elAnt.textContent = item.ant;
      if (elPat) elPat.textContent = item.pat;
      if (elEx) elEx.textContent = '“' + item.ex + '”';
      if (elStat) {
        elStat.textContent =
          'Kelime ' + (idx + 1) + ' / ' + ydsWords.length +
          ' · Biliyorum: ' + knownCount + ' · Tekrar Kuyruğu: ' + reviewCount;
      }
      if (elQuizOpts) {
        elQuizOpts.innerHTML = '';
        if (elQuizFeedback) elQuizFeedback.textContent = 'Yukarıdaki kelimenin doğru Türkçe karşılığını seçin:';
        item.qOpt.forEach(function (optText, oIdx) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'als-btn';
          b.style.textAlign = 'left';
          b.textContent = String.fromCharCode(65 + oIdx) + ') ' + optText;
          b.addEventListener('click', function () {
            if (oIdx === item.qAns) {
              b.className = 'als-btn good';
              if (elQuizFeedback) elQuizFeedback.textContent = '✅ Doğru! "' + item.w + '" = ' + item.tr + '.';
            } else {
              b.className = 'als-btn warn';
              if (elQuizFeedback) elQuizFeedback.textContent = '❌ Tekrar kuyruğuna eklendi. Doğru anlam: ' + item.tr;
            }
          });
          elQuizOpts.appendChild(b);
        });
      }
    }

    document.querySelectorAll('[data-yds-word-idx]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        yIdx = parseInt(btn.getAttribute('data-yds-word-idx') || '0', 10);
        document.querySelectorAll('[data-yds-word-idx]').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        renderYds(yIdx);
      });
    });

    var btnKnow = document.getElementById('ydsBtnKnow');
    var btnRev = document.getElementById('ydsBtnReview');
    if (btnKnow) {
      btnKnow.addEventListener('click', function () {
        knownCount++;
        yIdx = (yIdx + 1) % ydsWords.length;
        renderYds(yIdx);
      });
    }
    if (btnRev) {
      btnRev.addEventListener('click', function () {
        reviewCount++;
        yIdx = (yIdx + 1) % ydsWords.length;
        renderYds(yIdx);
      });
    }
    renderYds(0);
  }

  /* 6. MY DIARY — Live Mood & Journal Entry Preview */
  var diaryMoodBtns = document.querySelectorAll('[data-diary-mood]');
  var diaryMoodBadge = document.getElementById('diaryLiveMood');
  var diaryTitleInput = document.getElementById('diaryLiveTitle');
  var diaryTitleOut = document.getElementById('diaryOutTitle');
  if (diaryMoodBtns.length && diaryMoodBadge) {
    diaryMoodBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        diaryMoodBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        diaryMoodBadge.textContent = btn.getAttribute('data-diary-mood');
      });
    });
  }
  if (diaryTitleInput && diaryTitleOut) {
    diaryTitleInput.addEventListener('input', function () {
      diaryTitleOut.textContent = diaryTitleInput.value || 'Bugünün Unutulmaz Anısı';
    });
  }

  /* 7. KUBE RUSH — Live 3D Cube Scale & Obstacle Simulator */
  var kubeSlider = document.getElementById('kubeScaleSlider');
  var kubeBox = document.getElementById('kubeLiveBox');
  var kubeScaleLabel = document.getElementById('kubeScaleLabel');
  var kubeObsStatus = document.getElementById('kubeObsStatus');
  if (kubeSlider && kubeBox) {
    function updateKube(val) {
      var v = parseFloat(val); // 0.4 to 1.8
      var w = Math.round(76 / Math.sqrt(v));
      var h = Math.round(76 * v);
      kubeBox.style.width = w + 'px';
      kubeBox.style.height = h + 'px';
      if (kubeScaleLabel) kubeScaleLabel.textContent = 'Ölçek: ' + v.toFixed(2) + 'x';
      if (kubeObsStatus) {
        if (v < 0.75) {
          kubeObsStatus.textContent = '✅ Düşük Duvar: Küp küçüldü, alt boşluktan hızla geçiyor!';
        } else if (v > 1.3) {
          kubeObsStatus.textContent = '✅ Yüksek Bar & Dar Sütun: Küp uzadı ve inceldi, dar geçitten sığıyor!';
        } else {
          kubeObsStatus.textContent = '⚡ Dengeli Boyut (1.00x): Tünel ve bölünmüş kapılar için ideal merkez ölçeği.';
        }
      }
    }
    kubeSlider.addEventListener('input', function () { updateKube(kubeSlider.value); });
    document.querySelectorAll('[data-kube-preset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-kube-preset');
        kubeSlider.value = val;
        updateKube(val);
      });
    });
    updateKube(kubeSlider.value);
  }

  /* 8. APP PLAKA KONTROL — Live 7-Criteria Turkish Plate Inspector */
  var plateInput = document.getElementById('plateLiveInput');
  var plateRenderText = document.getElementById('plateRenderText');
  var plateRenderBox = document.getElementById('plateRenderBox');
  var plateVerdict = document.getElementById('plateLiveVerdict');
  var plateCityInfo = document.getElementById('plateCityInfo');
  var trCities = {
    '01': 'Adana', '06': 'Ankara', '07': 'Antalya', '16': 'Bursa', '26': 'Eskişehir',
    '34': 'İstanbul', '35': 'İzmir', '41': 'Kocaeli', '42': 'Konya', '48': 'Muğla',
    '54': 'Sakarya', '55': 'Samsun', '61': 'Trabzon', '81': 'Düzce'
  };
  function updatePlateMode(mode, text) {
    if (plateRenderText && text) plateRenderText.textContent = text.toUpperCase();
    var code = (plateRenderText ? plateRenderText.textContent : '34').trim().slice(0, 2);
    var city = trCities[code] || ('İl Kodu ' + code);
    if (plateCityInfo) plateCityInfo.textContent = '📍 Tespit Edilen İl: ' + code + ' (' + city + ')';
    if (!plateRenderBox || !plateVerdict) return;
    if (mode === 'app') {
      plateRenderText.style.fontWeight = '900';
      plateRenderText.style.letterSpacing = '0.01em';
      plateVerdict.innerHTML = '🚨 <strong>SONUÇ: APP PLAKA TESPİT EDİLDİ (%96 Güven)</strong><br>Kalın/etli Beşiktaş-Fransız baskı karakterler, standart dışı DIN 1451 fontu ve eksik soğuk mühür/QR.';
      plateVerdict.style.borderColor = '#ef4444';
      plateVerdict.style.background = 'rgba(239,68,68,0.14)';
    } else {
      plateRenderText.style.fontWeight = '600';
      plateRenderText.style.letterSpacing = '0.12em';
      plateVerdict.innerHTML = '✅ <strong>SONUÇ: STANDART YÖNETMELİK PLAKASI (%99 Güven)</strong><br>DIN 1451 ince font, sol TR mavi hologram bandı, 2024+ güvenlik QR kodu ve resmi soğuk mühür uygun.';
      plateVerdict.style.borderColor = '#10b981';
      plateVerdict.style.background = 'rgba(16,185,129,0.14)';
    }
  }
  if (plateInput) {
    plateInput.addEventListener('input', function () {
      updatePlateMode(plateInput.getAttribute('data-mode') || 'standard', plateInput.value || '34 AB 1234');
    });
  }
  document.querySelectorAll('[data-plate-preset]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-plate-preset]').forEach(function (b) { b.classList.toggle('active', b === btn); });
      var mode = btn.getAttribute('data-plate-mode') || 'standard';
      var val = btn.getAttribute('data-plate-preset') || '34 AB 1234';
      if (plateInput) {
        plateInput.value = val;
        plateInput.setAttribute('data-mode', mode);
      }
      updatePlateMode(mode, val);
    });
  });

  /* 9. ANI YAKALA — Live GPS Watermark & Location Stamp Studio */
  var stampLocBtns = document.querySelectorAll('[data-stamp-loc]');
  var stampLocOut = document.getElementById('stampOutLoc');
  var stampCoordOut = document.getElementById('stampOutCoord');
  var stampWeatherOut = document.getElementById('stampOutWeather');
  var stampNoteIn = document.getElementById('stampNoteInput');
  var stampNoteOut = document.getElementById('stampOutNote');
  if (stampLocBtns.length) {
    stampLocBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        stampLocBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        if (stampLocOut) stampLocOut.textContent = btn.getAttribute('data-stamp-loc');
        if (stampCoordOut) stampCoordOut.textContent = btn.getAttribute('data-stamp-coord');
        if (stampWeatherOut) stampWeatherOut.textContent = btn.getAttribute('data-stamp-weather');
      });
    });
  }
  if (stampNoteIn && stampNoteOut) {
    stampNoteIn.addEventListener('input', function () {
      stampNoteOut.textContent = stampNoteIn.value || 'Galata Kulesi’nde gün batımı yürüyüşü ✨';
    });
  }

  /* 10. SU İÇME HATIRLATICISI — Live Hydration Wave Ring & Goal Calculator */
  var waterFillEl = document.getElementById('waterLiveFill');
  var waterTextEl = document.getElementById('waterLiveText');
  var waterPctEl = document.getElementById('waterLivePct');
  if (waterFillEl && waterTextEl) {
    var currentMl = 1650, goalMl = 2500;
    function renderWater() {
      var pct = Math.min(100, Math.round((currentMl / goalMl) * 100));
      waterFillEl.style.height = pct + '%';
      waterTextEl.textContent = currentMl + ' / ' + goalMl + ' ml';
      if (waterPctEl) waterPctEl.textContent = '%' + pct + ' Tamamlandı';
    }
    document.querySelectorAll('[data-add-water]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var delta = parseInt(btn.getAttribute('data-add-water') || '0', 10);
        if (delta === 0) currentMl = 0;
        else currentMl = Math.min(goalMl + 1000, currentMl + delta);
        renderWater();
      });
    });
    renderWater();
  }

  /* 11. HAYAT SİMÜLASYONU — Live Fate & Branching Decision Simulator */
  var lifeCountryOut = document.getElementById('lifeSimCountryOut');
  var lifeStatsOut = document.getElementById('lifeSimStatsOut');
  var lifeLogOut = document.getElementById('lifeSimLog');
  document.querySelectorAll('[data-life-country]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-life-country]').forEach(function (b) { b.classList.toggle('active', b === btn); });
      if (lifeCountryOut) lifeCountryOut.textContent = btn.getAttribute('data-life-country');
      if (lifeStatsOut) lifeStatsOut.textContent = btn.getAttribute('data-life-stats');
    });
  });
  document.querySelectorAll('[data-life-choice]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-life-choice]').forEach(function (b) { b.classList.toggle('active', b === btn); });
      if (lifeLogOut) lifeLogOut.textContent = btn.getAttribute('data-life-res');
    });
  });

  /* 12. BİZİM DÜNYAMIZ (OUR WORLD) — Live Neighborhood District Switcher */
  var owZones = {
    farm: {
      tag: 'TARIM & HAYVANCILIK', meta: '16 Parsel · 3 Hayvan Türü',
      title: 'Aydos Yeşil Vadi Çiftliği & Köy Pazarı',
      desc: '16 verimli tarım parselinde ayçiçeği, domates, biber ve çilek yetiştir; inek sağ, koyun kırk, tavuklardan yumurta topla ve taze ürünleri köy tezgahında sat!',
      cards: [['🌻 4 Mahsul Türü', 'Ayçiçeği, domates, biber, çilek'], ['🐄 Hayvan Bakımı', 'İnek sağımı, yün kırkma, yumurta']]
    },
    garage: {
      tag: 'NO:73 OTO GARAJ & YIKAMA', meta: 'Hidrolik Lift · Tuning',
      title: 'No:73 Oto Tamir, Modifiye & Yıkama Tüneli',
      desc: 'Müşteri arabalarını hidrolik liftle kaldırıp 3 aşamalı tamir yap; aracını metalik boya, jant, GT spoiler, tavan sepeti, turbo ve nitroyla özelleştir.',
      cards: [['🔧 Hidrolik Lift Tamiri', '3 aşamalı mekanik bakım ödülleri'], ['🏎️ Turbo, Nitro & Spoiler', 'Oto yıkama tüneliyle parlat']]
    },
    sports: {
      tag: '5 OYNANABİLİR SPOR + POLİGON', meta: 'Tenis · Futbol · Atış',
      title: 'Spor Sahaları & Aydos Atış Poligonu',
      desc: '1v1 Toprak Kort Tenis, 3v3 Futbol, 2v2 Basketbol, 2v2 Voleybol, 50m Yüzme & Akrobatik Dalış veya 4 silahlı / 4 modlu Aydos Atış Poligonu’na katıl.',
      cards: [['⚽ 5 Spor Branşı', 'Tenis, futbol, basketbol, voleybol, yüzme'], ['🎯 Aydos Atış Poligonu', '4 farklı silah · 4 oyun modu']]
    },
    lake: {
      tag: 'SULTANBEYLİ GÖLÜ & EV NO:48', meta: '5 Balık Türü · Dekor',
      title: 'İskele Balıkçılığı, Ev Dekorasyonu & Mangal',
      desc: 'Sultanbeyli Gölü iskelesinden olta atarak 5 farklı balık yakala; Ev No:48’i lüks mobilyalar ve akvaryumla yenile, arka bahçede mangal yak.',
      cards: [['🎣 Göl Balıkçılığı', '5 farklı balık türü ve koleksiyon'], ['🏡 Ev No:48 & Çay Bahçesi', 'Lüks dekorasyon, akvaryum & havuz']]
    },
    city: {
      tag: '8 CANLI CADDE & 32 GÖREV', meta: '6 Bölüm · TR/EN Ses',
      title: 'Saat Kulesi Meydanı, Çoklu Araç & Meslekler',
      desc: '8 bağlı cadde arasında araç sür; taksi, pizza teslimatı, temizlik ve boyama işleriyle 6 bölümlük 32 görevli hikâyeyi tamamla.',
      cards: [['🚕 Taksi, Pizza & Boyama', 'Şehir içi aktif meslek görevleri'], ['🗣️ 10 TR + 6 EN Seslendirme', 'Gece yanıp sönen farlar & sokak lambaları']]
    }
  };
  document.querySelectorAll('[data-ow-zone]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var z = owZones[btn.getAttribute('data-ow-zone')];
      if (!z) return;
      document.querySelectorAll('[data-ow-zone]').forEach(function (b) { b.classList.toggle('active', b === btn); });
      var tEl = document.getElementById('owZoneTag');
      var mEl = document.getElementById('owZoneMeta');
      var hEl = document.getElementById('owZoneTitle');
      var dEl = document.getElementById('owZoneDesc');
      var cEl = document.getElementById('owZoneTasks');
      if (tEl) tEl.textContent = z.tag;
      if (mEl) mEl.textContent = z.meta;
      if (hEl) hEl.textContent = z.title;
      if (dEl) dEl.textContent = z.desc;
      if (cEl) {
        cEl.innerHTML = z.cards.map(function (c) {
          return '<div style="padding:0.75rem 0.85rem;border-radius:14px;background:var(--phone-surface);border:1px solid rgba(255,255,255,0.12)"><b style="display:block;font-size:0.8rem">' + c[0] + '</b><span style="font-size:0.72rem;color:var(--phone-sub)">' + c[1] + '</span></div>';
        }).join('');
      }
    });
  });

  /* 13. TELEFONU VER — Hold-to-Reveal Secret Mission Simulator */
  var ptpCard = document.getElementById('ptpSecretCard');
  var ptpBadge = document.getElementById('ptpModeBadge');
  var ptpLock = document.getElementById('ptpLockStatus');
  var ptpHoldBtn = document.getElementById('ptpHoldBtn');
  var ptpActiveMission = 'Sohbet devam ederken masadaki 2 farklı kişiye son izledikleri diziyi sor ve iki yanıtı birbirine karıştırmış gibi davran.';
  var ptpHiddenText = '👀 Yalnızca sen bakıyorsan aşağıdaki "Basılı Tut / Göster" butonunu kullan.';
  document.querySelectorAll('[data-ptp-mode]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-ptp-mode]').forEach(function (b) { b.classList.toggle('active', b === btn); });
      ptpActiveMission = btn.getAttribute('data-ptp-mission') || ptpActiveMission;
      if (ptpBadge) ptpBadge.textContent = btn.textContent.trim().toUpperCase();
      if (ptpCard) ptpCard.textContent = ptpHiddenText;
      if (ptpLock) ptpLock.textContent = '🔒 Görev Gizli';
    });
  });
  if (ptpHoldBtn && ptpCard) {
    function revealMission() {
      ptpCard.textContent = '🎯 GİZLİ GÖREVİN: ' + ptpActiveMission;
      if (ptpLock) ptpLock.textContent = '🔓 Yalnızca Sana Açık';
    }
    function hideMission() {
      ptpCard.textContent = ptpHiddenText;
      if (ptpLock) ptpLock.textContent = '🔒 Görev Gizli';
    }
    ptpHoldBtn.addEventListener('pointerdown', revealMission);
    ptpHoldBtn.addEventListener('pointerup', hideMission);
    ptpHoldBtn.addEventListener('pointerleave', hideMission);
    ptpHoldBtn.addEventListener('pointercancel', hideMission);
  }

  /* 14. HAREKET — Interactive Muscle Group Quick Inspector */
  var hrkMuscles = {
    chest: {
      tag: 'GÖĞÜS (PECTORALIS) · 9 ANA HAREKET', tempo: 'Tempo: 2-1-1 · 3×12',
      title: 'Şınav (Push-up) · Dambıl Göğüs Pres',
      desc: 'Yüksek plank pozisyonunda gövde düz tutulur; dirsekler gövdeyle 30–45° açıda kontrollü indirilip yer güçlüce itilir. Bel çökmesine izin vermeyin.',
      p1: ['🎯 Birincil: Pectoralis Major', 'Orta & genel göğüs'],
      p2: ['🤝 İkincil: Ön Omuz & Triceps', 'Core stabilizasyonu aktif']
    },
    back: {
      tag: 'SIRT (LATISSIMUS & RHOMBOID) · 9 ANA HAREKET', tempo: 'Tempo: 2-1-2 · 3×10',
      title: 'Eğilerek Halter Sırt Çekiş · Barfiks',
      desc: 'Omurga nötr pozisyondayken barı diz hizasından üst karın bölgesine doğru kürek kemiklerini sıkarak çekin; omuzları kulaklara kaldırmayın.',
      p1: ['🎯 Birincil: Latissimus & Trapez', 'Genişlik & sırt kalınlığı'],
      p2: ['🤝 İkincil: Arka Omuz & Biceps', 'Bel & arka zincir desteği']
    },
    shoulder: {
      tag: 'OMUZ (DELTOID) · 15 ANA HAREKET', tempo: 'Tempo: 2-0-1 · 3×12',
      title: 'Ayakta Dambıl Omuz Pres · Yana Açış',
      desc: 'Gövde dik ve karın sıkıyken dambılları baş üstüne kontrollü itin; dirsekleri tamamen kilitlemeden ve belden yardım almadan indirin.',
      p1: ['🎯 Birincil: Ön & Orta Deltoid', 'Omuz başı hacim & kuvvet'],
      p2: ['🤝 İkincil: Triceps & Üst Göğüs', 'Scapular stabilizasyon']
    },
    core: {
      tag: 'KARIN & CORE · 8 ANA HAREKET', tempo: 'İzometrik · 3×45 sn',
      title: 'Ön Kol Plank Duruşu · Dead Bug',
      desc: 'Baştan topuğa düz hat koruyarak karın kaslarını sıkın; kalçanın aşağı sarkmasına veya yukarı kalkmasına izin vermeden ritmik nefes alın.',
      p1: ['🎯 Birincil: Transversus & Rectus', 'Anti-ekstansiyon core gücü'],
      p2: ['🤝 İkincil: Kalça & Omuz Stabilizer', 'Omurga koruma hattı']
    },
    leg: {
      tag: 'BACAK & KALÇA (QUAD / HAMSTRING / GLUTE) · 18 HAREKET', tempo: 'Tempo: 3-1-1 · 4×10',
      title: 'Sırtta Halterle Çömelme (Back Squat) · RDL',
      desc: 'Ayaklar omuz genişliğinde; kalçayı geriye itip dizleri ayak parmak hizasında bükerek kontrollü alçalın ve topuklardan güç alarak doğrulun.',
      p1: ['🎯 Birincil: Quadriceps & Gluteus', 'Alt vücut temel kuvveti'],
      p2: ['🤝 İkincil: Hamstring & Core', 'Tam gövde stabilitesi']
    }
  };
  document.querySelectorAll('[data-hrk-muscle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var m = hrkMuscles[btn.getAttribute('data-hrk-muscle')];
      if (!m) return;
      document.querySelectorAll('[data-hrk-muscle]').forEach(function (b) { b.classList.toggle('active', b === btn); });
      var tEl = document.getElementById('hrkZoneTag');
      var tpEl = document.getElementById('hrkTempoOut');
      var hEl = document.getElementById('hrkExTitle');
      var dEl = document.getElementById('hrkExDesc');
      var mEl = document.getElementById('hrkMusclesOut');
      if (tEl) tEl.textContent = m.tag;
      if (tpEl) tpEl.textContent = m.tempo;
      if (hEl) hEl.textContent = m.title;
      if (dEl) dEl.textContent = m.desc;
      if (mEl) {
        mEl.innerHTML =
          '<div style="padding:0.75rem 0.85rem;border-radius:14px;background:var(--phone-surface);border:1px solid rgba(255,255,255,0.12)"><b style="display:block;font-size:0.8rem">' + m.p1[0] + '</b><span style="font-size:0.72rem;color:var(--phone-sub)">' + m.p1[1] + '</span></div>' +
          '<div style="padding:0.75rem 0.85rem;border-radius:14px;background:var(--phone-surface);border:1px solid rgba(255,255,255,0.12)"><b style="display:block;font-size:0.8rem">' + m.p2[0] + '</b><span style="font-size:0.72rem;color:var(--phone-sub)">' + m.p2[1] + '</span></div>';
      }
    });
  });
})();
