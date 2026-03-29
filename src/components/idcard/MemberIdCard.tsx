import Image from "next/image";

import { theme } from "@/lib/theme";

export type MemberIdCardData = {
  memberId: string;
  fullName: string;
  fatherName: string;
  designation: string;
  area: string;
  dob: string;
  mobile: string;
  bloodGroup: string;
  photoDataUrl?: string;
  status?: "pending" | "active" | "approved";
  logoUrl?: string;
  logoAlt?: string;
};

export function MemberIdCard({ data }: { data: MemberIdCardData }) {
  const status = data.status ?? "pending";

  return (
    <div
      className="relative w-[520px] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Top band */}
      <div className="flex items-center justify-between gap-4 bg-[var(--color-green-deep)] px-6 py-4 text-white">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/20">
            {data.logoUrl ? (
              <Image src={data.logoUrl} alt={data.logoAlt ?? "Foundation logo"} fill className="object-contain p-2" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-xs font-bold text-white/90">YP</span>
            )}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">Yuvva Pariwar Foundation</div>
            <div className="mt-0.5 truncate text-xs text-white/80">{theme.slogan}</div>
            <div className="mt-2 text-[10px] font-semibold text-white/85">
              <div>Registration Number: RJ/2023/0360253</div>
              <div>Registration (NPL): RJ2023NPL086798</div>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div
            className={`rounded-full px-3 py-1 text-[11px] font-bold ${
              status === "active" || status === "approved" ? "bg-emerald-500 text-white" : "bg-[var(--color-saffron)] text-black"
            }`}
          >
            {status === "active" || status === "approved" ? "ACTIVE" : "PENDING"}
          </div>

          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/15 bg-white/10">
            {data.photoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.photoDataUrl} alt="Member photo" className="h-full w-full object-cover" />
            ) : (
              <Image src="/demo/avatar.svg" alt="Member" fill className="object-cover" />
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid gap-4 px-6 py-5">
        <div className="grid gap-1">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-600">Member name</div>
          <div className="text-lg font-bold leading-tight text-zinc-950">{data.fullName}</div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Field label="Member ID" value={data.memberId} mono />
          <Field label="Mobile" value={data.mobile} />
          <Field label="Blood" value={data.bloodGroup} />
          <Field label="Father" value={data.fatherName} />
          <Field label="DOB" value={data.dob} />
          <Field label="Designation" value={data.designation} />
          <Field label="Area" value={data.area} className="col-span-3 sm:col-span-3" />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] px-4 py-3">
          <div className="text-xs text-zinc-700">
            Verification: <span className="font-mono font-semibold text-zinc-950">/verify/{data.memberId}</span>
          </div>
          <div className="text-xs text-zinc-700">Issued by YP Foundation</div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  className,
}: {
  label: string;
  value: string;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-black/10 bg-white p-3 ${className ?? ""}`.trim()}>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">{label}</div>
      <div className={`mt-1 truncate text-xs font-semibold text-zinc-950 ${mono ? "font-mono" : ""}`}>
        {value}
      </div>
    </div>
  );
}
