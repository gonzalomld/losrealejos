import type { DefColeccion } from "../definiciones";

export const DEF_EVENTOS: DefColeccion = {
  coleccion: "eventos",
  titulo: "Agenda de eventos",
  tituloTipo: "Evento",
  descripcion: "Eventos culturales, deportivos y festivos con fecha, lugar e inscripción.",
  hrefNuevo: "/admin/agenda",
  lecturaFacil: false,
  bloques: true,
  tituloRutas: ["titulo"],
  campos: [
    { clave: "titulo", etiqueta: "Título", tipo: "texto", obligatorio: true, grupo: "Identificación" },
    { clave: "descripcion", etiqueta: "Descripción", tipo: "texto_largo", obligatorio: true, grupo: "Contenido" },
    {
      clave: "categoria", etiqueta: "Categoría", tipo: "vocabulario",
      vocabulario: { tipo: "fija", opciones: [
        { valor: "teatro", etiqueta: "Teatro" }, { valor: "musica", etiqueta: "Música" },
        { valor: "cine", etiqueta: "Cine" }, { valor: "fiestas", etiqueta: "Fiestas" },
        { valor: "deporte", etiqueta: "Deporte" }, { valor: "infantil", etiqueta: "Infantil" },
        { valor: "mercado", etiqueta: "Mercado" },
      ] }, grupo: "Clasificación",
    },
    { clave: "fechaHoraISO", etiqueta: "Fecha y hora", tipo: "texto", placeholder: "2026-09-12T20:30:00", ayuda: "Formato ISO: AAAA-MM-DDTHH:MM:SS.", grupo: "Cuándo y dónde" },
    { clave: "lugar", etiqueta: "Lugar", tipo: "texto", grupo: "Cuándo y dónde" },
    { clave: "inscripcionUrl", etiqueta: "Enlace de inscripción", tipo: "enlace_externo", grupo: "Cuándo y dónde" },
    { clave: "fechaActualizacion", etiqueta: "Fecha de actualización", tipo: "fecha", grupo: "Clasificación" },
  ],
  filtros: [
    { id: "categoria", etiqueta: "Categoría", tipo: "texto_libre" },
    { id: "estado", etiqueta: "Estado", tipo: "estado" },
    { id: "atencion", etiqueta: "Necesita atención", tipo: "necesita_atencion" },
  ],
  columnas: [
    { id: "titulo", encabezado: "Título", tipo: "titulo", subtituloRuta: "lugar" },
    { id: "estado", encabezado: "Estado", tipo: "estado" },
    { id: "propietario", encabezado: "Propietario", tipo: "propietario" },
    { id: "fecha", encabezado: "Fecha", tipo: "fecha", ruta: "fechaHoraISO" },
  ],
};
