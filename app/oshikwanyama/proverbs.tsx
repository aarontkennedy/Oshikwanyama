import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import proverbs from "@/data/oshikwanyama/proverbs.json";
import { FlatList, StyleSheet } from "react-native";

export default function Proverbs() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Proverbs</ThemedText>

      <FlatList
        data={proverbs}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText type="subtitle">{item.original}</ThemedText>
            <ThemedText>{item.translation}</ThemedText>
            <ThemedText>{item.explanation}</ThemedText>
          </ThemedView>
        )}
        ItemSeparatorComponent={() => <ThemedText> </ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12, padding: 16 },
  item: { gap: 4 },
});
