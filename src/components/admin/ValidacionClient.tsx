"use client";

import { useState } from "react";
import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable, type ColumnaTabla } from "@/components/admin/AdminTable";
import { EstadoBadge } from "@/components/admin/EstadoBadge";
import { PropietarioTag } from "@/components/admin/PropietarioTag";
import { ETIQUETAS_COLECCION, type RegistroEditorial } from "@/lib/cms/tipos-editoriales";
import { motivoDenegacion, useRol, type Accion } from "@/lib/roles/contexto";
import { accionCambiarEstado } from "@/lib/cms/acciones";

export function ValidacionClient({ iniciales }: { iniciales: RegistroEditorial<Record<string, unknown>>[] }) {
  const { rol, usuario, puede } = useRol();
  const [filas, setFilas] = useState(iniciales.filter((r) => r.estado === "en_revision"));
  const [comentario, setComentario] = useState<Record<string, string>>({});
  const [comparando, setComparando] = useState<RegistroEditorial<Record<string, unknown>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pagina, setPagina] = useState(1);
  const puedeAprobar = puede("aprobar" as Accion, "validacion");

  async function aprobar(r: RegistroEditorial<Record<string, unknown>>) {
    const res = await accionCambiarEstado(r.coleccion as never, r.id, "publicado", usuario.nombre, "Aprobado en validación");
    if (!res.ok) setError(res.error);
    else setFilas((f) => f.filter((x) => x.id !== r.id));
  }

  async function devolver(r: RegistroEditorial<Record<string, unknown>>) {
    const c = (comentario[r.id] ?? "").trim();
    if (!c) { setError("Para devolver hay que escribir un comentario."); return; }
    const res = await accionCambiarEstado(r.coleccion as never, r.id, "borrador", usuario.nombre, c);
    if (!res.ok) setError(res.error);
    else setFilas((f) => f.filter((x) => x.id !== r.id));
  }

  const columnas: ColumnaTabla<RegistroEditorial<Record<string, unknown>>>[] = [
    {
      id: "titulo", encabezado: "Contenido",
      render: (r) => (
        <span>
          <span className="font-semibold">{String(r.contenido["tituloClaro"] ?? r.contenido["titulo"] ?? r.contenido["titular"] ?? r.id)}</span>
          <span className="block text-xs text-neutral-500">{ETIQUETAS_COLECCION[r.coleccion]} · v{r.versiones.length}</span>
        </span>
      ),
    },
    { id: "area", encabezado: "Área", render: (r) => <PropietarioTag areaId={r.areaId} /> },
    {
      id: "envio", encabezado: "Enviado por",
      render: (r) => <span className="text-xs">{r.enviadoPor ?? "—"}<span className="block text-neutral-500">{r.fechaEnvio ?? ""}</span></span>,
    },
    { id: "estado", encabezado: "Estado", render: (r) => <EstadoBadge estado={r.estado} /> },
  ];

  return (
    <AdminContenido>
      <AdminPageHeader
        titulo="Flujo de validación"
        descripcion="Cola de lo pendiente de revisar: quién lo envió, cuándo y de qué área. Nada se publica sin pasar por aquí."
      />
      {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm font-semibold text-red-900">{error}</p>}
      {!puedeAprobar && (
        <p className="rounded-md bg-amber-50 p-2 text-sm text-amber-900">{motivoDenegacion(rol, "aprobar")} Puedes ver la cola, pero no aprobar ni devolver.</p>
      )}
      <AdminTable
        columnas={columnas}
        filas={filas.slice((pagina - 1) * 10, pagina * 10)}
        claveDe={(r) => `${r.coleccion}/${r.id}`}
        total={filas.length}
        pagina={pagina}
        porPagina={10}
        onPagina={setPagina}
        onPorPagina={() => {}}
        accionesDe={(r) => [
          { etiqueta: "Comparar con versión anterior", onClick: () => setComparando(r) },
          { etiqueta: "Aprobar y publicar", onClick: () => aprobar(r), deshabilitada: !puedeAprobar, motivo: motivoDenegacion(rol, "aprobar") },
          { etiqueta: "Devolver con comentario", onClick: () => devolver(r), deshabilitada: !puedeAprobar, motivo: motivoDenegacion(rol, "aprobar") },
        ]}
      />
      <section aria-label="Comentario de devolución" className="rounded-lg border border-neutral-200 p-4">
        <h2 className="text-sm font-bold">Comentario de devolución (obligatorio para devolver)</h2>
        {filas.map((r) => (
          <label key={r.id} className="mt-2 block text-xs font-semibold">{String(r.contenido["tituloClaro"] ?? r.id)}
            <textarea
              value={comentario[r.id] ?? ""}
              onChange={(e) => setComentario((c) => ({ ...c, [r.id]: e.target.value }))}
              rows={2}
              className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-2 text-sm"
              placeholder="Qué hay que corregir antes de publicar…"
            />
          </label>
        ))}
      </section>
      {comparando && (
        <Comparador versiones={comparando.versiones} alCerrar={() => setComparando(null)} />
      )}
    </AdminContenido>
  );
}

/** Comparación: lista de campos modificados + enlace a previsualizar la versión anterior. */
function Comparador({ versiones, alCerrar }: { versiones: RegistroEditorial<Record<string, unknown>>["versiones"]; alCerrar: () => void }) {
  const actual = versiones[versiones.length - 1];
  const anterior = versiones[versiones.length - 2];
  const cambiados: string[] = [];
  if (anterior) {
    const claves = new Set([...Object.keys(anterior.contenido), ...Object.keys(actual.contenido)]);
    for (const k of claves) {
      if (JSON.stringify((anterior.contenido as object as Record<string, unknown>)[k]) !== JSON.stringify((actual.contenido as object as Record<string, unknown>)[k])) cambiados.push(k);
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true" aria-labelledby="comp-titulo">
      <div className="max-h-[80vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-5">
        <h2 id="comp-titulo" className="text-lg font-bold">Comparación de versiones</h2>
        {!anterior ? (
          <p className="mt-2 text-sm">Solo hay una versión: no hay nada que comparar.</p>
        ) : (
          <>
            <p className="mt-2 text-sm">v{anterior.n} ({anterior.fecha}, {anterior.autor}) → v{actual.n} ({actual.fecha}, {actual.autor})</p>
            <h3 className="mt-3 text-sm font-bold">Campos modificados ({cambiados.length})</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
              {cambiados.map((c) => (<li key={c}><code>{c}</code></li>))}
            </ul>
            <p className="mt-3 text-sm">La comparación visual se hace previsualizando la versión anterior con la misma ruta de previsualización.</p>
          </>
        )}
        <div className="mt-4 flex justify-end">
          <button type="button" onClick={alCerrar} className="min-h-[44px] rounded-md bg-neutral-200 px-4 text-sm font-semibold">Cerrar</button>
        </div>
      </div>
    </div>
  );
}
