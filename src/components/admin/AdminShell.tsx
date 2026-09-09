"use client";

import { AdminSidebar } from "./AdminSidebar";

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
        <p role="note" aria-label="Aviso de entorno de demostración" className="border-b border-amber-200 bg-amber-50 px-6 py-2 text-sm text-amber-900">
          Entorno de demostración: los cambios se guardan en ficheros versionados del prototipo y se restablecen con el botón de la configuración.
        </p>
        <main id="contenido-admin" tabIndex={-1} className="min-w-0 flex-1 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
