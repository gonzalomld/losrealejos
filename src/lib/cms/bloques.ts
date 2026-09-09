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
  plegado?: boolean;
};
