import { CalendarClock, TriangleAlert, Info } from "lucide-react";
import { diasRestantes, estadoPlazo, formatearFechaES } from "@/lib/formato";
import { ETIQUETAS_TIPO_AVISO, type Aviso } from "@/data/avisos";

export function AvisoPlazo({ aviso }: { aviso: Aviso }) {
  const estado = estadoPlazo(aviso.finPlazoISO);
  const dias = aviso.finPlazoISO ? diasRestantes(aviso.finPlazoISO) : null;
  const Icono = estado === "proximo" || estado === "cerrado" ? TriangleAlert : estado === "sin-plazo" ? Info : CalendarClock;
  const clase = estado === "proximo" ? "border-l-atencion" : estado === "cerrado" ? "border-l-nodisponible" : "border-l-exito";
  return (
    <article className={`rounded border border-border border-l-8 bg-card p-4 ${clase}`}>
      <p className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground">
        <Icono aria-hidden="true" size={18} />
        {ETIQUETAS_TIPO_AVISO[aviso.tipo]}
        {aviso.finPlazoISO && estado !== "cerrado" && dias !== null && (
          <span>· Fin de plazo: {formatearFechaES(aviso.finPlazoISO)} (quedan {dias} días)</span>
        )}
        {aviso.finPlazoISO && estado === "cerrado" && (
          <span>· Plazo cerrado el {formatearFechaES(aviso.finPlazoISO)}</span>
        )}
      </p>
      <h3 className="mt-1 text-lg font-bold text-foreground">{aviso.titulo}</h3>
      <p className="mt-1 text-base text-muted-foreground">{aviso.descripcion}</p>
      <p className="mt-2">
        <a href={aviso.enlace} className="font-bold text-primary underline underline-offset-4">
          {aviso.enlaceTexto}
        </a>
      </p>
    </article>
  );
}
