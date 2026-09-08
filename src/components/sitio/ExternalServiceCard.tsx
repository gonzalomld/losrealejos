import { ExternalLink } from "lucide-react";

export type ServicioExterno = "sede" | "urbanismo" | "pago" | "cita" | "incidencias" | "turismo";

const NOMBRES: Record<ServicioExterno, string> = {
  sede: "Sede Electrónica",
  urbanismo: "Gerencia Municipal de Urbanismo (GMU)",
  pago: "Pago online de tributos y multas",
  cita: "Cita previa de la Oficina de Atención Ciudadana",
  incidencias: "Comunicación de incidencias en vía pública",
  turismo: "Portal turístico municipal",
};

export function ExternalServiceCard({
  servicio,
  quePuedesHacer,
  identificacion,
  href,
  textoEnlace,
}: {
  servicio: ServicioExterno;
  quePuedesHacer: string;
  identificacion?: string;
  href: string;
  textoEnlace?: string;
}) {
  const nombre = NOMBRES[servicio];
  return (
    <div className="rounded border-2 border-primary bg-info-fondo p-4">
      <h3 className="text-lg font-bold text-foreground">{nombre}</h3>
      <p className="mt-1 text-base text-foreground">{quePuedesHacer}</p>
      {identificacion && (
        <p className="mt-1 text-base text-foreground">
          <strong>Para identificarte necesitarás:</strong> {identificacion}
        </p>
      )}
      <p className="mt-3">
        <a
          href={href}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded bg-primary px-5 py-3 font-bold text-white"
          aria-label={`${textoEnlace ?? `Ir a ${nombre}`} (se abre otro sistema en pestaña nueva)`}
        >
          {textoEnlace ?? `Ir a ${nombre}`}
          <ExternalLink aria-hidden="true" size={18} />
        </a>
      </p>
    </div>
  );
}

export function ExternalInlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="font-semibold text-primary underline underline-offset-4">
      {children}
      <span className="sr-only"> (se abre otro sistema en pestaña nueva)</span>
      <ExternalLink aria-hidden="true" size={14} className="ml-1 inline" />
    </a>
  );
}
