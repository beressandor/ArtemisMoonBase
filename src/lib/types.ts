export type ProgramKey =
  | "artemis"
  | "moon-base"
  | "clps"
  | "gateway"
  | "surface-systems";

export type MissionStatus =
  | "planned"
  | "in-development"
  | "scheduled"
  | "active"
  | "completed"
  | "delayed"
  | "watch";

export type DatePrecision =
  | "exact"
  | "day"
  | "month"
  | "quarter"
  | "half"
  | "year"
  | "range"
  | "tbd";

export type SourceConfidence = "official" | "derived" | "watch" | "external";

export type EquipmentCategory =
  | "launch"
  | "crew"
  | "lander"
  | "rover"
  | "habitat"
  | "station"
  | "power"
  | "communications"
  | "science";

export interface SourceLink {
  label: string;
  url: string;
  confidence: SourceConfidence;
}

export interface Program {
  id: ProgramKey;
  name: string;
  accent: string;
  summary: string;
  sourceUrls: SourceLink[];
}

export interface Phase {
  id: string;
  programId: ProgramKey;
  title: string;
  dateLabel: string;
  startYear: number;
  endYear?: number;
  summary: string;
  focus: string[];
  sourceUrls: SourceLink[];
}

export interface MissionEvent {
  id: string;
  missionId: string;
  title: string;
  startsAt?: string;
  dateLabel: string;
  datePrecision: DatePrecision;
  status: MissionStatus;
  summary: string;
  sourceUrls: SourceLink[];
  externalSourceId?: string;
  lastSyncedAt?: string;
}

export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  programIds: ProgramKey[];
  phaseId?: string;
  status: MissionStatus;
  dateLabel: string;
  startsAt?: string;
  datePrecision: DatePrecision;
  classificationLabel?: string;
  summary: string;
  objectives: string[];
  equipmentIds: string[];
  landingRegion?: string;
  heroImageUrl?: string;
  sourceUrls: SourceLink[];
  lastSyncedAt?: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  owner: string;
  status: MissionStatus;
  summary: string;
  specs: Array<{ label: string; value: string }>;
  relatedMissionIds: string[];
  imageUrl?: string;
  imageQuery: string;
  sourceUrls: SourceLink[];
  lastSyncedAt?: string;
}

export interface LiveLink {
  id: string;
  title: string;
  type: "stream" | "tracking" | "launch-countdown" | "schedule";
  provider: string;
  url: string;
  status: MissionStatus;
  summary: string;
  isEmbedSafe: boolean;
  lastSyncedAt?: string;
}

export interface DashboardData {
  nextEvent?: MissionEvent;
  nextLaunch?: MissionEvent;
  recentlyChanged: MissionEvent[];
  highlightedMission?: Mission;
  highlightedEquipment?: Equipment;
  liveNow?: LiveLink;
  metrics: Array<{ label: string; value: string; tone: "blue" | "green" | "gold" | "red" }>;
}

export interface TimelineItem {
  mission: Mission;
  events: MissionEvent[];
  phase?: Phase;
  equipment: Equipment[];
}

export interface RoadmapFilters {
  program: ProgramKey | "all";
  status: MissionStatus | "all";
  phaseId: string | "all";
  equipmentCategory: EquipmentCategory | "all";
  query: string;
}

export interface NormalizedExternalEvent {
  externalId: string;
  externalSource: "launch-library-2" | "nasa-images";
  title: string;
  summary?: string;
  startsAt?: string;
  dateLabel: string;
  datePrecision: DatePrecision;
  status: MissionStatus;
  sourceUrl?: string;
  provider?: string;
  missionName?: string;
  vehicleName?: string;
  rawLastUpdated?: string;
}
