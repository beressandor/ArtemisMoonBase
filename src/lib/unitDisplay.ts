import type { UnitDisplayValue, UnitSystem } from "@/lib/types";

export type UnitDisplaySource = string | UnitDisplayValue;

export const isUnitDisplayValue = (value: UnitDisplaySource): value is UnitDisplayValue =>
  typeof value === "object" && value !== null && "metric" in value && "imperial" in value;

export const formatUnitValue = (value: UnitDisplaySource, unitSystem: UnitSystem): string =>
  isUnitDisplayValue(value) ? value[unitSystem] : value;

const parseNumber = (value: string): number => Number(value.replaceAll(",", ""));

const formatCompactNumber = (value: number, maximumFractionDigits = 0): string =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);

const poundsToKilograms = (pounds: number): string => {
  const kilograms = pounds * 0.45359237;
  const rounded = kilograms >= 100 ? Math.round(kilograms / 10) * 10 : Math.round(kilograms);
  return `${formatCompactNumber(rounded)} kg`;
};

const kilogramsToPounds = (kilograms: number): string => {
  const pounds = kilograms / 0.45359237;
  const rounded = pounds >= 100 ? Math.round(pounds / 10) * 10 : Math.round(pounds);
  return `${formatCompactNumber(rounded)} lb`;
};

const mphToKmh = (mph: number): string => {
  const kmh = mph * 1.609344;
  const decimals = kmh < 20 ? 1 : 0;
  return `${formatCompactNumber(kmh, decimals)} km/h`;
};

const kmhToMph = (kmh: number): string => {
  const mph = kmh / 1.609344;
  const decimals = mph < 20 ? 1 : 0;
  return `${formatCompactNumber(mph, decimals)} mph`;
};

export const formatMeasurementText = (value: string, unitSystem: UnitSystem): string => {
  if (unitSystem === "metric") {
    return value
      .replace(/\b(\d[\d,]*(?:\.\d+)?)\s*lb\b/g, (_, amount: string) => poundsToKilograms(parseNumber(amount)))
      .replace(/\b(\d[\d,]*(?:\.\d+)?)\s*mph\b/g, (_, amount: string) => mphToKmh(parseNumber(amount)));
  }

  return value
    .replace(/\b(\d[\d,]*(?:\.\d+)?)\s*kg\b/g, (_, amount: string) => kilogramsToPounds(parseNumber(amount)))
    .replace(/\b(\d[\d,]*(?:\.\d+)?)\s*km\/h\b/g, (_, amount: string) => kmhToMph(parseNumber(amount)));
};
