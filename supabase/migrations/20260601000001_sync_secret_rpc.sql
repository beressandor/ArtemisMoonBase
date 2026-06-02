create or replace function public.get_sync_admin_secret()
returns text
language sql
security definer
set search_path = vault, public
as $$
  select decrypted_secret
  from vault.decrypted_secrets
  where name = 'sync_admin_secret'
  limit 1;
$$;

revoke all on function public.get_sync_admin_secret() from public;
revoke all on function public.get_sync_admin_secret() from anon;
revoke all on function public.get_sync_admin_secret() from authenticated;
grant execute on function public.get_sync_admin_secret() to service_role;
