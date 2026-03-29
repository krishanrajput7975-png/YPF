export function MemberStatusBadge({ status, locale = "hi" }: { status: "approved" | "pending" | "rejected"; locale?: "en" | "hi" }) {
  const cfg =
    status === "approved"
      ? { label: locale === "en" ? "Approved" : "स्वीकृत", cls: "bg-[color-mix(in_oklab,var(--color-green)_16%,white)] text-[var(--color-green)] border-[color-mix(in_oklab,var(--color-green)_35%,white)]" }
      : status === "pending"
        ? { label: locale === "en" ? "Pending" : "लंबित", cls: "bg-[color-mix(in_oklab,var(--color-saffron)_18%,white)] text-zinc-900 border-[color-mix(in_oklab,var(--color-saffron)_38%,white)]" }
        : { label: locale === "en" ? "Rejected" : "अस्वीकृत", cls: "bg-red-50 text-red-700 border-red-200" };

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}
