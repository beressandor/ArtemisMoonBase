do $$
begin
  if exists (select 1 from cron.job where jobname = 'sync-nasa-news-hourly') then
    perform cron.unschedule('sync-nasa-news-hourly');
  end if;
end $$;

select cron.schedule(
  'sync-nasa-news-hourly',
  '11 * * * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'project_url') || '/functions/v1/sync-nasa-news',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-sync-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'sync_admin_secret')
    ),
    body := jsonb_build_object('source', 'cron', 'scheduled_at', now())
  ) as request_id;
  $$
);
