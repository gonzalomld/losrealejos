import { formatearFechaHoraES } from "@/lib/formato";
import type { Evento } from "@/data/eventos";
import { MapPin } from "lucide-react";

export function EventoCard({ evento }: { evento: Evento }) {
  return (
    <article className="flex h-full flex-col rounded border bg-card p-4">
      <p className="text-sm font-bold uppercase tracking-wide text-primary">
        Evento · {formatearFechaHoraES(evento.fechaHoraISO)}
      </p>
      <h3 className="mt-1 text-lg font-bold leading-snug">
        <a href={`/agenda/${evento.id}`} className="underline-offset-4 hover:underline">
          {evento.titulo}
        </a>
      </h3>
      <p className="mt-1 flex items-center gap-1 text-base text-muted-foreground">
        <MapPin aria-hidden="true" size={16} />
        {evento.lugar}
      </p>
    </article>
  );
}
