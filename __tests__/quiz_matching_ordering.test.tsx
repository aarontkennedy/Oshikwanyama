import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

import QuizScreen from "@/app/oshikwanyama/quiz/[id]";
import { GameContext } from "@/GameContext";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({ id: "1" })),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useNavigation: jest.fn(() => ({ setOptions: jest.fn() })),
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
  { virtual: true },
);

describe("Quiz (matching & ordering)", () => {
  it("grades matching then ordering correctly and finishes", async () => {
    const setScore = jest.fn();
    const setCompletedLessons = jest.fn();

    const { getByPlaceholderText, getByText, getByTestId, queryByTestId } =
      render(
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
        </GameContext.Provider>,
      );

    // Depending on shuffle, either matching or ordering may appear first
    if (queryByTestId("matching-word-0")) {
      // matching first
      fireEvent.press(getByTestId("matching-word-0")); // Select "one"
      fireEvent.press(getByTestId("matching-meaning-0")); // Match to "uno"
      fireEvent.press(getByTestId("matching-word-1")); // Select "two"
      fireEvent.press(getByTestId("matching-meaning-1")); // Match to "dos"

      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
      fireEvent.press(getByText("Next"));

      // now ordering
      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
      fireEvent.press(getByText("Next"));
    } else {
      // ordering first
      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
      fireEvent.press(getByText("Next"));

      // then matching
      fireEvent.press(getByTestId("matching-word-0"));
      fireEvent.press(getByTestId("matching-meaning-0"));
      fireEvent.press(getByTestId("matching-word-1"));
      fireEvent.press(getByTestId("matching-meaning-1"));

      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
      fireEvent.press(getByText("Next"));
    }

    await waitFor(() => expect(getByText("Quiz Finished")).toBeTruthy());

    expect(setScore).toHaveBeenCalled();
    expect(setCompletedLessons).toHaveBeenCalled();
  });
});
