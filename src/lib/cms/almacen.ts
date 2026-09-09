import { promises as fs } from "node:fs";
import path from "node:path";
import { sembrar } from "./semilla";
import { estaPublicadoYVigente } from "./visibilidad";
import type { Coleccion, RegistroEditorial } from "./tipos-editoriales";

/**
 * Fuente única de verdad. Ni el gestor ni el front acceden a src/data
 * directamente: ambos pasan por aquí.
 *
 * - Front (lectura): `leerParaFront` devuelve solo el contenido de los
 *   registros publicados y vigentes, con la forma exacta de los tipos
 *   actuales. El front no sabe que existe un envoltorio editorial.
 * - Gestor (lectura + escritura): `leerParaGestor`, `guardarContenido`,
 *   `cambiarEstado`, `restaurarVersion`, `crearRegistro`.
 *
 * Persistencia (docs/persistencia.md):
 * - Vía prioritaria: Postgres (Supabase, región UE) vía `db.ts`.
 *   Si la tabla está vacía, se siembra desde data/cms/*.json.
 * - Reserva: fichero local (desarrollo) si el probe de escritura funciona.
 * - Última reserva: modo consulta (lectura de semilla/fichero, sin escribir).
 * La capacidad se prueba de verdad (PostgREST o probe fs), sin inferir de env.
 */
import { dbDisponible, dbList, dbUpsert, dbVaciarTodo, type BackendId } from "./db";

const DIR = path.join(process.cwd(), "data", "cms");
const PROBE = path.join(DIR, ".probe-escritura");

let probeCache: boolean | null = null;

let backendCache: { backend: BackendId; at: number } | null = null;

/**
 * Backend activo. Orden: db → fichero → lectura.
 * `dbDisponible()` sondea PostgREST de verdad; el probe fs es la reserva.
 */
export async function tipoBackend(): Promise<BackendId> {
  if (backendCache && Date.now() - backendCache.at < 30000) return backendCache.backend;
  let backend: BackendId = "lectura";
  try {
    if (await dbDisponible()) backend = "db";
    else if (await esEscribibleFs()) backend = "fichero";
  } catch {
    backend = "lectura";
  }
  backendCache = { backend, at: Date.now() };
  return backend;
}

/** Solo para pruebas: invalida las cachés de probes. */
export function _resetProbeCache(): void {
  probeCache = null;
}

/** Solo para pruebas: invalida la caché de backend. */
export function _resetBackendCache(): void {
  backendCache = null;
  probeCache = null;
}

/** Prueba real de escritura en fichero (crear+borrar temporal). Nunca inferida de env. */
export async function esEscribibleFs(): Promise<boolean> {
  if (probeCache !== null) return probeCache;
  try {
    await fs.mkdir(DIR, { recursive: true });
    await fs.writeFile(PROBE, "ok", "utf-8");
    await fs.unlink(PROBE);
    probeCache = true;
  } catch {
    probeCache = false;
  }
  return probeCache;
}

/** ¿Puede escribir este entorno (db o fichero)? Lo deciden los probes reales. */
export async function esEscribible(): Promise<boolean> {
  return (await tipoBackend()) !== "lectura";
}

export const ERROR_SOLO_LECTURA =
  "Entorno de demostración en solo lectura; la edición se demuestra en local.";

let semilla: RegistroEditorial<unknown>[] | null = null;

function getSemilla(): RegistroEditorial<unknown>[] {
  if (!semilla) semilla = sembrar();
  return semilla;
}

function ruta(coleccion: Coleccion): string {
  return path.join(DIR, `${coleccion}.json`);
}

