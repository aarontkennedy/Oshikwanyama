import { ThemedView } from "@/components/themed-view";
import { ScrollView, StyleSheet } from "react-native";
import {
  Cell,
  Col,
  Cols,
  Table,
  TableWrapper,
} from "react-native-table-component";

const PERSON_COL_WIDTH = 90;
const SIGN_COL_WIDTH = 22;
const DATA_COL_WIDTH = 130;
const HEADER_HEIGHT = 48;
const ROW_HEIGHT = 38;

interface ConjugationTableProps {
  data: [string[], string[], string[]];
}

export function ConjugationTableSection({ data }: ConjugationTableProps) {
  const pronounColumnData = ["Ame", "Ove", "Ye", "Fye", "Nye", "Vo"];
  const positiveNegativeColumnData = [
    "+",
    "-",
    "+",
    "-",
    "+",
    "-",
    "+",
    "-",
    "+",
    "-",
    "+",
    "-",
  ];
  const tableData2 = data;

  const personHeights = [
    ROW_HEIGHT * 2,
    ROW_HEIGHT * 2,
    ROW_HEIGHT * 2,
    ROW_HEIGHT * 2,
    ROW_HEIGHT * 2,
    ROW_HEIGHT * 2,
  ];
  const signHeights = Array(12).fill(ROW_HEIGHT);
  const dataHeights = [HEADER_HEIGHT, ...Array(12).fill(ROW_HEIGHT)];

  return (
    <ThemedView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <Table
          style={{ flexDirection: "row" }}
          borderStyle={{ borderWidth: 1 }}
        >
          {/* Left Wrapper: person names + +/- indicators */}
          <TableWrapper style={{ width: PERSON_COL_WIDTH + SIGN_COL_WIDTH }}>
            <Cell data="" style={styles.singleHead} />
            <TableWrapper style={{ flexDirection: "row" }}>
              <Col
                data={pronounColumnData}
                style={[styles.head, { width: PERSON_COL_WIDTH }]}
                heightArr={personHeights}
                textStyle={styles.text}
              />
              <Col
                data={positiveNegativeColumnData}
                style={[styles.title, { width: SIGN_COL_WIDTH }]}
                heightArr={signHeights}
                textStyle={styles.titleText}
              />
            </TableWrapper>
          </TableWrapper>

          {/* Right Wrapper: tense columns */}
          <TableWrapper style={{ width: DATA_COL_WIDTH * 3 }}>
            <Cols
              data={tableData2}
              heightArr={dataHeights}
              textStyle={styles.dataText}
            />
          </TableWrapper>
        </Table>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: "#fff",
  },
  singleHead: { height: HEADER_HEIGHT, backgroundColor: "#c8e1ff" },
  head: { backgroundColor: "#c8e1ff" },
  title: { backgroundColor: "#c8e1ff" },
  titleText: { textAlign: "center", fontSize: 12 },
  text: { textAlign: "center", paddingHorizontal: 8 },
  dataText: { textAlign: "center", paddingHorizontal: 10 },
});
