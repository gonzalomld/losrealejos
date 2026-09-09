import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { AvisoPlazo } from "@/components/sitio/AvisoPlazo";
import { DatoEjemplo } from "@/components/sitio/DatoEjemplo";
import { formatearFechaES } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Empleo público",
  description:
    "Convocatorias para trabajar en el Ayuntamiento de Los Realejos: plazas abiertas, bases y cómo participar.",
};

type Convocatoria = {
  id: string;
  titulo: string;
  plazas: string;
  estado: "abierta" | "cerrada";
  finPlazoISO: string | null;
  descripcion: string;
  bases: string;
};

const CONVOCATORIAS: Convocatoria[] = [
  {
    id: "plan-empleo-social",
    titulo: "Plan de empleo social: 40 contratos de seis meses",
    plazas: "40 plazas",
    estado: "abierta",
    finPlazoISO: "2026-09-12",
    descripcion: "Limpieza, jardines y apoyo en colegios. Prioridad por situación social.",
    bases: "Bases del plan de empleo social 2026 (PDF, 410 KB)",
  },
  {
    id: "bolsa-auxiliar",
    titulo: "Bolsa de trabajo de auxiliar administrativo",
    plazas: "Bolsa (sin número fijo)",
    estado: "abierta",
    finPlazoISO: "2026-09-20",
    descripcion: "El examen es el 20 de septiembre en el IES Realejos. Hay 180 personas admitidas.",
    bases: "Bases de la bolsa de auxiliar administrativo (PDF, 350 KB)",
  },
  {
    id: "policia-local-2025",
    titulo: "2 plazas de Policía Local (convocatoria cerrada)",
    plazas: "2 plazas",
    estado: "cerrada",
    finPlazoISO: "2026-03-15",
    descripcion: "Proceso cerrado en marzo. Puedes ver las listas en transparencia.",
    bases: "Bases de la convocatoria de Policía Local (PDF, 520 KB)",
  },
];

export default function EmpleoPublico() {
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Empleo público" }]} />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-extrabold">Empleo público: trabajar en el Ayuntamiento</h1>
        <p className="prosa-municipal mt-2 text-lg">
          Aquí están las convocatorias para trabajar en el Ayuntamiento. Te explicamos cada una con
          palabras claras. Última actualización: 8 de septiembre de 2026.
        </p>

        <section aria-labelledby="como-participar" className="mt-6 rounded border bg-card p-4">
          <h2 id="como-participar" className="text-xl font-extrabold">Cómo participar, paso a paso</h2>
          <ol className="prosa-municipal mt-2 list-decimal space-y-1 pl-6 text-lg">
            <li><strong>Paso 1:</strong> Lee las bases de la convocatoria que te interese.</li>
            <li><strong>Paso 2:</strong> Comprueba que cumples los requisitos (edad, estudios, estar en paro si lo pide).</li>
            <li><strong>Paso 3:</strong> Presenta tu solicitud en la Sede Electrónica antes de que termine el plazo.</li>
            <li><strong>Paso 4:</strong> Mira las listas de admitidos en esta página y en transparencia.</li>
          </ol>
          <p className="mt-2 text-base">Si tienes dudas, llama a la Oficina de Atención Ciudadana (OAC): <a href="tel:+34922346234" className="font-bold text-primary underline">922 34 62 34</a>.</p>
        </section>

        <h2 className="mt-8 text-2xl font-extrabold">Convocatorias</h2>
        <ul className="mt-3 grid gap-3">
          {CONVOCATORIAS.map((c) => (
            <li key={c.id} className="rounded border bg-card p-4">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">
                {c.estado === "abierta" ? "Plazo abierto" : "Plazo cerrado"} · {c.plazas}
                <DatoEjemplo />
              </p>
              <h3 className="mt-1 text-xl font-bold">{c.titulo}</h3>
              <p className="mt-1 text-base">{c.descripcion}</p>
              {c.finPlazoISO && (
                <p className="mt-1 text-base font-semibold">
                  Fin de plazo: {formatearFechaES(c.finPlazoISO)}
                </p>
              )}
              <p className="mt-2 flex flex-wrap gap-3">
                <a href="/transparencia/empleo-personal" className="font-bold text-primary underline">
                  Descargar {c.bases} (documento de muestra)
                </a>
                <a href="/transparencia/empleo-personal" className="font-bold text-primary underline">
                  Ver esta convocatoria en transparencia
                </a>
              </p>
            </li>
          ))}
        </ul>

        <h2 className="mt-8 text-2xl font-extrabold">Avisos de empleo</h2>
        <div className="mt-3">
          <AvisoPlazo
            aviso={{
              id: "plan-empleo-social",
              titulo: "Plan de empleo social: 40 contratos",
              tipo: "empleo",
              descripcion: "Contratos de seis meses para limpieza, jardines y colegios.",
              finPlazoISO: "2026-09-12",
              fechaHechoISO: null,
              enlace: "/transparencia/empleo-personal",
              enlaceTexto: "Ver las bases del plan de empleo en transparencia",
            }}
          />
        </div>
      </div>
    </>
  );
}
