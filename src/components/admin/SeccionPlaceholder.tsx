import { Construction } from "lucide-react";
import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable, AdminToolbar, type ColumnaTabla } from "@/components/admin/AdminTable";
import { EstadoBadge } from "@/components/admin/EstadoBadge";

/** Marcador Fase 2/3: patrón de listado ya montado + aviso de construcción. */
export function SeccionPlaceholder({ titulo, descripcion }: { titulo: string; descripcion: string }) {
  const columnas: ColumnaTabla<{ id: string; titulo: string }>[] = [
    { id: "titulo", encabezado: "Título", render: (f) => <span className="font-semibold">{f.titulo}</span> },
    { id: "estado", encabezado: "Estado", render: () => <EstadoBadge estado="publicado" /> },
  ];
  return (
    <AdminContenido>
      <AdminPageHeader titulo={titulo} descripcion={descripcion} />
      <p role="note" className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
        <Construction aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
        Sección en construcción: usa el mismo patrón de Trámites (buscador, filtros en píldoras, tabla, recuento). Añadirla es declarar sus campos, no escribir otra pantalla.
      </p>
      <AdminToolbar busqueda="" onBusqueda={() => {}} filtros={[]} />
      <AdminTable
        columnas={columnas}
        filas={[{ id: "ejemplo", titulo: "Contenido de ejemplo de la colección" }]}
        claveDe={(f) => f.id}
        total={1}
        pagina={1}
        porPagina={10}
        onPagina={() => {}}
        onPorPagina={() => {}}
      />
    </AdminContenido>
  );
}
