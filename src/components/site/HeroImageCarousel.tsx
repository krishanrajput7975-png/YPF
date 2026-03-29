"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type HeroImage = {
  src: string;
  alt: string;
  // keep optional fields for backward compatibility, but we will render only headline
  eyebrow?: string;
  headline?: string;
  subline?: string;
};

export function HeroImageCarousel({
  images,
  intervalMs = 5000,
}: {
  images: HeroImage[];
  intervalMs?: number;
}) {
  const list = useMemo(() => images.filter(Boolean), [images]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (list.length <= 1) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % list.length), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, list.length]);

  const current = list[active] ?? list[0];
  if (!current) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] md:aspect-[16/9]">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          className="object-cover object-center sm:object-[center_top]"
          sizes="(max-width: 768px) 100vw, 520px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 [padding-bottom:calc(env(safe-area-inset-bottom)+1rem)]">
        {current.headline ? (
          <div className="line-clamp-2 text-base font-bold leading-snug text-white sm:text-lg md:text-xl">
            {current.headline}
          </div>
        ) : null}

        <div className="mt-3 flex items-center gap-2">
          {list.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setActive(idx)}
              className={`h-2 w-2 rounded-full transition-colors ${
                idx === active ? "bg-[var(--color-saffron)]" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
