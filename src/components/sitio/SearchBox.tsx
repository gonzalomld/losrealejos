"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function SearchBox({
  id = "buscador",
  variante = "compacto",
}: {
  id?: string;
  variante?: "grande" | "compacto" | "icono";
}) {
  const router = useRouter();
  const [valor, setValor] = useState("");

  if (variante === "icono") {
    return (
      <a
        href="/buscar"
        aria-label="Ir al buscador"
        className="inline-flex items-center justify-center rounded border-2 border-primary p-2 text-primary"
      >
        <Search aria-hidden="true" size={22} />
      </a>
    );
  }

  const grande = variante === "grande";
  return (
    <form
      role="search"
      aria-label="Buscar en el portal"
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/buscar?q=${encodeURIComponent(valor.trim())}`);
      }}
    >
      <label htmlFor={id} className={grande ? "text-lg font-bold" : "sr-only"}>
        {grande ? "¿Qué necesitas hacer? Busca tu gestión" : "Buscar en el portal"}
      </label>
      <div className="mt-1 flex gap-2">
        <input
          id={id}
          name="q"
          type="search"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Ejemplo: empadronarme, IBI, piscina…"
          autoComplete="off"
          className="w-full rounded border-2 border-primary bg-white px-4 py-3 text-base text-black placeholder:text-neutral-600"
        />
        <button
          type="submit"
          className="flex items-center gap-2 rounded bg-primary px-5 py-3 font-bold text-white"
        >
          <Search aria-hidden="true" size={20} />
          Buscar
        </button>
      </div>
    </form>
  );
}
