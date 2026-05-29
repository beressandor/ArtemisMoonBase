import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, statusColor, typography } from "@/lib/theme";
import type { MissionStatus } from "@/lib/types";

interface StatusPillProps {
  status: MissionStatus;
}

const labels: Record<MissionStatus, string> = {
  active: "Active",
  completed: "Complete",
  delayed: "Delayed",
  "in-development": "In development",
  planned: "Planned",
  scheduled: "Scheduled",
  watch: "Watch"
};

export function StatusPill({ status }: StatusPillProps) {
  const color = statusColor[status];

  return (
    <View style={[styles.pill, { borderColor: color }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.text}>{labels[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  dot: {
    borderRadius: 4,
    height: 6,
    width: 6
  },
  text: {
    ...typography.small,
    color: colors.text
  }
});
