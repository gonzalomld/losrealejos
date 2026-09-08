import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { DocumentoRow } from "@/components/sitio/DocumentoRow";
import { BLOQUES_TRANSPARENCIA, ETIQUETAS_BLOQUE, type BloqueTransparencia } from "@/data/vocabularios";
import { documentosDeBloque } from "@/data/transparencia";

export function generateStaticParams() {
  return BLOQUES_TRANSPARENCIA.map((bloque) => ({ bloque }));
}

export async function generateMetadata({ params }: { params: Promise<{ bloque: string }> }): Promise<Metadata> {
  const { bloque } = await params;
  if (!(BLOQUES_TRANSPARENCIA as readonly string[]).includes(bloque)) return { title: "Bloque no encontrado" };
  const info = ETIQUETAS_BLOQUE[bloque as BloqueTransparencia];
  return { title: info.titulo, description: `${info.titulo}: ${info.descripcion}` };
}

export default async function BloquePage({ params }: { params: Promise<{ bloque: string }> }) {
  const { bloque } = await params;
  if (!(BLOQUES_TRANSPARENCIA as readonly string[]).includes(bloque)) notFound();
  const b = bloque as BloqueTransparencia;
  const info = ETIQUETAS_BLOQUE[b];
  const docs = documentosDeBloque(b);
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Transparencia", href: "/transparencia" }, { texto: info.titulo }]} />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Transparencia</p>
        <h1 className="mt-1 text-3xl font-extrabold">{info.titulo}</h1>
        <p className="prosa-municipal mt-2 text-lg">{info.descripcion}</p>
        <p className="mt-1 text-sm text-muted-foreground" role="status">
          {docs.length} documentos. Última actualización: 8 de septiembre de 2026.
        </p>
        <ul className="mt-4 grid gap-3">
          {docs.map((d) => (
            <div key={d.id} id={d.id}>
              <DocumentoRow documento={d} />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
