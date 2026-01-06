import { createContext, Dispatch, SetStateAction } from "react";

// Step 1: Create a Context
interface GameContextType {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  streak: number;
  setStreak: Dispatch<SetStateAction<number>>;
  completedLessons: number[];
  setCompletedLessons: Dispatch<SetStateAction<number[]>>;
}

export const GameContext = createContext<GameContextType>({
  score: 0,
  setScore: () => {},
  streak: 0,
  setStreak: () => {},
  completedLessons: [],
  setCompletedLessons: () => {},
});
