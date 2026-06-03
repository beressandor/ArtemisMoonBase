update public.missions
set
  subtitle = 'Gateway architecture watch',
  status = 'watch',
  date_label = 'NET 2027',
  date_precision = 'year',
  summary = 'NASA still lists Gateway and its PPE/HALO first elements as a future mission targeting launch no earlier than 2027, but the refined 2026 Artemis architecture no longer presents Gateway as the near-term Artemis IV milestone, so this item remains under architecture watch.',
  objectives = '["Track whether NASA keeps PPE/HALO in the active lunar architecture","Monitor launch timing and partner commitments for Gateway''s first elements","Keep Gateway separate from confirmed Artemis surface mission milestones"]'::jsonb,
  source_urls = '[{"label":"NASA Gateway","url":"https://www.nasa.gov/mission/gateway/","confidence":"official"},{"label":"NASA Artemis Architecture Update","url":"https://www.nasa.gov/directorates/esdmd/nasa-strengthens-artemis-adds-mission-refines-overall-architecture/","confidence":"official"},{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'::jsonb,
  updated_at = now()
where id = 'gateway-ppe-halo';

update public.mission_events
set
  title = 'PPE/HALO launch status watch',
  date_label = 'NET 2027',
  date_precision = 'year',
  status = 'watch',
  summary = 'NASA''s Gateway page still lists PPE/HALO as a future launch target, while the near-term Artemis architecture has been refined around surface missions.',
  source_urls = '[{"label":"NASA Gateway","url":"https://www.nasa.gov/mission/gateway/","confidence":"official"},{"label":"NASA Artemis Architecture Update","url":"https://www.nasa.gov/directorates/esdmd/nasa-strengthens-artemis-adds-mission-refines-overall-architecture/","confidence":"official"},{"label":"NASA Artemis","url":"https://www.nasa.gov/humans-in-space/artemis/","confidence":"official"}]'::jsonb,
  updated_at = now()
where mission_id = 'gateway-ppe-halo'
  and external_source is null;

update public.equipment
set
  status = 'watch',
  summary = 'Lunar orbit station concept for staging, science, logistics, and communications, currently tracked as an Artemis architecture watch item.',
  source_urls = '[{"label":"NASA Gateway","url":"https://www.nasa.gov/mission/gateway/","confidence":"official"},{"label":"NASA Artemis Architecture Update","url":"https://www.nasa.gov/directorates/esdmd/nasa-strengthens-artemis-adds-mission-refines-overall-architecture/","confidence":"official"},{"label":"NASA Images","url":"https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf","confidence":"official"}]'::jsonb,
  updated_at = now()
where id = 'gateway';

delete from public.equipment_links
where equipment_id = 'gateway'
  and mission_id in ('artemis-iv', 'artemis-v');
