import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Extra = {
  supabaseUrl?: string;
  supabasePublishableKey?: string;
  supabaseAnonKey?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as Extra;
const runtimeEnv =
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

const supabaseUrl = runtimeEnv.EXPO_PUBLIC_SUPABASE_URL || extra.supabaseUrl || "";
const supabasePublishableKey =
  runtimeEnv.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  runtimeEnv.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  extra.supabasePublishableKey ||
  extra.supabaseAnonKey ||
  "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
      }
    })
  : null;
