import { TRAMITES, temasDe } from "@/data/tramites";
import { NOTICIAS } from "@/data/noticias";
import { EVENTOS } from "@/data/eventos";
import { DOCUMENTOS } from "@/data/transparencia";
import { SERVICIOS_BARRIO } from "@/data/servicios-barrio";
import { ETIQUETAS_TEMA, type Tema, type TipoContenido } from "@/data/vocabularios";

export type Resultado = {
  tipo: TipoContenido;
  titulo: string;
  descripcion: string;
  href: string;
  fecha: string;
  tema?: Tema;
};

export type FiltrosBusqueda = {
  q: string;
  tipo?: string;
  tema?: string;
};

function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const PAGINAS: Resultado[] = [
  { tipo: "pagina", titulo: "Contacto y atención ciudadana", descripcion: "Oficina de Atención Ciudadana (OAC): dirección, horario, teléfono y cita previa.", href: "/contacto", fecha: "2026-01-15" },
  { tipo: "pagina", titulo: "Áreas municipales: directorio", descripcion: "Las 19 áreas del Ayuntamiento con su teléfono y correo.", href: "/areas-municipales", fecha: "2026-01-15" },
  { tipo: "pagina", titulo: "Empleo público", descripcion: "Convocatorias abiertas y cerradas para trabajar en el Ayuntamiento.", href: "/empleo-publico", fecha: "2026-07-08" },
  { tipo: "pagina", titulo: "Ayudas y subvenciones", descripcion: "Ayudas para vecinos, familias, empresas y asociaciones.", href: "/ayudas", fecha: "2026-07-15" },
  { tipo: "pagina", titulo: "Portal de transparencia", descripcion: "Documentos oficiales del Ayuntamiento: presupuestos, contratos, empleo y más.", href: "/transparencia", fecha: "2026-01-15" },
  { tipo: "pagina", titulo: "Mapa del sitio", descripcion: "Todas las páginas del portal en una lista.", href: "/mapa-del-sitio", fecha: "2026-01-15" },
  { tipo: "pagina", titulo: "Declaración de accesibilidad", descripcion: "Cómo cumple este portal la normativa de accesibilidad.", href: "/accesibilidad", fecha: "2026-06-01" },
];

export function buscarTodo({ q, tipo, tema }: FiltrosBusqueda): Resultado[] {
  const query = normalizar(q.trim());
  const palabras = query.split(/\s+/).filter(Boolean);

  const coincide = (texto: string) =>
    palabras.length === 0 || palabras.every((p) => normalizar(texto).includes(p));

  const resultados: Resultado[] = [];

  for (const t of TRAMITES) {
    if (tipo && tipo !== "tramite") continue;
    if (tema && !temasDe(t).includes(tema as Tema)) continue;
    if (!coincide(`${t.tituloClaro} ${t.tituloOficial} ${t.descripcion}`)) continue;
    resultados.push({
      tipo: "tramite",
      titulo: t.tituloClaro,
      descripcion: t.descripcion,
      href: `/tramites/${t.id}`,
      fecha: t.fechaActualizacion,
      tema: t.tema,
    });
  }

  for (const d of DOCUMENTOS) {
    if (tipo && tipo !== "documento") continue;
    if (!coincide(`${d.titulo} ${d.descripcion}`)) continue;
    resultados.push({
      tipo: "documento",
      titulo: d.titulo,
      descripcion: d.descripcion,
      href: `/transparencia/${d.bloque}`,
      fecha: d.fechaPublicacion,
    });
  }

  for (const s of SERVICIOS_BARRIO) {
    if (tipo && tipo !== "servicio") continue;
    if (!coincide(`${s.nombre} ${s.descripcion}`)) continue;
    resultados.push({
      tipo: "servicio",
      titulo: s.nombre,
      descripcion: s.descripcion,
      href: `/mi-barrio/${s.id}`,
      fecha: s.fechaActualizacion,
    });
  }

  for (const n of NOTICIAS) {
    if (tipo && tipo !== "noticia") continue;
    if (!coincide(`${n.titular} ${n.entradilla}`)) continue;
    resultados.push({
      tipo: "noticia",
      titulo: n.titular,
      descripcion: n.entradilla,
      href: `/noticias/${n.id}`,
      fecha: n.fecha,
    });
  }

  for (const e of EVENTOS) {
    if (tipo && tipo !== "evento") continue;
    if (!coincide(`${e.titulo} ${e.descripcion}`)) continue;
    resultados.push({
      tipo: "evento",
      titulo: e.titulo,
      descripcion: e.descripcion,
      href: `/agenda/${e.id}`,
      fecha: e.fechaHoraISO.slice(0, 10),
    });
  }

  if (!tema) {
    for (const p of PAGINAS) {
      if (tipo && tipo !== "pagina") continue;
      if (!coincide(`${p.titulo} ${p.descripcion}`)) continue;
      resultados.push(p);
    }
  }

  // Prioridad: trámites primero, luego documentos vigentes, luego resto por fecha
  const peso: Record<string, number> = { tramite: 0, documento: 1, servicio: 2, pagina: 3, evento: 4, noticia: 5 };
  return resultados.sort(
    (a, b) => (peso[a.tipo] ?? 9) - (peso[b.tipo] ?? 9) || (a.fecha < b.fecha ? 1 : -1)
  );
}

export function etiquetaTema(tema?: Tema): string | null {
  return tema ? ETIQUETAS_TEMA[tema] : null;
}
