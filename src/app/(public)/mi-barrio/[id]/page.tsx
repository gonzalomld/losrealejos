import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { leerParaFront } from "@/lib/cms/almacen";
import type { ServicioBarrio } from "@/data/servicios-barrio";
import { getArea } from "@/data/areas";
import { formatearFechaES } from "@/lib/formato";
import { ExternalLink, Phone } from "lucide-react";

export async function generateStaticParams() {
  const TODOS = await leerParaFront<ServicioBarrio>("servicios");
  return TODOS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const TODOS_M = await leerParaFront<ServicioBarrio>("servicios");
  const s = TODOS_M.find((x) => x.id === id);
  return s
    ? { title: s.nombre, description: `${s.nombre} en Los Realejos: ${s.descripcion}` }
    : { title: "Servicio no encontrado" };
}

export default async function ServicioBarrioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const TODOS = await leerParaFront<ServicioBarrio>("servicios");
  const servicio = TODOS.find((x) => x.id === id);
  if (!servicio) notFound();
  const area = getArea(servicio.areaId);
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Mi barrio y mi día a día", href: "/mi-barrio" }, { texto: servicio.nombre }]} />
      <article className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Servicio del día a día</p>
        <h1 className="mt-1 text-3xl font-extrabold">{servicio.nombre}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Última actualización: {formatearFechaES(servicio.fechaActualizacion)}</p>
        <p className="prosa-municipal mt-3 text-lg">{servicio.descripcion}</p>
        <h2 className="mt-6 text-2xl font-extrabold">Qué puedes hacer</h2>
        <ul className="mt-3 grid gap-3">
          {servicio.acciones.map((a) => (
            <li key={a.texto} className="rounded border bg-card p-4">
              <a
                href={a.href}
                {...(a.externo ? { target: "_blank", rel: "noopener" } : {})}
                className="flex items-center gap-2 text-lg font-bold text-primary underline"
              >
                {a.texto}
                {a.externo && (
                  <>
                    <ExternalLink aria-hidden="true" size={18} />
                    <span className="sr-only">(se abre otro sistema en pestaña nueva)</span>
                  </>
                )}
              </a>
            </li>
          ))}
        </ul>
        <section aria-label="Contacto del servicio" className="mt-6 rounded border bg-card p-4">
          <h2 className="text-xl font-extrabold">Contacto</h2>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-lg">
            <Phone aria-hidden="true" size={18} />
            <a href={`tel:+34${servicio.telefono.replace(/\s/g, "")}`} className="font-bold text-primary underline">
              {servicio.telefono}
            </a>
            {area && (
              <span>
                · Área de <a href={`/areas-municipales/${area.id}`} className="text-primary underline">{area.nombre}</a>
              </span>
            )}
          </p>
        </section>
      </article>
    </>
  );
}
