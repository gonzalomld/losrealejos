import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { NoticiaCard } from "@/components/sitio/NoticiaCard";
import { leerParaFront } from "@/lib/cms/almacen";
import { ETIQUETAS_CATEGORIA_NOTICIA, type Noticia } from "@/data/noticias";
import { formatearFechaES } from "@/lib/formato";
import { FileDown } from "lucide-react";

export async function generateStaticParams() {
  const TODAS = await leerParaFront<Noticia>("noticias");
  return TODAS.map((n) => ({ id: n.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const TODAS = await leerParaFront<Noticia>("noticias");
  const n = TODAS.find((x) => x.id === id);
  return n ? { title: n.titular, description: n.entradilla } : { title: "Noticia no encontrada" };
}

export default async function NoticiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const TODAS = await leerParaFront<Noticia>("noticias");
  const noticia = TODAS.find((x) => x.id === id);
  if (!noticia) notFound();
  const relacionadas = TODAS.filter((n) => n.id !== noticia.id && n.categoria === noticia.categoria).slice(0, 3);
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Actualidad", href: "/noticias" }, { texto: "Noticias", href: "/noticias" }, { texto: noticia.titular.slice(0, 60) + "…" }]} />
      <article className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">
          Noticia · {ETIQUETAS_CATEGORIA_NOTICIA[noticia.categoria]} · {formatearFechaES(noticia.fecha)}
        </p>
        <h1 className="mt-1 max-w-[40ch] text-3xl font-extrabold leading-tight">{noticia.titular}</h1>
        <p className="prosa-municipal mt-2 text-xl font-semibold">{noticia.entradilla}</p>
        <p className="mt-1 text-sm text-muted-foreground">Última actualización: {formatearFechaES(noticia.fechaActualizacion)}</p>
        {noticia.imagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={noticia.imagen.src} alt={noticia.imagen.alt} className="mt-4 max-w-full rounded border" />
        ) : null}
        <div className="prosa-municipal mt-4 text-lg">
          {noticia.cuerpo.map((p, i) => (<p key={i} className="mt-2">{p}</p>))}
        </div>
        {noticia.adjuntos && noticia.adjuntos.length > 0 && (
          <section aria-labelledby="adjuntos" className="mt-6">
            <h2 id="adjuntos" className="text-xl font-extrabold">Documentos para descargar</h2>
            <ul className="mt-2 space-y-2">
              {noticia.adjuntos.map((a) => (
                <li key={a.titulo}>
                  <a href="/transparencia/contratacion" className="inline-flex items-center gap-2 font-bold text-primary underline">
                    <FileDown aria-hidden="true" size={18} />
                    Descargar {a.titulo} ({a.formato}, {a.tamano}, documento de muestra)
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        {relacionadas.length > 0 && (
          <section aria-labelledby="rel-n" className="mt-8">
            <h2 id="rel-n" className="text-2xl font-extrabold">Noticias relacionadas</h2>
            <ul className="mt-3 grid gap-3 md:grid-cols-3">
              {relacionadas.map((n) => (<li key={n.id}><NoticiaCard noticia={n} /></li>))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
