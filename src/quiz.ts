// A chapter's quiz: which questions it asks, and how answers are marked. No page code here.
//
// Every answer comes from the book: questions are made from the chapter's word lists and the
// grammar tables marked for drilling, plus any hand-written ones (src/book/questions.json).
import { ALL, chapterBlocks, type Chapter, type Pair } from './book';
import type { FillBlank, Matching, MultipleChoice, Question } from './data';

/** Questions in every quiz, when there are enough. */
export const QUIZ_LENGTH = 10;
const HAND_WRITTEN = 4;
const DRILLS = 3;
const TYPED = 2;
const MATCH_PAIRS = 4;
const OPTIONS = 4;

/** A shuffled copy (Fisher-Yates). `random` is swappable for tests. */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * How typed answers are compared: case, curly apostrophes, extra spaces and a full stop or
 * question mark at the end don't matter.
 */
export function normalize(text: string): string {
  return text
    .replace(/[‘’]/g, "'")
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.?!,]+$/, '')
    .trim();
}

export const sameAnswer = (given: string, expected: string): boolean => normalize(given) === normalize(expected);

/**
 * The ways of writing a word list entry that count as right: each choice between slashes, with
 * or without what's in brackets. "Ofewa (yokulikosha)" accepts "Ofewa" and "Ofewa yokulikosha";
 * "Me(m)ekulu" accepts "Meekulu" and "Memekulu".
 */
export function variants(entry: string): string[] {
  const out = new Set<string>();
  for (const choice of entry.split(/\s+\/\s+/)) {
    out.add(choice.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim());
    out.add(choice.replace(/[()]/g, '').replace(/\s+/g, ' ').trim());
  }
  return [...out].filter(Boolean);
}

/** Entries the quiz can use: no blanks to fill in, and no table footnote marks. */
const usable = (s: string) => !!s.trim() && !/\.\.\.|…|_|\*|^-$|normal numbers/.test(s);

/** The chapter's quizzable word list rows. */
export function quizWords(chapter: Chapter): Pair[] {
  const rows: Pair[] = [];
  for (const { block } of chapterBlocks(chapter)) {
    if (block.type === 'words' && block.quiz !== false) rows.push(...block.rows.filter(([en, os]) => usable(en) && usable(os)));
  }
  return rows;
}

export interface Drill {
  /** What's asked: the table's name, row and column. */
  prompt: string;
  answer: string;
  /** The column's other answers, for wrong options. */
  column: string[];
}

/** One drill per cell of the chapter's drill tables. */
export function quizDrills(chapter: Chapter): Drill[] {
  const drills: Drill[] = [];
  for (const { part, block } of chapterBlocks(chapter)) {
    if (block.type !== 'table' || !block.drill) continue;
    const { labels } = block.drill;
    const name = block.title ?? part.title;
    for (let c = labels; c < block.head.length; c++) {
      const column = block.rows.map((r) => r[c]).filter(usable);
      for (const row of block.rows) {
        if (!usable(row[c])) continue;
        const label = row
          .slice(0, labels)
          .map((cell) => (cell === '+' ? '(positive)' : cell === '−' ? '(negative)' : cell))
          .join(' ');
        drills.push({ prompt: `${name}: ${label}${block.head[c] ? `, ${block.head[c].replace(/[“”]/g, '')}` : ''}`, answer: row[c], column });
      }
    }
  }
  return drills;
}

/** `count` items from `pool` that don't clash with `answer` or each other. */
function wrongOptions(answer: string, pool: readonly string[], count: number, random: () => number): string[] {
  const picked: string[] = [];
  const seen = new Set([normalize(answer)]);
  for (const option of shuffle(pool, random)) {
    if (picked.length === count) break;
    const key = normalize(option);
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(option);
  }
  return picked;
}

function choiceFromWord([en, os]: Pair, words: readonly Pair[], toOshikwanyama: boolean, random: () => number): MultipleChoice | null {
  // Rows that share the prompt can't be wrong answers.
  const others = words.filter(([e, o]) => normalize(toOshikwanyama ? e : o) !== normalize(toOshikwanyama ? en : os));
  const pool = others.map(([e, o]) => (toOshikwanyama ? o : e));
  const correct = toOshikwanyama ? os : en;
  const wrong = wrongOptions(correct, pool, OPTIONS - 1, random);
  if (wrong.length < OPTIONS - 1) return null;
  return {
    type: 'multiple-choice',
    instruction: toOshikwanyama ? 'Choose the Oshikwanyama' : 'Choose the English',
    prompt: toOshikwanyama ? en : os,
    ...(toOshikwanyama ? { optionsLang: 'kj' as const } : { promptLang: 'kj' as const }),
    options: shuffle([correct, ...wrong], random),
    correct,
    explanation: '',
  };
}

