import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AcuerdosClient } from "@/components/admin/AcuerdosClient";
import { AREAS } from "@/data/areas";
import { leerParaGestor } from "@/lib/cms/almacen";

export const dynamic = "force-dynamic";

export type FilaAcuerdo = {
  areaId: string;
  nombre: string;
  responsable: string;
  n: number;
  ultima: string;
  cumple: boolean;
};

export default async function AcuerdosAdmin() {
  const tramites = await leerParaGestor<Record<string, unknown>>("tramites");
  const filas: FilaAcuerdo[] = AREAS.map((a) => {
    const mios = tramites.filter((t) => t.areaId === a.id);
    const ultima = mios.map((t) => t.ultimaRevision).sort().pop() ?? "2026-06-01";
    return {
      areaId: a.id,
      nombre: a.nombre,
      responsable: a.responsable,
      n: a.tramiteIds.length,
      ultima,
      cumple: ultima >= "2026-03-09",
    };
  });

  return (
    <AdminContenido>
      <AdminPageHeader
        titulo="Acuerdos de contenido por área"
        descripcion="Las 19 áreas municipales con responsable, contenidos asignados, periodicidad acordada y cumplimiento. Convierte «contactar periódicamente» en un compromiso trazable."
      />
      <AcuerdosClient filas={filas} />
    </AdminContenido>
  );
}
