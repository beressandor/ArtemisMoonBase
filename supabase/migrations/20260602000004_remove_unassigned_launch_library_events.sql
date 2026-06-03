delete from public.mission_events
where external_source = 'launch-library-2'
  and mission_id is null;
