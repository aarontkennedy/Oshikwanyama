import { FillBlankQuestion } from "@/components/FillBlankQuestion";
import { MatchingQuestion } from "@/components/MatchingQuestion";
import { MultipleChoiceOptions } from "@/components/MultipleChoiceOptions";
import { OrderingQuestion } from "@/components/OrderingQuestion";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import lessons from "@/data/oshikwanyama/lessons.json";
import { GameContext } from "@/GameContext";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

// simple Fisher–Yates shuffle for arrays
export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);
  const lesson = lessons.find((l) => l.id === id);
  const router = useRouter();
  const { setScore, completedLessons, setCompletedLessons } =
    useContext(GameContext);

  const [index, setIndex] = useState(0);
  const [localScore, setLocalScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [matchingAnswers, setMatchingAnswers] = useState<
    { wordIdx: number; meaningIdx: number }[]
  >([]);
  const [orderedItems, setOrderedItems] = useState<
    { id: string; text: string }[]
  >([]);
  const [submitted, setSubmitted] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);

  if (!lesson) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Lesson not found</ThemedText>
      </ThemedView>
    );
  }

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: lesson.title.Oshikwanyama,
    });
  }, [lesson.title.Oshikwanyama, navigation]);

  // create a shuffled copy of the questions so order is unpredictable
  const [questions] = useState(() => shuffleArray(lesson.questions));
  const question = questions[index];

  // Determine whether matching question is fully and correctly answered
  const matchingPairs: { word: string; meaning: string }[] =
    (question as any).pairs || [];
  const allMatchingCorrect =
    question.type === "matching"
      ? matchingAnswers.length === matchingPairs.length &&
        matchingAnswers.every((m) => m.meaningIdx === m.wordIdx)
      : true;

  // Initialize orderedItems for ordering questions
  React.useEffect(() => {
    if (question?.type === "ordering") {
      const items: string[] = (question as any).items || [];
      setOrderedItems(
        items.map((text, i) => ({
          id: String(i),
          text,
        })),
      );
    }
  }, [index, question]);

  const handleSubmit = () => {
    if (submitted) return;

    let correct = false;

    if (question.type === "multiple-choice") {
      correct = selected === (question as any).correct;
    } else if (question.type === "fill-blank") {
      correct =
        input.trim().toLowerCase() ===
        (question as any).answer.trim().toLowerCase();
    } else if (question.type === "matching") {
      const pairs = (question as any).pairs || [];
      // Check if all words are matched and each match is correct
      const allMatched =
        matchingAnswers.length === pairs.length &&
        matchingAnswers.every((match) => match.meaningIdx === match.wordIdx);
      correct = allMatched;
    } else if (question.type === "ordering") {
      const items: string[] = (question as any).items || [];
      const normalizedExpected = items
        .map((s) => s.trim().toLowerCase())
        .join(",");
      const normalizedGiven = orderedItems
        .map((item) => item.text.trim().toLowerCase())
        .join(",");
      correct = normalizedExpected === normalizedGiven;
    } else {
      // unknown question type
      correct = false;
    }

    if (correct) setLocalScore((s) => s + 10);
    setLastCorrect(correct);
    setSubmitted(true);
  };

  const handleNext = () => {
    const next = index + 1;
    setSubmitted(false);
    setSelected(null);
    setInput("");
    setMatchingAnswers([]);
    setOrderedItems([]);
    setLastCorrect(null);

    if (next >= questions.length) {
      // finished
      setFinished(true);
      setScore((s) => s + localScore);
      if (!completedLessons.includes(lesson.id)) {
        setCompletedLessons((c) => [...c, lesson.id]);
      }
      return;
    }

    setIndex(next);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText>
        {index + 1}/{questions.length}
      </ThemedText>

      {!finished ? (
        <ThemedView style={styles.questionContainer}>
          <ThemedText type="subtitle">{question.prompt}</ThemedText>

          {question.type === "multiple-choice" && (
            <MultipleChoiceOptions
              options={(question as any).options}
              selected={selected}
              onSelect={setSelected}
            />
          )}

          {question.type === "fill-blank" && (
            <FillBlankQuestion value={input} onChangeText={setInput} />
          )}

          {question.type === "matching" && (
            <MatchingQuestion
              pairs={(question as any).pairs || []}
              answers={matchingAnswers}
              onAnswerChange={setMatchingAnswers}
            />
          )}

          {question.type === "ordering" && (
            <OrderingQuestion
              items={(question as any).items || []}
              orderedItems={orderedItems}
              onReorder={setOrderedItems}
            />
          )}

          <ThemedView style={styles.controls}>
            {!submitted ? (
              // Disable submit for multiple-choice until an option is selected
              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  styles.button,
                  (question.type === "multiple-choice" && !selected) ||
                  (question.type === "matching" && !allMatchingCorrect) ||
                  (question.type === "fill-blank" && input.trim() === "")
                    ? styles.buttonDisabled
                    : null,
                  pressed && { opacity: 0.7 },
                ]}
                disabled={
                  (question.type === "multiple-choice" && !selected) ||
                  (question.type === "matching" && !allMatchingCorrect) ||
                  (question.type === "fill-blank" && input.trim() === "")
                }
              >
                <ThemedText>Submit</ThemedText>
              </Pressable>
            ) : (
              <ThemedView>
                <ThemedText>
                  {lastCorrect === true
                    ? "Correct!"
                    : lastCorrect === false
                      ? question.type === "multiple-choice"
                        ? `Incorrect — answer: ${(question as any).correct}`
                        : question.type === "fill-blank"
                          ? `Incorrect — answer: ${(question as any).answer}`
                          : "Incorrect"
                      : "Answered"}
                </ThemedText>
                <Pressable onPress={handleNext} style={styles.button}>
                  <ThemedText>Next</ThemedText>
                </Pressable>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>
      ) : (
        <ThemedView style={styles.finished}>
          <ThemedText type="title">Quiz Finished</ThemedText>
          <ThemedText>You scored {localScore} points in this quiz.</ThemedText>
          <Pressable onPress={() => router.push("/")} style={styles.button}>
            <ThemedText>Back to lessons</ThemedText>
          </Pressable>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12, padding: 16 },
  questionContainer: { gap: 12 },
  input: { padding: 8, borderWidth: 1, borderColor: "#ccc", borderRadius: 6 },
  controls: { gap: 8, marginTop: 8 },
  button: {
    padding: 10,
    backgroundColor: "#A1CEDC",
    borderRadius: 6,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#cfdfe6",
    opacity: 0.6,
  },
  finished: { gap: 12 },
});
