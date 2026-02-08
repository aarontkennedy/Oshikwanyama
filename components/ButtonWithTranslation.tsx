import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  cta: string;
  translated?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  testID?: string;
};

const ButtonWithTranslation: React.FC<Props> = ({
  cta,
  translated,
  onPress,
  accessibilityLabel,
  testID,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? cta}
      testID={testID ?? accessibilityLabel ?? cta}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View>
        <Text style={styles.title}>{cta}</Text>
        {translated ? <Text style={styles.subTitle}>{translated}</Text> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.8,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  subTitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },
});

export default ButtonWithTranslation;
