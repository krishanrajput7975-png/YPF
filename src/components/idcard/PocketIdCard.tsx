import Image from "next/image";

import type { MemberIdCardData } from "@/components/idcard/MemberIdCard";

/**
 * Pocket ID card (CR80 aspect) template.
 *
 * Visual goal: physical/print-like ID card, suitable for download.
 * Uses fixed pixel dimensions close to CR80 ratio (856x540 @ 10px/mm approx).
 */
export function PocketIdCard({
  data,
}: {
  data: MemberIdCardData;
}) {
  const status = data.status ?? "pending";

  return (
    <div
      className="relative overflow-hidden rounded-[28px] border border-black/10 shadow-xl"
      style={{
        width: 856,
        height: 540,
        fontFamily: "var(--font-display, var(--font-body))",
      }}
    >
      {/* Background gradient: saffron -> white -> navy */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-saffron)_0%,#ffffff_40%,#0B2A55_100%)]" />

      {/* Header white strip */}
      <div className="absolute left-0 top-0 h-[118px] w-full bg-white">
        <div className="flex h-full items-center gap-4 px-6">
          {/* Left logo */}
          <div className="relative h-[86px] w-[86px] overflow-hidden rounded-2xl border border-black/10 bg-white">
            {data.logoUrl ? (
              <Image src={data.logoUrl} alt={data.logoAlt ?? "Logo"} fill className="object-contain p-2" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xl font-black text-zinc-900">
                YP
              </div>
            )}
          </div>

          {/* Registration numbers (top-left details) */}
          <div className="shrink-0 text-left">
            <div className="text-[11px] font-black text-zinc-900">RJ/2023/0360253</div>
            <div className="text-[10px] font-bold text-zinc-700">RJ2023NPL086798</div>
          </div>

          {/* Center title */}
          <div className="min-w-0 flex-1 text-center">
            <div className="text-[30px] font-black leading-tight text-zinc-900">
              युवा परिवार वेलफेयर फाउंडेशन
            </div>
            <div className="mt-1 text-[16px] font-black text-zinc-800">(शहीद भगत सिंह फोर्स)</div>
          </div>

          {/* Right tricolor */}
          <div className="h-[86px] w-[86px] overflow-hidden rounded-2xl border border-black/10">
            <div className="h-full w-full bg-[linear-gradient(180deg,#FF9933_0%,#ffffff_50%,#138808_100%)]" />
          </div>
        </div>
      </div>

      {/* Photo box */}
      <div className="absolute right-6 top-[145px] h-[170px] w-[150px] overflow-hidden rounded-2xl border-2 border-white bg-white shadow">
        {data.photoDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.photoDataUrl}
            alt="Member photo"
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
        ) : (
          <Image src="/demo/avatar.svg" alt="Member" fill className="object-cover" />
        )}
      </div>

      {/* Status seal (blue circular stamp) */}
      <div className="absolute right-6 top-[320px] z-50 flex w-[150px] justify-center">
        <div className="pointer-events-none select-none mix-blend-multiply opacity-85">
          <svg
            viewBox="0 0 200 200"
            className="h-[94px] w-[94px] text-[#0047AB]"
            style={{ transform: "rotate(-15deg)" }}
          >
            <defs>
              {/* Rough ink texture mask (internal, no external URLs) */}
              <mask id="stampMask">
                <rect width="200" height="200" fill="white" />
                {/* Dots / holes to simulate broken ink */}
                <g fill="black" opacity="0.22">
                  <circle cx="38" cy="54" r="4" />
                  <circle cx="62" cy="34" r="3" />
                  <circle cx="154" cy="58" r="4" />
                  <circle cx="168" cy="92" r="3" />
                  <circle cx="44" cy="140" r="4" />
                  <circle cx="70" cy="164" r="3" />
                  <circle cx="150" cy="150" r="4" />
                  <circle cx="126" cy="172" r="3" />
                </g>
                {/* Edge wear (soft) */}
                <circle cx="100" cy="100" r="92" fill="black" opacity="0.08" />
              </mask>

              {/* Outer circular path for text */}
              <path
                id="circlePath"
                d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                fill="none"
              />
            </defs>

            <g mask="url(#stampMask)" fill="none" stroke="currentColor">
              {/* Outer ring */}
              <circle cx="100" cy="100" r="86" strokeWidth="6" />
              <circle cx="100" cy="100" r="70" strokeWidth="3" opacity="0.85" />

              {/* Top arc text */}
              <text
                fill="currentColor"
                className="font-black"
                fontSize="12"
                letterSpacing="3"
              >
                <textPath href="#circlePath" startOffset="25%" textAnchor="middle">
                  YUVVA PARIWAR FOUNDATION
                </textPath>
              </text>

              {/* Bottom arc text */}
              <text
                fill="currentColor"
                className="font-black"
                fontSize="11"
                letterSpacing="2"
              >
                <textPath href="#circlePath" startOffset="75%" textAnchor="middle">
                  HANUMANGARH J.N.
                </textPath>
              </text>

              {/* Center band */}
              <rect x="28" y="86" width="144" height="34" rx="3" strokeWidth="5" />
              <text
                x="100"
                y="110"
                textAnchor="middle"
                fill="currentColor"
                className="font-black"
                fontSize="22"
                letterSpacing="4"
              >
                {status === "active" || status === "approved" ? "VERIFIED" : "UNVERIFIED"}
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Data section */}
      <div className="absolute left-6 top-[145px] right-[200px]">
        {/* Contrast panel to avoid text merging with background */}
        <div className="absolute inset-0 rounded-2xl bg-[#0B2A55]/55 backdrop-blur-[2px]" />
        <div className="relative grid gap-[10px] p-4 text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.55)]">
          <Row label="NAME" value={data.fullName} />
          <Row label="F. NAME" value={data.fatherName} />
          <Row label="D.O.B." value={data.dob} />
          <Row label="DESIG." value={data.designation} />
          <Row label="AREA" value={data.area} />
          <Row label="MOB." value={data.mobile} />
          <Row label="B. GROUP" value={data.bloodGroup} />
          <Row label="ID" value={data.memberId} mono />
        </div>
      </div>

      {/* Footer navy strip */}
      <div className="absolute bottom-0 left-0 h-[72px] w-full bg-[#0B2A55]">
        <div className="flex h-full items-center justify-between px-6 text-white">
          <div className="text-[16px] font-bold">
            Add.: Sagriya Road, Near Karni Petrol Pump, Hanumangarh, Rajasthan - 335513
          </div>
          <div className="text-[13px] font-bold opacity-95">
            भारत सरकार एवं राज्य सरकार का सहयोगी संगठन
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="grid grid-cols-[130px_14px_1fr] items-baseline gap-2">
      <div className="text-[16px] font-black tracking-wide">{label}</div>
      <div className="text-[16px] font-black">:</div>
      <div className={(mono ? "font-mono " : "") + "text-[18px] font-black leading-tight"}>
        {value}
      </div>
    </div>
  );
}
