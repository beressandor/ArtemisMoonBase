insert into public.external_sources (id, name, base_url, kind, is_dynamic)
values ('nasa-artemis-rss', 'NASA Artemis RSS', 'https://www.nasa.gov/missions/artemis/feed/', 'rss', true)
on conflict (id) do update set
  name = excluded.name,
  base_url = excluded.base_url,
  kind = excluded.kind,
  is_dynamic = excluded.is_dynamic;

create table if not exists public.news_items (
  id uuid primary key default gen_random_uuid(),
  external_source text not null references public.external_sources(id) on delete cascade,
  external_id text not null,
  title text not null,
  summary text not null default '',
  url text not null,
  image_url text,
  published_at timestamptz,
  tags jsonb not null default '[]'::jsonb,
  source_urls jsonb not null default '[]'::jsonb,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint news_items_external_unique unique (external_source, external_id)
);

create index if not exists news_items_published_at_idx on public.news_items(published_at desc);

alter table public.news_items enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'news_items'
      and policyname = 'public read news items'
  ) then
    create policy "public read news items" on public.news_items for select using (true);
  end if;
end $$;

insert into public.news_items (
  external_source,
  external_id,
  title,
  summary,
  url,
  published_at,
  tags,
  source_urls,
  last_synced_at,
  updated_at
)
values
  (
    'nasa-artemis-rss',
    'https://www.nasa.gov/centers-and-facilities/johnson/spacewalking-with-scott-wray-artemis-eva-training-lead/',
    'Spacewalking With Scott Wray, Artemis EVA Training Lead',
    'NASA profiles Artemis EVA training work for lunar surface operations, including spacesuit testing and spacewalk preparation.',
    'https://www.nasa.gov/centers-and-facilities/johnson/spacewalking-with-scott-wray-artemis-eva-training-lead/',
    '2026-06-02T09:00:00Z',
    '["Artemis","EVA","Spacesuits"]'::jsonb,
    '[{"label":"NASA Artemis RSS","url":"https://www.nasa.gov/missions/artemis/feed/","confidence":"official"}]'::jsonb,
    '2026-06-02T09:00:00Z',
    now()
  ),
  (
    'nasa-artemis-rss',
    'https://www.nasa.gov/missions/artemis/i-am-artemis/i-am-artemis-daniel-stubbs/',
    'I Am Artemis: Daniel Stubbs',
    'NASA highlights engineering work tied to Artemis human landing systems and the challenges of lunar dust during Moon landings.',
    'https://www.nasa.gov/missions/artemis/i-am-artemis/i-am-artemis-daniel-stubbs/',
    '2026-05-28T21:58:20Z',
    '["Artemis","HLS","Lunar dust"]'::jsonb,
    '[{"label":"NASA Artemis RSS","url":"https://www.nasa.gov/missions/artemis/feed/","confidence":"official"}]'::jsonb,
    '2026-06-02T09:00:00Z',
    now()
  ),
  (
    'nasa-artemis-rss',
    'https://www.nasa.gov/centers-and-facilities/kennedy/nasas-2026-lunabotics-winning-student-teams-engineering-lunar-future/',
    'NASA''s 2026 Lunabotics: Winning Student Teams Engineering Lunar Future',
    'NASA''s Lunabotics Challenge connects autonomous lunar surface engineering with the agency''s permanent Moon Base plans.',
    'https://www.nasa.gov/centers-and-facilities/kennedy/nasas-2026-lunabotics-winning-student-teams-engineering-lunar-future/',
    '2026-05-27T13:02:09Z',
    '["Moon Base","Lunabotics","Surface systems"]'::jsonb,
    '[{"label":"NASA Artemis RSS","url":"https://www.nasa.gov/missions/artemis/feed/","confidence":"official"}]'::jsonb,
    '2026-06-02T09:00:00Z',
    now()
  )
on conflict (external_source, external_id) do update set
  title = excluded.title,
  summary = excluded.summary,
  url = excluded.url,
  published_at = excluded.published_at,
  tags = excluded.tags,
  source_urls = excluded.source_urls,
  last_synced_at = excluded.last_synced_at,
  updated_at = excluded.updated_at;
