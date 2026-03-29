"use client";

import { useMemo, useState } from "react";

export type Tab = {
  key: string;
  label: string;
  title: string;
  body: string;
};

function splitLines(body: string) {
  return body
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function stripBulletPrefix(line: string) {
  return line.replace(/^[-•*\u2022]\s*/, "").trim();
}

export function SectionTabs({ tabs }: { tabs: Tab[] }) {
  const safeTabs = useMemo(() => tabs.filter(Boolean), [tabs]);
  const [active, setActive] = useState(safeTabs[0]?.key ?? "");

  const current = safeTabs.find((t) => t.key === active) ?? safeTabs[0];
  if (!current) return null;

  const lines = splitLines(current.body);
  const bulletLines = lines.filter((l) => /^[-•*\u2022]\s*/.test(l));
  const paragraphLines = lines.filter((l) => !/^[-•*\u2022]\s*/.test(l));

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="grid gap-6 md:grid-cols-[240px_1fr] md:items-start">
        {/* Mobile: horizontal pills. Desktop: vertical nav */}
        <div>
          <div className="-mx-2 flex gap-2 overflow-x-auto px-2 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:block md:space-y-2 md:overflow-visible md:px-0">
            {safeTabs.map((t) => {
              const isActive = t.key === current.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-colors md:w-full md:justify-start md:text-left ${
                    isActive
                      ? "bg-[var(--color-green)] text-white"
                      : "border border-black/10 bg-white text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0">
          <div className="text-lg font-bold tracking-tight text-zinc-950">
            {current.title}
          </div>

          {paragraphLines.length ? (
            <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-700">
              {paragraphLines.map((p) => (
                <p key={p}>{p}</p>
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
        </div>
      </div>
    </div>
  );
}
