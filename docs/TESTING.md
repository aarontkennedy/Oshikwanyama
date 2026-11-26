# Testing

- `npm test`: Vitest (jsdom) with coverage; lines, branches, functions and statements must
  stay at 95% or more. Covers the transcribed book (every block of every chapter in shape),
  the quiz rules (every chapter's quiz asks ten fair questions), saved scores, and every page,
  including each kind of quiz question.
- `npm run test:e2e`: Playwright on an iPhone 13 (WebKit) and a Pixel 7 (Chromium), against
  the production build: a chapter and its whole quiz, word search, no sideways scrolling on any
  page, the quiz button staying on screen, Settings and About, and (Chromium only, which
  supports service workers in tests) every chapter offline.
- `npm run licenses`: every dependency's licence is on the allowed list.
