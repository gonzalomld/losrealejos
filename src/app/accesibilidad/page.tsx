import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Declaración de accesibilidad",
  description: "Declaración de accesibilidad del portal del Ayuntamiento de Los Realejos según la normativa española.",
};

export default function Accesibilidad() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav aria-label="Migas de pan">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          <li><a href="/" className="font-semibold text-primary underline">Portada</a></li>
          <li aria-hidden="true"> / </li>
          <li><span aria-current="page" className="font-semibold">Declaración de accesibilidad</span></li>
        </ol>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold">Declaración de accesibilidad</h1>
      <div className="prosa-municipal mt-3 text-lg">
        <h2 className="mt-4 text-2xl font-bold">Grado de cumplimiento declarado</h2>
        <p className="mt-1">
          Este portal es <strong>parcialmente conforme</strong> con el nivel AA de las WCAG 2.1, según el
          Real Decreto 1112/2018 de accesibilidad del sector público. Estamos trabajando para llegar a
          la conformidad plena.
        </p>
        <h2 className="mt-4 text-2xl font-bold">Contenido no accesible</h2>
        <p className="mt-1">
          Algunos documentos antiguos en PDF anteriores a 2026 pueden no estar etiquetados para
          lectores de pantalla. Si necesitas uno de esos documentos en formato accesible, pídelo por
          teléfono (<a href="tel:+34922346234" className="font-bold text-primary underline">922 34 62 34</a>) y te lo enviamos.
        </p>
        <h2 className="mt-4 text-2xl font-bold">Fecha de la declaración</h2>
        <p className="mt-1">Esta declaración se hizo el 8 de septiembre de 2026. Última actualización de esta página: 8 de septiembre de 2026.</p>
        <h2 className="mt-4 text-2xl font-bold">Método de evaluación empleado</h2>
        <p className="mt-1">
          Evaluación experta con revisión manual de todas las plantillas (navegación con teclado,
          contraste, jerarquía de encabezados y lectores de pantalla) más revisión automática de contraste y enlaces.
        </p>
        <h2 className="mt-4 text-2xl font-bold">Cómo avisarnos de un problema</h2>
        <p className="mt-1">
          Si encuentras una barrera en esta web, <a href="/accesibilidad/reclamacion" className="font-bold text-primary underline">rellena el formulario de reclamación en materia de accesibilidad</a>.
          También puedes llamar al <a href="tel:+34922346234" className="font-bold text-primary underline">922 34 62 34</a>.
        </p>
      </div>
    </div>
  );
}
