import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { EmptyState } from "@/components/sitio/EmptyState";
import { buscarTodo } from "@/lib/busqueda";
import { formatearFechaES } from "@/lib/formato";
import { ETIQUETAS_TIPO, ETIQUETAS_TEMA, TEMAS } from "@/data/vocabularios";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Busca trámites, noticias, eventos, documentos y servicios del Ayuntamiento de Los Realejos.",
};

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const tipo = typeof sp.tipo === "string" ? sp.tipo : "";
  const tema = typeof sp.tema === "string" ? sp.tema : "";
  const resultados = q.trim() ? await buscarTodo({ q, tipo, tema }) : [];

  return (
    <>
      <Breadcrumbs migas={[{ texto: "Buscar" }]} />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-extrabold">Resultados de búsqueda</h1>
        <form method="get" action="/buscar" role="search" aria-label="Buscar en el portal" className="mt-4 rounded border bg-card p-4">
          <label htmlFor="q-buscar" className="font-bold">
            ¿Qué buscas?
          </label>
          <div className="mt-1 flex gap-2">
            <input
              id="q-buscar"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Ejemplo: empadronarme, IBI, piscina…"
              className="w-full rounded border-2 border-primary px-4 py-3 text-base"
            />
            <button type="submit" className="flex items-center gap-2 rounded bg-primary px-5 py-3 font-bold text-white">
              <Search aria-hidden="true" size={20} />
              Buscar
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-4">
            <p>
              <label htmlFor="f-tipo" className="font-semibold">Tipo: </label>
              <select id="f-tipo" name="tipo" defaultValue={tipo} className="rounded border px-2 py-2">
                <option value="">Todos</option>
                <option value="tramite">Trámites</option>
                <option value="noticia">Noticias</option>
                <option value="documento">Documentos</option>
                <option value="evento">Eventos</option>
                <option value="servicio">Servicios</option>
                <option value="pagina">Páginas</option>
              </select>
            </p>
            <p>
              <label htmlFor="f-tema" className="font-semibold">Tema: </label>
              <select id="f-tema" name="tema" defaultValue={tema} className="rounded border px-2 py-2">
                <option value="">Todos</option>
                {TEMAS.map((t) => (
                  <option key={t} value={t}>{ETIQUETAS_TEMA[t]}</option>
                ))}
              </select>
            </p>
          </div>
        </form>

        {!q.trim() ? (
          <div className="mt-6">
            <EmptyState
              titulo="Escribe lo que buscas"
              descripcion="Prueba con palabras sencillas: empadronarme, IBI, piscina, obra, ayudas. Los trámites aparecen primero."
              mostrarFrecuentes={true}
            />
          </div>
        ) : resultados.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              titulo={`No hemos encontrado nada para «${q}»`}
              descripcion="Prueba con menos palabras o con otras parecidas. Por ejemplo, en vez de «licencia urbanística de obra menor» escribe «obra en casa». O llama y te ayudamos."
              mostrarFrecuentes={true}
            />
            <p className="mt-3 text-center">
              <a href="/mapa-del-sitio" className="font-bold text-primary underline">Ver el mapa del sitio con todas las páginas</a>
            </p>
          </div>
        ) : (
          <>
            <p className="mt-4 text-lg" role="status">
              <strong>{resultados.length}</strong> resultados para «<strong>{q}</strong>». Los trámites y
              documentos oficiales aparecen primero.
            </p>
            <ul className="mt-4 grid gap-3">
              {resultados.map((r) => (
                <li key={`${r.tipo}-${r.href}`} className="rounded border bg-card p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-primary">
                    {ETIQUETAS_TIPO[r.tipo]}
                    {r.tema ? ` · ${ETIQUETAS_TEMA[r.tema]}` : ""} · {formatearFechaES(r.fecha)}
                  </p>
                  <h2 className="mt-1 text-xl font-bold">
                    <a href={r.href} className="underline-offset-4 hover:underline">{r.titulo}</a>
                  </h2>
                  <p className="mt-1 text-base text-muted-foreground">{r.descripcion}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
