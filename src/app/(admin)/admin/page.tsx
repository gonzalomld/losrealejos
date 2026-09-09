import Link from "next/link";
import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { leerParaGestor } from "@/lib/cms/almacen";
import { necesitaAtencion, superaPeriodicidad } from "@/lib/cms/visibilidad";
import type { RegistroEditorial } from "@/lib/cms/tipos-editoriales";

export const dynamic = "force-dynamic";

async function cargar() {
  const colecciones = ["tramites", "noticias", "eventos", "ayudas", "avisos", "servicios", "transparencia"] as const;
  const todo: RegistroEditorial<unknown>[] = [];
  for (const c of colecciones) {
    todo.push(...((await leerParaGestor(c as never)) as RegistroEditorial<unknown>[]));
  }
  return todo;
}

export default async function AdminDashboard() {
  const todo = await cargar();
  const enRevision = todo.filter((r) => r.estado === "en_revision");
  const anon = todo.filter((r) => r.estadoDatos === "pendiente_revision");
  const caducados = todo.filter((r) => r.estado === "caducado" || superaPeriodicidad(r));
  const bloqueos = todo.filter((r) => r.hallazgos.some((h) => h.severidad === "bloqueo"));
  const programados = todo.filter((r) => r.estado === "programado");
  const atencion = todo.filter(necesitaAtencion);

  const tarjetas = [
    { titulo: "Pendientes de validar", n: enRevision.length, href: "/admin/validacion", desc: "Contenidos enviados a revisión, con quién los envió y cuándo." },
    { titulo: "Cola de anonimización", n: anon.length, href: "/admin/anonimizacion", desc: "Documentos pendientes de verificar datos personales." },
    { titulo: "Caducados o sin revisar", n: caducados.length, href: "/admin/tramites", desc: "Superan su periodicidad de revisión acordada." },
    { titulo: "Bloqueos de calidad", n: bloqueos.length, href: "/admin/calidad", desc: "Hallazgos que impiden publicar hasta corregirse." },
    { titulo: "Programados", n: programados.length, href: "/admin/validacion", desc: "Contenidos con publicación futura programada." },
    { titulo: "Necesitan atención", n: atencion.length, href: "/admin/calidad", desc: "Suma de caducados, pendientes y bloqueos." },
  ];

  return (
    <AdminContenido>
      <AdminPageHeader
        titulo="Qué requiere atención hoy"
        descripcion="Resumen operativo del portal: cada tarjeta lleva directo a resolverlo. Sin gráficas decorativas."
      />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tarjetas.map((t) => (
          <li key={t.titulo} className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="text-3xl font-extrabold text-primary" aria-label={`${t.n} elementos`}>{t.n}</p>
            <h2 className="mt-1 text-base font-bold">{t.titulo}</h2>
            <p className="mt-1 text-sm text-neutral-600">{t.desc}</p>
            <Link href={t.href} className="mt-2 inline-flex min-h-[44px] items-center text-sm font-semibold text-primary underline">
              Ir a resolverlo
            </Link>
          </li>
        ))}
      </ul>
    </AdminContenido>
  );
}
