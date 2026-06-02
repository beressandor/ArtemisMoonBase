import type { PropsWithChildren } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { colors, radius, spacing } from "@/lib/theme";

interface PanelProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
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
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.28,
    shadowRadius: 22,
    elevation: 8,
    gap: spacing.md,
    padding: spacing.lg
  },
  elevated: {
    backgroundColor: colors.panelElevated,
    borderColor: colors.border,
    shadowOpacity: 0.38,
    elevation: 12
  }
});
