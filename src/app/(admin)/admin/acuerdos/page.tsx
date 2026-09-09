import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable, type ColumnaTabla } from "@/components/admin/AdminTable";
import { AREAS } from "@/data/areas";
import { leerParaGestor } from "@/lib/cms/almacen";
import type { RegistroEditorial } from "@/lib/cms/tipos-editoriales";

export const dynamic = "force-dynamic";

type Fila = { areaId: string; nombre: string; responsable: string; n: number; ultima: string; cumple: boolean };

export default async function AcuerdosAdmin() {
  const tramites = await leerParaGestor<Record<string, unknown>>("tramites" as never);
  const filas: Fila[] = AREAS.map((a) => {
    const mios = tramites.filter((t) => t.areaId === a.id);
    const ultima = mios.map((t) => t.ultimaRevision).sort().pop() ?? "2026-06-01";
    return {
      areaId: a.id, nombre: a.nombre, responsable: a.responsable,
      n: a.tramiteIds.length, ultima, cumple: ultima >= "2026-03-09",
    };
  });
  void (null as unknown as RegistroEditorial<unknown> | null);

  const columnas: ColumnaTabla<Fila>[] = [
    { id: "area", encabezado: "Área", render: (f) => <span className="font-semibold">{f.nombre}</span> },
    { id: "resp", encabezado: "Responsable", render: (f) => <span className="text-xs">{f.responsable}</span> },
    { id: "n", encabezado: "Contenidos", render: (f) => <span>{f.n} asignados</span> },
    { id: "per", encabezado: "Periodicidad", render: () => <span className="text-xs">Trámites 6 m. · resto 12 m.</span> },
    { id: "ult", encabezado: "Última revisión", render: (f) => <span className="text-xs">{f.ultima}</span> },
    {
      id: "cumple", encabezado: "Cumplimiento",
      render: (f) => (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${f.cumple ? "bg-green-50 text-green-900 ring-green-200" : "bg-red-50 text-red-900 ring-red-200"}`}>
          {f.cumple ? "Al día" : "Retrasada"}
        </span>
      ),
    },
  ];

  return (
    <AdminContenido>
      <AdminPageHeader
        titulo="Acuerdos de contenido por área"
        descripcion="Las 19 áreas municipales con responsable, contenidos asignados, periodicidad acordada y cumplimiento. Convierte «contactar periódicamente» en un compromiso trazable."
      />
      <AdminTable
        columnas={columnas}
        filas={filas}
        claveDe={(f) => f.areaId}
        total={filas.length}
        pagina={1}
        porPagina={50}
        onPagina={() => {}}
        onPorPagina={() => {}}
        accionesDe={() => [{ etiqueta: "Registrar contacto", onClick: () => {} }]}
      />
    </AdminContenido>
  );
}
