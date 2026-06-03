import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Pressable, StyleSheet, Text, View, type ImageStyle, type StyleProp } from "react-native";
import { Flame, Gauge, Link as LinkIcon, Maximize2, Rocket as RocketIcon } from "lucide-react-native";
import { BackButton } from "@/components/BackButton";
import { ImageViewerModal } from "@/components/ImageViewerModal";
import { MediaImage } from "@/components/MediaImage";
import { Panel } from "@/components/Panel";
import { Screen } from "@/components/Screen";
import { SourceLinks } from "@/components/SourceLinks";
import { StatusPill } from "@/components/StatusPill";
import { listMissions, listRockets } from "@/lib/dataClient";
import { useTranslation } from "@/lib/i18n";
import { colors, spacing, typography } from "@/lib/theme";
import { formatUnitValue } from "@/lib/unitDisplay";
import { useUnitStore } from "@/store/useUnitStore";
import type { RocketEngine } from "@/lib/types";

type ImageSelection = {
  url?: string;
  title: string;
  subtitle?: string;
};

export default function RocketDetailScreen() {
  const { language, t } = useTranslation();
  const unitSystem = useUnitStore((state) => state.unitSystem);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [imageSelection, setImageSelection] = useState<ImageSelection | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["rocket-detail", id, language],
    queryFn: async () => {
      const [allRockets, allMissions] = await Promise.all([listRockets(language), listMissions(language)]);
      return { allRockets, allMissions };
    }
  });

  const item = data?.allRockets.find((rocket) => rocket.id === id);
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
        <BackButton fallbackHref="/equipment" />
        <Text style={styles.title}>{t("detail.rocketNotFound")}</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <BackButton fallbackHref="/equipment" />

      <Panel style={styles.hero}>
        <ImageButton
          imageUrl={item.imageUrl}
          title={item.name}
          subtitle={item.owner}
          imageStyle={styles.heroImage}
          onOpen={setImageSelection}
        />
        <View style={styles.heroBody}>
          <View style={styles.heroMetaRow}>
            <View style={styles.ownerBadge}>
              <RocketIcon color={colors.gold} size={14} />
              <Text numberOfLines={1} style={styles.ownerText}>
                {item.owner}
              </Text>
            </View>
            <StatusPill status={item.status} />
          </View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
          <View style={styles.metricGrid}>
            {item.keyMetrics.map((metric) => (
              <View key={metric.label} style={styles.metric}>
                <Text numberOfLines={1} style={styles.metricLabel}>
                  {metric.label}
                </Text>
                <Text numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.74} style={styles.metricValue}>
                  {formatUnitValue(metric.value, unitSystem)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Panel>

      <Panel>
        <View style={styles.sectionHeader}>
          <Gauge color={colors.gold} size={18} />
          <Text style={styles.sectionTitle}>{t("detail.coreSpecs")}</Text>
        </View>
        {item.specs.map((spec) => (
          <View key={spec.label} style={styles.specRow}>
            <Text style={styles.specLabel}>{spec.label}</Text>
            <Text style={styles.specValue}>{formatUnitValue(spec.value, unitSystem)}</Text>
          </View>
        ))}
      </Panel>

      <Panel>
        <View style={styles.sectionHeader}>
          <Flame color={colors.gold} size={18} />
          <Text style={styles.sectionTitle}>{t("detail.propulsion")}</Text>
        </View>
        {item.engines.map((engine) => (
          <EngineBlock key={engine.id} engine={engine} onOpenImage={setImageSelection} />
        ))}
      </Panel>

      {relatedMissions.length > 0 ? (
        <Panel>
          <Text style={styles.sectionTitle}>{t("detail.missionLinks")}</Text>
          <View style={styles.chipGrid}>
            {relatedMissions.map((mission) => (
              <Pressable
                key={mission.id}
                style={styles.chip}
                onPress={() => router.push({ pathname: "/mission/[id]", params: { id: mission.id } })}
              >
                <LinkIcon color={colors.gold} size={14} />
                <Text numberOfLines={1} style={styles.chipText}>
                  {mission.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </Panel>
      ) : null}

      <Panel>
        <Text style={styles.sectionTitle}>{t("detail.sources")}</Text>
        <SourceLinks sources={item.sourceUrls} />
      </Panel>

      <ImageViewerModal
        imageUrl={imageSelection?.url}
        subtitle={imageSelection?.subtitle}
        title={imageSelection?.title ?? item.name}
        visible={Boolean(imageSelection)}
        onClose={() => setImageSelection(null)}
      />
    </Screen>
  );
}

interface ImageButtonProps {
  imageUrl?: string;
  title: string;
  subtitle?: string;
  imageStyle: StyleProp<ImageStyle>;
  onOpen: (selection: ImageSelection) => void;
}

function ImageButton({ imageUrl, title, subtitle, imageStyle, onOpen }: ImageButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={!imageUrl}
      style={styles.imageButton}
      onPress={() => onOpen({ url: imageUrl, title, subtitle })}
    >
      <MediaImage url={imageUrl} style={imageStyle} />
      {imageUrl ? (
        <View style={styles.imageAction}>
          <Maximize2 color={colors.text} size={16} />
        </View>
      ) : null}
    </Pressable>
  );
}

interface EngineBlockProps {
  engine: RocketEngine;
  onOpenImage: (selection: ImageSelection) => void;
}

function EngineBlock({ engine, onOpenImage }: EngineBlockProps) {
  const { t } = useTranslation();
  const unitSystem = useUnitStore((state) => state.unitSystem);

  return (
    <View style={styles.engineBlock}>
      <View style={styles.engineImageColumn}>
        <ImageButton
          imageUrl={engine.imageUrl}
          title={engine.name}
          subtitle={engine.role}
          imageStyle={styles.engineImage}
          onOpen={onOpenImage}
        />
      </View>
      <View style={styles.engineBody}>
        <Text style={styles.engineRole}>{engine.role}</Text>
        <Text style={styles.engineName}>{engine.name}</Text>
        <Text style={styles.engineSummary}>{engine.summary}</Text>
        <View style={styles.engineFacts}>
          <Fact label={t("detail.engineCount")} value={engine.count} />
          <Fact label={t("detail.enginePropellant")} value={engine.propellant} />
          {engine.thrust ? <Fact label={t("detail.engineThrust")} value={formatUnitValue(engine.thrust, unitSystem)} /> : null}
        </View>
        {engine.specs.map((spec) => (
          <View key={spec.label} style={styles.engineSpec}>
            <Text style={styles.specLabel}>{spec.label}</Text>
            <Text style={styles.specValue}>{formatUnitValue(spec.value, unitSystem)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fact}>
      <Text style={styles.factLabel}>{label}</Text>
      <Text style={styles.factValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    overflow: "hidden",
    padding: 0
  },
  imageButton: {
    position: "relative"
  },
  heroImage: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 214,
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
  heroMetaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between"
  },
  ownerBadge: {
    alignItems: "center",
    backgroundColor: colors.panelGlass,
    borderColor: colors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    maxWidth: 180,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  ownerText: {
    ...typography.small,
    color: colors.text
  },
  title: {
    ...typography.h1,
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
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm
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
  engineBlock: {
    backgroundColor: colors.panelGlass,
    borderColor: colors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.md,
    overflow: "hidden"
  },
  engineImageColumn: {
    backgroundColor: colors.backgroundSoft
  },
  engineImage: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 178,
    width: "100%"
  },
  engineBody: {
    gap: spacing.sm,
    padding: spacing.md
  },
  engineRole: {
    ...typography.small,
    color: colors.gold,
    textTransform: "uppercase"
  },
  engineName: {
    ...typography.h2,
    color: colors.text
  },
  engineSummary: {
    ...typography.body,
    color: colors.textMuted
  },
  engineFacts: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  fact: {
    backgroundColor: colors.backgroundSoft,
    borderColor: colors.borderSoft,
    borderRadius: 8,
    borderWidth: 1,
    gap: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  factLabel: {
    color: colors.textDim,
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 12,
    textTransform: "uppercase"
  },
  factValue: {
    ...typography.small,
    color: colors.text
  },
  engineSpec: {
    gap: spacing.xs
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
