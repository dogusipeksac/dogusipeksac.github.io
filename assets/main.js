(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;

  /* Preloader */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var pre = document.getElementById('preloader');
      if (pre) pre.classList.add('done');
    }, 320);
  });
  setTimeout(function () {
    var pre = document.getElementById('preloader');
    if (pre) pre.classList.add('done');
  }, 2200);

  /* Mobile menu */
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

  /* Nav scrolled + scroll progress + back-to-top + active nav link */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('scrollProgress');
  var toTop = document.getElementById('toTop');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var trackedSecs = navLinks.map(function (a) {
    var sel = a.getAttribute('href');
    return sel && sel.charAt(0) === '#' ? document.querySelector(sel) : null;
  }).filter(Boolean);

  var ticking = false;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('scrolled', y > 30);
    if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (toTop) toTop.classList.toggle('show', y > 600);

    /* Highlight active section in nav */
    var mid = window.innerHeight * 0.38;
    var activeId = '';
    for (var i = 0; i < trackedSecs.length; i++) {
      var r = trackedSecs[i].getBoundingClientRect();
      if (r.top <= mid && r.bottom >= 120) {
        activeId = '#' + trackedSecs[i].id;
        break;
      }
    }
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === activeId);
    });

    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur');
  function revealInViewport() {
    var vh = window.innerHeight || 900;
    revealEls.forEach(function (el) {
      if (el.classList.contains('visible')) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh + 140) el.classList.add('visible');
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '120px 0px 80px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    window.addEventListener('scroll', revealInViewport, { passive: true });
    window.addEventListener('hashchange', function () { setTimeout(revealInViewport, 60); });
    setTimeout(revealInViewport, 200);
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Counter animation */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = target + suffix; return; }
    var dur = 1400, start = performance.now();
    function step(t) {
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCount(e.target);
          cIo.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cIo.observe(c); });
  } else {
    counters.forEach(animateCount);
  }

  /* Typewriter */
  var roles = (window.SiteLang && window.SiteLang.t('roles')) || [
    'Senior Android Developer',
    'Bilgisayar Mühendisi',
    'Kotlin & Jetpack Compose',
    'Flutter · Swift · Unity'
  ];
  var typeEl = document.getElementById('typeText');
  var typeTimer = null;
  function startTypewriter(nextRoles) {
    if (!typeEl) return;
    if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
    roles = nextRoles && nextRoles.length ? nextRoles : roles;
    if (reduce) { typeEl.textContent = roles[0]; return; }
    var ri = 0, ci = 0, deleting = false;
    (function type() {
      var cur = roles[ri];
      typeEl.textContent = cur.substring(0, ci);
      if (!deleting && ci < cur.length) { ci++; typeTimer = setTimeout(type, 60); }
      else if (!deleting && ci === cur.length) { deleting = true; typeTimer = setTimeout(type, 1600); }
      else if (deleting && ci > 0) { ci--; typeTimer = setTimeout(type, 28); }
      else { deleting = false; ri = (ri + 1) % roles.length; typeTimer = setTimeout(type, 320); }
    })();
  }
  startTypewriter(roles);
  window.addEventListener('site-lang-change', function (e) {
    if (e.detail && e.detail.roles) startTypewriter(e.detail.roles);
  });

  /* Interactive spotlight */
  var spot = document.getElementById('spotlight');
  if (spot && !reduce && !coarse) {
    var sx = window.innerWidth / 2, sy = window.innerHeight * 0.3, tx = sx, ty = sy, raf = false;
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!raf) { raf = true; requestAnimationFrame(moveSpot); }
    }, { passive: true });
    function moveSpot() {
      sx += (tx - sx) * 0.12; sy += (ty - sy) * 0.12;
      spot.style.left = sx + 'px'; spot.style.top = sy + 'px';
      if (Math.abs(tx - sx) > 0.5 || Math.abs(ty - sy) > 0.5) requestAnimationFrame(moveSpot);
      else raf = false;
    }
  } else if (spot) {
    spot.style.display = 'none';
  }

  /* Card spotlight (--mx/--my) */
  if (!coarse) {
    document.querySelectorAll('.glow-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* Magnetic buttons */
  if (!reduce && !coarse) {
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (mx * 0.22) + 'px,' + (my * 0.3 - 2) + 'px)';
      });
      btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    });
  }

  /* Duplicate marquee content for seamless loop */
  var track = document.getElementById('marqueeTrack');
  if (track) track.innerHTML += track.innerHTML;
  var codeTrack = document.getElementById('codeMarquee');
  if (codeTrack) codeTrack.innerHTML += codeTrack.innerHTML;

  /* Particle constellation */
  var canvas = document.getElementById('particles');
  if (canvas && !reduce && !coarse) {
    var ctx = canvas.getContext('2d');
    var W, H, particles = [], mouse = { x: -9999, y: -9999 };
    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      var count = Math.min(70, Math.floor((W * H) / 22000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6
        });
      }
    }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener('pointerleave', function () { mouse.x = -9999; mouse.y = -9999; });
    var pRaf;
    function drawParticles() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168,85,247,0.5)';
        ctx.fill();
      }
      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x, dy = particles[a].y - particles[b].y;
          var d = dx * dx + dy * dy;
          if (d < 12000) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = 'rgba(168,85,247,' + (0.14 * (1 - d / 12000)) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      pRaf = requestAnimationFrame(drawParticles);
    }
    drawParticles();
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) cancelAnimationFrame(pRaf);
      else pRaf = requestAnimationFrame(drawParticles);
    });
  }

  /* Custom cursor */
  var dot = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');
  if (dot && ring && !reduce && !coarse) {
    document.body.classList.add('has-cursor');
    var mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my, cRaf = false;
    window.addEventListener('pointermove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      if (!cRaf) { cRaf = true; requestAnimationFrame(moveRing); }
    }, { passive: true });
    function moveRing() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      if (Math.abs(mx - rx) > 0.5 || Math.abs(my - ry) > 0.5) requestAnimationFrame(moveRing);
      else cRaf = false;
    }
    document.addEventListener('pointerdown', function () { ring.classList.add('clicking'); });
    document.addEventListener('pointerup', function () { ring.classList.remove('clicking'); });
    document.querySelectorAll('a, button, .project-card, .tool-card, .app-card').forEach(function (el) {
      el.addEventListener('pointerenter', function () { ring.classList.add('hovering'); });
      el.addEventListener('pointerleave', function () { ring.classList.remove('hovering'); });
    });
  }

  /* Ripple on buttons */
  document.querySelectorAll('.hero-link, .app-btn, .nav-cta, .yt-btn, .contact-email').forEach(function (btn) {
    btn.classList.add('ripple-host');
    btn.addEventListener('pointerdown', function (e) {
      var r = btn.getBoundingClientRect();
      var size = Math.max(r.width, r.height) * 2;
      var rip = document.createElement('span');
      rip.className = 'ripple';
      rip.style.width = rip.style.height = size + 'px';
      rip.style.left = (e.clientX - r.left) + 'px';
      rip.style.top = (e.clientY - r.top) + 'px';
      btn.appendChild(rip);
      setTimeout(function () { rip.remove(); }, 650);
    });
  });
})();
