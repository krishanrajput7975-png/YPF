import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

export type LiveProgram = {
  title: string;
  location: string;
  isActive: boolean;
  updatedAt: string;
};

const CONTENT_KEY = "site:live_program";

export async function getLiveProgram(): Promise<LiveProgram | null> {
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

  const obj = v as Partial<LiveProgram>;
  if (!obj.title || !obj.location) return null;

  return {
    title: String(obj.title),
    location: String(obj.location),
    isActive: Boolean(obj.isActive),
    updatedAt: String(obj.updatedAt ?? new Date(0).toISOString()),
  };
}

export async function setLiveProgram(input: { title: string; location: string; isActive: boolean }): Promise<void> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase env is missing.");

  const title = input.title.trim();
  const location = input.location.trim();
  if (!title) throw new Error("Program title is required.");
  if (!location) throw new Error("Location is required.");

  const value: LiveProgram = {
    title,
    location,
    isActive: Boolean(input.isActive),
    updatedAt: new Date().toISOString(),
  };

  const { error } = await supabase.from("content").upsert({
    key: CONTENT_KEY,
    value,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
}
