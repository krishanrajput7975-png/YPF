"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = { href: string; label: string };

function normalize(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function isActivePath(pathname: string, targetHref: string) {
  const p = normalize(pathname);
  const t = normalize(targetHref);

  if (t === "/" || t === "/hi" || t === "/en") return p === t;
  return p === t || p.startsWith(t + "/");
}

export function MobileMenu({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center justify-center rounded-full border border-white/25 px-4 text-xs font-semibold text-white"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Menu
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-black/10 bg-white text-zinc-950 shadow-lg"
        >
          <div className="grid p-2">
            {items.map((n) => {
              const active = isActivePath(pathname, n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={
                    active
                      ? "rounded-xl bg-[color-mix(in_oklab,var(--color-green)_10%,white)] px-3 py-2 text-sm font-semibold text-zinc-950"
                      : "rounded-xl px-3 py-2 text-sm font-semibold hover:bg-[color-mix(in_oklab,var(--color-green)_8%,white)]"
                  }
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
