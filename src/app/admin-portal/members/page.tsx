import { AdminBackToDashboard } from "@/components/admin/AdminBackToDashboard";
import { AdminGate } from "@/components/admin/AdminGate";
import { AdminMembersTable } from "@/components/admin/AdminMembersTable";
import { getAllMembers } from "@/lib/cms-members";
import { getMemberSettings } from "@/lib/cms-member-settings";
import { AdminMemberApprovalSetting } from "@/components/admin/AdminMemberApprovalSetting";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminMembersPage() {
  const members = await getAllMembers().catch(() => []);
  const settings = await getMemberSettings().catch(() => ({ requireAdminApproval: true }));

  return (
    <AdminGate>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-zinc-950">Member Records</div>
          <AdminBackToDashboard label="Dashboard" />
        </div>

        <AdminMemberApprovalSetting requireAdminApproval={settings.requireAdminApproval} />

        <AdminMembersTable members={members} />
      </div>
    </AdminGate>
  );
}
