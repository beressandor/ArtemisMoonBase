import { describe, expect, it } from "vitest";
import { missions } from "@/data/seed";
import { rockets } from "@/data/rockets";
import { localizeMission, localizeRocket } from "@/lib/contentTranslations";
import { formatScheduleDisplay } from "@/lib/schedule";

describe("content localization", () => {
  it("localizes known mission copy to Hungarian", () => {
    const mission = missions.find((item) => item.id === "artemis-iii");

    expect(mission).toBeDefined();
    expect(localizeMission(mission!, "hu").summary).toContain("Integrált műveleti teszt");
  });

  it("localizes rocket specs to Hungarian", () => {
    const rocket = rockets.find((item) => item.id === "sls");

    expect(rocket).toBeDefined();
    expect(localizeRocket(rocket!, "hu").keyMetrics[0].label).toBe("Magasság");
  });

  it("localizes planning date labels for display without changing source data", () => {
    const display = formatScheduleDisplay({ dateLabel: "Late 2027", datePrecision: "half" }, undefined, "hu");

    expect(display.primary).toBe("2027 vége");
  });
});
