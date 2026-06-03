import { rockets } from "@/data/rockets";
import { equipment, liveLinks, missionEvents, missions, newsItems, phases, programs } from "@/data/seed";
import {
  localizeEquipment,
  localizeLiveLink,
  localizeMission,
  localizeMissionEvent,
  localizeNewsItem,
  localizePhase,
  localizeProgram,
  localizeRocket
} from "@/lib/contentTranslations";
import { supabase } from "@/lib/supabase";
import { filterRoadmapVisibleEvents, getNextEvent } from "@/lib/timeline";
import type {
  DashboardData,
  Equipment,
  LiveLink,
  Mission,
  MissionEvent,
  NewsItem,
  Phase,
  Program,
  Rocket,
  SourceLink
} from "@/lib/types";
import type { Language } from "@/store/useLanguageStore";

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

type DbNewsItem = {
  id: string;
  external_source: NewsItem["externalSource"];
  external_id: string;
  title: string;
  summary: string;
  url: string;
  image_url?: string | null;
  published_at?: string | null;
  tags: string[];
  source_urls: SourceLink[];
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

export const listPrograms = (language: Language = "en"): Promise<Program[]> =>
  fallbackOnError(async () => {
    const { data, error } = await supabase!.from("programs").select("*").order("name");
    if (error) throw error;
    return ((data ?? []) as DbProgram[]).map((program) => ({
      id: program.id,
      name: program.name,
      accent: program.accent,
      summary: program.summary,
      sourceUrls: program.source_urls ?? []
    })).map((program) => localizeProgram(program, language));
  }, programs.map((program) => localizeProgram(program, language)));

export const listPhases = (language: Language = "en"): Promise<Phase[]> =>
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
    })).map((phase) => localizePhase(phase, language));
  }, phases.map((phase) => localizePhase(phase, language)));

export const listMissions = (language: Language = "en"): Promise<Mission[]> =>
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
    })).map((mission) => localizeMission(mission, language));
  }, missions.map((mission) => localizeMission(mission, language)));

export const listMissionEvents = (language: Language = "en"): Promise<MissionEvent[]> =>
  fallbackOnError(async () => {
    const { data, error } = await supabase!.from("mission_events").select("*").order("starts_at");
    if (error) throw error;
    return ((data ?? []) as DbMissionEvent[])
      .filter((event) => event.mission_id)
      .map((event) => ({
        id: event.id,
        missionId: event.mission_id!,
        title: event.title,
        startsAt: event.starts_at ?? undefined,
        dateLabel: event.date_label,
        datePrecision: event.date_precision,
        status: event.status,
        summary: event.summary,
        sourceUrls: event.source_urls ?? [],
        externalSourceId: event.external_source ?? undefined,
        lastSyncedAt: event.last_synced_at ?? undefined
      }))
      .map((event) => localizeMissionEvent(event, language));
  }, missionEvents.map((event) => localizeMissionEvent(event, language)));

export const listEquipment = (language: Language = "en"): Promise<Equipment[]> =>
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
    })).map((item) => localizeEquipment(item, language));
  }, equipment.map((item) => localizeEquipment(item, language)));

export const listRockets = async (language: Language = "en"): Promise<Rocket[]> =>
  rockets.map((rocket) => localizeRocket(rocket, language));

export const listLiveLinks = (language: Language = "en"): Promise<LiveLink[]> =>
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
    })).map((link) => localizeLiveLink(link, language));
  }, liveLinks.map((link) => localizeLiveLink(link, language)));

