# Oshikwanyama

An offline phone web app that goes with the book *Hai ti! A Beginner's Guide to
Oshikwanyama* by Thera Crane, Karl Lindgren-Streicher and Andy Wingo (2004, CC BY-SA 2.0):
all twelve chapters, the appendices and Grammar Corners laid out for a phone, a quiz for each
chapter, a searchable list of every word, and the proverbs. It was a React Native (Expo) app
until November 2026; that version is in the git history.

```
npm install
npm run dev        # http://localhost:5173 (also on your phone over Wi-Fi)
npm test           # unit tests with coverage
npm run test:e2e   # iPhone (WebKit) and Android (Chromium) in Playwright
npm run check      # everything CI runs
```

## The content

The book is transcribed in `src/book/`, one file per chapter (`ch01.ts` to `ch12.ts`,
`appendices.ts`, and `reference.ts` for Appendix D). Each chapter is a list of parts (its own
material, then its Grammar Corners) made of blocks in the book's order: dialogues, word lists,
tables, Quick Tips, cultural notes, proverbs, exercises and songs. The shapes are in
`src/book/types.ts`; `npm test` checks every block.

Quizzes are made from each chapter's word lists and the grammar tables marked `drill`, plus
the hand-written questions in `src/book/questions.json` (chapters 1 and 2). See
[docs/CONTENT.md](docs/CONTENT.md) for how the book was adapted, [docs/DESIGN.md](docs/DESIGN.md),
[docs/TESTING.md](docs/TESTING.md) and [docs/LEGAL.md](docs/LEGAL.md).
