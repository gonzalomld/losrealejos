import type { Metadata } from "next";
import { TRAMITES } from "@/data/tramites";
import { AYUDAS } from "@/data/ayudas";
import { NOTICIAS } from "@/data/noticias";
import { EVENTOS } from "@/data/eventos";
import { SERVICIOS_BARRIO } from "@/data/servicios-barrio";
import { AREAS } from "@/data/areas";
import { BLOQUES_TRANSPARENCIA, ETIQUETAS_BLOQUE } from "@/data/vocabularios";

export const metadata: Metadata = {
  title: "Mapa del sitio",
  description: "Todas las páginas del portal del Ayuntamiento de Los Realejos en una lista.",
};

export default function MapaDelSitio() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav aria-label="Migas de pan">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          <li><a href="/" className="font-semibold text-primary underline">Portada</a></li>
          <li aria-hidden="true"> / </li>
          <li><span aria-current="page" className="font-semibold">Mapa del sitio</span></li>
        </ol>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold">Mapa del sitio</h1>
      <p className="text-sm text-muted-foreground">Última actualización: 8 de septiembre de 2026</p>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <section aria-labelledby="ms-tramites">
          <h2 id="ms-tramites" className="text-xl font-bold">Trámites y servicios ({TRAMITES.length} gestiones)</h2>
          <ul className="mt-2 space-y-1">
            <li><a className="text-primary underline" href="/tramites">Catálogo de trámites y servicios</a></li>
            {TRAMITES.map((t) => (
              <li key={t.id}><a className="text-primary underline" href={`/tramites/${t.id}`}>{t.tituloClaro}</a></li>
            ))}
            <li><a className="text-primary underline" href="/empleo-publico">Empleo público: convocatorias</a></li>
            <li><a className="text-primary underline" href="/ayudas">Ayudas y subvenciones ({AYUDAS.length} ayudas)</a></li>
            {AYUDAS.map((a) => (
              <li key={a.id}><a className="text-primary underline" href={`/ayudas/${a.id}`}>{a.titulo}</a></li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="ms-barrio">
          <h2 id="ms-barrio" className="text-xl font-bold">Mi barrio y mi día a día</h2>
          <ul className="mt-2 space-y-1">
            <li><a className="text-primary underline" href="/mi-barrio">Todos los servicios del día a día</a></li>
            {SERVICIOS_BARRIO.map((s) => (
              <li key={s.id}><a className="text-primary underline" href={`/mi-barrio/${s.id}`}>{s.nombre}</a></li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="ms-ayto">
          <h2 id="ms-ayto" className="text-xl font-bold">Ayuntamiento</h2>
          <ul className="mt-2 space-y-1">
            <li><a className="text-primary underline" href="/ayuntamiento">Quién es quién en el Ayuntamiento</a></li>
            <li><a className="text-primary underline" href="/areas-municipales">Directorio de las 19 áreas municipales</a></li>
            {AREAS.map((a) => (
              <li key={a.id}><a className="text-primary underline" href={`/areas-municipales/${a.id}`}>{a.nombre}</a></li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="ms-trans">
          <h2 id="ms-trans" className="text-xl font-bold">Transparencia</h2>
          <ul className="mt-2 space-y-1">
            <li><a className="text-primary underline" href="/transparencia">Portal de transparencia</a></li>
            {BLOQUES_TRANSPARENCIA.map((b) => (
              <li key={b}><a className="text-primary underline" href={`/transparencia/${b}`}>{ETIQUETAS_BLOQUE[b].titulo}</a></li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="ms-act">
          <h2 id="ms-act" className="text-xl font-bold">Actualidad</h2>
          <ul className="mt-2 space-y-1">
            <li><a className="text-primary underline" href="/noticias">Todas las noticias</a></li>
            {NOTICIAS.map((n) => (
              <li key={n.id}><a className="text-primary underline" href={`/noticias/${n.id}`}>{n.titular}</a></li>
            ))}
            <li><a className="text-primary underline" href="/agenda">Agenda de eventos</a></li>
            {EVENTOS.map((e) => (
              <li key={e.id}><a className="text-primary underline" href={`/agenda/${e.id}`}>{e.titulo}</a></li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="ms-otros">
          <h2 id="ms-otros" className="text-xl font-bold">Ayuda y avisos legales</h2>
          <ul className="mt-2 space-y-1">
            <li><a className="text-primary underline" href="/buscar">Buscar en el portal</a></li>
            <li><a className="text-primary underline" href="/contacto">Contacto y atención ciudadana</a></li>
            <li><a className="text-primary underline" href="/tablon-de-anuncios">Tablón de anuncios oficial</a></li>
            <li><a className="text-primary underline" href="/ordenanzas">Ordenanzas: normas municipales</a></li>
            <li><a className="text-primary underline" href="/campanas/fiestas-de-mayo-2026">Campaña: Fiestas de Mayo 2026 (ejemplo de microsite)</a></li>
            <li><a className="text-primary underline" href="/accesibilidad">Declaración de accesibilidad</a></li>
            <li><a className="text-primary underline" href="/accesibilidad/reclamacion">Reclamar sobre accesibilidad de esta web</a></li>
            <li><a className="text-primary underline" href="/aviso-legal">Aviso legal</a></li>
            <li><a className="text-primary underline" href="/politica-de-cookies">Política de cookies</a></li>
            <li><a className="text-primary underline" href="/proteccion-de-datos">Protección de datos</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
