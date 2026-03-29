import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getEnv } from "@/lib/env";

export function createSupabaseServerClient() {
  const e = getEnv();
  if (!e.supabaseUrl || !e.supabaseAnonKey) {
    // Avoid crashing during build or local preview when env isn't set.
    return null;
  }

  return createServerClient(e.supabaseUrl, e.supabaseAnonKey, {
    cookies: {
      getAll: async () => {
        const jar = await cookies();
        return jar.getAll().map((c) => ({ name: c.name, value: c.value }));
      },
      setAll: async (cookieList) => {
        const jar = await cookies();
        for (const c of cookieList) {
          jar.set(c);
        }
      },
    },
  });
}
