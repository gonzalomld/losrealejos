import type { DefColeccion } from "../definiciones";

export const DEF_NOTICIAS: DefColeccion = {
  coleccion: "noticias",
  titulo: "Noticias",
  tituloTipo: "Noticia",
  descripcion: "Noticias del portal con categoría, estado, fecha y área.",
  hrefNuevo: "/admin/noticias",
  lecturaFacil: false,
  bloques: true,
  tituloRutas: ["titular"],
  campos: [
    { clave: "titular", etiqueta: "Titular", tipo: "texto", obligatorio: true, grupo: "Identificación" },
    { clave: "entradilla", etiqueta: "Entradilla", tipo: "texto_largo", obligatorio: true, grupo: "Contenido" },
    { clave: "cuerpo", etiqueta: "Cuerpo", tipo: "lista_textos", ayuda: "Un párrafo por línea.", grupo: "Contenido" },
    {
      clave: "categoria", etiqueta: "Categoría", tipo: "vocabulario",
      vocabulario: { tipo: "fija", opciones: [
        { valor: "obras", etiqueta: "Obras" }, { valor: "ayudas", etiqueta: "Ayudas" },
        { valor: "empleo", etiqueta: "Empleo" }, { valor: "cultura", etiqueta: "Cultura" },
        { valor: "fiestas", etiqueta: "Fiestas" }, { valor: "presupuestos", etiqueta: "Presupuestos" },
        { valor: "plenos", etiqueta: "Plenos" },
      ] }, grupo: "Clasificación",
    },
    { clave: "fecha", etiqueta: "Fecha de publicación", tipo: "fecha", grupo: "Clasificación" },
    { clave: "fechaActualizacion", etiqueta: "Fecha de actualización", tipo: "fecha", grupo: "Clasificación" },
    { clave: "adjuntos", etiqueta: "Documentos adjuntos", tipo: "adjunto", grupo: "Contenido" },
  ],
  filtros: [
    { id: "categoria", etiqueta: "Categoría", tipo: "texto_libre" },
    { id: "estado", etiqueta: "Estado", tipo: "estado" },
    { id: "atencion", etiqueta: "Necesita atención", tipo: "necesita_atencion" },
  ],
  columnas: [
    { id: "titulo", encabezado: "Titular", tipo: "titulo", subtituloRuta: "entradilla" },
    { id: "estado", encabezado: "Estado", tipo: "estado" },
    { id: "propietario", encabezado: "Propietario", tipo: "propietario" },
    { id: "fecha", encabezado: "Fecha", tipo: "fecha", ruta: "fecha" },
  ],
};
