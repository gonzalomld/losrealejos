import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { leerParaGestor } from "@/lib/cms/almacen";

export const dynamic = "force-dynamic";

export default async function AnonimizacionCola() {
  const docs = await leerParaGestor<Record<string, unknown>>("transparencia" as never);
  const pendientes = docs.filter((d) => d.estadoDatos === "pendiente_revision");
  return (
    <AdminContenido>
      <AdminPageHeader
        titulo="Cola de anonimización"
        descripcion="Documentos pendientes de verificar datos personales antes de publicar. La determinación de qué datos deben anonimizarse corresponde al Ayuntamiento; el sistema aporta la herramienta, el registro y el procedimiento."
      />
      <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-900">
        <TriangleAlert aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
        Al subir cualquier documento debes verificar la existencia de datos personales antes de publicar. Un documento en esta cola no puede publicarse.
      </div>
      <ul className="space-y-2">
        {pendientes.map((d) => (
          <li key={d.id} className="rounded-lg border border-neutral-200 p-4">
            <p className="font-bold">{String(d.contenido["titulo"] ?? d.id)}</p>
            <p className="text-sm text-neutral-600">Subido por {d.enviadoPor ?? "—"} · {d.fechaEnvio ?? "—"} · {String(d.notaDatos ?? "")}</p>
            <Link href={`/admin/anonimizacion/${d.id}`} className="mt-2 inline-flex min-h-[44px] items-center text-sm font-semibold text-primary underline">
              Abrir revisión de datos personales
            </Link>
          </li>
        ))}
        {pendientes.length === 0 && <li className="text-sm text-neutral-500">Sin documentos pendientes. La cola está vacía.</li>}
      </ul>
    </AdminContenido>
  );
}
