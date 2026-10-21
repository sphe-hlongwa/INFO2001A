# INFO2001A study site

Static study site for INFO2001A (Information Systems, Wits). No build step: open `index.html` over a local web server (`python -m http.server`), or let GitHub Pages serve the repo root (see `.github/workflows/static.yml`). Opening files straight from disk (`file://`) works for most pages, but the quiz pass/fail video effect needs http.

## Pages

| Page | What it is |
| --- | --- |
| `index.html` | Landing page |
| `test1.html` | Test 1: SQL + database design. Flashcards, a 10-question quick quiz and three mock papers |
| `test2.html` | Test 2: systems design + database design. Flashcards, topic quizzes and three mock papers |
| `exam.html` | Exam study page: scope, flashcards, topic quizzes and four full practice papers |
| `mock/exam1.html` ... `exam4.html` | The four Exam papers (A: 30 MCQs worth 15 marks, B: 17 interaction design/usability, C: 68 case scenario). Timer, auto-marked MCQs, model answers |
| `mock-test1/mock1.html` ... `mock3.html` | The three Test 1 mock papers (A: MCQs, B: normalisation, C: ER modelling, D: Access SQL) |
| `mock-test2/mock1.html` ... `mock3.html` | The three Test 2 mock papers (99 marks in five sections, A to E) |
| `sql-fundamentals.html` | Access SQL, normalisation and indexing reference |
| `diagrams.html` | Use case, class, ERD, normalisation, DSD, wireframe, storyboard and report blueprints |
| `csharp-sql.html` | C# + SQL step-by-step with screenshots |
| `privacy.html` | Privacy policy |

## Folder layout

```
index.html, test1.html, test2.html, exam.html, sql-fundamentals.html, diagrams.html, csharp-sql.html, privacy.html
mock/                  exam1.html ... exam4.html (Exam papers)
mock-test1/            mock1.html ... mock3.html (Test 1 mocks)
mock-test2/            mock1.html ... mock3.html (Test 2 mocks)
tools/                 check-quiz-balance.js
assets/
  css/                 site, nav, grid-bg, fonts, test2, mock-paper, csharp-learn, diagram-zoom, stroke-text
  js/                  site-nav, toc-pages, flashcards, mock-paper, quiz-sound, quiz-fail, csharp-learn, diagram-zoom, stroke-text, cursor-grid
  data/                quiz-bank.js, flashcard-bank.js (study content)
                       exam-1..4.js, t1-mock-1..3.js, mock-1..3.js (paper content)
  img/                 logo, track artwork, hero image, favicon, csharp/ and t1-mock/ screenshots
  media/               quiz sound and pass/fail videos
docs/                  LOCAL ONLY, listed in .gitignore so it is never committed or published
  past-papers/         past tests, exams, memo (reference only)
  blueprints/          DSD / wireframe / report / storyboard guides, test breakdown
```

## Shared scripts

- `site-nav.js` builds the floating nav bar. `test1`, `test2` and `exam` use their own sidebar instead.
- `toc-pages.js` is used by `sql-fundamentals.html` and `diagrams.html`: mobile contents drawer, one-section-at-a-time pagination and the contents search.
- `flashcards.js` renders the flashcard grid, tag filter, card count and flip-all button for `test1`, `test2` and `exam`. Each page filters the bank to its own topics and calls `initFlashcards(cards)`. Card text is inserted as HTML, so cards may use `<b>`, `<i>` and entities such as `&amp;`.
- `mock-paper.js` renders every paper from its data file. Fields are optional: a question without `id` or `marks`, or a section without `time`, simply omits that label.

## Adding a mock paper

1. Create `assets/data/mock-4.js` containing `window.MOCK_PAPER = { title, subtitle, summary, duration, sections: [...] };` (copy the shape of `mock-3.js`).
2. Copy `mock-test2/mock3.html` to `mock-test2/mock4.html` and change `data-paper="3"` and the `mock-3.js` script tag to 4.
3. Add the paper to the `mockPapers` list in `test2.html` (title, summary, `href`).
4. Set `data-count="4"` on the `<body>` of every page in that folder so the Previous/Next links include the new paper (the default is 3).

The same steps apply to `mock-test1/` (data files `t1-mock-N.js`, list in `test1.html`) and `mock/` (data files `exam-N.js`, list in `exam.html`, pages use `data-prefix="exam"`).

Each paper's timer is stored in `localStorage` under its own key. Pages in `mock-test1/` set `data-paper-key` (`t1-1`, `t1-2`, ...) so their timers never collide with the Test 2 papers of the same number. Give any new folder of papers its own `data-paper-key` values.

Paths inside `assets/js/` are relative to the script's own folder (`quiz-sound.js` and `quiz-fail.js` load media from `../media/`), so keep the css / js / media folders as siblings.

## Quiz and flashcard content

`test1.html`, `test2.html` and `exam.html` all load their study content from the data files below, so a correction is made once. Keep these files in `assets/data/` so their relative script paths continue to work.

- `quiz-bank.js` contains `window.QUIZ_BANK`: the topic quiz questions, options, correct-answer index (`c`) and explanation (`e`).
- `flashcard-bank.js` contains `window.FLASHCARD_BANK`: the flashcard tag, front and back content.

Each page filters the banks to its own topics:

- `exam.html` uses everything.
- `test2.html` uses everything except the "SQL & database design" quiz topic and the five SQL flashcard tags (Keys & integrity (SQL), ER modelling (SQL), SQL basics, Access SQL, Anomalies & design).
- `test1.html` uses the Normalisation and SQL flashcard tags, and draws its 10-question quick quiz at random from the "SQL & database design" and "Normalisation" topics.

Quiz options are shuffled whenever a question is shown, and options within a question use equal visual height (CSS grid) to avoid length and position cues. The exam-format-and-technique topic is intentionally excluded from the quiz bank.

Run `node tools/check-quiz-balance.js` after editing the quiz bank. It flags topics where the correct option is the single longest option far more often than chance (target: about 15-30%).
