import type { Metadata } from "next";
import { RolProvider } from "@/lib/roles/contexto";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Gestor de contenidos",
  description: "Herramienta de trabajo del personal municipal. Entorno de demostración.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RolProvider>
      <AdminShell>{children}</AdminShell>
    </RolProvider>
  );
}
