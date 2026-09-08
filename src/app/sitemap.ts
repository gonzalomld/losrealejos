import type { MetadataRoute } from "next";
import { TRAMITES } from "@/data/tramites";
import { NOTICIAS } from "@/data/noticias";
import { EVENTOS } from "@/data/eventos";
import { SERVICIOS_BARRIO } from "@/data/servicios-barrio";
import { AREAS } from "@/data/areas";
import { BLOQUES_TRANSPARENCIA } from "@/data/vocabularios";

const BASE = "https://www.losrealejos.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const fijas = [
    "", "/tramites", "/mi-barrio", "/ayuntamiento", "/areas-municipales",
    "/transparencia", "/noticias", "/agenda", "/buscar", "/contacto",
    "/empleo-publico", "/ayudas", "/mapa-del-sitio", "/accesibilidad",
    "/accesibilidad/reclamacion", "/aviso-legal", "/politica-de-cookies",
    "/proteccion-de-datos", "/campanas/fiestas-de-mayo-2026", "/tablon-de-anuncios", "/ordenanzas",
  ].map((ruta) => ({ url: `${BASE}${ruta || "/"}`, lastModified: new Date("2026-09-08") }));
  const dinamicas = [
    ...TRAMITES.map((t) => `/tramites/${t.id}`),
    ...NOTICIAS.map((n) => `/noticias/${n.id}`),
    ...EVENTOS.map((e) => `/agenda/${e.id}`),
    ...SERVICIOS_BARRIO.map((s) => `/mi-barrio/${s.id}`),
    ...AREAS.map((a) => `/areas-municipales/${a.id}`),
    ...BLOQUES_TRANSPARENCIA.map((b) => `/transparencia/${b}`),
  ].map((ruta) => ({ url: `${BASE}${ruta}`, lastModified: new Date("2026-09-08") }));
  return [...fijas, ...dinamicas];
}
