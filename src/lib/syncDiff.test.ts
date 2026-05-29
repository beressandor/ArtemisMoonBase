import { describe, expect, it } from "vitest";
import { diffMissionEvent } from "./syncDiff";
import type { MissionEvent } from "./types";

const baseEvent: MissionEvent = {
  id: "event",
  missionId: "artemis-iv",
  title: "Artemis IV",
  dateLabel: "Early 2028",
  datePrecision: "half",
  status: "planned",
  summary: "Planning baseline",
  sourceUrls: []
};

describe("sync diff", () => {
  it("records date and status changes", () => {
    const changes = diffMissionEvent(baseEvent, {
      ...baseEvent,
      startsAt: "2028-02-01T00:00:00Z",
      dateLabel: "Feb 01, 2028",
      status: "scheduled"
    });

    expect(changes.map((change) => change.field)).toEqual(["startsAt", "dateLabel", "status"]);
  });

  it("returns no changes for identical events", () => {
    expect(diffMissionEvent(baseEvent, baseEvent)).toEqual([]);
  });
});
