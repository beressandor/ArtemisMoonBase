import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "@/lib/theme";

interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
  contentStyle?: ViewStyle;
}

export function Screen({ children, scroll = true, contentStyle }: ScreenProps) {
  if (!scroll) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <BackgroundChrome />
        <View style={[styles.content, contentStyle]}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackgroundChrome />
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={[styles.content, contentStyle]}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

function BackgroundChrome() {
  return (
    <View pointerEvents="none" style={styles.chrome}>
      <View style={styles.topBand} />
      <View style={styles.horizonBand} />
      <View style={[styles.star, styles.starOne]} />
      <View style={[styles.star, styles.starTwo]} />
      <View style={[styles.star, styles.starThree]} />
      <View style={[styles.star, styles.starFour]} />
      <View style={[styles.star, styles.starFive]} />
      <View style={[styles.star, styles.starSix]} />
      <View style={styles.scanline} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: "hidden"
  },
  content: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl
  },
  chrome: {
    ...StyleSheet.absoluteFillObject
  },
  topBand: {
    backgroundColor: "rgba(95, 86, 74, 0.16)",
    height: 240,
    left: -70,
    position: "absolute",
    right: -80,
    top: -110,
    transform: [{ rotate: "-12deg" }]
  },
  horizonBand: {
    backgroundColor: "rgba(216, 180, 106, 0.07)",
    bottom: 74,
    height: 88,
    left: -30,
    position: "absolute",
    right: -30,
    transform: [{ rotate: "5deg" }]
  },
  scanline: {
    backgroundColor: "rgba(255, 255, 255, 0.035)",
    height: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 142
  },
  star: {
    backgroundColor: "rgba(245, 241, 231, 0.64)",
    borderRadius: 2,
    height: 2,
    position: "absolute",
    width: 2
  },
  starOne: {
    right: 34,
    top: 48
  },
  starTwo: {
    left: 48,
    top: 92
  },
  starThree: {
    right: 92,
    top: 168
  },
  starFour: {
    left: 22,
    top: 238
  },
  starFive: {
    right: 44,
    top: 326
  },
  starSix: {
    left: 112,
    top: 394
  }
});
