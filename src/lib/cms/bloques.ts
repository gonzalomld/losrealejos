/** Tipos de bloque = componentes que existen en el portal público. Sin excepciones. */
export type TipoBloque =
  | "contenido"
  | "foto"
  | "acordeon"
  | "info"
  | "aviso"
  | "tabla"
  | "documento"
  | "enlace-externo"
  | "cta";

export const ETIQUETAS_BLOQUE: Record<TipoBloque, { titulo: string; color: string }> = {
  contenido: { titulo: "Contenido", color: "bg-blue-100 text-blue-900" },
  foto: { titulo: "Foto", color: "bg-emerald-100 text-emerald-900" },
  acordeon: { titulo: "Acordeón", color: "bg-violet-100 text-violet-900" },
  info: { titulo: "Info", color: "bg-sky-100 text-sky-900" },
  aviso: { titulo: "Aviso", color: "bg-amber-100 text-amber-900" },
  tabla: { titulo: "Tabla", color: "bg-neutral-200 text-neutral-900" },
  documento: { titulo: "Documento adjunto", color: "bg-orange-100 text-orange-900" },
  "enlace-externo": { titulo: "Enlace a sistema externo", color: "bg-teal-100 text-teal-900" },
  cta: { titulo: "Llamada a la acción", color: "bg-primary text-white" },
};

export type Bloque = {
  id: string;
  tipo: TipoBloque;
  titulo?: string;
  texto?: string;
  alt?: string;
  src?: string;
  /** Bloque tabla: primera fila = encabezados. Sin encabezados no se publica. */
  tabla?: string[][];
  /** Bloque enlace externo: texto visible + destino. Sin texto descriptivo no se publica. */
  textoEnlace?: string;
  destino?: string;
  plegado?: boolean;
};

/** Extrae Markdown simple [#, ##, ###] a niveles de encabezado, en orden. */
export function nivelesDeMarkdown(texto: string): number[] {
  const out: number[] = [];
  for (const linea of texto.split("\n")) {
    const m = /^(#{1,6})\s+\S/.exec(linea.trim());
    if (m) out.push(m[1].length);
  }
  return out;
}

/** Extrae [texto](destino) de Markdown a pares. */
export function enlacesDeMarkdown(texto: string): { texto: string; destino: string }[] {
  const out: { texto: string; destino: string }[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(texto)) !== null) out.push({ texto: m[1], destino: m[2] });
  return out;
}
