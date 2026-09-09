"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Coleccion, RegistroEditorial } from "@/lib/cms/tipos-editoriales";

export type Rol = "administrador" | "editor" | "validador" | "consulta";

export const ROLES: Rol[] = ["administrador", "editor", "validador", "consulta"];

export const ETIQUETAS_ROL: Record<Rol, { nombre: string; descripcion: string }> = {
  administrador: { nombre: "Administrador", descripcion: "Todo, incluida configuración y usuarios." },
  editor: { nombre: "Editor de área", descripcion: "Crea y edita contenidos de su área; envía a revisión." },
  validador: { nombre: "Validador", descripcion: "Revisa, aprueba, publica y devuelve con comentarios." },
  consulta: { nombre: "Consulta", descripcion: "Solo lectura y descarga de informes." },
};

export type Accion =
  | "ver"
  | "crear"
  | "editar"
  | "enviar"
  | "aprobar"
  | "publicar"
  | "despublicar"
  | "archivar"
  | "eliminar"
  | "revisar_docs"
  | "gestionar_usuarios"
  | "gestionar_config";

export const ACCIONES: Accion[] = [
  "ver", "crear", "editar", "enviar", "aprobar", "publicar",
  "despublicar", "archivar", "eliminar", "revisar_docs",
  "gestionar_usuarios", "gestionar_config",
];

export const ETIQUETAS_ACCION: Record<Accion, string> = {
  ver: "Ver",
  crear: "Crear",
  editar: "Editar",
  enviar: "Enviar a revisión",
  aprobar: "Aprobar",
  publicar: "Publicar",
  despublicar: "Despublicar",
  archivar: "Archivar",
  eliminar: "Eliminar",
  revisar_docs: "Revisar documentos",
  gestionar_usuarios: "Gestionar usuarios",
  gestionar_config: "Gestionar configuración",
};

/** Matriz permisos: rol → colección ('*' = todas) → acción → permitido. */
export type Matriz = Record<Rol, Record<string, Record<Accion, boolean>>>;

function fila(permiso: Partial<Record<Accion, boolean>>): Record<Accion, boolean> {
  const base: Record<Accion, boolean> = {
    ver: false, crear: false, editar: false, enviar: false, aprobar: false,
    publicar: false, despublicar: false, archivar: false, eliminar: false,
    revisar_docs: false, gestionar_usuarios: false, gestionar_config: false,
  };
  return { ...base, ...permiso };
}

const TODO = { ver: true, crear: true, editar: true, enviar: true, aprobar: true, publicar: true, despublicar: true, archivar: true, eliminar: true, revisar_docs: true, gestionar_usuarios: true, gestionar_config: true } as const;

export const MATRIZ_DEFAULT: Matriz = {
  administrador: { "*": fila({ ...TODO }) },
  editor: {
    "*": fila({ ver: true, crear: true, editar: true, enviar: true }),
    usuarios: fila({}),
    menus: fila({ ver: true }),
    vocabularios: fila({ ver: true }),
    enlaces: fila({ ver: true }),
  },
  validador: {
    "*": fila({ ver: true, editar: true, enviar: true, aprobar: true, publicar: true, despublicar: true, archivar: true, revisar_docs: true }),
    usuarios: fila({ ver: true }),
  },
  consulta: {
    "*": fila({ ver: true }),
  },
};

export type UsuarioDemo = { nombre: string; rol: Rol; areaId: string | null };

export const USUARIOS_DEMO: UsuarioDemo[] = [
  { nombre: "A. Martín (Administradora)", rol: "administrador", areaId: null },
  { nombre: "M. Hernández (Editor, Urbanismo)", rol: "editor", areaId: "urbanismo" },
  { nombre: "J. Pérez (Editor, Hacienda)", rol: "editor", areaId: "hacienda" },
  { nombre: "C. Ruiz (Editora, Bienestar Social)", rol: "editor", areaId: "bienestar-social" },
  { nombre: "R. Sosa (Validadora)", rol: "validador", areaId: null },
  { nombre: "P. León (Consulta)", rol: "consulta", areaId: null },
];

export function puede(
  matriz: Matriz,
  rol: Rol,
  accion: Accion,
  coleccion: string,
  registro?: RegistroEditorial<unknown> | null,
  areaUsuario?: string | null,
): boolean {
  const porRol = matriz[rol];
  if (!porRol) return false;
  const filaCol = porRol[coleccion] ?? porRol["*"];
  if (!filaCol || !filaCol[accion]) return false;
  // Granularidad por contenido: el editor de área solo actúa sobre su área.
  if (rol === "editor" && registro && areaUsuario && ["editar", "enviar", "crear"].includes(accion)) {
    if (registro.areaId !== areaUsuario) return false;
  }
  return true;
}

export function motivoDenegacion(rol: Rol, accion: Accion): string {
  const perfil =
    accion === "publicar" || accion === "aprobar" || accion === "despublicar"
      ? "validación"
      : accion === "gestionar_usuarios" || accion === "gestionar_config"
        ? "administración"
        : "edición";
  return `${ETIQUETAS_ROL[rol].nombre}: se requiere perfil de ${perfil} para ${ETIQUETAS_ACCION[accion].toLowerCase()}.`;
}

type Seccion = { id: string; titulo: string; href: string; coleccion: Coleccion | string; Icono?: unknown };

type ContextoRol = {
  rol: Rol;
  setRol: (r: Rol) => void;
  usuario: UsuarioDemo;
  matriz: Matriz;
  setMatriz: (m: Matriz) => void;
  puede: (accion: Accion, coleccion: string, registro?: RegistroEditorial<unknown> | null) => boolean;
  seccionesVisibles: <S extends Seccion>(secciones: S[]) => S[];
};

const Ctx = createContext<ContextoRol | null>(null);

const CLAVE_ROL = "admin-rol-demo";

export function RolProvider({ children }: { children: React.ReactNode }) {
  const [rol, setRolEstado] = useState<Rol>("administrador");
  const [matriz, setMatriz] = useState<Matriz>(MATRIZ_DEFAULT);

  useEffect(() => {
    try {
      const g = localStorage.getItem(CLAVE_ROL) as Rol | null;
      if (g && ROLES.includes(g)) setRolEstado(g);
    } catch { /* sin almacenamiento: rol por defecto */ }
  }, []);

  const setRol = useCallback((r: Rol) => {
    setRolEstado(r);
    try { localStorage.setItem(CLAVE_ROL, r); } catch { /* solo preferencia UI */ }
  }, []);

  const usuario = useMemo(
    () => USUARIOS_DEMO.find((u) => u.rol === rol) ?? USUARIOS_DEMO[0],
    [rol],
  );

  const fnPuede = useCallback(
    (accion: Accion, coleccion: string, registro?: RegistroEditorial<unknown> | null) =>
      puede(matriz, rol, accion, coleccion, registro, usuario.areaId),
    [matriz, rol, usuario],
  );

  const seccionesVisibles = useCallback(
    <S extends Seccion>(secciones: S[]) => secciones.filter((s) => puede(matriz, rol, "ver", s.coleccion, null, usuario.areaId)),
    [matriz, rol, usuario],
  );

  const valor = useMemo(
    () => ({ rol, setRol, usuario, matriz, setMatriz, puede: fnPuede, seccionesVisibles }),
    [rol, setRol, usuario, matriz, fnPuede, seccionesVisibles],
  );
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useRol(): ContextoRol {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRol debe usarse dentro de RolProvider");
  return ctx;
}
