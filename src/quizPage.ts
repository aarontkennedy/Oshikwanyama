// A chapter's quiz, one question at a time: answer, Check, see if it was right, Next. At the
// end, the score, saved if it's the chapter's best.
import { chapterLabel, type Chapter } from './book';
import type { FillBlank, Matching, MultipleChoice, Ordering, Question } from './data';
import { backLink, esc, osh } from './html';
import { inOrder, instruction, mixedUp, quizQuestions, shuffle, typedRight } from './quiz';
import { bestScore, saveScore } from './progress';

const UP = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 15l7-7 7 7"/></svg>';
const DOWN = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>';

export class QuizPage {
  private questions: Question[] = [];
  private index = 0;
  private right = 0;
  private answered = false;
  /** Multiple choice: the option chosen. */
  private chosen: string | null = null;
  /** Ordering: the items as they stand now. */
  private order: string[] = [];
  /** Matching: the tile picked first, matched pairs, and whether any try was wrong. */
  private picked: { side: 'word' | 'meaning'; i: number } | null = null;
  private matched = new Set<number>();
  private missed = false;
  private readonly q = <T extends HTMLElement = HTMLElement>(sel: string) => this.root.querySelector<T>(sel)!;

  constructor(
    private readonly root: HTMLElement,
    private readonly chapter: Chapter,
    private readonly random: () => number = Math.random,
    /** The questions to ask, for tests; normally picked fresh each time (quizQuestions). */
    private readonly fixed?: Question[],
  ) {
    this.start();
  }

  start(): void {
    this.questions = this.fixed ?? quizQuestions(this.chapter, this.random);
    this.index = 0;
    this.right = 0;
    this.show();
  }

  private get question(): Question {
    return this.questions[this.index];
  }

