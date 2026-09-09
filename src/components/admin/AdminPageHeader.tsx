import type { ReactNode } from "react";

export type AccionCabecera = {
  etiqueta: string;
  href?: string;
  onClick?: () => void;
  principal?: boolean;
  deshabilitada?: boolean;
  motivo?: string;
};

/** Cabecera de página del gestor: h1 único + descripción + acciones a la derecha. */
export function AdminPageHeader({
  titulo,
  descripcion,
  acciones = [],
}: {
  titulo: string;
  descripcion: string;
  acciones?: AccionCabecera[];
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-extrabold text-neutral-900">{titulo}</h1>
        <p className="mt-1 max-w-[70ch] text-sm text-neutral-600">{descripcion}</p>
      </div>
      {acciones.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {acciones.map((a) =>
            a.href && !a.deshabilitada ? (
              <a
                key={a.etiqueta}
                href={a.href}
                className={`inline-flex min-h-[44px] items-center rounded-md px-4 text-sm font-semibold ${a.principal ? "bg-primary text-white" : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"}`}
              >
                {a.etiqueta}
              </a>
            ) : (
              <button
                key={a.etiqueta}
                type="button"
                onClick={a.onClick}
                disabled={a.deshabilitada}
                aria-disabled={a.deshabilitada || undefined}
                title={a.deshabilitada ? a.motivo : undefined}
                aria-label={a.deshabilitada && a.motivo ? `${a.etiqueta}. ${a.motivo}` : undefined}
                className={`inline-flex min-h-[44px] items-center rounded-md px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60 ${a.principal ? "bg-primary text-white" : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"}`}
              >
                {a.etiqueta}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}

export function AdminContenido({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl space-y-5 px-6 py-6">{children}</div>;
}
