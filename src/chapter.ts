// The book's pages: a chapter (its parts and blocks, then its quiz button), and the pages that
// gather things from every chapter (Grammar Corners, all the words, the proverbs, and the
// grammar reference).
import { ALL, chapterLabel, GRAMMAR, PROVERBS, WORDS, type Block, type Chapter } from './book';
import { REFERENCE } from './book/reference';
import { backLink, breakable, esc, osh, rich } from './html';
import { bestScore } from './progress';
import { normalize, quizQuestions } from './quiz';

const ARROW = '<span class="arrow" aria-hidden="true">→</span>';

/** A table, joining cells that repeat the ones above them in the leading columns. */
function tableHtml(head: string[], rows: string[][]): string {
  // How many rows each leading cell spans: a cell joins the one above while every cell to
  // its left also does.
  const span: number[][] = rows.map((r) => r.map(() => 1));
  const hidden: boolean[][] = rows.map((r) => r.map(() => false));
  for (let c = 0; c < head.length; c++) {
    for (let r = 1; r < rows.length; r++) {
      const leftJoined = c === 0 || hidden[r][c - 1];
      if (leftJoined && rows[r][c] !== '' && rows[r][c] === rows[r - 1][c]) {
        let top = r - 1;
        while (hidden[top][c]) top--;
        span[top][c]++;
        hidden[r][c] = true;
      }
    }
  }
  return `<div class="table-scroll"><table class="grid">
    <thead><tr>${head.map((h) => `<th scope="col">${h ? esc(h) : '<span class="visually-hidden">Form</span>'}</th>`).join('')}</tr></thead>
    <tbody>${rows
      .map(
        (row, r) =>
          `<tr>${row
            .map((cell, c) => {
              if (hidden[r][c]) return '';
              const rs = span[r][c] > 1 ? ` rowspan="${span[r][c]}"` : '';
              if (cell === '+' || cell === '−') return `<td class="sign"${rs} aria-label="${cell === '+' ? 'Yes' : 'Not'}">${cell}</td>`;
              return c === 0 ? `<th scope="row"${rs}>${breakable(cell)}</th>` : `<td${rs}>${breakable(cell)}</td>`;
            })
            .join('')}</tr>`,
      )
      .join('')}</tbody>
  </table></div>`;
}

const notesHtml = (notes?: string[]) => (notes?.length ? `<div class="notes">${notes.map((n) => `<p>${rich(n)}</p>`).join('')}</div>` : '');
const title = (t?: string) => (t ? `<h3>${rich(t)}</h3>` : '');

const dialogueHtml = (lines: [string, string][]) =>
  `<dl class="dialogue">${lines
    .map(([who, words]) => (who ? `<dt>${esc(who)}</dt><dd lang="kj">${esc(words)}</dd>` : `<dd class="stage">${esc(words)}</dd>`))
    .join('')}</dl>`;

