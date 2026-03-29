import Image from "next/image";

import { PageShell } from "@/components/site/PageShell";
import { getGalleryItems } from "@/lib/cms-gallery";

export default async function GalleryPage() {
  const items = await getGalleryItems().catch(() => []);

  return (
    <PageShell title="Gallery" description="Photos and highlights from our foundation’s activities.">
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="text-sm font-semibold text-zinc-950">Activity Gallery</div>

        {items.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <div
                key={it.id}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)]"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={it.imageUrl}
                    alt={it.title ?? "Gallery image"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {it.title ? (
                  <div className="p-4">
                    <div className="line-clamp-2 text-sm font-semibold text-zinc-950" title={it.title}>
                      {it.title}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-black/15 bg-[color-mix(in_oklab,var(--color-green)_4%,white)] p-10 text-sm text-zinc-700">
            No photos yet.
          </div>
        )}
      </div>
    </PageShell>
  );
}
