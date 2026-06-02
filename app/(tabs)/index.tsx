import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { ArrowRight, CalendarClock, Rocket } from "lucide-react-native";
import { AppHeader } from "@/components/AppHeader";
import { MetricTile } from "@/components/MetricTile";
import { Panel } from "@/components/Panel";
import { Screen } from "@/components/Screen";
import { StatusPill } from "@/components/StatusPill";
import { getDashboardData } from "@/lib/dataClient";
import { useTranslation } from "@/lib/i18n";
import { colors, spacing, typography } from "@/lib/theme";

const MOON_BANNER_URL = "https://images-assets.nasa.gov/image/art002e009287/art002e009287~large.jpg";

export default function DashboardScreen() {
  const { t } = useTranslation();
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
      <AppHeader title={t("dashboard.title")} />

      <View style={styles.brandFrame}>
        <View style={styles.brandBanner}>
          <Image source={{ uri: MOON_BANNER_URL }} style={styles.brandImage} contentFit="cover" transition={250} />
          <View style={styles.brandShade} />
          <View style={styles.brandContent}>
            <Text style={styles.brandKicker}>{t("dashboard.kicker")}</Text>
            <Text style={styles.brandTitle}>Artemis Moon Base</Text>
            <Text style={styles.brandCopy}>{t("dashboard.copy")}</Text>
          </View>
        </View>
      </View>

      <Panel elevated style={styles.hero}>
        <Image source={{ uri: data.highlightedEquipment?.imageUrl }} style={styles.heroImage} contentFit="cover" transition={250} />
        <View style={styles.heroShade} />
        <View style={styles.heroTopline} />
        <View style={styles.heroHeader}>
          <View style={styles.heroTitleBlock}>
            <Text style={styles.kicker}>{t("dashboard.nextEvent")}</Text>
            <Text style={styles.heroTitle}>{data.nextEvent?.title ?? t("dashboard.scheduleWatch")}</Text>
          </View>
          {data.nextEvent ? <StatusPill status={data.nextEvent.status} /> : null}
        </View>
        <View style={styles.heroDateRow}>
          <Text style={styles.heroDate}>{data.nextEvent?.dateLabel ?? "TBD"}</Text>
          <View style={styles.missionBadge}>
            <Text style={styles.missionBadgeText}>NASA / LL2</Text>
          </View>
        </View>
        <Text style={styles.heroSummary}>{data.nextEvent?.summary ?? t("dashboard.waiting")}</Text>
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={styles.statLabel}>{t("dashboard.program")}</Text>
            <Text style={styles.statValue}>Artemis</Text>
          </View>
          <View style={styles.heroStat}>
            <Text style={styles.statLabel}>{t("dashboard.mode")}</Text>
            <Text style={styles.statValue}>{t("dashboard.roadmap")}</Text>
          </View>
          <View style={styles.heroStat}>
            <Text style={styles.statLabel}>{t("dashboard.source")}</Text>
            <Text style={styles.statValue}>NASA</Text>
          </View>
        </View>
        <Pressable style={styles.primaryAction} onPress={() => router.push("/roadmap")}>
          <CalendarClock color={colors.background} size={16} />
          <Text style={styles.primaryActionText}>{t("dashboard.openRoadmap")}</Text>
        </Pressable>
      </Panel>

      <View style={styles.metricsGrid}>
        {data.metrics.map((metric) => (
          <MetricTile
            key={metric.label}
            metric={{
              ...metric,
              label:
                metric.label === "Programs"
                  ? t("dashboard.metricPrograms")
                  : metric.label === "Tracked missions"
                    ? t("dashboard.metricTrackedMissions")
                    : metric.label === "Equipment"
                      ? t("dashboard.metricEquipment")
                      : metric.label
            }}
          />
        ))}
      </View>

      <Panel>
        <View style={styles.sectionHeader}>
          <Rocket color={colors.blue} size={18} />
          <Text style={styles.sectionTitle}>{t("dashboard.launchTracking")}</Text>
        </View>
        <Text style={styles.largeValue}>{data.nextLaunch?.dateLabel ?? t("dashboard.trackedByLl2")}</Text>
        <Text style={styles.muted}>{data.nextLaunch?.title ?? t("dashboard.ll2Sync")}</Text>
      </Panel>

      {data.highlightedMission ? (
        <Pressable onPress={() => router.push({ pathname: "/mission/[id]", params: { id: data.highlightedMission!.id } })}>
          <Panel style={styles.featured}>
            <View style={styles.featuredAccent} />
            <View style={styles.featuredBody}>
              <Text style={styles.kicker}>{t("dashboard.missionBrief")}</Text>
              <Text style={styles.sectionTitle}>{data.highlightedMission.title}</Text>
              <Text numberOfLines={3} style={styles.muted}>
                {data.highlightedMission.summary}
              </Text>
            </View>
            <ArrowRight color={colors.textMuted} size={20} />
          </Panel>
        </Pressable>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  brandFrame: {
    marginHorizontal: -spacing.lg,
    marginTop: -spacing.sm
  },
  brandBanner: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    minHeight: 188,
    overflow: "hidden",
    position: "relative"
  },
  brandImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.82
  },
  brandShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3, 5, 10, 0.36)"
  },
  brandContent: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    paddingTop: spacing.xl
  },
  brandKicker: {
    ...typography.small,
    color: colors.blue,
    textTransform: "uppercase"
  },
  brandTitle: {
    fontFamily: typography.title.fontFamily,
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 39,
    color: colors.text
  },
  brandCopy: {
    ...typography.body,
    color: colors.textMuted,
    maxWidth: 310
  },
  hero: {
    gap: spacing.lg,
    minHeight: 430,
    overflow: "hidden",
    paddingTop: 22
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.32
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3, 5, 10, 0.58)"
  },
  heroTopline: {
    backgroundColor: colors.blue,
    height: 2,
    left: 0,
    opacity: 0.9,
    position: "absolute",
    right: 0,
    top: 0
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
    color: colors.blue,
    textTransform: "uppercase"
  },
  heroTitle: {
    fontFamily: typography.title.fontFamily,
    fontSize: 27,
    fontWeight: "800",
    lineHeight: 32,
    color: colors.text
  },
  heroDateRow: {
    alignItems: "flex-start",
    gap: spacing.md
  },
  heroDate: {
    fontSize: 44,
    fontWeight: "800",
    lineHeight: 48,
    color: colors.text
  },
  missionBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 210, 122, 0.14)",
    borderColor: "rgba(255, 210, 122, 0.32)",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  missionBadgeText: {
    ...typography.small,
    color: colors.gold
  },
  heroSummary: {
    ...typography.body,
    color: colors.textMuted
  },
  heroStats: {
    borderColor: colors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    overflow: "hidden"
  },
  heroStat: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRightColor: colors.borderSoft,
    borderRightWidth: 1,
    flex: 1,
    gap: 2,
    minHeight: 60,
    padding: spacing.sm
  },
  statLabel: {
    ...typography.small,
    color: colors.textDim
  },
  statValue: {
    ...typography.small,
    color: colors.text
  },
  primaryAction: {
    alignItems: "center",
    backgroundColor: colors.blue,
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
    flexDirection: "row",
    overflow: "hidden"
  },
  featuredAccent: {
    backgroundColor: colors.magenta,
    bottom: 0,
    left: 0,
    opacity: 0.82,
    position: "absolute",
    top: 0,
    width: 3
  },
  featuredBody: {
    flex: 1,
    gap: spacing.sm
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
