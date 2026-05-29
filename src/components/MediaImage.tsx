import { Image } from "expo-image";
import { ImageIcon } from "lucide-react-native";
import { StyleSheet, View, type ImageStyle, type StyleProp, type ViewStyle } from "react-native";
import { colors, radius } from "@/lib/theme";

interface MediaImageProps {
  url?: string;
  style?: StyleProp<ImageStyle>;
}

export function MediaImage({ url, style }: MediaImageProps) {
  if (!url) {
    return (
      <View style={[styles.placeholder, style as StyleProp<ViewStyle>]}>
        <ImageIcon color={colors.textDim} size={24} />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: url }}
      style={[styles.image, style]}
      contentFit="cover"
      transition={180}
      placeholder={{ blurhash: "L04-2%?b00M{~qxuM{M{00t7-;of" }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.sm,
    overflow: "hidden"
  },
  placeholder: {
    alignItems: "center",
    backgroundColor: colors.backgroundSoft,
    borderColor: colors.borderSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 96
  }
});
