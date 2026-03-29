import Image from "next/image";

// Force dynamic rendering for admin CMS pages
export const dynamic = "force-dynamic";

import { AdminBackToDashboard } from "@/components/admin/AdminBackToDashboard";
import { AdminGate } from "@/components/admin/AdminGate";
import { AdminGalleryMultiUploadForm } from "@/components/admin/AdminGalleryMultiUploadForm";
import { AdminGalleryEditForm } from "@/components/admin/AdminGalleryEditForm";
import { getGalleryItems } from "@/lib/cms-gallery";
import { deleteGalleryItemAction } from "@/app/admin-portal/gallery/actions";

export default async function AdminGalleryPage() {
  const items = await getGalleryItems();

  return (
    <AdminGate>
      <div className="grid gap-6">
        <section className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-zinc-950">Gallery Manager</div>
              <p className="mt-2 text-sm text-zinc-700">
                Upload photos here. They will automatically appear on the public Gallery page.
              </p>
            </div>
            <AdminBackToDashboard label="Dashboard" />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <AdminGalleryMultiUploadForm />

            <div className="rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-5">
              <div className="text-sm font-semibold text-zinc-950">Tip</div>
              <p className="mt-2 text-sm text-zinc-700">
                First-time setup: create Supabase bucket <span className="font-mono">site-media</span> with public read.
              </p>
              <p className="mt-3 text-sm text-zinc-700">
                You can upload up to <span className="font-semibold">10</span> images at once, and set a separate title for each.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-zinc-950">Uploaded items</div>
              <p className="mt-2 text-sm text-zinc-700">Total: {items.length}</p>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-black/15 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-8 text-sm text-zinc-700">
              No gallery images yet. Upload your first photos above.
            </div>
          ) : (
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
                    />
                  </div>
                  <div className="p-4">
                    {it.title ? <div className="text-sm font-semibold text-zinc-950">{it.title}</div> : null}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <AdminGalleryEditForm item={it} />

                      <form action={deleteGalleryItemAction}>
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
          )}
        </section>
      </div>
    </AdminGate>
  );
}
