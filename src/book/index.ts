// "Hai ti! A Beginner's Guide to Oshikwanyama" by Thera Crane, Karl Lindgren-Streicher and Andy
// Wingo (2004), under the Creative Commons Attribution-ShareAlike licence. Its text is
// transcribed here, chapter by chapter, with small changes listed in docs/CONTENT.md.
import { appendixA, appendixB, appendixC } from './appendices';
import { ch01 } from './ch01';
import { ch02 } from './ch02';
import { ch03 } from './ch03';
import { ch04 } from './ch04';
import { ch05 } from './ch05';
import { ch06 } from './ch06';
import { ch07 } from './ch07';
import { ch08 } from './ch08';
import { ch09 } from './ch09';
import { ch10 } from './ch10';
import { ch11 } from './ch11';
import { ch12 } from './ch12';
import type { Block, Chapter, Pair, Part } from './types';

export type { Block, Chapter, Pair, Part } from './types';

export const BOOK = {
  title: 'Hai ti! A Beginner’s Guide to Oshikwanyama',
  authors: 'Thera Crane, Karl Lindgren-Streicher and Andy Wingo',
  year: 2004,
  license: 'CC BY-SA 2.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
};

export const CHAPTERS: Chapter[] = [ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09, ch10, ch11, ch12];
export const APPENDICES: Chapter[] = [appendixA, appendixB, appendixC];
/** Every chapter and appendix, in the book's order. */
export const ALL: Chapter[] = [...CHAPTERS, ...APPENDICES];

export const findChapter = (id: string): Chapter | undefined => ALL.find((c) => c.id === id);

/** "Chapter 3" or "Appendix B". */
export const chapterLabel = (c: Chapter): string => (/^\d+$/.test(c.id) ? `Chapter ${c.id}` : `Appendix ${c.id.toUpperCase()}`);

/** Every block in a list of blocks, including those inside Quick Tips. */
export function* allBlocks(blocks: readonly Block[]): Generator<Block> {
  for (const b of blocks) {
    yield b;
    if (b.type === 'tip') yield* allBlocks(b.blocks);
  }
}

/** Every block in a chapter, with the part it's in. */
export function* chapterBlocks(c: Chapter): Generator<{ part: Part; block: Block }> {
  for (const part of c.parts) for (const block of allBlocks(part.blocks)) yield { part, block };
}

export interface WordEntry {
  pair: Pair;
  chapter: Chapter;
  part: Part;
}

/** Every row of every word list in the book. */
export const WORDS: WordEntry[] = ALL.flatMap((chapter) =>
  [...chapterBlocks(chapter)].flatMap(({ part, block }) => (block.type === 'words' ? block.rows.map((pair) => ({ pair, chapter, part })) : [])),
);

export interface ProverbEntry {
  oshikwanyama: string;
  english: string;
  meaning: string;
  chapter: Chapter;
  part: Part;
}

/** "Omukwanyama ta ti": every proverb in the book, in order. */
export const PROVERBS: ProverbEntry[] = ALL.flatMap((chapter) =>
  [...chapterBlocks(chapter)].flatMap(({ part, block }) => (block.type === 'proverb' ? [{ ...block, chapter, part }] : [])),
);

/** Every Grammar Corner, in order. */
export const GRAMMAR: { chapter: Chapter; part: Part }[] = CHAPTERS.flatMap((chapter) => chapter.parts.filter((p) => p.grammar).map((part) => ({ chapter, part })));
