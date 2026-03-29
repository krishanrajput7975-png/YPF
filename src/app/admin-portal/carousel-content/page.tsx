import Image from "next/image";

// Force dynamic rendering for admin CMS pages (uses cookies via Supabase server client)
export const dynamic = "force-dynamic";

import { AdminBackToDashboard } from "@/components/admin/AdminBackToDashboard";
import { AdminGate } from "@/components/admin/AdminGate";
import { EditCarouselItemForm } from "@/components/admin/EditCarouselItemForm";
import { getCarouselItems, type CarouselKey } from "@/lib/cms-carousels";
import { deleteCarouselItemAction, uploadCarouselItemAction } from "@/app/admin-portal/carousel-content/actions";

const sections: Array<{ key: CarouselKey; title: string; hint: string; ratioHint: string }> = [
  {
    key: "home_hero",
    title: "Home • Hero Images",
    hint: "Home page main banner (right-side carousel). Title/Subtitle will show on image.",
    ratioHint: "Recommended: 16:9 or 1600×900.",
  },
  {
    key: "home_awards",
    title: "Home • Awards Banners",
    hint: "Awards / certificates / recognition banner carousel.",
    ratioHint: "Recommended: wide banner ~16:5 (e.g. 1600×500).",
  },
  {
    key: "home_initiatives",
    title: "Home • Initiatives",
    hint: "Initiatives carousel (optional section).",
    ratioHint: "Recommended: 4:3 or 16:10.",
  },
];

export default async function AdminCarouselContentPage() {
  const hero = await getCarouselItems("home_hero").catch(() => []);
  const awards = await getCarouselItems("home_awards").catch(() => []);
  const initiatives = await getCarouselItems("home_initiatives").catch(() => []);

  const dataByKey: Record<CarouselKey, Awaited<ReturnType<typeof getCarouselItems>>> = {
    home_hero: hero,
    home_awards: awards,
    home_initiatives: initiatives,
  };

  return (
    <AdminGate>
      <div className="grid gap-6">
        <section className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-zinc-950">Carousel Content</div>
              <p className="mt-2 text-sm text-zinc-700">
                Home page images + short text. Upload here and it will reflect on the website.
              </p>
              <p className="mt-2 text-xs text-zinc-600">
                Setup: Supabase Storage bucket <span className="font-mono">site-media</span> must exist and be public.
              </p>
            </div>
            <AdminBackToDashboard label="Dashboard" />
          </div>
        </section>

        {sections.map((s) => {
          const items = dataByKey[s.key] ?? [];
          return (
            <section key={s.key} className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-950">{s.title}</div>
                  <p className="mt-1 text-sm text-zinc-700">{s.hint}</p>
                  <p className="mt-1 text-xs text-zinc-600">{s.ratioHint}</p>
                  <p className="mt-1 text-xs text-zinc-600">Items: {items.length}</p>
                </div>
              </div>

              <form action={uploadCarouselItemAction} className="mt-5 grid gap-4 md:grid-cols-2">
                <input type="hidden" name="carouselKey" value={s.key} />

                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-semibold text-zinc-950">Heading</label>
                    <input
                      name="title"
                      className="mt-1 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
                      placeholder="Example: Skill Training"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-zinc-950">Description</label>
                    <textarea
                      name="subtitle"
                      rows={5}
                      className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
                      placeholder="Write a short paragraph or bullet points.\nExample:\n• Vocational programs for youth\n• Nursing/paramedical support"
                    />
                    <p className="mt-1 text-xs text-zinc-600">
                      Tip: You can use multiple lines and bullet points (start a line with •).
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-zinc-950">Image</label>
                    <input
                      name="image"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      required
                      className="mt-1 block w-full text-sm text-zinc-800 file:mr-4 file:rounded-full file:border-0 file:bg-[color-mix(in_oklab,var(--color-green)_12%,white)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-950 hover:file:bg-[color-mix(in_oklab,var(--color-green)_18%,white)]"
                    />
                    <p className="mt-2 text-xs text-zinc-600">Allowed: JPG/PNG/WEBP. Max 5MB.</p>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white"
                  >
                    Add banner
                  </button>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-5">
                  <div className="text-sm font-semibold text-zinc-950">What shows on website</div>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                    <li>• Image will rotate automatically in carousel</li>
                    <li>• Heading + description will show as overlay / content</li>
                    <li>• Description supports multi-line text</li>
                  </ul>
                </div>
              </form>

              {items.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((it) => (
                    <div key={it.id} className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                      <div className="relative aspect-[16/10] w-full">
                        <Image src={it.imageUrl} alt={it.alt} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <div className="text-sm font-semibold text-zinc-950">{it.title ?? "(no title)"}</div>
                        {it.subtitle ? <div className="mt-1 text-xs text-zinc-700">{it.subtitle}</div> : null}
                        <div className="mt-2 text-xs text-zinc-600">Sort: {it.sortOrder}</div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <EditCarouselItemForm carouselKey={s.key} item={it} />

                          <form action={deleteCarouselItemAction}>
                            <input type="hidden" name="carouselKey" value={s.key} />
                            <input type="hidden" name="id" value={it.id} />
                            <button
                              type="submit"
                              className="inline-flex h-9 items-center justify-center rounded-full border border-red-200 bg-white px-4 text-xs font-semibold text-red-700 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-black/15 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-8 text-sm text-zinc-700">
                  No items yet. Upload the first image above.
                </div>
              )}
            </section>
          );
        })}
      </div>
    </AdminGate>
  );
}

