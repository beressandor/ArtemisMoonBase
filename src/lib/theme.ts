import { Platform } from "react-native";

const headingFontFamily =
  Platform.select({
    ios: "Avenir Next",
    android: "sans-serif-medium",
    default: "Inter, Avenir Next, Segoe UI, sans-serif"
  }) ?? "System";

export const colors = {
  background: "#03050A",
  backgroundSoft: "#070B12",
  panel: "rgba(14, 20, 31, 0.92)",
  panelElevated: "rgba(20, 29, 44, 0.94)",
  panelGlass: "rgba(255, 255, 255, 0.055)",
  border: "rgba(136, 163, 194, 0.24)",
  borderSoft: "rgba(136, 163, 194, 0.14)",
  text: "#F8FBFF",
  textMuted: "#AAB7C9",
  textDim: "#667386",
  blue: "#8AE8FF",
  blueDeep: "#3B82FF",
  cyanMuted: "#2D6777",
  green: "#96F2C8",
  gold: "#FFD27A",
  red: "#FF8A8A",
  violet: "#C7B8FF",
  magenta: "#FF79C6",
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
