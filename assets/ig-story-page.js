/* Shared logic for per-app Instagram Story pages */

(function () {
  'use strict';

  var slug = document.body.getAttribute('data-story-app');
  if (!slug || !window.IgStory) return;

  var app = window.IG_STORY_APPS[slug];
  if (!app) return;

  var host = document.getElementById('storyPreview');
  var currentLang = 'tr';
  var currentPlatform = 'both';

  var storyAppsWrap = document.querySelector('.ig-story-apps');
  if (storyAppsWrap && window.IG_STORY_APPS) {
    storyAppsWrap.innerHTML = Object.keys(window.IG_STORY_APPS).filter(function (k) {
      return k !== slug;
    }).map(function (k) {
      var item = window.IG_STORY_APPS[k];
      return '<a class="ig-story-app-link" href="/' + item.slug + '/story/">' +
        '<span class="e"><img src="' + item.icon + '" width="36" height="36" alt="" style="border-radius:9px;display:block"/></span>' +
        '<span class="n">' + item.name + '</span></a>';
    }).join('');
  }

  var tabs = document.querySelectorAll('[data-story-platform]');
  var tabBoth = document.querySelector('[data-story-platform="both"]');
  var tabAndroid = document.querySelector('[data-story-platform="android"]');
  var tabIos = document.querySelector('[data-story-platform="ios"]');

  if (!app.ios && tabIos) tabIos.hidden = true;
  if (!app.ios && tabBoth) {
    tabBoth.hidden = true;
    currentPlatform = 'android';
  }
  if (!app.android && tabAndroid) tabAndroid.hidden = true;
  if (!app.android && tabBoth) {
    tabBoth.hidden = true;
    currentPlatform = 'ios';
  }

  function setActiveTab(platform) {
    tabs.forEach(function (btn) {
      if (btn.hidden) return;
      var match = btn.getAttribute('data-story-platform') === platform;
      btn.classList.toggle('active', match);
    });
  }

  setActiveTab(currentPlatform);

  function refresh() {
    IgStory.preview(slug, currentLang, host, currentPlatform);
  }

  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentPlatform = btn.getAttribute('data-story-platform');
      setActiveTab(currentPlatform);
      refresh();
    });
  });

  var dlTr = document.getElementById('dlTr');
  var dlEn = document.getElementById('dlEn');

  if (dlTr) {
    dlTr.addEventListener('click', function () {
      currentLang = 'tr';
      refresh();
      IgStory.download(slug, 'tr', currentPlatform);
    });
  }

  if (dlEn) {
    dlEn.addEventListener('click', function () {
      currentLang = 'en';
      refresh();
      IgStory.download(slug, 'en', currentPlatform);
    });
  }

  refresh();
})();
