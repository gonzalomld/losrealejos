/**
 * Contenido del mega menú. Referencia destinos reales ya existentes;
 * no duplica contenido, solo agrupa enlaces con una línea descriptiva.
 * Icono: nombre del icono Lucide que aporta (se resuelve en MegaMenu).
 */
export type DestacadoNav = {
  href: string;
  titulo: string;
  descripcion: string;
  externo?: boolean;
  icono: string;
};

export type SeccionNav = {
  href: string;
  texto: string;
  verTodo: string;
  destacados: DestacadoNav[];
};

export const NAV_MEGAMENU: SeccionNav[] = [
  {
    href: "/tramites",
    texto: "Trámites y servicios",
    verTodo: "Ver todos los trámites y servicios",
    destacados: [
      { href: "/tramites/alta-en-el-padron", titulo: "Empadronarme", descripcion: "Apuntarte en la lista de vecinos del municipio." , icono: "HousePlus" },
      { href: "/tramites/certificado-de-empadronamiento", titulo: "Pedir un certificado", descripcion: "Papel oficial que dice dónde vives." , icono: "FileText" },
      { href: "/tramites/pago-ibi-tasas", titulo: "Pagar el IBI o una tasa", descripcion: "El impuesto de tu casa, con tarjeta." , icono: "BadgeEuro" },
      { href: "/tramites/certificado-de-viaje-descuento-residente", titulo: "Certificado de viaje", descripcion: "Descuento de residente en avión y barco." , icono: "Plane" },
      { href: "/tramites/licencia-obra-menor", titulo: "Hacer una obra pequeña en casa", descripcion: "Permiso para arreglos de baño, cocina o ventanas." , icono: "Hammer" },
      { href: "/tramites/inscripcion-piscina-municipal", titulo: "Apuntarme a la piscina", descripcion: "Nado libre, cursos y clases." , icono: "Waves" },
      { href: "/ayudas", titulo: "Ayudas y subvenciones", descripcion: "Dinero para vecinos, familias y empresas." , icono: "HandCoins" },
      { href: "/empleo-publico", titulo: "Empleo público", descripcion: "Trabajar en el Ayuntamiento." , icono: "Briefcase" },
    ],
  },
  {
    href: "/mi-barrio",
    texto: "Mi barrio y mi día a día",
    verTodo: "Ver todos los servicios del día a día",
    destacados: [
      { href: "/mi-barrio/basura-puntos-limpios", titulo: "Basura y puntos limpios", descripcion: "Horarios, contenedores y trastos." , icono: "Trash2" },
      { href: "/mi-barrio/incidencias-via-publica", titulo: "Avisar de un problema en la calle", descripcion: "Farolas, baches, suciedad." , icono: "TriangleAlert" },
      { href: "/mi-barrio/transporte-taxis", titulo: "Guaguas y taxis", descripcion: "Cómo moverse por el municipio." , icono: "Bus" },
      { href: "/mi-barrio/instalaciones-deportivas", titulo: "Pistas y pabellón", descripcion: "Dónde jugar y entrenar." , icono: "Trophy" },
      { href: "/mi-barrio/bibliotecas-ludotecas", titulo: "Bibliotecas", descripcion: "Préstamo, estudio y cuentacuentos." , icono: "BookOpen" },
      { href: "/mi-barrio/actividades-mayores", titulo: "Actividades para mayores", descripcion: "Talleres, gimnasia y excursiones." , icono: "HeartHandshake" },
      { href: "/mi-barrio/juventud", titulo: "Juventud", descripcion: "Ocio, cursos y Casa de la Juventud." , icono: "Users" },
      { href: "/mi-barrio/agua-alcantarillado", titulo: "Agua y alcantarillado", descripcion: "Cortes avisados y averías." , icono: "Droplets" },
    ],
  },
  {
    href: "/ayuntamiento",
    texto: "Ayuntamiento",
    verTodo: "Ver quién es quién en el Ayuntamiento",
    destacados: [
      { href: "/areas-municipales", titulo: "Áreas municipales", descripcion: "Las 19 áreas con teléfono y correo." , icono: "Landmark" },
      { href: "/empleo-publico", titulo: "Empleo público", descripcion: "Convocatorias y bolsas de trabajo." , icono: "Briefcase" },
      { href: "/ordenanzas", titulo: "Ordenanzas", descripcion: "Las normas que aprueba el Ayuntamiento." , icono: "Scale" },
      { href: "https://contrataciondelestado.es", titulo: "Perfil del contratante", descripcion: "Licitaciones abiertas.", externo: true, icono: "FileCheck" },
      { href: "/transparencia/institucional", titulo: "Plenos y corporación", descripcion: "Quién gobierna y qué acuerda." , icono: "Users" },
      { href: "/contacto", titulo: "Contacto y atención ciudadana", descripcion: "OAC: dirección, horario y cita." , icono: "Phone" },
    ],
  },
  {
    href: "/transparencia",
    texto: "Transparencia",
    verTodo: "Ver el portal de transparencia",
    destacados: [
      { href: "/transparencia/institucional", titulo: "Institucional y organizativa", descripcion: "Funciones, gobierno y normas." , icono: "Users" },
      { href: "/transparencia/empleo-personal", titulo: "Empleo público y personal", descripcion: "Convocatorias, puestos y sueldos." , icono: "Briefcase" },
      { href: "/transparencia/economica", titulo: "Económico-financiera", descripcion: "Presupuestos, cuentas y deuda." , icono: "ChartColumn" },
      { href: "/transparencia/contratacion", titulo: "Contratación y subvenciones", descripcion: "Compras, contratos y ayudas." , icono: "FileCheck" },
      { href: "/transparencia/servicios-urbanismo", titulo: "Servicios y urbanismo", descripcion: "Servicios, obras y planes." , icono: "Building2" },
      { href: "/transparencia/datos-planificacion", titulo: "Datos y planificación", descripcion: "Planes, memorias y datos abiertos." , icono: "Database" },
      { href: "/tablon-de-anuncios", titulo: "Tablón de anuncios", descripcion: "Bases, listas y anuncios." , icono: "Megaphone" },
    ],
  },
  {
    href: "/noticias",
    texto: "Actualidad",
    verTodo: "Ver todas las noticias",
    destacados: [
      { href: "/noticias", titulo: "Noticias", descripcion: "Obras, ayudas, empleo y cultura." , icono: "Newspaper" },
      { href: "/agenda", titulo: "Agenda de eventos", descripcion: "Teatro, música, fiestas y deporte." , icono: "CalendarDays" },
      { href: "/campanas/fiestas-de-mayo-2026", titulo: "Fiestas de Mayo 2026", descripcion: "El ciclo festivo principal." , icono: "PartyPopper" },
      { href: "/ayudas", titulo: "Ayudas con plazo", descripcion: "Lo que caduca, míralo primero." , icono: "HandCoins" },
    ],
  },
];
