import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { TramiteCard } from "@/components/sitio/TramiteCard";
import { AREAS, getArea } from "@/data/areas";
import { getTramite } from "@/data/tramites";
import { Phone, Mail, MapPin } from "lucide-react";

export function generateStaticParams() {
  return AREAS.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const a = getArea(id);
  return a
    ? { title: a.nombre, description: `${a.nombre}: ${a.descripcion} Teléfono ${a.telefono}.` }
    : { title: "Área no encontrada" };
}

export default async function FichaArea({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const area = getArea(id);
  if (!area) notFound();
  const tramites = area.tramiteIds.map((tid) => getTramite(tid)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  return (
    <>
      <Breadcrumbs migas={[
        { texto: "Ayuntamiento", href: "/ayuntamiento" },
        { texto: "Áreas municipales", href: "/areas-municipales" },
        { texto: area.nombre },
      ]} />
      <article className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Área municipal</p>
        <h1 className="mt-1 text-3xl font-extrabold">{area.nombre}</h1>
        <p className="prosa-municipal mt-2 text-lg">{area.descripcion}</p>
        <section aria-labelledby="contacto-area" className="mt-4 rounded border bg-card p-4">
          <h2 id="contacto-area" className="text-xl font-extrabold">Contacto</h2>
          <ul className="mt-2 space-y-2 text-lg">
            <li><strong>Responsable:</strong> {area.responsable} <span className="text-sm">(dato de ejemplo)</span></li>
            <li className="flex items-center gap-2">
              <Phone aria-hidden="true" size={18} />
              <a href={`tel:+34${area.telefono.replace(/\s/g, "")}`} className="font-bold text-primary underline">{area.telefono}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail aria-hidden="true" size={18} />
              <a href={`mailto:${area.correo}`} className="text-primary underline">{area.correo}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin aria-hidden="true" size={18} className="mt-1" />
              {area.ubicacion}
            </li>
          </ul>
        </section>
        {tramites.length > 0 && (
          <section aria-labelledby="tramites-area" className="mt-6">
            <h2 id="tramites-area" className="text-2xl font-extrabold">Trámites que gestiona esta área</h2>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {tramites.map((t) => (
                <li key={t.id}><TramiteCard tramite={t} /></li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
