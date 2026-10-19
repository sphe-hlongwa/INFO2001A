// Usage: node tools/check-quiz-balance.js
// Flags topics where the correct option is the single longest option far more often
// than chance (25%), so answers cannot be guessed by length. Target: about 15-30%.
global.window = {};
require('../assets/data/quiz-bank.js');
const len = s => s.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, 'x').length;
let bad = 0;
window.QUIZ_BANK.forEach(t => {
  let longest = 0, shortest = 0;
  t.questions.forEach(q => {
    const l = q.o.map(len), c = l[q.c], max = Math.max(...l), min = Math.min(...l);
    if (c === max && l.filter(x => x === max).length === 1) longest++;
    if (c === min && l.filter(x => x === min).length === 1) shortest++;
  });
  const pct = Math.round(100 * longest / t.questions.length);
  const flag = pct > 35 ? '  <-- too predictable' : '';
  if (flag) bad++;
  console.log(t.title.padEnd(34), String(t.questions.length).padStart(3), 'longest', String(pct).padStart(3) + '%', 'shortest', shortest + flag);
});
console.log(bad ? bad + ' topic(s) need rebalancing' : 'All topics balanced');
