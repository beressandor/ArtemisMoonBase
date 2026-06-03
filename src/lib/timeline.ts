import { equipment, missionEvents, missions, phases } from "@/data/seed";
import { getScheduleSortTime } from "@/lib/schedule";
import type { Equipment, Mission, MissionEvent, Phase, RoadmapFilters, TimelineItem } from "@/lib/types";

export const hiddenRoadmapMissionIds = new Set([
  "moon-base-phase-one",
  "clps-cargo-cadence",
  "phase-two-sustained-stays",
  "phase-three-lunar-base"
]);

export const isRoadmapVisibleMission = (mission: Mission): boolean =>
  mission.status !== "completed" && !hiddenRoadmapMissionIds.has(mission.id);

export const filterRoadmapVisibleEvents = (events: MissionEvent[], missionList: Mission[]): MissionEvent[] => {
  const missionIds = new Set(missionList.filter(isRoadmapVisibleMission).map((mission) => mission.id));
  return events.filter((event) => missionIds.has(event.missionId));
};

export const defaultRoadmapFilters: RoadmapFilters = {
  program: "all",
  status: "all",
  phaseId: "all",
  equipmentCategory: "all",
  query: ""
};

export const buildTimelineItems = (
  missionList: Mission[] = missions,
  eventList: MissionEvent[] = missionEvents,
  equipmentList: Equipment[] = equipment,
  phaseList: Phase[] = phases
): TimelineItem[] =>
  missionList.map((mission) => ({
    mission,
    phase: phaseList.find((phase) => phase.id === mission.phaseId),
    events: eventList.filter((event) => event.missionId === mission.id),
    equipment: equipmentList.filter((item) => mission.equipmentIds.includes(item.id) || item.relatedMissionIds.includes(mission.id))
  }));

const dateScore = (item: TimelineItem): number => {
  const scores = [
    getScheduleSortTime(item.mission, item.phase?.startYear),
    ...item.events.map((event) => getScheduleSortTime(event))
  ].filter((score) => score !== Number.MAX_SAFE_INTEGER);

  return scores.length > 0 ? Math.min(...scores) : Number.MAX_SAFE_INTEGER;
};

export const sortTimelineItems = (items: TimelineItem[]): TimelineItem[] =>
  [...items].sort((a, b) => dateScore(a) - dateScore(b));

export const filterTimelineItems = (items: TimelineItem[], filters: RoadmapFilters): TimelineItem[] => {
  const query = filters.query.trim().toLowerCase();

  return items.filter((item) => {
    const matchesProgram = filters.program === "all" || item.mission.programIds.includes(filters.program);
    const matchesStatus =
      filters.status === "all" ||
      item.mission.status === filters.status ||
      (filters.status === "planned" && item.mission.status === "watch");
    const matchesPhase = filters.phaseId === "all" || item.mission.phaseId === filters.phaseId;
    const matchesEquipment =
      filters.equipmentCategory === "all" ||
      item.equipment.some((equipmentItem) => equipmentItem.category === filters.equipmentCategory);
    const matchesQuery =
      !query ||
      [
        item.mission.title,
        item.mission.subtitle,
        item.mission.classificationLabel ?? "",
        item.mission.summary,
        item.phase?.title ?? "",
        ...item.mission.objectives,
        ...item.equipment.map((equipmentItem) => equipmentItem.name)
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return matchesProgram && matchesStatus && matchesPhase && matchesEquipment && matchesQuery;
  });
};

export const getNextEvent = (events: MissionEvent[] = missionEvents): MissionEvent | undefined => {
  const now = Date.now();

  return [...events]
    .filter((event) => {
      if (event.status === "completed") {
        return false;
      }

      if (event.startsAt) {
        const parsed = new Date(event.startsAt).getTime();
        return Number.isNaN(parsed) || parsed >= now;
      }

      return getScheduleSortTime(event) !== Number.MAX_SAFE_INTEGER;
    })
    .sort((a, b) => getScheduleSortTime(a) - getScheduleSortTime(b))[0];
};
