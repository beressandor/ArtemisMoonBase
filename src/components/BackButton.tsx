import { Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useTranslation } from "@/lib/i18n";
import { colors, radius } from "@/lib/theme";

interface BackButtonProps {
  onPress?: () => void;
}

export function BackButton({ onPress }: BackButtonProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityLabel={t("detail.back")}
      accessibilityRole="button"
      hitSlop={8}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={onPress ?? (() => router.back())}
    >
      <ArrowLeft color={colors.text} size={24} strokeWidth={2.2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.panelGlass,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    height: 46,
    justifyContent: "center",
    width: 46
  },
  buttonPressed: {
    backgroundColor: "rgba(138, 232, 255, 0.12)",
    borderColor: "rgba(138, 232, 255, 0.38)"
  }
});
