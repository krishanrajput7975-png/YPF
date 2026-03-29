"use server";

import { redirect } from "next/navigation";

import {
  createAdminCookieValue,
  setAdminSessionCookie,
  verifyAdminSecretCode,
} from "@/lib/admin-auth";

export async function adminLoginAction(_prevState: { error?: string } | null, formData: FormData) {
  const code = String(formData.get("code") ?? "").trim();

  if (!process.env.ADMIN_PORTAL_SECRET) {
    return {
      error: "Admin secret is not configured. Set ADMIN_PORTAL_SECRET in .env.local.",
    };
  }

  if (!verifyAdminSecretCode(code)) {
    return { error: "Invalid secret code." };
  }

  const value = createAdminCookieValue();
  await setAdminSessionCookie(value);

  redirect("/admin-portal");
}

export async function adminLogoutAction() {
  // Clear cookie and send back to login.
  const { clearAdminSessionCookie } = await import("@/lib/admin-auth");
  await clearAdminSessionCookie();
  redirect("/admin-portal/login");
}
