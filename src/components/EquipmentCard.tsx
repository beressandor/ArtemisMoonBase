import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { colors, spacing, typography } from "@/lib/theme";
import type { Equipment } from "@/lib/types";
import { MediaImage } from "@/components/MediaImage";
import { Panel } from "@/components/Panel";
import { StatusPill } from "@/components/StatusPill";

interface EquipmentCardProps {
  item: Equipment;
}

export function EquipmentCard({ item }: EquipmentCardProps) {
  return (
    <Pressable onPress={() => router.push({ pathname: "/equipment/[id]", params: { id: item.id } })}>
      <Panel style={styles.card}>
        <MediaImage url={item.imageUrl} style={styles.image} />
        <View style={styles.body}>
          <Text style={styles.category}>{item.category.toUpperCase()}</Text>
          <Text style={styles.title}>{item.name}</Text>
          <Text numberOfLines={3} style={styles.summary}>
            {item.summary}
          </Text>
          <View style={styles.footer}>
            <Text numberOfLines={1} style={styles.owner}>
              {item.owner}
            </Text>
            <StatusPill status={item.status} />
          </View>
        </View>
      </Panel>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: "hidden"
  },
  image: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 148,
    width: "100%"
  },
  body: {
    gap: spacing.sm,
    padding: spacing.lg
  },
  category: {
    ...typography.small,
    color: colors.blue
  },
  title: {
    ...typography.h2,
    color: colors.text
  },
  summary: {
    ...typography.body,
    color: colors.textMuted
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  owner: {
    ...typography.small,
    color: colors.textDim,
    flex: 1
  }
});
