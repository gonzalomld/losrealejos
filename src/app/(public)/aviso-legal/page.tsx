import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal del portal del Ayuntamiento de Los Realejos.",
};

export default function AvisoLegal() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav aria-label="Migas de pan">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          <li><a href="/" className="font-semibold text-primary underline">Portada</a></li>
          <li aria-hidden="true"> / </li>
          <li><span aria-current="page" className="font-semibold">Aviso legal</span></li>
        </ol>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold">Aviso legal</h1>
      <p className="mt-1 text-sm text-muted-foreground">Última actualización: 8 de septiembre de 2026</p>
      <div className="prosa-municipal mt-3 text-lg">
        <p>Esta web es el portal del Ayuntamiento de la Villa de Los Realejos: Avenida de Canarias, 6, 38410 Los Realejos. Teléfono 922 34 62 34.</p>
        <p>La información de los trámites es orientativa. El trámite real se hace en la Sede Electrónica (sede.losrealejos.es) o en persona.</p>
        <p>Los importes y plazos marcados como «dato de ejemplo» son contenido de muestra del prototipo, no datos oficiales.</p>
      </div>
    </div>
  );
}
