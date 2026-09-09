"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { accionPuedeEscribir } from "@/lib/cms/acciones";
import type { BackendId } from "@/lib/cms/db";
import { ERROR_SOLO_LECTURA_UI } from "./solo-lectura";

const MENSAJE_BACKEND: Record<BackendId, string> = {
  db: "Conectado a la base de datos (Unión Europea): los cambios se guardan y el portal los refleja tras recargar.",
  fichero: "Desarrollo local: los cambios se guardan en ficheros versionados del prototipo (data/cms/*.json).",
  lectura: ERROR_SOLO_LECTURA_UI,
};

const Ctx = createContext<{ soloLectura: boolean; backend: BackendId }>({ soloLectura: false, backend: "fichero" });

/** Provee el modo de escritura del entorno (sondeo real en servidor). */
export function EscrituraProvider({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<{ soloLectura: boolean; backend: BackendId }>({ soloLectura: false, backend: "fichero" });
  useEffect(() => {
    accionPuedeEscribir()
      .then((r) => setEstado({ soloLectura: !r.escribible, backend: r.backend }))
      .catch(() => setEstado({ soloLectura: true, backend: "lectura" }));
  }, []);
  return <Ctx.Provider value={estado}>{children}</Ctx.Provider>;
}

export function useSoloLectura(): boolean {
  return useContext(Ctx).soloLectura;
}

export function useBackend(): BackendId {
  return useContext(Ctx).backend;
}

/** Aviso del backend activo: qué persistencia hay detrás del gestor. */
export function AvisoBackend() {
  const { backend } = useContext(Ctx);
  return (
    <p role="note" aria-label="Aviso de persistencia" className="border-b border-amber-200 bg-amber-50 px-6 py-2 text-sm text-amber-900">
      Entorno de demostración: {MENSAJE_BACKEND[backend]}
    </p>
  );
}

/** Aviso permanente en modo solo lectura (reserva cuando no hay base ni fichero). */
export function AvisoSoloLectura() {
  const { soloLectura } = useContext(Ctx);
  if (!soloLectura) return null;
  return (
    <p role="note" aria-label="Aviso de solo lectura" className="border-b border-neutral-300 bg-neutral-100 px-6 py-2 text-sm font-semibold text-neutral-800">
      {ERROR_SOLO_LECTURA_UI}
    </p>
  );
}
