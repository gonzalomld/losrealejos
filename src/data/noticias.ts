export type Noticia = {
  id: string;
  titular: string;
  entradilla: string;
  cuerpo: string[];
  imagen?: { src: string; alt: string } | null;
  fecha: string;
  categoria: string;
  adjuntos?: { titulo: string; formato: string; tamano: string }[];
  fechaActualizacion: string;
};

export const CATEGORIAS_NOTICIA = [
  "obras",
  "ayudas",
  "empleo",
  "cultura",
  "fiestas",
  "presupuestos",
  "plenos",
] as const;

export const ETIQUETAS_CATEGORIA_NOTICIA: Record<string, string> = {
  obras: "Obras",
  ayudas: "Ayudas",
  empleo: "Empleo",
  cultura: "Cultura",
  fiestas: "Fiestas",
  presupuestos: "Presupuestos",
  plenos: "Plenos",
};

export const NOTICIAS: Noticia[] = [
  {
    id: "reforma-piscina-municipal-verano",
    titular: "La piscina municipal cierra dos semanas en agosto por la reforma de los vestuarios",
    entradilla: "Las obras mejoran la accesibilidad de los vestuarios. Los cursos de verano se trasladan al polideportivo de Toscal-Longuera.",
    cuerpo: [
      "La piscina municipal cerrará del 4 al 17 de agosto para reformar los vestuarios. Se amplían las duchas accesibles y se renueva el suelo antideslizante.",
      "Los cursos de natación de esas dos semanas se darán en el polideportivo de Toscal-Longuera, en el mismo horario. No hay que apuntarse de nuevo: el traslado es automático.",
      "El abono mensual de agosto costará la mitad por el cierre. Las personas abonadas verán el descuento en el recibo de septiembre.",
    ],
    imagen: null,
    fecha: "2026-07-22",
    categoria: "obras",
    fechaActualizacion: "2026-07-22",
  },
  {
    id: "subvencion-bandas-musica",
    titular: "El Ayuntamiento abre las ayudas para las bandas de música del municipio",
    entradilla: "Hay 45.000 euros para las bandas de Realejo Alto y Realejo Bajo. El plazo termina el 30 de septiembre.",
    cuerpo: [
      "Las bandas de música de Realejo Alto y Realejo Bajo pueden pedir la ayuda anual para instrumentos, trajes y clases.",
      "Este año el presupuesto total es de 45.000 euros, como ejemplo de convocatoria. Cada banda puede recibir hasta 22.500 euros según sus alumnos y actuaciones.",
      "Las bases están en el tablón de anuncios y en transparencia. La solicitud se presenta en la Sede Electrónica.",
    ],
    fecha: "2026-07-15",
    categoria: "ayudas",
    adjuntos: [{ titulo: "Bases de la convocatoria de ayudas a bandas de música 2026", formato: "PDF", tamano: "320 KB" }],
    fechaActualizacion: "2026-07-15",
  },
  {
    id: "plan-empleo-social-40-personas",
    titular: "Plan de empleo social: 40 contratos de seis meses para vecinos en paro",
    entradilla: "Los contratos son para limpieza, jardines y apoyo en colegios. La lista se ordena por situación social.",
    cuerpo: [
      "El Ayuntamiento contratará a 40 personas en paro durante seis meses. Los puestos son de limpieza viaria, cuidado de jardines y apoyo en colegios.",
      "Tienen prioridad las familias con menos ingresos, las personas paradas de larga duración y los mayores de 45 años. La selección la hace el Servicio Canario de Empleo con los servicios sociales.",
      "El plazo para apuntarse termina el 12 de septiembre. Hay que estar en paro e inscrito como demandante de empleo.",
    ],
    imagen: null,
    fecha: "2026-07-08",
    categoria: "empleo",
    adjuntos: [{ titulo: "Bases del plan de empleo social 2026", formato: "PDF", tamano: "410 KB" }],
    fechaActualizacion: "2026-07-08",
  },
  {
    id: "cine-verano-rambla-castro",
    titular: "Cine de verano en la Rambla de Castro: cuatro viernes de cine gratis",
    entradilla: "Las sesiones empiezan a las 21:30. Hay que llevar silla o manta.",
    cuerpo: [
      "La Rambla de Castro acoge cuatro sesiones de cine al aire libre los viernes de agosto. La entrada es libre hasta completar el aforo.",
      "La programación incluye dos películas familiares, una comedia española y un clásico de aventuras. Todas son aptas para todos los públicos.",
      "Habrá una guagua gratuita desde Realejo Alto y La Cruz Santa a las 20:45.",
    ],
    fecha: "2026-07-02",
    categoria: "cultura",
    fechaActualizacion: "2026-07-02",
  },
  {
    id: "fiestas-palo-blanco-julio",
    titular: "Palo Blanco celebra sus fiestas de julio con verbena, romería y feria de ganado",
    entradilla: "Las fiestas son del 11 al 16 de julio. El día grande es la procesión del domingo.",
    cuerpo: [
      "Palo Blanco celebra sus fiestas de julio del 11 al 16, con verbena cada noche en la plaza.",
      "El domingo 13 es el día grande: misa, procesión y feria de ganado por la mañana, y concierto de la banda por la tarde.",
      "Durante las fiestas se corta la calle principal de 19:00 a 02:00. Hay aparcamiento habilitado junto al campo de fútbol.",
    ],
    imagen: null,
    fecha: "2026-06-28",
    categoria: "fiestas",
    fechaActualizacion: "2026-06-28",
  },
  {
    id: "presupuestos-2026-aprobados",
    titular: "El pleno aprueba los presupuestos de 2026 con más dinero para limpieza y ayudas sociales",
    entradilla: "Las cuentas crecen en limpieza viaria, ayudas a familias y arreglo de calles.",
    cuerpo: [
      "El pleno del Ayuntamiento aprobó los presupuestos de 2026 con los votos a favor del grupo de gobierno y la abstención de la oposición.",
      "Las partidas que más crecen son limpieza viaria, ayudas sociales y arreglo de calles en Icod el Alto y San Vicente.",
      "El documento completo está publicado en el portal de transparencia, en el bloque de información económica.",
    ],
    fecha: "2026-06-20",
    categoria: "presupuestos",
    adjuntos: [{ titulo: "Resumen del presupuesto 2026 por áreas (documento de muestra)", formato: "PDF", tamano: "1,2 MB" }],
    fechaActualizacion: "2026-06-20",
  },
  {
    id: "acuerdo-plenario-cortes-agua-san-vicente",
    titular: "El pleno acuerda renovar las tuberías de San Vicente para acabar con los cortes de agua",
    entradilla: "Las obras empiezan en septiembre y durarán cuatro meses.",
    cuerpo: [
      "El pleno aprobó por unanimidad renovar las tuberías de agua de San Vicente, origen de los cortes de los últimos meses.",
      "Las obras empezarán en septiembre y durarán unos cuatro meses. Habrá cortes puntuales que se avisarán con 48 horas de antelación.",
      "Mientras duren las obras, habrá una cuba de agua en la plaza para casos urgentes.",
    ],
    imagen: null,
    fecha: "2026-06-12",
    categoria: "plenos",
    fechaActualizacion: "2026-06-12",
  },
  {
    id: "reforma-estadio-principes-vestuarios",
    titular: "Empieza la reforma de los vestuarios del Estadio Los Príncipes",
    entradilla: "Los equipos entrenarán en Toscal-Longuera mientras duren las obras.",
    cuerpo: [
      "Han empezado las obras de los vestuarios del Estadio Los Príncipes. Se renuevan duchas, baños y el acceso para personas con movilidad reducida.",
      "Mientras duren las obras, los equipos entrenarán en el campo de Toscal-Longuera. Los horarios no cambian.",
      "La obra durará unos tres meses y no afecta a los partidos de los fines de semana.",
    ],
    fecha: "2026-06-05",
    categoria: "obras",
    fechaActualizacion: "2026-06-05",
  },
  {
    id: "ayudas-escolares-libros",
    titular: "Abiertas las ayudas para libros y material escolar del curso que viene",
    entradilla: "Son para familias empadronadas con hijos en infantil, primaria y secundaria. Plazo hasta el 15 de septiembre.",
    cuerpo: [
      "Las familias empadronadas en Los Realejos pueden pedir la ayuda para libros y material escolar del próximo curso.",
      "La ayuda es de hasta 120 euros por hijo en primaria y 150 en secundaria, como ejemplo. Se paga por transferencia en octubre.",
      "Se pide en la Sede Electrónica o en persona en Bienestar Social con cita. Hay que llevar el DNI y el certificado de matrícula.",
    ],
    imagen: null,
    fecha: "2026-05-28",
    categoria: "ayudas",
    fechaActualizacion: "2026-05-28",
  },
  {
    id: "programacion-teatro-cine-verano",
    titular: "El Teatro Cine Realejos presenta su programación de verano: teatro, música y cine",
    entradilla: "Diez espectáculos entre julio y septiembre. Las entradas cuestan entre 5 y 12 euros.",
    cuerpo: [
      "El Teatro Cine Realejos, el principal escenario del municipio, presenta diez espectáculos para este verano: cuatro obras de teatro, tres conciertos y tres sesiones de cine.",
      "Actuarán dos compañías canarias y habrá una noche dedicada a las bandas de música del municipio.",
      "Las entradas se venden en la taquilla del teatro y por teléfono. Las personas mayores de 65 años tienen descuento.",
    ],
    fecha: "2026-05-20",
    categoria: "cultura",
    fechaActualizacion: "2026-05-20",
  },
  {
    id: "bolsa-auxiliar-administrativo",
    titular: "Bolsa de trabajo de auxiliar administrativo: lista definitiva y fecha de examen",
    entradilla: "El examen es el 20 de septiembre en el IES Realejos. Hay 180 personas admitidas.",
    cuerpo: [
      "Ya está publicada la lista definitiva de personas admitidas en la bolsa de auxiliar administrativo. Hay 180 admitidos y 12 excluidos, que pueden reclamar hasta el 5 de septiembre.",
      "El examen será el 20 de septiembre a las 10:00 en el IES Realejos. Hay que llevar DNI y bolígrafo negro.",
      "La lista y las bases están en transparencia, en el bloque de empleo público.",
    ],
    imagen: null,
    fecha: "2026-05-12",
    categoria: "empleo",
    adjuntos: [
      { titulo: "Lista definitiva de admitidos (documento de muestra)", formato: "PDF", tamano: "280 KB" },
      { titulo: "Bases de la bolsa de auxiliar administrativo", formato: "PDF", tamano: "350 KB" },
    ],
    fechaActualizacion: "2026-05-12",
  },
  {
    id: "fiestas-carmen-realejo-bajo",
    titular: "Realejo Bajo se prepara para las fiestas del Carmen con la tradicional embarcación",
    entradilla: "La fiesta del mar reúne cada año a miles de personas en la playa de El Socorro.",
    cuerpo: [
      "Realejo Bajo celebra en julio sus fiestas del Carmen, con la tradicional embarcación de la Virgen en la playa de El Socorro.",
      "La programación incluye la romería marinera, conciertos en la plaza y la feria de artesanía.",
      "Habrá guaguas especiales desde todos los barrios hasta El Socorro durante el fin de semana grande.",
    ],
    fecha: "2026-05-05",
    categoria: "fiestas",
    fechaActualizacion: "2026-05-05",
  },
  {
    id: "alumbrado-cruz-santa-led",
    titular: "La Cruz Santa estrena alumbrado nuevo que gasta la mitad de luz",
    entradilla: "Se han cambiado 120 farolas. Las calles están más iluminadas y el Ayuntamiento ahorra en la factura.",
    cuerpo: [
      "La Cruz Santa ya tiene alumbrado nuevo: 120 farolas de bajo consumo que iluminan más y gastan la mitad.",
      "El cambio forma parte del plan para renovar todo el alumbrado del municipio antes de 2028.",
      "Los vecinos pueden avisar de farolas fundidas en el servicio de incidencias en vía pública.",
    ],
    imagen: null,
    fecha: "2026-04-24",
    categoria: "obras",
    fechaActualizacion: "2026-04-24",
  },
];

export function getNoticia(id: string): Noticia | undefined {
  return NOTICIAS.find((n) => n.id === id);
}
