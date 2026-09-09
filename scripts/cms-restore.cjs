/**
 * Restauración desde una copia de `npm run cms:backup`.
 * Uso:
 *
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run cms:restore -- backups/cms-backup-<fecha>.json
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run cms:restore -- backups/cms-backup-<fecha>.json --dry-run
 *
 * Con --dry-run solo informa de lo que haría, sin escribir nada.
 * Sin --dry-run: vacía cms_registros y cms_actividad y vuelve a sembrar desde
 * la copia (idempotente por upsert de clave primaria). Al terminar, relee
 * conteos para verificar.
 */
const fs = require("node:fs");

const COLECCIONES = [
  "tramites", "noticias", "eventos", "ayudas", "empleo", "avisos",
  "servicios", "paginas", "areas", "documentos", "transparencia",
];

async function main() {
  const fichero = process.argv[2];
  const dryRun = process.argv.includes("--dry-run");
  if (!fichero || fichero.startsWith("--")) {
    console.error("Uso: npm run cms:restore -- <fichero-backup.json> [--dry-run]");
    process.exit(1);
  }
  const copia = JSON.parse(fs.readFileSync(fichero, "utf-8"));
  if (!Array.isArray(copia.registros)) throw new Error("Copia inválida: falta `registros`.");
  const porColeccion = new Map();
  for (const f of copia.registros) {
    if (!porColeccion.has(f.coleccion)) porColeccion.set(f.coleccion, []);
    porColeccion.get(f.coleccion).push({ coleccion: f.coleccion, id: f.id, registro: f.registro });
  }
  console.log(`Copia de ${copia.exportedAt}: ${copia.registros.length} registros, ${(copia.actividad || []).length} actividad.`);
  for (const [c, filas] of porColeccion) console.log(`  ${c}: ${filas.length}`);
  if (dryRun) { console.log("dry-run: sin escritura."); return; }

  const url = (process.env.SUPABASE_URL || "").trim().replace(/\/$/, "");
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!url || !key) {
    console.error("Falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el entorno.");
    process.exit(1);
  }
  async function rest(p, init = {}) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(`${url}/rest/v1${p}`, {
        ...init,
        signal: ctrl.signal,
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          ...((init.headers || {})),
        },
      });
      if (!res.ok) throw new Error(`PostgREST ${res.status} en ${p}.`);
      return res;
    } finally {
      clearTimeout(t);
    }
  }

  for (const c of COLECCIONES) {
    await rest(`/cms_registros?coleccion=eq.${encodeURIComponent(c)}`, { method: "DELETE" });
  }
  await rest(`/cms_actividad?id=gt.0`, { method: "DELETE" });
  console.log("Tablas vaciadas.");
  for (const [c, filas] of porColeccion) {
    for (let i = 0; i < filas.length; i += 100) {
      await rest(`/cms_registros`, {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify(filas.slice(i, i + 100)),
      });
    }
    console.log(`  ${c}: restaurados ${filas.length}`);
  }
  for (const e of copia.actividad || []) {
    await rest(`/cms_actividad`, { method: "POST", body: JSON.stringify(e) });
  }
  // Verificación: releer conteos.
  for (const c of COLECCIONES) {
    const filas = await rest(`/cms_registros?coleccion=eq.${encodeURIComponent(c)}&select=id&limit=5000`).then((r) => r.json());
    console.log(`  verifica ${c}: ${filas.length} en base`);
  }
  console.log("Restauración completa y verificada.");
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });
