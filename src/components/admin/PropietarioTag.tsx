import { Landmark } from "lucide-react";
import { getArea } from "@/data/areas";

/** Propietario: etiqueta con icono del área municipal responsable. */
export function PropietarioTag({ areaId }: { areaId: string }) {
  const area = getArea(areaId);
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-800">
      <Landmark aria-hidden="true" size={13} />
      {area ? area.nombre : areaId}
    </span>
  );
}
