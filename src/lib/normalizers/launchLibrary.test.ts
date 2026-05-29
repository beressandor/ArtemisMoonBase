import { describe, expect, it } from "vitest";
import {
  formatDateLabel,
  isLunarProgram,
  normalizeLaunchLibraryEvent,
  normalizeLaunchLibraryLaunch,
  normalizePrecision,
  normalizeStatus
} from "./launchLibrary";

describe("Launch Library 2 normalizers", () => {
  it("maps precision values into app date precision", () => {
    expect(normalizePrecision({ name: "Second", abbrev: "SEC" }, "2028-01-01T00:00:00Z")).toBe("exact");
    expect(normalizePrecision({ name: "Month" }, "2028-01-01T00:00:00Z")).toBe("month");
    expect(normalizePrecision("Year", "2028-01-01T00:00:00Z")).toBe("year");
    expect(normalizePrecision("TBD", null)).toBe("tbd");
  });

  it("maps Launch Library status into mission status", () => {
    expect(normalizeStatus({ abbrev: "Go", name: "Go for Launch" })).toBe("scheduled");
    expect(normalizeStatus({ abbrev: "TBC", name: "To Be Confirmed" })).toBe("watch");
    expect(normalizeStatus({ name: "Launch Failure" })).toBe("delayed");
    expect(normalizeStatus({ name: "Success" })).toBe("completed");
  });

  it("formats date labels by precision", () => {
    expect(formatDateLabel("2028-01-12T15:30:00Z", "exact")).toContain("15:30 UTC");
    expect(formatDateLabel("2028-01-12T15:30:00Z", "month")).toBe("Jan 2028");
    expect(formatDateLabel(null, "tbd")).toBe("TBD");
  });

  it("identifies lunar programs", () => {
    expect(isLunarProgram([{ name: "Artemis" }])).toBe(true);
    expect(isLunarProgram([{ name: "Commercial Crew" }])).toBe(false);
  });

  it("normalizes launch records", () => {
    const normalized = normalizeLaunchLibraryLaunch({
      id: "abc",
      name: "Artemis IV",
      url: "https://example.com/launch",
      net: "2028-02-01T00:00:00Z",
      net_precision: { name: "Day" },
      status: { name: "To Be Confirmed", abbrev: "TBC" },
      launch_service_provider: { name: "NASA" },
      rocket: { configuration: { full_name: "Space Launch System Block 1B" } },
      mission: { name: "Artemis IV", description: "Gateway mission" }
    });

    expect(normalized.externalId).toBe("ll2-launch-abc");
    expect(normalized.status).toBe("watch");
    expect(normalized.vehicleName).toContain("Space Launch System");
  });

  it("normalizes event records", () => {
    const normalized = normalizeLaunchLibraryEvent({
      id: "evt",
      name: "NASA Artemis briefing",
      date: "2028-01-01T12:00:00Z",
      date_precision: "Hour",
      description: "Briefing",
      type: { name: "Press Event" },
      video_url: "https://example.com/video"
    });

    expect(normalized.externalId).toBe("ll2-event-evt");
    expect(normalized.datePrecision).toBe("exact");
    expect(normalized.status).toBe("scheduled");
  });
});