function typedFromWord([en, os]: Pair): FillBlank {
  const accept = variants(os);
  return { type: 'fill-blank', instruction: 'Type it in Oshikwanyama', prompt: en, answer: os, accept, hint: '' };
}

function matchingFromWords(words: readonly Pair[], random: () => number): Matching | null {
  const pairs: Pair[] = [];
  const seen = new Set<string>();
  for (const [en, os] of shuffle(words, random)) {
    if (pairs.length === MATCH_PAIRS) break;
    if (seen.has(normalize(en)) || seen.has(normalize(os))) continue;
    seen.add(normalize(en));
    seen.add(normalize(os));
    pairs.push([en, os]);
  }
  if (pairs.length < MATCH_PAIRS) return null;
  return { type: 'matching', prompt: '', pairs: pairs.map(([English, Oshikwanyama]) => ({ English, Oshikwanyama })) };
}

function choiceFromDrill(d: Drill, random: () => number): MultipleChoice | null {
  const wrong = wrongOptions(d.answer, d.column, OPTIONS - 1, random);
  if (wrong.length < 2) return null;
  return { type: 'multiple-choice', instruction: 'Choose the form', prompt: d.prompt, options: shuffle([d.answer, ...wrong], random), correct: d.answer, explanation: '', optionsLang: 'kj' };
}

/** Short enough to type on a phone: a word or two. */
const typeable = ([, os]: Pair) => variants(os).some((v) => v.split(' ').length <= 3);

/**
 * The questions for a chapter's quiz, in a random order: a few hand-written ones, a matching
 * question, a few grammar drills, then word questions both ways, with two typed answers. A
 * chapter with few words of its own borrows from earlier chapters.
 */
export function quizQuestions(chapter: Chapter, random: () => number = Math.random): Question[] {
  let words = quizWords(chapter);
  if (words.length < QUIZ_LENGTH) {
    const earlier = ALL.slice(0, Math.max(0, ALL.indexOf(chapter))).flatMap(quizWords);
    words = [...words, ...shuffle(earlier, random).slice(0, QUIZ_LENGTH * 2)];
  }
  const out: Question[] = shuffle(chapter.questions ?? [], random).slice(0, HAND_WRITTEN);
  const matching = matchingFromWords(words, random);
  if (matching) out.push(matching);
  for (const d of shuffle(quizDrills(chapter), random)) {
    if (out.length >= QUIZ_LENGTH || out.filter((q) => q.instruction === 'Choose the form').length === DRILLS) break;
    const q = choiceFromDrill(d, random);
    if (q) out.push(q);
  }
  const asked = new Set(out.map((q) => normalize(q.prompt)));
  let typed = 0;
  for (const [i, word] of shuffle(words, random).entries()) {
    if (out.length >= QUIZ_LENGTH) break;
    if (asked.has(normalize(word[0])) || asked.has(normalize(word[1]))) continue;
    let q: Question | null;
    if (typed < TYPED && typeable(word)) {
      q = typedFromWord(word);
      typed++;
    } else q = choiceFromWord(word, words, i % 2 === 0, random);
    if (!q) continue;
    asked.add(normalize(word[0]));
    asked.add(normalize(word[1]));
    out.push(q);
  }
  return shuffle(out, random);
}

/** The items to put in order, mixed up so they never start in the right order. */
export function mixedUp(items: readonly string[], random: () => number = Math.random): string[] {
  if (items.length < 2 || items.every((s) => s === items[0])) return [...items];
  let mixed = shuffle(items, random);
  // A shuffle can land in order; move the first to the end until it doesn't.
  while (mixed.every((s, i) => s === items[i])) mixed = [...mixed.slice(1), mixed[0]];
  return mixed;
}

export const inOrder = (given: readonly string[], items: readonly string[]): boolean =>
  given.length === items.length && given.every((s, i) => sameAnswer(s, items[i]));

/** The words a quiz asks you to do. */
export function instruction(q: Question): string {
  if (q.instruction) return q.instruction;
  switch (q.type) {
    case 'multiple-choice':
      return 'Choose the answer';
    case 'fill-blank':
      return 'Type the translation';
    case 'matching':
      return 'Tap a word, then tap its meaning';
    case 'ordering':
      return 'Put these in order';
  }
}

/** Whether a typed answer is right. */
export const typedRight = (q: FillBlank, given: string): boolean => [q.answer, ...(q.accept ?? [])].some((a) => sameAnswer(given, a));
