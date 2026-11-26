// The app: the book's contents, each chapter and its quiz, and the pages that gather things
// from every chapter (Grammar Corners, words, proverbs). Pages are picked by the address after
// # so the back button and links just work.
import { APPENDICES, BOOK, CHAPTERS, findChapter, GRAMMAR, PROVERBS, WORDS, type Chapter } from './book';
import { chapterHtml, grammarHtml, proverbsHtml, referenceHtml, setUpChapter, setUpWords, wordsHtml } from './chapter';
import { esc, osh } from './html';
import { QuizPage } from './quizPage';
import { bestScore } from './progress';
import { mountAbout } from './about';
import { BACK_ICON, GEAR_ICON, INFO_ICON, SHARE_ICON } from './icons';
import { openShareSheet, shareLinks } from './share';
import { getAppearance, setAppearance, type Appearance } from './theme';

const chapterCard = (c: Chapter) => {
  const best = bestScore(c.id);
  return `<li><a class="card link-card" href="#/chapter/${c.id}">
    <span class="card-num" aria-hidden="true">${c.id.toUpperCase()}</span>
    <span class="card-text">${osh(c.title, 'span', 'card-title')}<span class="card-sub">${esc(c.english)}</span>${
      best ? `<span class="card-best">Best quiz score: ${best.correct} of ${best.total}</span>` : ''
    }</span>
  </a></li>`;
};

const moreCard = (href: string, titleText: string, sub: string) =>
  `<li><a class="card link-card" href="${href}"><span class="card-text"><span class="card-title">${titleText}</span><span class="card-sub">${sub}</span></span></a></li>`;

function homeHtml(): string {
  const links = shareLinks();
  return `<header class="topbar">
  <h1 lang="kj">Oshikwanyama</h1>
  <button type="button" class="top-action top-icon" data-share aria-label="Share" aria-expanded="false">${SHARE_ICON}</button>
  <a class="top-action top-icon" href="#/settings" aria-label="Settings">${GEAR_ICON}</a>
  <a class="top-action top-icon" href="#/about" aria-label="About">${INFO_ICON}</a>
</header>
<div class="share-menu" data-share-menu hidden>
  <a class="btn" href="${links.text}">Send a text</a>
  <a class="btn secondary" href="${links.email}">Send an email</a>
</div>
<main class="page">
  <p class="summary">A companion to <cite>${esc(BOOK.title)}</cite> by ${esc(BOOK.authors)}: every chapter, with a quiz for each.</p>
  <h2 class="list-label">Chapters</h2>
  <ul class="cards">${CHAPTERS.map(chapterCard).join('')}</ul>
  <h2 class="list-label">Appendices</h2>
  <ul class="cards">${APPENDICES.map(chapterCard).join('')}</ul>
  <h2 class="list-label">Look things up</h2>
  <ul class="cards">
    ${moreCard('#/grammar', 'Grammar Corners', `${GRAMMAR.length} short grammar lessons, and the reference tables`)}
    ${moreCard('#/words', 'All the words', `${WORDS.length} words and phrases, searchable`)}
    ${moreCard('#/proverbs', 'Proverbs', `${PROVERBS.length} sayings and what they mean`)}
  </ul>
</main>`;
}

/** Share: the phone's share sheet, or text and email links where there isn't one. */
function setUpShare(root: HTMLElement): void {
  const button = root.querySelector<HTMLButtonElement>('[data-share]')!;
  const menu = root.querySelector<HTMLElement>('[data-share-menu]')!;
  button.addEventListener('click', async () => {
    if (await openShareSheet()) return;
    menu.hidden = !menu.hidden;
    button.setAttribute('aria-expanded', String(!menu.hidden));
  });
}

/** A page under the list (About, Settings): back arrow, centered title. */
const subHeader = (title: string) =>
  `<header class="topbar sub"><a class="back-icon top-icon" href="#/" aria-label="Back to contents">${BACK_ICON}</a><h1>${title}</h1></header>`;

function showAbout(root: HTMLElement): void {
  root.innerHTML = `${subHeader('About')}<main class="page prose about"></main>`;
  mountAbout(root.querySelector<HTMLElement>('.about')!);
}

function showSettings(root: HTMLElement): void {
  const choices: [Appearance, string][] = [['auto', 'Automatic'], ['light', 'Light'], ['dark', 'Dark']];
  const now = getAppearance();
  root.innerHTML = `${subHeader('Settings')}
<main class="page">
  <section class="setting">
    <h2>Appearance</h2>
    <div class="segmented" role="group" aria-label="Appearance">${choices
      .map(([id, label]) => `<button type="button" data-appearance="${id}" aria-pressed="${id === now}">${label}</button>`)
      .join('')}</div>
    <p class="setting-note">Automatic follows your phone’s light or dark mode.</p>
  </section>
</main>`;
  const buttons = root.querySelectorAll<HTMLButtonElement>('[data-appearance]');
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      setAppearance(btn.dataset.appearance as Appearance);
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    }),
  );
}

/** Shows the page for the current address, and follows changes to it. */
export function startApp(root: HTMLElement): () => void {
  const show = () => {
    const [, page, id, part] = /^#\/(chapter|quiz)\/([a-z0-9]+)(?:\/([\w-]+))?$/.exec(location.hash) ?? [];
    const chapter = page ? findChapter(id) : undefined;
    if (chapter && page === 'chapter') {
      document.title = `${chapter.title} - Oshikwanyama`;
      root.innerHTML = chapterHtml(chapter);
      document.documentElement.scrollTop = 0;
      setUpChapter(root, part);
      return;
    }
    if (chapter) {
      document.title = `Quiz: ${chapter.title} - Oshikwanyama`;
      new QuizPage(root, chapter);
    } else if (location.hash === '#/grammar') {
      document.title = 'Grammar Corners - Oshikwanyama';
      root.innerHTML = grammarHtml();
    } else if (location.hash === '#/reference') {
      document.title = 'Grammar reference - Oshikwanyama';
      root.innerHTML = referenceHtml();
    } else if (location.hash === '#/words') {
      document.title = 'All the words - Oshikwanyama';
      root.innerHTML = wordsHtml();
      setUpWords(root);
    } else if (location.hash === '#/proverbs') {
      document.title = 'Proverbs - Oshikwanyama';
      root.innerHTML = proverbsHtml();
    } else if (location.hash === '#/about') {
      document.title = 'About - Oshikwanyama';
      showAbout(root);
    } else if (location.hash === '#/settings') {
      document.title = 'Settings - Oshikwanyama';
      showSettings(root);
    } else {
      document.title = 'Oshikwanyama';
      root.innerHTML = homeHtml();
      setUpShare(root);
    }
    document.documentElement.scrollTop = 0;
  };
  window.addEventListener('hashchange', show);
  show();
  return () => window.removeEventListener('hashchange', show);
}

