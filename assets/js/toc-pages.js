/* Table-of-contents behaviour shared by sql-fundamentals.html and diagrams.html:
   mobile drawer, one-section-at-a-time pagination, and TOC search. */
  (function () {
    var toggle = document.getElementById('tocToggle');
    if (!toggle) return;

    // Close the drawer after tapping a link inside the TOC (mobile only)
    document.querySelectorAll('.toc a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.checked = false;
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.checked) {
        toggle.checked = false;
      }
    });

    // Keep the "Contents" toggle bar pinned directly beneath the sticky
    // header, whatever height the header renders at (it varies with
    // viewport width / text wrapping).
    var headerEl = document.querySelector('header');
    var toggleBtn = document.querySelector('.toc-toggle-btn');
    if (headerEl && toggleBtn) {
      var syncOffset = function () {
        toggleBtn.style.top = headerEl.offsetHeight + 'px';
      };
      syncOffset();
      window.addEventListener('resize', syncOffset);
      if (window.ResizeObserver) {
        new ResizeObserver(syncOffset).observe(headerEl);
      }
    }
  })();

  // ---- pagination: show one top-level section at a time ----
  (function () {
    var main = document.querySelector('main');
    if (!main) return;
    var sections = Array.prototype.slice.call(main.querySelectorAll(':scope > section[id]'));
    if (!sections.length) return;

    function buildNav() {
      var nav = document.createElement('div');
      nav.className = 'page-nav';

      var prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'page-prev';
      prevBtn.textContent = '← Previous';

      var indicator = document.createElement('span');
      indicator.className = 'page-indicator';

      var nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'page-next';
      nextBtn.textContent = 'Next →';

      nav.appendChild(prevBtn);
      nav.appendChild(indicator);
      nav.appendChild(nextBtn);

      prevBtn.addEventListener('click', function () {
        var curIdx = sections.findIndex(function (s) { return s.classList.contains('page-active'); });
        if (curIdx > 0) navigateTo(sections[curIdx - 1].id);
      });
      nextBtn.addEventListener('click', function () {
        var curIdx = sections.findIndex(function (s) { return s.classList.contains('page-active'); });
        if (curIdx < sections.length - 1) navigateTo(sections[curIdx + 1].id);
      });

      return nav;
    }

    // Give every section its own prev/next footer
    sections.forEach(function (s) { s.appendChild(buildNav()); });

    function syncNavButtons(activeIdx) {
      sections.forEach(function (s, i) {
        var nav = s.querySelector(':scope > .page-nav');
        if (!nav) return;
        nav.querySelector('.page-prev').disabled = (i === 0);
        nav.querySelector('.page-next').disabled = (i === sections.length - 1);
        nav.querySelector('.page-indicator').textContent = 'Page ' + (i + 1) + ' of ' + sections.length;
      });
    }

    function updateTocHighlight(activeId) {
      document.querySelectorAll('.toc a.current-page').forEach(function (a) {
        a.classList.remove('current-page');
      });
      var link = document.querySelector('.toc a[href="#' + activeId + '"]');
      if (link) {
        link.classList.add('current-page');
        var details = link.closest('details');
        if (details) details.open = true;
      }
    }

    function showSectionById(id, skipScroll) {
      var idx = sections.findIndex(function (s) { return s.id === id; });
      if (idx === -1) return;
      sections.forEach(function (s, i) { s.classList.toggle('page-active', i === idx); });
      syncNavButtons(idx);
      updateTocHighlight(id);
      if (!skipScroll) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    function navigateTo(id, skipScroll) {
      showSectionById(id, skipScroll);
      history.replaceState(null, '', '#' + id);
    }

    // Intercept every TOC link: jump to its page instead of scrolling a long document
    document.querySelectorAll('.toc a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = this.getAttribute('href') || '';
        if (href.charAt(0) !== '#') return;
        e.preventDefault();
        var targetId = href.slice(1);
        var targetEl = document.getElementById(targetId);
        if (!targetEl) return;
        var sectionEl = targetEl.closest('section[id]');
        if (!sectionEl) return;
        var isSubLink = sectionEl.id !== targetId;
        navigateTo(sectionEl.id, isSubLink);
        if (isSubLink) {
          requestAnimationFrame(function () {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      });
    });

    // Work out the starting page: deep-link hash if present, else the first section
    var initialId = sections[0].id;
    var deepTarget = null;
    if (location.hash) {
      var h = location.hash.slice(1);
      var el = document.getElementById(h);
      if (el) {
        var sec = el.closest('section[id]');
        if (sec) {
          initialId = sec.id;
          if (sec.id !== h) deepTarget = el; // link points inside a page: scroll to it once that page is shown
        }
      }
    }
    showSectionById(initialId, true);
    if (deepTarget) {
      requestAnimationFrame(function () { deepTarget.scrollIntoView({ block: 'start' }); });
    }
  })();

  // ---- toc search ----
  (function () {
    var input = document.getElementById('tocSearchInput');
    if (!input) return;
    var tocDetails = document.querySelectorAll('.toc details');
    var tocLeafs = document.querySelectorAll('.toc-leaf');
    
    input.addEventListener('input', function(e) {
      var query = e.target.value.toLowerCase();
      
      tocDetails.forEach(function(detail) {
        var summary = detail.querySelector('summary').textContent.toLowerCase();
        var links = detail.querySelectorAll('li a');
        var summaryMatch = summary.includes(query);
        var matchFound = summaryMatch;
        
        links.forEach(function(link) {
          // a matching group title keeps all of its links visible; otherwise only matching links show
          if (summaryMatch || link.textContent.toLowerCase().includes(query)) {
            matchFound = true;
            link.style.display = '';
          } else {
            link.style.display = query ? 'none' : '';
          }
        });
        
        detail.style.display = matchFound ? '' : 'none';
        if (query && matchFound) {
          detail.open = true;
        } else if (!query) {
          detail.open = false;
        }
      });
      
      tocLeafs.forEach(function(leaf) {
        if (leaf.textContent.toLowerCase().includes(query)) {
          leaf.style.display = '';
        } else {
          leaf.style.display = query ? 'none' : '';
        }
      });
    });
  })();
