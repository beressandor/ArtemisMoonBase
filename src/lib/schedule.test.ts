import { describe, expect, it } from "vitest";
import { formatScheduleDisplay, getScheduleSortTime } from "./schedule";

describe("schedule display utilities", () => {
  it("separates planning labels from the visible date", () => {
    const display = formatScheduleDisplay({ dateLabel: "2027 planning baseline", datePrecision: "year" });

    expect(display.primary).toBe("2027");
    expect(display.secondary).toBe("");
  });

  it("removes watch labels from the visible date", () => {
    const display = formatScheduleDisplay({ dateLabel: "2027 watch", datePrecision: "year" });

    expect(display.primary).toBe("2027");
    expect(display.secondary).toBe("");
  });

  it("formats exact dates as compact numeric badges", () => {
    const display = formatScheduleDisplay({
      startsAt: "2027-06-12T14:30:00Z",
      dateLabel: "Jun 12, 2027",
      datePrecision: "exact"
    });

    expect(display.primary).toBe("2027.06.12");
    expect(display.secondary).toBe("14:30");
  });

  it("sorts late decade windows after explicit earlier years", () => {
    expect(getScheduleSortTime({ dateLabel: "Late 2020s", datePrecision: "range" })).toBeGreaterThan(
      getScheduleSortTime({ dateLabel: "2027", datePrecision: "year" })
    );
  });

  it("sorts now ranges after concrete milestones inside the range", () => {
    const nowRange = getScheduleSortTime({ dateLabel: "Now-2029", datePrecision: "range" }, 2026);

    expect(nowRange).toBeGreaterThan(getScheduleSortTime({ dateLabel: "Late 2027", datePrecision: "half" }));
    expect(nowRange).toBeGreaterThan(getScheduleSortTime({ dateLabel: "2028", datePrecision: "year" }));
  });
});
