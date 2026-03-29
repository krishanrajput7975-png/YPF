import { createClient } from "@supabase/supabase-js";

import { getEnv } from "@/lib/env";

/**
 * Server-only Supabase client using the service role key.
 *
 * IMPORTANT:
 * - Never import this from client components.
 * - Use only in server actions / route handlers / server components.
 */
export function createSupabaseAdminClient() {
  const e = getEnv();
  if (!e.supabaseUrl || !e.supabaseServiceRoleKey) {
    return null;
  }

  return createClient(e.supabaseUrl, e.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
