import { useMemo } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { ArrowLeft, Link as LinkIcon } from "lucide-react-native";
import { MediaImage } from "@/components/MediaImage";
import { Panel } from "@/components/Panel";
import { Screen } from "@/components/Screen";
import { SourceLinks } from "@/components/SourceLinks";
import { StatusPill } from "@/components/StatusPill";
import { listEquipment, listMissionEvents, listMissions } from "@/lib/dataClient";
import { colors, spacing, typography } from "@/lib/theme";

export default function MissionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["mission-detail", id],
    queryFn: async () => {
      const [allMissions, allEvents, allEquipment] = await Promise.all([listMissions(), listMissionEvents(), listEquipment()]);
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
        <Pressable style={styles.back} onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={18} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.title}>Mission not found</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <ArrowLeft color={colors.text} size={18} />
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <Panel style={styles.hero}>
        <MediaImage url={mission.heroImageUrl} style={styles.heroImage} />
        <View style={styles.heroBody}>
          <Text style={styles.kicker}>{mission.subtitle}</Text>
          <Text style={styles.title}>{mission.title}</Text>
          <View style={styles.metaRow}>
            <StatusPill status={mission.status} />
            <Text style={styles.date}>{mission.dateLabel}</Text>
          </View>
          <Text style={styles.summary}>{mission.summary}</Text>
        </View>
      </Panel>

      <Panel>
        <Text style={styles.sectionTitle}>Objectives</Text>
        {mission.objectives.map((objective) => (
          <View key={objective} style={styles.bulletRow}>
            <View style={styles.bullet} />
            <Text style={styles.summary}>{objective}</Text>
          </View>
        ))}
      </Panel>

      <Panel>
        <Text style={styles.sectionTitle}>Schedule</Text>
        {events.map((event) => (
          <View key={event.id} style={styles.eventRow}>
            <Text style={styles.date}>{event.dateLabel}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.summary}>{event.summary}</Text>
          </View>
        ))}
      </Panel>

      <Panel>
        <Text style={styles.sectionTitle}>Linked equipment</Text>
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
        <Text style={styles.sectionTitle}>Sources</Text>
        <SourceLinks sources={mission.sourceUrls} />
      </Panel>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: spacing.sm
  },
  backText: {
    ...typography.small,
    color: colors.text
  },
  hero: {
    padding: 0,
    overflow: "hidden"
  },
  heroImage: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 170,
    width: "100%"
  },
  heroBody: {
    gap: spacing.md,
    padding: spacing.lg
  },
  kicker: {
    ...typography.small,
    color: colors.blue
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
