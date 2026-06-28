/* ===========================================================
   FlexCV Builder — drag & drop resume designer
   Vanilla ES6+. No backend. LocalStorage persistence.
   =========================================================== */
(function () {
  'use strict';

  /* ========================= UTILITIES ========================= */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const uid = () => 'e' + Math.random().toString(36).slice(2, 9);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const deep = (o) => JSON.parse(JSON.stringify(o));
  const now = () => Date.now();

  let toastT;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2400);
  }

  const PAGE_W = 794, PAGE_H = 1123;
  const STORE_KEY = 'flexcv:project';
  const RECENT_KEY = 'flexcv:recent';
  const PREFS_KEY = 'flexcv:prefs';

  const FONTS = ['Inter', 'Poppins', 'Roboto', 'Open Sans', 'Montserrat', 'Lato', 'Playfair Display'];
  const PALETTES = {
    Blue: '#2563eb', Purple: '#7c3aed', Green: '#059669',
    Black: '#111111', Navy: '#1e3a5f', Orange: '#ea580c'
  };
  const SWATCH_COLORS = ['#111111','#374151','#6b7280','#ffffff','#2563eb','#1e3a5f','#0891b2','#059669','#10b981','#f59e0b','#ea580c','#ef4444','#db2777','#7c3aed','#6366f1','#0f172a'];

  /* ========================= STATE ========================= */
  let project = null;
  let selection = new Set();
  let zoom = 1;
  let clipboard = [];
  let history = [];
  let hIndex = -1;
  let editingId = null;
  let prefs = { theme: 'light', grid: false, snap: true };
  const nodeMap = new Map();

  function defaultStyle(over = {}) {
    return Object.assign({
      fontFamily: 'Inter', fontSize: 14, fontWeight: 400, letterSpacing: 0, lineHeight: 1.5,
      color: '#1a1d27', textAlign: 'left',
      bg: 'transparent', gradient: '',
      borderWidth: 0, borderColor: '#e2e6ee', borderStyle: 'solid', radius: 0,
      shadow: 'none', opacity: 1,
      padT: 6, padR: 8, padB: 6, padL: 8
    }, over);
  }

  function newProject(name = 'Adsız CV') {
    return {
      id: uid(), name,
      theme: { accent: '#6366f1', font: 'Inter' },
      page: { bg: '#ffffff' },
      elements: [],
      updatedAt: now()
    };
  }

  /* ========================= COMPONENT REGISTRY ========================= */
  // Categories of draggable components
  const LIBRARY = [
    { cat: 'Temel', items: [
      { type: 'name', icon: '🅰️', label: 'İsim' },
      { type: 'jobTitle', icon: '💼', label: 'Ünvan' },
      { type: 'customText', icon: '✏️', label: 'Metin' },
      { type: 'appCard', icon: '📱', label: 'Uygulama' },
      { type: 'divider', icon: '➖', label: 'Ayraç' },
      { type: 'image', icon: '🖼️', label: 'Görsel' },
      { type: 'button', icon: '🔘', label: 'Buton' },
    ]},
    { cat: 'Kişisel', items: [
      { type: 'photo', icon: '👤', label: 'Profil Foto' },
      { type: 'contact', icon: '📇', label: 'İletişim' },
      { type: 'socialLinks', icon: '🌐', label: 'Sosyal' },
      { type: 'qrcode', icon: '🔳', label: 'QR Kod' },
    ]},
    { cat: 'İçerik', items: [
      { type: 'about', icon: '📝', label: 'Hakkımda' },
      { type: 'experience', icon: '🏢', label: 'Deneyim' },
      { type: 'education', icon: '🎓', label: 'Eğitim' },
      { type: 'skills', icon: '⚡', label: 'Yetenekler' },
      { type: 'languages', icon: '🗣️', label: 'Diller' },
      { type: 'certificates', icon: '📜', label: 'Sertifika' },
      { type: 'awards', icon: '🏆', label: 'Ödüller' },
      { type: 'projects', icon: '🚀', label: 'Projeler' },
      { type: 'references', icon: '👥', label: 'Referans' },
    ]},
    { cat: 'Görsel', items: [
      { type: 'iconList', icon: '📋', label: 'İkon Liste' },
      { type: 'progress', icon: '📊', label: 'İlerleme' },
      { type: 'timeline', icon: '🕰️', label: 'Zaman Çizgisi' },
    ]},
  ];

  const TEXT_TYPES = new Set(['name','jobTitle','customText','about','experience','education','skills','languages','certificates','awards','projects','references','contact','socialLinks','iconList','timeline','button','appCard']);

  // default geometry + content per type
  function factory(type, x, y) {
    const base = { id: uid(), type, x: Math.round(x), y: Math.round(y), rotation: 0, z: nextZ(), locked: false, data: {} };
    const A = project ? project.theme.accent : '#6366f1';
    switch (type) {
      case 'name': return Object.assign(base, { w: 380, h: 52, content: 'Ad Soyad',
        style: defaultStyle({ fontSize: 36, fontWeight: 800, color: '#111111', lineHeight: 1.1 }) });
      case 'jobTitle': return Object.assign(base, { w: 380, h: 30, content: 'Pozisyon / Ünvan',
        style: defaultStyle({ fontSize: 16, fontWeight: 500, color: A, letterSpacing: 1 }) });
      case 'customText': return Object.assign(base, { w: 260, h: 60, content: 'Buraya metin yazın…',
        style: defaultStyle({ fontSize: 13 }) });
      case 'about': return Object.assign(base, { w: 420, h: 110,
        content: '<div style="font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Hakkımda</div><div>Kısa profesyonel özet metni. Deneyiminizi ve hedeflerinizi birkaç cümleyle anlatın.</div>',
        style: defaultStyle({ fontSize: 12.5, color: '#333333' }) });
      case 'experience': return Object.assign(base, { w: 440, h: 150,
        content: secHTML('Deneyim', [
          entryHTML('Senior Pozisyon', 'Şirket Adı', '2022 – Halen', 'Başlıca sorumluluk ve başarılarınızı yazın.'),
          entryHTML('Önceki Pozisyon', 'Eski Şirket', '2019 – 2022', 'Önemli katkılarınızı belirtin.')
        ]),
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'education': return Object.assign(base, { w: 440, h: 100,
        content: secHTML('Eğitim', [ entryHTML('Bölüm / Derece', 'Üniversite', '2015 – 2019', '') ]),
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'skills': return Object.assign(base, { w: 240, h: 120,
        content: '<div style="font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Yetenekler</div><div style="display:flex;flex-wrap:wrap;gap:6px"><span style="background:rgba(0,0,0,.06);padding:3px 9px;border-radius:20px;font-size:11px">Kotlin</span><span style="background:rgba(0,0,0,.06);padding:3px 9px;border-radius:20px;font-size:11px">Flutter</span><span style="background:rgba(0,0,0,.06);padding:3px 9px;border-radius:20px;font-size:11px">Swift</span><span style="background:rgba(0,0,0,.06);padding:3px 9px;border-radius:20px;font-size:11px">Firebase</span></div>',
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'languages': return Object.assign(base, { w: 220, h: 90,
        content: '<div style="font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Diller</div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>Türkçe</span><span style="opacity:.7">Ana dil</span></div><div style="display:flex;justify-content:space-between;font-size:12px"><span>İngilizce</span><span style="opacity:.7">İleri (C1)</span></div>',
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'certificates': return Object.assign(base, { w: 420, h: 90,
        content: secHTML('Sertifikalar', [ entryHTML('Sertifika Adı', 'Veren Kurum', '2021', '') ]),
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'awards': return Object.assign(base, { w: 420, h: 90,
        content: secHTML('Ödüller', [ entryHTML('Ödül Adı', 'Veren Kuruluş', '2023', '') ]),
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'projects': return Object.assign(base, { w: 440, h: 120,
        content: secHTML('Projeler', [ entryHTML('Proje / Uygulama', 'Platform / Rol', '2024', 'Kısa açıklama ve teknolojiler.') ]),
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'references': return Object.assign(base, { w: 420, h: 90,
        content: secHTML('Referanslar', [ entryHTML('Ad Soyad', 'Ünvan, Şirket', '', 'e-posta · telefon') ]),
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'contact': return Object.assign(base, { w: 230, h: 110,
        content: '<div style="font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">İletişim</div><div style="font-size:12px;line-height:1.9">✉ ad@mail.com<br>☎ +90 5xx xxx xx xx<br>📍 Şehir, Ülke<br>🌐 site.com</div>',
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'socialLinks': return Object.assign(base, { w: 230, h: 70,
        content: '<div style="font-size:12px;line-height:1.9">in linkedin.com/in/kullanici<br>⌥ github.com/kullanici</div>',
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'iconList': return Object.assign(base, { w: 230, h: 90,
        content: '<div style="font-size:12px;line-height:1.9">✔ Madde bir<br>✔ Madde iki<br>✔ Madde üç</div>',
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'timeline': return Object.assign(base, { w: 420, h: 140,
        content: '<div style="font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Zaman Çizgisi</div>'
          + tlItem(A, '2024', 'Bir kilometre taşı veya etkinlik.')
          + tlItem(A, '2022', 'Başka bir önemli an.'),
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'button': return Object.assign(base, { w: 150, h: 40, content: 'Buton', data: { href: '' },
        style: defaultStyle({ fontSize: 13, fontWeight: 600, color: '#ffffff', bg: A, radius: 8, textAlign: 'center', padT: 0, padB: 0 }) });
      case 'appCard': return Object.assign(base, { w: 360, h: 96,
        content: appCardHTML('📱', 'Uygulama Adı', 'Android · iOS', 'Uygulamanın kısa açıklaması ve öne çıkan özellikleri.', 'https://play.google.com/store', 'https://apps.apple.com', A),
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      case 'divider': return Object.assign(base, { w: 300, h: 12, data: { lineColor: '#d0d4dd', thickness: 2, lineStyle: 'solid' },
        style: defaultStyle({}) });
      case 'photo': return Object.assign(base, { w: 130, h: 130, data: { src: '', shape: 'circle' }, style: defaultStyle({ radius: 0 }) });
      case 'image': return Object.assign(base, { w: 180, h: 130, data: { src: '', shape: 'rounded' }, style: defaultStyle({ radius: 0 }) });
      case 'qrcode': return Object.assign(base, { w: 110, h: 110, data: { text: 'https://dogusipeksac.com' }, style: defaultStyle({ padT: 0, padR: 0, padB: 0, padL: 0 }) });
      case 'progress': return Object.assign(base, { w: 230, h: 34, data: { label: 'Beceri', value: 80, barColor: A },
        style: defaultStyle({ fontSize: 12, color: '#333333' }) });
      default: return Object.assign(base, { w: 200, h: 60, content: 'Öğe', style: defaultStyle() });
    }
  }

  function secHTML(title, entries) {
    return `<div style="font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">${title}</div>${entries.join('')}`;
  }
  function entryHTML(title, org, date, desc) {
    return `<div style="margin-bottom:9px">
      <div style="display:flex;justify-content:space-between;gap:8px">
        <b style="font-size:12.5px">${title}</b><span style="font-size:10.5px;opacity:.65;white-space:nowrap">${date}</span>
      </div>
      ${org ? `<div style="font-size:11.5px;opacity:.85;font-weight:600">${org}</div>` : ''}
      ${desc ? `<div style="font-size:11.5px;margin-top:2px">${desc}</div>` : ''}
    </div>`;
  }
  function appCardHTML(emoji, name, platform, desc, android, ios, accent) {
    const badge = (url, label, bg) => url ? `<a href="${url}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:${bg};color:#fff;padding:3px 10px;border-radius:6px;font-size:10px;font-weight:700;text-decoration:none;margin:4px 6px 0 0">${label}</a>` : '';
    return `<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px">
      <div style="font-size:24px;line-height:1.1;flex-shrink:0">${emoji}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:800;font-size:13px">${name}</div>
        <div style="font-size:10px;color:${accent};font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin:1px 0 3px">${platform}</div>
        <div style="font-size:11px;line-height:1.45">${desc}</div>
        <div>${badge(android, '▸ Google Play', '#0f9d58')}${badge(ios, ' App Store', '#0a0a0a')}</div>
      </div>
    </div>`;
  }
  function tlItem(accent, date, text) {
    return `<div style="display:flex;gap:10px;margin-bottom:10px">
      <div style="flex-shrink:0;width:10px;height:10px;border-radius:50%;background:${accent};margin-top:3px;box-shadow:0 0 0 3px ${hexA(accent,0.2)}"></div>
      <div><b style="font-size:11.5px">${date}</b><div style="font-size:11.5px">${text}</div></div>
    </div>`;
  }
  function hexA(hex, a) {
    let h = (hex || '#6366f1').replace('#', '');
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    const n = parseInt(h, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  function nextZ() {
    if (!project || !project.elements.length) return 1;
    return Math.max(...project.elements.map(e => e.z || 1)) + 1;
  }

  /* ========================= RENDERING ========================= */
  function renderAll() {
    const host = $('#elements');
    host.innerHTML = '';
    nodeMap.clear();
    project.elements.slice().sort((a, b) => (a.z || 0) - (b.z || 0)).forEach(el => {
      const node = buildNode(el);
      host.appendChild(node);
      nodeMap.set(el.id, node);
    });
    $('#page').style.background = project.page.bg;
    refreshSelectionVisual();
  }

  function buildNode(el) {
    const node = document.createElement('div');
    node.className = 'el';
    node.dataset.id = el.id;
    node.dataset.type = el.type;
    node.dataset.locked = !!el.locked;
    applyGeometry(node, el);

    const inner = document.createElement('div');
    inner.className = 'el-inner';
    inner.appendChild(renderContent(el));
    node.appendChild(inner);
    return node;
  }

  function applyGeometry(node, el) {
    node.style.left = el.x + 'px';
    node.style.top = el.y + 'px';
    node.style.width = el.w + 'px';
    node.style.height = el.h + 'px';
    node.style.zIndex = el.z || 1;
    node.style.transform = `rotate(${el.rotation || 0}deg)`;
    node.style.opacity = el.style.opacity;
  }

  function boxStyleString(el) {
    const s = el.style;
    let bg = s.bg;
    if (s.gradient) bg = s.gradient;
    const shadow = s.shadow && s.shadow !== 'none' ? s.shadow : 'none';
    return `
      width:100%;height:100%;
      font-family:'${s.fontFamily}',sans-serif;
      font-size:${s.fontSize}px;font-weight:${s.fontWeight};
      letter-spacing:${s.letterSpacing}px;line-height:${s.lineHeight};
      color:${s.color};text-align:${s.textAlign};
      background:${bg};
      border:${s.borderWidth}px ${s.borderStyle} ${s.borderColor};
      border-radius:${s.radius}px;box-shadow:${shadow};
      padding:${s.padT}px ${s.padR}px ${s.padB}px ${s.padL}px;
      box-sizing:border-box;overflow:hidden;`;
  }

  function renderContent(el) {
    const type = el.type;
    if (TEXT_TYPES.has(type)) {
      const c = document.createElement('div');
      c.className = 'el-content';
      c.setAttribute('contenteditable', 'false');
      c.style.cssText = boxStyleString(el);
      if (type === 'button') {
        c.classList.add('w-button');
        c.innerHTML = esc(el.content);
      } else {
        c.innerHTML = el.content;
      }
      return c;
    }
    // widgets
    const wrap = document.createElement('div');
    wrap.className = 'el-content';
    wrap.style.cssText = boxStyleString(el);

    if (type === 'divider') {
      wrap.innerHTML = `<div class="w-divider"><span style="border-top:${el.data.thickness}px ${el.data.lineStyle} ${el.data.lineColor};display:block"></span></div>`;
    } else if (type === 'photo' || type === 'image') {
      const shape = el.data.shape || 'rounded';
      wrap.classList.add(type === 'photo' ? 'w-photo' : 'w-image', 'shape-' + shape);
      if (el.data.src) {
        wrap.innerHTML = `<img src="${el.data.src}" alt="" style="border-radius:${shape==='circle'?'50%':shape==='rounded'?'16px':'0'}">`;
      } else {
        wrap.innerHTML = `<div class="ph-placeholder" style="border-radius:${shape==='circle'?'50%':shape==='rounded'?'16px':'0'}">${type === 'photo' ? 'Foto ekle' : 'Görsel ekle'}</div>`;
      }
    } else if (type === 'qrcode') {
      wrap.classList.add('w-qr');
      const holder = document.createElement('div');
      holder.style.cssText = 'width:100%;height:100%';
      wrap.appendChild(holder);
      renderQR(holder, el);
    } else if (type === 'progress') {
      wrap.innerHTML = `<div class="w-progress">
        <div class="pl"><span>${esc(el.data.label)}</span><span>${el.data.value}%</span></div>
        <div class="pt"><div class="pf" style="width:${clamp(el.data.value,0,100)}%;background:${el.data.barColor}"></div></div>
      </div>`;
    }
    return wrap;
  }

  function renderQR(holder, el) {
    holder.innerHTML = '';
    if (!window.QRCode) { holder.innerHTML = '<div class="ph-placeholder">QR</div>'; return; }
    try {
      const size = Math.max(40, Math.min(el.w, el.h));
      new QRCode(holder, { text: el.data.text || ' ', width: size, height: size, correctLevel: QRCode.CorrectLevel.M });
    } catch (e) { holder.innerHTML = '<div class="ph-placeholder">QR</div>'; }
  }

  // update a single existing node fully (content + geometry)
  function rerenderNode(el) {
    const old = nodeMap.get(el.id);
    if (!old) return;
    const fresh = buildNode(el);
    old.replaceWith(fresh);
    nodeMap.set(el.id, fresh);
    refreshSelectionVisual();
  }

  function getEl(id) { return project.elements.find(e => e.id === id); }

  /* ========================= SELECTION ========================= */
  function selectOnly(id) { selection = new Set(id ? [id] : []); afterSelect(); }
  function addSelect(id) { selection.add(id); afterSelect(); }
  function toggleSelect(id) { selection.has(id) ? selection.delete(id) : selection.add(id); afterSelect(); }
  function clearSelect() { selection.clear(); afterSelect(); }

  function afterSelect() {
    refreshSelectionVisual();
    buildProperties();
    positionQuickbar();
  }

  function refreshSelectionVisual() {
    nodeMap.forEach((node, id) => {
      node.classList.remove('selected', 'multi');
      $$('.handle', node).forEach(h => h.remove());
      if (selection.has(id)) {
        if (selection.size > 1) node.classList.add('multi');
        else {
          node.classList.add('selected');
          const el = getEl(id);
          if (el && !el.locked) addHandles(node);
        }
      }
    });
  }

  function addHandles(node) {
    ['nw','ne','sw','se','n','s','w','e','rot'].forEach(dir => {
      const h = document.createElement('div');
      h.className = 'handle ' + dir;
      h.dataset.handle = dir;
      node.appendChild(h);
    });
  }

  /* ========================= POINTER: move / resize / rotate / marquee ========================= */
  let drag = null;

  function pageRect() { return $('#page').getBoundingClientRect(); }
  function toCanvas(clientX, clientY) {
    const r = pageRect();
    return { x: (clientX - r.left) / zoom, y: (clientY - r.top) / zoom };
  }

  $('#elements').addEventListener('pointerdown', onPointerDown);
  $('#page').addEventListener('pointerdown', onPagePointerDown);

  function onPagePointerDown(e) {
    if (e.target.closest('.el')) return; // handled by element handler
    // start marquee
    if (editingId) finishEditing();
    if (!e.shiftKey) clearSelect();
    const start = toCanvas(e.clientX, e.clientY);
    drag = { mode: 'marquee', start };
    const m = $('#marquee'); m.style.display = 'block';
    m.style.left = start.x + 'px'; m.style.top = start.y + 'px'; m.style.width = '0px'; m.style.height = '0px';
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  function onPointerDown(e) {
    // let links inside an element open (unless editing text)
    const anchor = e.target.closest('a[href]');
    if (anchor && !editingId) return;
    const handle = e.target.closest('.handle');
    const node = e.target.closest('.el');
    if (!node) return;
    const el = getEl(node.dataset.id);
    if (!el) return;

    if (editingId && editingId !== el.id) finishEditing();
    if (editingId === el.id) return; // editing text; let it be

    e.stopPropagation();

    if (handle && !el.locked) {
      const dir = handle.dataset.handle;
      if (dir === 'rot') startRotate(e, el);
      else startResize(e, el, dir);
      return;
    }

    // selection
    if (e.shiftKey) { toggleSelect(el.id); }
    else if (!selection.has(el.id)) { selectOnly(el.id); }

    if (el.locked) return;

    // start move for all selected
    const items = [...selection].map(id => ({ id, sx: getEl(id).x, sy: getEl(id).y }));
    drag = { mode: 'move', start: { x: e.clientX, y: e.clientY }, items, moved: false };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  function startResize(e, el, dir) {
    drag = { mode: 'resize', dir, start: { x: e.clientX, y: e.clientY }, o: { x: el.x, y: el.y, w: el.w, h: el.h }, id: el.id };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }
  function startRotate(e, el) {
    const node = nodeMap.get(el.id);
    const r = node.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    drag = { mode: 'rotate', cx, cy, startAngle: Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI, o: el.rotation || 0, id: el.id };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  function onPointerMove(e) {
    if (!drag) return;
    if (drag.mode === 'move') doMove(e);
    else if (drag.mode === 'resize') doResize(e);
    else if (drag.mode === 'rotate') doRotate(e);
    else if (drag.mode === 'marquee') doMarquee(e);
  }

  function doMove(e) {
    let dx = (e.clientX - drag.start.x) / zoom;
    let dy = (e.clientY - drag.start.y) / zoom;
    drag.moved = true;
    clearGuides();

    // primary element for snapping
    const primary = getEl(drag.items[0].id);
    let propX = drag.items[0].sx + dx;
    let propY = drag.items[0].sy + dy;

    if (prefs.snap) {
      const snapped = computeSnap(primary, propX, propY);
      dx += (snapped.x - propX);
      dy += (snapped.y - propY);
      drawGuides(snapped.guides);
    } else if (prefs.grid) {
      const gx = Math.round((drag.items[0].sx + dx) / 10) * 10;
      const gy = Math.round((drag.items[0].sy + dy) / 10) * 10;
      dx += gx - (drag.items[0].sx + dx);
      dy += gy - (drag.items[0].sy + dy);
    }

    drag.items.forEach(it => {
      const el = getEl(it.id);
      el.x = Math.round(it.sx + dx);
      el.y = Math.round(it.sy + dy);
      applyGeometry(nodeMap.get(it.id), el);
    });
    positionQuickbar();
    status(`${Math.round(primary.x)}, ${Math.round(primary.y)}`);
  }

  function doResize(e) {
    const el = getEl(drag.id);
    let dx = (e.clientX - drag.start.x) / zoom;
    let dy = (e.clientY - drag.start.y) / zoom;
    const o = drag.o, d = drag.dir;
    let x = o.x, y = o.y, w = o.w, h = o.h;
    if (d.includes('e')) w = o.w + dx;
    if (d.includes('s')) h = o.h + dy;
    if (d.includes('w')) { w = o.w - dx; x = o.x + dx; }
    if (d.includes('n')) { h = o.h - dy; y = o.y + dy; }
    w = Math.max(24, w); h = Math.max(16, h);
    if (prefs.grid && !prefs.snap) { w = Math.round(w/10)*10; h = Math.round(h/10)*10; }
    el.x = Math.round(x); el.y = Math.round(y); el.w = Math.round(w); el.h = Math.round(h);
    applyGeometry(nodeMap.get(el.id), el);
    if (el.type === 'qrcode') { const holder = nodeMap.get(el.id).querySelector('.w-qr > div'); if (holder) renderQR(holder, el); }
    positionQuickbar();
    status(`${el.w} × ${el.h}`);
  }

  function doRotate(e) {
    const el = getEl(drag.id);
    const ang = Math.atan2(e.clientY - drag.cy, e.clientX - drag.cx) * 180 / Math.PI;
    let rot = Math.round(drag.o + (ang - drag.startAngle));
    if (e.shiftKey) rot = Math.round(rot / 15) * 15;
    el.rotation = rot;
    applyGeometry(nodeMap.get(el.id), el);
    status(`${rot}°`);
  }

  function doMarquee(e) {
    const cur = toCanvas(e.clientX, e.clientY);
    const x = Math.min(cur.x, drag.start.x), y = Math.min(cur.y, drag.start.y);
    const w = Math.abs(cur.x - drag.start.x), h = Math.abs(cur.y - drag.start.y);
    const m = $('#marquee');
    m.style.left = x + 'px'; m.style.top = y + 'px'; m.style.width = w + 'px'; m.style.height = h + 'px';
    drag.rect = { x, y, w, h };
  }

  function onPointerUp() {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    if (!drag) return;
    if (drag.mode === 'marquee') {
      $('#marquee').style.display = 'none';
      if (drag.rect && drag.rect.w > 4 && drag.rect.h > 4) {
        const r = drag.rect;
        project.elements.forEach(el => {
          if (el.x < r.x + r.w && el.x + el.w > r.x && el.y < r.y + r.h && el.y + el.h > r.y) selection.add(el.id);
        });
        afterSelect();
      }
    } else if (drag.mode === 'move' && drag.moved) {
      clearGuides(); commit();
    } else if (drag.mode === 'resize' || drag.mode === 'rotate') {
      commit();
    }
    drag = null;
    status('Hazır');
  }

  /* ===== smart guides ===== */
  function computeSnap(el, propX, propY) {
    const TH = 6 / zoom;
    const guides = [];
    let x = propX, y = propY;
    const mine = { l: propX, cx: propX + el.w / 2, r: propX + el.w, t: propY, cy: propY + el.h / 2, b: propY + el.h };
    // page targets
    const vTargets = [0, PAGE_W / 2, PAGE_W];
    const hTargets = [0, PAGE_H / 2, PAGE_H];
    project.elements.forEach(o => {
      if (o.id === el.id || selection.has(o.id)) return;
      vTargets.push(o.x, o.x + o.w / 2, o.x + o.w);
      hTargets.push(o.y, o.y + o.h / 2, o.y + o.h);
    });
    // vertical (x) snapping: check left, center, right of mine against vTargets
    let bestV = null;
    [['l', mine.l, 0], ['cx', mine.cx, el.w / 2], ['r', mine.r, el.w]].forEach(([k, val, off]) => {
      vTargets.forEach(t => {
        const diff = Math.abs(val - t);
        if (diff < TH && (!bestV || diff < bestV.diff)) bestV = { diff, x: t - off, line: t };
      });
    });
    if (bestV) { x = bestV.x; guides.push({ type: 'v', pos: bestV.line }); }
    let bestH = null;
    [['t', mine.t, 0], ['cy', mine.cy, el.h / 2], ['b', mine.b, el.h]].forEach(([k, val, off]) => {
      hTargets.forEach(t => {
        const diff = Math.abs(val - t);
        if (diff < TH && (!bestH || diff < bestH.diff)) bestH = { diff, y: t - off, line: t };
      });
    });
    if (bestH) { y = bestH.y; guides.push({ type: 'h', pos: bestH.line }); }
    return { x, y, guides };
  }
  function drawGuides(guides) {
    const host = $('#guides'); host.innerHTML = '';
    guides.forEach(g => {
      const l = document.createElement('div');
      l.className = 'guide-line ' + g.type;
      if (g.type === 'v') l.style.left = g.pos + 'px'; else l.style.top = g.pos + 'px';
      host.appendChild(l);
    });
  }
  function clearGuides() { $('#guides').innerHTML = ''; }

  /* ========================= INLINE EDITING ========================= */
  $('#elements').addEventListener('dblclick', e => {
    const node = e.target.closest('.el'); if (!node) return;
    const el = getEl(node.dataset.id);
    if (!el || el.locked || !TEXT_TYPES.has(el.type)) return;
    startEditing(el);
  });

  function startEditing(el) {
    editingId = el.id;
    const node = nodeMap.get(el.id);
    const c = node.querySelector('.el-content');
    c.setAttribute('contenteditable', 'true');
    c.focus();
    // place caret
    const range = document.createRange(); range.selectNodeContents(c); range.collapse(false);
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
    showRtToolbar(node);
    c.addEventListener('blur', onEditBlur);
    c.addEventListener('mouseup', () => positionRtToolbar(node));
    c.addEventListener('keyup', () => positionRtToolbar(node));
  }
  function onEditBlur() { finishEditing(); }
  function finishEditing() {
    if (!editingId) return;
    const el = getEl(editingId);
    const node = nodeMap.get(editingId);
    if (node && el) {
      const c = node.querySelector('.el-content');
      el.content = el.type === 'button' ? c.textContent : c.innerHTML;
      c.setAttribute('contenteditable', 'false');
      c.removeEventListener('blur', onEditBlur);
    }
    editingId = null;
    hideRtToolbar();
    commit();
  }

  // rich text toolbar
  const rt = $('#rtToolbar');
  function showRtToolbar(node) { rt.classList.add('show'); positionRtToolbar(node); }
  function hideRtToolbar() { rt.classList.remove('show'); }
  function positionRtToolbar(node) {
    const r = node.getBoundingClientRect();
    rt.style.left = clamp(r.left, 8, window.innerWidth - rt.offsetWidth - 8) + 'px';
    rt.style.top = Math.max(8, r.top - 40) + 'px';
  }
  rt.addEventListener('pointerdown', e => e.preventDefault());
  rt.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const cmd = b.dataset.cmd;
    if (cmd === 'createLink') {
      const url = prompt('Bağlantı adresi (URL):', 'https://');
      if (url) document.execCommand('createLink', false, url);
    } else document.execCommand(cmd, false, null);
  });

  /* ========================= QUICKBAR ========================= */
  const quickbar = $('#elQuickbar');
  function positionQuickbar() {
    if (selection.size !== 1) { quickbar.classList.remove('show'); return; }
    const id = [...selection][0];
    const node = nodeMap.get(id); if (!node) { quickbar.classList.remove('show'); return; }
    const r = node.getBoundingClientRect();
    quickbar.classList.add('show');
    quickbar.style.left = clamp(r.left + r.width / 2 - quickbar.offsetWidth / 2, 8, window.innerWidth - quickbar.offsetWidth - 8) + 'px';
    quickbar.style.top = Math.max(8, r.top - 42) + 'px';
    const el = getEl(id);
    quickbar.querySelector('[data-q="lock"]').textContent = el.locked ? '🔒' : '🔓';
  }
  quickbar.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const id = [...selection][0]; if (!id) return;
    const act = b.dataset.q;
    if (act === 'duplicate') duplicateSelection();
    else if (act === 'delete') deleteSelection();
    else if (act === 'front') { getEl(id).z = nextZ(); rerenderNode(getEl(id)); commit(); }
    else if (act === 'back') { project.elements.forEach(e2 => e2.z = (e2.z||1)+1); getEl(id).z = 1; renderAll(); commit(); }
    else if (act === 'lock') { const el = getEl(id); el.locked = !el.locked; nodeMap.get(id).dataset.locked = el.locked; refreshSelectionVisual(); buildProperties(); positionQuickbar(); commit(); }
  });

  /* ========================= ACTIONS ========================= */
  function addElement(type, x, y) {
    const el = factory(type, x, y);
    el.x = clamp(el.x, 0, PAGE_W - el.w);
    el.y = clamp(el.y, 0, PAGE_H - el.h);
    project.elements.push(el);
    renderAll();
    selectOnly(el.id);
    commit();
    return el;
  }
  function duplicateSelection() {
    if (!selection.size) return;
    const news = [];
    [...selection].forEach(id => {
      const src = getEl(id); if (!src) return;
      const copy = deep(src); copy.id = uid(); copy.x += 16; copy.y += 16; copy.z = nextZ();
      project.elements.push(copy); news.push(copy.id);
    });
    renderAll(); selection = new Set(news); afterSelect(); commit();
    toast('Çoğaltıldı');
  }
  function deleteSelection() {
    if (!selection.size) return;
    project.elements = project.elements.filter(e => !selection.has(e.id));
    clearSelect(); renderAll(); commit();
  }
  function copySelection() {
    clipboard = [...selection].map(id => deep(getEl(id))).filter(Boolean);
    if (clipboard.length) toast(clipboard.length + ' öğe kopyalandı');
  }
  function pasteClipboard() {
    if (!clipboard.length) return;
    const news = [];
    clipboard.forEach(src => {
      const copy = deep(src); copy.id = uid(); copy.x += 20; copy.y += 20; copy.z = nextZ();
      project.elements.push(copy); news.push(copy.id);
    });
    renderAll(); selection = new Set(news); afterSelect(); commit();
  }
  function selectAll() { selection = new Set(project.elements.map(e => e.id)); afterSelect(); }

  function nudge(dx, dy) {
    if (!selection.size) return;
    selection.forEach(id => { const el = getEl(id); if (el.locked) return; el.x += dx; el.y += dy; applyGeometry(nodeMap.get(id), el); });
    positionQuickbar();
    commitDebounced();
  }

  /* ========================= HISTORY ========================= */
  function snapshot() { return JSON.stringify({ elements: project.elements, theme: project.theme, page: project.page }); }
  function pushHistory() {
    const snap = snapshot();
    if (history[hIndex] === snap) return;
    history = history.slice(0, hIndex + 1);
    history.push(snap);
    if (history.length > 60) history.shift();
    hIndex = history.length - 1;
    updateUndoRedo();
  }
  function restore(snap) {
    const s = JSON.parse(snap);
    project.elements = s.elements; project.theme = s.theme; project.page = s.page;
    renderAll(); selection = new Set([...selection].filter(id => getEl(id))); afterSelect();
    syncThemeControls();
  }
  function undo() { if (hIndex > 0) { hIndex--; restore(history[hIndex]); updateUndoRedo(); save(); } }
  function redo() { if (hIndex < history.length - 1) { hIndex++; restore(history[hIndex]); updateUndoRedo(); save(); } }
  function updateUndoRedo() { $('#undoBtn').disabled = hIndex <= 0; $('#redoBtn').disabled = hIndex >= history.length - 1; }

  let commitT;
  function commit() { project.updatedAt = now(); pushHistory(); save(); }
  function commitDebounced() { clearTimeout(commitT); commitT = setTimeout(commit, 400); }

  /* ========================= PERSISTENCE ========================= */
  let autosaveDirty = false;
  function save() {
    autosaveDirty = true;
    setSaved('saving');
  }
  function actualSave() {
    if (!autosaveDirty) return;
    project.updatedAt = now();
    localStorage.setItem(STORE_KEY, JSON.stringify(project));
    // recent
    let recent = loadRecent();
    recent = recent.filter(r => r.id !== project.id);
    recent.unshift({ id: project.id, name: project.name, updatedAt: project.updatedAt, data: project });
    recent = recent.slice(0, 8);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    autosaveDirty = false;
    setSaved('saved');
  }
  function loadRecent() { try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch (e) { return []; } }
  function setSaved(state) {
    const el = $('#savedState');
    if (state === 'saving') { el.textContent = 'Kaydediliyor…'; el.classList.add('saving'); }
    else { el.textContent = 'Kaydedildi ✓'; el.classList.remove('saving'); }
  }
  function savePrefs() { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); }

  setInterval(actualSave, 2000);
  window.addEventListener('beforeunload', actualSave);

  /* ========================= PROPERTIES PANEL ========================= */
  function buildProperties() {
    const host = $('#propertiesPanel');
    if (selection.size === 0) {
      host.innerHTML = '';
      const tpl = `<div class="prop-empty" id="propEmpty"><div class="pe-icon">🖱️</div><p>Düzenlemek için tuvalden bir öğe seçin veya soldan bir bileşen sürükleyin.</p></div>`;
      host.innerHTML = tpl + docProps();
      bindDocProps();
      $('#propTitle').textContent = 'Belge';
      return;
    }
    if (selection.size > 1) {
      $('#propTitle').textContent = selection.size + ' öğe seçili';
      host.innerHTML = multiProps();
      bindMultiProps();
      return;
    }
    const el = getEl([...selection][0]);
    $('#propTitle').textContent = 'Öğe · ' + el.type;
    host.innerHTML = singleProps(el);
    bindSingleProps(el);
  }

  function group(title, body, collapsed) {
    return `<div class="prop-group ${collapsed ? 'collapsed' : ''}">
      <div class="prop-gh">${title}<span class="chev">▾</span></div>
      <div class="prop-gb">${body}</div>
    </div>`;
  }
  function rowNum(label, key, val, min, max, step) {
    return `<div class="prow"><span class="plabel">${label}</span><div class="pfield"><input type="number" class="pinput pnum" data-k="${key}" value="${val}" min="${min??''}" max="${max??''}" step="${step||1}"></div></div>`;
  }
  function rowColor(label, key, val) {
    return `<div class="prow"><span class="plabel">${label}</span><div class="pfield pcolor">
      <input type="color" data-kc="${key}" value="${toHex(val)}"><input type="text" class="pinput" data-kt="${key}" value="${val}"></div></div>`;
  }
  function rowSelect(label, key, val, opts) {
    return `<div class="prow"><span class="plabel">${label}</span><div class="pfield"><select class="pselect" data-k="${key}">${opts.map(o => `<option value="${o[0]}" ${o[0] == val ? 'selected' : ''}>${o[1]}</option>`).join('')}</select></div></div>`;
  }
  function toHex(c) { if (!c || c === 'transparent' || c.startsWith('rgba') || c.startsWith('linear')) return '#ffffff'; return c; }

  function swatchRow(key) {
    return `<div class="swatches">${SWATCH_COLORS.map(c => `<div class="swatch" style="background:${c}" data-sw="${key}" data-c="${c}"></div>`).join('')}</div>`;
  }

  function singleProps(el) {
    const s = el.style;
    let html = '';
    // Type-specific first
    html += group('Öğe', typeSpecificProps(el), false);

    if (TEXT_TYPES.has(el.type)) {
      html += group('Tipografi', `
        ${rowSelect('Yazı tipi', 'fontFamily', s.fontFamily, FONTS.map(f => [f, f]))}
        ${rowNum('Boyut', 'fontSize', s.fontSize, 6, 200)}
        ${rowSelect('Kalınlık', 'fontWeight', s.fontWeight, [[300,'Light'],[400,'Normal'],[500,'Medium'],[600,'Semibold'],[700,'Bold'],[800,'Extra'],[900,'Black']])}
        ${rowNum('Harf ar.', 'letterSpacing', s.letterSpacing, -5, 20, 0.5)}
        ${rowNum('Satır y.', 'lineHeight', s.lineHeight, 0.8, 3, 0.1)}
        ${rowColor('Renk', 'color', s.color)}
        <div class="prow"><span class="plabel">Hizala</span><div class="pfield seg" data-seg="textAlign">
          ${['left','center','right','justify'].map(a => `<button data-v="${a}" class="${s.textAlign===a?'active':''}">${a==='left'?'⌶':a==='center'?'≡':a==='right'?'⌷':'☰'}</button>`).join('')}
        </div></div>
      `, false);
    }

    html += group('Düzen', `
      <div class="pgrid2">${rowNum('X', 'x', el.x).replace('prow','prow col')}${rowNum('Y', 'y', el.y).replace('prow','prow col')}</div>
      <div class="pgrid2">${rowNum('Genişlik', 'w', el.w).replace('prow','prow col')}${rowNum('Yükseklik', 'h', el.h).replace('prow','prow col')}</div>
      <div class="prow col"><span class="plabel">Dolgu (T R B L)</span><div class="pgrid4">
        <input type="number" class="pinput" data-k="padT" value="${s.padT}"><input type="number" class="pinput" data-k="padR" value="${s.padR}">
        <input type="number" class="pinput" data-k="padB" value="${s.padB}"><input type="number" class="pinput" data-k="padL" value="${s.padL}"></div></div>
    `, false);

    html += group('Görünüm', `
      ${rowColor('Arka plan', 'bg', s.bg === 'transparent' ? '#ffffff' : s.bg)}
      <label class="pcheck"><input type="checkbox" data-bgtransparent ${s.bg === 'transparent' ? 'checked' : ''}> Şeffaf arka plan</label>
      <div class="prow col"><span class="plabel">Gradyan (CSS)</span><input type="text" class="pinput" data-k="gradient" value="${esc(s.gradient)}" placeholder="linear-gradient(135deg,#6366f1,#8b5cf6)"></div>
      <div class="pgrid2">${rowNum('Kenar px', 'borderWidth', s.borderWidth).replace('prow','prow col')}${rowNum('Köşe px', 'radius', s.radius).replace('prow','prow col')}</div>
      ${rowColor('Kenar rengi', 'borderColor', s.borderColor)}
      ${rowSelect('Kenar stili', 'borderStyle', s.borderStyle, [['solid','Düz'],['dashed','Kesik'],['dotted','Nokta']])}
      ${rowSelect('Gölge', 'shadow', s.shadow, [['none','Yok'],['0 2px 8px rgba(0,0,0,.12)','Küçük'],['0 6px 22px rgba(0,0,0,.16)','Orta'],['0 18px 50px rgba(0,0,0,.22)','Büyük']])}
      <div class="prow"><span class="plabel">Opaklık</span><div class="pfield"><input type="range" class="prange" data-k="opacity" min="0" max="1" step="0.05" value="${s.opacity}"></div></div>
    `, true);

    html += group('Gelişmiş', `
      ${rowNum('Döndür °', 'rotation', el.rotation || 0, -180, 180)}
      <div class="prow"><span class="plabel">Katman</span><div class="btn-row">
        <button class="mini-btn" data-z="front">Öne</button><button class="mini-btn" data-z="back">Arkaya</button></div></div>
      <label class="pcheck"><input type="checkbox" data-lock ${el.locked ? 'checked' : ''}> Öğeyi kilitle</label>
      <div class="btn-row"><button class="mini-btn" data-act="dup">⧉ Çoğalt</button><button class="mini-btn danger" data-act="del">🗑️ Sil</button></div>
    `, true);

    return html;
  }

  function typeSpecificProps(el) {
    if (el.type === 'photo' || el.type === 'image') {
      return `
        <div class="btn-row"><button class="mini-btn" data-act="upload">📁 Görsel Yükle</button></div>
        <div class="prow"><span class="plabel">Şekil</span><div class="pfield seg" data-shape>
          ${['circle','rounded','square'].map(sh => `<button data-v="${sh}" class="${el.data.shape===sh?'active':''}">${sh==='circle'?'●':sh==='rounded'?'▢':'■'}</button>`).join('')}
        </div></div>`;
    }
    if (el.type === 'qrcode') {
      return `<div class="prow col"><span class="plabel">QR İçeriği (URL/metin)</span><input type="text" class="pinput" data-qr value="${esc(el.data.text)}"></div>`;
    }
    if (el.type === 'progress') {
      return `
        <div class="prow col"><span class="plabel">Etiket</span><input type="text" class="pinput" data-pgl value="${esc(el.data.label)}"></div>
        <div class="prow"><span class="plabel">Değer %</span><div class="pfield"><input type="range" class="prange" data-pgv min="0" max="100" value="${el.data.value}"></div></div>
        ${rowColorRaw('Bar rengi', 'pgc', el.data.barColor)}`;
    }
    if (el.type === 'divider') {
      return `
        ${rowColorRaw('Çizgi rengi', 'dvc', el.data.lineColor)}
        <div class="prow"><span class="plabel">Kalınlık</span><div class="pfield"><input type="number" class="pinput" data-dvt value="${el.data.thickness}"></div></div>
        <div class="prow"><span class="plabel">Stil</span><div class="pfield"><select class="pselect" data-dvs>${[['solid','Düz'],['dashed','Kesik'],['dotted','Nokta']].map(o=>`<option value="${o[0]}" ${o[0]===el.data.lineStyle?'selected':''}>${o[1]}</option>`).join('')}</select></div></div>`;
    }
    if (el.type === 'button') {
      return `<div class="prow col"><span class="plabel">Bağlantı (URL)</span><input type="text" class="pinput" data-href value="${esc(el.data.href)}"></div>
        <p class="modal-sub" style="margin:0">Buton metnini tuvalde çift tıklayarak düzenleyin.</p>`;
    }
    return `<p class="modal-sub" style="margin:0">Metni düzenlemek için tuvalde çift tıklayın.</p>`;
  }
  function rowColorRaw(label, attr, val) {
    return `<div class="prow"><span class="plabel">${label}</span><div class="pfield pcolor">
      <input type="color" data-${attr}c value="${toHex(val)}"><input type="text" class="pinput" data-${attr}t value="${val}"></div></div>`;
  }

  function bindSingleProps(el) {
    const host = $('#propertiesPanel');
    const node = () => nodeMap.get(el.id);
    const reflectGeom = () => applyGeometry(node(), el);
    const reflectContent = () => rerenderNode(el);

    // collapsible groups
    bindGroupCollapse(host);

    // style numeric/select/text inputs (data-k)
    $$('[data-k]', host).forEach(inp => {
      inp.addEventListener('input', () => {
        const k = inp.dataset.k;
        let v = inp.type === 'number' || inp.type === 'range' ? parseFloat(inp.value) : inp.value;
        if (['x','y','w','h','rotation'].includes(k)) { el[k] = v; reflectGeom(); }
        else { el.style[k] = v; reRenderStyleOnly(el); }
        commitDebounced();
      });
    });
    // colors (data-kc + data-kt pairs)
    $$('[data-kc]', host).forEach(c => {
      const key = c.dataset.kc;
      const txt = host.querySelector(`[data-kt="${key}"]`);
      c.addEventListener('input', () => { el.style[key] = c.value; if (txt) txt.value = c.value; reRenderStyleOnly(el); commitDebounced(); });
      if (txt) txt.addEventListener('input', () => { el.style[key] = txt.value; c.value = toHex(txt.value); reRenderStyleOnly(el); commitDebounced(); });
    });
    // transparent bg
    const tr = host.querySelector('[data-bgtransparent]');
    if (tr) tr.addEventListener('change', () => { el.style.bg = tr.checked ? 'transparent' : '#ffffff'; reRenderStyleOnly(el); buildProperties(); commit(); });
    // segmented (textAlign)
    $$('[data-seg]', host).forEach(seg => {
      seg.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return;
        el.style[seg.dataset.seg] = b.dataset.v; reRenderStyleOnly(el);
        $$('button', seg).forEach(x => x.classList.remove('active')); b.classList.add('active'); commit(); });
    });
    // shape
    const shape = host.querySelector('[data-shape]');
    if (shape) shape.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return;
      el.data.shape = b.dataset.v; reflectContent(); $$('button', shape).forEach(x => x.classList.remove('active')); b.classList.add('active'); commit(); });
    // qr
    const qr = host.querySelector('[data-qr]');
    if (qr) qr.addEventListener('input', () => { el.data.text = qr.value; reflectContent(); commitDebounced(); });
    // progress
    const pgl = host.querySelector('[data-pgl]'); if (pgl) pgl.addEventListener('input', () => { el.data.label = pgl.value; reflectContent(); commitDebounced(); });
    const pgv = host.querySelector('[data-pgv]'); if (pgv) pgv.addEventListener('input', () => { el.data.value = parseInt(pgv.value); reflectContent(); commitDebounced(); });
    bindRawColor(host, 'pgc', v => { el.data.barColor = v; reflectContent(); });
    // divider
    bindRawColor(host, 'dvc', v => { el.data.lineColor = v; reflectContent(); });
    const dvt = host.querySelector('[data-dvt]'); if (dvt) dvt.addEventListener('input', () => { el.data.thickness = parseInt(dvt.value) || 1; reflectContent(); commitDebounced(); });
    const dvs = host.querySelector('[data-dvs]'); if (dvs) dvs.addEventListener('change', () => { el.data.lineStyle = dvs.value; reflectContent(); commit(); });
    // href
    const href = host.querySelector('[data-href]'); if (href) href.addEventListener('input', () => { el.data.href = href.value; commitDebounced(); });
    // upload
    const up = host.querySelector('[data-act="upload"]'); if (up) up.addEventListener('click', () => uploadImageFor(el));
    // z-order
    $$('[data-z]', host).forEach(b => b.addEventListener('click', () => {
      if (b.dataset.z === 'front') { el.z = nextZ(); rerenderNode(el); }
      else { project.elements.forEach(e2 => e2.z = (e2.z||1)+1); el.z = 1; renderAll(); }
      commit();
    }));
    // lock
    const lock = host.querySelector('[data-lock]'); if (lock) lock.addEventListener('change', () => { el.locked = lock.checked; node().dataset.locked = el.locked; refreshSelectionVisual(); positionQuickbar(); commit(); });
    // dup/del
    const dup = host.querySelector('[data-act="dup"]'); if (dup) dup.addEventListener('click', duplicateSelection);
    const del = host.querySelector('[data-act="del"]'); if (del) del.addEventListener('click', deleteSelection);
  }
  function bindRawColor(host, attr, cb) {
    const c = host.querySelector(`[data-${attr}c]`), t = host.querySelector(`[data-${attr}t]`);
    if (c) c.addEventListener('input', () => { if (t) t.value = c.value; cb(c.value); commitDebounced(); });
    if (t) t.addEventListener('input', () => { if (c) c.value = toHex(t.value); cb(t.value); commitDebounced(); });
  }

  // apply only style to content element without full rebuild (keeps perf + caret)
  function reRenderStyleOnly(el) {
    const node = nodeMap.get(el.id); if (!node) return;
    applyGeometry(node, el);
    const c = node.querySelector('.el-content');
    if (c) {
      if (TEXT_TYPES.has(el.type)) c.style.cssText = boxStyleString(el);
      else { rerenderNode(el); }
    }
  }

  function bindGroupCollapse(host) {
    $$('.prop-gh', host).forEach(h => h.addEventListener('click', () => h.parentElement.classList.toggle('collapsed')));
  }

  function multiProps() {
    return group('Hizalama', `
      <div class="prow col"><span class="plabel">Yatay</span><div class="btn-row">
        <button class="mini-btn" data-al="left">⌶ Sol</button><button class="mini-btn" data-al="cx">≡ Orta</button><button class="mini-btn" data-al="right">⌷ Sağ</button></div></div>
      <div class="prow col"><span class="plabel">Dikey</span><div class="btn-row">
        <button class="mini-btn" data-al="top">⌶ Üst</button><button class="mini-btn" data-al="cy">≡ Orta</button><button class="mini-btn" data-al="bottom">⌷ Alt</button></div></div>
      <div class="btn-row"><button class="mini-btn" data-act="dup">⧉ Çoğalt</button><button class="mini-btn danger" data-act="del">🗑️ Sil</button></div>
    `, false) + group('Dağıt', `<div class="btn-row"><button class="mini-btn" data-dist="h">↔ Yatay</button><button class="mini-btn" data-dist="v">↕ Dikey</button></div>`, false);
  }
  function bindMultiProps() {
    const host = $('#propertiesPanel');
    bindGroupCollapse(host);
    $$('[data-al]', host).forEach(b => b.addEventListener('click', () => alignSelection(b.dataset.al)));
    $$('[data-dist]', host).forEach(b => b.addEventListener('click', () => distributeSelection(b.dataset.dist)));
    const dup = host.querySelector('[data-act="dup"]'); if (dup) dup.addEventListener('click', duplicateSelection);
    const del = host.querySelector('[data-act="del"]'); if (del) del.addEventListener('click', deleteSelection);
  }
  function alignSelection(mode) {
    const els = [...selection].map(getEl);
    const minX = Math.min(...els.map(e => e.x)), maxX = Math.max(...els.map(e => e.x + e.w));
    const minY = Math.min(...els.map(e => e.y)), maxY = Math.max(...els.map(e => e.y + e.h));
    els.forEach(e => {
      if (mode === 'left') e.x = minX;
      else if (mode === 'right') e.x = maxX - e.w;
      else if (mode === 'cx') e.x = Math.round((minX + maxX) / 2 - e.w / 2);
      else if (mode === 'top') e.y = minY;
      else if (mode === 'bottom') e.y = maxY - e.h;
      else if (mode === 'cy') e.y = Math.round((minY + maxY) / 2 - e.h / 2);
      applyGeometry(nodeMap.get(e.id), e);
    });
    commit();
  }
  function distributeSelection(axis) {
    const els = [...selection].map(getEl).sort((a, b) => axis === 'h' ? a.x - b.x : a.y - b.y);
    if (els.length < 3) return;
    if (axis === 'h') {
      const first = els[0].x, last = els[els.length - 1].x;
      const gap = (last - first) / (els.length - 1);
      els.forEach((e, i) => { e.x = Math.round(first + gap * i); applyGeometry(nodeMap.get(e.id), e); });
    } else {
      const first = els[0].y, last = els[els.length - 1].y;
      const gap = (last - first) / (els.length - 1);
      els.forEach((e, i) => { e.y = Math.round(first + gap * i); applyGeometry(nodeMap.get(e.id), e); });
    }
    commit();
  }

  function docProps() {
    return group('Belge & Tema', `
      <div class="prow col"><span class="plabel">Vurgu rengi</span>
        <div class="pcolor"><input type="color" id="docAccentC" value="${project.theme.accent}"><input type="text" class="pinput" id="docAccentT" value="${project.theme.accent}"></div>
        ${swatchRow('accent')}
      </div>
      <div class="prow col"><span class="plabel">Hazır temalar</span><div class="swatches">
        ${Object.entries(PALETTES).map(([n, c]) => `<div class="swatch" style="background:${c}" data-pal="${c}" title="${n}"></div>`).join('')}
      </div></div>
      ${rowSelect('Yazı tipi', 'docFont', project.theme.font, FONTS.map(f => [f, f]))}
      <div class="prow col"><span class="plabel">Sayfa rengi</span>
        <div class="pcolor"><input type="color" id="docBgC" value="${toHex(project.page.bg)}"><input type="text" class="pinput" id="docBgT" value="${project.page.bg}"></div></div>
    `, false);
  }
  function bindDocProps() {
    const host = $('#propertiesPanel');
    bindGroupCollapse(host);
    const aC = $('#docAccentC'), aT = $('#docAccentT');
    const setAccent = v => { project.theme.accent = v; aC.value = toHex(v); aT.value = v; commitDebounced(); };
    aC.addEventListener('input', () => setAccent(aC.value));
    aT.addEventListener('input', () => setAccent(aT.value));
    $$('[data-sw="accent"]', host).forEach(s => s.addEventListener('click', () => setAccent(s.dataset.c)));
    $$('[data-pal]', host).forEach(s => s.addEventListener('click', () => setAccent(s.dataset.pal)));
    const f = host.querySelector('[data-k="docFont"]');
    f.addEventListener('change', () => { project.theme.font = f.value; commit(); });
    const bC = $('#docBgC'), bT = $('#docBgT');
    bC.addEventListener('input', () => { project.page.bg = bC.value; bT.value = bC.value; $('#page').style.background = bC.value; commitDebounced(); });
    bT.addEventListener('input', () => { project.page.bg = bT.value; bC.value = toHex(bT.value); $('#page').style.background = bT.value; commitDebounced(); });
  }

  /* ========================= IMAGE UPLOAD ========================= */
  let uploadTarget = null;
  function uploadImageFor(el) { uploadTarget = el; $('#imageFileInput').click(); }
  $('#imageFileInput').addEventListener('change', function () {
    const f = this.files[0]; if (!f || !uploadTarget) return;
    const reader = new FileReader();
    reader.onload = e => { uploadTarget.data.src = e.target.result; rerenderNode(uploadTarget); commit(); toast('Görsel eklendi'); this.value = ''; };
    reader.readAsDataURL(f);
  });

  /* ========================= COMPONENT LIBRARY (drag) ========================= */
  function buildLibrary(filter) {
    const host = $('#componentLibrary');
    host.innerHTML = '';
    LIBRARY.forEach(catObj => {
      const items = catObj.items.filter(it => !filter || it.label.toLowerCase().includes(filter) || it.type.includes(filter));
      if (!items.length) return;
      const cat = document.createElement('div'); cat.className = 'lib-cat'; cat.textContent = catObj.cat; host.appendChild(cat);
      const grid = document.createElement('div'); grid.className = 'lib-grid';
      items.forEach(it => {
        const card = document.createElement('div');
        card.className = 'lib-item'; card.draggable = true; card.dataset.type = it.type;
        card.innerHTML = `<span class="lib-ico">${it.icon}</span><span class="lib-label">${it.label}</span>`;
        card.addEventListener('dragstart', e => { e.dataTransfer.setData('text/flexcv', it.type); card.classList.add('dragging'); });
        card.addEventListener('dragend', () => card.classList.remove('dragging'));
        card.addEventListener('dblclick', () => addElement(it.type, PAGE_W / 2 - 100, 80));
        grid.appendChild(card);
      });
      host.appendChild(grid);
    });
  }
  $('#libSearch').addEventListener('input', e => buildLibrary(e.target.value.trim().toLowerCase()));

  // drop on page
  const page = $('#page');
  page.addEventListener('dragover', e => { if (e.dataTransfer.types.includes('text/flexcv')) e.preventDefault(); });
  page.addEventListener('drop', e => {
    const type = e.dataTransfer.getData('text/flexcv'); if (!type) return;
    e.preventDefault();
    const p = toCanvas(e.clientX, e.clientY);
    addElement(type, p.x - 60, p.y - 20);
  });

  /* ========================= ZOOM ========================= */
  function setZoom(z) {
    zoom = clamp(z, 0.25, 3);
    const zoomWrap = $('#pageZoom');
    zoomWrap.style.width = (PAGE_W * zoom) + 'px';
    zoomWrap.style.height = (PAGE_H * zoom) + 'px';
    page.style.transform = `scale(${zoom})`;
    page.style.transformOrigin = 'top left';
    const stage = $('#canvasStage');
    stage.style.width = (PAGE_W * zoom + 96) + 'px';
    stage.style.height = (PAGE_H * zoom + 96) + 'px';
    $('#zoomSelect').value = String([0.5,0.75,1,1.25,1.5].includes(zoom) ? zoom : 1);
    $('#sbZoom').textContent = Math.round(zoom * 100) + '%';
    positionQuickbar();
  }
  $('#zoomSelect').addEventListener('change', e => setZoom(parseFloat(e.target.value)));
  $('#zoomIn').addEventListener('click', () => setZoom(zoom + 0.1));
  $('#zoomOut').addEventListener('click', () => setZoom(zoom - 0.1));

  /* ========================= TOOLBAR TOGGLES ========================= */
  $('#gridToggle').addEventListener('click', () => { prefs.grid = !prefs.grid; applyPrefs(); savePrefs(); });
  $('#snapToggle').addEventListener('click', () => { prefs.snap = !prefs.snap; applyPrefs(); savePrefs(); });
  $('#themeBtn').addEventListener('click', () => { prefs.theme = prefs.theme === 'dark' ? 'light' : 'dark'; applyPrefs(); savePrefs(); });
  $('#fullscreenBtn').addEventListener('click', toggleFullscreen);
  $('#undoBtn').addEventListener('click', undo);
  $('#redoBtn').addEventListener('click', redo);
  $('#leftCollapse').addEventListener('click', () => $('#leftPanel').classList.toggle('collapsed'));
  $('#rightCollapse').addEventListener('click', () => $('#rightPanel').classList.toggle('collapsed'));

  function applyPrefs() {
    document.documentElement.setAttribute('data-theme', prefs.theme);
    $('#themeBtn').textContent = prefs.theme === 'dark' ? '☀️' : '🌙';
    $('#gridToggle').classList.toggle('active', prefs.grid);
    $('#snapToggle').classList.toggle('active', prefs.snap);
    $('#gridOverlay').classList.toggle('on', prefs.grid);
  }
  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  /* ========================= PROJECT MENU ========================= */
  function setupMenu(btn, menu) {
    btn.addEventListener('click', e => { e.stopPropagation(); closeMenus(menu); menu.classList.toggle('open'); });
  }
  function closeMenus(except) { $$('.tb-dropdown').forEach(m => { if (m !== except) m.classList.remove('open'); }); }
  document.addEventListener('click', () => closeMenus());
  setupMenu($('#projectMenuBtn'), $('#projectMenu'));
  setupMenu($('#exportMenuBtn'), $('#exportMenu'));

  $('#projectMenu').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const act = b.dataset.act;
    if (act === 'save') { actualSave(); toast('Proje kaydedildi'); }
    else if (act === 'new') { if (confirm('Yeni boş proje oluşturulsun mu? Mevcut çalışma kaydedilir.')) { actualSave(); project = newProject(); selection.clear(); history = []; hIndex = -1; renderAll(); afterSelect(); syncThemeControls(); $('#projectName').value = project.name; commit(); } }
    else if (act === 'recent') openRecent();
    else if (act === 'exportJson') exportJSON();
    else if (act === 'importJson') $('#jsonFileInput').click();
  });
  $('#exportMenu').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    exportImage(b.dataset.export);
  });

  $('#projectName').addEventListener('input', e => { project.name = e.target.value || 'Adsız CV'; commitDebounced(); });

  /* ===== JSON import/export ===== */
  function exportJSON() {
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (project.name || 'flexcv') + '.json';
    a.click(); URL.revokeObjectURL(a.href);
    toast('JSON dışa aktarıldı');
  }
  $('#jsonFileInput').addEventListener('change', function () {
    const f = this.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const obj = JSON.parse(e.target.result);
        if (!obj.elements) throw 0;
        project = Object.assign(newProject(), obj); project.id = obj.id || uid();
        selection.clear(); history = []; hIndex = -1;
        renderAll(); afterSelect(); syncThemeControls(); $('#projectName').value = project.name;
        commit(); toast('JSON içe aktarıldı');
      } catch (err) { toast('Geçersiz JSON dosyası'); }
      this.value = '';
    };
    reader.readAsText(f);
  });

  /* ========================= RECENT ========================= */
  function openRecent() {
    const list = $('#recentList');
    const recent = loadRecent();
    if (!recent.length) { list.innerHTML = '<div class="recent-empty">Henüz kayıtlı proje yok.</div>'; }
    else list.innerHTML = recent.map(r => `
      <div class="recent-item">
        <div><div class="ri-name">${esc(r.name)}</div><div class="ri-date">${new Date(r.updatedAt).toLocaleString('tr-TR')}</div></div>
        <div class="ri-actions"><button class="mini-btn" data-load="${r.id}">Aç</button><button class="mini-btn danger" data-del="${r.id}">Sil</button></div>
      </div>`).join('');
    list.querySelectorAll('[data-load]').forEach(b => b.addEventListener('click', () => {
      const r = loadRecent().find(x => x.id === b.dataset.load); if (!r) return;
      actualSave();
      project = r.data; selection.clear(); history = []; hIndex = -1;
      renderAll(); afterSelect(); syncThemeControls(); $('#projectName').value = project.name; commit();
      closeModal(); toast('Proje açıldı');
    }));
    list.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
      let recent = loadRecent().filter(x => x.id !== b.dataset.del);
      localStorage.setItem(RECENT_KEY, JSON.stringify(recent)); openRecent();
    }));
    openModal('#recentModal');
  }

  /* ========================= EXPORT IMAGE / PDF ========================= */
  async function capturePageCanvas() {
    const holder = document.createElement('div');
    holder.setAttribute('aria-hidden', 'true');
    holder.style.cssText = `position:fixed;left:-12000px;top:0;width:${PAGE_W}px;height:${PAGE_H}px;overflow:hidden;z-index:-1;pointer-events:none;background:${project.page.bg || '#fff'}`;

    const clone = page.cloneNode(true);
    clone.removeAttribute('id');
    clone.style.transform = 'none';
    clone.style.boxShadow = 'none';
    clone.querySelector('#gridOverlay')?.remove();
    clone.querySelector('#guides')?.remove();
    clone.querySelector('#marquee')?.remove();
    clone.querySelectorAll('.handle').forEach(h => h.remove());
    clone.querySelectorAll('.el').forEach(n => n.classList.remove('selected', 'multi'));

    holder.appendChild(clone);
    document.body.appendChild(holder);

    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: project.page.bg || '#ffffff',
        width: PAGE_W,
        height: PAGE_H,
        logging: false
      });
      // collect clickable link rects (normalized 0..1) for PDF hyperlinks
      const base = clone.getBoundingClientRect();
      const links = [];
      clone.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const r = a.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) return;
        links.push({ url: a.href, x: (r.left - base.left) / PAGE_W, y: (r.top - base.top) / PAGE_H, w: r.width / PAGE_W, h: r.height / PAGE_H });
      });
      return { canvas, links };
    } finally {
      holder.remove();
    }
  }

  async function exportImage(kind) {
    const wasSel = new Set(selection); clearSelect();
    if (editingId) finishEditing();
    closeMenus();
    toast(kind.toUpperCase() + ' hazırlanıyor…');
    const gridWasOn = $('#gridOverlay').classList.contains('on');
    $('#gridOverlay').classList.remove('on');
    clearGuides();
    try {
      const { canvas, links } = await capturePageCanvas();
      const fname = fileBase();
      if (kind === 'pdf') {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
        const img = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(img, 'JPEG', 0, 0, 210, 297);
        links.forEach(l => pdf.link(l.x * 210, l.y * 297, l.w * 210, l.h * 297, { url: l.url }));
        pdf.save(fname + '.pdf');
      } else {
        const mime = kind === 'png' ? 'image/png' : 'image/jpeg';
        const a = document.createElement('a');
        a.href = canvas.toDataURL(mime, 0.95);
        a.download = fname + '.' + kind;
        a.click();
      }
      toast(kind.toUpperCase() + ' indirildi');
    } catch (e) { console.error(e); toast('Dışa aktarma başarısız'); }
    if (gridWasOn) $('#gridOverlay').classList.add('on');
    selection = wasSel; afterSelect();
  }

  function fileBase() {
    const MONTHS = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
    const nameEl = project.elements.find(e => e.type === 'name');
    let nm = nameEl ? stripHtml(nameEl.content) : project.name;
    nm = (nm || 'CV').trim() || 'CV';
    const d = new Date();
    return `${nm} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim();
  }
  function stripHtml(h) { const d = document.createElement('div'); d.innerHTML = h; return d.textContent || ''; }

  /* ========================= MODALS ========================= */
  function openModal(sel) { $('#modalOverlay').classList.add('show'); $(sel).classList.add('show'); }
  function closeModal() { $('#modalOverlay').classList.remove('show'); $$('.modal').forEach(m => m.classList.remove('show')); }
  $('#modalOverlay').addEventListener('click', closeModal);
  $$('[data-close]').forEach(b => b.addEventListener('click', closeModal));
  $('#helpBtn').addEventListener('click', () => openModal('#helpModal'));
  $('#shortcutsBtn').addEventListener('click', () => openModal('#shortcutsModal'));
  $('#openGalleryBtn').addEventListener('click', openGallery);

  /* ========================= TEMPLATES ========================= */
  // layout generators return array of elements (without ids/z; filled by inflate)
  function inflate(defs, theme) {
    let z = 1;
    return defs.map(d => {
      const el = factory(d.type, d.x, d.y);
      el.w = d.w; el.h = d.h; el.z = z++;
      if (d.content !== undefined) el.content = d.content;
      if (d.style) Object.assign(el.style, d.style);
      if (d.data) Object.assign(el.data, d.data);
      return el;
    });
  }

  function tplSidebar(p) {
    // colored left sidebar
    return {
      theme: { accent: p.accent, font: p.font }, page: { bg: p.pageBg || '#ffffff' },
      defs: [
        { type: 'customText', x: 0, y: 0, w: 280, h: 1123, content: '', style: { bg: p.sidebar, padT: 0 } },
        { type: 'photo', x: 75, y: 50, w: 130, h: 130, data: { shape: 'circle' } },
        { type: 'name', x: 24, y: 200, w: 232, h: 40, content: 'Ad Soyad', style: { color: p.onSidebar, fontSize: 26, fontWeight: 800, textAlign: 'center', fontFamily: p.font } },
        { type: 'jobTitle', x: 24, y: 244, w: 232, h: 24, content: 'Pozisyon', style: { color: p.onSidebarSoft, fontSize: 13, textAlign: 'center', fontFamily: p.font } },
        { type: 'contact', x: 24, y: 300, w: 232, h: 120, content: `<div style="font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;border-bottom:1px solid ${hexA(p.onSidebar,0.3)};padding-bottom:5px">İletişim</div><div style="font-size:11.5px;line-height:1.9">✉ ad@mail.com<br>☎ +90 5xx xxx<br>📍 Şehir<br>🌐 site.com</div>`, style: { color: p.onSidebar, fontFamily: p.font } },
        { type: 'skills', x: 24, y: 440, w: 232, h: 150, content: `<div style="font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;border-bottom:1px solid ${hexA(p.onSidebar,0.3)};padding-bottom:5px">Yetenekler</div><div style="display:flex;flex-wrap:wrap;gap:6px">${['Kotlin','Flutter','Swift','Firebase','Git'].map(s=>`<span style="background:${hexA(p.onSidebar,0.18)};padding:3px 9px;border-radius:20px;font-size:11px">${s}</span>`).join('')}</div>`, style: { color: p.onSidebar, fontFamily: p.font } },
        { type: 'languages', x: 24, y: 610, w: 232, h: 110, content: `<div style="font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;border-bottom:1px solid ${hexA(p.onSidebar,0.3)};padding-bottom:5px">Diller</div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px"><span>Türkçe</span><span style="opacity:.7">Ana dil</span></div><div style="display:flex;justify-content:space-between;font-size:12px"><span>İngilizce</span><span style="opacity:.7">C1</span></div>`, style: { color: p.onSidebar, fontFamily: p.font } },
        { type: 'about', x: 312, y: 56, w: 446, h: 110, content: `<div style="font-weight:800;font-size:15px;text-transform:uppercase;letter-spacing:.05em;color:${p.accent};margin-bottom:8px">Hakkımda</div><div>Kısa, etkili bir profesyonel özet. Deneyiminizi ve değer katacağınız alanları anlatın.</div>`, style: { color: '#333', fontFamily: p.font } },
        { type: 'experience', x: 312, y: 180, w: 446, h: 330, content: secTitled('Deneyim', p.accent, [entryHTML('Senior Pozisyon','Şirket','2022 – Halen','Başlıca sorumluluk ve başarılar.'), entryHTML('Pozisyon','Eski Şirket','2019 – 2022','Önemli katkılar.'), entryHTML('Junior Pozisyon','İlk Şirket','2017 – 2019','Temel görevler.')]), style: { color: '#333', fontFamily: p.font } },
        { type: 'education', x: 312, y: 530, w: 446, h: 160, content: secTitled('Eğitim', p.accent, [entryHTML('Bölüm / Derece','Üniversite','2015 – 2019',''), entryHTML('Lise','Okul','2011 – 2015','')]), style: { color: '#333', fontFamily: p.font } },
        { type: 'projects', x: 312, y: 700, w: 446, h: 160, content: secTitled('Projeler', p.accent, [entryHTML('Proje / Uygulama','Platform','2024','Kısa açıklama ve teknolojiler.')]), style: { color: '#333', fontFamily: p.font } },
      ]
    };
  }
  function tplSingle(p) {
    return {
      theme: { accent: p.accent, font: p.font }, page: { bg: p.pageBg || '#ffffff' },
      defs: [
        { type: 'name', x: 60, y: 56, w: 674, h: 48, content: 'Ad Soyad', style: { color: p.heading, fontSize: 34, fontWeight: 800, textAlign: p.center ? 'center' : 'left', fontFamily: p.font } },
        { type: 'jobTitle', x: 60, y: 106, w: 674, h: 26, content: 'Pozisyon / Ünvan', style: { color: p.accent, fontSize: 15, letterSpacing: 1, textAlign: p.center ? 'center' : 'left', fontFamily: p.font } },
        { type: 'contact', x: 60, y: 138, w: 674, h: 24, content: `<div style="font-size:12px;${p.center?'text-align:center':''}">✉ ad@mail.com &nbsp;·&nbsp; ☎ +90 5xx xxx &nbsp;·&nbsp; 📍 Şehir &nbsp;·&nbsp; 🌐 site.com</div>`, style: { color: p.muted, fontFamily: p.font } },
        { type: 'divider', x: 60, y: 168, w: 674, h: 10, data: { lineColor: p.accent, thickness: 2 } },
        { type: 'about', x: 60, y: 188, w: 674, h: 90, content: `<div style="font-weight:800;font-size:14px;text-transform:uppercase;letter-spacing:.06em;color:${p.heading};border-bottom:1px solid ${hexA(p.accent,0.4)};padding-bottom:3px;margin-bottom:7px">Hakkımda</div><div>Profesyonel özet metniniz buraya gelir.</div>`, style: { color: '#333', fontFamily: p.font } },
        { type: 'experience', x: 60, y: 290, w: 674, h: 320, content: secTitled('Deneyim', p.heading, [entryHTML('Senior Pozisyon','Şirket','2022 – Halen','Başlıca sorumluluk ve başarılar.'), entryHTML('Pozisyon','Eski Şirket','2019 – 2022','Önemli katkılar.')], p.accent), style: { color: '#333', fontFamily: p.font } },
        { type: 'education', x: 60, y: 620, w: 320, h: 150, content: secTitled('Eğitim', p.heading, [entryHTML('Bölüm','Üniversite','2015 – 2019','')], p.accent), style: { color: '#333', fontFamily: p.font } },
        { type: 'skills', x: 410, y: 620, w: 324, h: 150, content: `<div style="font-weight:800;font-size:14px;text-transform:uppercase;letter-spacing:.06em;color:${p.heading};border-bottom:1px solid ${hexA(p.accent,0.4)};padding-bottom:3px;margin-bottom:8px">Yetenekler</div><div style="display:flex;flex-wrap:wrap;gap:6px">${['Kotlin','Flutter','Swift','Firebase','Git','REST'].map(s=>`<span style="background:${hexA(p.accent,0.12)};color:${p.accent};padding:3px 9px;border-radius:20px;font-size:11px">${s}</span>`).join('')}</div>`, style: { color: '#333', fontFamily: p.font } },
        { type: 'languages', x: 60, y: 790, w: 320, h: 110, content: `<div style="font-weight:800;font-size:14px;text-transform:uppercase;letter-spacing:.06em;color:${p.heading};border-bottom:1px solid ${hexA(p.accent,0.4)};padding-bottom:3px;margin-bottom:8px">Diller</div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>Türkçe</span><span style="opacity:.7">Ana dil</span></div><div style="display:flex;justify-content:space-between;font-size:12px"><span>İngilizce</span><span style="opacity:.7">C1</span></div>`, style: { color: '#333', fontFamily: p.font } },
      ]
    };
  }
  function secTitled(title, headColor, entries, accent) {
    return `<div style="font-weight:800;font-size:14px;text-transform:uppercase;letter-spacing:.06em;color:${headColor};border-bottom:1px solid ${hexA(accent||headColor,0.4)};padding-bottom:3px;margin-bottom:8px">${title}</div>${entries.join('')}`;
  }

  /* Owner's real CV — professional, English, sidebar layout */
  function tplDogus(p) {
    const oc = p.onSidebar, ocs = p.onSidebarSoft, ac = p.accent;
    const sideTitle = (t) => `<div style="font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.09em;margin-bottom:9px;border-bottom:1px solid ${hexA(oc, 0.35)};padding-bottom:5px">${t}</div>`;
    const skillRow = (label, val) => `<div style="margin-bottom:7px"><div style="font-weight:700;font-size:10.5px;text-transform:uppercase;letter-spacing:.03em">${label}</div><div style="font-size:11px;opacity:.85;line-height:1.4">${val}</div></div>`;
    const mainTitle = (t) => `<div style="font-weight:800;font-size:15px;text-transform:uppercase;letter-spacing:.05em;color:${ac};margin-bottom:9px;border-bottom:2px solid ${hexA(ac, 0.25)};padding-bottom:4px">${t}</div>`;
    return {
      theme: { accent: ac, font: p.font }, page: { bg: '#ffffff' },
      defs: [
        { type: 'customText', x: 0, y: 0, w: 280, h: 1123, content: '', style: { bg: p.sidebar, padT: 0 } },
        { type: 'photo', x: 80, y: 48, w: 120, h: 120, data: { shape: 'circle' } },
        { type: 'name', x: 18, y: 188, w: 244, h: 58, content: 'Doğuş İpeksaç', style: { color: oc, fontSize: 25, fontWeight: 800, textAlign: 'center', lineHeight: 1.15, fontFamily: p.font } },
        { type: 'jobTitle', x: 18, y: 244, w: 244, h: 22, content: 'Senior Android Developer', style: { color: ocs, fontSize: 12.5, textAlign: 'center', letterSpacing: 0.5, fontFamily: p.font } },
        { type: 'contact', x: 24, y: 288, w: 232, h: 118, content: sideTitle('Contact') + `<div style="font-size:10.8px;line-height:1.85;word-break:break-word">+90 505 001 22 48<br>ipeksac.dogus.19@gmail.com<br>Sultanbeyli, İstanbul<br>linkedin.com/in/dogusipeksac</div>`, style: { color: oc, fontFamily: p.font } },
        { type: 'skills', x: 24, y: 412, w: 232, h: 300, content: sideTitle('Skills') + skillRow('Languages', 'Kotlin, Java') + skillRow('Architecture', 'MVVM, MVI, Clean Architecture') + skillRow('UI / UX', 'Jetpack Compose') + skillRow('Async', 'Coroutines, Flow, RxJava') + skillRow('Dependency Injection', 'Dagger, Hilt, Koin') + skillRow('Testing', 'JUnit, Espresso, Mockito') + skillRow('Tools', 'Git, Jira, Firebase'), style: { color: oc, fontFamily: p.font } },
        { type: 'languages', x: 24, y: 720, w: 232, h: 92, content: sideTitle('Languages') + `<div style="display:flex;justify-content:space-between;font-size:11.5px;margin-bottom:5px"><span>English</span><span style="opacity:.7">C1</span></div><div style="display:flex;justify-content:space-between;font-size:11.5px"><span>Turkish</span><span style="opacity:.7">Native</span></div>`, style: { color: oc, fontFamily: p.font } },
        { type: 'education', x: 24, y: 816, w: 232, h: 122, content: sideTitle('Education') + `<div style="font-size:11.3px;line-height:1.5"><b>BSc Computer Science Eng.</b><br>İnönü University<br><span style="opacity:.82">2017 – 2021 · GPA 3.43 / 4.0</span><br><span style="opacity:.82">Malatya, Turkey</span></div>`, style: { color: oc, fontFamily: p.font } },
        { type: 'references', x: 24, y: 946, w: 232, h: 150, content: sideTitle('References') + `<div style="font-size:11px;line-height:1.5"><b>Canberk Çakmak</b><br><span style="opacity:.82">Senior iOS Developer</span><br><b style="display:inline-block;margin-top:6px">Fatih Erdem</b><br><span style="opacity:.82">Project Manager</span></div>`, style: { color: oc, fontFamily: p.font } },

        { type: 'about', x: 312, y: 54, w: 452, h: 104, content: mainTitle('About Me') + `<div>Android developer with 3+ years of experience building scalable, high-performance applications with Kotlin, Jetpack Compose and the MVVM architecture. Focused on modern mobile solutions with a strong emphasis on clean architecture and user experience.</div>`, style: { color: '#333', fontSize: 12, fontFamily: p.font } },
        { type: 'experience', x: 312, y: 168, w: 452, h: 472, content: mainTitle('Experience') + [
          entryHTML('Senior Android Developer', 'Veripark', '01/2025 – Present', 'Banking sector — Alternative Bank project, delivering innovative and efficient solutions. Contributed to major international projects: Barclaycard, Ziraat Germany, YapıKredi NL, YapıKredi AZ, Ziraat AZ Native and A&amp;T Bank.'),
          entryHTML('Android Developer', '', '07/2023 – 01/2025', 'Built and maintained production Android applications using MVVM / Clean Architecture and modern Jetpack libraries.'),
          entryHTML('Android Developer', 'OGOO Teknoloji Ajansı', '01/2023 – 07/2023', 'Developed intranet apps for Pegasus, Tofaş, TOGG and Opet. Integrated Microsoft ADAL &amp; MSAL for secure authentication and managed sprints with Jira for efficient, collaborative delivery.'),
          entryHTML('Junior Android Developer', '', '09/2021 – 01/2023', 'Implemented features and resolved defects across Android apps while deepening Kotlin and Android fundamentals.'),
          entryHTML('Intern Android Developer', '', '07/2021 – 09/2021', 'First professional Android experience — supported feature development and learned production workflows.')
        ].join(''), style: { color: '#333', fontSize: 12, fontFamily: p.font } },
        { type: 'projects', x: 312, y: 652, w: 452, h: 446, content: mainTitle('Apps & Projects') +
          appCardHTML('📔', 'My Diary', 'Android', 'Personal journal built with Jetpack Compose — notes, audio, photos and PDF export.', 'https://play.google.com/store/apps/details?id=com.product.mydiary', '', ac) +
          appCardHTML('🚗', 'App Plaka Kontrol', 'Android · iOS', 'AI-powered Turkish license-plate recognition with saved history records.', 'https://play.google.com/store/apps/details?id=com.product.appplakakontrol', 'https://apps.apple.com/us/app/app-plaka-kontrol/id6760252433', ac) +
          appCardHTML('📸', 'Anı Yakala — Moment Capture', 'Android · iOS', 'Photo capture with location, date & template stamps, map view and watermark control.', 'https://play.google.com/store/apps/details?id=com.dogusipeksac.capturethemoment', 'https://apps.apple.com/us/app/an%C4%B1-yakala/id6764663335', ac),
          style: { color: '#333', fontSize: 12, fontFamily: p.font } },
      ]
    };
  }

  function seedProject() {
    const t = tplDogus({ accent: '#1e3a5f', sidebar: '#1e3a5f', onSidebar: '#ffffff', onSidebarSoft: 'rgba(255,255,255,.82)', font: 'Inter' });
    const pr = newProject('Doğuş İpeksaç CV');
    pr.theme = t.theme; pr.page = t.page; pr.elements = inflate(t.defs, t.theme);
    return pr;
  }

  const TEMPLATES = [
    { name: 'Doğuş İpeksaç', desc: 'Senior Android — Pro', build: () => tplDogus({ accent: '#1e3a5f', sidebar: '#1e3a5f', onSidebar: '#ffffff', onSidebarSoft: 'rgba(255,255,255,.82)', font: 'Inter' }) },
    { name: 'Modern', desc: 'Renkli kenar çubuğu', build: () => tplSidebar({ accent: '#6366f1', sidebar: '#6366f1', onSidebar: '#ffffff', onSidebarSoft: 'rgba(255,255,255,.8)', font: 'Inter' }) },
    { name: 'Minimal', desc: 'Sade tek sütun', build: () => tplSingle({ accent: '#111111', heading: '#111111', muted: '#666', font: 'Inter', center: false }) },
    { name: 'Corporate', desc: 'Kurumsal lacivert', build: () => tplSidebar({ accent: '#1e3a5f', sidebar: '#1e3a5f', onSidebar: '#ffffff', onSidebarSoft: 'rgba(255,255,255,.8)', font: 'Roboto' }) },
    { name: 'Executive', desc: 'Zarif serif', build: () => tplSingle({ accent: '#8a6d3b', heading: '#2b2b2b', muted: '#777', font: 'Playfair Display', center: true }) },
    { name: 'Creative', desc: 'Canlı mor', build: () => tplSidebar({ accent: '#a855f7', sidebar: '#7c3aed', onSidebar: '#ffffff', onSidebarSoft: 'rgba(255,255,255,.85)', font: 'Poppins' }) },
    { name: 'Dark Theme', desc: 'Koyu sayfa', build: () => { const t = tplSingle({ accent: '#22d3ee', heading: '#ffffff', muted: '#9aa4b2', font: 'Inter', center: false, pageBg: '#0f172a' }); t.defs.forEach(d => { if (d.style && d.style.color === '#333') d.style.color = '#cbd5e1'; }); return t; } },
    { name: 'ATS Friendly', desc: 'Tarayıcı dostu', build: () => tplSingle({ accent: '#000000', heading: '#000000', muted: '#444', font: 'Open Sans', center: false }) },
    { name: 'Designer', desc: 'Turuncu vurgu', build: () => tplSidebar({ accent: '#ea580c', sidebar: '#1c1917', onSidebar: '#ffffff', onSidebarSoft: 'rgba(255,255,255,.8)', font: 'Montserrat' }) },
    { name: 'Developer', desc: 'Koyu + yeşil', build: () => { const t = tplSidebar({ accent: '#10b981', sidebar: '#0b1220', onSidebar: '#e6edf3', onSidebarSoft: 'rgba(230,237,243,.7)', font: 'Roboto' }); return t; } },
    { name: 'Academic', desc: 'Akademik lacivert', build: () => tplSingle({ accent: '#1e40af', heading: '#1e293b', muted: '#64748b', font: 'Lato', center: true }) },
  ];

  function applyTemplate(idx) {
    const t = TEMPLATES[idx].build();
    project.theme = t.theme; project.page = t.page;
    project.elements = inflate(t.defs, t.theme);
    selection.clear(); renderAll(); afterSelect(); syncThemeControls();
    commit();
  }

  function openGallery() {
    const grid = $('#templateGrid');
    grid.innerHTML = '';
    TEMPLATES.forEach((t, i) => {
      const card = document.createElement('div'); card.className = 'tpl-card';
      const thumb = document.createElement('div'); thumb.className = 'tpl-thumb';
      const mini = document.createElement('div'); mini.className = 'mini-page';
      const built = t.build();
      mini.style.background = built.page.bg;
      inflate(built.defs, built.theme).forEach(el => {
        const n = buildNode(el); n.style.pointerEvents = 'none'; mini.appendChild(n);
      });
      thumb.appendChild(mini);
      card.innerHTML = `<div class="tpl-meta"><div class="tn">${t.name}</div><div class="td">${t.desc}</div></div>`;
      card.insertBefore(thumb, card.firstChild);
      card.addEventListener('click', () => { applyTemplate(i); closeModal(); toast(t.name + ' uygulandı'); });
      grid.appendChild(card);
    });
    openModal('#galleryModal');
  }

  /* ========================= THEME CONTROLS SYNC ========================= */
  function syncThemeControls() {
    if (selection.size === 0) buildProperties();
  }

  /* ========================= KEYBOARD ========================= */
  document.addEventListener('keydown', e => {
    if (editingId) {
      if (e.key === 'Escape') { e.preventDefault(); $('#elements').focus(); finishEditing(); }
      return;
    }
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    const meta = e.ctrlKey || e.metaKey;
    if (meta && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
    else if (meta && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); }
    else if (meta && e.key.toLowerCase() === 'c') { e.preventDefault(); copySelection(); }
    else if (meta && e.key.toLowerCase() === 'v') { e.preventDefault(); pasteClipboard(); }
    else if (meta && e.key.toLowerCase() === 'd') { e.preventDefault(); duplicateSelection(); }
    else if (meta && e.key.toLowerCase() === 'a') { e.preventDefault(); selectAll(); }
    else if (e.key === 'Delete' || e.key === 'Backspace') { if (selection.size) { e.preventDefault(); deleteSelection(); } }
    else if (e.key === 'Escape') { clearSelect(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(e.shiftKey ? -10 : -1, 0); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); nudge(e.shiftKey ? 10 : 1, 0); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); nudge(0, e.shiftKey ? -10 : -1); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); nudge(0, e.shiftKey ? 10 : 1); }
    else if (e.key.toLowerCase() === 'g') { prefs.grid = !prefs.grid; applyPrefs(); savePrefs(); }
    else if (e.key.toLowerCase() === 's') { prefs.snap = !prefs.snap; applyPrefs(); savePrefs(); }
    else if (e.key.toLowerCase() === 'f') { toggleFullscreen(); }
  });

  window.addEventListener('scroll', positionQuickbar, true);
  window.addEventListener('resize', positionQuickbar);

  function status(t) { $('#sbInfo').textContent = t; }

  /* ========================= INIT ========================= */
  function init() {
    // prefs
    try { prefs = Object.assign(prefs, JSON.parse(localStorage.getItem(PREFS_KEY)) || {}); } catch (e) {}
    applyPrefs();

    // project — restore real saved work; otherwise seed with the owner's CV
    try { const saved = JSON.parse(localStorage.getItem(STORE_KEY)); if (saved && saved.elements && saved.elements.length) project = saved; } catch (e) {}
    if (!project) { project = seedProject(); }
    $('#projectName').value = project.name;

    buildLibrary('');
    setZoom(1);
    renderAll();
    buildProperties();
    pushHistory();
    updateUndoRedo();
    setSaved('saved');

    // if somehow empty, offer template gallery
    if (!project.elements.length) setTimeout(openGallery, 400);
  }

  if (window.QRCode || true) init();
})();
