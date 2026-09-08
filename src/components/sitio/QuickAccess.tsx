import { CalendarCheck, CreditCard, TriangleAlert, HandCoins, Briefcase, ExternalLink } from "lucide-react";

const ACCESOS = [
  { href: "https://sede.losrealejos.es/cita-previa", texto: "Cita previa", descripcion: "Pedir cita en la OAC", Icono: CalendarCheck, externa: true },
  { href: "https://sede.losrealejos.es/pago", texto: "Pagar tributos", descripcion: "IBI, tasas y multas", Icono: CreditCard, externa: true },
  { href: "https://sede.losrealejos.es/incidencias", texto: "Comunicar una incidencia", descripcion: "Avisar de un problema en la calle", Icono: TriangleAlert, externa: true },
  { href: "/ayudas", texto: "Ayudas y subvenciones", descripcion: "Ayudas con plazo abierto", Icono: HandCoins, externa: false },
  { href: "/empleo-publico", texto: "Empleo público", descripcion: "Trabajar en el Ayuntamiento", Icono: Briefcase, externa: false },
  { href: "https://sede.losrealejos.es", texto: "Sede Electrónica", descripcion: "Hacer trámites por internet", Icono: ExternalLink, externa: true },
];

export function QuickAccess() {
  return (
    <nav aria-label="Accesos rápidos" className="border-b bg-card">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-4 py-3 sm:grid-cols-3 lg:grid-cols-6">
        {ACCESOS.map(({ href, texto, descripcion, Icono, externa }) => (
          <li key={texto}>
            <a
              href={href}
              {...(externa ? { target: "_blank", rel: "noopener" } : {})}
              aria-label={externa ? `${texto}: ${descripcion} (se abre otro sistema en pestaña nueva)` : `${texto}: ${descripcion}`}
              className="flex h-full flex-col items-center gap-1 rounded border-2 border-primary px-2 py-3 text-center font-bold text-primary hover:bg-info-fondo"
            >
              <Icono aria-hidden="true" size={28} />
              <span>{texto}</span>
              <span className="text-xs font-normal text-muted-foreground">{descripcion}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
