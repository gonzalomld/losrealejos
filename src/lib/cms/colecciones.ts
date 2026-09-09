import type { DefColeccion } from "./definiciones";
export type { DefColeccion };
import { DEF_TRAMITES } from "./definiciones/tramites";
import { DEF_NOTICIAS } from "./definiciones/noticias";
import { DEF_EVENTOS } from "./definiciones/eventos";
import { DEF_AYUDAS } from "./definiciones/ayudas";
import { DEF_EMPLEO } from "./definiciones/empleo";
import { DEF_AVISOS } from "./definiciones/avisos";
import { DEF_SERVICIOS } from "./definiciones/servicios";
import { DEF_PAGINAS } from "./definiciones/paginas";
import { DEF_AREAS } from "./definiciones/areas";
import { DEF_DOCUMENTOS, DEF_TRANSPARENCIA } from "./definiciones/documentos";

/**
 * Definición por colección: campos, filtros y columnas del listado.
 * Añadir una colección = crear su fichero en definiciones/ y una línea aquí.
 */
export const COLECCIONES: Record<string, DefColeccion> = {
  tramites: DEF_TRAMITES,
  servicios: DEF_SERVICIOS,
  noticias: DEF_NOTICIAS,
  eventos: DEF_EVENTOS,
  ayudas: DEF_AYUDAS,
  empleo: DEF_EMPLEO,
  avisos: DEF_AVISOS,
  paginas: DEF_PAGINAS,
  areas: DEF_AREAS,
  documentos: DEF_DOCUMENTOS,
  transparencia: DEF_TRANSPARENCIA,
};

export function definicionDe(coleccion: string): DefColeccion | null {
  return COLECCIONES[coleccion] ?? null;
}