export function blockHtml(b: Block): string {
  switch (b.type) {
    case 'text':
      return `<p>${rich(b.text)}</p>`;
    case 'heading':
      return `<h3>${rich(b.text)}</h3>`;
    case 'reading':
      return `${title(b.title)}<div class="card reading">${b.paragraphs.map((p) => osh(p, 'p')).join('')}</div>`;
    case 'dialogue':
      return `${title(b.title)}${dialogueHtml(b.lines)}`;
    case 'words':
      return `${title(b.title)}<table class="vocab">
    <thead><tr><th scope="col">English</th><th scope="col">Oshikwanyama</th></tr></thead>
    <tbody>${b.rows.map(([en, os]) => `<tr><td>${esc(en)}</td>${osh(os, 'td')}</tr>`).join('')}</tbody>
  </table>${notesHtml(b.notes)}`;
    case 'examples': {
      const [left, right] = b.from === 'both' ? ['kj', 'kj'] : b.from === 'oshikwanyama' ? ['kj', ''] : ['', 'kj'];
      const span = (lang: string, s: string) => `<span${lang ? ` lang="${lang}"` : ''}>${esc(s)}</span>`;
      return `<ul class="examples">${b.rows.map(([a, z]) => `<li>${span(left, a)}${ARROW}${span(right, z)}</li>`).join('')}</ul>`;
    }
    case 'table':
      return `${title(b.title)}${tableHtml(b.head, b.rows)}${notesHtml(b.notes)}`;
    case 'list':
      return `<ul class="bullets">${b.items.map((i) => `<li>${rich(i)}</li>`).join('')}</ul>`;
    case 'tip':
      return `<aside class="box tip"><h3>${rich(b.title)}</h3>${b.blocks.map(blockHtml).join('')}</aside>`;
    case 'culture':
      return `<aside class="box culture"><h3>Cultural information</h3><ul class="bullets">${b.items.map((i) => `<li>${rich(i)}</li>`).join('')}</ul></aside>`;
    case 'proverb':
      return `<figure class="proverb"><figcaption>Omukwanyama ta ti:</figcaption>${osh(b.oshikwanyama, 'blockquote')}<p>${esc(b.english)}</p><p class="meaning">(${esc(b.meaning)})</p></figure>`;
    case 'practice':
      return `<details class="practice"><summary>Practice: ${esc(b.title)}</summary>
    ${b.instruction ? `<p class="instruction-text">${rich(b.instruction)}</p>` : ''}
    ${b.example ? `<p class="example">Example: ${esc(b.example)}</p>` : ''}
    ${b.items?.length ? `<ol>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ol>` : ''}
    ${b.dialogue ? dialogueHtml(b.dialogue) : ''}
  </details>`;
    case 'song':
      return `<div class="card song"><h3 lang="kj">${esc(b.title)}</h3>${b.note ? `<p class="note">${rich(b.note)}</p>` : ''}${b.verses
        .map((v) => `<p lang="kj">${v.map(esc).join('<br>')}</p>`)
        .join('')}</div>`;
  }
}

export function chapterHtml(c: Chapter): string {
  const best = bestScore(c.id);
  const canQuiz = quizQuestions(c).length > 0;
  const i = ALL.indexOf(c);
  const prev = ALL[i - 1];
  const next = ALL[i + 1];
  const toc =
    c.parts.length > 1
      ? `<nav class="toc" aria-label="In this chapter"><h2 class="list-label">In this chapter</h2><ul>${c.parts
          .map((p) => `<li><button type="button" class="toc-link" data-jump="${p.slug}">${p.grammar ? 'Grammar: ' : ''}${esc(p.title)}</button></li>`)
          .join('')}</ul></nav>`
      : '';
  return `${backLink('#/', 'Contents')}
<main class="page chapter">
  <p class="eyebrow">${chapterLabel(c)} · page ${c.page} in the book</p>
  ${osh(c.title, 'h1')}
  <p class="summary">${esc(c.english)}</p>
  ${toc}
  ${c.parts
    .map(
      (p) => `<section class="part${p.grammar ? ' grammar' : ''}" id="part-${p.slug}">
    <h2>${p.grammar ? '<span class="kicker">Grammar Corner</span>' : ''}${esc(p.title)}</h2>
    ${p.blocks.map(blockHtml).join('\n')}
  </section>`,
    )
    .join('\n')}
  <nav class="pager" aria-label="Chapters">
    ${prev ? `<a class="btn secondary" href="#/chapter/${prev.id}">Back: ${chapterLabel(prev)}</a>` : '<span></span>'}
    ${next ? `<a class="btn secondary" href="#/chapter/${next.id}">Next: ${chapterLabel(next)}</a>` : '<span></span>'}
  </nav>
  ${
    canQuiz
      ? `<div class="quiz-bar">
    <a class="btn" href="#/quiz/${c.id}">Start the quiz</a>
    ${best ? `<p class="best">Best score: ${best.correct} of ${best.total}</p>` : ''}
  </div>`
      : ''
  }
</main>`;
}

