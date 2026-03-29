"use server";

import { revalidatePath } from "next/cache";

import { setMemberSettings } from "@/lib/cms-member-settings";

export async function updateMemberApprovalSettingAction(formData: FormData) {
  const requireAdminApproval = String(formData.get("requireAdminApproval") ?? "off") === "on";

  await setMemberSettings({ requireAdminApproval });

  revalidatePath("/admin-portal/members");
}

