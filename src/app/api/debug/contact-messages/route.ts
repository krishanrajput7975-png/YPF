import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin-client";

export async function GET() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Missing SUPABASE_SERVICE_ROLE_KEY on server." },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .select("id,name,created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, count: data?.length ?? 0, data });
}

