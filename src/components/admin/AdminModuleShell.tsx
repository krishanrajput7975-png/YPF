import Link from "next/link";
import type { ReactNode } from "react";

export function AdminModuleShell({
  title,
  description,
  bullets,
  children,
}: {
  title: string;
  description: string;
  bullets?: string[];
  children?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-zinc-950">{title}</div>
          <p className="mt-2 text-sm leading-6 text-zinc-700">{description}</p>
        </div>
        <Link
          href="/admin-portal"
          className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-xs font-semibold text-zinc-950 hover:bg-zinc-50"
        >
          Back to dashboard
        </Link>
      </div>

      {bullets?.length ? (
        <div className="mt-6 rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">
            Will be controlled from CMS
          </div>
          <ul className="mt-3 space-y-2 text-sm text-zinc-800">
            {bullets.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
