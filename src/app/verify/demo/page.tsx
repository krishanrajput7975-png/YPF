import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";

export default function VerifyDemoPage() {
  return (
    <PageShell title="Demo" description="Ye page sirf route working verify karne ke liye hai.">
      <Link className="inline-flex text-sm font-semibold text-[var(--color-green)] hover:underline" href="/">
        Home
      </Link>
    </PageShell>
  );
}
