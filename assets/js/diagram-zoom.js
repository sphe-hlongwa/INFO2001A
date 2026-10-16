/* Diagram viewer for small screens.
   - CSS (diagram-zoom.css) shrinks every .dsd-fig diagram to fit the card width.
   - Tapping a diagram opens a full-screen viewer: pinch / drag / double-tap / +,- buttons.
   Zooming resizes the SVG itself (not a CSS scale), so text and lines stay sharp. */
(function () {
  'use strict';

  var MOBILE = window.matchMedia('(max-width: 900px)');
  var MAX_ZOOM = 8;            // relative to the "fit" size
  var DOUBLE_TAP_ZOOM = 2.5;

  // Diagrams page uses .dsd-fig; the tests and mock papers use .diagram-wrap (SVG or PNG inside)
  var FIG_SEL = '.dsd-fig, .diagram-wrap';

  var state = null; // set while the viewer is open

  /* ---------- wire up the inline figures ---------- */
  // Clicks are delegated, so diagrams that are rendered by JS or revealed later
  // (model answers, quiz cards, ...) work without any extra setup.
  function mainEl(fig) { return fig.querySelector('svg, img'); }

  function init() {
    document.addEventListener('click', function (e) {
      if (!MOBILE.matches || state) return;
      var fig = e.target.closest && e.target.closest(FIG_SEL);
      if (!fig || !mainEl(fig)) return;
      open(fig);
    });
    document.addEventListener('keydown', function (e) {
      if (state || (e.key !== 'Enter' && e.key !== ' ') || !MOBILE.matches) return;
      var fig = e.target.classList && e.target.matches && e.target.matches(FIG_SEL) ? e.target : null;
      if (fig && mainEl(fig)) { e.preventDefault(); open(fig); }
    });

    // make figures keyboard-focusable, including ones added later
    function decorate(root) {
      var list = (root.matches && root.matches(FIG_SEL)) ? [root] : [];
      if (root.querySelectorAll) list = list.concat([].slice.call(root.querySelectorAll(FIG_SEL)));
      list.forEach(function (f) { if (!f.hasAttribute('tabindex') && mainEl(f)) f.tabIndex = 0; });
    }
    decorate(document);
    if (window.MutationObserver) {
      new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          [].forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1) decorate(n); });
        });
      }).observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  /* ---------- viewer ---------- */
  function open(fig) {
    if (state) return;
    var src = mainEl(fig);
    if (!src) return;
    var isImg = src.tagName.toLowerCase() === 'img';

    // natural size of the drawing: viewBox for SVG, pixel size for images
    var vbW, vbH;
    if (isImg) {
      vbW = src.naturalWidth; vbH = src.naturalHeight;
    } else {
      var vb = (src.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
      vbW = vb[2]; vbH = vb[3];
    }
    if (!vbW || !vbH) {
      var r0 = src.getBoundingClientRect();
      vbW = r0.width || 800; vbH = r0.height || 500;
    }

    var title = fig.getAttribute('aria-label') || src.getAttribute('aria-label') || src.getAttribute('alt') ||
      (!isImg && src.querySelector('title') ? src.querySelector('title').textContent : '') || 'Diagram';

    // The Diagrams page styles its figures with "#section .dsd-fig ...", so there the viewer
    // must live inside the same section for the clone to look identical. Elsewhere body is safest.
    var fs = document.fullscreenElement;               // a fullscreen element only paints its own children
    var host = fig.matches('.dsd-fig') ? (fig.closest('section[id]') || document.body)
             : (fs && fs !== document.documentElement && fs.contains(fig) ? fs : document.body);

    var overlay = document.createElement('div');
    overlay.className = 'dz-overlay open';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', title);
    overlay.innerHTML =
      '<div class="dz-bar">' +
        '<div class="dz-title"></div>' +
        '<button type="button" class="dz-btn" data-a="out" aria-label="Zoom out">&minus;</button>' +
        '<button type="button" class="dz-btn" data-a="in" aria-label="Zoom in">+</button>' +
        '<button type="button" class="dz-btn" data-a="fit" aria-label="Fit to screen">Fit</button>' +
        '<button type="button" class="dz-btn dz-close" data-a="close" aria-label="Close">&times;</button>' +
      '</div>' +
      '<div class="dz-stage"></div>' +
      '<div class="dz-help">Pinch or double-tap to zoom &middot; drag to move</div>';
    overlay.querySelector('.dz-title').textContent = title;

    var stage = overlay.querySelector('.dz-stage');
    var canvas = fig.cloneNode(true);
    var bg = getComputedStyle(fig).backgroundColor;          // keep the card look (white on the tests)
    ['tabindex', 'role', 'aria-label', 'id'].forEach(function (x) { canvas.removeAttribute(x); });
    canvas.className = fig.className.replace(/\bwide\b/g, '') + ' dz-canvas';
    canvas.style.cssText = '';
    canvas.style.setProperty('background-color', bg, 'important');
    Array.prototype.forEach.call(canvas.querySelectorAll('title[id]'), function (t) { t.removeAttribute('id'); });
    var svg = canvas.querySelector('svg, img');             // the drawing itself
    svg.classList.add('dz-main');
    svg.removeAttribute('aria-labelledby');
    svg.setAttribute('aria-hidden', 'true');
    if (isImg) svg.draggable = false;
    stage.appendChild(canvas);

    host.appendChild(overlay);
    document.body.classList.add('dz-lock');

    state = {
      overlay: overlay, stage: stage, canvas: canvas, svg: svg, host: host,
      vbW: vbW, vbH: vbH, fit: 1, s: 1, tx: 0, ty: 0,
      pointers: {}, last: null, raf: 0, lastTap: null, trigger: fig, pushed: false
    };

    // Android/browser Back closes the viewer instead of leaving the page
    try { history.pushState({ dz: 1 }, '', location.href); state.pushed = true; } catch (e) {}

    bind();
    computeFit();
    setScale(state.fit, null, true);
    var closeBtn = overlay.querySelector('.dz-close');
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function close(fromPop) {
    if (!state) return;
    var st = state;
    state = null;
    window.removeEventListener('resize', onResize);
    window.removeEventListener('orientationchange', onResize);
    document.removeEventListener('keydown', onKey, true);
    window.removeEventListener('popstate', onPop);
    cancelAnimationFrame(st.raf);
    st.overlay.remove();
    document.body.classList.remove('dz-lock');
    if (st.pushed && !fromPop) { try { history.back(); } catch (e) {} }
    if (st.trigger && st.trigger.focus) st.trigger.focus({ preventScroll: true });
  }

  /* ---------- geometry ---------- */
  function computeFit() {
    var r = state.stage.getBoundingClientRect();
    state.sw = r.width; state.sh = r.height;
    // fit the whole diagram on screen (width is the limit for wide diagrams)
    state.fit = Math.min(r.width / state.vbW, r.height / state.vbH);
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  // s = pixels per viewBox unit. cx,cy = screen point (relative to stage) that stays fixed.
  function setScale(s, anchor, instant) {
    var st = state;
    s = clamp(s, st.fit, Math.max(st.fit * MAX_ZOOM, 2));
    var ax = anchor ? anchor.x : st.sw / 2;
    var ay = anchor ? anchor.y : st.sh / 2;
    var k = s / st.s;
    st.tx = ax - (ax - st.tx) * k;
    st.ty = ay - (ay - st.ty) * k;
    st.s = s;
    if (instant && !anchor) { // initial / fit: centre it
      st.tx = (st.sw - st.vbW * s) / 2;
      st.ty = (st.sh - st.vbH * s) / 2;
    }
    render();
  }

  function constrain() {
    var st = state, w = st.vbW * st.s, h = st.vbH * st.s;
    st.tx = w <= st.sw ? (st.sw - w) / 2 : clamp(st.tx, st.sw - w, 0);
    st.ty = h <= st.sh ? (st.sh - h) / 2 : clamp(st.ty, st.sh - h, 0);
  }

  function render() {
    var st = state;
    if (!st) return;
    constrain();
    if (st.raf) return;
    st.raf = requestAnimationFrame(function () {
      st.raf = 0;
      if (state !== st) return;
      var w = st.vbW * st.s, h = st.vbH * st.s;
      st.canvas.style.width = w + 'px';
      st.canvas.style.height = h + 'px';
      st.canvas.style.transform = 'translate3d(' + st.tx + 'px,' + st.ty + 'px,0)';
    });
  }

  /* ---------- input ---------- */
  function bind() {
    var st = state, stage = st.stage;
    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);
    stage.addEventListener('wheel', onWheel, { passive: false });
    st.overlay.addEventListener('click', function (e) {
      var b = e.target.closest('[data-a]');
      if (!b) return;
      var a = b.getAttribute('data-a');
      if (a === 'close') close();
      else if (a === 'in') setScale(state.s * 1.5);
      else if (a === 'out') setScale(state.s / 1.5);
      else if (a === 'fit') { state.s = state.fit; setScale(state.fit, null, true); }
    });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    document.addEventListener('keydown', onKey, true);
    window.addEventListener('popstate', onPop);
  }

  function local(e) {
    var r = state.stage.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function onDown(e) {
    if (!state) return;
    state.stage.setPointerCapture(e.pointerId);
    var p = local(e);
    state.pointers[e.pointerId] = { x: p.x, y: p.y, sx: p.x, sy: p.y, t: Date.now() };
    state.stage.classList.add('dragging');
    var ids = Object.keys(state.pointers);
    if (ids.length === 2) state.last = pinchInfo();
  }

  function pinchInfo() {
    var ids = Object.keys(state.pointers), a = state.pointers[ids[0]], b = state.pointers[ids[1]];
    return { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }

  function onMove(e) {
    var st = state;
    if (!st || !st.pointers[e.pointerId]) return;
    var p = local(e), ptr = st.pointers[e.pointerId];
    var ids = Object.keys(st.pointers);

    if (ids.length === 1) {
      st.tx += p.x - ptr.x;
      st.ty += p.y - ptr.y;
      ptr.x = p.x; ptr.y = p.y;
      render();
    } else if (ids.length >= 2) {
      ptr.x = p.x; ptr.y = p.y;
      var now = pinchInfo(), prev = st.last || now;
      // pan with the midpoint, zoom around it
      st.tx += now.x - prev.x;
      st.ty += now.y - prev.y;
      setScale(st.s * (now.d / prev.d), { x: now.x, y: now.y });
      st.last = now;
    }
  }

  function onUp(e) {
    var st = state;
    if (!st || !st.pointers[e.pointerId]) return;
    var ptr = st.pointers[e.pointerId];
    var wasSingle = Object.keys(st.pointers).length === 1;
    var moved = Math.hypot(ptr.x - ptr.sx, ptr.y - ptr.sy);
    var quick = Date.now() - ptr.t < 300;
    delete st.pointers[e.pointerId];
    st.last = null;
    if (!Object.keys(st.pointers).length) st.stage.classList.remove('dragging');

    if (wasSingle && moved < 10 && quick) {           // a tap
      var now = Date.now(), lt = st.lastTap;
      if (lt && now - lt.t < 320 && Math.hypot(ptr.x - lt.x, ptr.y - lt.y) < 30) {
        st.lastTap = null;                             // double tap: toggle zoom
        if (st.s > st.fit * 1.2) { st.s = st.fit; setScale(st.fit, null, true); }
        else setScale(st.fit * DOUBLE_TAP_ZOOM, { x: ptr.x, y: ptr.y });
      } else {
        st.lastTap = { t: now, x: ptr.x, y: ptr.y };
      }
    } else if (Object.keys(st.pointers).length === 1) {
      // dropped from pinch to a single finger: carry on panning from there
      var id = Object.keys(st.pointers)[0];
      st.pointers[id].sx = st.pointers[id].x; st.pointers[id].sy = st.pointers[id].y;
    }
  }

  function onWheel(e) {
    e.preventDefault();
    var p = local(e);
    setScale(state.s * Math.exp(-e.deltaY * 0.0015), p);
  }

  function onResize() {
    if (!state) return;
    var ratio = state.s / state.fit;
    computeFit();
    state.s = state.fit * Math.min(ratio, 1);
    setScale(state.fit * Math.min(ratio, 1), null, true);
  }

  function onKey(e) {
    if (!state) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
    else if (e.key === '+' || e.key === '=') setScale(state.s * 1.5);
    else if (e.key === '-') setScale(state.s / 1.5);
    else if (e.key === 'Tab') {                         // keep focus inside the dialog
      var f = state.overlay.querySelectorAll('button');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function onPop() { if (state) close(true); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
