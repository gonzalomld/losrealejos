import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { CONTACTO_OAC } from "@/data/vocabularios";
import { AREAS } from "@/data/areas";
import { ExternalServiceCard } from "@/components/sitio/ExternalServiceCard";
import { Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto y atención ciudadana",
  description:
    "Oficina de Atención Ciudadana (OAC) de Los Realejos: dirección, horario, teléfono 922 34 62 34, cita previa y directorio de áreas.",
};

const NUCLEOS = ["Realejo Alto", "Realejo Bajo", "La Cruz Santa", "Icod el Alto", "San Vicente", "Palo Blanco", "Toscal-Longuera"];

export default function Contacto() {
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Contacto y atención ciudadana" }]} />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-extrabold">Contacto y atención ciudadana</h1>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <section aria-labelledby="oac" className="rounded border-2 border-primary bg-card p-4">
            <h2 id="oac" className="text-xl font-extrabold">Oficina de Atención Ciudadana (OAC)</h2>
            <address className="mt-2 space-y-2 text-lg not-italic">
              <p className="flex items-start gap-2"><MapPin aria-hidden="true" size={20} className="mt-1 shrink-0" />{CONTACTO_OAC.direccion}</p>
              <p className="flex items-center gap-2">
                <Phone aria-hidden="true" size={20} />
                <a href={CONTACTO_OAC.telefonoHref} className="font-bold text-primary underline">{CONTACTO_OAC.telefono}</a>
              </p>
              <p className="flex items-start gap-2"><Clock aria-hidden="true" size={20} className="mt-1 shrink-0" />{CONTACTO_OAC.horario} (dato de ejemplo)</p>
            </address>
            {/* Mapa estático: imagen sin recursos externos que instalen cookies */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mapa-oac.svg" alt="Mapa esquemático del centro de Realejo Bajo con la Oficina de Atención Ciudadana en Avenida de Canarias, 6" className="mt-3 max-w-full rounded border" width={800} height={400} />
            <p className="mt-2 text-lg">
              <a href="https://www.openstreetmap.org/search?query=Avenida%20de%20Canarias%206%20Los%20Realejos" target="_blank" rel="noopener" className="font-bold text-primary underline">
                Cómo llegar a la Oficina de Atención Ciudadana (se abre el mapa en pestaña nueva)
              </a>
            </p>
          </section>
          <div className="grid gap-4">
            <ExternalServiceCard
              servicio="cita"
              quePuedesHacer="Reservar día y hora para que te atiendan en persona en la OAC."
              href="https://sede.losrealejos.es/cita-previa"
              textoEnlace="Pedir cita previa en la OAC"
            />
            <section aria-labelledby="nucleos" className="rounded border bg-card p-4">
              <h2 id="nucleos" className="text-xl font-extrabold">Barrios del municipio</h2>
              <p className="mt-1 text-base">La OAC de Realejo Bajo atiende a todos estos núcleos:</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {NUCLEOS.map((n) => (
                  <li key={n} className="rounded-full bg-muted px-3 py-1 text-base font-semibold">{n}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        <section aria-labelledby="directorio" className="mt-8">
          <h2 id="directorio" className="text-2xl font-extrabold">Directorio de áreas: teléfono y correo</h2>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {AREAS.map((a) => (
              <li key={a.id} className="rounded border bg-card p-3">
                <h3 className="font-bold">
                  <a href={`/areas-municipales/${a.id}`} className="text-primary underline">{a.nombre}</a>
                </h3>
                <p className="text-base">
                  <a href={`tel:+34${a.telefono.replace(/\s/g, "")}`} className="font-semibold text-primary underline">{a.telefono}</a>
                  {" · "}
                  <a href={`mailto:${a.correo}`} className="text-primary underline">{a.correo}</a>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
