"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

export async function approveMemberAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin client unavailable.");

  const { error } = await supabase.from("members").update({ status: "approved" }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin-portal/members");
  revalidatePath("/verify");
}

