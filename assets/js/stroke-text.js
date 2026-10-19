/* StrokeText: vanilla, dependency-free port of the React Bits <StrokeText /> component.
   Each glyph's outline draws on (staggered), then the fill wipes/fades in.

   The whole animation is a pure function of time (render(t)), so it can be driven by any clock.
   Here it is driven by the hero intro video's own currentTime (follow()), which keeps the two
   perfectly in sync, including stalls and buffering.

   Usage:
     var st = StrokeText(document.getElementById('hero-title'), { fontSize: 48, ... });
     st.follow(videoEl, { start: 0.5, span: 5.5 }); // draw along with the video
     st.end();                                      // jump straight to the finished state
*/
(function (global) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var uid = 0;

  var DEFAULTS = {
    text: null,              // defaults to the host element's text
    strokeColor: '#A78BFA',
    fillColor: 'currentColor',
    strokeWidth: 1.4,
    drawDuration: 1.6,       // seconds each character outline spends drawing on
    fillDelay: 0.2,          // seconds between outline draw and fill start
    stagger: 0.05,           // seconds between characters
    ease: 'power2.out',
    fillMode: 'wipe',        // 'wipe' | 'fade' | 'none'
    wipeFrom: 'left',        // 'left' | 'right' | 'top' | 'bottom'
    fontSize: 128,           // size (px) the glyphs are measured at; CSS then scales it to the host's font-size
    letterSpacing: -4,       // px, at fontSize
    reverse: false,
    hoverRedraw: true,
    onReady: null
  };

  function svgEl(name, attrs) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  /* GSAP-style names: power1 = quad, power2 = cubic, ... */
  function easeFn(name) {
    var m = /^power(\d)\.(in|out|inOut)$/.exec(name || '');
    if (!m) return function (p) { return p; };
    var n = +m[1] + 1, k = m[2];
    if (k === 'in') return function (p) { return Math.pow(p, n); };
    if (k === 'out') return function (p) { return 1 - Math.pow(1 - p, n); };
    return function (p) { return p < 0.5 ? Math.pow(2 * p, n) / 2 : 1 - Math.pow(2 * (1 - p), n) / 2; };
  }

  function StrokeText(host, opts) {
    var o = {};
    var k;
    for (k in DEFAULTS) o[k] = DEFAULTS[k];
    for (k in (opts || {})) if (opts[k] != null) o[k] = opts[k]; // null/undefined fall back to defaults

    var text = o.text != null ? String(o.text) : host.textContent.replace(/\s+/g, ' ').trim();
    var chars = Array.from(text);
    var n = chars.length;
    if (!n) return stub();

    var id = 'st' + (++uid);
    var FS = o.fontSize;
    var dash = Math.max(FS * 7, 200);
    var D = o.drawDuration;
    var S = o.stagger;
    var fillOn = o.fillMode !== 'none';
    var useWipe = o.fillMode === 'wipe';
    var fillDur = Math.max(0.4, D * 0.5);
    var fillStart = D + o.fillDelay;
    var total = Math.max(D + (n - 1) * S, fillStart + fillDur);
    var easeDraw = easeFn(o.ease);
    var easeWipe = easeFn('power2.inOut');
    var easeFade = easeFn('power2.out');

    function delayOf(i) { return (o.reverse ? n - 1 - i : i) * S; }

    /* ---- build the DOM ---- */
    var wrap = document.createElement('span');
    wrap.className = 'stroke-text';
    wrap.setAttribute('role', 'img');
    wrap.setAttribute('aria-label', text);

    var svg = svgEl('svg', {
      'class': 'stroke-text__svg',
      viewBox: '0 ' + (-FS) + ' 600 ' + (FS * 1.3),
      preserveAspectRatio: 'xMidYMid meet',
      'aria-hidden': 'true'
    });
    svg.style.visibility = 'hidden';

    var defs = svgEl('defs', {});
    var clip = null, clipRect = null;
    if (useWipe) {
      clip = svgEl('clipPath', { id: id + '-wipe', clipPathUnits: 'userSpaceOnUse' });
      clipRect = svgEl('rect', { x: 0, y: 0, width: 0, height: 0 });
      clip.appendChild(clipRect);
      defs.appendChild(clip);
    }
    svg.appendChild(defs);

    var fontCss = 'font-size:' + FS + 'px;letter-spacing:' + o.letterSpacing + 'px';

    var strokeText = svgEl('text', {
      'class': 'stroke-text__stroke', x: 0, y: 0, fill: 'none',
      stroke: o.strokeColor, 'stroke-width': o.strokeWidth,
      'stroke-linejoin': 'round', 'stroke-linecap': 'round', style: fontCss
    });
    var fillText = svgEl('text', {
      'class': 'stroke-text__fill', x: 0, y: 0, fill: o.fillColor, stroke: 'none', style: fontCss
    });
    if (useWipe) fillText.setAttribute('clip-path', 'url(#' + id + '-wipe)');

    var strokes = [], fills = [];
    chars.forEach(function (ch) {
      var s = svgEl('tspan', {});
      s.textContent = ch;
      s.style.strokeDasharray = dash;
      strokeText.appendChild(s);
      strokes.push(s);
      var f = svgEl('tspan', {});
      f.textContent = ch;
      fillText.appendChild(f);
      fills.push(f);
    });
    svg.appendChild(strokeText);
    svg.appendChild(fillText);
    wrap.appendChild(svg);

    host.textContent = '';
    host.appendChild(wrap);

    /* ---- measure (needs the web font loaded) ---- */
    var box = null;
    function measure() {
      var b;
      try { b = strokeText.getBBox(); } catch (e) { return false; }
      if (!b || !b.width) return false;
      var pad = Math.max(o.strokeWidth, FS * 0.1);
      box = { x: b.x - pad, y: b.y - pad, width: b.width + pad * 2, height: b.height + pad * 2 };
      svg.setAttribute('viewBox', box.x + ' ' + box.y + ' ' + box.width + ' ' + box.height);
      /* size in em so it tracks the host's (responsive) font-size */
      svg.style.width = (box.width / FS) + 'em';
      /* keep the host's original line box: cancel the padding + extra height so the layout doesn't jump */
      var lh = parseFloat(getComputedStyle(host).lineHeight) / parseFloat(getComputedStyle(host).fontSize);
      if (!isFinite(lh)) lh = 1.1;
      var extra = (box.height / FS - lh) / 2;
      wrap.style.margin = (-extra) + 'em 0 ' + (-extra) + 'em ' + (-pad / FS) + 'em';
      return true;
    }

    /* ---- the animation, as a pure function of time t (seconds) ---- */
    function setWipe(w) {
      if (!clipRect || !box) return;
      var x = box.x, y = box.y, width = box.width, height = box.height;
      if (o.wipeFrom === 'right') { x = box.x + box.width * (1 - w); width = box.width * w; }
      else if (o.wipeFrom === 'top') { height = box.height * w; }
      else if (o.wipeFrom === 'bottom') { y = box.y + box.height * (1 - w); height = box.height * w; }
      else { width = box.width * w; }
      clipRect.setAttribute('x', x);
      clipRect.setAttribute('y', y);
      clipRect.setAttribute('width', width);
      clipRect.setAttribute('height', height);
    }

    function render(t) {
      var i, p;
      for (i = 0; i < n; i++) {
        p = clamp01((t - delayOf(i)) / D);
        strokes[i].style.strokeDashoffset = dash * (1 - easeDraw(p));
        strokes[i].style.strokeOpacity = 1;
      }
      if (!fillOn) { for (i = 0; i < n; i++) fills[i].style.opacity = 0; return; }
      if (useWipe) {
        setWipe(easeWipe(clamp01((t - fillStart) / fillDur)));
      } else {
        for (i = 0; i < n; i++) {
          fills[i].style.opacity = easeFade(clamp01((t - fillStart - delayOf(i)) / fillDur));
        }
      }
    }

    /* ---- drivers ---- */
    var ready = false;
    var mode = 'idle';          // 'idle' | 'follow' | 'done'
    var rafId = 0;
    var redrawing = false;
    var reduceMotion = global.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    function stopLoop() { if (rafId) { cancelAnimationFrame(rafId); rafId = 0; } }

    function end() {
      stopLoop();
      mode = 'done';
      if (ready) render(total + 1);
    }

    /* Draw along with a <video>: progress is derived from video.currentTime, so pauses,
       stalls and buffering on the video pause the title too. */
    function follow(video, cfg) {
      if (mode !== 'idle') return;
      cfg = cfg || {};
      var start = cfg.start || 0;
      var span = cfg.span || Math.min(total, (video.duration || total) - start);
      mode = 'follow';
      (function tick() {
        if (mode !== 'follow') return;
        var u = clamp01((video.currentTime - start) / span);
        if (ready) render(u * total);
        if (u >= 1) { end(); return; }
        rafId = requestAnimationFrame(tick);
      })();
    }

    /* Re-draw the outline when the pointer enters, once the first draw has finished. */
    function redraw() {
      if (mode !== 'done' || redrawing || !ready || reduceMotion) return;
      redrawing = true;
      var t0 = performance.now();
      var FADE = 0.2, DUR = D * 0.8;
      var runEnd = FADE + DUR + (n - 1) * S;
      var fade = easeFn('power1.out');
      (function step(now) {
        var e = (now - t0) / 1000, i, p;
        if (e < FADE) {
          var a = 1 - fade(clamp01(e / FADE));
          for (i = 0; i < n; i++) strokes[i].style.strokeOpacity = a;
        } else {
          for (i = 0; i < n; i++) {
            strokes[i].style.strokeOpacity = 1;
            p = clamp01((e - FADE - delayOf(i)) / DUR);
            strokes[i].style.strokeDashoffset = dash * (1 - easeDraw(p));
          }
        }
        if (e >= runEnd) { render(total + 1); redrawing = false; return; }
        requestAnimationFrame(step);
      })(t0);
    }
    if (o.hoverRedraw) wrap.addEventListener('pointerenter', redraw);

    /* ---- init: wait for the font, measure, show ---- */
    function init() {
      if (ready) return;
      if (!measure()) return;
      ready = true;
      svg.style.visibility = '';
      render(mode === 'done' ? total + 1 : 0);
      document.documentElement.classList.remove('st-wait');
      if (typeof o.onReady === 'function') o.onReady();
    }

    var cs = getComputedStyle(host);
    var fontSpec = cs.fontWeight + ' ' + FS + 'px ' + cs.fontFamily;
    var fontsReady = (document.fonts && document.fonts.load)
      ? Promise.race([
          document.fonts.load(fontSpec, text).then(function () { return document.fonts.ready; }),
          new Promise(function (r) { setTimeout(r, 1500); })
        ])
      : Promise.resolve();
    fontsReady.catch(function () {}).then(function () {
      init();
      /* a late font swap can change glyph widths: re-measure once it settles */
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (ready) measure(); });
    });

    return { follow: follow, end: end, redraw: redraw, duration: total, element: wrap };
  }

  function stub() {
    var noop = function () {};
    return { follow: noop, end: noop, redraw: noop, duration: 0, element: null };
  }

  global.StrokeText = StrokeText;
})(window);
