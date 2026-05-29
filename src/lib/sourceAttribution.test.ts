import { describe, expect, it } from "vitest";
import { sourceConfidenceLabel, uniqueSources } from "./sourceAttribution";
import type { SourceLink } from "./types";

describe("source attribution", () => {
  it("labels source confidence", () => {
    expect(sourceConfidenceLabel({ label: "NASA", url: "https://nasa.gov", confidence: "official" })).toBe("Official");
    expect(sourceConfidenceLabel({ label: "LL2", url: "https://ll.thespacedevs.com", confidence: "external" })).toBe(
      "External schedule"
    );
  });

  it("deduplicates source links by URL", () => {
    const sources: SourceLink[] = [
      { label: "NASA", url: "https://nasa.gov/a", confidence: "official" },
      { label: "NASA duplicate", url: "https://nasa.gov/a", confidence: "official" },
      { label: "LL2", url: "https://ll.thespacedevs.com", confidence: "external" }
    ];

    expect(uniqueSources(sources)).toHaveLength(2);
  });
});
