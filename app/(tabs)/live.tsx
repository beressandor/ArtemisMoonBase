import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { AppHeader } from "@/components/AppHeader";
import { LiveCard } from "@/components/LiveCard";
import { Panel } from "@/components/Panel";
import { Screen } from "@/components/Screen";
import { listLiveLinks } from "@/lib/dataClient";
import { colors, radius, spacing, typography } from "@/lib/theme";

export default function LiveScreen() {
  const { data = [], isLoading } = useQuery({ queryKey: ["live-links"], queryFn: listLiveLinks });
  const trackingPreview = useMemo(() => data.find((link) => link.isEmbedSafe && link.type === "tracking"), [data]);

  return (
    <Screen>
      <AppHeader title="Live Center" />
      <Panel elevated>
        <Text style={styles.title}>Streams, countdowns, and tracking</Text>
        <Text style={styles.copy}>
          Live telemetry is only shown when NASA publishes an official public source. AROW and DSN are linked as context instead of
          simulated data.
        </Text>
      </Panel>

      {trackingPreview ? (
        <Panel style={styles.previewPanel}>
          <View style={styles.previewHeader}>
            <Text style={styles.previewTitle}>{trackingPreview.title}</Text>
            <Text style={styles.previewMeta}>{trackingPreview.provider}</Text>
          </View>
          <WebView source={{ uri: trackingPreview.url }} style={styles.webview} />
        </Panel>
      ) : null}

      {isLoading ? <ActivityIndicator color={colors.blue} /> : null}
      {data.map((item) => (
        <LiveCard key={item.id} item={item} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.text
  },
  copy: {
    ...typography.body,
    color: colors.textMuted
  },
  previewPanel: {
    padding: 0,
    overflow: "hidden"
  },
  previewHeader: {
    gap: spacing.xs,
    padding: spacing.lg
  },
  previewTitle: {
    ...typography.h2,
    color: colors.text
  },
  previewMeta: {
    ...typography.small,
    color: colors.textMuted
  },
  webview: {
    backgroundColor: colors.backgroundSoft,
    borderBottomLeftRadius: radius.sm,
    borderBottomRightRadius: radius.sm,
    height: 260
  }
});
