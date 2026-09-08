import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { TramiteCard } from "@/components/sitio/TramiteCard";
import { EmptyState } from "@/components/sitio/EmptyState";
import { TRAMITES, temasDe } from "@/data/tramites";
import { ETIQUETAS_TEMA, ETIQUETAS_PERFIL, TEMAS, PERFILES, type Tema } from "@/data/vocabularios";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Trámites y servicios",
  description:
    "Todos los trámites del Ayuntamiento de Los Realejos explicados con palabras claras: padrón, certificados, IBI, obras, piscina y más.",
};

export default async function TramitesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const tema = typeof sp.tema === "string" ? sp.tema : "";
  const perfil = typeof sp.perfil === "string" ? sp.perfil : "";
  const canal = typeof sp.canal === "string" ? sp.canal : "";

  const normalizar = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const palabras = normalizar(q.trim()).split(/\s+/).filter(Boolean);

  const filtrados = TRAMITES.filter((t) => {
    if (tema && !temasDe(t).includes(tema as Tema)) return false;
    if (perfil && !t.perfiles.includes(perfil as (typeof t.perfiles)[number])) return false;
    if (canal === "online" && !t.canales.includes("online") && !t.canales.includes("ambos")) return false;
    if (canal === "presencial" && !t.canales.includes("presencial") && !t.canales.includes("ambos")) return false;
    if (palabras.length > 0) {
      const texto = normalizar(`${t.tituloClaro} ${t.tituloOficial} ${t.descripcion}`);
      if (!palabras.every((p) => texto.includes(p))) return false;
    }
    return true;
  });

  return (
    <>
      <Breadcrumbs migas={[{ texto: "Trámites y servicios" }]} />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-extrabold">Trámites y servicios</h1>
        <p className="prosa-municipal mt-2 text-lg">
          Aquí están las {TRAMITES.length} gestiones explicadas con palabras claras. Este portal solo informa:
          el trámite se hace después en la Sede Electrónica o en persona. Última actualización del
          catálogo: 8 de septiembre de 2026.
        </p>

        <form method="get" action="/tramites" aria-label="Filtrar trámites" className="mt-4 rounded border bg-card p-4">
          <div className="flex flex-wrap gap-4">
            <p className="flex-1 min-w-52">
              <label htmlFor="q-tram" className="font-bold">Buscar: </label>
              <input id="q-tram" name="q" type="search" defaultValue={q} placeholder="Ejemplo: obra, piscina, IBI…"
                className="mt-1 w-full rounded border-2 border-primary px-3 py-2 text-base" />
            </p>
            <p>
              <label htmlFor="f-tema" className="font-bold">Tema: </label>
              <select id="f-tema" name="tema" defaultValue={tema} className="mt-1 rounded border px-2 py-2">
                <option value="">Todos los temas</option>
                {TEMAS.map((t) => (<option key={t} value={t}>{ETIQUETAS_TEMA[t]}</option>))}
              </select>
            </p>
            <p>
              <label htmlFor="f-perfil" className="font-bold">Soy: </label>
              <select id="f-perfil" name="perfil" defaultValue={perfil} className="mt-1 rounded border px-2 py-2">
                <option value="">Todo el mundo</option>
                {PERFILES.map((p) => (<option key={p} value={p}>{ETIQUETAS_PERFIL[p]}</option>))}
              </select>
            </p>
            <p>
              <label htmlFor="f-canal" className="font-bold">Cómo lo quiero hacer: </label>
              <select id="f-canal" name="canal" defaultValue={canal} className="mt-1 rounded border px-2 py-2">
                <option value="">Me da igual</option>
                <option value="online">Por internet</option>
                <option value="presencial">En persona</option>
              </select>
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="submit" className="flex items-center gap-2 rounded bg-primary px-5 py-2 font-bold text-white">
              <Search aria-hidden="true" size={18} />
              Aplicar filtros
            </button>
            <a href="/tramites" className="rounded border-2 border-primary px-5 py-2 font-bold text-primary">
              Limpiar filtros
            </a>
          </div>
        </form>

        <p className="mt-4 text-lg" role="status">
          <strong>{filtrados.length}</strong> gestiones encontradas.
        </p>
        {filtrados.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              titulo="Ninguna gestión coincide con esos filtros"
              descripcion="Prueba a quitar algún filtro o a buscar con menos palabras. O llama y te decimos qué trámite necesitas."
            />
          </div>
        ) : (
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {filtrados.map((t) => (
              <li key={t.id}>
                <TramiteCard tramite={t} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
