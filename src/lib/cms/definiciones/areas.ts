import type { DefColeccion } from "../definiciones";

export const DEF_AREAS: DefColeccion = {
  coleccion: "areas",
  titulo: "Áreas municipales",
  tituloTipo: "Área",
  descripcion: "Las 19 áreas con responsable y contacto.",
  hrefNuevo: null,
  lecturaFacil: false,
  bloques: false,
  tituloRutas: ["nombre"],
  campos: [
    { clave: "nombre", etiqueta: "Nombre", tipo: "texto", obligatorio: true, grupo: "Identificación" },
    { clave: "descripcion", etiqueta: "Descripción", tipo: "texto_largo", grupo: "Contenido" },
    { clave: "responsable", etiqueta: "Persona o puesto responsable", tipo: "texto", grupo: "Contacto" },
    { clave: "telefono", etiqueta: "Teléfono", tipo: "texto", grupo: "Contacto" },
    { clave: "correo", etiqueta: "Correo", tipo: "texto", grupo: "Contacto" },
    { clave: "ubicacion", etiqueta: "Ubicación", tipo: "texto", grupo: "Contacto" },
    { clave: "tramiteIds", etiqueta: "Trámites asignados", tipo: "referencia_multiple", referenciaA: "tramites", grupo: "Relaciones" },
  ],
  filtros: [
    { id: "estado", etiqueta: "Estado", tipo: "estado" },
    { id: "atencion", etiqueta: "Necesita atención", tipo: "necesita_atencion" },
  ],
  columnas: [
    { id: "titulo", encabezado: "Nombre", tipo: "titulo", subtituloRuta: "responsable" },
    { id: "estado", encabezado: "Estado", tipo: "estado" },
    { id: "propietario", encabezado: "Propietario", tipo: "propietario" },
    { id: "revision", encabezado: "Última revisión", tipo: "revision" },
  ],
};
