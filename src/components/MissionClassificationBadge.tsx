import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "@/lib/theme";

interface MissionClassificationBadgeProps {
  label?: string;
}

export function MissionClassificationBadge({ label }: MissionClassificationBadgeProps) {
  if (!label) {
    return null;
  }

  return (
    <View style={styles.badge}>
      <Text numberOfLines={1} style={styles.text}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(217, 212, 199, 0.09)",
    borderColor: "rgba(217, 212, 199, 0.26)",
    borderRadius: radius.sm,
    borderWidth: 1,
    maxWidth: "100%",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  text: {
    ...typography.small,
    color: colors.blue,
    textTransform: "uppercase"
  }
});
