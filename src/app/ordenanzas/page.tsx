import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { DatoEjemplo } from "@/components/sitio/DatoEjemplo";

export const metadata: Metadata = {
  title: "Ordenanzas",
  description:
    "Normas municipales de Los Realejos: listado de ordenanzas con su descripción y fecha de actualización.",
};

type Norma = { titulo: string; descripcion: string; fecha: string };

const NORMAS: Norma[] = [
  { titulo: "Ordenanza de limpieza y recogida de basura", descripcion: "Horarios, contenedores y cómo separar la basura.", fecha: "2026-02-05" },
  { titulo: "Ordenanza del IBI (Impuesto sobre Bienes Inmuebles)", descripcion: "Cómo se calcula el impuesto anual de tu casa o local.", fecha: "2026-01-15" },
  { titulo: "Ordenanza de licencias urbanísticas", descripcion: "Permisos para obras en casa y en locales.", fecha: "2026-03-01" },
  { titulo: "Ordenanza de actividades", descripcion: "Permisos para abrir tiendas, bares y oficinas.", fecha: "2026-03-01" },
  { titulo: "Ordenanza de precios de instalaciones deportivas", descripcion: "Cuánto cuesta usar la piscina, las pistas y el pabellón.", fecha: "2026-04-10" },
  { titulo: "Ordenanza de tenencia de animales", descripcion: "Normas para perros y mascotas: censo, correa y playas.", fecha: "2026-02-20" },
  { titulo: "Ordenanza de terrazas y venta ambulante", descripcion: "Mesas en la calle, mercadillos y puestos.", fecha: "2026-05-01" },
];

export default function Ordenanzas() {
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Ordenanzas" }]} />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-extrabold">Ordenanzas: normas municipales</h1>
        <p className="prosa-municipal mt-2 text-lg">
          Las normas que aprueba el Ayuntamiento, explicadas con palabras claras. El texto oficial
          completo se publica en el Boletín Oficial de la Provincia. Última actualización: 8 de
          septiembre de 2026.
        </p>
        <ul className="mt-4 grid gap-3">
          {NORMAS.map((n) => (
            <li key={n.titulo} className="rounded border bg-card p-4">
              <h2 className="text-xl font-bold">{n.titulo}<DatoEjemplo /></h2>
              <p className="mt-1 text-base">{n.descripcion}</p>
              <p className="mt-1 text-sm text-muted-foreground">Actualizada: {n.fecha} (dato de ejemplo)</p>
              <p className="mt-2">
                <a href="/transparencia/institucional" className="font-bold text-primary underline">
                  Ver «{n.titulo}» en transparencia
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
