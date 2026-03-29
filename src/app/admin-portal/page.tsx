import { AdminGate } from "@/components/admin/AdminGate";
import { AdminDashboardShell } from "@/components/admin/AdminDashboardShell";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminPortalPage() {
  return (
    <AdminGate>
      <AdminDashboardShell />
    </AdminGate>
  );
}
