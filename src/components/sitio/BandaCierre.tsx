import Image from "next/image";
import { BANDA_PIE } from "@/lib/medios";

/**
 * Banda de cierre institucional sobre el horizonte del pie.
 * Frase neutra: solo el nombre institucional + enlace a contacto.
 */
export function BandaCierre() {
  return (
    <section aria-label="Cierre institucional" className="relative w-full overflow-hidden">
      <Image
        src={BANDA_PIE.src}
        alt={BANDA_PIE.alt}
        width={1920}
        height={640}
        loading="lazy"
        className="block h-44 w-full object-cover sm:h-56"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <p className="hero-panel px-6 py-4 text-center text-xl font-extrabold md:text-2xl">
          Ayuntamiento de la Villa de Los Realejos
          <span className="mt-1 block text-base font-normal">
            <a href="/contacto" className="font-bold underline underline-offset-4">
              Contacto y atención ciudadana
            </a>
          </span>
        </p>
      </div>
    </section>
  );
}
