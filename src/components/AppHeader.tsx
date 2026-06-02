import type { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Bell, Menu, Search } from "lucide-react-native";
import { router } from "expo-router";
import { AutoFitTitle } from "@/components/AutoFitTitle";
import { useTranslation } from "@/lib/i18n";
import { colors, radius, spacing, typography } from "@/lib/theme";

interface AppHeaderProps {
  title: string;
  action?: ReactNode;
}

export function AppHeader({ title, action }: AppHeaderProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <View style={styles.titleBlock}>
        <AutoFitTitle style={styles.title}>{title}</AutoFitTitle>
      </View>
      <View style={styles.actions}>
        {action}
        <Pressable accessibilityLabel={t("app.search")} style={styles.iconButton} onPress={() => router.push("/search")}>
          <Search color={colors.text} size={18} />
        </Pressable>
        <Pressable accessibilityLabel={t("app.notifications")} style={styles.iconButton}>
          <Bell color={colors.textMuted} size={18} />
        </Pressable>
        <Pressable
          accessibilityLabel={t("app.menu")}
          accessibilityRole="button"
          style={styles.iconButton}
          onPress={() => router.push("/settings")}
        >
          <Menu color={colors.textMuted} size={18} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  titleBlock: {
    flex: 1,
    height: 38,
    justifyContent: "center",
    minWidth: 0
  },
  title: {
    ...typography.title,
    color: colors.text
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
    position: "relative",
    zIndex: 20
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: colors.panelGlass,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38
  }
});
