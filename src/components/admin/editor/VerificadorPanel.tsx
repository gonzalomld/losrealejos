"use client";

import { AlertOctagon, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { ReglaResultado } from "@/lib/cms/verificadores";

/**
 * Panel lateral del editor: comprobaciones en vivo.
 * Avisos (se puede publicar) vs bloqueos (no se puede publicar).
 * Anuncia cambios a lectores de pantalla sin robar el foco.
 */
export function VerificadorPanel({ resultados }: { resultados: ReglaResultado[] }) {
  const bloqueos = resultados.filter((r) => r.severidad === "bloqueo");
  const avisos = resultados.filter((r) => r.severidad === "aviso");
  return (
    <aside aria-label="Comprobaciones de calidad y accesibilidad" className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
      <h3 className="text-sm font-bold">Calidad y accesibilidad</h3>
      <div role="status" aria-live="polite" className="mt-2 space-y-2">
        {resultados.length === 0 && (
          <p className="flex items-start gap-1.5 text-sm text-green-900">
            <CheckCircle2 aria-hidden="true" size={16} className="mt-0.5 shrink-0" />
            Sin problemas detectados. Puedes publicar.
          </p>
        )}
        {bloqueos.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase text-red-800">Bloqueos ({bloqueos.length}): no se puede publicar</p>
            <ul className="mt-1 space-y-1">
              {bloqueos.map((b, i) => (
                <li key={i} className="flex items-start gap-1.5 rounded bg-red-50 p-2 text-sm text-red-900">
                  <AlertOctagon aria-hidden="true" size={15} className="mt-0.5 shrink-0" />{b.mensaje}
                </li>
              ))}
            </ul>
          </div>
        )}
        {avisos.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase text-amber-800">Avisos ({avisos.length}): se puede publicar</p>
            <ul className="mt-1 space-y-1">
              {avisos.map((b, i) => (
                <li key={i} className="flex items-start gap-1.5 rounded bg-amber-50 p-2 text-sm text-amber-900">
                  <AlertTriangle aria-hidden="true" size={15} className="mt-0.5 shrink-0" />{b.mensaje}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
