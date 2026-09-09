import { CONTACTO_OAC } from "@/data/vocabularios";
import { Facebook, Instagram, Twitter, Youtube, Globe } from "lucide-react";

type GrupoEnlace = { texto: string; href: string };
type Grupo = { id: string; titulo: string; enlaces: GrupoEnlace[] };

const GRUPOS: Grupo[] = [
  {
    id: "pie-tramites",
    titulo: "Trámites",
    enlaces: [
      { texto: "Trámites y servicios", href: "/tramites" },
      { texto: "Empadronarme", href: "/tramites/alta-en-el-padron" },
      { texto: "Pagar el IBI o una tasa", href: "/tramites/pago-ibi-tasas" },
      { texto: "Ayudas y subvenciones", href: "/ayudas" },
      { texto: "Empleo público", href: "/empleo-publico" },
    ],
  },
  {
    id: "pie-dia",
    titulo: "Mi día a día",
    enlaces: [
      { texto: "Mi barrio y mi día a día", href: "/mi-barrio" },
      { texto: "Agenda de eventos", href: "/agenda" },
      { texto: "Noticias", href: "/noticias" },
      { texto: "Mapa del sitio", href: "/mapa-del-sitio" },
      { texto: "Contacto y atención ciudadana", href: "/contacto" },
    ],
  },
  {
    id: "pie-ayto",
    titulo: "Ayuntamiento",
    enlaces: [
      { texto: "Ayuntamiento", href: "/ayuntamiento" },
      { texto: "Áreas municipales", href: "/areas-municipales" },
      { texto: "Ordenanzas y normas", href: "/ordenanzas" },
      { texto: "Tablón de anuncios", href: "/tablon-de-anuncios" },
    ],
  },
  {
    id: "pie-transparencia",
    titulo: "Transparencia",
    enlaces: [
      { texto: "Portal de transparencia", href: "/transparencia" },
      { texto: "Contratación y convenios", href: "/transparencia/contratacion" },
      { texto: "Presupuestos y cuentas", href: "/transparencia/economica" },
      { texto: "Corporación y plenos", href: "/transparencia/institucional" },
    ],
  },
  {
    id: "pie-legal",
    titulo: "Legal y seguimiento",
    enlaces: [
      { texto: "Aviso legal", href: "/aviso-legal" },
      { texto: "Política de cookies", href: "/politica-de-cookies" },
      { texto: "Protección de datos", href: "/proteccion-de-datos" },
      { texto: "Declaración de accesibilidad", href: "/accesibilidad" },
      { texto: "Reclamar sobre accesibilidad", href: "/accesibilidad/reclamacion" },
    ],
  },
];

const REDES = [
  { nombre: "Facebook del Ayuntamiento (se abre en pestaña nueva)", href: "https://www.facebook.com/Ayuntamientodelosrealejos", Icono: Facebook },
  { nombre: "X (Twitter) del Ayuntamiento (se abre en pestaña nueva)", href: "https://x.com/Los_Realejos", Icono: Twitter },
  { nombre: "Instagram del Ayuntamiento (se abre en pestaña nueva)", href: "https://www.instagram.com/aytolosrealejos/", Icono: Instagram },
  { nombre: "YouTube del Ayuntamiento (se abre en pestaña nueva)", href: "https://www.youtube.com/@AyuntamientodeLosRealejos", Icono: Youtube },
  { nombre: "Web de turismo: losrealejos.travel (web independiente, se abre en pestaña nueva)", href: "https://losrealejos.travel", Icono: Globe },
];

export function SiteFooter() {
  return (
    <footer role="contentinfo" className="pie-portal" aria-label="Pie del portal">
      <div className="pie-tarjeta">
        <div className="pie-degradado" aria-hidden="true" />
        <div className="pie-contenido">
          <div className="pie-marca">
            <p className="pie-marca-nombre">
              <img
                src="/logo-r.png"
                alt="Escudo del Ayuntamiento de Los Realejos"
                width={44}
                height={44}
                className="pie-logo"
                loading="lazy"
              />
              <span>Ayuntamiento de la Villa de Los Realejos</span>
            </p>
            <p className="pie-copy">© 2026 Ayuntamiento de la Villa de Los Realejos. Todos los derechos reservados.</p>
            <address className="pie-direccion not-italic">
              {CONTACTO_OAC.direccion}
              <br />
              <a href={CONTACTO_OAC.telefonoHref} className="pie-telefono" aria-label={`Llamar al Ayuntamiento: ${CONTACTO_OAC.telefono}`}>
                {CONTACTO_OAC.telefono}
              </a>
              <br />
              <span>{CONTACTO_OAC.horario}</span>
            </address>
            <ul className="pie-redes" aria-label="Redes sociales del Ayuntamiento">
              {REDES.map(({ nombre, href, Icono }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener" aria-label={nombre} className="pie-red">
                    <Icono aria-hidden="true" size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {GRUPOS.map((grupo) => (
            <nav key={grupo.id} aria-labelledby={grupo.id} className="pie-grupo">
              <h2 id={grupo.id} className="pie-grupo-titulo">{grupo.titulo}</h2>
              <ul className="pie-grupo-lista">
                {grupo.enlaces.map((e) => (
                  <li key={e.href + e.texto}>
                    <a href={e.href} className="pie-enlace">{e.texto}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
