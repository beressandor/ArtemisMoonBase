import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import {
  isLunarProgram,
  normalizeLaunchLibraryEvent,
  normalizeLaunchLibraryLaunch,
  type LL2EventLike,
  type LL2LaunchLike,
  type NormalizedExternalEvent
} from "../_shared/launchLibrary.ts";

const LL2_BASE = "https://ll.thespacedevs.com/2.3.0";
const SEARCH_TERMS = ["Artemis", "Gateway", "CLPS", "Moon", "Lunar", "Orion", "SLS", "Starship"];

type SupabaseClient = ReturnType<typeof createClient>;

const fetchJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${LL2_BASE}${path}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "artemis-moon-base/0.1"
    }
  });

  if (!response.ok) {
    throw new Error(`Launch Library request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

const fetchJsonWithFallback = async <T>(paths: string[]): Promise<T> => {
  let lastError: unknown;

  for (const path of paths) {
    try {
      return await fetchJson<T>(path);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Launch Library request failed.");
};

const collectLaunches = async (): Promise<LL2LaunchLike[]> => {
  const byId = new Map<string, LL2LaunchLike>();

  for (const term of SEARCH_TERMS) {
    const query = `format=json&limit=25&search=${encodeURIComponent(term)}`;
    const data = await fetchJsonWithFallback<{ results?: LL2LaunchLike[] }>([
      `/launches/upcoming/?${query}`,
      `/launch/upcoming/?${query}`
    ]);

    for (const launch of data.results ?? []) {
      if (isLunarProgram(launch.program) || /artemis|gateway|clps|moon|lunar|orion|sls|starship/i.test(launch.name)) {
        byId.set(launch.id, launch);
      }
    }
  }

  return [...byId.values()];
};

const collectEvents = async (): Promise<LL2EventLike[]> => {
  const byId = new Map<string, LL2EventLike>();

  for (const term of SEARCH_TERMS) {
    const query = `format=json&limit=25&search=${encodeURIComponent(term)}`;
    const data = await fetchJsonWithFallback<{ results?: LL2EventLike[] }>([
      `/events/upcoming/?${query}`,
      `/event/upcoming/?${query}`
    ]);

    for (const event of data.results ?? []) {
      if (isLunarProgram(event.program) || /artemis|gateway|clps|moon|lunar|orion|sls|starship/i.test(event.name)) {
        byId.set(event.id, event);
      }
    }
  }

  return [...byId.values()];
};

const matchMission = (normalized: NormalizedExternalEvent, missions: Array<{ id: string; title: string }>): string | null => {
  const haystack = `${normalized.title} ${normalized.missionName ?? ""} ${normalized.vehicleName ?? ""}`.toLowerCase();

  const direct = missions.find((mission) => haystack.includes(mission.title.toLowerCase()));
  if (direct) {
    return direct.id;
  }

  if (/gateway|ppe|halo/i.test(haystack)) {
    return "gateway-ppe-halo";
  }

  if (/starship|hls|human landing system/i.test(haystack)) {
    return "starship-hls-demo";
  }

  if (/clps|nova-c|griffin|blue ghost|intuitive machines|astrobotic/i.test(haystack)) {
    return "clps-cargo-cadence";
  }

  if (/artemis ii|orion.*crew|crewed.*flyby/i.test(haystack)) {
    return "artemis-ii";
  }

  return null;
};

const syncEvent = async (
  supabase: SupabaseClient,
  normalized: NormalizedExternalEvent,
  missionId: string | null
): Promise<boolean> => {
  const { data: existing } = await supabase
    .from("mission_events")
    .select("id, starts_at, date_label, status")
    .eq("external_source", "launch-library-2")
    .eq("external_id", normalized.externalId)
    .maybeSingle();

  const sourceUrls = normalized.sourceUrl
    ? [{ label: "Launch Library 2", url: normalized.sourceUrl, confidence: "external" }]
    : [{ label: "Launch Library 2", url: "https://ll.thespacedevs.com/docs", confidence: "external" }];

  const { data: event, error } = await supabase
    .from("mission_events")
    .upsert(
      {
        mission_id: missionId,
        external_source: "launch-library-2",
        external_id: normalized.externalId,
        title: normalized.title,
        starts_at: normalized.startsAt ?? null,
        date_label: normalized.dateLabel,
        date_precision: normalized.datePrecision,
        status: normalized.status,
        summary: normalized.summary ?? "",
        source_urls: sourceUrls,
        last_synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { onConflict: "external_source,external_id" }
    )
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  const changes = [
    { field: "startsAt", before: existing?.starts_at ?? null, after: normalized.startsAt ?? null },
    { field: "dateLabel", before: existing?.date_label ?? null, after: normalized.dateLabel },
    { field: "status", before: existing?.status ?? null, after: normalized.status }
  ].filter((change) => existing && change.before !== change.after);

  if (changes.length > 0 && event?.id) {
    await supabase.from("event_updates").insert(
      changes.map((change) => ({
        mission_event_id: event.id,
        external_source_id: "launch-library-2",
        external_id: normalized.externalId,
        field: change.field,
        before_value: change.before,
        after_value: change.after
      }))
    );
  }

  await supabase.from("source_records").upsert(
    {
      external_source_id: "launch-library-2",
      external_id: normalized.externalId,
      entity_type: "mission_event",
      entity_id: event?.id ?? null,
      title: normalized.title,
      source_url: normalized.sourceUrl ?? "https://ll.thespacedevs.com/docs",
      payload: normalized,
      last_seen_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    { onConflict: "external_source_id,external_id" }
  );

  return changes.length > 0 || !existing;
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Missing Supabase environment variables." }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data: run } = await supabase
    .from("sync_runs")
    .insert({ source_id: "launch-library-2", status: "started" })
    .select("id")
    .single();

  try {
    const [launches, events] = await Promise.all([collectLaunches(), collectEvents()]);
    const normalized = [
      ...launches.map(normalizeLaunchLibraryLaunch),
      ...events.map(normalizeLaunchLibraryEvent)
    ];

    const { data: missions = [] } = await supabase.from("missions").select("id, title");

    let changed = 0;
    for (const event of normalized) {
      const missionId = matchMission(event, missions ?? []);
      const didChange = await syncEvent(supabase, event, missionId);
      if (didChange) {
        changed += 1;
      }
    }

    if (run?.id) {
      await supabase
        .from("sync_runs")
        .update({
          status: "succeeded",
          finished_at: new Date().toISOString(),
          records_seen: normalized.length,
          records_changed: changed
        })
        .eq("id", run.id);
    }

    return jsonResponse({ ok: true, recordsSeen: normalized.length, recordsChanged: changed });
  } catch (error) {
    if (run?.id) {
      await supabase
        .from("sync_runs")
        .update({
          status: "failed",
          finished_at: new Date().toISOString(),
          error: error instanceof Error ? error.message : String(error)
        })
        .eq("id", run.id);
    }

    return jsonResponse({ error: error instanceof Error ? error.message : String(error) }, 500);
  }
});
