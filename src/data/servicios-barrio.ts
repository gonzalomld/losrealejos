export type AccionServicio = {
  texto: string;
  href: string;
  externo?: boolean;
};

export type ServicioBarrio = {
  id: string;
  nombre: string;
  descripcion: string;
  acciones: AccionServicio[];
  areaId: string;
  telefono: string;
  fechaActualizacion: string;
};

export const SERVICIOS_BARRIO: ServicioBarrio[] = [
  {
    id: "basura-puntos-limpios",
    nombre: "Basura, reciclaje y puntos limpios",
    descripcion: "Horarios de recogida, dónde está cada contenedor y dónde llevar muebles y trastos.",
    acciones: [
      { texto: "Ver horarios y contenedores por barrio", href: "/mi-barrio/basura-puntos-limpios" },
      { texto: "Comunicar un contenedor lleno o roto", href: "/mi-barrio/incidencias-via-publica" },
    ],
    areaId: "contratacion",
    telefono: "922 34 62 34",
    fechaActualizacion: "2026-06-10",
  },
  {
    id: "incidencias-via-publica",
    nombre: "Avisar de un problema en la calle",
    descripcion: "Farolas fundidas, baches, aceras rotas, jardines sin cuidar o suciedad.",
    acciones: [
      { texto: "Comunicar una incidencia en vía pública (sistema externo)", href: "https://sede.losrealejos.es/incidencias", externo: true },
      { texto: "Llamar a la Oficina de Atención Ciudadana", href: "tel:+34922346234" },
    ],
    areaId: "atencion-ciudadana",
    telefono: "922 34 62 34",
    fechaActualizacion: "2026-05-15",
  },
  {
    id: "transporte-taxis",
    nombre: "Guaguas, taxis y cómo moverse",
    descripcion: "Líneas de guagua, paradas de taxi y ayudas para moverse por el municipio.",
    acciones: [
      { texto: "Ver paradas de taxi y líneas de guagua", href: "/mi-barrio/transporte-taxis" },
      { texto: "Pedir el bono de transporte para mayores", href: "/tramites/instancia-generica" },
    ],
    areaId: "seguridad-emergencias",
    telefono: "922 34 62 54",
    fechaActualizacion: "2026-04-20",
  },
  {
    id: "instalaciones-deportivas",
    nombre: "Pistas, campos y pabellón",
    descripcion: "Dónde jugar: Estadio Los Príncipes, pabellón, canchas de barrio y piscina.",
    acciones: [
      { texto: "Reservar una pista o campo de deporte", href: "/tramites/uso-instalaciones-deportivas" },
      { texto: "Apuntarme a la piscina municipal", href: "/tramites/inscripcion-piscina-municipal" },
    ],
    areaId: "deportes",
    telefono: "922 34 62 45",
    fechaActualizacion: "2026-07-10",
  },
  {
    id: "bibliotecas-ludotecas",
    nombre: "Bibliotecas y salas de estudio",
    descripcion: "Bibliotecas de Realejo Alto y Realejo Bajo: préstamo, estudio y cuentacuentos.",
    acciones: [
      { texto: "Ver horarios de las bibliotecas", href: "/mi-barrio/bibliotecas-ludotecas" },
      { texto: "Consultar la agenda cultural", href: "/agenda" },
    ],
    areaId: "cultura-educacion",
    telefono: "922 34 62 44",
    fechaActualizacion: "2026-05-01",
  },
  {
    id: "actividades-mayores",
    nombre: "Actividades para personas mayores",
    descripcion: "Talleres, gimnasia, excursiones y centros de mayores en cada barrio.",
    acciones: [
      { texto: "Ver actividades para mayores de este mes", href: "/agenda" },
      { texto: "Pedir ayuda a domicilio o teleasistencia", href: "/tramites/instancia-generica" },
    ],
    areaId: "bienestar-social",
    telefono: "922 34 62 42",
    fechaActualizacion: "2026-06-01",
  },
  {
    id: "juventud",
    nombre: "Juventud: ocio, cursos y ayudas",
    descripcion: "Casa de la Juventud, cursos gratis, ocio de fin de semana y ayudas para jóvenes.",
    acciones: [
      { texto: "Ver actividades de la Casa de la Juventud", href: "/agenda" },
      { texto: "Consultar las ayudas para jóvenes", href: "/ayudas" },
    ],
    areaId: "juventud",
    telefono: "922 34 62 49",
    fechaActualizacion: "2026-06-15",
  },
  {
    id: "mascotas-censo-canino",
    nombre: "Mascotas y censo de perros",
    descripcion: "Cómo registrar a tu perro, normas en parques y playas, y adopción.",
    acciones: [
      { texto: "Registrar a mi perro en el censo canino", href: "/tramites/instancia-generica" },
      { texto: "Ver normas de animales en la calle", href: "/mi-barrio/mascotas-censo-canino" },
    ],
    areaId: "seguridad-emergencias",
    telefono: "922 34 62 54",
    fechaActualizacion: "2026-03-20",
  },
  {
    id: "medio-ambiente-zonas-verdes",
    nombre: "Parques, jardines y medio ambiente",
    descripcion: "Rambla de Castro, parques de barrio, rutas y cuidado de la naturaleza.",
    acciones: [
      { texto: "Ver rutas y zonas verdes", href: "/mi-barrio/medio-ambiente-zonas-verdes" },
      { texto: "Comunicar un jardín sin cuidar", href: "/mi-barrio/incidencias-via-publica" },
    ],
    areaId: "agricultura",
    telefono: "922 34 62 41",
    fechaActualizacion: "2026-04-10",
  },
  {
    id: "agua-alcantarillado",
    nombre: "Agua y alcantarillado",
    descripcion: "Cortes de agua avisados, qué hacer si no tienes agua y atascos en la calle.",
    acciones: [
      { texto: "Ver cortes de agua avisados", href: "/noticias/acuerdo-plenario-cortes-agua-san-vicente" },
      { texto: "Avisar de una avería de agua en la calle", href: "/mi-barrio/incidencias-via-publica" },
    ],
    areaId: "empresas-publicas",
    telefono: "922 34 62 46",
    fechaActualizacion: "2026-06-12",
  },
  {
    id: "seguridad-emergencias",
    nombre: "Policía Local y emergencias",
    descripcion: "Cuándo llamar a la Policía Local y qué hacer ante alertas del tiempo.",
    acciones: [
      { texto: "Ver teléfonos de emergencia", href: "/mi-barrio/seguridad-emergencias" },
      { texto: "Pedir cita en la Oficina de Atención Ciudadana", href: "https://sede.losrealejos.es/cita-previa", externo: true },
    ],
    areaId: "seguridad-emergencias",
    telefono: "922 34 62 54",
    fechaActualizacion: "2026-05-20",
  },
  {
    id: "educacion-colegios",
    nombre: "Colegios y matriculación",
    descripcion: "Colegios del municipio, cómo matricular y ayudas para libros y comedor.",
    acciones: [
      { texto: "Empadronar a mi hijo (necesario para el colegio)", href: "/tramites/alta-en-el-padron" },
      { texto: "Pedir la ayuda para libros y material", href: "/ayudas" },
    ],
    areaId: "cultura-educacion",
    telefono: "922 34 62 44",
    fechaActualizacion: "2026-05-28",
  },
];

export function getServicioBarrio(id: string): ServicioBarrio | undefined {
  return SERVICIOS_BARRIO.find((s) => s.id === id);
}
