import type { DefColeccion } from "../definiciones";

const COMUN_DOC: DefColeccion["campos"] = [
  { clave: "titulo", etiqueta: "Título", tipo: "texto", obligatorio: true, grupo: "Identificación" },
  { clave: "descripcion", etiqueta: "Descripción", tipo: "texto_largo", grupo: "Contenido" },
  {
    clave: "formato", etiqueta: "Formato", tipo: "vocabulario",
    vocabulario: { tipo: "fija", opciones: [
      { valor: "PDF", etiqueta: "PDF" }, { valor: "CSV", etiqueta: "CSV" },
      { valor: "ODS", etiqueta: "ODS" }, { valor: "DOC", etiqueta: "DOC" },
    ] }, grupo: "Metadatos",
  },
  { clave: "tamano", etiqueta: "Tamaño", tipo: "texto", grupo: "Metadatos" },
  { clave: "fechaPublicacion", etiqueta: "Fecha de publicación", tipo: "fecha", grupo: "Metadatos" },
  { clave: "ejercicio", etiqueta: "Ejercicio", tipo: "texto", placeholder: "2026 o 2026-T2", ayuda: "Sin ejercicio el documento cuenta como hallazgo de calidad.", grupo: "Metadatos" },
  { clave: "abierto", etiqueta: "Formato reutilizable (dato abierto)", tipo: "booleano", grupo: "Metadatos" },
];

/**
 * Documentos y transparencia comparten el estado de revisión de datos
 * con la cola de anonimización: el flujo es continuo entre ambas pantallas
 * (misma colección documental, distinto punto de entrada).
 */
export const DEF_DOCUMENTOS: DefColeccion = {
  coleccion: "documentos",
  titulo: "Biblioteca de documentos",
  tituloTipo: "Documento",
  descripcion: "Documentos con formato, ejercicio y estado de revisión de datos personales.",
  hrefNuevo: "/admin/documentos",
  lecturaFacil: false,
  bloques: false,
  tituloRutas: ["titulo"],
  campos: COMUN_DOC,
  filtros: [
    { id: "formato", etiqueta: "Formato", tipo: "texto_libre" },
    { id: "estado", etiqueta: "Estado", tipo: "estado" },
    { id: "atencion", etiqueta: "Necesita atención", tipo: "necesita_atencion" },
  ],
  columnas: [
    { id: "titulo", encabezado: "Título", tipo: "titulo", subtituloRuta: "descripcion" },
    { id: "estado", encabezado: "Estado", tipo: "estado" },
    { id: "propietario", encabezado: "Propietario", tipo: "propietario" },
    { id: "ejercicio", encabezado: "Ejercicio", tipo: "texto", ruta: "ejercicio" },
  ],
};

export const DEF_TRANSPARENCIA: DefColeccion = {
  coleccion: "transparencia",
  titulo: "Transparencia",
  tituloTipo: "Documento de transparencia",
  descripcion: "Los seis bloques de publicidad activa.",
  hrefNuevo: "/admin/transparencia",
  lecturaFacil: false,
  bloques: false,
  tituloRutas: ["titulo"],
  campos: [
    ...COMUN_DOC,
    {
      clave: "bloque", etiqueta: "Bloque de transparencia", tipo: "vocabulario",
      vocabulario: { tipo: "fija", opciones: [
        { valor: "institucional", etiqueta: "Institucional y organizativa" },
        { valor: "empleo-personal", etiqueta: "Empleo público y personal" },
        { valor: "economica", etiqueta: "Económico-financiera" },
        { valor: "contratacion", etiqueta: "Contratación y convenios" },
        { valor: "servicios-urbanismo", etiqueta: "Servicios y urbanismo" },
        { valor: "datos-planificacion", etiqueta: "Datos y planificación" },
      ] }, grupo: "Clasificación",
    },
  ],
  filtros: [
    { id: "bloque", etiqueta: "Bloque", tipo: "texto_libre" },
    { id: "formato", etiqueta: "Formato", tipo: "texto_libre" },
    { id: "estado", etiqueta: "Estado", tipo: "estado" },
    { id: "atencion", etiqueta: "Necesita atención", tipo: "necesita_atencion" },
  ],
  columnas: [
    { id: "titulo", encabezado: "Título", tipo: "titulo", subtituloRuta: "descripcion" },
    { id: "estado", encabezado: "Estado", tipo: "estado" },
    { id: "propietario", encabezado: "Propietario", tipo: "propietario" },
    { id: "ejercicio", encabezado: "Ejercicio", tipo: "texto", ruta: "ejercicio" },
  ],
};
