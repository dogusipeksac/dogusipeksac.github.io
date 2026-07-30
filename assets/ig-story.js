/* Instagram Story export — 1080×1920 PNG */

window.IG_STORY_APPS = {
  kuberush: {
    slug: 'kuberush',
    name: 'Kube Rush',
    tag: 'Casual · Hypercasual',
    emoji: '🎮',
    tagline: 'Tek elle oyna. Küpü büyüt, engellerden geç.',
    taglineEn: 'One-hand runner. Grow, dodge, win.',
    platforms: 'Android · iOS',
    colors: ['#6366f1', '#ec4899', '#0a0a0f'],
    file: 'kube-rush-story'
  },
  mydiary: {
    slug: 'mydiary',
    name: 'My Diary',
    tag: 'Productivity · Journal',
    emoji: '📔',
    tagline: 'Notlar, ses, fotoğraf ve PDF — kişisel günlüğün.',
    taglineEn: 'Notes, voice, photos & PDF — your journal.',
    platforms: 'Android',
    colors: ['#7c3aed', '#a855f7', '#0a0a0f'],
    file: 'my-diary-story'
  },
  appplaka: {
    slug: 'appplaka',
    name: 'App Plaka Kontrol',
    tag: 'Utilities · AI',
    emoji: '🚗',
    tagline: 'Türkiye plakalarını saniyeler içinde oku.',
    taglineEn: 'Read Turkish plates in seconds.',
    platforms: 'Android · iOS',
    colors: ['#0891b2', '#06b6d4', '#0a0a0f'],
    file: 'app-plaka-story'
  },
  aniyakala: {
    slug: 'aniyakala',
    name: 'Anı Yakala',
    tag: 'Photo · Location',
    emoji: '📸',
    tagline: 'Konum ve tarih damgalı anılar.',
    taglineEn: 'Moments stamped with place & time.',
    platforms: 'Android · iOS',
    colors: ['#f59e0b', '#ef4444', '#0a0a0f'],
    file: 'ani-yakala-story'
  },
  suicme: {
    slug: 'suicme',
    name: 'Su İçme Hatırlatıcısı',
    tag: 'Health · Wellness',
    emoji: '💧',
    tagline: 'Günlük su hedefini takip et, hatırlatıcı al.',
    taglineEn: 'Track your daily water goal.',
    platforms: 'Android · iOS',
    colors: ['#0ea5e9', '#2563eb', '#0a0a0f'],
    file: 'su-icme-story'
  }
};

(function () {
  'use strict';

  var W = 1080;
  var H = 1920;

  function roundRect(ctx, x, y, w, h, r) {
    var rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  function wrapText(ctx, text, maxWidth) {
    var words = text.split(' ');
    var lines = [];
    var line = '';
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + ' ' + words[i] : words[i];
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = words[i];
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function drawStory(app, lang) {
    var canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');
    var c0 = app.colors[0];
    var c1 = app.colors[1];
    var bg = app.colors[2];

    // Background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    var g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, c0 + '55');
    g.addColorStop(0.45, c1 + '28');
    g.addColorStop(1, bg);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Soft orbs
    ctx.fillStyle = c0 + '33';
    ctx.beginPath();
    ctx.arc(180, 320, 220, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c1 + '28';
    ctx.beginPath();
    ctx.arc(920, 1480, 280, 0, Math.PI * 2);
    ctx.fill();

    // Top brand
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '600 28px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('dogusipeksac.com', W / 2, 220);

    // App icon circle
    var ix = W / 2;
    var iy = 480;
    var ir = 140;
    var ig = ctx.createLinearGradient(ix - ir, iy - ir, ix + ir, iy + ir);
    ig.addColorStop(0, c0);
    ig.addColorStop(1, c1);
    ctx.fillStyle = ig;
    ctx.beginPath();
    ctx.arc(ix, iy, ir, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.arc(ix, iy + 8, ir, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = ig;
    ctx.beginPath();
    ctx.arc(ix, iy, ir, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '120px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(app.emoji, ix, iy + 8);

    // Tag
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = c1;
    ctx.font = '700 26px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(app.tag.toUpperCase(), W / 2, 700);

    // Name
    ctx.fillStyle = '#f8fafc';
    ctx.font = '800 78px "Plus Jakarta Sans", system-ui, sans-serif';
    var nameLines = wrapText(ctx, app.name, 860);
    var ny = 800;
    nameLines.forEach(function (ln, i) {
      ctx.fillText(ln, W / 2, ny + i * 88);
    });
    ny += nameLines.length * 88 + 24;

    // Tagline
    ctx.fillStyle = 'rgba(241,240,255,0.72)';
    ctx.font = '500 36px "Plus Jakarta Sans", system-ui, sans-serif';
    var tagline = lang === 'en' ? app.taglineEn : app.tagline;
    var tLines = wrapText(ctx, tagline, 820);
    tLines.forEach(function (ln, i) {
      ctx.fillText(ln, W / 2, ny + i * 48);
    });
    ny += tLines.length * 48 + 60;

    // Platform pill
    var plat = app.platforms;
    ctx.font = '700 28px "Plus Jakarta Sans", system-ui, sans-serif';
    var pw = ctx.measureText(plat).width + 64;
    var px = (W - pw) / 2;
    var py = Math.max(ny, 1080);
    roundRect(ctx, px, py, pw, 64, 32);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(plat, W / 2, py + 42);

    // Link sticker zone hint (bottom safe area)
    var boxY = 1420;
    roundRect(ctx, 120, boxY, W - 240, 280, 28);
    ctx.fillStyle = 'rgba(28,28,40,0.85)';
    ctx.fill();
    ctx.strokeStyle = c0 + '99';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.font = '800 40px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(lang === 'en' ? 'Download now' : 'Hemen indir', W / 2, boxY + 90);

    ctx.fillStyle = 'rgba(241,240,255,0.7)';
    ctx.font = '500 28px "Plus Jakarta Sans", system-ui, sans-serif';
    var hint = lang === 'en'
      ? 'Add your store link with Instagram Link sticker'
      : 'Instagram bağlantı sticker ile mağaza linkini ekle';
    wrapText(ctx, hint, 760).forEach(function (ln, i) {
      ctx.fillText(ln, W / 2, boxY + 150 + i * 40);
    });

    // Bottom mark
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '600 24px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText('1080 × 1920 · Instagram Story', W / 2, 1850);

    return canvas;
  }

  function downloadCanvas(canvas, filename) {
    var a = document.createElement('a');
    a.download = filename + '.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  }

  function renderPreview(canvas, host) {
    if (!host) return;
    host.innerHTML = '';
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    canvas.style.display = 'block';
    canvas.style.borderRadius = '18px';
    canvas.style.boxShadow = '0 20px 60px rgba(0,0,0,0.45)';
    host.appendChild(canvas);
  }

  window.IgStory = {
    apps: window.IG_STORY_APPS,
    draw: drawStory,
    download: function (slug, lang) {
      var app = window.IG_STORY_APPS[slug];
      if (!app) return;
      lang = lang || 'tr';
      var canvas = drawStory(app, lang);
      downloadCanvas(canvas, app.file + '-' + lang);
      return canvas;
    },
    preview: function (slug, lang, host) {
      var app = window.IG_STORY_APPS[slug];
      if (!app) return;
      var canvas = drawStory(app, lang || 'tr');
      renderPreview(canvas, host);
      return canvas;
    }
  };
})();
