import type { SourceLink } from "@/lib/types";

const technicalSourceHosts = ["ll.thespacedevs.com", "thespacedevs.com"];
const technicalSourceLabels = ["launch library", "ll2"];

export const isTechnicalSource = (source: SourceLink): boolean => {
  const label = source.label.toLowerCase();
  const url = source.url.toLowerCase();

  return (
    technicalSourceLabels.some((technicalLabel) => label.includes(technicalLabel)) ||
    technicalSourceHosts.some((host) => url.includes(host))
  );
};

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
    if (isTechnicalSource(source)) {
      return false;
    }

    if (seen.has(source.url)) {
      return false;
    }

    seen.add(source.url);
    return true;
  });
};
