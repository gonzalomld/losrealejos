export type MedioIlustracion = {
  src: string;
  alt: string;
  proporcion: string;
  fotoFutura: string;
};

/**
 * Único punto de rutas de imagen del rediseño.
 * Hoy apuntan a ilustraciones SVG propias (misma proporción que la foto
 * definitiva). Para sustituir por fotografía: cambiar solo `src` y `alt`.
 */
export const HERO: MedioIlustracion = {
  src: "/fotos/hero-panoramica.jpg",
  alt: "Plaza empedrada con templete de teja ante una iglesia blanca de tejados rojos con torre-campanario con reloj, balaustrada de piedra con macetones de flores, bancos y un pino canario, bajo un cielo azul",
  proporcion: "10:7 (se muestra recortada a panorámica con object-cover)",
  fotoFutura: "Integrada: fotografía real de la plaza e iglesia de Realejo Bajo",
};

export const BANDA_PIE: MedioIlustracion = {
  src: "/fotos/banda-pie.png",
  alt: "Vista panorámica del municipio de Los Realejos",
  proporcion: "21:6 (se muestra recortada con object-cover)",
  fotoFutura: "Integrada: fotografía panorámica facilitada por el Ayuntamiento",
};

export const FRANJAS: Record<
  "tramites" | "barrio" | "ayuntamiento" | "transparencia" | "actualidad",
  MedioIlustracion
> = {
  tramites: {
    src: "/ilustraciones/franja-tramites.svg",
    alt: "Ilustración del casco urbano de Los Realejos: calle con casas de teja y un campanario",
    proporcion: "21:4",
    fotoFutura: "Calle del casco urbano, franja 21:4",
  },
  barrio: {
    src: "/ilustraciones/franja-barrio.svg",
    alt: "Ilustración de una calle de barrio con casas bajas, palmeras y una plaza",
    proporcion: "21:4",
    fotoFutura: "Calle de barrio con vida cotidiana, franja 21:4",
  },
  ayuntamiento: {
    src: "/ilustraciones/franja-ayuntamiento.svg",
    alt: "Ilustración de un edificio institucional canario con balcón y bandera",
    proporcion: "21:4",
    fotoFutura: "Fachada de la casa consistorial, franja 21:4",
  },
  transparencia: {
    src: "/ilustraciones/franja-transparencia.svg",
    alt: "Ilustración geométrica sobria en tonos de la paleta institucional",
    proporcion: "21:4",
    fotoFutura: "Motivo sobrio o fachada neutra, franja 21:4",
  },
  actualidad: {
    src: "/ilustraciones/franja-actualidad.svg",
    alt: "Ilustración de una plaza con vecinos conversando y un quiosco de música",
    proporcion: "21:4",
    fotoFutura: "Plaza con gente en un acto municipal, franja 21:4",
  },
};
