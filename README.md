# INFO2001A study site

Static study site for INFO2001A (Information Systems, Wits). No build step: open `index.html`, or let GitHub Pages serve the repo root (see `.github/workflows/static.yml`).

## Pages

| Page | What it is |
| --- | --- |
| `index.html` | Landing page |
| `test1.html` | Test 1: SQL + database design (flashcards, quizzes, mock paper selector) |
| `test2.html` | Test 2: systems design + database + C# (flashcards, quizzes, mock paper selector) |
| `mock/mock1.html` … `mock3.html` | The three full Test 2 mock papers, one page each (timer, auto-marked MCQs, model answers) |
| `mock-test1/mock1.html` … `mock3.html` | The three full Test 1 mock papers, one page each, same layout as the Test 2 papers |
| `sql-fundamentals.html` | Access SQL, normalization and indexing reference |
| `diagrams.html` | Use case, class, ERD, normalisation, DSD, wireframe, storyboard and report blueprints |
| `csharp-sql.html` | C# + SQL step-by-step with screenshots |

## Folder layout

```
index.html, test1.html, test2.html, sql-fundamentals.html, diagrams.html, csharp-sql.html
mock/                  mock1.html, mock2.html, mock3.html        (Test 2 papers)
mock-test1/            mock1.html, mock2.html, mock3.html        (Test 1 papers)
assets/
  css/                 site, nav, grid-bg, test2, mock-paper, diagram-zoom, csharp-learn
  js/                  site-nav, quiz-sound, quiz-fail, csharp-learn, mock-paper, diagram-zoom
  data/                mock-1..3.js (Test 2 papers), t1-mock-1..3.js (Test 1 papers)
  img/                 logo, track artwork, favicon, csharp/ screenshots, t1-mock/ (Test 1 paper diagrams)
  media/               quiz sound and pass/fail videos
docs/                  LOCAL ONLY, listed in .gitignore so it is never committed or published
  past-papers/         past tests, exams, memo (reference only)
  blueprints/          DSD / wireframe / report / storyboard guides, test breakdown
```

## Adding a mock paper

1. Create `assets/data/mock-4.js` containing `window.MOCK_PAPER = { title, subtitle, summary, duration, sections: [...] };` (copy the shape of `mock-3.js`).
2. Copy `mock/mock3.html` to `mock/mock4.html` and change `data-paper="3"` and the `mock-3.js` script tag to 4.
3. Add the paper to the `mockPapers` list in `test2.html` (title, summary, `href`).
4. Bump the "next" link logic in `assets/js/mock-paper.js` (`num < 3`).

Test 1 papers work the same way with `assets/data/t1-mock-N.js` and `mock-test1/mockN.html`, plus `data-paper-key="t1-N"` on `<body>` (it keeps each paper's saved timer separate from the Test 2 papers) and the `mockPapers` list in `test1.html`. Diagram images referenced from a Test 1 data file are relative to the page, e.g. `../assets/img/t1-mock/mock1-normalisation.png`.

## Diagrams on phones

`assets/css/diagram-zoom.css` and `assets/js/diagram-zoom.js` make every diagram (`.dsd-fig` on `diagrams.html`, `.diagram-wrap` on the tests and mock papers) fit the screen width on small screens. Tapping a diagram opens a full-screen viewer with pinch, drag and double-tap zoom. Add the stylesheet at the end of `<head>` and the script before `</body>` on any page that shows diagrams.

Paths inside `assets/js/` are relative to the script's own folder (`quiz-sound.js` and `quiz-fail.js` load media from `../media/`), so keep the css / js / media folders as siblings.
