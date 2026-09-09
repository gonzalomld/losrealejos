"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AREAS } from "@/data/areas";
import {
  CANALES, ETIQUETAS_CANAL, ETIQUETAS_PERFIL, ETIQUETAS_TEMA,
  PERFILES, TEMAS,
} from "@/data/vocabularios";
import type { DefCampo, FuenteVocabulario } from "@/lib/cms/definiciones";
import { escribirRuta, leerRuta } from "@/lib/cms/definiciones";

function opcionesDe(fuente: FuenteVocabulario): { valor: string; etiqueta: string }[] {
  switch (fuente.tipo) {
    case "temas": return TEMAS.map((t) => ({ valor: t, etiqueta: ETIQUETAS_TEMA[t] }));
    case "canales": return CANALES.map((c) => ({ valor: c, etiqueta: ETIQUETAS_CANAL[c] }));
    case "perfiles": return PERFILES.map((p) => ({ valor: p, etiqueta: ETIQUETAS_PERFIL[p] }));
    case "areas": return AREAS.map((a) => ({ valor: a.id, etiqueta: a.nombre }));
    case "fija": return fuente.opciones;
  }
}

const inputCls = "mt-1 min-h-[44px] w-full rounded-md border border-neutral-300 px-2 text-sm";

/**
 * Dibuja un campo de la definición. Soporta los 13 tipos:
 * texto, texto_largo, enriquecido, lista_textos, vocabulario,
 * vocabulario_multiple, fecha, booleano, referencia, referencia_multiple,
 * importe, enlace_externo y adjunto.
 */
export function CampoDef<T extends Record<string, unknown>>({
  def,
  form,
  onCambio,
}: {
  def: DefCampo;
  form: T;
  onCambio: (clave: string, valor: unknown) => void;
}) {
  const valor = leerRuta(form, def.clave);

  switch (def.tipo) {
    case "texto":
    case "importe":
      return (
        <label className="block text-xs font-semibold">{def.etiqueta}{def.obligatorio ? " *" : ""}
          <input
            value={typeof valor === "string" ? valor : (valor ?? "") as string}
            onChange={(e) => onCambio(def.clave, e.target.value)}
            placeholder={def.placeholder}
            aria-required={def.obligatorio || undefined}
            className={inputCls}
          />
          {def.ayuda && <span className="mt-0.5 block font-normal text-neutral-500">{def.ayuda}</span>}
        </label>
      );
    case "texto_largo":
    case "enriquecido":
      return (
        <label className="block text-xs font-semibold">{def.etiqueta}{def.obligatorio ? " *" : ""}
          <textarea
            value={typeof valor === "string" ? valor : ""}
            onChange={(e) => onCambio(def.clave, e.target.value)}
            rows={def.tipo === "enriquecido" ? 6 : 4}
            placeholder={def.tipo === "enriquecido" ? "Negrita con **texto**, cursiva con *texto*, listas con -" : def.placeholder}
            aria-required={def.obligatorio || undefined}
            className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-2 text-sm"
          />
          {def.ayuda && <span className="mt-0.5 block font-normal text-neutral-500">{def.ayuda}</span>}
        </label>
      );
    case "fecha":
      return (
        <label className="block text-xs font-semibold">{def.etiqueta}
          <input
            type="date"
            value={typeof valor === "string" ? valor.slice(0, 10) : ""}
            onChange={(e) => onCambio(def.clave, e.target.value || null)}
            className={inputCls}
          />
        </label>
      );
    case "booleano":
      return (
        <label className="flex min-h-[44px] items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            checked={valor === true}
            onChange={(e) => onCambio(def.clave, e.target.checked)}
            className="h-5 w-5"
          />
          {def.etiqueta}
        </label>
      );
    case "vocabulario": {
      const opciones = def.vocabulario ? opcionesDe(def.vocabulario) : [];
      return (
        <label className="block text-xs font-semibold">{def.etiqueta}{def.obligatorio ? " *" : ""}
          <select
            value={typeof valor === "string" ? valor : ""}
            onChange={(e) => onCambio(def.clave, e.target.value)}
            aria-required={def.obligatorio || undefined}
            className={`${inputCls} bg-white`}
          >
            <option value="">— Sin asignar —</option>
            {opciones.map((o) => (<option key={o.valor} value={o.valor}>{o.etiqueta}</option>))}
          </select>
        </label>
      );
    }
    case "vocabulario_multiple": {
      const opciones = def.vocabulario ? opcionesDe(def.vocabulario) : [];
      const lista = Array.isArray(valor) ? (valor as string[]) : [];
      return (
        <fieldset className="rounded-md border border-neutral-200 p-2">
          <legend className="px-1 text-xs font-semibold">{def.etiqueta}</legend>
          <div className="grid gap-0 sm:grid-cols-2">
            {opciones.map((o) => (
              <label key={o.valor} className="flex min-h-[44px] items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={lista.includes(o.valor)}
                  onChange={(e) => onCambio(def.clave, e.target.checked ? [...lista, o.valor] : lista.filter((x) => x !== o.valor))}
                  className="h-5 w-5"
                />
                {o.etiqueta}
              </label>
            ))}
          </div>
        </fieldset>
      );
    }
    case "lista_textos":
      return (
        <ListaTextosGen
          titulo={def.etiqueta}
          valores={Array.isArray(valor) ? (valor as unknown[]).map((x) => String(x)) : []}
          ayuda={def.ayuda}
          onCambio={(v) => onCambio(def.clave, v)}
        />
      );
    case "referencia": {
      const ref = typeof valor === "string" ? valor : "";
      return (
        <label className="block text-xs font-semibold">{def.etiqueta}
          <input
            value={ref}
            onChange={(e) => onCambio(def.clave, e.target.value)}
            placeholder={`Identificador en ${def.referenciaA ?? "la colección"}`}
            className={inputCls}
          />
        </label>
      );
    }
    case "referencia_multiple":
      return (
        <ListaTextosGen
          titulo={def.etiqueta}
          valores={Array.isArray(valor) ? (valor as unknown[]).map((x) => String(x)) : []}
          ayuda={`Identificadores en ${def.referenciaA ?? "la colección"}, uno por línea.`}
          onCambio={(v) => onCambio(def.clave, v)}
        />
      );
    case "enlace_externo": {
      const obj = (valor != null && typeof valor === "object" ? valor : {}) as Record<string, unknown>;
      const url = typeof valor === "string" ? valor : String(obj["url"] ?? obj["href"] ?? "");
      return (
        <label className="block text-xs font-semibold">{def.etiqueta}
          <input
            value={url}
            onChange={(e) => {
              if (typeof valor === "string" || valor == null) onCambio(def.clave, e.target.value);
              else onCambio(def.clave, { ...obj, url: e.target.value });
            }}
            inputMode="url"
            placeholder="https://…"
            className={inputCls}
          />
        </label>
      );
    }
    case "adjunto": {
      const arr = Array.isArray(valor) ? (valor as Record<string, unknown>[]) : [];
      return <AdjuntosGen titulo={def.etiqueta} valores={arr} onCambio={(v) => onCambio(def.clave, v)} />;
    }
  }
}

