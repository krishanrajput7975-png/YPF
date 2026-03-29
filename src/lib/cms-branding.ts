import crypto from "node:crypto";

import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

export type SiteLogo = {
  imageUrl: string;
  alt: string;
};

const CONTENT_KEY = "site:logo";

export async function getSiteLogo(): Promise<SiteLogo | null> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("content")
    .select("value")
    .eq("key", CONTENT_KEY)
    .maybeSingle();

  if (error) throw new Error(error.message);

  const v = data?.value as unknown;
  if (!v || typeof v !== "object") return null;

  const obj = v as Partial<SiteLogo>;
  if (!obj.imageUrl) return null;

  return {
    imageUrl: String(obj.imageUrl),
    alt: obj.alt ? String(obj.alt) : "Yuvva Pariwar Foundation logo",
  };
}

export async function setSiteLogo(input: SiteLogo): Promise<void> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase env is missing.");

  const { error } = await supabase.from("content").upsert({
    key: CONTENT_KEY,
    value: input,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
}
