/**
 * Genera data/cms/*.json desde la semilla versionada.
 * Uso: `npm run cms:seed`.
 * El estado de demostración vive en el repositorio, no se genera en runtime.
 * Transpila con el TypeScript ya instalado (sin dependencias nuevas) y
 * resuelve el alias @/ a src/.
 */
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "data", "cms");

const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...args) {
  if (request.startsWith("@/")) {
    request = path.join(ROOT, "src", request.slice(2));
  }
  return originalResolve.call(this, request, ...args);
};

const originalJsHandler = require.extensions[".js"];
require.extensions[".ts"] = function (m, filename) {
  const src = fs.readFileSync(filename, "utf-8");
  const { outputText } = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  m._compile(outputText, filename);
};
require.extensions[".js"] = function (m, filename) {
  if (filename.endsWith(".ts")) return;
  return originalJsHandler(m, filename);
};

const { sembrar } = require(path.join(ROOT, "src", "lib", "cms", "semilla.ts"));

const COLECCIONES = [
  "tramites", "noticias", "eventos", "ayudas", "empleo", "avisos",
  "servicios", "paginas", "areas", "documentos", "transparencia",
];

const todos = sembrar();
fs.mkdirSync(OUT_DIR, { recursive: true });
for (const c of COLECCIONES) {
  const regs = todos.filter((r) => r.coleccion === c);
  fs.writeFileSync(path.join(OUT_DIR, `${c}.json`), JSON.stringify(regs, null, 2) + "\n", "utf-8");
  console.log(`${c}.json: ${regs.length} registros`);
}
