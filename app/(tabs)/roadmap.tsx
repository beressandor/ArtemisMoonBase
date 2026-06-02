import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import { AppHeader } from "@/components/AppHeader";
import { CompactFilterBar } from "@/components/CompactFilterBar";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { TimelineCard } from "@/components/TimelineCard";
import { listEquipment, listMissionEvents, listMissions, listPhases } from "@/lib/dataClient";
import { useTranslation } from "@/lib/i18n";
import { formatScheduleDisplay, getTimelineSchedule, type ScheduleDisplay } from "@/lib/schedule";
import { buildTimelineItems, filterTimelineItems, sortTimelineItems } from "@/lib/timeline";
import { colors, radius, spacing, typography } from "@/lib/theme";
import type { EquipmentCategory, MissionStatus, Phase, TimelineItem } from "@/lib/types";
import { useRoadmapFilters } from "@/store/useRoadmapFilters";

type RoadmapView = "artemis" | "moon-base";

type ScheduleMarker = {
  id: string;
  title: string;
  meta: string;
  schedule: ScheduleDisplay;
};

const legacyMoonBaseOverviewIds = new Set(["moon-base-phase-one", "clps-cargo-cadence", "phase-two-sustained-stays", "phase-three-lunar-base"]);

export default function RoadmapScreen() {
  const { t } = useTranslation();
  const { filters, setFilter, reset } = useRoadmapFilters();
  const [activeView, setActiveView] = useState<RoadmapView>("artemis");
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({ "phase-one": true });
  const viewOptions = useMemo<Array<{ label: string; value: RoadmapView; summary: string }>>(
    () => [
      { label: t("roadmap.artemis"), value: "artemis", summary: t("roadmap.artemisSummary") },
      { label: t("roadmap.moonBase"), value: "moon-base", summary: t("roadmap.moonBaseSummary") }
    ],
    [t]
  );
  const statusOptions = useMemo<Array<{ label: string; value: MissionStatus | "all" }>>(
    () => [
      { label: t("filters.anyStatus"), value: "all" },
      { label: t("status.active"), value: "active" },
      { label: t("status.watch"), value: "watch" },
      { label: t("status.planned"), value: "planned" },
      { label: t("status.in-development"), value: "in-development" }
    ],
    [t]
  );
  const equipmentOptions = useMemo<Array<{ label: string; value: EquipmentCategory | "all" }>>(
    () => [
      { label: t("filters.allSystems"), value: "all" },
      { label: t("category.launch"), value: "launch" },
      { label: t("category.lander"), value: "lander" },
      { label: t("category.rover"), value: "rover" },
      { label: t("category.station"), value: "station" },
      { label: t("category.power"), value: "power" }
    ],
    [t]
  );
  const { data, isLoading } = useQuery({
    queryKey: ["roadmap"],
    queryFn: async () => {
      const [allMissions, allEvents, allEquipment, allPhases] = await Promise.all([
        listMissions(),
        listMissionEvents(),
        listEquipment(),
        listPhases()
      ]);
      return { allMissions, allEvents, allEquipment, allPhases };
    }
  });

  const allTimelineItems = useMemo(() => {
    if (!data) {
      return [];
    }

    return sortTimelineItems(buildTimelineItems(data.allMissions, data.allEvents, data.allEquipment, data.allPhases));
  }, [data]);

  const filteredItems = useMemo(
    () => filterTimelineItems(allTimelineItems, { ...filters, program: "all", phaseId: "all" }),
    [allTimelineItems, filters]
  );

  const artemisItems = useMemo(
    () => filteredItems.filter((item) => item.mission.programIds.includes("artemis")),
    [filteredItems]
  );

  const moonBaseItems = useMemo(
    () =>
      filteredItems.filter((item) =>
        item.mission.programIds.includes("moon-base") && !legacyMoonBaseOverviewIds.has(item.mission.id)
      ),
    [filteredItems]
  );

  const allArtemisItems = useMemo(
    () => allTimelineItems.filter((item) => item.mission.programIds.includes("artemis")),
    [allTimelineItems]
  );

  const allMoonBaseItems = useMemo(
    () =>
      allTimelineItems.filter((item) =>
        item.mission.programIds.includes("moon-base") && !legacyMoonBaseOverviewIds.has(item.mission.id)
      ),
    [allTimelineItems]
  );

  const phaseGroups = useMemo(() => {
    const moonBasePhases = [...(data?.allPhases ?? [])]
      .filter((phase) => phase.programId === "moon-base")
      .sort((a, b) => a.startYear - b.startYear);

    return moonBasePhases.map((phase) => ({
      phase,
      items: moonBaseItems.filter((item) => item.mission.phaseId === phase.id)
    }));
  }, [data?.allPhases, moonBaseItems]);

  const scheduleMarkers = useMemo<ScheduleMarker[]>(() => {
    if (activeView === "artemis") {
      return artemisItems.slice(0, 7).map((item) => ({
        id: item.mission.id,
        title: item.mission.title,
        meta: item.mission.subtitle,
        schedule: getTimelineSchedule(item)
      }));
    }

    return phaseGroups.map(({ phase, items }) => ({
      id: phase.id,
      title: phase.title,
      meta: `${items.length} roadmap items`,
      schedule: formatScheduleDisplay({ dateLabel: phase.dateLabel, datePrecision: "range" })
    }));
  }, [activeView, artemisItems, phaseGroups]);

  const statusSummary = statusOptions.find((option) => option.value === filters.status)?.label ?? "Any status";
  const systemSummary = equipmentOptions.find((option) => option.value === filters.equipmentCategory)?.label ?? "All systems";
  const visibleCount = activeView === "artemis" ? artemisItems.length : moonBaseItems.length;
  const availableCount = activeView === "artemis" ? allArtemisItems.length : allMoonBaseItems.length;
  const hasActiveFilters = filters.status !== "all" || filters.equipmentCategory !== "all" || filters.query.trim().length > 0;
  const briefTitle =
    activeView === "artemis"
      ? t("roadmap.artemisBrief")
      : t("roadmap.moonBaseBrief");

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((current) => ({
      ...current,
      [phaseId]: !(current[phaseId] ?? phaseId === "phase-one")
    }));
  };

  return (
    <Screen>
      <AppHeader title={t("roadmap.title")} />

      <View style={styles.viewTabs}>
        {viewOptions.map((option) => {
          const selected = option.value === activeView;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              style={[styles.viewTab, selected && styles.viewTabSelected]}
              onPress={() => setActiveView(option.value)}
            >
              <Text style={[styles.viewTabLabel, selected && styles.viewTabLabelSelected]}>{option.label}</Text>
              <Text style={[styles.viewTabSummary, selected && styles.viewTabSummarySelected]}>{option.summary}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.brief}>
        <Text style={styles.briefKicker}>
          {activeView === "artemis" ? t("roadmap.missionTimeline") : t("roadmap.phaseTimeline")}
        </Text>
        <Text style={styles.briefTitle}>{briefTitle}</Text>
      </View>

      <ScheduleStrip markers={scheduleMarkers} />

      <CompactFilterBar
        searchValue={filters.query}
        onSearchChange={(value) => setFilter("query", value)}
        searchPlaceholder={t("filters.searchMission")}
        canClear={hasActiveFilters}
        onClear={reset}
        selects={[
          {
            id: "status",
            label: t("filters.status"),
            value: filters.status,
            valueLabel: filters.status === "all" ? t("filters.anyStatus") : statusSummary,
            options: statusOptions,
            onChange: (value) => setFilter("status", value as MissionStatus | "all")
          },
          {
            id: "system",
            label: t("filters.system"),
            value: filters.equipmentCategory,
            valueLabel: filters.equipmentCategory === "all" ? t("filters.allSystems") : systemSummary,
            options: equipmentOptions,
            onChange: (value) => setFilter("equipmentCategory", value as EquipmentCategory | "all")
          }
        ]}
      />

      <Text style={styles.count}>{t("roadmap.items", { count: visibleCount })}</Text>

      {isLoading ? <ActivityIndicator color={colors.blue} /> : null}
      {!isLoading && visibleCount === 0 ? (
        <View style={styles.emptyWrap}>
          <EmptyState
            title={t("roadmap.noMatches")}
            message={
              hasActiveFilters
                ? t("roadmap.noMatchesFiltered", { count: availableCount })
                : t("roadmap.noItems")
            }
          />
          {hasActiveFilters ? (
            <Pressable accessibilityRole="button" style={styles.emptyAction} onPress={reset}>
              <Text style={styles.emptyActionText}>{t("filters.clear")}</Text>
            </Pressable>
          ) : null}
        </View>
      ) : activeView === "artemis" ? (
        artemisItems.map((item) => <TimelineCard key={item.mission.id} item={item} />)
      ) : (
        phaseGroups.map(({ phase, items }) => (
          <PhaseSection
            key={phase.id}
            phase={phase}
            items={items}
            expanded={expandedPhases[phase.id] ?? phase.id === "phase-one"}
            onToggle={() => togglePhase(phase.id)}
          />
        ))
      )}
    </Screen>
  );
}

interface ScheduleStripProps {
  markers: ScheduleMarker[];
}

function ScheduleStrip({ markers }: ScheduleStripProps) {
  const { t } = useTranslation();

  if (markers.length === 0) {
    return null;
  }

  return (
    <View style={styles.scheduleStrip}>
      <View style={styles.scheduleStripHeader}>
        <Text style={styles.scheduleStripLabel}>{t("roadmap.sequence")}</Text>
        <Text style={styles.scheduleStripCount}>{t("roadmap.markers", { count: markers.length })}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scheduleStripContent}
      >
        {markers.map((marker, index) => (
          <View key={marker.id} style={styles.scheduleMarker}>
            <View style={styles.markerTop}>
              <View style={[styles.markerNode, marker.schedule.isLive && styles.markerNodeLive]} />
              {index < markers.length - 1 ? <View style={styles.markerLine} /> : null}
            </View>
            <Text numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.78} style={styles.markerDate}>
              {marker.schedule.primary}
            </Text>
            {marker.schedule.secondary ? (
              <Text numberOfLines={1} style={styles.markerSecondary}>
                {marker.schedule.secondary}
              </Text>
            ) : null}
            <Text numberOfLines={2} style={styles.markerTitle}>
              {marker.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

interface PhaseSectionProps {
  phase: Phase;
  items: TimelineItem[];
  expanded: boolean;
  onToggle: () => void;
}

function PhaseSection({ phase, items, expanded, onToggle }: PhaseSectionProps) {
  const { t } = useTranslation();
  const HeaderIcon = expanded ? ChevronDown : ChevronRight;
  const schedule = formatScheduleDisplay({ dateLabel: phase.dateLabel, datePrecision: "range" });

  return (
    <View style={styles.phaseSection}>
      <Pressable accessibilityRole="button" accessibilityState={{ expanded }} style={styles.phaseHeader} onPress={onToggle}>
        <View style={styles.phaseDateBadge}>
          <Text numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.74} style={styles.phaseDatePrimary}>
            {schedule.primary}
          </Text>
          {schedule.secondary ? (
            <Text numberOfLines={1} style={styles.phaseDateSecondary}>
              {schedule.secondary}
            </Text>
          ) : null}
        </View>
        <View style={styles.phaseCopy}>
          <View style={styles.phaseMetaRow}>
            <Text style={styles.phaseCount}>{t("roadmap.phaseItems", { count: items.length })}</Text>
          </View>
          <Text style={styles.phaseTitle}>{phase.title}</Text>
          <Text numberOfLines={expanded ? undefined : 2} style={styles.phaseSummary}>
            {phase.summary}
          </Text>
        </View>
        <View style={styles.phaseToggle}>
          <HeaderIcon color={colors.textMuted} size={20} />
        </View>
      </Pressable>

      {expanded ? (
        <View style={styles.phaseBody}>
          <View style={styles.focusChips}>
            {phase.focus.map((item) => (
              <View key={item} style={styles.focusChip}>
                <Text style={styles.focusChipText}>{item}</Text>
              </View>
            ))}
          </View>
          {items.length > 0 ? (
            items.map((item) => <TimelineCard key={item.mission.id} item={item} />)
          ) : (
            <Text style={styles.phaseEmpty}>{t("roadmap.noPhaseMatches")}</Text>
          )}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  viewTabs: {
    backgroundColor: colors.panel,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    padding: spacing.xs
  },
  viewTab: {
    borderColor: "transparent",
    borderRadius: radius.sm,
    borderWidth: 1,
    flex: 1,
    gap: 2,
    minHeight: 52,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  viewTabSelected: {
    backgroundColor: "rgba(138, 232, 255, 0.12)",
    borderColor: "rgba(138, 232, 255, 0.32)"
  },
  viewTabLabel: {
    ...typography.h2,
    color: colors.textMuted
  },
  viewTabLabelSelected: {
    color: colors.text
  },
  viewTabSummary: {
    ...typography.small,
    color: colors.textDim
  },
  viewTabSummarySelected: {
    color: colors.blue
  },
  brief: {
    backgroundColor: colors.panelGlass,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    gap: spacing.sm,
    overflow: "hidden",
    padding: spacing.lg
  },
  briefKicker: {
    ...typography.small,
    color: colors.blue,
    textTransform: "uppercase"
  },
  briefTitle: {
    ...typography.h2,
    color: colors.text
  },
  scheduleStrip: {
    backgroundColor: "rgba(14, 20, 31, 0.72)",
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    gap: spacing.sm,
    overflow: "hidden",
    paddingVertical: spacing.md
  },
  scheduleStripHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md
  },
  scheduleStripLabel: {
    ...typography.small,
    color: colors.blue,
    textTransform: "uppercase"
  },
  scheduleStripCount: {
    ...typography.small,
    color: colors.textDim
  },
  scheduleStripContent: {
    paddingHorizontal: spacing.md,
    paddingRight: spacing.xl
  },
  scheduleMarker: {
    gap: spacing.xs,
    paddingRight: spacing.lg,
    width: 134
  },
  markerTop: {
    alignItems: "center",
    flexDirection: "row",
    height: 16
  },
  markerNode: {
    backgroundColor: colors.blue,
    borderColor: "rgba(138, 232, 255, 0.26)",
    borderRadius: 6,
    borderWidth: 2,
    height: 12,
    width: 12
  },
  markerNodeLive: {
    backgroundColor: colors.green,
    borderColor: "rgba(150, 242, 200, 0.28)"
  },
  markerLine: {
    backgroundColor: "rgba(138, 232, 255, 0.2)",
    flex: 1,
    height: 1
  },
  markerDate: {
    color: colors.text,
    fontFamily: typography.h2.fontFamily,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 21
  },
  markerSecondary: {
    ...typography.small,
    color: colors.gold,
    textTransform: "uppercase"
  },
  markerTitle: {
    ...typography.small,
    color: colors.textMuted
  },
  count: {
    ...typography.small,
    color: colors.textDim
  },
  emptyWrap: {
    alignItems: "center",
    gap: spacing.sm
  },
  emptyAction: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: radius.sm,
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: spacing.xl
  },
  emptyActionText: {
    ...typography.small,
    color: colors.background
  },
  phaseSection: {
    borderTopColor: colors.borderSoft,
    borderTopWidth: 1,
    gap: spacing.md,
    paddingTop: spacing.md
  },
  phaseHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md
  },
  phaseDateBadge: {
    alignItems: "center",
    backgroundColor: "rgba(255, 210, 122, 0.09)",
    borderColor: "rgba(255, 210, 122, 0.3)",
    borderRadius: radius.sm,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 74,
    paddingHorizontal: 6,
    paddingVertical: spacing.sm,
    width: 102
  },
  phaseDatePrimary: {
    color: colors.text,
    fontFamily: typography.h1.fontFamily,
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 22,
    textAlign: "center"
  },
  phaseDateSecondary: {
    ...typography.small,
    color: colors.gold,
    textAlign: "center",
    textTransform: "uppercase"
  },
  phaseCopy: {
    flex: 1,
    gap: spacing.xs
  },
  phaseMetaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  phaseCount: {
    ...typography.small,
    color: colors.textDim
  },
  phaseTitle: {
    ...typography.h1,
    color: colors.text
  },
  phaseSummary: {
    ...typography.body,
    color: colors.textMuted
  },
  phaseToggle: {
    alignItems: "center",
    backgroundColor: colors.panelGlass,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    width: 34
  },
  phaseBody: {
    gap: spacing.md,
    paddingBottom: spacing.sm
  },
  focusChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  focusChip: {
    backgroundColor: "rgba(255, 210, 122, 0.1)",
    borderColor: "rgba(255, 210, 122, 0.24)",
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  focusChipText: {
    ...typography.small,
    color: colors.gold
  },
  phaseEmpty: {
    ...typography.body,
    color: colors.textDim
  }
});
