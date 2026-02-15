import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import lessons from "@/data/oshikwanyama/lessons.json";
import { useNavigation } from "@react-navigation/native";
import { Link, useLocalSearchParams } from "expo-router";
import { useLayoutEffect } from "react";
import { SectionList, StyleSheet } from "react-native";

export default function LessonDetail() {
  const navigation = useNavigation();
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
    <SectionList
      style={styles.container}
      ListHeaderComponent={
        <ThemedView style={styles.header}>
          <ThemedText type="title">{lesson.title.Oshikwanyama}</ThemedText>
          <ThemedText>{lesson.description}</ThemedText>
        </ThemedView>
      }
      sections={[
        {
          title: "Vocabulary",
          data: lesson.vocabulary.map((item, index) => ({
            ...item,
            index,
            type: "vocab",
          })),
        },
        {
          title: "Dialogues",
          data: lesson.dialogues.map((item, index) => ({
            ...item,
            index,
            type: "dialogue",
          })),
        },
      ]}
      keyExtractor={(item, idx) => String(idx)}
      renderItem={({ item, section }) => {
        if (section.title === "Vocabulary") {
          return (
            <ThemedView style={styles.question}>
              <ThemedText type="subtitle">
                {item.index + 1}. {item.Oshikwanyama} - {item.English}
              </ThemedText>
            </ThemedView>
          );
        }
        return (
          <ThemedView style={styles.question}>
            <ThemedText type="subtitle">
              {item.index + 1}. {item.title}
              {item.dialogue.map((element, idx) => (
                <ThemedText key={idx}>
                  {element.speaker}: {element.Oshikwanyama}
                </ThemedText>
              ))}
            </ThemedText>
          </ThemedView>
        );
      }}
      renderSectionHeader={({ section: { title } }) => (
        <ThemedText type="subtitle" style={styles.sectionHeader}>
          {title}
        </ThemedText>
      )}
      ListFooterComponent={
        <Link href={`/oshikwanyama/quiz/${lesson.id}`} style={styles.quizLink}>
          <Link.Trigger>
            <ThemedText type="subtitle">Start Quiz</ThemedText>
          </Link.Trigger>
        </Link>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { gap: 12, marginBottom: 16 },
  question: { gap: 8, marginBottom: 12 },
  sectionHeader: { marginTop: 12, marginBottom: 8 },
  quizLink: { marginTop: 16, marginBottom: 16 },
});
