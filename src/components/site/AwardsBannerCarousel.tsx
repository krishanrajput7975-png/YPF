"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type AwardBanner = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
};

export function AwardsBannerCarousel({
  banners,
  intervalMs = 5000,
  showOverlayText = false,
}: {
  banners: AwardBanner[];
  intervalMs?: number;
  showOverlayText?: boolean;
}) {
  const list = useMemo(() => banners.filter(Boolean), [banners]);
  const [active, setActive] = useState(0);

  // Clamp active index without setState-in-effect.
  const safeActive = list.length ? Math.min(active, list.length - 1) : 0;

  useEffect(() => {
    if (list.length <= 1) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % list.length), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, list.length]);

  const current = list[safeActive] ?? list[0];
  if (!current) return null;

  const canNav = list.length > 1;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[var(--color-green-deep)]">
      <div className="relative aspect-[4/3] w-full md:aspect-[4/3]">
        {/*
          Professional "always fit" behavior:
          - object-contain ensures the whole image is visible
          - background avoids ugly empty space
        */}
        <Image
          src={current.src}
          alt={current.alt}
          fill
          className="object-cover object-center"
          priority
        />

        {/* Optional readability overlay when text is enabled */}
        {showOverlayText && (current.title || current.subtitle) ? (
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
        ) : null}

        {/* Overlay text (CMS-driven). Kept optional because demo SVGs often include baked-in text. */}
        {showOverlayText && (current.title || current.subtitle) ? (
          <div className="pointer-events-none absolute inset-0 flex items-end md:items-start">
            <div className="w-full max-w-xl p-4 sm:p-5 md:p-8 [padding-bottom:calc(env(safe-area-inset-bottom)+1rem)]">
              {current.title ? (
                <div className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-white sm:text-xl md:text-3xl">
                  {current.title}
                </div>
              ) : null}
              {current.subtitle ? (
                <div className="mt-2 line-clamp-2 text-xs leading-5 text-white/90 sm:text-sm sm:leading-6 md:text-base">
                  {current.subtitle}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Desktop nav buttons */}
        {canNav ? (
          <div className="absolute inset-y-0 left-0 hidden items-center pl-3 md:flex">
            <button
              type="button"
              aria-label="Previous banner"
              onClick={() => setActive((v) => (v - 1 + list.length) % list.length)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white ring-1 ring-white/20 backdrop-blur hover:bg-black/40"
            >
              ‹
            </button>
          </div>
        ) : null}
        {canNav ? (
          <div className="absolute inset-y-0 right-0 hidden items-center pr-3 md:flex">
            <button
              type="button"
              aria-label="Next banner"
              onClick={() => setActive((v) => (v + 1) % list.length)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white ring-1 ring-white/20 backdrop-blur hover:bg-black/40"
            >
              ›
            </button>
          </div>
        ) : null}

        {/* Dots */}
        {canNav ? (
          <div className="absolute bottom-3 right-4 flex items-center gap-2">
            {list.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to banner ${idx + 1}`}
                onClick={() => setActive(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  idx === active ? "bg-[var(--color-saffron)]" : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
