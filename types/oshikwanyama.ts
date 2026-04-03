export interface Vocab {
  English: string;
  Oshikwanyama: string;
}

export interface ConjugationPostiveNegativeRow {
  label: string;
  past: string;
  pastNegative: string;
  present: string;
  presentNegative: string;
  future: string;
  futureNegative: string;
}

export interface ConjugationWithPositiveNegativeTable {
  title: string;
  rows: ConjugationPostiveNegativeRow[];
}

// export interface ConjugationRow {
//   label: string;
//   past: string;
//   present: string;
//   future: string;
// }

// export interface ConjugationTable {
//   title: string;
//   rows: ConjugationRow[];
// }

export interface Dialog {
  speaker: string;
  text: string;
}

export interface ExampleDialog {
  title: string;
  conversation: Dialog[];
}

export interface Lesson {
  id: number;
  title: Vocab;
  description: string;
  questions: Question[];
  vocab: Vocab[];
  dialogs: ExampleDialog[];
  conjugations?: null | ConjugationWithPositiveNegativeTable[];
}

export interface Question {
  type: "multiple-choice" | "matching" | "fill-blank" | "ordering";
  prompt: string;
}

export interface MultipleChoiceQuestion extends Question {
  options: string[];
  correct: string;
  explanation: string;
}

export interface MatchingQuestion extends Question {
  pairs: Vocab[];
}

export interface FillInTheBlankQuestion extends Question {
  answer: string;
  hint: string;
}

export interface OrderingQuestion extends Question {
  items: string[];
}

export interface Proverb extends Vocab {
  explanation: string;
}
