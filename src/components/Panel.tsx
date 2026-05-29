import type { PropsWithChildren } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { colors, radius, spacing } from "@/lib/theme";

interface PanelProps extends PropsWithChildren {
  style?: ViewStyle;
  elevated?: boolean;
}

export function Panel({ children, style, elevated = false }: PanelProps) {
  return <View style={[styles.panel, elevated && styles.elevated, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.panel,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg
  },
  elevated: {
    backgroundColor: colors.panelElevated,
    borderColor: colors.border
  }
});
