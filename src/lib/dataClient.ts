import { equipment, liveLinks, missionEvents, missions, phases, programs } from "@/data/seed";
import { supabase } from "@/lib/supabase";
import { getNextEvent } from "@/lib/timeline";
import type {
  DashboardData,
  Equipment,
  LiveLink,
  Mission,
  MissionEvent,
  Phase,
  Program,
  SourceLink
} from "@/lib/types";

type DbMission = {
  id: string;
  title: string;
  subtitle: string;
  program_ids: string[];
  phase_id?: string | null;
  status: Mission["status"];
  date_label: string;
  starts_at?: string | null;
  date_precision: Mission["datePrecision"];
  classification_label?: string | null;
  summary: string;
  objectives: string[];
  landing_region?: string | null;
  hero_image_url?: string | null;
  source_urls: SourceLink[];
  last_synced_at?: string | null;
};

type DbMissionEvent = {
  id: string;
  mission_id?: string | null;
  title: string;
  starts_at?: string | null;
  date_label: string;
  date_precision: MissionEvent["datePrecision"];
  status: MissionEvent["status"];
  summary: string;
  source_urls: SourceLink[];
  external_source?: string | null;
  last_synced_at?: string | null;
};

type DbEquipment = {
  id: string;
  name: string;
  category: Equipment["category"];
  owner: string;
  status: Equipment["status"];
  summary: string;
  specs: Equipment["specs"];
  image_url?: string | null;
  image_query: string;
  source_urls: SourceLink[];
  last_synced_at?: string | null;
};

type DbEquipmentLink = {
  equipment_id: string;
  mission_id: string;
};

type DbPhase = {
  id: string;
  program_id: Program["id"];
  title: string;
  date_label: string;
  start_year: number;
  end_year?: number | null;
  summary: string;
  focus: string[];
  source_urls: SourceLink[];
};

type DbProgram = {
  id: Program["id"];
  name: string;
  accent: string;
  summary: string;
  source_urls: SourceLink[];
};

type DbLiveLink = {
  id: string;
  title: string;
  type: LiveLink["type"];
  provider: string;
  url: string;
  status: LiveLink["status"];
  summary: string;
  is_embed_safe: boolean;
  last_synced_at?: string | null;
};

const fallbackOnError = async <T>(operation: () => Promise<T>, fallback: T): Promise<T> => {
  if (!supabase) {
    return fallback;
  }

  try {
    return await operation();
  } catch (error) {
    console.warn("Supabase read failed, using bundled seed data.", error);
    return fallback;
  }
};

export const listPrograms = (): Promise<Program[]> =>
  fallbackOnError(async () => {
    const { data, error } = await supabase!.from("programs").select("*").order("name");
    if (error) throw error;
    return ((data ?? []) as DbProgram[]).map((program) => ({
      id: program.id,
      name: program.name,
      accent: program.accent,
      summary: program.summary,
      sourceUrls: program.source_urls ?? []
    }));
  }, programs);

export const listPhases = (): Promise<Phase[]> =>
  fallbackOnError(async () => {
    const { data, error } = await supabase!.from("phases").select("*").order("start_year");
    if (error) throw error;
    return ((data ?? []) as DbPhase[]).map((phase) => ({
      id: phase.id,
      programId: phase.program_id,
      title: phase.title,
      dateLabel: phase.date_label,
      startYear: phase.start_year,
      endYear: phase.end_year ?? undefined,
      summary: phase.summary,
      focus: phase.focus ?? [],
      sourceUrls: phase.source_urls ?? []
    }));
  }, phases);

export const listMissions = (): Promise<Mission[]> =>
  fallbackOnError(async () => {
    const { data, error } = await supabase!.from("missions").select("*").order("date_label");
    if (error) throw error;
    return ((data ?? []) as DbMission[]).map((mission) => ({
      id: mission.id,
      title: mission.title,
      subtitle: mission.subtitle,
      programIds: mission.program_ids as Mission["programIds"],
      phaseId: mission.phase_id ?? undefined,
      status: mission.status,
      dateLabel: mission.date_label,
      startsAt: mission.starts_at ?? undefined,
      datePrecision: mission.date_precision,
      classificationLabel: mission.classification_label ?? undefined,
      summary: mission.summary,
      objectives: mission.objectives ?? [],
      equipmentIds: [],
      landingRegion: mission.landing_region ?? undefined,
      heroImageUrl: mission.hero_image_url ?? undefined,
      sourceUrls: mission.source_urls ?? [],
      lastSyncedAt: mission.last_synced_at ?? undefined
    }));
  }, missions);

