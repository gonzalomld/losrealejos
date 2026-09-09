import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { TramiteCard } from "@/components/sitio/TramiteCard";
import { DatoEjemplo } from "@/components/sitio/DatoEjemplo";
import { PrintButton } from "@/components/sitio/PrintButton";
import { ExternalServiceCard } from "@/components/sitio/ExternalServiceCard";
import { leerParaFront } from "@/lib/cms/almacen";
import type { Tramite } from "@/data/tramites";
import { getArea } from "@/data/areas";
import { ETIQUETAS_TEMA } from "@/data/vocabularios";
import { formatearFechaES } from "@/lib/formato";
import { CheckSquare, ListOrdered, BookOpen, Landmark, Phone } from "lucide-react";

async function todos(): Promise<Tramite[]> {
  return leerParaFront<Tramite>("tramites");
}

async function uno(id: string): Promise<Tramite | undefined> {
  return (await todos()).find((t) => t.id === id);
}

export async function generateStaticParams() {
  return (await todos()).map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = await uno(id);
  if (!t) return { title: "Trámite no encontrado" };
  return {
    title: t.tituloClaro,
    description: `${t.tituloClaro} (${t.tituloOficial}): ${t.descripcion.slice(0, 140)}`,
  };
}

export default async function FichaTramite({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tramite = await uno(id);
  if (!tramite) notFound();
  const todosLos = await todos();
  const area = getArea(tramite.areaId);
  const relacionados = tramite.relacionados
    .map((rid) => todosLos.find((t) => t.id === rid))
    .filter((t): t is Tramite => Boolean(t));
  const online = tramite.canales.includes("online") || tramite.canales.includes("ambos");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: tramite.tituloClaro,
    alternateName: tramite.tituloOficial,
    description: tramite.descripcion,
    provider: {
      "@type": "GovernmentOrganization",
      name: "Ayuntamiento de la Villa de Los Realejos",
      telephone: "+34922346234",
    },
    areaServed: "Los Realejos",
    serviceType: ETIQUETAS_TEMA[tramite.tema],
    availableChannel: tramite.canales.includes("online") || tramite.canales.includes("ambos")
      ? { "@type": "ServiceChannel", name: "Sede Electrónica", serviceUrl: tramite.sedeUrl }
      : { "@type": "ServiceChannel", name: "Oficina de Atención Ciudadana (OAC)" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs migas={[{ texto: "Trámites y servicios", href: "/tramites" }, { texto: tramite.tituloClaro }]} />
      <article className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">
          Trámite · {ETIQUETAS_TEMA[tramite.tema]}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">{tramite.tituloClaro}</h1>
        <p className="mt-1 text-lg text-muted-foreground">Nombre oficial: {tramite.tituloOficial}</p>
        <p className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>Última actualización: {formatearFechaES(tramite.fechaActualizacion)}</span>
          <PrintButton />
        </p>

        {/* Bloque En resumen: lectura fácil, antes de la descripción */}
        <section aria-labelledby="en-resumen" className="mt-4 rounded border-2 border-accent bg-card p-4">
          <h2 id="en-resumen" className="text-xl font-extrabold">
            En resumen
          </h2>
          <ul className="prosa-municipal mt-2 space-y-2 text-lg">
            <li><strong>Qué es:</strong> {tramite.resumen.queEs}</li>
            <li><strong>Qué necesito:</strong> {tramite.resumen.queNecesito}</li>
            <li><strong>Dónde se hace:</strong> {tramite.resumen.dondeSeHace}</li>
          </ul>
        </section>
        <p className="prosa-municipal mt-4 text-lg">{tramite.descripcion}</p>
        <section aria-labelledby="requisitos" className="mt-6">
          <h2 id="requisitos" className="flex items-center gap-2 text-xl font-extrabold">
            <CheckSquare aria-hidden="true" size={20} /> Requisitos
          </h2>
          <ul className="prosa-municipal mt-2 list-disc space-y-1 pl-6 text-lg">
            {tramite.requisitos.map((r) => (<li key={r}>{r}</li>))}
          </ul>
        </section>
        <section aria-labelledby="documentacion" className="mt-6">
          <h2 id="documentacion" className="flex items-center gap-2 text-xl font-extrabold">
            <BookOpen aria-hidden="true" size={20} /> Documentación que tienes que llevar
          </h2>
          <ul className="prosa-municipal mt-2 list-disc space-y-1 pl-6 text-lg">
            {tramite.documentacion.map((d) => (<li key={d}>{d}</li>))}
          </ul>
        </section>
        <section aria-labelledby="como-se-hace" className="mt-6">
          <h2 id="como-se-hace" className="flex items-center gap-2 text-xl font-extrabold">
            <ListOrdered aria-hidden="true" size={20} /> Cómo se hace, paso a paso
          </h2>
          <ol className="prosa-municipal mt-2 space-y-2 text-lg">
            {tramite.comoSeHace.map((p) => (
              <li key={p.paso} className="flex gap-2">
                <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">{p.paso}</span>
                <span>{p.texto}</span>
              </li>
            ))}
          </ol>
        </section>
        {online && (
          <ExternalServiceCard
            servicio="sede"
            quePuedesHacer="Hacer este trámite por internet. Se abre la Sede Electrónica en pestaña nueva."
            href={tramite.sedeUrl}
            identificacion={tramite.identificacion}
            textoEnlace="Ir a la Sede Electrónica"
          />
        )}
        <section aria-labelledby="donde" className="mt-6 rounded border border-border bg-card p-4">
          <h2 id="donde" className="flex items-center gap-2 text-xl font-extrabold">
            <Landmark aria-hidden="true" size={20} /> Dónde ir en persona
          </h2>
          <p className="mt-2 text-lg"><strong>{tramite.presencial.nombre}</strong><br />{tramite.presencial.direccion}<br />
            <a className="font-bold text-primary underline" href={`tel:+34${tramite.presencial.telefono.replace(/\s/g, "")}`}>
              <Phone aria-hidden="true" size={16} className="mr-1 inline" />{tramite.presencial.telefono}
            </a>
          </p>
          {area && (
            <p className="mt-2 text-base">Área responsable: <a className="font-bold text-primary underline" href={`/areas-municipales/${area.id}`}>{area.nombre}</a></p>
          )}
        </section>
        <section aria-labelledby="plazos" className="mt-6">
          <h2 id="plazos" className="text-xl font-extrabold">Plazos, silencio y tasas</h2>
          <dl className="prosa-municipal mt-2 space-y-2 text-lg">
            <div><dt className="font-bold">Plazo de resolución</dt><dd>{tramite.plazoResolucion}</dd></div>
            <div><dt className="font-bold">Silencio administrativo</dt><dd>{tramite.silencio}</dd></div>
            <div><dt className="font-bold">Tasas</dt><dd>{tramite.tasa} <DatoEjemplo /></dd></div>
          </dl>
        </section>
        <section aria-labelledby="normativa" className="mt-6">
          <h2 id="normativa" className="text-xl font-extrabold">Normativa</h2>
          <ul className="mt-2 space-y-1 text-lg">
            {tramite.normativa.map((n) => (
              <li key={n.titulo}>
                {n.url ? <a className="font-semibold text-primary underline" href={n.url} target="_blank" rel="noopener">{n.titulo} (se abre en pestaña nueva)</a> : n.titulo}
              </li>
            ))}
          </ul>
        </section>
        {relacionados.length > 0 && (
          <section aria-labelledby="relacionados" className="mt-8">
            <h2 id="relacionados" className="text-xl font-extrabold">Trámites relacionados</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {relacionados.map((r) => (<li key={r.id}><TramiteCard tramite={r} /></li>))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
