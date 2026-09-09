"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp, GripVertical } from "lucide-react";
import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import type { DestacadoNav, SeccionNav } from "@/data/navegacion";
import { motivoDenegacion, useRol } from "@/lib/roles/contexto";

/**
 * Menús y navegación (Fase 3): vista de árbol editable sin intervención
 * técnica. Reordenación por arrastre y también por botones (teclado).
 */
export function MenusClient({ iniciales }: { iniciales: SeccionNav[] }) {
  const { rol, puede } = useRol();
  const [secciones, setSecciones] = useState<SeccionNav[]>(() => JSON.parse(JSON.stringify(iniciales)));
  const [abiertas, setAbiertas] = useState<Record<string, boolean>>({ "/tramites": true });
  const [arrastrado, setArrastrado] = useState<string | null>(null);
  const editable = puede("gestionar_config", "menus");

  function moverSeccion(href: string, dir: -1 | 1) {
    const i = secciones.findIndex((s) => s.href === href);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= secciones.length) return;
    const copia = [...secciones];
    [copia[i], copia[j]] = [copia[j], copia[i]];
    setSecciones(copia);
  }

  function moverDestacado(seccionHref: string, destHref: string, dir: -1 | 1) {
    setSecciones((ss) =>
      ss.map((s) => {
        if (s.href !== seccionHref) return s;
        const i = s.destacados.findIndex((d) => d.href === destHref && d.titulo === destHref);
        const idx = s.destacados.findIndex((d) => d.href === destHref);
        const j = idx + dir;
        if (idx < 0 || j < 0 || j >= s.destacados.length) return s;
        const copia = [...s.destacados];
        [copia[idx], copia[j]] = [copia[j], copia[idx]];
        void i;
        return { ...s, destacados: copia };
      }),
    );
  }

  function soltarSeccion(destinoHref: string) {
    if (!arrastrado || arrastrado === destinoHref) return;
    const i = secciones.findIndex((s) => s.href === arrastrado);
    const j = secciones.findIndex((s) => s.href === destinoHref);
    if (i < 0 || j < 0) return;
    const copia = [...secciones];
    const [s] = copia.splice(i, 1);
    copia.splice(j, 0, s);
    setSecciones(copia);
    setArrastrado(null);
  }

  return (
    <AdminContenido>
      <AdminPageHeader
        titulo="Menús y navegación"
        descripcion="Árbol del mega menú editable por el Ayuntamiento sin intervención técnica. Reordena arrastrando o con los botones Subir/Bajar (teclado)."
      />
      {!editable && (
        <p className="rounded-md bg-amber-50 p-2 text-sm text-amber-900">
          {motivoDenegacion(rol, "gestionar_config")} Ves el árbol en solo lectura.
        </p>
      )}
      <ul aria-label="Secciones del menú" className="space-y-2">
        {secciones.map((s, si) => {
          const abierta = abiertas[s.href] ?? false;
          return (
            <li
              key={s.href}
              draggable={editable}
              onDragStart={() => setArrastrado(s.href)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => soltarSeccion(s.href)}
              className="rounded-lg border border-neutral-200 bg-white"
            >
              <div className="flex items-center gap-1 px-2 py-1">
                {editable && <GripVertical aria-hidden="true" size={14} className="cursor-grab text-neutral-400" />}
                <button
                  type="button"
                  onClick={() => setAbiertas((a) => ({ ...a, [s.href]: !abierta }))}
                  aria-expanded={abierta}
                  className="flex min-h-[44px] flex-1 items-center gap-1 text-left text-sm font-bold"
                >
                  {abierta ? <ChevronDown aria-hidden="true" size={15} /> : <ChevronRight aria-hidden="true" size={15} />}
                  {si + 1}. {s.texto} <span className="font-mono font-normal text-neutral-500">{s.href}</span>
                </button>
                {editable && (
                  <span className="flex">
                    <button type="button" onClick={() => moverSeccion(s.href, -1)} disabled={si === 0} aria-label={`Subir sección ${s.texto}`} className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded hover:bg-neutral-100 disabled:opacity-40">
                      <ChevronUp aria-hidden="true" size={15} />
                    </button>
                    <button type="button" onClick={() => moverSeccion(s.href, 1)} disabled={si === secciones.length - 1} aria-label={`Bajar sección ${s.texto}`} className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded hover:bg-neutral-100 disabled:opacity-40">
                      <ChevronDown aria-hidden="true" size={15} />
                    </button>
                  </span>
                )}
              </div>
              {abierta && (
                <ul aria-label={`Enlaces de ${s.texto}`} className="space-y-1 border-t border-neutral-100 p-2 pl-8">
                  {s.destacados.map((d: DestacadoNav, di: number) => (
                    <li key={`${d.href}-${d.titulo}`} className="flex items-center gap-1 rounded bg-neutral-50 px-2 py-1 text-sm">
                      <span className="flex-1">
                        <strong>{d.titulo}</strong> <span className="font-mono text-xs text-neutral-500">{d.href}</span>
                        <span className="block text-xs text-neutral-600">{d.descripcion}</span>
                      </span>
                      {editable && (
                        <span className="flex">
                          <button type="button" onClick={() => moverDestacado(s.href, d.href, -1)} disabled={di === 0} aria-label={`Subir enlace ${d.titulo}`} className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded hover:bg-neutral-200 disabled:opacity-40">
                            <ChevronUp aria-hidden="true" size={14} />
                          </button>
                          <button type="button" onClick={() => moverDestacado(s.href, d.href, 1)} disabled={di === s.destacados.length - 1} aria-label={`Bajar enlace ${d.titulo}`} className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded hover:bg-neutral-200 disabled:opacity-40">
                            <ChevronDown aria-hidden="true" size={14} />
                          </button>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      {editable && (
        <p className="text-sm text-neutral-600">
          Los cambios en el árbol se guardan como borrador de configuración y se aplican al portal tras validar.
        </p>
      )}
    </AdminContenido>
  );
}
