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
 *   `cambiarEstado`, `restaurarVersion`.
 *
 * Persistencia del prototipo: ficheros JSON versionados en el repositorio
 * (`data/cms/*.json`), uno por colección, con el registro editorial
 * completo. Sin .gitignore: el estado de la demostración debe ser estable
 * y reproducible. Sin memoria de proceso: en despliegue serverless cada
 * petición puede atender un proceso distinto.
 */

const DIR = path.join(process.cwd(), "data", "cms");

let semilla: RegistroEditorial<unknown>[] | null = null;

function getSemilla(): RegistroEditorial<unknown>[] {
  if (!semilla) semilla = sembrar();
  return semilla;
}

function ruta(coleccion: Coleccion): string {
  return path.join(DIR, `${coleccion}.json`);
}

async function leerOverrides(coleccion: Coleccion): Promise<Record<string, RegistroEditorial<unknown>>> {
  try {
    const texto = await fs.readFile(ruta(coleccion), "utf-8");
    const arr = JSON.parse(texto) as RegistroEditorial<unknown>[];
    const mapa: Record<string, RegistroEditorial<unknown>> = {};
    for (const r of arr) mapa[r.id] = r;
    return mapa;
  } catch {
    return {};
  }
}

/** Todos los registros de una colección: semilla + overrides fusionados por id. */
export async function leerRegistros<T>(coleccion: Coleccion): Promise<RegistroEditorial<T>[]> {
  const base = getSemilla().filter((r) => r.coleccion === coleccion);
  const overrides = await leerOverrides(coleccion);
  return base.map((r) => (overrides[r.id] ? (overrides[r.id] as RegistroEditorial<T>) : (r as RegistroEditorial<T>)));
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
  await fs.mkdir(DIR, { recursive: true });
  // Solo persisten los registros que difieren de la semilla.
  const base = new Map(getSemilla().filter((r) => r.coleccion === coleccion).map((r) => [r.id, JSON.stringify(r)]));
  const distintos = regs.filter((r) => base.get(r.id) !== JSON.stringify(r));
  await fs.writeFile(ruta(coleccion), JSON.stringify(distintos, null, 2) + "\n", "utf-8");
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

/** Restablece la demo al estado versionado (borra overrides). */
export async function restablecerDemo(): Promise<void> {
  try {
    const ficheros = await fs.readdir(DIR);
    await Promise.all(
      ficheros.filter((f) => f.endsWith(".json")).map((f) => fs.unlink(path.join(DIR, f))),
    );
  } catch {
    /* sin overrides: nada que restablecer */
  }
}
