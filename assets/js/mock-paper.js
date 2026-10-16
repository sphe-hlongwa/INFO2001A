/* Renders one mock paper into #mock-container.
   Needs: window.MOCK_PAPER (assets/data/mock-N.js) and <body data-paper="N">. */
(function(){
  const paper = window.MOCK_PAPER;
  const num = Number(document.body.dataset.paper);
  const container = document.getElementById('mock-container');
  const timerEl = document.getElementById('mock-timer');
  const fsBtn = document.getElementById('mock-fullscreen');
  const restartBtn = document.getElementById('mock-restart');
  let uid = 0;

  const qMarks = n => `<span class="marks">[${n} ${n===1?'mark':'marks'}]</span>`;

  function mcqHTML(items, start){
    return items.map((x,i)=>`
      <div class="q-block">
        <p class="q-text"><span class="qnum">A${start+i}</span>${x[0]}</p>
        <div class="options">${x[1].map((o,j)=>`<button class="opt mcq-opt" data-correct="${x[2]}" data-choice="${j}">${String.fromCharCode(65+j)}. ${o}</button>`).join('')}</div>
        <p class="explain">${x[3]}</p>
      </div>`).join('');
  }

  function qsHTML(qs){
    return qs.map(x=>{
      const id = 'ans-' + (uid++);
      return `
        <div class="qitem">
          <p class="qtitle"><span class="qnum-tag">${x.id}</span>${x.q} ${qMarks(x.marks)}</p>
          <button class="reveal-btn" data-target="${id}">Show model answer</button>
          <div class="model-answer" id="${id}">${x.a}</div>
        </div>`;
    }).join('');
  }

  function partHTML(p){
    if(p.type === 'mcq'){
      return `<h3 class="part-title">${p.heading}</h3>
        <div class="scenario"><b>Instructions.</b> ${p.intro}</div>
        ${mcqHTML(p.items, p.start)}`;
    }
    return `<h3 class="part-title">${p.heading}</h3>
      ${p.intro ? `<div class="scenario">${p.intro}</div>` : ''}
      ${p.scenario ? `<div class="scenario"><b>Scenario.</b> ${p.scenario}</div>` : ''}
      ${p.diagram ? p.diagram : ''}
      ${p.scenario2 ? `<div class="scenario">${p.scenario2}</div>` : ''}
      ${p.diagram2 ? p.diagram2 : ''}
      ${qsHTML(p.qs)}`;
  }

  function renderExam(){
    const total = paper.sections.reduce((a,s)=>a+s.marks,0);
    const prefix = document.body.dataset.prefix || 'mock';
    const count = Number(document.body.dataset.count) || 3;
    const label = prefix === 'exam' ? 'Exam' : 'Mock';
    const prev = num > 1 ? `<a href="${prefix}${num-1}.html">&larr; ${label} ${num-1}</a>` : '<span></span>';
    const next = num < count ? `<a href="${prefix}${num+1}.html">${label} ${num+1} &rarr;</a>` : '<span></span>';
    const lastSec = paper.sections[paper.sections.length-1].key;
    const selfMark = paper.sections.length > 2 ? `Sections B to ${lastSec}` : 'Section B';
    return `
      <div class="scenario"><b>${paper.title}</b><br>${paper.subtitle}<br><span class="sub">Total: ${total} marks &middot; ${paper.duration} minutes</span></div>
      <div class="scenario instr"><b>Instructions.</b>
        <ol>
          <li>Answer <b>all</b> questions and number them correctly. Sections ${paper.sections.map(s=>s.key).join(', ')} carry ${paper.sections.map(s=>s.marks).join(', ')} marks respectively.</li>
          <li>Diagrams may be drawn in pencil, in landscape orientation if necessary.</li>
          <li>The Section A MCQs are auto-marked below; for ${selfMark}, write your answer first and then reveal the model answer to mark yourself.</li>
        </ol>
      </div>
      <div id="mcq-score" class="quiz-score">Section A multiple choice: 0 / 0</div>
      ${paper.sections.map(s=>`
        <div class="exam-section ${s.color}">
          <div class="head"><span>${s.title}</span><span class="badge">${s.marks} MARKS</span></div>
          <div class="exam-body">
            <p class="time-hint">Suggested time: ${s.time}</p>
            ${s.parts.map(partHTML).join('')}
          </div>
        </div>`).join('')}
      <div class="pager">${prev}${next}</div>`;
  }

  // ---- render + scoring ----
  container.innerHTML = renderExam();
  const totalMcq = container.querySelectorAll('.q-block').length;
  let answered = 0, correctCount = 0;
  const scoreEl = document.getElementById('mcq-score');
  scoreEl.textContent = `Section A multiple choice: 0 / 0 answered (${totalMcq} questions)`;
  container.querySelectorAll('.mcq-opt').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const block = btn.closest('.q-block');
      if(block.dataset.done) return;
      block.dataset.done = '1';
      const chosen = Number(btn.dataset.choice), correct = Number(btn.dataset.correct);
      block.querySelectorAll('.mcq-opt').forEach(b=>b.disabled=true);
      block.querySelectorAll('.mcq-opt')[correct].classList.add('correct');
      if(chosen !== correct) btn.classList.add('incorrect');
      block.querySelector('.explain').classList.add('show');
      answered++; if(chosen === correct) correctCount++;
      scoreEl.textContent = `Section A multiple choice: ${correctCount} / ${answered} correct (${totalMcq} questions)`;
    });
  });
  container.addEventListener('click',e=>{
    const btn = e.target.closest('.reveal-btn');
    if(!btn) return;
    const showing = document.getElementById(btn.dataset.target).classList.toggle('show');
    btn.textContent = showing ? 'Hide model answer' : 'Show model answer';
  });

  // ---- timer (survives a page refresh; Restart resets it) ----
  const KEY = 'info2001a-' + (document.body.dataset.prefix || 'mock') + '-' + num + '-deadline';
  const store = {
    get(){ try{ return Number(localStorage.getItem(KEY)) || 0; }catch(e){ return 0; } },
    set(v){ try{ localStorage.setItem(KEY, String(v)); }catch(e){} }
  };
  let deadline = store.get();
  const fresh = () => Date.now() + (paper.duration || 180) * 60000;
  if(!deadline || deadline < Date.now() - 6*3600*1000) deadline = fresh();  // stale from an old attempt
  store.set(deadline);

  const pad = n => String(n).padStart(2,'0');
  function tick(){
    const rem = Math.round((deadline - Date.now())/1000), c = Math.max(0, rem);
    const h = Math.floor(c/3600), m = Math.floor(c%3600/60), s = c%60;
    timerEl.textContent = h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
    timerEl.classList.toggle('low', rem <= 300 && rem > 0);
    timerEl.classList.toggle('done', rem <= 0);
    if(rem <= 0) timerEl.textContent = "TIME'S UP";
  }
  tick(); setInterval(tick, 1000);
  restartBtn.addEventListener('click',()=>{
    if(!confirm('Restart the timer from the full ' + (paper.duration||180) + ' minutes?')) return;
    deadline = fresh(); store.set(deadline); tick();
  });

  // ---- full screen ----
  function fsLabel(){
    const on = !!document.fullscreenElement;
    fsBtn.setAttribute('aria-label', on ? 'Exit full screen' : 'Enter full screen');
    fsBtn.title = on ? 'Exit full screen' : 'Enter full screen';
  }
  fsBtn.addEventListener('click', async ()=>{
    try{
      if(document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    }catch(err){ console.warn('Full screen mode is unavailable.', err); }
  });
  document.addEventListener('fullscreenchange', fsLabel);
})();
