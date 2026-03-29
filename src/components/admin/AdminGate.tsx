import { isAdminAuthenticatedFromCookies } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export async function AdminGate({ children }: { children: React.ReactNode }) {
  const isAuth = await isAdminAuthenticatedFromCookies();

  if (!isAuth) {
    redirect("/admin-portal/login");
  }

  return <>{children}</>;
}
