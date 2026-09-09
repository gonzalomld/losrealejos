"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import type { RegistroEditorial } from "@/lib/cms/tipos-editoriales";
import { useRol } from "@/lib/roles/contexto";
import { accionActividad } from "@/lib/cms/acciones";

type HallazgoDemo = { id: string; categoria: string; texto: string; estado: "pendiente" | "suprimido" | "descartado" };

const HALLAZGOS_INICIALES: HallazgoDemo[] = [
  { id: "h1", categoria: "Nombre", texto: "C. Expósito Felipe (nombre ficticio de ejemplo)", estado: "pendiente" },
  { id: "h2", categoria: "Documento de identidad", texto: "NIF 12.345.678-Z (número ficticio de ejemplo)", estado: "pendiente" },
  { id: "h3", categoria: "Teléfono", texto: "600 000 001 (número ficticio de ejemplo)", estado: "pendiente" },
  { id: "h4", categoria: "Correo", texto: "persona.ejemplo0001@ejemplo.es (dirección ficticia)", estado: "pendiente" },
  { id: "h5", categoria: "Dirección", texto: "Calle Ejemplo, 1 (dirección ficticia)", estado: "pendiente" },
  { id: "h6", categoria: "Cuenta", texto: "IBAN ES00 0000 0000 00 0000000000 (ficticio)", estado: "pendiente" },
];

const CHECKLIST = [
  "He revisado el documento completo, página por página, buscando datos personales.",
  "He confirmado o descartado cada hallazgo de la detección asistida.",
  "He aplicado la redacción efectiva: el texto se suprime de la capa del documento, no se tapa visualmente.",
  "He anotado en el registro qué elementos se suprimieron, quién revisó y en qué fecha.",
];

export function AnonimizacionDetalle({ registro }: { registro: RegistroEditorial<Record<string, unknown>> }) {
  const { usuario } = useRol();
  const [hallazgos, setHallazgos] = useState<HallazgoDemo[]>(HALLAZGOS_INICIALES);
  const [checks, setChecks] = useState<boolean[]>(CHECKLIST.map(() => false));
  const [finalizado, setFinalizado] = useState(false);

  const suprimidos = hallazgos.filter((h) => h.estado === "suprimido");
  const pendientes = hallazgos.filter((h) => h.estado === "pendiente");
  const todoOk = pendientes.length === 0 && checks.every(Boolean);

  function marcar(id: string, estado: HallazgoDemo["estado"]) {
    setHallazgos((hs) => hs.map((h) => (h.id === id ? { ...h, estado } : h)));
  }

  async function finalizar() {
    await accionActividad({
      usuario: usuario.nombre,
      accion: "revision_documento",
      elemento: `documentos/${registro.id}`,
      detalle: `Revisión de datos: ${suprimidos.length} elementos suprimidos (${suprimidos.map((s) => s.categoria).join(", ") || "ninguno"})`,
    });
    setFinalizado(true);
  }

  return (
    <AdminContenido>
      <AdminPageHeader
        titulo={`Revisión: ${String(registro.contenido["titulo"] ?? registro.id)}`}
        descripcion="Detección asistida de posibles datos personales. La detección es una ayuda, no una decisión: confirma o descarta cada hallazgo. Todos los datos de esta pantalla son claramente ficticios."
      />
      <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-900">
        <TriangleAlert aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
        Obligación de verificar datos personales antes de publicar. La ocultación visual no es válida: el texto se suprime de forma efectiva de la capa del documento.
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <section aria-labelledby="visor-titulo" className="rounded-lg border border-neutral-200 p-4">
          <h2 id="visor-titulo" className="text-sm font-bold">Vista del documento con detección asistida ({hallazgos.length} hallazgos)</h2>
          <div className="mt-2 space-y-2 rounded bg-neutral-50 p-3 text-sm leading-relaxed">
            <p>Lista de personas admitidas — extracto de ejemplo con datos ficticios:</p>
            {hallazgos.map((h) => (
              <p key={h.id} className="flex flex-wrap items-center gap-2 rounded bg-white p-2">
                <mark className={h.estado === "suprimido" ? "bg-neutral-900 text-neutral-900 line-through" : "bg-yellow-200"}>
                  {h.estado === "suprimido" ? "████████████" : h.texto}
                </mark>
                <span className="text-xs font-bold uppercase text-neutral-500">{h.categoria}</span>
                {h.estado === "pendiente" ? (
                  <span className="flex gap-1">
                    <button type="button" onClick={() => marcar(h.id, "suprimido")} className="min-h-[44px] rounded-md bg-red-700 px-3 text-xs font-bold text-white">Confirmar supresión</button>
                    <button type="button" onClick={() => marcar(h.id, "descartado")} className="min-h-[44px] rounded-md bg-neutral-200 px-3 text-xs font-semibold">Descartar</button>
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-neutral-600">
                    {h.estado === "suprimido" ? "Suprimido de la capa (no tapado)" : "Descartado por el revisor"}
                    {" · "}
                    <button type="button" onClick={() => marcar(h.id, "pendiente")} className="underline">Reabrir</button>
                  </span>
                )}
              </p>
            ))}
          </div>
          <p className="mt-2 text-xs text-neutral-500">La herramienta de redacción elimina el texto de la capa del documento. Tapar con un rectángulo no es válido.</p>
        </section>

        <div className="space-y-3">
          <fieldset className="rounded-lg border border-neutral-200 p-3">
            <legend className="px-1 text-sm font-bold">Comprobación final del procedimiento municipal</legend>
            {CHECKLIST.map((c, i) => (
              <label key={c} className="mt-1 flex items-start gap-2 text-sm">
                <input type="checkbox" checked={checks[i]} onChange={(e) => setChecks((cs) => cs.map((v, j) => (j === i ? e.target.checked : v)))} className="mt-1 h-5 w-5" />
                {c}
              </label>
            ))}
          </fieldset>
          <button
            type="button"
            onClick={finalizar}
            disabled={!todoOk || finalizado}
            title={!todoOk ? "Resuelve todos los hallazgos y completa la checklist para finalizar." : undefined}
            className="min-h-[44px] w-full rounded-md bg-primary px-4 text-sm font-bold text-white disabled:opacity-60"
          >
            {finalizado ? "Revisión registrada" : `Finalizar revisión (${pendientes.length} pendientes)`}
          </button>
          <section aria-label="Registro de revisión" className="rounded-lg border border-neutral-200 p-3 text-sm">
            <h2 className="text-sm font-bold">Registro de revisión (permanente)</h2>
            {finalizado ? (
              <dl className="mt-1 space-y-1 text-xs">
                <div><dt className="font-bold">Quién revisó</dt><dd>{usuario.nombre}</dd></div>
                <div><dt className="font-bold">Fecha</dt><dd>{new Date().toISOString().slice(0, 10)}</dd></div>
                <div><dt className="font-bold">Elementos suprimidos</dt><dd>{suprimidos.map((s) => `${s.categoria}: ${s.texto}`).join("; ") || "Ninguno"}</dd></div>
              </dl>
            ) : (
              <p className="mt-1 text-xs text-neutral-500">Se genera al finalizar: quién revisó, fecha y qué se suprimió. Queda asociado al documento.</p>
            )}
          </section>
        </div>
      </div>
    </AdminContenido>
  );
}
