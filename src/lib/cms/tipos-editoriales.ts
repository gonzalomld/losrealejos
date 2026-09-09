/**
 * Tipos editoriales del gestor. Envoltorio genérico sobre los tipos de
 * contenido del front (que NO se tocan): Tramite, Noticia, Evento, Ayuda,
 * Aviso, DocumentoTransparencia, Area, ServicioBarrio.
 */

export type EstadoContenido =
  | "borrador"
  | "en_revision"
  | "publicado"
  | "programado"
  | "caducado"
  | "archivado";

export const ETIQUETAS_ESTADO: Record<EstadoContenido, string> = {
  borrador: "Borrador",
  en_revision: "En revisión",
  publicado: "Publicado",
  programado: "Programado",
  caducado: "Caducado",
  archivado: "Archivado",
};

export type Coleccion =
  | "tramites"
  | "noticias"
  | "eventos"
  | "ayudas"
  | "empleo"
  | "avisos"
  | "servicios"
  | "paginas"
  | "areas"
  | "documentos"
  | "transparencia";

export const ETIQUETAS_COLECCION: Record<Coleccion, string> = {
  tramites: "Trámites",
  noticias: "Noticias",
  eventos: "Agenda de eventos",
  ayudas: "Ayudas y subvenciones",
  empleo: "Empleo público",
  avisos: "Avisos y plazos",
  servicios: "Servicios del día a día",
  paginas: "Páginas y campañas",
  areas: "Áreas municipales",
  documentos: "Biblioteca de documentos",
  transparencia: "Transparencia",
};

export type VersionContenido<T> = {
  n: number;
  fecha: string;
  autor: string;
  motivo: string;
  contenido: T;
};

export type SeveridadHallazgo = "aviso" | "bloqueo";

export type Hallazgo = {
  tipo: string;
  mensaje: string;
  severidad: SeveridadHallazgo;
  fecha: string;
};

export type RevisionEditorial = {
  por: string;
  fecha: string;
  resultado: "aprobado" | "devuelto";
  comentario: string;
};

/** Estado de revisión de datos personales (requisito 8.3 del pliego). */
export type EstadoDatos = "verificado" | "pendiente_revision" | "no_aplica";

export type RegistroEditorial<T> = {
  id: string;
  coleccion: Coleccion;
  contenido: T;
  estado: EstadoContenido;
  /** Fecha de publicación efectiva (ISO). */
  pubFecha: string | null;
  validezHasta: string | null;
  expiraEl: string | null;
  periodicidadMeses: number;
  ultimaRevision: string;
  areaId: string;
  autor: string;
  ultimoEditor: string;
  enviadoPor: string | null;
  fechaEnvio: string | null;
  revision: RevisionEditorial | null;
  versiones: VersionContenido<T>[];
  hallazgos: Hallazgo[];
  estadoDatos: EstadoDatos;
  notaDatos: string | null;
};

export function tituloDeRegistro<T>(reg: RegistroEditorial<T>): string {
  const c = reg.contenido as Record<string, unknown>;
  for (const k of ["tituloClaro", "titulo", "titular", "nombre"]) {
    if (typeof c[k] === "string" && c[k]) return c[k] as string;
  }
  return reg.id;
}
