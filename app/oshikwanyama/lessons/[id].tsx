import { ConjugationTableSection } from "@/components/ConjugationTableSection";
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
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title">{lesson.title.Oshikwanyama}</ThemedText>
          <ThemedText>{lesson.description}</ThemedText>
        </ThemedView>

        <VocabularySection items={lesson.vocab} />

        {lesson.conjugations && lesson.conjugations.length > 0 && (
          <ConjugationTableSection table={lesson.conjugations[0]} />
        )}

        {lesson?.dialogs?.length > 0 && (
          <ThemedText type="subtitle" style={styles.sectionHeader}>
            {lesson?.dialogs?.length === 1 ? "Example" : "Examples"}
          </ThemedText>
        )}
        <DialogsSection
          items={lesson.dialogs.map((item, index) => ({
            ...item,
            index,
          }))}
        />
      </ScrollView>

      <Pressable
        onPress={() => router.push(`/oshikwanyama/quiz/${lesson.id}`)}
        style={({ pressed }) => [
          styles.stickyButton,
          pressed && { opacity: 0.7 },
        ]}
      >
        <ThemedText>Start Quiz</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // Space for the sticky button
  },
  header: { gap: 12, marginBottom: 16, backgroundColor: "transparent" },
  sectionHeader: { marginTop: 12, marginBottom: 8 },
  stickyButton: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    padding: 16,
    backgroundColor: "#A1CEDC",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
