export type Evento = {
  id: string;
  titulo: string;
  descripcion: string;
  fechaHoraISO: string;
  lugar: string;
  categoria: string;
  imagen?: { src: string; alt: string } | null;
  inscripcionUrl?: string | null;
  fechaActualizacion: string;
};

export const CATEGORIAS_EVENTO = ["teatro", "musica", "cine", "fiestas", "deporte", "infantil", "mercado"] as const;

export const ETIQUETAS_CATEGORIA_EVENTO: Record<string, string> = {
  teatro: "Teatro",
  musica: "Música",
  cine: "Cine",
  fiestas: "Fiestas",
  deporte: "Deporte",
  infantil: "Infantil",
  mercado: "Mercado",
};

export const LUGARES_EVENTO = [
  "Teatro Cine Realejos",
  "Estadio Los Príncipes",
  "Playa de El Socorro",
  "Rambla de Castro",
  "Plaza de Realejo Alto",
  "Casa de la Juventud",
] as const;

export const EVENTOS: Evento[] = [
  {
    id: "obra-teatro-pancho-manue",
    titulo: "Obra de teatro: «Pancho y Manue», comedia canaria",
    descripcion: "Una compañía canaria trae su comedia sobre dos hermanos que heredan una platanera. Para todos los públicos. Entrada 8 euros, mayores 5 euros.",
    fechaHoraISO: "2026-09-12T20:30:00",
    lugar: "Teatro Cine Realejos",
    categoria: "teatro",
    imagen: null,
    fechaActualizacion: "2026-07-01",
  },
  {
    id: "concierto-bandas-realejos",
    titulo: "Concierto conjunto de las bandas de Realejo Alto y Realejo Bajo",
    descripcion: "Las dos bandas del municipio tocan juntas por primera vez en el Teatro. Entrada libre hasta completar aforo.",
    fechaHoraISO: "2026-09-19T19:00:00",
    lugar: "Teatro Cine Realejos",
    categoria: "musica",
    fechaActualizacion: "2026-07-01",
  },
  {
    id: "cine-familiar-septiembre",
    titulo: "Cine familiar: película de animación en el Teatro",
    descripcion: "Sesión de cine para niños y familias. Entrada 5 euros, menores de 3 años gratis.",
    fechaHoraISO: "2026-09-26T17:30:00",
    lugar: "Teatro Cine Realejos",
    categoria: "cine",
    inscripcionUrl: null,
    fechaActualizacion: "2026-07-01",
  },
  {
    id: "romeria-san-vicente",
    titulo: "Romería de San Vicente",
    descripcion: "Romería tradicional con carretas, parrandas y comida típica. Salida desde la iglesia a las 12:00. Recorrido accesible.",
    fechaHoraISO: "2026-09-06T12:00:00",
    lugar: "Plaza de Realejo Alto",
    categoria: "fiestas",
    imagen: null,
    fechaActualizacion: "2026-06-15",
  },
  {
    id: "carrera-nocturna-realejos",
    titulo: "Carrera nocturna de Los Realejos (5 y 10 km)",
    descripcion: "Carrera por Realejo Bajo con salida en el Estadio Los Príncipes. Inscripción 10 euros. Dorsales limitados a 500.",
    fechaHoraISO: "2026-10-03T21:00:00",
    lugar: "Estadio Los Príncipes",
    categoria: "deporte",
    inscripcionUrl: "https://sede.losrealejos.es/deportes/carrera-nocturna",
    fechaActualizacion: "2026-06-20",
  },
  {
    id: "taller-juegos-juventud",
    titulo: "Tarde de juegos de mesa en la Casa de la Juventud",
    descripcion: "Juegos de mesa, videojuegos y merienda para jóvenes de 12 a 30 años. Gratis, sin inscripción.",
    fechaHoraISO: "2026-09-18T17:00:00",
    lugar: "Casa de la Juventud",
    categoria: "infantil",
    fechaActualizacion: "2026-07-05",
  },
  {
    id: "mercado-agricola-domingo",
    titulo: "Mercado del agricultor: edición especial de septiembre",
    descripcion: "Papas, vino, queso y miel de Los Realejos. Directo del campo a tu mesa, cada domingo por la mañana.",
    fechaHoraISO: "2026-09-13T09:00:00",
    lugar: "Plaza de Realejo Alto",
    categoria: "mercado",
    fechaActualizacion: "2026-07-05",
  },
  {
    id: "concierto-verano-socorro",
    titulo: "Concierto de verano en la playa de El Socorro",
    descripcion: "Concierto al atardecer con grupos locales. Ya celebrado: asistieron unas 800 personas.",
    fechaHoraISO: "2026-08-15T19:30:00",
    lugar: "Playa de El Socorro",
    categoria: "musica",
    imagen: null,
    fechaActualizacion: "2026-06-01",
  },
  {
    id: "ruta-rambla-castro-guiada",
    titulo: "Ruta guiada por la Rambla de Castro",
    descripcion: "Paseo guiado por el palmeral y los acantilados. Ya celebrado en agosto. Próxima edición en octubre.",
    fechaHoraISO: "2026-08-22T10:00:00",
    lugar: "Rambla de Castro",
    categoria: "deporte",
    fechaActualizacion: "2026-06-01",
  },
];

export function getEvento(id: string): Evento | undefined {
  return EVENTOS.find((e) => e.id === id);
}
