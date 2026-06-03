import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import { colors, radius, spacing, typography } from "@/lib/theme";

export interface FilterOption<Value extends string> {
  label: string;
  value: Value;
}

interface FilterGroupProps<Value extends string> {
  label: string;
  options: Array<FilterOption<Value>>;
  value: Value;
  onChange: (value: Value) => void;
  collapsed?: boolean;
  onToggle?: () => void;
  summary?: string;
}

export function FilterGroup<Value extends string>({
  label,
  options,
  value,
  onChange,
  collapsed = false,
  onToggle,
  summary
}: FilterGroupProps<Value>) {
  const HeaderIcon = collapsed ? ChevronRight : ChevronDown;
  const headerContent = (
    <>
      <View style={styles.titleBlock}>
        <Text style={styles.label}>{label}</Text>
        {summary ? <Text style={styles.summary}>{summary}</Text> : null}
      </View>
      {onToggle ? <HeaderIcon color={colors.textDim} size={18} /> : null}
    </>
  );

  return (
    <View style={styles.group}>
      {onToggle ? (
        <Pressable accessibilityRole="button" accessibilityState={{ expanded: !collapsed }} style={styles.header} onPress={onToggle}>
          {headerContent}
        </Pressable>
      ) : (
        <View style={styles.header}>{headerContent}</View>
      )}
      {collapsed ? null : (
        <View style={styles.options}>
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <Pressable
                key={option.value}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[styles.option, selected && styles.selected]}
                onPress={() => onChange(option.value)}
              >
                <Text style={[styles.optionText, selected && styles.selectedText]}>{option.label}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: spacing.sm
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
    minHeight: 24
  },
  titleBlock: {
    flex: 1,
    gap: 2
  },
  label: {
    ...typography.small,
    color: colors.textDim,
    textTransform: "uppercase"
  },
  summary: {
    ...typography.small,
    color: colors.text
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  option: {
    backgroundColor: colors.panelGlass,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    minHeight: 30,
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  selected: {
    backgroundColor: "rgba(217, 212, 199, 0.12)",
    borderColor: colors.blue
  },
  optionText: {
    ...typography.small,
    color: colors.textMuted
  },
  selectedText: {
    color: colors.text
  }
});
