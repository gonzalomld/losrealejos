"use client";

import { useMemo, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable, AdminToolbar, type ColumnaTabla } from "@/components/admin/AdminTable";
import { EstadoBadge } from "@/components/admin/EstadoBadge";
import { PropietarioTag } from "@/components/admin/PropietarioTag";
import { EditorModal } from "@/components/admin/editor/EditorModal";
import { ETIQUETAS_TEMA, ETIQUETAS_CANAL } from "@/data/vocabularios";
import { getArea } from "@/data/areas";
import type { EstadoContenido, RegistroEditorial } from "@/lib/cms/tipos-editoriales";
import { necesitaAtencion, superaPeriodicidad } from "@/lib/cms/visibilidad";
import { motivoDenegacion, useRol, type Accion } from "@/lib/roles/contexto";

/** Pantalla ejemplar: listado configurable + editor completo. El resto de colecciones derivan de este patrón. */
export function TramitesClient({ iniciales }: { iniciales: RegistroEditorial<Record<string, unknown>>[] }) {
  const { rol, usuario, puede } = useRol();
  const [busqueda, setBusqueda] = useState("");
  const [fArea, setFArea] = useState("");
  const [fTema, setFTema] = useState("");
  const [fCanal, setFCanal] = useState("");
  const [fEstado, setFEstado] = useState("");
  const [fAtencion, setFAtencion] = useState("");
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);
  const [editando, setEditando] = useState<RegistroEditorial<Record<string, unknown>> | null>(null);

  // Editor de área: solo ve contenidos de su área.
  const visibles = useMemo(() => {
    let lista = iniciales;
    if (rol === "editor" && usuario.areaId) lista = lista.filter((r) => r.areaId === usuario.areaId);
    const q = busqueda.trim().toLowerCase();
    return lista.filter((r) => {
      const c = r.contenido;
      const titulo = String(c["tituloClaro"] ?? c["titulo"] ?? "");
      if (q && !titulo.toLowerCase().includes(q) && !r.id.includes(q)) return false;
      if (fArea && r.areaId !== fArea) return false;
      if (fTema && String(c["tema"] ?? "") !== fTema) return false;
      if (fCanal && !(c["canales"] as string[] ?? []).includes(fCanal)) return false;
      if (fEstado && r.estado !== fEstado) return false;
      if (fAtencion === "si" && !necesitaAtencion(r)) return false;
      return true;
    });
  }, [iniciales, busqueda, fArea, fTema, fCanal, fEstado, fAtencion, rol, usuario]);

  const total = visibles.length;
  const filas = visibles.slice((pagina - 1) * porPagina, pagina * porPagina);

  const areas = useMemo(() => {
    const ids = new Set(iniciales.map((r) => r.areaId));
    return [...ids].map((id) => ({ valor: id, etiqueta: getArea(id)?.nombre ?? id }));
  }, [iniciales]);

  const columnas: ColumnaTabla<RegistroEditorial<Record<string, unknown>>>[] = [
    {
      id: "titulo", encabezado: "Título",
      render: (r) => (
        <span>
          <button type="button" onClick={() => setEditando(r)} className="text-left font-semibold text-primary underline">
            {String(r.contenido["tituloClaro"] ?? r.id)}
          </button>
          <span className="block max-w-64 truncate text-xs text-neutral-500">{String(r.contenido["tituloOficial"] ?? "")}</span>
        </span>
      ),
    },
    { id: "estado", encabezado: "Estado", render: (r) => <EstadoBadge estado={r.estado as EstadoContenido} /> },
    { id: "propietario", encabezado: "Propietario", render: (r) => <PropietarioTag areaId={r.areaId} /> },
    {
      id: "revision", encabezado: "Última revisión",
      render: (r) => {
        const mal = superaPeriodicidad(r);
        return (
          <span className="whitespace-nowrap text-xs">
            {r.ultimaRevision} · cada {r.periodicidadMeses} m.
            {mal && (
              <span className="mt-0.5 flex items-center gap-1 font-bold text-red-800">
                <TriangleAlert aria-hidden="true" size={13} /> Revisión superada
              </span>
            )}
          </span>
        );
      },
    },
  ];

  const puedeCrear = puede("crear" as Accion, "tramites");

  return (
    <AdminContenido>
      <AdminPageHeader
        titulo="Trámites"
        descripcion="La colección más importante. Fecha de última revisión siempre visible; indicador cuando supera su periodicidad acordada."
        acciones={[
          { etiqueta: "Nuevo trámite", principal: true, deshabilitada: !puedeCrear, motivo: !puedeCrear ? motivoDenegacion(rol, "crear") : undefined },
        ]}
      />
      {rol === "editor" && (
        <p className="rounded-md bg-blue-50 p-2 text-sm text-blue-900">
          Ves solo los contenidos de tu área ({getArea(usuario.areaId ?? "")?.nombre}). Los listados no muestran los de otras áreas.
        </p>
      )}
      <AdminToolbar
        busqueda={busqueda}
        onBusqueda={(v) => { setBusqueda(v); setPagina(1); }}
        filtros={[
          { id: "area", etiqueta: "Área", opciones: areas, valor: fArea, onCambio: (v) => { setFArea(v); setPagina(1); } },
          { id: "tema", etiqueta: "Tema", opciones: Object.entries(ETIQUETAS_TEMA).map(([valor, etiqueta]) => ({ valor, etiqueta })), valor: fTema, onCambio: (v) => { setFTema(v); setPagina(1); } },
          { id: "canal", etiqueta: "Canal", opciones: Object.entries(ETIQUETAS_CANAL).map(([valor, etiqueta]) => ({ valor, etiqueta })), valor: fCanal, onCambio: (v) => { setFCanal(v); setPagina(1); } },
          { id: "estado", etiqueta: "Estado", opciones: (["borrador", "en_revision", "publicado", "programado", "caducado", "archivado"] as const).map((e) => ({ valor: e, etiqueta: e })), valor: fEstado, onCambio: (v) => { setFEstado(v); setPagina(1); } },
          { id: "atencion", etiqueta: "Necesita atención", opciones: [{ valor: "si", etiqueta: "Solo lo que necesita atención" }], valor: fAtencion, onCambio: (v) => { setFAtencion(v); setPagina(1); } },
        ]}
      />
      <AdminTable
        columnas={columnas}
        filas={filas}
        claveDe={(r) => r.id}
        total={total}
        pagina={pagina}
        porPagina={porPagina}
        onPagina={setPagina}
        onPorPagina={setPorPagina}
        onPrevisualizar={(r) => window.open(`/vista-previa/tramites/${r.id}`, "_blank", "noopener")}
        accionesDe={(r) => [
          { etiqueta: "Editar", onClick: () => setEditando(r), deshabilitada: !puede("editar" as Accion, "tramites", r), motivo: motivoDenegacion(rol, "editar") },
          { etiqueta: "Ver historial", onClick: () => setEditando(r) },
        ]}
      />
      {editando && (
        <EditorModal
          tituloTipo="Trámite"
          registro={editando}
          coleccion="tramites"
          camposLecturaFacil={editando.contenido["resumen"] as { queEs: string; queNecesito: string; dondeSeHace: string } | undefined}
          alCerrar={() => setEditando(null)}
          alGuardar={() => window.location.reload()}
        />
      )}
    </AdminContenido>
  );
}
