create extension if not exists pg_net;
create extension if not exists pg_cron;
create extension if not exists supabase_vault with schema vault;

do $$
begin
  if exists (select 1 from cron.job where jobname = 'sync-launch-library-hourly') then
    perform cron.unschedule('sync-launch-library-hourly');
  end if;

  if exists (select 1 from cron.job where jobname = 'sync-nasa-images-nightly') then
    perform cron.unschedule('sync-nasa-images-nightly');
  end if;
end $$;

select cron.schedule(
  'sync-launch-library-hourly',
  '17 * * * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'project_url') || '/functions/v1/sync-launch-library',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-sync-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'sync_admin_secret')
    ),
    body := jsonb_build_object('source', 'cron', 'scheduled_at', now())
  ) as request_id;
  $$
);

select cron.schedule(
  'sync-nasa-images-nightly',
  '42 2 * * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'project_url') || '/functions/v1/sync-nasa-images',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-sync-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'sync_admin_secret')
    ),
    body := jsonb_build_object('source', 'cron', 'scheduled_at', now())
  ) as request_id;
  $$
);
