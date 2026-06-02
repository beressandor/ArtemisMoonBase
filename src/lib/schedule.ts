import type { DatePrecision, MissionEvent, MissionStatus, TimelineItem } from "@/lib/types";

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

const normalizeLabel = (label: string): string => label.replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();

const normalizeRange = (label: string): string => {
  const beyond = label.match(/^(\d{4})\s*-\s*beyond$/i);
  if (beyond) {
    return `${beyond[1]}+`;
  }

  return label.replace(/\s*-\s*/g, "-");
};

const labelToDisplay = (dateLabel: string, datePrecision: DatePrecision): ScheduleDisplay => {
  const raw = normalizeLabel(dateLabel || "TBD");
  const lower = raw.toLowerCase();
  let primary = raw;
  let secondary = "";

  if (lower === "schedule watch" || lower === "tbd") {
    return { primary: "TBD", secondary: "", caption: "", isLive: false };
  }

  if (lower === "tracked by ll2") {
    return { primary: "TBD", secondary: "", caption: "Launch Library 2", isLive: true };
  }

  if (lower === "rolling schedule") {
    return { primary: "Rolling", secondary: "", caption: "", isLive: false };
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

  return {
    primary: primary || "TBD",
    secondary,
    caption: secondary,
    isLive: false
  };
};

export const formatScheduleDisplay = (source: ScheduleSource, caption?: string): ScheduleDisplay => {
  if (source.startsAt) {
    const parsed = new Date(source.startsAt);

    if (!Number.isNaN(parsed.getTime())) {
      const year = yearFormatter.format(parsed);
      const isLive = source.externalSourceId === "launch-library-2";

      if (source.datePrecision === "exact") {
        return {
          primary: formatNumericDate(parsed),
          secondary: timeFormatter.format(parsed),
          caption: caption ?? "",
          isLive
        };
      }

      if (source.datePrecision === "day") {
        return {
          primary: formatNumericDate(parsed),
          secondary: "",
          caption: caption ?? "",
          isLive
        };
      }

      if (source.datePrecision === "month") {
        return {
          primary: `${parsed.getUTCFullYear()}.${pad(parsed.getUTCMonth() + 1)}`,
          secondary: "",
          caption: caption ?? "",
          isLive
        };
      }

      if (source.datePrecision === "year") {
        return {
          primary: year,
          secondary: "",
          caption: caption ?? "",
          isLive
        };
      }

      return {
        primary: monthDayFormatter.format(parsed),
        secondary: year,
        caption: caption ?? "",
        isLive
      };
    }
  }

  const display = labelToDisplay(source.dateLabel, source.datePrecision);
  return caption ? { ...display, caption } : display;
};

const isVagueLabel = (label: string): boolean => /schedule watch|tracked by ll2|rolling schedule|tbd/i.test(label);

export const getTimelineSchedule = (item: TimelineItem): ScheduleDisplay => {
  const datedEvents = [...item.events]
    .filter((event) => event.startsAt)
    .sort((a, b) => new Date(a.startsAt ?? 0).getTime() - new Date(b.startsAt ?? 0).getTime());
  const liveEvent = datedEvents.find((event) => event.externalSourceId === "launch-library-2") ?? datedEvents[0];

  if (!item.mission.startsAt && liveEvent && isVagueLabel(item.mission.dateLabel)) {
    return formatScheduleDisplay(liveEvent, liveEvent.externalSourceId === "launch-library-2" ? "Launch Library 2" : liveEvent.title);
  }

  return formatScheduleDisplay(item.mission);
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

export const getEventScheduleDisplay = (event: MissionEvent): ScheduleDisplay =>
  formatScheduleDisplay(event, event.externalSourceId === "launch-library-2" ? "Launch Library 2" : undefined);
