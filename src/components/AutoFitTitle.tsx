import { useMemo, useState } from "react";
import { StyleSheet, Text, View, type LayoutChangeEvent, type StyleProp, type TextStyle } from "react-native";
import { typography } from "@/lib/theme";

interface AutoFitTitleProps {
  children: string;
  minimumFontSize?: number;
  style?: StyleProp<TextStyle>;
}

export function AutoFitTitle({ children, minimumFontSize = 14, style }: AutoFitTitleProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const flattenedStyle = StyleSheet.flatten(style) ?? {};
  const baseFontSize =
    typeof flattenedStyle.fontSize === "number" ? flattenedStyle.fontSize : typography.title.fontSize;
  const baseLineHeight =
    typeof flattenedStyle.lineHeight === "number" ? flattenedStyle.lineHeight : typography.title.lineHeight;
  const estimatedWidth = useMemo(() => estimateTextWidth(children, baseFontSize), [baseFontSize, children]);

  const fittedStyle = useMemo(() => {
    const targetWidth = estimatedWidth;

    if (!containerWidth || !targetWidth || targetWidth <= containerWidth) {
      return null;
    }

    const scale = Math.max(minimumFontSize / baseFontSize, containerWidth / targetWidth);
    const fontSize = Math.max(minimumFontSize, Math.floor(baseFontSize * scale));
    const lineHeight = Math.max(Math.ceil(fontSize * 1.14), Math.round(baseLineHeight * (fontSize / baseFontSize)));

    return { fontSize, lineHeight };
  }, [baseFontSize, baseLineHeight, containerWidth, estimatedWidth, minimumFontSize]);

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const nextWidth = Math.floor(event.nativeEvent.layout.width);
    if (nextWidth !== containerWidth) {
      setContainerWidth(nextWidth);
    }
  };

  return (
    <View style={[styles.container, { minHeight: baseLineHeight }]} onLayout={handleContainerLayout}>
      <Text numberOfLines={1} style={[styles.label, style, fittedStyle]}>
        {children}
      </Text>
    </View>
  );
}

function estimateTextWidth(text: string, fontSize: number) {
  const weight = Array.from(text).reduce((total, character) => {
    if (character === " ") {
      return total + 0.34;
    }

    if (/[MW@%#]/.test(character)) {
      return total + 0.95;
    }

    if (/[A-Z0-9]/.test(character)) {
      return total + 0.72;
    }

    if (/[ijlItf]/.test(character)) {
      return total + 0.36;
    }

    return total + 0.62;
  }, 0);

  return Math.ceil(weight * fontSize * 1.16);
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    justifyContent: "center",
    minWidth: 0,
    overflow: "hidden",
    width: "100%"
  },
  label: {
    includeFontPadding: false,
    textAlignVertical: "center",
    width: "100%"
  }
});
