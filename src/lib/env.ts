export function getEnv() {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  } as const;
}

export const env = getEnv();

export function assertPublicEnv() {
  const e = getEnv();
  const missing: string[] = [];
  if (!e.supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!e.supabaseAnonKey) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (missing.length) {
    throw new Error(
      `Missing required env vars: ${missing.join(", ")}. Copy .env.example to .env.local and fill values.`
    );
  }
}
