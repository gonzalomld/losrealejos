import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protección de datos",
  description: "Cómo trata tus datos el Ayuntamiento de Los Realejos cuando usas este portal.",
};

export default function ProteccionDatos() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav aria-label="Migas de pan">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          <li><a href="/" className="font-semibold text-primary underline">Portada</a></li>
          <li aria-hidden="true"> / </li>
          <li><span aria-current="page" className="font-semibold">Protección de datos</span></li>
        </ol>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold">Protección de datos</h1>
      <p className="mt-1 text-sm text-muted-foreground">Última actualización: 8 de septiembre de 2026</p>
      <div className="prosa-municipal mt-3 text-lg">
        <p>El Ayuntamiento trata tus datos solo para atender tu petición, según la normativa de protección de datos.</p>
        <p>El formulario de accesibilidad solo pide tu nombre y correo para responderte. No compartimos tus datos con nadie.</p>
        <p>Puedes pedir ver, corregir o borrar tus datos escribiendo a proteccion.datos@losrealejos.es o llamando al 922 34 62 34.</p>
      </div>
    </div>
  );
}
