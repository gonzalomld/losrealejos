"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";
import { ETIQUETAS_BLOQUE, type Bloque, type TipoBloque } from "@/lib/cms/bloques";

const TIPOS: TipoBloque[] = ["contenido", "foto", "acordeon", "info", "aviso", "tabla", "documento", "enlace-externo", "cta"];

let n = 0;
function nuevoBloque(tipo: TipoBloque): Bloque {
  n += 1;
  return { id: `bloque-${Date.now()}-${n}`, tipo, texto: "", plegado: false };
}

/**
 * Editor de bloques: inserción por barra de botones, tarjeta plegable con
 * papelera, reordenación por arrastre Y por botones (teclado).
 */
export function BloquesEditor({ valor, onCambio }: { valor: Bloque[]; onCambio: (b: Bloque[]) => void }) {
  const [arrastrado, setArrastrado] = useState<string | null>(null);
  const listaRef = useRef<HTMLUListElement>(null);

  function mover(id: string, dir: -1 | 1) {
    const i = valor.findIndex((b) => b.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= valor.length) return;
    const copia = [...valor];
    [copia[i], copia[j]] = [copia[j], copia[i]];
    onCambio(copia);
  }

  function soltar(destinoId: string) {
    if (!arrastrado || arrastrado === destinoId) return;
    const copia = [...valor];
    const i = copia.findIndex((b) => b.id === arrastrado);
    const j = copia.findIndex((b) => b.id === destinoId);
    if (i < 0 || j < 0) return;
    const [b] = copia.splice(i, 1);
    copia.splice(j, 0, b);
    onCambio(copia);
    setArrastrado(null);
  }

  useEffect(() => {
    if (!arrastrado) return;
    function fin() { setArrastrado(null); }
    document.addEventListener("dragend", fin);
    return () => document.removeEventListener("dragend", fin);
  }, [arrastrado]);

  return (
    <section aria-labelledby="bloques-titulo" className="rounded-lg border border-neutral-200">
      <h3 id="bloques-titulo" className="border-b border-neutral-200 px-4 py-2 text-sm font-bold">Cuerpo por bloques</h3>
      <div className="flex flex-wrap gap-1.5 border-b border-neutral-200 bg-neutral-50 p-3" role="group" aria-label="Insertar bloque">
        {TIPOS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onCambio([...valor, nuevoBloque(t)])}
            className={`min-h-[44px] rounded-md px-2.5 text-xs font-semibold ${ETIQUETAS_BLOQUE[t].color}`}
          >
            + {ETIQUETAS_BLOQUE[t].titulo}
          </button>
        ))}
      </div>
      {valor.length === 0 ? (
        <p className="px-4 py-3 text-sm text-neutral-500">Sin bloques. Inserta el primero con la barra superior.</p>
      ) : (
        <ul ref={listaRef} className="space-y-2 p-3">
          {valor.map((b, i) => {
            const meta = ETIQUETAS_BLOQUE[b.tipo];
            return (
              <li
                key={b.id}
                draggable
                onDragStart={() => setArrastrado(b.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => soltar(b.id)}
                className={`rounded-md border border-neutral-200 bg-white ${arrastrado === b.id ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-1 px-2 py-1">
                  <GripVertical aria-hidden="true" size={14} className="cursor-grab text-neutral-400" />
                  <span className={`rounded px-1.5 py-0.5 text-[11px] font-bold uppercase ${meta.color}`}>{meta.titulo}</span>
                  <span className="sr-only">Bloque {i + 1} de {valor.length}</span>
                  <span className="flex-1" />
                  <button type="button" onClick={() => mover(b.id, -1)} disabled={i === 0} aria-label={`Subir bloque ${meta.titulo}`} className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-neutral-600 hover:bg-neutral-100 disabled:opacity-40">
                    <ChevronUp aria-hidden="true" size={16} />
                  </button>
                  <button type="button" onClick={() => mover(b.id, 1)} disabled={i === valor.length - 1} aria-label={`Bajar bloque ${meta.titulo}`} className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-neutral-600 hover:bg-neutral-100 disabled:opacity-40">
                    <ChevronDown aria-hidden="true" size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onCambio(valor.map((x) => (x.id === b.id ? { ...x, plegado: !x.plegado } : x)))}
                    aria-expanded={!b.plegado}
                    aria-label={`${b.plegado ? "Desplegar" : "Plegar"} bloque ${meta.titulo}`}
                    className="inline-flex min-h-[44px] items-center rounded px-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
                  >
                    {b.plegado ? "Desplegar" : "Plegar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onCambio(valor.filter((x) => x.id !== b.id))}
                    aria-label={`Eliminar bloque ${meta.titulo}`}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-red-700 hover:bg-red-50"
                  >
                    <Trash2 aria-hidden="true" size={16} />
                  </button>
                </div>
                {!b.plegado && (
                  <div className="space-y-2 border-t border-neutral-100 p-3">
                    {(b.tipo === "foto") && (
                      <>
                        <label className="block text-xs font-semibold">URL de la foto
                          <input value={b.src ?? ""} onChange={(e) => onCambio(valor.map((x) => (x.id === b.id ? { ...x, src: e.target.value } : x)))} className="mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 px-2 text-sm" />
                        </label>
                        <label className="block text-xs font-semibold">Texto alternativo (obligatorio para publicar)
                          <input value={b.alt ?? ""} onChange={(e) => onCambio(valor.map((x) => (x.id === b.id ? { ...x, alt: e.target.value } : x)))} className="mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 px-2 text-sm" aria-describedby={`${b.id}-alt-ayuda`} />
                        </label>
                        <p id={`${b.id}-alt-ayuda`} className="text-xs text-neutral-500">Describe qué se ve en la foto. Sin alt, el verificador bloquea la publicación.</p>
                      </>
                    )}
                    <label className="block text-xs font-semibold">
                      {b.tipo === "contenido" ? "Texto (negrita con **, cursiva con *, listas con -)" : "Contenido del bloque"}
                      <textarea
                        value={b.texto ?? ""}
                        onChange={(e) => onCambio(valor.map((x) => (x.id === b.id ? { ...x, texto: e.target.value } : x)))}
                        rows={b.tipo === "contenido" ? 5 : 3}
                        className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-2 text-sm"
                      />
                    </label>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
