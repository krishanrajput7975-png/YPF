"use client";

import { toPng } from "html-to-image";
import { useMemo, useRef, useState } from "react";

import { PocketIdCard } from "@/components/idcard/PocketIdCard";
import type { MemberIdCardData } from "@/components/idcard/MemberIdCard";

export function IdCardPreviewAndDownload({
  data,
  locale = "hi",
}: {
  data: MemberIdCardData;
  locale?: "en" | "hi";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileBase = useMemo(
    () => data.fullName.trim().replace(/\s+/g, "-").toLowerCase() || "member",
    [data.fullName]
  );

  async function download() {
    if (!ref.current) return;
    setIsDownloading(true);
    try {
      const png = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });

      const a = document.createElement("a");
      a.href = png;
      a.download = `${fileBase}-id-card.png`;
      a.click();
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[auto_1fr] lg:items-start">
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="text-sm font-semibold text-zinc-950">
          {locale === "en" ? "ID Card" : "आईडी कार्ड"}
        </div>
        <p className="mt-2 text-sm text-zinc-700">
          {locale === "en"
            ? "Preview your card below and download it as an image."
            : "नीचे अपना कार्ड देखें और इसे एक छवि के रूप में डाउनलोड करें।"}
        </p>
        <div className="mt-5">
          <button
            type="button"
            onClick={download}
            disabled={isDownloading}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDownloading
              ? locale === "en"
                ? "Generating…"
                : "बन रहा है…"
              : locale === "en"
              ? "Download ID Card"
              : "आईडी कार्ड डाउनलोड करें"}
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[920px] overflow-x-auto">
        <div ref={ref} className="inline-block">
          <PocketIdCard data={data} />
        </div>
      </div>
    </div>
  );
}
