import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  if (id !== "fiestas-del-carmen-2026") return { title: "Campaña no encontrada" };
  return {
    title: "Fiestas del Carmen 2026",
    description: "Programa de las Fiestas del Carmen 2026 de Realejo Bajo: actos, horarios y cortes de calle.",
  };
}

export function generateStaticParams() {
  return [{ id: "fiestas-del-carmen-2026" }];
}

export default async function Campana({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id !== "fiestas-del-carmen-2026") notFound();
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Campañas", href: "/noticias" }, { texto: "Fiestas del Carmen 2026" }]} />
      {/* Microsite temporal: identidad propia (cabecera ocre) pero dentro del shell del portal */}
      <div className="bg-accent text-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="inline-block rounded-full bg-white px-3 py-1 text-sm font-bold text-accent">
            Página especial · Vigente del 1 al 20 de julio de 2026
          </p>
          <h1 className="mt-2 text-4xl font-extrabold">Fiestas del Carmen 2026</h1>
          <p className="mt-2 max-w-[60ch] text-xl">
            Realejo Bajo celebra su fiesta del mar: procesión, embarcación en El Socorro, conciertos y feria.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-2xl font-extrabold">Programa</h2>
        <ol className="mt-3 grid gap-3">
          <li className="rounded border bg-card p-4"><strong>Viernes 11:</strong> Pregón y verbena en la plaza de Realejo Bajo, 21:00.</li>
          <li className="rounded border bg-card p-4"><strong>Sábado 12:</strong> Romería marinera y feria de artesanía, desde las 12:00.</li>
          <li className="rounded border bg-card p-4"><strong>Domingo 13:</strong> Misa, procesión y embarcación de la Virgen en la playa de El Socorro, 18:00.</li>
        </ol>
        <h2 className="mt-6 text-2xl font-extrabold">Avisos</h2>
        <p className="prosa-municipal mt-2 text-lg">
          Habrá guaguas especiales desde Realejo Alto, La Cruz Santa e Icod el Alto. La calle principal
          se corta de 19:00 a 02:00 durante las fiestas.
        </p>
        <p className="mt-4 flex flex-wrap gap-4 text-lg font-bold">
          <a href="/agenda" className="text-primary underline">Ver los actos en la agenda</a>
          <a href="/" className="text-primary underline">Volver a la portada del portal</a>
        </p>
      </div>
    </>
  );
}
