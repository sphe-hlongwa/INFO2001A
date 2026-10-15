# INFO2001A study site

Static study site for INFO2001A (Information Systems, Wits). No build step: open `index.html`, or let GitHub Pages serve the repo root (see `.github/workflows/static.yml`).

## Pages

| Page | What it is |
| --- | --- |
| `index.html` | Landing page |
| `test1.html` | Test 1: SQL + database design (flashcards, quizzes, mock) |
| `test2.html` | Test 2: systems design + database + C# (flashcards, quizzes, mock paper selector) |
| `mock/mock1.html` … `mock3.html` | The three full Test 2 mock papers, one page each (timer, auto-marked MCQs, model answers) |
| `sql-fundamentals.html` | Access SQL, normalization and indexing reference |
| `diagrams.html` | Use case, class, ERD, normalisation, DSD, wireframe, storyboard and report blueprints |
| `csharp-sql.html` | C# + SQL step-by-step with screenshots |

## Folder layout

```
index.html, test1.html, test2.html, sql-fundamentals.html, diagrams.html, csharp-sql.html
mock/                  mock1.html, mock2.html, mock3.html
assets/
  css/                 site, nav, grid-bg, test2, mock-paper, csharp-learn
  js/                  site-nav, quiz-sound, quiz-fail, csharp-learn, mock-paper
  data/                mock-1.js, mock-2.js, mock-3.js  (paper content)
  img/                 logo, track artwork, favicon, csharp/ screenshots
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

Paths inside `assets/js/` are relative to the script's own folder (`quiz-sound.js` and `quiz-fail.js` load media from `../media/`), so keep the css / js / media folders as siblings.
