import { describe, expect, it } from "vitest";
import { formatMeasurementText, formatUnitValue } from "./unitDisplay";

describe("unit display", () => {
  it("selects the requested structured unit value", () => {
    const value = { metric: "98 m", imperial: "322 ft" };

    expect(formatUnitValue(value, "metric")).toBe("98 m");
    expect(formatUnitValue(value, "imperial")).toBe("322 ft");
  });

  it("passes plain display strings through unchanged", () => {
    expect(formatUnitValue("Fully reusable", "metric")).toBe("Fully reusable");
  });

  it("converts recognizable equipment specs to metric units", () => {
    expect(formatMeasurementText("About 2,000 lb; more than 6 mph", "metric")).toBe(
      "About 910 kg; more than 9.7 km/h"
    );
  });

  it("keeps imperial source strings unchanged in imperial mode", () => {
    expect(formatMeasurementText("About 2,000 lb; more than 6 mph", "imperial")).toBe(
      "About 2,000 lb; more than 6 mph"
    );
  });
});
