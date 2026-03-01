import { OrderingQuestion } from "@/components/OrderingQuestion";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

describe("OrderingQuestion", () => {
  const mockItems = ["First", "Second", "Third"];
  const mockOrderedItems = [
    { id: "1", text: "First" },
    { id: "2", text: "Second" },
    { id: "3", text: "Third" },
  ];
  const mockOnReorder = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all ordered items", () => {
    render(
      <OrderingQuestion
        items={mockItems}
        orderedItems={mockOrderedItems}
        onReorder={mockOnReorder}
      />,
    );

    expect(screen.getByText("First")).toBeTruthy();
    expect(screen.getByText("Second")).toBeTruthy();
    expect(screen.getByText("Third")).toBeTruthy();
  });

  it("displays instruction text", () => {
    render(
      <OrderingQuestion
        items={mockItems}
        orderedItems={mockOrderedItems}
        onReorder={mockOnReorder}
      />,
    );

    expect(screen.getByText("Drag items to order them")).toBeTruthy();
  });

  it("displays correct item numbers", () => {
    const { getByText } = render(
      <OrderingQuestion
        items={mockItems}
        orderedItems={mockOrderedItems}
        onReorder={mockOnReorder}
      />,
    );

    expect(getByText("1.")).toBeTruthy();
    expect(getByText("2.")).toBeTruthy();
    expect(getByText("3.")).toBeTruthy();
  });

  it("shows up arrow for items that are not first", () => {
    render(
      <OrderingQuestion
        items={mockItems}
        orderedItems={mockOrderedItems}
        onReorder={mockOnReorder}
      />,
    );

    // First item should not have move-up button
    expect(screen.queryByTestId("move-up-0")).toBeNull();
    // Second and third items should have move-up buttons
    expect(screen.getByTestId("move-up-1")).toBeTruthy();
    expect(screen.getByTestId("move-up-2")).toBeTruthy();
  });

  it("shows down arrow for items that are not last", () => {
    render(
      <OrderingQuestion
        items={mockItems}
        orderedItems={mockOrderedItems}
        onReorder={mockOnReorder}
      />,
    );

    // Last item should not have move-down button
    expect(screen.queryByTestId("move-down-2")).toBeNull();
    // First and second items should have move-down buttons
    expect(screen.getByTestId("move-down-0")).toBeTruthy();
    expect(screen.getByTestId("move-down-1")).toBeTruthy();
  });

  it("calls onReorder when moving an item up", () => {
    render(
      <OrderingQuestion
        items={mockItems}
        orderedItems={mockOrderedItems}
        onReorder={mockOnReorder}
      />,
    );

    const moveUpButton = screen.getByTestId("move-up-1");
    fireEvent.press(moveUpButton);

    expect(mockOnReorder).toHaveBeenCalledTimes(1);
    const reorderedItems = mockOnReorder.mock.calls[0][0];
    expect(reorderedItems[0].id).toBe("2"); // Second item moved to first
    expect(reorderedItems[1].id).toBe("1"); // First item moved to second
    expect(reorderedItems[2].id).toBe("3"); // Third item stays in place
  });

  it("calls onReorder when moving an item down", () => {
    render(
      <OrderingQuestion
        items={mockItems}
        orderedItems={mockOrderedItems}
        onReorder={mockOnReorder}
      />,
    );

    const moveDownButton = screen.getByTestId("move-down-0");
    fireEvent.press(moveDownButton);

    expect(mockOnReorder).toHaveBeenCalledTimes(1);
    const reorderedItems = mockOnReorder.mock.calls[0][0];
    expect(reorderedItems[0].id).toBe("2"); // Second item moved to first
    expect(reorderedItems[1].id).toBe("1"); // First item moved to second
    expect(reorderedItems[2].id).toBe("3"); // Third item stays in place
  });

  it("handles moving items multiple times", () => {
    const { rerender } = render(
      <OrderingQuestion
        items={mockItems}
        orderedItems={mockOrderedItems}
        onReorder={mockOnReorder}
      />,
    );

    // Move second item up
    fireEvent.press(screen.getByTestId("move-up-1"));

    // Get the new ordered items from the mock
    const firstReorder = mockOnReorder.mock.calls[0][0];
    jest.clearAllMocks();

    // Rerender with the new order
    rerender(
      <OrderingQuestion
        items={mockItems}
        orderedItems={firstReorder}
        onReorder={mockOnReorder}
      />,
    );

    // Move the now-first item down
    fireEvent.press(screen.getByTestId("move-down-0"));

    expect(mockOnReorder).toHaveBeenCalledTimes(1);
  });

  it("renders with single item", () => {
    const singleItem = [{ id: "1", text: "Only" }];

    render(
      <OrderingQuestion
        items={["Only"]}
        orderedItems={singleItem}
        onReorder={mockOnReorder}
      />,
    );

    expect(screen.getByText("Only")).toBeTruthy();
    // Should not show move buttons for single item
    expect(screen.queryByTestId("move-up-0")).toBeNull();
    expect(screen.queryByTestId("move-down-0")).toBeNull();
  });

  it("renders with empty items array", () => {
    const { queryByText } = render(
      <OrderingQuestion
        items={[]}
        orderedItems={[]}
        onReorder={mockOnReorder}
      />,
    );

    expect(queryByText(/First|Second|Third/)).toBeNull();
  });
});
