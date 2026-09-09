import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { FranjaSeccion } from "@/components/sitio/FranjaSeccion";
import { FRANJAS } from "@/lib/medios";
import { NoticiaCard } from "@/components/sitio/NoticiaCard";
import { EmptyState } from "@/components/sitio/EmptyState";
import { leerParaFront } from "@/lib/cms/almacen";
import { CATEGORIAS_NOTICIA, ETIQUETAS_CATEGORIA_NOTICIA, type Noticia } from "@/data/noticias";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Noticias del Ayuntamiento de Los Realejos: obras, ayudas, empleo, cultura y fiestas.",
};

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const cat = typeof sp.categoria === "string" ? sp.categoria : "";
  const normalizar = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const palabras = normalizar(q.trim()).split(/\s+/).filter(Boolean);
  const NOTICIAS = await leerParaFront<Noticia>("noticias");
  const filtradas = NOTICIAS.filter((n) => {
    if (cat && n.categoria !== cat) return false;
    if (palabras.length > 0 && !palabras.every((p) => normalizar(`${n.titular} ${n.entradilla}`).includes(p))) return false;
    return true;
  }).sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

  return (
    <>
      <Breadcrumbs migas={[{ texto: "Actualidad", href: "/noticias" }, { texto: "Noticias" }]} />
      <FranjaSeccion
        imagen={FRANJAS.actualidad}
        titulo="Noticias"
        entradilla={
          <p>
            Lo que hace el Ayuntamiento, contado con palabras claras. Última actualización: 8 de septiembre de 2026.
          </p>
        }
      />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <form method="get" action="/noticias" aria-label="Filtrar noticias" className="mt-4 flex flex-wrap gap-3 rounded border bg-card p-4">
          <p>
            <label htmlFor="n-q" className="font-bold">Buscar: </label>
            <input id="n-q" name="q" type="search" defaultValue={q} className="rounded border px-2 py-2" />
          </p>
          <p>
            <label htmlFor="n-cat" className="font-bold">Tema: </label>
            <select id="n-cat" name="categoria" defaultValue={cat} className="rounded border px-2 py-2">
              <option value="">Todas</option>
              {CATEGORIAS_NOTICIA.map((c) => (<option key={c} value={c}>{ETIQUETAS_CATEGORIA_NOTICIA[c]}</option>))}
            </select>
          </p>
          <button type="submit" className="flex items-center gap-2 rounded bg-primary px-4 py-2 font-bold text-white">
            <Search aria-hidden="true" size={16} /> Aplicar filtros
          </button>
          <a href="/noticias" className="rounded border-2 border-primary px-4 py-2 font-bold text-primary">Limpiar filtros</a>
        </form>
        <p className="mt-3 text-lg" role="status"><strong>{filtradas.length}</strong> noticias.</p>
        {filtradas.length === 0 ? (
          <div className="mt-4"><EmptyState titulo="No hay noticias con esos filtros" descripcion="Prueba a quitar el filtro de tema o a buscar con otras palabras." mostrarFrecuentes={false} /></div>
        ) : (
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {filtradas.map((n) => (<li key={n.id}><NoticiaCard noticia={n} /></li>))}
          </ul>
        )}
      </div>
    </>
  );
}
