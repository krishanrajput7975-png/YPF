import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export type HomepageStats = {
  areasCount: number;
  programsCount: number;
};

const CONTENT_KEY = "site:homepage_stats";

export async function getHomepageStats(): Promise<HomepageStats | null> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("content")
    .select("value")
    .eq("key", CONTENT_KEY)
    .maybeSingle();

  if (error) throw new Error(error.message);

  const v = data?.value as unknown;
  if (!v || typeof v !== "object") return null;

  const obj = v as Partial<HomepageStats>;
  const areasCount = Number(obj.areasCount);
  const programsCount = Number(obj.programsCount);

  if (!Number.isFinite(areasCount) || !Number.isFinite(programsCount)) return null;

  return {
    areasCount: Math.max(0, Math.floor(areasCount)),
    programsCount: Math.max(0, Math.floor(programsCount)),
  };
}

export async function setHomepageStats(input: HomepageStats): Promise<void> {
  const supabase = createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase env is missing.");

  const value: HomepageStats = {
    areasCount: Math.max(0, Math.floor(input.areasCount)),
    programsCount: Math.max(0, Math.floor(input.programsCount)),
  };

  const { error } = await supabase.from("content").upsert({
    key: CONTENT_KEY,
    value,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
}

