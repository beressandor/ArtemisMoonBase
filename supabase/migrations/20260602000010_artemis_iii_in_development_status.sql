update public.missions
set
  status = 'in-development',
  updated_at = now()
where id = 'artemis-iii';

update public.mission_events
set
  status = 'in-development',
  updated_at = now()
where mission_id = 'artemis-iii'
  and external_source is null;
