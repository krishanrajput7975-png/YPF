import Link from "next/link";
import { withLocale } from "@/lib/locale-path";

export function MemberNotFound({ id, locale = "hi" }: { id: string; locale?: "en" | "hi" }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="text-sm font-semibold text-zinc-950">
        {locale === "en" ? "Member not found" : "सदस्य नहीं मिला"}
      </div>
      <p className="mt-2 text-sm text-zinc-700">
        {locale === "en" ? "Could not find a record for Member ID or Mobile Number " : "सदस्य आईडी या मोबाइल नंबर "}
        <span className="font-mono">{id}</span>
        {locale === "en" ? ". Please check the details and try again." : " का रिकॉर्ड नहीं मिला। कृपया विवरण जांचें और पुनः प्रयास करें।"}
      </p>
      <div className="mt-5">
        <Link
          href={withLocale(locale, "/verify")}
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white"
        >
          {locale === "en" ? "Try again" : "पुनः प्रयास करें"}
        </Link>
      </div>
    </div>
  );
}
