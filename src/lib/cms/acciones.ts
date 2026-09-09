"use server";

import { revalidatePath } from "next/cache";
import {
  cambiarEstado as cambiarEstadoAlmacen,
  crearRegistro,
  guardarContenido,
  restablecerDemo as restablecerAlmacen,
  restaurarVersion as restaurarAlmacen,
} from "./almacen";
import type { Coleccion, EstadoContenido } from "./tipos-editoriales";
import { ERROR_SOLO_LECTURA, esEscribible, tipoBackend } from "./almacen";
import type { BackendId } from "./db";
import { registrarActividad } from "@/lib/actividad/registro";

/** ¿Puede escribir este entorno? Lo deciden los probes reales, no una variable. */
export async function accionPuedeEscribir(): Promise<{ escribible: boolean; backend: BackendId }> {
  const backend = await tipoBackend();
  return { escribible: backend !== "lectura", backend };
}

function rutasAfectadas(coleccion: Coleccion, id: string): string[] {
  const base: Record<Coleccion, string> = {
    tramites: `/tramites/${id}`,
    noticias: `/noticias/${id}`,
    eventos: `/agenda/${id}`,
    ayudas: `/ayudas/${id}`,
    empleo: "/empleo-publico",
    avisos: "/",
    servicios: `/mi-barrio/${id}`,
    paginas: `/${id}`,
    areas: `/areas-municipales/${id}`,
    documentos: "/transparencia",
    transparencia: "/transparencia",
  };
  const lista = ["/", "/mapa-del-sitio", "/buscar", base[coleccion]];
  if (coleccion === "tramites") lista.push("/tramites");
  if (coleccion === "noticias") lista.push("/noticias");
  if (coleccion === "eventos") lista.push("/agenda");
  if (coleccion === "ayudas") lista.push("/ayudas");
  if (coleccion === "documentos" || coleccion === "transparencia") lista.push("/transparencia");
  return lista;
}

export async function accionGuardar<T>(coleccion: Coleccion, id: string, contenido: T, autor: string, motivo = "") {
  try {
    if (!(await esEscribible())) return { ok: false as const, error: ERROR_SOLO_LECTURA };
    const reg = await guardarContenido(coleccion, id, contenido, autor, motivo);
    await registrarActividad({ usuario: autor, accion: "modificacion", elemento: `${coleccion}/${id}`, detalle: motivo || "Contenido editado" });
    for (const r of rutasAfectadas(coleccion, id)) revalidatePath(r);
    return { ok: true as const, registro: reg };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "No se pudo guardar. Tu trabajo sigue en el editor." };
  }
}

export async function accionCambiarEstado(coleccion: Coleccion, id: string, estado: EstadoContenido, autor: string, comentario = "") {
  try {
    if (!(await esEscribible())) return { ok: false as const, error: ERROR_SOLO_LECTURA };
    const reg = await cambiarEstadoAlmacen(coleccion, id, estado, autor, comentario);
    await registrarActividad({ usuario: autor, accion: estado === "publicado" ? "publicacion" : estado === "en_revision" ? "envio_revision" : "modificacion", elemento: `${coleccion}/${id}`, detalle: comentario || `Estado → ${estado}` });
    for (const r of rutasAfectadas(coleccion, id)) revalidatePath(r);
    return { ok: true as const, registro: reg };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "No se pudo cambiar el estado." };
  }
}

export async function accionRestaurarVersion(coleccion: Coleccion, id: string, n: number, autor: string) {
  try {
    if (!(await esEscribible())) return { ok: false as const, error: ERROR_SOLO_LECTURA };
    const reg = await restaurarAlmacen(coleccion, id, n, autor);
    await registrarActividad({ usuario: autor, accion: "modificacion", elemento: `${coleccion}/${id}`, detalle: `Restaurada la versión ${n}` });
    for (const r of rutasAfectadas(coleccion, id)) revalidatePath(r);
    return { ok: true as const, registro: reg };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "No se pudo restaurar la versión." };
  }
}

export async function accionCrear<T>(
  coleccion: Coleccion,
  id: string,
  contenido: T,
  areaId: string,
  autor: string,
) {
  try {
    if (!(await esEscribible())) return { ok: false as const, error: ERROR_SOLO_LECTURA };
    const reg = await crearRegistro(coleccion, id, contenido, areaId, autor);
    await registrarActividad({ usuario: autor, accion: "modificacion", elemento: `${coleccion}/${id}`, detalle: "Contenido creado" });
    for (const r of rutasAfectadas(coleccion, id)) revalidatePath(r);
    return { ok: true as const, registro: reg };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "No se pudo crear el contenido." };
  }
}

export async function accionActividad(entrada: { usuario: string; accion: "acceso" | "publicacion" | "modificacion" | "envio_revision" | "revision_documento" | "cambio_permiso"; elemento: string; detalle: string }) {
  try {
    const { registrarActividad } = await import("@/lib/actividad/registro");
    await registrarActividad(entrada);
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "No se pudo registrar." };
  }
}
export async function accionRestablecerDemo(autor: string) {
  try {
    await restablecerAlmacen();
    await registrarActividad({ usuario: autor, accion: "modificacion", elemento: "demo", detalle: "Datos de demostración restablecidos" });
    revalidatePath("/", "layout");
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "No se pudo restablecer la demo." };
  }
}
