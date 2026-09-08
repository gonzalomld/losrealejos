import { Phone } from "lucide-react";
import { CONTACTO_OAC, TRAMITES_FRECUENTES } from "@/data/vocabularios";
import { TRAMITES } from "@/data/tramites";
import { TramiteCard } from "./TramiteCard";

export function EmptyState({
  titulo,
  descripcion,
  mostrarFrecuentes = true,
}: {
  titulo: string;
  descripcion: string;
  mostrarFrecuentes?: boolean;
}) {
  const frecuentes = TRAMITES.filter((t) => (TRAMITES_FRECUENTES as readonly string[]).includes(t.id));
  return (
    <div className="rounded border bg-card p-6 text-center">
      <h2 className="text-xl font-bold">{titulo}</h2>
      <p className="mx-auto mt-2 max-w-[60ch] text-base">{descripcion}</p>
      <p className="mt-4">
        <a
          href={CONTACTO_OAC.telefonoHref}
          className="inline-flex items-center gap-2 rounded bg-primary px-5 py-3 font-bold text-white"
          aria-label={`Llamar a atención ciudadana: ${CONTACTO_OAC.telefono}`}
        >
          <Phone aria-hidden="true" size={18} />
          Llamar al {CONTACTO_OAC.telefono}
        </a>
      </p>
      {mostrarFrecuentes && (
        <>
          <h3 className="mt-6 text-lg font-bold">Trámites más frecuentes</h3>
          <ul className="mt-3 grid gap-3 text-left md:grid-cols-2">
            {frecuentes.map((t) => (
              <li key={t.id}>
                <TramiteCard tramite={t} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
