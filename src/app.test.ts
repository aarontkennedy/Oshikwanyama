import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { startApp } from './app';
import { ALL, findChapter, GRAMMAR, PROVERBS, WORDS } from './book';
import { blockHtml } from './chapter';
import type { Question } from './data';
import { QuizPage } from './quizPage';
import { bestScore, saveScore } from './progress';

let stop = () => {};
const root = () => document.getElementById('app')!;
const $ = <T extends HTMLElement = HTMLElement>(sel: string) => root().querySelector<T>(sel)!;
const $$ = <T extends HTMLElement = HTMLElement>(sel: string) => [...root().querySelectorAll<T>(sel)];
const click = (sel: string) => $(sel).click();
const go = (hash: string) => {
  location.hash = hash;
  window.dispatchEvent(new HashChangeEvent('hashchange'));
};
const text = (sel: string) => $(sel).textContent!.replace(/\s+/g, ' ').trim();

beforeEach(async () => {
  // Changing location.hash fires hashchange later: let any from the last test go by first.
  await new Promise((r) => setTimeout(r, 0));
  document.body.innerHTML = '<div id="app"></div>';
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  stop();
  stop = () => {};
  location.hash = '';
});

describe('the contents', () => {
  it('lists every chapter and appendix, the look-up pages, and best scores', () => {
    saveScore('2', { correct: 8, total: 10 });
    stop = startApp(root());
    expect(document.title).toBe('Oshikwanyama');
    expect(text('.summary')).toContain('Hai ti!');
    const cards = $$<HTMLAnchorElement>('.cards a');
    expect(cards).toHaveLength(ALL.length + 3);
    expect(cards[0].getAttribute('href')).toBe('#/chapter/1');
    expect(cards[0].textContent).toContain('Greetings');
    expect(cards[1].querySelector('.card-best')!.textContent).toBe('Best quiz score: 8 of 10');
    expect(cards[12].getAttribute('href')).toBe('#/chapter/a');
    expect(cards.slice(-3).map((a) => a.getAttribute('href'))).toEqual(['#/grammar', '#/words', '#/proverbs']);
  });

  it('offers text and email links when the phone has no share sheet', async () => {
    stop = startApp(root());
    click('[data-share]');
    await vi.waitFor(() => expect($('[data-share-menu]').hidden).toBe(false));
    expect($('[data-share]').getAttribute('aria-expanded')).toBe('true');
  });

  it('opens the phone’s share sheet when there is one', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', { configurable: true, value: share });
    stop = startApp(root());
    click('[data-share]');
    await vi.waitFor(() => expect(share).toHaveBeenCalled());
    expect($('[data-share-menu]').hidden).toBe(true);
    Reflect.deleteProperty(navigator, 'share');
  });

  it('goes back to the contents for an address it doesn’t know', () => {
    stop = startApp(root());
    go('#/chapter/99');
    expect(document.title).toBe('Oshikwanyama');
    go('#/nowhere');
    expect($$('.cards a')).toHaveLength(ALL.length + 3);
  });
});

