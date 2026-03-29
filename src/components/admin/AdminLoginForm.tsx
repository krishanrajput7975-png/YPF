"use client";

import Link from "next/link";

export function AdminLoginForm() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-700">
        Admin access now uses a secret code (no email/password).
      </p>
      <Link
        href="/admin-portal/login"
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white"
      >
        Go to secret-code login
      </Link>
    </div>
  );
}
