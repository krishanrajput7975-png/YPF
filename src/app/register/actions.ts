"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { registerSchema } from "@/lib/validation/register";
import { getMemberSettings } from "@/lib/cms-member-settings";
import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";
import { uploadMemberPhoto } from "@/lib/supabase/upload-member-photo";

export type RegisterActionResult =
  | { ok: true; memberId: string; status: "pending" | "approved" }
  | { ok: false, error: string };

function toUserMessage(message: string) {
  const m = message.toLowerCase();
  if (m.includes("duplicate") || m.includes("unique")) {
    return "This mobile number is already registered.";
  }

  // Helpful hint for common RLS issues
  if (m.includes("row-level security") || m.includes("rls")) {
    return "Registration is blocked by database security rules (RLS). Please enable public insert policy for members.";
  }

  return `Registration failed. (${message})`;
}

export async function registerMemberAction(formData: FormData): Promise<RegisterActionResult> {
  try {
    const parsed = registerSchema.safeParse({
      fullName: String(formData.get("fullName") ?? ""),
      fatherName: String(formData.get("fatherName") ?? ""),
      dob: String(formData.get("dob") ?? ""),
      designation: String(formData.get("designation") ?? ""),
      area: String(formData.get("area") ?? ""),
      district: String(formData.get("district") ?? ""),
      state: String(formData.get("state") ?? ""),
      mobile: String(formData.get("mobile") ?? ""),
      bloodGroup: String(formData.get("bloodGroup") ?? ""),
    });

    if (!parsed.success) {
      return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form." };
    }

    const supabase = createSupabaseServerClient();
    if (!supabase) {
      return { ok: false, error: "Supabase is not configured. Please contact support." };
    }

    const v = parsed.data;

    // Check if a member with this mobile number already exists
    const { data: existingMembers, error: searchError } = await supabase
      .from("members")
      .select("id")
      .eq("mobile", v.mobile)
      .limit(1);

    if (searchError) {
      return { ok: false, error: "Database error while verifying mobile number." };
    }

    if (existingMembers && existingMembers.length > 0) {
      return { ok: false, error: "This mobile number is already registered. Please check verification page using your mobile number or ID." };
    }

    const settings = await getMemberSettings().catch(() => ({ requireAdminApproval: true }));
    const status = settings.requireAdminApproval ? "pending" : "approved";

    // Insert member first
    const { data, error } = await supabase
      .from("members")
      .insert({
        full_name: v.fullName,
        father_name: v.fatherName,
        dob: v.dob,
        designation: v.designation,
        area: v.area,
        district: v.district,
        state: v.state,
        mobile: v.mobile,
        blood_group: v.bloodGroup,
        status,
      })
      .select("id")
      .single();

    if (error) {
      return { ok: false, error: toUserMessage(error.message) };
    }

    // Optional: upload member photo (data URL) and store public photo_url
    const photoDataUrl = String(formData.get("photoDataUrl") ?? "");
    if (photoDataUrl.startsWith("data:image/")) {
      try {
        const photoUrl = await uploadMemberPhoto({ memberId: data.id, dataUrl: photoDataUrl });
        const admin = createSupabaseAdminClient();
        if (admin) {
          await admin.from("members").update({ photo_url: photoUrl }).eq("id", data.id);
        }
      } catch {
        // Non-fatal: member is created even if photo upload fails.
      }
    }

    revalidatePath("/admin-portal/members");
    revalidatePath("/verify");

    return { ok: true, memberId: data.id, status };
  } catch {
    return { ok: false, error: "Registration failed. Please try again." };
  }
}
