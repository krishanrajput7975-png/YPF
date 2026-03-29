import Link from "next/link";
import { withLocale } from "@/lib/locale-path";

export function InvalidIdCard({ id, locale = "hi" }: { id: string; locale?: "en" | "hi" }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
      <div className="text-sm font-semibold text-red-700">
        {locale === "en" ? "Invalid Search" : "अमान्य खोज"}
      </div>
      <p className="mt-2 text-sm text-red-700">
        <span className="font-mono">{id}</span>{" "}
        {locale === "en" ? "is not a valid Member ID (UUID) or 10-digit mobile number." : "कोई वैध सदस्य आईडी (UUID) या 10-अंकों का मोबाइल नंबर नहीं है।"}
      </p>
      <div className="mt-5">
        <Link
          href={withLocale(locale, "/verify")}
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white"
        >
          {locale === "en" ? "Go back" : "वापस जाएँ"}
        </Link>
      </div>
    </div>
  );
}
