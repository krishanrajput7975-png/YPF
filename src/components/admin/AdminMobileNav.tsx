"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { adminLogoutAction } from "@/app/admin-portal/login/actions";

const nav = [
  { href: "/admin-portal", label: "Dashboard" },
  { href: "/admin-portal/carousel-content", label: "Carousel Content" },
  { href: "/admin-portal/gallery", label: "Gallery" },
  { href: "/admin-portal/members", label: "Members" },
  { href: "/admin-portal/inbox", label: "Inbox" },
] as const;

export function AdminMobileNav() {
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
    <div ref={rootRef} className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-xs font-semibold text-zinc-950 hover:bg-zinc-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Admin Menu
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg sm:left-auto sm:right-0">
          <div className="grid gap-1 p-2">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-[color-mix(in_oklab,var(--color-green)_8%,white)]"
              >
                {n.label}
              </Link>
            ))}

            <form action={adminLogoutAction} className="pt-1">
              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[var(--color-green)] px-4 text-sm font-semibold text-white"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
