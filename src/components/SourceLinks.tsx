import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { ExternalLink } from "lucide-react-native";
import { useTranslation } from "@/lib/i18n";
import { colors, spacing, typography } from "@/lib/theme";
import { uniqueSources } from "@/lib/sourceAttribution";
import type { SourceLink } from "@/lib/types";

interface SourceLinksProps {
  sources: SourceLink[];
}

export function SourceLinks({ sources }: SourceLinksProps) {
  const { t } = useTranslation();
  const unique = uniqueSources(sources);

  if (unique.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {unique.map((source) => (
        <Pressable key={source.url} style={styles.link} onPress={() => Linking.openURL(source.url)}>
          <ExternalLink color={colors.blue} size={14} />
          <Text numberOfLines={1} style={styles.label}>
            {source.label}
          </Text>
          <Text style={styles.meta}>{t(`source.${source.confidence}`)}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm
  },
  link: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm
  },
  label: {
    ...typography.small,
    color: colors.text,
    flex: 1
  },
  meta: {
    ...typography.small,
    color: colors.textDim
  }
});
