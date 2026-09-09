"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { NAV_MEGAMENU } from "@/data/navegacion";
import { MegaMenuPanel } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

export function SiteNav() {
  const ruta = usePathname() ?? "";
  const [abierta, setAbierta] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const botonesRef = useRef<Record<string, HTMLButtonElement | null>>({});

  // Cierra al navegar.
  useEffect(() => {
    setAbierta(null);
  }, [ruta]);
  useEffect(() => {
    if (!abierta) return;
    function alPulsar(e: KeyboardEvent) {
      if (e.key === "Escape") {
        const href = abierta;
        setAbierta(null);
        if (href) botonesRef.current[href]?.focus();
      }
    }
    function alClic(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setAbierta(null);
    }
    document.addEventListener("keydown", alPulsar);
    document.addEventListener("mousedown", alClic);
    return () => {
      document.removeEventListener("keydown", alPulsar);
      document.removeEventListener("mousedown", alClic);
    };
  }, [abierta]);

  return (
    <div className="flex min-w-0 flex-1 items-center">
      <nav ref={navRef} aria-label="Navegación principal" className="hidden min-w-0 flex-1 xl:block">
        <ul className="flex flex-nowrap items-center justify-center gap-x-1">
          {NAV_MEGAMENU.map((item) => {
            const activo = ruta === item.href || ruta.startsWith(item.href + "/");
            const expandida = abierta === item.href;
            const idPanel = `megamenu-${item.href.slice(1)}`;
            return (
              <li key={item.href} className="shrink-0">
                <button
                  ref={(el) => {
                    botonesRef.current[item.href] = el;
                  }}
                  type="button"
                  aria-expanded={expandida}
                  aria-controls={idPanel}
                  aria-current={activo ? "page" : undefined}
                  onClick={() => setAbierta(expandida ? null : item.href)}
                  className={`nav-pill foco-sobre-oscuro ${activo ? "nav-pill-activo" : ""}`}
                >
                  {item.texto}
                  {activo && <span className="sr-only"> (sección actual)</span>}
                  <ChevronDown
                    aria-hidden="true"
                    size={14}
                    className={expandida ? "rotate-180" : ""}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <MobileNav rutaActual={ruta} />
      {abierta &&
        (() => {
          const seccion = NAV_MEGAMENU.find((s) => s.href === abierta);
          if (!seccion) return null;
          return (
            <MegaMenuPanel
              seccion={seccion}
              idPanel={`megamenu-${seccion.href.slice(1)}`}
              alNavegar={() => setAbierta(null)}
            />
          );
        })()}
    </div>
  );
}
