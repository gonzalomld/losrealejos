import Image from "next/image";
import { HERO } from "@/lib/medios";
import { SearchBox } from "./SearchBox";

/**
 * Nivel 3 de la cabecera, solo en la portada.
 * Imagen fija a todo ancho + panel sólido con pregunta y buscador grande.
 * Sin animaciones, sin carrusel, sin paralaje.
 */
export function HeroPortada() {
  return (
    <section aria-labelledby="titulo-buscador" id="hero-portada" className="relative w-full overflow-hidden">
      <Image
        src={HERO.src}
        alt={HERO.alt}
        width={1920}
        height={1344}
        priority
        fetchPriority="high"
        sizes="100vw"
        className="block h-[28vh] w-full object-cover md:h-[min(50vh,480px)]"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="hero-panel w-full max-w-2xl px-6 py-6 md:py-8">
          <h1 id="titulo-buscador" className="max-w-[40ch] text-3xl font-extrabold leading-tight md:text-4xl">
            ¿Qué necesitas hacer?
          </h1>
          <p className="mt-2 text-lg">
            Te lo explicamos con palabras claras. Este portal informa; el trámite se hace después en la
            Sede Electrónica. Si prefieres que te atiendan en persona, llama al{" "}
            <a href="tel:+34922346234" className="font-bold underline underline-offset-4">
              922 34 62 34
            </a>
            .
          </p>
          <div className="mt-4 [&_label]:text-[#f7f4ec] [&_input]:border-white">
            <SearchBox id="buscador-portada" variante="grande" />
          </div>
        </div>
      </div>
    </section>
  );
}
