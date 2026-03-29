import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

export interface LeadershipMember {
  id: string; // "president", "secretary", "coordinator"
  name: string;
  role: string;
  imageUrl: string;
}

const CONTENT_KEY = "leadership_v1";

export const DEFAULT_LEADERSHIP: LeadershipMember[] = [
  { id: "president", name: "Vekram singh Ramgarhia", role: "Founder and president", imageUrl: "" },
  { id: "secretary", name: "Surender sufi", role: "Secretary", imageUrl: "" },
  { id: "coordinator", name: "Dr. Bharat Chawla", role: "Medical coordinator", imageUrl: "" }
];

export async function getLeadershipMembers(): Promise<LeadershipMember[]> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return DEFAULT_LEADERSHIP;

  const { data, error } = await supabase
    .from("content")
    .select("value")
    .eq("key", CONTENT_KEY)
    .single();

  if (error || !data?.value) return DEFAULT_LEADERSHIP;

  const saved = data.value as LeadershipMember[];

  // Merge with defaults to ensure all 3 exist
  return DEFAULT_LEADERSHIP.map(dm => {
    const s = saved.find(m => m.id === dm.id);
    return s ? { ...dm, imageUrl: s.imageUrl } : dm;
  });
}

export async function updateLeadershipImage(id: string, imageUrl: string): Promise<void> {
  const current = await getLeadershipMembers();
  const updated = current.map(m => m.id === id ? { ...m, imageUrl } : m);

  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase is missing");

  const { error } = await supabase.from("content").upsert({
    key: CONTENT_KEY,
    value: updated,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}
