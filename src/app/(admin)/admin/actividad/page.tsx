import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { leerActividad } from "@/lib/actividad/registro";

export const dynamic = "force-dynamic";

export default async function ActividadAdmin() {
  const entradas = await leerActividad();
  return (
    <AdminContenido>
      <AdminPageHeader
        titulo="Registro de actividad"
        descripcion="Bitácora consultable de accesos, publicaciones, modificaciones, revisiones y cambios de permisos. Exportable. Da cumplimiento a la trazabilidad."
      />
      <table className="w-full overflow-hidden rounded-lg border border-neutral-200 text-left text-sm">
        <thead><tr className="bg-neutral-50">
          <th scope="col" className="px-3 py-2 text-xs uppercase text-neutral-500">Fecha</th>
          <th scope="col" className="px-3 py-2 text-xs uppercase text-neutral-500">Usuario</th>
          <th scope="col" className="px-3 py-2 text-xs uppercase text-neutral-500">Acción</th>
          <th scope="col" className="px-3 py-2 text-xs uppercase text-neutral-500">Elemento</th>
          <th scope="col" className="px-3 py-2 text-xs uppercase text-neutral-500">Detalle</th>
        </tr></thead>
        <tbody>
          {entradas.map((e, i) => (
            <tr key={i} className="border-t border-neutral-100">
              <td className="whitespace-nowrap px-3 py-2 text-xs">{e.fecha}</td>
              <td className="px-3 py-2 text-xs">{e.usuario}</td>
              <td className="px-3 py-2 text-xs font-bold">{e.accion}</td>
              <td className="px-3 py-2 text-xs font-mono">{e.elemento}</td>
              <td className="px-3 py-2 text-xs">{e.detalle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminContenido>
  );
}
