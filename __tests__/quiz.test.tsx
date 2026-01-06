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
  { virtual: true }
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
      </GameContext.Provider>
    );

    // should show first question and options
    expect(getByText("How do you say 'Hello' in Oshikwanyama?")).toBeTruthy();
    const option = getByText("Wa uhala po");
    fireEvent.press(option);

    const submit = getByText("Submit");
    fireEvent.press(submit);

    await waitFor(() => expect(getByText("Correct!")).toBeTruthy());

    const next = getByText("Next");
    fireEvent.press(next);

    // Now fill-blank question should appear
    expect(getByText(/My brother is called Petrus/)).toBeTruthy();

    const answerInput = getByPlaceholderText("Type your answer");
    fireEvent.changeText(answerInput, "Omumwameme");
    fireEvent.press(getByText("Submit"));

    await waitFor(() => expect(getByText("Correct!")).toBeTruthy());

    fireEvent.press(getByText("Next"));
  });

  it("handles finish and calls context setters", async () => {
    const setScore = jest.fn();
    const setCompletedLessons = jest.fn();

    const { getByText, getByPlaceholderText } = render(
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

    // Answer first question correctly
    fireEvent.press(getByText("Wa uhala po"));
    fireEvent.press(getByText("Submit"));
    await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
    fireEvent.press(getByText("Next"));

    // Fill blank (answer correctly)
    const input = getByPlaceholderText("Type your answer");
    fireEvent.changeText(input, "Omumwameme");
    fireEvent.press(getByText("Submit"));
    await waitFor(() => expect(getByText("Correct!")).toBeTruthy());

    fireEvent.press(getByText("Next"));

    await waitFor(() => expect(getByText("Quiz Finished")).toBeTruthy());

    // context updates should have been called
    expect(setScore).toHaveBeenCalled();
    expect(setCompletedLessons).toHaveBeenCalled();
  });
  it("handles finish and calls context setters", async () => {
    const setScore = jest.fn();
    const setCompletedLessons = jest.fn();

    const { getByText } = render(
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

    // Answer first question correctly
    fireEvent.press(getByText("Wa uhala po"));
    fireEvent.press(getByText("Submit"));
    await waitFor(() => expect(getByText("Correct!")).toBeTruthy());
    fireEvent.press(getByText("Next"));

    // Fill blank
    const textInput = getByText("Submit");
    // We can't access TextInput easily without testID; rely on flow: submitting without input is incorrect
    fireEvent.press(getByText("Submit"));
    await waitFor(() => expect(getByText(/Incorrect/)).toBeTruthy());

    // Now finish by pressing Next (should finish)
    fireEvent.press(getByText("Next"));

    await waitFor(() => expect(getByText("Quiz Finished")).toBeTruthy());

    // context updates should have been called
    expect(setScore).toHaveBeenCalled();
    expect(setCompletedLessons).toHaveBeenCalled();
  });
});
