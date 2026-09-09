"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { EstadoBadge } from "../EstadoBadge";
import { PropietarioTag } from "../PropietarioTag";
import { BloquesEditor } from "./BloquesEditor";
import { VerificadorPanel } from "./VerificadorPanel";
import type { Bloque } from "@/lib/cms/bloques";
import type { RegistroEditorial } from "@/lib/cms/tipos-editoriales";
import { verificarImagen, verificarLegibilidad, verificarLecturaFacil, type ReglaResultado } from "@/lib/cms/verificadores";
import { ETIQUETAS_ROL, motivoDenegacion, useRol, type Accion } from "@/lib/roles/contexto";
import { accionCambiarEstado, accionGuardar } from "@/lib/cms/acciones";
import { AREAS } from "@/data/areas";
import { CANALES, ETIQUETAS_CANAL, ETIQUETAS_PERFIL, ETIQUETAS_TEMA, PERFILES, TEMAS, type Canal, type Perfil, type Tema } from "@/data/vocabularios";

/**
 * Editor configurable: un solo componente dibujado desde la definición de
 * campos del tipo. Modal amplio accesible: foco contenido, Escape con
 * confirmación si hay cambios, retorno de foco al cerrar.
 */
export function EditorModal<T extends Record<string, unknown>>({
  tituloTipo,
  registro,
  coleccion,
  camposLecturaFacil,
  alCerrar,
  alGuardar,
}: {
  tituloTipo: string;
  registro: RegistroEditorial<T>;
  coleccion: string;
  camposLecturaFacil?: { queEs: string; queNecesito: string; dondeSeHace: string };
  alCerrar: () => void;
  alGuardar: () => void;
}) {
  const { rol, usuario, puede } = useRol();
  const [form, setForm] = useState<T>(() => JSON.parse(JSON.stringify(registro.contenido)));
  const [bloques, setBloques] = useState<Bloque[]>([]);
  const [seoAbierto, setSeoAbierto] = useState(false);
  const [sucio, setSucio] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ultimoGuardado, setUltimoGuardado] = useState<string | null>(null);
  const [confirmarCierre, setConfirmarCierre] = useState(false);
  const dialogoRef = useRef<HTMLDivElement>(null);
  const abridorRef = useRef<Element | null>(null);

  useEffect(() => {
    abridorRef.current = document.activeElement;
    dialogoRef.current?.querySelector<HTMLElement>("input, textarea, select, button")?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      (abridorRef.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => {
    function tecla(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (sucio) setConfirmarCierre(true);
        else alCerrar();
      }
    }
    document.addEventListener("keydown", tecla);
    return () => document.removeEventListener("keydown", tecla);
  }, [sucio, alCerrar]);

  // Autosave cada 30 s si hay cambios.
  useEffect(() => {
    if (!sucio) return;
    const t = setTimeout(() => { guardar(false); }, 30000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sucio, form, bloques]);

  function set<K extends keyof T>(k: K, v: T[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setSucio(true);
  }

  const resultados: ReglaResultado[] = useMemo(() => {
    const out: ReglaResultado[] = [];
    for (const b of bloques) {
      if (b.tipo === "foto") {
        const r = verificarImagen(b.alt, false);
        if (r) out.push({ ...r, mensaje: `Bloque Foto: ${r.mensaje}` });
      }
      if (b.texto) out.push(...verificarLegibilidad(b.texto));
    }
    const desc = typeof form["descripcion"] === "string" ? (form["descripcion"] as string) : "";
    if (desc) out.push(...verificarLegibilidad(desc));
    const resumen = form["resumen"] as { queEs?: string; queNecesito?: string; dondeSeHace?: string } | undefined;
    if (resumen) {
      out.push(...verificarLecturaFacil({
        queEs: String(resumen.queEs ?? ""),
        queNecesito: String(resumen.queNecesito ?? ""),
        dondeSeHace: String(resumen.dondeSeHace ?? ""),
      }));
    }
    return out;
  }, [bloques, form]);

  const hayBloqueos = resultados.some((r) => r.severidad === "bloqueo");
  const puedeEditar = puede("editar" as Accion, coleccion, registro as RegistroEditorial<unknown>);
  const puedePublicar = puede("publicar" as Accion, coleccion, registro as RegistroEditorial<unknown>);
  const puedeEnviar = puede("enviar" as Accion, coleccion, registro as RegistroEditorial<unknown>);
  const accionPrincipal: { etiqueta: string; accion: "enviar" | "publicar"; permitida: boolean; motivo?: string } =
    rol === "editor" || (!puedePublicar && puedeEnviar)
      ? { etiqueta: "Enviar a revisión", accion: "enviar", permitida: puedeEnviar, motivo: puedeEnviar ? undefined : motivoDenegacion(rol, "enviar") }
      : { etiqueta: "Publicar", accion: "publicar", permitida: puedePublicar && !hayBloqueos, motivo: !puedePublicar ? motivoDenegacion(rol, "publicar") : hayBloqueos ? "Hay bloqueos de accesibilidad sin resolver." : undefined };

  async function guardar(mostrarError = true) {
    setGuardando(true);
    setError(null);
    const r = await accionGuardar(coleccion as never, registro.id, form as never, usuario.nombre, "");
    setGuardando(false);
    if (!r.ok) {
      if (mostrarError) setError(r.error);
      return false;
    }
    setSucio(false);
    setUltimoGuardado(new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }));
    return true;
  }

  async function principal() {
    const ok = await guardar(true);
    if (!ok) return;
    const r = await accionCambiarEstado(
      coleccion as never,
      registro.id,
      accionPrincipal.accion === "enviar" ? "en_revision" : "publicado",
      usuario.nombre,
    );
    if (!r.ok) setError(r.error);
    else { alGuardar(); alCerrar(); }
  }

  async function eliminar() {
    if (!confirm("Archivar este contenido dejará de mostrarse en el portal. ¿Continuar?")) return;
    const r = await accionCambiarEstado(coleccion as never, registro.id, "archivado", usuario.nombre, "Archivado desde el editor");
    if (!r.ok) setError(r.error);
    else { alGuardar(); alCerrar(); }
  }

  function intentarCerrar() {
    if (sucio) setConfirmarCierre(true);
    else alCerrar();
  }

  const titulo = String(form["tituloClaro"] ?? form["titulo"] ?? form["titular"] ?? form["nombre"] ?? registro.id);
  const seoTitulo = String(form["tituloClaro"] ?? form["titulo"] ?? form["titular"] ?? "");
  const seoHecho = [seoTitulo.trim() !== ""].filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" onClick={intentarCerrar} />
      <div
        ref={dialogoRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-titulo"
        className="absolute inset-x-4 top-[5vh] mx-auto flex max-h-[90vh] max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl"
      >
        <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 px-5 py-3">
          <p className="text-xs font-bold uppercase text-neutral-500">{tituloTipo}</p>
          <h2 id="editor-titulo" className="w-full text-xl font-extrabold">{titulo}</h2>
          <EstadoBadge estado={registro.estado} />
          <PropietarioTag areaId={registro.areaId} />
          <span className="flex-1" />
          <button type="button" onClick={intentarCerrar} aria-label="Cerrar editor" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md hover:bg-neutral-100">
            <X aria-hidden="true" size={18} />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[1fr_300px]">
          <div className="min-h-0 overflow-y-auto space-y-4 px-5 py-4">
            {error && (
              <p role="alert" className="rounded-md bg-red-50 p-3 text-sm font-semibold text-red-900">
                {error} Tu trabajo sigue intacto en el editor.
              </p>
            )}
            <section className="rounded-lg border border-neutral-200" aria-labelledby="seo-titulo">
              <button type="button" onClick={() => setSeoAbierto((a) => !a)} aria-expanded={seoAbierto} className="flex min-h-[44px] w-full items-center justify-between px-4 text-left">
                <span id="seo-titulo" className="text-sm font-bold">Metadatos de posicionamiento ({seoHecho}/2)</span>
                <span aria-hidden="true">{seoAbierto ? "−" : "+"}</span>
              </button>
              {seoAbierto && (
                <div className="space-y-2 border-t border-neutral-100 p-4">
                  <label className="block text-xs font-semibold">Título para buscadores
                    <input value={seoTitulo} onChange={(e) => set("tituloClaro" as keyof T, e.target.value as T[keyof T])} className="mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 px-2 text-sm" />
                  </label>
                  <p className="text-xs text-neutral-500">Dirección web: <code>/{coleccion}/{registro.id}</code> (personalizable por el administrador)</p>
                </div>
              )}
            </section>

            {camposLecturaFacil && (
              <section aria-labelledby="lf-titulo" className="rounded-lg border border-primary/30 bg-blue-50/40 p-4">
                <h3 id="lf-titulo" className="text-sm font-bold">Resumen de lectura fácil (obligatorio, máx. 140 caracteres por campo)</h3>
                {(["queEs", "queNecesito", "dondeSeHace"] as const).map((k) => {
                  const v = String((form["resumen"] as Record<string, string> | undefined)?.[k] ?? "");
                  const etiquetas = { queEs: "Qué es", queNecesito: "Qué necesito", dondeSeHace: "Dónde se hace" } as const;
                  return (
                    <label key={k} className="mt-2 block text-xs font-semibold">{etiquetas[k]} ({v.length}/140)
                      <textarea
                        value={v}
                        rows={2}
                        onChange={(e) => { setForm((f) => ({ ...f, resumen: { ...((f["resumen"] as object) ?? {}), [k]: e.target.value } })); setSucio(true); }}
                        className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-2 py-2 text-sm"
                      />
                    </label>
                  );
                })}
              </section>
            )}

            <section aria-labelledby="campos-titulo" className="space-y-3 rounded-lg border border-neutral-200 p-4">
              <h3 id="campos-titulo" className="text-sm font-bold">Campos del contenido</h3>
              <label className="block text-xs font-semibold">Nombre oficial
                <input value={String(form["tituloOficial"] ?? form["titulo"] ?? "")} onChange={(e) => set("tituloOficial" as keyof T, e.target.value as T[keyof T])} className="mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 px-2 text-sm" />
              </label>
              <label className="block text-xs font-semibold">Descripción
                <textarea value={String(form["descripcion"] ?? "")} onChange={(e) => set("descripcion" as keyof T, e.target.value as T[keyof T])} rows={4} className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-2 text-sm" />
              </label>
              <ListaTextos
                titulo="Requisitos"
                valores={(form["requisitos"] as string[] | undefined) ?? []}
                onCambio={(v) => set("requisitos" as keyof T, v as T[keyof T])}
              />
              <ListaTextos
                titulo="Documentación que hay que llevar"
                valores={(form["documentacion"] as string[] | undefined) ?? []}
                onCambio={(v) => set("documentacion" as keyof T, v as T[keyof T])}
              />
              <fieldset className="rounded-md border border-neutral-200 p-2">
                <legend className="px-1 text-xs font-semibold">Canales</legend>
                {CANALES.map((c: Canal) => {
                  const lista = (form["canales"] as string[] | undefined) ?? [];
                  return (
                    <label key={c} className="flex min-h-[44px] items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={lista.includes(c)}
                        onChange={(e) => {
                          const next = e.target.checked ? [...lista, c] : lista.filter((x) => x !== c);
                          set("canales" as keyof T, (next.length ? next : ["presencial"]) as T[keyof T]);
                        }}
                        className="h-5 w-5"
                      />
                      {ETIQUETAS_CANAL[c]}
                    </label>
                  );
                })}
              </fieldset>
              <fieldset className="rounded-md border border-neutral-200 p-2">
                <legend className="px-1 text-xs font-semibold">Lugar de presentación presencial</legend>
                {(["nombre", "direccion", "telefono"] as const).map((k) => {
                  const pres = (form["presencial"] as Record<string, string> | undefined) ?? {};
                  const etiquetas = { nombre: "Nombre del lugar", direccion: "Dirección", telefono: "Teléfono" } as const;
                  return (
                    <label key={k} className="mt-1 block text-xs font-semibold">{etiquetas[k]}
                      <input
                        value={pres[k] ?? ""}
                        onChange={(e) => set("presencial" as keyof T, { ...pres, [k]: e.target.value } as T[keyof T])}
                        className="mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 px-2 text-sm"
                      />
                    </label>
                  );
                })}
              </fieldset>
              <label className="block text-xs font-semibold">Plazo de resolución
                <input value={String(form["plazoResolucion"] ?? "")} onChange={(e) => set("plazoResolucion" as keyof T, e.target.value as T[keyof T])} className="mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 px-2 text-sm" />
              </label>
              <label className="block text-xs font-semibold">Sentido del silencio
                <input value={String(form["silencio"] ?? "")} onChange={(e) => set("silencio" as keyof T, e.target.value as T[keyof T])} className="mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 px-2 text-sm" placeholder="Estimatorio, desestimatorio o no aplica" />
              </label>
              <label className="block text-xs font-semibold">Tasas
                <input value={String(form["tasa"] ?? "")} onChange={(e) => set("tasa" as keyof T, e.target.value as T[keyof T])} className="mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 px-2 text-sm" />
              </label>
              <NormativaEditor
                valores={(form["normativa"] as { titulo: string; url?: string }[] | undefined) ?? []}
                onCambio={(v) => set("normativa" as keyof T, v as T[keyof T])}
              />
              <label className="block text-xs font-semibold">Enlace al procedimiento de la Sede
                <input value={String(form["sedeUrl"] ?? "")} onChange={(e) => set("sedeUrl" as keyof T, e.target.value as T[keyof T])} className="mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 px-2 text-sm" inputMode="url" />
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="block text-xs font-semibold">Área responsable
                  <select
                    value={String(form["areaId"] ?? registro.areaId)}
                    onChange={(e) => set("areaId" as keyof T, e.target.value as T[keyof T])}
                    className="mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 bg-white px-2 text-sm"
                  >
                    {AREAS.map((a) => (<option key={a.id} value={a.id}>{a.nombre}</option>))}
                  </select>
                </label>
                <label className="block text-xs font-semibold">Tema principal
                  <select
                    value={String(form["tema"] ?? "")}
                    onChange={(e) => set("tema" as keyof T, e.target.value as T[keyof T])}
                    className="mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 bg-white px-2 text-sm"
                  >
                    {TEMAS.map((t: Tema) => (<option key={t} value={t}>{ETIQUETAS_TEMA[t]}</option>))}
                  </select>
                </label>
              </div>
              <fieldset className="rounded-md border border-neutral-200 p-2">
                <legend className="px-1 text-xs font-semibold">Temas secundarios</legend>
                <div className="grid gap-0 sm:grid-cols-2">
                  {TEMAS.map((t: Tema) => {
                    const lista = (form["temasSecundarios"] as string[] | undefined) ?? [];
                    return (
                      <label key={t} className="flex min-h-[44px] items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={lista.includes(t)}
                          onChange={(e) => set("temasSecundarios" as keyof T, (e.target.checked ? [...lista, t] : lista.filter((x) => x !== t)) as T[keyof T])}
                          className="h-5 w-5"
                        />
                        {ETIQUETAS_TEMA[t]}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <fieldset className="rounded-md border border-neutral-200 p-2">
                <legend className="px-1 text-xs font-semibold">Perfiles</legend>
                {PERFILES.map((p: Perfil) => {
                  const lista = (form["perfiles"] as string[] | undefined) ?? [];
                  return (
                    <label key={p} className="flex min-h-[44px] items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={lista.includes(p)}
                        onChange={(e) => set("perfiles" as keyof T, (e.target.checked ? [...lista, p] : lista.filter((x) => x !== p)) as T[keyof T])}
                        className="h-5 w-5"
                      />
                      {ETIQUETAS_PERFIL[p]}
                    </label>
                  );
                })}
              </fieldset>
            </section>

            <BloquesEditor valor={bloques} onCambio={(b) => { setBloques(b); setSucio(true); }} />

            <section aria-labelledby="ciclo-titulo" className="grid gap-2 rounded-lg border border-neutral-200 p-4 sm:grid-cols-3">
              <h3 id="ciclo-titulo" className="text-sm font-bold sm:col-span-3">Ciclo de vida</h3>
              <p className="text-xs text-neutral-500 sm:col-span-3">Publicación: {registro.pubFecha ?? "—"} · Última revisión: {registro.ultimaRevision} · Periodicidad: cada {registro.periodicidadMeses} meses</p>
              <p className="text-xs text-neutral-500 sm:col-span-3">Las fechas de validez y expiración las edita un validador o administrador.</p>
            </section>
          </div>

          <div className="min-h-0 overflow-y-auto border-t border-neutral-200 p-3 lg:border-l lg:border-t-0">
            <VerificadorPanel resultados={resultados} />
            <section aria-labelledby="versiones-titulo" className="mt-3 rounded-lg border border-neutral-200 p-3">
              <h3 id="versiones-titulo" className="text-sm font-bold">Versiones ({registro.versiones.length})</h3>
              <ul className="mt-1 space-y-1 text-xs text-neutral-600">
                {registro.versiones.slice(-5).reverse().map((v) => (
                  <li key={v.n} className="flex items-center justify-between gap-2">
                    <span>v{v.n} · {v.fecha} · {v.autor}</span>
                    <a href={`/vista-previa/${coleccion}/${registro.id}?version=${v.n}`} target="_blank" rel="noopener" className="font-semibold text-primary underline">Ver</a>
                  </li>
                ))}
              </ul>
              <p className="mt-1 text-xs text-neutral-500">Previsualizar una versión anterior usa la misma ruta de previsualización con otro origen de datos.</p>
            </section>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-neutral-200 bg-neutral-50 px-5 py-3">
          <button type="button" onClick={eliminar} className="inline-flex min-h-[44px] items-center rounded-md px-3 text-sm font-semibold text-red-700 hover:bg-red-50">
            Archivar
          </button>
          <span className="flex-1" />
          {ultimoGuardado && <span className="text-xs text-neutral-500">Guardado {ultimoGuardado}{sucio ? " · cambios sin guardar" : ""}</span>}
          <span className="text-xs text-neutral-500">Actúas como {ETIQUETAS_ROL[rol].nombre}</span>
          <button type="button" onClick={intentarCerrar} className="inline-flex min-h-[44px] items-center rounded-md bg-neutral-200 px-4 text-sm font-semibold">Cancelar</button>
          <button type="button" onClick={() => guardar(true)} disabled={guardando || !puedeEditar} title={!puedeEditar ? motivoDenegacion(rol, "editar") : undefined} className="inline-flex min-h-[44px] items-center rounded-md bg-neutral-200 px-4 text-sm font-semibold disabled:opacity-60">
            {guardando ? "Guardando…" : "Guardar borrador"}
          </button>
          <a href={`/vista-previa/${coleccion}/${registro.id}`} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center rounded-md bg-neutral-200 px-4 text-sm font-semibold">
            Previsualizar
          </a>
          <button
            type="button"
            onClick={principal}
            disabled={!accionPrincipal.permitida}
            title={accionPrincipal.motivo}
            aria-label={accionPrincipal.motivo ? `${accionPrincipal.etiqueta}. ${accionPrincipal.motivo}` : accionPrincipal.etiqueta}
            className="inline-flex min-h-[44px] items-center rounded-md bg-primary px-4 text-sm font-bold text-white disabled:opacity-60"
          >
            {accionPrincipal.etiqueta}
          </button>
        </div>
      </div>

      {confirmarCierre && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50" role="alertdialog" aria-modal="true" aria-labelledby="cierre-titulo">
          <div className="max-w-sm rounded-lg bg-white p-5 shadow-xl">
            <h2 id="cierre-titulo" className="text-base font-bold">Hay cambios sin guardar</h2>
            <p className="mt-1 text-sm">Si cierras ahora se perderá lo editado desde el último guardado.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={() => setConfirmarCierre(false)} className="min-h-[44px] rounded-md bg-neutral-200 px-4 text-sm font-semibold">Seguir editando</button>
              <button type="button" onClick={alCerrar} className="min-h-[44px] rounded-md bg-red-700 px-4 text-sm font-bold text-white">Descartar cambios</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ListaTextos({ titulo, valores, onCambio }: { titulo: string; valores: string[]; onCambio: (v: string[]) => void }) {
  const [nuevo, setNuevo] = useState("");
  return (
    <fieldset className="rounded-md border border-neutral-200 p-2">
      <legend className="px-1 text-xs font-semibold">{titulo} ({valores.length})</legend>
      <ul className="space-y-1">
        {valores.map((v, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="flex-1 rounded bg-neutral-50 px-2 py-2">{v}</span>
            <button
              type="button"
              onClick={() => onCambio(valores.filter((_, j) => j !== i))}
              aria-label={`Eliminar: ${v.slice(0, 40)}`}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-red-700 hover:bg-red-50"
            >
              <X aria-hidden="true" size={15} />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-1 flex gap-1">
        <input
          value={nuevo}
          onChange={(e) => setNuevo(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (nuevo.trim()) { onCambio([...valores, nuevo.trim()]); setNuevo(""); } } }}
          placeholder="Añadir y pulsar Enter…"
          aria-label={`Añadir a ${titulo}`}
          className="min-h-[44px] flex-1 rounded-md border border-neutral-300 px-2 text-sm"
        />
        <button
          type="button"
          onClick={() => { if (nuevo.trim()) { onCambio([...valores, nuevo.trim()]); setNuevo(""); } }}
          className="min-h-[44px] rounded-md bg-neutral-200 px-3 text-sm font-semibold"
        >
          Añadir
        </button>
      </div>
    </fieldset>
  );
}

function NormativaEditor({ valores, onCambio }: { valores: { titulo: string; url?: string }[]; onCambio: (v: { titulo: string; url?: string }[]) => void }) {
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  return (
    <fieldset className="rounded-md border border-neutral-200 p-2">
      <legend className="px-1 text-xs font-semibold">Normativa ({valores.length})</legend>
      <ul className="space-y-1">
        {valores.map((n, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="flex-1 rounded bg-neutral-50 px-2 py-2">
              {n.titulo}{n.url ? ` — ${n.url}` : ""}
            </span>
            <button
              type="button"
              onClick={() => onCambio(valores.filter((_, j) => j !== i))}
              aria-label={`Eliminar norma: ${n.titulo.slice(0, 40)}`}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-red-700 hover:bg-red-50"
            >
              <X aria-hidden="true" size={15} />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-1 grid gap-1 sm:grid-cols-[1fr_1fr_auto]">
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título de la norma" aria-label="Título de la norma" className="min-h-[44px] rounded-md border border-neutral-300 px-2 text-sm" />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL (opcional)" aria-label="URL de la norma" inputMode="url" className="min-h-[44px] rounded-md border border-neutral-300 px-2 text-sm" />
        <button
          type="button"
          onClick={() => { if (titulo.trim()) { onCambio([...valores, { titulo: titulo.trim(), ...(url.trim() ? { url: url.trim() } : {}) }]); setTitulo(""); setUrl(""); } }}
          className="min-h-[44px] rounded-md bg-neutral-200 px-3 text-sm font-semibold"
        >
          Añadir
        </button>
      </div>
    </fieldset>
  );
}
