import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import lessons from "@/data/oshikwanyama/lessons.json";
import { Link } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

export default function Lessons() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Lessons</ThemedText>

      <FlatList
        data={lessons}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Link href={`/oshikwanyama/lessons/${item.id}`}>
            <Link.Trigger>
              <ThemedText type="subtitle">{item.title}</ThemedText>
              <ThemedText>{item.description}</ThemedText>
            </Link.Trigger>
          </Link>
        )}
        ItemSeparatorComponent={() => <ThemedText> </ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8, padding: 16 },
});
