import { TRAMITES } from "@/data/tramites";
import { NOTICIAS } from "@/data/noticias";
import { EVENTOS } from "@/data/eventos";
import { AYUDAS } from "@/data/ayudas";
import { AVISOS } from "@/data/avisos";
import { SERVICIOS_BARRIO } from "@/data/servicios-barrio";
import { AREAS } from "@/data/areas";
import { DOCUMENTOS } from "@/data/transparencia";
import type {
  Coleccion,
  EstadoContenido,
  EstadoDatos,
  RegistroEditorial,
} from "./tipos-editoriales";

/**
 * Estado de demostración versionado en el repositorio.
 * Cada elemento de src/data se envuelve en un RegistroEditorial con estado
 * publicado y metadatos coherentes, salvo las excepciones de reparto
 * declaradas abajo (gestor con algo que enseñar: revisión, programados,
 * caducados, anonimización pendiente).
 *
 * REGLA: src/data/* no se modifica. La semilla solo envuelve.
 */

type Fuente<T> = {
  coleccion: Coleccion;
  periodoMeses: number;
  elementos: T[];
  areaDe: (e: T) => string;
  fechaDe: (e: T) => string;
};

function get<T>(obj: T, ...claves: string[]): string {
  const r = obj as Record<string, unknown>;
  for (const k of claves) if (typeof r[k] === "string" && r[k]) return r[k] as string;
  return "";
}

function envolver<T>(
  coleccion: Coleccion,
  periodoMeses: number,
  contenido: T,
  id: string,
  areaId: string,
  fecha: string,
): RegistroEditorial<T> {
  return {
    id,
    coleccion,
    contenido,
    estado: "publicado",
    pubFecha: fecha,
    validezHasta: null,
    expiraEl: null,
    periodicidadMeses: periodoMeses,
    ultimaRevision: fecha,
    areaId,
    autor: "Contenido migrado del portal",
    ultimoEditor: "Contenido migrado del portal",
    enviadoPor: null,
    fechaEnvio: null,
    revision: null,
    versiones: [{ n: 1, fecha, autor: "Contenido migrado del portal", motivo: "Migración inicial del portal público", contenido }],
    hallazgos: [],
    estadoDatos: "no_aplica",
    notaDatos: null,
  };
}

/** Mutación puntual de la semilla para repartir estados de demostración. */
function forzar<T>(reg: RegistroEditorial<T>, parche: Partial<RegistroEditorial<T>>): RegistroEditorial<T> {
  return { ...reg, ...parche };
}

