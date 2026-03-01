import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

import QuizScreen from "@/app/oshikwanyama/quiz/[id]";
import { GameContext } from "@/GameContext";

// mock expo-router hooks
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({ id: "1" })),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  Link: ({ children }: any) => children,
}));

// Provide a small lessons fixture
jest.mock(
  "@/data/oshikwanyama/lessons.json",
  () => [
    {
      id: 1,
      title: "Test Lesson",
      description: "A test lesson",
      questions: [
        {
          type: "multiple-choice",
          prompt: "How do you say 'Hello' in Oshikwanyama?",
          options: ["Wa uhala po", "Other"],
          correct: "Wa uhala po",
          explanation: "'Wa uhala po' is a common greeting",
        },
        {
          type: "fill-blank",
          prompt: "My brother is called Petrus: __________ wange oitwa Petrus",
          answer: "Omumwameme",
          hint: "Brother = Omumwameme",
        },
      ],
    },
  ],
  { virtual: true },
);

describe("QuizScreen", () => {
  it("renders multiple-choice question, accepts correct answer and shows correct message", async () => {
    const setScore = jest.fn();
    const setCompletedLessons = jest.fn();

    const { getByText, queryByText, getByPlaceholderText } = render(
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

    // order may be randomized – check which question appears first
    if (queryByText("Wa uhala po")) {
      // multiple-choice is first
      expect(getByText("How do you say 'Hello' in Oshikwanyama?")).toBeTruthy();
      fireEvent.press(getByText("Wa uhala po"));
      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
      fireEvent.press(getByText("Next"));

      // now should be fill-blank
      expect(getByText(/My brother is called Petrus/)).toBeTruthy();
      const answerInput = getByPlaceholderText("Type your answer");
      fireEvent.changeText(answerInput, "Omumwameme");
      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
      fireEvent.press(getByText("Next"));
    } else {
      // fill-blank appears first
      expect(getByText(/My brother is called Petrus/)).toBeTruthy();
      const answerInput = getByPlaceholderText("Type your answer");
      fireEvent.changeText(answerInput, "Omumwameme");
      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
      fireEvent.press(getByText("Next"));

      // then multiple-choice
      expect(getByText("How do you say 'Hello' in Oshikwanyama?")).toBeTruthy();
      fireEvent.press(getByText("Wa uhala po"));
      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
      fireEvent.press(getByText("Next"));
    }
  });

  it("handles finish and calls context setters", async () => {
    const setScore = jest.fn();
    const setCompletedLessons = jest.fn();

    const { getByText, queryByText, getByPlaceholderText } = render(
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

    // answer both questions correctly regardless of order
    for (let i = 0; i < 2; i++) {
      if (queryByText("Wa uhala po")) {
        fireEvent.press(getByText("Wa uhala po"));
      } else {
        fireEvent.changeText(
          getByPlaceholderText("Type your answer"),
          "Omumwameme",
        );
      }
      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
      fireEvent.press(getByText("Next"));
    }

    await waitFor(() => expect(getByText("Quiz Finished")).toBeTruthy());

    expect(setScore).toHaveBeenCalled();
    expect(setCompletedLessons).toHaveBeenCalled();
  });
  it("handles finish with mixed correct/incorrect answers regardless of order", async () => {
    const setScore = jest.fn();
    const setCompletedLessons = jest.fn();

    const { getByText, queryByText, getByPlaceholderText } = render(
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

    // perform flow: first seen question correct/simple, second seen incorrect
    if (queryByText("Wa uhala po")) {
      // multiple-choice shown first → answer it correctly
      fireEvent.press(getByText("Wa uhala po"));
      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
      fireEvent.press(getByText("Next"));

      // then fill-blank incorrectly
      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText(/Incorrect/)).toBeTruthy());
      fireEvent.press(getByText("Next"));
    } else {
      // fill-blank shown first → answer incorrectly
      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText(/Incorrect/)).toBeTruthy());
      fireEvent.press(getByText("Next"));

      // then multiple-choice correctly
      fireEvent.press(getByText("Wa uhala po"));
      fireEvent.press(getByText("Submit"));
      await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
      fireEvent.press(getByText("Next"));
    }

    await waitFor(() => expect(getByText("Quiz Finished")).toBeTruthy());
    expect(setScore).toHaveBeenCalled();
    expect(setCompletedLessons).toHaveBeenCalled();
  });
});
