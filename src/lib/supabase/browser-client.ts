import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/env";

export function createSupabaseBrowserClient() {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    // Avoid crashing during build when env isn't set yet.
    return null;
  }

  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
}

