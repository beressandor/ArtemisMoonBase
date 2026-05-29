import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "@/lib/theme";
import type { DashboardData } from "@/lib/types";

interface MetricTileProps {
  metric: DashboardData["metrics"][number];
}

const toneColor: Record<DashboardData["metrics"][number]["tone"], string> = {
  blue: colors.blue,
  green: colors.green,
  gold: colors.gold,
  red: colors.red
};

export function MetricTile({ metric }: MetricTileProps) {
  return (
    <View style={styles.tile}>
      <Text style={[styles.value, { color: toneColor[metric.tone] }]}>{metric.value}</Text>
      <Text numberOfLines={1} style={styles.label}>
        {metric.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colors.panel,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    flex: 1,
    minHeight: 78,
    minWidth: 138,
    padding: spacing.md
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30
  },
  label: {
    ...typography.small,
    color: colors.textMuted
  }
});
