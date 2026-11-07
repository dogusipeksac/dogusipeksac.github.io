/* ==========================================================================
   CLIENT SHOWCASE ENGINE — 3D Nested Scroll Portal + Multi-Version Switcher
   + Commercial "Ready for Sale" Bar & Quote Modal for Client Demo Websites
   ========================================================================== */
(function () {
  'use strict';

  var SITE_CATALOG = {
    galatano5: {
      name: 'Galata No5 Beauty',
      sector: 'Kuaför & Güzellik Stüdyosu',
      heroImg: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80',
      tagline: 'Güzellik & Bakım Stüdyoları İçin 3D İnteraktif Web Deneyimi',
      sub: 'Online randevu, önce/sonra karşılaştırma, TR/EN dil desteği ve WhatsApp dönüşüm kurgusuyla anahtar teslim.',
      wingL: { k: 'DÖNÜŞÜM ODAKLI', t: 'Randevu + WhatsApp', d: 'Ziyaretçiyi 15 saniyede randevu ve hizmet seçimine yönlendiren akış.' },
      wingR: { k: '3 FARKLI VERSİYON', t: 'Portal · Editorial · Luxe', d: 'Salonunuzun kimliğine göre tek tıkla değişen 3 ayrı tasarım dili.' }
    },
    atelier41: {
      name: 'Atelier 41 Architecture',
      sector: 'Mimarlık & İç Mimari Stüdyosu',
      heroImg: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=80',
      tagline: 'Mimarlık, İnşaat & Tasarım Ofisleri İçin 3D Portal Vitrin',
      sub: 'Projeleri iç içe açılan 3D sahnelerle sunan, arsa ve proje keşif taleplerini toplayan prestij sitesi.',
      wingL: { k: 'PORTFÖY VİTRİNİ', t: '3D Proje Sahnesi', d: 'Konut, otel ve ticari projeleri tam ekran sinematik geçişlerle sunar.' },
      wingR: { k: 'KURUMSAL SATIŞ', t: 'Keşif & Brief Formu', d: 'Potansiyel yatırımcılardan doğrudan arsa ve metrekare briefi toplar.' }
    },
    sarnic: {
      name: 'Sarnıç Fine Dining',
      sector: 'Restoran & Gastronomi',
      heroImg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80',
      tagline: 'Restoran, Fine Dining & Lounge İçin Masa Dolduran Web Deneyimi',
      sub: 'Tadım menüsü, şarap eşleşmesi, atmosfer galerisi ve doğrudan masa rezervasyonu tek akışta.',
      wingL: { k: 'GASTRONOMİ', t: 'Menü & Şarap Eşleşmesi', d: 'Misafiri daha kapıdan girmeden atmosfer ve menü hikayesiyle etkiler.' },
      wingR: { k: 'REZERVASYON', t: 'Anında Masa Talebi', d: 'Kişi sayısı, tarih ve özel notlarla komisyonsuz doğrudan rezervasyon.' }
    },
    'kirik-isik': {
      name: 'Kırık Işık Photography',
      sector: 'Fotoğraf & Prodüksiyon Stüdyosu',
      heroImg: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80',
      tagline: 'Fotoğrafçılar & Kreatif Ajanslar İçin İç İçe Açılan Görsel Portal',
      sub: 'Film şeridi akışı, paket/fiyat kartları ve tarih müsaitlik sorgulama sistemiyle işi kendi satan portföy.',
      wingL: { k: 'GÖRSEL HİKAYE', t: 'Sinematik Kadraj Akışı', d: 'Yüksek çözünürlüklü serileri 3D derinlik ve akıcı geçişlerle sergiler.' },
      wingR: { k: 'PAKET & TARİH', t: 'Net Paketler & Teklif', d: 'Düğün, editorial ve prodüksiyon paketlerini şeffaf biçimde sunar.' }
    },
    'pera-house': {
      name: 'Pera House Hotel',
      sector: 'Butik Otel & Konaklama',
      heroImg: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&q=80',
      tagline: 'Butik Oteller & Villa Kiralama İçin Komisyonsuz Rezervasyon Sitesi',
      sub: 'Oda kartları, lokasyon rehberi ve doğrudan tarih seçimiyle aracı komisyonlarını sıfırlayan otel vitrini.',
      wingL: { k: 'DOĞRUDAN SATIŞ', t: '%0 Komisyon Rezervasyon', d: 'Misafiri OTA komisyonu olmadan doğrudan otelin kendi takvimine bağlar.' },
      wingR: { k: 'ODA & DENEYİM', t: '3D Oda & Semt Vitrin', d: 'Süitleri, avlu atmosferini ve yürüyüş mesafesi noktaları birlikte sunar.' }
    },
    vera: {
      name: 'Vera Estetik & Diş Kliniği',
      sector: 'Klinik, Diş & Sağlık Turizmi',
      heroImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80',
      tagline: 'Diş, Estetik & Sağlık Klinikleri İçin Güven Odaklı 3D Web Paketi',
      sub: 'Tedavi süreçleri, doktor akreditasyonları, vaka sonuçları ve hızlı WhatsApp/randevu dönüşümü.',
      wingL: { k: 'SAĞLIK & GÜVEN', t: 'Tedavi & Uzman Vitrin', d: 'Hastanın karar sürecini hızlandıran 4 adımlı şeffaf klinik protokolü.' },
      wingR: { k: 'HASTA DÖNÜŞÜMÜ', t: 'WhatsApp & Ön Görüşme', d: 'Tek tıkla fotoğraf gönderimi ve 20 dakikalık ön görüşme randevusu.' }
    },
    dem: {
      name: 'Dem Cihangir — QR Menü',
      sector: 'Kafe & Yeni Nesil Kahve QR Menü',
      heroImg: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80',
      tagline: 'Kafe, Pastane & Kahve Dükkanları İçin Canlı QR Menü + Web Paketi',
      sub: 'Anında kategori filtreleme, ürün arama, tek tıkla Wi-Fi kopyalama ve WhatsApp garson çağırma.',
      wingL: { k: 'MASADAKİ QR', t: 'Sıfır Bekleme · Canlı Arama', d: 'Uygulama indirmeden saniyede açılan fotoğraflı ve fiyatlı menü.' },
      wingR: { k: 'AKILLI ÖZELLİKLER', t: 'Wi-Fi + Garson Çağır', d: 'Masa numarası algılama, tek tıkla Wi-Fi şifresi ve garson bildirimi.' }
    },
    ocak: {
      name: 'Ocak Karaköy — Izgara & QR',
      sector: 'Restoran, Ocakbaşı & Gastro QR',
      heroImg: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1400&q=80',
      tagline: 'Restoran & Ocakbaşı İşletmeleri İçin Koyu Tema Lüks QR + Vitrin',
      sub: 'Meze, ızgara, deniz ürünleri kategorileri, masa bazlı hesap isteme ve garson çağırma sistemi.',
      wingL: { k: 'GASTRO QR', t: 'İştah Açan Koyu Vitrin', d: 'Yemek fotoğraflarını ve şefin önerilerini öne çıkaran yüksek kontrast tasarım.' },
      wingR: { k: 'HIZLI SERVİS', t: 'Masadan Hesap & Garson', d: 'Masa numarasıyla entegre tek tıkla hesap ve garson çağırma.' }
    },
    magaza: {
      name: 'Çizgi Spor — Dinamik Mağaza',
      sector: 'E-Ticaret & Dinamik Branş Vitrini',
      heroImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1400&q=80',
      tagline: 'Perakende & E-Ticaret Markaları İçin Kategoriye Göre Değişen 3D Mağaza',
      sub: 'Seçilen kategoriye göre tüm renk, atmosfer ve ürün dizilimi canlı değişen interaktif mağaza.',
      wingL: { k: 'DİNAMİK TEMA', t: 'Branşa Göre Değişen Vitrin', d: 'Tenis, futbol, koşu veya fitness seçildiğinde tüm site o sahaya dönüşür.' },
      wingR: { k: 'E-TİCARET HAZIR', t: 'Sepet & Hızlı Sipariş', d: 'Varyant seçimi, canlı sepet çekmecesi ve hızlı ödeme/sipariş kurgusu.' }
    },
    aircondition: {
      name: 'AirFlow Klima Sistemleri',
      sector: 'Kurumsal Teknik Servis & Mühendislik',
      heroImg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1400&q=80',
      tagline: 'İklimlendirme, Mühendislik & Kurumsal Hizmetler İçin 3D Web Paketi',
      sub: 'Hizmet paketleri, BTU/keşif yönlendirmesi, müşteri yorumları ve 7/24 acil servis çağrı hattı.',
      wingL: { k: 'KURUMSAL GÜVEN', t: '7/24 Servis & Keşif', d: 'Bireysel ve ticari müşteriler için net hizmet kartları ve garanti vurgusu.' },
      wingR: { k: 'LEAD TOPLAMA', t: 'Ücretsiz Keşif Formu', d: 'Bölge ve hizmet tipine göre anında telefon ve teklif talebi toplar.' }
    },
    tamirat: {
      name: 'ProFix Tadilat & Onarım',
      sector: 'İnşaat, Tadilat & Ev Hizmetleri',
      heroImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80',
      tagline: 'Tadilat, Dekorasyon & Usta Hizmetleri İçin Yüksek Dönüşümlü Web Sitesi',
      sub: 'Banyo, mutfak, boya ve tesisat hizmetlerini fiyat/süre şeffaflığıyla sunan, WhatsApp entegreli vitrin.',
      wingL: { k: 'HIZLI TEKLİF', t: 'WhatsApp & Keşif Hattı', d: 'Müşterinin arıza veya tadilat talebini tek tıkla ustaya ulaştırır.' },
      wingR: { k: 'GÜÇLÜ KİMLİK', t: '3 Farklı Tasarım Modu', d: 'Endüstriyel koyu, 3D interaktif portal veya kurumsal açık tema seçeneği.' }
    }
  };

  function detectSlug() {
    var p = (location.pathname || '').replace(/^\/+|\/+$/g, '').split('/')[0];
    if (SITE_CATALOG[p]) return p;
    return 'galatano5';
  }

  var slug = detectSlug();
  var meta = SITE_CATALOG[slug];

  // Read initial version from ?v=portal | editorial | luxe (default: portal!)
  var params = new URLSearchParams(location.search);
  var initialVer = params.get('v') || 'portal';
  if (['portal', 'editorial', 'luxe'].indexOf(initialVer) === -1) {
    initialVer = 'portal';
  }

  document.documentElement.setAttribute('data-cs-version', initialVer);
  document.body.classList.add('cs-enhanced');

  // 1. Build Top Commercial Showcase & Version Switcher Bar
  var topbar = document.createElement('div');
  topbar.className = 'cs-topbar';
  topbar.innerHTML =
    '<div class="cs-left">' +
      '<a href="/#projects" class="cs-back">← Tüm Web Vitrinleri</a>' +
      '<span class="cs-sale-pill"><i></i> Satışa Hazır Müşteri Paketi · ' + meta.sector + '</span>' +
    '</div>' +
    '<div class="cs-versions" role="group" aria-label="Tasarım Versiyonu Seç">' +
      '<span class="cs-v-label">Versiyon:</span>' +
      '<button type="button" class="cs-v-btn" data-v="portal">V1 · 3D İnteraktif Portal</button>' +
      '<button type="button" class="cs-v-btn" data-v="editorial">V2 · Editorial Klasik</button>' +
      '<button type="button" class="cs-v-btn" data-v="luxe">V3 · Bakır &amp; Gece Lüks</button>' +
    '</div>' +
    '<div class="cs-right">' +
      '<button type="button" class="cs-buy-btn" id="csOpenModal">💼 Bu Siteyi Satın Al / Özelleştir →</button>' +
    '</div>';

  document.body.insertBefore(topbar, document.body.firstChild);

  // 2. Build 3D Nested Scroll Portal Stage right below topbar
  var portalStage = document.createElement('div');
  portalStage.className = 'cs-portal-stage';
  portalStage.id = 'csPortalStage';
  portalStage.innerHTML =
    '<div class="cs-portal-sticky">' +
      '<div class="cs-portal-Aurora"></div>' +
      '<div class="cs-portal-head" id="csPortalHead">' +
        '<div class="cs-portal-kicker">✦ SATIŞA HAZIR WEB PAKETİ · İÇ İÇE AÇILAN 3D PORTAL</div>' +
        '<h2 class="cs-portal-title">' + meta.name + '</h2>' +
        '<p class="cs-portal-sub">' + meta.tagline + ' — ' + meta.sub + '</p>' +
      '</div>' +
      '<div class="cs-wing left" id="csWingL">' +
        '<div class="cs-wing-k">' + meta.wingL.k + '</div>' +
        '<div class="cs-wing-t">' + meta.wingL.t + '</div>' +
        '<div class="cs-wing-d">' + meta.wingL.d + '</div>' +
      '</div>' +
      '<div class="cs-wing right" id="csWingR">' +
        '<div class="cs-wing-k">' + meta.wingR.k + '</div>' +
        '<div class="cs-wing-t">' + meta.wingR.t + '</div>' +
        '<div class="cs-wing-d">' + meta.wingR.d + '</div>' +
      '</div>' +
      '<div class="cs-portal-window" id="csPortalWin">' +
        '<div class="cs-portal-bar">' +
          '<div class="cs-dots"><i></i><i></i><i></i></div>' +
          '<div class="cs-portal-url">https://dogusipeksac.com/' + slug + ' · CANLI VİTRİN</div>' +
          '<span>3D PORTAL</span>' +
        '</div>' +
        '<div class="cs-portal-screen" style="background-image:url(\'' + meta.heroImg + '\')">' +
          '<div class="cs-portal-inner" id="csPortalInner">' +
            '<div class="cs-portal-inner-tag">' + meta.sector.toUpperCase() + ' · 3 FARKLI VERSİYON</div>' +
            '<div class="cs-portal-inner-h">' + meta.name + '</div>' +
            '<div class="cs-portal-inner-p">' + meta.sub + ' Kaydırdıkça vitrin tam ekrana açılır.</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="cs-scroll-cue" id="csScrollCue">↓ KAYDIR · VİTRİN İÇİNE GİR</div>' +
    '</div>';

  topbar.insertAdjacentElement('afterend', portalStage);

  // 3. Build Purchase / Customization Modal
  var modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'cs-modal-backdrop';
  modalBackdrop.id = 'csModalBackdrop';
  modalBackdrop.innerHTML =
    '<div class="cs-modal" role="dialog" aria-modal="true">' +
      '<button type="button" class="cs-modal-close" id="csCloseModal" aria-label="Kapat">✕</button>' +
      '<span class="cs-modal-badge">ANAHTAR TESLİM WEB PAKETİ</span>' +
      '<h3>' + meta.name + ' Tasarımını İşletmenize Uyarlayalım</h3>' +
      '<p>Bu sektörel web sitesini logonuz, renkleriniz, metinleriniz ve kendi alan adınızla (<code>.com / .com.tr</code>) 3 farklı tasarım versiyonundan dilediğinizle teslim ediyoruz.</p>' +
      '<div class="cs-modal-vers" id="csModalVers">' +
        '<div class="cs-modal-v" data-mv="portal"><b>V1 · 3D Portal</b><span>İç içe açılan sahne</span></div>' +
        '<div class="cs-modal-v" data-mv="editorial"><b>V2 · Editorial</b><span>Klasik &amp; ferah</span></div>' +
        '<div class="cs-modal-v" data-mv="luxe"><b>V3 · Bakır Lüks</b><span>Koyu sinematik</span></div>' +
      '</div>' +
      '<ul class="cs-modal-features">' +
        '<li>Mobil &amp; Masaüstü Kusursuz Uyum</li>' +
        '<li>WhatsApp &amp; Form Entegrasyonu</li>' +
        '<li>Google SEO &amp; Harita Kaydı</li>' +
        '<li>Çoklu Dil (TR / EN) Seçeneği</li>' +
        '<li>Yüksek Hız &amp; SSL Güvenlik</li>' +
        '<li>3 Farklı Versiyon Desteği</li>' +
      '</ul>' +
      '<div class="cs-modal-actions">' +
        '<a class="primary" id="csMailLink" href="#">✉️ Teklif &amp; Fiyat Al (E-posta)</a>' +
        '<a class="secondary" href="/#contact">📋 İletişim Bölümü →</a>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modalBackdrop);

  // Tag cards inside the demo site for 3D scroll tilt & hover
  var cardSelectors = [
    'section article',
    '.item',
    '.course',
    '.proj a',
    '.grid-more a',
    '.ba-grid figure',
    '.master-card',
    '.wine'
  ].join(',');
  var demoCards = Array.prototype.slice.call(document.querySelectorAll(cardSelectors));
  demoCards.forEach(function (el) {
    el.classList.add('cs-3d-card');
  });

  function updateMailLink(ver) {
    var verNames = {
      portal: 'V1 (3D İnteraktif Portal)',
      editorial: 'V2 (Editorial Klasik)',
      luxe: 'V3 (Bakır & Gece Lüks)'
    };
    var subject = encodeURIComponent(meta.name + ' Web Sitesi Siparişi / Teklif Talebi — ' + (verNames[ver] || ver));
    var body = encodeURIComponent(
      'Merhaba Doğuş Bey,\n\n' +
      'Portföyünüzdeki "' + meta.name + '" (' + meta.sector + ') web sitesi örneğini inceledim.\n' +
      'Tercih ettiğim versiyon: ' + (verNames[ver] || ver) + '\n\n' +
      'Kendi işletmemize uyarlanması için fiyat ve teslim süresi bilgisi alabilir miyim?\n\n' +
      'İşletme Adı:\nTelefon:'
    );
    var link = document.getElementById('csMailLink');
    if (link) {
      link.href = 'mailto:dogusipeksac@gmail.com?subject=' + subject + '&body=' + body;
    }
  }

  function setVersion(ver, pushUrl) {
    document.documentElement.setAttribute('data-cs-version', ver);
    document.querySelectorAll('.cs-v-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-v') === ver);
    });
    document.querySelectorAll('.cs-modal-v').forEach(function (box) {
      box.classList.toggle('active', box.getAttribute('data-mv') === ver);
    });
    updateMailLink(ver);
    if (pushUrl && history.replaceState) {
      var u = new URL(location.href);
      u.searchParams.set('v', ver);
      history.replaceState(null, '', u.toString());
    }
    onScroll();
  }

  document.querySelectorAll('.cs-v-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setVersion(btn.getAttribute('data-v'), true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.cs-modal-v').forEach(function (box) {
    box.addEventListener('click', function () {
      setVersion(box.getAttribute('data-mv'), true);
    });
  });

  document.getElementById('csOpenModal').addEventListener('click', function () {
    modalBackdrop.classList.add('open');
  });
  document.getElementById('csCloseModal').addEventListener('click', function () {
    modalBackdrop.classList.remove('open');
  });
  modalBackdrop.addEventListener('click', function (e) {
    if (e.target === modalBackdrop) modalBackdrop.classList.remove('open');
  });

  // 4. Scroll-Driven 3D Portal Animation + Section Card 3D Unfolding
  var winEl = document.getElementById('csPortalWin');
  var headEl = document.getElementById('csPortalHead');
  var innerEl = document.getElementById('csPortalInner');
  var wingL = document.getElementById('csWingL');
  var wingR = document.getElementById('csWingR');
  var cueEl = document.getElementById('csScrollCue');

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function onScroll() {
    var ver = document.documentElement.getAttribute('data-cs-version');
    if (ver === 'portal' || ver === 'luxe') {
      var rect = portalStage.getBoundingClientRect();
      var total = Math.max(1, portalStage.offsetHeight - window.innerHeight);
      var p = clamp(-rect.top / total, 0, 1);

      // Head fades & lifts out as portal expands
      var headP = clamp(p / 0.45, 0, 1);
      headEl.style.opacity = String(1 - headP);
      headEl.style.transform = 'translate3d(0,' + (-headP * 48).toFixed(1) + 'px,0) scale(' + (1 - headP * 0.08).toFixed(3) + ')';

      // Wings unfold in first half, then fly out as portal goes fullscreen
      var wingIn = clamp(p / 0.35, 0, 1);
      var wingOut = clamp((p - 0.55) / 0.35, 0, 1);
      var wingAlpha = wingIn * (1 - wingOut);
      wingL.style.opacity = String(wingAlpha);
      wingL.style.transform = 'perspective(900px) translate3d(' + (-wingOut * 140).toFixed(1) + 'px,0,0) rotateY(' + (24 - wingIn * 10).toFixed(1) + 'deg)';
      wingR.style.opacity = String(wingAlpha);
      wingR.style.transform = 'perspective(900px) translate3d(' + (wingOut * 140).toFixed(1) + 'px,0,0) rotateY(' + (-24 + wingIn * 10).toFixed(1) + 'deg)';

      // 3D Browser Window tilts flat and expands to full viewport
      var expandP = clamp((p - 0.12) / 0.78, 0, 1);
      var easeE = 1 - Math.pow(1 - expandP, 3);
      var rotX = (1 - easeE) * 16;
      var wVw = 84 + easeE * 16;
      var hVh = 56 + easeE * 40;
      var radius = (1 - easeE) * 20;

      winEl.style.width = wVw.toFixed(2) + 'vw';
      winEl.style.height = hVh.toFixed(2) + 'vh';
      winEl.style.borderRadius = radius.toFixed(1) + 'px';
      winEl.style.transform = 'rotateX(' + rotX.toFixed(2) + 'deg) translateZ(' + (easeE * 30).toFixed(1) + 'px)';

      if (innerEl) {
        innerEl.style.transform = 'translate3d(0,' + (-easeE * 28).toFixed(1) + 'px,0)';
      }
      if (cueEl) {
        cueEl.style.opacity = String(clamp(1 - p * 2.5, 0, 0.85));
      }

      // Apply subtle 3D scroll depth to cards inside the page
      var vh = window.innerHeight || 800;
      for (var i = 0; i < demoCards.length; i++) {
        var c = demoCards[i];
        var cr = c.getBoundingClientRect();
        if (cr.bottom < -100 || cr.top > vh + 100) continue;
        var centerOffset = (cr.top + cr.height * 0.5 - vh * 0.55) / (vh * 0.65);
        var clamped = clamp(centerOffset, -1, 1);
        if (clamped > 0) {
          // Entering from bottom: 3D tilt & recede
          var rx = clamped * 14;
          var ty = clamped * 26;
          var sc = 1 - clamped * 0.05;
          c.style.transform = 'perspective(1100px) translate3d(0,' + ty.toFixed(1) + 'px,0) rotateX(' + rx.toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')';
        } else {
          c.style.transform = '';
        }
      }
    } else {
      // Editorial classic mode: clean flat transforms
      for (var j = 0; j < demoCards.length; j++) {
        demoCards[j].style.transform = '';
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  setVersion(initialVer, false);
})();
