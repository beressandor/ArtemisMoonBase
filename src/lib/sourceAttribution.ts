import type { SourceLink } from "@/lib/types";

export const sourceConfidenceLabel = (source: SourceLink): string => {
  if (source.confidence === "official") {
    return "Official";
  }

  if (source.confidence === "external") {
    return "External schedule";
  }

  if (source.confidence === "derived") {
    return "Derived";
  }

  return "Watch";
};

export const uniqueSources = (sources: SourceLink[]): SourceLink[] => {
  const seen = new Set<string>();
  return sources.filter((source) => {
    if (seen.has(source.url)) {
      return false;
    }

    seen.add(source.url);
    return true;
  });
};
