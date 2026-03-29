import crypto from "node:crypto";

import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

export async function uploadMemberPhoto({
  memberId,
  dataUrl,
}: {
  memberId: string;
  dataUrl: string;
}): Promise<string> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin client unavailable.");

  const [header, base64] = dataUrl.split(",");
  if (!header || !base64) throw new Error("Invalid photo data.");

  const mimeMatch = header.match(/data:(.*?);base64/);
  const mime = mimeMatch?.[1] ?? "image/jpeg";
  const ext = mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg";

  const bytes = Buffer.from(base64, "base64");
  const hash = crypto.createHash("sha1").update(bytes).digest("hex").slice(0, 10);

  const path = `members/${memberId}/${Date.now()}-${hash}.${ext}`;

  const { error } = await supabase.storage.from("site-media").upload(path, bytes, {
    contentType: mime,
    upsert: true,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("site-media").getPublicUrl(path);
  if (!data?.publicUrl) throw new Error("Failed to create public URL.");

  return data.publicUrl;
}

