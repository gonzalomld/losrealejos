import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { leerParaFront } from "@/lib/cms/almacen";
import { ETIQUETAS_CATEGORIA_EVENTO, type Evento } from "@/data/eventos";
import { formatearFechaHoraES } from "@/lib/formato";
import { MapPin, CalendarClock, ExternalLink } from "lucide-react";

export async function generateStaticParams() {
  const TODOS = await leerParaFront<Evento>("eventos");
  return TODOS.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const TODOS_M = await leerParaFront<Evento>("eventos");
  const e = TODOS_M.find((x) => x.id === id);
  return e ? { title: e.titulo, description: `${e.titulo}: ${e.descripcion}` } : { title: "Evento no encontrado" };
}

export default async function EventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const TODOS = await leerParaFront<Evento>("eventos");
  const evento = TODOS.find((x) => x.id === id);
  if (!evento) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: evento.titulo,
    description: evento.descripcion,
    startDate: evento.fechaHoraISO,
    location: { "@type": "Place", name: evento.lugar, address: "Los Realejos, Santa Cruz de Tenerife" },
    organizer: { "@type": "GovernmentOrganization", name: "Ayuntamiento de la Villa de Los Realejos" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs migas={[{ texto: "Actualidad", href: "/noticias" }, { texto: "Agenda", href: "/agenda" }, { texto: evento.titulo.slice(0, 60) + "…" }]} />
      <article className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">
          Evento · {ETIQUETAS_CATEGORIA_EVENTO[evento.categoria]}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold">{evento.titulo}</h1>
        <dl className="mt-3 grid gap-2 rounded border bg-card p-4 text-lg">
          <div className="flex items-center gap-2">
            <dt className="flex items-center gap-1 font-bold"><CalendarClock aria-hidden="true" size={20} /> Fecha y hora:</dt>
            <dd>{formatearFechaHoraES(evento.fechaHoraISO)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="flex items-center gap-1 font-bold"><MapPin aria-hidden="true" size={20} /> Lugar:</dt>
            <dd>{evento.lugar}, Los Realejos</dd>
          </div>
        </dl>
        <p className="prosa-municipal mt-3 text-lg">{evento.descripcion}</p>

        <section aria-labelledby="como-llegar" className="mt-4 rounded border bg-card p-4">
          <h2 id="como-llegar" className="text-xl font-extrabold">Cómo llegar</h2>
          {/* Mapa estático: imagen sin recursos externos que instalen cookies */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mapa-oac.svg"
            alt={`Mapa esquemático del centro de Los Realejos con la ubicación de ${evento.lugar}`}
            className="mt-2 max-w-full rounded border"
            width={800}
            height={400}
          />
          <p className="mt-2 text-lg">
            <a
              href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${evento.lugar}, Los Realejos`)}`}
              target="_blank"
              rel="noopener"
              className="font-bold text-primary underline"
            >
              Cómo llegar a {evento.lugar} (se abre el mapa en pestaña nueva)
              <ExternalLink aria-hidden="true" size={16} className="ml-1 inline" />
            </a>
          </p>
        </section>

        {evento.inscripcionUrl && (
          <p className="mt-4">
            <a href={evento.inscripcionUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded bg-primary px-5 py-3 font-bold text-white">
              Inscribirme en este evento (se abre otro sistema en pestaña nueva)
              <ExternalLink aria-hidden="true" size={18} />
            </a>
          </p>
        )}
        <p className="mt-4">
          <a href="/agenda" className="font-bold text-primary underline">Volver a la agenda de eventos</a>
        </p>
      </article>
    </>
  );
}
