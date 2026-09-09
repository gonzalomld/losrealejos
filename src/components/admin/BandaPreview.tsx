"use client";

import { useState } from "react";
import { ETIQUETAS_ESTADO, type EstadoContenido } from "@/lib/cms/tipos-editoriales";

/** Banda de previsualización: fija, distinta, accesible, sin interferir con el teclado de abajo. */
export function BandaPreview({ estado }: { estado: EstadoContenido }) {
  const [anchura, setAnchura] = useState<"escritorio" | "movil">("escritorio");
  return (
    <div className="sticky top-0 z-50 border-b-4 border-amber-500 bg-neutral-900 text-white" role="region" aria-label="Banda de previsualización">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2 text-sm">
        <strong>Previsualización: contenido {ETIQUETAS_ESTADO[estado].toLowerCase()}, no publicado.</strong>
        <span aria-hidden="true" className="flex-1" />
        <span role="group" aria-label="Anchura de comprobación">
          <button type="button" onClick={() => setAnchura("escritorio")} aria-pressed={anchura === "escritorio"} className={`min-h-[44px] rounded-l-md px-3 font-semibold ${anchura === "escritorio" ? "bg-white text-neutral-900" : "bg-neutral-700"}`}>Escritorio</button>
          <button type="button" onClick={() => setAnchura("movil")} aria-pressed={anchura === "movil"} className={`min-h-[44px] rounded-r-md px-3 font-semibold ${anchura === "movil" ? "bg-white text-neutral-900" : "bg-neutral-700"}`}>Móvil</button>
        </span>
        <button type="button" onClick={() => window.history.back()} className="min-h-[44px] rounded-md bg-white px-3 font-semibold text-neutral-900">Volver al editor</button>
      </div>
    </div>
  );
}
