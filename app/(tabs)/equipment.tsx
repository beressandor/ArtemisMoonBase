import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { CompactFilterBar } from "@/components/CompactFilterBar";
import { EmptyState } from "@/components/EmptyState";
import { EquipmentCard } from "@/components/EquipmentCard";
import { Screen } from "@/components/Screen";
import { listEquipment } from "@/lib/dataClient";
import { useTranslation } from "@/lib/i18n";
import { colors } from "@/lib/theme";
import type { EquipmentCategory } from "@/lib/types";

export default function EquipmentScreen() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<EquipmentCategory | "all">("all");
  const [query, setQuery] = useState("");
  const { data = [], isLoading } = useQuery({ queryKey: ["equipment"], queryFn: listEquipment });
  const categoryOptions = useMemo<Array<{ label: string; value: EquipmentCategory | "all" }>>(
    () => [
      { label: t("category.all"), value: "all" },
      { label: t("category.launch"), value: "launch" },
      { label: t("category.crew"), value: "crew" },
      { label: t("category.lander"), value: "lander" },
      { label: t("category.rover"), value: "rover" },
      { label: t("category.station"), value: "station" },
      { label: t("category.power"), value: "power" },
      { label: t("category.habitat"), value: "habitat" }
    ],
    [t]
  );

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return data.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery = !value || `${item.name} ${item.summary} ${item.owner}`.toLowerCase().includes(value);
      return matchesCategory && matchesQuery;
    });
  }, [category, data, query]);

  const categoryLabel = categoryOptions.find((option) => option.value === category)?.label ?? "All";
  const hasActiveFilters = category !== "all" || query.trim().length > 0;
  const clearFilters = () => {
    setCategory("all");
    setQuery("");
  };

  return (
    <Screen>
      <AppHeader title={t("equipment.title")} />
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
    </Screen>
  );
}
