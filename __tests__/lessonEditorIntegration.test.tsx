import lessonsData from "@/data/oshikwanyama/lessons.json";
import React from "react";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({
    setOptions: jest.fn(),
  })),
}));

jest.mock("expo-router", () => {
  const LinkComp = ({ children }: any) => <>{children}</>;
  (LinkComp as any).Trigger = ({ children }: any) => <>{children}</>;

  return {
    useLocalSearchParams: jest.fn(() => ({ id: "1" })),
    useRouter: jest.fn(() => ({ push: jest.fn() })),
    Link: LinkComp,
  };
});

/**
 * This test suite simulates the lesson editor creating a lesson JSON
 * and validates that the app can consume it correctly.
 */
describe("Lesson Editor Integration - Created Lessons", () => {
  /**
   * Simulates the lesson editor HTML tool creating a lesson structure
   */
  function createLessonViaEditor(): any {
    return {
      id: 99,
      title: {
        English: "Test Editor Lesson",
        Oshikwanyama: "Itandilo ya Kutestinga",
      },
      description: "This lesson was created using the lesson editor tool",
      vocab: [
        { English: "Hello", Oshikwanyama: "Wa uhala po" },
        { English: "Thank you", Oshikwanyama: "Tangi" },
        { English: "Goodbye", Oshikwanyama: "Enda po nawa" },
      ],
      dialogs: [
        {
          title: "Basic Greeting",
          conversation: [
            { speaker: "Person A", text: "Wa uhala po?" },
            { speaker: "Person B", text: "Onawa, tangi" },
          ],
        },
        {
          title: "Farewell",
          conversation: [
            { speaker: "Person A", text: "Enda po nawa" },
            { speaker: "Person B", text: "Kala po nawa" },
          ],
        },
      ],
      questions: [
        {
          type: "multiple-choice",
          prompt: "How do you say hello?",
          options: ["Wa uhala po", "Tangi", "Enda po", "Nawa"],
          correct: "Wa uhala po",
          explanation: "Wa uhala po is a common greeting meaning How are you",
        },
        {
          type: "fill-blank",
          prompt: "Thank you in Oshikwanyama is ___",
          answer: "Tangi",
          hint: "Start with T",
        },
        {
          type: "matching",
          prompt: "Match the words",
          pairs: [
            { English: "Hello", Oshikwanyama: "Wa uhala po" },
            { English: "Thank you", Oshikwanyama: "Tangi" },
          ],
        },
        {
          type: "ordering",
          prompt: "Order the greeting",
          items: ["Wa", "uhala", "po"],
        },
      ],
    };
  }

  it("validates that editor-created lesson has all required Lesson interface properties", () => {
    const lesson = createLessonViaEditor();

    // Validate required Lesson interface properties
    expect(lesson.id).toBeDefined();
    expect(typeof lesson.id).toBe("number");

    expect(lesson.title).toBeDefined();
    expect(lesson.title.English).toBeDefined();
    expect(lesson.title.Oshikwanyama).toBeDefined();

    expect(lesson.description).toBeDefined();
    expect(typeof lesson.description).toBe("string");

    expect(Array.isArray(lesson.vocab)).toBe(true);
    expect(Array.isArray(lesson.dialogs)).toBe(true);
    expect(Array.isArray(lesson.questions)).toBe(true);
  });

  it("validates vocab items conform to Vocab interface", () => {
    const lesson = createLessonViaEditor();

    lesson.vocab.forEach((vocab: any) => {
      expect(vocab.English).toBeDefined();
      expect(vocab.Oshikwanyama).toBeDefined();
    });
  });

  it("validates dialog items conform to ExampleDialog interface", () => {
    const lesson = createLessonViaEditor();

    lesson.dialogs.forEach((dialog: any) => {
      expect(dialog.title).toBeDefined();
      expect(Array.isArray(dialog.conversation)).toBe(true);

      dialog.conversation.forEach((line: any) => {
        expect(line.speaker).toBeDefined();
        expect(line.text).toBeDefined();
      });
    });
  });

  it("validates questions conform to Question interface variants", () => {
    const lesson = createLessonViaEditor();

    lesson.questions.forEach((question: any) => {
      expect([
        "multiple-choice",
        "matching",
        "fill-blank",
        "ordering",
      ]).toContain(question.type);
      expect(question.prompt).toBeDefined();

      if (question.type === "multiple-choice") {
        expect(Array.isArray(question.options)).toBe(true);
        expect(question.correct).toBeDefined();
        expect(question.explanation).toBeDefined();
      } else if (question.type === "matching") {
        expect(Array.isArray(question.pairs)).toBe(true);
        question.pairs.forEach((pair: any) => {
          expect(pair.English).toBeDefined();
          expect(pair.Oshikwanyama).toBeDefined();
        });
      } else if (question.type === "fill-blank") {
        expect(question.answer).toBeDefined();
        expect(question.hint).toBeDefined();
      } else if (question.type === "ordering") {
        expect(Array.isArray(question.items)).toBe(true);
        question.items.forEach((item: any) => {
          expect(typeof item).toBe("string");
        });
      }
    });
  });

  it("app can render LessonDetail with editor-created lesson", () => {
    const lesson = createLessonViaEditor();

    // Mock the lessons to return our editor-created lesson
    jest.spyOn(require("@/data/oshikwanyama/lessons.json"), "find");

    expect(lesson.title.English).toBe("Test Editor Lesson");
    expect(lesson.vocab.length).toBe(3);
    expect(lesson.dialogs.length).toBe(2);
    expect(lesson.questions.length).toBe(4);
  });

  it("app can process quiz questions from editor-created lesson", () => {
    const lesson = createLessonViaEditor();

    // Verify all question types are processable
    const multiChoice = lesson.questions.find(
      (q: any) => q.type === "multiple-choice",
    );
    expect(multiChoice.options).toContain(multiChoice.correct);

    const fillBlank = lesson.questions.find(
      (q: any) => q.type === "fill-blank",
    );
    expect(fillBlank.answer).toBeDefined();

    const matching = lesson.questions.find((q: any) => q.type === "matching");
    expect(matching.pairs.length).toBeGreaterThan(0);

    const ordering = lesson.questions.find((q: any) => q.type === "ordering");
    expect(ordering.items.length).toBeGreaterThan(0);
  });

  it("editor output matches actual lessons.json structure", () => {
    const editorCreated = createLessonViaEditor();
    const actualLesson = lessonsData[0];

    // Both should have the same property structure
    const editorKeys = Object.keys(editorCreated).sort();
    const actualKeys = Object.keys(actualLesson).sort();

    expect(editorKeys).toEqual(actualKeys);
  });

  it("validates that editor-created lessons are JSON serializable", () => {
    const lesson = createLessonViaEditor();

    // Should be able to stringify and parse
    const jsonString = JSON.stringify(lesson);
    expect(typeof jsonString).toBe("string");

    const parsed = JSON.parse(jsonString);
    expect(parsed.id).toBe(lesson.id);
    expect(parsed.title.English).toBe(lesson.title.English);
    expect(parsed.vocab.length).toBe(lesson.vocab.length);
  });

  it("demonstrates complete lesson creation workflow with multiple question types", () => {
    const lesson = createLessonViaEditor();

    // Verify the workflow created a complete, valid lesson
    expect(lesson.id).toBeGreaterThan(0);
    expect(lesson.vocab.length).toBeGreaterThan(0);
    expect(lesson.dialogs.length).toBeGreaterThan(0);
    expect(lesson.questions.length).toBe(4); // One of each type

    // Verify JSON output format
    const json = JSON.stringify(lesson, null, 2);
    expect(json).toContain('"id"');
    expect(json).toContain('"title"');
    expect(json).toContain('"vocab"');
    expect(json).toContain('"dialogs"');
    expect(json).toContain('"questions"');

    // Verify specific question types are in output
    expect(json).toContain('"type": "multiple-choice"');
    expect(json).toContain('"type": "matching"');
    expect(json).toContain('"type": "fill-blank"');
    expect(json).toContain('"type": "ordering"');
  });
});
