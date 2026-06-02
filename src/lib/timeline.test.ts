import { describe, expect, it } from "vitest";
import { equipment, missionEvents, missions } from "@/data/seed";
import { buildTimelineItems, defaultRoadmapFilters, filterTimelineItems, sortTimelineItems } from "./timeline";

describe("timeline utilities", () => {
  it("builds timeline items with events and equipment", () => {
    const items = buildTimelineItems(missions, missionEvents, equipment);
    const artemisThree = items.find((item) => item.mission.id === "artemis-iii");

    expect(artemisThree?.events.length).toBeGreaterThan(0);
    expect(artemisThree?.equipment.map((item) => item.id)).toContain("starship-hls");
  });

  it("filters by program and equipment category", () => {
    const items = buildTimelineItems(missions, missionEvents, equipment);
    const filtered = filterTimelineItems(items, {
      ...defaultRoadmapFilters,
      program: "artemis",
      equipmentCategory: "lander"
    });

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((item) => item.mission.programIds.includes("artemis"))).toBe(true);
    expect(filtered.some((item) => item.equipment.some((equipmentItem) => equipmentItem.category === "lander"))).toBe(true);
  });

  it("filters by search query", () => {
    const items = buildTimelineItems(missions, missionEvents, equipment);
    const filtered = filterTimelineItems(items, {
      ...defaultRoadmapFilters,
      query: "Gateway"
    });

    expect(filtered.map((item) => item.mission.id)).toContain("gateway-ppe-halo");
  });

  it("sorts roadmap items by best available schedule", () => {
    const items = sortTimelineItems(buildTimelineItems(missions, missionEvents, equipment));
    const viperIndex = items.findIndex((item) => item.mission.id === "viper-moon-base");
    const moonBaseOneIndex = items.findIndex((item) => item.mission.id === "moon-base-i");
    const moonBaseTwoIndex = items.findIndex((item) => item.mission.id === "moon-base-ii");

    expect(viperIndex).toBeLessThan(moonBaseTwoIndex);
    expect(moonBaseOneIndex).toBeLessThan(moonBaseTwoIndex);
  });
});
