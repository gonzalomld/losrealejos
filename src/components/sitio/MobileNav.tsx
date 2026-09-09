"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";

export const NAV_PRINCIPAL = [
  { href: "/tramites", texto: "Trámites y servicios" },
  { href: "/mi-barrio", texto: "Mi barrio y mi día a día" },
  { href: "/ayuntamiento", texto: "Ayuntamiento" },
  { href: "/transparencia", texto: "Transparencia" },
  { href: "/noticias", texto: "Actualidad" },
];

function SearchBoxCompactoMovil() {
  const router = useRouter();
  const [valor, setValor] = useState("");
  return (
    <form
      role="search"
      aria-label="Buscar en el portal"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/buscar?q=${encodeURIComponent(valor.trim())}`);
      }}
    >
      <label htmlFor="buscador-movil" className="font-bold">
        Buscar en el portal
      </label>
      <div className="mt-1 flex gap-2">
        <input
          id="buscador-movil"
          name="q"
          type="search"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Ejemplo: empadronarme, IBI…"
          autoComplete="off"
          className="w-full rounded border-2 border-primary bg-white px-3 py-2 text-base text-black"
        />
        <button
          type="submit"
          className="flex items-center gap-1 rounded bg-primary px-4 py-2 font-bold text-white"
        >
          <Search aria-hidden="true" size={18} />
          Buscar
        </button>
      </div>
    </form>
  );
}

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
    <div className="shrink-0 xl:hidden">
      <button
        ref={botonRef}
        type="button"
        aria-expanded={abierto}
        aria-controls="menu-movil"
        onClick={() => setAbierto(!abierto)}
        className="foco-sobre-oscuro flex items-center gap-2 rounded border-2 border-white px-4 py-2 font-bold text-white"
      >
        {abierto ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        {abierto ? "Cerrar menú" : "Abrir menú"}
      </button>
      {abierto && (
        <div ref={panelRef} id="menu-movil" className="absolute inset-x-0 top-full z-50 border bg-background text-foreground shadow-lg">
          <div className="px-4 pt-3">
            <SearchBoxCompactoMovil />
          </div>
          <ul className="divide-y divide-border px-4 py-2">
            {NAV_PRINCIPAL.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={rutaActual.startsWith(item.href) ? "page" : undefined}
                  className="block w-full py-3 text-lg font-semibold text-primary underline-offset-4"
                >
                  {item.texto}
                  {rutaActual.startsWith(item.href) && (
                    <span className="ml-2 text-sm font-normal">(sección actual)</span>
                  )}
                </a>
              </li>
            ))}
            <li>
              <a href="/agenda" className="block w-full py-3 text-lg font-semibold text-primary">
                Agenda de eventos
              </a>
            </li>
            <li>
              <a href="/contacto" className="block w-full py-3 text-lg font-semibold text-primary">
                Contacto y atención ciudadana
              </a>
            </li>
            <li>
              <a
                href="https://sede.losrealejos.es"
                target="_blank"
                rel="noopener"
                className="block w-full py-3 text-lg font-semibold text-primary"
                aria-label="Sede Electrónica: hacer trámites por internet, requiere certificado digital o Cl@ve (se abre otro sistema en pestaña nueva)"
              >
                Sede Electrónica (requiere certificado digital o Cl@ve)
              </a>
            </li>
            <li>
              <a
                href="https://losrealejos.es/atencion-ciudadana/cita-previa/"
                target="_blank"
                rel="noopener"
                className="block w-full py-3 text-lg font-semibold text-primary"
                aria-label="Cita previa: pedir cita en la Oficina de Atención Ciudadana (se abre otro sistema en pestaña nueva)"
              >
                Cita previa
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
