import type { Metadata } from "next";
import { SearchBox } from "@/components/sitio/SearchBox";
import { TramiteCard } from "@/components/sitio/TramiteCard";
import { CONTACTO_OAC, TRAMITES_FRECUENTES } from "@/data/vocabularios";
import { leerParaFront } from "@/lib/cms/almacen";
import type { Tramite } from "@/data/tramites";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "Esta página no existe o ha cambiado de dirección. Busca tu gestión o llama al 922 34 62 34.",
};

/** El 404 solo ofrece trámites publicados y vigentes: nunca despublicados ni caducados. */
export default async function NotFound() {
  const publicados = await leerParaFront<Tramite>("tramites");
  const frecuentes = publicados.filter((t) => (TRAMITES_FRECUENTES as readonly string[]).includes(t.id));
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Esta página no existe o ha cambiado de dirección</h1>
      <p className="prosa-municipal mt-2 text-lg">
        Es posible que la hayamos movido al nuevo portal. Prueba a buscar lo que necesitas o usa los
        trámites más frecuentes. Si prefieres, llama a atención ciudadana al{" "}
        <a href={CONTACTO_OAC.telefonoHref} className="font-bold text-primary underline">
          {CONTACTO_OAC.telefono}
        </a>
        .
      </p>
      <div className="mt-4 max-w-2xl">
        <SearchBox id="buscador-404" variante="grande" />
      </div>
      <h2 className="mt-8 text-2xl font-extrabold">Trámites más frecuentes</h2>
      <ul className="mt-3 grid gap-3 md:grid-cols-2">
        {frecuentes.map((t) => (
          <li key={t.id}>
            <TramiteCard tramite={t} />
          </li>
        ))}
      </ul>
      <p className="mt-6 flex flex-wrap gap-4 text-lg font-bold">
        <a href="/" className="text-primary underline">Volver a la portada</a>
        <a href="/mapa-del-sitio" className="text-primary underline">Ver el mapa del sitio con todas las páginas</a>
      </p>
    </div>
  );
}
