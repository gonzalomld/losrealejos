import type { RegistroEditorial } from "./tipos-editoriales";

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Único punto que resuelve "publicado y vigente". Lo usan todos los
 * listados del front. Marcar algo como caducado en el gestor se refleja
 * en el portal solo a través de esta función.
 */
export function estaPublicadoYVigente<T>(reg: RegistroEditorial<T>, hoy = hoyISO()): boolean {
  if (reg.estado !== "publicado") return false;
  if (reg.pubFecha && reg.pubFecha > hoy) return false;
  if (reg.expiraEl && reg.expiraEl < hoy) return false;
  return true;
}

/** true cuando ha superado la periodicidad de revisión acordada. */
export function superaPeriodicidad<T>(reg: RegistroEditorial<T>, hoy = hoyISO()): boolean {
  const ultima = new Date(reg.ultimaRevision + "T00:00:00");
  const limite = new Date(ultima);
  limite.setMonth(limite.getMonth() + reg.periodicidadMeses);
  return new Date(hoy + "T00:00:00") > limite;
}

/** Días hasta la expiración (negativo si ya expiró, null si no expira). */
export function diasHastaExpiracion<T>(reg: RegistroEditorial<T>, hoy = hoyISO()): number | null {
  if (!reg.expiraEl) return null;
  const ms = new Date(reg.expiraEl + "T00:00:00").getTime() - new Date(hoy + "T00:00:00").getTime();
  return Math.round(ms / 86400000);
}

/** Agrupa lo caducado, lo pendiente de revisar y lo que tiene bloqueos. */
export function necesitaAtencion<T>(reg: RegistroEditorial<T>): boolean {
  if (reg.estado === "caducado" || reg.estado === "en_revision") return true;
  if (superaPeriodicidad(reg)) return true;
  return reg.hallazgos.some((h) => h.severidad === "bloqueo");
}
