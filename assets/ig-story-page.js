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

  var tabs = document.querySelectorAll('[data-story-platform]');
  var tabBoth = document.querySelector('[data-story-platform="both"]');
  var tabIos = document.querySelector('[data-story-platform="ios"]');

  if (!app.ios && tabIos) tabIos.hidden = true;
  if (!app.ios && tabBoth) {
    tabBoth.hidden = true;
    currentPlatform = 'android';
  }
  if (!app.android && tabBoth) tabBoth.hidden = true;

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
