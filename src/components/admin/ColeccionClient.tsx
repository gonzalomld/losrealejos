"use client";

import { useMemo, useState } from "react";
import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable, AdminToolbar, type ColumnaTabla, type FiltroAdmin } from "@/components/admin/AdminTable";
import { EstadoBadge } from "@/components/admin/EstadoBadge";
import { PropietarioTag } from "@/components/admin/PropietarioTag";
import { EditorModal } from "@/components/admin/editor/EditorModal";
import { getArea } from "@/data/areas";
import { ETIQUETAS_TEMA, ETIQUETAS_CANAL } from "@/data/vocabularios";
import type { DefColeccion, DefColumna, DefFiltro } from "@/lib/cms/definiciones";
import { leerRuta, tituloDeContenido } from "@/lib/cms/definiciones";
import type { EstadoContenido, RegistroEditorial } from "@/lib/cms/tipos-editoriales";
import { necesitaAtencion, superaPeriodicidad } from "@/lib/cms/visibilidad";
import { motivoDenegacion, useRol, type Accion } from "@/lib/roles/contexto";
import { TriangleAlert } from "lucide-react";

type Reg = RegistroEditorial<Record<string, unknown>>;

/**
 * Listado genérico dirigido por definición (Bloque 2).
 * Buscador, filtros en píldoras, tabla y recuento salen de DefColeccion.
 * Añadir una colección = crear su fichero de definición. Sin tocar este archivo.
 */
