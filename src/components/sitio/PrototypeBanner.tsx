"use client";

import { useState } from "react";

export function PrototypeBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div role="region" aria-label="Aviso de prototipo" className="bg-atencion-fondo text-atencion">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2 text-sm">
        <p className="font-semibold">
          Prototipo de demostración con contenido de ejemplo. No es el portal oficial del Ayuntamiento.
        </p>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Ocultar aviso de prototipo"
          className="ml-auto rounded border border-current px-3 py-1 text-sm font-semibold"
        >
          Ocultar
        </button>
      </div>
    </div>
  );
}
