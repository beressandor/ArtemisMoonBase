import { Pressable, StyleSheet } from "react-native";
import { router, type Href } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useTranslation } from "@/lib/i18n";
import { colors, radius } from "@/lib/theme";

interface BackButtonProps {
  fallbackHref?: Href;
  onPress?: () => void;
}

export function BackButton({ fallbackHref = "/", onPress }: BackButtonProps) {
  const { t } = useTranslation();
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(fallbackHref);
  };

  return (
    <Pressable
      accessibilityLabel={t("detail.back")}
      accessibilityRole="button"
      hitSlop={8}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={handlePress}
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
    backgroundColor: "rgba(217, 212, 199, 0.1)",
    borderColor: "rgba(217, 212, 199, 0.32)"
  }
});
