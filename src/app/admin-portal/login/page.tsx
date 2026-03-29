import Link from "next/link";

import { Container } from "@/components/site/Container";
import { AdminSecretLoginForm } from "@/components/admin/AdminSecretLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex-1 bg-[color-mix(in_oklab,var(--color-green)_6%,white)]">
      <Container className="py-10 md:py-14">
        <div className="mx-auto grid max-w-2xl gap-6">
          <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
            <div className="text-sm font-semibold text-zinc-950">Admin Portal</div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950">Enter secret code</h1>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              This portal is restricted. Enter the secret code provided to the foundation admin.
            </p>

            <div className="mt-6">
              <AdminSecretLoginForm />
            </div>

            <p className="mt-6 text-xs text-zinc-600">
              Go back to the public website: <Link className="font-semibold text-[var(--color-green)] hover:underline" href="/">Home</Link>
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}

