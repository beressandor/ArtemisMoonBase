import { equipment, missionEvents, missions, phases } from "@/data/seed";
import type { Equipment, Mission, MissionEvent, RoadmapFilters, TimelineItem } from "@/lib/types";

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
  equipmentList: Equipment[] = equipment
): TimelineItem[] =>
  missionList.map((mission) => ({
    mission,
    phase: phases.find((phase) => phase.id === mission.phaseId),
    events: eventList.filter((event) => event.missionId === mission.id),
    equipment: equipmentList.filter((item) => mission.equipmentIds.includes(item.id) || item.relatedMissionIds.includes(mission.id))
  }));

const dateScore = (item: TimelineItem): number => {
  const explicit = item.mission.startsAt ?? item.events.find((event) => event.startsAt)?.startsAt;
  if (explicit) {
    const parsed = new Date(explicit).getTime();
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  if (item.phase?.startYear) {
    return Date.UTC(item.phase.startYear, 0, 1);
  }

  const year = item.mission.dateLabel.match(/\d{4}/)?.[0];
  return year ? Date.UTC(Number(year), 0, 1) : Number.MAX_SAFE_INTEGER;
};

export const sortTimelineItems = (items: TimelineItem[]): TimelineItem[] =>
  [...items].sort((a, b) => dateScore(a) - dateScore(b));

export const filterTimelineItems = (items: TimelineItem[], filters: RoadmapFilters): TimelineItem[] => {
  const query = filters.query.trim().toLowerCase();

  return items.filter((item) => {
    const matchesProgram = filters.program === "all" || item.mission.programIds.includes(filters.program);
    const matchesStatus = filters.status === "all" || item.mission.status === filters.status;
    const matchesPhase = filters.phaseId === "all" || item.mission.phaseId === filters.phaseId;
    const matchesEquipment =
      filters.equipmentCategory === "all" ||
      item.equipment.some((equipmentItem) => equipmentItem.category === filters.equipmentCategory);
    const matchesQuery =
      !query ||
      [
        item.mission.title,
        item.mission.subtitle,
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
    .filter((event) => event.startsAt && new Date(event.startsAt).getTime() >= now)
    .sort((a, b) => new Date(a.startsAt ?? 0).getTime() - new Date(b.startsAt ?? 0).getTime())[0];
};
