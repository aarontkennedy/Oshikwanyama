import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

interface MatchingPair {
  word: string;
  meaning: string;
}

interface MatchingQuestionProps {
  pairs: MatchingPair[];
  answers: { wordIdx: number; meaningIdx: number }[];
  onAnswerChange: (matches: { wordIdx: number; meaningIdx: number }[]) => void;
}

export function MatchingQuestion({
  pairs,
  answers,
  onAnswerChange,
}: MatchingQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  // Shuffle meanings while keeping track of original indices
  const shuffledMeanings = useMemo(() => {
    const withIndices = pairs.map((p, i) => ({
      text: p.meaning,
      originalIdx: i,
    }));
    // Fisher-Yates shuffle
    for (let i = withIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [withIndices[i], withIndices[j]] = [withIndices[j], withIndices[i]];
    }
    return withIndices;
  }, [pairs]);

  const handleWordPress = (wordIdx: number) => {
    setSelected(wordIdx);
  };

  const handleMeaningPress = (meaningOriginalIdx: number) => {
    if (selected === null) return;

    // only make a match if user tapped the correct meaning (same index)
    if (meaningOriginalIdx === selected) {
      const newMatches = answers.filter((m) => m.wordIdx !== selected);
      newMatches.push({ wordIdx: selected, meaningIdx: meaningOriginalIdx });
      onAnswerChange(newMatches);
    }
    // clear selection regardless so they can't accidentally reselect
    setSelected(null);
  };

  const isWordMatched = (wordIdx: number) =>
    answers.some((m) => m.wordIdx === wordIdx);
  const getMatchedMeaning = (wordIdx: number) =>
    answers.find((m) => m.wordIdx === wordIdx)?.meaningIdx;

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.instruction}>
        Tap a word on the left, then tap its meaning on the right
      </ThemedText>
      <ThemedView style={styles.matchingContainer}>
        <ThemedView style={styles.column}>
          {pairs.map((pair, i) => (
            <Pressable
              key={`word-${i}`}
              onPress={() => handleWordPress(i)}
              style={({ pressed }) => [
                styles.item,
                styles.wordItem,
                selected === i && styles.itemSelected,
                isWordMatched(i) && styles.itemMatched,
                pressed && { opacity: 0.7 },
              ]}
              testID={`matching-word-${i}`}
            >
              <ThemedText style={styles.itemText}>{pair.word}</ThemedText>
            </Pressable>
          ))}
        </ThemedView>

        <ThemedView style={styles.column}>
          {shuffledMeanings.map((meaning, displayIdx) => (
            <Pressable
              key={`meaning-${displayIdx}`}
              onPress={() => handleMeaningPress(meaning.originalIdx)}
              style={({ pressed }) => [
                styles.item,
                styles.meaningItem,
                getMatchedMeaning(meaning.originalIdx) !== undefined &&
                  styles.itemMatched,
                selected !== null &&
                  getMatchedMeaning(meaning.originalIdx) === undefined &&
                  styles.itemAvailable,
                pressed && { opacity: 0.7 },
              ]}
              testID={`matching-meaning-${meaning.originalIdx}`}
            >
              <ThemedText style={styles.itemText}>{meaning.text}</ThemedText>
            </Pressable>
          ))}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  instruction: { fontSize: 12, fontStyle: "italic", marginBottom: 4 },
  matchingContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    gap: 8,
  },
  item: {
    padding: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    minHeight: 50,
    justifyContent: "center",
  },
  wordItem: {
    backgroundColor: "#f0f8ff",
  },
  meaningItem: {
    backgroundColor: "#fff0f8",
  },
  itemSelected: {
    borderColor: "#A1CEDC",
    borderWidth: 3,
    backgroundColor: "#e6f4f9",
  },
  itemMatched: {
    backgroundColor: "#d4f4dd",
    borderColor: "#4caf50",
  },
  itemAvailable: {
    borderColor: "#ffc107",
    backgroundColor: "#fffef0",
  },
  itemText: {
    fontSize: 14,
  },
});
