import type { DefColeccion } from "../definiciones";

export const DEF_AVISOS: DefColeccion = {
  coleccion: "avisos",
  titulo: "Avisos y plazos",
  tituloTipo: "Aviso",
  descripcion: "Avisos puntuales y con plazo de solicitud.",
  hrefNuevo: "/admin/avisos",
  lecturaFacil: false,
  bloques: false,
  tituloRutas: ["titulo"],
  campos: [
    { clave: "titulo", etiqueta: "Título", tipo: "texto", obligatorio: true, grupo: "Identificación" },
    { clave: "descripcion", etiqueta: "Descripción", tipo: "texto_largo", obligatorio: true, grupo: "Contenido" },
    {
      clave: "tipo", etiqueta: "Tipo de aviso", tipo: "vocabulario",
      vocabulario: { tipo: "fija", opciones: [
        { valor: "empleo", etiqueta: "Empleo público" }, { valor: "ayuda", etiqueta: "Ayuda con plazo" },
        { valor: "corte-agua", etiqueta: "Corte de agua" }, { valor: "meteorologia", etiqueta: "Aviso del tiempo" },
        { valor: "otro", etiqueta: "Aviso" },
      ] }, grupo: "Clasificación",
    },
    { clave: "finPlazoISO", etiqueta: "Fin de plazo (solo avisos con plazo)", tipo: "fecha", grupo: "Fechas" },
    { clave: "fechaHechoISO", etiqueta: "Fecha del hecho (solo avisos puntuales)", tipo: "fecha", grupo: "Fechas" },
    { clave: "enlace", etiqueta: "Enlace relacionado", tipo: "enlace_externo", grupo: "Contenido" },
    { clave: "enlaceTexto", etiqueta: "Texto del enlace", tipo: "texto", grupo: "Contenido" },
  ],
  filtros: [
    { id: "estado", etiqueta: "Estado", tipo: "estado" },
    { id: "atencion", etiqueta: "Necesita atención", tipo: "necesita_atencion" },
  ],
  columnas: [
    { id: "titulo", encabezado: "Título", tipo: "titulo", subtituloRuta: "descripcion" },
    { id: "estado", encabezado: "Estado", tipo: "estado" },
    { id: "propietario", encabezado: "Propietario", tipo: "propietario" },
    { id: "fecha", encabezado: "Fecha", tipo: "fecha", ruta: "finPlazoISO" },
  ],
};
