import type { BloqueTransparencia } from "./vocabularios";

export type DocumentoTransparencia = {
  id: string;
  bloque: BloqueTransparencia;
  titulo: string;
  descripcion: string;
  formato: string;
  tamano: string;
  fechaPublicacion: string;
  fechaActualizacion: string;
  ejercicio: string;
  abierto: boolean;
};

function doc(
  id: string,
  bloque: BloqueTransparencia,
  titulo: string,
  descripcion: string,
  formato: string,
  tamano: string,
  fechaPublicacion: string,
  ejercicio: string,
  abierto = false
): DocumentoTransparencia {
  return { id, bloque, titulo, descripcion, formato, tamano, fechaPublicacion, fechaActualizacion: fechaPublicacion, ejercicio, abierto };
}

export const DOCUMENTOS: DocumentoTransparencia[] = [
  // Institucional
  doc("organigrama-2026", "institucional", "Organigrama del Ayuntamiento 2026", "Cómo se organiza el Ayuntamiento: Alcaldía, concejalías y empresas municipales.", "PDF", "180 KB", "2026-02-10", "2026"),
  doc("competencias-municipales", "institucional", "Competencias y funciones del Ayuntamiento", "Qué puede hacer y qué debe hacer el Ayuntamiento según la ley.", "PDF", "240 KB", "2026-01-15", "2026"),
  doc("corporacion-pleno", "institucional", "Corporación municipal y grupos políticos", "Quién forma el pleno y qué grupo representa a cada concejal.", "PDF", "150 KB", "2026-02-01", "2026-2027", true),
  doc("ordenanzas-consolidadas", "institucional", "Ordenanzas municipales vigentes", "Lista de todas las normas aprobadas por el Ayuntamiento.", "PDF", "900 KB", "2026-03-01", "2026"),
  doc("calendario-plenos", "institucional", "Calendario de plenos 2026", "Fechas de los plenos ordinarios del año.", "PDF", "90 KB", "2026-01-10", "2026", true),
  // Empleo y personal
  doc("bolsa-auxiliar-bases", "empleo-personal", "Bolsa de auxiliar administrativo: bases", "Requisitos, temario y cómo apuntarse a la bolsa de trabajo.", "PDF", "350 KB", "2026-04-01", "2026"),
  doc("bolsa-auxiliar-lista", "empleo-personal", "Bolsa de auxiliar administrativo: lista de admitidos (muestra)", "Lista de ejemplo con formato real. No son datos oficiales.", "PDF", "280 KB", "2026-05-12", "2026"),
  doc("plan-empleo-social-bases", "empleo-personal", "Plan de empleo social 2026: bases", "40 contratos de seis meses. Requisitos y baremo.", "PDF", "410 KB", "2026-07-08", "2026"),
  doc("rpt-2026", "empleo-personal", "Relación de puestos de trabajo 2026 (estructura de muestra)", "Tabla de ejemplo con la estructura de puestos. Sin cifras salariales oficiales.", "ODS", "120 KB", "2026-02-20", "2026", true),
  doc("retribuciones-altos-cargos", "empleo-personal", "Retribuciones de cargos electos (formato de muestra)", "Plantilla de ejemplo del formato de publicación. Sin cifras oficiales.", "CSV", "15 KB", "2026-03-15", "2026", true),
  // Económica
  doc("presupuesto-2026", "economica", "Presupuesto municipal 2026 (resumen de muestra)", "Resumen de ejemplo de la estructura del presupuesto. Sin cifras oficiales.", "PDF", "1,2 MB", "2026-06-20", "2026"),
  doc("presupuesto-datos-abiertos", "economica", "Presupuesto 2026 en formato reutilizable (estructura de muestra)", "Tabla de ejemplo para descargar y reutilizar. Sin cifras oficiales.", "CSV", "85 KB", "2026-06-20", "2026", true),
  doc("liquidacion-2024", "economica", "Liquidación del presupuesto 2024 (resumen de muestra)", "Resumen de ejemplo de cómo se cerró el presupuesto. Sin cifras oficiales.", "PDF", "800 KB", "2026-04-30", "2024"),
  doc("informe-control-2025", "economica", "Informe de control interno 2025", "Qué ha revisado la Intervención municipal este año.", "PDF", "500 KB", "2026-05-10", "2025"),
  doc("deuda-viva", "economica", "Deuda del Ayuntamiento (formato de muestra)", "Plantilla de ejemplo del informe de deuda. Sin cifras oficiales.", "PDF", "200 KB", "2026-03-30", "2026-1T"),
  // Contratación
  doc("licitacion-limpieza-viaria", "contratacion", "Licitación del servicio de limpieza viaria", "Pliego y condiciones para empresas. Plazo abierto hasta el 25 de septiembre.", "PDF", "650 KB", "2026-07-20", "2026"),
  doc("adjudicacion-alumbrado", "contratacion", "Adjudicación del alumbrado de La Cruz Santa (muestra)", "Documento de ejemplo del formato de adjudicación.", "PDF", "180 KB", "2026-05-30", "2026"),
  doc("contratos-menores-t2", "contratacion", "Contratos menores del segundo trimestre de 2026 (muestra)", "Tabla de ejemplo de contratos pequeños. Sin importes oficiales.", "CSV", "40 KB", "2026-07-10", "2026-T2", true),
  doc("subvencion-bandas-bases", "contratacion", "Ayudas a bandas de música 2026: bases", "Requisitos y plazos para las bandas de Realejo Alto y Realejo Bajo.", "PDF", "320 KB", "2026-07-15", "2026"),
  doc("convenio-cruz-roja", "contratacion", "Convenio con Cruz Roja para emergencias sociales", "Qué hace cada parte y cuánto aporta el Ayuntamiento (documento de muestra).", "PDF", "220 KB", "2026-03-01", "2026"),
  // Servicios y urbanismo
  doc("catalogo-servicios", "servicios-urbanismo", "Catálogo de servicios municipales", "Lista de todos los servicios que presta el Ayuntamiento.", "PDF", "400 KB", "2026-01-20", "2026", true),
  doc("pgou-avance", "servicios-urbanismo", "Plan de la ciudad: documento de avance", "Cómo se quiere que crezca Los Realejos en los próximos años.", "PDF", "3,5 MB", "2026-04-15", "2026"),
  doc("obra-colegio-longuera", "servicios-urbanismo", "Obra de reforma del colegio de Toscal-Longuera", "Memoria y plazos de la reforma del patio y los baños.", "PDF", "700 KB", "2026-06-01", "2026"),
  doc("ordenanza-basuras", "servicios-urbanismo", "Ordenanza de limpieza y recogida de basura", "Horarios, contenedores y normas para separar la basura.", "PDF", "300 KB", "2026-02-05", "2026"),
  doc("mapa-contenedores", "servicios-urbanismo", "Puntos de contenedores y puntos limpios (muestra)", "Tabla de ejemplo con ubicaciones. Verifica en el mapa del servicio.", "CSV", "25 KB", "2026-03-10", "2026", true),
  // Datos y planificación
  doc("plan-igualdad", "datos-planificacion", "Plan de igualdad 2025-2028", "Medidas para la igualdad entre mujeres y hombres en el municipio.", "PDF", "600 KB", "2026-02-28", "2025-2028"),
  doc("memoria-2025", "datos-planificacion", "Memoria de actividad 2025", "Qué ha hecho el Ayuntamiento durante el año pasado.", "PDF", "2,1 MB", "2026-05-20", "2025"),
  doc("padron-cifras-nucleo", "datos-planificacion", "Población por núcleos 2025 (tabla de muestra)", "Tabla de ejemplo con la estructura por núcleos. Sin cifras oficiales.", "CSV", "12 KB", "2026-04-01", "2025", true),
  doc("agenda-2030-local", "datos-planificacion", "Estrategia local de desarrollo sostenible", "Objetivos del municipio para 2030: clima, empleo y barrios.", "PDF", "900 KB", "2026-01-30", "2026-2030"),
  doc("indicadores-servicios", "datos-planificacion", "Indicadores de servicios 2025 (muestra)", "Tiempos de respuesta y uso de servicios. Tabla de ejemplo.", "XLSX", "95 KB", "2026-05-05", "2025", true),
];

export function documentosDeBloque(bloque: BloqueTransparencia): DocumentoTransparencia[] {
  return DOCUMENTOS.filter((d) => d.bloque === bloque);
}

export function getDocumento(id: string): DocumentoTransparencia | undefined {
  return DOCUMENTOS.find((d) => d.id === id);
}
