"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded border-2 border-primary px-4 py-2 font-bold text-primary"
    >
      <Printer aria-hidden="true" size={18} />
      Imprimir esta ficha
    </button>
  );
}
