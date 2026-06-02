import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { Link as LinkIcon, Maximize2 } from "lucide-react-native";
import { BackButton } from "@/components/BackButton";
import { ImageViewerModal } from "@/components/ImageViewerModal";
import { MediaImage } from "@/components/MediaImage";
import { Panel } from "@/components/Panel";
import { Screen } from "@/components/Screen";
import { SourceLinks } from "@/components/SourceLinks";
import { StatusPill } from "@/components/StatusPill";
import { listEquipment, listMissions } from "@/lib/dataClient";
import { useTranslation } from "@/lib/i18n";
import { colors, spacing, typography } from "@/lib/theme";

export default function EquipmentDetailScreen() {
  const { t } = useTranslation();
  const [imageOpen, setImageOpen] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["equipment-detail", id],
    queryFn: async () => {
      const [allEquipment, allMissions] = await Promise.all([listEquipment(), listMissions()]);
      return { allEquipment, allMissions };
    }
  });

  const item = data?.allEquipment.find((equipment) => equipment.id === id);
  const relatedMissions = data?.allMissions.filter((mission) => item?.relatedMissionIds.includes(mission.id)) ?? [];

  if (isLoading) {
    return (
      <Screen>
        <ActivityIndicator color={colors.blue} />
      </Screen>
    );
  }

  if (!item) {
    return (
      <Screen>
        <BackButton />
        <Text style={styles.title}>{t("detail.equipmentNotFound")}</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <BackButton />

      <Panel style={styles.hero}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("detail.openImage")}
          disabled={!item.imageUrl}
          style={styles.heroImageButton}
          onPress={() => setImageOpen(true)}
        >
          <MediaImage url={item.imageUrl} style={styles.heroImage} />
          {item.imageUrl ? (
            <View style={styles.imageAction}>
              <Maximize2 color={colors.text} size={16} />
            </View>
          ) : null}
        </Pressable>
        <View style={styles.heroBody}>
          <Text style={styles.kicker}>{t(`category.${item.category}`).toUpperCase()}</Text>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.owner}>{item.owner}</Text>
            <StatusPill status={item.status} />
          </View>
          <Text style={styles.summary}>{item.summary}</Text>
        </View>
      </Panel>

      <Panel>
        <Text style={styles.sectionTitle}>{t("detail.specs")}</Text>
        {item.specs.map((spec) => (
          <View key={spec.label} style={styles.specRow}>
            <Text style={styles.specLabel}>{spec.label}</Text>
            <Text style={styles.specValue}>{spec.value}</Text>
          </View>
        ))}
      </Panel>

      <Panel>
        <Text style={styles.sectionTitle}>{t("detail.missionLinks")}</Text>
        <View style={styles.chipGrid}>
          {relatedMissions.map((mission) => (
            <Pressable
              key={mission.id}
              style={styles.chip}
              onPress={() => router.push({ pathname: "/mission/[id]", params: { id: mission.id } })}
            >
              <LinkIcon color={colors.blue} size={14} />
              <Text numberOfLines={1} style={styles.chipText}>
                {mission.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </Panel>

      <Panel>
        <Text style={styles.sectionTitle}>{t("detail.sources")}</Text>
        <SourceLinks sources={item.sourceUrls} />
      </Panel>

      <ImageViewerModal
        imageUrl={item.imageUrl}
        subtitle={t(`category.${item.category}`)}
        title={item.name}
        visible={imageOpen}
        onClose={() => setImageOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    padding: 0,
    overflow: "hidden"
  },
  heroImageButton: {
    position: "relative"
  },
  heroImage: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 190,
    width: "100%"
  },
  imageAction: {
    alignItems: "center",
    backgroundColor: "rgba(3, 5, 10, 0.72)",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    bottom: spacing.md,
    height: 34,
    justifyContent: "center",
    position: "absolute",
    right: spacing.md,
    width: 34
  },
  heroBody: {
    gap: spacing.md,
    padding: spacing.lg
  },
  kicker: {
    ...typography.small,
    color: colors.blue
  },
  title: {
    ...typography.h1,
    color: colors.text
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  owner: {
    ...typography.small,
    color: colors.textDim,
    flex: 1
  },
  summary: {
    ...typography.body,
    color: colors.textMuted
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text
  },
  specRow: {
    borderBottomColor: colors.borderSoft,
    borderBottomWidth: 1,
    gap: spacing.xs,
    paddingBottom: spacing.sm
  },
  specLabel: {
    ...typography.small,
    color: colors.textDim
  },
  specValue: {
    ...typography.body,
    color: colors.text
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  chip: {
    alignItems: "center",
    backgroundColor: colors.backgroundSoft,
    borderColor: colors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    maxWidth: "100%",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm
  },
  chipText: {
    ...typography.small,
    color: colors.text
  }
});
