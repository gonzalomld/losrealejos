import type { MetadataRoute } from "next";
import { leerParaFront } from "@/lib/cms/almacen";
import type { Tramite } from "@/data/tramites";
import type { Ayuda } from "@/data/ayudas";
import type { Noticia } from "@/data/noticias";
import type { Evento } from "@/data/eventos";
import type { ServicioBarrio } from "@/data/servicios-barrio";
import type { Area } from "@/data/areas";
import { BLOQUES_TRANSPARENCIA } from "@/data/vocabularios";

const BASE = "https://www.losrealejos.es";

/** Sitemap solo con contenido publicado y vigente: el gestor decide qué sale. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tramites, ayudas, noticias, eventos, servicios, areas] = await Promise.all([
    leerParaFront<Tramite>("tramites"),
    leerParaFront<Ayuda>("ayudas"),
    leerParaFront<Noticia>("noticias"),
    leerParaFront<Evento>("eventos"),
    leerParaFront<ServicioBarrio>("servicios"),
    leerParaFront<Area>("areas"),
  ]);
  const fijas = [
    "", "/tramites", "/mi-barrio", "/ayuntamiento", "/areas-municipales",
    "/transparencia", "/noticias", "/agenda", "/buscar", "/contacto",
    "/empleo-publico", "/ayudas", "/mapa-del-sitio", "/accesibilidad",
    "/accesibilidad/reclamacion", "/aviso-legal", "/politica-de-cookies",
    "/proteccion-de-datos", "/campanas/fiestas-de-mayo-2026", "/tablon-de-anuncios", "/ordenanzas",
  ].map((ruta) => ({ url: `${BASE}${ruta || "/"}`, lastModified: new Date("2026-09-08") }));
  const dinamicas = [
    ...tramites.map((t) => `/tramites/${t.id}`),
    ...ayudas.map((a) => `/ayudas/${a.id}`),
    ...noticias.map((n) => `/noticias/${n.id}`),
    ...eventos.map((e) => `/agenda/${e.id}`),
    ...servicios.map((s) => `/mi-barrio/${s.id}`),
    ...areas.map((a) => `/areas-municipales/${a.id}`),
    ...BLOQUES_TRANSPARENCIA.map((b) => `/transparencia/${b}`),
  ].map((ruta) => ({ url: `${BASE}${ruta}`, lastModified: new Date("2026-09-08") }));
  const todas = [...fijas, ...dinamicas];
  // Exclusión explícita por prefijo: el gestor y la vista previa nunca se indexan,
  // aunque alguna ruta futura los genere por error.
  const EXCLUIDOS = ["/admin", "/vista-previa"];
  return todas.filter(({ url }) => {
    const ruta = url.slice(BASE.length) || "/";
    return !EXCLUIDOS.some((p) => ruta === p || ruta.startsWith(p + "/"));
  });
}
