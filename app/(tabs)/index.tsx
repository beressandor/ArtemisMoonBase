import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { ArrowRight, CalendarClock, Radio, Rocket } from "lucide-react-native";
import { AppHeader } from "@/components/AppHeader";
import { MediaImage } from "@/components/MediaImage";
import { MetricTile } from "@/components/MetricTile";
import { Panel } from "@/components/Panel";
import { Screen } from "@/components/Screen";
import { StatusPill } from "@/components/StatusPill";
import { getDashboardData } from "@/lib/dataClient";
import { colors, spacing, typography } from "@/lib/theme";

export default function DashboardScreen() {
  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: getDashboardData });

  if (isLoading || !data) {
    return (
      <Screen>
        <ActivityIndicator color={colors.blue} />
      </Screen>
    );
  }

  return (
    <Screen>
      <AppHeader title="Lunar Mission Control" />

      <Panel elevated style={styles.hero}>
        <View style={styles.heroHeader}>
          <View style={styles.heroTitleBlock}>
            <Text style={styles.kicker}>Next major event</Text>
            <Text style={styles.heroTitle}>{data.nextEvent?.title ?? "Schedule watch"}</Text>
          </View>
          {data.nextEvent ? <StatusPill status={data.nextEvent.status} /> : null}
        </View>
        <Text style={styles.heroDate}>{data.nextEvent?.dateLabel ?? "TBD"}</Text>
        <Text style={styles.heroSummary}>{data.nextEvent?.summary ?? "Waiting for the next official NASA update."}</Text>
        <Pressable style={styles.primaryAction} onPress={() => router.push("/roadmap")}>
          <CalendarClock color={colors.background} size={16} />
          <Text style={styles.primaryActionText}>Open roadmap</Text>
        </Pressable>
      </Panel>

      <View style={styles.metricsGrid}>
        {data.metrics.map((metric) => (
          <MetricTile key={metric.label} metric={metric} />
        ))}
      </View>

      <Panel>
        <View style={styles.sectionHeader}>
          <Rocket color={colors.blue} size={18} />
          <Text style={styles.sectionTitle}>Launch tracking</Text>
        </View>
        <Text style={styles.largeValue}>{data.nextLaunch?.dateLabel ?? "Tracked by LL2"}</Text>
        <Text style={styles.muted}>{data.nextLaunch?.title ?? "Launch Library 2 sync populates upcoming launch windows."}</Text>
      </Panel>

      {data.highlightedMission ? (
        <Pressable onPress={() => router.push({ pathname: "/mission/[id]", params: { id: data.highlightedMission!.id } })}>
          <Panel style={styles.featured}>
            <View style={styles.featuredBody}>
              <Text style={styles.kicker}>Mission brief</Text>
              <Text style={styles.sectionTitle}>{data.highlightedMission.title}</Text>
              <Text numberOfLines={3} style={styles.muted}>
                {data.highlightedMission.summary}
              </Text>
            </View>
            <ArrowRight color={colors.textMuted} size={20} />
          </Panel>
        </Pressable>
      ) : null}

      {data.highlightedEquipment ? (
        <Pressable
          onPress={() => router.push({ pathname: "/equipment/[id]", params: { id: data.highlightedEquipment!.id } })}
        >
          <Panel style={styles.mediaPanel}>
            <MediaImage url={data.highlightedEquipment.imageUrl} style={styles.media} />
            <View style={styles.featuredBody}>
              <Text style={styles.kicker}>Equipment focus</Text>
              <Text style={styles.sectionTitle}>{data.highlightedEquipment.name}</Text>
              <Text numberOfLines={2} style={styles.muted}>
                {data.highlightedEquipment.summary}
              </Text>
            </View>
          </Panel>
        </Pressable>
      ) : null}

      {data.liveNow ? (
        <Panel>
          <View style={styles.sectionHeader}>
            <Radio color={colors.green} size={18} />
            <Text style={styles.sectionTitle}>Live center</Text>
          </View>
          <Text style={styles.muted}>{data.liveNow.summary}</Text>
          <Pressable style={styles.secondaryAction} onPress={() => router.push("/live")}>
            <Text style={styles.secondaryActionText}>Open live sources</Text>
          </Pressable>
        </Panel>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.lg
  },
  heroHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  heroTitleBlock: {
    flex: 1,
    gap: spacing.xs
  },
  kicker: {
    ...typography.small,
    color: colors.blue
  },
  heroTitle: {
    ...typography.h1,
    color: colors.text
  },
  heroDate: {
    fontSize: 42,
    fontWeight: "700",
    lineHeight: 48,
    color: colors.text
  },
  heroSummary: {
    ...typography.body,
    color: colors.textMuted
  },
  primaryAction: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 44
  },
  primaryActionText: {
    ...typography.small,
    color: colors.background
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text
  },
  largeValue: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
    color: colors.text
  },
  muted: {
    ...typography.body,
    color: colors.textMuted
  },
  featured: {
    alignItems: "center",
    flexDirection: "row"
  },
  featuredBody: {
    flex: 1,
    gap: spacing.sm
  },
  mediaPanel: {
    padding: 0,
    overflow: "hidden"
  },
  media: {
    height: 150,
    width: "100%"
  },
  secondaryAction: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 42,
    justifyContent: "center"
  },
  secondaryActionText: {
    ...typography.small,
    color: colors.text
  }
});
