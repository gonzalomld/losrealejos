import { formatearFechaES } from "@/lib/formato";
import type { Noticia } from "@/data/noticias";
import { ETIQUETAS_CATEGORIA_NOTICIA } from "@/data/noticias";
import { CalendarDays } from "lucide-react";

export function NoticiaCard({ noticia }: { noticia: Noticia }) {
  return (
    <article className="flex h-full flex-col rounded border bg-card p-4">
      <p className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-primary">
        <CalendarDays aria-hidden="true" size={16} />
        Noticia · {ETIQUETAS_CATEGORIA_NOTICIA[noticia.categoria] ?? noticia.categoria} · {formatearFechaES(noticia.fecha)}
      </p>
      <h3 className="mt-1 text-lg font-bold leading-snug">
        <a href={`/noticias/${noticia.id}`} className="underline-offset-4 hover:underline">
          {noticia.titular}
        </a>
      </h3>
      <p className="mt-1 text-base text-muted-foreground">{noticia.entradilla}</p>
    </article>
  );
}
