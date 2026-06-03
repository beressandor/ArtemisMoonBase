import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { CalendarDays, ChevronDown, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import { useTranslation } from "@/lib/i18n";
import { colors, radius, spacing, typography } from "@/lib/theme";
import { getEventScheduleDisplay, getTimelineSchedule } from "@/lib/schedule";
import type { TimelineItem } from "@/lib/types";
import { MissionClassificationBadge } from "@/components/MissionClassificationBadge";
import { Panel } from "@/components/Panel";
import { StatusPill } from "@/components/StatusPill";

interface TimelineCardProps {
  item: TimelineItem;
}

export function TimelineCard({ item }: TimelineCardProps) {
  const { language, t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const { mission, phase, events, equipment } = item;
  const schedule = getTimelineSchedule(item, language);

  return (
    <Panel elevated={expanded} style={styles.card}>
      <Pressable style={styles.header} onPress={() => setExpanded((current) => !current)}>
        <View style={styles.scheduleColumn}>
          <View style={styles.timelineLine} />
          <View style={styles.dateBadge}>
            {mission.heroImageUrl ? (
              <>
                <Image source={{ uri: mission.heroImageUrl }} style={styles.dateBadgeImage} contentFit="cover" transition={180} />
                <View style={styles.dateBadgeShade} />
              </>
            ) : null}
            <Text numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.72} style={styles.datePrimary}>
              {schedule.primary}
            </Text>
            {schedule.secondary ? (
              <Text numberOfLines={1} style={styles.dateSecondary}>
                {schedule.secondary}
              </Text>
            ) : null}
          </View>
          <View style={[styles.node, schedule.isLive && styles.nodeLive]} />
        </View>

        <View style={styles.titleBlock}>
          <View style={styles.metaRow}>
            <MissionClassificationBadge label={mission.classificationLabel} />
            <StatusPill status={mission.status} />
            {schedule.caption ? (
              <View style={[styles.sourcePill, schedule.isLive && styles.sourcePillLive]}>
                <CalendarDays color={schedule.isLive ? colors.green : colors.textDim} size={13} />
                <Text style={[styles.sourceText, schedule.isLive && styles.sourceTextLive]}>{schedule.caption}</Text>
              </View>
            ) : null}
          </View>
          <Text numberOfLines={2} style={styles.title}>
            {mission.title}
          </Text>
          <Text numberOfLines={2} style={styles.subtitle}>
            {phase?.title ?? mission.subtitle} / {mission.subtitle}
          </Text>
        </View>

        {expanded ? <ChevronDown color={colors.textMuted} size={20} /> : <ChevronRight color={colors.textMuted} size={20} />}
      </Pressable>

      {expanded && (
        <View style={styles.details}>
          <Text style={styles.summary}>{mission.summary}</Text>
          <View style={styles.eventList}>
            {events.map((event) => {
              const eventSchedule = getEventScheduleDisplay(event, language);

              return (
                <View key={event.id} style={styles.eventRow}>
                  <View style={styles.eventDateBox}>
                    <Text numberOfLines={1} style={styles.eventDatePrimary}>
                      {eventSchedule.primary}
                    </Text>
                    {eventSchedule.secondary ? (
                      <Text numberOfLines={1} style={styles.eventDateSecondary}>
                        {eventSchedule.secondary}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.eventCopy}>
                    <Text numberOfLines={2} style={styles.eventTitle}>
                      {event.title}
                    </Text>
                    {eventSchedule.caption ? (
                      <Text numberOfLines={1} style={styles.eventCaption}>
                        {eventSchedule.caption}
                      </Text>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.chips}>
            {equipment.slice(0, 4).map((item) => (
              <Pressable
                key={item.id}
                style={styles.chip}
                onPress={() => router.push({ pathname: "/equipment/[id]", params: { id: item.id } })}
              >
                <Text numberOfLines={1} style={styles.chipText}>
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            style={styles.primaryAction}
            onPress={() => router.push({ pathname: "/mission/[id]", params: { id: mission.id } })}
          >
            <Text style={styles.primaryText}>{t("timeline.openBrief")}</Text>
          </Pressable>
        </View>
      )}
    </Panel>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden"
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md
  },
  scheduleColumn: {
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: 86,
    width: 102
  },
  timelineLine: {
    backgroundColor: "rgba(217, 212, 199, 0.14)",
    bottom: -spacing.lg,
    position: "absolute",
    top: -spacing.lg,
    width: 1
  },
  dateBadge: {
    alignItems: "center",
    backgroundColor: "rgba(217, 212, 199, 0.08)",
    borderColor: "rgba(217, 212, 199, 0.24)",
    borderRadius: radius.sm,
    borderWidth: 1,
    gap: 2,
    justifyContent: "center",
    minHeight: 70,
    overflow: "hidden",
    paddingHorizontal: 6,
    paddingVertical: spacing.sm,
    width: 102
  },
  dateBadgeImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.52
  },
  dateBadgeShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.54)"
  },
  datePrimary: {
    color: colors.text,
    fontFamily: typography.h1.fontFamily,
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 22,
    position: "relative",
    textAlign: "center"
  },
  dateSecondary: {
    ...typography.small,
    color: colors.gold,
    position: "relative",
    textAlign: "center",
    textTransform: "uppercase"
  },
  node: {
    backgroundColor: colors.blue,
    borderColor: colors.background,
    borderRadius: 6,
    borderWidth: 2,
    height: 12,
    marginTop: spacing.sm,
    width: 12
  },
  nodeLive: {
    backgroundColor: colors.green
  },
  titleBlock: {
    flex: 1,
    gap: spacing.xs,
    paddingTop: 1
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  sourcePill: {
    alignItems: "center",
    backgroundColor: colors.panelGlass,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    maxWidth: "100%",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  sourcePillLive: {
    backgroundColor: "rgba(150, 242, 200, 0.08)",
    borderColor: "rgba(150, 242, 200, 0.28)"
  },
  sourceText: {
    ...typography.small,
    color: colors.textMuted
  },
  sourceTextLive: {
    color: colors.green
  },
  title: {
    ...typography.h2,
    color: colors.text
  },
  subtitle: {
    ...typography.small,
    color: colors.textDim
  },
  details: {
    gap: spacing.md,
    paddingLeft: 114
  },
  summary: {
    ...typography.body,
    color: colors.textMuted
  },
  eventList: {
    gap: spacing.sm
  },
  eventRow: {
    alignItems: "center",
    borderTopColor: colors.borderSoft,
    borderTopWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    paddingVertical: spacing.sm
  },
  eventDateBox: {
    alignItems: "center",
    backgroundColor: colors.panelGlass,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    minHeight: 46,
    justifyContent: "center",
    paddingHorizontal: 6,
    width: 86
  },
  eventDatePrimary: {
    ...typography.small,
    color: colors.text,
    textAlign: "center"
  },
  eventDateSecondary: {
    ...typography.small,
    color: colors.gold,
    textAlign: "center"
  },
  eventCopy: {
    flex: 1,
    gap: 2
  },
  eventTitle: {
    ...typography.body,
    color: colors.text
  },
  eventCaption: {
    ...typography.small,
    color: colors.textDim
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  chip: {
    backgroundColor: "rgba(175, 167, 154, 0.1)",
    borderColor: "rgba(175, 167, 154, 0.22)",
    borderRadius: 8,
    borderWidth: 1,
    maxWidth: "100%",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  chipText: {
    ...typography.small,
    color: colors.text
  },
  primaryAction: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: 8,
    minHeight: 42,
    justifyContent: "center"
  },
  primaryText: {
    ...typography.small,
    color: colors.background
  }
});
