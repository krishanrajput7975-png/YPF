"use server";

import { revalidatePath } from "next/cache";

import { setSiteLogo } from "@/lib/cms-branding";
import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"] as const;

type AllowedType = (typeof ALLOWED_TYPES)[number];

function assertEnv() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local (server-only)." );
  }
}

function fileExt(type: AllowedType) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/svg+xml") return "svg";
  return "jpg";
}

export async function uploadSiteLogoAction(formData: FormData) {
  assertEnv();

  const alt = String(formData.get("alt") ?? "").trim() || "Yuvva Pariwar Foundation logo";

  const file = formData.get("logo");
  if (!(file instanceof File)) throw new Error("Logo file is required.");

  if (!ALLOWED_TYPES.includes(file.type as AllowedType)) {
    throw new Error("Allowed logo types: SVG, PNG, JPG, WEBP.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Logo is too large. Max 2MB.");
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin client unavailable.");

  const ext = fileExt(file.type as AllowedType);
  const path = `branding/logo-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, {
    contentType: file.type,
    upsert: true,
  });
  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("site-media").getPublicUrl(path);
  const imageUrl = data.publicUrl;

  await setSiteLogo({ imageUrl, alt });

  revalidatePath("/");
  revalidatePath("/admin-portal");
  revalidatePath("/admin-portal/site-branding");
}
