"use server";

import { revalidatePath } from "next/cache";
import { updateLeadershipImage } from "@/lib/cms-leadership";
import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

function assertAdminEnv() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
}

export async function updateLeadershipImageAction(formData: FormData) {
  assertAdminEnv();

  const id = formData.get("id") as string;
  const file = formData.get("image") as File;

  if (!id || !file || !(file instanceof File) || file.size === 0) {
    throw new Error("Invalid submission");
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin client unavailable.");

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG, or WEBP images are allowed.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be smaller than 5MB.");
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `leadership/${id}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("site-media").getPublicUrl(path);

  await updateLeadershipImage(id, data.publicUrl);

  revalidatePath("/");
  revalidatePath("/hi");
  revalidatePath("/en");
  revalidatePath("/hi/about");
  revalidatePath("/en/about");
  revalidatePath("/admin-portal/leadership");
}
