export const TEMAS = [
  "padron",
  "tributos",
  "urbanismo",
  "deportes",
  "cultura",
  "actividad-economica",
  "medio-ambiente",
  "servicios-sociales",
  "atencion-ciudadana",
] as const;
export type Tema = (typeof TEMAS)[number];

export const ETIQUETAS_TEMA: Record<Tema, string> = {
  padron: "Padrón y certificados",
  tributos: "Tributos y pagos",
  urbanismo: "Urbanismo y obras",
  deportes: "Deportes",
  cultura: "Cultura y educación",
  "actividad-economica": "Actividad económica",
  "medio-ambiente": "Medio ambiente",
  "servicios-sociales": "Servicios sociales",
  "atencion-ciudadana": "Atención ciudadana",
};

export const CANALES = ["online", "presencial", "ambos"] as const;
export type Canal = (typeof CANALES)[number];

export const ETIQUETAS_CANAL: Record<Canal, string> = {
  online: "Se puede hacer online",
  presencial: "Hay que ir presencial",
  ambos: "Online o presencial",
};

export const PERFILES = ["ciudadano", "empresa", "asociacion"] as const;
export type Perfil = (typeof PERFILES)[number];

export const ETIQUETAS_PERFIL: Record<Perfil, string> = {
  ciudadano: "Ciudadanía",
  empresa: "Empresas y profesionales",
  asociacion: "Asociaciones",
};

export const BLOQUES_TRANSPARENCIA = [
  "institucional",
  "empleo-personal",
  "economica",
  "contratacion",
  "servicios-urbanismo",
  "datos-planificacion",
] as const;
export type BloqueTransparencia = (typeof BLOQUES_TRANSPARENCIA)[number];

export const ETIQUETAS_BLOQUE: Record<
  BloqueTransparencia,
  { titulo: string; descripcion: string }
> = {
  institucional: {
    titulo: "Información institucional y organizativa",
    descripcion:
      "Qué hace el Ayuntamiento, quién lo gobierna, cómo se organiza y qué normas municipales aprueba.",
  },
  "empleo-personal": {
    titulo: "Empleo público y personal",
    descripcion:
      "Convocatorias abiertas, procesos de selección, puestos de trabajo y sueldos del personal.",
  },
  economica: {
    titulo: "Información económico-financiera",
    descripcion:
      "Presupuestos del año, cuentas cerradas, informes de control y deuda del Ayuntamiento.",
  },
  contratacion: {
    titulo: "Contratación, convenios y subvenciones",
    descripcion:
      "Qué compra y contrata el Ayuntamiento, con quién firma convenios y qué ayudas concede.",
  },
  "servicios-urbanismo": {
    titulo: "Servicios, procedimientos y urbanismo",
    descripcion:
      "Servicios que presta el Ayuntamiento, cómo se tramitan, obras públicas y planes de la ciudad.",
  },
  "datos-planificacion": {
    titulo: "Datos, indicadores y planificación",
    descripcion:
      "Planes de futuro, memorias de actividad y datos del municipio en formato reutilizable.",
  },
};

export const TIPOS_CONTENIDO = [
  "tramite",
  "noticia",
  "documento",
  "pagina",
  "evento",
  "servicio",
] as const;
export type TipoContenido = (typeof TIPOS_CONTENIDO)[number];

export const ETIQUETAS_TIPO: Record<TipoContenido, string> = {
  tramite: "Trámite",
  noticia: "Noticia",
  documento: "Documento oficial",
  pagina: "Página",
  evento: "Evento",
  servicio: "Servicio del día a día",
};

export const CONTACTO_OAC = {
  nombre: "Oficina de Atención Ciudadana (OAC)",
  direccion: "Avenida de Canarias, 6, 38410 Los Realejos, Santa Cruz de Tenerife",
  telefono: "922 34 62 34",
  telefonoHref: "tel:+34922346234",
  horario: "Lunes a viernes, de 8:30 a 14:00",
  oacSigla: "OAC (Oficina de Atención Ciudadana)",
} as const;

export const TRAMITES_FRECUENTES = [
  "alta-en-el-padron",
  "certificado-de-empadronamiento",
  "certificado-de-viaje-descuento-residente",
  "licencia-obra-menor",
] as const;
