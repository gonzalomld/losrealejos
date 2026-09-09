"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { EstadoBadge } from "../EstadoBadge";
import { PropietarioTag } from "../PropietarioTag";
import { useSoloLectura } from "../EscrituraContext";
import { ERROR_SOLO_LECTURA_UI } from "../solo-lectura";
import { BloquesEditor } from "./BloquesEditor";
import { CampoDef } from "./CamposDef";
import { VerificadorPanel } from "./VerificadorPanel";
import type { Bloque } from "@/lib/cms/bloques";
import type { DefColeccion } from "@/lib/cms/definiciones";
import { escribirRuta, tituloDeContenido } from "@/lib/cms/definiciones";
import type { RegistroEditorial } from "@/lib/cms/tipos-editoriales";
import { verificarImagen, verificarLegibilidad, verificarLecturaFacil, type ReglaResultado } from "@/lib/cms/verificadores";
import { ETIQUETAS_ROL, motivoDenegacion, useRol, type Accion } from "@/lib/roles/contexto";
import { accionCambiarEstado, accionGuardar } from "@/lib/cms/acciones";

/**
 * Editor dirigido por definición (Bloque 2): recorre DefColeccion.campos
 * agrupados en secciones. Sin campos escritos a mano: añadir un tipo de
 * contenido es crear su fichero de definición.
 * Accesible: trampa de foco cíclica, fondo inerte, Escape con confirmación,
 * retorno de foco al cerrar. Autoguardado borrador con indicador (B3.6):
 * versión solo cuando el contenido cambia.
 */
