"use client";

import { useEffect, useMemo, useState } from "react";

type Slide = {
  title: string;
  subtitle?: string;
};

export function HeroSlider({
  slides,
  intervalMs = 4500,
}: {
  slides: Slide[];
  intervalMs?: number;
}) {
  const safeSlides = useMemo(() => slides.filter(Boolean), [slides]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) return;

    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % safeSlides.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, safeSlides.length]);

  const slide = safeSlides[active] ?? safeSlides[0];

  if (!slide) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="text-[11px] tracking-wide text-white/75">Latest</div>
      <div className="mt-2 text-lg font-bold leading-snug sm:text-xl">
        {slide.title}
      </div>
      {slide.subtitle ? (
        <div className="mt-2 text-xs text-white/80 sm:text-sm">
          {slide.subtitle}
        </div>
      ) : null}
      <div className="mt-5 flex items-center gap-2">
        {safeSlides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setActive(idx)}
            className={`h-2 w-2 rounded-full transition-colors ${
              idx === active
                ? "bg-[var(--color-saffron)]"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
