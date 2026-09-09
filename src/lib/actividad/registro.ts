import { promises as fs } from "node:fs";
import path from "node:path";
import { tipoBackend } from "@/lib/cms/almacen";
import { dbInsertActividad, dbListActividad } from "@/lib/cms/db";

export type AccionActividad =
  | "acceso"
  | "publicacion"
  | "modificacion"
  | "envio_revision"
  | "revision_documento"
  | "cambio_permiso";

export type EntradaActividad = {
  fecha: string;
  usuario: string;
  accion: AccionActividad;
  elemento: string;
  detalle: string;
};

const FICHERO = path.join(process.cwd(), "data", "cms", "actividad.json");

const SEMILLA_ACTIVIDAD: EntradaActividad[] = [
  { fecha: "2026-09-07", usuario: "M. Hernández (Editor, Urbanismo)", accion: "envio_revision", elemento: "tramites/licencia-obra-menor", detalle: "Enviada a revisión: actualizados requisitos" },
  { fecha: "2026-09-06", usuario: "J. Pérez (Editor, Hacienda)", accion: "envio_revision", elemento: "tramites/plusvalia-municipal-iivtnu", detalle: "Enviada a revisión: nuevo plazo de resolución" },
  { fecha: "2026-09-05", usuario: "R. Sosa (Validadora)", accion: "publicacion", elemento: "noticias/reforma-piscina-municipal-verano", detalle: "Publicada tras revisión" },
  { fecha: "2026-09-04", usuario: "Administrador demo", accion: "cambio_permiso", elemento: "usuarios", detalle: "Asignada C. Ruiz a Bienestar Social" },
];

export async function leerActividad(): Promise<EntradaActividad[]> {
  try {
    if ((await tipoBackend()) === "db") return await dbListActividad();
  } catch {
    /* reserva a fichero/semilla */
  }
  try {
    const texto = await fs.readFile(FICHERO, "utf-8");
    return JSON.parse(texto) as EntradaActividad[];
  } catch {
    return SEMILLA_ACTIVIDAD;
  }
}

export async function registrarActividad(entrada: Omit<EntradaActividad, "fecha"> & { fecha?: string }): Promise<void> {
  const completa: EntradaActividad = {
    fecha: entrada.fecha ?? new Date().toISOString().slice(0, 10),
    usuario: entrada.usuario,
    accion: entrada.accion,
    elemento: entrada.elemento,
    detalle: entrada.detalle,
  };
  // La trazabilidad no bloquea la acción: si no se puede escribir, se registra
  // en la respuesta de la acción y queda visible en la interfaz.
  try {
    if ((await tipoBackend()) === "db") {
      await dbInsertActividad(completa);
      return;
    }
  } catch {
    return;
  }
  const actual = await leerActividad();
  const todas = [completa, ...actual].slice(0, 500);
  try {
    const { esEscribibleFs } = await import("@/lib/cms/almacen");
    if (!(await esEscribibleFs())) return;
    await fs.mkdir(path.dirname(FICHERO), { recursive: true });
    await fs.writeFile(FICHERO, JSON.stringify(todas, null, 2) + "\n", "utf-8");
  } catch {
    /* sin escritura: no bloquea la acción */
  }
}
