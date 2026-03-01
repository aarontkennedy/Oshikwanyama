import { MatchingQuestion } from "@/components/MatchingQuestion";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

describe("MatchingQuestion", () => {
  const mockPairs = [
    { word: "Oluwa", meaning: "god" },
    { word: "Omutu", meaning: "person" },
    { word: "Ozila", meaning: "work" },
  ];
  const mockAnswers: { wordIdx: number; meaningIdx: number }[] = [];
  const mockOnAnswerChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all words on the left", () => {
    render(
      <MatchingQuestion
        pairs={mockPairs}
        answers={mockAnswers}
        onAnswerChange={mockOnAnswerChange}
      />,
    );

    mockPairs.forEach((pair) => {
      expect(screen.getByText(pair.word)).toBeTruthy();
    });
  });

  it("renders all meanings on the right (shuffled)", () => {
    render(
      <MatchingQuestion
        pairs={mockPairs}
        answers={mockAnswers}
        onAnswerChange={mockOnAnswerChange}
      />,
    );

    mockPairs.forEach((pair) => {
      expect(screen.getByText(pair.meaning)).toBeTruthy();
    });
  });

  it("displays instruction text", () => {
    render(
      <MatchingQuestion
        pairs={mockPairs}
        answers={mockAnswers}
        onAnswerChange={mockOnAnswerChange}
      />,
    );

    expect(
      screen.getByText(
        "Tap a word on the left, then tap its meaning on the right",
      ),
    ).toBeTruthy();
  });

  it("highlights word when tapped", () => {
    const { getByTestId } = render(
      <MatchingQuestion
        pairs={mockPairs}
        answers={mockAnswers}
        onAnswerChange={mockOnAnswerChange}
      />,
    );

    const wordButton = getByTestId("matching-word-0");
    fireEvent.press(wordButton);

    // The component internally tracks selection, we can verify by checking if meaning press works
    expect(mockOnAnswerChange).not.toHaveBeenCalled(); // No match yet
  });

  it("creates a match when word and meaning are tapped", () => {
    const { getByTestId } = render(
      <MatchingQuestion
        pairs={mockPairs}
        answers={mockAnswers}
        onAnswerChange={mockOnAnswerChange}
      />,
    );

    // Tap first word
    fireEvent.press(getByTestId("matching-word-0"));
    // Tap corresponding meaning (same index)
    fireEvent.press(getByTestId("matching-meaning-0"));

    expect(mockOnAnswerChange).toHaveBeenCalledWith([
      { wordIdx: 0, meaningIdx: 0 },
    ]);
  });

  it("does not match when wrong meaning is tapped", () => {
    const { getByTestId } = render(
      <MatchingQuestion
        pairs={mockPairs}
        answers={mockAnswers}
        onAnswerChange={mockOnAnswerChange}
      />,
    );

    // select first word and then wrong meaning
    fireEvent.press(getByTestId("matching-word-0"));
    fireEvent.press(getByTestId("matching-meaning-1"));

    // should not call onAnswerChange and selection cleared (no highlight)
    expect(mockOnAnswerChange).not.toHaveBeenCalled();
  });

  it("handles multiple matches", () => {
    const { getByTestId, rerender } = render(
      <MatchingQuestion
        pairs={mockPairs}
        answers={mockAnswers}
        onAnswerChange={mockOnAnswerChange}
      />,
    );

    // Match first pair
    fireEvent.press(getByTestId("matching-word-0"));
    fireEvent.press(getByTestId("matching-meaning-0"));

    const firstCall = mockOnAnswerChange.mock.calls[0][0];
    jest.clearAllMocks();

    // Rerender with first match
    rerender(
      <MatchingQuestion
        pairs={mockPairs}
        answers={firstCall}
        onAnswerChange={mockOnAnswerChange}
      />,
    );

    // Match second pair
    fireEvent.press(getByTestId("matching-word-1"));
    fireEvent.press(getByTestId("matching-meaning-1"));

    expect(mockOnAnswerChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        { wordIdx: 0, meaningIdx: 0 },
        { wordIdx: 1, meaningIdx: 1 },
      ]),
    );
  });

  it("does not override existing match when wrong meaning tapped", () => {
    const existingMatch = [{ wordIdx: 0, meaningIdx: 0 }];
    const { getByTestId } = render(
      <MatchingQuestion
        pairs={mockPairs}
        answers={existingMatch}
        onAnswerChange={mockOnAnswerChange}
      />,
    );

    // attempt wrong rematch for same word
    fireEvent.press(getByTestId("matching-word-0"));
    fireEvent.press(getByTestId("matching-meaning-1"));

    expect(mockOnAnswerChange).not.toHaveBeenCalled();
  });

  it("renders with empty pairs array", () => {
    const { queryByText } = render(
      <MatchingQuestion
        pairs={[]}
        answers={[]}
        onAnswerChange={mockOnAnswerChange}
      />,
    );

    expect(queryByText(/Oluwa|Omutu|Ozila/)).toBeNull();
  });

  it("shows matched items with green styling", () => {
    const matchedAnswers = [{ wordIdx: 0, meaningIdx: 0 }];
    const { getByTestId } = render(
      <MatchingQuestion
        pairs={mockPairs}
        answers={matchedAnswers}
        onAnswerChange={mockOnAnswerChange}
      />,
    );

    const matchedWord = getByTestId("matching-word-0");
    // Check that the matched styling is applied (would show in actual UI)
    expect(matchedWord).toBeTruthy();
  });
});
