import type { DatePrecision, MissionStatus, NormalizedExternalEvent } from "../types";

type LL2Precision = string | { name?: string; abbrev?: string } | null | undefined;

interface LL2Status {
  name?: string;
  abbrev?: string;
}

interface LL2Program {
  name?: string;
}

export interface LL2LaunchLike {
  id: string;
  url?: string;
  name: string;
  status?: LL2Status;
  net?: string | null;
  net_precision?: LL2Precision;
  window_start?: string | null;
  window_end?: string | null;
  last_updated?: string;
  launch_service_provider?: { name?: string };
  rocket?: {
    configuration?: {
      name?: string;
      full_name?: string;
    };
  };
  mission?: {
    name?: string;
    description?: string;
  } | null;
  program?: LL2Program[];
}

export interface LL2EventLike {
  id: string;
  url?: string;
  name: string;
  description?: string | null;
  date?: string | null;
  date_precision?: LL2Precision;
  last_updated?: string;
  type?: { name?: string };
  program?: LL2Program[];
  video_url?: string | null;
  news_url?: string | null;
}

export const normalizePrecision = (precision: LL2Precision, fallbackDate?: string | null): DatePrecision => {
  if (!precision) {
    return fallbackDate ? "day" : "tbd";
  }

  const raw = typeof precision === "string" ? precision : `${precision.name ?? ""} ${precision.abbrev ?? ""}`;
  const value = raw.toLowerCase();

  if (value.includes("second") || value.includes("minute") || value.includes("hour")) {
    return "exact";
  }

  if (value.includes("day") || value.includes("date")) {
    return "day";
  }

  if (value.includes("month")) {
    return "month";
  }

  if (value.includes("quarter")) {
    return "quarter";
  }

  if (value.includes("half")) {
    return "half";
  }

  if (value.includes("year")) {
    return "year";
  }

  if (value.includes("tbd") || value.includes("unknown")) {
    return "tbd";
  }

  return fallbackDate ? "day" : "tbd";
};

export const normalizeStatus = (status?: LL2Status): MissionStatus => {
  const raw = `${status?.abbrev ?? ""} ${status?.name ?? ""}`.toLowerCase();

  if (raw.includes("success")) {
    return "completed";
  }

  if (raw.includes("hold") || raw.includes("delay") || raw.includes("failure") || raw.includes("partial")) {
    return "delayed";
  }

  if (raw.includes("go") || raw.includes("in flight")) {
    return "scheduled";
  }

  if (raw.includes("tbc") || raw.includes("tbd") || raw.includes("to be")) {
    return "watch";
  }

  return "watch";
};

export const formatDateLabel = (date?: string | null, precision: DatePrecision = "tbd"): string => {
  if (!date) {
    return "TBD";
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return "TBD";
  }

  const month = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" }).format(parsed);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit", timeZone: "UTC" }).format(parsed);
  const year = new Intl.DateTimeFormat("en", { year: "numeric", timeZone: "UTC" }).format(parsed);

  if (precision === "year") {
    return year;
  }

  if (precision === "month") {
    return `${month} ${year}`;
  }

  if (precision === "exact") {
    const time = new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC"
    }).format(parsed);
    return `${month} ${day}, ${year} ${time} UTC`;
  }

  return `${month} ${day}, ${year}`;
};

export const isLunarProgram = (program?: LL2Program[]): boolean =>
  Boolean(program?.some((item) => /artemis|clps|gateway|moon|lunar/i.test(item.name ?? "")));

export const normalizeLaunchLibraryLaunch = (launch: LL2LaunchLike): NormalizedExternalEvent => {
  const startsAt = launch.net ?? launch.window_start ?? undefined;
  const precision = normalizePrecision(launch.net_precision, startsAt);

  return {
    externalId: `ll2-launch-${launch.id}`,
    externalSource: "launch-library-2",
    title: launch.name,
    summary: launch.mission?.description ?? undefined,
    startsAt,
    dateLabel: formatDateLabel(startsAt, precision),
    datePrecision: precision,
    status: normalizeStatus(launch.status),
    sourceUrl: launch.url,
    provider: launch.launch_service_provider?.name,
    missionName: launch.mission?.name ?? launch.name,
    vehicleName: launch.rocket?.configuration?.full_name ?? launch.rocket?.configuration?.name,
    rawLastUpdated: launch.last_updated
  };
};

export const normalizeLaunchLibraryEvent = (event: LL2EventLike): NormalizedExternalEvent => {
  const startsAt = event.date ?? undefined;
  const precision = normalizePrecision(event.date_precision, startsAt);

  return {
    externalId: `ll2-event-${event.id}`,
    externalSource: "launch-library-2",
    title: event.name,
    summary: event.description ?? undefined,
    startsAt,
    dateLabel: formatDateLabel(startsAt, precision),
    datePrecision: precision,
    status: startsAt ? "scheduled" : "watch",
    sourceUrl: event.url ?? event.video_url ?? event.news_url ?? undefined,
    provider: event.type?.name,
    missionName: event.name,
    rawLastUpdated: event.last_updated
  };
};