export function ColeccionClient({ definicion, iniciales }: { definicion: DefColeccion; iniciales: Reg[] }) {
  const { rol, usuario, puede } = useRol();
  const [busqueda, setBusqueda] = useState("");
  const [f, setF] = useState<Record<string, string>>({});
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);
  const [editando, setEditando] = useState<Reg | null>(null);
  const areaDeFiltro = f["area"] ?? "";

  const visibles = useMemo(() => {
    let lista = iniciales;
    if (rol === "editor" && usuario.areaId) lista = lista.filter((r) => r.areaId === usuario.areaId);
    const q = busqueda.trim().toLowerCase();
    return lista.filter((r) => {
      const c = r.contenido;
      if (q) {
        const titulo = tituloDeContenido(c, definicion.tituloRutas, r.id).toLowerCase();
        if (!titulo.includes(q) && !r.id.toLowerCase().includes(q)) return false;
      }
      for (const filtro of definicion.filtros) {
        const v = f[filtro.id];
        if (!v) continue;
        if (filtro.tipo === "estado") {
          if (r.estado !== v) return false;
        } else if (filtro.tipo === "necesita_atencion") {
          if (!necesitaAtencion(r)) return false;
        } else if (filtro.tipo === "vocabulario" && filtro.tipo === "vocabulario") {
          const val = leerRuta(c, (filtro as { ruta: string }).ruta);
          if (Array.isArray(val)) { if (!val.includes(v)) return false; }
          else if (String(val ?? "") !== v) return false;
        }
        // texto_libre (categoría, bloque, formato): filtrado por coincidencia en ruta o título
        if (filtro.tipo === "texto_libre") {
          const rutas = ["categoria", "bloque", "formato", "tipo"];
          const hay = rutas.some((rt) => String(leerRuta(c, rt) ?? "").toLowerCase().includes(v.toLowerCase()));
          if (!hay) return false;
        }
      }
      return true;
    });
  }, [iniciales, busqueda, f, definicion, rol, usuario]);

  const total = visibles.length;
  const filas = visibles.slice((pagina - 1) * porPagina, pagina * porPagina);

  const filtrosUI: FiltroAdmin[] = useMemo(
    () =>
      definicion.filtros.map((fl: DefFiltro) => {
        if (fl.tipo === "estado") {
          return {
            id: fl.id, etiqueta: fl.etiqueta, valor: f[fl.id] ?? "",
            opciones: (["borrador", "en_revision", "publicado", "programado", "caducado", "archivado"] as const).map((e) => ({ valor: e, etiqueta: e })),
            onCambio: (v: string) => { setF((s) => ({ ...s, [fl.id]: v })); setPagina(1); },
          };
        }
        if (fl.tipo === "necesita_atencion") {
          return {
            id: fl.id, etiqueta: fl.etiqueta, valor: f[fl.id] ?? "",
            opciones: [{ valor: "si", etiqueta: "Solo lo que necesita atención" }],
            onCambio: (v: string) => { setF((s) => ({ ...s, [fl.id]: v })); setPagina(1); },
          };
        }
        if (fl.tipo === "vocabulario") {
          const voc = (fl as { vocabulario: { tipo: string } }).vocabulario;
          let opciones: { valor: string; etiqueta: string }[] = [];
          if (voc.tipo === "areas") {
            opciones = [...new Set(iniciales.map((r) => r.areaId))].map((id) => ({ valor: id, etiqueta: getArea(id)?.nombre ?? id }));
          } else if (voc.tipo === "temas") {
            opciones = Object.entries(ETIQUETAS_TEMA).map(([valor, etiqueta]) => ({ valor, etiqueta }));
          } else if (voc.tipo === "canales") {
            opciones = Object.entries(ETIQUETAS_CANAL).map(([valor, etiqueta]) => ({ valor, etiqueta }));
          } else if ("opciones" in voc) {
            opciones = (voc as { opciones: { valor: string; etiqueta: string }[] }).opciones;
          }
          return {
            id: fl.id, etiqueta: fl.etiqueta, valor: f[fl.id] ?? "", opciones,
            onCambio: (v: string) => { setF((s) => ({ ...s, [fl.id]: v })); setPagina(1); },
          };
        }
        // texto_libre: opciones derivadas de los valores presentes
        const rutas = ["categoria", "bloque", "formato", "tipo"];
        const vals = new Set<string>();
        for (const r of iniciales) {
          for (const rt of rutas) {
            const v = leerRuta(r.contenido, rt);
            if (typeof v === "string" && v) vals.add(v);
          }
        }
        return {
          id: fl.id, etiqueta: fl.etiqueta, valor: f[fl.id] ?? "",
          opciones: [...vals].sort().map((v) => ({ valor: v, etiqueta: v })),
          onCambio: (v: string) => { setF((s) => ({ ...s, [fl.id]: v })); setPagina(1); },
        };
      }),
    [definicion, f, iniciales],
  );

  const columnas: ColumnaTabla<Reg>[] = useMemo(
    () =>
      definicion.columnas.map((col: DefColumna): ColumnaTabla<Reg> => {
        if (col.tipo === "titulo") {
          return {
            id: col.id, encabezado: col.encabezado,
            render: (r) => (
              <span>
                <button
                  type="button"
                  onClick={() => setEditando(r)}
                  disabled={!puede("editar" as Accion, definicion.coleccion, r)}
                  title={!puede("editar" as Accion, definicion.coleccion, r) ? motivoDenegacion(rol, "editar") : undefined}
                  className="text-left font-semibold text-primary underline disabled:no-underline disabled:opacity-70"
                >
                  {tituloDeContenido(r.contenido, definicion.tituloRutas, r.id)}
                </button>
                {col.subtituloRuta && (
                  <span className="block max-w-64 truncate text-xs text-neutral-500">
                    {String(leerRuta(r.contenido, col.subtituloRuta) ?? "")}
                  </span>
                )}
              </span>
            ),
          };
        }
        if (col.tipo === "estado") {
          return { id: col.id, encabezado: col.encabezado, render: (r) => <EstadoBadge estado={r.estado as EstadoContenido} /> };
        }
        if (col.tipo === "propietario") {
          return { id: col.id, encabezado: col.encabezado, render: (r) => <PropietarioTag areaId={r.areaId} /> };
        }
        if (col.tipo === "revision") {
          return {
            id: col.id, encabezado: col.encabezado,
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
          };
        }
        // fecha | texto por ruta
        const ruta = (col as { ruta: string }).ruta;
        return {
          id: col.id, encabezado: col.encabezado,
          render: (r) => <span className="whitespace-nowrap text-xs">{String(leerRuta(r.contenido, ruta) ?? "—").slice(0, 10)}</span>,
        };
      }),
    [definicion, puede, rol],
  );

  const puedeCrear = puede("crear" as Accion, definicion.coleccion);
  const [creando, setCreando] = useState(false);
  const [nuevoId, setNuevoId] = useState("");
  const [errorCrear, setErrorCrear] = useState<string | null>(null);

  /** Contenido mínimo por colección: respeta los tipos del front. */
  function contenidoInicial(id: string, area: string): Record<string, unknown> {
    const hoy = new Date().toISOString().slice(0, 10);
    const base: Record<string, Record<string, unknown>> = {
      tramites: {
        id, tituloClaro: "Nuevo trámite (título provisional)", tituloOficial: "",
        resumen: { queEs: "", queNecesito: "", dondeSeHace: "" }, descripcion: "",
        requisitos: [], documentacion: [], canales: ["presencial"], comoSeHace: [],
        identificacion: "", plazoResolucion: "", silencio: "", tasa: "", tasaGratuita: true,
        normativa: [], sedeUrl: "", areaId: area, tema: "atencion-ciudadana", temasSecundarios: [],
        presencial: { nombre: "", direccion: "", telefono: "" }, perfiles: ["ciudadano"],
        plazoAbierto: false, fechaActualizacion: hoy, relacionados: [],
      },
    };
    if (base[definicion.coleccion]) return base[definicion.coleccion];
    return { id, areaId: area, fechaActualizacion: hoy, titulo: "Nuevo contenido (título provisional)", descripcion: "" };
  }

  async function crear() {
    setErrorCrear(null);
    const id = nuevoId.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
    if (!id) { setErrorCrear("Escribe un identificador, p. ej. «contenido-nuevo»."); return; }
    const area = rol === "editor" && usuario.areaId ? usuario.areaId : areaDeFiltro || "atencion-ciudadana";
    const { accionCrear } = await import("@/lib/cms/acciones");
    const r = await accionCrear(definicion.coleccion as never, id, contenidoInicial(id, area), area, usuario.nombre);
    if (!r.ok) { setErrorCrear(r.error); return; }
    window.location.reload();
  }

  return (
    <AdminContenido>
      <AdminPageHeader
        titulo={definicion.titulo}
        descripcion={definicion.descripcion}
        acciones={
          definicion.hrefNuevo
            ? [{ etiqueta: creando ? "Cancelar creación" : `Nuevo (${definicion.tituloTipo.toLowerCase()})`, principal: true, onClick: () => setCreando((c) => !c), deshabilitada: !puedeCrear, motivo: !puedeCrear ? motivoDenegacion(rol, "crear") : undefined }]
            : []
        }
      />
      {creando && puedeCrear && (
        <div className="rounded-lg border border-neutral-200 p-3">
          <label htmlFor={`nuevo-id-${definicion.coleccion}`} className="block text-xs font-semibold">
            Identificador (minúsculas y guiones, p. ej. «contenido-nuevo»)
            <input
              id={`nuevo-id-${definicion.coleccion}`}
              value={nuevoId}
              onChange={(e) => setNuevoId(e.target.value)}
              className="mt-1 min-h-[44px] w-full max-w-md rounded-md border border-neutral-300 px-2 text-sm"
              placeholder="contenido-nuevo"
            />
          </label>
          {errorCrear && <p role="alert" className="mt-1 text-sm font-semibold text-red-800">{errorCrear}</p>}
          <button
            type="button"
            onClick={crear}
            className="mt-2 inline-flex min-h-[44px] items-center rounded-md bg-primary px-4 text-sm font-bold text-white"
          >
            Crear en borrador
          </button>
        </div>
      )}
      {rol === "editor" && (
        <p className="rounded-md bg-blue-50 p-2 text-sm text-blue-900">
          Ves solo los contenidos de tu área ({getArea(usuario.areaId ?? "")?.nombre}). Los listados no muestran los de otras áreas.
        </p>
      )}
      <AdminToolbar busqueda={busqueda} onBusqueda={(v) => { setBusqueda(v); setPagina(1); }} filtros={filtrosUI} />
      <AdminTable
        columnas={columnas}
        filas={filas}
        claveDe={(r) => r.id}
        total={total}
        pagina={pagina}
        porPagina={porPagina}
        onPagina={setPagina}
        onPorPagina={setPorPagina}
        onPrevisualizar={(r) => window.open(`/vista-previa/${definicion.coleccion}/${r.id}`, "_blank", "noopener")}
        accionesDe={(r) => [
          { etiqueta: "Editar", onClick: () => setEditando(r), deshabilitada: !puede("editar" as Accion, definicion.coleccion, r), motivo: motivoDenegacion(rol, "editar") },
          { etiqueta: "Ver historial", onClick: () => setEditando(r) },
        ]}
      />
      {editando && (
        <EditorModal
          definicion={definicion}
          registro={editando}
          alCerrar={() => setEditando(null)}
          alGuardar={() => window.location.reload()}
        />
      )}
    </AdminContenido>
  );
}
