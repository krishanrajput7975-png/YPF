import { getAllMembers } from "@/lib/cms-members";
import { getLiveProgram } from "@/lib/cms-live-program";
import type { Locale } from "@/lib/i18n";

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}

export async function StatsStrip({ locale = "hi" }: { locale?: Locale }) {
  const [members, live] = await Promise.all([
    getAllMembers().catch(() => []),
    getLiveProgram().catch(() => null),
  ]);

  const activeMembers = members.filter((m) => m.status === "approved").length;
  const liveOn = Boolean(live && live.isActive);

  const t = {
    activeLabel: locale === "en" ? "Active Members" : "सक्रिय सदस्य",
    activeHint:
      locale === "en"
        ? "Based on approved member records."
        : "Approved (सत्यापित) रिकॉर्ड.",
    liveLabel: locale === "en" ? "Live Program" : "Live कार्यक्रम",
    liveOffTitle: locale === "en" ? "Not live" : "लाइव नहीं",
    liveOffHint: locale === "en" ? "Update from Admin CMS." : "CMS से अपडेट.",
  };

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6">
      <div className="grid gap-3 sm:gap-4">
        <div className="flex min-h-[132px] flex-col justify-between rounded-xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-3 sm:p-4">
          <div className="text-center">
            <div className="headline text-xl font-bold text-[var(--color-green)] sm:text-2xl">
              {formatNumber(activeMembers)}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-zinc-900 sm:text-xs">{t.activeLabel}</div>
          </div>
          <div className="mt-2 text-center text-[10px] leading-4 text-zinc-600 sm:text-[11px]">
            {t.activeHint}
          </div>
        </div>

        <div className="flex min-h-[132px] flex-col justify-between rounded-xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold text-zinc-900 sm:text-xs">{t.liveLabel}</div>
              {liveOn ? (
                <>
                  <div className="mt-2 text-[12px] font-semibold leading-snug text-zinc-950 sm:text-sm line-clamp-3">
                    {live!.title}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-zinc-700 sm:text-xs line-clamp-3">
                    {live!.location}
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-2 text-[11px] font-semibold text-zinc-700 sm:text-sm">{t.liveOffTitle}</div>
                </>
              )}
            </div>
            <div
              className={`mt-0.5 shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
                liveOn ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-700"
              }`}
            >
              {liveOn ? "LIVE" : "OFF"}
            </div>
          </div>

          {liveOn ? null : (
            <div className="mt-2 text-center text-[10px] leading-4 text-zinc-600 sm:text-[11px]">
              {t.liveOffHint}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
