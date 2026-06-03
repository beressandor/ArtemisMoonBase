import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { CompactFilterBar } from "@/components/CompactFilterBar";
import { EmptyState } from "@/components/EmptyState";
import { EquipmentCard } from "@/components/EquipmentCard";
import { RocketCard } from "@/components/RocketCard";
import { Screen } from "@/components/Screen";
import { listEquipment, listRockets } from "@/lib/dataClient";
import { useTranslation } from "@/lib/i18n";
import { colors, radius, spacing, typography } from "@/lib/theme";
import type { EquipmentCategory } from "@/lib/types";

type EquipmentView = "equipment" | "rockets";

export default function EquipmentScreen() {
  const { language, t } = useTranslation();
  const [activeView, setActiveView] = useState<EquipmentView>("equipment");
  const [category, setCategory] = useState<EquipmentCategory | "all">("all");
  const [owner, setOwner] = useState("all");
  const [query, setQuery] = useState("");
  const [rocketQuery, setRocketQuery] = useState("");
  const { data = [], isLoading } = useQuery({ queryKey: ["equipment", language], queryFn: () => listEquipment(language) });
  const { data: rocketData = [], isLoading: rocketsLoading } = useQuery({
    queryKey: ["rockets", language],
    queryFn: () => listRockets(language)
  });
  const equipmentData = useMemo(() => data.filter((item) => item.id !== "sls"), [data]);
  const viewOptions = useMemo<Array<{ label: string; value: EquipmentView; summary: string }>>(
    () => [
      { label: t("equipment.equipmentTab"), value: "equipment", summary: t("equipment.equipmentSummary") },
      { label: t("equipment.rocketsTab"), value: "rockets", summary: t("equipment.rocketsSummary") }
    ],
    [t]
  );
  const categoryOptions = useMemo<Array<{ label: string; value: EquipmentCategory | "all" }>>(
    () => [
      { label: t("category.all"), value: "all" },
      { label: t("category.crew"), value: "crew" },
      { label: t("category.lander"), value: "lander" },
      { label: t("category.rover"), value: "rover" },
      { label: t("category.station"), value: "station" },
      { label: t("category.power"), value: "power" },
      { label: t("category.habitat"), value: "habitat" }
    ],
    [t]
  );
  const ownerOptions = useMemo<Array<{ label: string; value: string }>>(() => {
    const owners = Array.from(new Set(equipmentData.map((item) => item.owner))).sort((a, b) => a.localeCompare(b));
    return [{ label: t("filters.allSuppliers"), value: "all" }, ...owners.map((value) => ({ label: value, value }))];
  }, [equipmentData, t]);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return equipmentData.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesOwner = owner === "all" || item.owner === owner;
      const matchesQuery = !value || `${item.name} ${item.summary} ${item.owner}`.toLowerCase().includes(value);
      return matchesCategory && matchesOwner && matchesQuery;
    });
  }, [category, equipmentData, owner, query]);

  const filteredRockets = useMemo(() => {
    const value = rocketQuery.trim().toLowerCase();
    if (!value) {
      return rocketData;
    }

    return rocketData.filter((item) => {
      const engineText = item.engines
        .map((engine) => `${engine.name} ${engine.role} ${engine.propellant} ${engine.summary}`)
        .join(" ");
      const specText = item.specs.map((spec) => `${spec.label} ${spec.value}`).join(" ");
      return `${item.name} ${item.owner} ${item.summary} ${engineText} ${specText}`.toLowerCase().includes(value);
    });
  }, [rocketData, rocketQuery]);

  const categoryLabel = categoryOptions.find((option) => option.value === category)?.label ?? "All";
  const ownerLabel = ownerOptions.find((option) => option.value === owner)?.label ?? t("filters.allSuppliers");
  const hasActiveFilters = category !== "all" || owner !== "all" || query.trim().length > 0;
  const hasActiveRocketFilters = rocketQuery.trim().length > 0;
  const clearFilters = () => {
    setCategory("all");
    setOwner("all");
    setQuery("");
  };
  const clearRocketFilters = () => setRocketQuery("");

  return (
    <Screen>
      <AppHeader title={t("equipment.title")} />

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

      {activeView === "equipment" ? (
        <>
          <CompactFilterBar
            searchValue={query}
            onSearchChange={setQuery}
            searchPlaceholder={t("filters.searchEquipment")}
            canClear={hasActiveFilters}
            onClear={clearFilters}
            selects={[
              {
                id: "category",
                label: t("filters.system"),
                value: category,
                valueLabel: category === "all" ? t("filters.allSystems") : categoryLabel,
                options: categoryOptions,
                onChange: (value) => setCategory(value as EquipmentCategory | "all")
              },
              {
                id: "owner",
                label: t("filters.supplier"),
                value: owner,
                valueLabel: owner === "all" ? t("filters.allSuppliers") : ownerLabel,
                options: ownerOptions,
                onChange: setOwner
              }
            ]}
          />
          {isLoading ? <ActivityIndicator color={colors.blue} /> : null}
          {!isLoading && filtered.length === 0 ? (
            <EmptyState title={t("equipment.noFound")} message={t("equipment.noFoundMessage")} />
          ) : null}
          {filtered.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </>
      ) : (
        <>
          <CompactFilterBar
            searchValue={rocketQuery}
            onSearchChange={setRocketQuery}
            searchPlaceholder={t("filters.searchRockets")}
            canClear={hasActiveRocketFilters}
            onClear={clearRocketFilters}
            selects={[]}
          />
          {rocketsLoading ? <ActivityIndicator color={colors.blue} /> : null}
          {!rocketsLoading && filteredRockets.length === 0 ? (
            <EmptyState title={t("equipment.noRocketsFound")} message={t("equipment.noRocketsFoundMessage")} />
          ) : null}
          {filteredRockets.map((item) => (
            <RocketCard key={item.id} item={item} />
          ))}
        </>
      )}
    </Screen>
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
    backgroundColor: "rgba(217, 212, 199, 0.08)",
    borderColor: "rgba(217, 212, 199, 0.24)"
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
  }
});
