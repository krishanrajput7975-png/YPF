import { PageShell } from "@/components/site/PageShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell title="Admin Portal" description="Secret-code protected foundation CMS (Carousel + Gallery).">
      {children}
    </PageShell>
  );
}
