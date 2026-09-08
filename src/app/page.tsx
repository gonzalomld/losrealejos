import type { Metadata } from "next";
import { SearchBox } from "@/components/sitio/SearchBox";
import { NoticiaCard } from "@/components/sitio/NoticiaCard";
import { EventoCard } from "@/components/sitio/EventoCard";
import { AvisoPlazo } from "@/components/sitio/AvisoPlazo";
import { ExternalServiceCard } from "@/components/sitio/ExternalServiceCard";
import { TRAMITES, getTramite } from "@/data/tramites";
import { NOTICIAS } from "@/data/noticias";
import { EVENTOS } from "@/data/eventos";
import { AVISOS } from "@/data/avisos";
import { FileText, BadgeEuro, IdCard, Plane, HousePlus, Waves, Baby, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Portada",
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
  { id: "inscripcion-piscina-municipal", texto: "Apuntar a mi hijo a una actividad", Icono: Baby },
  { id: "uso-instalaciones-deportivas", texto: "Reservar una pista de deporte", Icono: Trophy },
];

export default function Portada() {
  const ultimasNoticias = [...NOTICIAS].sort((a, b) => (a.fecha < b.fecha ? 1 : -1)).slice(0, 4);
  const hoy = "2026-09-08";
  const proximosEventos = EVENTOS.filter((e) => e.fechaHoraISO.slice(0, 10) >= hoy)
    .sort((a, b) => (a.fechaHoraISO > b.fechaHoraISO ? 1 : -1))
    .slice(0, 4);
  const conPlazo = TRAMITES.filter((t) => t.plazoAbierto).length;

  return (
    <>
      <div className="mx-auto max-w-6xl px-4">
        <section aria-labelledby="titulo-buscador" className="py-8">
          <h1 id="titulo-buscador" className="max-w-[40ch] text-3xl font-extrabold leading-tight md:text-4xl">
            ¿Qué necesitas hacer? Te lo explicamos con palabras claras
          </h1>
          <p className="prosa-municipal mt-2 text-lg">
            Este portal informa de cómo hacer tus gestiones. El trámite se hace después en la
            Sede Electrónica. Si prefieres que te atiendan en persona, llama al{" "}
            <a href="tel:+34922346234" className="font-bold text-primary underline">
              922 34 62 34
            </a>
            .
          </p>
          <div className="mt-4 max-w-2xl">
            <SearchBox id="buscador-portada" grande />
          </div>
        </section>

        <section aria-labelledby="titulo-gestiones" className="py-6">
          <h2 id="titulo-gestiones" className="text-2xl font-extrabold">
            Gestiones más frecuentes
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {GESTIONES.map(({ id, texto, Icono }, i) => {
              const t = getTramite(id);
              if (!t) return null;
              return (
                <li key={`${id}-${i}`}>
                  <a
                    href={`/tramites/${t.id}`}
                    className="flex h-full items-start gap-3 rounded border-2 border-primary bg-card p-4 font-bold text-primary hover:bg-info-fondo"
                    aria-label={`${texto}: ${t.descripcion.slice(0, 80)}…`}
                  >
                    <Icono aria-hidden="true" size={32} className="shrink-0" />
                    <span>{texto}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-3">
            <a href="/tramites" className="text-lg font-bold text-primary underline underline-offset-4">
              Ver todos los trámites y servicios ({TRAMITES.length} gestiones con explicación clara)
            </a>
          </p>
        </section>

        <section aria-labelledby="titulo-avisos" className="py-6">
          <h2 id="titulo-avisos" className="text-2xl font-extrabold">
            Avisos y plazos abiertos
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {AVISOS.map((aviso) => (
              <li key={aviso.id}>
                <AvisoPlazo aviso={aviso} />
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-8 py-6 md:grid-cols-2">
          <section aria-labelledby="titulo-noticias">
            <h2 id="titulo-noticias" className="text-2xl font-extrabold">
              Últimas noticias
            </h2>
            <ul className="mt-4 grid gap-3">
              {ultimasNoticias.map((n) => (
                <li key={n.id}>
                  <NoticiaCard noticia={n} />
                </li>
              ))}
            </ul>
            <p className="mt-3">
              <a href="/noticias" className="font-bold text-primary underline underline-offset-4">
                Ver todas las noticias del Ayuntamiento
              </a>
            </p>
          </section>
          <section aria-labelledby="titulo-agenda">
            <h2 id="titulo-agenda" className="text-2xl font-extrabold">
              Próximos eventos
            </h2>
            <ul className="mt-4 grid gap-3">
              {proximosEventos.map((e) => (
                <li key={e.id}>
                  <EventoCard evento={e} />
                </li>
              ))}
            </ul>
            <p className="mt-3">
              <a href="/agenda" className="font-bold text-primary underline underline-offset-4">
                Ver la agenda completa de eventos
              </a>
            </p>
          </section>
        </div>

        <section aria-labelledby="titulo-transparencia" className="py-6">
          <h2 id="titulo-transparencia" className="text-2xl font-extrabold">
            Transparencia y tablón
          </h2>
          <p className="prosa-municipal mt-2 text-lg">
            Cualquier documento oficial está a dos clics desde esta portada. Hay {conPlazo} trámites
            con plazo abierto ahora mismo.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li>
              <a href="/transparencia" className="flex items-start gap-3 rounded border bg-card p-4 font-bold text-primary hover:bg-info-fondo">
                <IdCard aria-hidden="true" size={28} className="shrink-0" />
                <span>
                  Portal de transparencia
                  <span className="block text-base font-normal text-muted-foreground">Presupuestos, contratos, empleo público y documentos oficiales</span>
                </span>
              </a>
            </li>
            <li>
              <a href="/transparencia/contratacion" className="flex items-start gap-3 rounded border bg-card p-4 font-bold text-primary hover:bg-info-fondo">
                <FileText aria-hidden="true" size={28} className="shrink-0" />
                <span>
                  Perfil del contratante: licitaciones abiertas
                  <span className="block text-base font-normal text-muted-foreground">Qué compra el Ayuntamiento y cómo presentar tu oferta</span>
                </span>
              </a>
            </li>
            <li>
              <a href="/transparencia/servicios-urbanismo" className="flex items-start gap-3 rounded border bg-card p-4 font-bold text-primary hover:bg-info-fondo">
                <FileText aria-hidden="true" size={28} className="shrink-0" />
                <span>
                  Tablón de anuncios oficial
                  <span className="block text-base font-normal text-muted-foreground">Anuncios, bases y listas que se publican cada semana</span>
                </span>
              </a>
            </li>
            <li>
              <a href="/transparencia/institucional" className="flex items-start gap-3 rounded border bg-card p-4 font-bold text-primary hover:bg-info-fondo">
                <FileText aria-hidden="true" size={28} className="shrink-0" />
                <span>
                  Ordenanzas: normas municipales
                  <span className="block text-base font-normal text-muted-foreground">Qué normas aprueba el Ayuntamiento y cómo te afectan</span>
                </span>
              </a>
            </li>
          </ul>
        </section>

        <section aria-labelledby="titulo-sistemas" className="py-6">
          <h2 id="titulo-sistemas" className="text-2xl font-extrabold">
            Sistemas fuera del portal
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <ExternalServiceCard
              servicio="sede"
              quePuedesHacer="Hacer trámites por internet y ver tu carpeta ciudadana."
              identificacion="certificado digital o Cl@ve (salvo el certificado de viaje, que no pide nada)."
              href="https://sede.losrealejos.es"
            />
            <ExternalServiceCard
              servicio="pago"
              quePuedesHacer="Pagar el IBI (Impuesto sobre Bienes Inmuebles), tasas y multas con tarjeta."
              href="https://sede.losrealejos.es/pago"
            />
          </div>
        </section>
      </div>
    </>
  );
}
