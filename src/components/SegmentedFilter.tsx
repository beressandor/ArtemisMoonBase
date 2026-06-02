import { Pressable, ScrollView, StyleSheet, Text, ViewStyle } from "react-native";
import { colors, radius, spacing, typography } from "@/lib/theme";

export interface SegmentOption<Value extends string> {
  label: string;
  value: Value;
}

interface SegmentedFilterProps<Value extends string> {
  options: Array<SegmentOption<Value>>;
  value: Value;
  onChange: (value: Value) => void;
  style?: ViewStyle;
}

export function SegmentedFilter<Value extends string>({ options, value, onChange, style }: SegmentedFilterProps<Value>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.container, style]}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            style={[styles.segment, selected && styles.selected]}
            onPress={() => onChange(option.value)}
          >
            <Text style={[styles.text, selected && styles.selectedText]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm
  },
  segment: {
    backgroundColor: colors.panelGlass,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    minHeight: 36,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  selected: {
    backgroundColor: "rgba(138, 232, 255, 0.16)",
    borderColor: colors.blue
  },
  text: {
    ...typography.small,
    color: colors.textMuted
  },
  selectedText: {
    color: colors.text
  }
});
