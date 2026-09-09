"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { accionPuedeEscribir } from "@/lib/cms/acciones";
import { ERROR_SOLO_LECTURA_UI } from "./solo-lectura";

const Ctx = createContext<{ soloLectura: boolean }>({ soloLectura: false });

/** Provee el modo de escritura del entorno (probe real en servidor). */
export function EscrituraProvider({ children }: { children: React.ReactNode }) {
  const [soloLectura, setSoloLectura] = useState(false);
  useEffect(() => {
    accionPuedeEscribir()
      .then((r) => setSoloLectura(!r.escribible))
      .catch(() => setSoloLectura(true));
  }, []);
  return <Ctx.Provider value={{ soloLectura }}>{children}</Ctx.Provider>;
}

export function useSoloLectura(): boolean {
  return useContext(Ctx).soloLectura;
}

/** Aviso permanente en modo solo lectura (b). */
export function AvisoSoloLectura() {
  const { soloLectura } = useContext(Ctx);
  if (!soloLectura) return null;
  return (
    <p role="note" aria-label="Aviso de solo lectura" className="border-b border-neutral-300 bg-neutral-100 px-6 py-2 text-sm font-semibold text-neutral-800">
      {ERROR_SOLO_LECTURA_UI}
    </p>
  );
}
