import type { Canal, Perfil, Tema } from "./vocabularios";

export type Tramite = {
  id: string;
  tituloClaro: string;
  tituloOficial: string;
  resumen: { queEs: string; queNecesito: string; dondeSeHace: string };
  descripcion: string;
  requisitos: string[];
  documentacion: string[];
  canales: Canal[];
  comoSeHace: { paso: number; texto: string }[];
  identificacion: string;
  plazoResolucion: string;
  silencio: string;
  tasa: string;
  tasaGratuita: boolean;
  normativa: { titulo: string; url: string }[];
  sedeUrl: string;
  areaId: string;
  temas: Tema[];
  perfiles: Perfil[];
  plazoAbierto: boolean;
  fechaActualizacion: string;
  relacionados: string[];
};

export const TRAMITES: Tramite[] = [
  {
    id: "alta-en-el-padron",
    tituloClaro: "Empadronarme",
    tituloOficial: "Alta en el Padrón Municipal de Habitantes",
    resumen: {
      queEs: "Es apuntarte en la lista de personas que viven en Los Realejos.",
      queNecesito: "Necesitas tu DNI o pasaporte y un papel que diga dónde vives.",
      dondeSeHace: "Se hace en persona en la Oficina de Atención Ciudadana (OAC).",
    },
    descripcion:
      "El padrón es la lista oficial de las personas que viven en el municipio. Estar empadronado sirve para pedir ayudas, apuntar a tus hijos al colegio y usar los servicios del Ayuntamiento.",
    requisitos: [
      "Vivir de forma habitual en Los Realejos.",
      "Puede pedirlo la persona interesada o alguien con su autorización firmada.",
      "Las personas menores de edad las empadrona su padre, madre o tutor legal.",
    ],
    documentacion: [
      "DNI, NIE o pasaporte en vigor.",
      "Contrato de alquiler o escritura de la vivienda, o recibo reciente de luz o agua.",
      "Si vienes de otro municipio, no necesitas darte de baja allí: lo hacemos nosotros.",
      "Autorización firmada si empadronas a otra persona adulta.",
    ],
    canales: ["presencial"],
    comoSeHace: [
      { paso: 1, texto: "Pide cita previa por teléfono o en la web de cita." },
      { paso: 2, texto: "Ve a la Oficina de Atención Ciudadana (OAC) con tus documentos." },
      { paso: 3, texto: "Rellena la hoja de alta allí mismo. Te damos el justificante en el momento." },
    ],
    identificacion: "No necesitas certificado digital porque se hace en persona. Lleva tu DNI.",
    plazoResolucion: "El alta es inmediata en la oficina. El justificante se entrega el mismo día.",
    silencio: "No aplica: el alta se resuelve en el acto.",
    tasa: "Gratuito. Este trámite no cuesta nada.",
    tasaGratuita: true,
    normativa: [
      { titulo: "Ley de Bases del Régimen Local: normas del padrón", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392" },
      { titulo: "Reglamento de Población y Demarcación Territorial", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1986-8532" },
    ],
    sedeUrl: "https://sede.losrealejos.es",
    areaId: "atencion-ciudadana",
    temas: ["padron"],
    perfiles: ["ciudadano"],
    plazoAbierto: false,
    fechaActualizacion: "2026-06-15",
    relacionados: ["certificado-de-empadronamiento", "certificado-de-viaje-descuento-residente", "instancia-generica"],
  },
  {
    id: "certificado-de-empadronamiento",
    tituloClaro: "Pedir un certificado de empadronamiento",
    tituloOficial: "Certificado de empadronamiento",
    resumen: {
      queEs: "Es un papel oficial que dice que vives en Los Realejos.",
      queNecesito: "Necesitas estar empadronado y tu DNI o Cl@ve.",
      dondeSeHace: "Se hace por internet en la Sede Electrónica o en persona en la OAC.",
    },
    descripcion:
      "Este certificado acredita dónde vives. Te lo piden para renovar el DNI, pedir becas, matricular a tus hijos o hacer gestiones con otras administraciones.",
    requisitos: [
      "Estar empadronado en Los Realejos.",
      "Si lo pides online, identificarte con certificado digital o Cl@ve.",
      "Si lo pides en persona, llevar tu DNI.",
    ],
    documentacion: [
      "Online: no hay que subir ningún papel, solo identificarte.",
      "En persona: DNI, NIE o pasaporte.",
      "Si lo pide otra persona, autorización firmada y copia de tu DNI.",
    ],
    canales: ["ambos"],
    comoSeHace: [
      { paso: 1, texto: "Entra en la Sede Electrónica y busca este certificado." },
      { paso: 2, texto: "Identifícate con tu certificado digital o con Cl@ve." },
      { paso: 3, texto: "Descarga el certificado con su código de verificación." },
      { paso: 4, texto: "Si prefieres ir en persona, pide cita y ve a la OAC con tu DNI." },
    ],
    identificacion: "Online necesitas certificado digital o Cl@ve. En persona basta el DNI.",
    plazoResolucion: "Online es inmediato. En persona se entrega el mismo día.",
    silencio: "No aplica: se entrega en el acto.",
    tasa: "Gratuito. Este certificado no cuesta nada.",
    tasaGratuita: true,
    normativa: [
      { titulo: "Ley de Bases del Régimen Local: normas del padrón", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392" },
    ],
    sedeUrl: "https://sede.losrealejos.es",
    areaId: "atencion-ciudadana",
    temas: ["padron"],
    perfiles: ["ciudadano"],
    plazoAbierto: false,
    fechaActualizacion: "2026-05-20",
    relacionados: ["alta-en-el-padron", "certificado-de-viaje-descuento-residente", "instancia-generica"],
  },
  {
    id: "certificado-de-viaje-descuento-residente",
    tituloClaro: "Pedir el certificado de viaje (descuento de residente)",
    tituloOficial: "Certificado de residencia para descuento en viajes",
    resumen: {
      queEs: "Es el papel que te da descuento en avión y barco por vivir en Canarias.",
      queNecesito: "Necesitas estar empadronado. No hace falta certificado digital.",
      dondeSeHace: "Se hace por internet en la Sede Electrónica o en persona en la OAC.",
    },
    descripcion:
      "Las personas que viven en Canarias pagan menos en los vuelos y barcos a la Península y entre islas. La compañía te pide este certificado para aplicarte el descuento.",
    requisitos: [
      "Estar empadronado en Los Realejos.",
      "Este es el único trámite de la Sede que NO pide certificado digital.",
    ],
    documentacion: [
      "Online: solo tus datos. El sistema comprueba el padrón solo.",
      "En persona: DNI, NIE o pasaporte.",
    ],
    canales: ["ambos"],
    comoSeHace: [
      { paso: 1, texto: "Entra en la Sede Electrónica y busca el certificado de viaje." },
      { paso: 2, texto: "Escribe tus datos. No necesitas certificado digital." },
      { paso: 3, texto: "Descarga el certificado y úsalo al comprar tu billete." },
    ],
    identificacion: "No necesitas certificado digital ni Cl@ve. Es el trámite más fácil de la Sede.",
    plazoResolucion: "Inmediato online. El mismo día en persona.",
    silencio: "No aplica: se entrega en el acto.",
    tasa: "Gratuito.",
    tasaGratuita: true,
    normativa: [
      { titulo: "Normas estatales del descuento de residente en transportes", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2017-7923" },
    ],
    sedeUrl: "https://sede.losrealejos.es",
    areaId: "atencion-ciudadana",
    temas: ["padron"],
    perfiles: ["ciudadano"],
    plazoAbierto: false,
    fechaActualizacion: "2026-04-10",
    relacionados: ["certificado-de-empadronamiento", "alta-en-el-padron", "instancia-generica"],
  },
  {
    id: "instancia-generica",
    tituloClaro: "Enviar un escrito al Ayuntamiento",
    tituloOficial: "Instancia genérica",
    resumen: {
      queEs: "Es una carta oficial para pedir o comunicar cualquier cosa al Ayuntamiento.",
      queNecesito: "Necesitas explicar con claridad lo que pides y adjuntar tus papeles.",
      dondeSeHace: "Se hace por internet en la Sede Electrónica o en persona en la OAC.",
    },
    descripcion:
      "Sirve para cualquier petición que no tenga su propio trámite: hacer una sugerencia, pedir información, presentar un documento o reclamar. Si tu gestión tiene trámite propio, usa ese en su lugar.",
    requisitos: [
      "Ser mayor de edad o actuar en nombre de una empresa o asociación.",
      "Explicar con claridad qué pides y por qué.",
    ],
    documentacion: [
      "DNI, NIE o CIF de quien firma.",
      "Documentos que apoyen tu petición, si los tienes.",
      "Si actúas en nombre de otra persona, su autorización.",
    ],
    canales: ["ambos"],
    comoSeHace: [
      { paso: 1, texto: "Entra en la Sede Electrónica y abre la instancia genérica." },
      { paso: 2, texto: "Escribe tu petición con frases cortas y claras." },
      { paso: 3, texto: "Adjunta tus documentos y firma con tu certificado o Cl@ve." },
      { paso: 4, texto: "Guarda el justificante con el número de registro." },
    ],
    identificacion: "Necesitas certificado digital o Cl@ve para firmar online.",
    plazoResolucion: "El Ayuntamiento responde en un máximo de 3 meses.",
    silencio: "Si no recibes respuesta en 3 meses, en general se entiende desestimada. Pregunta en la OAC por tu expediente.",
    tasa: "Gratuito.",
    tasaGratuita: true,
    normativa: [
      { titulo: "Ley del Procedimiento Administrativo Común: cómo presentar escritos", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565" },
    ],
    sedeUrl: "https://sede.losrealejos.es",
    areaId: "secretaria-general",
    temas: ["servicios-sociales"],
    perfiles: ["ciudadano", "empresa", "asociacion"],
    plazoAbierto: false,
    fechaActualizacion: "2026-03-02",
    relacionados: ["certificado-de-empadronamiento", "cesion-derecho-cobro", "licencia-actividad"],
  },
  {
    id: "plusvalia-municipal-iivtnu",
    tituloClaro: "Declarar la venta o herencia de una casa (plusvalía)",
    tituloOficial: "Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana (IIVTNU)",
    resumen: {
      queEs: "Es pagar el impuesto municipal cuando vendes o heredas una casa o un terreno.",
      queNecesito: "Necesitas la escritura de la venta o de la herencia.",
      dondeSeHace: "Se declara por internet en la Sede Electrónica o en persona en Hacienda.",
    },
    descripcion:
      "Cuando una casa o un terreno cambia de dueño (venta, herencia o donación), hay que pagar este impuesto al Ayuntamiento. Se llama plusvalía. El plazo es de 30 días si es una venta y 6 meses si es una herencia.",
    requisitos: [
      "Haber comprado, vendido, heredado o recibido en donación un inmueble en Los Realejos.",
      "Presentar la declaración en plazo: 30 días hábiles (ventas) o 6 meses (herencias).",
    ],
    documentacion: [
      "Copia de la escritura de la venta, herencia o donación.",
      "DNI o CIF de quien vende y de quien compra.",
      "Referencia catastral del inmueble (está en el recibo del IBI).",
      "IBI son las siglas del Impuesto sobre Bienes Inmuebles, el impuesto anual de la casa.",
    ],
    canales: ["ambos"],
    comoSeHace: [
      { paso: 1, texto: "Reúne la escritura y la referencia catastral." },
      { paso: 2, texto: "Presenta la declaración en la Sede Electrónica o en Hacienda con cita." },
      { paso: 3, texto: "El Ayuntamiento calcula el importe y te envía la carta de pago." },
      { paso: 4, texto: "Paga en el banco o por internet antes de la fecha límite." },
    ],
    identificacion: "Online necesitas certificado digital o Cl@ve.",
    plazoResolucion: "La liquidación llega en unos 2 meses desde la declaración.",
    silencio: "Es un impuesto, no una solicitud: no hay silencio administrativo.",
    tasa: "El importe depende del valor del suelo y de los años. Como ejemplo, una vivienda media puede pagar unos 180 euros. El cálculo exacto lo hace Hacienda.",
    tasaGratuita: false,
    normativa: [
      { titulo: "Ordenanza municipal del impuesto de plusvalía", url: "https://sede.losrealejos.es/ordenanzas/plusvalia" },
      { titulo: "Ley de Haciendas Locales: impuestos municipales", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2004-4214" },
    ],
    sedeUrl: "https://sede.losrealejos.es",
    areaId: "hacienda",
    temas: ["tributos"],
    perfiles: ["ciudadano", "empresa"],
    plazoAbierto: false,
    fechaActualizacion: "2026-06-01",
    relacionados: ["licencia-obra-menor", "instancia-generica", "alta-en-el-padron"],
  },
  {
    id: "inscripcion-piscina-municipal",
    tituloClaro: "Apuntarme a la piscina municipal",
    tituloOficial: "Inscripción en actividades y abonos de la piscina municipal",
    resumen: {
      queEs: "Es apuntarte a nadar libre, a cursos o a clases en la piscina del municipio.",
      queNecesito: "Necesitas tu DNI y tus datos de contacto. Los menores necesitan autorización.",
      dondeSeHace: "Se hace en la piscina municipal o en Deportes. También online para renovar.",
    },
    descripcion:
      "La piscina municipal de Los Realejos ofrece nado libre, cursos para niños y adultos, aquagym y natación para mayores. Puedes pagar por meses o apuntarte a un curso completo.",
    requisitos: [
      "No hay edad mínima para nado libre acompañado; los cursos infantiles son desde los 4 años.",
      "Las personas menores necesitan la autorización de su padre o madre.",
      "Las personas empadronadas tienen precio reducido.",
    ],
    documentacion: [
      "DNI, NIE o libro de familia para menores.",
      "Justificante de empadronamiento (lo comprobamos nosotros, no tienes que traerlo).",
      "Número de cuenta si quieres pagar cada mes de forma automática.",
    ],
    canales: ["ambos"],
    comoSeHace: [
      { paso: 1, texto: "Elige tu actividad y horario en el tablón de Deportes o en la piscina." },
      { paso: 2, texto: "Rellena la ficha de inscripción con tus datos." },
      { paso: 3, texto: "Paga la primera cuota en la piscina o por internet." },
    ],
    identificacion: "En persona basta el DNI. Online necesitas Cl@ve o certificado.",
    plazoResolucion: "La plaza se confirma en el momento si hay sitio libre.",
    silencio: "No aplica.",
    tasa: "Como ejemplo: abono mensual de nado libre unos 28,50 euros; curso trimestral infantil unos 45 euros. Las personas empadronadas pagan menos.",
    tasaGratuita: false,
    normativa: [
      { titulo: "Ordenanza de precios de instalaciones deportivas", url: "https://sede.losrealejos.es/ordenanzas/deportes" },
    ],
    sedeUrl: "https://sede.losrealejos.es",
    areaId: "deportes",
    temas: ["deportes"],
    perfiles: ["ciudadano"],
    plazoAbierto: true,
    fechaActualizacion: "2026-07-10",
    relacionados: ["uso-instalaciones-deportivas", "alta-en-el-padron", "instancia-generica"],
  },
  {
    id: "licencia-obra-menor",
    tituloClaro: "Hacer una obra pequeña en casa",
    tituloOficial: "Licencia urbanística de obra menor",
    resumen: {
      queEs: "Es el permiso para arreglos pequeños: baño, cocina, ventanas o pintar la fachada.",
      queNecesito: "Necesitas describir la obra y decir quién la va a hacer.",
      dondeSeHace: "Se pide en la Gerencia Municipal de Urbanismo (GMU) o en la Sede.",
    },
    descripcion:
      "Si vas a cambiar el baño, la cocina, las ventanas o arreglar el tejado, necesitas este permiso. No vale para tirar muros de carga ni para casas nuevas: eso es obra mayor. La GMU (Gerencia Municipal de Urbanismo) es la oficina que lo tramita.",
    requisitos: [
      "La obra no puede cambiar la estructura del edificio ni su uso.",
      "La vivienda debe estar en suelo urbano y sin expedientes de disciplina abiertos.",
      "Si vives en un edificio protegido o en Rambla de Castro, consulta antes: puede necesitar permiso extra.",
    ],
    documentacion: [
      "Descripción de la obra: qué vas a hacer y con qué materiales.",
      "Presupuesto firmado por la empresa o el albañil.",
      "Fotos del estado actual.",
      "Si cambias ventanas o fachada, plano simple o croquis.",
      "DNI y referencia catastral del inmueble.",
    ],
    canales: ["ambos"],
    comoSeHace: [
      { paso: 1, texto: "Prepara la descripción, el presupuesto y las fotos." },
      { paso: 2, texto: "Presenta la solicitud en la Sede Electrónica o en la GMU con cita." },
      { paso: 3, texto: "Paga la tasa cuando te llegue la carta de pago." },
      { paso: 4, texto: "Espera la licencia antes de empezar la obra." },
    ],
    identificacion: "Online necesitas certificado digital o Cl@ve.",
    plazoResolucion: "Unos 2 meses desde que presentas todo completo.",
    silencio: "Si pasan 2 meses sin respuesta, en general se entiende concedida, salvo en zonas protegidas. No empieces la obra sin confirmarlo con la GMU.",
    tasa: "Como ejemplo: unos 32,15 euros de tasa más un porcentaje sobre el presupuesto de obra. El importe exacto lo calcula Urbanismo.",
    tasaGratuita: false,
    normativa: [
      { titulo: "Ordenanza municipal de licencias urbanísticas", url: "https://sede.losrealejos.es/ordenanzas/urbanismo" },
      { titulo: "Ley del Suelo de Canarias", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2017-9024" },
    ],
    sedeUrl: "https://sede.losrealejos.es",
    areaId: "urbanismo",
    temas: ["urbanismo"],
    perfiles: ["ciudadano", "empresa"],
    plazoAbierto: false,
    fechaActualizacion: "2026-05-28",
    relacionados: ["licencia-actividad", "plusvalia-municipal-iivtnu", "instancia-generica"],
  },
  {
    id: "licencia-actividad",
    tituloClaro: "Abrir un negocio o local",
    tituloOficial: "Licencia de actividad e instalación",
    resumen: {
      queEs: "Es el permiso para abrir una tienda, un bar, una oficina o un taller.",
      queNecesito: "Necesitas un técnico que prepare el proyecto del local.",
      dondeSeHace: "Se pide en la Gerencia Municipal de Urbanismo (GMU).",
    },
    descripcion:
      "Antes de abrir un negocio necesitas que el Ayuntamiento compruebe que el local cumple las normas de seguridad, ruido e higiene. Los negocios pequeños sin obras pueden usar un trámite más rápido: pregunta en la GMU.",
    requisitos: [
      "El local debe estar en una zona donde ese negocio esté permitido.",
      "Contar con un proyecto o memoria firmado por un técnico.",
      "Estar dado de alta en Hacienda y en la Seguridad Social antes de abrir.",
    ],
    documentacion: [
      "Proyecto o memoria técnica del local, firmado por técnico competente.",
      "Plano del local y de su ubicación.",
      "Contrato de alquiler o escritura del local.",
      "DNI o CIF de quien abre el negocio.",
      "Justificante de haber pagado la tasa.",
    ],
    canales: ["ambos"],
    comoSeHace: [
      { paso: 1, texto: "Habla con la GMU antes de alquilar: confirma que ese negocio puede abrir ahí." },
      { paso: 2, texto: "Encarga el proyecto a un técnico." },
      { paso: 3, texto: "Presenta la solicitud con el proyecto en la Sede o en la GMU." },
      { paso: 4, texto: "Los técnicos municipales visitan el local antes de la apertura." },
    ],
    identificacion: "Online necesitas certificado digital o Cl@ve.",
    plazoResolucion: "Unos 3 meses en actividades normales; más en bares o locales con música.",
    silencio: "Si no hay respuesta en plazo, en general se entiende desestimada por seguridad. Pregunta en la GMU.",
    tasa: "Como ejemplo: apertura de comercio pequeño unos 120 euros. Bares y locales grandes pagan más según metros.",
    tasaGratuita: false,
    normativa: [
      { titulo: "Ordenanza municipal de actividades", url: "https://sede.losrealejos.es/ordenanzas/actividades" },
      { titulo: "Ley de Actividades Clasificadas de Canarias", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1998-7604" },
    ],
    sedeUrl: "https://sede.losrealejos.es",
    areaId: "urbanismo",
    temas: ["actividad-economica", "urbanismo"],
    perfiles: ["empresa", "asociacion"],
    plazoAbierto: false,
    fechaActualizacion: "2026-04-22",
    relacionados: ["licencia-obra-menor", "instancia-generica", "cesion-derecho-cobro"],
  },
  {
    id: "cesion-derecho-cobro",
    tituloClaro: "Cobrar una ayuda o factura en otra cuenta",
    tituloOficial: "Cesión del derecho de cobro",
    resumen: {
      queEs: "Es decir al Ayuntamiento en qué cuenta quieres cobrar una ayuda o factura.",
      queNecesito: "Necesitas tu DNI y el número de tu cuenta bancaria.",
      dondeSeHace: "Se hace por internet en la Sede Electrónica o en persona en Hacienda.",
    },
    descripcion:
      "Si el Ayuntamiento te va a pagar (una ayuda, una subvención o una factura de tu empresa), con este papel indicas la cuenta donde quieres recibir el dinero. También sirve para ceder el cobro a otra persona.",
    requisitos: [
      "Tener un pago pendiente del Ayuntamiento a tu favor.",
      "Ser la persona titular de la cuenta o autorizar la cesión ante funcionario.",
    ],
    documentacion: [
      "DNI, NIE o CIF.",
      "Número de cuenta (IBAN).",
      "Documento que acredite el pago pendiente: resolución de ayuda o factura.",
      "Si cedes el cobro a otra persona, DNI de las dos partes.",
    ],
    canales: ["ambos"],
    comoSeHace: [
      { paso: 1, texto: "Rellena el modelo de cesión con tus datos y tu cuenta." },
      { paso: 2, texto: "Preséntalo en la Sede Electrónica o en Hacienda." },
      { paso: 3, texto: "El pago llega a esa cuenta cuando se apruebe." },
    ],
    identificacion: "Online necesitas certificado digital o Cl@ve.",
    plazoResolucion: "Se registra en unos 15 días.",
    silencio: "Es un acto de registro: no tiene silencio administrativo.",
    tasa: "Gratuito.",
    tasaGratuita: true,
    normativa: [
      { titulo: "Ley General de Subvenciones: cobro de ayudas", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-20977" },
    ],
    sedeUrl: "https://sede.losrealejos.es",
    areaId: "hacienda",
    temas: ["tributos", "servicios-sociales"],
    perfiles: ["ciudadano", "empresa", "asociacion"],
    plazoAbierto: false,
    fechaActualizacion: "2026-02-18",
    relacionados: ["instancia-generica", "licencia-actividad", "plusvalia-municipal-iivtnu"],
  },
  {
    id: "uso-instalaciones-deportivas",
    tituloClaro: "Reservar una pista o campo de deporte",
    tituloOficial: "Autorización de uso de instalaciones deportivas municipales",
    resumen: {
      queEs: "Es reservar una pista, el pabellón o el campo para jugar o entrenar.",
      queNecesito: "Necesitas decir qué día, a qué hora y cuántas personas sois.",
      dondeSeHace: "Se reserva en Deportes o en la propia instalación.",
    },
    descripcion:
      "Puedes reservar por horas el pabellón, las pistas del Estadio Los Príncipes, las canchas de los barrios y las salas. Los clubes de Los Realejos tienen preferencia en horario de tarde.",
    requisitos: [
      "Hacer la reserva con al menos 48 horas de antelación.",
      "Dejar fianza en torneos y usos de fin de semana.",
      "Respetar las normas de cada instalación.",
    ],
    documentacion: [
      "DNI de quien reserva.",
      "Si es un club, CIF y carta de la directiva.",
      "Justificante del pago de la tasa o de la fianza.",
    ],
    canales: ["ambos"],
    comoSeHace: [
      { paso: 1, texto: "Llama o escribe a Deportes para comprobar que la pista está libre." },
      { paso: 2, texto: "Rellena la solicitud de reserva con día y hora." },
      { paso: 3, texto: "Paga la tasa y guarda el justificante para el día de uso." },
    ],
    identificacion: "En persona basta el DNI.",
    plazoResolucion: "La reserva se confirma en 48 horas.",
    silencio: "No aplica.",
    tasa: "Como ejemplo: pista exterior unos 12 euros por hora; pabellón completo unos 30 euros por hora. Clubes locales con convenio pagan menos.",
    tasaGratuita: false,
    normativa: [
      { titulo: "Ordenanza de precios de instalaciones deportivas", url: "https://sede.losrealejos.es/ordenanzas/deportes" },
      { titulo: "Reglamento de uso de instalaciones deportivas", url: "https://sede.losrealejos.es/ordenanzas/uso-deportivo" },
    ],
    sedeUrl: "https://sede.losrealejos.es",
    areaId: "deportes",
    temas: ["deportes"],
    perfiles: ["ciudadano", "asociacion", "empresa"],
    plazoAbierto: false,
    fechaActualizacion: "2026-06-30",
    relacionados: ["inscripcion-piscina-municipal", "instancia-generica", "licencia-actividad"],
  },
  {
    id: "pago-ibi-tasas",
    tituloClaro: "Pagar el IBI o una tasa",
    tituloOficial: "Pago de tributos municipales (IBI y tasas)",
    resumen: {
      queEs: "Es pagar el impuesto de tu casa (IBI) o una tasa del Ayuntamiento.",
      queNecesito: "Necesitas la carta de pago o la referencia del recibo.",
      dondeSeHace: "Se paga por internet en la pasarela de pago o en el banco.",
    },
    descripcion:
      "El IBI (Impuesto sobre Bienes Inmuebles) es el impuesto anual de tu casa, local o terreno. También puedes pagar aquí tasas como la basura, vados o multas. Si no tienes la carta de pago, pídela en Hacienda.",
    requisitos: [
      "Tener la carta de pago o conocer la referencia del recibo.",
      "Pagar antes de la fecha límite para evitar recargos.",
    ],
    documentacion: [
      "Carta de pago o referencia del recibo.",
      "Tarjeta bancaria si pagas por internet.",
    ],
    canales: ["ambos"],
    comoSeHace: [
      { paso: 1, texto: "Entra en la pasarela de pago online con tu carta de pago." },
      { paso: 2, texto: "Comprueba el importe y paga con tarjeta." },
      { paso: 3, texto: "Guarda el justificante de pago." },
      { paso: 4, texto: "También puedes pagar en el banco o en Hacienda con cita." },
    ],
    identificacion: "Para pagar online no necesitas certificado digital. Solo tu tarjeta.",
    plazoResolucion: "El pago es inmediato y queda registrado al momento.",
    silencio: "Es un pago, no una solicitud: no hay silencio administrativo.",
    tasa: "El IBI depende del valor de tu vivienda. Como ejemplo, una vivienda media en Realejo Bajo paga unos 210 euros al año. Mira tu recibo para ver tu importe.",
    tasaGratuita: false,
    normativa: [
      { titulo: "Ordenanza del IBI de Los Realejos", url: "https://sede.losrealejos.es/ordenanzas/ibi" },
      { titulo: "Calendario fiscal 2026", url: "https://sede.losrealejos.es/ordenanzas/calendario-fiscal" },
    ],
    sedeUrl: "https://sede.losrealejos.es",
    areaId: "hacienda",
    temas: ["tributos"],
    perfiles: ["ciudadano", "empresa"],
    plazoAbierto: true,
    fechaActualizacion: "2026-07-01",
    relacionados: ["plusvalia-municipal-iivtnu", "cesion-derecho-cobro", "licencia-obra-menor"],
  },
];

export function getTramite(id: string): Tramite | undefined {
  return TRAMITES.find((t) => t.id === id);
}
