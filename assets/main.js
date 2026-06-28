    (function () {
      'use strict';
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var coarse = window.matchMedia('(pointer: coarse)').matches;

      /* Preloader */
      window.addEventListener('load', function () {
        setTimeout(function () { document.getElementById('preloader').classList.add('done'); }, 350);
      });
      // safety: hide preloader even if load is slow
      setTimeout(function () { document.getElementById('preloader').classList.add('done'); }, 2500);

      /* Mobile menu */
      var menuBtn = document.getElementById('menuBtn');
      var mobileMenu = document.getElementById('mobileMenu');
      menuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('open');
        menuBtn.classList.toggle('open');
      });
      window.closeMobile = function () { mobileMenu.classList.remove('open'); menuBtn.classList.remove('open'); };

      /* Nav scrolled + scroll progress + back-to-top (single rAF-throttled scroll handler) */
      var nav = document.getElementById('nav');
      var progress = document.getElementById('scrollProgress');
      var toTop = document.getElementById('toTop');
      var ticking = false;
      function onScroll() {
        var y = window.scrollY || document.documentElement.scrollTop;
        var h = document.documentElement.scrollHeight - window.innerHeight;
        nav.classList.toggle('scrolled', y > 30);
        progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
        toTop.classList.toggle('show', y > 600);
        ticking = false;
      }
      window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
      onScroll();
      toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

      /* Reveal on scroll */
      var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur');
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(function (el) { io.observe(el); });
      } else {
        revealEls.forEach(function (el) { el.classList.add('visible'); });
      }

      /* Active nav link */
      var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
      var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
      if ('IntersectionObserver' in window && sections.length) {
        var navIo = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
            }
          });
        }, { threshold: 0.4, rootMargin: '-30% 0px -50% 0px' });
        sections.forEach(function (s) { navIo.observe(s); });
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
          entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); cIo.unobserve(e.target); } });
        }, { threshold: 0.6 });
        counters.forEach(function (c) { cIo.observe(c); });
      } else { counters.forEach(animateCount); }

      /* Typewriter */
      var roles = ['Senior Android Developer', 'Kotlin & Jetpack Compose', 'Flutter & iOS Developer', 'Mobil Güvenlik Meraklısı'];
      var typeEl = document.getElementById('typeText');
      if (typeEl) {
        if (reduce) { typeEl.textContent = roles[0]; }
        else {
          var ri = 0, ci = 0, deleting = false;
          (function type() {
            var cur = roles[ri];
            typeEl.textContent = cur.substring(0, ci);
            if (!deleting && ci < cur.length) { ci++; setTimeout(type, 65); }
            else if (!deleting && ci === cur.length) { deleting = true; setTimeout(type, 1600); }
            else if (deleting && ci > 0) { ci--; setTimeout(type, 30); }
            else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 350); }
          })();
        }
      }

      /* Interactive spotlight (desktop, motion ok) */
      var spot = document.getElementById('spotlight');
      if (spot && !reduce && !coarse) {
        var sx = window.innerWidth / 2, sy = window.innerHeight * 0.3, tx = sx, ty = sy, raf = false;
        window.addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; if (!raf) { raf = true; requestAnimationFrame(moveSpot); } }, { passive: true });
        function moveSpot() {
          sx += (tx - sx) * 0.12; sy += (ty - sy) * 0.12;
          spot.style.left = sx + 'px'; spot.style.top = sy + 'px';
          if (Math.abs(tx - sx) > 0.5 || Math.abs(ty - sy) > 0.5) requestAnimationFrame(moveSpot); else raf = false;
        }
      } else if (spot) { spot.style.display = 'none'; }

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
            btn.style.transform = 'translate(' + (mx * 0.25) + 'px,' + (my * 0.35 - 3) + 'px)';
          });
          btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
        });
      }

      /* Duplicate marquee content for seamless loop */
      var track = document.getElementById('marqueeTrack');
      if (track) { track.innerHTML += track.innerHTML; }

      /* Section titles shimmer */
      document.querySelectorAll('.section-title').forEach(function (t) { t.classList.add('shimmer'); });

      /* Hero name letter-by-letter reveal */
      var heroName = document.getElementById('heroName');
      if (heroName && !reduce) {
        var accentSpan = heroName.querySelector('span');
        var accentText = accentSpan ? accentSpan.textContent : '';
        var firstPart = heroName.textContent.replace(accentText, '').trim();
        heroName.innerHTML = '';
        var di = 0;
        (firstPart + '\u00A0').split('').forEach(function (ch) {
          var s = document.createElement('span');
          s.className = 'ltr';
          s.textContent = ch === ' ' ? '\u00A0' : ch;
          s.style.animationDelay = (0.25 + di * 0.05) + 's';
          di++;
          heroName.appendChild(s);
        });
        var grad = document.createElement('span');
        grad.className = 'ltr';
        grad.textContent = accentText;
        grad.style.animationDelay = (0.25 + di * 0.05) + 's';
        heroName.appendChild(grad);
      }

      /* Particle constellation */
      var canvas = document.getElementById('particles');
      if (canvas && !reduce && !coarse) {
        var ctx = canvas.getContext('2d');
        var W, H, particles = [], mouse = { x: -9999, y: -9999 };
        function resize() {
          W = canvas.width = window.innerWidth;
          H = canvas.height = window.innerHeight;
          var count = Math.min(90, Math.floor((W * H) / 18000));
          particles = [];
          for (var i = 0; i < count; i++) {
            particles.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 1.8 + 0.6 });
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
            var dxm = p.x - mouse.x, dym = p.y - mouse.y, dm = Math.sqrt(dxm * dxm + dym * dym);
            if (dm < 130) { p.x += dxm / dm * 0.8; p.y += dym / dm * 0.8; }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(168,85,247,0.6)';
            ctx.fill();
          }
          for (var a = 0; a < particles.length; a++) {
            for (var b = a + 1; b < particles.length; b++) {
              var dx = particles[a].x - particles[b].x, dy = particles[a].y - particles[b].y;
              var d = dx * dx + dy * dy;
              if (d < 13000) {
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.strokeStyle = 'rgba(124,58,237,' + (0.16 * (1 - d / 13000)) + ')';
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          }
          pRaf = requestAnimationFrame(drawParticles);
        }
        drawParticles();
        document.addEventListener('visibilitychange', function () {
          if (document.hidden) { cancelAnimationFrame(pRaf); }
          else { pRaf = requestAnimationFrame(drawParticles); }
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
          if (Math.abs(mx - rx) > 0.5 || Math.abs(my - ry) > 0.5) requestAnimationFrame(moveRing); else cRaf = false;
        }
        document.addEventListener('pointerdown', function () { ring.classList.add('clicking'); });
        document.addEventListener('pointerup', function () { ring.classList.remove('clicking'); });
        document.querySelectorAll('a, button, .skill-card, .project-card, .tool-card, .app-card').forEach(function (el) {
          el.addEventListener('pointerenter', function () { ring.classList.add('hovering'); });
          el.addEventListener('pointerleave', function () { ring.classList.remove('hovering'); });
        });
      }

      /* 3D tilt on cards */
      if (!reduce && !coarse) {
        document.querySelectorAll('.skill-card, .project-card, .tool-card, .app-card, .stat').forEach(function (card) {
          card.classList.add('tilt');
          card.addEventListener('pointermove', function (e) {
            var r = card.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width - 0.5;
            var py = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = 'perspective(700px) rotateX(' + (-py * 8) + 'deg) rotateY(' + (px * 10) + 'deg) translateY(-6px)';
          });
          card.addEventListener('pointerleave', function () { card.style.transform = ''; });
        });
      }

      /* Scroll parallax for hero chips + orbs */
      if (!reduce && !coarse) {
        var chips = Array.prototype.slice.call(document.querySelectorAll('.float-chips .chip'));
        var orbs = Array.prototype.slice.call(document.querySelectorAll('.orb'));
        var pTick = false;
        window.addEventListener('scroll', function () {
          if (pTick) return; pTick = true;
          requestAnimationFrame(function () {
            var y = window.scrollY;
            chips.forEach(function (c, i) { c.style.transform = 'translateY(' + (y * (0.08 + i * 0.03)) + 'px)'; });
            orbs.forEach(function (o, i) { o.style.marginTop = (y * (0.04 + i * 0.02)) + 'px'; });
            pTick = false;
          });
        }, { passive: true });
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
  
