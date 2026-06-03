import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { requireSyncSecret } from "../_shared/auth.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";

const NASA_ARTEMIS_FEED = "https://www.nasa.gov/missions/artemis/feed/";
const SOURCE_ID = "nasa-artemis-rss";
const RELEVANT_NEWS =
  /\b(?:artemis|moon|lunar|moon base|gateway|orion|sls|lander|rover|spacesuit|eva|human landing system|hls)\b/i;

type SupabaseClient = ReturnType<typeof createClient>;

type ParsedNewsItem = {
  externalId: string;
  title: string;
  summary: string;
  url: string;
  imageUrl?: string;
  publishedAt?: string;
  tags: string[];
  raw: Record<string, unknown>;
};

const decodeHtml = (value: string): string =>
  value
    .replaceAll("&#8211;", "-")
    .replaceAll("&#8212;", "-")
    .replaceAll("&#8217;", "'")
    .replaceAll("&#8220;", "\"")
    .replaceAll("&#8221;", "\"")
    .replaceAll("&#8230;", "...")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const cleanText = (value: string | null | undefined, maxLength = 240): string => {
  const cleaned = decodeHtml(value ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[[^\]]+\]$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return `${cleaned.slice(0, maxLength - 1).trim()}...`;
};

const getText = (item: Element, tagName: string): string => {
  const element = item.getElementsByTagName(tagName)[0];
  return cleanText(element?.textContent ?? "", 500);
};

const getContent = (item: Element): string =>
  item.getElementsByTagName("content:encoded")[0]?.textContent ?? "";

const getImageUrl = (content: string): string | undefined => {
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1];
};

const parseTags = (item: Element): string[] =>
  Array.from(item.getElementsByTagName("category"))
    .map((category) => cleanText(category.textContent ?? "", 80))
    .filter(Boolean)
    .slice(0, 6);

const parsePublishedAt = (pubDate: string): string | undefined => {
  const parsed = new Date(pubDate);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
};

const parseFeed = (xml: string): ParsedNewsItem[] => {
  const document = new DOMParser().parseFromString(xml, "application/xml");
  const items = Array.from(document.getElementsByTagName("item"));

  return items
    .map((item) => {
      const title = getText(item, "title");
      const url = getText(item, "link");
      const pubDate = getText(item, "pubDate");
      const description = cleanText(item.getElementsByTagName("description")[0]?.textContent ?? "");
      const content = getContent(item);
      const tags = parseTags(item);
      const haystack = `${title} ${description} ${tags.join(" ")}`;

      if (!title || !url || !RELEVANT_NEWS.test(haystack)) {
        return null;
      }

      return {
        externalId: url,
        title,
        summary: description,
        url,
        imageUrl: getImageUrl(content),
        publishedAt: parsePublishedAt(pubDate),
        tags,
        raw: {
          title,
          url,
          pubDate,
          description,
          tags
        }
      } satisfies ParsedNewsItem;
    })
    .filter((item): item is ParsedNewsItem => Boolean(item));
};

const fetchNews = async (): Promise<ParsedNewsItem[]> => {
  const response = await fetch(NASA_ARTEMIS_FEED, {
    headers: {
      Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8",
      "User-Agent": "artemis-moon-base/0.1"
    }
  });

  if (!response.ok) {
    throw new Error(`NASA Artemis RSS request failed: ${response.status} ${response.statusText}`);
  }

  return parseFeed(await response.text());
};

const upsertNews = async (supabase: SupabaseClient, items: ParsedNewsItem[]): Promise<number> => {
  let changed = 0;
  const now = new Date().toISOString();

  for (const item of items) {
    await supabase.from("news_items").upsert(
      {
        external_source: SOURCE_ID,
        external_id: item.externalId,
        title: item.title,
        summary: item.summary,
        url: item.url,
        image_url: item.imageUrl ?? null,
        published_at: item.publishedAt ?? null,
        tags: item.tags,
        source_urls: [
          {
            label: "NASA Artemis RSS",
            url: NASA_ARTEMIS_FEED,
            confidence: "official"
          }
        ],
        last_synced_at: now,
        updated_at: now
      },
      { onConflict: "external_source,external_id" }
    );

    await supabase.from("source_records").upsert(
      {
        external_source_id: SOURCE_ID,
        external_id: item.externalId,
        entity_type: "news",
        entity_id: null,
        title: item.title,
        source_url: item.url,
        payload: item.raw,
        last_seen_at: now,
        updated_at: now
      },
      { onConflict: "external_source_id,external_id" }
    );

    changed += 1;
  }

  return changed;
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
    .insert({ source_id: SOURCE_ID, status: "started" })
    .select("id")
    .single();

  try {
    const items = await fetchNews();
    const changed = await upsertNews(supabase, items.slice(0, 12));

    if (run?.id) {
      await supabase
        .from("sync_runs")
        .update({
          status: "succeeded",
          finished_at: new Date().toISOString(),
          records_seen: items.length,
          records_changed: changed
        })
        .eq("id", run.id);
    }

    return jsonResponse({ ok: true, recordsSeen: items.length, recordsChanged: changed });
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
