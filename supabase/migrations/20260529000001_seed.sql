insert into public.external_sources (id, name, base_url, kind, is_dynamic) values
  ('nasa-moon-base-phases', 'NASA Moon Base Phases', 'https://www.nasa.gov/moonbase-phases/', 'editorial', false),
  ('nasa-moon-base-systems', 'NASA Moon Base Systems', 'https://www.nasa.gov/moonbase-systems/', 'editorial', false),
  ('nasa-artemis', 'NASA Artemis', 'https://www.nasa.gov/humans-in-space/artemis/', 'editorial', false),
  ('nasa-images', 'NASA Images', 'https://images-api.nasa.gov/', 'media', true),
  ('launch-library-2', 'Launch Library 2', 'https://ll.thespacedevs.com/2.3.0/', 'schedule', true),
  ('nasa-live', 'NASA Live', 'https://www.nasa.gov/live/', 'live', true)
on conflict (id) do update set
  name = excluded.name,
  base_url = excluded.base_url,
  kind = excluded.kind,
  is_dynamic = excluded.is_dynamic;

insert into public.programs (id, name, accent, summary, source_urls) values
  ('moon-base', 'Moon Base', '#8FE3FF', 'NASA phased path toward sustained lunar surface operations.', '[{"label":"NASA Moon Base Phases","url":"https://www.nasa.gov/moonbase-phases/","confidence":"official"}]'),
  ('artemis', 'Artemis', '#FFFFFF', 'Crewed lunar exploration missions using SLS, Orion, Gateway, and Human Landing Systems.', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('gateway', 'Gateway', '#C7D2FE', 'Lunar-orbit platform for crew staging, science, logistics, and communications.', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('clps', 'CLPS', '#F8C471', 'Commercial lunar deliveries carrying NASA science and technology payloads.', '[{"label":"NASA Moon Base Systems","url":"https://www.nasa.gov/moonbase-systems/","confidence":"official"}]'),
  ('surface-systems', 'Surface Systems', '#9BE7C8', 'Rovers, habitats, power, communications, and science systems for longer stays.', '[{"label":"NASA Moon Base Systems","url":"https://www.nasa.gov/moonbase-systems/","confidence":"official"}]')
on conflict (id) do update set
  name = excluded.name,
  accent = excluded.accent,
  summary = excluded.summary,
  source_urls = excluded.source_urls;

insert into public.phases (id, program_id, title, date_label, start_year, end_year, summary, focus, source_urls) values
  ('phase-one', 'moon-base', 'Phase One', 'Now-2029', 2024, 2029, 'First operating layer for robotic deliveries, demonstrations, crewed return, early mobility, power, and communications.', '["CLPS deliveries","Artemis crewed return","surface power","communications","mobility demos"]', '[{"label":"NASA Moon Base Phases","url":"https://www.nasa.gov/moonbase-phases/","confidence":"official"}]'),
  ('phase-two', 'moon-base', 'Phase Two', '2029-2032', 2029, 2032, 'Longer operations with pressurized mobility, robust logistics, and surface habitation.', '["longer surface stays","pressurized rover","habitation","in-situ science","cargo cadence"]', '[{"label":"NASA Moon Base Phases","url":"https://www.nasa.gov/moonbase-phases/","confidence":"official"}]'),
  ('phase-three', 'moon-base', 'Phase Three', '2032-beyond', 2032, null, 'Transition from episodic sorties toward sustained lunar base operations.', '["sustained presence","resource utilization","international logistics","science outposts","Mars-forward systems"]', '[{"label":"NASA Moon Base Phases","url":"https://www.nasa.gov/moonbase-phases/","confidence":"official"}]')
on conflict (id) do update set
  title = excluded.title,
  date_label = excluded.date_label,
  summary = excluded.summary,
  focus = excluded.focus,
  source_urls = excluded.source_urls;

insert into public.missions (id, title, subtitle, program_ids, phase_id, status, date_label, date_precision, summary, objectives, source_urls) values
  ('moon-base-phase-one', 'Phase One: Foundational Surface Capability', 'Moon Base roadmap', '["moon-base","surface-systems","clps"]', 'phase-one', 'active', 'Now-2029', 'range', 'Current Moon Base phase covering early deliveries, demonstrations, and crewed lunar architecture.', '["Demonstrate recurring lunar deliveries","Prepare crewed lunar landing architecture","Deploy initial surface power and communications","Validate rover and cargo operations"]', '[{"label":"NASA Moon Base Phases","url":"https://www.nasa.gov/moonbase-phases/","confidence":"official"}]'),
  ('artemis-ii', 'Artemis II', 'Crewed lunar flyby', '["artemis"]', 'phase-one', 'watch', 'Schedule watch', 'tbd', 'The first crewed Artemis flight test will send astronauts around the Moon and back aboard Orion.', '["Validate Orion life support","Demonstrate crew operations","Return safely after lunar flyby"]', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"},{"label":"Launch Library 2","url":"https://ll.thespacedevs.com/docs","confidence":"external"}]'),
  ('artemis-iii', 'Artemis III', 'Crewed lunar landing architecture', '["artemis","surface-systems"]', 'phase-one', 'in-development', '2027 planning baseline', 'year', 'Targets the next major crewed lunar surface milestone with Orion, SLS, spacesuits, and a Human Landing System.', '["Crew lunar surface operations","Validate HLS crew transfer","Return samples and surface data"]', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('starship-hls-demo', 'Starship HLS Demonstration', 'Uncrewed lander demo', '["artemis","surface-systems"]', 'phase-one', 'watch', '2027 watch', 'year', 'Uncrewed Human Landing System demonstration tracked as a dependency for crewed surface missions.', '["Demonstrate HLS landing","Validate surface ascent concept","Exercise mission operations"]', '[{"label":"Launch Library 2","url":"https://ll.thespacedevs.com/docs","confidence":"external"}]'),
  ('gateway-ppe-halo', 'Gateway PPE + HALO', 'First Gateway elements', '["gateway","artemis"]', 'phase-one', 'in-development', 'Late 2020s', 'range', 'The Power and Propulsion Element and HALO habitation module form the first Gateway configuration.', '["Deploy lunar-orbit staging platform","Provide power and propulsion","Enable crew logistics"]', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('artemis-iv', 'Artemis IV', 'Gateway assembly and lunar mission', '["artemis","gateway"]', 'phase-one', 'planned', 'Early 2028 planning baseline', 'half', 'Planned to expand Gateway capability while continuing crewed lunar exploration operations.', '["Deliver Gateway elements","Support crewed lunar campaign","Extend deep-space logistics"]', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('artemis-v', 'Artemis V', 'Surface mobility expansion', '["artemis","surface-systems"]', 'phase-one', 'planned', 'Late 2028 planning baseline', 'half', 'Planned as an expanding surface mission with stronger mobility and infrastructure dependencies.', '["Increase surface exploration range","Integrate next-generation surface systems","Advance lunar base operations"]', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('clps-cargo-cadence', 'CLPS Cargo Cadence', 'Commercial deliveries', '["clps","moon-base"]', 'phase-one', 'active', 'Rolling schedule', 'tbd', 'Commercial lunar payload deliveries provide science instruments, technology demos, and scouting data for future crews.', '["Deliver NASA payloads","Demonstrate commercial landing services","Scout surface conditions"]', '[{"label":"NASA Moon Base Systems","url":"https://www.nasa.gov/moonbase-systems/","confidence":"official"},{"label":"Launch Library 2","url":"https://ll.thespacedevs.com/docs","confidence":"external"}]'),
  ('phase-two-sustained-stays', 'Phase Two: Sustained Stays', 'Moon Base roadmap', '["moon-base","surface-systems","gateway"]', 'phase-two', 'planned', '2029-2032', 'range', 'Shifts the lunar campaign toward longer operations with pressurized mobility, stronger logistics, and surface habitation.', '["Enable longer crew stays","Expand mobility radius","Increase cargo and science cadence"]', '[{"label":"NASA Moon Base Phases","url":"https://www.nasa.gov/moonbase-phases/","confidence":"official"}]'),
  ('phase-three-lunar-base', 'Phase Three: Sustained Lunar Base', 'Moon Base roadmap', '["moon-base","surface-systems"]', 'phase-three', 'planned', '2032-beyond', 'range', 'Longer-term phase for a more permanent lunar presence, resource demonstrations, and Mars-forward operations.', '["Operate persistent infrastructure","Mature resource utilization","Support deep-space mission prep"]', '[{"label":"NASA Moon Base Phases","url":"https://www.nasa.gov/moonbase-phases/","confidence":"official"}]')
on conflict (id) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  program_ids = excluded.program_ids,
  phase_id = excluded.phase_id,
  status = excluded.status,
  date_label = excluded.date_label,
  date_precision = excluded.date_precision,
  summary = excluded.summary,
  objectives = excluded.objectives,
  source_urls = excluded.source_urls;

insert into public.equipment (id, name, category, owner, status, summary, specs, image_url, image_query, source_urls) values
  ('sls', 'Space Launch System', 'launch', 'NASA', 'active', 'NASA super heavy-lift rocket for Orion and large Artemis payloads.', '[{"label":"Role","value":"Crew and cargo launch"},{"label":"Program","value":"Artemis"}]', 'https://images-assets.nasa.gov/image/NHQ202211160008/NHQ202211160008~large.jpg', 'NASA Space Launch System Artemis launch', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('orion', 'Orion Spacecraft', 'crew', 'NASA / ESA', 'active', 'Crew spacecraft for Artemis lunar missions.', '[{"label":"Role","value":"Crew transport"},{"label":"Crew","value":"Up to 4 astronauts"}]', null, 'NASA Orion spacecraft Artemis', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('starship-hls', 'Starship HLS', 'lander', 'SpaceX', 'in-development', 'Human Landing System variant selected for Artemis lunar surface missions.', '[{"label":"Role","value":"Crew lunar lander"},{"label":"Provider","value":"SpaceX"}]', null, 'NASA Starship Human Landing System Artemis', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('gateway', 'Gateway', 'station', 'NASA / International partners', 'in-development', 'Lunar orbit station for staging, science, logistics, and communications.', '[{"label":"Orbit","value":"Near-rectilinear halo orbit"},{"label":"Role","value":"Lunar staging and science"}]', null, 'NASA Gateway lunar orbit station', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('ltv', 'Lunar Terrain Vehicle', 'rover', 'NASA / Commercial providers', 'in-development', 'Unpressurized rover capability for crewed Artemis surface exploration.', '[{"label":"Role","value":"Crew surface mobility"},{"label":"Mode","value":"Crewed and remotely operated"}]', null, 'NASA Lunar Terrain Vehicle Artemis', '[{"label":"NASA Moon Base Systems","url":"https://www.nasa.gov/moonbase-systems/","confidence":"official"}]')
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  owner = excluded.owner,
  status = excluded.status,
  summary = excluded.summary,
  specs = excluded.specs,
  image_url = coalesce(public.equipment.image_url, excluded.image_url),
  image_query = excluded.image_query,
  source_urls = excluded.source_urls;

insert into public.equipment_links (equipment_id, mission_id) values
  ('sls', 'artemis-ii'),
  ('sls', 'artemis-iii'),
  ('sls', 'artemis-iv'),
  ('sls', 'artemis-v'),
  ('orion', 'artemis-ii'),
  ('orion', 'artemis-iii'),
  ('orion', 'artemis-iv'),
  ('orion', 'artemis-v'),
  ('starship-hls', 'artemis-iii'),
  ('starship-hls', 'starship-hls-demo'),
  ('gateway', 'gateway-ppe-halo'),
  ('gateway', 'artemis-iv'),
  ('ltv', 'artemis-v')
on conflict do nothing;

insert into public.equipment (id, name, category, owner, status, summary, specs, image_url, image_query, source_urls) values
  ('blue-moon', 'Blue Moon MK1 / MK2', 'lander', 'Blue Origin', 'in-development', 'Lunar cargo and crew lander family tied to later Artemis and commercial lunar delivery work.', '[{"label":"Role","value":"Cargo and crew-class lunar lander"},{"label":"Provider","value":"Blue Origin"}]', null, 'NASA Blue Moon lunar lander', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('nova-c', 'Nova-C', 'lander', 'Intuitive Machines', 'active', 'Commercial lunar lander class used for CLPS science and technology deliveries.', '[{"label":"Role","value":"Commercial payload lander"},{"label":"Provider","value":"Intuitive Machines"}]', null, 'NASA Intuitive Machines Nova-C lunar lander', '[{"label":"NASA Moon Base Systems","url":"https://www.nasa.gov/moonbase-systems/","confidence":"official"}]'),
  ('griffin', 'Griffin Lander', 'lander', 'Astrobotic', 'watch', 'Commercial lunar lander planned for larger CLPS payload deliveries.', '[{"label":"Role","value":"Commercial lunar cargo"},{"label":"Provider","value":"Astrobotic"}]', null, 'NASA Astrobotic Griffin lunar lander', '[{"label":"NASA Moon Base Systems","url":"https://www.nasa.gov/moonbase-systems/","confidence":"official"}]'),
  ('viper', 'VIPER Rover', 'rover', 'NASA', 'watch', 'Volatiles-investigating rover concept associated with lunar south pole ice resource science.', '[{"label":"Role","value":"Polar volatiles prospecting"},{"label":"Target","value":"Lunar south pole"}]', null, 'NASA VIPER rover lunar south pole', '[{"label":"NASA Moon Base Systems","url":"https://www.nasa.gov/moonbase-systems/","confidence":"official"}]'),
  ('pressurized-rover', 'Pressurized Rover', 'rover', 'NASA / JAXA', 'planned', 'Long-range pressurized mobility concept for multi-day lunar traverses.', '[{"label":"Role","value":"Extended crew mobility"},{"label":"Partner","value":"JAXA"}]', null, 'NASA JAXA pressurized lunar rover', '[{"label":"NASA Moon Base Systems","url":"https://www.nasa.gov/moonbase-systems/","confidence":"official"}]'),
  ('lunar-surface-power', 'Surface Power Systems', 'power', 'NASA / Partners', 'in-development', 'Solar, storage, and nuclear fission power concepts for resilient lunar surface operations.', '[{"label":"Role","value":"Power generation and storage"},{"label":"Challenge","value":"Long lunar night"}]', null, 'NASA lunar surface power Artemis', '[{"label":"NASA Moon Base Systems","url":"https://www.nasa.gov/moonbase-systems/","confidence":"official"}]'),
  ('surface-habitat', 'Surface Habitat', 'habitat', 'NASA / Partners', 'planned', 'Habitation systems for longer lunar surface stays and future sustained base operations.', '[{"label":"Role","value":"Crew living and operations"},{"label":"Phase","value":"Phase Two onward"}]', null, 'NASA Artemis lunar surface habitat', '[{"label":"NASA Moon Base Systems","url":"https://www.nasa.gov/moonbase-systems/","confidence":"official"}]'),
  ('xemu-suits', 'Artemis Spacesuits', 'crew', 'NASA / Axiom Space', 'in-development', 'Next-generation lunar surface suits for Artemis crew exploration.', '[{"label":"Role","value":"Crew EVA"},{"label":"Environment","value":"Lunar south pole"}]', null, 'NASA Artemis lunar spacesuit Axiom', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]')
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  owner = excluded.owner,
  status = excluded.status,
  summary = excluded.summary,
  specs = excluded.specs,
  image_query = excluded.image_query,
  source_urls = excluded.source_urls;

insert into public.equipment_links (equipment_id, mission_id) values
  ('blue-moon', 'artemis-v'),
  ('nova-c', 'clps-cargo-cadence'),
  ('nova-c', 'moon-base-phase-one'),
  ('griffin', 'clps-cargo-cadence'),
  ('griffin', 'moon-base-phase-one'),
  ('viper', 'moon-base-phase-one'),
  ('ltv', 'moon-base-phase-one'),
  ('pressurized-rover', 'phase-two-sustained-stays'),
  ('pressurized-rover', 'phase-three-lunar-base'),
  ('lunar-surface-power', 'moon-base-phase-one'),
  ('lunar-surface-power', 'phase-two-sustained-stays'),
  ('lunar-surface-power', 'phase-three-lunar-base'),
  ('surface-habitat', 'phase-two-sustained-stays'),
  ('surface-habitat', 'phase-three-lunar-base'),
  ('xemu-suits', 'artemis-iii')
on conflict do nothing;

insert into public.mission_events (mission_id, external_source, external_id, title, starts_at, date_label, date_precision, status, summary, source_urls) values
  ('moon-base-phase-one', null, null, 'Phase One operating window', null, 'Now-2029', 'range', 'active', 'Current Moon Base phase covering early deliveries, demonstrations, and crewed lunar architecture.', '[{"label":"NASA Moon Base Phases","url":"https://www.nasa.gov/moonbase-phases/","confidence":"official"}]'),
  ('artemis-ii', 'launch-library-2', 'seed-artemis-ii-schedule-watch', 'Artemis II launch tracking', null, 'Tracked by LL2', 'tbd', 'watch', 'Schedule should be refreshed from Launch Library 2 and official NASA updates.', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"},{"label":"Launch Library 2","url":"https://ll.thespacedevs.com/docs","confidence":"external"}]'),
  ('artemis-iii', null, null, 'Crewed landing campaign', null, '2027 planning baseline', 'year', 'in-development', 'Major crewed landing milestone connected to HLS demonstration and spacesuit readiness.', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('starship-hls-demo', 'launch-library-2', 'seed-starship-hls-demo-watch', 'HLS demo schedule watch', null, '2027 watch', 'year', 'watch', 'Dynamic date should be resolved from Launch Library 2 when a public event or launch record is available.', '[{"label":"Launch Library 2","url":"https://ll.thespacedevs.com/docs","confidence":"external"}]'),
  ('gateway-ppe-halo', null, null, 'Initial Gateway element launch', null, 'Late 2020s', 'range', 'in-development', 'PPE and HALO establish Gateway first lunar-orbit configuration.', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('artemis-iv', null, null, 'Artemis IV planning window', null, 'Early 2028', 'half', 'planned', 'Gateway assembly and crewed lunar campaign milestone.', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('artemis-v', null, null, 'Artemis V planning window', null, 'Late 2028', 'half', 'planned', 'Surface mobility and expanded exploration milestone.', '[{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'),
  ('clps-cargo-cadence', 'launch-library-2', 'seed-clps-cadence-watch', 'Commercial lunar delivery cadence', null, 'Rolling schedule', 'tbd', 'active', 'Upcoming CLPS launches and landings should be refreshed from Launch Library 2.', '[{"label":"NASA Moon Base Systems","url":"https://www.nasa.gov/moonbase-systems/","confidence":"official"},{"label":"Launch Library 2","url":"https://ll.thespacedevs.com/docs","confidence":"external"}]'),
  ('phase-two-sustained-stays', null, null, 'Phase Two target start', '2029-01-01T00:00:00Z', '2029', 'year', 'planned', 'Planning transition toward longer surface operations.', '[{"label":"NASA Moon Base Phases","url":"https://www.nasa.gov/moonbase-phases/","confidence":"official"}]'),
  ('phase-three-lunar-base', null, null, 'Phase Three target start', '2032-01-01T00:00:00Z', '2032+', 'range', 'planned', 'Planning transition toward sustained base operations.', '[{"label":"NASA Moon Base Phases","url":"https://www.nasa.gov/moonbase-phases/","confidence":"official"}]')
on conflict (external_source, external_id) do update set
  title = excluded.title,
  date_label = excluded.date_label,
  date_precision = excluded.date_precision,
  status = excluded.status,
  summary = excluded.summary,
  source_urls = excluded.source_urls;

insert into public.live_links (id, title, type, provider, url, status, summary, is_embed_safe) values
  ('nasa-live', 'NASA Live', 'stream', 'NASA', 'https://www.nasa.gov/live/', 'active', 'Official NASA live programming and event coverage.', false),
  ('nasa-events', 'NASA Events', 'schedule', 'NASA', 'https://www.nasa.gov/events/', 'active', 'Official NASA event schedule for briefings, launches, and live coverage.', false),
  ('ll2-upcoming', 'Launch Library Countdown', 'launch-countdown', 'The Space Devs', 'https://ll.thespacedevs.com/docs', 'active', 'Upcoming launch and event timing source for automated schedule refreshes.', false),
  ('arow', 'Artemis Real-time Orbit Website', 'tracking', 'NASA', 'https://www.nasa.gov/missions/artemis/orion/track-nasas-artemis-i-mission-in-real-time', 'watch', 'Use when NASA enables public Artemis/Orion mission tracking. Do not fake telemetry.', true),
  ('dsn-now', 'DSN Now', 'tracking', 'NASA', 'https://eyes.nasa.gov/apps/dsn-now/dsn.html', 'active', 'Deep Space Network activity view for spacecraft communication context.', true)
on conflict (id) do update set
  title = excluded.title,
  type = excluded.type,
  provider = excluded.provider,
  url = excluded.url,
  status = excluded.status,
  summary = excluded.summary,
  is_embed_safe = excluded.is_embed_safe;
