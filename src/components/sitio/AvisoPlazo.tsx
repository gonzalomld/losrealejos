import { CalendarClock, TriangleAlert, Megaphone } from "lucide-react";
import { diasRestantes, estadoPlazo, formatearFechaES } from "@/lib/formato";
import { ETIQUETAS_TIPO_AVISO, type Aviso } from "@/data/avisos";

export function AvisoPlazo({ aviso }: { aviso: Aviso }) {
  const conPlazo = aviso.finPlazoISO !== null;
  const estado = estadoPlazo(aviso.finPlazoISO);
  const dias = aviso.finPlazoISO ? diasRestantes(aviso.finPlazoISO) : null;
  const Icono = conPlazo
    ? estado === "proximo" || estado === "cerrado" ? TriangleAlert : CalendarClock
    : Megaphone;
  // Los avisos con plazo destacan: fondo tenue + borde grueso. Nunca solo color:
  // icono + insignia textual "Caduca" siempre presentes.
  const marco = conPlazo
    ? estado === "proximo"
      ? "border-atencion border-l-8 bg-atencion-fondo"
      : estado === "cerrado"
        ? "border-nodisponible border-l-8 bg-nodisponible-fondo"
        : "border-exito border-l-8 bg-exito-fondo"
    : "border-border border-l-4 bg-card";
  return (
    <article className={`rounded border p-4 ${marco}`}>
      <p className="etiqueta-categoria flex flex-wrap items-center gap-1 !text-foreground">
        <Icono aria-hidden="true" size={14} />
        {ETIQUETAS_TIPO_AVISO[aviso.tipo]}
        <span>· {conPlazo ? "Con plazo de solicitud" : "Aviso puntual"}</span>
      </p>
      {conPlazo && aviso.finPlazoISO && (
        <p className="mt-1 inline-block rounded bg-primary px-2 py-0.5 text-sm font-bold text-white">
          {estado === "cerrado"
            ? `Plazo cerrado el ${formatearFechaES(aviso.finPlazoISO)}`
            : `Caduca: ${formatearFechaES(aviso.finPlazoISO)}${dias !== null ? ` (quedan ${dias} días)` : ""}`}
        </p>
      )}
      {!conPlazo && aviso.fechaHechoISO && (
        <p className="mt-1 text-sm font-bold">Fecha: {formatearFechaES(aviso.fechaHechoISO)}</p>
      )}
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
