import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Cómo usa cookies el portal del Ayuntamiento de Los Realejos: solo técnicas, sin publicidad.",
};

export default function PoliticaCookies() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav aria-label="Migas de pan">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          <li><a href="/" className="font-semibold text-primary underline">Portada</a></li>
          <li aria-hidden="true"> / </li>
          <li><span aria-current="page" className="font-semibold">Política de cookies</span></li>
        </ol>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold">Política de cookies</h1>
      <p className="mt-1 text-sm text-muted-foreground">Última actualización: 8 de septiembre de 2026</p>
      <div className="prosa-municipal mt-3 text-lg">
        <p>Solo usamos cookies técnicas necesarias para que la web funcione. No usamos cookies de publicidad ni de marketing.</p>
        <p>Puedes aceptar o rechazar desde el aviso de cookies. Los dos botones tienen el mismo tamaño. Rechazar no te impide usar el portal.</p>
        <p>No cargamos mapas ni vídeos de terceros que instalen cookies sin tu permiso.</p>
      </div>
    </div>
  );
}
