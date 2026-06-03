update public.live_links
set
  title = 'Launch Countdown',
  provider = 'Mission schedule',
  url = 'https://www.nasa.gov/events/',
  summary = 'Upcoming launch and event timing context for automated schedule refreshes.',
  updated_at = now()
where id = 'll2-upcoming';

update public.mission_events
set
  summary = 'Dynamic date should be resolved when a public event or launch record is available.',
  updated_at = now()
where mission_id = 'starship-hls-demo'
  and external_source = 'launch-library-2';

update public.mission_events
set
  summary = 'Upcoming CLPS launches and landings should be refreshed automatically as schedules change.',
  updated_at = now()
where mission_id = 'clps-cargo-cadence'
  and external_source = 'launch-library-2';