describe('a chapter', () => {
  it('shows its parts in order, Grammar Corners marked, with a quiz button', () => {
    stop = startApp(root());
    go('#/chapter/3');
    expect(document.title).toBe('Owa dja peni? - Oshikwanyama');
    expect(text('.eyebrow')).toBe('Chapter 3 · page 13 in the book');
    expect($('h1').getAttribute('lang')).toBe('kj');
    expect($$('.part h2').map((h) => h.textContent)).toEqual(['Meeting someone', 'Grammar CornerVerbs', 'Phrases and practice']);
    expect($$('.toc-link').map((b) => b.textContent)).toEqual(['Meeting someone', 'Grammar: Verbs', 'Phrases and practice']);
    expect($('.quiz-bar a').getAttribute('href')).toBe('#/quiz/3');
    expect($('.best')).toBeNull();
    expect($$('.pager a').map((a) => a.getAttribute('href'))).toEqual(['#/chapter/2', '#/chapter/4']);
  });

  it('jumps to a part, from the list or the address', () => {
    stop = startApp(root());
    go('#/chapter/3/verbs');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
    click('[data-jump="phrases"]');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it('joins a person’s + and − rows in the concord tables', () => {
    stop = startApp(root());
    go('#/chapter/3');
    const table = $('table.grid');
    expect(table.querySelectorAll('tbody tr')).toHaveLength(12);
    const ame = table.querySelector('tbody th')!;
    expect(ame.textContent).toBe('Ame');
    expect(ame.getAttribute('rowspan')).toBe('2');
    expect(table.querySelector('.sign')!.getAttribute('aria-label')).toBe('Yes');
    expect(table.querySelectorAll('tbody tr')[1].querySelector('.sign')!.getAttribute('aria-label')).toBe('Not');
  });

  it('shows the best quiz score, and no back link on the first chapter', () => {
    saveScore('1', { correct: 4, total: 5 });
    stop = startApp(root());
    go('#/chapter/1');
    expect(text('.best')).toBe('Best score: 4 of 5');
    expect($$('.pager a').map((a) => a.getAttribute('href'))).toEqual(['#/chapter/2']);
    go('#/chapter/c');
    expect($$('.pager a').map((a) => a.getAttribute('href'))).toEqual(['#/chapter/b']);
    expect($('.toc')).toBeNull(); // one part, nothing to jump to
  });

  it('draws every kind of block', () => {
    const html = (b: Parameters<typeof blockHtml>[0]) => {
      const div = document.createElement('div');
      div.innerHTML = blockHtml(b);
      return div;
    };
    expect(html({ type: 'text', text: 'Say _Ehee_.' }).querySelector('em[lang="kj"]')!.textContent).toBe('Ehee');
    expect(html({ type: 'heading', text: 'Ngeno' }).querySelector('h3')).not.toBeNull();
    expect(html({ type: 'reading', title: 'Recipe', paragraphs: ['Tula omeva.'] }).querySelector('.reading p[lang="kj"]')).not.toBeNull();
    const dialogue = html({ type: 'dialogue', lines: [['A', 'Ehee.'], ['', '(driving)']] });
    expect(dialogue.querySelector('dd[lang="kj"]')!.textContent).toBe('Ehee.');
    expect(dialogue.querySelector('.stage')!.textContent).toBe('(driving)');
    const words = html({ type: 'words', title: 'Days', rows: [['Monday', 'Omaandaxa']], notes: ['A _note_.'] });
    expect(words.querySelector('td[lang="kj"]')!.textContent).toBe('Omaandaxa');
    expect(words.querySelector('.notes em')!.textContent).toBe('note');
    expect(html({ type: 'examples', rows: [['a', 'b']] }).querySelector('li span:last-child')!.getAttribute('lang')).toBe('kj');
    expect(html({ type: 'examples', from: 'oshikwanyama', rows: [['a', 'b']] }).querySelector('li span')!.getAttribute('lang')).toBe('kj');
    expect(html({ type: 'examples', from: 'both', rows: [['a', 'b']] }).querySelectorAll('[lang="kj"]')).toHaveLength(2);
    expect(html({ type: 'list', items: ['one'] }).querySelectorAll('li')).toHaveLength(1);
    expect(html({ type: 'tip', title: 'Quick Tip', blocks: [{ type: 'text', text: 'x' }] }).querySelector('.tip h3')!.textContent).toBe('Quick Tip');
    expect(html({ type: 'culture', items: ['Greet first.'] }).querySelector('.culture li')!.textContent).toBe('Greet first.');
    expect(html({ type: 'proverb', oshikwanyama: 'Okuti kwa dala.', english: 'x', meaning: 'y' }).querySelector('blockquote')!.getAttribute('lang')).toBe('kj');
    const practice = html({ type: 'practice', title: 'Exercise 1', instruction: 'Do it.', example: 'e', items: ['a'], dialogue: [['A', 'b']] });
    expect(practice.querySelector('summary')!.textContent).toBe('Practice: Exercise 1');
    expect(practice.querySelector('.example')!.textContent).toBe('Example: e');
    expect(practice.querySelector('.dialogue')).not.toBeNull();
    expect(html({ type: 'practice', title: 'Exercise 2', instruction: '' }).querySelector('.instruction-text')).toBeNull();
    const song = html({ type: 'song', title: 'Owambo', note: 'Sing it.', verses: [['a', 'b']] });
    expect(song.querySelector('p[lang="kj"]')!.innerHTML).toBe('a<br>b');
    expect(html({ type: 'song', title: 'x', verses: [['a']] }).querySelector('.note')).toBeNull();
    expect(html({ type: 'table', head: ['', 'x'], rows: [['a', 'b']] }).querySelector('.visually-hidden')).not.toBeNull();
  });
});

describe('the look-up pages', () => {
  it('lists every Grammar Corner by chapter, and the reference', () => {
    stop = startApp(root());
    go('#/grammar');
    expect(document.title).toBe('Grammar Corners - Oshikwanyama');
    expect($$('.link-row')).toHaveLength(GRAMMAR.length);
    expect($('.link-row').getAttribute('href')).toBe('#/chapter/1/pronouns');
    go('#/reference');
    expect(document.title).toBe('Grammar reference - Oshikwanyama');
    expect($$('table.grid').length).toBe(5);
  });

  it('searches every word in English or Oshikwanyama', () => {
    stop = startApp(root());
    go('#/words');
    const shown = () => $$('[data-words] li').filter((li) => !li.hidden);
    expect(shown()).toHaveLength(WORDS.length);
    expect(text('[data-count]')).toBe(`${WORDS.length} words and phrases`);
    const input = $<HTMLInputElement>('[data-search]');
    input.value = 'OSHIKOMBO';
    input.dispatchEvent(new Event('input'));
    expect(shown().length).toBeGreaterThan(1);
    expect(shown()[0].textContent).toContain('Goat');
    input.value = 'grandmother';
    input.dispatchEvent(new Event('input'));
    expect(text('[data-count]')).toBe('1 match');
    expect(shown()[0].querySelector('a')!.getAttribute('href')).toBe('#/chapter/5/family');
  });

  it('lists every proverb with its chapter', () => {
    stop = startApp(root());
    go('#/proverbs');
    expect($$('.proverbs li')).toHaveLength(PROVERBS.length);
    expect(text('.proverb-text')).toBe(PROVERBS[0].oshikwanyama);
    expect($('.where').getAttribute('href')).toBe('#/chapter/1/greetings');
  });
});

describe('Settings and About', () => {
  it('chooses light or dark, showing the choice', () => {
    stop = startApp(root());
    go('#/settings');
    expect(document.title).toBe('Settings - Oshikwanyama');
    click('[data-appearance="dark"]');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect($('[data-appearance="auto"]').getAttribute('aria-pressed')).toBe('false');
    click('[data-appearance="auto"]');
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });

  it('shows the About page', () => {
    stop = startApp(root());
    go('#/about');
    expect(document.title).toBe('About - Oshikwanyama');
    expect($('.about').textContent).toContain('Hai ti!');
  });
});

describe('a quiz', () => {
  const choice: Question = { type: 'multiple-choice', prompt: 'Morning', options: ['Ongula', 'Oufiku', 'Onguloshi'], correct: 'Ongula', explanation: 'Ongula is morning.', optionsLang: 'kj' };
  const typed: Question = { type: 'fill-blank', prompt: 'Seven', answer: 'Heyali', hint: 'It starts with H', promptLang: 'kj' };
  const match: Question = {
    type: 'matching',
    prompt: '',
    pairs: [
      { English: 'I', Oshikwanyama: 'Ame' },
      { English: 'You', Oshikwanyama: 'Ove' },
    ],
  };
  const order: Question = { type: 'ordering', prompt: '', items: ['Imwe', 'Mbali', 'Nhatu'] };

  const quiz = (questions: Question[]) => new QuizPage(root(), findChapter('2')!, Math.random, questions);
  const action = () => $<HTMLButtonElement>('[data-action]');

  it('starts from the chapter, and comes back to it', () => {
    stop = startApp(root());
    go('#/quiz/2');
    expect(document.title).toBe('Quiz: Onda fya ondjala! - Oshikwanyama');
    expect(text('.progress-text')).toBe('Question 1 of 10');
    expect($('.back').getAttribute('href')).toBe('#/chapter/2');
  });

  it('marks multiple choice, showing the right answer and why', () => {
    quiz([choice, choice]);
    expect(text('.instruction')).toBe('Choose the answer');
    expect($('.option').getAttribute('lang')).toBe('kj');
    expect(action().disabled).toBe(true);
    click('[data-option="1"]');
    click('[data-option="2"]');
    expect($('[data-option="1"]').getAttribute('aria-pressed')).toBe('false');
    action().click();
    expect($('[data-option="0"]').classList.contains('right')).toBe(true);
    expect($('[data-option="2"]').classList.contains('wrong')).toBe(true);
    expect(text('[data-feedback]')).toBe('Not quite. The answer is: Ongula Ongula is morning.');
    click('[data-option="0"]'); // too late to change
    expect($('[data-option="0"]').getAttribute('aria-pressed')).toBe('false');
    action().click();
    click('[data-option="0"]');
    action().click();
    expect(text('[data-feedback]')).toBe('Right! Ongula is morning.');
    expect(action().textContent).toBe('See your score');
    action().click();
    expect(text('h1')).toBe('You got 1 of 2 right');
    expect(bestScore('2')).toEqual({ correct: 1, total: 2 });
    expect($('.stack a').getAttribute('href')).toBe('#/chapter/2');
  });

  it('marks typed answers loosely, with Enter to check', () => {
    quiz([typed, { ...typed, accept: ['Heyali', 'Seven'] }]);
    expect($('.prompt').getAttribute('lang')).toBe('kj');
    expect(text('.hint')).toBe('Hint: It starts with H');
    const input = $<HTMLInputElement>('[data-input]');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })); // nothing typed: nothing happens
    expect(action().textContent).toBe('Check');
    input.value = ' heyali ';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(text('[data-feedback]')).toBe('Right!');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })); // Enter again moves on
    const next = $<HTMLInputElement>('[data-input]');
    next.value = 'seven';
    next.dispatchEvent(new Event('input'));
    action().click();
    expect(text('[data-feedback]')).toBe('Right!');
  });

  it('shows the answer to a wrong typed answer', () => {
    quiz([typed]);
    const input = $<HTMLInputElement>('[data-input]');
    input.value = 'Hetatu';
    input.dispatchEvent(new Event('input'));
    action().click();
    expect(text('[data-feedback]')).toBe('Not quite. The answer is: Heyali');
    expect(input.classList.contains('wrong')).toBe(true);
  });

  it('matches pairs, counting it right only if there was no wrong try', () => {
    quiz([match, match]);
    expect(text('.instruction')).toBe('Tap a word, then tap its meaning');
    expect($('.prompt')).toBeNull();
    expect(action().hidden).toBe(true);
    click('[data-word="0"]');
    click('[data-word="1"]'); // changing your mind
    expect($('[data-word="0"]').getAttribute('aria-pressed')).toBe('false');
    click('[data-meaning="1"]');
    expect($('[data-word="1"]').classList.contains('matched')).toBe(true);
    click('[data-word="1"]'); // already matched: nothing happens
    click('[data-meaning="0"]');
    click('[data-word="0"]');
    expect(text('[data-feedback]')).toBe('Right! Every pair, first time.');
    action().click();
    click('[data-word="0"]');
    click('[data-meaning="1"]');
    expect($('[data-meaning="1"]').classList.contains('wrong')).toBe(true);
    expect(text('[data-feedback]')).toBe('Not a match. Try again.');
    click('[data-word="0"]');
    click('[data-meaning="0"]');
    click('[data-word="1"]');
    click('[data-meaning="1"]');
    expect(text('[data-feedback]')).toBe('All matched, but not first time.');
    action().click();
    expect(text('h1')).toBe('You got 1 of 2 right');
  });

  it('puts items in order with the arrows', () => {
    // Shuffles that always pick the first item give: Mbali, Nhatu, Imwe.
    vi.spyOn(Math, 'random').mockReturnValue(0);
    quiz([order, order]);
    const items = () => $$('.order-text').map((e) => e.textContent);
    expect(items()).toEqual(['Mbali', 'Nhatu', 'Imwe']);
    click('[data-move="2"][data-by="-1"]');
    expect(document.activeElement).toBe($('[data-move="1"][data-by="-1"]'));
    click('[data-move="1"][data-by="-1"]');
    expect(items()).toEqual(['Imwe', 'Mbali', 'Nhatu']);
    expect(document.activeElement).toBe($('[data-move="0"][data-by="1"]'));
    action().click();
    expect(text('[data-feedback]')).toBe('Right!');
    action().click();
    action().click();
    expect(text('[data-feedback]')).toBe('Not quite. The answer is: Imwe, Mbali, Nhatu');
  });

  it('cheers a perfect score, notes a new best, and starts again', () => {
    saveScore('2', { correct: 0, total: 1 });
    quiz([choice]);
    click('[data-option="0"]');
    action().click();
    action().click();
    expect(text('.summary')).toBe('Every one right. Well done! That’s your best score yet.');
    click('[data-again]');
    expect(text('.progress-text')).toBe('Question 1 of 1');
  });

  it('suggests another look at the chapter after a low score', () => {
    quiz([choice, choice, choice, choice]);
    for (let i = 0; i < 4; i++) {
      click(`[data-option="${i < 3 ? 0 : 1}"]`);
      action().click();
      action().click();
    }
    expect(text('.summary')).toBe('Nicely done.');
    quiz([choice]);
    click('[data-option="1"]');
    action().click();
    action().click();
    expect(text('.summary')).toBe('Look over the chapter and try again.');
  });
});
