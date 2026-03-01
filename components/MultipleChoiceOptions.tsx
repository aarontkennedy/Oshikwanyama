import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Pressable, StyleSheet } from "react-native";

interface MultipleChoiceOptionsProps {
  options: string[];
  selected: string | null;
  onSelect: (option: string) => void;
}

export function MultipleChoiceOptions({
  options,
  selected,
  onSelect,
}: MultipleChoiceOptionsProps) {
  return (
    <ThemedView style={styles.options}>
      {options.map((opt: string) => (
        <Pressable
          key={opt}
          onPress={() => onSelect(opt)}
          style={({ pressed }) => [
            styles.option,
            selected === opt && styles.optionSelected,
            pressed && { opacity: 0.6 },
          ]}
          testID={`option-${opt}`}
        >
          <ThemedText>{opt}</ThemedText>
        </Pressable>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  options: { gap: 8 },
  option: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 6 },
  optionSelected: { backgroundColor: "#e6f4f9" },
});
