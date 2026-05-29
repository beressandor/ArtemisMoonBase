import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Bell, Menu, Search } from "lucide-react-native";
import { router } from "expo-router";
import { colors, radius, spacing, typography } from "@/lib/theme";

interface AppHeaderProps {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}

export function AppHeader({ eyebrow = "Artemis Moon Base", title, action }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.titleBlock}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.actions}>
        {action}
        <Pressable accessibilityLabel="Search" style={styles.iconButton} onPress={() => router.push("/search")}>
          <Search color={colors.text} size={18} />
        </Pressable>
        <Pressable accessibilityLabel="Notifications" style={styles.iconButton}>
          <Bell color={colors.textMuted} size={18} />
        </Pressable>
        <Pressable accessibilityLabel="Menu" style={styles.iconButton}>
          <Menu color={colors.textMuted} size={18} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  titleBlock: {
    flex: 1,
    gap: spacing.xs
  },
  eyebrow: {
    ...typography.small,
    color: colors.blue,
    letterSpacing: 0
  },
  title: {
    ...typography.title,
    color: colors.text
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: colors.panel,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38
  }
});
