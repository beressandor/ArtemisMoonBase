# Artemis Moon Base

Dark-mode Expo React Native MVP for tracking NASA Moon Base phases, Artemis missions, mission equipment, and live launch/event links.

## Quick Start

```powershell
npm install
npx expo install --fix
npm run start
```

Set these Expo public variables or fill `app.json` `extra` values when connecting Supabase:

```powershell
$env:EXPO_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
$env:EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
```

The mobile client never calls NASA or Launch Library APIs directly. It reads Supabase data and falls back to bundled seed content for local preview.

## Backend

- SQL schema and seeds: `supabase/migrations`
- Edge sync functions: `supabase/functions/sync-launch-library`, `supabase/functions/sync-nasa-images`
- Dynamic schedule source: Launch Library 2
- Editorial source of truth: NASA Moon Base and Artemis pages
- Media source: NASA Images

### Supabase project setup

```powershell
supabase login
supabase link --project-ref "your-project-ref"
supabase db push
supabase functions deploy sync-launch-library
supabase functions deploy sync-nasa-images
```

Put only public Expo variables in `.env`. Keep `SUPABASE_SERVICE_ROLE_KEY` server-side in Supabase secrets or dashboard settings.

Scheduled sync jobs are installed by `supabase/migrations/20260601000000_schedule_sync_jobs.sql`:

- `sync-launch-library-hourly`: runs hourly at minute 17.
- `sync-nasa-images-nightly`: runs daily at 02:42 UTC.

The jobs call Edge Functions through `pg_cron` + `pg_net`. The call secret is stored as `SYNC_ADMIN_SECRET` for Edge Functions and mirrored in Supabase Vault as `sync_admin_secret`.

Launch Library 2 free, unauthenticated usage is limited, so `sync-launch-library` makes one `launches/upcoming` request per run and filters Artemis/Moon/Base-related launches in code.

## Checks

```powershell
npm run typecheck
npm run test
```
