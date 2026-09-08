"use client";

import { usePathname } from "next/navigation";
import { NAV_PRINCIPAL, MobileNav } from "./MobileNav";

export function SiteNav() {
  const ruta = usePathname() ?? "";
  return (
    <>
      <nav aria-label="Navegación principal" className="hidden md:block">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_PRINCIPAL.map((item) => {
            const activo = ruta === item.href || (item.href !== "/" && ruta.startsWith(item.href));
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={activo ? "page" : undefined}
                  className={`text-lg font-semibold underline-offset-4 hover:underline ${
                    activo ? "underline decoration-[3px]" : ""
                  }`}
                >
                  {item.texto}
                  {activo && <span className="sr-only"> (sección actual)</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <MobileNav rutaActual={ruta} />
    </>
  );
}
