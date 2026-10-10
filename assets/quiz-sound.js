/* Plays assets/wrong.mp3 when a quiz answer is wrong. Call window.playWrongSound(). */
(function () {
  var src = new URL('wrong.mp3', document.currentScript.src).href;
  var audio = null;
  window.playWrongSound = function () {
    try {
      if (!audio) { audio = new Audio(src); audio.preload = 'auto'; }
      audio.currentTime = 0;
      var p = audio.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  };
})();
