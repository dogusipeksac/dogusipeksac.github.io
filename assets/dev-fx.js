/* ==========================================================================
   DOGUS IPEKSAC — 3D HOMOGRAPHY PORTAL, SPLASH STAGE & STACKED SCROLL ENGINE
   ========================================================================== */
(function () {
  'use strict';

  var VW0 = window.innerWidth, VH0 = window.innerHeight;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var LOW = window.matchMedia('(max-width: 900px), (pointer: coarse)').matches;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function clamp(v, a, b) {
    if (a === undefined) a = 0;
    if (b === undefined) b = 1;
    return Math.min(b, Math.max(a, v));
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function eo3(t) { return 1 - Math.pow(1 - t, 3); }
  function ei3(t) { return t * t * t; }
  function eio3(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function seg(p, a, b, e) {
    var fn = e || function (x) { return x; };
    return fn(clamp((p - a) / (b - a)));
  }
  function st(e, k, v) {
    if (!e) return;
    var c = e._c || (e._c = {});
    if (c[k] !== v) {
      c[k] = v;
      e.style[k] = v;
    }
  }

  var SW = LOW ? 640 : 1280, SH = LOW ? 400 : 800;
  var KA = LOW ? 0.5 : 1;
  var stageSmoothP = 0, aboutSmoothP = 0, appsSmoothP = 0, skillsSmoothP = 0, webSmoothP = 0;
  if (LOW) document.documentElement.classList.add('fx-low');

  /* ========================================================================
     1. 8x8 PROJECTIVE HOMOGRAPHY SOLVER -> CSS matrix3d
     ======================================================================== */
  function solveH(src, dst) {
    var A = [], b = [];
    for (var i = 0; i < 4; i++) {
      var x = src[i][0], y = src[i][1], u = dst[i][0], v = dst[i][1];
      A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
      b.push(u);
      A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
      b.push(v);
    }
    var n = 8;
    for (var j = 0; j < n; j++) {
      var m = j;
      for (var r = j + 1; r < n; r++) {
        if (Math.abs(A[r][j]) > Math.abs(A[m][j])) m = r;
      }
      var tmpA = A[j]; A[j] = A[m]; A[m] = tmpA;
      var tmpB = b[j]; b[j] = b[m]; b[m] = tmpB;
      for (var r2 = j + 1; r2 < n; r2++) {
        var f = A[r2][j] / A[j][j];
        for (var c = j; c < n; c++) A[r2][c] -= f * A[j][c];
        b[r2] -= f * b[j];
      }
    }
    var h = new Array(n);
    for (var k = n - 1; k >= 0; k--) {
      var s = b[k];
      for (var c2 = k + 1; c2 < n; c2++) s -= A[k][c2] * h[c2];
      h[k] = s / A[k][k];
    }
    return h;
  }

  function css3d(h) {
    return 'matrix3d(' +
      h[0] + ',' + h[3] + ',0,' + h[6] + ',' +
      h[1] + ',' + h[4] + ',0,' + h[7] + ',' +
      '0,0,1,0,' +
      h[2] + ',' + h[5] + ',0,1)';
  }

  function applyH(h, pt) {
    var x = pt[0], y = pt[1];
    var w = h[6] * x + h[7] * y + 1;
    return [(h[0] * x + h[1] * y + h[2]) / w, (h[3] * x + h[4] * y + h[5]) / w];
  }

  var SRC = [[0, 0], [SW, 0], [SW, SH], [0, SH]];
  function placeScreen(e, q) {
    st(e, 'transform', css3d(solveH(SRC, q)));
  }
  function mixQuad(a, b, t) {
    return a.map(function (p, i) {
      return [lerp(p[0], b[i][0], t), lerp(p[1], b[i][1], t)];
    });
  }
  function centroid(q) {
    return [
      q.reduce(function (s, p) { return s + p[0]; }, 0) / 4,
      q.reduce(function (s, p) { return s + p[1]; }, 0) / 4
    ];
  }

  /* ========================================================================
     2. HIGH-PRECISION 3D VECTOR HARDWARE GENERATORS (0ms Load, Sub-Pixel Fit)
     ======================================================================== */
  function svgToDataUrl(svg) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function buildMacBookFullSVG() {
    /* 2200 x 1774 coordinate space matching A.lid & A.scr */
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2200 1774" width="2200" height="1774">' +
      '<defs>' +
      '<linearGradient id="lidRim" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#434d59"/>' +
      '<stop offset="45%" stop-color="#222830"/>' +
      '<stop offset="100%" stop-color="#14181e"/>' +
      '</linearGradient>' +
      '<linearGradient id="lidFace" x1="0%" y1="0%" x2="0%" y2="100%">' +
      '<stop offset="0%" stop-color="#141920"/>' +
      '<stop offset="100%" stop-color="#0b0e13"/>' +
      '</linearGradient>' +
      '<linearGradient id="deckTop" x1="15%" y1="0%" x2="85%" y2="100%">' +
      '<stop offset="0%" stop-color="#2d353f"/>' +
      '<stop offset="55%" stop-color="#1d232b"/>' +
      '<stop offset="100%" stop-color="#12161c"/>' +
      '</linearGradient>' +
      '<linearGradient id="deckSide" x1="0%" y1="0%" x2="100%" y2="0%">' +
      '<stop offset="0%" stop-color="#151a20"/>' +
      '<stop offset="40%" stop-color="#38424e"/>' +
      '<stop offset="75%" stop-color="#1e242c"/>' +
      '<stop offset="100%" stop-color="#0e1217"/>' +
      '</linearGradient>' +
      '<linearGradient id="cuGlow" x1="0%" y1="0%" x2="100%" y2="0%">' +
      '<stop offset="0%" stop-color="#d4884a" stop-opacity="0.1"/>' +
      '<stop offset="50%" stop-color="#f6c08a" stop-opacity="0.55"/>' +
      '<stop offset="100%" stop-color="#a855f7" stop-opacity="0.15"/>' +
      '</linearGradient>' +
      '<filter id="dropSh" x="-10%" y="-10%" width="120%" height="130%">' +
      '<feGaussianBlur stdDeviation="28"/>' +
      '</filter>' +
      '</defs>' +
      /* Ambient shadow under base */
      '<polygon points="290,1040 1630,905 2040,1360 560,1595" fill="rgba(0,0,0,0.72)" filter="url(#dropSh)"/>' +
      /* Base Chassis Front/Side Thickness */
      '<polygon points="334,1020 1598,890 1995,1310 1990,1352 595,1562 325,1055" fill="url(#deckSide)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>' +
      /* Base Top Deck */
      '<polygon points="334,1020 1598,890 1995,1310 595,1522" fill="url(#deckTop)" stroke="rgba(246,192,138,0.28)" stroke-width="2.5"/>' +
      /* Hinge Cylinder */
      '<polygon points="415,1008 1510,896 1532,922 435,1035" fill="#0d1015" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>' +
      /* Backlit Keyboard Well */
      '<polygon points="415,1055 1575,935 1775,1150 585,1305" fill="#0d1117" stroke="rgba(246,192,138,0.22)" stroke-width="2"/>' +
      '<polygon points="430,1066 1560,948 1748,1140 600,1288" fill="none" stroke="url(#cuGlow)" stroke-width="3" stroke-dasharray="28 10"/>' +
      /* Keyboard Row Lines */
      '<line x1="460" y1="1098" x2="1605" y2="980" stroke="rgba(255,255,255,0.12)" stroke-width="14" stroke-dasharray="32 10"/>' +
      '<line x1="495" y1="1138" x2="1645" y2="1018" stroke="rgba(255,255,255,0.12)" stroke-width="14" stroke-dasharray="36 10"/>' +
      '<line x1="530" y1="1178" x2="1685" y2="1056" stroke="rgba(255,255,255,0.12)" stroke-width="14" stroke-dasharray="34 10"/>' +
      '<line x1="565" y1="1218" x2="1720" y2="1094" stroke="rgba(246,192,138,0.18)" stroke-width="14" stroke-dasharray="40 12"/>' +
      '<line x1="600" y1="1256" x2="1750" y2="1130" stroke="rgba(255,255,255,0.14)" stroke-width="14" stroke-dasharray="65 14"/>' +
      /* Force Touch Trackpad */
      '<polygon points="885,1278 1345,1218 1445,1345 975,1415" fill="#171d26" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>' +
      /* Front Lip Notch */
      '<polygon points="1165,1434 1345,1407 1352,1425 1172,1452" fill="#0b0e12" stroke="rgba(246,192,138,0.35)" stroke-width="1.5"/>' +
      /* Lid Outer Metallic Bezel (matches A.lid: [511,0],[1850,16],[1598,890],[334,1020]) */
      '<polygon points="511,0 1850,16 1598,890 334,1020" fill="url(#lidRim)" stroke="rgba(246,192,138,0.42)" stroke-width="3"/>' +
      '<polygon points="522,12 1836,27 1590,880 346,1008" fill="url(#lidFace)" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>' +
      /* Screen Inner Frame (matches A.scr: [548,46],[1822,50],[1580,842],[378,962]) */
      '<polygon points="548,46 1822,50 1580,842 378,962" fill="#090c10" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>' +
      /* Camera Notch on Lid Top Edge */
      '<polygon points="1125,24 1265,25 1255,54 1117,53" fill="#06080b" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>' +
      '<circle cx="1190" cy="39" r="5" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>' +
      '<circle cx="1212" cy="39" r="3" fill="#10b981"/>' +
      '</svg>';
    return svgToDataUrl(svg);
  }

  function buildAngledPhoneSVG(w, h, scrQuad, accentColor, isPair) {
    function expandQuad(q, pad) {
      var c = centroid(q);
      return q.map(function (p) {
        return [c[0] + (p[0] - c[0]) * pad, c[1] + (p[1] - c[1]) * pad];
      });
    }
    function polyPts(q) {
      return q.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
    }
    var quads = isPair ? scrQuad : [scrQuad[0]];
    var bodies = quads.map(function (q, idx) {
      var outer = expandQuad(q, 1.085);
      var rim = expandQuad(q, 1.05);
      var side = outer.map(function (p) { return [p[0] + (idx === 0 ? -18 : 18), p[1] + 22]; });
      var topMidX = (q[0][0] + q[1][0]) / 2;
      var topMidY = (q[0][1] + q[1][1]) / 2;
      var dx = (q[1][0] - q[0][0]) * 0.12;
      var dy = (q[1][1] - q[0][1]) * 0.12;
      var nx = -(q[1][1] - q[0][1]) * 0.032;
      var ny = (q[1][0] - q[0][0]) * 0.032;
      return (
        /* 3D Titanium Side Extrusion */
        '<polygon points="' + polyPts(side) + '" fill="#10151c" stroke="rgba(246,192,138,0.28)" stroke-width="2"/>' +
        /* Outer Titanium Frame */
        '<polygon points="' + polyPts(outer) + '" fill="url(#phMetal)" stroke="' + accentColor + '" stroke-width="3.5"/>' +
        /* Inner Glass Bezel */
        '<polygon points="' + polyPts(rim) + '" fill="#0b0f14" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>' +
        /* Screen Quad */
        '<polygon points="' + polyPts(q) + '" fill="#090c10"/>' +
        /* Dynamic Island / Camera Pill */
        '<line x1="' + (topMidX - dx + nx).toFixed(1) + '" y1="' + (topMidY - dy + ny).toFixed(1) +
        '" x2="' + (topMidX + dx + nx).toFixed(1) + '" y2="' + (topMidY + dy + ny).toFixed(1) +
        '" stroke="#040608" stroke-width="18" stroke-linecap="round"/>'
      );
    }).join('');

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '">' +
      '<defs>' +
      '<linearGradient id="phMetal" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#485362"/>' +
      '<stop offset="45%" stop-color="#222933"/>' +
      '<stop offset="100%" stop-color="#11161c"/>' +
      '</linearGradient>' +
      '</defs>' +
      bodies +
      '</svg>';
    return svgToDataUrl(svg);
  }

  /* ========================================================================
     3. STAGE SETUP & GEOMETRY (Exact Homography + Portal + Falling Phones)
     ======================================================================== */
  var stageEl = $('#stage');
  var stageTrack = $('#hero');
  if (stageEl && stageTrack) {
    var A = {
      w: 2200,
      h: 1774,
      scr: [[548, 46], [1822, 50], [1580, 842], [378, 962]],
      lid: [[511, 0], [1850, 16], [1598, 890], [334, 1020]]
    };
    if (KA !== 1) {
      A.w *= KA;
      A.h *= KA;
      A.scr = A.scr.map(function (p) { return [p[0] * KA, p[1] * KA]; });
      A.lid = A.lid.map(function (p) { return [p[0] * KA, p[1] * KA]; });
    }
    A.sc = centroid(A.scr);

    var el = {
      stage: stageEl,
      sceneA: $('#sceneA'),
      sceneB: $('#sceneB'),
      worldA: $('#worldA'),
      water: $('#water'),
      base: $('#macBase'),
      lid: $('#macLid'),
      shade: $('#lidShade'),
      scrA: $('#scrA'),
      fullA: $('#fullA'),
      hero: $('#heroCopy'),
      word: $('#bgWord'),
      black: $('#blackout'),
      flash: $('#flash'),
      hint: $('#hint'),
      rings: $$('#rings i'),
      glow2: $('#portalGlow'),
      cv: $('#drops'),
      glow: $('.stage-glow'),
      vsBtns: $$('#stageSwitch .vs-btn')
    };

    var macUrl = buildMacBookFullSVG();
    if (el.base) el.base.src = macUrl;
    if (el.lid) el.lid.src = macUrl;

    function stamp(tplSel) {
      var tpl = $(tplSel);
      if (!tpl) return;
      for (var i = 1; i < arguments.length; i++) {
        var target = arguments[i];
        if (target) target.appendChild(tpl.content.cloneNode(true));
      }
    }
    stamp('#tplA', el.scrA, el.fullA);

    var inA = [el.scrA, el.fullA].map(function (e) { return $('.sc-in', e); });
    el.scrAin = inA[0];
    var pagesA = $$('.pg', inA[0]).length;

    if (KA !== 1) {
      [el.base, el.lid, el.shade].forEach(function (e) {
        if (!e) return;
        e.style.width = A.w + 'px';
        e.style.height = A.h + 'px';
      });
      if (el.shade) {
        el.shade.style.clipPath = 'polygon(' + A.lid.map(function (p) { return p[0] + 'px ' + p[1] + 'px'; }).join(',') + ')';
      }
    }
    if (el.base) {
      el.base.style.clipPath = 'path(evenodd,"M0 0H' + A.w + 'V' + A.h + 'H0Z M' + A.lid.map(function (p) { return p.join(' '); }).join('L') + 'Z")';
    }
    if (el.lid) {
      el.lid.style.clipPath = 'polygon(' + A.lid.map(function (p) { return p[0] + 'px ' + p[1] + 'px'; }).join(',') + ')';
    }

    var vw = VW0, vh = VH0, portrait = false, dpr = 1;
    var ctx = el.cv ? el.cv.getContext('2d') : null;
    var firstMeasure = true, lastKey = '';

    function measure() {
      if (!firstMeasure) {
        vw = window.innerWidth;
        vh = window.innerHeight;
      }
      firstMeasure = false;
      portrait = vw < vh * 0.9;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      if (el.cv) {
        el.cv.width = vw * dpr;
        el.cv.height = vh * dpr;
      }
      lastKey = '';
    }

    /* Splash Droplets Physics */
    function mulberry(a) {
      return function () {
        a |= 0;
        a = (a + 0x6D2B79F5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    var rnd = mulberry(11);
    var DROPS = Array.from({ length: 130 }, function () {
      var a = -Math.PI * (0.07 + rnd() * 0.86);
      var sp = 500 + rnd() * 1500;
      return {
        vx: Math.cos(a) * sp * (0.6 + rnd() * 0.6),
        vy: Math.sin(a) * sp,
        ox: (rnd() - 0.5) * 0.34,
        r: 0.9 + rnd() * 2.6,
        cu: rnd() < 0.25,
        life: 1 + rnd() * 1.2
      };
    });
    var dropsDirty = false;

    function drawDrops(it, hx, hy) {
      if (!ctx) return;
      var live = it > 0 && it < 1;
      if (!live && !dropsDirty) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);
      dropsDirty = live;
      if (!live) return;
      var t = it * 2.6;
      var k = Math.max(0.5, Math.min(vw, vh * 1.5) / 1700);
      ctx.lineCap = 'round';
      for (var i = 0; i < DROPS.length; i++) {
        var d = DROPS[i];
        if (t > d.life * 1.5) continue;
        var x = hx + d.ox * vw + d.vx * t * k;
        var y = hy + (d.vy * t + 0.5 * 2000 * t * t) * k;
        var vy = d.vy + 2000 * t;
        var a = 1 - t / (d.life * 1.5);
        ctx.strokeStyle = d.cu ? 'rgba(246,192,138,' + a + ')' : 'rgba(220,210,255,' + (a * 0.9) + ')';
        ctx.lineWidth = d.r * k * 1.2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - d.vx * k * 0.02, y - vy * k * 0.02);
        ctx.stroke();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.arc(x, y, d.r * k * 0.9, 0, 6.3);
        ctx.fill();
      }
    }

    function setScroll(sc, pages) {
      var t = 'translateY(' + (-sc * (pages - 1) / pages * 100) + '%)';
      inA.forEach(function (e) { st(e, 'transform', t); });
    }

    var intro = { v: 0 };
    var lastHh = -1, Hl = null;
    function vpRect() { return [[0, 0], [vw, 0], [vw, vh], [0, vh]]; }
    function polyStr(q) {
      return 'polygon(' + q.map(function (p) { return p[0].toFixed(1) + 'px ' + p[1].toFixed(1) + 'px'; }).join(',') + ')';
    }

    /* Render Act 1: 3D Laptop Lid Opening + Homography Screen + Full-Viewport Portal */
    function renderA(p) {
      var enter = Math.max(intro.v, seg(p, 0, 0.07, eo3));
      var open = Math.max(seg(intro.v, 0.35, 1, eo3), seg(p, 0.03, 0.12, eo3));
      var on = Math.max(seg(intro.v, 0.72, 1), seg(p, 0.1, 0.16));
      var zoom = seg(p, 0.24, 0.41, eio3);
      var portal = seg(p, 0.41, 0.5, eo3);

      var S0 = Math.min(0.58 * vh / A.h, 0.88 * vw / A.w);
      var S = S0 * lerp(0.82, 1, enter) * (1 + 0.04 * seg(p, 0.06, 0.24)) * (1 + 0.32 * zoom);
      var pv = [lerp(A.w / 2, A.sc[0], zoom), lerp(A.h / 2 + 30 * KA, A.sc[1], zoom)];
      var oy = 0.16 * (1 - seg(p, 0.08, 0.24, eo3)) + (1 - enter) * 0.42;
      var tx = vw / 2 - pv[0] * S;
      var ty = vh * (0.52 + oy) - pv[1] * S;

      st(el.worldA, 'transform', 'translate(' + tx.toFixed(2) + 'px,' + ty.toFixed(2) + 'px) scale(' + S.toFixed(5) + ')');
      st(el.worldA, 'opacity', (enter * (1 - seg(portal, 0.35, 1))).toFixed(3));
      st(el.sceneA, 'visibility', portal >= 1 ? 'hidden' : 'visible');

      var hh = lerp(0.035, 1, open);
      if (hh !== lastHh) {
        lastHh = hh;
        var a = A.lid[0], b = A.lid[1], c = A.lid[2], d = A.lid[3];
        Hl = solveH(A.lid, [
          [d[0] + (a[0] - d[0]) * hh, d[1] + (a[1] - d[1]) * hh],
          [c[0] + (b[0] - c[0]) * hh, c[1] + (b[1] - c[1]) * hh],
          c,
          d
        ]);
        var m = css3d(Hl);
        st(el.lid, 'transform', m);
        st(el.shade, 'transform', m);
        st(el.shade, 'opacity', ((1 - open) * 0.6).toFixed(3));
      }

      var toVp = function (pt) { return [tx + pt[0] * S, ty + pt[1] * S]; };
      var quad = A.scr.map(function (pt) { return toVp(applyH(Hl, pt)); });
      placeScreen(el.scrA, quad);
      st(el.scrA, 'opacity', portal > 0 ? '0' : enter.toFixed(3));
      st(el.scrAin, 'opacity', on.toFixed(3));

      var steps = Math.max(1, pagesA - 1);
      var sc = seg(p, 0.15, 0.7) * steps;
      var sf = Math.min(steps - 1, Math.floor(sc));
      setScroll((sf + eio3(clamp((sc - sf - 0.2) / 0.6))) / steps, pagesA);

      var close = seg(p, 0.76, 0.8, ei3);
      st(el.fullA, 'visibility', portal > 0 && p < 0.8 ? 'visible' : 'hidden');
      st(el.fullA, 'opacity', portal > 0 ? '1' : '0');
      st(el.fullA, 'clipPath', portal > 0 && portal < 1 ? polyStr(mixQuad(quad, vpRect(), portal)) : 'none');
      st(el.fullA, 'transform', close > 0 ? 'scaleY(' + Math.max(0.004, 1 - close).toFixed(4) + ')' : 'none');
      st(el.fullA, 'filter', close > 0 ? 'brightness(' + (1 + close * 2).toFixed(2) + ')' : 'none');

      var c0 = centroid(quad);
      var g = portal > 0 ? Math.min(seg(p, 0.41, 0.425), 1 - seg(p, 0.425, 0.465)) : 0;
      st(el.glow2, 'transform', 'translate(' + c0[0].toFixed(0) + 'px,' + c0[1].toFixed(0) + 'px)');
      st(el.glow2, 'opacity', (g * 0.6).toFixed(3));

      st(el.hero, 'opacity', (1 - seg(p, 0.03, 0.14)).toFixed(3));
      st(el.hero, 'transform', 'translateY(' + (-seg(p, 0, 0.14) * 70).toFixed(1) + 'px)');
      st(el.hero, 'pointerEvents', p > 0.12 ? 'none' : 'auto');
      st(el.word, 'opacity', (1 - seg(p, 0.18, 0.36)).toFixed(3));
      st(el.word, 'transform', 'translate(-50%,-50%) scale(' + (1 + p * 1.2).toFixed(3) + ') translateY(' + (-p * 80).toFixed(1) + 'px)');
      st(el.glow, 'opacity', (1 - seg(p, 0.3, 0.46)).toFixed(3));
      st(el.hint, 'opacity', (1 - Math.max(seg(p, 0.02, 0.08), 0)).toFixed(3));
    }

    /* Setup Act 2: 3D Angled Phones & Glass Cards */
    var MOCK_RAW = {
      m1: {
        w: 1400, h: 1400,
        scr: [[[201.2, 29.6], [1152.7, 146.0], [1046.9, 826.6], [88.1, 718.1]]],
        hit: [[758.8, 1338.4]],
        accent: 'rgba(246,192,138,0.55)',
        isPair: false
      },
      m2: {
        w: 1400, h: 1396,
        scr: [[[1110.5, 25.9], [1251.5, 696.5], [424.1, 851.4], [292.0, 195.3]]],
        hit: [[633.4, 1298.8]],
        accent: 'rgba(168,85,247,0.55)',
        isPair: false
      },
      pair: {
        w: 2200, h: 1467,
        scr: [
          [[335.3, 223.5], [972.0, 301.4], [901.1, 756.8], [259.6, 684.2]],
          [[1845.4, 359.0], [1943.5, 825.9], [1367.5, 933.7], [1275.6, 477.0]]
        ],
        hit: [[1168.0, 1218.9]],
        hitc: [1168.0, 1218.9],
        accent: 'rgba(56,189,248,0.55)',
        isPair: true
      }
    };

    var MOCK = JSON.parse(JSON.stringify(MOCK_RAW));
    var MOCK_IMGS = {
      m1: buildAngledPhoneSVG(MOCK_RAW.m1.w, MOCK_RAW.m1.h, MOCK_RAW.m1.scr, MOCK_RAW.m1.accent, false),
      m2: buildAngledPhoneSVG(MOCK_RAW.m2.w, MOCK_RAW.m2.h, MOCK_RAW.m2.scr, MOCK_RAW.m2.accent, false),
      pair: buildAngledPhoneSVG(MOCK_RAW.pair.w, MOCK_RAW.pair.h, MOCK_RAW.pair.scr, MOCK_RAW.pair.accent, true)
    };

    if (LOW) {
      var big = Math.max(window.screen.width || VW0, window.screen.height || VH0, VW0, VH0) * 1.1;
      for (var key in MOCK) {
        var d = MOCK[key];
        var k = Math.min(1, big / d.w);
        var sp = function (p) { return [p[0] * k, p[1] * k]; };
        d.w *= k;
        d.h *= k;
        d.scr = d.scr.map(function (q) { return q.map(sp); });
        d.hit = d.hit.map(sp);
        if (d.hitc) d.hitc = sp(d.hitc);
      }
    }

    var SLIDE_DEF = {
      m1: { img: MOCK_IMGS.m1, tpls: ['tplS1'], maxW: 0.44, cards: [{ pos: 'p-lt' }, { pos: 'p-rm' }, { pos: 'p-lb' }] },
      m2: { img: MOCK_IMGS.m2, tpls: ['tplS2'], maxW: 0.44, cards: [{ pos: 'p-lt' }, { pos: 'p-rm' }, { pos: 'p-lb' }] },
      pair: { img: MOCK_IMGS.pair, tpls: ['tplS3a', 'tplS3b'], maxW: 0.46, cls: 'pair', cards: [{ pos: 'p-lb' }, { pos: 'p-rt' }] }
    };

    function getScenePack() {
      var lang = (window.SiteLang && window.SiteLang.get()) || 'tr';
      return (window.STAGE_SCENE_I18N && window.STAGE_SCENE_I18N[lang]) || window.STAGE_SCENE_I18N.tr;
    }

    function hydrateSlideCards() {
      var pack = getScenePack();
      for (var id in SLIDE_DEF) {
        var pos = SLIDE_DEF[id].cards.map(function (c) { return c.pos; });
        SLIDE_DEF[id].cards = (pack[id] || []).slice(0, pos.length).map(function (c, i) {
          return Object.assign({}, c, { pos: pos[i] });
        });
      }
    }
    hydrateSlideCards();

    function orderQuad(q) {
      var sum = q.map(function (p) { return p[0] + p[1]; });
      var dif = q.map(function (p) { return p[1] - p[0]; });
      var tl = sum.indexOf(Math.min.apply(Math, sum));
      var br = sum.indexOf(Math.max.apply(Math, sum));
      var tr = dif.indexOf(Math.min.apply(Math, dif));
      var bl = dif.indexOf(Math.max.apply(Math, dif));
      return [q[tl], q[tr], q[br], q[bl]];
    }

    var bDevs = $('#bDevs'), bCards = $('#bCards');
    function mk(tag, cls, css) {
      var e = document.createElement(tag);
      if (cls) e.className = cls;
      if (css) e.style.cssText = css;
      return e;
    }
    function esc(v) {
      return String(v == null ? '' : v).replace(/[&<>"]/g, function (m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m];
      });
    }

    var order = ['m1', 'm2', 'pair'];
    var slides = order.map(function (key) {
      var d = MOCK[key], def = SLIDE_DEF[key], hit = key === 'pair' ? d.hitc : d.hit[0];
      var dev = mk('div', 'dev', 'width:' + d.w + 'px;height:' + d.h + 'px;display:none');
      dev.appendChild(mk('div', 'devglow', 'left:' + (d.w * 0.12) + 'px;top:' + (d.h * 0.02) + 'px;width:' + (d.w * 0.76) + 'px;height:' + (d.h * 0.72) + 'px'));
      var refl = mk('div', 'refl', 'top:' + hit[1] + 'px;width:' + d.w + 'px;height:' + (hit[1] * 0.55) + 'px');
      if (LOW) {
        refl.style.display = 'none';
      } else {
        var ri = mk('img', '', 'top:' + (hit[1] - d.h) + 'px;width:' + d.w + 'px;height:' + d.h + 'px');
        ri.src = def.img;
        ri.alt = '';
        refl.appendChild(ri);
      }
      dev.appendChild(refl);

      var im = mk('img', 'dimg');
      im.src = def.img;
      im.alt = '';
      im.width = d.w;
      im.height = d.h;
      dev.appendChild(im);

      var screens = d.scr.map(function (q0, i) {
        var q1 = orderQuad(q0), qc = centroid(q1);
        var q = q1.map(function (p) { return [qc[0] + (p[0] - qc[0]) * 1.01, qc[1] + (p[1] - qc[1]) * 1.01]; });
        var s = mk('div', 'scr s');
        stamp('#' + def.tpls[i], s);
        s.appendChild(mk('div', 'glare'));
        placeScreen(s, q);
        dev.insertBefore(s, im);
        var inner = $('.sc-in', s);
        return { inner: inner, pages: $$('.pg', inner).length };
      });
      bDevs.appendChild(dev);

      var set = mk('div', 'bset' + (def.cls ? ' ' + def.cls : ''), 'display:none');
      var cards = def.cards.map(function (c) {
        var a = mk('article', 'bcard ' + c.pos);
        a.innerHTML = '<span class="bk">' + esc(c.k) + '</span><strong' + (c.cu ? ' class="cu"' : '') + '>' + esc(c.s) + '</strong><p class="bc-h">' + esc(c.h) + '</p><p>' + esc(c.p) + '</p>';
        set.appendChild(a);
        return { el: a, dir: c.pos.indexOf('l') !== -1 ? -1 : 1 };
      });
      var dots = mk('div', 'bdots');
      cards.forEach(function () { dots.appendChild(mk('i')); });
      set.appendChild(dots);
      bCards.appendChild(set);

      return { key: key, d: d, def: def, dev: dev, hit: hit, screens: screens, set: set, cards: cards, dots: dots, refl: refl };
    });

    /* Re-render glass cards on language switch */
    window.addEventListener('site-lang-change', function () {
      hydrateSlideCards();
      slides.forEach(function (s) {
        var cardData = SLIDE_DEF[s.key].cards;
        s.cards.forEach(function (cObj, idx) {
          var c = cardData[idx];
          if (!c) return;
          cObj.el.innerHTML = '<span class="bk">' + esc(c.k) + '</span><strong' + (c.cu ? ' class="cu"' : '') + '>' + esc(c.s) + '</strong><p class="bc-h">' + esc(c.h) + '</p><p>' + esc(c.p) + '</p>';
        });
      });
    });

    var NS = slides.length, B_UNITS = 2.2, A_UNITS = 7.6;
    var FB = A_UNITS / (A_UNITS + B_UNITS * NS);

    function slideScale(s) {
      var topM = Math.max(112, vh * 0.14);
      var wy = portrait ? vh * 0.56 : vh * 0.78;
      return {
        wy: wy,
        S: Math.min((wy - topM) / s.hit[1], (portrait ? 1.02 : s.def.maxW) * vw / s.d.w)
      };
    }

    function renderB(pb) {
      st(el.hero, 'opacity', '0');
      st(el.hero, 'pointerEvents', 'none');
      st(el.word, 'opacity', '0');
      st(el.glow, 'opacity', '0');
      st(el.hint, 'opacity', '0');
      st(el.glow2, 'opacity', '0');
      st(el.water, 'top', (portrait ? vh * 0.56 : vh * 0.78) + 'px');

      var fx = null;
      slides.forEach(function (s, k) {
        var x0 = pb * NS;
        var u = k === 0 ? 0.76 + 1.4 * (x0 - 0.76) : x0 - k;
        var last = k === NS - 1;
        var vis = u > -0.23 && (last || u < 1.02);
        st(s.dev, 'visibility', vis ? 'visible' : 'hidden');
        st(s.set, 'visibility', vis ? 'visible' : 'hidden');
        st(s.dev, 'display', vis ? 'block' : 'none');
        st(s.set, 'display', vis ? 'block' : 'none');
        if (!vis) return;

        var scObj = slideScale(s);
        var wy = scObj.wy, S0 = scObj.S;
        var fall = seg(u, -0.22, 0.12, ei3);
        var ex = last ? 0 : seg(u, 0.76, 0.98, eio3);
        var t0 = Math.max(0, u - 0.12);
        var pop = u > 0.12 ? 0.03 * Math.exp(-t0 * 14) * Math.cos(t0 * 40) : 0;
        var flt = u > 0.2 && u < 0.9 ? Math.sin(u * 8) * 0.006 * vh : 0;
        var S = S0 * (1 + pop) * (1 - 0.08 * ex);
        var x = vw / 2 - (s.d.w / 2) * S;
        var y = wy - s.hit[1] * S - (1 - fall) * vh * 0.95 + ex * vh * 0.16 + flt + (k === 0 ? 10 : 0);

        st(s.dev, 'transform', 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) scale(' + S.toFixed(5) + ')');
        st(s.dev, 'opacity', (1 - seg(u, 0.84, 0.99)).toFixed(3));
        st(s.refl, 'opacity', seg(fall, 0.82, 1).toFixed(2));

        var sc = seg(u, 0.2, 0.8, eio3);
        s.screens.forEach(function (c) {
          st(c.inner, 'transform', 'translateY(' + (-sc * (c.pages - 1) / c.pages * 100).toFixed(2) + '%)');
        });

        if (u > 0.12 && u < 0.62 + 0.12 && (!fx || u > fx.u)) {
          fx = { u: u, it: clamp((u - 0.12) / 0.5), hx: x + s.hit[0] * S, hy: y + s.hit[1] * S };
        }

        var m = s.cards.length, len = 0.64 / m;
        s.cards.forEach(function (c, j) {
          var t;
          if (portrait) {
            var a = 0.2 + j * len;
            t = Math.min(seg(u, a, a + 0.05, eo3), j === m - 1 ? 1 : 1 - seg(u, a + len - 0.05, a + len)) * (1 - ex);
            st(c.el, 'transform', 'translateY(' + ((1 - t) * 36).toFixed(1) + 'px)');
            if (s.dots.children[j]) s.dots.children[j].classList.toggle('on', t > 0.5);
          } else {
            t = seg(u, 0.2 + j * 0.07, 0.3 + j * 0.07, eo3) * (1 - ex);
            st(c.el, 'transform', 'translateX(' + (c.dir * (1 - t) * 140).toFixed(1) + 'px)');
          }
          st(c.el, 'opacity', t.toFixed(3));
        });
        st(s.dots, 'opacity', (seg(u, 0.2, 0.25) * (1 - ex)).toFixed(2));
      });

      var it = fx ? fx.it : 0;
      var amp = fx ? 12 * Math.exp(-it * 10) : 0;
      st(el.sceneB, 'transform', amp > 0.05 ? 'translate(' + (Math.sin(it * 95) * amp).toFixed(1) + 'px,' + (Math.cos(it * 70) * amp * 0.6).toFixed(1) + 'px)' : 'none');
      st(el.flash, 'opacity', (fx ? 0.55 * Math.exp(-it * 14) : 0).toFixed(3));

      var hx = fx ? fx.hx : 0, hy = fx ? fx.hy : 0;
      el.rings.forEach(function (r, i) {
        var t = fx ? seg(it, i * 0.05, 0.55 + i * 0.05, eo3) : 0;
        var w = Math.min(vw, vh * 1.7) * 0.9 * t + 10;
        var h = w * 0.24;
        st(r, 'width', w.toFixed(0) + 'px');
        st(r, 'height', h.toFixed(0) + 'px');
        st(r, 'transform', 'translate(' + (hx - w / 2).toFixed(0) + 'px,' + (hy - h / 2).toFixed(0) + 'px)');
        st(r, 'opacity', (fx ? (1 - t) * 0.9 : 0).toFixed(3));
      });
      drawDrops(it, hx, hy);
    }

    var bShown = false;
    function updateStageSwitch(p) {
      if (!el.vsBtns.length) return;
      var activeIdx = 0;
      if (p >= 0.84) activeIdx = 4;
      else if (p >= 0.68) activeIdx = 3;
      else if (p >= 0.52) activeIdx = 2;
      else if (p >= 0.22) activeIdx = 1;
      el.vsBtns.forEach(function (btn, idx) {
        btn.classList.toggle('act', idx === activeIdx);
      });
    }

    function render(p) {
      var key = p.toFixed(5) + '|' + intro.v.toFixed(4);
      if (key === lastKey) return;
      lastKey = key;
      updateStageSwitch(p);

      var showB = p > FB;
      st(el.sceneB, 'visibility', showB ? 'visible' : 'hidden');
      st(el.sceneB, 'display', showB ? '' : 'none');
      st(el.sceneA, 'display', showB ? 'none' : '');
      st(el.fullA, 'display', showB ? 'none' : '');

      if (!showB && bShown) {
        slides.forEach(function (s) {
          st(s.dev, 'visibility', 'hidden');
          st(s.set, 'visibility', 'hidden');
          st(s.dev, 'display', 'none');
          st(s.set, 'display', 'none');
        });
        bShown = false;
      }
      if (showB) bShown = true;

      if (!showB) {
        var pa = (p / FB) * 0.8;
        st(el.black, 'opacity', seg(pa, 0.77, 0.795).toFixed(3));
        renderA(pa);
      } else {
        var pb = (p - FB) / (1 - FB);
        st(el.black, 'opacity', (1 - seg(pb, 0, 0.03)).toFixed(3));
        st(el.sceneA, 'visibility', 'hidden');
        st(el.fullA, 'visibility', 'hidden');
        renderB(pb);
      }
    }

    measure();
    render(0);
    window.addEventListener('resize', function () {
      measure();
      render(stageSmoothP);
    });

    if (window.SiteLang && window.SiteLang.apply) {
      window.SiteLang.apply();
    }

    /* Intro Animation on Page Load */
    var introStart = performance.now();
    function tickIntro(now) {
      var dt = Math.min(1, (now - introStart) / 1600);
      intro.v = eo3(dt);
      render(stageSmoothP);
      if (dt < 1) requestAnimationFrame(tickIntro);
    }
    if (!reduce) {
      requestAnimationFrame(tickIntro);
    } else {
      intro.v = 1;
      renderA(0.18);
    }

    /* Quick Stage Phase Buttons */
    el.vsBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetP = parseFloat(btn.getAttribute('data-stage-p') || '0');
        var rect = stageTrack.getBoundingClientRect();
        var trackTop = rect.top + window.scrollY;
        var maxScroll = Math.max(1, stageTrack.offsetHeight - window.innerHeight);
        window.scrollTo({
          top: trackTop + targetP * maxScroll,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ========================================================================
     4. PINNED SECTION 02 (#aboutPin) — 3D Wing Cards Unfolding Around Center
     ======================================================================== */
  var aboutTrack = $('#about');
  var aboutCenter = $('#aboutCenter');
  var abL1 = $('.ab-l1'), abR1 = $('.ab-r1'), abL2 = $('.ab-l2'), abR2 = $('.ab-r2');
  var allAb = $$('.ab');

  function renderAbout(p) {
    var isMobile = window.innerWidth <= 900;
    if (isMobile) {
      if (aboutCenter) {
        st(aboutCenter, 'transform', 'none');
        st(aboutCenter, 'opacity', '1');
        st(aboutCenter, 'filter', 'none');
      }
      allAb.forEach(function (c, i) {
        if (i < allAb.length - 1) {
          var nextRect = allAb[i + 1].getBoundingClientRect();
          var t = seg(window.innerHeight * 0.85 - nextRect.top, 0, window.innerHeight * 0.55);
          st(c, 'transform', 'scale(' + lerp(1, 0.93, t).toFixed(3) + ')');
          st(c, 'filter', 'brightness(' + lerp(1, 0.62, t).toFixed(2) + ')');
          st(c, 'opacity', '1');
        } else {
          st(c, 'transform', 'none');
          st(c, 'filter', 'none');
          st(c, 'opacity', '1');
        }
      });
      return;
    }

    /* Desktop 3D Wing Timeline */
    var cEnter = seg(p, 0, 0.16, eo3);
    var cExit = seg(p, 0.86, 0.98, ei3);
    var cScale = lerp(0.75, 1, cEnter) * lerp(1, 0.35, cExit);
    var cY = lerp(45, 0, cEnter);
    var cOp = cEnter * (1 - cExit);
    if (aboutCenter) {
      st(aboutCenter, 'transform', 'translateY(' + cY.toFixed(1) + 'px) scale(' + cScale.toFixed(3) + ')');
      st(aboutCenter, 'opacity', cOp.toFixed(3));
      st(aboutCenter, 'filter', cExit > 0.02 ? 'blur(' + (cExit * 10).toFixed(1) + 'px)' : 'none');
    }

    function placeWing(el, dir, enterA, enterB) {
      if (!el) return;
      var wIn = seg(p, enterA, enterB, eo3);
      var wOut = seg(p, 0.85, 0.97, ei3);
      var xPct = dir * lerp(130, 0, wIn) + dir * lerp(0, 120, wOut);
      var rotY = -dir * lerp(38, 0, wIn);
      var op = wIn * (1 - wOut);
      st(el, 'transform', 'perspective(1600px) translateX(' + xPct.toFixed(1) + '%) rotateY(' + rotY.toFixed(1) + 'deg)');
      st(el, 'opacity', op.toFixed(3));
    }

    placeWing(abL1, -1, 0.12, 0.36);
    placeWing(abR1, 1, 0.16, 0.40);
    placeWing(abL2, -1, 0.38, 0.64);
    placeWing(abR2, 1, 0.42, 0.68);
  }

  /* ========================================================================
     5. PINNED SECTION 03 (#svcPin / #apps) — Spark Burst + 3D Stacked Deck
     ======================================================================== */
  var appsTrack = $('#apps');
  var sparkEl = $('#spark'), burstEl = $('#burst'), svcHead = $('#svcHead');
  var svcCountB = $('#svcCount b'), svcBar = $('#svcBar');
  var svcCards = $$('#svcList .svc-card');
  var svcDots = $$('#svcNav .svc-dot');

  function renderApps(p) {
    if (!svcCards.length) return;
    /* Spark & Radial Portal Burst (0.0 -> 0.14) */
    var spIn = seg(p, 0, 0.04, eo3);
    var spOut = seg(p, 0.04, 0.08);
    st(sparkEl, 'opacity', (spIn * (1 - spOut)).toFixed(3));
    st(sparkEl, 'transform', 'scale(' + lerp(0.2, 1.2, spIn).toFixed(2) + ')');

    var bCircle = seg(p, 0.02, 0.10, ei3);
    var bFade = seg(p, 0.09, 0.15, eo3);
    st(burstEl, 'clipPath', 'circle(' + (bCircle * 150).toFixed(1) + '% at 50% 50%)');
    st(burstEl, 'opacity', (bCircle > 0 ? (1 - bFade) * 0.45 : 0).toFixed(3));

    var hIn = seg(p, 0.04, 0.14, eo3);
    st(svcHead, 'opacity', hIn.toFixed(3));
    st(svcHead, 'transform', 'translateY(' + lerp(32, 0, hIn).toFixed(1) + 'px)');
    st(svcBar, 'transform', 'scaleX(' + p.toFixed(4) + ')');

    /* 5 Stacked 3D App Cards (0.08 -> 0.96) */
    var n = svcCards.length;
    var deckP = clamp((p - 0.08) / 0.86, 0, 1) * (n - 1);
    var activeIdx = Math.round(deckP);

    if (svcCountB) {
      var numStr = String(activeIdx + 1).padStart(2, '0');
      if (svcCountB.textContent !== numStr) svcCountB.textContent = numStr;
    }
    svcDots.forEach(function (d, idx) {
      d.classList.toggle('active', idx === activeIdx);
    });

    svcCards.forEach(function (card, i) {
      var rel = deckP - i; /* rel < 0: incoming from right; rel == 0: front center; rel > 0: stacked behind */
      if (rel < -1.05) {
        st(card, 'opacity', '0');
        st(card, 'pointerEvents', 'none');
        st(card, 'transform', 'perspective(1600px) translateX(140%) rotateY(-30deg)');
      } else if (rel < 0) {
        /* Entering from right */
        var tIn = eo3(1 + rel);
        var xPct = lerp(140, 0, tIn);
        var rotY = lerp(-30, 0, tIn);
        st(card, 'opacity', tIn.toFixed(3));
        st(card, 'filter', 'brightness(1)');
        st(card, 'pointerEvents', tIn > 0.7 ? 'auto' : 'none');
        st(card, 'transform', 'perspective(1600px) translateX(' + xPct.toFixed(2) + '%) rotateY(' + rotY.toFixed(2) + 'deg) scale(1)');
      } else if (rel <= 1.2) {
        /* Receding into 3D stack behind */
        var tBack = eo3(Math.min(1, rel));
        var scale = lerp(1, 0.86, tBack);
        var xBack = lerp(0, -20, tBack);
        var rotBack = lerp(0, 14, tBack);
        var bright = lerp(1, 0.52, tBack);
        var opBack = rel > 1 ? clamp(1 - (rel - 1) * 5, 0, 1) : 1;
        st(card, 'opacity', opBack.toFixed(3));
        st(card, 'filter', 'brightness(' + bright.toFixed(2) + ')');
        st(card, 'pointerEvents', rel < 0.35 ? 'auto' : 'none');
        st(card, 'transform', 'perspective(1600px) translateX(' + xBack.toFixed(2) + '%) rotateY(' + rotBack.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')');
      } else {
        st(card, 'opacity', '0');
        st(card, 'pointerEvents', 'none');
      }
    });
  }

  svcDots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      if (!appsTrack) return;
      var idx = parseInt(dot.getAttribute('data-app-idx') || '0', 10);
      var n = Math.max(1, svcCards.length - 1);
      var targetP = 0.08 + (idx / n) * 0.84;
      var rect = appsTrack.getBoundingClientRect();
      var trackTop = rect.top + window.scrollY;
      var maxScroll = Math.max(1, appsTrack.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: trackTop + targetP * maxScroll,
        behavior: 'smooth'
      });
    });
  });

  /* ========================================================================
     6. PINNED SECTION 04 (#pkPin / #skills) — 3D Depth Portal Grid (2 Z-Waves)
     ======================================================================== */
  var skillsTrack = $('#skills');
  var pkG1 = $$('#pkG1 .pk-card'), pkG2 = $$('#pkG2 .pk-card');
  var pkG1Wrap = $('#pkG1'), pkG2Wrap = $('#pkG2');
  var pkT1 = $('#pkT1'), pkT2 = $('#pkT2');
  var pkWbtns = $$('.pk-wbtn');

  function renderSkills(p) {
    var wave2Active = p >= 0.5;
    pkWbtns.forEach(function (b, idx) {
      b.classList.toggle('act', (idx === 1) === wave2Active);
    });

    /* Title swap */
    var t1In = seg(p, 0, 0.12, eo3);
    var t1Out = seg(p, 0.44, 0.54, ei3);
    var t2In = seg(p, 0.48, 0.60, eo3);
    st(pkT1, 'opacity', (t1In * (1 - t1Out)).toFixed(3));
    st(pkT1, 'transform', 'translateY(' + (lerp(24, 0, t1In) - t1Out * 28).toFixed(1) + 'px)');
    st(pkT2, 'opacity', t2In.toFixed(3));
    st(pkT2, 'transform', 'translateY(' + lerp(24, 0, t2In).toFixed(1) + 'px)');

    st(pkG1Wrap, 'pointerEvents', wave2Active ? 'none' : 'auto');
    st(pkG2Wrap, 'pointerEvents', wave2Active ? 'auto' : 'none');

    /* Wave 1 Cards: Enter from z:-850 (0.04..0.34), Hold, Exit past camera z:+320 (0.42..0.58) */
    pkG1.forEach(function (card, i) {
      var stg = i * 0.032;
      var cIn = seg(p, 0.02 + stg, 0.24 + stg, eo3);
      var cOut = seg(p, 0.42 + stg * 0.5, 0.56 + stg * 0.5, ei3);
      var z = lerp(-850, 0, cIn) + lerp(0, 320, cOut);
      var y = lerp(220, 0, cIn) + lerp(0, -220, cOut);
      var rotX = lerp(40, 0, cIn) + lerp(0, -22, cOut);
      var sc = lerp(0.7, 1, cIn) * lerp(1, 1.28, cOut);
      var op = cIn * (1 - cOut);
      st(card, 'opacity', op.toFixed(3));
      st(card, 'transform', 'perspective(1100px) translate3d(0,' + y.toFixed(1) + 'px,' + z.toFixed(1) + 'px) rotateX(' + rotX.toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')');
    });

    /* Wave 2 Cards: Enter from z:-850 (0.48..0.78) */
    pkG2.forEach(function (card, i) {
      var stg = i * 0.032;
      var cIn = seg(p, 0.48 + stg, 0.72 + stg, eo3);
      var z = lerp(-850, 0, cIn);
      var y = lerp(220, 0, cIn);
      var rotX = lerp(40, 0, cIn);
      var sc = lerp(0.7, 1, cIn);
      st(card, 'opacity', cIn.toFixed(3));
      st(card, 'transform', 'perspective(1100px) translate3d(0,' + y.toFixed(1) + 'px,' + z.toFixed(1) + 'px) rotateX(' + rotX.toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')');
    });
  }

  pkWbtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!skillsTrack) return;
      var w = parseInt(btn.getAttribute('data-wave') || '0', 10);
      var targetP = w === 0 ? 0.30 : 0.82;
      var rect = skillsTrack.getBoundingClientRect();
      var trackTop = rect.top + window.scrollY;
      var maxScroll = Math.max(1, skillsTrack.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: trackTop + targetP * maxScroll,
        behavior: 'smooth'
      });
    });
  });

  /* ========================================================================
     6B. PINNED SECTION 05 (#webPin) — 3D Nested Web Showroom & Version Studio
     ======================================================================== */
  var webTrack = $('#webPin');
  var webCards = $$('#webStack .web-deck-card');
  var webIdxEl = $('#webIdx'), webBarEl = $('#webBar');
  var webVerBtns = $$('#webVerSwitch .wv-btn');
  var projSec = $('#projects'), toolSec = $('#tools');
  var projWords = $('#projWords'), toolWords = $('#toolWords');
  var orbits = $$('.orbit i');

  function renderWeb(p) {
    if (!webCards.length) return;
    if (window.innerWidth <= 900) {
      webCards.forEach(function (card) {
        st(card, 'transform', 'none');
        st(card, 'opacity', '1');
        st(card, 'filter', 'none');
      });
      return;
    }

    var n = webCards.length;
    var deckP = clamp(p, 0, 1) * (n - 1);
    var activeIdx = Math.round(deckP);

    if (webIdxEl) {
      var sIdx = String(activeIdx + 1).padStart(2, '0');
      if (webIdxEl.textContent !== sIdx) webIdxEl.textContent = sIdx;
    }
    if (webBarEl) {
      st(webBarEl, 'width', ((p * 0.75 + 0.25) * 100).toFixed(1) + '%');
    }

    webCards.forEach(function (card, idx) {
      var rel = deckP - idx; // <0: incoming from right; >0: receding behind left
      var innerScr = $('.wd-inner-scroll', card);
      if (rel < -1.05) {
        st(card, 'opacity', '0');
        st(card, 'pointerEvents', 'none');
        st(card, 'transform', 'translate3d(68%, 0, -320px) rotateY(-30deg) scale(0.86)');
      } else if (rel < 0) {
        var tIn = 1 + rel; // 0 -> 1 as card arrives
        var eIn = eo3(clamp(tIn, 0, 1));
        var tx = lerp(64, 0, eIn);
        var tz = lerp(-260, 0, eIn);
        var ry = lerp(-28, 0, eIn);
        var sc = lerp(0.88, 1, eIn);
        st(card, 'opacity', clamp(tIn * 1.6, 0, 1).toFixed(3));
        st(card, 'pointerEvents', tIn > 0.7 ? 'auto' : 'none');
        st(card, 'transform', 'translate3d(' + tx.toFixed(1) + '%, 0, ' + tz.toFixed(0) + 'px) rotateY(' + ry.toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')');
        st(card, 'filter', 'brightness(1)');
        st(card, 'zIndex', String(10 + idx));
        if (innerScr) st(innerScr, 'transform', 'translate3d(0, ' + ((1 - eIn) * 26).toFixed(1) + 'px, 0)');
      } else {
        var tOut = clamp(rel, 0, 3);
        var txOut = -tOut * 16;
        var tzOut = -tOut * 130;
        var ryOut = Math.min(18, tOut * 11);
        var scOut = Math.max(0.74, 1 - tOut * 0.09);
        var brOut = Math.max(0.38, 1 - tOut * 0.26);
        var opOut = clamp(1 - (tOut - 1.4) * 0.85, 0, 1);
        st(card, 'opacity', opOut.toFixed(3));
        st(card, 'pointerEvents', tOut < 0.35 ? 'auto' : 'none');
        st(card, 'transform', 'translate3d(' + txOut.toFixed(1) + '%, 0, ' + tzOut.toFixed(0) + 'px) rotateY(' + ryOut.toFixed(1) + 'deg) scale(' + scOut.toFixed(3) + ')');
        st(card, 'filter', 'brightness(' + brOut.toFixed(2) + ')');
        st(card, 'zIndex', String(10 + idx));
        if (innerScr) st(innerScr, 'transform', 'translate3d(0, ' + (-Math.min(1, tOut) * 38).toFixed(1) + 'px, 0)');
      }
    });
  }

  /* Live Version Switcher for #projects */
  if (webVerBtns.length && projSec) {
    var verBadgeMap = {
      portal: 'V1 · 3D PORTAL',
      editorial: 'V2 · EDITORIAL',
      luxe: 'V3 · LUXE KOYU'
    };
    webVerBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var v = btn.getAttribute('data-wver') || 'portal';
        projSec.setAttribute('data-web-ver', v);
        webVerBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        $$('.wd-ver-ind', projSec).forEach(function (ind) {
          ind.textContent = verBadgeMap[v] || 'V1 · 3D PORTAL';
        });
        $$('.wd-dyn-link, .wd-vlink', projSec).forEach(function (a) {
          var base = a.getAttribute('data-base');
          if (base) a.href = base + '?v=' + v;
        });
        $$('.pv-chip', projSec).forEach(function (chip) {
          chip.classList.toggle('active', chip.getAttribute('data-v') === v);
        });
      });
    });
  }

  /* ========================================================================
     7. UNIFIED SMOOTH SCROLL PROGRESS LOOP FOR ALL PINNED TRACKS
     ======================================================================== */
  if (!reduce) {
    renderAbout(0);
    renderApps(0);
    renderSkills(0);
    renderWeb(0);
  }

  function getTrackProgress(trackEl) {
    if (!trackEl) return 0;
    var r = trackEl.getBoundingClientRect();
    var scrollable = Math.max(1, r.height - window.innerHeight);
    return clamp(-r.top / scrollable, 0, 1);
  }

  function getViewportProgress(secEl) {
    if (!secEl) return 0;
    var r = secEl.getBoundingClientRect();
    var total = Math.max(1, r.height + window.innerHeight);
    return clamp((window.innerHeight - r.top) / total, 0, 1);
  }

  function updateAllScroll() {
    var k = coarse ? 0.28 : 0.16;

    if (stageTrack) {
      var targetStage = getTrackProgress(stageTrack);
      stageSmoothP += (targetStage - stageSmoothP) * k;
      if (Math.abs(targetStage - stageSmoothP) < 0.0002) stageSmoothP = targetStage;
      if (!reduce) render(stageSmoothP);
    }

    if (aboutTrack) {
      var targetAbout = getTrackProgress(aboutTrack);
      aboutSmoothP += (targetAbout - aboutSmoothP) * k;
      if (Math.abs(targetAbout - aboutSmoothP) < 0.0005) aboutSmoothP = targetAbout;
      if (!reduce) renderAbout(aboutSmoothP);
    }

    if (appsTrack) {
      var targetApps = getTrackProgress(appsTrack);
      appsSmoothP += (targetApps - appsSmoothP) * k;
      if (Math.abs(targetApps - appsSmoothP) < 0.0005) appsSmoothP = targetApps;
      if (!reduce) renderApps(appsSmoothP);
    }

    if (skillsTrack) {
      var targetSkills = getTrackProgress(skillsTrack);
      skillsSmoothP += (targetSkills - skillsSmoothP) * k;
      if (Math.abs(targetSkills - skillsSmoothP) < 0.0005) skillsSmoothP = targetSkills;
      if (!reduce) renderSkills(skillsSmoothP);
    }

    if (webTrack) {
      var targetWeb = getTrackProgress(webTrack);
      webSmoothP += (targetWeb - webSmoothP) * k;
      if (Math.abs(targetWeb - webSmoothP) < 0.0005) webSmoothP = targetWeb;
      if (!reduce) renderWeb(webSmoothP);
    }

    /* Outline words scrub & 3D orbit rotation in #projects & #tools */
    if (projSec && projWords) {
      var pp = getViewportProgress(projSec);
      st(projWords, 'transform', 'translateX(' + (-pp * 38).toFixed(2) + '%)');
    }
    if (toolSec && toolWords) {
      var tp = getViewportProgress(toolSec);
      st(toolWords, 'transform', 'translateX(' + (-tp * 38).toFixed(2) + '%)');
    }
    if (orbits.length) {
      var scrollDeg = (window.scrollY || 0) * 0.14;
      orbits.forEach(function (ring, idx) {
        var dir = idx % 2 === 0 ? 1 : -1;
        st(ring, 'transform', 'rotate(' + (scrollDeg * dir).toFixed(1) + 'deg)');
      });
    }

    requestAnimationFrame(updateAllScroll);
  }
  requestAnimationFrame(updateAllScroll);

  /* ========================================================================
     8. CATEGORY FILTERS FOR #projects AND #tools
     ======================================================================== */
  function bindFilterGroup(btnContainerSel, gridSel) {
    var box = $(btnContainerSel);
    var grid = $(gridSel);
    if (!box || !grid) return;
    var btns = $$('.f-pill', box);
    var items = $$('.corp-item', grid);
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter') || 'all';
        btns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        items.forEach(function (it) {
          var match = f === 'all' || it.getAttribute('data-cat') === f;
          it.classList.toggle('is-hidden', !match);
        });
      });
    });
  }
  bindFilterGroup('#projFilters', '#projectsGrid');
  bindFilterGroup('#toolFilters', '#toolsGrid');

  /* ========================================================================
     9. AMBIENT CODE RAIN & BINARY TICKER
     ======================================================================== */
  var TOKENS = [
    '@Composable', 'fun', 'val', 'remember', 'LaunchedEffect',
    'Modifier', 'Column', 'Row', 'StateFlow', 'ViewModel',
    'Hilt', 'Room', 'Coroutines', 'Flow', 'NavHost',
    'Kotlin', 'Compose', 'Flutter', 'SwiftUI', 'Unity',
    'NFC', 'SSL', 'Gradle', 'KMP', 'Retrofit'
  ];

  var rain = document.getElementById('codeRain');
  if (rain && !reduce && !coarse) {
    var rCtx = rain.getContext('2d');
    var RW, RH, cols = [], fontSize = 13;
    function resizeRain() {
      RW = rain.width = window.innerWidth;
      RH = rain.height = window.innerHeight;
      var n = Math.floor(RW / 28);
      cols = [];
      for (var i = 0; i < n; i++) {
        cols.push({
          y: Math.random() * RH,
          speed: 0.5 + Math.random() * 1.1,
          token: TOKENS[Math.floor(Math.random() * TOKENS.length)],
          hue: Math.random() > 0.5 ? '212,136,74' : '168,85,247'
        });
      }
    }
    resizeRain();
    window.addEventListener('resize', resizeRain);
    var rainRaf, lastRain = 0;
    function drawRain(t) {
      if (t - lastRain < 50) { rainRaf = requestAnimationFrame(drawRain); return; }
      lastRain = t;
      rCtx.fillStyle = 'rgba(12,16,21,0.22)';
      rCtx.fillRect(0, 0, RW, RH);
      rCtx.font = '600 ' + fontSize + 'px "JetBrains Mono", ui-monospace, monospace';
      for (var i = 0; i < cols.length; i++) {
        var c = cols[i];
        rCtx.fillStyle = 'rgba(' + c.hue + ',0.45)';
        rCtx.fillText(c.token, i * 28, c.y);
        c.y += c.speed * 10;
        if (c.y > RH + 20) {
          c.y = -20;
          c.token = TOKENS[Math.floor(Math.random() * TOKENS.length)];
        }
      }
      rainRaf = requestAnimationFrame(drawRain);
    }
    rainRaf = requestAnimationFrame(drawRain);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) cancelAnimationFrame(rainRaf);
      else rainRaf = requestAnimationFrame(drawRain);
    });
  }

  var bin = document.getElementById('devBinary');
  if (bin) {
    var bits = '';
    for (var b = 0; b < 180; b++) bits += (Math.random() > 0.5 ? '1' : '0') + ' ';
    bin.innerHTML = '<span>' + bits + bits + '</span>';
  }
})();
