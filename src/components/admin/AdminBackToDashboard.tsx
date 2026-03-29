import Link from "next/link";

export function AdminBackToDashboard({ label = "Back" }: { label?: string }) {
  return (
    <Link
      href="/admin-portal"
      className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 text-xs font-semibold text-zinc-950 hover:bg-zinc-50"
      aria-label="Back to dashboard"
      title="Back to dashboard"
    >
      <span aria-hidden>←</span>
      {label}
    </Link>
  );
}

