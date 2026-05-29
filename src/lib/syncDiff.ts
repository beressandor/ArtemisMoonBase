import type { MissionEvent } from "@/lib/types";

export interface EventChange {
  field: "startsAt" | "dateLabel" | "status";
  before?: string;
  after?: string;
}

export const diffMissionEvent = (before: MissionEvent, after: MissionEvent): EventChange[] => {
  const changes: EventChange[] = [];

  if (before.startsAt !== after.startsAt) {
    changes.push({ field: "startsAt", before: before.startsAt, after: after.startsAt });
  }

  if (before.dateLabel !== after.dateLabel) {
    changes.push({ field: "dateLabel", before: before.dateLabel, after: after.dateLabel });
  }

  if (before.status !== after.status) {
    changes.push({ field: "status", before: before.status, after: after.status });
  }

  return changes;
};
