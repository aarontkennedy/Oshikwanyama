import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import lessons from "@/data/oshikwanyama/lessons.json";
import { GameContext } from "@/GameContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

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
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);

  if (!lesson) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Lesson not found</ThemedText>
      </ThemedView>
    );
  }

  const question = lesson.questions[index];

  const handleSubmit = () => {
    if (submitted) return;

    let correct = false;

    if (question.type === "multiple-choice") {
      correct = selected === (question as any).correct;
    } else if (question.type === "fill-blank") {
      correct =
        input.trim().toLowerCase() ===
        (question as any).answer.trim().toLowerCase();
    } else {
      // For other types we won't attempt automatic grading here
      correct = false;
    }

    if (correct) setLocalScore((s) => s + 10);
    setSubmitted(true);
  };

  const handleNext = () => {
    const next = index + 1;
    setSubmitted(false);
    setSelected(null);
    setInput("");

    if (next >= lesson.questions.length) {
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
      <ThemedText type="title">{lesson.title} — Quiz</ThemedText>
      <ThemedText>
        {index + 1}/{lesson.questions.length}
      </ThemedText>

      {!finished ? (
        <ThemedView style={styles.questionContainer}>
          <ThemedText type="subtitle">{question.prompt}</ThemedText>

          {question.type === "multiple-choice" && (
            <ThemedView style={styles.options}>
              {(question as any).options.map((opt: string) => (
                <Pressable
                  key={opt}
                  onPress={() => setSelected(opt)}
                  style={({ pressed }) => [
                    styles.option,
                    selected === opt && styles.optionSelected,
                    pressed && { opacity: 0.6 },
                  ]}
                >
                  <ThemedText>{opt}</ThemedText>
                </Pressable>
              ))}
            </ThemedView>
          )}

          {question.type === "fill-blank" && (
            <TextInput
              style={styles.input}
              value={input}
              placeholder="Type your answer"
              onChangeText={setInput}
            />
          )}

          <ThemedView style={styles.controls}>
            {!submitted ? (
              <Pressable onPress={handleSubmit} style={styles.button}>
                <ThemedText>Submit</ThemedText>
              </Pressable>
            ) : (
              <ThemedView>
                <ThemedText>
                  {question.type === "multiple-choice"
                    ? (question as any).correct === selected
                      ? "Correct!"
                      : `Incorrect — answer: ${(question as any).correct}`
                    : question.type === "fill-blank"
                    ? input.trim().toLowerCase() ===
                      (question as any).answer.trim().toLowerCase()
                      ? "Correct!"
                      : `Incorrect — answer: ${(question as any).answer}`
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
          <Pressable
            onPress={() => router.push("/oshikwanyama/lessons")}
            style={styles.button}
          >
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
  options: { gap: 8 },
  option: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 6 },
  optionSelected: { backgroundColor: "#e6f4f9" },
  input: { padding: 8, borderWidth: 1, borderColor: "#ccc", borderRadius: 6 },
  controls: { gap: 8, marginTop: 8 },
  button: {
    padding: 10,
    backgroundColor: "#A1CEDC",
    borderRadius: 6,
    alignItems: "center",
  },
  finished: { gap: 12 },
});
