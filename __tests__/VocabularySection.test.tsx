import { VocabularySection } from "@/components/VocabularySection";
import type { Vocab } from "@/types/oshikwanyama";
import { render } from "@testing-library/react-native";

describe("VocabularySection", () => {
  it("renders the header with correct column names", () => {
    const items: Vocab[] = [];
    const { getByText } = render(<VocabularySection items={items} />);

    expect(getByText("Oshikwanyama")).toBeTruthy();
    expect(getByText("English")).toBeTruthy();
  });

  it("renders vocabulary items", () => {
    const items: Vocab[] = [
      { English: "Hello", Oshikwanyama: "Wa uhala po" },
      { English: "Thank you", Oshikwanyama: "Tangi" },
    ];
    const { getByText } = render(<VocabularySection items={items} />);

    expect(getByText("Wa uhala po")).toBeTruthy();
    expect(getByText("Hello")).toBeTruthy();
    expect(getByText("Tangi")).toBeTruthy();
    expect(getByText("Thank you")).toBeTruthy();
  });

  it("renders empty list when no items provided", () => {
    const items: Vocab[] = [];
    const { getByText } = render(<VocabularySection items={items} />);

    // Should still render header
    expect(getByText("Oshikwanyama")).toBeTruthy();
    expect(getByText("English")).toBeTruthy();
  });

  it("renders multiple vocabulary items correctly", () => {
    const items: Vocab[] = [
      { English: "Good morning", Oshikwanyama: "Wa handa" },
      { English: "Good evening", Oshikwanyama: "Wa handa sokuati" },
      { English: "How are you?", Oshikwanyama: "Onjiva?" },
    ];
    const { getByText } = render(<VocabularySection items={items} />);

    expect(getByText("Wa handa")).toBeTruthy();
    expect(getByText("Good morning")).toBeTruthy();
    expect(getByText("Wa handa sokuati")).toBeTruthy();
    expect(getByText("Good evening")).toBeTruthy();
    expect(getByText("Onjiva?")).toBeTruthy();
    expect(getByText("How are you?")).toBeTruthy();
  });
});
