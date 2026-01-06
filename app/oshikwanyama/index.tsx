import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import lessons from "@/data/oshikwanyama/lessons.json";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function OshikwanyamaHome() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Tjika Oshikwanyama</ThemedText>
      <ThemedText style={styles.lead}>
        Learn Oshikwanyama — simple lessons, proverbs and quizzes.
      </ThemedText>

      <Link href="/oshikwanyama/lessons">
        <Link.Trigger>
          <ThemedText type="subtitle">Lessons ({lessons.length})</ThemedText>
        </Link.Trigger>
      </Link>

      <Link href="/oshikwanyama/proverbs">
        <Link.Trigger>
          <ThemedText type="subtitle">Proverbs</ThemedText>
        </Link.Trigger>
      </Link>

      <Link href="/oshikwanyama/greetings">
        <Link.Trigger>
          <ThemedText type="subtitle">Greetings (sample)</ThemedText>
        </Link.Trigger>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
  },
  lead: {
    marginBottom: 8,
  },
});
