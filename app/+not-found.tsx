import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { useTranslation } from "@/lib/i18n";
import { colors, spacing, typography } from "@/lib/theme";

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <EmptyState title={t("notFound.title")} message={t("notFound.message")} />
      <Pressable style={styles.action} onPress={() => router.replace("/")}>
        <Text style={styles.actionText}>{t("notFound.return")}</Text>
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
