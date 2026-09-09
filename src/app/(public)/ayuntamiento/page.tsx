import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { FranjaSeccion } from "@/components/sitio/FranjaSeccion";
import { FRANJAS } from "@/lib/medios";
import { Landmark, Users, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Ayuntamiento",
  description:
    "Quién forma el Ayuntamiento de Los Realejos: corporación, plenos, áreas municipales, empleo, contratación y normas.",
};

export default function Ayuntamiento() {
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Ayuntamiento" }]} />
      <FranjaSeccion
        imagen={FRANJAS.ayuntamiento}
        titulo="Ayuntamiento"
        entradilla={
          <p>
            Quién es quién en el Ayuntamiento y cómo funciona. Ojo: para hacer una gestión no necesitas
            pasar por aquí. Ve directo a <a href="/tramites" className="font-bold text-primary underline">trámites y servicios</a>.
            Última actualización: 8 de septiembre de 2026.
          </p>
        }
      />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <section aria-labelledby="ay-corp" className="rounded border bg-card p-4">
            <h2 id="ay-corp" className="flex items-center gap-2 text-xl font-extrabold">
              <Users aria-hidden="true" size={22} /> Corporación y plenos
            </h2>
            <ul className="mt-2 space-y-2 text-lg">
              <li><a href="/transparencia/institucional" className="text-primary underline">Ver quién forma el pleno y los grupos políticos</a></li>
              <li><a href="/noticias/acuerdo-plenario-cortes-agua-san-vicente" className="text-primary underline">Leer el último acuerdo del pleno: tuberías de San Vicente</a></li>
              <li><a href="/transparencia/institucional" className="text-primary underline">Ver el calendario de plenos de 2026</a></li>
            </ul>
          </section>
          <section aria-labelledby="ay-areas" className="rounded border bg-card p-4">
            <h2 id="ay-areas" className="flex items-center gap-2 text-xl font-extrabold">
              <Landmark aria-hidden="true" size={22} /> Áreas municipales
            </h2>
            <p className="mt-2 text-base">Las 19 áreas son un directorio de contacto, no la puerta de entrada a los trámites.</p>
            <p className="mt-2 text-lg">
              <a href="/areas-municipales" className="font-bold text-primary underline">Ver el directorio de las 19 áreas con teléfono y correo</a>
            </p>
          </section>
          <section aria-labelledby="ay-normas" className="rounded border bg-card p-4">
            <h2 id="ay-normas" className="flex items-center gap-2 text-xl font-extrabold">
              <FileText aria-hidden="true" size={22} /> Empleo, contratos y normas
            </h2>
            <ul className="mt-2 space-y-2 text-lg">
              <li><a href="/empleo-publico" className="text-primary underline">Ver las convocatorias de empleo público</a></li>
              <li><a href="/transparencia/contratacion" className="text-primary underline">Ver licitaciones y contratos abiertos</a></li>
              <li><a href="/ordenanzas" className="text-primary underline">Ver las ordenanzas y normas municipales</a></li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
