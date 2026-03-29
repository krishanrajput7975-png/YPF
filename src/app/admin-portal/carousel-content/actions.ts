"use server";

import { revalidatePath } from "next/cache";

import {
  addCarouselItem,
  deleteCarouselItem,
  updateCarouselItem,
  type CarouselKey,
} from "@/lib/cms-carousels";
import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

type AllowedType = (typeof ALLOWED_TYPES)[number];

const ALLOWED_KEYS: CarouselKey[] = ["home_hero", "home_awards", "home_initiatives"];

function assertEnv() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local (server-only)." );
  }
}

function requireText(v: unknown, label: string) {
  const s = String(v ?? "").trim();
  if (!s) throw new Error(`${label} is required.`);
  return s;
}

function fileExt(type: AllowedType) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

export async function uploadCarouselItemAction(formData: FormData) {
  assertEnv();

  const keyRaw = String(formData.get("carouselKey") ?? "").trim();
  if (!keyRaw) throw new Error("carouselKey is required.");
  if (!ALLOWED_KEYS.includes(keyRaw as CarouselKey)) throw new Error("Invalid carousel key.");
  const key = keyRaw as CarouselKey;

  // Two inputs only: Heading + Description
  const title = requireText(formData.get("title"), "Heading");
  const subtitle = String(formData.get("subtitle") ?? "").trim() || undefined;

  // Auto alt text (admin doesn't need to type it).
  const alt = title;

  const file = formData.get("image");
  if (!(file instanceof File)) throw new Error("Image file is required.");

  if (!ALLOWED_TYPES.includes(file.type as AllowedType)) {
    throw new Error("Only JPG, PNG, or WEBP images are allowed.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image is too large. Max 5MB.");
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin client unavailable.");

  const ext = fileExt(file.type as AllowedType);
  const path = `carousels/${key}/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("site-media").getPublicUrl(path);
  const imageUrl = data.publicUrl;

  await addCarouselItem(key, { title, subtitle, alt, imageUrl });

  revalidatePath("/");
  revalidatePath("/admin-portal/carousel-content");
}

export async function deleteCarouselItemAction(formData: FormData) {
  const key = String(formData.get("carouselKey") ?? "") as CarouselKey;
  const id = String(formData.get("id") ?? "").trim();
  if (!key || !id) return;

  await deleteCarouselItem(key, id);
  revalidatePath("/");
  revalidatePath("/admin-portal/carousel-content");
}

export async function editCarouselItemAction(formData: FormData) {
  assertEnv();

  const keyRaw = String(formData.get("carouselKey") ?? "").trim();
  if (!keyRaw) throw new Error("carouselKey is required.");
  if (!ALLOWED_KEYS.includes(keyRaw as CarouselKey)) throw new Error("Invalid carousel key.");
  const key = keyRaw as CarouselKey;

  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("id is required.");

  // Two inputs only: Heading + Description
  const title = requireText(formData.get("title"), "Heading");
  const subtitle = String(formData.get("subtitle") ?? "").trim() || undefined;

  // Auto alt text from heading
  const alt = title;

  // Optional image replacement
  const file = formData.get("image");
  let imageUrl: string | undefined;

  if (file instanceof File && file.size > 0) {
    if (!ALLOWED_TYPES.includes(file.type as AllowedType)) {
      throw new Error("Only JPG, PNG, or WEBP images are allowed.");
    }
    if (file.size > MAX_BYTES) {
      throw new Error("Image is too large. Max 5MB.");
    }

    const supabase = createSupabaseAdminClient();
    if (!supabase) throw new Error("Supabase admin client unavailable.");

    const ext = fileExt(file.type as AllowedType);
    const path = `carousels/${key}/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (uploadError) throw new Error(uploadError.message);

    const { data } = supabase.storage.from("site-media").getPublicUrl(path);
    imageUrl = data.publicUrl;
  }

  await updateCarouselItem(key, id, { title, subtitle, alt, imageUrl });

  revalidatePath("/");
  revalidatePath("/admin-portal/carousel-content");
}