export function sembrar(): RegistroEditorial<unknown>[] {
  const todos: RegistroEditorial<unknown>[] = [];

  const fuentes: Fuente<unknown>[] = [
    {
      coleccion: "tramites",
      periodoMeses: 6,
      elementos: TRAMITES as unknown[],
      areaDe: (e) => get(e, "areaId") || "atencion-ciudadana",
      fechaDe: (e) => get(e, "fechaActualizacion") || "2026-06-01",
    },
    {
      coleccion: "noticias",
      periodoMeses: 12,
      elementos: NOTICIAS as unknown[],
      areaDe: () => "protocolo",
      fechaDe: (e) => get(e, "fechaActualizacion", "fecha") || "2026-06-01",
    },
    {
      coleccion: "eventos",
      periodoMeses: 12,
      elementos: EVENTOS as unknown[],
      areaDe: () => "cultura-educacion",
      fechaDe: (e) => get(e, "fechaActualizacion") || "2026-06-01",
    },
    {
      coleccion: "ayudas",
      periodoMeses: 6,
      elementos: AYUDAS as unknown[],
      areaDe: (e) => get(e, "areaId") || "bienestar-social",
      fechaDe: (e) => get(e, "fechaActualizacion") || "2026-06-01",
    },
    {
      coleccion: "avisos",
      periodoMeses: 3,
      elementos: AVISOS as unknown[],
      areaDe: () => "protocolo",
      fechaDe: () => "2026-09-01",
    },
    {
      coleccion: "servicios",
      periodoMeses: 12,
      elementos: SERVICIOS_BARRIO as unknown[],
      areaDe: (e) => get(e, "areaId") || "atencion-ciudadana",
      fechaDe: (e) => get(e, "fechaActualizacion") || "2026-06-01",
    },
    {
      coleccion: "areas",
      periodoMeses: 12,
      elementos: AREAS as unknown[],
      areaDe: (e) => get(e, "id") || "secretaria-general",
      fechaDe: () => "2026-06-01",
    },
    {
      coleccion: "documentos",
      periodoMeses: 12,
      elementos: DOCUMENTOS as unknown[],
      areaDe: () => "secretaria-general",
      fechaDe: (e) => get(e, "fechaActualizacion", "fechaPublicacion") || "2026-06-01",
    },
    {
      coleccion: "transparencia",
      periodoMeses: 12,
      elementos: DOCUMENTOS as unknown[],
      areaDe: () => "secretaria-general",
      fechaDe: (e) => get(e, "fechaActualizacion", "fechaPublicacion") || "2026-06-01",
    },
  ];

  for (const f of fuentes) {
    for (const el of f.elementos) {
      const id = get(el, "id");
      if (!id) continue;
      todos.push(envolver(f.coleccion, f.periodoMeses, el, id, f.areaDe(el), f.fechaDe(el)));
    }
  }

  // --- Reparto de demostración (estados no verdes) ---
  const porId = (coleccion: Coleccion, id: string) =>
    todos.find((r) => r.coleccion === coleccion && r.id === id);

  const enRevision: [Coleccion, string, string, string][] = [
    ["tramites", "licencia-obra-menor", "M. Hernández (Editor, Urbanismo)", "2026-09-05"],
    ["tramites", "plusvalia-municipal-iivtnu", "J. Pérez (Editor, Hacienda)", "2026-09-06"],
    ["noticias", "plan-empleo-social-40-personas", "A. García (Editora, Desarrollo Local)", "2026-09-04"],
    ["ayudas", "libros-material-escolar", "C. Ruiz (Editora, Bienestar Social)", "2026-09-07"],
    ["eventos", "obra-teatro-pancho-manue", "L. Díaz (Editora, Cultura)", "2026-09-03"],
  ];
  for (const [col, id, quien, fecha] of enRevision) {
    const r = porId(col, id);
    if (r) {
      Object.assign(
        r,
        forzar(r, {
          estado: "en_revision" as EstadoContenido,
          enviadoPor: quien,
          fechaEnvio: fecha,
          ultimoEditor: quien,
        }),
      );
    }
  }

  const programados: [Coleccion, string, string][] = [
    ["noticias", "subvencion-bandas-musica", "2026-09-15"],
    ["avisos", "ayuda-libros", "2026-09-12"],
  ];
  for (const [col, id, fecha] of programados) {
    const r = porId(col, id);
    if (r) Object.assign(r, forzar(r, { estado: "programado" as EstadoContenido, pubFecha: fecha }));
  }

  // Caducados por periodicidad superada (control anti-desactualización).
  const caducados: [Coleccion, string][] = [
    ["tramites", "cesion-derecho-cobro"],
    ["tramites", "instancia-generica"],
    ["servicios", "transporte-taxis"],
  ];
  for (const [col, id] of caducados) {
    const r = porId(col, id);
    if (r) {
      Object.assign(
        r,
        forzar(r, {
          estado: "caducado" as EstadoContenido,
          ultimaRevision: "2024-11-10",
          hallazgos: [
            {
              tipo: "revision-superada",
              mensaje: "Ha superado su periodicidad de revisión acordada (6 meses sin revisar).",
              severidad: "bloqueo",
              fecha: "2026-09-08",
            },
          ],
        }),
      );
    }
  }

  // Cola de anonimización: nombres y números claramente ficticios.
  const colaAnon: [string, string, string][] = [
    ["bolsa-auxiliar-lista", "Secretaría General", "Lista de admitidos con NIF y teléfonos de ejemplo (datos ficticios)"],
    ["convenio-cruz-roja", "Bienestar Social", "Convenio con datos de contacto de ejemplo (datos ficticios)"],
    ["contratos-menores-t2", "Contratación", "Tabla con adjudicatarios de ejemplo (datos ficticios)"],
  ];
  for (const [id, destino, nota] of colaAnon) {
    const r = porId("transparencia", id);
    if (r) {
      Object.assign(
        r,
        forzar(r, {
          estado: "borrador" as EstadoContenido,
          estadoDatos: "pendiente_revision" as EstadoDatos,
          notaDatos: nota,
          enviadoPor: `Personal de ${destino}`,
          fechaEnvio: "2026-09-07",
        }),
      );
    }
  }

  return todos;
}
