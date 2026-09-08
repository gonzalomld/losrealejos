import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { TramiteCard } from "@/components/sitio/TramiteCard";
import { DatoEjemplo } from "@/components/sitio/DatoEjemplo";
import { PrintButton } from "@/components/sitio/PrintButton";
import { ExternalServiceCard } from "@/components/sitio/ExternalServiceCard";
import { TRAMITES, getTramite } from "@/data/tramites";
import { getArea } from "@/data/areas";
import { CONTACTO_OAC, ETIQUETAS_TEMA } from "@/data/vocabularios";
import { formatearFechaES } from "@/lib/formato";
import { CheckSquare, ListOrdered, BookOpen, Landmark, Phone } from "lucide-react";

export function generateStaticParams() {
  return TRAMITES.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = getTramite(id);
  if (!t) return { title: "Trámite no encontrado" };
  return {
    title: t.tituloClaro,
    description: `${t.tituloClaro} (${t.tituloOficial}): ${t.descripcion.slice(0, 140)}`,
  };
}

export default async function FichaTramite({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tramite = getTramite(id);
  if (!tramite) notFound();
  const area = getArea(tramite.areaId);
  const relacionados = tramite.relacionados
    .map((rid) => getTramite(rid))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
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
    serviceType: tramite.temas.map((t) => ETIQUETAS_TEMA[t]).join(", "),
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
          Trámite · {tramite.temas.map((t) => ETIQUETAS_TEMA[t]).join(" · ")}
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

        <div className="prosa-municipal mt-4 text-lg">
          <h2 className="mt-6 text-2xl font-extrabold">1. Qué es y para qué sirve</h2>
          <p className="mt-2">{tramite.descripcion}</p>

          <h2 className="mt-6 flex items-center gap-2 text-2xl font-extrabold">
            2. Quién puede pedirlo
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            {tramite.requisitos.map((r) => (<li key={r}>{r}</li>))}
          </ul>

          <h2 className="mt-6 flex items-center gap-2 text-2xl font-extrabold">
            <CheckSquare aria-hidden="true" size={24} />
            3. Papeles que necesitas
          </h2>
          <p className="mt-1 text-base">Marca cada papel cuando lo tengas preparado:</p>
          <ul className="mt-2 space-y-2">
            {tramite.documentacion.map((d) => (
              <li key={d} className="flex items-start gap-2 rounded border bg-card p-2">
                <span aria-hidden="true" className="mt-1 inline-block h-5 w-5 shrink-0 rounded border-2 border-primary" />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-6 flex items-center gap-2 text-2xl font-extrabold">
            <ListOrdered aria-hidden="true" size={24} />
            4. Cómo se hace, paso a paso
          </h2>
          <ol className="mt-2 space-y-2">
            {tramite.comoSeHace.map((p) => (
              <li key={p.paso} className="rounded border bg-card p-3">
                <strong>Paso {p.paso}:</strong> {p.texto}
              </li>
            ))}
          </ol>
          <p className="mt-2">
            <strong>Por internet:</strong> {online ? "sí se puede hacer online." : "no se puede hacer online, hay que ir en persona."}{" "}
            <strong>En persona:</strong> en la Oficina de Atención Ciudadana (OAC), {CONTACTO_OAC.direccion}.
          </p>

          <h2 className="mt-6 text-2xl font-extrabold">5. Cuánto tarda y qué pasa si no responden</h2>
          <p className="mt-2">
            <strong>Plazo:</strong> {tramite.plazoResolucion}
            <DatoEjemplo />
          </p>
          <p className="mt-1"><strong>Si no responden:</strong> {tramite.silencio}</p>

          <h2 className="mt-6 text-2xl font-extrabold">6. Cuánto cuesta</h2>
          <p className="mt-2">
            {tramite.tasa}
            {!tramite.tasaGratuita && <DatoEjemplo />}
          </p>

          <h2 className="mt-6 flex items-center gap-2 text-2xl font-extrabold">
            <BookOpen aria-hidden="true" size={24} />
            7. Normas que lo regulan
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            {tramite.normativa.map((n) => (
              <li key={n.titulo}>
                <a href={n.url} target="_blank" rel="noopener" className="font-semibold text-primary underline">
                  {n.titulo} (se abre en pestaña nueva)
                </a>
              </li>
            ))}
          </ul>
        </div>

        <section aria-labelledby="cta-sede" className="mt-8">
          <h2 id="cta-sede" className="text-2xl font-extrabold">8. Empezar el trámite</h2>
          <div className="mt-3">
            <ExternalServiceCard
              servicio="sede"
              quePuedesHacer={`Presentar «${tramite.tituloClaro}» por internet en la Sede Electrónica. Este portal solo informa: el trámite se hace en otro sistema.`}
              identificacion={tramite.identificacion}
              href={tramite.sedeUrl}
              textoEnlace="Iniciar en la Sede Electrónica"
            />
          </div>
        </section>

        <section aria-labelledby="area-resp" className="mt-6 rounded border bg-card p-4">
          <h2 id="area-resp" className="flex items-center gap-2 text-xl font-extrabold">
            <Landmark aria-hidden="true" size={22} />
            Quién te ayuda con este trámite
          </h2>
          {area ? (
            <p className="mt-2 text-lg">
              <a href={`/areas-municipales/${area.id}`} className="font-bold text-primary underline">{area.nombre}</a>
              {" · "}
              <a href={`tel:+34${area.telefono.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 font-bold text-primary underline">
                <Phone aria-hidden="true" size={16} />
                {area.telefono}
              </a>
              {" · "}
              <a href={`mailto:${area.correo}`} className="text-primary underline">{area.correo}</a>
            </p>
          ) : (
            <p className="mt-2 text-lg">
              Oficina de Atención Ciudadana (OAC):{" "}
              <a href={CONTACTO_OAC.telefonoHref} className="font-bold text-primary underline">{CONTACTO_OAC.telefono}</a>
            </p>
          )}
        </section>

        {relacionados.length > 0 && (
          <section aria-labelledby="relacionados" className="mt-8">
            <h2 id="relacionados" className="text-2xl font-extrabold">Trámites relacionados</h2>
            <ul className="mt-3 grid gap-3 md:grid-cols-3">
              {relacionados.map((r) => (
                <li key={r.id}><TramiteCard tramite={r} /></li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
