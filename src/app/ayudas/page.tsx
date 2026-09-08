import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { DatoEjemplo } from "@/components/sitio/DatoEjemplo";
import { formatearFechaES } from "@/lib/formato";
import { HandCoins } from "lucide-react";

export const metadata: Metadata = {
  title: "Ayudas y subvenciones",
  description:
    "Ayudas del Ayuntamiento de Los Realejos para vecinos, familias, empresas y asociaciones, con su plazo y cómo pedirlas.",
};

type Ayuda = {
  id: string;
  titulo: string;
  destinatario: "particulares" | "familias" | "empresas" | "asociaciones";
  estado: "abierta" | "cerrada";
  finPlazoISO: string | null;
  descripcion: string;
};

const ETIQUETAS_DEST: Record<Ayuda["destinatario"], string> = {
  particulares: "Particulares",
  familias: "Familias",
  empresas: "Empresas",
  asociaciones: "Asociaciones",
};

const AYUDAS: Ayuda[] = [
  { id: "libros", titulo: "Ayudas para libros y material escolar", destinatario: "familias", estado: "abierta", finPlazoISO: "2026-09-15", descripcion: "Hasta 150 euros por hijo para familias empadronadas." },
  { id: "bandas", titulo: "Ayudas a las bandas de música", destinatario: "asociaciones", estado: "abierta", finPlazoISO: "2026-09-30", descripcion: "Para instrumentos, trajes y clases de las bandas de Realejo Alto y Bajo." },
  { id: "emprendedores", titulo: "Ayudas para abrir un negocio", destinatario: "empresas", estado: "abierta", finPlazoISO: "2026-10-31", descripcion: "Hasta 2.000 euros para nuevos negocios en el municipio (dato de ejemplo)." },
  { id: "mayores", titulo: "Ayudas para personas mayores que viven solas", destinatario: "particulares", estado: "abierta", finPlazoISO: "2026-12-31", descripcion: "Apoyo para teleasistencia y pequeñas reformas en casa." },
  { id: "deportistas", titulo: "Ayudas a deportistas del municipio (cerrada)", destinatario: "particulares", estado: "cerrada", finPlazoISO: "2026-05-30", descripcion: "Convocatoria cerrada en mayo. Se publicará la de 2027." },
];

export default async function AyudasPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const dest = typeof sp.para === "string" ? sp.para : "";
  const estado = typeof sp.estado === "string" ? sp.estado : "";
  const filtradas = AYUDAS.filter(
    (a) => (!dest || a.destinatario === dest) && (!estado || a.estado === estado)
  );

  return (
    <>
      <Breadcrumbs migas={[{ texto: "Ayudas y subvenciones" }]} />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-extrabold">Ayudas y subvenciones</h1>
        <p className="prosa-municipal mt-2 text-lg">
          Dinero que el Ayuntamiento da a vecinos, familias, empresas y asociaciones. Cada ayuda dice
          para quién es, hasta cuándo se puede pedir y cómo. Última actualización: 8 de septiembre de 2026.
        </p>

        <form method="get" action="/ayudas" aria-label="Filtrar ayudas" className="mt-4 flex flex-wrap gap-4 rounded border bg-card p-4">
          <p>
            <label htmlFor="a-para" className="font-bold">Es para: </label>
            <select id="a-para" name="para" defaultValue={dest} className="rounded border px-2 py-2">
              <option value="">Todas</option>
              <option value="particulares">Particulares</option>
              <option value="familias">Familias</option>
              <option value="empresas">Empresas</option>
              <option value="asociaciones">Asociaciones</option>
            </select>
          </p>
          <p>
            <label htmlFor="a-estado" className="font-bold">Plazo: </label>
            <select id="a-estado" name="estado" defaultValue={estado} className="rounded border px-2 py-2">
              <option value="">Abiertas y cerradas</option>
              <option value="abierta">Solo abiertas</option>
              <option value="cerrada">Solo cerradas</option>
            </select>
          </p>
          <button type="submit" className="rounded bg-primary px-5 py-2 font-bold text-white">Aplicar filtros</button>
          <a href="/ayudas" className="rounded border-2 border-primary px-5 py-2 font-bold text-primary">Limpiar filtros</a>
        </form>

        <p className="mt-4 text-lg" role="status"><strong>{filtradas.length}</strong> ayudas encontradas.</p>
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {filtradas.map((a) => (
            <li key={a.id} className="rounded border bg-card p-4">
              <p className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-primary">
                <HandCoins aria-hidden="true" size={16} />
                {ETIQUETAS_DEST[a.destinatario]} · {a.estado === "abierta" ? "Plazo abierto" : "Plazo cerrado"}
              </p>
              <h2 className="mt-1 text-xl font-bold">{a.titulo}</h2>
              <p className="mt-1 text-base">{a.descripcion}<DatoEjemplo /></p>
              {a.finPlazoISO && (
                <p className="mt-1 font-semibold">Fin de plazo: {formatearFechaES(a.finPlazoISO)}</p>
              )}
              <p className="mt-2">
                <a href="/transparencia/contratacion" className="font-bold text-primary underline">
                  Ver bases y cómo pedir «{a.titulo}» en transparencia
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
