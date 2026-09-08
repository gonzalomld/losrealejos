export type DestinatarioAyuda = "particulares" | "familias" | "empresas" | "asociaciones";

export const ETIQUETAS_DESTINATARIO: Record<DestinatarioAyuda, string> = {
  particulares: "Particulares",
  familias: "Familias",
  empresas: "Empresas",
  asociaciones: "Asociaciones",
};

export type Ayuda = {
  id: string;
  titulo: string;
  tituloOficial: string;
  destinatario: DestinatarioAyuda;
  estado: "abierta" | "cerrada";
  finPlazoISO: string | null;
  descripcion: string;
  resumen: { queEs: string; queNecesito: string; dondeSeHace: string };
  requisitos: string[];
  documentacion: string[];
  comoSeHace: { paso: number; texto: string }[];
  cuantia: string;
  plazoResolucion: string;
  bases: { titulo: string; href: string };
  areaId: string;
  fechaActualizacion: string;
  relacionadas: string[];
};

export const AYUDAS: Ayuda[] = [
  {
    id: "libros-material-escolar",
    titulo: "Ayudas para libros y material escolar",
    tituloOficial: "Ayudas al estudio para libros y material escolar, curso 2026-2027",
    destinatario: "familias",
    estado: "abierta",
    finPlazoISO: "2026-09-15",
    descripcion:
      "Dinero para comprar los libros y el material del curso que viene, para familias empadronadas con hijos en infantil, primaria y secundaria.",
    resumen: {
      queEs: "Es dinero para comprar libros y material del colegio.",
      queNecesito: "Necesitas estar empadronado y el papel de la matrícula de tu hijo.",
      dondeSeHace: "Se pide por internet en la Sede Electrónica o en persona en Bienestar Social.",
    },
    requisitos: [
      "Estar empadronado en Los Realejos toda la familia.",
      "Tener hijos matriculados en infantil, primaria o secundaria.",
      "No superar el nivel de ingresos que dicen las bases.",
    ],
    documentacion: [
      "DNI del padre, madre o tutor.",
      "Certificado de matrícula del centro.",
      "Número de cuenta para recibir el pago.",
      "Libro de familia numerosa, si la tienes.",
    ],
    comoSeHace: [
      { paso: 1, texto: "Reúne el DNI, la matrícula y tu número de cuenta." },
      { paso: 2, texto: "Presenta la solicitud en la Sede Electrónica o en Bienestar Social con cita." },
      { paso: 3, texto: "El Ayuntamiento revisa las solicitudes y publica la lista." },
      { paso: 4, texto: "El dinero llega por transferencia en octubre." },
    ],
    cuantia: "Como ejemplo: hasta 120 euros por hijo en primaria y 150 en secundaria.",
    plazoResolucion: "La lista sale en unas 6 semanas desde que termina el plazo.",
    bases: {
      titulo: "Bases de las ayudas para libros y material escolar 2026 (tablón de anuncios)",
      href: "/tablon-de-anuncios",
    },
    areaId: "bienestar-social",
    fechaActualizacion: "2026-05-28",
    relacionadas: ["bandas-musica", "mayores-solas"],
  },
  {
    id: "bandas-musica",
    titulo: "Ayudas a las bandas de música",
    tituloOficial: "Subvenciones a bandas de música del municipio 2026",
    destinatario: "asociaciones",
    estado: "abierta",
    finPlazoISO: "2026-09-30",
    descripcion:
      "Dinero para las bandas de Realejo Alto y Realejo Bajo: instrumentos, trajes y clases.",
    resumen: {
      queEs: "Es dinero para las bandas de música del municipio.",
      queNecesito: "Necesitas ser directivo de una banda y presentar su proyecto del año.",
      dondeSeHace: "Se pide por internet en la Sede Electrónica.",
    },
    requisitos: [
      "Ser una banda de música con sede en Los Realejos.",
      "Estar inscrita en el registro municipal de asociaciones.",
      "Presentar el proyecto de actividades del año.",
    ],
    documentacion: [
      "CIF de la banda y DNI de quien firma.",
      "Proyecto de actividades y presupuesto.",
      "Certificado de estar al día con Hacienda y la Seguridad Social.",
    ],
    comoSeHace: [
      { paso: 1, texto: "Prepara el proyecto del año y su presupuesto." },
      { paso: 2, texto: "Presenta la solicitud en la Sede Electrónica antes del 30 de septiembre." },
      { paso: 3, texto: "Justifica el gasto con facturas antes de que termine el año." },
    ],
    cuantia: "Como ejemplo: presupuesto total de 45.000 euros, hasta 22.500 por banda según alumnos y actuaciones.",
    plazoResolucion: "La resolución sale en unos 2 meses desde que termina el plazo.",
    bases: {
      titulo: "Bases de las ayudas a bandas de música 2026 (documento de muestra)",
      href: "/transparencia/contratacion#subvencion-bandas-bases",
    },
    areaId: "cultura-educacion",
    fechaActualizacion: "2026-07-15",
    relacionadas: ["libros-material-escolar", "deportistas"],
  },
  {
    id: "abrir-negocio",
    titulo: "Ayudas para abrir un negocio",
    tituloOficial: "Ayudas a emprendedores para nuevos negocios 2026",
    destinatario: "empresas",
    estado: "abierta",
    finPlazoISO: "2026-10-31",
    descripcion: "Dinero para quien abre un negocio nuevo en el municipio: alquiler, obras y equipamiento.",
    resumen: {
      queEs: "Es dinero para ayudarte a abrir tu negocio.",
      queNecesito: "Necesitas tu plan de negocio y las facturas de lo que gastes.",
      dondeSeHace: "Se pide por internet en la Sede Electrónica o en la Agencia de Desarrollo Local.",
    },
    requisitos: [
      "Abrir un negocio nuevo en Los Realejos este año.",
      "Estar dado de alta como autónomo o empresa.",
      "Mantener el negocio abierto al menos un año.",
    ],
    documentacion: [
      "DNI o CIF.",
      "Plan de negocio simple: qué vas a vender y dónde.",
      "Facturas del alquiler, las obras o el equipamiento.",
      "Alta en Hacienda y en la Seguridad Social.",
    ],
    comoSeHace: [
      { paso: 1, texto: "Pide cita en la Agencia de Desarrollo Local: te ayudan gratis con el plan." },
      { paso: 2, texto: "Abre tu negocio y guarda todas las facturas." },
      { paso: 3, texto: "Presenta la solicitud con las facturas antes del 31 de octubre." },
    ],
    cuantia: "Como ejemplo: hasta 2.000 euros por negocio.",
    plazoResolucion: "La resolución sale en unos 3 meses desde que termina el plazo.",
    bases: {
      titulo: "Bases de las ayudas a emprendedores 2026 (tablón de anuncios)",
      href: "/tablon-de-anuncios",
    },
    areaId: "agencia-desarrollo-local",
    fechaActualizacion: "2026-06-01",
    relacionadas: ["bandas-musica", "libros-material-escolar"],
  },
  {
    id: "mayores-solas",
    titulo: "Ayudas para personas mayores que viven solas",
    tituloOficial: "Ayudas de apoyo a personas mayores en su domicilio 2026",
    destinatario: "particulares",
    estado: "abierta",
    finPlazoISO: "2026-12-31",
    descripcion: "Apoyo para teleasistencia y pequeñas reformas en casa, para mayores que viven solos.",
    resumen: {
      queEs: "Es ayuda para que las personas mayores vivan seguras en su casa.",
      queNecesito: "Necesitas tu DNI y vivir solo o con otra persona mayor.",
      dondeSeHace: "Se pide en Bienestar Social, en persona y con ayuda.",
    },
    requisitos: [
      "Tener 65 años o más y vivir en Los Realejos.",
      "Vivir solo o con otra persona mayor.",
      "Informe de los servicios sociales.",
    ],
    documentacion: [
      "DNI.",
      "Certificado de empadronamiento (lo comprobamos nosotros).",
      "Informe médico si pides una reforma por salud.",
    ],
    comoSeHace: [
      { paso: 1, texto: "Pide cita en Bienestar Social: te atiende una trabajadora social." },
      { paso: 2, texto: "Cuenta lo que necesitas: teleasistencia, barras en el baño, plato de ducha." },
      { paso: 3, texto: "Los servicios sociales hacen el informe y aprueban la ayuda." },
    ],
    cuantia: "Como ejemplo: teleasistencia gratis y hasta 600 euros para pequeñas reformas.",
    plazoResolucion: "Se resuelve en un mes desde el informe social.",
    bases: {
      titulo: "Bases de las ayudas a personas mayores 2026 (tablón de anuncios)",
      href: "/tablon-de-anuncios",
    },
    areaId: "bienestar-social",
    fechaActualizacion: "2026-04-15",
    relacionadas: ["libros-material-escolar", "deportistas"],
  },
  {
    id: "deportistas",
    titulo: "Ayudas a deportistas del municipio",
    tituloOficial: "Ayudas a deportistas federados de Los Realejos 2026",
    destinatario: "particulares",
    estado: "cerrada",
    finPlazoISO: "2026-05-30",
    descripcion: "Convocatoria cerrada en mayo para deportistas federados. Se publicará la de 2027.",
    resumen: {
      queEs: "Era dinero para deportistas del municipio que compiten fuera.",
      queNecesito: "Pedía licencia federativa y resultados del año.",
      dondeSeHace: "Se pedía en Deportes. Ahora está cerrada.",
    },
    requisitos: [
      "Estar empadronado y federado en un club.",
      "Haber competido a nivel regional o nacional.",
    ],
    documentacion: [
      "DNI y licencia federativa.",
      "Calendario de competiciones y resultados.",
      "Facturas de viajes y material.",
    ],
    comoSeHace: [
      { paso: 1, texto: "Esta convocatoria ya está cerrada." },
      { paso: 2, texto: "La de 2027 se publicará en esta misma página." },
    ],
    cuantia: "Como ejemplo: hasta 800 euros por deportista.",
    plazoResolucion: "Resuelta en julio de 2026.",
    bases: {
      titulo: "Bases de las ayudas a deportistas 2026 (documento de muestra)",
      href: "/transparencia/contratacion",
    },
    areaId: "deportes",
    fechaActualizacion: "2026-05-30",
    relacionadas: ["bandas-musica", "abrir-negocio"],
  },
];

export function getAyuda(id: string): Ayuda | undefined {
  return AYUDAS.find((a) => a.id === id);
}
