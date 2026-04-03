import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { Dialog, ExampleDialog } from "@/types/oshikwanyama";
import { useState } from "react";
import { StyleSheet } from "react-native";

interface DialogsSectionProps {
  items: (ExampleDialog & { index: number })[];
}

const DialogText = ({ text }: { text: string }) => {
  const [revealed, setRevealed] = useState(false);
  const highlighted = text.match(/\*(.+?)\*/)?.[1];
  const displayText = highlighted
    ? text.replace(`*${highlighted}*`, "___")
    : text;

  if (highlighted && !revealed) {
    const parts = displayText.split("___");
    return (
      <ThemedText>
        {parts[0]}
        <ThemedText onPress={() => setRevealed(true)} style={styles.blank}>
          ___
        </ThemedText>
        {parts[1]}
      </ThemedText>
    );
  }

  return (
    <ThemedText>
      {highlighted ? text.replace(/\*/g, "") : displayText}
    </ThemedText>
  );
};

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
              {element.speaker}: <DialogText text={element.text} />
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
  blank: {
    textDecorationLine: "underline",
  },
});
