import { describe, expect, it } from 'vitest';
import { ALL, chapterLabel, findChapter, type Chapter } from './book';
import type { FillBlank, Question } from './data';
import { inOrder, instruction, mixedUp, normalize, QUIZ_LENGTH, quizDrills, quizQuestions, quizWords, sameAnswer, shuffle, typedRight, variants } from './quiz';

/** A repeatable stand-in for Math.random. */
function seeded(seed = 1) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

describe('shuffle', () => {
  it('keeps every item and leaves the original alone', () => {
    const items = [1, 2, 3, 4, 5];
    expect([...shuffle(items, seeded())].sort()).toEqual(items);
    expect(items).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('marking typed answers', () => {
  it('ignores case, spaces, curly apostrophes and a full stop at the end', () => {
    expect(normalize('  I’m   Hungry. ')).toBe("i'm hungry");
    expect(sameAnswer('Wa lele po', 'Wa lele po?')).toBe(true);
    expect(sameAnswer('Heyali', 'Hetatu')).toBe(false);
  });

  it('accepts each choice in a word list entry, with or without the bracketed part', () => {
    expect(variants('Ehee / Ee / Heeno')).toEqual(['Ehee', 'Ee', 'Heeno']);
    expect(variants('Ofewa (yokulikosha)')).toEqual(['Ofewa', 'Ofewa yokulikosha']);
    expect(variants('Me(m)ekulu')).toEqual(['Me ekulu', 'Memekulu']);
    expect(variants('Lya (li)')).toEqual(['Lya', 'Lya li']);
    const q: FillBlank = { type: 'fill-blank', prompt: 'Yes', answer: 'Ehee / Ee / Heeno', accept: variants('Ehee / Ee / Heeno'), hint: '' };
    expect(typedRight(q, 'heeno')).toBe(true);
    expect(typedRight(q, 'Ehee / Ee / Heeno')).toBe(true);
    expect(typedRight(q, 'Aaye')).toBe(false);
    expect(typedRight({ ...q, accept: undefined }, 'Ee')).toBe(false);
  });
});

describe('what a quiz is made of', () => {
  it('takes word list rows, leaving out the ones with blanks', () => {
    const words = quizWords(findChapter('3')!);
    expect(words).toContainEqual(['Where are you from?', 'Owa dja peni?']);
    expect(words.some(([en]) => en.includes('...'))).toBe(false);
  });

  it('leaves out word lists marked not for quizzing', () => {
    expect(quizWords(findChapter('4')!)).not.toContainEqual(['To sing', 'Okwiimba']);
  });

  it('drills the grammar tables, cell by cell', () => {
    const drills = quizDrills(findChapter('3')!);
    expect(drills).toContainEqual(expect.objectContaining({ prompt: 'Subject Concords for Active Verbs: Ame (positive), Past', answer: 'Onda' }));
    expect(drills).toContainEqual(expect.objectContaining({ prompt: 'Subject Concords for Stative Verbs: Vo (negative), Present', answer: 'Kave' }));
    // Footnote marks aren't answers.
    expect(drills.some((d) => d.answer.includes('*'))).toBe(false);
    expect(quizDrills(findChapter('1')!)).toEqual([]);
  });
});

describe('every quiz', () => {
  it.each(ALL.map((c) => [chapterLabel(c), c] as const))('%s asks ten fair questions', (_, chapter: Chapter) => {
    for (let seed = 1; seed <= 5; seed++) {
      const qs = quizQuestions(chapter, seeded(seed));
      expect(qs).toHaveLength(QUIZ_LENGTH);
      for (const q of qs) {
        if (q.type === 'multiple-choice') {
          expect(q.options, q.prompt).toContain(q.correct);
          expect(new Set(q.options.map(normalize)).size, q.prompt).toBe(q.options.length);
          expect(q.options.length).toBeGreaterThanOrEqual(3);
        }
        if (q.type === 'matching') {
          expect(new Set(q.pairs.map((p) => normalize(p.English))).size).toBe(q.pairs.length);
          expect(new Set(q.pairs.map((p) => normalize(p.Oshikwanyama))).size).toBe(q.pairs.length);
        }
        if (q.type === 'fill-blank') expect(typedRight(q, q.accept?.[0] ?? q.answer)).toBe(true);
      }
      const prompts = qs.filter((q) => q.prompt).map((q) => normalize(q.prompt));
      expect(new Set(prompts).size, 'no prompt twice').toBe(prompts.length);
    }
  });

  it('mixes hand-written questions, a matching question, drills and typed answers', () => {
    const kinds = (qs: Question[]) => new Set(qs.map((q) => (q.instruction ?? q.type).toString()));
    const ch3 = kinds(quizQuestions(findChapter('3')!, seeded()));
    expect(ch3).toContain('matching');
    expect(ch3).toContain('Choose the form');
    expect(ch3).toContain('Type it in Oshikwanyama');
    const ch1 = quizQuestions(findChapter('1')!, seeded());
    expect(ch1.filter((q) => !q.instruction && q.type !== 'matching').length).toBeGreaterThan(0);
  });

  it('borrows earlier chapters’ words when a chapter has few of its own', () => {
    const ch12 = findChapter('12')!;
    expect(quizWords(ch12)).toEqual([]);
    expect(quizQuestions(ch12, seeded())).toHaveLength(QUIZ_LENGTH);
  });
});

describe('a chapter with little in it', () => {
  // Not in the book: two words, and a drill table too small for wrong options.
  const tiny: Chapter = {
    id: 'z',
    title: 'Tiny',
    english: 'Tiny',
    page: 1,
    parts: [
      {
        slug: 'tiny',
        title: 'Tiny',
        blocks: [
          { type: 'words', rows: [['Lion', 'Onghoshi'], ['Lion', 'Onghoshi'], ['Long sentence about lions here', 'Onghoshi ihai li omuti nande nande']] },
          { type: 'table', head: ['Person', 'Form'], rows: [['Ame', 'ndi'], ['Ove', 'ndi']], drill: { labels: 1 } },
          { type: 'table', title: 'Named', head: ['Person', ''], rows: [['Ame', 'ndi'], ['Ove', 'u'], ['Ye', 'a']], drill: { labels: 1 } },
        ],
      },
    ],
  };

  it('skips what it can’t ask fairly', () => {
    const qs = quizQuestions(tiny, seeded());
    // Too few words for wrong options or a matching question, and a drill whose answers are
    // all the same: only the typed questions and the named table's drills are left.
    expect(qs.map((q) => q.instruction).sort()).toEqual(['Choose the form', 'Choose the form', 'Choose the form', 'Type it in Oshikwanyama']);
    // The table without a column name still makes a fair drill.
    expect(quizDrills(tiny).map((d) => d.prompt)).toContain('Named: Ame');
    for (const q of qs) if (q.type === 'multiple-choice') expect(new Set(q.options).size).toBe(q.options.length);
  });
});

describe('ordering', () => {
  it('mixes the items up, never leaving them in order', () => {
    const items = ['a', 'b', 'c'];
    for (let seed = 1; seed < 50; seed++) {
      const mixed = mixedUp(items, seeded(seed));
      expect([...mixed].sort()).toEqual(items);
      expect(inOrder(mixed, items)).toBe(false);
    }
  });

  it('leaves alone what can’t be mixed up', () => {
    expect(mixedUp(['a'])).toEqual(['a']);
    expect(mixedUp(['a', 'a'])).toEqual(['a', 'a']);
  });

  it('checks the order loosely, like typed answers', () => {
    expect(inOrder(['Imwe', 'mbali '], ['imwe', 'Mbali'])).toBe(true);
    expect(inOrder(['Mbali', 'Imwe'], ['Imwe', 'Mbali'])).toBe(false);
    expect(inOrder(['Imwe'], ['Imwe', 'Mbali'])).toBe(false);
  });
});

describe('instructions', () => {
  it('say what to do for each kind of question', () => {
    expect(instruction({ type: 'multiple-choice', prompt: '', options: [], correct: '', explanation: '' })).toBe('Choose the answer');
    expect(instruction({ type: 'fill-blank', prompt: '', answer: '', hint: '' })).toBe('Type the translation');
    expect(instruction({ type: 'matching', prompt: '', pairs: [] })).toBe('Tap a word, then tap its meaning');
    expect(instruction({ type: 'ordering', prompt: '', items: [] })).toBe('Put these in order');
    expect(instruction({ type: 'ordering', prompt: '', items: [], instruction: 'Count up' })).toBe('Count up');
  });
});