export function EditorModal<T extends Record<string, unknown>>({
  definicion,
  registro,
  alCerrar,
  alGuardar,
}: {
  definicion: DefColeccion;
  registro: RegistroEditorial<T>;
  alCerrar: () => void;
  alGuardar: () => void;
}) {
  const coleccion = definicion.coleccion;
  const tituloTipo = definicion.tituloTipo;
  const { rol, usuario, puede } = useRol();
  const soloLectura = useSoloLectura();
  const [form, setForm] = useState<T>(() => JSON.parse(JSON.stringify(registro.contenido)));
  const [bloques, setBloques] = useState<Bloque[]>([]);
  const [seoAbierto, setSeoAbierto] = useState(false);
  const [gruposAbiertos, setGruposAbiertos] = useState<Record<string, boolean>>({});
  const [sucio, setSucio] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [autoGuardando, setAutoGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ultimoGuardado, setUltimoGuardado] = useState<string | null>(null);
  const [confirmarCierre, setConfirmarCierre] = useState(false);
  const dialogoRef = useRef<HTMLDivElement>(null);
  const abridorRef = useRef<Element | null>(null);
  const guardandoRef = useRef(false);

  // Trampa de foco cíclica + fondo inerte (B3.5).
  useEffect(() => {
    abridorRef.current = document.activeElement;
    const dialogo = dialogoRef.current;
    const raiz = document.getElementById("contenido-admin");
    dialogo?.querySelector<HTMLElement>("input, textarea, select, button")?.focus();
    document.body.style.overflow = "hidden";
    if (raiz) raiz.inert = true;
    function trampa(e: KeyboardEvent) {
      if (e.key !== "Tab" || !dialogo) return;
      const focos = [...dialogo.querySelectorAll<HTMLElement>("input, textarea, select, button, a[href]")]
        .filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
      if (focos.length === 0) return;
      const primero = focos[0];
      const ultimo = focos[focos.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
    document.addEventListener("keydown", trampa);
    return () => {
      document.body.style.overflow = "";
      if (raiz) raiz.inert = false;
      document.removeEventListener("keydown", trampa);
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

  // Autoguardado como borrador con indicador (B3.6): cada 30 s si hay
  // cambios. guardarContenido solo crea versión cuando el contenido cambia.
  useEffect(() => {
    if (!sucio || soloLectura) return;
    const t = setTimeout(() => { void guardarAuto(); }, 30000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sucio, form, bloques, soloLectura]);

  function setCampo(clave: string, valor: unknown) {
    setForm((f) => escribirRuta(f, clave, valor));
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
  const puedeEditar = !soloLectura && puede("editar" as Accion, coleccion, registro as RegistroEditorial<unknown>);
  const puedePublicar = !soloLectura && puede("publicar" as Accion, coleccion, registro as RegistroEditorial<unknown>);
  const puedeEnviar = !soloLectura && puede("enviar" as Accion, coleccion, registro as RegistroEditorial<unknown>);
  const motivoSoloLectura = soloLectura ? ERROR_SOLO_LECTURA_UI : undefined;
  const accionPrincipal: { etiqueta: string; accion: "enviar" | "publicar"; permitida: boolean; motivo?: string } =
    rol === "editor" || (!puedePublicar && puedeEnviar)
      ? { etiqueta: "Enviar a revisión", accion: "enviar", permitida: puedeEnviar, motivo: motivoSoloLectura ?? (puedeEnviar ? undefined : motivoDenegacion(rol, "enviar")) }
      : { etiqueta: "Publicar", accion: "publicar", permitida: puedePublicar && !hayBloqueos, motivo: motivoSoloLectura ?? (!puedePublicar ? motivoDenegacion(rol, "publicar") : hayBloqueos ? "Hay bloqueos de accesibilidad sin resolver." : undefined) };

  async function guardar(mostrarError = true) {
    if (soloLectura) {
      if (mostrarError) setError(ERROR_SOLO_LECTURA_UI);
      return false;
    }
    if (guardandoRef.current) return false;
    guardandoRef.current = true;
    setGuardando(true);
    setError(null);
    const r = await accionGuardar(coleccion as never, registro.id, form as never, usuario.nombre, "");
    guardandoRef.current = false;
    setGuardando(false);
    if (!r.ok) {
      if (mostrarError) setError(r.error);
      return false;
    }
    setSucio(false);
    setUltimoGuardado(new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }));
    return true;
  }

  /** Autoguardado silencioso: no muestra error intrusivo, solo el indicador. */
  async function guardarAuto() {
    if (guardandoRef.current || soloLectura) return;
    guardandoRef.current = true;
    setAutoGuardando(true);
    const r = await accionGuardar(coleccion as never, registro.id, form as never, usuario.nombre, "");
    guardandoRef.current = false;
    setAutoGuardando(false);
    if (r.ok) {
      setSucio(false);
      setUltimoGuardado(new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }) + " (automático)");
    }
    // Si falla, se conserva sucio y reintenta en el siguiente ciclo; sin alertas.
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

  const titulo = tituloDeContenido(form, definicion.tituloRutas, registro.id);
  const seoTitulo = tituloDeContenido(form, definicion.tituloRutas, "");
  const seoHecho = [seoTitulo.trim() !== ""].filter(Boolean).length;

  const grupos = useMemo(() => {
    const orden: string[] = [];
    const porGrupo = new Map<string, typeof definicion.campos>();
    for (const c of definicion.campos) {
      const g = c.grupo ?? "Campos";
      if (!porGrupo.has(g)) { porGrupo.set(g, []); orden.push(g); }
      porGrupo.get(g)!.push(c);
    }
    return orden.map((g) => ({ nombre: g, campos: porGrupo.get(g)! }));
  }, [definicion]);

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
            <section aria-labelledby="seo-titulo" className="rounded-lg border border-neutral-200">
              <h3 id="seo-titulo" className="sr-only">Metadatos de posicionamiento</h3>
              <button type="button" onClick={() => setSeoAbierto((a) => !a)} aria-expanded={seoAbierto} aria-labelledby="seo-titulo" className="flex min-h-[44px] w-full items-center justify-between px-4 text-left">
                <span className="text-sm font-bold">Metadatos de posicionamiento ({seoHecho}/2)</span>
                <span aria-hidden="true">{seoAbierto ? "−" : "+"}</span>
              </button>
              {seoAbierto && (
                  <div className="space-y-2 border-t border-neutral-100 p-4">
                    <CampoDef
                      def={{ clave: definicion.tituloRutas[0] ?? "tituloClaro", etiqueta: "Título para buscadores", tipo: "texto" }}
                      form={form}
                      onCambio={setCampo}
                    />
                    <p className="text-xs text-neutral-500">Dirección web: <code>/{coleccion}/{registro.id}</code> (personalizable por el administrador)</p>
                  </div>
              )}
            </section>

            {definicion.lecturaFacil && (
              <section aria-labelledby="lf-titulo" className="rounded-lg border border-primary/30 bg-blue-50/40 p-4">
                <h3 id="lf-titulo" className="text-sm font-bold">Resumen de lectura fácil (obligatorio, máx. 140 caracteres por campo)</h3>
                {(["queEs", "queNecesito", "dondeSeHace"] as const).map((k) => {
                  const resumen = (form["resumen"] as Record<string, string> | undefined) ?? {};
                  const v = String(resumen[k] ?? "");
                  const etiquetas = { queEs: "Qué es", queNecesito: "Qué necesito", dondeSeHace: "Dónde se hace" } as const;
                  return (
                    <label key={k} className="mt-2 block text-xs font-semibold">{etiquetas[k]} ({v.length}/140)
                      <textarea
                        value={v}
                        rows={2}
                        onChange={(e) => { setForm((f) => escribirRuta(f, `resumen.${k}`, e.target.value)); setSucio(true); }}
                        className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-2 py-2 text-sm"
                      />
                    </label>
                  );
                })}
              </section>
            )}

            {grupos.map((g) => {
              const abierto = gruposAbiertos[g.nombre] ?? true;
              return (
                <section key={g.nombre} className="rounded-lg border border-neutral-200" aria-label={`Grupo ${g.nombre}`}>
                  <button
                    type="button"
                    onClick={() => setGruposAbiertos((s) => ({ ...s, [g.nombre]: !abierto }))}
                    aria-expanded={abierto}
                    className="flex min-h-[44px] w-full items-center justify-between px-4 text-left"
                  >
                    <span className="text-sm font-bold">{g.nombre}</span>
                    <span aria-hidden="true">{abierto ? "−" : "+"}</span>
                  </button>
                  {abierto && (
                    <div className="space-y-3 border-t border-neutral-100 p-4">
                      {g.campos.map((c) => (
                        <CampoDef key={c.clave} def={c} form={form} onCambio={setCampo} />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}

            {definicion.bloques && (
              <BloquesEditor valor={bloques} onCambio={(b) => { setBloques(b); setSucio(true); }} />
            )}

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
          <button type="button" onClick={eliminar} disabled={soloLectura} title={motivoSoloLectura} className="inline-flex min-h-[44px] items-center rounded-md px-3 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60">
            Archivar
          </button>
          <span className="flex-1" />
          <span role="status" aria-live="polite" className="text-xs text-neutral-500">
            {autoGuardando
              ? "Guardando borrador…"
              : ultimoGuardado
                ? `Borrador guardado ${ultimoGuardado}${sucio ? " · cambios sin guardar" : ""}`
                : sucio ? "Cambios sin guardar" : "Sin cambios"}
          </span>
          <span className="text-xs text-neutral-500">Actúas como {ETIQUETAS_ROL[rol].nombre}</span>
          <button type="button" onClick={intentarCerrar} className="inline-flex min-h-[44px] items-center rounded-md bg-neutral-200 px-4 text-sm font-semibold">Cancelar</button>
          <button type="button" onClick={() => guardar(true)} disabled={guardando || !puedeEditar || soloLectura} title={soloLectura ? ERROR_SOLO_LECTURA_UI : !puedeEditar ? motivoDenegacion(rol, "editar") : undefined} aria-label={soloLectura ? `Guardar borrador. ${ERROR_SOLO_LECTURA_UI}` : undefined} className="inline-flex min-h-[44px] items-center rounded-md bg-neutral-200 px-4 text-sm font-semibold disabled:opacity-60">
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

export { escribirRuta };
