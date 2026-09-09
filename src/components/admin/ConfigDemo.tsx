"use client";

import { useState } from "react";
import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { motivoDenegacion, useRol, type Accion } from "@/lib/roles/contexto";
import { accionRestablecerDemo } from "@/lib/cms/acciones";

/**
 * Botón de restablecer datos de demostración.
 * Imprescindible para enseñar el gestor varias veces desde un estado limpio.
 */
export function RestablecerDemo() {
  const { rol, usuario, puede } = useRol();
  const [estado, setEstado] = useState<"idle" | "ok" | "error">("idle");
  const permitido = puede("gestionar_config", "enlaces");

  async function restablecer() {
    if (!confirm("Se borran todos los cambios de la demo y vuelve al estado inicial. ¿Continuar?")) return;
    const r = await accionRestablecerDemo(usuario.nombre);
    setEstado(r.ok ? "ok" : "error");
    if (r.ok) window.location.reload();
  }

  return (
    <section aria-labelledby="demo-titulo" className="rounded-lg border border-neutral-200 p-4">
      <h2 id="demo-titulo" className="text-sm font-bold">Datos de demostración</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Restablece el prototipo al estado inicial versionado. Los cambios se guardan en ficheros
        versionados del repositorio (<code>data/cms/*.json</code>), no en memoria del proceso.
      </p>
      <button
        type="button"
        onClick={restablecer}
        disabled={!permitido}
        title={!permitido ? motivoDenegacion(rol, "gestionar_config") : undefined}
        aria-label={!permitido ? `Restablecer datos. ${motivoDenegacion(rol, "gestionar_config")}` : "Restablecer datos de demostración"}
        className="mt-2 inline-flex min-h-[44px] items-center rounded-md bg-neutral-200 px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
      >
        Restablecer datos de demostración
      </button>
      {estado === "ok" && <p role="status" className="mt-1 text-sm text-green-900">Demo restablecida.</p>}
      {estado === "error" && <p role="alert" className="mt-1 text-sm text-red-900">No se pudo restablecer. Inténtalo de nuevo.</p>}
    </section>
  );
}

export function ConfigDemoPage() {
  return (
    <AdminContenido>
      <AdminPageHeader
        titulo="Sistemas externos"
        descripcion="Sede Electrónica, cita previa, pago, incidencias, perfil del contratante y portal turístico, con su descripción y medio de identificación. Editable, porque esas direcciones cambian."
      />
      <ul className="space-y-2 text-sm">
        {[
          ["Sede Electrónica", "https://sede.losrealejos.es", "Certificado digital o Cl@ve"],
          ["Cita previa (OAC)", "https://losrealejos.es/atencion-ciudadana/cita-previa/", "Sin identificación"],
          ["Pago online de tributos", "https://sede.losrealejos.es/pago", "Certificado digital o Cl@ve"],
          ["Incidencias en vía pública", "http://www.lineaverdelosrealejos.es/lv/incidencias_online.asp", "Sin identificación"],
          ["Perfil del contratante", "https://contrataciondelestado.es", "Sin identificación"],
          ["Portal turístico", "https://losrealejos.travel", "Sin identificación"],
        ].map(([nombre, href, ident]) => (
          <li key={href} className="rounded-lg border border-neutral-200 p-3">
            <strong>{nombre}</strong> — <a href={href} target="_blank" rel="noopener" className="text-primary underline">{href}</a>
            <span className="block text-neutral-600">Identificación: {ident}</span>
          </li>
        ))}
      </ul>
      <RestablecerDemo />
    </AdminContenido>
  );
}
