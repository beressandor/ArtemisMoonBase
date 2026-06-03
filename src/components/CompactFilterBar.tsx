import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ChevronDown, Search, X } from "lucide-react-native";
import { colors, radius, spacing, typography } from "@/lib/theme";

export type CompactFilterOption = {
  label: string;
  value: string;
};

export type CompactFilterSelect = {
  id: string;
  label: string;
  value: string;
  valueLabel: string;
  options: CompactFilterOption[];
  onChange: (value: string) => void;
};

interface CompactFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  selects: CompactFilterSelect[];
  canClear?: boolean;
  onClear?: () => void;
}

export function CompactFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  selects,
  canClear = false,
  onClear
}: CompactFilterBarProps) {
  const [openSelectId, setOpenSelectId] = useState<string | null>(null);
  const openSelect = selects.find((select) => select.id === openSelectId);

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.searchShell}>
          <Search color={colors.textDim} size={15} />
          <TextInput
            value={searchValue}
            onChangeText={onSearchChange}
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.textDim}
            style={styles.search}
          />
        </View>

        {selects.map((select) => {
          const open = select.id === openSelectId;
          return (
            <Pressable
              key={select.id}
              accessibilityRole="button"
              accessibilityState={{ expanded: open }}
              style={[styles.selectButton, open && styles.selectButtonOpen]}
              onPress={() => setOpenSelectId((current) => (current === select.id ? null : select.id))}
            >
              <View style={styles.selectCopy}>
                <Text numberOfLines={1} style={styles.selectLabel}>
                  {select.label}
                </Text>
                <Text numberOfLines={1} style={styles.selectValue}>
                  {select.valueLabel}
                </Text>
              </View>
              <ChevronDown color={open ? colors.blue : colors.textDim} size={14} />
            </Pressable>
          );
        })}

        {canClear && onClear ? (
          <Pressable accessibilityRole="button" style={styles.clearButton} onPress={onClear}>
            <X color={colors.blue} size={16} />
          </Pressable>
        ) : null}
      </View>

      {openSelect ? (
        <View style={styles.dropdown}>
          {openSelect.options.map((option) => {
            const selected = option.value === openSelect.value;
            return (
              <Pressable
                key={option.value}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[styles.option, selected && styles.optionSelected]}
                onPress={() => {
                  openSelect.onChange(option.value);
                  setOpenSelectId(null);
                }}
              >
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{option.label}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.panel,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    padding: spacing.xs
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs
  },
  searchShell: {
    alignItems: "center",
    backgroundColor: colors.panelGlass,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: spacing.xs,
    minHeight: 38,
    minWidth: 96,
    paddingHorizontal: spacing.sm
  },
  search: {
    ...typography.body,
    color: colors.text,
    flex: 1,
    minHeight: 36,
    padding: 0
  },
  selectButton: {
    alignItems: "center",
    backgroundColor: colors.panelGlass,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    minHeight: 38,
    minWidth: 88,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3
  },
  selectButtonOpen: {
    backgroundColor: "rgba(217, 212, 199, 0.1)",
    borderColor: "rgba(217, 212, 199, 0.26)"
  },
  selectCopy: {
    flex: 1,
    minWidth: 0
  },
  selectLabel: {
    color: colors.textDim,
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 12,
    textTransform: "uppercase"
  },
  selectValue: {
    ...typography.small,
    color: colors.text
  },
  clearButton: {
    alignItems: "center",
    backgroundColor: "rgba(217, 212, 199, 0.08)",
    borderColor: "rgba(217, 212, 199, 0.22)",
    borderRadius: radius.sm,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 34
  },
  dropdown: {
    backgroundColor: "rgba(7, 7, 7, 0.98)",
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    marginTop: spacing.xs,
    overflow: "hidden"
  },
  option: {
    minHeight: 34,
    justifyContent: "center",
    paddingHorizontal: spacing.md
  },
  optionSelected: {
    backgroundColor: "rgba(217, 212, 199, 0.12)"
  },
  optionText: {
    ...typography.small,
    color: colors.textMuted
  },
  optionTextSelected: {
    color: colors.text
  }
});
