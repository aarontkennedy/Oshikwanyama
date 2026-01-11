import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import lessons from "@/data/oshikwanyama/lessons.json";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.stepContainer}>
        {/* Oshikwanyama section (moved from /oshikwanyama/index) */}
        <ThemedView style={styles.oshikwanyamaContainer}>
          <ThemedText type="title">Tjika Oshikwanyama</ThemedText>
          <ThemedText style={styles.oshLead}>
            Learn Oshikwanyama — simple lessons, proverbs and quizzes.
          </ThemedText>

          <Link href="/oshikwanyama/lessons">
            <Link.Trigger>
              <ThemedText type="subtitle">
                Lessons ({lessons.length})
              </ThemedText>
            </Link.Trigger>
          </Link>

          <Link href="/oshikwanyama/proverbs">
            <Link.Trigger>
              <ThemedText type="subtitle">Proverbs</ThemedText>
            </Link.Trigger>
          </Link>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  oshikwanyamaContainer: {
    gap: 8,
    padding: 12,
    marginBottom: 8,
  },
  oshLead: {
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
