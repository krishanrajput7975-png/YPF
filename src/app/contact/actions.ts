"use server";

import { revalidatePath } from "next/cache";

import { addContactMessage } from "@/lib/cms-contact-messages";
import { contactSchema } from "@/lib/validation/contact";

export async function submitContactMessageAction(formData: FormData) {
  const values = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const first = parsed.error.issues?.[0]?.message;
    throw new Error(first ?? "Invalid form data.");
  }

  await addContactMessage(parsed.data);

  revalidatePath("/admin-portal/inbox");
}
