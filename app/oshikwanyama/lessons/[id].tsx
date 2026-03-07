import { DialogsSection } from "@/components/DialogsSection";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { VocabularySection } from "@/components/VocabularySection";
import lessons from "@/data/oshikwanyama/lessons.json";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

export default function LessonDetail() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = Number(params.id);
  const lesson = lessons.find((l) => l.id === id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: lesson?.title.Oshikwanyama || "Lesson",
    });
  }, [navigation, lesson]);

  if (!lesson) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Lesson not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">{lesson.title.Oshikwanyama}</ThemedText>
        <ThemedText>{lesson.description}</ThemedText>
      </ThemedView>

      <ThemedText type="subtitle" style={styles.sectionHeader}>
        Vocabulary
      </ThemedText>
      <VocabularySection items={lesson.vocab} />

      <ThemedText type="subtitle" style={styles.sectionHeader}>
        Dialogs
      </ThemedText>
      <DialogsSection
        items={lesson.dialogs.map((item, index) => ({
          ...item,
          index,
        }))}
      />

      <Pressable
        onPress={() => router.push(`/oshikwanyama/quiz/${lesson.id}`)}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
      >
        <ThemedText>Start Quiz</ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { gap: 12, marginBottom: 16, backgroundColor: "transparent" },
  sectionHeader: { marginTop: 12, marginBottom: 8 },
  button: {
    padding: 10,
    backgroundColor: "#A1CEDC",
    borderRadius: 6,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },
});
