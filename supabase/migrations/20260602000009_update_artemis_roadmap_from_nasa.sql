update public.missions
set
  subtitle = 'LEO rendezvous and docking demonstration',
  program_ids = '["artemis","surface-systems"]'::jsonb,
  status = 'active',
  date_label = '2027',
  date_precision = 'year',
  summary = 'NASA''s Artemis III mission will launch crew in Orion on SLS to low Earth orbit and test rendezvous and docking capabilities between Orion and one or both commercial lunar landers from SpaceX and Blue Origin.',
  objectives = '["Launch crew to Earth orbit aboard Orion and SLS","Test Orion rendezvous and docking with commercial lander systems","Mature operations needed for future crewed lunar landings"]'::jsonb,
  landing_region = null,
  source_urls = '[{"label":"NASA Artemis III","url":"https://www.nasa.gov/mission/artemis-iii/","confidence":"official"},{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'::jsonb,
  updated_at = now()
where id = 'artemis-iii';

update public.missions
set
  subtitle = 'Humanity''s return to the lunar surface',
  program_ids = '["artemis","surface-systems"]'::jsonb,
  status = 'planned',
  date_label = 'Early 2028',
  date_precision = 'half',
  summary = 'NASA continues to target early 2028 for the first Artemis lunar landing. After reaching lunar orbit, two crew members will transfer from Orion to a commercial lunar lander and spend about a week near the Moon''s South Pole.',
  objectives = '["Return astronauts to the lunar surface near the South Pole","Conduct about a week of field science, observations, and sample work","Demonstrate Orion-to-lander transfer and surface EVA operations"]'::jsonb,
  landing_region = 'Lunar South Pole candidate regions',
  source_urls = '[{"label":"NASA Artemis IV","url":"https://www.nasa.gov/mission/artemis-iv/","confidence":"official"},{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'::jsonb,
  updated_at = now()
where id = 'artemis-iv';

update public.missions
set
  subtitle = 'Lunar surface mission cadence',
  program_ids = '["artemis","surface-systems"]'::jsonb,
  status = 'planned',
  date_label = 'Late 2028',
  date_precision = 'half',
  summary = 'NASA expects to launch Artemis V as a lunar surface mission by late 2028 using the standard SLS rocket configuration, with subsequent Artemis missions planned roughly once per year.',
  objectives = '["Continue crewed lunar surface exploration after Artemis IV","Use the standard SLS rocket configuration","Build toward roughly annual Artemis surface missions"]'::jsonb,
  source_urls = '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'::jsonb,
  updated_at = now()
where id = 'artemis-v';

update public.mission_events
set
  title = 'LEO rendezvous and docking demonstration',
  date_label = '2027',
  date_precision = 'year',
  status = 'active',
  summary = 'Artemis III will test integrated operations between Orion and one or both commercial lunar landers in low Earth orbit.',
  source_urls = '[{"label":"NASA Artemis III","url":"https://www.nasa.gov/mission/artemis-iii/","confidence":"official"},{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'::jsonb,
  updated_at = now()
where mission_id = 'artemis-iii'
  and external_source is null;

update public.mission_events
set
  title = 'First Artemis lunar surface landing target',
  date_label = 'Early 2028',
  date_precision = 'half',
  status = 'planned',
  summary = 'NASA continues to target early 2028 for the first Artemis lunar landing near the Moon''s South Pole.',
  source_urls = '[{"label":"NASA Artemis IV","url":"https://www.nasa.gov/mission/artemis-iv/","confidence":"official"},{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'::jsonb,
  updated_at = now()
where mission_id = 'artemis-iv'
  and external_source is null;

update public.mission_events
set
  title = 'Artemis V lunar surface mission target',
  date_label = 'Late 2028',
  date_precision = 'half',
  status = 'planned',
  summary = 'NASA expects to launch this lunar surface mission by late 2028 using the standard SLS rocket configuration.',
  source_urls = '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'::jsonb,
  updated_at = now()
where mission_id = 'artemis-v'
  and external_source is null;

delete from public.equipment_links
where (equipment_id = 'xemu-suits' and mission_id = 'artemis-iii')
   or (equipment_id in ('gateway', 'ihab') and mission_id in ('artemis-iv', 'artemis-v'));

insert into public.equipment_links (equipment_id, mission_id)
values
  ('starship-hls', 'artemis-iv'),
  ('blue-moon', 'artemis-iii'),
  ('blue-moon', 'artemis-iv'),
  ('xemu-suits', 'artemis-iv')
on conflict (equipment_id, mission_id) do nothing;
