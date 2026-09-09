import Image from "next/image";
import type { MedioIlustracion } from "@/lib/medios";
import { MotivoOnda } from "./MotivoOnda";

/**
 * Franja horizontal baja para cabeceras de sección.
 * Título siempre sobre panel sólido, nunca directamente sobre la imagen.
 */
export function FranjaSeccion({
  imagen,
  titulo,
  entradilla,
}: {
  imagen: MedioIlustracion;
  titulo: string;
  entradilla: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden">
        <Image
          src={imagen.src}
          alt={imagen.alt}
          width={1260}
          height={240}
          loading="lazy"
          className="block h-28 w-full object-cover sm:h-40"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-3">
            <h1 className="hero-panel inline-block px-4 py-2 text-3xl font-extrabold">{titulo}</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-3">
        <div className="prosa-municipal text-lg">{entradilla}</div>
      </div>
      <MotivoOnda />
    </div>
  );
}
