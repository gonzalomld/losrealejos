export type Aviso = {
  id: string;
  titulo: string;
  tipo: "empleo" | "ayuda" | "corte-agua" | "meteorologia" | "otro";
  descripcion: string;
  finPlazoISO: string | null;
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
    titulo: "Plan de empleo social: 40 contratos, apúntate antes del 12 de septiembre",
    tipo: "empleo",
    descripcion: "Contratos de seis meses para limpieza, jardines y colegios.",
    finPlazoISO: "2026-09-12",
    enlace: "/empleo-publico",
    enlaceTexto: "Ver la convocatoria del plan de empleo social",
  },
  {
    id: "ayuda-libros",
    titulo: "Ayudas para libros y material escolar: plazo hasta el 15 de septiembre",
    tipo: "ayuda",
    descripcion: "Hasta 150 euros por hijo para familias empadronadas.",
    finPlazoISO: "2026-09-15",
    enlace: "/ayudas",
    enlaceTexto: "Ver las ayudas para libros y material escolar",
  },
  {
    id: "corte-agua-realejo-alto",
    titulo: "Corte de agua en Realejo Alto el 10 de septiembre, de 9:00 a 13:00",
    tipo: "corte-agua",
    descripcion: "Afecta a la calle El Medio y alrededores por una reparación.",
    finPlazoISO: "2026-09-10",
    enlace: "/noticias/acuerdo-plenario-cortes-agua-san-vicente",
    enlaceTexto: "Leer la noticia sobre las obras de agua en San Vicente",
  },
  {
    id: "alerta-viento",
    titulo: "Alerta amarilla por viento el fin de semana: precaución en El Socorro",
    tipo: "meteorologia",
    descripcion: "Se recomienda no bañarse si hay bandera roja y asegurar macetas y toldos.",
    finPlazoISO: null,
    enlace: "/mi-barrio/seguridad-emergencias",
    enlaceTexto: "Ver qué hacer ante avisos del tiempo",
  },
];
