import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sitio/Breadcrumbs";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  if (id !== "fiestas-de-mayo-2026") return { title: "Campaña no encontrada" };
  return {
    title: "Fiestas de Mayo 2026",
    description: "Programa de las Fiestas de Mayo de Los Realejos en torno a la Santa Cruz: romerías, verbenas y actos en Realejo Alto.",
  };
}

export function generateStaticParams() {
  return [{ id: "fiestas-de-mayo-2026" }];
}

export default async function Campana({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id !== "fiestas-de-mayo-2026") notFound();
  return (
    <>
      <Breadcrumbs migas={[{ texto: "Campañas", href: "/noticias" }, { texto: "Fiestas de Mayo 2026" }]} />
      {/* Microsite temporal: identidad propia (cabecera ocre) pero dentro del shell del portal */}
      <div className="bg-accent text-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="inline-block rounded-full bg-white px-3 py-1 text-sm font-bold text-accent">
            Página especial · Vigente del 20 de abril al 5 de mayo de 2026
          </p>
          <h1 className="mt-2 text-4xl font-extrabold">Fiestas de Mayo 2026</h1>
          <p className="mt-2 max-w-[60ch] text-xl">
            El ciclo festivo principal del municipio, en torno a la Santa Cruz: romerías, verbenas y actos en Realejo Alto.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-2xl font-extrabold">Programa</h2>
        <ol className="mt-3 grid gap-3">
          <li className="rounded border bg-card p-4"><strong>Sábado 2 de mayo:</strong> Romería de San Vicente en honor a la Santa Cruz, desde las 12:00.</li>
          <li className="rounded border bg-card p-4"><strong>Domingo 3 de mayo:</strong> Día de la Cruz: misa, procesión y festival de las cruces en Realejo Alto.</li>
          <li className="rounded border bg-card p-4"><strong>Toda la semana:</strong> Verbenas cada noche en la plaza de Realejo Alto y feria de artesanía.</li>
        </ol>
        <h2 className="mt-6 text-2xl font-extrabold">Avisos</h2>
        <p className="prosa-municipal mt-2 text-lg">
          Habrá guaguas especiales desde La Cruz Santa, Icod el Alto y Toscal-Longuera. La calle El Medio
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
