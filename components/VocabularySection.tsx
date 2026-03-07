import { ThemedView } from "@/components/themed-view";
import type { Vocab } from "@/types/oshikwanyama";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Row, Rows, Table } from "react-native-table-component";

interface VocabularySectionProps {
  items: Vocab[];
}

export function VocabularySection({ items }: VocabularySectionProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const columnWidth = containerWidth > 0 ? containerWidth / 2 : 150;
  const tableHead = ["English", "Oshikwanyama"];
  const tableData = items.map((item) => [item.English, item.Oshikwanyama]);

  return (
    <ThemedView
      style={styles.container}
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width);
      }}
    >
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={tableHead}
          style={styles.head}
          textStyle={styles.headText}
          widthArr={[columnWidth, columnWidth]}
        />
        <Rows
          data={tableData}
          textStyle={styles.text}
          widthArr={[columnWidth, columnWidth]}
        />
      </Table>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 0,
    backgroundColor: "#fff",
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#A1CEDC",
  },
  head: {
    height: 40,
    backgroundColor: "#A1CEDC",
  },
  headText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    margin: 6,
    textAlign: "center",
  },
});
