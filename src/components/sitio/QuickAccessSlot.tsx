"use client";

import { usePathname } from "next/navigation";
import { QuickAccess } from "./QuickAccess";

// La barra de acceso rápido aparece en todas las páginas salvo donde compite
// con el contenido (ficha de trámite, con su propia llamada a la acción,
// y formulario de reclamación).
const OCULTA_EN = [/^\/tramites\/[^/]+$/, /^\/accesibilidad\/reclamacion$/];

export function QuickAccessSlot() {
  const ruta = usePathname() ?? "";
  if (OCULTA_EN.some((re) => re.test(ruta))) return null;
  return <QuickAccess />;
}
