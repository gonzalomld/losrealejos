import { promises as fs } from "node:fs";
import path from "node:path";

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
    const texto = await fs.readFile(FICHERO, "utf-8");
    return JSON.parse(texto) as EntradaActividad[];
  } catch {
    return SEMILLA_ACTIVIDAD;
  }
}

export async function registrarActividad(entrada: Omit<EntradaActividad, "fecha"> & { fecha?: string }): Promise<void> {
  const actual = await leerActividad();
  const completa: EntradaActividad = {
    fecha: entrada.fecha ?? new Date().toISOString().slice(0, 10),
    usuario: entrada.usuario,
    accion: entrada.accion,
    elemento: entrada.elemento,
    detalle: entrada.detalle,
  };
  const todas = [completa, ...actual].slice(0, 500);
  try {
    await fs.mkdir(path.dirname(FICHERO), { recursive: true });
    await fs.writeFile(FICHERO, JSON.stringify(todas, null, 2) + "\n", "utf-8");
  } catch {
    /* en despliegues sin FS escribible el registro es de sesión; no bloquea la acción */
  }
}
