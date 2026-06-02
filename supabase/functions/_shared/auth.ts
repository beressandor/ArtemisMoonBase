import { jsonResponse } from "./cors.ts";

interface VaultClient {
  rpc: (fn: string) => Promise<{
    data: string | null;
    error: { message: string } | null;
  }>;
}

const readSyncSecret = async (supabase: VaultClient): Promise<string | null> => {
  const { data, error } = await supabase.rpc("get_sync_admin_secret");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? Deno.env.get("SYNC_ADMIN_SECRET") ?? null;
};

export const requireSyncSecret = async (request: Request, supabase: VaultClient): Promise<Response | null> => {
  const expectedSecret = await readSyncSecret(supabase);

  if (!expectedSecret) {
    return jsonResponse({ error: "Missing sync admin secret." }, 500);
  }

  if (request.headers.get("x-sync-secret") !== expectedSecret) {
    return jsonResponse({ error: "Unauthorized." }, 401);
  }

  return null;
};
