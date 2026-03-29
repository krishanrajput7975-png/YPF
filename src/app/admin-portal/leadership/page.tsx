import { AdminGate } from "@/components/admin/AdminGate";
import { AdminSidebarNav } from "@/components/admin/AdminSidebarNav";
import { getLeadershipMembers } from "@/lib/cms-leadership";
import { AdminLeadershipForm } from "@/components/admin/AdminLeadershipForm";
import { updateLeadershipImageAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminLeadershipPage() {
  const members = await getLeadershipMembers();

  return (
    <AdminGate>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="hidden lg:block">
          <AdminSidebarNav />
        </div>

        <section className="grid gap-6">
          <header className="rounded-2xl border border-black/10 bg-white p-6">
            <h1 className="text-xl font-bold text-zinc-950">Leadership</h1>
            <p className="mt-2 text-sm text-zinc-600">
              Manage the 3 leadership profile images that appear on the Home and About pages.
              Please upload square images or they will be cropped.
            </p>
          </header>

          <div className="grid gap-4">
            {members.map((m) => (
              <AdminLeadershipForm key={m.id} member={m} updateAction={updateLeadershipImageAction} />
            ))}
          </div>
        </section>
      </div>
    </AdminGate>
  );
}