export const listMissionEvents = (): Promise<MissionEvent[]> =>
  fallbackOnError(async () => {
    const { data, error } = await supabase!.from("mission_events").select("*").order("starts_at");
    if (error) throw error;
    return ((data ?? []) as DbMissionEvent[]).map((event) => ({
      id: event.id,
      missionId: event.mission_id ?? "unassigned",
      title: event.title,
      startsAt: event.starts_at ?? undefined,
      dateLabel: event.date_label,
      datePrecision: event.date_precision,
      status: event.status,
      summary: event.summary,
      sourceUrls: event.source_urls ?? [],
      externalSourceId: event.external_source ?? undefined,
      lastSyncedAt: event.last_synced_at ?? undefined
    }));
  }, missionEvents);

export const listEquipment = (): Promise<Equipment[]> =>
  fallbackOnError(async () => {
    const [{ data: equipmentRows, error: equipmentError }, { data: links, error: linkError }] = await Promise.all([
      supabase!.from("equipment").select("*").order("name"),
      supabase!.from("equipment_links").select("*")
    ]);

    if (equipmentError) throw equipmentError;
    if (linkError) throw linkError;

    const linksByEquipment = new Map<string, string[]>();
    for (const link of ((links ?? []) as DbEquipmentLink[])) {
      linksByEquipment.set(link.equipment_id, [...(linksByEquipment.get(link.equipment_id) ?? []), link.mission_id]);
    }

    return ((equipmentRows ?? []) as DbEquipment[]).map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      owner: item.owner,
      status: item.status,
      summary: item.summary,
      specs: item.specs ?? [],
      relatedMissionIds: linksByEquipment.get(item.id) ?? [],
      imageUrl: item.image_url ?? undefined,
      imageQuery: item.image_query,
      sourceUrls: item.source_urls ?? [],
      lastSyncedAt: item.last_synced_at ?? undefined
    }));
  }, equipment);

export const listLiveLinks = (): Promise<LiveLink[]> =>
  fallbackOnError(async () => {
    const { data, error } = await supabase!.from("live_links").select("*").order("title");
    if (error) throw error;
    return ((data ?? []) as DbLiveLink[]).map((link) => ({
      id: link.id,
      title: link.title,
      type: link.type,
      provider: link.provider,
      url: link.url,
      status: link.status,
      summary: link.summary,
      isEmbedSafe: link.is_embed_safe,
      lastSyncedAt: link.last_synced_at ?? undefined
    }));
  }, liveLinks);

export const getDashboardData = async (): Promise<DashboardData> => {
  const [allEvents, allMissions, allEquipment, allLiveLinks] = await Promise.all([
    listMissionEvents(),
    listMissions(),
    listEquipment(),
    listLiveLinks()
  ]);

  const nextEvent = getNextEvent(allEvents) ?? allEvents.find((event) => event.status === "watch") ?? allEvents[0];
  const nextLaunch =
    allEvents.find((event) => event.externalSourceId === "launch-library-2") ??
    allEvents.find((event) => /launch|tracking/i.test(event.title));

  return {
    nextEvent,
    nextLaunch,
    recentlyChanged: allEvents.filter((event) => event.lastSyncedAt || event.status === "watch").slice(0, 3),
    highlightedMission: allMissions.find((mission) => mission.id === "artemis-iii") ?? allMissions[0],
    highlightedEquipment: allEquipment.find((item) => item.id === "sls") ?? allEquipment[0],
    liveNow: allLiveLinks.find((link) => link.id === "nasa-live") ?? allLiveLinks[0],
    metrics: [
      { label: "Programs", value: "5", tone: "blue" },
      { label: "Tracked missions", value: String(allMissions.length), tone: "green" },
      { label: "Equipment", value: String(allEquipment.length), tone: "gold" }
    ]
  };
};

export const searchAll = async (query: string) => {
  const [allMissions, allEquipment, allEvents] = await Promise.all([listMissions(), listEquipment(), listMissionEvents()]);
  const value = query.trim().toLowerCase();

  if (!value) {
    return { missions: allMissions.slice(0, 4), equipment: allEquipment.slice(0, 6), events: allEvents.slice(0, 4) };
  }

  return {
    missions: allMissions.filter((mission) =>
      `${mission.title} ${mission.classificationLabel ?? ""} ${mission.summary}`.toLowerCase().includes(value)
    ),
    equipment: allEquipment.filter((item) => `${item.name} ${item.summary} ${item.owner}`.toLowerCase().includes(value)),
    events: allEvents.filter((event) => `${event.title} ${event.summary}`.toLowerCase().includes(value))
  };
};
