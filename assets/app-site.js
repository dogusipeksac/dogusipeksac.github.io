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
      androidUrl: ''
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
      iosUrl: 'https://apps.apple.com/tr/app/kube-rush/id6761354945?l=tr',
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
      iosUrl: 'https://apps.apple.com/tr/app/an%C4%B1-yakala/id6760869606?l=tr',
      androidUrl: 'https://play.google.com/store/apps/details?id=com.dogusipeksac.aniyakala'
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

  /* 2C. Inject Store QR Codes (#qr) & 6-App Ecosystem Switcher on .app-site-body pages */
  if (document.body.classList.contains('app-site-body') && !document.getElementById('qr')) {
    var mainShell = document.querySelector('main.app-shell');
    var ctaBanner = document.querySelector('.app-cta-banner');
    if (mainShell) {
      var qrSec = document.createElement('section');
      qrSec.className = 'app-qr-showcase';
      qrSec.id = 'qr';
      qrSec.innerHTML =
        '<h2 class="app-qr-showcase-title">QR Kod ile Hemen İndir</h2>' +
        '<p class="app-qr-showcase-sub">Telefon kameranızla QR kodu okutarak ' + meta.name + ' uygulamasını doğrudan App Store veya Google Play Store’dan indirebilirsiniz.</p>' +
        '<div class="app-qr-grid">' +
          '<a href="' + meta.iosUrl + '" class="store-qr-card ios" target="_blank" rel="noopener noreferrer">' +
            '<div class="store-qr-card-head"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg><span>iOS</span></div>' +
            '<p class="store-qr-card-store">App Store</p>' +
            '<div class="qr-frame"><div class="qr-frame-corners" aria-hidden="true"><span></span><span></span><span></span><span></span></div>' +
              '<img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&ecc=M&color=000000&bgcolor=ffffff&data=' + encodeURIComponent(meta.iosUrl) + '" width="260" height="260" alt="' + meta.name + ' iOS QR" />' +
            '</div>' +
            '<span class="store-qr-card-link">App Store’a git →</span>' +
          '</a>' +
          '<a href="' + meta.androidUrl + '" class="store-qr-card android" target="_blank" rel="noopener noreferrer">' +
            '<div class="store-qr-card-head"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.37.21.8.21 1.18.01L19.96 12 4.36.23C3.98.03 3.55.03 3.18.24A1.3 1.3 0 0 0 2.5 1.4v21.2c0 .48.26.92.68 1.16z"/></svg><span>Android</span></div>' +
            '<p class="store-qr-card-store">Google Play</p>' +
            '<div class="qr-frame"><div class="qr-frame-corners" aria-hidden="true"><span></span><span></span><span></span><span></span></div>' +
              '<img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&ecc=M&color=000000&bgcolor=ffffff&data=' + encodeURIComponent(meta.androidUrl) + '" width="260" height="260" alt="' + meta.name + ' Android QR" />' +
            '</div>' +
            '<span class="store-qr-card-link">Google Play’e git →</span>' +
          '</a>' +
        '</div>';

      var otherSec = document.createElement('section');
      otherSec.className = 'app-other-sec';
      otherSec.innerHTML =
        '<div class="app-sec-head" style="margin-bottom:1rem">' +
          '<span class="app-sec-kicker">DOĞUŞ İPEKSAÇ MOBİL EKOSİSTEMİ</span>' +
          '<h2>Diğer Mobil Uygulamalarımız</h2>' +
        '</div>' +
        '<div class="app-other-grid">' +
          '<a href="/ydskelime/" class="app-other-item' + (slug === 'ydskelime' ? ' active' : '') + '"><img src="/assets/apps/ydskelime.png" alt="" /><div>YDS Kelime KitApp<small>Eğitim · YDS &amp; SRS</small></div></a>' +
          '<a href="/mydiary/" class="app-other-item' + (slug === 'mydiary' ? ' active' : '') + '"><img src="/assets/apps/mydiary.png" alt="" /><div>My Diary<small>Günlük · Ses &amp; PDF</small></div></a>' +
          '<a href="/kuberush/" class="app-other-item' + (slug === 'kuberush' ? ' active' : '') + '"><img src="/assets/apps/kuberush.png" alt="" /><div>Kube Rush<small>3D Hypercasual Oyun</small></div></a>' +
          '<a href="/appplaka/" class="app-other-item' + (slug === 'appplaka' ? ' active' : '') + '"><img src="/assets/apps/appplaka.png" alt="" /><div>App Plaka Kontrol<small>AI · Plaka Denetimi</small></div></a>' +
          '<a href="/aniyakala/" class="app-other-item' + (slug === 'aniyakala' ? ' active' : '') + '"><img src="/assets/apps/aniyakala.png" alt="" /><div>Anı Yakala<small>Kamera · GPS Damga</small></div></a>' +
          '<a href="/suicme/" class="app-other-item' + (slug === 'suicme' ? ' active' : '') + '"><img src="/assets/apps/suicme.png" alt="" /><div>Su İçme Hatırlatıcısı<small>Sağlık · Su Takibi</small></div></a>' +
        '</div>';

      if (ctaBanner) {
        mainShell.insertBefore(qrSec, ctaBanner);
      } else {
        mainShell.appendChild(qrSec);
      }
      mainShell.appendChild(otherSec);
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
})();
