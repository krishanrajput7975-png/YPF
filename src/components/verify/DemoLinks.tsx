import Link from "next/link";

import { demoUuidApproved, demoUuidPending, demoUuidRejected } from "@/components/verify/VerifyDemoUuid";

export function DemoLinks() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="text-sm font-semibold text-zinc-950">Quick Demo Links</div>
      <p className="mt-2 text-sm text-zinc-700">Click to see status variations.</p>
      <div className="mt-4 grid gap-2">
        <Link className="text-sm font-semibold text-[var(--color-green)] hover:underline" href={`/verify/${demoUuidApproved}`}>
          Approved example →
        </Link>
        <Link className="text-sm font-semibold text-[var(--color-green)] hover:underline" href={`/verify/${demoUuidPending}`}>
          Pending example →
        </Link>
        <Link className="text-sm font-semibold text-[var(--color-green)] hover:underline" href={`/verify/${demoUuidRejected}`}>
          Rejected example →
        </Link>
      </div>
    </div>
  );
}

