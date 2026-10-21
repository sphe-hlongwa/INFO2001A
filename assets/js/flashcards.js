/* Flashcard grid shared by test1.html, test2.html and exam.html.
   Usage: initFlashcards(cards)  where cards = [{tag, front, back}, ...]
   Expects #flash-grid, #flash-filters (a <select>), #flash-count and #flash-reset on the page.
   Card text is first-party content and may contain HTML (<b>, <i>, &amp; ...), so it is inserted as HTML. */
(function (global) {
  'use strict';

  function initFlashcards(cards) {
    var grid = document.getElementById('flash-grid');
    var filterRow = document.getElementById('flash-filters');
    var count = document.getElementById('flash-count');
    var reset = document.getElementById('flash-reset');
    if (!grid || !filterRow) return;

    var counts = {};
    cards.forEach(function (c) { counts[c.tag] = (counts[c.tag] || 0) + 1; });
    var tags = ['All'].concat(Object.keys(counts));
    var active = 'All';

    function renderFilters() {
      filterRow.innerHTML = tags.map(function (tag) {
        var n = tag === 'All' ? cards.length : counts[tag];
        return '<option value="' + tag.replace(/"/g, '&quot;') + '"' + (tag === active ? ' selected' : '') + '>' +
          tag + ' (' + n + ')</option>';
      }).join('');
    }

    function renderGrid() {
      var list = active === 'All' ? cards : cards.filter(function (c) { return c.tag === active; });
      grid.innerHTML = list.map(function (c) {
        return '<div class="flashcard"><div class="inner">' +
          '<div class="face front"><div class="tag">' + c.tag + '</div><p>' + c.front + '</p><span class="hint">tap to flip</span></div>' +
          '<div class="face back"><div class="tag">' + c.tag + '</div><p>' + c.back + '</p></div>' +
          '</div></div>';
      }).join('');
      if (count) count.textContent = list.length + ' cards';
    }

    filterRow.addEventListener('change', function () { active = filterRow.value; renderGrid(); });

    // one listener for every card (cards are re-created on each filter change)
    grid.addEventListener('click', function (e) {
      var card = e.target.closest('.flashcard');
      if (card) card.classList.toggle('flipped');
    });

    // flip all cards face-up, or back again if they are all already flipped
    if (reset) reset.addEventListener('click', function () {
      var shown = Array.prototype.slice.call(grid.querySelectorAll('.flashcard'));
      var allFlipped = shown.every(function (c) { return c.classList.contains('flipped'); });
      shown.forEach(function (c) { c.classList.toggle('flipped', !allFlipped); });
    });

    renderFilters();
    renderGrid();
  }

  global.initFlashcards = initFlashcards;
})(window);
