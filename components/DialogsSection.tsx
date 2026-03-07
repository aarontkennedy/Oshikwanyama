import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { Dialog, ExampleDialog } from "@/types/oshikwanyama";
import { StyleSheet } from "react-native";

interface DialogsSectionProps {
  items: (ExampleDialog & { index: number })[];
}

export function DialogsSection({ items }: DialogsSectionProps) {
  return (
    <ThemedView style={styles.dialogWrapper}>
      {items.map((dialog, dialogIdx) => (
        <ThemedView key={dialogIdx} style={styles.dialogContainer}>
          <ThemedText type="subtitle" style={styles.dialogTitle}>
            {dialog.index + 1}. {dialog.title}
          </ThemedText>
          {dialog.conversation.map((element: Dialog, lineIdx: number) => (
            <ThemedText key={lineIdx} style={styles.dialogLine}>
              {element.speaker}: {element.text}
            </ThemedText>
          ))}
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  dialogWrapper: {
    backgroundColor: "transparent",
  },
  dialogContainer: {
    gap: 8,
    marginBottom: 12,
    backgroundColor: "transparent",
  },
  dialogTitle: {
    fontWeight: "600",
  },
  dialogLine: {
    paddingLeft: 8,
    lineHeight: 20,
  },
});
