/* Floating nav bar shared by every page except Test 1 (which keeps its own sidebar).
   Edit the links / Buy Me Coffee URL here and every page updates. */
(function () {
  // Buy Me a Coffee page
  var BMC_URL = 'https://buymeacoffee.com/espee';

  var NAV = [
    { label: 'Home', href: 'index.html' },
    { label: 'Tests', items: [
      { label: 'Test 1', sub: 'SQL + Database Design', href: 'test1.html' },
      { label: 'Test 2', sub: 'SQL + Database Design + System Design + C#', href: 'test2.html' }
    ]},
    { label: 'Learn', items: [
      { label: 'Database Fundamentals', sub: 'Access SQL + DSD, wireframe, storyboard', href: 'sql-fundamentals.html' },
      { label: 'C# + SQL', sub: 'Build it, understand it, practise it', href: 'csharp-sql.html' }
    ]},
    { label: 'GitHub', href: 'https://github.com/sphe-hlongwa', external: true }
  ];

  var CHEV = '<svg class="chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5"/></svg>';
  var MUG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h13v6.5A4.5 4.5 0 0 1 12.5 20h-4A4.5 4.5 0 0 1 4 15.5V9z"/><path d="M17 10.5h1.2a2.8 2.8 0 0 1 0 5.6H17"/><path d="M7.5 3.5c-.9 1 .9 1.7 0 2.7M11 3.5c-.9 1 .9 1.7 0 2.7M14.5 3.5c-.9 1 .9 1.7 0 2.7"/></svg>';
  var BARS = '<svg class="bars" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
             '<svg class="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';

  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  function isHere(href) { return href.toLowerCase() === here; }
  function cur(href) { return isHere(href) ? ' aria-current="page"' : ''; }

  var links = NAV.map(function (n, i) {
    if (!n.items) {
      var ext = n.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return '<li class="nav-item"><a class="nav-link" href="' + n.href + '"' + ext + cur(n.href) + '>' + n.label + '</a></li>';
    }
    var childActive = n.items.some(function (c) { return isHere(c.href); });
    var menu = n.items.map(function (c) {
      return '<a class="dd-item" role="menuitem" href="' + c.href + '"' + cur(c.href) + '>' + c.label + '<small>' + c.sub + '</small></a>';
    }).join('');
    return '<li class="nav-item">' +
      '<button type="button" class="nav-link" aria-haspopup="menu" aria-expanded="false" aria-controls="dd' + i + '"' +
      (childActive ? ' aria-current="page"' : '') + '>' + n.label + CHEV + '</button>' +
      '<div class="dd" id="dd' + i + '" role="menu">' + menu + '</div></li>';
  }).join('');

  var nav = document.createElement('div');
  nav.className = 'site-nav';
  nav.innerHTML =
    '<nav class="nav-bar" aria-label="Primary">' +
      '<a class="nav-logo" href="index.html" aria-label="INFO2001A home"><img src="assets/logo.svg" alt=""></a>' +
      '<ul class="nav-links" id="navLinks">' + links + '</ul>' +
      '<div class="nav-right">' +
        '<a class="nav-cta" href="' + BMC_URL + '" target="_blank" rel="noopener noreferrer">' + MUG + '<span>Buy Me Coffee</span></a>' +
        '<button type="button" class="nav-burger" aria-label="Toggle menu" aria-expanded="false" aria-controls="navLinks">' + BARS + '</button>' +
      '</div>' +
    '</nav>';
  document.body.prepend(nav);

  var burger = nav.querySelector('.nav-burger');
  function setMenu(open) {
    nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    if (!open) closeAll();
  }
  function closeAll(except) {
    nav.querySelectorAll('.nav-item.open').forEach(function (li) {
      if (li !== except) {
        li.classList.remove('open');
        var b = li.querySelector('button.nav-link');
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('menu-open')); });

  nav.querySelectorAll('button.nav-link').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = !li.classList.contains('open');
      closeAll(li);
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) { closeAll(); if (nav.classList.contains('menu-open')) setMenu(false); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeAll(); setMenu(false); }
  });
})();
