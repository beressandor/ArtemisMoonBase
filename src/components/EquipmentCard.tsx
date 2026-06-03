import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "@/lib/i18n";
import { colors, spacing, typography } from "@/lib/theme";
import type { Equipment } from "@/lib/types";
import { MediaImage } from "@/components/MediaImage";
import { Panel } from "@/components/Panel";
import { StatusPill } from "@/components/StatusPill";

interface EquipmentCardProps {
  item: Equipment;
}

export function EquipmentCard({ item }: EquipmentCardProps) {
  const { t } = useTranslation();

  return (
    <Pressable onPress={() => router.push({ pathname: "/equipment/[id]", params: { id: item.id } })}>
      <Panel style={styles.card}>
        <MediaImage url={item.imageUrl} style={styles.image} />
        <View style={styles.imageShade} />
        <View style={styles.body}>
          <View style={styles.metaRow}>
            <Text style={styles.category}>{t(`category.${item.category}`).toUpperCase()}</Text>
            <View style={styles.badgeRow}>
              <SupplierBadge owner={item.owner} />
              <StatusPill status={item.status} />
            </View>
          </View>
          <Text style={styles.title}>{item.name}</Text>
          <Text numberOfLines={3} style={styles.summary}>
            {item.summary}
          </Text>
        </View>
      </Panel>
    </Pressable>
  );
}

export function SupplierBadge({ owner }: { owner: string }) {
  return (
    <View style={styles.supplierBadge}>
      <Text numberOfLines={1} style={styles.supplierBadgeText}>
        {owner}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    position: "relative",
    overflow: "hidden"
  },
  image: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 148,
    width: "100%"
  },
  imageShade: {
    backgroundColor: "rgba(3, 5, 10, 0.18)",
    height: 148,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  body: {
    gap: spacing.sm,
    padding: spacing.lg
  },
  category: {
    ...typography.small,
    color: colors.gold,
    textTransform: "uppercase"
  },
  metaRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "space-between"
  },
  badgeRow: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
    flexWrap: "wrap",
    gap: spacing.xs,
    justifyContent: "flex-end"
  },
  title: {
    ...typography.h2,
    color: colors.text
  },
  supplierBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.panelGlass,
    borderColor: colors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    maxWidth: 150,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  supplierBadgeText: {
    ...typography.small,
    color: colors.textMuted
  },
  summary: {
    ...typography.body,
    color: colors.textMuted
  }
});