/** Jump links scroll to a part without changing the address. */
export function setUpChapter(root: HTMLElement, part?: string): void {
  const jump = (slug: string) => root.querySelector(`#part-${CSS.escape(slug)}`)?.scrollIntoView({ block: 'start' });
  root.querySelectorAll<HTMLButtonElement>('[data-jump]').forEach((b) => b.addEventListener('click', () => jump(b.dataset.jump!)));
  if (part) jump(part);
}

export function grammarHtml(): string {
  let last = '';
  return `${backLink('#/', 'Contents')}
<main class="page">
  <h1>Grammar Corners</h1>
  <p class="summary">Every Grammar Corner in the book, in order, and the book’s summary tables.</p>
  <ul class="cards">
    <li><a class="card link-card" href="#/reference"><span class="card-text"><span class="card-title">Grammar reference</span><span class="card-sub">Appendix D: every table on one page</span></span></a></li>
  </ul>
  ${GRAMMAR.map(({ chapter, part }) => {
    const heading = chapter.id !== last ? `${last ? '</ul>' : ''}<h2 class="list-label">${chapterLabel(chapter)}: <span lang="kj">${esc(chapter.title)}</span></h2><ul class="links">` : '';
    last = chapter.id;
    return `${heading}<li><a class="link-row" href="#/chapter/${chapter.id}/${part.slug}">${esc(part.title)}</a></li>`;
  }).join('')}</ul>
</main>`;
}

export function referenceHtml(): string {
  return `${backLink('#/grammar', 'Grammar')}
<main class="page reference">
  <p class="eyebrow">Appendix D</p>
  <h1>Grammar reference</h1>
  <p class="summary">The book’s summary of subject concords, noun classes, numbers and object pronouns.</p>
  ${REFERENCE.map(blockHtml).join('\n')}
</main>`;
}

export function wordsHtml(): string {
  return `${backLink('#/', 'Contents')}
<main class="page words">
  <h1>All the words</h1>
  <p class="summary">Every word list in the book. Search in English or Oshikwanyama.</p>
  <input class="text-answer search" type="search" data-search aria-label="Search the words" placeholder="Search" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" />
  <p class="note" data-count aria-live="polite"></p>
  <ul class="word-list" data-words>${WORDS.map(
    ({ pair: [en, os], chapter, part }) =>
      `<li data-key="${esc(normalize(`${en} ${os}`))}"><a href="#/chapter/${chapter.id}/${part.slug}"><span class="w-os" lang="kj">${esc(os)}</span><span class="w-en">${esc(en)}</span><span class="w-where">${chapterLabel(chapter)}</span></a></li>`,
  ).join('')}</ul>
</main>`;
}

export function setUpWords(root: HTMLElement): void {
  const input = root.querySelector<HTMLInputElement>('[data-search]')!;
  const items = [...root.querySelectorAll<HTMLElement>('[data-words] li')];
  const count = root.querySelector<HTMLElement>('[data-count]')!;
  const filter = () => {
    const q = normalize(input.value);
    let shown = 0;
    for (const li of items) {
      li.hidden = !!q && !li.dataset.key!.includes(q);
      if (!li.hidden) shown++;
    }
    count.textContent = q ? `${shown} ${shown === 1 ? 'match' : 'matches'}` : `${items.length} words and phrases`;
  };
  input.addEventListener('input', filter);
  filter();
}

export function proverbsHtml(): string {
  return `${backLink('#/', 'Contents')}
<main class="page">
  <h1>Omukwanyama ta ti</h1>
  <p class="summary">The proverbs from every chapter: what they say, and what they mean.</p>
  <ul class="proverbs">${PROVERBS.map(
    (p) => `<li class="card">
    ${osh(p.oshikwanyama, 'p', 'proverb-text')}
    <p class="translation">${esc(p.english)}</p>
    <p class="explanation">(${esc(p.meaning)})</p>
    <a class="where" href="#/chapter/${p.chapter.id}/${p.part.slug}">${chapterLabel(p.chapter)}</a>
  </li>`,
  ).join('')}</ul>
</main>`;
}

