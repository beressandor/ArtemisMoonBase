import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Rocket as RocketIcon } from "lucide-react-native";
import { MediaImage } from "@/components/MediaImage";
import { Panel } from "@/components/Panel";
import { StatusPill } from "@/components/StatusPill";
import { useTranslation } from "@/lib/i18n";
import { colors, spacing, typography } from "@/lib/theme";
import { formatUnitValue } from "@/lib/unitDisplay";
import { useUnitStore } from "@/store/useUnitStore";
import type { Rocket } from "@/lib/types";

interface RocketCardProps {
  item: Rocket;
}

export function RocketCard({ item }: RocketCardProps) {
  const { t } = useTranslation();
  const unitSystem = useUnitStore((state) => state.unitSystem);

  return (
    <Pressable onPress={() => router.push({ pathname: "/rocket/[id]", params: { id: item.id } })}>
      <Panel style={styles.card}>
        <View style={styles.imageWrap}>
          <MediaImage url={item.cardImageUrl ?? item.imageUrl} style={styles.image} />
          <View style={styles.imageShade} />
          <View style={styles.ownerBadge}>
            <RocketIcon color={colors.gold} size={14} />
            <Text numberOfLines={1} style={styles.ownerText}>
              {item.owner}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.metaRow}>
            <Text style={styles.kicker}>{t("equipment.rocketKicker").toUpperCase()}</Text>
            <StatusPill status={item.status} />
          </View>
          <Text style={styles.title}>{item.name}</Text>
          <Text numberOfLines={3} style={styles.summary}>
            {item.summary}
          </Text>

          <View style={styles.metricGrid}>
            {item.keyMetrics.map((metric) => (
              <View key={metric.label} style={styles.metric}>
                <Text numberOfLines={1} style={styles.metricLabel}>
                  {metric.label}
                </Text>
                <Text numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.76} style={styles.metricValue}>
                  {formatUnitValue(metric.value, unitSystem)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Panel>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    padding: 0
  },
  imageWrap: {
    height: 160,
    position: "relative"
  },
  image: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: "100%",
    width: "100%"
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2, 3, 5, 0.22)"
  },
  ownerBadge: {
    alignItems: "center",
    backgroundColor: "rgba(3, 5, 10, 0.72)",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    left: spacing.md,
    maxWidth: 180,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    position: "absolute",
    top: spacing.md
  },
  ownerText: {
    ...typography.small,
    color: colors.text
  },
  body: {
    gap: spacing.sm,
    padding: spacing.lg
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between"
  },
  kicker: {
    ...typography.small,
    color: colors.gold,
    textTransform: "uppercase"
  },
  title: {
    ...typography.h2,
    color: colors.text
  },
  summary: {
    ...typography.body,
    color: colors.textMuted
  },
  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  metric: {
    backgroundColor: colors.panelGlass,
    borderColor: colors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: "48%",
    flexGrow: 1,
    gap: 2,
    minHeight: 54,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm
  },
  metricLabel: {
    ...typography.small,
    color: colors.textDim
  },
  metricValue: {
    ...typography.small,
    color: colors.text,
    fontWeight: "700"
  }
});
