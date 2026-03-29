import crypto from "node:crypto";

import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

export type CarouselKey = "home_hero" | "home_awards" | "home_initiatives";

export type CarouselItem = {
  id: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  alt: string;
  sortOrder: number;
  createdAt: string;
};

function contentKey(key: CarouselKey) {
  return `carousel:${key}`;
}

export async function getCarouselItems(key: CarouselKey): Promise<CarouselItem[]> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("content")
    .select("value")
    .eq("key", contentKey(key))
    .maybeSingle();

  if (error) throw new Error(error.message);

  const raw = (data?.value as unknown) ?? [];
  if (!Array.isArray(raw)) return [];

  const mapped: Array<CarouselItem | null> = raw.map((x) => {
    const obj = x as Partial<CarouselItem>;
    if (!obj.id || !obj.imageUrl || !obj.alt) return null;
    return {
      id: String(obj.id),
      title: obj.title ? String(obj.title) : undefined,
      subtitle: obj.subtitle ? String(obj.subtitle) : undefined,
      imageUrl: String(obj.imageUrl),
      alt: String(obj.alt),
      sortOrder: typeof obj.sortOrder === "number" ? obj.sortOrder : Number(obj.sortOrder ?? 0),
      createdAt: String(obj.createdAt ?? new Date(0).toISOString()),
    };
  });

  return mapped
    .filter((x): x is CarouselItem => x !== null)
    .sort((a, b) => (a.sortOrder - b.sortOrder) || b.createdAt.localeCompare(a.createdAt));
}

export async function addCarouselItem(
  key: CarouselKey,
  input: { title?: string; subtitle?: string; imageUrl: string; alt: string }
): Promise<CarouselItem> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase env is missing.");

  const current = await getCarouselItems(key);
  const maxSort = current.reduce((m, it) => Math.max(m, it.sortOrder), 0);

  const next: CarouselItem = {
    id: crypto.randomUUID(),
    title: input.title,
    subtitle: input.subtitle,
    imageUrl: input.imageUrl,
    alt: input.alt,
    sortOrder: maxSort + 1,
    createdAt: new Date().toISOString(),
  };

  const updated = [...current, next];

  const { error } = await supabase.from("content").upsert({
    key: contentKey(key),
    value: updated,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);

  return next;
}

export async function deleteCarouselItem(key: CarouselKey, id: string): Promise<void> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase env is missing.");

  const current = await getCarouselItems(key);
  const updated = current.filter((x) => x.id !== id);

  const { error } = await supabase.from("content").upsert({
    key: contentKey(key),
    value: updated,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}

export async function updateCarouselItem(
  key: CarouselKey,
  id: string,
  patch: Partial<Pick<CarouselItem, "title" | "subtitle" | "alt" | "imageUrl" | "sortOrder">>
): Promise<CarouselItem> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase env is missing.");

  const current = await getCarouselItems(key);
  const idx = current.findIndex((x) => x.id === id);
  if (idx < 0) throw new Error("Item not found.");

  const next: CarouselItem = {
    ...current[idx],
    title: patch.title === undefined ? current[idx].title : patch.title,
    subtitle: patch.subtitle === undefined ? current[idx].subtitle : patch.subtitle,
    alt: patch.alt === undefined ? current[idx].alt : String(patch.alt ?? ""),
    imageUrl: patch.imageUrl === undefined ? current[idx].imageUrl : String(patch.imageUrl ?? ""),
    sortOrder:
      patch.sortOrder === undefined
        ? current[idx].sortOrder
        : typeof patch.sortOrder === "number"
          ? patch.sortOrder
          : Number(patch.sortOrder),
  };

  // Basic validation
  if (!next.imageUrl) throw new Error("imageUrl is required.");
  if (!next.alt) throw new Error("Alt text is required.");

  const updated = [...current.slice(0, idx), next, ...current.slice(idx + 1)];

  const { error } = await supabase.from("content").upsert({
    key: contentKey(key),
    value: updated,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);

  return next;
}
