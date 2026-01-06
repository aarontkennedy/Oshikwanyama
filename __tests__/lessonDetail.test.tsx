import { render } from "@testing-library/react-native";
import React from "react";

jest.mock("expo-router", () => {
  const LinkComp = ({ children }: any) => <>{children}</>;
  // add Trigger subcomponent used in this project
  (LinkComp as any).Trigger = ({ children }: any) => <>{children}</>;

  return {
    useLocalSearchParams: jest.fn(() => ({ id: "1" })),
    Link: LinkComp,
  };
});

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
          prompt: "Q1",
          options: ["A"],
          correct: "A",
          explanation: "",
        },
        { type: "fill-blank", prompt: "Q2", answer: "X", hint: "" },
      ],
    },
  ],
  { virtual: true }
);

import LessonDetail from "@/app/oshikwanyama/lessons/[id]";

describe("LessonDetail", () => {
  it("renders lesson and shows Start Quiz link", () => {
    const { getByText } = render(<LessonDetail />);

    expect(getByText("Test Lesson")).toBeTruthy();
    expect(getByText("Start Quiz")).toBeTruthy();
  });
});
