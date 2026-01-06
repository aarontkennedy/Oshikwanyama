import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import lessons from "@/data/oshikwanyama/lessons.json";
import { FlatList, StyleSheet } from "react-native";

export default function Greetings() {
  const greetings = lessons.find((l) => l.title === "Greetings");

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Greetings</ThemedText>
      {greetings ? (
        <FlatList
          data={greetings.questions}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <ThemedView style={styles.item}>
              <ThemedText>{item.prompt}</ThemedText>
            </ThemedView>
          )}
        />
      ) : (
        <ThemedText>No greetings found</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12, padding: 16 },
  item: { gap: 4 },
});
