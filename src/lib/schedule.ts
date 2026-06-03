import type { DatePrecision, MissionEvent, MissionStatus, TimelineItem } from "@/lib/types";
import type { Language } from "@/store/useLanguageStore";

type ScheduleSource = {
  startsAt?: string | null;
  dateLabel: string;
  datePrecision: DatePrecision;
  status?: MissionStatus;
  externalSourceId?: string;
};

export type ScheduleDisplay = {
  primary: string;
  secondary: string;
  caption: string;
  isLive: boolean;
};

const monthDayFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "2-digit",
  timeZone: "UTC"
});

const yearFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  timeZone: "UTC"
});

const timeFormatter = new Intl.DateTimeFormat("en", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC"
});

const pad = (value: number): string => String(value).padStart(2, "0");

const formatNumericDate = (date: Date): string =>
  `${date.getUTCFullYear()}.${pad(date.getUTCMonth() + 1)}.${pad(date.getUTCDate())}`;

const monthIndex: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11
};

const normalizeLabel = (label: string): string => label.replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();

const normalizeRange = (label: string): string => {
  const beyond = label.match(/^(\d{4})\s*-\s*beyond$/i);
  if (beyond) {
    return `${beyond[1]}+`;
  }

  return label.replace(/\s*-\s*/g, "-");
};

const localizeScheduleText = (value: string, language: Language): string => {
  if (language !== "hu") {
    return value;
  }

  if (value === "Rolling") {
    return "Folyamatos";
  }

  if (value === "TBD") {
    return "TBD";
  }

  const nowRange = value.match(/^Now-(\d{4})$/);
  if (nowRange) {
    return `Most-${nowRange[1]}`;
  }

  const early = value.match(/^Early\s+(\d{4})$/i);
  if (early) {
    return `${early[1]} eleje`;
  }

  const mid = value.match(/^Mid\s+(\d{4})$/i);
  if (mid) {
    return `${mid[1]} közepe`;
  }

  const late = value.match(/^Late\s+(\d{4})$/i);
  if (late) {
    return `${late[1]} vége`;
  }

  return value;
};

const localizeScheduleDisplay = (display: ScheduleDisplay, language: Language): ScheduleDisplay => ({
  ...display,
  primary: localizeScheduleText(display.primary, language),
  secondary: localizeScheduleText(display.secondary, language),
  caption: localizeScheduleText(display.caption, language)
});

const labelToDisplay = (dateLabel: string, datePrecision: DatePrecision, language: Language): ScheduleDisplay => {
  const raw = normalizeLabel(dateLabel || "TBD");
  const lower = raw.toLowerCase();
  let primary = raw;
  let secondary = "";

  if (lower === "schedule watch" || lower === "tbd") {
    return localizeScheduleDisplay({ primary: "TBD", secondary: "", caption: "", isLive: false }, language);
  }

  if (lower === "tracked by ll2") {
    return localizeScheduleDisplay({ primary: "TBD", secondary: "", caption: "", isLive: true }, language);
  }

  if (lower === "rolling schedule") {
    return localizeScheduleDisplay({ primary: "Rolling", secondary: "", caption: "", isLive: false }, language);
  }

  if (/planning baseline/i.test(primary)) {
    primary = primary.replace(/planning baseline/i, "").trim();
  }

  if (/\bwatch\b/i.test(primary)) {
    primary = primary.replace(/\bwatch\b/i, "").trim();
  }

  if (/^now\s*-\s*\d{4}$/i.test(primary)) {
    secondary = "";
  }

  if (/^\d{4}\s*-\s*beyond$/i.test(primary)) {
    secondary = "";
  }

  primary = normalizeRange(primary);

  return localizeScheduleDisplay({
    primary: primary || "TBD",
    secondary,
    caption: secondary,
    isLive: false
  }, language);
};

