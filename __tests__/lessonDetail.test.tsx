import { render } from "@testing-library/react-native";
import React from "react";

import LessonDetail from "@/app/oshikwanyama/lessons/[id]";

jest.mock("expo-router", () => {
  const LinkComp = ({ children }: any) => <>{children}</>;
  (LinkComp as any).Trigger = ({ children }: any) => <>{children}</>;

  return {
    useLocalSearchParams: jest.fn(() => ({ id: "1" })),
    useRouter: jest.fn(() => ({ push: jest.fn() })),
    Link: LinkComp,
  };
});

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({
    setOptions: jest.fn(),
  })),
}));

jest.mock(
  "@/data/oshikwanyama/lessons.json",
  () => [
    {
      id: 1,
      title: { Oshikwanyama: "Test Lesson", English: "Test Lesson" },
      description: "A test lesson",
      vocab: [],
      dialogs: [],
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
  { virtual: true },
);

describe("LessonDetail", () => {
  it("renders lesson and shows Start Quiz link", () => {
    const { getByText } = render(<LessonDetail />);

    expect(getByText("Test Lesson")).toBeTruthy();
    expect(getByText("Start Quiz")).toBeTruthy();
  });
});
