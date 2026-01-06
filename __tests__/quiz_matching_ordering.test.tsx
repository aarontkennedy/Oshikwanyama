import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

import QuizScreen from "@/app/oshikwanyama/quiz/[id]";
import { GameContext } from "@/GameContext";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({ id: "1" })),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  Link: ({ children }: any) => children,
}));

jest.mock(
  "@/data/oshikwanyama/lessons.json",
  () => [
    {
      id: 1,
      title: "Matching & Ordering",
      description: "Test matching and ordering",
      questions: [
        {
          type: "matching",
          prompt: "Match the words",
          pairs: [
            { word: "one", meaning: "uno" },
            { word: "two", meaning: "dos" },
          ],
        },
        {
          type: "ordering",
          prompt: "Order the items",
          items: ["a", "b", "c"],
        },
      ],
    },
  ],
  { virtual: true }
);

describe("Quiz (matching & ordering)", () => {
  it("grades matching then ordering correctly and finishes", async () => {
    const setScore = jest.fn();
    const setCompletedLessons = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <GameContext.Provider
        value={{
          score: 0,
          setScore,
          streak: 0,
          setStreak: () => {},
          completedLessons: [],
          setCompletedLessons,
        }}
      >
        <QuizScreen />
      </GameContext.Provider>
    );

    // Matching question
    const m1 = getByPlaceholderText("Match meaning for one");
    const m2 = getByPlaceholderText("Match meaning for two");
    fireEvent.changeText(m1, "uno");
    fireEvent.changeText(m2, "dos");

    fireEvent.press(getByText("Submit"));
    await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
    fireEvent.press(getByText("Next"));

    // Ordering question
    const orderInput = getByPlaceholderText(
      "Enter ordered items, comma separated"
    );
    fireEvent.changeText(orderInput, "a,b,c");
    fireEvent.press(getByText("Submit"));
    await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
    fireEvent.press(getByText("Next"));

    await waitFor(() => expect(getByText("Quiz Finished")).toBeTruthy());

    expect(setScore).toHaveBeenCalled();
    expect(setCompletedLessons).toHaveBeenCalled();
  });
});
