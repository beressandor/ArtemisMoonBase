import { SearchX } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "@/lib/theme";

interface EmptyStateProps {
  title: string;
  message: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <SearchX color={colors.textDim} size={24} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.xl
  },
  title: {
    ...typography.h2,
    color: colors.text
  },
  message: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: "center"
  }
});
