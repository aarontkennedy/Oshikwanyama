// The transcribed book fits the shapes the pages and quizzes expect, so a slip in a chapter
// file shows up here rather than as a broken page.
import { describe, expect, it } from 'vitest';
import type { Question } from '../data';
import { ALL, allBlocks, APPENDICES, chapterLabel, CHAPTERS, findChapter, GRAMMAR, PROVERBS, WORDS, type Block } from '.';
import questions from './questions.json';
import { REFERENCE } from './reference';

const filled = (s: unknown) => typeof s === 'string' && s.trim().length > 0;

/** What's wrong with a block, if anything. */
function problems(b: Block): string[] {
  const out: string[] = [];
  switch (b.type) {
    case 'text':
    case 'heading':
      if (!filled(b.text)) out.push('empty');
      if ((b.text.match(/_/g) ?? []).length % 2) out.push('unpaired _');
      break;
    case 'reading':
      if (!b.paragraphs.length || !b.paragraphs.every(filled)) out.push('empty paragraph');
      break;
    case 'dialogue':
      if (!b.lines.length || !b.lines.every(([, words]) => filled(words))) out.push('empty line');
      break;
    case 'words':
      if (!b.rows.length) out.push('no rows');
      for (const [en, os] of b.rows) if (!filled(en) || !filled(os)) out.push(`empty row: ${en} / ${os}`);
      break;
    case 'examples':
      if (!b.rows.length || !b.rows.every(([a, z]) => filled(a) && filled(z))) out.push('empty example');
      break;
    case 'table':
      for (const row of b.rows) if (row.length !== b.head.length) out.push(`row of ${row.length} under ${b.head.length} columns: ${row[0]}`);
      if (b.drill && b.drill.labels >= b.head.length) out.push('drill labels every column');
      break;
    case 'list':
    case 'culture':
      if (!b.items.length || !b.items.every(filled)) out.push('empty item');
      for (const i of b.items) if ((i.match(/_/g) ?? []).length % 2) out.push(`unpaired _: ${i}`);
      break;
    case 'tip':
      if (!filled(b.title) || !b.blocks.length) out.push('empty tip');
      break;
    case 'proverb':
      if (![b.oshikwanyama, b.english, b.meaning].every(filled)) out.push('proverb missing a part');
      break;
    case 'practice':
      if (!filled(b.title) || !(filled(b.instruction) || b.items?.length)) out.push('practice with nothing to do');
      break;
    case 'song':
      if (!filled(b.title) || !b.verses.length || !b.verses.every((v) => v.every(filled))) out.push('empty song');
      break;
  }
  return out;
}

function questionProblems(q: Question): string[] {
  switch (q.type) {
    case 'multiple-choice':
      return q.options.includes(q.correct) && q.options.length >= 2 ? [] : ['answer not an option'];
    case 'fill-blank':
      return filled(q.answer) && filled(q.prompt) ? [] : ['no answer or prompt'];
    case 'matching':
      return q.pairs.length >= 2 ? [] : ['too few pairs'];
    case 'ordering':
      return q.items.length >= 2 ? [] : ['too few items'];
  }
}

describe('the book', () => {
  it('has twelve chapters and three appendices, in page order', () => {
    expect(CHAPTERS.map((c) => c.id)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
    expect(APPENDICES.map((c) => c.id)).toEqual(['a', 'b', 'c']);
    const pages = ALL.map((c) => c.page);
    expect(pages).toEqual([...pages].sort((a, b) => a - b));
  });

  it.each(ALL.map((c) => [chapterLabel(c), c] as const))('%s is in shape', (_, chapter) => {
    expect(filled(chapter.title) && filled(chapter.english)).toBe(true);
    expect(chapter.parts.length).toBeGreaterThan(0);
    const slugs = chapter.parts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const part of chapter.parts) {
      expect(part.slug).toMatch(/^[a-z0-9-]+$/);
      expect(part.blocks.length, part.title).toBeGreaterThan(0);
      for (const b of allBlocks(part.blocks)) expect(problems(b), `${part.title}: ${b.type}`).toEqual([]);
    }
    for (const q of chapter.questions ?? []) expect(questionProblems(q), q.prompt).toEqual([]);
  });

  it('keeps the hand-written questions in chapters 1 and 2', () => {
    expect(Object.keys(questions)).toEqual(['1', '2']);
    expect(findChapter('1')!.questions).toHaveLength(questions['1'].length);
    expect(findChapter('2')!.questions).toHaveLength(questions['2'].length);
  });

  it('gathers the Grammar Corners, words and proverbs from every chapter', () => {
    expect(GRAMMAR.map((g) => g.part.title)).toContain('Verbs');
    expect(GRAMMAR.length).toBeGreaterThan(25);
    expect(WORDS.length).toBeGreaterThan(500);
    expect(WORDS[0]).toMatchObject({ pair: ['Good', 'Nawa'] });
    expect(PROVERBS[0].oshikwanyama).toBe('Eyoka lakula itali ku hange u na odibo.');
    expect(PROVERBS.length).toBe(20);
  });

  it('labels chapters and appendices', () => {
    expect(chapterLabel(findChapter('3')!)).toBe('Chapter 3');
    expect(chapterLabel(findChapter('b')!)).toBe('Appendix B');
    expect(findChapter('99')).toBeUndefined();
  });

  it('has the grammar reference tables in shape', () => {
    for (const b of REFERENCE) expect(problems(b)).toEqual([]);
  });

  it('finds broken blocks', () => {
    expect(problems({ type: 'text', text: 'an _odd one' })).toEqual(['unpaired _']);
    expect(problems({ type: 'heading', text: ' ' })).toEqual(['empty']);
    expect(problems({ type: 'reading', paragraphs: [] })).toHaveLength(1);
    expect(problems({ type: 'dialogue', lines: [['A', '']] })).toHaveLength(1);
    expect(problems({ type: 'words', rows: [] })).toEqual(['no rows']);
    expect(problems({ type: 'words', rows: [['a', '']] })).toHaveLength(1);
    expect(problems({ type: 'examples', rows: [] })).toHaveLength(1);
    expect(problems({ type: 'table', head: ['a', 'b'], rows: [['x']], drill: { labels: 2 } })).toHaveLength(2);
    expect(problems({ type: 'list', items: ['_x'] })).toEqual(['unpaired _: _x']);
    expect(problems({ type: 'culture', items: [] })).toEqual(['empty item']);
    expect(problems({ type: 'tip', title: '', blocks: [] })).toEqual(['empty tip']);
    expect(problems({ type: 'proverb', oshikwanyama: 'a', english: '', meaning: 'c' })).toHaveLength(1);
    expect(problems({ type: 'practice', title: 'Exercise 1', instruction: '' })).toHaveLength(1);
    expect(problems({ type: 'song', title: 'x', verses: [['']] })).toHaveLength(1);
    expect(questionProblems({ type: 'multiple-choice', prompt: '', options: ['a'], correct: 'b', explanation: '' })).toHaveLength(1);
    expect(questionProblems({ type: 'fill-blank', prompt: '', answer: 'a', hint: '' })).toHaveLength(1);
    expect(questionProblems({ type: 'matching', prompt: '', pairs: [] })).toHaveLength(1);
    expect(questionProblems({ type: 'ordering', prompt: '', items: ['a'] })).toHaveLength(1);
  });
});
