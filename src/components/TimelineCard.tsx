import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronDown, ChevronRight, Rocket } from "lucide-react-native";
import { router } from "expo-router";
import { colors, spacing, typography } from "@/lib/theme";
import type { TimelineItem } from "@/lib/types";
import { Panel } from "@/components/Panel";
import { StatusPill } from "@/components/StatusPill";

interface TimelineCardProps {
  item: TimelineItem;
}

export function TimelineCard({ item }: TimelineCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { mission, phase, events, equipment } = item;

  return (
    <Panel elevated={expanded}>
      <Pressable style={styles.header} onPress={() => setExpanded((current) => !current)}>
        <View style={styles.icon}>
          <Rocket color={colors.blue} size={18} />
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.date}>{mission.dateLabel}</Text>
          <Text style={styles.title}>{mission.title}</Text>
          <Text numberOfLines={2} style={styles.subtitle}>
            {phase?.title ?? mission.subtitle} · {mission.subtitle}
          </Text>
        </View>
        {expanded ? <ChevronDown color={colors.textMuted} size={20} /> : <ChevronRight color={colors.textMuted} size={20} />}
      </Pressable>

      <View style={styles.metaRow}>
        <StatusPill status={mission.status} />
        <Text style={styles.precision}>{mission.datePrecision.toUpperCase()}</Text>
      </View>

      {expanded && (
        <View style={styles.details}>
          <Text style={styles.summary}>{mission.summary}</Text>
          <View style={styles.eventList}>
            {events.map((event) => (
              <View key={event.id} style={styles.eventRow}>
                <Text style={styles.eventDate}>{event.dateLabel}</Text>
                <Text style={styles.eventTitle}>{event.title}</Text>
              </View>
            ))}
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
            <Text style={styles.primaryText}>Open mission brief</Text>
          </Pressable>
        </View>
      )}
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
    height: 38,
    justifyContent: "center",
    width: 38
  },
  titleBlock: {
    flex: 1,
    gap: 2
  },
  date: {
    ...typography.small,
    color: colors.blue
  },
  title: {
    ...typography.h2,
    color: colors.text
  },
  subtitle: {
    ...typography.small,
    color: colors.textMuted
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  precision: {
    ...typography.small,
    color: colors.textDim
  },
  details: {
    gap: spacing.md
  },
  summary: {
    ...typography.body,
    color: colors.textMuted
  },
  eventList: {
    gap: spacing.sm
  },
  eventRow: {
    borderLeftColor: colors.border,
    borderLeftWidth: 2,
    gap: spacing.xs,
    paddingLeft: spacing.md
  },
  eventDate: {
    ...typography.small,
    color: colors.gold
  },
  eventTitle: {
    ...typography.body,
    color: colors.text
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  chip: {
    backgroundColor: colors.backgroundSoft,
    borderColor: colors.borderSoft,
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
    backgroundColor: colors.white,
    borderRadius: 8,
    minHeight: 42,
    justifyContent: "center"
  },
  primaryText: {
    ...typography.small,
    color: colors.background
  }
});
