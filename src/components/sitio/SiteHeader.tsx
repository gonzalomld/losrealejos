import { Phone, ExternalLink } from "lucide-react";
import { CONTACTO_OAC } from "@/data/vocabularios";
import { SearchBox } from "./SearchBox";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  return (
    <header className="bg-primary text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4">
        {/* Logotipo tipográfico sobrio. Se sustituirá por la marca oficial del Ayuntamiento cuando esté disponible. */}
        <a href="/" aria-label="Ayuntamiento de la Villa de Los Realejos, ir a la portada" className="mr-auto">
          <span className="block text-xl font-extrabold leading-tight md:text-2xl">
            Ayuntamiento de la Villa
            <span className="block">de Los Realejos</span>
          </span>
        </a>
        <a
          href={CONTACTO_OAC.telefonoHref}
          className="flex items-center gap-2 rounded border-2 border-white px-3 py-2 text-lg font-bold"
          aria-label={`Llamar al Ayuntamiento: ${CONTACTO_OAC.telefono}`}
        >
          <Phone aria-hidden="true" size={20} />
          {CONTACTO_OAC.telefono}
        </a>
        <div className="flex items-center gap-3 text-base font-semibold">
          <a
            href="https://sede.losrealejos.es"
            target="_blank"
            rel="noopener"
            aria-label="Ir a la Sede Electrónica (se abre otro sistema en pestaña nueva)"
            className="flex items-center gap-1 rounded bg-white px-3 py-2 font-bold text-primary"
          >
            Sede Electrónica
            <ExternalLink aria-hidden="true" size={16} />
          </a>
          <a href="/contacto" className="underline underline-offset-4">
            Contacto
          </a>
        </div>
      </div>
      <div className="border-t border-white/25">
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
          <SiteNav />
          <div className="min-w-0 flex-1 md:ml-auto md:max-w-sm">
            <SearchBox id="buscador-cabecera" />
          </div>
        </div>
      </div>
    </header>
  );
}
