import { useMemo, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { Link as LinkIcon, Maximize2 } from "lucide-react-native";
import { BackButton } from "@/components/BackButton";
import { ImageViewerModal } from "@/components/ImageViewerModal";
import { MediaImage } from "@/components/MediaImage";
import { MissionClassificationBadge } from "@/components/MissionClassificationBadge";
import { Panel } from "@/components/Panel";
import { Screen } from "@/components/Screen";
import { SourceLinks } from "@/components/SourceLinks";
import { StatusPill } from "@/components/StatusPill";
import { listEquipment, listMissionEvents, listMissions } from "@/lib/dataClient";
import { useTranslation } from "@/lib/i18n";
import { formatScheduleDisplay } from "@/lib/schedule";
import { colors, spacing, typography } from "@/lib/theme";

export default function MissionDetailScreen() {
  const { language, t } = useTranslation();
  const [imageOpen, setImageOpen] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["mission-detail", id, language],
    queryFn: async () => {
      const [allMissions, allEvents, allEquipment] = await Promise.all([
        listMissions(language),
        listMissionEvents(language),
        listEquipment(language)
      ]);
      return { allMissions, allEvents, allEquipment };
    }
  });

  const mission = data?.allMissions.find((item) => item.id === id);
  const events = data?.allEvents.filter((event) => event.missionId === id) ?? [];
  const relatedEquipment = useMemo(
    () => data?.allEquipment.filter((item) => mission?.equipmentIds.includes(item.id) || item.relatedMissionIds.includes(id)) ?? [],
    [data?.allEquipment, id, mission?.equipmentIds]
  );

  if (isLoading) {
    return (
      <Screen>
        <ActivityIndicator color={colors.blue} />
      </Screen>
    );
  }

  if (!mission) {
    return (
      <Screen>
        <BackButton fallbackHref="/roadmap" />
        <Text style={styles.title}>{t("detail.missionNotFound")}</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <BackButton fallbackHref="/roadmap" />

      <Panel style={styles.hero}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("detail.openImage")}
          disabled={!mission.heroImageUrl}
          style={styles.heroImageButton}
          onPress={() => setImageOpen(true)}
        >
          <MediaImage url={mission.heroImageUrl} style={styles.heroImage} />
          {mission.heroImageUrl ? (
            <View style={styles.imageAction}>
              <Maximize2 color={colors.text} size={16} />
            </View>
          ) : null}
        </Pressable>
        <View style={styles.heroBody}>
          <View style={styles.kickerRow}>
            <MissionClassificationBadge label={mission.classificationLabel} />
            <Text style={styles.kicker}>{mission.subtitle}</Text>
          </View>
          <Text style={styles.title}>{mission.title}</Text>
          <View style={styles.metaRow}>
            <StatusPill status={mission.status} />
            <Text style={styles.date}>{formatScheduleDisplay(mission, undefined, language).primary}</Text>
          </View>
          <Text style={styles.summary}>{mission.summary}</Text>
        </View>
      </Panel>

      <Panel>
        <Text style={styles.sectionTitle}>{t("detail.objectives")}</Text>
        {mission.objectives.map((objective) => (
          <View key={objective} style={styles.bulletRow}>
            <View style={styles.bullet} />
            <Text style={styles.summary}>{objective}</Text>
          </View>
        ))}
      </Panel>

      <Panel>
        <Text style={styles.sectionTitle}>{t("detail.schedule")}</Text>
        {events.map((event) => (
          <View key={event.id} style={styles.eventRow}>
            <Text style={styles.date}>{formatScheduleDisplay(event, undefined, language).primary}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.summary}>{event.summary}</Text>
          </View>
        ))}
      </Panel>

      <Panel>
        <Text style={styles.sectionTitle}>{t("detail.linkedEquipment")}</Text>
        <View style={styles.chipGrid}>
          {relatedEquipment.map((item) => (
            <Pressable
              key={item.id}
              style={styles.chip}
              onPress={() => router.push({ pathname: "/equipment/[id]", params: { id: item.id } })}
            >
              <LinkIcon color={colors.blue} size={14} />
              <Text numberOfLines={1} style={styles.chipText}>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </Panel>

      <Panel>
        <Text style={styles.sectionTitle}>{t("detail.sources")}</Text>
        <SourceLinks sources={mission.sourceUrls} />
      </Panel>

      <ImageViewerModal
        imageUrl={mission.heroImageUrl}
        subtitle={mission.subtitle}
        title={mission.title}
        visible={imageOpen}
        onClose={() => setImageOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    padding: 0,
    overflow: "hidden"
  },
  heroImageButton: {
    position: "relative"
  },
  heroImage: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 170,
    width: "100%"
  },
  imageAction: {
    alignItems: "center",
    backgroundColor: "rgba(3, 5, 10, 0.72)",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    bottom: spacing.md,
    height: 34,
    justifyContent: "center",
    position: "absolute",
    right: spacing.md,
    width: 34
  },
  heroBody: {
    gap: spacing.md,
    padding: spacing.lg
  },
  kicker: {
    ...typography.small,
    color: colors.blue
  },
  kickerRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  title: {
    ...typography.h1,
    color: colors.text
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  date: {
    ...typography.small,
    color: colors.gold
  },
  summary: {
    ...typography.body,
    color: colors.textMuted
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text
  },
  bulletRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.sm
  },
  bullet: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    height: 7,
    marginTop: 8,
    width: 7
  },
  eventRow: {
    borderLeftColor: colors.border,
    borderLeftWidth: 2,
    gap: spacing.xs,
    paddingLeft: spacing.md
  },
  eventTitle: {
    ...typography.h2,
    color: colors.text
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  chip: {
    alignItems: "center",
    backgroundColor: colors.backgroundSoft,
    borderColor: colors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    maxWidth: "100%",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm
  },
  chipText: {
    ...typography.small,
    color: colors.text
  }
});
