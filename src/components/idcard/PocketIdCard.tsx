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
      className="relative overflow-hidden rounded-[1px] border border-black/10 shadow-xl"
      style={{
        width: 856,
        height: 540,
        fontFamily: "var(--font-display, var(--font-body))",
      }}
    >
      {/* Background gradient: saffron (top-left) -> green (bottom-right) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,var(--color-saffron)_15%,white_50%,var(--color-green)_85%)]" />

      {/* Header strip */}
      <div className="absolute left-0 top-0 h-[118px] w-full bg-transparent border-b border-black/10">
        <div className="flex h-full items-center gap-4 px-6">
          {/* Left logo */}
          <div className="relative h-[86px] w-[86px] overflow-hidden rounded-2xl border border-black/10 bg-white">
            {data.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoUrl} alt={data.logoAlt ?? "Logo"} className="h-full w-full object-cover" crossOrigin="anonymous" />
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

          {/* Right tricolor (Indian Flag) */}
          <div className="relative h-[86px] w-[86px] overflow-hidden rounded-2xl border border-black/10 bg-white">
            <div className="absolute top-0 h-[33.33%] w-full bg-[#FF9933]" />
            <div className="absolute top-[33.33%] flex h-[33.34%] w-full items-center justify-center bg-white">
              {/* Ashoka Chakra */}
              <svg viewBox="0 0 100 100" className="h-[80%] text-[#000080]">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
                <circle cx="50" cy="50" r="8" fill="currentColor" />
                {Array.from({ length: 24 }).map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="5"
                    stroke="currentColor"
                    strokeWidth="2"
                    transform={`rotate(${i * 15} 50 50)`}
                  />
                ))}
              </svg>
            </div>
            <div className="absolute bottom-0 h-[33.33%] w-full bg-[#138808]" />
          </div>
        </div>
      </div>

      {/* Photo and Stamp Container Card */}
      <div className="absolute right-6 top-[145px] z-40 flex w-[160px] flex-col items-center rounded-[2px] bg-white p-2 pb-2 shadow-xl">
        {/* Photo */}
        <div className="relative h-[170px] w-full overflow-hidden rounded-[2px] border border-black/10 bg-zinc-100">
          {data.photoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.photoDataUrl}
              alt="Member photo"
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/demo/avatar.svg" alt="Member" className="h-full w-full object-cover" crossOrigin="anonymous" />
          )}
        </div>

        {/* Real stamp image */}
        <div className="pointer-events-none relative h-[94px] w-[94px] select-none opacity-95 -mt-6" style={{ transform: "rotate(-5deg)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/stamp.png" alt="Stamp" className="h-full w-full object-contain" crossOrigin="anonymous" />
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

      {/* Footer strip */}
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
