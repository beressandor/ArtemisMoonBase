import { Platform } from "react-native";

const headingFontFamily =
  Platform.select({
    ios: "Avenir Next",
    android: "sans-serif-medium",
    default: "Inter, Avenir Next, Segoe UI, sans-serif"
  }) ?? "System";

export const colors = {
  background: "#010204",
  backgroundSoft: "#070707",
  panel: "rgba(13, 14, 17, 0.94)",
  panelElevated: "rgba(22, 22, 25, 0.96)",
  panelGlass: "rgba(245, 241, 229, 0.045)",
  border: "rgba(225, 221, 210, 0.2)",
  borderSoft: "rgba(225, 221, 210, 0.1)",
  text: "#F5F1E7",
  textMuted: "#ADA89D",
  textDim: "#6F695E",
  blue: "#D9D4C7",
  blueDeep: "#9F9687",
  cyanMuted: "#3A3731",
  green: "#9BC79A",
  gold: "#D8B46A",
  red: "#D87B6A",
  violet: "#AFA79A",
  magenta: "#B9825F",
  white: "#FFFFFF",
  black: "#000000"
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32
};

export const radius = {
  sm: 8,
  md: 10,
  lg: 14
};

export const typography = {
  title: {
    fontFamily: headingFontFamily,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800" as const
  },
  h1: {
    fontFamily: headingFontFamily,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800" as const
  },
  h2: {
    fontFamily: headingFontFamily,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700" as const
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400" as const
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500" as const
  }
};

export const statusColor = {
  active: colors.green,
  scheduled: colors.blue,
  planned: colors.violet,
  "in-development": colors.gold,
  delayed: colors.red,
  completed: colors.textDim,
  watch: colors.gold
};
