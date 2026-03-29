import crypto from "node:crypto";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

export type LatestUpdate = {
  id: string;
  title: string;
  subtitle?: string;
  createdAt: string;
};

const CONTENT_KEY = "site:latest_updates";

export async function getLatestUpdates(): Promise<LatestUpdate[]> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("content")
    .select("value")
    .eq("key", CONTENT_KEY)
    .maybeSingle();

  if (error) throw new Error(error.message);

  const raw = (data?.value as unknown) ?? [];
  if (!Array.isArray(raw)) return [];

  const mapped: Array<LatestUpdate | null> = raw.map((x) => {
    const obj = x as Partial<LatestUpdate>;
    if (!obj.id || !obj.title) return null;
    return {
      id: String(obj.id),
      title: String(obj.title),
      subtitle: obj.subtitle ? String(obj.subtitle) : undefined,
      createdAt: String(obj.createdAt ?? new Date(0).toISOString()),
    };
  });

  return mapped
    .filter((x): x is LatestUpdate => x !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addLatestUpdate(input: { title: string; subtitle?: string }): Promise<LatestUpdate> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin client is missing.");

  const title = input.title.trim();
  if (!title) throw new Error("Title is required.");

  const current = await getLatestUpdates();
  const next: LatestUpdate = {
    id: crypto.randomUUID(),
    title,
    subtitle: input.subtitle?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  // keep only latest 10
  const updated = [next, ...current].slice(0, 10);

  const { error } = await supabase.from("content").upsert({
    key: CONTENT_KEY,
    value: updated,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);

  return next;
}

export async function deleteLatestUpdate(id: string): Promise<void> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin client is missing.");

  const current = await getLatestUpdates();
  const updated = current.filter((x) => x.id !== id);

  const { error } = await supabase.from("content").upsert({
    key: CONTENT_KEY,
    value: updated,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}
