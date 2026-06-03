update public.equipment
set
  owner = 'NASA / Partners',
  updated_at = now()
where owner in ('NASA / Commercial providers', 'NASA / International partners');
