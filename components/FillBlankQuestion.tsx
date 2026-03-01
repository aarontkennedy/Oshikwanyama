import { StyleSheet, TextInput } from "react-native";

interface FillBlankQuestionProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function FillBlankQuestion({
  value,
  onChangeText,
  placeholder = "Type your answer",
}: FillBlankQuestionProps) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      testID="fill-blank-input"
    />
  );
}

const styles = StyleSheet.create({
  input: { padding: 8, borderWidth: 1, borderColor: "#ccc", borderRadius: 6 },
});
