import { describe, expect, it } from "vitest";
import { equipment, missionEvents, missions } from "@/data/seed";
import {
  buildTimelineItems,
  defaultRoadmapFilters,
  filterRoadmapVisibleEvents,
  filterTimelineItems,
  getNextEvent,
  hiddenRoadmapMissionIds,
  isRoadmapVisibleMission,
  sortTimelineItems
} from "./timeline";

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

  it("groups watch items under the planned filter", () => {
    const items = buildTimelineItems(missions, missionEvents, equipment);
    const filtered = filterTimelineItems(items, {
      ...defaultRoadmapFilters,
      status: "planned"
    });

    expect(filtered.map((item) => item.mission.id)).toContain("starship-hls-demo");
  });

  it("sorts roadmap items by best available schedule", () => {
    const items = sortTimelineItems(buildTimelineItems(missions, missionEvents, equipment));
    const viperIndex = items.findIndex((item) => item.mission.id === "viper-moon-base");
    const moonBaseOneIndex = items.findIndex((item) => item.mission.id === "moon-base-i");
    const moonBaseTwoIndex = items.findIndex((item) => item.mission.id === "moon-base-ii");

    expect(viperIndex).toBeLessThan(moonBaseTwoIndex);
    expect(moonBaseOneIndex).toBeLessThan(moonBaseTwoIndex);
  });

  it("marks legacy overview missions as hidden from the roadmap", () => {
    const hiddenMissions = missions.filter((mission) => hiddenRoadmapMissionIds.has(mission.id));

    expect(hiddenMissions.map((mission) => mission.id)).toContain("clps-cargo-cadence");
    expect(hiddenMissions.every((mission) => !isRoadmapVisibleMission(mission))).toBe(true);
    expect(isRoadmapVisibleMission(missions.find((mission) => mission.id === "artemis-iii")!)).toBe(true);
  });

  it("filters dashboard event candidates to roadmap-visible missions", () => {
    const candidates = filterRoadmapVisibleEvents(missionEvents, missions);
    const candidateMissionIds = new Set(candidates.map((event) => event.missionId));

    expect(candidateMissionIds.has("clps-cargo-cadence")).toBe(false);
    expect(candidateMissionIds.has("moon-base-phase-one")).toBe(false);
    expect(candidateMissionIds.has("artemis-iii")).toBe(true);
  });

  it("uses planned roadmap labels when choosing the next major event", () => {
    const next = getNextEvent([
      {
        id: "phase-two",
        missionId: "phase-two-sustained-stays",
        title: "Phase Two target start",
        startsAt: "2029-01-01T00:00:00Z",
        dateLabel: "2029",
        datePrecision: "year",
        status: "planned",
        summary: "",
        sourceUrls: []
      },
      {
        id: "artemis-iii",
        missionId: "artemis-iii",
        title: "Artemis III LEO rendezvous and docking demo",
        dateLabel: "2027",
        datePrecision: "year",
        status: "in-development",
        summary: "",
        sourceUrls: []
      },
      {
        id: "viper",
        missionId: "viper-moon-base",
        title: "VIPER delivery to lunar surface",
        dateLabel: "Late 2027",
        datePrecision: "half",
        status: "planned",
        summary: "",
        sourceUrls: []
      }
    ]);

    expect(next?.id).toBe("artemis-iii");
  });
});
