import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { CalendarClock, ExternalLink, Newspaper, Rocket } from "lucide-react-native";
import { AppHeader } from "@/components/AppHeader";
import { Panel } from "@/components/Panel";
import { Screen } from "@/components/Screen";
import { StatusPill } from "@/components/StatusPill";
import { getDashboardData } from "@/lib/dataClient";
import { useTranslation } from "@/lib/i18n";
import { formatScheduleDisplay } from "@/lib/schedule";
import { colors, spacing, typography } from "@/lib/theme";

const MOON_BANNER_URL = "https://images-assets.nasa.gov/image/art002e009287/art002e009287~large.jpg";

const formatNewsDate = (publishedAt: string | undefined, locale: string): string => {
  if (!publishedAt) {
    return "";
  }

  const parsed = new Date(publishedAt);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    timeZone: "UTC"
  }).format(parsed);
};

export default function DashboardScreen() {
  const { language, t } = useTranslation();
  const { data, isLoading } = useQuery({ queryKey: ["dashboard", language], queryFn: () => getDashboardData(language) });
  const nextEventSchedule = data?.nextEvent ? formatScheduleDisplay(data.nextEvent, undefined, language) : undefined;
  const nextLaunchSchedule = data?.nextLaunch ? formatScheduleDisplay(data.nextLaunch, undefined, language) : undefined;
  const newsLocale = language === "hu" ? "hu-HU" : "en-US";

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
          <Text style={styles.heroDate}>{nextEventSchedule?.primary ?? "TBD"}</Text>
        </View>
        <Text style={styles.heroSummary}>{data.nextEvent?.summary ?? t("dashboard.waiting")}</Text>
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={styles.statLabel}>{t("dashboard.program")}</Text>
            <Text style={styles.statValue}>{data.nextEventProgramLabel ?? "NASA"}</Text>
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

      <Panel>
        <View style={styles.sectionHeader}>
          <Rocket color={colors.blue} size={18} />
          <Text style={styles.sectionTitle}>{t("dashboard.launchTracking")}</Text>
        </View>
        <Text style={styles.largeValue}>{nextLaunchSchedule?.primary ?? t("dashboard.trackedLaunch")}</Text>
        <Text style={styles.muted}>{data.nextLaunch?.title ?? t("dashboard.ll2Sync")}</Text>
      </Panel>

      {data.latestNews.length > 0 ? (
        <Panel style={styles.newsPanel}>
          <View style={styles.sectionHeader}>
            <Newspaper color={colors.gold} size={18} />
            <Text style={styles.sectionTitle}>{t("dashboard.latestNews")}</Text>
          </View>
          <View style={styles.newsList}>
            {data.latestNews.map((item) => (
              <Pressable key={item.id} style={styles.newsItem} onPress={() => Linking.openURL(item.url)}>
                <View style={styles.newsBody}>
                  <View style={styles.newsMetaRow}>
                    <Text style={styles.newsDate}>{formatNewsDate(item.publishedAt, newsLocale)}</Text>
                    <Text style={styles.newsSource}>NASA</Text>
                  </View>
                  <Text numberOfLines={2} style={styles.newsTitle}>
                    {item.title}
                  </Text>
                  <Text numberOfLines={2} style={styles.newsSummary}>
                    {item.summary}
                  </Text>
                </View>
                <View style={styles.newsAction}>
                  <ExternalLink color={colors.textMuted} size={15} />
                </View>
              </Pressable>
            ))}
          </View>
        </Panel>
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
    overflow: "hidden",
    paddingBottom: spacing.lg,
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
    alignItems: "flex-start"
  },
  heroDate: {
    fontSize: 44,
    fontWeight: "800",
    lineHeight: 48,
    color: colors.text
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
  newsPanel: {
    gap: spacing.md
  },
  newsList: {
    gap: spacing.sm
  },
  newsItem: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.035)",
    borderColor: colors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    minHeight: 96,
    padding: spacing.md
  },
  newsBody: {
    flex: 1,
    gap: 5
  },
  newsMetaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm
  },
  newsDate: {
    ...typography.small,
    color: colors.gold,
    textTransform: "uppercase"
  },
  newsSource: {
    ...typography.small,
    color: colors.textDim,
    textTransform: "uppercase"
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 19,
    color: colors.text
  },
  newsSummary: {
    ...typography.small,
    color: colors.textMuted,
    lineHeight: 17
  },
  newsAction: {
    alignItems: "center",
    borderColor: colors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    width: 34
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
