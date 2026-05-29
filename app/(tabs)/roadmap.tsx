import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { SegmentedFilter } from "@/components/SegmentedFilter";
import { TimelineCard } from "@/components/TimelineCard";
import { listEquipment, listMissionEvents, listMissions } from "@/lib/dataClient";
import { buildTimelineItems, filterTimelineItems, sortTimelineItems } from "@/lib/timeline";
import { colors, radius, spacing, typography } from "@/lib/theme";
import type { EquipmentCategory, MissionStatus, ProgramKey } from "@/lib/types";
import { useRoadmapFilters } from "@/store/useRoadmapFilters";

const programOptions: Array<{ label: string; value: ProgramKey | "all" }> = [
  { label: "All", value: "all" },
  { label: "Artemis", value: "artemis" },
  { label: "Moon Base", value: "moon-base" },
  { label: "CLPS", value: "clps" },
  { label: "Gateway", value: "gateway" },
  { label: "Surface", value: "surface-systems" }
];

const statusOptions: Array<{ label: string; value: MissionStatus | "all" }> = [
  { label: "Any status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Watch", value: "watch" },
  { label: "Planned", value: "planned" },
  { label: "In dev", value: "in-development" }
];

const equipmentOptions: Array<{ label: string; value: EquipmentCategory | "all" }> = [
  { label: "All systems", value: "all" },
  { label: "Launch", value: "launch" },
  { label: "Landers", value: "lander" },
  { label: "Rovers", value: "rover" },
  { label: "Station", value: "station" },
  { label: "Power", value: "power" }
];

export default function RoadmapScreen() {
  const { filters, setFilter } = useRoadmapFilters();
  const { data, isLoading } = useQuery({
    queryKey: ["roadmap"],
    queryFn: async () => {
      const [allMissions, allEvents, allEquipment] = await Promise.all([listMissions(), listMissionEvents(), listEquipment()]);
      return { allMissions, allEvents, allEquipment };
    }
  });

  const items = useMemo(() => {
    if (!data) {
      return [];
    }

    return filterTimelineItems(
      sortTimelineItems(buildTimelineItems(data.allMissions, data.allEvents, data.allEquipment)),
      filters
    );
  }, [data, filters]);

  return (
    <Screen>
      <AppHeader title="Lunar Roadmap" />

      <View style={styles.filterBlock}>
        <SegmentedFilter options={programOptions} value={filters.program} onChange={(value) => setFilter("program", value)} />
        <SegmentedFilter options={statusOptions} value={filters.status} onChange={(value) => setFilter("status", value)} />
        <SegmentedFilter
          options={equipmentOptions}
          value={filters.equipmentCategory}
          onChange={(value) => setFilter("equipmentCategory", value)}
        />
        <TextInput
          value={filters.query}
          onChangeText={(value) => setFilter("query", value)}
          placeholder="Search missions, equipment, phases"
          placeholderTextColor={colors.textDim}
          style={styles.search}
        />
      </View>

      <Text style={styles.count}>{items.length} roadmap items</Text>

      {isLoading ? <ActivityIndicator color={colors.blue} /> : null}
      {!isLoading && items.length === 0 ? (
        <EmptyState title="No roadmap matches" message="Adjust filters to widen the lunar mission view." />
      ) : null}
      {items.map((item) => (
        <TimelineCard key={item.mission.id} item={item} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  filterBlock: {
    gap: spacing.sm
  },
  search: {
    ...typography.body,
    backgroundColor: colors.panel,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    color: colors.text,
    minHeight: 44,
    paddingHorizontal: spacing.md
  },
  count: {
    ...typography.small,
    color: colors.textDim
  }
});
