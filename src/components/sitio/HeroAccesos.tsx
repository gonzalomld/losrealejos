import { CreditCard, TriangleAlert, HandCoins, Briefcase } from "lucide-react";

const ACCESOS = [
  {
    href: "https://losrealejos.es/hacienda/pago-de-tributos-y-multas/",
    texto: "Pagar tributos",
    descripcion: "IBI, tasas y multas. Se paga con tarjeta.",
    detalle: "Necesitas la carta de pago y una tarjeta bancaria.",
    Icono: CreditCard,
    externa: true,
  },
  {
    href: "http://www.lineaverdelosrealejos.es/lv/incidencias_online.asp",
    texto: "Comunicar una incidencia",
    descripcion: "Avisar de un problema en la calle.",
    detalle: "Cuéntanos dónde está y qué pasa, con una foto si puedes.",
    Icono: TriangleAlert,
    externa: true,
  },
  {
    href: "/ayudas",
    texto: "Ayudas y subvenciones",
    descripcion: "Ayudas con plazo abierto.",
    detalle: "Mira para quién es cada ayuda y hasta cuándo se puede pedir.",
    Icono: HandCoins,
    externa: false,
  },
  {
    href: "/empleo-publico",
    texto: "Empleo público",
    descripcion: "Trabajar en el Ayuntamiento.",
    detalle: "Convocatorias abiertas, bases y cómo participar.",
    Icono: Briefcase,
    externa: false,
  },
];

/**
 * Cuatro accesos bajo el hero. Sede Electrónica y Cita previa no se repiten:
 * ya están en la barra de servicio.
 */
export function HeroAccesos() {
  return (
    <nav aria-label="Accesos directos" className="mx-auto max-w-6xl px-4">
      <ul className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {ACCESOS.map(({ href, texto, descripcion, detalle, Icono, externa }) => (
          <li key={texto} className="h-full">
            <a
              href={href}
              {...(externa ? { target: "_blank", rel: "noopener" } : {})}
              aria-label={externa ? `${texto}: ${descripcion} ${detalle} (se abre otro sistema en pestaña nueva)` : `${texto}: ${descripcion} ${detalle}`}
              className="tarjeta-acceso flex h-full flex-col gap-1 rounded border-2 border-primary bg-card p-4 font-bold text-primary"
            >
              <span className="flex items-center gap-2 text-lg">
                <Icono aria-hidden="true" size={28} />
                {texto}
              </span>
              <span className="text-base font-semibold">{descripcion}</span>
              <span className="text-sm font-normal text-muted-foreground">{detalle}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
