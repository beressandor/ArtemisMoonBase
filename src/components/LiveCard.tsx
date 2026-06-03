import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Activity, Radio, Satellite } from "lucide-react-native";
import { useTranslation } from "@/lib/i18n";
import { colors, radius, spacing, typography } from "@/lib/theme";
import type { LiveLink } from "@/lib/types";
import { Panel } from "@/components/Panel";
import { StatusPill } from "@/components/StatusPill";

interface LiveCardProps {
  item: LiveLink;
}

const icons = {
  stream: Radio,
  tracking: Satellite,
  "launch-countdown": Activity,
  schedule: Activity
};

export function LiveCard({ item }: LiveCardProps) {
  const Icon = icons[item.type];
  const { t } = useTranslation();

  return (
    <Panel style={styles.card}>
      <View style={styles.row}>
        <View style={styles.icon}>
          <Icon color={colors.blue} size={18} />
        </View>
        <View style={styles.copyBlock}>
          <View style={styles.metaRow}>
            <Text style={styles.provider}>{item.provider}</Text>
            <StatusPill status={item.status} />
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
        </View>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`${t("live.open")} ${item.title}`}
          style={styles.action}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.actionText}>{t("live.open")}</Text>
        </Pressable>
      </View>
    </Panel>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md
  },
  row: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md
  },
  icon: {
    alignItems: "center",
    backgroundColor: "rgba(217, 212, 199, 0.08)",
    borderColor: "rgba(217, 212, 199, 0.22)",
    borderRadius: radius.sm,
    borderWidth: 1,
    height: 36,
    justifyContent: "center",
    width: 36
  },
  copyBlock: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 0
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  provider: {
    ...typography.small,
    color: colors.textDim
  },
  title: {
    ...typography.h2,
    color: colors.text
  },
  summary: {
    ...typography.body,
    color: colors.textMuted
  },
  action: {
    alignItems: "center",
    backgroundColor: colors.panelGlass,
    borderColor: "rgba(217, 212, 199, 0.26)",
    borderWidth: 1,
    borderRadius: radius.sm,
    justifyContent: "center",
    minHeight: 34,
    paddingHorizontal: spacing.md
  },
  actionText: {
    ...typography.small,
    color: colors.blue
  }
});
