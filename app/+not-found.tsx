import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { colors, spacing, typography } from "@/lib/theme";

export default function NotFoundScreen() {
  return (
    <Screen>
      <EmptyState title="Route not found" message="This lunar waypoint is not in the current mission map." />
      <Pressable style={styles.action} onPress={() => router.replace("/")}>
        <Text style={styles.actionText}>Return to dashboard</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  action: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
    marginHorizontal: spacing.lg
  },
  actionText: {
    ...typography.small,
    color: colors.background
  }
});
