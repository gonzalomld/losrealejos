import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { FranjaSeccion } from "@/components/sitio/FranjaSeccion";
import { leerParaFront } from "@/lib/cms/almacen";
import type { ServicioBarrio } from "@/data/servicios-barrio";
import { FRANJAS } from "@/lib/medios";
import { Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Mi barrio y mi día a día",
  description:
    "Servicios de tu día a día en Los Realejos: basura, incidencias, transporte, deportes, bibliotecas, mayores, juventud y más.",
};

export default async function MiBarrio() {
  const SERVICIOS = await leerParaFront<ServicioBarrio>("servicios");
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Mi barrio y mi día a día" }]} />
      <FranjaSeccion
        imagen={FRANJAS.barrio}
        titulo="Mi barrio y mi día a día"
        entradilla={
          <p>
            Todo lo que usas cada día: basura, calles, guaguas, deportes, cultura, colegios y ayuda.
            Sin saber qué concejalía lo lleva. Última actualización: 8 de septiembre de 2026.
          </p>
        }
      />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {SERVICIOS.map((s) => (
            <li key={s.id} className="rounded border bg-card p-4">
              <h2 className="text-xl font-bold">
                <a href={`/mi-barrio/${s.id}`} className="underline-offset-4 hover:underline">{s.nombre}</a>
              </h2>
              <p className="mt-1 text-base text-muted-foreground">{s.descripcion}</p>
              <p className="mt-2 flex items-center gap-1 font-bold">
                <Phone aria-hidden="true" size={16} />
                <a href={`tel:+34${s.telefono.replace(/\s/g, "")}`} className="text-primary underline">{s.telefono}</a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
