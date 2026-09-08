import { FileDown, Database } from "lucide-react";
import { formatearFechaES } from "@/lib/formato";
import type { DocumentoTransparencia } from "@/data/transparencia";

export function DocumentoRow({ documento }: { documento: DocumentoTransparencia }) {
  return (
    <li className="rounded border bg-card p-4">
      <h3 className="text-lg font-bold leading-snug">{documento.titulo}</h3>
      <p className="mt-1 text-base text-muted-foreground">{documento.descripcion}</p>
      <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        <div className="flex gap-1"><dt className="font-semibold">Publicado:</dt><dd>{formatearFechaES(documento.fechaPublicacion)}</dd></div>
        <div className="flex gap-1"><dt className="font-semibold">Actualizado:</dt><dd>{formatearFechaES(documento.fechaActualizacion)}</dd></div>
        <div className="flex gap-1"><dt className="font-semibold">Formato:</dt><dd>{documento.formato}</dd></div>
        <div className="flex gap-1"><dt className="font-semibold">Tamaño:</dt><dd>{documento.tamano}</dd></div>
        <div className="flex gap-1"><dt className="font-semibold">Ejercicio:</dt><dd>{documento.ejercicio}</dd></div>
      </dl>
      <p className="mt-2 flex flex-wrap items-center gap-2">
        {documento.abierto && (
          <span className="inline-flex items-center gap-1 rounded-full bg-info-fondo px-3 py-1 text-sm font-bold text-info">
            <Database aria-hidden="true" size={16} />
            Dato abierto reutilizable
          </span>
        )}
        <a
          href={`/transparencia/${documento.bloque}#${documento.id}`}
          className="inline-flex items-center gap-1 font-bold text-primary underline underline-offset-4"
          aria-label={`Descargar ${documento.titulo} en formato ${documento.formato}, ${documento.tamano} (documento de muestra)`}
        >
          <FileDown aria-hidden="true" size={16} />
          Descargar {documento.formato} ({documento.tamano})
        </a>
      </p>
    </li>
  );
}
