import { render } from "@testing-library/react-native";
import React from "react";
import { ConjugationTableSection } from "../components/ConjugationTableSection";
import { ConjugationWithPositiveNegativeTable } from "../types/oshikwanyama";

describe("ConjugationTableSection", () => {
  const mockTable: ConjugationWithPositiveNegativeTable = {
    title: "Test Conjugation",
    rows: [
      {
        label: "I",
        past: "I went",
        pastNegative: "I did not go",
        present: "I go",
        presentNegative: "I do not go",
        future: "I will go",
        futureNegative: "I will not go",
      },
      {
        label: "You",
        past: "You went",
        pastNegative: "You did not go",
        present: "You go",
        presentNegative: "You do not go",
        future: "You will go",
        futureNegative: "You will not go",
      },
    ],
  };

  it("renders the table headers", () => {
    const { getByText } = render(<ConjugationTableSection table={mockTable} />);

    expect(getByText("Person")).toBeTruthy();
    expect(getByText("Past")).toBeTruthy();
    expect(getByText("Present")).toBeTruthy();
    expect(getByText("Future")).toBeTruthy();
  });

  it("renders the table title", () => {
    const { getByText } = render(<ConjugationTableSection table={mockTable} />);

    expect(getByText("Test Conjugation")).toBeTruthy();
  });
});
