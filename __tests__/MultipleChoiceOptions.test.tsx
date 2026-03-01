import { MultipleChoiceOptions } from "@/components/MultipleChoiceOptions";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

describe("MultipleChoiceOptions", () => {
  const mockOptions = ["Option A", "Option B", "Option C"];
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all options", () => {
    render(
      <MultipleChoiceOptions
        options={mockOptions}
        selected={null}
        onSelect={mockOnSelect}
      />,
    );

    mockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeTruthy();
    });
  });

  it("calls onSelect when an option is pressed", () => {
    render(
      <MultipleChoiceOptions
        options={mockOptions}
        selected={null}
        onSelect={mockOnSelect}
      />,
    );

    const optionButton = screen.getByTestId("option-Option A");
    fireEvent.press(optionButton);

    expect(mockOnSelect).toHaveBeenCalledWith("Option A");
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it("highlights the selected option", () => {
    const { getByTestId } = render(
      <MultipleChoiceOptions
        options={mockOptions}
        selected="Option B"
        onSelect={mockOnSelect}
      />,
    );

    const selectedButton = getByTestId("option-Option B");
    const notSelectedButton = getByTestId("option-Option A");

    // Check that selected option has the selected style applied
    const selectedStyles = selectedButton.props.style;
    expect(selectedStyles).toContainEqual({ backgroundColor: "#e6f4f9" });

    // Check that non-selected option doesn't have the selected style
    const notSelectedStyles = notSelectedButton.props.style;
    expect(notSelectedStyles).not.toContainEqual({
      backgroundColor: "#e6f4f9",
    });
  });

  it("handles multiple selections sequentially", () => {
    render(
      <MultipleChoiceOptions
        options={mockOptions}
        selected={null}
        onSelect={mockOnSelect}
      />,
    );

    fireEvent.press(screen.getByTestId("option-Option A"));
    fireEvent.press(screen.getByTestId("option-Option C"));

    expect(mockOnSelect).toHaveBeenCalledTimes(2);
    expect(mockOnSelect).toHaveBeenNthCalledWith(1, "Option A");
    expect(mockOnSelect).toHaveBeenNthCalledWith(2, "Option C");
  });

  it("renders with empty options array", () => {
    const { queryByText } = render(
      <MultipleChoiceOptions
        options={[]}
        selected={null}
        onSelect={mockOnSelect}
      />,
    );

    expect(queryByText(/Option/)).toBeNull();
  });
});
