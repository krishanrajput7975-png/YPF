"use server";

import { revalidatePath } from "next/cache";

import { addGalleryItem, deleteGalleryItem, updateGalleryItem } from "@/lib/cms-gallery";
import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

const MAX_FILES = 10;
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

type AllowedType = (typeof ALLOWED_TYPES)[number];

function assertAdminEnv() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local (server-only)." );
  }
}

function requireNonEmpty(v: string, field: string) {
  const s = v.trim();
  if (!s) throw new Error(`${field} is required.`);
  return s;
}

function toOptionalText(v: unknown) {
  const s = String(v ?? "").trim();
  return s ? s : undefined;
}

function fileExt(type: AllowedType) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

export async function uploadGalleryBatchAction(formData: FormData) {
  assertAdminEnv();

  const files = formData.getAll("images").filter((x): x is File => x instanceof File);
  if (files.length === 0) throw new Error("Please select at least 1 image.");
  if (files.length > MAX_FILES) throw new Error(`Max ${MAX_FILES} images per upload.`);

  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin client unavailable.");

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type as AllowedType)) {
      throw new Error("Only JPG, PNG, or WEBP images are allowed.");
    }
    if (file.size > MAX_BYTES) {
      throw new Error("One of the images is too large. Max 5MB per image.");
    }

    // Titles/captions come keyed by original file name (from client).
    const titleKey = `title:${file.name}`;
    const captionKey = `caption:${file.name}`;

    const title = toOptionalText(formData.get(titleKey));
    const caption = toOptionalText(formData.get(captionKey));

    const ext = fileExt(file.type as AllowedType);
    const path = `gallery/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

    if (uploadError) throw new Error(uploadError.message);

    const { data } = supabase.storage.from("site-media").getPublicUrl(path);
    const imageUrl = data.publicUrl;

    await addGalleryItem({
      title: title ?? "",
      caption,
      imageUrl,
    });
  }

  revalidatePath("/gallery");
  revalidatePath("/admin-portal/gallery");
}

// Backward compatible single upload (can be removed later if unused)
export async function uploadGalleryImageAction(formData: FormData) {
  const file = formData.get("image");
  if (!(file instanceof File)) throw new Error("Image file is required.");

  const fd = new FormData();
  fd.append("images", file);
  fd.append(`title:${file.name}`, String(formData.get("title") ?? "").trim());
  fd.append(`caption:${file.name}`, String(formData.get("caption") ?? "").trim());

  await uploadGalleryBatchAction(fd);
}

export async function deleteGalleryItemAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  await deleteGalleryItem(id);
  revalidatePath("/gallery");
  revalidatePath("/admin-portal/gallery");
}

export async function editGalleryItemAction(formData: FormData) {
  assertAdminEnv();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("id is required.");

  const rawTitle = String(formData.get("title") ?? "");
  // IMPORTANT: empty string means "clear".
  const title = rawTitle.trim();

  await updateGalleryItem(id, { title, caption: "" });

  revalidatePath("/gallery");
  revalidatePath("/hi/gallery");
  revalidatePath("/en/gallery");
  revalidatePath("/admin-portal/gallery");
}
