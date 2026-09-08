import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { AREAS } from "@/data/areas";
import { Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Áreas municipales",
  description:
    "Directorio de las 19 áreas del Ayuntamiento de Los Realejos con su teléfono, correo y ubicación.",
};

export default function AreasMunicipales() {
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Ayuntamiento", href: "/ayuntamiento" }, { texto: "Áreas municipales" }]} />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-extrabold">Áreas municipales: directorio</h1>
        <p className="prosa-municipal mt-2 text-lg">
          Las 19 áreas del Ayuntamiento con su teléfono y correo. Es un destino para quien busca por
          concejalía, no la puerta de entrada: para resolver una gestión ve a{" "}
          <a href="/tramites" className="font-bold text-primary underline">trámites y servicios</a>.
          Última actualización: 8 de septiembre de 2026.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {AREAS.map((a) => (
            <li key={a.id} className="rounded border bg-card p-4">
              <h2 className="text-xl font-bold">
                <a href={`/areas-municipales/${a.id}`} className="underline-offset-4 hover:underline">{a.nombre}</a>
              </h2>
              <p className="mt-1 text-base text-muted-foreground">{a.descripcion}</p>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-base font-semibold">
                <span className="inline-flex items-center gap-1">
                  <Phone aria-hidden="true" size={16} />
                  <a href={`tel:+34${a.telefono.replace(/\s/g, "")}`} className="text-primary underline">{a.telefono}</a>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Mail aria-hidden="true" size={16} />
                  <a href={`mailto:${a.correo}`} className="text-primary underline">{a.correo}</a>
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
