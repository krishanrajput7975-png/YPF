import Image from "next/image";
import { getLeadershipMembers } from "@/lib/cms-leadership";

export async function LeadershipSection({ title = "Leadership Team", subtitle }: { title?: string; subtitle?: string }) {
  const members = await getLeadershipMembers().catch(() => [
    { id: "president", name: "Vekram singh Ramgarhia", role: "Founder and president", imageUrl: "" },
    { id: "secretary", name: "Surender sufi", role: "Secretary", imageUrl: "" },
    { id: "coordinator", name: "Dr. Bharat Chawla", role: "Medical coordinator", imageUrl: "" }
  ]);

  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold text-zinc-950 md:text-4xl">{title}</h2>
          {subtitle && <p className="mt-3 text-lg text-zinc-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {members.map((m) => (
            <div key={m.id} className="group relative flex flex-col items-center">
              <div className="relative mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-white bg-zinc-100 shadow-xl transition-transform duration-500 group-hover:scale-105 md:h-56 md:w-56">
                {m.imageUrl ? (
                  <Image src={m.imageUrl} alt={m.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[color-mix(in_oklab,var(--color-green)_5%,white)] text-zinc-400">
                    <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-zinc-950">{m.name}</h3>
              <p className="mt-2 rounded-full bg-[color-mix(in_oklab,var(--color-saffron)_15%,white)] px-4 py-1 text-sm font-semibold text-[#B75C00]">
                {m.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
