import type { Metadata } from "next";
import { NoticiaCard } from "@/components/sitio/NoticiaCard";
import { EventoCard } from "@/components/sitio/EventoCard";
import { AvisoPlazo } from "@/components/sitio/AvisoPlazo";
import { MotivoOnda } from "@/components/sitio/MotivoOnda";
import { HeroPortada } from "@/components/sitio/HeroPortada";
import { HeroAccesos } from "@/components/sitio/HeroAccesos";
import { leerParaFront } from "@/lib/cms/almacen";
import type { Tramite } from "@/data/tramites";
import type { Noticia } from "@/data/noticias";
import type { Evento } from "@/data/eventos";
import type { Aviso } from "@/data/avisos";
import { FileText, BadgeEuro, IdCard, Plane, HousePlus, Waves, Baby, Trophy } from "lucide-react";

// El título final lo compone la plantilla del layout:
// "Trámites, servicios e información municipal · Ayuntamiento de la Villa de Los Realejos"
export const metadata: Metadata = {
  title: "Trámites, servicios e información municipal",
  description:
    "Haz tus gestiones con el Ayuntamiento de Los Realejos en lenguaje claro: empadronamiento, certificados, IBI, obras, piscina, ayudas y empleo. Teléfono 922 34 62 34.",
};

const GESTIONES = [
  { id: "alta-en-el-padron", texto: "Empadronarme", Icono: HousePlus },
  { id: "certificado-de-empadronamiento", texto: "Pedir un certificado", Icono: FileText },
  { id: "pago-ibi-tasas", texto: "Pagar el IBI o una tasa", Icono: BadgeEuro },
  { id: "certificado-de-viaje-descuento-residente", texto: "Certificado de viaje (descuento de residente)", Icono: Plane },
  { id: "licencia-obra-menor", texto: "Hacer una obra pequeña en casa", Icono: HousePlus },
  { id: "inscripcion-piscina-municipal", texto: "Apuntarme a la piscina municipal", Icono: Waves },
  { id: "inscripcion-actividades-infantiles", texto: "Apuntar a mi hijo a una actividad", Icono: Baby },
  { id: "uso-instalaciones-deportivas", texto: "Reservar una pista de deporte", Icono: Trophy },
];

