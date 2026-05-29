create extension if not exists pgcrypto;

create table if not exists public.programs (
  id text primary key,
  name text not null,
  accent text not null,
  summary text not null,
  source_urls jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.phases (
  id text primary key,
  program_id text not null references public.programs(id) on delete cascade,
  title text not null,
  date_label text not null,
  start_year int not null,
  end_year int,
  summary text not null,
  focus jsonb not null default '[]'::jsonb,
  source_urls jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.missions (
  id text primary key,
  title text not null,
  subtitle text not null,
  program_ids jsonb not null default '[]'::jsonb,
  phase_id text references public.phases(id) on delete set null,
  status text not null check (status in ('planned', 'in-development', 'scheduled', 'active', 'completed', 'delayed', 'watch')),
  date_label text not null,
  starts_at timestamptz,
  date_precision text not null check (date_precision in ('exact', 'day', 'month', 'quarter', 'half', 'year', 'range', 'tbd')),
  summary text not null,
  objectives jsonb not null default '[]'::jsonb,
  landing_region text,
  hero_image_url text,
  source_urls jsonb not null default '[]'::jsonb,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mission_events (
  id uuid primary key default gen_random_uuid(),
  mission_id text references public.missions(id) on delete cascade,
  external_source text,
  external_id text,
  title text not null,
  starts_at timestamptz,
  date_label text not null,
  date_precision text not null check (date_precision in ('exact', 'day', 'month', 'quarter', 'half', 'year', 'range', 'tbd')),
  status text not null check (status in ('planned', 'in-development', 'scheduled', 'active', 'completed', 'delayed', 'watch')),
  summary text not null default '',
  source_urls jsonb not null default '[]'::jsonb,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mission_events_external_unique unique (external_source, external_id)
);

create table if not exists public.equipment (
  id text primary key,
  name text not null,
  category text not null check (category in ('launch', 'crew', 'lander', 'rover', 'habitat', 'station', 'power', 'communications', 'science')),
  owner text not null,
  status text not null check (status in ('planned', 'in-development', 'scheduled', 'active', 'completed', 'delayed', 'watch')),
  summary text not null,
  specs jsonb not null default '[]'::jsonb,
  image_url text,
  image_query text not null,
  source_urls jsonb not null default '[]'::jsonb,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.equipment_links (
  equipment_id text not null references public.equipment(id) on delete cascade,
  mission_id text not null references public.missions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (equipment_id, mission_id)
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('mission', 'equipment', 'program', 'phase', 'live')),
  entity_id text not null,
  provider text not null,
  title text not null,
  image_url text not null,
  thumbnail_url text,
  source_url text,
  attribution text not null default 'NASA',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint media_assets_entity_provider_unique unique (entity_type, entity_id, provider, image_url)
);

create table if not exists public.external_sources (
  id text primary key,
  name text not null,
  base_url text not null,
  kind text not null,
  is_dynamic boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.source_records (
  id uuid primary key default gen_random_uuid(),
  external_source_id text not null references public.external_sources(id) on delete cascade,
  external_id text not null,
  entity_type text not null,
  entity_id text,
  title text not null,
  source_url text,
  payload jsonb not null,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint source_records_external_unique unique (external_source_id, external_id)
);

create table if not exists public.sync_runs (
  id uuid primary key default gen_random_uuid(),
  source_id text not null references public.external_sources(id) on delete cascade,
  status text not null check (status in ('started', 'succeeded', 'failed')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  records_seen int not null default 0,
  records_changed int not null default 0,
  error text
);

create table if not exists public.event_updates (
  id uuid primary key default gen_random_uuid(),
  mission_event_id uuid references public.mission_events(id) on delete cascade,
  external_source_id text not null references public.external_sources(id) on delete cascade,
  external_id text not null,
  field text not null,
  before_value text,
  after_value text,
  created_at timestamptz not null default now()
);

create table if not exists public.live_links (
  id text primary key,
  title text not null,
  type text not null check (type in ('stream', 'tracking', 'launch-countdown', 'schedule')),
  provider text not null,
  url text not null,
  status text not null check (status in ('planned', 'in-development', 'scheduled', 'active', 'completed', 'delayed', 'watch')),
  summary text not null,
  is_embed_safe boolean not null default false,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists missions_phase_id_idx on public.missions(phase_id);
create index if not exists mission_events_mission_id_idx on public.mission_events(mission_id);
create index if not exists mission_events_starts_at_idx on public.mission_events(starts_at);
create index if not exists equipment_category_idx on public.equipment(category);
create index if not exists source_records_entity_idx on public.source_records(entity_type, entity_id);

alter table public.programs enable row level security;
alter table public.phases enable row level security;
alter table public.missions enable row level security;
alter table public.mission_events enable row level security;
alter table public.equipment enable row level security;
alter table public.equipment_links enable row level security;
alter table public.media_assets enable row level security;
alter table public.external_sources enable row level security;
alter table public.source_records enable row level security;
alter table public.sync_runs enable row level security;
alter table public.event_updates enable row level security;
alter table public.live_links enable row level security;

create policy "public read programs" on public.programs for select using (true);
create policy "public read phases" on public.phases for select using (true);
create policy "public read missions" on public.missions for select using (true);
create policy "public read mission events" on public.mission_events for select using (true);
create policy "public read equipment" on public.equipment for select using (true);
create policy "public read equipment links" on public.equipment_links for select using (true);
create policy "public read media assets" on public.media_assets for select using (true);
create policy "public read external sources" on public.external_sources for select using (true);
create policy "public read source records" on public.source_records for select using (true);
create policy "public read sync runs" on public.sync_runs for select using (true);
create policy "public read event updates" on public.event_updates for select using (true);
create policy "public read live links" on public.live_links for select using (true);
