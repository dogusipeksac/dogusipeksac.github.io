(function () {
  'use strict';

  var STORAGE_KEY = 'site-lang';
  var lang = localStorage.getItem(STORAGE_KEY) || 'tr';
  if (lang !== 'tr' && lang !== 'en') lang = 'tr';

  var state = {
    category: 'all',
    pipeline: 'all',
    query: ''
  };

  var I18N = {
    tr: {
      pageTitle: 'Doğuş İpeksaç — Oyun, 3D Model & Unity Asset Vitrini',
      pageDesc: 'Unity paketleri (.unitypackage), optimize 3D low-poly modeller (.fbx / .glb), URP/HDRP shaderlar, UI kitleri ve C# oyun sistemleri.',
      navHome: '← Ana Sayfa',
      navCatalog: 'Katalog',
      navStandards: 'Standartlar',
      navGuide: 'Paket Yapısı',
      navContact: 'İletişim',
      eyebrow: 'UNITY · 3D · SHADER & TOOLKIT VAULT',
      heroTitle: 'Oyun, 3D Model & <span class="cu">Unity Asset Vitrini</span>',
      heroSub: 'Unity projeleri için üretim-hazır .unitypackage paketleri, optimize low-poly & PBR 3D modeller (.fbx / .glb), shaderlar, oyun UI kitleri ve C# sistem modülleri.',
      ctaExplore: 'Kataloğu İncele ↓',
      ctaContact: 'Özel Paket Talebi ✉️',
      statPacks: 'Yayındaki Paket',
      statPipelines: 'Render Pipeline',
      statFormats: 'Kaynak Format',
      searchPlaceholder: 'Paket, etiket veya format ara (örn. low-poly, URP, shader)...',
      allResultsPrefix: 'Gösterilen paket:',
      noMatchTitle: 'Eşleşen Paket Bulunamadı',
      noMatchDesc: 'Arama kelimesini veya kategori/pipeline filtrelerini sıfırlayarak tekrar deneyebilirsin.',
      resetFilters: 'Filtreleri Sıfırla',
      emptyTitle: 'Asset Deposu Hazır — İlk Paketler Yükleniyor',
      emptyDesc: 'dogusipeksac.com/assets yapısı kuruldu. Paket dosyaları /assets/packs/ altına ve önizleme görselleri /assets/previews/ altına eklendikçe katalog otomatik olarak burada listelenecek.',
      slotStatus: 'Klasör Hazır · Yakında',
      inspectBtn: 'Detay & Teknik Bilgi',
      downloadBtn: 'Paketi İndir ↓',
      copyUrlBtn: 'Linki Kopyala',
      copiedMsg: 'Bağlantı kopyalandı',
      specsLabel: './pipeline --specs',
      specsTitle: 'Üretim Standartları & Uyumluluk',
      specsSub: 'Burada yayınlanan tüm 3D model, shader ve Unity paketleri temiz hiyerarşi, mobil performans ve çoklu render pipeline uyumu gözetilerek hazırlanır.',
      spec1Title: 'URP · HDRP · Built-in',
      spec1Desc: 'Tüm materyal ve shader paketleri Universal Render Pipeline (URP) öncelikli hazırlanır; HDRP ve Built-in uyumlu materyal varyantları eklenir.',
      spec2Title: 'Temiz Pivot & Ölçek (1u = 1m)',
      spec2Desc: 'Her .fbx ve .glb model gerçek dünya metre ölçeğinde, sıfırlanmış transform ve doğru alt-merkez pivot noktasıyla export edilir.',
      spec3Title: 'Mobil Dostu Low-Call',
      spec3Desc: 'Low-poly modellerde paylaşımlı renk atlası veya paketlenmiş PBR (Albedo, Metallic/Smoothness, Normal) dokularla düşük draw-call.',
      spec4Title: 'Tak-Çalıştır Prefab & C#',
      spec4Desc: 'Collider, LOD grubu ve örnek sahneler (Demo Scene) hazır gelir; C# araçları temiz namespace ve XML dokümantasyonu içerir.',
      guideTitle: 'Geliştirici Notu: /assets/packs/ Klasörüne Yeni Paket Ekleme Rehberi',
      guideLead: 'Mevcut site dosyalarına dokunmadan doğrudan /assets/packs/<paket-adi>/ ve /assets/previews/<paket-adi>.png içine dosya ekleyip packs-data.js dosyasını güncelleyebilirsin.',
      footerCopy: '© 2026 Doğuş İpeksaç · Unity, 3D & Mobil Asset Vitrini',
      specUnity: 'Unity Sürümü',
      specPipeline: 'Render Pipeline',
      specPoly: 'Poligon / Tri',
      specTextures: 'Dokular',
      specFormat: 'Format / Boyut',
      specLicense: 'Lisans',
      contentsTitle: 'Paket İçeriği',
      slots: [
        { emoji: '🧊', title: '3D Modeller & Low-Poly', desc: 'Karakter, araç, mobilya ve oyun mekaniği prop setleri (.fbx, .glb, .unitypackage).' },
        { emoji: '🏙️', title: 'Çevre & Modüler Haritalar', desc: 'Kentsel sokak parçaları, doğal zemin/bitki öbekleri ve grid uyumlu level blokları.' },
        { emoji: '✨', title: 'Shader Graph & VFX', desc: 'Stylized su, hologram, outline, dissolve ve mobil optimize partikül efektleri.' },
        { emoji: '🎮', title: 'Oyun UI & HUD Kitleri', desc: 'Hypercasual ve RPG/Simülasyon oyunları için vektörel butonlar, ikonlar ve prefab paneller.' },
        { emoji: '⚙️', title: 'Unity C# Araç & Sistemler', desc: 'Object pooling, kayıt sistemi, input yardımcıları ve editör üretkenlik eklentileri.' }
      ]
    },
    en: {
      pageTitle: 'Doğuş İpeksaç — Game, 3D Model & Unity Asset Showcase',
      pageDesc: 'Production-ready Unity packages (.unitypackage), optimized 3D low-poly models (.fbx / .glb), URP/HDRP shaders, UI kits, and C# systems.',
      navHome: '← Home',
      navCatalog: 'Catalog',
      navStandards: 'Standards',
      navGuide: 'Pack Structure',
      navContact: 'Contact',
      eyebrow: 'UNITY · 3D · SHADER & TOOLKIT VAULT',
      heroTitle: 'Game, 3D Model & <span class="cu">Unity Asset Vault</span>',
      heroSub: 'Production-ready .unitypackage archives, optimized low-poly & PBR 3D models (.fbx / .glb), shaders, game UI kits, and modular C# systems.',
      ctaExplore: 'Browse Catalog ↓',
      ctaContact: 'Request Custom Pack ✉️',
      statPacks: 'Published Packs',
      statPipelines: 'Render Pipelines',
      statFormats: 'Source Formats',
      searchPlaceholder: 'Search packs, tags, or formats (e.g. low-poly, URP, shader)...',
      allResultsPrefix: 'Showing packs:',
      noMatchTitle: 'No Matching Packs Found',
      noMatchDesc: 'Try clearing the search query or resetting category and pipeline filters.',
      resetFilters: 'Reset Filters',
      emptyTitle: 'Asset Vault Ready — First Packs Coming Soon',
      emptyDesc: 'dogusipeksac.com/assets is ready. As packages are uploaded to /assets/packs/ with thumbnails in /assets/previews/, they will appear automatically in this catalog.',
      slotStatus: 'Folder Ready · Soon',
      inspectBtn: 'Specs & Details',
      downloadBtn: 'Download Pack ↓',
      copyUrlBtn: 'Copy URL',
      copiedMsg: 'Link copied to clipboard',
      specsLabel: './pipeline --specs',
      specsTitle: 'Production Standards & Compatibility',
      specsSub: 'Every 3D model, shader, and Unity package published here follows strict naming, pivot, and mobile-first draw-call standards.',
      spec1Title: 'URP · HDRP · Built-in',
      spec1Desc: 'Materials and shaders target Universal Render Pipeline (URP) first, with matching Built-in and HDRP material variants included.',
      spec2Title: 'Clean Pivots & Scale (1u = 1m)',
      spec2Desc: 'Every .fbx and .glb mesh is exported at real-world meter scale with frozen transforms and grounded pivot points.',
      spec3Title: 'Mobile-First Draw Calls',
      spec3Desc: 'Low-poly packs share atlased color palettes or packed PBR maps (Albedo, Metallic/Smoothness, Normal) for 60 FPS mobile budgets.',
      spec4Title: 'Plug & Play Prefabs & C#',
      spec4Desc: 'Colliders, LOD groups, and demo scenes come preconfigured; C# utilities include clean namespaces and XML docs.',
      guideTitle: 'Developer Note: How to Publish a New Pack into /assets/packs/',
      guideLead: 'Drop your archive into /assets/packs/<slug>/ and preview image into /assets/previews/<slug>.webp, then add a single entry to assets/packs-data.js.',
      footerCopy: '© 2026 Doğuş İpeksaç · Unity, 3D & Game Asset Vault',
      specUnity: 'Unity Version',
      specPipeline: 'Render Pipeline',
      specPoly: 'Poly / Tri Count',
      specTextures: 'Textures',
      specFormat: 'Format / Size',
      specLicense: 'License',
      contentsTitle: 'What Is Included',
      slots: [
        { emoji: '🧊', title: '3D Models & Low-Poly', desc: 'Characters, vehicles, furniture, and gameplay prop kits (.fbx, .glb, .unitypackage).' },
        { emoji: '🏙️', title: 'Environments & Modular Kits', desc: 'City street sets, stylized foliage, and grid-snapped modular level blocks.' },
        { emoji: '✨', title: 'Shader Graph & VFX', desc: 'Stylized water, hologram, outline, dissolve shaders, and mobile particle systems.' },
        { emoji: '🎮', title: 'Game UI & HUD Kits', desc: 'Vector buttons, icons, and prefab panels for hypercasual, simulation, and RPG games.' },
        { emoji: '⚙️', title: 'Unity C# Tools & Systems', desc: 'Object pooling, save/load serialization, input helpers, and editor productivity tools.' }
      ]
    }
  };

  function tr(val) {
    if (val == null) return '';
    if (typeof val === 'string') return val;
    return val[lang] || val.tr || val.en || '';
  }

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.tr[key] || key;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showToast(msg) {
    var toast = document.getElementById('ahToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2000);
  }

  function getPacks() {
    return Array.isArray(window.ASSET_PACKS) ? window.ASSET_PACKS : [];
  }

  function filterPacks(packs) {
    var q = state.query.trim().toLowerCase();
    return packs.filter(function (pack) {
      if (state.category !== 'all' && pack.category !== state.category) return false;
      if (state.pipeline !== 'all') {
        var pipes = Array.isArray(pack.pipelines) ? pack.pipelines : [];
        if (pipes.indexOf(state.pipeline) === -1) return false;
      }
      if (!q) return true;
      var haystack = [
        tr(pack.title),
        tr(pack.summary),
        tr(pack.description),
        pack.fileFormat || '',
        (pack.tags || []).join(' '),
        (pack.pipelines || []).join(' ')
      ].join(' ').toLowerCase();
      return haystack.indexOf(q) !== -1;
    });
  }

  function renderFilters() {
    var catWrap = document.getElementById('ahCategories');
    var pipeWrap = document.getElementById('ahPipelines');
    var packs = getPacks();

    if (catWrap && Array.isArray(window.ASSET_CATEGORIES)) {
      catWrap.innerHTML = window.ASSET_CATEGORIES.map(function (cat) {
        var count = cat.id === 'all'
          ? packs.length
          : packs.filter(function (p) { return p.category === cat.id; }).length;
        var active = state.category === cat.id ? ' active' : '';
        var countText = packs.length > 0 ? ' <span>(' + count + ')</span>' : '';
        return '<button type="button" class="ah-pill' + active + '" data-cat="' + escapeHtml(cat.id) + '">' +
          '<span>' + cat.icon + '</span> ' + escapeHtml(tr(cat.label)) + countText + '</button>';
      }).join('');
    }

    if (pipeWrap && Array.isArray(window.ASSET_PIPELINES)) {
      pipeWrap.innerHTML = window.ASSET_PIPELINES.map(function (pipe) {
        var active = state.pipeline === pipe.id ? ' active' : '';
        return '<button type="button" class="ah-pill pipe' + active + '" data-pipe="' + escapeHtml(pipe.id) + '">' +
          escapeHtml(tr(pipe.label)) + '</button>';
      }).join('');
    }
  }

  function renderCard(pack) {
    var title = tr(pack.title);
    var summary = tr(pack.summary);
    var price = tr(pack.priceLabel);
    var badge = tr(pack.badge);
    var thumbHtml = pack.previewImage
      ? '<img src="' + escapeHtml(pack.previewImage) + '" alt="' + escapeHtml(title) + '" loading="lazy" />'
      : '<div class="asset-thumb-fallback">🧊</div>';

    var chips = (pack.tags || []).slice(0, 4).map(function (tag) {
      return '<span class="asset-chip">' + escapeHtml(tag) + '</span>';
    }).join('');

    var downloadAction = pack.downloadUrl
      ? '<a class="ah-btn primary sm" href="' + escapeHtml(pack.downloadUrl) + '" download>' + escapeHtml(t('downloadBtn')) + '</a>'
      : '';

    return '' +
      '<article class="asset-card">' +
        '<div class="asset-thumb">' +
          thumbHtml +
          '<div class="asset-badges">' +
            (badge ? '<span class="asset-badge featured">' + escapeHtml(badge) + '</span>' : '<span></span>') +
            (price ? '<span class="asset-badge free">' + escapeHtml(price) + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="asset-body">' +
          '<div class="asset-meta-line">' +
            '<span>' + escapeHtml((pack.pipelines || []).join(' · ')) + '</span>' +
            '<span>' + escapeHtml(pack.version || 'v1.0.0') + '</span>' +
          '</div>' +
          '<h3 class="asset-title">' + escapeHtml(title) + '</h3>' +
          '<p class="asset-desc">' + escapeHtml(summary) + '</p>' +
          '<div class="asset-chips">' + chips + '</div>' +
          '<div class="asset-actions">' +
            '<button type="button" class="ah-btn secondary sm" data-inspect="' + escapeHtml(pack.id) + '">' + escapeHtml(t('inspectBtn')) + '</button>' +
            downloadAction +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function renderCatalog() {
    var grid = document.getElementById('ahGrid');
    var emptyWrap = document.getElementById('ahEmptyWrap');
    var countEl = document.getElementById('ahResultCount');
    var heroCount = document.getElementById('ahHeroPackCount');
    var packs = getPacks();
    var filtered = filterPacks(packs);

    if (heroCount) heroCount.textContent = String(packs.length);
    if (countEl) {
      countEl.textContent = packs.length === 0
        ? (lang === 'tr' ? '0 paket yüklendi · İlk sürümler hazırlanıyor' : '0 packs uploaded · First releases in progress')
        : (t('allResultsPrefix') + ' ' + filtered.length + ' / ' + packs.length);
    }

    if (packs.length === 0) {
      if (grid) {
        grid.innerHTML = t('slots').map(function (slot) {
          return '' +
            '<div class="ah-slot-card">' +
              '<div class="ah-slot-head">' +
                '<span class="ah-slot-emoji">' + slot.emoji + '</span>' +
                '<span class="ah-slot-status">' + escapeHtml(t('slotStatus')) + '</span>' +
              '</div>' +
              '<h4 class="ah-slot-title">' + escapeHtml(slot.title) + '</h4>' +
              '<p class="ah-slot-desc">' + escapeHtml(slot.desc) + '</p>' +
            '</div>';
        }).join('');
      }
      if (emptyWrap) {
        emptyWrap.style.display = 'block';
        emptyWrap.innerHTML = '' +
          '<div class="ah-empty-banner">' +
            '<div class="ah-empty-icon">📦</div>' +
            '<h3>' + escapeHtml(t('emptyTitle')) + '</h3>' +
            '<p>' + escapeHtml(t('emptyDesc')) + '</p>' +
          '</div>';
      }
      return;
    }

    if (filtered.length === 0) {
      if (grid) grid.innerHTML = '';
      if (emptyWrap) {
        emptyWrap.style.display = 'block';
        emptyWrap.innerHTML = '' +
          '<div class="ah-empty-banner">' +
            '<div class="ah-empty-icon">🔎</div>' +
            '<h3>' + escapeHtml(t('noMatchTitle')) + '</h3>' +
            '<p>' + escapeHtml(t('noMatchDesc')) + '</p>' +
            '<button type="button" class="ah-btn secondary sm" id="ahResetBtn">' + escapeHtml(t('resetFilters')) + '</button>' +
          '</div>';
      }
      return;
    }

    if (emptyWrap) {
      emptyWrap.style.display = 'none';
      emptyWrap.innerHTML = '';
    }
    if (grid) {
      grid.innerHTML = filtered.map(renderCard).join('');
    }
  }

  function openModal(packId) {
    var pack = getPacks().find(function (p) { return p.id === packId; });
    var modal = document.getElementById('ahModalBackdrop');
    var body = document.getElementById('ahModalBody');
    if (!pack || !modal || !body) return;

    var contentsHtml = Array.isArray(pack.contents) && pack.contents.length
      ? '<h4 style="margin-top:0.5rem;font-family:var(--display);">' + escapeHtml(t('contentsTitle')) + '</h4>' +
        '<ul class="ah-content-list">' + pack.contents.map(function (c) {
          return '<li>' + escapeHtml(tr(c)) + '</li>';
        }).join('') + '</ul>'
      : '';

    var extBtns = Array.isArray(pack.externalLinks)
      ? pack.externalLinks.map(function (lnk) {
          return '<a class="ah-btn secondary sm" href="' + escapeHtml(lnk.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(lnk.label) + ' ↗</a>';
        }).join('')
      : '';

    body.innerHTML = '' +
      '<div class="asset-meta-line" style="margin-bottom:0.45rem;">' +
        '<span>' + escapeHtml((pack.pipelines || []).join(' · ')) + '</span>' +
        '<span>' + escapeHtml(pack.version || 'v1.0.0') + '</span>' +
      '</div>' +
      '<h2 style="font-family:var(--display);font-size:1.55rem;margin-bottom:0.65rem;">' + escapeHtml(tr(pack.title)) + '</h2>' +
      '<p style="color:var(--text2);line-height:1.65;margin-bottom:1rem;">' + escapeHtml(tr(pack.description || pack.summary)) + '</p>' +
      '<div class="ah-spec-table">' +
        '<div class="ah-spec-row"><span>' + escapeHtml(t('specUnity')) + '</span><strong>' + escapeHtml(pack.unityVersion || '-') + '</strong></div>' +
        '<div class="ah-spec-row"><span>' + escapeHtml(t('specPipeline')) + '</span><strong>' + escapeHtml((pack.pipelines || []).join(', ') || '-') + '</strong></div>' +
        '<div class="ah-spec-row"><span>' + escapeHtml(t('specPoly')) + '</span><strong>' + escapeHtml(pack.polyCount || '-') + '</strong></div>' +
        '<div class="ah-spec-row"><span>' + escapeHtml(t('specTextures')) + '</span><strong>' + escapeHtml(pack.textures || '-') + '</strong></div>' +
        '<div class="ah-spec-row"><span>' + escapeHtml(t('specFormat')) + '</span><strong>' + escapeHtml([pack.fileFormat, pack.fileSize].filter(Boolean).join(' · ') || '-') + '</strong></div>' +
        '<div class="ah-spec-row"><span>' + escapeHtml(t('specLicense')) + '</span><strong>' + escapeHtml(pack.license || '-') + '</strong></div>' +
      '</div>' +
      contentsHtml +
      '<div class="asset-actions" style="flex-wrap:wrap;">' +
        (pack.downloadUrl ? '<a class="ah-btn primary sm" href="' + escapeHtml(pack.downloadUrl) + '" download>' + escapeHtml(t('downloadBtn')) + '</a>' : '') +
        (pack.downloadUrl ? '<button type="button" class="ah-btn secondary sm" data-copy-url="' + escapeHtml(new URL(pack.downloadUrl, window.location.origin).href) + '">' + escapeHtml(t('copyUrlBtn')) + '</button>' : '') +
        extBtns +
      '</div>';

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    var modal = document.getElementById('ahModalBackdrop');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.title = t('pageTitle');
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('pageDesc'));

    document.querySelectorAll('[data-hub-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-hub-i18n');
      if (key) el.textContent = t(key);
    });
    document.querySelectorAll('[data-hub-html]').forEach(function (el) {
      var key = el.getAttribute('data-hub-html');
      if (key) el.innerHTML = t(key);
    });
    var search = document.getElementById('ahSearch');
    if (search) search.setAttribute('placeholder', t('searchPlaceholder'));

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var active = btn.getAttribute('data-lang-btn') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    renderFilters();
    renderCatalog();
  }

  function bindEvents() {
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = btn.getAttribute('data-lang-btn');
        if (next === 'tr' || next === 'en') {
          lang = next;
          localStorage.setItem(STORAGE_KEY, lang);
          applyLang();
        }
      });
    });

    var search = document.getElementById('ahSearch');
    if (search) {
      search.addEventListener('input', function () {
        state.query = search.value;
        renderCatalog();
      });
    }

    document.addEventListener('click', function (e) {
      var catBtn = e.target.closest('[data-cat]');
      if (catBtn) {
        state.category = catBtn.getAttribute('data-cat');
        renderFilters();
        renderCatalog();
        return;
      }

      var pipeBtn = e.target.closest('[data-pipe]');
      if (pipeBtn) {
        state.pipeline = pipeBtn.getAttribute('data-pipe');
        renderFilters();
        renderCatalog();
        return;
      }

      var inspectBtn = e.target.closest('[data-inspect]');
      if (inspectBtn) {
        openModal(inspectBtn.getAttribute('data-inspect'));
        return;
      }

      if (e.target.closest('#ahResetBtn')) {
        state.category = 'all';
        state.pipeline = 'all';
        state.query = '';
        if (search) search.value = '';
        renderFilters();
        renderCatalog();
        return;
      }

      var copyBtn = e.target.closest('[data-copy-url]');
      if (copyBtn && navigator.clipboard) {
        navigator.clipboard.writeText(copyBtn.getAttribute('data-copy-url')).then(function () {
          showToast(t('copiedMsg'));
        });
      }
    });

    var modalBackdrop = document.getElementById('ahModalBackdrop');
    var modalClose = document.getElementById('ahModalClose');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', function (e) {
        if (e.target === modalBackdrop) closeModal();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    /* Nav scroll & mobile menu */
    var nav = document.getElementById('nav');
    var progress = document.getElementById('scrollProgress');
    var menuBtn = document.getElementById('menuBtn');
    var mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('open');
        menuBtn.classList.toggle('open');
      });
    }
    window.closeMobile = function () {
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (menuBtn) menuBtn.classList.remove('open');
    };

    window.addEventListener('scroll', function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (nav) nav.classList.toggle('scrolled', y > 24);
      if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindEvents();
    applyLang();
  });
})();
