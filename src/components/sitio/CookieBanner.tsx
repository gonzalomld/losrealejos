"use client";

import { useEffect, useState } from "react";

const CLAVE = "lr-cookies-decision";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CLAVE)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function decidir(valor: string) {
    try {
      localStorage.setItem(CLAVE, valor);
    } catch {
      /* sin almacenamiento: se oculta igualmente */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="border-t-2 border-primary bg-card"
    >
      <div className="mx-auto max-w-6xl px-4 py-4">
        <h2 className="text-lg font-bold">Cookies de este portal</h2>
        <p className="mt-1 max-w-[70ch] text-base">
          Solo usamos cookies técnicas necesarias para que la web funcione. No usamos cookies de
          publicidad ni de marketing. Puedes leer la{" "}
          <a className="font-semibold underline" href="/politica-de-cookies">
            política de cookies
          </a>
          .
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => decidir("aceptadas")}
            className="rounded bg-primary px-5 py-2 font-bold text-white"
          >
            Aceptar cookies técnicas
          </button>
          <button
            type="button"
            onClick={() => decidir("rechazadas")}
            className="rounded bg-primary px-5 py-2 font-bold text-white"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}
