import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { requireSyncSecret } from "../_shared/auth.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";

interface NasaImageItem {
  href?: string;
  data?: Array<{
    title?: string;
    nasa_id?: string;
    description?: string;
    center?: string;
    date_created?: string;
  }>;
  links?: Array<{
    href?: string;
    rel?: string;
    render?: string;
  }>;
}

const fetchFirstImage = async (query: string): Promise<NasaImageItem | null> => {
  const url = `https://images-api.nasa.gov/search?media_type=image&q=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "artemis-moon-base/0.1"
    }
  });

  if (!response.ok) {
    throw new Error(`NASA Images request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data?.collection?.items?.[0] ?? null;
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
  const unauthorized = await requireSyncSecret(request, supabase);
  if (unauthorized) {
    return unauthorized;
  }

  const { data: run } = await supabase
    .from("sync_runs")
    .insert({ source_id: "nasa-images", status: "started" })
    .select("id")
    .single();

  try {
    const { data: equipment = [], error } = await supabase
      .from("equipment")
      .select("id, name, image_query, image_url")
      .order("name");

    if (error) {
      throw error;
    }

    let changed = 0;
    for (const item of equipment ?? []) {
      const image = await fetchFirstImage(item.image_query);
      const imageUrl = image?.links?.find((link) => link.render === "image")?.href;
      const data = image?.data?.[0];

      if (!imageUrl || !data?.title) {
        continue;
      }

      const sourceUrl = data.nasa_id ? `https://images.nasa.gov/details/${data.nasa_id}` : image.href;

      await supabase.from("media_assets").upsert(
        {
          entity_type: "equipment",
          entity_id: item.id,
          provider: "NASA Images",
          title: data.title,
          image_url: imageUrl,
          thumbnail_url: imageUrl,
          source_url: sourceUrl,
          attribution: data.center ? `NASA / ${data.center}` : "NASA",
          metadata: data,
          updated_at: new Date().toISOString()
        },
        { onConflict: "entity_type,entity_id,provider,image_url" }
      );

      if (!item.image_url) {
        await supabase
          .from("equipment")
          .update({
            image_url: imageUrl,
            last_synced_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq("id", item.id);
      }

      await supabase.from("source_records").upsert(
        {
          external_source_id: "nasa-images",
          external_id: `nasa-images-${item.id}`,
          entity_type: "equipment",
          entity_id: item.id,
          title: data.title,
          source_url: sourceUrl,
          payload: image,
          last_seen_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        { onConflict: "external_source_id,external_id" }
      );

      changed += 1;
    }

    if (run?.id) {
      await supabase
        .from("sync_runs")
        .update({
          status: "succeeded",
          finished_at: new Date().toISOString(),
          records_seen: equipment?.length ?? 0,
          records_changed: changed
        })
        .eq("id", run.id);
    }

    return jsonResponse({ ok: true, recordsSeen: equipment?.length ?? 0, recordsChanged: changed });
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
