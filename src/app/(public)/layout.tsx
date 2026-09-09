import { SiteHeader } from "@/components/sitio/SiteHeader";
import { SiteFooter } from "@/components/sitio/SiteFooter";
import { CookieBanner } from "@/components/sitio/CookieBanner";
import { BandaPrototipo } from "@/components/sitio/BandaPrototipo";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#contenido" className="enlace-salto">
        Saltar al contenido principal
      </a>
      <BandaPrototipo />
      <SiteHeader />
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <CookieBanner />
    </>
  );
}
