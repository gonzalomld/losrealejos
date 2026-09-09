"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, ChevronDown, CircleHelp, ExternalLink, LayoutDashboard } from "lucide-react";
import { ETIQUETAS_ROL, ROLES, useRol, type Rol } from "@/lib/roles/contexto";
import { NAV_ADMIN } from "./nav";

function iniciales(nombre: string): string {
  return nombre.split(/[\s.]+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

/** Barra lateral del gestor: blanca, grupos colapsables, activo en bloque sólido. */
export function AdminSidebar({ pendientes = 0 }: { pendientes?: number }) {
  const ruta = usePathname() ?? "";
  const { rol, setRol, usuario, seccionesVisibles } = useRol();
  const [abiertos, setAbiertos] = useState<Record<string, boolean>>({
    Contenido: true, Documentos: true, Gobernanza: true, Calidad: true, Configuración: true,
  });

  function alternar(grupo: string) {
    setAbiertos((a) => ({ ...a, [grupo]: !a[grupo] }));
  }

  return (
    <aside aria-label="Navegación del gestor" className="flex w-72 shrink-0 flex-col border-r border-neutral-200 bg-white">
      <div className="border-b border-neutral-200 p-3">
        <p className="px-1 text-sm font-extrabold leading-tight text-neutral-900">
          Gestor de contenidos
          <span className="block text-xs font-normal text-neutral-500">Ayto. de Los Realejos</span>
        </p>
        <div className="mt-2 flex items-center gap-1">
          <Link
            href="/"
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-[44px] flex-1 items-center gap-1.5 rounded-md px-2 text-sm font-semibold text-primary underline"
            aria-label="Ver el sitio público en pestaña nueva"
          >
            Ver el sitio <ExternalLink aria-hidden="true" size={14} />
          </Link>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100"
            aria-label="Soporte del gestor"
            title="Soporte: escribe a soporte.prototipo@losrealejos.es"
          >
            <CircleHelp aria-hidden="true" size={18} />
          </button>
          <button
            type="button"
            className="relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100"
            aria-label={pendientes > 0 ? `${pendientes} notificaciones pendientes` : "Sin notificaciones pendientes"}
            title="Elementos que requieren atención"
          >
            <Bell aria-hidden="true" size={18} />
            {pendientes > 0 && (
              <span aria-hidden="true" className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
                {pendientes}
              </span>
            )}
          </button>
        </div>
      </div>

      <nav aria-label="Secciones del gestor" className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          <li>
            <Link
              href="/admin"
              aria-current={ruta === "/admin" ? "page" : undefined}
              className={`flex min-h-[44px] items-center gap-2 rounded-md px-3 text-sm font-semibold ${ruta === "/admin" ? "bg-primary text-white" : "text-neutral-800 hover:bg-neutral-100"}`}
            >
              <LayoutDashboard aria-hidden="true" size={16} /> Panel de inicio
            </Link>
          </li>
        </ul>
        {NAV_ADMIN.map((grupo) => {
          const visibles = seccionesVisibles(grupo.items);
          if (visibles.length === 0) return null;
          const abierto = abiertos[grupo.titulo] !== false;
          return (
            <div key={grupo.titulo} className="mt-3">
              <button
                type="button"
                onClick={() => alternar(grupo.titulo)}
                aria-expanded={abierto}
                className="flex min-h-[44px] w-full items-center justify-between rounded-md px-3 text-xs font-bold uppercase tracking-wide text-neutral-500 hover:bg-neutral-100"
              >
                {grupo.titulo}
                <ChevronDown aria-hidden="true" size={14} className={abierto ? "rotate-180" : ""} />
              </button>
              {abierto && (
                <ul className="mt-1 space-y-0.5">
                  {visibles.map((item) => {
                    const activo = ruta === item.href || ruta.startsWith(item.href + "/");
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          aria-current={activo ? "page" : undefined}
                          className={`flex min-h-[44px] items-center gap-2 rounded-md px-3 text-sm ${activo ? "bg-primary font-semibold text-white" : "text-neutral-800 hover:bg-neutral-100"}`}
                        >
                          <item.Icono aria-hidden="true" size={16} />
                          {item.titulo}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-neutral-200 p-3">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {iniciales(usuario.nombre)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-neutral-900">{usuario.nombre}</p>
            <p className="font-mono text-xs text-neutral-500">{ETIQUETAS_ROL[rol].nombre}</p>
          </div>
        </div>
        <label htmlFor="selector-rol" className="mt-2 block text-xs font-semibold text-neutral-600">
          Cambiar de perfil (demostración)
        </label>
        <select
          id="selector-rol"
          value={rol}
          onChange={(e) => setRol(e.target.value as Rol)}
          className="mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 bg-white px-2 text-sm"
          aria-describedby="selector-rol-aviso"
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>{ETIQUETAS_ROL[r].nombre} — {ETIQUETAS_ROL[r].descripcion}</option>
          ))}
        </select>
        <p id="selector-rol-aviso" className="mt-1 text-xs text-neutral-500">
          Conmutador de demostración, sin autenticación real.
        </p>
      </div>
    </aside>
  );
}
