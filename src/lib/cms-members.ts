import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export type MemberRow = {
  id: string;
  full_name: string;
  father_name: string | null;
  dob: string | null;
  designation: string | null;
  area: string | null;
  district: string | null;
  state: string | null;
  mobile: string;
  blood_group: string | null;
  photo_url: string | null;
  status: "pending" | "approved";
  created_at: string;
};

export async function getAllMembers(): Promise<MemberRow[]> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("members")
    .select(
      "id, full_name, father_name, dob, designation, area, district, state, mobile, blood_group, photo_url, status, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as MemberRow[];
}