export const formatScheduleDisplay = (source: ScheduleSource, caption?: string, language: Language = "en"): ScheduleDisplay => {
  if (source.startsAt) {
    const parsed = new Date(source.startsAt);

    if (!Number.isNaN(parsed.getTime())) {
      const year = yearFormatter.format(parsed);
      const isLive = source.externalSourceId === "launch-library-2";

      if (source.datePrecision === "exact") {
        return localizeScheduleDisplay({
          primary: formatNumericDate(parsed),
          secondary: timeFormatter.format(parsed),
          caption: caption ?? "",
          isLive
        }, language);
      }

      if (source.datePrecision === "day") {
        return localizeScheduleDisplay({
          primary: formatNumericDate(parsed),
          secondary: "",
          caption: caption ?? "",
          isLive
        }, language);
      }

      if (source.datePrecision === "month") {
        return localizeScheduleDisplay({
          primary: `${parsed.getUTCFullYear()}.${pad(parsed.getUTCMonth() + 1)}`,
          secondary: "",
          caption: caption ?? "",
          isLive
        }, language);
      }

      if (source.datePrecision === "year") {
        return localizeScheduleDisplay({
          primary: year,
          secondary: "",
          caption: caption ?? "",
          isLive
        }, language);
      }

      return localizeScheduleDisplay({
        primary: monthDayFormatter.format(parsed),
        secondary: year,
        caption: caption ?? "",
        isLive
      }, language);
    }
  }

  const display = labelToDisplay(source.dateLabel, source.datePrecision, language);
  return caption ? localizeScheduleDisplay({ ...display, caption }, language) : display;
};

const isVagueLabel = (label: string): boolean => /schedule watch|tracked by ll2|rolling schedule|tbd/i.test(label);

export const getTimelineSchedule = (item: TimelineItem, language: Language = "en"): ScheduleDisplay => {
  const datedEvents = [...item.events]
    .filter((event) => event.startsAt)
    .sort((a, b) => new Date(a.startsAt ?? 0).getTime() - new Date(b.startsAt ?? 0).getTime());
  const liveEvent = datedEvents.find((event) => event.externalSourceId === "launch-library-2") ?? datedEvents[0];

  if (!item.mission.startsAt && liveEvent && isVagueLabel(item.mission.dateLabel)) {
    return formatScheduleDisplay(liveEvent, liveEvent.externalSourceId === "launch-library-2" ? "" : liveEvent.title, language);
  }

  return formatScheduleDisplay(item.mission, undefined, language);
};

export const getScheduleSortTime = (source: ScheduleSource, fallbackYear?: number): number => {
  if (source.startsAt) {
    const parsed = new Date(source.startsAt).getTime();
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  const label = normalizeLabel(source.dateLabel).toLowerCase();

  const nowRange = label.match(/^now\s*-\s*(\d{4})$/);
  if (nowRange) {
    return Date.UTC(Number(nowRange[1]), 11, 31);
  }

  const modifierYear = label.match(/\b(early|mid|late)\s+(\d{4})\b/);
  if (modifierYear) {
    const year = Number(modifierYear[2]);
    const month = modifierYear[1] === "early" ? 0 : modifierYear[1] === "mid" ? 5 : 9;
    return Date.UTC(year, month, 1);
  }

  const monthYear = label.match(/\b([a-z]{3,9})\s+(\d{4})\b/);
  if (monthYear && monthYear[1] in monthIndex) {
    return Date.UTC(Number(monthYear[2]), monthIndex[monthYear[1]], 1);
  }

  const decade = label.match(/\b(early|mid|late)?\s*(\d{4})s\b/);
  if (decade) {
    const baseYear = Number(decade[2]);
    const offset = decade[1] === "early" ? 1 : decade[1] === "mid" ? 5 : decade[1] === "late" ? 8 : 5;
    return Date.UTC(baseYear + offset, 0, 1);
  }

  const range = label.match(/\b(\d{4})\s*-\s*(\d{4}|beyond)\b/);
  if (range) {
    return Date.UTC(Number(range[1]), 0, 1);
  }

  const year = label.match(/\b(\d{4})\b/);
  if (year) {
    return Date.UTC(Number(year[1]), 0, 1);
  }

  if (fallbackYear) {
    return Date.UTC(fallbackYear, 0, 1);
  }

  return Number.MAX_SAFE_INTEGER;
};

export const getEventScheduleDisplay = (event: MissionEvent, language: Language = "en"): ScheduleDisplay =>
  formatScheduleDisplay(event, event.externalSourceId === "launch-library-2" ? "" : undefined, language);
