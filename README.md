# INFO2001A study site

Static study site for INFO2001A (Information Systems, Wits). No build step: open `index.html`, or let GitHub Pages serve the repo root (see `.github/workflows/static.yml`).

## Pages

| Page | What it is |
| --- | --- |
| `index.html` | Landing page |
| `test1.html` | Test 1: SQL + database design (flashcards, quizzes, mock) |
| `test2.html` | Test 2: systems design + database + C# (flashcards, quizzes, mock paper selector) |
| `exam.html` | Exam study page: flashcards, topic quizzes and four full practice papers |
| `mock/exam1.html` … `mock/exam4.html` | The four Exam papers (A: 15 MCQs, B: 17 usability, C: 68 case), timer, auto-marked MCQs, model answers |
| `mock-test2/mock1.html` … `mock3.html` | The three full Test 2 mock papers, one page each (timer, auto-marked MCQs, model answers) |
| `sql-fundamentals.html` | Access SQL, normalization and indexing reference |
| `diagrams.html` | Use case, class, ERD, normalisation, DSD, wireframe, storyboard and report blueprints |
| `csharp-sql.html` | C# + SQL step-by-step with screenshots |

## Folder layout

```
index.html, test1.html, test2.html, sql-fundamentals.html, diagrams.html, csharp-sql.html
mock/                  exam1.html … exam4.html (Exam papers)
mock-test2/            mock1.html, mock2.html, mock3.html (Test 2 mocks)
assets/
  css/                 site, nav, grid-bg, test2, mock-paper, csharp-learn
  js/                  site-nav, quiz-sound, quiz-fail, csharp-learn, mock-paper
  data/                quiz-bank.js, flashcard-bank.js, mock-1.js, mock-2.js, mock-3.js  (study and paper content)
  img/                 logo, track artwork, favicon, csharp/ screenshots
  media/               quiz sound and pass/fail videos
docs/                  LOCAL ONLY, listed in .gitignore so it is never committed or published
  past-papers/         past tests, exams, memo (reference only)
  blueprints/          DSD / wireframe / report / storyboard guides, test breakdown
```

## Adding a mock paper

1. Create `assets/data/mock-4.js` containing `window.MOCK_PAPER = { title, subtitle, summary, duration, sections: [...] };` (copy the shape of `mock-3.js`).
2. Copy `mock-test2/mock3.html` to `mock-test2/mock4.html` and change `data-paper="3"` and the `mock-3.js` script tag to 4.
3. Add the paper to the `mockPapers` list in `test2.html` (title, summary, `href`).
4. Bump the "next" link logic in `assets/js/mock-paper.js` (`num < 3`).

Paths inside `assets/js/` are relative to the script's own folder (`quiz-sound.js` and `quiz-fail.js` load media from `../media/`), so keep the css / js / media folders as siblings.

## Quiz and flashcard content

`exam.html` loads its study content from the data files below. Keep these files in `assets/data/` so their relative script paths continue to work.

- `quiz-bank.js` contains `window.QUIZ_BANK`: the topic quiz questions, options, correct-answer index and explanation.
- `flashcard-bank.js` contains `window.FLASHCARD_BANK`: the flashcard tag, front and back content.

Quiz options are shuffled whenever a topic is opened, and options within a question use equal visual height to avoid length and position cues. The exam-format-and-technique topic is intentionally excluded from the quiz bank.
