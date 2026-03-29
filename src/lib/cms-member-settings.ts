import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

export type MemberSettings = {
  requireAdminApproval: boolean;
};

const CONTENT_KEY = "site:member_settings";

export async function getMemberSettings(): Promise<MemberSettings> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return { requireAdminApproval: true };

  const { data, error } = await supabase
    .from("content")
    .select("value")
    .eq("key", CONTENT_KEY)
    .maybeSingle();

  if (error) throw new Error(error.message);

  const v = data?.value as unknown;
  if (!v || typeof v !== "object") return { requireAdminApproval: true };

  const obj = v as Partial<MemberSettings>;
  return {
    requireAdminApproval:
      typeof obj.requireAdminApproval === "boolean" ? obj.requireAdminApproval : true,
  };
}

export async function setMemberSettings(input: MemberSettings): Promise<void> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase env is missing.");

  const value: MemberSettings = {
    requireAdminApproval: Boolean(input.requireAdminApproval),
  };

  const { error } = await supabase.from("content").upsert({
    key: CONTENT_KEY,
    value,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
}

