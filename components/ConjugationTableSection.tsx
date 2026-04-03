import { ThemedView } from "@/components/themed-view";
import { ConjugationWithPositiveNegativeTable } from "@/types/oshikwanyama";
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
  table: ConjugationWithPositiveNegativeTable;
}

export function ConjugationTableSection(_props: ConjugationTableProps) {
  const tableTitle2 = [
    "+", "-", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-",
  ];
  const tableData2 = [
    [
      "Past",
      "Onda", "Inandi",
      "Owa", "Ino",
      "Okwa", "Ina",
      "Otwa", "Inatu",
      "Omwa", "Inamu",
      "Ova", "Inaa/Inava",
    ],
    [
      "Present",
      "Ohandi/Ohai", "Itandi",
      "Oto", "Ito",
      "Ota", "Ita",
      "Ohatu", "Itatu",
      "Otamu", "Itamu",
      "Otaa/Otava", "Itaa/Itava",
    ],
    [
      "Future",
      "Ohandi ka", "Itandi ka",
      "Oto ka", "Ito ka",
      "Ota ka", "Ita ka",
      "Ohatu ka", "Itatu ka",
      "Otamu ka", "Itamu ka",
      "Otaa ka/Otava ka", "Itaa ka/Itava ka",
    ],
  ];

  const personHeights = [ROW_HEIGHT * 2, ROW_HEIGHT * 2, ROW_HEIGHT * 2, ROW_HEIGHT * 2, ROW_HEIGHT * 2, ROW_HEIGHT * 2];
  const signHeights = Array(12).fill(ROW_HEIGHT);
  const dataHeights = [HEADER_HEIGHT, ...Array(12).fill(ROW_HEIGHT)];

  return (
    <ThemedView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <Table style={{ flexDirection: "row" }} borderStyle={{ borderWidth: 1 }}>
          {/* Left Wrapper: person names + +/- indicators */}
          <TableWrapper style={{ width: PERSON_COL_WIDTH + SIGN_COL_WIDTH }}>
            <Cell data="" style={styles.singleHead} />
            <TableWrapper style={{ flexDirection: "row" }}>
              <Col
                data={["Ame", "Ove", "Ye", "Fye", "Nye", "Vo"]}
                style={[styles.head, { width: PERSON_COL_WIDTH }]}
                heightArr={personHeights}
                textStyle={styles.text}
              />
              <Col
                data={tableTitle2}
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
