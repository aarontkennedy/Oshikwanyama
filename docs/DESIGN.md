# Design

The same build and look as the knots and phone games apps: Vite, plain TypeScript (no
framework), an offline PWA on GitHub Pages.

## Rules

- **Readable without reading glasses.** No text under 18px (`--text-sm`), checked by
  `src/design.test.ts`.
- **Thumb-sized.** Every button, link card and answer is at least 44px tall (`--tap`).
- **Flat.** No emoji (checked by `scripts/no-emoji.test.mjs`); icons are drawn as SVG.
- **Light and dark.** Warm earth colors: sand, clay and thatch. Settings can override the
  phone's mode (`scripts/theme-choice.mjs`).
- **Oshikwanyama text is marked** `lang="kj"`, so screen readers and translators know it.

## Pages

Addresses after `#` pick the page, so the back button works: `#/` (contents),
`#/chapter/<id>` and `#/chapter/<id>/<part>` (scrolled to a part), `#/quiz/<id>`,
`#/grammar`, `#/reference`, `#/words`, `#/proverbs`, `#/settings`, `#/about`.

- **Contents**: the twelve chapters and three appendices (with best quiz scores), then the
  look-up pages.
- **Chapter**: its parts in the book's order, with a list to jump to each. Grammar Corners
  are marked. Dialogues, word lists (English, then Oshikwanyama in bold), grammar tables (a
  person's + and − rows joined), worked examples (side by side, stacked on a narrow phone),
  Quick Tips and cultural notes in tinted boxes, proverbs, songs, and the exercises as
  collapsed Practice boxes. Back and Next go between chapters; Start the quiz stays at the
  bottom of the screen.
- **Grammar Corners**: every one, by chapter, and the Grammar Reference (Appendix D).
- **All the words**: every word list row, searchable in either language, each linking to
  its part of the book.
- **Proverbs**: every "Omukwanyama ta ti", with its chapter.
- **Quiz**: ten questions, one at a time, then Check and Next. Made from the chapter's word
  lists both ways, a matching question, drills on its grammar tables ("Subject Concords for
  Active Verbs: Ame (positive), Past"), two typed answers (any spelling the word list gives counts:
  "Ehee / Ee / Heeno"; "Ofewa (yokulikosha)" accepts "Ofewa"), and hand-written questions.
  A chapter with few words borrows from earlier chapters.
  - Multiple choice: tap an answer, then Check. The right answer turns green and a wrong
    choice red.
  - Typed: case, extra spaces, curly apostrophes and a final full stop or question mark
    don't matter. Enter checks.
  - Matching: tap a word, then its meaning (either side first). A wrong pair shakes; the
    question counts as right only if every pair was found first time.
  - Ordering: up and down arrows. The items never start in the right order.
- **Results**: "You got 7 of 10 right". The best score for each chapter is saved on the
  phone.
