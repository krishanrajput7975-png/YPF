import { InvalidIdCard } from "@/components/verify/InvalidIdCard";
import { MemberNotFound } from "@/components/verify/MemberNotFound";
import { MemberVerificationCard } from "@/components/verify/MemberVerificationCard";
import { PageShell } from "@/components/site/PageShell";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getIdCardBranding } from "@/lib/cms-idcard";
import { isUuid } from "@/lib/utils/uuid";
import type { Locale } from "@/lib/i18n";

export default async function VerifyByIdPage({
  params,
}: {
  params: Promise<{ id: string; locale?: Locale }>;
}) {
  const { id, locale: maybeLocale } = await params;
  const locale: Locale = maybeLocale === "en" ? "en" : "hi";

  const pageTitle = locale === "en" ? "Member Verification" : "सदस्य सत्यापन";
  const pageDesc = locale === "en" ? "Verification details" : "सत्यापन विवरण";

  const isMobileNumber = /^\d{10}$/.test(id);

  if (!isUuid(id) && !isMobileNumber) {
    return (
      <PageShell title={pageTitle} description={pageDesc}>
        <InvalidIdCard id={id} locale={locale} />
      </PageShell>
    );
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return (
      <PageShell title={pageTitle} description={pageDesc}>
        <MemberNotFound id={id} locale={locale} />
      </PageShell>
    );
  }

  // IMPORTANT: We allow lookup by ID for both pending and approved.
  // Public listing endpoints should stay approved-only.
  let query = supabase
    .from("members")
    .select(
      "id, full_name, father_name, dob, mobile, designation, area, district, state, blood_group, photo_url, status, created_at"
    );

  if (isMobileNumber) {
    query = query.eq("mobile", id);
  } else {
    query = query.eq("id", id);
  }

  const { data, error } = await query.maybeSingle();

  if (error || !data) {
    return (
      <PageShell title={pageTitle} description={pageDesc}>
        <MemberNotFound id={id} locale={locale} />
      </PageShell>
    );
  }

  const member = {
    id: data.id,
    name: data.full_name,
    fatherName: data.father_name ?? "—",
    dob: data.dob ?? "—",
    mobile: data.mobile,
    designation: data.designation ?? "Member",
    area: data.area ?? "—",
    status: data.status === "approved" ? "approved" : "pending",
    bloodGroup: data.blood_group ?? "—",
    photoUrl: data.photo_url ?? null,
  } as const;

  const branding = await getIdCardBranding().catch(() => ({}));

  return (
    <PageShell title={pageTitle} description={pageDesc}>
      <MemberVerificationCard member={member} branding={branding} locale={locale} />
    </PageShell>
  );
}
