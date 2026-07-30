/* Instagram Story export — 1080×1920 PNG */

window.IG_STORY_APPS = {
  kuberush: {
    slug: 'kuberush',
    name: 'Kube Rush',
    tag: 'Casual · Hypercasual',
    emoji: '🎮',
    icon: '/assets/apps/kuberush.png',
    tagline: 'Tek elle oyna. Küpü büyüt, engellerden geç.',
    taglineEn: 'One-hand runner. Grow, dodge, win.',
    platforms: 'Android · iOS',
    android: 'https://play.google.com/store/apps/details?id=com.dogusipeksac.kuberush',
    ios: 'https://apps.apple.com/us/app/kube-rush/id6790684293',
    colors: ['#a3e635', '#65a30d', '#0a0a0f'],
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
    android: 'https://play.google.com/store/apps/details?id=com.product.mydiary',
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
    android: 'https://play.google.com/store/apps/details?id=com.product.appplakakontrol',
    ios: 'https://apps.apple.com/us/app/app-plaka-kontrol/id6760252433',
    colors: ['#0891b2', '#06b6d4', '#0a0a0f'],
    file: 'app-plaka-story'
  },
  aniyakala: {
    slug: 'aniyakala',
    name: 'Anı Yakala',
    tag: 'Photo · Location',
    emoji: '📸',
    icon: '/assets/apps/aniyakala.png',
    tagline: 'Konum ve tarih damgalı anılar.',
    taglineEn: 'Moments stamped with place & time.',
    platforms: 'Android · iOS',
    android: 'https://play.google.com/store/apps/details?id=com.dogusipeksac.capturethemoment',
    ios: 'https://apps.apple.com/us/app/an%C4%B1-yakala/id6764663335',
    colors: ['#22d3ee', '#fb7185', '#0b1220'],
    file: 'ani-yakala-story'
  },
  suicme: {
    slug: 'suicme',
    name: 'Su İçme Hatırlatıcısı',
    tag: 'Health · Wellness',
    emoji: '💧',
    icon: '/assets/apps/suicme.png',
    tagline: 'Günlük su hedefini takip et, hatırlatıcı al.',
    taglineEn: 'Track your daily water goal.',
    platforms: 'Android · iOS',
    android: 'https://play.google.com/store/apps/details?id=com.dogusipeksac.dailyhydrate',
    ios: 'https://apps.apple.com/us/app/su-i-%C3%A7me-hat%C4%B1rlatmac%C4%B1s%C4%B1/id6764664946',
    colors: ['#38bdf8', '#1d4ed8', '#0c1929'],
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

  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = reject;
      img.src = src;
    });
  }

  function makeQrDataUrl(text, size) {
    if (typeof qrcode !== 'function') return null;
    var qr = qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    var count = qr.getModuleCount();
    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    var margin = Math.floor(size * 0.06);
    var cell = (size - margin * 2) / count;
    ctx.fillStyle = '#000000';
    for (var r = 0; r < count; r++) {
      for (var c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillRect(margin + c * cell, margin + r * cell, cell + 0.5, cell + 0.5);
        }
      }
    }
    return canvas.toDataURL('image/png');
  }

  function loadQr(text) {
    var dataUrl = makeQrDataUrl(text, 280);
    if (!dataUrl) return Promise.reject(new Error('qrcode lib missing'));
    return loadImage(dataUrl);
  }

  function drawIcon(ctx, app, ix, iy, size) {
    var half = size / 2;
    if (app._iconImg) {
      roundRect(ctx, ix - half, iy - half, size, size, size * 0.22);
      ctx.save();
      ctx.clip();
      ctx.drawImage(app._iconImg, ix - half, iy - half, size, size);
      ctx.restore();
      roundRect(ctx, ix - half, iy - half, size, size, size * 0.22);
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 4;
      ctx.stroke();
      return;
    }
    var c0 = app.colors[0];
    var c1 = app.colors[1];
    var ir = half;
    var ig = ctx.createLinearGradient(ix - ir, iy - ir, ix + ir, iy + ir);
    ig.addColorStop(0, c0);
    ig.addColorStop(1, c1);
    ctx.fillStyle = ig;
    ctx.beginPath();
    ctx.arc(ix, iy, ir, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = Math.round(size * 0.42) + 'px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(app.emoji, ix, iy + 8);
  }

  function drawQrCard(ctx, x, y, w, h, label, img, accent, qrSize) {
    roundRect(ctx, x, y, w, h, 28);
    ctx.fillStyle = 'rgba(255,255,255,0.96)';
    ctx.fill();
    ctx.strokeStyle = accent + 'aa';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = '800 ' + (qrSize > 220 ? 32 : 28) + 'px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(label, x + w / 2, y + (qrSize > 220 ? 56 : 48));

    var qs = qrSize || 200;
    var qx = x + (w - qs) / 2;
    var qy = y + (qrSize > 220 ? 88 : 70);
    roundRect(ctx, qx - 8, qy - 8, qs + 16, qs + 16, 16);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    if (img) {
      ctx.drawImage(img, qx, qy, qs, qs);
    } else {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(qx, qy, qs, qs);
    }
  }

  function drawStory(app, lang, platform) {
    platform = platform || 'both';
    var canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');
    var c0 = app.colors[0];
    var c1 = app.colors[1];
    var bg = app.colors[2];

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    var g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, c0 + '55');
    g.addColorStop(0.45, c1 + '28');
    g.addColorStop(1, bg);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = c0 + '33';
    ctx.beginPath();
    ctx.arc(180, 280, 200, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c1 + '28';
    ctx.beginPath();
    ctx.arc(920, 1600, 260, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '600 28px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('dogusipeksac.com', W / 2, 180);

    drawIcon(ctx, app, W / 2, 380, 220);

    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = c0;
    ctx.font = '700 24px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(app.tag.toUpperCase(), W / 2, 560);

    ctx.fillStyle = '#f8fafc';
    ctx.font = '800 68px "Plus Jakarta Sans", system-ui, sans-serif';
    var nameLines = wrapText(ctx, app.name, 900);
    var ny = 640;
    nameLines.forEach(function (ln, i) {
      ctx.fillText(ln, W / 2, ny + i * 76);
    });
    ny += nameLines.length * 76 + 16;

    ctx.fillStyle = 'rgba(241,240,255,0.72)';
    ctx.font = '500 32px "Plus Jakarta Sans", system-ui, sans-serif';
    var tagline = lang === 'en' ? app.taglineEn : app.tagline;
    var tLines = wrapText(ctx, tagline, 860);
    tLines.forEach(function (ln, i) {
      ctx.fillText(ln, W / 2, ny + i * 42);
    });
    ny += tLines.length * 42 + 40;

    // QR section
    var cards = [];
    if (platform === 'both' || platform === 'android') {
      if (app.android) cards.push({ label: 'Android', img: app._qrAndroid, accent: '#34d399' });
    }
    if (platform === 'both' || platform === 'ios') {
      if (app.ios) cards.push({ label: 'iOS', img: app._qrIos, accent: '#94a3b8' });
    }

    var single = cards.length === 1;
    var cardW = single ? 520 : 400;
    var cardH = single ? 420 : 320;
    var qrSize = single ? 280 : 200;
    var gap = 40;
    var totalW = cards.length * cardW + (cards.length - 1) * gap;
    var startX = (W - totalW) / 2;
    var qrY = Math.max(ny + 20, single ? 940 : 980);

    ctx.fillStyle = '#f8fafc';
    ctx.font = '800 36px "Plus Jakarta Sans", system-ui, sans-serif';
    var sectionTitle;
    if (platform === 'android') {
      sectionTitle = lang === 'en' ? 'Get it on Google Play' : 'Google Play\'den indir';
    } else if (platform === 'ios') {
      sectionTitle = lang === 'en' ? 'Get it on the App Store' : 'App Store\'dan indir';
    } else {
      sectionTitle = lang === 'en' ? 'Scan to download' : 'QR ile indir';
    }
    ctx.fillText(sectionTitle, W / 2, qrY - 30);

    cards.forEach(function (card, i) {
      drawQrCard(ctx, startX + i * (cardW + gap), qrY, cardW, cardH, card.label, card.img, card.accent, qrSize);
    });

    var hintY = qrY + cardH + 70;
    ctx.fillStyle = 'rgba(241,240,255,0.55)';
    ctx.font = '500 26px "Plus Jakarta Sans", system-ui, sans-serif';
    var hint;
    if (platform === 'android') {
      hint = lang === 'en'
        ? 'Add Play Store link with Instagram link sticker'
        : 'Link sticker ile Play Store bağlantısını ekle';
    } else if (platform === 'ios') {
      hint = lang === 'en'
        ? 'Add App Store link with Instagram link sticker'
        : 'Link sticker ile App Store bağlantısını ekle';
    } else {
      hint = lang === 'en'
        ? 'Or pick Android / iOS story for a single store link sticker'
        : 'Tek link sticker için Android veya iOS story de indirebilirsin';
    }
    wrapText(ctx, hint, 820).forEach(function (ln, i) {
      ctx.fillText(ln, W / 2, hintY + i * 36);
    });

    return canvas;
  }

  function ensureAssets(app) {
    var tasks = [];
    if (app.icon && !app._iconImg) {
      tasks.push(loadImage(app.icon).then(function (img) { app._iconImg = img; }).catch(function () {}));
    }
    if (app.android && !app._qrAndroid) {
      tasks.push(loadQr(app.android).then(function (img) { app._qrAndroid = img; }).catch(function () {}));
    }
    if (app.ios && !app._qrIos) {
      tasks.push(loadQr(app.ios).then(function (img) { app._qrIos = img; }).catch(function () {}));
    }
    return Promise.all(tasks).then(function () { return app; });
  }

  function downloadCanvas(canvas, filename) {
    try {
      var a = document.createElement('a');
      a.download = filename + '.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    } catch (err) {
      console.error(err);
      alert('PNG indirilemedi. Sayfayı yenileyip tekrar dene.');
    }
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
    download: function (slug, lang, platform) {
      var app = window.IG_STORY_APPS[slug];
      if (!app) return Promise.resolve();
      lang = lang || 'tr';
      platform = platform || 'both';
      return ensureAssets(app).then(function () {
        var canvas = drawStory(app, lang, platform);
        var suffix = platform === 'both' ? '' : '-' + platform;
        downloadCanvas(canvas, app.file + '-' + lang + suffix);
        return canvas;
      });
    },
    preview: function (slug, lang, host, platform) {
      var app = window.IG_STORY_APPS[slug];
      if (!app) return Promise.resolve();
      platform = platform || 'both';
      return ensureAssets(app).then(function () {
        var canvas = drawStory(app, lang || 'tr', platform);
        renderPreview(canvas, host);
        return canvas;
      });
    }
  };
})();
