import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { EventoCard } from "@/components/sitio/EventoCard";
import { EmptyState } from "@/components/sitio/EmptyState";
import { EVENTOS, CATEGORIAS_EVENTO, ETIQUETAS_CATEGORIA_EVENTO, LUGARES_EVENTO } from "@/data/eventos";
import { formatearFechaES } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Agenda de eventos",
  description:
    "Agenda del Ayuntamiento de Los Realejos: teatro, música, cine, fiestas y deporte, la mayoría en el Teatro Cine Realejos.",
};

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const tipo = typeof sp.tipo === "string" ? sp.tipo : "";
  const lugar = typeof sp.lugar === "string" ? sp.lugar : "";
  const vista = typeof sp.vista === "string" ? sp.vista : "lista";
  const filtrados = EVENTOS.filter(
    (e) => (!tipo || e.categoria === tipo) && (!lugar || e.lugar === lugar)
  ).sort((a, b) => (a.fechaHoraISO > b.fechaHoraISO ? 1 : -1));

  // Agrupar por día para la vista de calendario
  const porDia = new Map<string, typeof filtrados>();
  for (const e of filtrados) {
    const dia = e.fechaHoraISO.slice(0, 10);
    if (!porDia.has(dia)) porDia.set(dia, []);
    porDia.get(dia)!.push(e);
  }
  const dias = [...porDia.keys()].sort();

  return (
    <>
      <Breadcrumbs migas={[{ texto: "Actualidad", href: "/noticias" }, { texto: "Agenda" }]} />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-extrabold">Agenda de eventos</h1>
        <p className="prosa-municipal mt-2 text-lg">
          Teatro, música, fiestas y deporte. La mayoría son en el Teatro Cine Realejos, el principal
          escenario del municipio. Última actualización: 8 de septiembre de 2026.
        </p>
        <form method="get" action="/agenda" aria-label="Filtrar eventos" className="mt-4 flex flex-wrap items-end gap-3 rounded border bg-card p-4">
          <p>
            <label htmlFor="ag-tipo" className="font-bold">Tipo: </label>
            <select id="ag-tipo" name="tipo" defaultValue={tipo} className="rounded border px-2 py-2">
              <option value="">Todos</option>
              {CATEGORIAS_EVENTO.map((c) => (<option key={c} value={c}>{ETIQUETAS_CATEGORIA_EVENTO[c]}</option>))}
            </select>
          </p>
          <p>
            <label htmlFor="ag-lugar" className="font-bold">Lugar: </label>
            <select id="ag-lugar" name="lugar" defaultValue={lugar} className="rounded border px-2 py-2">
              <option value="">Todos</option>
              {LUGARES_EVENTO.map((l) => (<option key={l} value={l}>{l}</option>))}
            </select>
          </p>
          <p>
            <label htmlFor="ag-vista" className="font-bold">Ver como: </label>
            <select id="ag-vista" name="vista" defaultValue={vista} className="rounded border px-2 py-2">
              <option value="lista">Lista</option>
              <option value="calendario">Calendario por días</option>
            </select>
          </p>
          <button type="submit" className="rounded bg-primary px-4 py-2 font-bold text-white">Aplicar filtros</button>
          <a href="/agenda" className="rounded border-2 border-primary px-4 py-2 font-bold text-primary">Limpiar filtros</a>
        </form>

        <p className="mt-3 text-lg" role="status"><strong>{filtrados.length}</strong> eventos.</p>
        {filtrados.length === 0 ? (
          <div className="mt-4"><EmptyState titulo="No hay eventos con esos filtros" descripcion="Prueba a quitar algún filtro. También puedes ver las noticias del municipio." mostrarFrecuentes={false} /></div>
        ) : vista === "calendario" ? (
          <ol className="mt-3 grid gap-4">
            {dias.map((dia) => (
              <li key={dia} className="rounded border bg-card p-4">
                <h2 className="text-xl font-extrabold">{formatearFechaES(dia)}</h2>
                <ul className="mt-2 grid gap-2">
                  {(porDia.get(dia) ?? []).map((e) => (<li key={e.id}><EventoCard evento={e} /></li>))}
                </ul>
              </li>
            ))}
          </ol>
        ) : (
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {filtrados.map((e) => (<li key={e.id}><EventoCard evento={e} /></li>))}
          </ul>
        )}
      </div>
    </>
  );
}
