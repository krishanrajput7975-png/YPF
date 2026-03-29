import { Container } from "@/components/site/Container";

export function PageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 bg-[color-mix(in_oklab,var(--color-green)_6%,white)]">
      <Container className="py-10">
        <header className="rounded-2xl border border-black/10 bg-white p-6">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">{title}</h1>
          {description ? (
            <p className="mt-2 max-w-prose text-sm leading-6 text-zinc-700">{description}</p>
          ) : null}
        </header>

        <div className="mt-6">{children}</div>
      </Container>
    </main>
  );
}
