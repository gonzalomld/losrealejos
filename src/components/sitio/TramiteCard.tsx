import { ETIQUETAS_CANAL, ETIQUETAS_TEMA } from "@/data/vocabularios";
import type { Tramite } from "@/data/tramites";
import { FileText } from "lucide-react";

export function TramiteCard({ tramite }: { tramite: Tramite }) {
  const canalClave = tramite.canales.includes("presencial") && tramite.canales.length === 1 ? "presencial" : tramite.canales.includes("online") || tramite.canales.includes("ambos") ? "online" : "presencial";
  const etiquetaCanal = tramite.canales.length === 1 && tramite.canales[0] === "presencial"
    ? ETIQUETAS_CANAL.presencial
    : tramite.canales.length === 1 && tramite.canales[0] === "online"
      ? ETIQUETAS_CANAL.online
      : ETIQUETAS_CANAL.ambos;
  return (
    <article className="flex h-full flex-col rounded border bg-card p-4">
      <p className="text-sm font-bold uppercase tracking-wide text-primary">Trámite · {ETIQUETAS_TEMA[tramite.tema]}</p>
      <h3 className="mt-1 text-lg font-bold leading-snug">
        <a href={`/tramites/${tramite.id}`} className="underline-offset-4 hover:underline">
          {tramite.tituloClaro}
        </a>
      </h3>
      <p className="mt-1 line-clamp-2 text-base text-muted-foreground">{tramite.descripcion}</p>
      <p className="mt-auto pt-3">
        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${canalClave === "online" ? "bg-exito-fondo text-exito" : "bg-atencion-fondo text-atencion"}`}>
          <FileText aria-hidden="true" size={16} />
          {etiquetaCanal}
        </span>
      </p>
    </article>
  );
}
