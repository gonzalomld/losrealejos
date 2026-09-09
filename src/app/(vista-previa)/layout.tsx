import Link from "next/link";
import { SiteHeader } from "@/components/sitio/SiteHeader";
import { SiteFooter } from "@/components/sitio/SiteFooter";

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#contenido" className="enlace-salto">
        Saltar al contenido previsualizado
      </a>
      <SiteHeader />
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
