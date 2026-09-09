"use client";

import { useState } from "react";
import { ChevronDown, Eye, MoreHorizontal, Search } from "lucide-react";

export type OpcionFiltro = { valor: string; etiqueta: string };
export type FiltroAdmin = {
  id: string;
  etiqueta: string;
  opciones: OpcionFiltro[];
  valor: string;
  onCambio: (v: string) => void;
};

export function AdminToolbar({
  busqueda,
  onBusqueda,
  filtros,
}: {
  busqueda: string;
  onBusqueda: (v: string) => void;
  filtros: FiltroAdmin[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-64 flex-1">
        <Search aria-hidden="true" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <label htmlFor="busqueda-admin" className="sr-only">Buscar en el listado</label>
        <input
          id="busqueda-admin"
          type="search"
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          placeholder="Buscar por título…"
          className="min-h-[44px] w-full rounded-md border border-neutral-300 bg-white pl-9 pr-3 text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtros del listado">
        {filtros.map((f) => (
          <PildoraFiltro key={f.id} filtro={f} />
        ))}
      </div>
    </div>
  );
}

function PildoraFiltro({ filtro }: { filtro: FiltroAdmin }) {
  const [abierto, setAbierto] = useState(false);
  const activa = filtro.valor !== "";
  const etiquetaActiva = filtro.opciones.find((o) => o.valor === filtro.valor)?.etiqueta;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
        aria-expanded={abierto}
        aria-label={`Filtro ${filtro.etiqueta}${etiquetaActiva ? `: ${etiquetaActiva}` : ""}`}
        className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-3 text-sm font-medium ${activa ? "border-primary bg-blue-50 text-primary" : "border-neutral-300 bg-white text-neutral-700"}`}
      >
        {activa ? etiquetaActiva : filtro.etiqueta}
        <ChevronDown aria-hidden="true" size={14} className={abierto ? "rotate-180" : ""} />
      </button>
      {abierto && (
        <>
          <button type="button" aria-hidden="true" tabIndex={-1} onClick={() => setAbierto(false)} className="fixed inset-0 z-10 cursor-default bg-transparent" />
          <ul role="listbox" aria-label={filtro.etiqueta} className="absolute right-0 z-20 mt-1 max-h-64 min-w-52 overflow-auto rounded-md border border-neutral-200 bg-white p-1 shadow-lg">
            <li role="option" aria-selected={filtro.valor === ""}>
              <button
                type="button"
                onClick={() => { filtro.onCambio(""); setAbierto(false); }}
                className="flex min-h-[44px] w-full items-center rounded px-2 text-left text-sm hover:bg-neutral-100"
              >
                Todos
              </button>
            </li>
            {filtro.opciones.map((o) => (
              <li key={o.valor} role="option" aria-selected={filtro.valor === o.valor}>
                <button
                  type="button"
                  onClick={() => { filtro.onCambio(o.valor); setAbierto(false); }}
                  className={`flex min-h-[44px] w-full items-center rounded px-2 text-left text-sm hover:bg-neutral-100 ${filtro.valor === o.valor ? "font-bold text-primary" : ""}`}
                >
                  {o.etiqueta}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export type ColumnaTabla<T> = {
  id: string;
  encabezado: string;
  render: (fila: T) => React.ReactNode;
  clase?: string;
};

export type AccionFila = { etiqueta: string; onClick: () => void; deshabilitada?: boolean; motivo?: string };

/** Tabla de listados: encabezados en mayúsculas pequeñas, pie con recuento. */
export function AdminTable<T>({
  columnas,
  filas,
  claveDe,
  onPrevisualizar,
  accionesDe,
  total,
  pagina,
  porPagina,
  onPagina,
  onPorPagina,
}: {
  columnas: ColumnaTabla<T>[];
  filas: T[];
  claveDe: (f: T) => string;
  onPrevisualizar?: (f: T) => void;
  accionesDe?: (f: T) => AccionFila[];
  total: number;
  pagina: number;
  porPagina: number;
  onPagina: (p: number) => void;
  onPorPagina: (n: number) => void;
}) {
  const desde = total === 0 ? 0 : (pagina - 1) * porPagina + 1;
  const hasta = Math.min(total, pagina * porPagina);
  const paginas = Math.max(1, Math.ceil(total / porPagina));
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              {columnas.map((c) => (
                <th key={c.id} scope="col" className={`px-3 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500 ${c.clase ?? ""}`}>
                  {c.encabezado}
                </th>
              ))}
              <th scope="col" className="px-3 py-2 text-right text-xs font-bold uppercase tracking-wide text-neutral-500">
                <span className="sr-only">Acciones</span>Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => {
              const acciones = accionesDe ? accionesDe(f) : [];
              return (
                <tr key={claveDe(f)} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
                  {columnas.map((c) => (
                    <td key={c.id} className={`px-3 py-2 align-top ${c.clase ?? ""}`}>{c.render(f)}</td>
                  ))}
                  <td className="px-3 py-2 text-right">
                    <span className="inline-flex items-center gap-1">
                      {onPrevisualizar && (
                        <button
                          type="button"
                          onClick={() => onPrevisualizar(f)}
                          aria-label="Vista previa en el portal"
                          title="Vista previa en el portal"
                          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100"
                        >
                          <Eye aria-hidden="true" size={16} />
                        </button>
                      )}
                      {acciones.length > 0 && <MenuFila acciones={acciones} />}
                    </span>
                  </td>
                </tr>
              );
            })}
            {filas.length === 0 && (
              <tr>
                <td colSpan={columnas.length + 1} className="px-3 py-8 text-center text-sm text-neutral-500">
                  Sin resultados con los filtros actuales.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-600">
        <p aria-live="polite">{desde}–{hasta} de {total}</p>
        <div className="flex items-center gap-2">
          <label htmlFor="por-pagina">Por página</label>
          <select
            id="por-pagina"
            value={porPagina}
            onChange={(e) => { onPorPagina(Number(e.target.value)); onPagina(1); }}
            className="min-h-[44px] rounded-md border border-neutral-300 bg-white px-2"
          >
            {[10, 20, 50].map((n) => (<option key={n} value={n}>{n}</option>))}
          </select>
          <button type="button" disabled={pagina <= 1} onClick={() => onPagina(pagina - 1)} className="min-h-[44px] rounded-md border border-neutral-300 bg-white px-3 disabled:opacity-50" aria-label="Página anterior">‹</button>
          <span aria-current="page">Página {pagina} de {paginas}</span>
          <button type="button" disabled={pagina >= paginas} onClick={() => onPagina(pagina + 1)} className="min-h-[44px] rounded-md border border-neutral-300 bg-white px-3 disabled:opacity-50" aria-label="Página siguiente">›</button>
        </div>
      </div>
    </div>
  );
}

function MenuFila({ acciones }: { acciones: AccionFila[] }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
        aria-expanded={abierto}
        aria-label="Más acciones"
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100"
      >
        <MoreHorizontal aria-hidden="true" size={16} />
      </button>
      {abierto && (
        <>
          <button type="button" aria-hidden="true" tabIndex={-1} onClick={() => setAbierto(false)} className="fixed inset-0 z-10 cursor-default bg-transparent" />
          <span className="absolute right-0 z-20 mt-1 block min-w-52 overflow-hidden rounded-md border border-neutral-200 bg-white py-1 shadow-lg">
            {acciones.map((a) => (
              <button
                key={a.etiqueta}
                type="button"
                onClick={() => { if (!a.deshabilitada) { setAbierto(false); a.onClick(); } }}
                disabled={a.deshabilitada}
                aria-disabled={a.deshabilitada || undefined}
                title={a.deshabilitada ? a.motivo : undefined}
                aria-label={a.deshabilitada && a.motivo ? `${a.etiqueta}. ${a.motivo}` : undefined}
                className="flex min-h-[44px] w-full items-center px-3 text-left text-sm text-neutral-800 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {a.etiqueta}
              </button>
            ))}
          </span>
        </>
      )}
    </span>
  );
}
