insert into public.equipment (
  id,
  name,
  category,
  owner,
  status,
  summary,
  specs,
  image_url,
  image_query,
  source_urls,
  updated_at
) values
  (
    'astrolab-clv-1',
    'Astrolab CLV-1',
    'rover',
    'Astrolab',
    'in-development',
    'Astrolab''s Crewed Lunar Vehicle, adapted from FLEX architecture, is a Phase One LTV for astronaut transport, supplies, and remote operations.',
    '[
      { "label": "Award", "value": "$219M Phase 1 LTV task order" },
      { "label": "Target", "value": "Lunar surface deployment by 2028" },
      { "label": "Mode", "value": "Crewed and remotely operated" },
      { "label": "Capability", "value": "About 2,000 lb; more than 6 mph on level terrain" }
    ]'::jsonb,
    'https://www.nasa.gov/wp-content/uploads/2024/12/jsc2024e065792.jpg?w=1024',
    'NASA Astrolab CLV-1 lunar terrain vehicle',
    '[
      { "label": "NASA Moon Base Systems", "url": "https://www.nasa.gov/moonbase-systems/", "confidence": "official" },
      { "label": "NASA Lunar Terrain Vehicle", "url": "https://www.nasa.gov/suits-and-rovers/lunar-terrain-vehicle/", "confidence": "official" }
    ]'::jsonb,
    now()
  ),
  (
    'lunar-outpost-pegasus',
    'Lunar Outpost Pegasus',
    'rover',
    'Lunar Outpost',
    'in-development',
    'Lunar Outpost''s Pegasus is a mission-ready evolution of Eagle, built for NASA''s updated LTV requirements and early Moon Base mobility.',
    '[
      { "label": "Award", "value": "$220M Phase 1 LTV task order" },
      { "label": "Target", "value": "Lunar surface deployment by 2028" },
      { "label": "Mode", "value": "Manual, autonomous, or teleoperated" },
      { "label": "Capability", "value": "Up to one year of operations; more than 9 mph" }
    ]'::jsonb,
    'https://www.nasa.gov/wp-content/uploads/2024/12/jsc2024e069530.jpg?w=1024',
    'NASA Lunar Outpost Pegasus lunar terrain vehicle',
    '[
      { "label": "NASA Moon Base Systems", "url": "https://www.nasa.gov/moonbase-systems/", "confidence": "official" },
      { "label": "NASA Lunar Terrain Vehicle", "url": "https://www.nasa.gov/suits-and-rovers/lunar-terrain-vehicle/", "confidence": "official" }
    ]'::jsonb,
    now()
  )
on conflict (id) do update
set
  name = excluded.name,
  category = excluded.category,
  owner = excluded.owner,
  status = excluded.status,
  summary = excluded.summary,
  specs = excluded.specs,
  image_url = excluded.image_url,
  image_query = excluded.image_query,
  source_urls = excluded.source_urls,
  updated_at = now();

insert into public.equipment_links (equipment_id, mission_id) values
  ('astrolab-clv-1', 'artemis-v'),
  ('astrolab-clv-1', 'moon-base-phase-one'),
  ('astrolab-clv-1', 'lunar-terrain-vehicles-phase-one'),
  ('lunar-outpost-pegasus', 'artemis-v'),
  ('lunar-outpost-pegasus', 'moon-base-phase-one'),
  ('lunar-outpost-pegasus', 'lunar-terrain-vehicles-phase-one')
on conflict do nothing;

delete from public.equipment_links
where equipment_id = 'ltv';

delete from public.equipment
where id = 'ltv';
