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
$env:EXPO_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

The mobile client never calls NASA or Launch Library APIs directly. It reads Supabase data and falls back to bundled seed content for local preview.

## Backend

- SQL schema and seeds: `supabase/migrations`
- Edge sync functions: `supabase/functions/sync-launch-library`, `supabase/functions/sync-nasa-images`
- Dynamic schedule source: Launch Library 2
- Editorial source of truth: NASA Moon Base and Artemis pages
- Media source: NASA Images

## Checks

```powershell
npm run typecheck
npm run test
```
