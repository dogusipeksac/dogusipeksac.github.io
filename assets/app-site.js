/* ==========================================================================
   APP PRODUCT WEBSITE 3D INTERACTIVE ENGINE (/assets/app-site.js)
   Adds 3D mouse/scroll tilt to the Hero Smartphone + Wing Cards and 3D
   scroll-driven depth transitions to Feature & Screen cards.
   ========================================================================== */
(function () {
  'use strict';

  var phoneWrap = document.querySelector('.app-phone-3d-wrap');
  var phoneEl = document.querySelector('.app-phone-3d');
  var wingL = document.querySelector('.app-wing.left');
  var wingR = document.querySelector('.app-wing.right');
  var cards = Array.prototype.slice.call(
    document.querySelectorAll('.app-feat-card, .app-screen-card, .store-qr-card')
  );

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  if (phoneWrap && phoneEl) {
    phoneWrap.addEventListener('mousemove', function (e) {
      var r = phoneWrap.getBoundingClientRect();
      var nx = ((e.clientX - r.left) / Math.max(1, r.width) - 0.5) * 2;
      var ny = ((e.clientY - r.top) / Math.max(1, r.height) - 0.5) * 2;
      var ry = -8 + nx * 12;
      var rx = 4 - ny * 10;
      phoneEl.style.transform = 'rotateY(' + ry.toFixed(1) + 'deg) rotateX(' + rx.toFixed(1) + 'deg) scale(1.02)';
      if (wingL) {
        wingL.style.transform = 'translate3d(' + (-nx * 10).toFixed(1) + 'px,' + (-ny * 8).toFixed(1) + 'px,45px) rotateY(' + (16 + nx * 6).toFixed(1) + 'deg)';
      }
      if (wingR) {
        wingR.style.transform = 'translate3d(' + (nx * 10).toFixed(1) + 'px,' + (ny * 8).toFixed(1) + 'px,45px) rotateY(' + (-16 + nx * 6).toFixed(1) + 'deg)';
      }
    });

    phoneWrap.addEventListener('mouseleave', function () {
      phoneEl.style.transform = 'rotateY(-14deg) rotateX(6deg)';
      if (wingL) wingL.style.transform = 'translateZ(40px) rotateY(16deg)';
      if (wingR) wingR.style.transform = 'translateZ(40px) rotateY(-16deg)';
    });
  }

  function onScroll() {
    var vh = window.innerHeight || 800;
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      var cr = c.getBoundingClientRect();
      if (cr.bottom < -80 || cr.top > vh + 80) continue;
      var rel = clamp((cr.top + cr.height * 0.45 - vh * 0.62) / (vh * 0.55), 0, 1);
      if (rel > 0.02) {
        var rx = rel * 14;
        var ty = rel * 24;
        var sc = 1 - rel * 0.05;
        c.style.transform = 'perspective(1100px) translate3d(0,' + ty.toFixed(1) + 'px,0) rotateX(' + rx.toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')';
      } else {
        c.style.transform = '';
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
