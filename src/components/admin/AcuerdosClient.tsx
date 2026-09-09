"use client";

import { useState } from "react";
import { AdminTable, type ColumnaTabla } from "@/components/admin/AdminTable";
import type { FilaAcuerdo } from "@/app/(admin)/admin/acuerdos/page";

type Contacto = { fecha: string; autor: string; nota: string };

const HISTORICO_INICIAL: Record<string, Contacto[]> = {
  urbanismo: [
    { fecha: "2026-08-20", autor: "R. Sosa (Validadora)", nota: "Revisados requisitos de licencia de obra menor. Pendiente actualizar tasas." },
    { fecha: "2026-06-10", autor: "M. Hernández (Editor, Urbanismo)", nota: "Alta de licencia de actividad con nuevos plazos." },
  ],
  hacienda: [
    { fecha: "2026-08-28", autor: "J. Pérez (Editor, Hacienda)", nota: "Plusvalía enviada a revisión con el nuevo plazo de resolución." },
  ],
};

export function AcuerdosClient({ filas }: { filas: FilaAcuerdo[] }) {
  const [historico, setHistorico] = useState<Record<string, Contacto[]>>(HISTORICO_INICIAL);
  const [abierta, setAbierta] = useState<string | null>(null);
  const [nota, setNota] = useState("");

  function registrar(areaId: string) {
    const texto = nota.trim();
    if (!texto) return;
    setHistorico((h) => ({
      ...h,
      [areaId]: [{ fecha: new Date().toISOString().slice(0, 10), autor: "Usuario del gestor", nota: texto }, ...(h[areaId] ?? [])],
    }));
    setNota("");
  }

  const columnas: ColumnaTabla<FilaAcuerdo>[] = [
    { id: "area", encabezado: "Área", render: (f) => <span className="font-semibold">{f.nombre}</span> },
    { id: "resp", encabezado: "Responsable", render: (f) => <span className="text-xs">{f.responsable}</span> },
    { id: "n", encabezado: "Contenidos", render: (f) => <span>{f.n} asignados</span> },
    { id: "per", encabezado: "Periodicidad", render: () => <span className="text-xs">Trámites 6 m. · resto 12 m.</span> },
    { id: "ult", encabezado: "Última revisión", render: (f) => <span className="text-xs">{f.ultima}</span> },
    {
      id: "cumple",
      encabezado: "Cumplimiento",
      render: (f) => (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${f.cumple ? "bg-green-50 text-green-900 ring-green-200" : "bg-red-50 text-red-900 ring-red-200"}`}>
          {f.cumple ? "Al día" : "Retrasada"}
        </span>
      ),
    },
  ];

  return (
    <>
      <AdminTable
        columnas={columnas}
        filas={filas}
        claveDe={(f) => f.areaId}
        total={filas.length}
        pagina={1}
        porPagina={50}
        onPagina={() => {}}
        onPorPagina={() => {}}
        accionesDe={(f) => [
          { etiqueta: abierta === f.areaId ? "Cerrar histórico" : "Ver histórico y registrar contacto", onClick: () => { setAbierta((a) => (a === f.areaId ? null : f.areaId)); setNota(""); } },
        ]}
      />
      {abierta && (
        <section aria-label="Histórico de contactos" className="rounded-lg border border-neutral-200 p-4">
          <h2 className="text-sm font-bold">
            Histórico de contactos y actualizaciones: {filas.find((f) => f.areaId === abierta)?.nombre}
          </h2>
          <ul className="mt-2 space-y-2">
            {(historico[abierta] ?? []).map((c, i) => (
              <li key={i} className="rounded bg-neutral-50 p-2 text-sm">
                <strong>{c.fecha}</strong> · {c.autor} — {c.nota}
              </li>
            ))}
            {(historico[abierta] ?? []).length === 0 && (
              <li className="text-sm text-neutral-500">Sin contactos registrados todavía.</li>
            )}
          </ul>
          <label className="mt-3 block text-xs font-semibold">
            Nuevo contacto o actualización recibida
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-2 text-sm"
              placeholder="Ej.: Llamada al área: confirman que las tasas siguen vigentes."
            />
          </label>
          <button
            type="button"
            onClick={() => registrar(abierta)}
            disabled={!nota.trim()}
            className="mt-2 inline-flex min-h-[44px] items-center rounded-md bg-primary px-4 text-sm font-bold text-white disabled:opacity-60"
          >
            Registrar contacto
          </button>
        </section>
      )}
    </>
  );
}
