import type { DefColeccion } from "../definiciones";

export const DEF_AYUDAS: DefColeccion = {
  coleccion: "ayudas",
  titulo: "Ayudas y subvenciones",
  tituloTipo: "Ayuda",
  descripcion: "Ayudas con plazos, requisitos, cuantía y bases.",
  hrefNuevo: "/admin/ayudas",
  lecturaFacil: true,
  bloques: true,
  tituloRutas: ["titulo", "tituloOficial"],
  campos: [
    { clave: "titulo", etiqueta: "Título en lenguaje claro", tipo: "texto", obligatorio: true, grupo: "Identificación" },
    { clave: "tituloOficial", etiqueta: "Título oficial", tipo: "texto", grupo: "Identificación" },
    { clave: "descripcion", etiqueta: "Descripción", tipo: "texto_largo", obligatorio: true, grupo: "Contenido" },
    {
      clave: "destinatario", etiqueta: "Destinatario", tipo: "vocabulario",
      vocabulario: { tipo: "fija", opciones: [
        { valor: "particulares", etiqueta: "Particulares" }, { valor: "familias", etiqueta: "Familias" },
        { valor: "empresas", etiqueta: "Empresas" }, { valor: "asociaciones", etiqueta: "Asociaciones" },
      ] }, grupo: "Clasificación",
    },
    {
      clave: "estado", etiqueta: "Convocatoria", tipo: "vocabulario",
      vocabulario: { tipo: "fija", opciones: [{ valor: "abierta", etiqueta: "Abierta" }, { valor: "cerrada", etiqueta: "Cerrada" }] },
      grupo: "Plazos",
    },
    { clave: "finPlazoISO", etiqueta: "Fin de plazo", tipo: "fecha", grupo: "Plazos" },
    { clave: "requisitos", etiqueta: "Requisitos", tipo: "lista_textos", grupo: "Contenido" },
    { clave: "documentacion", etiqueta: "Documentación", tipo: "lista_textos", grupo: "Contenido" },
    { clave: "comoSeHace", etiqueta: "Cómo se solicita (pasos)", tipo: "lista_textos", grupo: "Contenido" },
    { clave: "cuantia", etiqueta: "Cuantía", tipo: "importe", grupo: "Plazos" },
    { clave: "plazoResolucion", etiqueta: "Plazo de resolución", tipo: "texto", grupo: "Plazos" },
    { clave: "bases.titulo", etiqueta: "Bases: título", tipo: "texto", grupo: "Bases" },
    { clave: "bases.href", etiqueta: "Bases: enlace", tipo: "enlace_externo", grupo: "Bases" },
    { clave: "areaId", etiqueta: "Área responsable", tipo: "vocabulario", vocabulario: { tipo: "areas" }, obligatorio: true, grupo: "Clasificación" },
    { clave: "relacionadas", etiqueta: "Ayudas relacionadas", tipo: "referencia_multiple", referenciaA: "ayudas", grupo: "Relaciones" },
    { clave: "fechaActualizacion", etiqueta: "Fecha de actualización", tipo: "fecha", grupo: "Clasificación" },
  ],
  filtros: [
    { id: "area", etiqueta: "Área", tipo: "vocabulario", vocabulario: { tipo: "areas" }, ruta: "areaId" },
    { id: "estado", etiqueta: "Estado", tipo: "estado" },
    { id: "atencion", etiqueta: "Necesita atención", tipo: "necesita_atencion" },
  ],
  columnas: [
    { id: "titulo", encabezado: "Título", tipo: "titulo", subtituloRuta: "tituloOficial" },
    { id: "estado", encabezado: "Estado", tipo: "estado" },
    { id: "propietario", encabezado: "Propietario", tipo: "propietario" },
    { id: "plazo", encabezado: "Fin de plazo", tipo: "fecha", ruta: "finPlazoISO" },
  ],
};
