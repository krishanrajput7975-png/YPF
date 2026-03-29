"use server";

import { revalidatePath } from "next/cache";

import { setLiveProgram } from "@/lib/cms-live-program";

export async function updateLiveProgramAction(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const location = String(formData.get("location") ?? "");
  const isActive = formData.get("isActive") === "on";

  await setLiveProgram({ title, location, isActive });

  revalidatePath("/");
  revalidatePath("/admin-portal");
}

