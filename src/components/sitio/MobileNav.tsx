"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export const NAV_PRINCIPAL = [
  { href: "/tramites", texto: "Trámites y servicios" },
  { href: "/mi-barrio", texto: "Mi barrio y mi día a día" },
  { href: "/ayuntamiento", texto: "Ayuntamiento" },
  { href: "/transparencia", texto: "Transparencia" },
  { href: "/noticias", texto: "Actualidad" },
];

export function MobileNav({ rutaActual }: { rutaActual: string }) {
  const [abierto, setAbierto] = useState(false);
  const botonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const panel = panelRef.current;
    const primerEnlace = panel?.querySelector("a");
    (primerEnlace as HTMLElement | null)?.focus();
    function alPulsar(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAbierto(false);
        botonRef.current?.focus();
      }
      // Foco atrapado: Tab circular dentro del panel
      if (e.key === "Tab" && panel) {
        const focos = Array.from(panel.querySelectorAll<HTMLElement>("a, button"));
        if (focos.length === 0) return;
        const primero = focos[0];
        const ultimo = focos[focos.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    }
    document.addEventListener("keydown", alPulsar);
    return () => document.removeEventListener("keydown", alPulsar);
  }, [abierto ]);

  return (
    <div className="md:hidden">
      <button
        ref={botonRef}
        type="button"
        aria-expanded={abierto}
        aria-controls="menu-movil"
        onClick={() => setAbierto(!abierto)}
        className="flex items-center gap-2 rounded border-2 border-white px-4 py-2 font-bold"
      >
        {abierto ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        {abierto ? "Cerrar menú" : "Abrir menú"}
      </button>
      {abierto && (
        <div ref={panelRef} id="menu-movil" className="absolute inset-x-0 top-full z-50 bg-primary text-white shadow-lg">
          <ul className="divide-y divide-white/20 px-4 py-2">
            {NAV_PRINCIPAL.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={rutaActual.startsWith(item.href) ? "page" : undefined}
                  className="block w-full py-3 text-lg font-semibold underline-offset-4"
                >
                  {item.texto}
                  {rutaActual.startsWith(item.href) && (
                    <span className="ml-2 text-sm font-normal">(sección actual)</span>
                  )}
                </a>
              </li>
            ))}
            <li>
              <a href="/agenda" className="block w-full py-3 text-lg font-semibold">
                Agenda de eventos
              </a>
            </li>
            <li>
              <a href="/contacto" className="block w-full py-3 text-lg font-semibold">
                Contacto y atención ciudadana
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
