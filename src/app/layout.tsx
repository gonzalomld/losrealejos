import type { Metadata } from "next";
import "./globals.css";
import { PrototypeBanner } from "@/components/sitio/PrototypeBanner";
import { SiteHeader } from "@/components/sitio/SiteHeader";
import { QuickAccessSlot } from "@/components/sitio/QuickAccessSlot";
import { SiteFooter } from "@/components/sitio/SiteFooter";
import { CookieBanner } from "@/components/sitio/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "Ayuntamiento de la Villa de Los Realejos · Trámites, servicios e información municipal",
    template: "%s · Ayuntamiento de la Villa de Los Realejos",
  },
  description:
    "Portal del Ayuntamiento de Los Realejos: trámites en lenguaje claro, servicios de tu barrio, transparencia y actualidad. Teléfono 922 34 62 34.",
};

const JSON_LD_ORGANIZACION = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  name: "Ayuntamiento de la Villa de Los Realejos",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida de Canarias, 6",
    postalCode: "38410",
    addressLocality: "Los Realejos",
    addressRegion: "Santa Cruz de Tenerife",
    addressCountry: "ES",
  },
  telephone: "+34922346234",
  url: "https://www.losrealejos.es",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ORGANIZACION) }}
        />
        <a href="#contenido" className="enlace-salto">
          Saltar al contenido principal
        </a>
        <PrototypeBanner />
        <SiteHeader />
        <QuickAccessSlot />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
