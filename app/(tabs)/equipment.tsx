import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { EmptyState } from "@/components/EmptyState";
import { EquipmentCard } from "@/components/EquipmentCard";
import { Screen } from "@/components/Screen";
import { SegmentedFilter } from "@/components/SegmentedFilter";
import { listEquipment } from "@/lib/dataClient";
import { colors, radius, spacing, typography } from "@/lib/theme";
import type { EquipmentCategory } from "@/lib/types";

const categoryOptions: Array<{ label: string; value: EquipmentCategory | "all" }> = [
  { label: "All", value: "all" },
  { label: "Launch", value: "launch" },
  { label: "Crew", value: "crew" },
  { label: "Landers", value: "lander" },
  { label: "Rovers", value: "rover" },
  { label: "Station", value: "station" },
  { label: "Power", value: "power" },
  { label: "Habitats", value: "habitat" }
];

export default function EquipmentScreen() {
  const [category, setCategory] = useState<EquipmentCategory | "all">("all");
  const [query, setQuery] = useState("");
  const { data = [], isLoading } = useQuery({ queryKey: ["equipment"], queryFn: listEquipment });

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return data.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery = !value || `${item.name} ${item.summary} ${item.owner}`.toLowerCase().includes(value);
      return matchesCategory && matchesQuery;
    });
  }, [category, data, query]);

  return (
    <Screen>
      <AppHeader title="Equipment Encyclopedia" />
      <SegmentedFilter options={categoryOptions} value={category} onChange={setCategory} />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search vehicles, rovers, landers"
        placeholderTextColor={colors.textDim}
        style={styles.search}
      />
      {isLoading ? <ActivityIndicator color={colors.blue} /> : null}
      {!isLoading && filtered.length === 0 ? (
        <EmptyState title="No equipment found" message="Try another system category or search phrase." />
      ) : null}
      {filtered.map((item) => (
        <EquipmentCard key={item.id} item={item} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    ...typography.body,
    backgroundColor: colors.panel,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    color: colors.text,
    minHeight: 44,
    paddingHorizontal: spacing.md
  }
});
