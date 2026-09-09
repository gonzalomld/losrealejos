import { CONTACTO_OAC } from "@/data/vocabularios";
import { BuscadorCabecera } from "./BuscadorCabecera";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  return (
    <header className="relative">
      {/* Nivel 1 — Barra de servicio: utilidad, no protagonismo */}
      <div className="barra-servicio">
        <nav aria-label="Servicios y contacto" className="mx-auto max-w-6xl px-4">
          {/* En tableta y móvil solo el teléfono; el resto vive en el menú desplegable */}
          <ul className="hidden items-center justify-end text-sm xl:flex">
            <li>
              <a
                href="https://sede.losrealejos.es"
                target="_blank"
                rel="noopener"
                className="foco-sobre-oscuro"
                aria-label="Sede Electrónica: hacer trámites por internet, requiere certificado digital o Cl@ve (se abre otro sistema en pestaña nueva)"
              >
                Sede Electrónica
                <span className="distintivo-cert">Certificado/Cl@ve</span>
              </a>
            </li>
            <li>
              <a
                href="https://losrealejos.es/atencion-ciudadana/cita-previa/"
                target="_blank"
                rel="noopener"
                className="foco-sobre-oscuro"
                aria-label="Cita previa: pedir cita en la Oficina de Atención Ciudadana (se abre otro sistema en pestaña nueva)"
              >
                Cita previa
              </a>
            </li>
            <li>
              <a href="/contacto" className="foco-sobre-oscuro">
                Contacto
              </a>
            </li>
            <li>
              <a
                href={CONTACTO_OAC.telefonoHref}
                className="foco-sobre-oscuro font-bold"
                aria-label={`Llamar al Ayuntamiento: ${CONTACTO_OAC.telefono}`}
              >
                Tel. {CONTACTO_OAC.telefono}
              </a>
            </li>
          </ul>
          <p className="flex items-center justify-end py-1 text-sm xl:hidden">
            <a
              href={CONTACTO_OAC.telefonoHref}
              className="foco-sobre-oscuro font-bold"
              aria-label={`Llamar al Ayuntamiento: ${CONTACTO_OAC.telefono}`}
            >
              Tel. {CONTACTO_OAC.telefono}
            </a>
          </p>
        </nav>
      </div>
      {/* Nivel 2 — Navbar azul de marca: una sola fila logo | nav | lupa */}
      <div className="navbar-marca">
        <div className="navbar-fila mx-auto flex max-w-6xl flex-nowrap items-center gap-x-3 px-4">
          <a href="/" className="logo-marca-link flex shrink-0 items-center gap-3" aria-label="Ayuntamiento de Los Realejos, ir a la portada">
            <img
              src="/logo-r.png"
              alt=""
              aria-hidden="true"
              width={80}
              height={78}
              className="h-11 w-auto shrink-0"
            />
            <span className="logo-marca-texto">
              <span className="logo-marca-superior">Excmo. Ayuntamiento de</span>
              <span className="logo-marca-principal">Los Realejos</span>
            </span>
          </a>
          <SiteNav />
          <BuscadorCabecera />
        </div>
      </div>
    </header>
  );
}