async function leerAlmacen(coleccion: Coleccion): Promise<RegistroEditorial<unknown>[]> {
  try {
    const texto = await fs.readFile(ruta(coleccion), "utf-8");
    const arr = JSON.parse(texto) as RegistroEditorial<unknown>[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

/**
 * Todos los registros de una colección.
 * Prioridad: db → fichero (fusión con semilla, por id) → semilla.
 * Si la tabla está vacía, se siembra desde data/cms/*.json (idempotente).
 */
export async function leerRegistros<T>(coleccion: Coleccion): Promise<RegistroEditorial<T>[]> {
  const backend = await tipoBackend();
  if (backend === "db") {
    try {
      const filas = await dbList<T>(coleccion);
      if (filas.length > 0) return filas;
      // Tabla vacía: sembrar desde los ficheros versionados.
      await sembrarEnDb(coleccion);
      const resembrados = await dbList<T>(coleccion);
      if (resembrados.length > 0) return resembrados;
    } catch {
      // La base no responde: reserva inmediata a fichero/semilla.
    }
  }
  const base = getSemilla().filter((r) => r.coleccion === coleccion);
  const almacenados = await leerAlmacen(coleccion);
  const porId = new Map<string, RegistroEditorial<unknown>>();
  for (const r of base) porId.set(r.id, r);
  for (const r of almacenados) {
    if (r && typeof r.id === "string" && r.coleccion === coleccion) porId.set(r.id, r);
  }
  return [...porId.values()] as RegistroEditorial<T>[];
}

/** Vista front: solo contenido publicado y vigente, forma exacta del tipo actual. */
export async function leerParaFront<T>(coleccion: Coleccion): Promise<T[]> {
  const regs = await leerRegistros<T>(coleccion);
  return regs.filter((r) => estaPublicadoYVigente(r)).map((r) => r.contenido);
}

/** Vista gestor: registro editorial completo. */
export async function leerParaGestor<T>(coleccion: Coleccion): Promise<RegistroEditorial<T>[]> {
  return leerRegistros<T>(coleccion);
}

export async function leerRegistro<T>(coleccion: Coleccion, id: string): Promise<RegistroEditorial<T> | null> {
  const regs = await leerRegistros<T>(coleccion);
  return regs.find((r) => r.id === id) ?? null;
}

/** Vista previsualización: borrador incluido; archivado no previsualizable. */
export async function leerParaPreview<T>(
  coleccion: Coleccion,
  id: string,
  version?: number,
): Promise<RegistroEditorial<T> | null> {
  const reg = await leerRegistro<T>(coleccion, id);
  if (!reg || reg.estado === "archivado") return null;
  if (version == null) return reg;
  const v = reg.versiones.find((x) => x.n === version);
  if (!v) return null;
  return { ...reg, contenido: v.contenido };
}

async function persistir(coleccion: Coleccion, regs: RegistroEditorial<unknown>[]): Promise<void> {
  const backend = await tipoBackend();
  if (backend === "lectura") throw new Error(ERROR_SOLO_LECTURA);
  if (backend === "db") {
    await dbUpsert(coleccion, regs);
    return;
  }
  await fs.mkdir(DIR, { recursive: true });
  // El fichero versionado contiene el estado completo de la colección.
  await fs.writeFile(ruta(coleccion), JSON.stringify(regs, null, 2) + "\n", "utf-8");
}

/** Siembra una colección en la base desde los ficheros versionados. */
async function sembrarEnDb(coleccion: Coleccion): Promise<void> {
  const fichero = await leerAlmacen(coleccion);
  const fuente = fichero.length > 0 ? fichero : getSemilla().filter((r) => r.coleccion === coleccion);
  if (fuente.length > 0) await dbUpsert(coleccion, fuente);
}

/** Guarda contenido editado; genera versión con autor, fecha y motivo. */
export async function guardarContenido<T>(
  coleccion: Coleccion,
  id: string,
  contenido: T,
  autor: string,
  motivo = "",
): Promise<RegistroEditorial<T>> {
  const regs = await leerRegistros<T>(coleccion);
  const i = regs.findIndex((r) => r.id === id);
  if (i < 0) throw new Error(`Registro no encontrado: ${coleccion}/${id}`);
  const anterior = regs[i];
  const cambia = JSON.stringify(anterior.contenido) !== JSON.stringify(contenido);
  const areaEnContenido = (contenido as Record<string, unknown>)["areaId"];
  const actualizado: RegistroEditorial<T> = {
    ...anterior,
    contenido,
    ultimoEditor: autor,
    // El área responsable vive también en el contenido: se sincroniza al guardar.
    areaId: typeof areaEnContenido === "string" && areaEnContenido ? areaEnContenido : anterior.areaId,
    versiones: cambia
      ? [...anterior.versiones, { n: anterior.versiones.length + 1, fecha: new Date().toISOString().slice(0, 10), autor, motivo, contenido }]
      : anterior.versiones,
  };
  regs[i] = actualizado;
  await persistir(coleccion, regs as RegistroEditorial<unknown>[]);
  return actualizado;
}

export async function cambiarEstado<T>(
  coleccion: Coleccion,
  id: string,
  estado: RegistroEditorial<T>["estado"],
  autor: string,
  comentario = "",
): Promise<RegistroEditorial<T>> {
  const regs = await leerRegistros<T>(coleccion);
  const i = regs.findIndex((r) => r.id === id);
  if (i < 0) throw new Error(`Registro no encontrado: ${coleccion}/${id}`);
  const hoy = new Date().toISOString().slice(0, 10);
  const anterior = regs[i];
  const actualizado: RegistroEditorial<T> = {
    ...anterior,
    estado,
    ultimoEditor: autor,
    ultimaRevision: estado === "publicado" ? hoy : anterior.ultimaRevision,
    pubFecha: estado === "publicado" && !anterior.pubFecha ? hoy : anterior.pubFecha,
    enviadoPor: estado === "en_revision" ? autor : anterior.enviadoPor,
    fechaEnvio: estado === "en_revision" ? hoy : anterior.fechaEnvio,
    revision:
      estado === "publicado" || estado === "borrador"
        ? { por: autor, fecha: hoy, resultado: estado === "publicado" ? "aprobado" : "devuelto", comentario }
        : anterior.revision,
  };
  regs[i] = actualizado;
  await persistir(coleccion, regs as RegistroEditorial<unknown>[]);
  return actualizado;
}

export async function restaurarVersion<T>(
  coleccion: Coleccion,
  id: string,
  n: number,
  autor: string,
): Promise<RegistroEditorial<T>> {
  const reg = await leerRegistro<T>(coleccion, id);
  if (!reg) throw new Error(`Registro no encontrado: ${coleccion}/${id}`);
  const v = reg.versiones.find((x) => x.n === n);
  if (!v) throw new Error(`Versión ${n} no encontrada en ${coleccion}/${id}`);
  return guardarContenido(coleccion, id, v.contenido, autor, `Restaurada la versión ${n}`);
}

/** Crea un registro nuevo en estado borrador. Falla si el id ya existe. */
export async function crearRegistro<T>(
  coleccion: Coleccion,
  id: string,
  contenido: T,
  areaId: string,
  autor: string,
  periodicidadMeses = 6,
): Promise<RegistroEditorial<T>> {
  const regs = await leerRegistros<T>(coleccion);
  if (regs.some((r) => r.id === id)) throw new Error(`Ya existe ${coleccion}/${id}`);
  const hoy = new Date().toISOString().slice(0, 10);
  const nuevo: RegistroEditorial<T> = {
    id,
    coleccion,
    contenido,
    estado: "borrador",
    pubFecha: null,
    validezHasta: null,
    expiraEl: null,
    periodicidadMeses,
    ultimaRevision: hoy,
    areaId,
    autor,
    ultimoEditor: autor,
    enviadoPor: null,
    fechaEnvio: null,
    revision: null,
    versiones: [{ n: 1, fecha: hoy, autor, motivo: "Creación del contenido", contenido }],
    hallazgos: [],
    estadoDatos: "no_aplica",
    notaDatos: null,
  };
  regs.push(nuevo);
  await persistir(coleccion, regs as RegistroEditorial<unknown>[]);
  return nuevo;
}

/** Restablece la demo al estado versionado: resiembra desde los ficheros (nunca los borra). */
export async function restablecerDemo(coleccion?: Coleccion): Promise<void> {
  const backend = await tipoBackend();
  if (backend === "lectura") throw new Error(ERROR_SOLO_LECTURA);
  const colecciones: Coleccion[] = coleccion
    ? [coleccion]
    : ["tramites", "noticias", "eventos", "ayudas", "empleo", "avisos", "servicios", "paginas", "areas", "documentos", "transparencia"];
  if (backend === "db") {
    await dbVaciarTodo();
    for (const c of colecciones) await sembrarEnDb(c);
    const { dbInsertActividad } = await import("./db");
    await dbInsertActividad({ fecha: "2026-09-08", usuario: "Sistema", accion: "modificacion", elemento: "demo", detalle: "Datos de demostración restablecidos" });
    return;
  }
  await fs.mkdir(DIR, { recursive: true });
  await Promise.all(
    colecciones.map((c) =>
      fs.writeFile(ruta(c), JSON.stringify(getSemilla().filter((r) => r.coleccion === c), null, 2) + "\n", "utf-8"),
    ),
  );
  // La actividad también vuelve a su semilla versionada.
  const semillaActividad = [
    { fecha: "2026-09-07", usuario: "M. Hernández (Editor, Urbanismo)", accion: "envio_revision", elemento: "tramites/licencia-obra-menor", detalle: "Enviada a revisión: actualizados requisitos" },
    { fecha: "2026-09-06", usuario: "J. Pérez (Editor, Hacienda)", accion: "envio_revision", elemento: "tramites/plusvalia-municipal-iivtnu", detalle: "Enviada a revisión: nuevo plazo de resolución" },
    { fecha: "2026-09-05", usuario: "R. Sosa (Validadora)", accion: "publicacion", elemento: "noticias/reforma-piscina-municipal-verano", detalle: "Publicada tras revisión" },
    { fecha: "2026-09-04", usuario: "Administrador demo", accion: "cambio_permiso", elemento: "usuarios", detalle: "Asignada C. Ruiz a Bienestar Social" },
  ];
  await fs.writeFile(path.join(DIR, "actividad.json"), JSON.stringify(semillaActividad, null, 2) + "\n", "utf-8");
}

/** Estado de demostración versionado: genera data/cms/*.json desde la semilla. */
export function estadoVersionado(): { coleccion: Coleccion; registros: RegistroEditorial<unknown>[] }[] {
  const colecciones: Coleccion[] = ["tramites", "noticias", "eventos", "ayudas", "empleo", "avisos", "servicios", "paginas", "areas", "documentos", "transparencia"];
  return colecciones.map((c) => ({ coleccion: c, registros: getSemilla().filter((r) => r.coleccion === c) }));
}
