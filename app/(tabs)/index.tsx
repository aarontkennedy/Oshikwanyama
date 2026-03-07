import { Image } from "expo-image";
import { FlatList, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import lessons from "@/data/oshikwanyama/lessons.json";
import { Link } from "expo-router";

export default function HomeScreen() {
  const lessonItems = lessons.map((item) => ({
    ...item,
    type: "lesson",
  }));

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "white", dark: "#131617" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <FlatList
        scrollEnabled={false}
        data={lessonItems}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <ThemedView style={styles.oshikwanyamaContainer}>
            <ThemedText type="title">Oshikwanyama</ThemedText>
            <ThemedText style={styles.oshLead}>
              Learn Oshikwanyama — simple lessons, proverbs and quizzes.
            </ThemedText>
            <ThemedText type="subtitle">Lessons</ThemedText>
          </ThemedView>
        }
        renderItem={({ item }) => (
          <Link href={`/oshikwanyama/lessons/${item.id}`}>
            <Link.Trigger>
              <ThemedView style={styles.lessonButton}>
                <ThemedText type="subtitle">
                  {item.title.Oshikwanyama}
                </ThemedText>
                <ThemedText>{item.title.English}</ThemedText>
              </ThemedView>
            </Link.Trigger>
          </Link>
        )}
        ItemSeparatorComponent={() => <ThemedText> </ThemedText>}
        ListFooterComponent={
          <Link href="/oshikwanyama/proverbs" style={styles.proverbsLink}>
            <Link.Trigger>
              <ThemedText type="subtitle">Proverbs</ThemedText>
            </Link.Trigger>
          </Link>
        }
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#A1CEDC",
  },
  oshikwanyamaContainer: {
    gap: 8,
    // paddingHorizontal: 12,
    marginBottom: 8,
  },
  oshLead: {
    marginBottom: 8,
  },
  lessonButton: {
    backgroundColor: "#A1CEDC",
    padding: 16,
    borderRadius: 8,
    marginVertical: 4,
    gap: 4,
    width: "100%",
  },
  proverbsLink: {
    marginTop: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 413,
    width: 670,
    bottom: 0,
    left: -50,
    position: "absolute",
  },
});
