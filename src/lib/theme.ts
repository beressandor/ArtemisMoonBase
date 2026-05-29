export const colors = {
  background: "#070A0F",
  backgroundSoft: "#0B1018",
  panel: "#111722",
  panelElevated: "#151D2B",
  border: "#263143",
  borderSoft: "#1D2736",
  text: "#F7FAFC",
  textMuted: "#A9B4C5",
  textDim: "#6F7B8E",
  blue: "#8FE3FF",
  blueDeep: "#3D6DFF",
  green: "#9BE7C8",
  gold: "#F8C471",
  red: "#FF8A8A",
  violet: "#C7D2FE",
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
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700" as const
  },
  h1: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700" as const
  },
  h2: {
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
