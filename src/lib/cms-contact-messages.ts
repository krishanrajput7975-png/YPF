import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export type ContactMessage = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string;
  createdAt: string;
};

export async function addContactMessage(input: {
  name: string;
  phone?: string;
  email?: string;
  message: string;
}): Promise<void> {
  const supabase = createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase env is missing.");

  const payload = {
    name: input.name.trim(),
    phone: (input.phone ?? "").trim() || null,
    email: (input.email ?? "").trim() || null,
    message: input.message.trim(),
  };

  const { error } = await supabase.from("contact_messages").insert(payload);
  if (error) throw new Error(error.message);
}

export async function getContactMessages(limit = 200): Promise<ContactMessage[]> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .select("id,name,phone,email,message,created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return (data ?? []).map((r: any) => ({
    id: String(r.id),
    name: String(r.name),
    phone: r.phone ?? null,
    email: r.email ?? null,
    message: String(r.message),
    createdAt: String(r.created_at),
  }));
}
