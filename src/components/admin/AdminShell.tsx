"use client";

import { AdminSidebar } from "./AdminSidebar";
import { AvisoBackend, AvisoSoloLectura } from "./EscrituraContext";

/**
 * Armazón del gestor: barra lateral blanca + área de trabajo.
 * Sin cabecera institucional, sin pie del portal, sin cookies.
 */
export function AdminShell({ children, pendientes = 8 }: { children: React.ReactNode; pendientes?: number }) {
  return (
    <div className="flex min-h-screen bg-white text-neutral-900">
      <a href="#contenido-admin" className="enlace-salto">
        Saltar al contenido del gestor
      </a>
      <AdminSidebar pendientes={pendientes} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AvisoBackend />
        <AvisoSoloLectura />
        <main id="contenido-admin" tabIndex={-1} className="min-w-0 flex-1 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
