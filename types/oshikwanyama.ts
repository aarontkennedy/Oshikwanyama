export interface Lesson {
  id: number;
  title: string;
  description: string;
  questions: Question[];
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

export interface MatchingPair {
  word: string;
  meaning: string;
}

export interface MatchingQuestion extends Question {
  pairs: MatchingPair[];
}

export interface FillInTheBlankQuestion extends Question {
  answer: string;
  hint: string;
}

export interface OrderingQuestion extends Question {
  items: string[];
}

export interface Proverb {
  original: string;
  translation: string;
  explanation: string;
}

export type Section = "home" | "lessons" | "lesson" | "quiz" | "proverbs";

export interface Vocab {
  English: string;
  Oshikwanyama: string;
}

export interface ExampleDialog {
  title: string;
  conversation: string[];
}
