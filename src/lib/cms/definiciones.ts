/**
 * Sistema de definiciones de colección (Bloque 2).
 * Añadir una colección nueva = crear su fichero en definiciones/ y
 * registrarlo en COLECCIONES. Sin tocar EditorModal ni AdminTable.
 */

export type TipoCampo =
  | "texto" // texto corto
  | "texto_largo" // textarea
  | "enriquecido" // textarea con ayuda de formato
  | "lista_textos" // string[]
  | "vocabulario" // selección única de vocabulario
  | "vocabulario_multiple" // checkboxes de vocabulario
  | "fecha" // YYYY-MM-DD
  | "booleano" // checkbox
  | "referencia" // id de otro contenido (misma u otra colección)
  | "referencia_multiple" // ids[]
  | "importe" // texto de cuantía/tasa
  | "enlace_externo" // { titulo, url }
  | "adjunto"; // { titulo, url? } (normativa, bases)

export type FuenteVocabulario =
  | { tipo: "temas" }
  | { tipo: "canales" }
  | { tipo: "perfiles" }
  | { tipo: "areas" }
  | { tipo: "fija"; opciones: { valor: string; etiqueta: string }[] };

export type DefCampo = {
  clave: string; // ruta dentro del contenido, p. ej. "tituloClaro" o "presencial.nombre"
  etiqueta: string;
  tipo: TipoCampo;
  ayuda?: string;
  placeholder?: string;
  obligatorio?: boolean;
  vocabulario?: FuenteVocabulario;
  referenciaA?: string; // colección destino para referencia
  grupo?: string; // agrupa visualmente en una sección plegable
};

export type DefFiltro =
  | { id: string; etiqueta: string; tipo: "texto_libre" }
  | { id: string; etiqueta: string; tipo: "vocabulario"; vocabulario: FuenteVocabulario; ruta: string }
  | { id: string; etiqueta: string; tipo: "estado" }
  | { id: string; etiqueta: string; tipo: "necesita_atencion" };

export type DefColumna =
  | { id: string; encabezado: string; tipo: "titulo"; subtituloRuta?: string }
  | { id: string; encabezado: string; tipo: "estado" }
  | { id: string; encabezado: string; tipo: "propietario" }
  | { id: string; encabezado: string; tipo: "revision" }
  | { id: string; encabezado: string; tipo: "fecha"; ruta: string }
  | { id: string; encabezado: string; tipo: "texto"; ruta: string };

export type DefColeccion = {
  coleccion: string;
  titulo: string;
  tituloTipo: string;
  descripcion: string;
  hrefNuevo: string | null; // null = sin creación en esta fase
  campos: DefCampo[];
  lecturaFacil: boolean; // muestra el bloque de resumen queEs/queNecesito/dondeSeHace
  bloques: boolean; // muestra el editor de bloques
  filtros: DefFiltro[];
  columnas: DefColumna[];
  /** Claves para el título en listados y búsqueda. */
  tituloRutas: string[];
};

/** Lee un valor por ruta con puntos: "presencial.nombre". */
export function leerRuta(obj: unknown, ruta: string): unknown {
  let actual: unknown = obj;
  for (const parte of ruta.split(".")) {
    if (actual == null || typeof actual !== "object") return undefined;
    actual = (actual as Record<string, unknown>)[parte];
  }
  return actual;
}

/** Escribe un valor por ruta con puntos (crea objetos intermedios). */
export function escribirRuta<T extends Record<string, unknown>>(obj: T, ruta: string, valor: unknown): T {
  const copia = JSON.parse(JSON.stringify(obj)) as Record<string, unknown>;
  const partes = ruta.split(".");
  let actual = copia;
  for (let i = 0; i < partes.length - 1; i++) {
    const p = partes[i];
    if (actual[p] == null || typeof actual[p] !== "object") actual[p] = {};
    actual = actual[p] as Record<string, unknown>;
  }
  actual[partes[partes.length - 1]] = valor;
  return copia as T;
}

export function tituloDeContenido(contenido: Record<string, unknown>, rutas: string[], fallback: string): string {
  for (const r of rutas) {
    const v = leerRuta(contenido, r);
    if (typeof v === "string" && v.trim()) return v;
  }
  return fallback;
}
