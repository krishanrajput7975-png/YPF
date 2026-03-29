"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type InitiativeSlide = {
  key: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  bullets?: string[];
};

function splitLines(text: string | undefined) {
  const s = String(text ?? "");
  return s
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function stripBulletPrefix(line: string) {
  return line.replace(/^[-•*\u2022]\s*/, "").trim();
}

export function InitiativesCarousel({
  slides,
  intervalMs = 5500,
}: {
  slides: InitiativeSlide[];
  intervalMs?: number;
}) {
  const list = useMemo(() => slides.filter(Boolean), [slides]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (list.length <= 1) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % list.length), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, list.length]);

  const current = list[active] ?? list[0];
  if (!current) return null;

  const descriptionLines = splitLines(current.description);
  const bulletLines = descriptionLines.filter((l) => /^[-•*\u2022]\s*/.test(l));
  const paragraphLines = descriptionLines.filter((l) => !/^[-•*\u2022]\s*/.test(l));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_8%,white)]">
      {/* Image area */}
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={current.imageSrc}
          alt={current.imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mt-1 line-clamp-1 text-xl font-bold text-white">{current.title}</div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex min-h-[320px] flex-col p-6">
        <div>
          <div className="text-sm font-semibold text-zinc-950">{current.title}</div>

          {paragraphLines.length ? (
            <div className="mt-2 space-y-2 text-sm leading-6 text-zinc-700">
              {paragraphLines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          ) : null}

          {bulletLines.length ? (
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {bulletLines.map((b) => (
                <li key={b}>• {stripBulletPrefix(b)}</li>
              ))}
            </ul>
          ) : null}

          {/* Back-compat: slides passed directly with bullets array */}
          {current.bullets?.length ? (
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {current.bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-center gap-2">
            {list.map((s, idx) => (
              <button
                key={s.key}
                type="button"
                aria-label={`Go to ${s.title}`}
                onClick={() => setActive(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  idx === active
                    ? "bg-[var(--color-saffron)]"
                    : "bg-black/20 hover:bg-black/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
