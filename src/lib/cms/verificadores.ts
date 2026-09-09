/**
 * Reglas puras del verificador de accesibilidad y legibilidad.
 * Severidades: solo son BLOQUEO las reglas comprobables sin ambigüedad
 * (alt, jerarquía de encabezados, texto de enlace, th en tablas).
 * Contraste aproximado, legibilidad y jerga evitable son AVISO.
 * Nunca se impide publicar por una comprobación que puede equivocarse.
 */
import type { SeveridadHallazgo } from "./tipos-editoriales";

export type ReglaResultado = { regla: string; mensaje: string; severidad: SeveridadHallazgo };

const ENLACES_VACIOS = ["más información", "mas informacion", "leer más", "leer mas", "pinche aquí", "pinche aqui", "pulse aquí", "haz clic aquí", "haz clic aqui", "clic aquí", "click aquí", "ver más", "ver mas", "aquí", "aqui"];

/** Jerga evitable (nunca términos jurídicos con significado preciso). */
const JERGA_EVITABLE: [string, string][] = [
  ["al objeto de", "para"],
  ["a los efectos oportunos", "para este trámite"],
  ["el interesado deberá proceder a", "tienes que"],
  ["con carácter previo", "antes"],
  ["poner en conocimiento", "avisar / contar"],
  ["obrar en poder", "tener"],
];

export function verificarEnlace(texto: string): ReglaResultado | null {
  const t = texto.trim().toLowerCase();
  if (ENLACES_VACIOS.includes(t)) {
    return { regla: "enlace-descriptivo", mensaje: `El enlace «${texto}» no describe su destino. Escribe a dónde lleva, p. ej. «Ver las bases en PDF».`, severidad: "bloqueo" };
  }
  return null;
}

export function verificarJerarquia(niveles: number[]): ReglaResultado[] {
  const out: ReglaResultado[] = [];
  for (let i = 1; i < niveles.length; i++) {
    if (niveles[i] - niveles[i - 1] > 1) {
      out.push({ regla: "jerarquia-encabezados", mensaje: `Salto de encabezado de h${niveles[i - 1]} a h${niveles[i]}: no saltes niveles.`, severidad: "bloqueo" });
      break;
    }
  }
  return out;
}

export function verificarImagen(alt: string | null | undefined, decorativa: boolean): ReglaResultado | null {
  if (!decorativa && (!alt || !alt.trim())) {
    return { regla: "img-alt", mensaje: "Toda imagen informativa necesita texto alternativo descriptivo.", severidad: "bloqueo" };
  }
  return null;
}

export function verificarTabla(tieneTh: boolean): ReglaResultado | null {
  if (!tieneTh) return { regla: "tabla-th", mensaje: "Las tablas necesitan encabezados definidos (celdas de encabezado).", severidad: "bloqueo" };
  return null;
}

export function verificarLegibilidad(texto: string): ReglaResultado[] {
  const out: ReglaResultado[] = [];
  const frases = texto.split(/[.!?]+/).map((f) => f.trim()).filter(Boolean);
  for (const f of frases) {
    const palabras = f.split(/\s+/).length;
    if (palabras > 25) {
      out.push({ regla: "frase-larga", mensaje: `Frase de ${palabras} palabras: parte las frases largas para lectura fácil (máx. ~25).`, severidad: "aviso" });
      break;
    }
  }
  const lower = texto.toLowerCase();
  for (const [jerga, sugerencia] of JERGA_EVITABLE) {
    if (lower.includes(jerga)) {
      out.push({ regla: "jerga", mensaje: `«${jerga}» es jerga administrativa evitable. Sugerencia en lenguaje claro: «${sugerencia}».`, severidad: "aviso" });
    }
  }
  // Siglas sin expandir: MAYÚSCULAS de 2+ letras sin su forma desarrollada cerca.
  const siglas = texto.match(/\b[A-ZÁÉÍÓÚÑ]{2,}\b/g) ?? [];
  for (const s of siglas) {
    if (!["DNI", "NIE", "OAC", "IBI"].includes(s)) {
      out.push({ regla: "sigla", mensaje: `La sigla «${s}» debe aparecer expandida la primera vez (p. ej. «${s} (… )»).`, severidad: "aviso" });
      break;
    }
  }
  return out;
}

/** Resumen de lectura fácil: 3 campos separados, obligatorios, con tope. */
export function verificarLecturaFacil(campos: { queEs: string; queNecesito: string; dondeSeHace: string }): ReglaResultado[] {
  const out: ReglaResultado[] = [];
  ([
    ["qué es", campos.queEs],
    ["qué necesito", campos.queNecesito],
    ["dónde se hace", campos.dondeSeHace],
  ] as const).forEach(([nombre, valor]) => {
    if (!valor.trim()) {
      out.push({ regla: "lectura-facil", mensaje: `El campo «${nombre}» del resumen de lectura fácil es obligatorio.`, severidad: "bloqueo" });
    } else if (valor.length > 140) {
      out.push({ regla: "lectura-facil", mensaje: `«${nombre}» tiene ${valor.length} caracteres: recorta a 140 para lectura fácil.`, severidad: "aviso" });
    } else {
      out.push(...verificarLegibilidad(valor));
    }
  });
  return out;
}
