import crypto from "node:crypto";

import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

export type GalleryItem = {
  id: string;
  title?: string;
  caption?: string;
  imageUrl: string;
  createdAt: string; // ISO
};

const CONTENT_KEY = "gallery_items";

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("content")
    .select("value")
    .eq("key", CONTENT_KEY)
    .maybeSingle();

  if (error) throw new Error(error.message);

  const items = (data?.value as unknown) ?? [];
  if (!Array.isArray(items)) return [];

  const mapped: Array<GalleryItem | null> = items.map((x) => {
    const obj = x as Partial<GalleryItem>;
    if (!obj.id || !obj.imageUrl || !obj.createdAt) return null;
    return {
      id: String(obj.id),
      title: obj.title ? String(obj.title).trim() || undefined : undefined,
      caption: obj.caption ? String(obj.caption).trim() || undefined : undefined,
      imageUrl: String(obj.imageUrl),
      createdAt: String(obj.createdAt),
    };
  });

  return mapped
    .filter((x): x is GalleryItem => x !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addGalleryItem(input: {
  title?: string;
  caption?: string;
  imageUrl: string;
}): Promise<GalleryItem> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase env is missing.");

  const current = await getGalleryItems();

  const next: GalleryItem = {
    id: crypto.randomUUID(),
    title: input.title ? input.title : undefined,
    caption: input.caption,
    imageUrl: input.imageUrl,
    createdAt: new Date().toISOString(),
  };

  const updated = [next, ...current];

  const { error } = await supabase.from("content").upsert({
    key: CONTENT_KEY,
    value: updated,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
  return next;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase env is missing.");

  const current = await getGalleryItems();
  const updated = current.filter((x) => x.id !== id);

  const { error } = await supabase.from("content").upsert({
    key: CONTENT_KEY,
    value: updated,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
}

export async function updateGalleryItem(
  id: string,
  patch: Partial<Pick<GalleryItem, "title" | "caption">>
): Promise<GalleryItem> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase env is missing.");

  const current = await getGalleryItems();
  const idx = current.findIndex((x) => x.id === id);
  if (idx < 0) throw new Error("Item not found.");

  const normalize = (v: unknown) => {
    const s = String(v ?? "").trim();
    return s;
  };

  const titlePatch = patch.title === undefined ? undefined : normalize(patch.title);
  const captionPatch = patch.caption === undefined ? undefined : normalize(patch.caption);

  const next: GalleryItem = {
    ...current[idx],
    // If patch is explicit empty string => clear
    title:
      patch.title === undefined
        ? current[idx].title
        : titlePatch
          ? titlePatch
          : undefined,
    caption:
      patch.caption === undefined
        ? current[idx].caption
        : captionPatch
          ? captionPatch
          : undefined,
  };

  const updated = [...current.slice(0, idx), next, ...current.slice(idx + 1)];

  const { error } = await supabase.from("content").upsert({
    key: CONTENT_KEY,
    value: updated,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
  return next;
}
