/* argonarnav.github.io — small progressive enhancements. The page works without this file. */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var toggle = document.querySelector('.theme-toggle');
  function effectiveTheme() {
    var t = root.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return darkQuery && darkQuery.matches ? 'dark' : 'light';
  }
  function syncToggle() {
    if (!toggle) return;
    var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    var color = effectiveTheme() === 'dark' ? '#0E1012' : '#F5F3EE';
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      if (root.hasAttribute('data-theme')) m.setAttribute('content', color);
    });
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable: theme lasts this visit */ }
      syncToggle();
    });
    if (darkQuery && darkQuery.addEventListener) darkQuery.addEventListener('change', syncToggle);
    syncToggle();
  }

  /* ---------- Mobile menu ---------- */
  var nav = document.querySelector('.nav');
  var menuBtn = document.querySelector('.menu-btn');
  function setMenu(open) {
    if (!nav || !menuBtn) return;
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    document.querySelectorAll('.nav-links a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
    });
  }

  /* ---------- Header border on scroll ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var hasIO = 'IntersectionObserver' in window;

  /* ---------- Active section in nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (hasIO && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = byId[en.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main > section[id]').forEach(function (el) { navIO.observe(el); });
  }

  /* ---------- Pipeline stage filter ---------- */
  var stages = Array.prototype.slice.call(document.querySelectorAll('.stage'));
  var work = document.getElementById('work');
  var note = document.getElementById('pipe-note');
  var status = document.getElementById('filter-status');
  var statusText = document.getElementById('filter-text');
  var clearBtn = document.getElementById('filter-clear');
  function stageName(key) {
    var b = document.querySelector('.stage[data-stage="' + key + '"] .t');
    return b ? b.textContent : key;
  }
  function selectStage(key, scroll) {
    var count = 0;
    stages.forEach(function (s) { s.setAttribute('aria-pressed', String(s.getAttribute('data-stage') === key)); });
    if (!work) return;
    work.querySelectorAll('.bullets li').forEach(function (li) {
      var list = (li.getAttribute('data-stages') || '').split(/\s+/);
      var hit = !!key && list.indexOf(key) > -1;
      li.classList.toggle('hit', hit);
      if (hit) count++;
    });
    work.querySelectorAll('.tags .chip').forEach(function (c) {
      c.classList.toggle('on', !!key && c.getAttribute('data-stage') === key);
    });
    work.classList.toggle('is-filtering', !!key);
    var msg = key ? stageName(key) + ': ' + count + ' matching item' + (count === 1 ? '' : 's') + ' highlighted in Experience.' : '';
    if (note) note.textContent = msg;
    if (status) {
      status.hidden = !key;
      if (statusText) statusText.textContent = key ? 'Highlighting ' + stageName(key) + ' · ' + count + ' item' + (count === 1 ? '' : 's') : '';
    }
    if (key && scroll) work.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
  stages.forEach(function (s) {
    s.addEventListener('click', function () {
      var on = s.getAttribute('aria-pressed') === 'true';
      selectStage(on ? null : s.getAttribute('data-stage'), !on);
    });
  });
  if (clearBtn) clearBtn.addEventListener('click', function () { selectStage(null, false); });

  /* ---------- Detection boxes: draw in, count up ---------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-conf') || '0');
    if (reduceMotion) { el.textContent = target.toFixed(2); return; }
    var start = null, dur = 700;
    function step(t) {
      if (start === null) start = t;
      var p = Math.min(1, (t - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(2);
      if (p < 1) window.requestAnimationFrame(step);
    }
    el.textContent = '0.00';
    window.requestAnimationFrame(step);
  }
  function reveal(box) {
    box.classList.add('is-in');
    var c = box.querySelector('.conf[data-conf]');
    if (c) window.setTimeout(function () { countUp(c); }, reduceMotion ? 0 : 300);
  }
  var boxes = Array.prototype.slice.call(document.querySelectorAll('.js-det'));
  if (!hasIO || reduceMotion) {
    boxes.forEach(function (b) { b.classList.add('is-in'); });
  } else {
    var boxIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        reveal(en.target);
        boxIO.unobserve(en.target);
      });
    }, { threshold: 0.35 });
    boxes.forEach(function (b) { boxIO.observe(b); });
  }
})();
