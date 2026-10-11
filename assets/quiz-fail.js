/* Quizzes only (never mock exams): when a finished quiz scores under 50%,
   play assets/fail-scream.mp4 in the middle of the screen with its green
   background keyed out, so the page shows through. At 80% or more,
   assets/quiz-pass.mp4 plays the same way.
   Call window.quizFinished(score, total) once every question is answered. */
(function () {
  var base = document.currentScript.src;
  var FAIL = { mp4: new URL('fail-scream.mp4', base).href, webm: new URL('fail-scream.webm', base).href,
               // crop to the subject inside the 576x1024 source frame
               cx: 110, cy: 225, cw: 360, ch: 480 };
  var PASS = { mp4: new URL('quiz-pass.mp4', base).href, webm: new URL('quiz-pass.webm', base).href,
               // crop to the subject inside the 1024x576 source frame
               cx: 352, cy: 16, cw: 672, ch: 560 };
  var playing = false;

  function show(cfg) {
    if (playing) return;
    playing = true;
    var CX = cfg.cx, CY = cfg.cy, CW = cfg.cw, CH = cfg.ch;
    var srcMp4 = cfg.mp4, srcWebm = cfg.webm;
    var wrap = document.createElement('div');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;pointer-events:none;';
    var cv = document.createElement('canvas');
    cv.width = CW; cv.height = CH;
    // fit inside 70% of the screen height and 90% of its width without stretching
    var h = Math.min(window.innerHeight * 0.7, 520, window.innerWidth * 0.9 * CH / CW);
    cv.style.cssText = 'height:' + h + 'px;width:' + (h * CW / CH) + 'px;transform:scale(.2);opacity:0;transition:transform .25s cubic-bezier(.2,1.6,.4,1),opacity .15s;';
    wrap.appendChild(cv);
    var v = document.createElement('video');
    v.innerHTML = '<source src="' + srcMp4 + '" type="video/mp4"><source src="' + srcWebm + '" type="video/webm">'; v.playsInline = true; v.preload = 'auto'; v.crossOrigin = 'anonymous';
    v.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;';
    document.body.appendChild(wrap); document.body.appendChild(v);

    var ctx = cv.getContext('2d', { willReadFrequently: true });
    var raf = 0, finished = false;
    function cleanup() {
      if (finished) return; finished = true;
      cancelAnimationFrame(raf);
      cv.style.opacity = '0'; cv.style.transform = 'scale(.2)';
      setTimeout(function () { wrap.remove(); v.remove(); playing = false; }, 250);
    }
    function draw() {
      if (finished) return;
      ctx.drawImage(v, CX, CY, CW, CH, 0, 0, CW, CH);
      var img = ctx.getImageData(0, 0, CW, CH), d = img.data;
      for (var i = 0; i < d.length; i += 4) {
        var r = d[i], g = d[i + 1], b = d[i + 2];
        var over = g - Math.max(r, b);              // how "green" the pixel is
        if (over > 60) d[i + 3] = 0;                 // pure green: transparent
        else if (over > 20) {                        // edge: soften + remove spill
          d[i + 3] = 255 * (60 - over) / 40;
          d[i + 1] = Math.max(r, b);
        }
      }
      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(draw);
    }
    v.addEventListener('ended', cleanup);
    
    var p = v.play();
    var go = function () {
      requestAnimationFrame(function () { cv.style.opacity = '1'; cv.style.transform = 'scale(1)'; });
      draw();
    };
    if (p && p.then) {
      p.then(go).catch(function () {
        if (v.error) return cleanup();
        // autoplay with sound blocked: retry muted so the visual still shows
        v.muted = true; v.play().then(go).catch(cleanup);
      });
    } else go();
  }

  window.quizFinished = function (score, total) {
    try {
      if (total <= 0) return;
      var pct = score / total;
      if (pct < 0.5) show(FAIL);
      else if (pct >= 0.8) show(PASS);
    } catch (e) {}
  };
})();