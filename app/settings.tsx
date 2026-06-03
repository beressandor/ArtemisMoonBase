import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Check, ChevronDown, Languages, Ruler } from "lucide-react-native";
import { AutoFitTitle } from "@/components/AutoFitTitle";
import { BackButton } from "@/components/BackButton";
import { Panel } from "@/components/Panel";
import { Screen } from "@/components/Screen";
import { useTranslation } from "@/lib/i18n";
import { colors, radius, spacing, typography } from "@/lib/theme";
import type { Language } from "@/store/useLanguageStore";
import { useUnitStore } from "@/store/useUnitStore";
import type { UnitSystem } from "@/lib/types";

const languageOptions: Array<{ value: Language; labelKey: "settings.english" | "settings.hungarian" }> = [
  { value: "en", labelKey: "settings.english" },
  { value: "hu", labelKey: "settings.hungarian" }
];

const unitOptions: Array<{ value: UnitSystem; labelKey: "settings.metric" | "settings.imperial" }> = [
  { value: "metric", labelKey: "settings.metric" },
  { value: "imperial", labelKey: "settings.imperial" }
];

export default function SettingsScreen() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [unitsOpen, setUnitsOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();
  const unitSystem = useUnitStore((state) => state.unitSystem);
  const setUnitSystem = useUnitStore((state) => state.setUnitSystem);

  const currentLanguage = languageOptions.find((option) => option.value === language);
  const currentUnitSystem = unitOptions.find((option) => option.value === unitSystem);

  return (
    <Screen>
      <View style={styles.header}>
        <BackButton fallbackHref="/" />
        <View style={styles.headerText}>
          <AutoFitTitle style={styles.title}>{t("settings.title")}</AutoFitTitle>
          <Text style={styles.subtitle}>{t("settings.subtitle")}</Text>
        </View>
      </View>

      <Panel elevated style={styles.panel}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: languageOpen }}
          style={styles.settingButton}
          onPress={() => setLanguageOpen((current) => !current)}
        >
          <View style={styles.settingIcon}>
            <Languages color={colors.blue} size={18} />
          </View>
          <View style={styles.settingCopy}>
            <Text style={styles.settingTitle}>{t("settings.language")}</Text>
            <Text style={styles.settingDescription}>{t("settings.languageDescription")}</Text>
          </View>
          <View style={styles.currentPill}>
            <Text style={styles.currentPillText}>{currentLanguage ? t(currentLanguage.labelKey) : language.toUpperCase()}</Text>
          </View>
          <ChevronDown
            color={colors.textMuted}
            size={18}
            style={[styles.chevron, languageOpen && styles.chevronOpen]}
          />
        </Pressable>

        {languageOpen ? (
          <View style={styles.languageList}>
            <Text style={styles.groupLabel}>{t("settings.currentLanguage")}</Text>
            {languageOptions.map((option) => {
              const selected = option.value === language;

              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  style={[styles.languageOption, selected && styles.languageOptionSelected]}
                  onPress={() => setLanguage(option.value)}
                >
                  <Text style={[styles.languageText, selected && styles.languageTextSelected]}>{t(option.labelKey)}</Text>
                  {selected ? <Check color={colors.blue} size={17} /> : null}
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </Panel>

      <Panel elevated style={styles.panel}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: unitsOpen }}
          style={styles.settingButton}
          onPress={() => setUnitsOpen((current) => !current)}
        >
          <View style={styles.settingIcon}>
            <Ruler color={colors.blue} size={18} />
          </View>
          <View style={styles.settingCopy}>
            <Text style={styles.settingTitle}>{t("settings.units")}</Text>
            <Text style={styles.settingDescription}>{t("settings.unitsDescription")}</Text>
          </View>
          <View style={styles.currentPill}>
            <Text style={styles.currentPillText}>
              {currentUnitSystem ? t(currentUnitSystem.labelKey) : unitSystem.toUpperCase()}
            </Text>
          </View>
          <ChevronDown
            color={colors.textMuted}
            size={18}
            style={[styles.chevron, unitsOpen && styles.chevronOpen]}
          />
        </Pressable>

        {unitsOpen ? (
          <View style={styles.languageList}>
            <Text style={styles.groupLabel}>{t("settings.currentUnits")}</Text>
            {unitOptions.map((option) => {
              const selected = option.value === unitSystem;

              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  style={[styles.languageOption, selected && styles.languageOptionSelected]}
                  onPress={() => setUnitSystem(option.value)}
                >
                  <Text style={[styles.languageText, selected && styles.languageTextSelected]}>{t(option.labelKey)}</Text>
                  {selected ? <Check color={colors.blue} size={17} /> : null}
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </Panel>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 0
  },
  title: {
    ...typography.title,
    color: colors.text
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted
  },
  panel: {
    padding: spacing.md
  },
  settingButton: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    minHeight: 72
  },
  settingIcon: {
    alignItems: "center",
    backgroundColor: "rgba(217, 212, 199, 0.08)",
    borderColor: "rgba(217, 212, 199, 0.2)",
    borderRadius: radius.sm,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38
  },
  settingCopy: {
    flex: 1,
    gap: spacing.xs
  },
  settingTitle: {
    ...typography.h2,
    color: colors.text
  },
  settingDescription: {
    ...typography.small,
    color: colors.textMuted
  },
  currentPill: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  currentPillText: {
    ...typography.small,
    color: colors.text
  },
  chevron: {
    transform: [{ rotate: "0deg" }]
  },
  chevronOpen: {
    transform: [{ rotate: "180deg" }]
  },
  languageList: {
    borderTopColor: colors.borderSoft,
    borderTopWidth: 1,
    gap: spacing.sm,
    paddingTop: spacing.md
  },
  groupLabel: {
    ...typography.small,
    color: colors.textDim,
    textTransform: "uppercase"
  },
  languageOption: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.035)",
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 46,
    paddingHorizontal: spacing.md
  },
  languageOptionSelected: {
    backgroundColor: "rgba(217, 212, 199, 0.1)",
    borderColor: "rgba(217, 212, 199, 0.32)"
  },
  languageText: {
    ...typography.body,
    color: colors.textMuted
  },
  languageTextSelected: {
    color: colors.text
  }
});