  private show(): void {
    this.answered = false;
    this.chosen = null;
    this.picked = null;
    this.matched = new Set();
    this.missed = false;
    const q = this.question;
    if (q.type === 'ordering') this.order = mixedUp(q.items, this.random);
    const n = this.questions.length;
    const hint = q.type === 'fill-blank' && q.hint.trim() ? `<p class="hint">Hint: ${esc(q.hint)}</p>` : '';
    this.root.innerHTML = `${backLink(`#/chapter/${this.chapter.id}`, chapterLabel(this.chapter))}
<main class="page quiz">
  <p class="eyebrow">Quiz: ${osh(this.chapter.title)}</p>
  <p class="progress-text">Question ${this.index + 1} of ${n}</p>
  <div class="progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${this.index}"><span style="width: ${(100 * this.index) / n}%"></span></div>
  <p class="instruction">${instruction(q)}</p>
  ${q.prompt.trim() ? `<h1 class="prompt"${q.promptLang ? ` lang="${q.promptLang}"` : ''}>${esc(q.prompt.trim())}</h1>` : ''}
  ${hint}
  <div class="answer" data-answer>${this.answerHtml(q)}</div>
  <p class="feedback" data-feedback role="status" aria-live="polite"></p>
  <button type="button" class="btn wide" data-action></button>
</main>`;
    this.wire(q);
    this.setAction();
    if (q.type === 'fill-blank') this.q<HTMLInputElement>('[data-input]').focus({ preventScroll: true });
  }

  private answerHtml(q: Question): string {
    switch (q.type) {
      case 'multiple-choice':
        return `<div class="options" role="group" aria-label="Answers">${q.options
          .map((o, i) => `<button type="button" class="option"${q.optionsLang ? ` lang="${q.optionsLang}"` : ''} data-option="${i}" aria-pressed="false">${esc(o.trim())}</button>`)
          .join('')}</div>`;
      case 'fill-blank':
        return `<input class="text-answer" data-input type="text" aria-label="Your answer" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" />`;
      case 'matching':
        return this.matchingHtml(q);
      case 'ordering':
        return `<ol class="order" data-order></ol>`;
    }
  }

  private matchingHtml(q: Matching): string {
    const meanings = shuffle(
      q.pairs.map((_, i) => i),
      this.random,
    );
    return `<div class="match">
  <div class="match-col" role="group" aria-label="Oshikwanyama">${q.pairs
    .map((p, i) => `<button type="button" class="tile" lang="kj" data-word="${i}" aria-pressed="false">${esc(p.Oshikwanyama.trim())}</button>`)
    .join('')}</div>
  <div class="match-col" role="group" aria-label="English">${meanings
    .map((i) => `<button type="button" class="tile" data-meaning="${i}" aria-pressed="false">${esc(q.pairs[i].English.trim())}</button>`)
    .join('')}</div>
</div>`;
  }

  private wire(q: Question): void {
    this.q('[data-action]').addEventListener('click', () => this.act());
    if (q.type === 'multiple-choice') {
      this.root.querySelectorAll<HTMLButtonElement>('[data-option]').forEach((b) =>
        b.addEventListener('click', () => {
          if (this.answered) return;
          this.chosen = q.options[Number(b.dataset.option)];
          this.root.querySelectorAll('[data-option]').forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
          this.setAction();
        }),
      );
    } else if (q.type === 'fill-blank') {
      const input = this.q<HTMLInputElement>('[data-input]');
      input.addEventListener('input', () => this.setAction());
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) this.act();
      });
    } else if (q.type === 'matching') {
      this.root.querySelectorAll<HTMLButtonElement>('.tile').forEach((b) => b.addEventListener('click', () => this.pick(q, b)));
    } else {
      this.drawOrder();
    }
  }

  /** Matching: the first tap picks a tile; a tap on the other side tries a pair. */
  private pick(q: Matching, b: HTMLButtonElement): void {
    const side = b.dataset.word !== undefined ? 'word' : 'meaning';
    const i = Number(side === 'word' ? b.dataset.word : b.dataset.meaning);
    if (this.matched.has(i)) return;
    if (!this.picked || this.picked.side === side) {
      this.picked = { side, i };
    } else {
      if (this.picked.i === i) {
        this.matched.add(i);
        this.root.querySelectorAll(`[data-word="${i}"], [data-meaning="${i}"]`).forEach((t) => {
          t.classList.add('matched');
          t.setAttribute('aria-disabled', 'true');
        });
        this.say('');
      } else {
        this.missed = true;
        b.classList.remove('wrong');
        void b.offsetWidth; // restart the shake
        b.classList.add('wrong');
        this.say('Not a match. Try again.');
      }
      this.picked = null;
    }
    this.root.querySelectorAll('.tile').forEach((t) => {
      const el = t as HTMLElement;
      const me = el.dataset.word !== undefined ? { side: 'word', i: Number(el.dataset.word) } : { side: 'meaning', i: Number(el.dataset.meaning) };
      el.setAttribute('aria-pressed', String(!!this.picked && this.picked.side === me.side && this.picked.i === me.i));
    });
    if (this.matched.size === q.pairs.length) this.mark(!this.missed);
  }

  private drawOrder(): void {
    const list = this.q('[data-order]');
    const n = this.order.length;
    list.innerHTML = this.order
      .map(
        (item, i) => `<li class="order-item"><span class="order-text">${esc(item)}</span>
  <button type="button" class="move" data-move="${i}" data-by="-1" aria-label="Move ${esc(item)} up"${i === 0 ? ' disabled' : ''}>${UP}</button>
  <button type="button" class="move" data-move="${i}" data-by="1" aria-label="Move ${esc(item)} down"${i === n - 1 ? ' disabled' : ''}>${DOWN}</button>
</li>`,
      )
      .join('');
    list.querySelectorAll<HTMLButtonElement>('[data-move]').forEach((b) =>
      b.addEventListener('click', () => {
        if (this.answered) return;
        const from = Number(b.dataset.move);
        const to = from + Number(b.dataset.by);
        [this.order[from], this.order[to]] = [this.order[to], this.order[from]];
        this.drawOrder();
        // Keep the finger's place: focus the same button on the item's new row, or its other one.
        const again = list.querySelector<HTMLButtonElement>(`[data-move="${to}"][data-by="${b.dataset.by}"]:not(:disabled)`);
        (again ?? list.querySelector<HTMLButtonElement>(`[data-move="${to}"]:not(:disabled)`))?.focus();
      }),
    );
  }

  /** The big button: Check, then Next (or See your score). */
  private setAction(): void {
    const button = this.q<HTMLButtonElement>('[data-action]');
    const q = this.question;
    if (this.answered) {
      button.textContent = this.index === this.questions.length - 1 ? 'See your score' : 'Next';
      button.disabled = false;
      button.hidden = false;
      return;
    }
    button.textContent = 'Check';
    // Matching marks itself when every pair is found.
    button.hidden = q.type === 'matching';
    button.disabled =
      (q.type === 'multiple-choice' && this.chosen === null) || (q.type === 'fill-blank' && !this.q<HTMLInputElement>('[data-input]').value.trim());
  }

  private act(): void {
    if (this.answered) this.next();
    else this.check();
  }

  private check(): void {
    const q = this.question;
    if (q.type === 'multiple-choice') this.checkChoice(q);
    else if (q.type === 'fill-blank') this.checkTyped(q);
    else if (q.type === 'ordering') this.checkOrder(q);
  }

  private checkChoice(q: MultipleChoice): void {
    if (this.chosen === null) return;
    const right = this.chosen === q.correct;
    this.root.querySelectorAll<HTMLButtonElement>('[data-option]').forEach((b) => {
      const option = q.options[Number(b.dataset.option)];
      if (option === q.correct) b.classList.add('right');
      else if (option === this.chosen) b.classList.add('wrong');
      b.setAttribute('aria-disabled', 'true');
    });
    this.mark(right, right ? '' : q.correct, q.explanation);
  }

  private checkTyped(q: FillBlank): void {
    const input = this.q<HTMLInputElement>('[data-input]');
    if (!input.value.trim()) return;
    const right = typedRight(q, input.value);
    input.readOnly = true;
    input.classList.add(right ? 'right' : 'wrong');
    this.mark(right, right ? '' : q.answer);
  }

  private checkOrder(q: Ordering): void {
    const right = inOrder(this.order, q.items);
    this.root.querySelectorAll<HTMLButtonElement>('[data-move]').forEach((b) => (b.disabled = true));
    this.q('[data-order]').classList.add(right ? 'right' : 'wrong');
    this.mark(right, right ? '' : q.items.join(', '));
  }

  private mark(right: boolean, answer = '', explanation = ''): void {
    this.answered = true;
    if (right) this.right++;
    const feedback = this.q('[data-feedback]');
    feedback.className = `feedback ${right ? 'right' : 'wrong'}`;
    const q = this.question;
    const text =
      q.type === 'matching'
        ? right
          ? 'Right! Every pair, first time.'
          : 'All matched, but not first time.'
        : right
          ? 'Right!'
          : `Not quite. The answer is: ${answer.trim()}`;
    this.say(explanation.trim() ? `${text} ${explanation.trim()}` : text);
    this.setAction();
    this.q('[data-action]').focus({ preventScroll: true });
  }

  private say(text: string): void {
    this.q('[data-feedback]').textContent = text;
  }

  private next(): void {
    if (this.index < this.questions.length - 1) {
      this.index++;
      this.show();
      document.documentElement.scrollTop = 0;
    } else this.finish();
  }

  private finish(): void {
    const total = this.questions.length;
    const before = bestScore(this.chapter.id);
    const best = saveScore(this.chapter.id, { correct: this.right, total });
    const message =
      this.right === total ? 'Every one right. Well done!' : this.right >= total * 0.7 ? 'Nicely done.' : 'Look over the chapter and try again.';
    this.root.innerHTML = `${backLink(`#/chapter/${this.chapter.id}`, chapterLabel(this.chapter))}
<main class="page quiz done">
  <p class="eyebrow">Quiz: ${osh(this.chapter.title)}</p>
  <h1>You got ${this.right} of ${total} right</h1>
  <p class="summary">${message}${best && before ? ' That’s your best score yet.' : ''}</p>
  <div class="stack">
    <button type="button" class="btn wide" data-again>Try again</button>
    <a class="btn wide secondary" href="#/chapter/${this.chapter.id}">Back to the chapter</a>
    <a class="btn wide secondary" href="#/">Contents</a>
  </div>
</main>`;
    this.q('[data-again]').addEventListener('click', () => this.start());
    document.documentElement.scrollTop = 0;
  }
}
