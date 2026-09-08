export type Aviso = {
  id: string;
  titulo: string;
  tipo: "empleo" | "ayuda" | "corte-agua" | "meteorologia" | "otro";
  descripcion: string;
  /** Solo para avisos con plazo de solicitud. Los avisos puntuales usan fechaHecho. */
  finPlazoISO: string | null;
  /** Solo para avisos puntuales: fecha del corte, alerta o hecho. */
  fechaHechoISO: string | null;
  enlace: string;
  enlaceTexto: string;
};

export const ETIQUETAS_TIPO_AVISO: Record<Aviso["tipo"], string> = {
  empleo: "Empleo público",
  ayuda: "Ayuda con plazo",
  "corte-agua": "Corte de agua",
  meteorologia: "Aviso del tiempo",
  otro: "Aviso",
};

export const AVISOS: Aviso[] = [
  {
    id: "plan-empleo-social",
    titulo: "Plan de empleo social: 40 contratos",
    tipo: "empleo",
    descripcion: "Contratos de seis meses para limpieza, jardines y colegios. Apúntate antes de que termine el plazo.",
    finPlazoISO: "2026-09-12",
    fechaHechoISO: null,
    enlace: "/empleo-publico",
    enlaceTexto: "Ver la convocatoria del plan de empleo social",
  },
  {
    id: "ayuda-libros",
    titulo: "Ayudas para libros y material escolar",
    tipo: "ayuda",
    descripcion: "Hasta 150 euros por hijo para familias empadronadas. Pídelas antes de que termine el plazo.",
    finPlazoISO: "2026-09-15",
    fechaHechoISO: null,
    enlace: "/ayudas",
    enlaceTexto: "Ver las ayudas para libros y material escolar",
  },
  {
    id: "corte-agua-realejo-alto",
    titulo: "Corte de agua en Realejo Alto por una reparación",
    tipo: "corte-agua",
    descripcion: "Afecta a la calle El Medio y alrededores, de 9:00 a 13:00. Ten agua guardada esa mañana.",
    finPlazoISO: null,
    fechaHechoISO: "2026-09-10",
    enlace: "/noticias/acuerdo-plenario-cortes-agua-san-vicente",
    enlaceTexto: "Leer la noticia sobre las obras de agua en San Vicente",
  },
  {
    id: "alerta-viento",
    titulo: "Alerta amarilla por viento el fin de semana",
    tipo: "meteorologia",
    descripcion: "Precaución en El Socorro: no te bañes si hay bandera roja y asegura macetas y toldos.",
    finPlazoISO: null,
    fechaHechoISO: "2026-09-06",
    enlace: "/mi-barrio/seguridad-emergencias",
    enlaceTexto: "Ver qué hacer ante avisos del tiempo",
  },
];
