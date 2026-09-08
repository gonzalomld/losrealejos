const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function formatearFechaES(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} de ${MESES[m - 1]} de ${y}`;
}

export function formatearFechaHoraES(iso: string): string {
  const fecha = formatearFechaES(iso);
  const hora = iso.slice(11, 16);
  return hora ? `${fecha}, ${hora} h` : fecha;
}

export function diasRestantes(finISO: string, hoyISO?: string): number | null {
  if (!finISO) return null;
  const hoy = hoyISO ? new Date(hoyISO) : new Date();
  hoy.setHours(0, 0, 0, 0);
  const [y, m, d] = finISO.slice(0, 10).split("-").map(Number);
  const fin = new Date(y, m - 1, d);
  return Math.round((fin.getTime() - hoy.getTime()) / 86400000);
}

export function estadoPlazo(finISO: string | null): "abierto" | "proximo" | "cerrado" | "sin-plazo" {
  if (!finISO) return "sin-plazo";
  const dias = diasRestantes(finISO);
  if (dias === null) return "sin-plazo";
  if (dias < 0) return "cerrado";
  if (dias <= 7) return "proximo";
  return "abierto";
}
