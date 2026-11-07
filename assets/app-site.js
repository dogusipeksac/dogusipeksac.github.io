/* ==========================================================================
   MOBILE APP PRODUCT WEBSITE ENGINE (3D Phone Tilt, 4-Screen Switcher,
   Live Theme Swatches & Per-App Interactive Simulators)
   ========================================================================== */
(function () {
  'use strict';

  var wrap = document.querySelector('.app-phone-3d-wrap');
  var phone = document.querySelector('.app-phone-3d');

  /* 1. 3D Interactive Phone Tilt */
  if (wrap && phone) {
    wrap.addEventListener('pointermove', function (e) {
      var r = wrap.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      var rotY = -6 + x * 22;
      var rotX = 4 - y * 16;
      phone.style.transform =
        'rotateY(' + rotY.toFixed(2) + 'deg) rotateX(' + rotX.toFixed(2) + 'deg) scale(1.02)';
    });

    wrap.addEventListener('pointerleave', function () {
      phone.style.transform = '';
    });
  }

  /* 2. 4-Screen Phone Tab Switcher */
  var phoneTabs = document.querySelectorAll('[data-phone-tab]');
  var phonePanes = document.querySelectorAll('[data-phone-pane]');
  if (phoneTabs.length && phonePanes.length) {
    phoneTabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-phone-tab');
        phoneTabs.forEach(function (b) { b.classList.toggle('active', b === btn); });
        phonePanes.forEach(function (p) {
          p.classList.toggle('active', p.getAttribute('data-phone-pane') === target);
        });
      });
    });
  }

  /* 3. Dynamic Brand Theme / Skin Swatches */
  var swatches = document.querySelectorAll('.app-swatch[data-theme-json]');
  swatches.forEach(function (sw) {
    sw.addEventListener('click', function () {
      swatches.forEach(function (s) { s.classList.toggle('active', s === sw); });
      try {
        var vars = JSON.parse(sw.getAttribute('data-theme-json'));
        Object.keys(vars).forEach(function (k) {
          document.body.style.setProperty(k, vars[k]);
        });
      } catch (err) {}
    });
  });

  /* 4. Interactive Simulator Tabs (.als-tab) */
  var alsTabs = document.querySelectorAll('[data-als-tab]');
  var alsPanes = document.querySelectorAll('[data-als-pane]');
  if (alsTabs.length && alsPanes.length) {
    alsTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-als-tab');
        alsTabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
        alsPanes.forEach(function (p) {
          p.style.display = p.getAttribute('data-als-pane') === id ? '' : 'none';
        });
      });
    });
  }

  /* 5. YDS KELİME KİTAPP — Live Vocabulary & Quiz Simulator */
  var ydsWords = [
    {
      w: 'ubiquitous',
      ph: '/juːˈbɪk.wɪ.təs/',
      type: 'Sıfat (Adjective) · Akademik / YDS',
      tr: 'Her yerde bulunan, yaygın, hazır ve nazır',
      syn: 'omnipresent, pervasive, universal',
      ant: 'rare, scarce, uncommon',
      pat: 'ubiquitous in + isim (ubiquitous in modern society)',
      ex: 'Smartphones have become ubiquitous in everyday life across the globe.',
      qOpt: ['Nadir görülen', 'Her yerde bulunan / yaygın', 'Geçici olan', 'Tartışmalı'],
      qAns: 1
    },
    {
      w: 'mitigate',
      ph: '/ˈmɪt.ɪ.ɡeɪt/',
      type: 'Fiil (Verb) · YDS & YÖKDİL Fen/Sağlık',
      tr: 'Hafifletmek, azaltmak, yatıştırmak',
      syn: 'alleviate, reduce, diminish, ease',
      ant: 'aggravate, intensify, worsen',
      pat: 'mitigate the effects / risks / impact of',
      ex: 'Planting more trees can help mitigate the effects of climate change.',
      qOpt: ['Şiddetlendirmek', 'Görmezden gelmek', 'Hafifletmek / azaltmak', 'Ertelemek'],
      qAns: 2
    },
    {
      w: 'ambiguous',
      ph: '/æmˈbɪɡ.ju.əs/',
      type: 'Sıfat (Adjective) · YDS & YDT',
      tr: 'Belirsiz, muğlak, iki anlamlı',
      syn: 'vague, equivocal, obscure, unclear',
      ant: 'explicit, clear, unambiguous',
      pat: 'remain ambiguous / ambiguous statement',
      ex: 'The wording of the agreement was deliberately ambiguous.',
      qOpt: ['Kesin ve net', 'Belirsiz / muğlak', 'Zorunlu', 'Geleneksel'],
      qAns: 1
    },
    {
      w: 'detrimental',
      ph: '/ˌdet.rɪˈmen.təl/',
      type: 'Sıfat (Adjective) · YÖKDİL Sağlık & Sosyal',
      tr: 'Zararlı, yıpratıcı, olumsuz etkili',
      syn: 'harmful, damaging, adverse, deleterious',
      ant: 'beneficial, favorable, advantageous',
      pat: 'detrimental to + isim (detrimental to health)',
      ex: 'Chronic sleep deprivation is detrimental to cognitive performance.',
      qOpt: ['Zararlı / olumsuz', 'Faydalı', 'Tarafsız', 'Hızlı gelişen'],
      qAns: 0
    },
    {
      w: 'scrutinize',
      ph: '/ˈskruː.tɪ.naɪz/',
      type: 'Fiil (Verb) · Akademik Okuma',
      tr: 'Dikkatle incelemek, didik didik etmek',
      syn: 'examine, inspect, analyze closely',
      ant: 'glance at, overlook, ignore',
      pat: 'closely scrutinize + data / evidence',
      ex: 'The committee will closely scrutinize all financial documents.',
      qOpt: ['Özetlemek', 'Dikkatle incelemek', 'Reddetmek', 'Gizlemek'],
      qAns: 1
    }
  ];

  var ydsCardEl = document.getElementById('ydsLiveWord');
  if (ydsCardEl) {
    var yIdx = 0, knownCount = 14, reviewCount = 4;
    var elW = document.getElementById('ydsW');
    var elPh = document.getElementById('ydsPh');
    var elType = document.getElementById('ydsType');
    var elTr = document.getElementById('ydsTr');
    var elSyn = document.getElementById('ydsSyn');
    var elAnt = document.getElementById('ydsAnt');
    var elPat = document.getElementById('ydsPat');
    var elEx = document.getElementById('ydsEx');
    var elStat = document.getElementById('ydsStatText');
    var elQuizOpts = document.getElementById('ydsQuizOpts');
    var elQuizFeedback = document.getElementById('ydsQuizFeedback');

    function renderYds(idx) {
      var item = ydsWords[idx % ydsWords.length];
      if (elW) elW.textContent = item.w;
      if (elPh) elPh.textContent = item.ph;
      if (elType) elType.textContent = item.type;
      if (elTr) elTr.textContent = item.tr;
      if (elSyn) elSyn.textContent = item.syn;
      if (elAnt) elAnt.textContent = item.ant;
      if (elPat) elPat.textContent = item.pat;
      if (elEx) elEx.textContent = '“' + item.ex + '”';
      if (elStat) {
        elStat.textContent =
          'Kelime ' + (idx + 1) + ' / ' + ydsWords.length +
          ' · Biliyorum: ' + knownCount + ' · Tekrar Kuyruğu: ' + reviewCount;
      }
      if (elQuizOpts) {
        elQuizOpts.innerHTML = '';
        if (elQuizFeedback) elQuizFeedback.textContent = 'Yukarıdaki kelimenin doğru Türkçe karşılığını seçin:';
        item.qOpt.forEach(function (optText, oIdx) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'als-btn';
          b.style.textAlign = 'left';
          b.textContent = String.fromCharCode(65 + oIdx) + ') ' + optText;
          b.addEventListener('click', function () {
            if (oIdx === item.qAns) {
              b.className = 'als-btn good';
              if (elQuizFeedback) elQuizFeedback.textContent = '✅ Doğru! "' + item.w + '" = ' + item.tr + '.';
            } else {
              b.className = 'als-btn warn';
              if (elQuizFeedback) elQuizFeedback.textContent = '❌ Tekrar kuyruğuna eklendi. Doğru anlam: ' + item.tr;
            }
          });
          elQuizOpts.appendChild(b);
        });
      }
    }

    document.querySelectorAll('[data-yds-word-idx]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        yIdx = parseInt(btn.getAttribute('data-yds-word-idx') || '0', 10);
        document.querySelectorAll('[data-yds-word-idx]').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        renderYds(yIdx);
      });
    });

    var btnKnow = document.getElementById('ydsBtnKnow');
    var btnRev = document.getElementById('ydsBtnReview');
    if (btnKnow) {
      btnKnow.addEventListener('click', function () {
        knownCount++;
        yIdx = (yIdx + 1) % ydsWords.length;
        renderYds(yIdx);
      });
    }
    if (btnRev) {
      btnRev.addEventListener('click', function () {
        reviewCount++;
        yIdx = (yIdx + 1) % ydsWords.length;
        renderYds(yIdx);
      });
    }
    renderYds(0);
  }

  /* 6. MY DIARY — Live Mood & Journal Entry Preview */
  var diaryMoodBtns = document.querySelectorAll('[data-diary-mood]');
  var diaryMoodBadge = document.getElementById('diaryLiveMood');
  var diaryTitleInput = document.getElementById('diaryLiveTitle');
  var diaryTitleOut = document.getElementById('diaryOutTitle');
  if (diaryMoodBtns.length && diaryMoodBadge) {
    diaryMoodBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        diaryMoodBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        diaryMoodBadge.textContent = btn.getAttribute('data-diary-mood');
      });
    });
  }
  if (diaryTitleInput && diaryTitleOut) {
    diaryTitleInput.addEventListener('input', function () {
      diaryTitleOut.textContent = diaryTitleInput.value || 'Bugünün Unutulmaz Anısı';
    });
  }

  /* 7. KUBE RUSH — Live 3D Cube Scale & Obstacle Simulator */
  var kubeSlider = document.getElementById('kubeScaleSlider');
  var kubeBox = document.getElementById('kubeLiveBox');
  var kubeScaleLabel = document.getElementById('kubeScaleLabel');
  var kubeObsStatus = document.getElementById('kubeObsStatus');
  if (kubeSlider && kubeBox) {
    function updateKube(val) {
      var v = parseFloat(val); // 0.4 to 1.8
      var w = Math.round(76 / Math.sqrt(v));
      var h = Math.round(76 * v);
      kubeBox.style.width = w + 'px';
      kubeBox.style.height = h + 'px';
      if (kubeScaleLabel) kubeScaleLabel.textContent = 'Ölçek: ' + v.toFixed(2) + 'x';
      if (kubeObsStatus) {
        if (v < 0.75) {
          kubeObsStatus.textContent = '✅ Düşük Duvar: Küp küçüldü, alt boşluktan hızla geçiyor!';
        } else if (v > 1.3) {
          kubeObsStatus.textContent = '✅ Yüksek Bar & Dar Sütun: Küp uzadı ve inceldi, dar geçitten sığıyor!';
        } else {
          kubeObsStatus.textContent = '⚡ Dengeli Boyut (1.00x): Tünel ve bölünmüş kapılar için ideal merkez ölçeği.';
        }
      }
    }
    kubeSlider.addEventListener('input', function () { updateKube(kubeSlider.value); });
    document.querySelectorAll('[data-kube-preset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-kube-preset');
        kubeSlider.value = val;
        updateKube(val);
      });
    });
    updateKube(kubeSlider.value);
  }

  /* 8. APP PLAKA KONTROL — Live 7-Criteria Turkish Plate Inspector */
  var plateInput = document.getElementById('plateLiveInput');
  var plateRenderText = document.getElementById('plateRenderText');
  var plateRenderBox = document.getElementById('plateRenderBox');
  var plateVerdict = document.getElementById('plateLiveVerdict');
  var plateCityInfo = document.getElementById('plateCityInfo');
  var trCities = {
    '01': 'Adana', '06': 'Ankara', '07': 'Antalya', '16': 'Bursa', '26': 'Eskişehir',
    '34': 'İstanbul', '35': 'İzmir', '41': 'Kocaeli', '42': 'Konya', '48': 'Muğla',
    '54': 'Sakarya', '55': 'Samsun', '61': 'Trabzon', '81': 'Düzce'
  };
  function updatePlateMode(mode, text) {
    if (plateRenderText && text) plateRenderText.textContent = text.toUpperCase();
    var code = (plateRenderText ? plateRenderText.textContent : '34').trim().slice(0, 2);
    var city = trCities[code] || ('İl Kodu ' + code);
    if (plateCityInfo) plateCityInfo.textContent = '📍 Tespit Edilen İl: ' + code + ' (' + city + ')';
    if (!plateRenderBox || !plateVerdict) return;
    if (mode === 'app') {
      plateRenderText.style.fontWeight = '900';
      plateRenderText.style.letterSpacing = '0.01em';
      plateVerdict.innerHTML = '🚨 <strong>SONUÇ: APP PLAKA TESPİT EDİLDİ (%96 Güven)</strong><br>Kalın/etli Beşiktaş-Fransız baskı karakterler, standart dışı DIN 1451 fontu ve eksik soğuk mühür/QR.';
      plateVerdict.style.borderColor = '#ef4444';
      plateVerdict.style.background = 'rgba(239,68,68,0.14)';
    } else {
      plateRenderText.style.fontWeight = '600';
      plateRenderText.style.letterSpacing = '0.12em';
      plateVerdict.innerHTML = '✅ <strong>SONUÇ: STANDART YÖNETMELİK PLAKASI (%99 Güven)</strong><br>DIN 1451 ince font, sol TR mavi hologram bandı, 2024+ güvenlik QR kodu ve resmi soğuk mühür uygun.';
      plateVerdict.style.borderColor = '#10b981';
      plateVerdict.style.background = 'rgba(16,185,129,0.14)';
    }
  }
  if (plateInput) {
    plateInput.addEventListener('input', function () {
      updatePlateMode(plateInput.getAttribute('data-mode') || 'standard', plateInput.value || '34 AB 1234');
    });
  }
  document.querySelectorAll('[data-plate-preset]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-plate-preset]').forEach(function (b) { b.classList.toggle('active', b === btn); });
      var mode = btn.getAttribute('data-plate-mode') || 'standard';
      var val = btn.getAttribute('data-plate-preset') || '34 AB 1234';
      if (plateInput) {
        plateInput.value = val;
        plateInput.setAttribute('data-mode', mode);
      }
      updatePlateMode(mode, val);
    });
  });

  /* 9. ANI YAKALA — Live GPS Watermark & Location Stamp Studio */
  var stampLocBtns = document.querySelectorAll('[data-stamp-loc]');
  var stampLocOut = document.getElementById('stampOutLoc');
  var stampCoordOut = document.getElementById('stampOutCoord');
  var stampWeatherOut = document.getElementById('stampOutWeather');
  var stampNoteIn = document.getElementById('stampNoteInput');
  var stampNoteOut = document.getElementById('stampOutNote');
  if (stampLocBtns.length) {
    stampLocBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        stampLocBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        if (stampLocOut) stampLocOut.textContent = btn.getAttribute('data-stamp-loc');
        if (stampCoordOut) stampCoordOut.textContent = btn.getAttribute('data-stamp-coord');
        if (stampWeatherOut) stampWeatherOut.textContent = btn.getAttribute('data-stamp-weather');
      });
    });
  }
  if (stampNoteIn && stampNoteOut) {
    stampNoteIn.addEventListener('input', function () {
      stampNoteOut.textContent = stampNoteIn.value || 'Galata Kulesi’nde gün batımı yürüyüşü ✨';
    });
  }

  /* 10. SU İÇME HATIRLATICISI — Live Hydration Wave Ring & Goal Calculator */
  var waterFillEl = document.getElementById('waterLiveFill');
  var waterTextEl = document.getElementById('waterLiveText');
  var waterPctEl = document.getElementById('waterLivePct');
  if (waterFillEl && waterTextEl) {
    var currentMl = 1650, goalMl = 2500;
    function renderWater() {
      var pct = Math.min(100, Math.round((currentMl / goalMl) * 100));
      waterFillEl.style.height = pct + '%';
      waterTextEl.textContent = currentMl + ' / ' + goalMl + ' ml';
      if (waterPctEl) waterPctEl.textContent = '%' + pct + ' Tamamlandı';
    }
    document.querySelectorAll('[data-add-water]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var delta = parseInt(btn.getAttribute('data-add-water') || '0', 10);
        if (delta === 0) currentMl = 0;
        else currentMl = Math.min(goalMl + 1000, currentMl + delta);
        renderWater();
      });
    });
    renderWater();
  }
})();
