"use server";

import { revalidatePath } from "next/cache";

import { addLatestUpdate, deleteLatestUpdate } from "@/lib/cms-latest";

export async function addLatestUpdateAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim() || undefined;

  await addLatestUpdate({ title, subtitle });

  revalidatePath("/");
  revalidatePath("/admin-portal");
}

export async function deleteLatestUpdateAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  await deleteLatestUpdate(id);

  revalidatePath("/");
  revalidatePath("/admin-portal");
}

