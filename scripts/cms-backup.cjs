/**
 * Exportación periódica del contenido del gestor a un destino fuera de la
 * plataforma (las copias de Supabase viven dentro de Supabase y no cubren
 * ficheros). Uso:
 *
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run cms:backup
 *
 * Destino: CMS_BACKUP_DIR o ./backups/ (fuera de la plataforma; copiar ese
 * directorio a almacenamiento externo completa la copia). Las credenciales
 * van por variables de entorno, nunca en el código ni en el repositorio.
 * Verificación: imprime nº de registros por colección + SHA-256 del fichero.
 */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const COLECCIONES = [
  "tramites", "noticias", "eventos", "ayudas", "empleo", "avisos",
  "servicios", "paginas", "areas", "documentos", "transparencia",
];

async function main() {
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
      return res.json();
    } finally {
      clearTimeout(t);
    }
  }

  const registros = [];
  for (const c of COLECCIONES) {
    const filas = await rest(`/cms_registros?coleccion=eq.${encodeURIComponent(c)}&select=coleccion,id,registro&limit=5000`);
    registros.push(...filas);
    console.log(`${c}: ${filas.length} registros`);
  }
  const actividad = await rest(`/cms_actividad?select=fecha,usuario,accion,elemento,detalle&order=id&limit=2000`);
  console.log(`actividad: ${actividad.length} entradas`);

  const copia = {
    exportedAt: new Date().toISOString(),
    source: "cms_registros + cms_actividad",
    registros,
    actividad,
  };
  const dir = process.env.CMS_BACKUP_DIR || path.join(process.cwd(), "backups");
  fs.mkdirSync(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const fichero = path.join(dir, `cms-backup-${stamp}.json`);
  const texto = JSON.stringify(copia, null, 2) + "\n";
  fs.writeFileSync(fichero, texto, "utf-8");
  const sha = crypto.createHash("sha256").update(texto).digest("hex");
  console.log(`Escrito ${fichero} (${registros.length} registros, ${actividad.length} actividad)`);
  console.log(`SHA-256: ${sha}`);
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });
