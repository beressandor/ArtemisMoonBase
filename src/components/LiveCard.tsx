import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Activity, ExternalLink, Radio, Satellite } from "lucide-react-native";
import { colors, spacing, typography } from "@/lib/theme";
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

  return (
    <Panel>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon color={colors.blue} size={20} />
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.provider}>{item.provider}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <StatusPill status={item.status} />
      </View>
      <Text style={styles.summary}>{item.summary}</Text>
      <Pressable style={styles.action} onPress={() => Linking.openURL(item.url)}>
        <ExternalLink color={colors.background} size={16} />
        <Text style={styles.actionText}>Open live source</Text>
      </Pressable>
    </Panel>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md
  },
  icon: {
    alignItems: "center",
    backgroundColor: colors.backgroundSoft,
    borderColor: colors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40
  },
  titleBlock: {
    flex: 1,
    gap: 2
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
    backgroundColor: colors.white,
    borderRadius: 8,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 42
  },
  actionText: {
    ...typography.small,
    color: colors.background
  }
});
