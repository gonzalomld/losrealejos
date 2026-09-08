import { Phone, MapPin, Clock } from "lucide-react";
import { CONTACTO_OAC } from "@/data/vocabularios";

export function SiteFooter() {
  return (
    <footer className="mt-12 bg-primary text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h2 className="text-lg font-bold">Oficina de Atención Ciudadana (OAC)</h2>
          <address className="mt-2 text-base not-italic">
            <p className="flex items-start gap-2">
              <MapPin aria-hidden="true" size={18} className="mt-1 shrink-0" />
              {CONTACTO_OAC.direccion}
            </p>
            <p className="mt-2 flex items-center gap-2">
              <Phone aria-hidden="true" size={18} className="shrink-0" />
              <a href={CONTACTO_OAC.telefonoHref} className="font-bold underline underline-offset-4">
                {CONTACTO_OAC.telefono}
              </a>
            </p>
            <p className="mt-2 flex items-start gap-2">
              <Clock aria-hidden="true" size={18} className="mt-1 shrink-0" />
              {CONTACTO_OAC.horario} <span className="text-sm">(dato de ejemplo)</span>
            </p>
          </address>
          <p className="mt-3">
            <a href="/contacto" className="font-semibold underline underline-offset-4">
              Ver cómo llegar a la Oficina de Atención Ciudadana
            </a>
          </p>
        </div>
        <nav aria-label="Secciones del portal">
          <h2 className="text-lg font-bold">Secciones</h2>
          <ul className="mt-2 space-y-2 text-base">
            <li><a className="underline underline-offset-4" href="/tramites">Trámites y servicios</a></li>
            <li><a className="underline underline-offset-4" href="/mi-barrio">Mi barrio y mi día a día</a></li>
            <li><a className="underline underline-offset-4" href="/areas-municipales">Áreas municipales</a></li>
            <li><a className="underline underline-offset-4" href="/agenda">Agenda de eventos</a></li>
            <li><a className="underline underline-offset-4" href="/noticias">Noticias</a></li>
            <li><a className="underline underline-offset-4" href="/mapa-del-sitio">Mapa del sitio</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="text-lg font-bold">Síguenos</h2>
          <ul className="mt-2 space-y-2 text-base">
            <li><a className="underline underline-offset-4" href="https://www.facebook.com/Ayuntamientodelosrealejos" target="_blank" rel="noopener">Facebook del Ayuntamiento (se abre en pestaña nueva)</a></li>
            <li><a className="underline underline-offset-4" href="https://x.com/Los_Realejos" target="_blank" rel="noopener">X (Twitter) del Ayuntamiento (se abre en pestaña nueva)</a></li>
            <li><a className="underline underline-offset-4" href="https://www.instagram.com/aytolosrealejos/" target="_blank" rel="noopener">Instagram del Ayuntamiento (se abre en pestaña nueva)</a></li>
            <li><a className="underline underline-offset-4" href="https://www.youtube.com/@AyuntamientodeLosRealejos" target="_blank" rel="noopener">YouTube del Ayuntamiento (se abre en pestaña nueva)</a></li>
            <li><a className="underline underline-offset-4" href="https://losrealejos.travel" target="_blank" rel="noopener">Web de turismo: losrealejos.travel (web independiente, se abre en pestaña nueva)</a></li>
          </ul>
        </div>
        <nav aria-label="Avisos legales">
          <h2 className="text-lg font-bold">Avisos legales</h2>
          <ul className="mt-2 space-y-2 text-base">
            <li><a className="underline underline-offset-4" href="/aviso-legal">Aviso legal</a></li>
            <li><a className="underline underline-offset-4" href="/politica-de-cookies">Política de cookies</a></li>
            <li><a className="underline underline-offset-4" href="/proteccion-de-datos">Protección de datos</a></li>
            <li><a className="underline underline-offset-4" href="/accesibilidad">Declaración de accesibilidad</a></li>
            <li><a className="underline underline-offset-4" href="/accesibilidad/reclamacion">Reclamar sobre accesibilidad de esta web</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/25">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm">
          Ayuntamiento de la Villa de Los Realejos · Última actualización del portal: 8 de septiembre de 2026
        </p>
      </div>
    </footer>
  );
}
