export type Area = {
  id: string;
  nombre: string;
  descripcion: string;
  responsable: string;
  telefono: string;
  correo: string;
  ubicacion: string;
  tramiteIds: string[];
};

export const AREAS: Area[] = [
  { id: "atencion-ciudadana", nombre: "Atención Ciudadana", descripcion: "Atiende en persona y por teléfono. Ayuda a hacer gestiones y registra documentos.", responsable: "Concejalía de Atención Ciudadana", telefono: "922 34 62 34", correo: "atencion.ciudadana@losrealejos.es", ubicacion: "Avenida de Canarias, 6 (Realejo Bajo)", tramiteIds: ["certificado-de-empadronamiento", "certificado-de-viaje-descuento-residente", "alta-en-el-padron", "instancia-generica"] },
  { id: "agencia-desarrollo-local", nombre: "Agencia de Desarrollo Local", descripcion: "Ayudas para buscar trabajo y montar un negocio. Cursos y planes de empleo.", responsable: "Concejalía de Empleo y Desarrollo Local", telefono: "922 34 62 40", correo: "adl@losrealejos.es", ubicacion: "Avenida de Canarias, 6", tramiteIds: [] },
  { id: "agricultura", nombre: "Agricultura", descripcion: "Apoyo al campo: caminos rurales, agua de riego y ferias agrícolas.", responsable: "Concejalía de Agricultura", telefono: "922 34 62 41", correo: "agricultura@losrealejos.es", ubicacion: "Avenida de Canarias, 6", tramiteIds: [] },
  { id: "bienestar-social", nombre: "Bienestar Social", descripcion: "Ayudas para familias, personas mayores y personas en dificultad.", responsable: "Concejalía de Bienestar Social", telefono: "922 34 62 42", correo: "servicios.sociales@losrealejos.es", ubicacion: "Calle El Medio, 12 (Realejo Alto)", tramiteIds: ["cesion-derecho-cobro"] },
  { id: "contratacion", nombre: "Contratación", descripcion: "Compras y contratos del Ayuntamiento. Publica las licitaciones.", responsable: "Concejalía de Contratación", telefono: "922 34 62 43", correo: "contratacion@losrealejos.es", ubicacion: "Avenida de Canarias, 6", tramiteIds: [] },
  { id: "cultura-educacion", nombre: "Cultura y Educación", descripcion: "Bibliotecas, Teatro Cine Realejos, fiestas y apoyo a los colegios.", responsable: "Concejalía de Cultura y Educación", telefono: "922 34 62 44", correo: "cultura@losrealejos.es", ubicacion: "Teatro Cine Realejos, Paseo de la Libertad", tramiteIds: [] },
  { id: "deportes", nombre: "Deportes", descripcion: "Piscina municipal, Estadio Los Príncipes, pistas y actividades deportivas.", responsable: "Concejalía de Deportes", telefono: "922 34 62 45", correo: "deportes@losrealejos.es", ubicacion: "Piscina municipal, Avenida de los Remedios", tramiteIds: ["inscripcion-piscina-municipal", "uso-instalaciones-deportivas"] },
  { id: "empresas-publicas", nombre: "Empresas Públicas", descripcion: "Gestiona las empresas de servicios del Ayuntamiento.", responsable: "Concejalía de Empresas Públicas", telefono: "922 34 62 46", correo: "empresas.publicas@losrealejos.es", ubicacion: "Avenida de Canarias, 6", tramiteIds: [] },
  { id: "fiestas", nombre: "Fiestas", descripcion: "Fiestas patronales y fiestas de los barrios. Permisos para actos en la calle.", responsable: "Concejalía de Fiestas", telefono: "922 34 62 47", correo: "fiestas@losrealejos.es", ubicacion: "Avenida de Canarias, 6", tramiteIds: [] },
  { id: "hacienda", nombre: "Hacienda", descripcion: "Impuestos y tasas: IBI (Impuesto sobre Bienes Inmuebles), plusvalía y multas.", responsable: "Concejalía de Hacienda", telefono: "922 34 62 48", correo: "hacienda@losrealejos.es", ubicacion: "Avenida de Canarias, 6", tramiteIds: ["plusvalia-municipal-iivtnu", "cesion-derecho-cobro"] },
  { id: "juventud", nombre: "Juventud", descripcion: "Actividades para jóvenes: ocio, cursos y casa de la juventud.", responsable: "Concejalía de Juventud", telefono: "922 34 62 49", correo: "juventud@losrealejos.es", ubicacion: "Casa de la Juventud, Realejo Alto", tramiteIds: [] },
  { id: "omic", nombre: "OMIC (Oficina Municipal de Información al Consumidor)", descripcion: "Ayuda si tienes un problema con una compra o un servicio.", responsable: "Concejalía de Consumo", telefono: "922 34 62 50", correo: "omic@losrealejos.es", ubicacion: "Avenida de Canarias, 6", tramiteIds: ["instancia-generica"] },
  { id: "patrimonio", nombre: "Patrimonio", descripcion: "Cuida los edificios y bienes del Ayuntamiento.", responsable: "Concejalía de Patrimonio", telefono: "922 34 62 51", correo: "patrimonio@losrealejos.es", ubicacion: "Avenida de Canarias, 6", tramiteIds: [] },
  { id: "protocolo", nombre: "Protocolo", descripcion: "Actos oficiales y hermanamientos del municipio.", responsable: "Alcaldía", telefono: "922 34 62 52", correo: "protocolo@losrealejos.es", ubicacion: "Avenida de Canarias, 6", tramiteIds: [] },
  { id: "secretaria-general", nombre: "Secretaría General", descripcion: "Plenos, actas y registro oficial de documentos.", responsable: "Secretaría General", telefono: "922 34 62 53", correo: "secretaria@losrealejos.es", ubicacion: "Avenida de Canarias, 6", tramiteIds: ["instancia-generica"] },
  { id: "seguridad-emergencias", nombre: "Seguridad y Emergencias", descripcion: "Policía Local y Protección Civil. Emergencias: teléfono 112.", responsable: "Concejalía de Seguridad", telefono: "922 34 62 54", correo: "policia@losrealejos.es", ubicacion: "Calle El Puente, s/n", tramiteIds: [] },
  { id: "turismo", nombre: "Turismo", descripcion: "Información para visitantes. La web de turismo es losrealejos.travel.", responsable: "Concejalía de Turismo", telefono: "922 34 62 55", correo: "turismo@losrealejos.es", ubicacion: "Plaza Viera y Clavijo", tramiteIds: [] },
  { id: "urbanismo", nombre: "Urbanismo", descripcion: "Obras en casa, licencias de apertura y planes de la ciudad. Tramita la Gerencia Municipal de Urbanismo (GMU).", responsable: "Gerencia Municipal de Urbanismo (GMU)", telefono: "922 34 62 56", correo: "urbanismo@losrealejos.es", ubicacion: "Avenida de Canarias, 6", tramiteIds: ["licencia-obra-menor", "licencia-actividad"] },
  { id: "viviendas-protegidas", nombre: "Viviendas Protegidas", descripcion: "Ayudas para la vivienda y lista de solicitantes de vivienda protegida.", responsable: "Concejalía de Vivienda", telefono: "922 34 62 57", correo: "vivienda@losrealejos.es", ubicacion: "Avenida de Canarias, 6", tramiteIds: [] },
];

export function getArea(id: string): Area | undefined {
  return AREAS.find((a) => a.id === id);
}
