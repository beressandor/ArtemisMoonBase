import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X } from "lucide-react-native";
import { useTranslation } from "@/lib/i18n";
import { colors, spacing, typography } from "@/lib/theme";
import { ZoomableImage } from "@/components/ZoomableImage";

interface ImageViewerModalProps {
  imageUrl?: string;
  title: string;
  subtitle?: string;
  visible: boolean;
  onClose: () => void;
}

export function ImageViewerModal({ imageUrl, title, subtitle, visible, onClose }: ImageViewerModalProps) {
  const { t } = useTranslation();

  return (
    <Modal animationType="fade" visible={visible} onRequestClose={onClose}>
      <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.titleBlock}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            {subtitle ? (
              <Text numberOfLines={1} style={styles.subtitle}>
                {subtitle}
              </Text>
            ) : null}
          </View>
          <Pressable accessibilityLabel={t("detail.closeImage")} style={styles.closeButton} onPress={onClose}>
            <X color={colors.text} size={20} />
          </Pressable>
        </View>
        {imageUrl ? <ZoomableImage uri={imageUrl} /> : null}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.black,
    flex: 1,
    gap: spacing.md,
    padding: spacing.lg
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  titleBlock: {
    flex: 1,
    minWidth: 0
  },
  title: {
    ...typography.h2,
    color: colors.text
  },
  subtitle: {
    ...typography.small,
    color: colors.textDim,
    textTransform: "uppercase"
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: colors.panelGlass,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40
  }
});
