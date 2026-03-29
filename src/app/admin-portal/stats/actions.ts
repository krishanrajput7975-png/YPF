"use server";

import { revalidatePath } from "next/cache";

import { setHomepageStats } from "@/lib/cms-stats";

export async function updateHomepageStatsAction(formData: FormData) {
  const areasCount = Number(formData.get("areasCount") ?? 0);
  const programsCount = Number(formData.get("programsCount") ?? 0);

  await setHomepageStats({ areasCount, programsCount });

  revalidatePath("/");
  revalidatePath("/admin-portal");
}

