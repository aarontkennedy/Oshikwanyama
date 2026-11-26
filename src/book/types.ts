// The shape of the book's content. Each chapter is a list of parts (the chapter's own
// material, then its Grammar Corners), and each part a list of blocks in the book's order.
//
// In text, _underscores_ mark Oshikwanyama words in English sentences (shown in italics, as
// in the book). Tables are plain strings.
import type { Question } from '../data';

/** An English → Oshikwanyama row. */
export type Pair = [english: string, oshikwanyama: string];

export type Block =
  /** A paragraph of English. */
  | { type: 'text'; text: string }
  /** A small heading inside a part. */
  | { type: 'heading'; text: string }
  /** Paragraphs of Oshikwanyama (a reading, a recipe, a letter). */
  | { type: 'reading'; title?: string; paragraphs: string[] }
  /** A conversation. Lines are [speaker, words]. */
  | { type: 'dialogue'; title?: string; lines: [string, string][] }
  /** A word list, English first. Quizzed unless quiz is false. */
  | { type: 'words'; title?: string; rows: Pair[]; quiz?: false; notes?: string[] }
  /**
   * Worked examples shown as "English → Oshikwanyama", the other way round, or Oshikwanyama on
   * both sides (how a form is built).
   */
  | { type: 'examples'; rows: [string, string][]; from?: 'oshikwanyama' | 'both' }
  /**
   * A grammar table. Rows whose first cell repeats the row above are joined (as with
   * + and − rows for each person). With drill, the quiz asks for cells: the first
   * `labels` columns name the row.
   */
  | { type: 'table'; title?: string; head: string[]; rows: string[][]; notes?: string[]; drill?: { labels: number } }
  /** A bulleted list. */
  | { type: 'list'; items: string[] }
  /** A Quick Tip box. */
  | { type: 'tip'; title: string; blocks: Block[] }
  /** A Cultural Information box. */
  | { type: 'culture'; items: string[] }
  /** "Omukwanyama ta ti": a proverb, what it says, and what it means. */
  | { type: 'proverb'; oshikwanyama: string; english: string; meaning: string }
  /** One of the book's exercises, to try on your own or with a speaker (not checked). */
  | { type: 'practice'; title: string; instruction: string; example?: string; items?: string[]; dialogue?: [string, string][] }
  /** A song or poem: verses of lines. */
  | { type: 'song'; title: string; note?: string; verses: string[][] };

export interface Part {
  /** Used in addresses: #/chapter/3/verbs. */
  slug: string;
  title: string;
  /** Grammar Corners are listed on the Grammar page too. */
  grammar?: boolean;
  blocks: Block[];
}

export interface Chapter {
  /** "1" to "12" for chapters, "a" to "c" for the appendices. */
  id: string;
  /** The book's title for it, in Oshikwanyama. */
  title: string;
  /** What it's about, in English. */
  english: string;
  /** The page it starts on in the book. */
  page: number;
  parts: Part[];
  /** Hand-written quiz questions, asked alongside the ones made from the word lists. */
  questions?: Question[];
}
