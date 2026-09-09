"use client";

import { useState } from "react";
import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  ETIQUETAS_ACCION, ETIQUETAS_ROL, ROLES, USUARIOS_DEMO,
  motivoDenegacion, useRol, type Accion, type Matriz, type Rol,
} from "@/lib/roles/contexto";
import { NAV_ADMIN } from "@/components/admin/nav";
import { accionActividad } from "@/lib/cms/acciones";

const SECCIONES = ["tramites", "noticias", "eventos", "ayudas", "documentos", "validacion", "usuarios", "menus"];

export function UsuariosClient() {
  const { rol, usuario, matriz, setMatriz, puede } = useRol();
  const [pestana, setPestana] = useState<"usuarios" | "matriz">("usuarios");
  const puedeGestionar = puede("gestionar_usuarios", "usuarios");

  function alternar(r: Rol, seccion: string, accion: Accion) {
    const copia: Matriz = JSON.parse(JSON.stringify(matriz));
    const filaRol = copia[r][seccion] ?? copia[r]["*"];
    const actual = copia[r][seccion] ? filaRol[accion] : copia[r]["*"][accion];
    copia[r][seccion] = { ...copia[r]["*"], ...filaRol, [accion]: !actual };
    setMatriz(copia);
    void accionActividad({ usuario: usuario.nombre, accion: "cambio_permiso", elemento: "usuarios", detalle: `${r} / ${seccion} / ${accion} → ${!actual ? "permitido" : "denegado"}` });
  }

  return (
    <AdminContenido>
      <AdminPageHeader titulo="Usuarios y permisos" descripcion="Matriz de qué puede hacer cada rol en cada sección, editable. Los cambios afectan de inmediato a la interfaz." />
      <div role="alert" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm font-semibold text-amber-900">
        En el prototipo el control se aplica en la interfaz con fines de demostración; en el sistema real la comprobación se realiza en el servidor en cada operación.
      </div>
      <div role="tablist" aria-label="Vistas de usuarios" className="flex gap-2">
        {(["usuarios", "matriz"] as const).map((p) => (
          <button key={p} type="button" role="tab" aria-selected={pestana === p} onClick={() => setPestana(p)} className={`min-h-[44px] rounded-md px-4 text-sm font-semibold ${pestana === p ? "bg-primary text-white" : "bg-neutral-100"}`}>
            {p === "usuarios" ? "Usuarios de ejemplo" : "Matriz de permisos"}
          </button>
        ))}
      </div>
      {pestana === "usuarios" ? (
        <table className="w-full overflow-hidden rounded-lg border border-neutral-200 text-left text-sm">
          <thead><tr className="bg-neutral-50"><th scope="col" className="px-3 py-2 text-xs uppercase text-neutral-500">Usuario (ficticio)</th><th scope="col" className="px-3 py-2 text-xs uppercase text-neutral-500">Rol</th><th scope="col" className="px-3 py-2 text-xs uppercase text-neutral-500">Área</th></tr></thead>
          <tbody>
            {USUARIOS_DEMO.map((u) => (
              <tr key={u.nombre} className="border-t border-neutral-100">
                <td className="px-3 py-2 font-semibold">{u.nombre}</td>
                <td className="px-3 py-2">{ETIQUETAS_ROL[u.rol].nombre}</td>
                <td className="px-3 py-2">{u.areaId ?? "Todas"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          {!puedeGestionar && <p className="bg-amber-50 p-2 text-sm text-amber-900">{motivoDenegacion(rol, "gestionar_usuarios")} La matriz se muestra en solo lectura.</p>}
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Matriz de permisos: filas por sección, columnas por rol. Cada casilla nombra rol, acción y sección.
            </caption>
            <thead>
              <tr className="bg-neutral-50">
                <th scope="col" className="px-3 py-2 text-xs uppercase text-neutral-500">Sección / acción</th>
                {ROLES.map((r) => (<th key={r} scope="col" className="px-3 py-2 text-xs uppercase text-neutral-500">{ETIQUETAS_ROL[r].nombre}</th>))}
              </tr>
            </thead>
            <tbody>
              {SECCIONES.map((s) => {
                const nombreSeccion = NAV_ADMIN.flatMap((g) => g.items).find((i) => i.coleccion === s)?.titulo ?? s;
                return (
                  <tr key={s} className="border-t border-neutral-100">
                    <th scope="row" className="px-3 py-2 text-xs font-bold">{nombreSeccion}</th>
                    {ROLES.map((r) => (
                      <td key={r} className="px-3 py-2">
                        <span role="group" aria-label={`${ETIQUETAS_ROL[r].nombre} en ${nombreSeccion}`} className="flex flex-wrap gap-x-3 gap-y-1">
                          {(["ver", "crear", "editar", "enviar", "aprobar", "publicar"] as Accion[]).map((a) => {
                            const filaRol = matriz[r][s] ?? matriz[r]["*"];
                            const marcado = !!filaRol[a];
                            return (
                              <label key={a} className="flex min-h-[44px] items-center gap-1 text-xs" title={ETIQUETAS_ACCION[a]}>
                                <input
                                  type="checkbox"
                                  checked={marcado}
                                  disabled={!puedeGestionar}
                                  onChange={() => alternar(r, s, a)}
                                  className="h-5 w-5"
                                  aria-label={`${ETIQUETAS_ROL[r].nombre}: ${ETIQUETAS_ACCION[a]} en ${nombreSeccion}`}
                                />
                                {a}
                              </label>
                            );
                          })}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminContenido>
  );
}
