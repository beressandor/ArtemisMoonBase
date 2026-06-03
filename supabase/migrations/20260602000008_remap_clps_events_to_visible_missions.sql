update public.mission_events
set
  mission_id = case
    when lower(title || ' ' || summary) ~ '(griffin|astrobotic)' then 'moon-base-ii'
    when lower(title || ' ' || summary) ~ '(nova-c|intuitive machines|im-3|im 3)' then 'moon-base-iii'
    when lower(title || ' ' || summary) ~ '(blue moon|blue origin|endurance)' then 'moon-base-i'
    else mission_id
  end,
  updated_at = now()
where mission_id = 'clps-cargo-cadence'
  and external_source = 'launch-library-2'
  and lower(title || ' ' || summary) ~ '(griffin|astrobotic|nova-c|intuitive machines|im-3|im 3|blue moon|blue origin|endurance)';
