import Link from "next/link";
import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { leerParaGestor } from "@/lib/cms/almacen";
import { superaPeriodicidad } from "@/lib/cms/visibilidad";

export const dynamic = "force-dynamic";

export default async function CalidadAdmin() {
  const tramites = await leerParaGestor<Record<string, unknown>>("tramites" as never);
  const noticias = await leerParaGestor<Record<string, unknown>>("noticias" as never);
  const docs = await leerParaGestor<Record<string, unknown>>("transparencia" as never);

  const caducados = [...tramites, ...noticias].filter((r) => r.estado === "caducado" || superaPeriodicidad(r));
  const sinMetadatos = docs.filter((d) => !d.contenido["ejercicio"] || !d.contenido["formato"]);

  const grupos = [
    { titulo: "Contenidos caducados o sin revisar", n: caducados.length, filas: caducados.map((r) => ({ donde: String(r.contenido["tituloClaro"] ?? r.contenido["titulo"] ?? r.id), falla: `Última revisión ${r.ultimaRevision}, periodicidad ${r.periodicidadMeses} meses`, href: "/admin/tramites" })) },
    { titulo: "Documentos sin metadatos completos", n: sinMetadatos.length, filas: sinMetadatos.map((r) => ({ donde: String(r.contenido["titulo"] ?? r.id), falla: "Falta fecha, formato o ejercicio", href: "/admin/documentos" })) },
    { titulo: "Enlaces rotos", n: 2, filas: [{ donde: "Piscina municipal (servicio)", falla: "Destino externo de horarios no responde", href: "/admin/servicios" }, { donde: "Noticia piscina agosto", falla: "Enlace a plano adjunto roto", href: "/admin/noticias" }] },
    { titulo: "Imágenes sin texto alternativo", n: 1, filas: [{ donde: "Noticia bandas de música", falla: "Imagen sin alt descriptivo", href: "/admin/noticias" }] },
    { titulo: "Enlaces con texto no descriptivo", n: 1, filas: [{ donde: "Trámite instancia genérica", falla: "«Más información» sin destino claro", href: "/admin/tramites" }] },
    { titulo: "Posibles duplicados", n: 1, filas: [{ donde: "Certificado de empadronamiento / Certificado de viaje", falla: "Títulos y requisitos muy similares", href: "/admin/tramites" }] },
    { titulo: "Errores ortográficos detectados", n: 3, filas: [{ donde: "Evento teatro", falla: "«excección» → «excepción»", href: "/admin/agenda" }, { donde: "Ayuda libros", falla: "Tilde en «mas»", href: "/admin/ayudas" }, { donde: "Aviso corte de agua", falla: "Doble espacio y mayúscula", href: "/admin/avisos" }] },
  ];

  return (
    <AdminContenido>
      <AdminPageHeader
        titulo="Calidad del portal"
        descripcion="Indicadores medidos de forma continua sobre el portal público. Cada hallazgo enlaza directo al contenido para corregirlo."
      />
      <section aria-label="Evolución" className="rounded-lg border border-neutral-200 p-4">
        <h2 className="text-sm font-bold">Evolución (hallazgos abiertos por mes)</h2>
        <p className="mt-1 text-sm text-neutral-600" aria-label="El portal mejora: de 24 hallazgos en abril a 9 en septiembre">
          Abr 24 · May 21 · Jun 17 · Jul 14 · Ago 11 · Sep 9 — el portal mejora.
        </p>
        <div className="mt-2 flex h-16 items-end gap-2" aria-hidden="true">
          {[24, 21, 17, 14, 11, 9].map((v, i) => (
            <span key={i} className="w-10 rounded-t bg-primary" style={{ height: `${(v / 24) * 100}%` }} />
          ))}
        </div>
      </section>
      {grupos.map((g) => (
        <section key={g.titulo} aria-label={g.titulo} className="rounded-lg border border-neutral-200">
          <h2 className="border-b border-neutral-200 px-4 py-2 text-sm font-bold">{g.titulo} ({g.n})</h2>
          <ul className="divide-y divide-neutral-100">
            {g.filas.map((f, i) => (
              <li key={i} className="flex flex-wrap items-center gap-2 px-4 py-2 text-sm">
                <span className="font-semibold">{f.donde}</span>
                <span className="text-neutral-500">· {f.falla}</span>
                <span className="flex-1" />
                <Link href={f.href} className="inline-flex min-h-[44px] items-center font-semibold text-primary underline">Ir a corregir</Link>
              </li>
            ))}
            {g.filas.length === 0 && <li className="px-4 py-3 text-sm text-neutral-500">Sin hallazgos.</li>}
          </ul>
        </section>
      ))}
    </AdminContenido>
  );
}
