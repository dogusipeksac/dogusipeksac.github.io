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
     1. CREATIVE RECURSIVE NESTED 3D MOBILE PHONE PORTAL ENGINE (#stage)
     ======================================================================== */
  var stageEl = $('#stage');
  var stageTrack = $('#hero');
  if (stageEl && stageTrack) {
    var el = {
      stage: stageEl,
      hero: $('#heroCopy'),
      word: $('#bgWord'),
      hint: $('#hint'),
      glow: $('.stage-glow'),
      portalGlow: $('#portalGlow'),
      wings: $('#mobWings'),
      wingL: $('#mobWingLeft'),
      wingR: $('#mobWingRight'),
      mobStage: $('#mobHeroStage'),
      mobPhone: $('#mobHeroPhone'),
      mobRings: $('#mobOrbitRings'),
      mosPortal: $('#mosInnerPortal'),
      nestedVp: $('#mobNestedViewport'),
      layers: [
        $('#mobLayer1'),
        $('#mobLayer2'),
        $('#mobLayer3'),
        $('#mobLayer4')
      ],
      nestPhones: [
        $('#nestPhone1'),
        $('#nestPhone2'),
        $('#nestPhone3')
      ],
      vsBtns: $$('#stageSwitch .vs-btn')
    };

    var intro = { v: 0 };
    var lastKey = '';
    var BG_WORDS = ['COMPOSE', 'KOTLIN', 'UNITY 3D', 'AI VISION', 'FINTECH'];

    function updateStageSwitch(p) {
      if (!el.vsBtns.length) return;
      var activeIdx = 0;
      if (p >= 0.80) activeIdx = 4;
      else if (p >= 0.60) activeIdx = 3;
      else if (p >= 0.38) activeIdx = 2;
      else if (p >= 0.16) activeIdx = 1;
      el.vsBtns.forEach(function (btn, idx) {
        btn.classList.toggle('act', idx === activeIdx);
      });
      if (el.word) {
        var w = BG_WORDS[activeIdx] || 'COMPOSE';
        if (el.word.textContent !== w) el.word.textContent = w;
      }
    }

    function renderNestedLayer(layerEl, nestPhoneEl, p, inA, inB, outA, outB, isLast) {
      if (!layerEl) return;
      var enter = seg(p, inA, inB, eo3);
      var exit = isLast ? 0 : seg(p, outA, outB, ei3);
      var visible = p >= inA - 0.01 && (isLast || p <= outB + 0.01);

      if (!visible) {
        st(layerEl, 'opacity', '0');
        st(layerEl, 'visibility', 'hidden');
        st(layerEl, 'pointerEvents', 'none');
        return;
      }

      var scale = lerp(0.22, 1, enter) * lerp(1, 2.65, exit);
      var rad = lerp(44, 0, enter);
      var op = enter * (1 - seg(exit, 0.35, 1));
      var activeInteractive = enter > 0.75 && exit < 0.25;

      st(layerEl, 'visibility', 'visible');
      st(layerEl, 'opacity', op.toFixed(3));
      st(layerEl, 'borderRadius', rad.toFixed(1) + 'px');
      st(layerEl, 'transform', 'scale(' + scale.toFixed(4) + ')');
      st(layerEl, 'pointerEvents', activeInteractive ? 'auto' : 'none');

      if (nestPhoneEl) {
        var phTilt = lerp(-14, 0, enter);
        var phZoom = lerp(1, 2.2, exit);
        var phX = lerp(0, -18, exit);
        st(
          nestPhoneEl,
          'transform',
          'perspective(1200px) translateX(' + phX.toFixed(1) + '%) rotateY(' + phTilt.toFixed(1) + 'deg) scale(' + phZoom.toFixed(3) + ')'
        );
      }
    }

    function render(p) {
      var key = p.toFixed(5) + '|' + intro.v.toFixed(4);
      if (key === lastKey) return;
      lastKey = key;
      updateStageSwitch(p);

      var enter = Math.max(intro.v, seg(p, 0, 0.06, eo3));
      var dive = seg(p, 0.02, 0.22, eio3);
      var fadePhone = seg(p, 0.17, 0.24, eo3);

      /* Hero Copy & Floating Code Wings */
      var heroFade = 1 - seg(p, 0.01, 0.13, eo3);
      st(el.hero, 'opacity', (heroFade * enter).toFixed(3));
      st(el.hero, 'transform', 'translateY(' + (-seg(p, 0, 0.14) * 78).toFixed(1) + 'px)');
      st(el.hero, 'pointerEvents', p > 0.10 ? 'none' : 'auto');

      if (el.wingL && el.wingR) {
        var wOut = seg(p, 0.01, 0.15, ei3);
        var wOp = enter * (1 - wOut);
        st(el.wingL, 'opacity', wOp.toFixed(3));
        st(el.wingR, 'opacity', wOp.toFixed(3));
        st(el.wingL, 'transform', 'perspective(1200px) translateX(' + (-wOut * 140).toFixed(1) + 'px) rotateY(16deg) rotateZ(-2deg)');
        st(el.wingR, 'transform', 'perspective(1200px) translateX(' + (wOut * 140).toFixed(1) + 'px) rotateY(-16deg) rotateZ(2deg)');
      }

      /* 3D Flagship Smartphone Centerpiece Dive */
      if (el.mobStage && el.mobPhone) {
        var topPct = lerp(70, 50, dive);
        var rx = lerp(14, 0, dive);
        var ry = lerp(-14, 0, dive);
        var sc = lerp(0.84, 1, enter) * lerp(0.92, 5.4, dive);
        var phOp = enter * (1 - fadePhone);

        st(el.mobStage, 'top', topPct.toFixed(2) + '%');
        st(el.mobStage, 'opacity', phOp.toFixed(3));
        st(el.mobStage, 'visibility', phOp <= 0.005 ? 'hidden' : 'visible');
        st(
          el.mobPhone,
          'transform',
          'translate3d(0,0,0) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) scale(' + sc.toFixed(4) + ')'
        );
      }

      if (el.mosPortal) {
        var pGlow = seg(p, 0.05, 0.20, eo3);
        st(el.mosPortal, 'transform', 'scale(' + lerp(0.95, 1.38, pGlow).toFixed(3) + ')');
      }

      if (el.portalGlow) {
        var burst = Math.min(seg(p, 0.14, 0.20), 1 - seg(p, 0.20, 0.28));
        st(el.portalGlow, 'transform', 'translate(' + (window.innerWidth / 2).toFixed(0) + 'px,' + (window.innerHeight / 2).toFixed(0) + 'px)');
        st(el.portalGlow, 'opacity', (burst * 0.75).toFixed(3));
      }

      st(el.word, 'opacity', lerp(0.9, 0.28, seg(p, 0.12, 0.25)).toFixed(3));
      st(el.word, 'transform', 'translate(-50%,-50%) scale(' + (1 + p * 0.45).toFixed(3) + ')');
      st(el.hint, 'opacity', (1 - seg(p, 0.01, 0.07)).toFixed(3));

      /* 4 Recursive Nested Mobile Layers (Unfolding One From Inside Another) */
      renderNestedLayer(el.layers[0], el.nestPhones[0], p, 0.15, 0.24, 0.34, 0.44, false);
      renderNestedLayer(el.layers[1], el.nestPhones[1], p, 0.38, 0.47, 0.56, 0.66, false);
      renderNestedLayer(el.layers[2], el.nestPhones[2], p, 0.60, 0.69, 0.76, 0.85, false);
      renderNestedLayer(el.layers[3], null,             p, 0.79, 0.88, 1.00, 1.00, true);
    }

    render(0);
    window.addEventListener('resize', function () {
      lastKey = '';
      render(stageSmoothP);
    });

    if (window.SiteLang && window.SiteLang.apply) {
      window.SiteLang.apply();
    }

    /* Intro Animation on Page Load */
    var introStart = performance.now();
    function tickIntro(now) {
      var dt = Math.min(1, (now - introStart) / 1100);
      intro.v = eo3(dt);
      render(stageSmoothP);
      if (dt < 1) requestAnimationFrame(tickIntro);
    }
    if (!reduce) {
      requestAnimationFrame(tickIntro);
    } else {
      intro.v = 1;
      render(0);
    }

    function scrollToStageP(targetP) {
      var rect = stageTrack.getBoundingClientRect();
      var trackTop = rect.top + window.scrollY;
      var maxScroll = Math.max(1, stageTrack.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: trackTop + targetP * maxScroll,
        behavior: 'smooth'
      });
    }

    /* Quick Stage Phase Buttons */
    el.vsBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetP = parseFloat(btn.getAttribute('data-stage-p') || '0');
        scrollToStageP(targetP);
      });
    });

    /* Clicking Centerpiece or Inner Nested Phones Advances to Next Layer */
    if (el.mobPhone) {
      el.mobPhone.style.cursor = 'pointer';
      el.mobPhone.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        scrollToStageP(0.28);
      });
    }
    var nextPTargets = [0.50, 0.72, 0.92];
    el.nestPhones.forEach(function (np, i) {
      if (!np) return;
      np.style.cursor = 'pointer';
      np.addEventListener('click', function () {
        scrollToStageP(nextPTargets[i] || 0.92);
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

  svcCards.forEach(function (card) {
    var href = card.getAttribute('data-app-href');
    if (!href) return;
    card.style.cursor = 'pointer';
    card.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) return;
      window.location.href = href;
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
          hue: Math.random() > 0.5 ? '56,189,248' : '168,85,247'
        });
      }
    }
    resizeRain();
    window.addEventListener('resize', resizeRain);
    var rainRaf, lastRain = 0;
    function drawRain(t) {
      if (t - lastRain < 50) { rainRaf = requestAnimationFrame(drawRain); return; }
      lastRain = t;
      rCtx.fillStyle = 'rgba(10,10,15,0.22)';
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
