import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { DatoEjemplo } from "@/components/sitio/DatoEjemplo";
import { PrintButton } from "@/components/sitio/PrintButton";
import { ExternalServiceCard } from "@/components/sitio/ExternalServiceCard";
import { leerParaFront } from "@/lib/cms/almacen";
import { ETIQUETAS_DESTINATARIO, type Ayuda } from "@/data/ayudas";
import { getArea } from "@/data/areas";
import { formatearFechaES } from "@/lib/formato";
import { CheckSquare, ListOrdered, Landmark, Phone, HandCoins } from "lucide-react";

export async function generateStaticParams() {
  const TODAS_A = await leerParaFront<Ayuda>("ayudas");
  return TODAS_A.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const TODAS_AM = await leerParaFront<Ayuda>("ayudas");
  const a = TODAS_AM.find((x) => x.id === id);
  if (!a) return { title: "Ayuda no encontrada" };
  return {
    title: a.titulo,
    description: `${a.titulo} (${a.tituloOficial}): ${a.descripcion.slice(0, 140)}`,
  };
}

export default async function DetalleAyuda({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const TODAS = await leerParaFront<Ayuda>("ayudas");
  const ayuda = TODAS.find((x) => x.id === id);
  if (!ayuda) notFound();
  const area = getArea(ayuda.areaId);
  const relacionadas = ayuda.relacionadas
    .map((rid) => TODAS.find((x) => x.id === rid))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <Breadcrumbs migas={[
        { texto: "Ayudas y subvenciones", href: "/ayudas" },
        { texto: ayuda.titulo },
      ]} />
      <article className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">
          Ayuda · {ETIQUETAS_DESTINATARIO[ayuda.destinatario]} · {ayuda.estado === "abierta" ? "Plazo abierto" : "Plazo cerrado"}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">{ayuda.titulo}</h1>
        <p className="mt-1 text-lg text-muted-foreground">Nombre oficial: {ayuda.tituloOficial}</p>
        <p className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>Última actualización: {formatearFechaES(ayuda.fechaActualizacion)}</span>
          {ayuda.finPlazoISO && (
            <span className="font-bold text-foreground">Fin de plazo: {formatearFechaES(ayuda.finPlazoISO)}</span>
          )}
          <PrintButton />
        </p>

        <section aria-labelledby="en-resumen" className="mt-4 rounded border-2 border-accent bg-card p-4">
          <h2 id="en-resumen" className="text-xl font-extrabold">En resumen</h2>
          <ul className="prosa-municipal mt-2 space-y-2 text-lg">
            <li><strong>Qué es:</strong> {ayuda.resumen.queEs}</li>
            <li><strong>Qué necesito:</strong> {ayuda.resumen.queNecesito}</li>
            <li><strong>Dónde se hace:</strong> {ayuda.resumen.dondeSeHace}</li>
          </ul>
        </section>

        <div className="prosa-municipal mt-4 text-lg">
          <h2 className="mt-6 text-2xl font-extrabold">1. Qué es y para qué sirve</h2>
          <p className="mt-2">{ayuda.descripcion}</p>

          <h2 className="mt-6 text-2xl font-extrabold">2. Quién puede pedirla</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            {ayuda.requisitos.map((r) => (<li key={r}>{r}</li>))}
          </ul>

          <h2 className="mt-6 flex items-center gap-2 text-2xl font-extrabold">
            <CheckSquare aria-hidden="true" size={24} />
            3. Papeles que necesitas
          </h2>
          <ul className="mt-2 space-y-2">
            {ayuda.documentacion.map((d) => (
              <li key={d} className="flex items-start gap-2 rounded border bg-card p-2">
                <span aria-hidden="true" className="mt-1 inline-block h-5 w-5 shrink-0 rounded border-2 border-primary" />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-6 text-2xl font-extrabold">4. Cuánto dinero es</h2>
          <p className="mt-2">{ayuda.cuantia}<DatoEjemplo /></p>

          <h2 className="mt-6 text-2xl font-extrabold">5. Cuándo se resuelve</h2>
          <p className="mt-2">{ayuda.plazoResolucion}<DatoEjemplo /></p>

          <h2 className="mt-6 flex items-center gap-2 text-2xl font-extrabold">
            <ListOrdered aria-hidden="true" size={24} />
            6. Cómo se pide, paso a paso
          </h2>
          <ol className="mt-2 space-y-2">
            {ayuda.comoSeHace.map((p) => (
              <li key={p.paso} className="rounded border bg-card p-3">
                <strong>Paso {p.paso}:</strong> {p.texto}
              </li>
            ))}
          </ol>

          <h2 className="mt-6 text-2xl font-extrabold">7. Bases de la convocatoria</h2>
          <p className="mt-2">
            <a href={ayuda.bases.href} className="font-semibold text-primary underline">
              Leer {ayuda.bases.titulo}
            </a>
          </p>
        </div>

        <section aria-labelledby="cta-ayuda" className="mt-8">
          <h2 id="cta-ayuda" className="text-2xl font-extrabold">8. Pedir esta ayuda</h2>
          <p className="mt-2 text-base text-muted-foreground">
            La dirección definitiva de cada ayuda en la Sede Electrónica se configurará con el Ayuntamiento.
          </p>
          <div className="mt-3">
            <ExternalServiceCard
              servicio="sede"
              quePuedesHacer={`Pedir «${ayuda.titulo}» por internet en la Sede Electrónica.`}
              identificacion="certificado digital o Cl@ve."
              href="https://sede.losrealejos.es/"
              textoEnlace="Pedir esta ayuda en la Sede Electrónica"
            />
          </div>
        </section>

        <section aria-labelledby="area-ayuda" className="mt-6 rounded border bg-card p-4">
          <h2 id="area-ayuda" className="flex items-center gap-2 text-xl font-extrabold">
            <Landmark aria-hidden="true" size={22} />
            Quién te ayuda con esta ayuda
          </h2>
          {area ? (
            <p className="mt-2 text-lg">
              <a href={`/areas-municipales/${area.id}`} className="font-bold text-primary underline">{area.nombre}</a>
              {" · "}
              <a href={`tel:+34${area.telefono.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 font-bold text-primary underline">
                <Phone aria-hidden="true" size={16} />
                {area.telefono}
              </a>
            </p>
          ) : (
            <p className="mt-2 text-lg">
              Oficina de Atención Ciudadana (OAC):{" "}
              <a href="tel:+34922346234" className="font-bold text-primary underline">922 34 62 34</a>
            </p>
          )}
        </section>

        {relacionadas.length > 0 && (
          <section aria-labelledby="rel-ayudas" className="mt-8">
            <h2 id="rel-ayudas" className="flex items-center gap-2 text-2xl font-extrabold">
              <HandCoins aria-hidden="true" size={24} />
              Otras ayudas que te pueden interesar
            </h2>
            <ul className="mt-3 grid gap-3 md:grid-cols-3">
              {relacionadas.map((r) => (
                <li key={r.id} className="rounded border bg-card p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-primary">
                    Ayuda · {ETIQUETAS_DESTINATARIO[r.destinatario]}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">
                    <a href={`/ayudas/${r.id}`} className="underline-offset-4 hover:underline">{r.titulo}</a>
                  </h3>
                  <p className="mt-1 text-base text-muted-foreground">{r.descripcion}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
