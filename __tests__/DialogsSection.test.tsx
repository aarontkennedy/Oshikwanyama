import { DialogsSection } from "@/components/DialogsSection";
import type { ExampleDialog } from "@/types/oshikwanyama";
import { render } from "@testing-library/react-native";

describe("DialogsSection", () => {
  it("renders dialog with title and conversation", () => {
    const items: (ExampleDialog & { index: number })[] = [
      {
        index: 0,
        title: "Basic Greeting",
        conversation: [
          { speaker: "Person A", text: "Wa uhala po?" },
          { speaker: "Person B", text: "Onawa, tangi" },
        ],
      },
    ];
    const { getByText } = render(<DialogsSection items={items} />);

    expect(getByText("1. Basic Greeting")).toBeTruthy();
    expect(getByText("Person A: Wa uhala po?")).toBeTruthy();
    expect(getByText("Person B: Onawa, tangi")).toBeTruthy();
  });

  it("renders multiple dialogs with correct numbering", () => {
    const items: (ExampleDialog & { index: number })[] = [
      {
        index: 0,
        title: "First Dialog",
        conversation: [{ speaker: "Speaker 1", text: "Hello" }],
      },
      {
        index: 1,
        title: "Second Dialog",
        conversation: [{ speaker: "Speaker 2", text: "Hi there" }],
      },
    ];
    const { getByText } = render(<DialogsSection items={items} />);

    expect(getByText("1. First Dialog")).toBeTruthy();
    expect(getByText("2. Second Dialog")).toBeTruthy();
    expect(getByText("Speaker 1: Hello")).toBeTruthy();
    expect(getByText("Speaker 2: Hi there")).toBeTruthy();
  });

  it("renders dialog with multiple conversation lines", () => {
    const items: (ExampleDialog & { index: number })[] = [
      {
        index: 0,
        title: "Multi-line Conversation",
        conversation: [
          { speaker: "A", text: "Line 1" },
          { speaker: "B", text: "Line 2" },
          { speaker: "A", text: "Line 3" },
        ],
      },
    ];
    const { getByText } = render(<DialogsSection items={items} />);

    expect(getByText("1. Multi-line Conversation")).toBeTruthy();
    expect(getByText("A: Line 1")).toBeTruthy();
    expect(getByText("B: Line 2")).toBeTruthy();
    expect(getByText("A: Line 3")).toBeTruthy();
  });

  it("renders empty list when no items provided", () => {
    const items: (ExampleDialog & { index: number })[] = [];
    const { root } = render(<DialogsSection items={items} />);

    // Should render without error
    expect(root).toBeTruthy();
  });
});
