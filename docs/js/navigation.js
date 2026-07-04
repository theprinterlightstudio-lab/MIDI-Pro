// MIDI Pro Docs — shared behavior. Vanilla JS only, no dependencies.
// Included on every page. Requires elements with ids: hamburger, sidebar,
// sidebar-overlay, theme-toggle, and nav-links with [data-page] attributes.

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Active page highlighting ----------
  var current = document.body.getAttribute('data-page');
  document.querySelectorAll('.nav-link').forEach(function (link) {
    if (link.getAttribute('data-page') === current) {
      link.classList.add('active');
    }
  });

  // ---------- Theme toggle (defaults to system preference) ----------
  var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  var theme = prefersLight ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  var themeBtn = document.getElementById('theme-toggle');
  function renderThemeIcon() { if (themeBtn) themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️'; }
  renderThemeIcon();
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      renderThemeIcon();
    });
  }

  // ---------- Mobile sidebar ----------
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebar-overlay');
  var burger = document.getElementById('hamburger');
  function openNav() { sidebar.classList.add('open'); overlay.classList.add('show'); }
  function closeNav() { sidebar.classList.remove('open'); overlay.classList.remove('show'); }
  if (burger) {
    burger.addEventListener('click', function () {
      sidebar.classList.contains('open') ? closeNav() : openNav();
    });
  }
  if (overlay) overlay.addEventListener('click', closeNav);

  // ---------- Copy-to-clipboard chips ----------
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    var text = btn.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(function () {
      var orig = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = '✓';
      setTimeout(function () { btn.classList.remove('copied'); btn.innerHTML = orig; }, 1200);
    });
  });

});