export default async function Portada() {
  const [TRAMITES, NOTICIAS, EVENTOS, AVISOS]: [Tramite[], Noticia[], Evento[], Aviso[]] = await Promise.all([
    leerParaFront<Tramite>("tramites"), leerParaFront<Noticia>("noticias"),
    leerParaFront<Evento>("eventos"), leerParaFront<Aviso>("avisos"),
  ]);
  const POR_ID = new Map(TRAMITES.map((x) => [x.id, x]));
  const ultimasNoticias = [...NOTICIAS].sort((a, b) => (a.fecha < b.fecha ? 1 : -1)).slice(0, 4);
  const hoy = "2026-09-08";
  const proximosEventos = EVENTOS.filter((e) => e.fechaHoraISO.slice(0, 10) >= hoy)
    .sort((a, b) => (a.fechaHoraISO > b.fechaHoraISO ? 1 : -1))
    .slice(0, 4);

  return (
    <>
      <HeroPortada />
      <HeroAccesos />
      <div className="mx-auto max-w-6xl px-4">
        <section aria-labelledby="titulo-gestiones" className="py-10 md:py-14">
          <h2 id="titulo-gestiones" className="titulo-seccion">
            Gestiones más frecuentes
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {GESTIONES.map(({ id, texto, Icono }, i) => {
              const t = POR_ID.get(id);
              if (!t) return null;
              return (
                <li key={`${id}-${i}`} className="h-full">
                  <a
                    href={`/tramites/${t.id}`}
                    className="tarjeta-acceso flex h-full items-start gap-3 rounded border-2 border-primary bg-card p-4 font-bold text-primary"
                    aria-label={`${texto}: ${t.descripcion.slice(0, 80)}…`}
                  >
                    <Icono aria-hidden="true" size={32} className="shrink-0" />
                    <span>{texto}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-4">
            <a href="/tramites" className="text-lg font-bold text-primary underline underline-offset-4">
              Ver todos los trámites y servicios ({TRAMITES.length} gestiones con explicación clara. Última actualización del catálogo: 8 de septiembre de 2026)
            </a>
          </p>
        </section>

        <MotivoOnda />

        <section aria-labelledby="titulo-avisos" className="py-10 md:py-14">
          <h2 id="titulo-avisos" className="titulo-seccion">
            Avisos y plazos abiertos
          </h2>
          <p className="prosa-municipal mt-2 text-lg">
            Esto caduca: míralo antes que las noticias.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {AVISOS.map((aviso) => (
              <li key={aviso.id}>
                <AvisoPlazo aviso={aviso} />
              </li>
            ))}
          </ul>
        </section>

        <MotivoOnda />

        <div className="grid gap-10 py-10 md:grid-cols-2 md:py-14">
          <section aria-labelledby="titulo-noticias">
            <h2 id="titulo-noticias" className="titulo-seccion">
              Últimas noticias
            </h2>
            <ul className="mt-6 grid gap-4">
              {ultimasNoticias.map((n) => (
                <li key={n.id}>
                  <NoticiaCard noticia={n} />
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <a href="/noticias" className="font-bold text-primary underline underline-offset-4">
                Ver todas las noticias del Ayuntamiento
              </a>
            </p>
          </section>
          <section aria-labelledby="titulo-agenda">
            <h2 id="titulo-agenda" className="titulo-seccion">
              Próximos eventos
            </h2>
            <ul className="mt-6 grid gap-4">
              {proximosEventos.map((e) => (
                <li key={e.id}>
                  <EventoCard evento={e} />
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <a href="/agenda" className="font-bold text-primary underline underline-offset-4">
                Ver la agenda completa de eventos
              </a>
            </p>
          </section>
        </div>

        <MotivoOnda />

        <section aria-labelledby="titulo-transparencia" className="py-10 md:py-14">
          <h2 id="titulo-transparencia" className="titulo-seccion">
            Transparencia y tablón
          </h2>
          <p className="prosa-municipal mt-2 text-lg">
            Cualquier documento oficial está a dos clics desde esta portada.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            <li className="h-full">
              <a href="/transparencia" className="tarjeta-acceso flex h-full items-start gap-3 rounded border bg-card p-4 font-bold text-primary">
                <IdCard aria-hidden="true" size={28} className="shrink-0" />
                <span>
                  Portal de transparencia
                  <span className="block text-base font-normal text-muted-foreground">Presupuestos, contratos, empleo público y documentos oficiales</span>
                </span>
              </a>
            </li>
            <li className="h-full">
              <a href="https://contrataciondelestado.es" target="_blank" rel="noopener" className="tarjeta-acceso flex h-full items-start gap-3 rounded border bg-card p-4 font-bold text-primary" aria-label="Perfil del contratante: licitaciones abiertas en la Plataforma de Contratación del Sector Público (se abre otro sistema en pestaña nueva)">
                <FileText aria-hidden="true" size={28} className="shrink-0" />
                <span>
                  Perfil del contratante: licitaciones abiertas
                  <span className="block text-base font-normal text-muted-foreground">Qué compra el Ayuntamiento y cómo presentar tu oferta (Plataforma de Contratación del Sector Público, se abre en pestaña nueva)</span>
                </span>
              </a>
            </li>
            <li className="h-full">
              <a href="/tablon-de-anuncios" className="tarjeta-acceso flex h-full items-start gap-3 rounded border bg-card p-4 font-bold text-primary">
                <FileText aria-hidden="true" size={28} className="shrink-0" />
                <span>
                  Tablón de anuncios oficial
                  <span className="block text-base font-normal text-muted-foreground">Anuncios, bases y listas que se publican cada semana</span>
                </span>
              </a>
            </li>
            <li className="h-full">
              <a href="/ordenanzas" className="tarjeta-acceso flex h-full items-start gap-3 rounded border bg-card p-4 font-bold text-primary">
                <FileText aria-hidden="true" size={28} className="shrink-0" />
                <span>
                  Ordenanzas: normas municipales
                  <span className="block text-base font-normal text-muted-foreground">Qué normas aprueba el Ayuntamiento y cómo te afectan</span>
                </span>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
