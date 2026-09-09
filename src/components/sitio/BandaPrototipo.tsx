import { CONTACTO_OAC } from "@/data/vocabularios";

/**
 * Banda de entorno de demostración del portal público.
 * Va en el grupo (public), NO en el gestor (que lleva su propio aviso).
 */
export function BandaPrototipo() {
  return (
    <p
      role="note"
      aria-label="Aviso de prototipo en demostración"
      className="bg-primarioOscuro px-4 py-2 text-center text-sm font-semibold text-white"
    >
      Prototipo en demostración · Contenido de ejemplo, sin validez oficial · OAC: {CONTACTO_OAC.telefono}
    </p>
  );
}
