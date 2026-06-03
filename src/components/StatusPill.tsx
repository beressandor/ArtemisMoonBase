import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "@/lib/i18n";
import { colors, radius, spacing, statusColor, typography } from "@/lib/theme";
import type { MissionStatus } from "@/lib/types";

interface StatusPillProps {
  status: MissionStatus;
}

export function StatusPill({ status }: StatusPillProps) {
  const displayStatus = status === "watch" ? "planned" : status;
  const color = statusColor[displayStatus];
  const { t } = useTranslation();

  return (
    <View style={[styles.pill, { borderColor: color }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.text}>{t(`status.${displayStatus}`)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.panelGlass,
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