function ListaTextosGen({ titulo, valores, ayuda, onCambio }: { titulo: string; valores: string[]; ayuda?: string; onCambio: (v: string[]) => void }) {
  const [nuevo, setNuevo] = useState("");
  function anadir() {
    if (!nuevo.trim()) return;
    onCambio([...valores, nuevo.trim()]);
    setNuevo("");
  }
  return (
    <fieldset className="rounded-md border border-neutral-200 p-2">
      <legend className="px-1 text-xs font-semibold">{titulo} ({valores.length})</legend>
      {ayuda && <p className="text-xs text-neutral-500">{ayuda}</p>}
      <ul className="mt-1 space-y-1">
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
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); anadir(); } }}
          placeholder="Añadir y pulsar Enter…"
          aria-label={`Añadir a ${titulo}`}
          className="min-h-[44px] flex-1 rounded-md border border-neutral-300 px-2 text-sm"
        />
        <button type="button" onClick={anadir} className="min-h-[44px] rounded-md bg-neutral-200 px-3 text-sm font-semibold">
          Añadir
        </button>
      </div>
    </fieldset>
  );
}

function AdjuntosGen({ titulo, valores, onCambio }: { titulo: string; valores: Record<string, unknown>[]; onCambio: (v: Record<string, unknown>[]) => void }) {
  const [nombre, setNombre] = useState("");
  const [url, setUrl] = useState("");
  // Soporta string[] (cuerpo, pasos) y {titulo,url}[] (normativa): aquí objetos.
  const comoTexto = valores.map((v) => (typeof v === "string" ? v : String((v as Record<string, unknown>)["titulo"] ?? "")));
  void comoTexto;
  return (
    <fieldset className="rounded-md border border-neutral-200 p-2">
      <legend className="px-1 text-xs font-semibold">{titulo} ({valores.length})</legend>
      <ul className="space-y-1">
        {valores.map((n, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="flex-1 rounded bg-neutral-50 px-2 py-2">
              {typeof n === "string" ? n : `${String(n["titulo"] ?? "")}${n["url"] ? ` — ${String(n["url"])}` : ""}`}
            </span>
            <button
              type="button"
              onClick={() => onCambio(valores.filter((_, j) => j !== i))}
              aria-label={`Eliminar adjunto ${i + 1}`}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-red-700 hover:bg-red-50"
            >
              <X aria-hidden="true" size={15} />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-1 grid gap-1 sm:grid-cols-[1fr_1fr_auto]">
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Título del documento" aria-label="Título del documento" className="min-h-[44px] rounded-md border border-neutral-300 px-2 text-sm" />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL (opcional)" aria-label="URL del documento" inputMode="url" className="min-h-[44px] rounded-md border border-neutral-300 px-2 text-sm" />
        <button
          type="button"
          onClick={() => { if (nombre.trim()) { onCambio([...valores, { titulo: nombre.trim(), ...(url.trim() ? { url: url.trim() } : {}) }]); setNombre(""); setUrl(""); } }}
          className="min-h-[44px] rounded-md bg-neutral-200 px-3 text-sm font-semibold"
        >
          Añadir
        </button>
      </div>
    </fieldset>
  );
}

export { escribirRuta };
