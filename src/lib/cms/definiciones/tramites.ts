import type { DefColeccion } from "../definiciones";

/**
 * Trámites: la colección ejemplar (9 campos del pliego + propios).
 * El editor se dibuja recorriendo `campos`: cambiar esta lista cambia el
 * formulario sin tocar EditorModal.
 */
export const DEF_TRAMITES: DefColeccion = {
  coleccion: "tramites",
  titulo: "Trámites",
  tituloTipo: "Trámite",
  descripcion:
    "La colección más importante. Fecha de última revisión siempre visible; indicador cuando supera su periodicidad acordada.",
  hrefNuevo: "/admin/tramites",
  lecturaFacil: true,
  bloques: true,
  tituloRutas: ["tituloClaro", "tituloOficial"],
  campos: [
    { clave: "tituloClaro", etiqueta: "Nombre en lenguaje claro", tipo: "texto", obligatorio: true, grupo: "Identificación" },
    { clave: "tituloOficial", etiqueta: "Nombre oficial", tipo: "texto", obligatorio: true, grupo: "Identificación" },
    { clave: "descripcion", etiqueta: "Descripción", tipo: "texto_largo", obligatorio: true, grupo: "Contenido" },
    { clave: "requisitos", etiqueta: "Requisitos", tipo: "lista_textos", grupo: "Contenido" },
    { clave: "documentacion", etiqueta: "Documentación que hay que llevar", tipo: "lista_textos", grupo: "Contenido" },
    { clave: "canales", etiqueta: "Canales", tipo: "vocabulario_multiple", vocabulario: { tipo: "canales" }, grupo: "Tramitación" },
    { clave: "presencial.nombre", etiqueta: "Lugar presencial: nombre", tipo: "texto", grupo: "Tramitación" },
    { clave: "presencial.direccion", etiqueta: "Lugar presencial: dirección", tipo: "texto", grupo: "Tramitación" },
    { clave: "presencial.telefono", etiqueta: "Lugar presencial: teléfono", tipo: "texto", grupo: "Tramitación" },
    { clave: "plazoResolucion", etiqueta: "Plazo de resolución", tipo: "texto", grupo: "Plazos y tasas" },
    { clave: "silencio", etiqueta: "Sentido del silencio", tipo: "texto", placeholder: "Estimatorio, desestimatorio o no aplica", grupo: "Plazos y tasas" },
    { clave: "tasa", etiqueta: "Tasas", tipo: "importe", grupo: "Plazos y tasas" },
    { clave: "tasaGratuita", etiqueta: "Trámite gratuito", tipo: "booleano", grupo: "Plazos y tasas" },
    { clave: "normativa", etiqueta: "Normativa", tipo: "adjunto", grupo: "Plazos y tasas" },
    { clave: "sedeUrl", etiqueta: "Enlace al procedimiento de la Sede", tipo: "enlace_externo", grupo: "Tramitación" },
    { clave: "comoSeHace", etiqueta: "Cómo se hace (pasos)", tipo: "lista_textos", ayuda: "Un paso por línea, en orden.", grupo: "Contenido" },
    { clave: "identificacion", etiqueta: "Medio de identificación", tipo: "texto", grupo: "Tramitación" },
    { clave: "areaId", etiqueta: "Área responsable", tipo: "vocabulario", vocabulario: { tipo: "areas" }, obligatorio: true, grupo: "Clasificación" },
    { clave: "tema", etiqueta: "Tema principal", tipo: "vocabulario", vocabulario: { tipo: "temas" }, grupo: "Clasificación" },
    { clave: "temasSecundarios", etiqueta: "Temas secundarios", tipo: "vocabulario_multiple", vocabulario: { tipo: "temas" }, grupo: "Clasificación" },
    { clave: "perfiles", etiqueta: "Perfiles", tipo: "vocabulario_multiple", vocabulario: { tipo: "perfiles" }, grupo: "Clasificación" },
    { clave: "relacionados", etiqueta: "Trámites relacionados", tipo: "referencia_multiple", referenciaA: "tramites", grupo: "Relaciones" },
    { clave: "fechaActualizacion", etiqueta: "Fecha de actualización", tipo: "fecha", grupo: "Clasificación" },
  ],
  filtros: [
    { id: "area", etiqueta: "Área", tipo: "vocabulario", vocabulario: { tipo: "areas" }, ruta: "areaId" },
    { id: "tema", etiqueta: "Tema", tipo: "vocabulario", vocabulario: { tipo: "temas" }, ruta: "tema" },
    { id: "canal", etiqueta: "Canal", tipo: "vocabulario", vocabulario: { tipo: "canales" }, ruta: "canales" },
    { id: "estado", etiqueta: "Estado", tipo: "estado" },
    { id: "atencion", etiqueta: "Necesita atención", tipo: "necesita_atencion" },
  ],
  columnas: [
    { id: "titulo", encabezado: "Título", tipo: "titulo", subtituloRuta: "tituloOficial" },
    { id: "estado", encabezado: "Estado", tipo: "estado" },
    { id: "propietario", encabezado: "Propietario", tipo: "propietario" },
    { id: "revision", encabezado: "Última revisión", tipo: "revision" },
  ],
};