export const listNewsItems = (language: Language = "en"): Promise<NewsItem[]> =>
  fallbackOnError(async () => {
    const { data, error } = await supabase!.from("news_items").select("*").order("published_at", { ascending: false }).limit(3);
    if (error) throw error;
    return ((data ?? []) as DbNewsItem[]).map((item) => ({
      id: item.id,
      externalSource: item.external_source,
      externalId: item.external_id,
      title: item.title,
      summary: item.summary,
      url: item.url,
      imageUrl: item.image_url ?? undefined,
      publishedAt: item.published_at ?? undefined,
      tags: item.tags ?? [],
      sourceUrls: item.source_urls ?? [],
      lastSyncedAt: item.last_synced_at ?? undefined
    })).map((item) => localizeNewsItem(item, language));
  }, newsItems.map((item) => localizeNewsItem(item, language)));

const programLabels: Record<Mission["programIds"][number], string> = {
  artemis: "Artemis",
  "moon-base": "Moon Base",
  clps: "CLPS",
  gateway: "Gateway",
  "surface-systems": "Surface Systems"
};

const getMissionProgramLabel = (mission?: Mission, language: Language = "en"): string | undefined => {
  if (!mission) {
    return undefined;
  }

  if (mission.programIds.includes("artemis")) {
    return "Artemis";
  }

  if (mission.programIds.includes("moon-base")) {
    return "Moon Base";
  }

  const labels =
    language === "hu"
      ? {
          ...programLabels,
          "surface-systems": "Felszíni rendszerek"
        }
      : programLabels;

  return mission.programIds.map((programId) => labels[programId]).filter(Boolean).slice(0, 2).join(" / ");
};

export const getDashboardData = async (language: Language = "en"): Promise<DashboardData> => {
  const [allEvents, allMissions, allEquipment, allLiveLinks, latestNews] = await Promise.all([
    listMissionEvents(language),
    listMissions(language),
    listEquipment(language),
    listLiveLinks(language),
    listNewsItems(language)
  ]);

  const now = Date.now();
  const futureEvents = allEvents.filter((event) => event.startsAt && new Date(event.startsAt).getTime() >= now);
  const roadmapEvents = filterRoadmapVisibleEvents(allEvents, allMissions);
  const rawNextEvent = getNextEvent(roadmapEvents) ?? roadmapEvents.find((event) => event.status === "watch") ?? roadmapEvents[0];
  const nextEventMission = rawNextEvent ? allMissions.find((mission) => mission.id === rawNextEvent.missionId) : undefined;
  const nextEvent =
    rawNextEvent && nextEventMission
      ? {
          ...rawNextEvent,
          title: nextEventMission.title,
          summary: rawNextEvent.summary || nextEventMission.summary,
          sourceUrls: rawNextEvent.sourceUrls.length > 0 ? rawNextEvent.sourceUrls : nextEventMission.sourceUrls
        }
      : rawNextEvent;
  const nextLaunch =
    futureEvents.find((event) => event.externalSourceId === "launch-library-2") ??
    futureEvents.find((event) => /launch|tracking/i.test(event.title));

  return {
    nextEvent,
    nextEventMission,
    nextEventProgramLabel: getMissionProgramLabel(nextEventMission, language),
    nextLaunch,
    latestNews,
    recentlyChanged: allEvents.filter((event) => event.lastSyncedAt || event.status === "watch").slice(0, 3),
    highlightedMission: allMissions.find((mission) => mission.id === "artemis-iii") ?? allMissions[0],
    highlightedEquipment: allEquipment.find((item) => item.id === "sls") ?? allEquipment[0],
    liveNow: allLiveLinks.find((link) => link.id === "nasa-live") ?? allLiveLinks[0],
    metrics: [
      { label: language === "hu" ? "Programok" : "Programs", value: "5", tone: "blue" },
      { label: language === "hu" ? "Követett küldetések" : "Tracked missions", value: String(allMissions.length), tone: "green" },
      { label: language === "hu" ? "Eszközök" : "Equipment", value: String(allEquipment.length), tone: "gold" }
    ]
  };
};

export const searchAll = async (query: string, language: Language = "en") => {
  const [allMissions, allEquipment, allEvents] = await Promise.all([
    listMissions(language),
    listEquipment(language),
    listMissionEvents(language)
  ]);
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
