import type { DefColeccion } from "../definiciones";

export const DEF_EMPLEO: DefColeccion = {
  coleccion: "empleo",
  titulo: "Empleo público",
  tituloTipo: "Convocatoria",
  descripcion: "Convocatorias, bolsas y procesos de selección.",
  hrefNuevo: "/admin/empleo",
  lecturaFacil: false,
  bloques: true,
  tituloRutas: ["titulo"],
  campos: [
    { clave: "titulo", etiqueta: "Título", tipo: "texto", obligatorio: true, grupo: "Identificación" },
    { clave: "descripcion", etiqueta: "Descripción", tipo: "texto_largo", obligatorio: true, grupo: "Contenido" },
    { clave: "plazas", etiqueta: "Plazas", tipo: "texto", grupo: "Convocatoria" },
    {
      clave: "estado", etiqueta: "Estado de la convocatoria", tipo: "vocabulario",
      vocabulario: { tipo: "fija", opciones: [{ valor: "abierta", etiqueta: "Abierta" }, { valor: "cerrada", etiqueta: "Cerrada" }] },
      grupo: "Convocatoria",
    },
    { clave: "finPlazoISO", etiqueta: "Fin de plazo", tipo: "fecha", grupo: "Convocatoria" },
    { clave: "bases", etiqueta: "Bases", tipo: "texto", grupo: "Convocatoria" },
    { clave: "areaId", etiqueta: "Área responsable", tipo: "vocabulario", vocabulario: { tipo: "areas" }, grupo: "Clasificación" },
  ],
  filtros: [
    { id: "estado", etiqueta: "Estado", tipo: "estado" },
    { id: "atencion", etiqueta: "Necesita atención", tipo: "necesita_atencion" },
  ],
  columnas: [
    { id: "titulo", encabezado: "Título", tipo: "titulo", subtituloRuta: "plazas" },
    { id: "estado", encabezado: "Estado", tipo: "estado" },
    { id: "propietario", encabezado: "Propietario", tipo: "propietario" },
    { id: "plazo", encabezado: "Fin de plazo", tipo: "fecha", ruta: "finPlazoISO" },
  ],
};
