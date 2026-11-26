// The kinds of quiz question. Most are made from the book's word lists and tables (quiz.ts);
// some are hand-written (src/book/questions.json).

export interface Vocab {
  English: string;
  Oshikwanyama: string;
}

interface Asked {
  prompt: string;
  /** What to do, when it isn't the usual for the kind of question. */
  instruction?: string;
  /** Set when the prompt is in Oshikwanyama. */
  promptLang?: 'kj';
}

export interface MultipleChoice extends Asked {
  type: 'multiple-choice';
  options: string[];
  correct: string;
  /** Shown after answering, when there is one. */
  explanation: string;
  /** Set when the options are in Oshikwanyama. */
  optionsLang?: 'kj';
}

export interface Matching extends Asked {
  type: 'matching';
  pairs: Vocab[];
}

export interface FillBlank extends Asked {
  type: 'fill-blank';
  answer: string;
  /** Other answers that count as right, such as "Ee" for "Ehee / Ee / Heeno". */
  accept?: string[];
  /** Shown under the prompt, when there is one. */
  hint: string;
}

export interface Ordering extends Asked {
  type: 'ordering';
  /** In the right order; the quiz mixes them up. */
  items: string[];
}

export type Question = MultipleChoice | Matching | FillBlank | Ordering;
