import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";

export default function NewsPage() {
  return (
    <PageShell
      title="Gallery (replacing News)"
      description="News tab ko ab Gallery se replace kiya gaya hai. Foundation activities ki photos CMS se manage hongi."
    >
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="text-sm font-semibold text-zinc-950">Gallery is coming here</div>
        <p className="mt-2 text-sm text-zinc-700">
          Phase B me admin CMS se images upload honge aur yahan gallery auto-update hogi.
        </p>
        <div className="mt-5">
          <Link
            href="/gallery"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white"
          >
            Open Gallery
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
