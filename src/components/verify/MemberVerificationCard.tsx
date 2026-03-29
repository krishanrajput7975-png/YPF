import Link from "next/link";

import { MemberStatusBadge } from "@/components/verify/MemberStatusBadge";
import { PocketIdCardPreviewAndDownload } from "@/components/idcard/PocketIdCardPreviewAndDownload";
import type { DemoMember } from "@/lib/demoMember";
import type { IdCardBranding } from "@/lib/cms-idcard";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/locale-path";

export function MemberVerificationCard({
  member,
  branding,
  locale = "hi",
}: {
  member: DemoMember;
  branding?: IdCardBranding;
  locale?: Locale;
}) {
  const isActive = member.status === "approved";

  const status: "active" | "pending" = isActive ? "active" : "pending";

  const cardData = {
    memberId: member.id,
    fullName: member.name,
    fatherName: member.fatherName,
    dob: member.dob,
    mobile: member.mobile,
    designation: member.designation,
    area: member.area,
    bloodGroup: ("bloodGroup" in member ? (member as Record<string, unknown>).bloodGroup : "—") as string,
    status,
    logoUrl: branding?.logoUrl,
    logoAlt: branding?.logoAlt,
    photoDataUrl: ("photoUrl" in member ? (member as Record<string, unknown>).photoUrl : undefined) as string | undefined,
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">
              {locale === "en" ? "Verification" : "सत्यापन"}
            </div>
            <div className="mt-1 text-xl font-bold tracking-tight text-zinc-950">
              {locale === "en" ? "Member Status" : "सदस्य की स्थिति"}
            </div>
            <div className="mt-1 text-sm text-zinc-700">
              {locale === "en" ? "Member ID" : "सदस्य संख्या"}:{" "}
              <span className="font-mono text-zinc-950">{member.id}</span>
            </div>
          </div>
          <MemberStatusBadge status={member.status} locale={locale} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <PocketIdCardPreviewAndDownload data={cardData} locale={locale} />

          <div className="grid gap-4">
            <Info label={locale === "en" ? "Name" : "नाम"} value={member.name} />
            <Info
              label={locale === "en" ? "Father Name" : "पिता का नाम"}
              value={member.fatherName}
            />
            <Info label={locale === "en" ? "DOB" : "जन्म-तिथि"} value={member.dob} />
            <Info label={locale === "en" ? "Mobile" : "मोबाइल"} value={member.mobile} />
            <Info
              label={locale === "en" ? "Area/Tehsil" : "क्षेत्र/तहसील"}
              value={member.area}
            />
          </div>
        </div>

        <div className="mt-8">
          <Link
            href={withLocale(locale, "/verify")}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white"
          >
            {locale === "en" ? "Verify another member" : "दूसरे सदस्य का सत्यापन करें"}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">{label}</div>
      <div className="mt-1 text-sm font-semibold text-zinc-950">{value}</div>
    </div>
  );
}
