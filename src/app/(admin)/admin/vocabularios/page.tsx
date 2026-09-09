import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  BLOQUES_TRANSPARENCIA, CANALES, ETIQUETAS_BLOQUE, ETIQUETAS_CANAL,
  ETIQUETAS_PERFIL, ETIQUETAS_TEMA, PERFILES, TEMAS,
} from "@/data/vocabularios";

export const dynamic = "force-dynamic";

/** Vocabularios (Fase 3): definidos una sola vez, compartidos por todas las colecciones. */
export default function VocabulariosAdmin() {
  return (
    <AdminContenido>
      <AdminPageHeader
        titulo="Vocabularios"
        descripcion="Temas, perfiles, canales y bloques de transparencia. Se definen una sola vez y los usan todas las colecciones, incluido el portal público."
      />
      <section aria-label="Temas" className="rounded-lg border border-neutral-200 p-4">
        <h2 className="text-sm font-bold">Temas ({TEMAS.length})</h2>
        <ul className="mt-1 grid gap-1 sm:grid-cols-2">
          {TEMAS.map((t) => (<li key={t} className="rounded bg-neutral-50 px-2 py-2 text-sm"><code className="font-mono text-xs">{t}</code> — {ETIQUETAS_TEMA[t]}</li>))}
        </ul>
      </section>
      <section aria-label="Perfiles" className="rounded-lg border border-neutral-200 p-4">
        <h2 className="text-sm font-bold">Perfiles ({PERFILES.length})</h2>
        <ul className="mt-1 space-y-1">
          {PERFILES.map((p) => (<li key={p} className="rounded bg-neutral-50 px-2 py-2 text-sm"><code className="font-mono text-xs">{p}</code> — {ETIQUETAS_PERFIL[p]}</li>))}
        </ul>
      </section>
      <section aria-label="Canales" className="rounded-lg border border-neutral-200 p-4">
        <h2 className="text-sm font-bold">Canales ({CANALES.length})</h2>
        <ul className="mt-1 space-y-1">
          {CANALES.map((c) => (<li key={c} className="rounded bg-neutral-50 px-2 py-2 text-sm"><code className="font-mono text-xs">{c}</code> — {ETIQUETAS_CANAL[c]}</li>))}
        </ul>
      </section>
      <section aria-label="Bloques de transparencia" className="rounded-lg border border-neutral-200 p-4">
        <h2 className="text-sm font-bold">Bloques de transparencia ({BLOQUES_TRANSPARENCIA.length})</h2>
        <ul className="mt-1 space-y-1">
          {BLOQUES_TRANSPARENCIA.map((b) => (<li key={b} className="rounded bg-neutral-50 px-2 py-2 text-sm"><code className="font-mono text-xs">{b}</code> — {ETIQUETAS_BLOQUE[b].titulo}</li>))}
        </ul>
      </section>
    </AdminContenido>
  );
}
