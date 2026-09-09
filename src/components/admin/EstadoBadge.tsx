import { AlertTriangle, CheckCircle2, Clock, Info, PauseCircle, Archive, FileEdit } from "lucide-react";
import { ETIQUETAS_ESTADO, type EstadoContenido } from "@/lib/cms/tipos-editoriales";

const MAPA: Record<EstadoContenido, { clase: string; Icono: typeof Info }> = {
  publicado: { clase: "bg-green-50 text-green-900 ring-green-200", Icono: CheckCircle2 },
  borrador: { clase: "bg-neutral-100 text-neutral-700 ring-neutral-300", Icono: FileEdit },
  en_revision: { clase: "bg-amber-50 text-amber-900 ring-amber-200", Icono: Clock },
  caducado: { clase: "bg-red-50 text-red-900 ring-red-200", Icono: AlertTriangle },
  programado: { clase: "bg-blue-50 text-blue-900 ring-blue-200", Icono: PauseCircle },
  archivado: { clase: "bg-neutral-100 text-neutral-500 ring-neutral-300", Icono: Archive },
};

/** Estado: siempre etiqueta de color suave CON texto e icono, nunca solo color. */
export function EstadoBadge({ estado }: { estado: EstadoContenido }) {
  const { clase, Icono } = MAPA[estado];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${clase}`}>
      <Icono aria-hidden="true" size={13} />
      {ETIQUETAS_ESTADO[estado]}
    </span>
  );
}
