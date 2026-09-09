import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { leerParaPreview } from "@/lib/cms/almacen";
import type { Tramite } from "@/data/tramites";
import type { Noticia } from "@/data/noticias";
import type { Evento } from "@/data/eventos";
import type { Ayuda } from "@/data/ayudas";
import type { Aviso } from "@/data/avisos";
import type { ServicioBarrio } from "@/data/servicios-barrio";
import { BandaPreview } from "@/components/admin/BandaPreview";

export const metadata: Metadata = {
  title: "Previsualización",
  robots: { index: false, follow: false },
};

const COLECCIONES = ["tramites", "noticias", "eventos", "ayudas", "avisos", "servicios"] as const;

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ coleccion: string; id: string }>;
  searchParams: Promise<{ version?: string }>;
}) {
  const { coleccion, id } = await params;
  const sp = await searchParams;
  const version = sp.version ? Number(sp.version) : undefined;
  if (!(COLECCIONES as readonly string[]).includes(coleccion)) notFound();
  const reg = await leerParaPreview(coleccion as never, id, version);
  if (!reg) {
    return (
      <>
        <BandaPreview estado="archivado" />
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-2xl font-extrabold">Este contenido no está disponible para previsualizar</h1>
          <p className="mt-2">No existe o está archivado. <a href="/admin" className="font-semibold text-primary underline">Volver al gestor</a></p>
        </div>
      </>
    );
  }
  const c = reg.contenido as Tramite & Noticia & Evento & Ayuda & Aviso & ServicioBarrio & { titulo?: string; nombre?: string; titular?: string; tituloClaro?: string };
  const titulo = c.tituloClaro ?? c.titulo ?? c.titular ?? c.nombre ?? id;
  return (
    <>
      <BandaPreview estado={reg.estado} />
      <Breadcrumbs migas={[{ texto: "Previsualización", href: "/admin" }, { texto: `${titulo}${version ? ` (v${version})` : ""}` }]} />
      <article className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Previsualización · {coleccion}</p>
        <h1 className="mt-1 text-3xl font-extrabold">{titulo}</h1>
        {"descripcion" in c && typeof c.descripcion === "string" && <p className="prosa-municipal mt-3 text-lg">{c.descripcion}</p>}
        {"entradilla" in c && typeof c.entradilla === "string" && <p className="prosa-municipal mt-3 text-xl font-semibold">{c.entradilla}</p>}
        {"resumen" in c && c.resumen && typeof c.resumen === "object" && (
          <section aria-label="En resumen" className="mt-4 rounded border-2 border-accent bg-card p-4">
            <ul className="space-y-2 text-lg">
              {Object.entries(c.resumen as Record<string, string>).map(([k, v]) => (<li key={k}><strong>{k}:</strong> {v}</li>))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
