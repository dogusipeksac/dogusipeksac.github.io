/* ==========================================================================
   DOGUS IPEKSAC — ORIGINAL DEVELOPER FX + CREATIVE 3D NESTED MOBILE PORTAL
   ========================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var $ = function (s, p) { return (p || document).querySelector(s); };
  var $$ = function (s, p) { return Array.prototype.slice.call((p || document).querySelectorAll(s)); };

  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var eo3 = function (t) { return 1 - Math.pow(1 - t, 3); };
  var eio3 = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var seg = function (p, a, b, fn) {
    var t = clamp((p - a) / (b - a), 0, 1);
    return fn ? fn(t) : t;
  };
  var st = function (el, k, v) { if (el) el.style[k] = v; };

  /* ========================================================================
     1. ORIGINAL 1427def DEVELOPER FX (Code Rain, Phone Screens, Terminal, IDE, Orbit, Binary)
     ======================================================================== */
  var TOKENS = [
    '@Composable', 'fun', 'val', 'remember', 'LaunchedEffect',
    'Modifier', 'Column', 'Row', 'StateFlow', 'ViewModel',
    'Hilt', 'Room', 'Coroutines', 'Flow', 'NavHost',
    'Kotlin', 'Compose', 'Flutter', 'SwiftUI', 'Unity',
    'NFC', 'SSL', 'Gradle', 'KMP', 'Retrofit'
  ];

  /* Code rain */
  var rain = document.getElementById('codeRain');
  if (rain && !reduce) {
    var ctx = rain.getContext('2d');
    var W, H, cols = [], fontSize = coarse ? 13 : 14;
    function resizeRain() {
      W = rain.width = window.innerWidth;
      H = rain.height = window.innerHeight;
      var n = Math.floor(W / 24);
      cols = [];
      for (var i = 0; i < n; i++) {
        cols.push({
          y: Math.random() * H,
          speed: 0.55 + Math.random() * 1.2,
          token: TOKENS[Math.floor(Math.random() * TOKENS.length)],
          hue: Math.random() > 0.65 ? '56,189,248' : '168,85,247'
        });
      }
    }
    resizeRain();
    window.addEventListener('resize', resizeRain);
    var rainRaf, lastRain = 0;
    function drawRain(t) {
      if (t - lastRain < 45) { rainRaf = requestAnimationFrame(drawRain); return; }
      lastRain = t;
      ctx.fillStyle = 'rgba(10,10,15,0.20)';
      ctx.fillRect(0, 0, W, H);
      ctx.font = '600 ' + fontSize + 'px "JetBrains Mono", ui-monospace, monospace';
      for (var i = 0; i < cols.length; i++) {
        var c = cols[i];
        ctx.fillStyle = 'rgba(' + c.hue + ',0.50)';
        ctx.fillText(c.token, i * 24, c.y);
        c.y += c.speed * 10;
        if (c.y > H + 20) {
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

  /* Phone screen cycle in Hero */
  var screens = document.querySelectorAll('.dev-screen');
  if (screens.length) {
    var si = 0;
    screens[0].classList.add('active');
    if (!reduce) {
      setInterval(function () {
        screens[si].classList.remove('active');
        si = (si + 1) % screens.length;
        screens[si].classList.add('active');
      }, 3800);
    }
  }

  /* Terminal typewriter */
  var termEl = document.getElementById('devTermOut');
  var termLines = [
    { html: '<span class="prompt">$</span> <span class="cmd">./gradlew :app:assembleRelease</span>' },
    { html: '<span class="dim">&gt; Task :app:compileReleaseKotlin</span>' },
    { html: '<span class="dim">&gt; Task :app:packageRelease</span>' },
    { html: '<span class="ok">BUILD SUCCESSFUL in 11s · 6 Apps Live</span>' }
  ];
  function runTerm() {
    if (!termEl) return;
    if (reduce) {
      termEl.innerHTML = termLines.map(function (l) { return l.html; }).join('<br>');
      return;
    }
    var li = 0;
    termEl.innerHTML = '';
    function nextLine() {
      if (li >= termLines.length) {
        setTimeout(runTerm, 2800);
        return;
      }
      var row = document.createElement('div');
      row.innerHTML = termLines[li].html;
      termEl.appendChild(row);
      li++;
      setTimeout(nextLine, li === 1 ? 680 : 500);
    }
    nextLine();
  }
  runTerm();

  /* IDE caret line cycle */
  var ideBody = document.getElementById('devIdeBody');
  if (ideBody) {
    var snippets = [
      [
        '<span class="ln">1</span> <span class="an">@Composable</span>',
        '<span class="ln">2</span> <span class="k">fun</span> <span class="fn">HomeScreen</span>() {',
        '<span class="ln">3</span>   <span class="fn">Column</span>(<span class="fn">Modifier</span>.fillMaxSize()) {',
        '<span class="ln">4</span>     <span class="fn">TopBar</span>(title = <span class="st">"Apps (6)"</span>)',
        '<span class="ln">5</span>     <span class="fn">AppGrid</span>(apps)',
        '<span class="ln">6</span>   }',
        '<span class="ln">7</span> }<span class="dev-ide-caret"></span>'
      ],
      [
        '<span class="ln">1</span> <span class="k">val</span> uiState <span class="k">by</span> vm.state.<span class="fn">collectAsState</span>()',
        '<span class="ln">2</span> <span class="fn">LaunchedEffect</span>(Unit) {',
        '<span class="ln">3</span>   vm.<span class="fn">loadApps</span>()',
        '<span class="ln">4</span> }',
        '<span class="ln">5</span> <span class="cm">// NFC · SSL Pinning</span>',
        '<span class="ln">6</span> <span class="fn">SecureClient</span>().<span class="fn">pin</span>()<span class="dev-ide-caret"></span>'
      ],
      [
        '<span class="ln">1</span> <span class="k">class</span> <span class="fn">AppViewModel</span> {',
        '<span class="ln">2</span>   <span class="k">private val</span> _s = <span class="fn">MutableStateFlow</span>()',
        '<span class="ln">3</span>   <span class="k">val</span> state = _s.<span class="fn">asStateFlow</span>()',
        '<span class="ln">4</span>   <span class="k">fun</span> <span class="fn">loadApps</span>() = <span class="fn">viewModelScope</span>.launch {',
        '<span class="ln">5</span>     _s.value = repo.<span class="fn">fetch</span>()',
        '<span class="ln">6</span>   }',
        '<span class="ln">7</span> }<span class="dev-ide-caret"></span>'
      ]
    ];
    var idei = 0;
    function paintIde() {
      ideBody.innerHTML = snippets[idei].join('<br>');
      idei = (idei + 1) % snippets.length;
    }
    paintIde();
    if (!reduce) setInterval(paintIde, 4200);
  }

  /* Orbit positions */
  var orbitItems = document.querySelectorAll('.dev-orbit-item');
  var orbitHost = document.querySelector('.dev-orbit');
  if (orbitItems.length && !reduce) {
    if (orbitHost) orbitHost.classList.add('ready');
    var orbitStart = performance.now();
    function placeOrbit(t) {
      var elapsed = (t - orbitStart) / 1000;
      orbitItems.forEach(function (el) {
        var radius = parseFloat(el.getAttribute('data-r') || '220');
        var speed = parseFloat(el.getAttribute('data-s') || '0.18');
        var base = parseFloat(el.getAttribute('data-a') || '0');
        var a = base + elapsed * speed;
        var x = Math.cos(a) * radius;
        var y = Math.sin(a) * radius;
        el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      requestAnimationFrame(placeOrbit);
    }
    requestAnimationFrame(placeOrbit);
  }

  /* Binary ticker content */
  var bin = document.getElementById('devBinary');
  if (bin) {
    var bits = '';
    for (var b = 0; b < 180; b++) bits += (Math.random() > 0.5 ? '1' : '0') + ' ';
    bin.innerHTML = '<span>' + bits + bits + '</span>';
  }

  /* Heading character scramble (Original 1427def, guaranteed visible) */
  var GLYPHS = '@#$%<>/{}[]01ABCDEFGHKLMNPRSTUVWXYZ';
  var headingIo = null;

  function splitTitle(el) {
    var text = el.dataset.final || el.textContent;
    el.dataset.final = text;
    el.classList.add('decoded');
    el.innerHTML = '';
    text.split('').forEach(function (ch, i) {
      var s = document.createElement('span');
      s.className = 'ch';
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      s.style.animationDelay = (i * 0.022) + 's';
      el.appendChild(s);
    });
  }

  function scrambleTitle(el) {
    if (reduce) { el.classList.add('decoded'); return; }
    var final = el.dataset.final || '';
    var chars = el.querySelectorAll('.ch');
    if (!chars.length) return;
    var frame = 0;
    var max = 12;
    (function tick() {
      for (var i = 0; i < chars.length; i++) {
        if (frame > i + 2) {
          chars[i].textContent = final[i] === ' ' ? '\u00A0' : final[i];
        } else {
          chars[i].textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      frame++;
      if (frame < max + chars.length) requestAnimationFrame(tick);
      else el.classList.add('decoded');
    })();
  }

  function enhanceHeadings() {
    document.querySelectorAll('.section-title').forEach(function (el) {
      if (el.querySelector('.ch')) {
        el.textContent = el.dataset.final || el.textContent;
      }
      el.dataset.scrambled = '';
      el.dataset.final = el.textContent;
      splitTitle(el);
      if ('IntersectionObserver' in window) {
        if (!headingIo) {
          headingIo = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
              if (!e.isIntersecting) return;
              var node = e.target;
              if (node.dataset.scrambled !== '1') {
                node.dataset.scrambled = '1';
                scrambleTitle(node);
              }
              headingIo.unobserve(node);
            });
          }, { threshold: 0.15 });
        }
        headingIo.observe(el);
      }
    });
  }
  setTimeout(enhanceHeadings, 20);
  window.addEventListener('site-lang-change', function () {
    setTimeout(enhanceHeadings, 40);
  });

  /* ========================================================================
     2. HERO NESTED 3D MOBILE PORTAL (Built ON TOP OF Original 3-Column Hero)
     ======================================================================== */
  var stageTrack = $('#hero');
  var heroCopy = $('#heroCopy');
  var mobPhone = $('#mobHeroPhone');
  var layers = [$('#mobLayer1'), $('#mobLayer2'), $('#mobLayer3')];
  var nestPhones = [$('#nestPhone1'), $('#nestPhone2'), $('#nestPhone3')];
  var vsBtns = $$('#stageSwitch .vs-btn');
  var stageSmoothP = 0;

  function renderNestedLayer(layerEl, nestPhoneEl, p, inA, inB, outA, outB, isLast) {
    if (!layerEl) return;
    var enter = seg(p, inA, inB, eo3);
    var exit = isLast ? 0 : seg(p, outA, outB, eio3);
    var visible = p >= inA - 0.01 && (isLast || p <= outB + 0.01);

    if (!visible) {
      st(layerEl, 'opacity', '0');
      st(layerEl, 'visibility', 'hidden');
      st(layerEl, 'pointerEvents', 'none');
      return;
    }

    var scale = lerp(0.24, 1, enter) * lerp(1, 2.5, exit);
    var rad = lerp(42, 0, enter);
    var op = enter * (1 - seg(exit, 0.35, 1));
    var activeInteractive = enter > 0.7 && exit < 0.3;

    st(layerEl, 'visibility', 'visible');
    st(layerEl, 'opacity', op.toFixed(3));
    st(layerEl, 'borderRadius', rad.toFixed(1) + 'px');
    st(layerEl, 'transform', 'scale(' + scale.toFixed(4) + ')');
    st(layerEl, 'pointerEvents', activeInteractive ? 'auto' : 'none');

    if (nestPhoneEl) {
      var phTilt = lerp(-14, 0, enter);
      var phZoom = lerp(1, 2.15, exit);
      var phX = lerp(0, -16, exit);
      st(
        nestPhoneEl,
        'transform',
        'perspective(1200px) translateX(' + phX.toFixed(1) + '%) rotateY(' + phTilt.toFixed(1) + 'deg) scale(' + phZoom.toFixed(3) + ')'
      );
    }
  }

  function renderHeroStage(p) {
    if (window.innerWidth <= 960) {
      st(heroCopy, 'opacity', '1');
      st(heroCopy, 'transform', 'none');
      st(heroCopy, 'pointerEvents', 'auto');
      return;
    }

    /* Update Stage Switcher Active Pill */
    var activePhase = 0;
    if (p >= 0.72) activePhase = 3;
    else if (p >= 0.45) activePhase = 2;
    else if (p >= 0.18) activePhase = 1;
    vsBtns.forEach(function (btn, idx) {
      btn.classList.toggle('act', idx === activePhase);
    });

    /* Original 3-Column Hero fades & zooms into the 3D Phone as p goes 0.04 -> 0.24 */
    var dive = seg(p, 0.03, 0.24, eio3);
    var heroOp = 1 - seg(p, 0.12, 0.25, eo3);
    var heroScale = lerp(1, 1.18, dive);
    st(heroCopy, 'opacity', heroOp.toFixed(3));
    st(heroCopy, 'transform', 'scale(' + heroScale.toFixed(3) + ')');
    st(heroCopy, 'pointerEvents', p > 0.18 ? 'none' : 'auto');

    if (mobPhone) {
      var phScale = lerp(1, 3.2, dive);
      var phRx = lerp(4, 0, dive);
      var phRy = lerp(-10, 0, dive);
      var phTx = lerp(0, -180, dive);
      st(
        mobPhone,
        'transform',
        'translateX(' + phTx.toFixed(1) + 'px) rotateY(' + phRy.toFixed(1) + 'deg) rotateX(' + phRx.toFixed(1) + 'deg) scale(' + phScale.toFixed(3) + ')'
      );
    }

    /* 3 Recursive Nested Mobile Worlds Unfolding From Inside The Phone */
    renderNestedLayer(layers[0], nestPhones[0], p, 0.16, 0.27, 0.43, 0.54, false);
    renderNestedLayer(layers[1], nestPhones[1], p, 0.45, 0.56, 0.70, 0.81, false);
    renderNestedLayer(layers[2], nestPhones[2], p, 0.72, 0.83, 1.00, 1.00, true);
  }

  function scrollToStageP(targetP) {
    if (!stageTrack) return;
    var rect = stageTrack.getBoundingClientRect();
    var trackTop = rect.top + window.scrollY;
    var maxScroll = Math.max(1, stageTrack.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: trackTop + targetP * maxScroll,
      behavior: 'smooth'
    });
  }

  vsBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetP = parseFloat(btn.getAttribute('data-stage-p') || '0');
      scrollToStageP(targetP);
    });
  });

  if (mobPhone) {
    mobPhone.style.cursor = 'pointer';
    mobPhone.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      scrollToStageP(0.34);
    });
  }
  var nextTargets = [0.64, 0.92, 1.05];
  nestPhones.forEach(function (np, i) {
    if (!np) return;
    np.style.cursor = 'pointer';
    np.addEventListener('click', function () {
      scrollToStageP(nextTargets[i] || 0.92);
    });
  });

  /* ========================================================================
     3. ABOUT & SKILLS SUBTLE 3D SCROLL PARALLAX (Always Opacity: 1!)
     ======================================================================== */
  var aboutCards = $$('#about3dDeck .ab');
  function updateAbout3d() {
    if (!aboutCards.length || window.innerWidth <= 900 || reduce) return;
    var vh = window.innerHeight;
    aboutCards.forEach(function (card, i) {
      var r = card.getBoundingClientRect();
      var centerOffset = ((r.top + r.height / 2) - vh / 2) / (vh * 0.65);
      var clamped = clamp(centerOffset, -1, 1);
      var dir = i % 2 === 0 ? -1 : 1;
      var rx = (-clamped * 5).toFixed(2);
      var ry = (Math.abs(clamped) * dir * -4).toFixed(2);
      var ty = (clamped * 10).toFixed(1);
      card.style.transform = 'perspective(1200px) translateY(' + ty + 'px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
    });
  }

  /* ========================================================================
     4. APPS: INTERACTIVE 3D SINGLE-APP STAGE + ALL-6-APPS GRID SYNC
     ======================================================================== */
  var a3dCards = $$('#svcList .a3d-card');
  var svcDots = $$('#svcNav .svc-dot');
  var svcCountB = $('#svcCount b');
  var appGridCards = $$('.apps-grid .app-card');
  var activeAppIdx = 0;

  function setActiveApp(idx) {
    if (!a3dCards.length) return;
    activeAppIdx = clamp(idx, 0, a3dCards.length - 1);
    a3dCards.forEach(function (c, i) {
      c.classList.toggle('active', i === activeAppIdx);
    });
    svcDots.forEach(function (d, i) {
      d.classList.toggle('active', i === activeAppIdx);
    });
    if (svcCountB) {
      svcCountB.textContent = String(activeAppIdx + 1).padStart(2, '0');
    }
  }

  svcDots.forEach(function (dot, idx) {
    dot.addEventListener('click', function () {
      setActiveApp(idx);
    });
  });

  /* Hovering any of the 6 cards in .apps-grid also highlights it in the 3D Stage */
  appGridCards.forEach(function (card, idx) {
    card.addEventListener('pointerenter', function () {
      setActiveApp(idx);
    });
  });

  a3dCards.forEach(function (card) {
    var href = card.getAttribute('data-app-href');
    if (!href) return;
    card.style.cursor = 'pointer';
    card.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) return;
      window.location.href = href;
    });
  });

  /* ========================================================================
     5. PROJECTS VERSION SWITCHER & CATEGORY FILTERS (#projects & #tools)
     ======================================================================== */
  var projSec = $('#projects');
  var webVerBtns = $$('#webVerSwitch .wv-btn');
  if (webVerBtns.length && projSec) {
    webVerBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var v = btn.getAttribute('data-wver') || 'portal';
        projSec.setAttribute('data-web-ver', v);
        webVerBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        $$('.wd-dyn-link', projSec).forEach(function (a) {
          var base = a.getAttribute('data-base');
          if (base) a.href = base + '?v=' + v;
        });
        $$('.pv-chip', projSec).forEach(function (chip) {
          chip.classList.toggle('active', chip.getAttribute('data-v') === v);
        });
      });
    });
  }

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
     6. UNIFIED SMOOTH SCROLL LOOP FOR HERO 3D PORTAL & ABOUT 3D DECK
     ======================================================================== */
  function getTrackProgress(trackEl) {
    if (!trackEl) return 0;
    var r = trackEl.getBoundingClientRect();
    var scrollable = Math.max(1, r.height - window.innerHeight);
    return clamp(-r.top / scrollable, 0, 1);
  }

  function tickScroll() {
    if (stageTrack) {
      var targetP = getTrackProgress(stageTrack);
      var k = coarse ? 0.28 : 0.16;
      stageSmoothP += (targetP - stageSmoothP) * k;
      if (Math.abs(targetP - stageSmoothP) < 0.0003) stageSmoothP = targetP;
      if (!reduce) renderHeroStage(stageSmoothP);
    }
    updateAbout3d();
    requestAnimationFrame(tickScroll);
  }
  renderHeroStage(0);
  requestAnimationFrame(tickScroll);
})();
