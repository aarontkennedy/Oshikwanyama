import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import lessons from "@/data/oshikwanyama/lessons.json";
import { Link, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

export default function LessonDetail() {
  const params = useLocalSearchParams();
  const id = Number(params.id);
  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Lesson not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{lesson.title}</ThemedText>
      <ThemedText>{lesson.description}</ThemedText>

      <FlatList
        data={lesson.questions}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={({ item, index }) => (
          <ThemedView style={styles.question}>
            <ThemedText type="subtitle">
              {index + 1}. {item.prompt}
            </ThemedText>
          </ThemedView>
        )}
      />

      <Link href={`/oshikwanyama/quiz/${lesson.id}`}>
        <Link.Trigger>
          <ThemedText type="subtitle">Start Quiz</ThemedText>
        </Link.Trigger>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12, padding: 16 },
  question: { gap: 8 },
});
