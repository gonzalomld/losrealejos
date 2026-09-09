import type { DefColeccion } from "../definiciones";

export const DEF_SERVICIOS: DefColeccion = {
  coleccion: "servicios",
  titulo: "Servicios del día a día",
  tituloTipo: "Servicio",
  descripcion: "Servicios por barrio con acciones y teléfono.",
  hrefNuevo: "/admin/servicios",
  lecturaFacil: false,
  bloques: true,
  tituloRutas: ["nombre"],
  campos: [
    { clave: "nombre", etiqueta: "Nombre", tipo: "texto", obligatorio: true, grupo: "Identificación" },
    { clave: "descripcion", etiqueta: "Descripción", tipo: "texto_largo", obligatorio: true, grupo: "Contenido" },
    { clave: "acciones", etiqueta: "Qué se puede hacer (una acción por línea)", tipo: "lista_textos", grupo: "Contenido" },
    { clave: "telefono", etiqueta: "Teléfono", tipo: "texto", grupo: "Contacto" },
    { clave: "areaId", etiqueta: "Área responsable", tipo: "vocabulario", vocabulario: { tipo: "areas" }, obligatorio: true, grupo: "Clasificación" },
    { clave: "fechaActualizacion", etiqueta: "Fecha de actualización", tipo: "fecha", grupo: "Clasificación" },
  ],
  filtros: [
    { id: "area", etiqueta: "Área", tipo: "vocabulario", vocabulario: { tipo: "areas" }, ruta: "areaId" },
    { id: "estado", etiqueta: "Estado", tipo: "estado" },
    { id: "atencion", etiqueta: "Necesita atención", tipo: "necesita_atencion" },
  ],
  columnas: [
    { id: "titulo", encabezado: "Nombre", tipo: "titulo", subtituloRuta: "descripcion" },
    { id: "estado", encabezado: "Estado", tipo: "estado" },
    { id: "propietario", encabezado: "Propietario", tipo: "propietario" },
    { id: "revision", encabezado: "Última revisión", tipo: "revision" },
  ],
};
