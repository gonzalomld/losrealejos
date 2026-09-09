import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";
import { formatearFechaES } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Tablón de anuncios",
  description:
    "Tablón de anuncios del Ayuntamiento de Los Realejos: bases, listas, convocatorias y anuncios oficiales.",
};

type Anuncio = {
  id: string;
  titulo: string;
  tipo: string;
  fecha: string;
  descripcion: string;
  destino: string;
  destinoTexto: string;
};

const ANUNCIOS: Anuncio[] = [
  { id: "t1", titulo: "Bases del plan de empleo social 2026", tipo: "Empleo", fecha: "2026-07-08", descripcion: "40 contratos de seis meses. Plazo abierto hasta el 12 de septiembre.", destino: "/empleo-publico", destinoTexto: "Ver la convocatoria del plan de empleo social" },
  { id: "t2", titulo: "Lista definitiva de la bolsa de auxiliar administrativo (muestra)", tipo: "Empleo", fecha: "2026-05-12", descripcion: "180 personas admitidas. Examen el 20 de septiembre en el IES Realejos.", destino: "/empleo-publico", destinoTexto: "Ver la bolsa de auxiliar administrativo" },
  { id: "t3", titulo: "Ayudas a las bandas de música 2026: bases", tipo: "Ayudas", fecha: "2026-07-15", descripcion: "Para las bandas de Realejo Alto y Realejo Bajo. Plazo hasta el 30 de septiembre.", destino: "/ayudas", destinoTexto: "Ver las ayudas a las bandas de música" },
  { id: "t4", titulo: "Licitación del servicio de limpieza viaria", tipo: "Contratación", fecha: "2026-07-20", descripcion: "Plazo abierto hasta el 25 de septiembre para empresas.", destino: "/transparencia/contratacion", destinoTexto: "Ver la licitación de limpieza viaria en transparencia" },
  { id: "t5", titulo: "Exposición del padrón de la tasa de basura 2026", tipo: "Tributos", fecha: "2026-06-25", descripcion: "Se puede consultar y reclamar durante 15 días en Hacienda (dato de ejemplo).", destino: "/tramites/pago-ibi-tasas", destinoTexto: "Ver cómo pagar tributos y tasas" },
];

export default function TablonDeAnuncios() {
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Tablón de anuncios" }]} />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-extrabold">Tablón de anuncios oficial</h1>
        <p className="prosa-municipal mt-2 text-lg">
          Anuncios, bases y listas que publica el Ayuntamiento. Cada anuncio dice de qué es, cuándo
          se publicó y dónde verlo completo. Última actualización: 8 de septiembre de 2026.
        </p>
        <ul className="mt-4 grid gap-3">
          {ANUNCIOS.map((a) => (
            <li key={a.id} className="rounded border bg-card p-4">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">
                {a.tipo} · Publicado el {formatearFechaES(a.fecha)}
              </p>
              <h2 className="mt-1 text-xl font-bold">{a.titulo}</h2>
              <p className="mt-1 text-base">{a.descripcion}</p>
              <p className="mt-2">
                <a href={a.destino} className="font-bold text-primary underline">{a.destinoTexto}</a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
