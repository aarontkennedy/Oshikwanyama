import { FillBlankQuestion } from "@/components/FillBlankQuestion";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

describe("FillBlankQuestion", () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the text input", () => {
    render(<FillBlankQuestion value="" onChangeText={mockOnChangeText} />);

    expect(screen.getByTestId("fill-blank-input")).toBeTruthy();
  });

  it("displays the correct placeholder text", () => {
    const { getByPlaceholderText } = render(
      <FillBlankQuestion value="" onChangeText={mockOnChangeText} />,
    );

    expect(getByPlaceholderText("Type your answer")).toBeTruthy();
  });

  it("displays a custom placeholder when provided", () => {
    const { getByPlaceholderText } = render(
      <FillBlankQuestion
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter your answer here"
      />,
    );

    expect(getByPlaceholderText("Enter your answer here")).toBeTruthy();
  });

  it("displays the current value", () => {
    const { getByDisplayValue } = render(
      <FillBlankQuestion value="test answer" onChangeText={mockOnChangeText} />,
    );

    expect(getByDisplayValue("test answer")).toBeTruthy();
  });

  it("calls onChangeText when text is entered", () => {
    render(<FillBlankQuestion value="" onChangeText={mockOnChangeText} />);

    const input = screen.getByTestId("fill-blank-input");
    fireEvent.changeText(input, "my answer");

    expect(mockOnChangeText).toHaveBeenCalledWith("my answer");
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
  });

  it("calls onChangeText with each character typed", () => {
    render(<FillBlankQuestion value="" onChangeText={mockOnChangeText} />);

    const input = screen.getByTestId("fill-blank-input");
    fireEvent.changeText(input, "hello");

    expect(mockOnChangeText).toHaveBeenCalledWith("hello");
  });

  it("handles empty string input", () => {
    render(
      <FillBlankQuestion value="some text" onChangeText={mockOnChangeText} />,
    );

    const input = screen.getByTestId("fill-blank-input");
    fireEvent.changeText(input, "");

    expect(mockOnChangeText).toHaveBeenCalledWith("");
  });

  it("handles special characters", () => {
    render(<FillBlankQuestion value="" onChangeText={mockOnChangeText} />);

    const input = screen.getByTestId("fill-blank-input");
    fireEvent.changeText(input, "café—résumé");

    expect(mockOnChangeText).toHaveBeenCalledWith("café—résumé");
  });

  it("updates when value prop changes", () => {
    const { rerender, getByDisplayValue } = render(
      <FillBlankQuestion value="initial" onChangeText={mockOnChangeText} />,
    );

    expect(getByDisplayValue("initial")).toBeTruthy();

    rerender(
      <FillBlankQuestion value="updated" onChangeText={mockOnChangeText} />,
    );

    expect(getByDisplayValue("updated")).toBeTruthy();
  });
});
