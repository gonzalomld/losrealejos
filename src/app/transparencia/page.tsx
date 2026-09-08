import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { BLOQUES_TRANSPARENCIA, ETIQUETAS_BLOQUE } from "@/data/vocabularios";
import { DOCUMENTOS } from "@/data/transparencia";
import { Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Transparencia",
  description:
    "Portal de transparencia del Ayuntamiento de Los Realejos: documentos oficiales a dos clics desde la portada.",
};

export default function Transparencia() {
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Transparencia" }]} />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-extrabold">Portal de transparencia</h1>
        <p className="prosa-municipal mt-2 text-lg">
          Los documentos oficiales del Ayuntamiento, organizados en 6 bloques. Desde aquí llegas a
          cualquier documento con un clic más. Última actualización: 8 de septiembre de 2026.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {BLOQUES_TRANSPARENCIA.map((b) => {
            const info = ETIQUETAS_BLOQUE[b];
            const n = DOCUMENTOS.filter((d) => d.bloque === b).length;
            return (
              <li key={b} className="rounded border bg-card p-4">
                <h2 className="text-xl font-bold">
                  <a href={`/transparencia/${b}`} className="underline-offset-4 hover:underline">
                    {info.titulo}
                  </a>
                </h2>
                <p className="mt-1 text-base text-muted-foreground">{info.descripcion}</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-bold">
                  <Database aria-hidden="true" size={16} />
                  {n} documentos publicados
                </p>
                <p className="mt-2">
                  <a href={`/transparencia/${b}`} className="font-bold text-primary underline">
                    Ver los documentos de «{info.titulo}»
                  </a>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
