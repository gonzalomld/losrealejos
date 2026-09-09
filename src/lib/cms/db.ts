/**
 * Cliente de persistencia Postgres (Supabase, región Unión Europea).
 *
 * Sin dependencias nuevas: habla con PostgREST por `fetch` nativo.
 * SOLO SERVIDOR: usa `SUPABASE_SERVICE_ROLE_KEY`, que nunca sale al cliente.
 * Si no hay configuración o la base no responde → devuelve null / lanza,
 * y el almacén cae al comportamiento de reserva (fichero local / lectura).
 */
import type { Coleccion, RegistroEditorial } from "./tipos-editoriales";
import type { EntradaActividad } from "../actividad/registro";

export type BackendId = "db" | "fichero" | "lectura";

type Cfg = { url: string; key: string };

export function dbConfig(): Cfg | null {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

async function rest(path: string, init: RequestInit = {}, timeoutMs = 8000): Promise<Response> {
  const cfg = dbConfig();
  if (!cfg) throw new Error("Base de datos no configurada (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${cfg.url}/rest/v1${path}`, {
      ...init,
      signal: ctrl.signal,
      headers: {
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
        "Content-Type": "application/json",
        ...((init.headers as Record<string, string> | undefined) ?? {}),
      },
    });
    if (!res.ok) throw new Error(`PostgREST ${res.status} en ${path}.`);
    return res;
  } finally {
    clearTimeout(t);
  }
}

type FilaRegistro = { coleccion: string; id: string; registro: unknown };

let pingCache: { ok: boolean; at: number } | null = null;

/** Sondeo real: ¿responde la base? Nunca inferido de variables. Caché 30 s. */
export async function dbDisponible(): Promise<boolean> {
  if (pingCache && Date.now() - pingCache.at < 30000) return pingCache.ok;
  let ok = false;
  try {
    const res = await rest(`/cms_registros?select=id&limit=1`, {}, 5000);
    const arr = (await res.json()) as unknown[];
    ok = Array.isArray(arr);
  } catch {
    ok = false;
  }
  pingCache = { ok, at: Date.now() };
  return ok;
}

/** Solo para pruebas. */
export function _resetDbCache(): void {
  pingCache = null;
}

export async function dbList<T>(coleccion: Coleccion): Promise<RegistroEditorial<T>[]> {
  const res = await rest(`/cms_registros?coleccion=eq.${encodeURIComponent(coleccion)}&select=registro&limit=2000`);
  const arr = (await res.json()) as { registro: RegistroEditorial<T> }[];
  return arr.map((f) => f.registro).filter((r) => r && r.id && r.coleccion === coleccion);
}

export async function dbUpsert(coleccion: Coleccion, regs: RegistroEditorial<unknown>[]): Promise<void> {
  const filas: FilaRegistro[] = regs.map((r) => ({ coleccion, id: r.id, registro: r }));
  // Lotes para no superar límites de tamaño por petición.
  for (let i = 0; i < filas.length; i += 100) {
    await rest(
      `/cms_registros`,
      {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify(filas.slice(i, i + 100)),
      },
    );
  }
}

const COLECCIONES_DB: Coleccion[] = [
  "tramites", "noticias", "eventos", "ayudas", "empleo", "avisos",
  "servicios", "paginas", "areas", "documentos", "transparencia",
];

export async function dbVaciarTodo(): Promise<void> {
  for (const c of COLECCIONES_DB) {
    await rest(`/cms_registros?coleccion=eq.${encodeURIComponent(c)}`, { method: "DELETE" });
  }
  await rest(`/cms_actividad?id=gt.0`, { method: "DELETE" });
}

export async function dbListActividad(): Promise<EntradaActividad[]> {
  const res = await rest(
    `/cms_actividad?select=fecha,usuario,accion,elemento,detalle&order=fecha.desc&limit=500`,
  );
  return (await res.json()) as EntradaActividad[];
}

export async function dbInsertActividad(e: EntradaActividad): Promise<void> {
  await rest(`/cms_actividad`, { method: "POST", body: JSON.stringify(e) });
}
