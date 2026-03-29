"use client";

import { toPng } from "html-to-image";
import { useMemo, useRef, useState } from "react";

import { PocketIdCard } from "@/components/idcard/PocketIdCard";
import type { MemberIdCardData } from "@/components/idcard/MemberIdCard";

export function PocketIdCardPreviewAndDownload({
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
        pixelRatio: 4,
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
    <div className="grid gap-4">
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-zinc-950">
              {locale === "en" ? "ID Card" : "आईडी कार्ड"}
            </div>
            <p className="mt-1 text-sm text-zinc-700">
              {locale === "en"
                ? "Download your pocket-size card as an image."
                : "अपने पॉकेट-साइज़ कार्ड को एक छवि के रूप में डाउनलोड करें।"}
            </p>
            <p className="mt-1 text-xs text-zinc-600">
              {locale === "en"
                ? "Tip: Print on PVC/photo paper and cut to card size."
                : "सुझाव: PVC/फ़ोटो पेपर पर प्रिंट करें और कार्ड के आकार में काटें।"}
            </p>
          </div>
          <button
            type="button"
            onClick={download}
            disabled={isDownloading}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
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

      <div className="mx-auto w-full max-w-[940px] overflow-x-auto">
        <div ref={ref} className="inline-block">
          <PocketIdCard data={data} />
        </div>
      </div>
    </div>
  );
}
