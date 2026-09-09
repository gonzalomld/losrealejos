import type { DefColeccion } from "../definiciones";

export const DEF_PAGINAS: DefColeccion = {
  coleccion: "paginas",
  titulo: "Páginas y campañas",
  tituloTipo: "Página",
  descripcion: "Páginas y microsites de campaña.",
  hrefNuevo: "/admin/paginas",
  lecturaFacil: false,
  bloques: true,
  tituloRutas: ["titulo"],
  campos: [
    { clave: "titulo", etiqueta: "Título", tipo: "texto", obligatorio: true, grupo: "Identificación" },
    { clave: "descripcion", etiqueta: "Descripción", tipo: "texto_largo", grupo: "Contenido" },
    { clave: "areaId", etiqueta: "Área responsable", tipo: "vocabulario", vocabulario: { tipo: "areas" }, grupo: "Clasificación" },
    { clave: "fechaActualizacion", etiqueta: "Fecha de actualización", tipo: "fecha", grupo: "Clasificación" },
  ],
  filtros: [
    { id: "estado", etiqueta: "Estado", tipo: "estado" },
    { id: "atencion", etiqueta: "Necesita atención", tipo: "necesita_atencion" },
  ],
  columnas: [
    { id: "titulo", encabezado: "Título", tipo: "titulo" },
    { id: "estado", encabezado: "Estado", tipo: "estado" },
    { id: "propietario", encabezado: "Propietario", tipo: "propietario" },
    { id: "revision", encabezado: "Última revisión", tipo: "revision" },
  ],
};
