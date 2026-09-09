"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { SearchBox } from "./SearchBox";

/**
 * Lupa expandible del navbar azul (escritorio).
 * - En la portada (/): visible siempre como lupa; el campo del hero cumple
 *   la función de búsqueda hasta que el hero deja de estar visible.
 * - En interiores: lupa que despliega el campo compacto sobre la fila.
 * Un solo campo visible cada vez; Escape cierra y devuelve el foco.
 */
export function BuscadorCabecera() {
  const ruta = usePathname() ?? "";
  const esPortada = ruta === "/";
  const [heroVisible, setHeroVisible] = useState(true);
  const [expandido, setExpandido] = useState(false);
  const lupaRef = useRef<HTMLButtonElement>(null);
  const campoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setExpandido(false);
  }, [ruta]);

  useEffect(() => {
    if (!esPortada) return;
    const hero = document.getElementById("hero-portada");
    if (!hero || !("IntersectionObserver" in window)) {
      setHeroVisible(true);
      return;
    }
    const observador = new IntersectionObserver(([entrada]) => {
      setHeroVisible(entrada.isIntersecting);
    });
    observador.observe(hero);
    return () => observador.disconnect();
  }, [esPortada]);

  useEffect(() => {
    if (!expandido) return;
    campoRef.current?.querySelector("input")?.focus();
    function alPulsar(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setExpandido(false);
        lupaRef.current?.focus();
      }
    }
    function alClic(e: MouseEvent) {
      if (campoRef.current && !campoRef.current.contains(e.target as Node)) {
        setExpandido(false);
      }
    }
    document.addEventListener("keydown", alPulsar);
    document.addEventListener("mousedown", alClic);
    return () => {
      document.removeEventListener("keydown", alPulsar);
      document.removeEventListener("mousedown", alClic);
    };
  }, [expandido]);

  // En portada con hero visible la lupa sigue ahí (mismo ancho siempre,
  // cero saltos de layout); el campo grande del hero es el que se usa.
  const titulo = esPortada && heroVisible ? "Buscar (el buscador grande está más abajo, en la portada)" : "Buscar en el portal";

  return (
    <div className="relative hidden shrink-0 xl:block">
      <button
        ref={lupaRef}
        type="button"
        aria-expanded={expandido}
        aria-label={expandido ? "Cerrar buscador" : titulo}
        onClick={() => {
          if (expandido) {
            setExpandido(false);
            lupaRef.current?.focus();
          } else {
            setExpandido(true);
          }
        }}
        className={`foco-sobre-oscuro rounded-full p-2.5 text-white ${expandido ? "bg-white/20" : "hover:bg-white/10"}`}
      >
        {expandido ? <X aria-hidden="true" size={22} /> : <Search aria-hidden="true" size={22} />}
      </button>
      {expandido && (
        <div
          ref={campoRef}
          className="buscador-campo absolute right-0 top-full z-50 mt-2 w-80 rounded-lg bg-white p-3 shadow-xl"
        >
          <SearchBox id="buscador-cabecera" variante="compacto" />
        </div>
      )}
    </div>
  );
}
