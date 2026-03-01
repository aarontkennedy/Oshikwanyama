import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Pressable, StyleSheet } from "react-native";

interface OrderingItem {
  id: string;
  text: string;
}

interface OrderingQuestionProps {
  items: string[];
  orderedItems: OrderingItem[];
  onReorder: (items: OrderingItem[]) => void;
}

export function OrderingQuestion({
  items,
  orderedItems,
  onReorder,
}: OrderingQuestionProps) {
  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...orderedItems];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    onReorder(newItems);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.instruction}>
        Drag items to order them
      </ThemedText>
      <ThemedView style={styles.itemsContainer}>
        {orderedItems.map((item, index) => (
          <OrderingItemComponent
            key={item.id}
            item={item}
            index={index}
            totalItems={orderedItems.length}
            onMoveUp={() => moveItem(index, Math.max(0, index - 1))}
            onMoveDown={() =>
              moveItem(index, Math.min(orderedItems.length - 1, index + 1))
            }
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

interface OrderingItemComponentProps {
  item: OrderingItem;
  index: number;
  totalItems: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

function OrderingItemComponent({
  item,
  index,
  totalItems,
  onMoveUp,
  onMoveDown,
}: OrderingItemComponentProps) {
  return (
    <ThemedView style={styles.itemWrapper} testID={`ordering-item-${index}`}>
      <ThemedView style={styles.itemContent}>
        <ThemedText style={styles.itemNumber}>{index + 1}.</ThemedText>
        <ThemedText style={styles.itemText}>{item.text}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.controls}>
        {index > 0 && (
          <Pressable
            onPress={onMoveUp}
            style={styles.controlButton}
            testID={`move-up-${index}`}
          >
            <ThemedText>↑</ThemedText>
          </Pressable>
        )}
        {index < totalItems - 1 && (
          <Pressable
            onPress={onMoveDown}
            style={styles.controlButton}
            testID={`move-down-${index}`}
          >
            <ThemedText>↓</ThemedText>
          </Pressable>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  instruction: { fontSize: 12, fontStyle: "italic" },
  itemsContainer: { gap: 8 },
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f8ff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  itemNumber: { fontWeight: "700", width: 24 },
  itemText: { flex: 1 },
  controls: {
    flexDirection: "row",
    gap: 4,
  },
  controlButton: {
    padding: 6,
    backgroundColor: "#A1CEDC",
    borderRadius: 4,
    minWidth: 32,
    alignItems: "center",
  },
});
