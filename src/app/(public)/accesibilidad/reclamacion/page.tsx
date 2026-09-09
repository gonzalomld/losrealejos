"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const esquema = z.object({
  nombre: z.string().min(2, "Escribe tu nombre."),
  correo: z.string().email("Escribe un correo válido."),
  pagina: z.string().min(3, "Indica en qué página está el problema."),
  mensaje: z.string().min(20, "Cuéntanos el problema con al menos 20 letras."),
});

type Valores = z.infer<typeof esquema>;

export default function ReclamacionAccesibilidad() {
  const [enviado, setEnviado] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Valores>({
    resolver: zodResolver(esquema),
  });

  if (enviado) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav aria-label="Migas de pan">
          <ol className="flex flex-wrap items-center gap-1 text-sm">
            <li><a href="/" className="font-semibold text-primary underline">Portada</a></li>
            <li aria-hidden="true"> / </li>
            <li><a href="/accesibilidad" className="font-semibold text-primary underline">Declaración de accesibilidad</a></li>
            <li aria-hidden="true"> / </li>
            <li><span aria-current="page" className="font-semibold">Reclamación enviada</span></li>
          </ol>
        </nav>
        <h1 className="mt-2 text-3xl font-extrabold">Hemos recibido tu aviso</h1>
        <p className="prosa-municipal mt-2 text-lg" role="status">
          Gracias por avisarnos. Leeremos tu mensaje y te responderemos al correo que nos diste en
          un máximo de 20 días. Si es urgente, llama al <a href="tel:+34922346234" className="font-bold text-primary underline">922 34 62 34</a>.
        </p>
        <p className="mt-4"><a href="/" className="font-bold text-primary underline">Volver a la portada</a></p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav aria-label="Migas de pan">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          <li><a href="/" className="font-semibold text-primary underline">Portada</a></li>
          <li aria-hidden="true"> / </li>
          <li><a href="/accesibilidad" className="font-semibold text-primary underline">Declaración de accesibilidad</a></li>
          <li aria-hidden="true"> / </li>
          <li><span aria-current="page" className="font-semibold">Reclamar sobre accesibilidad</span></li>
        </ol>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold">Avisar de un problema de accesibilidad</h1>
      <p className="prosa-municipal mt-2 text-lg">
        Si algo de esta web no puedes usar (un texto que no se entiende, un botón que no funciona con
        el teclado, un documento que tu lector no lee), cuéntanoslo aquí. Última actualización: 8 de septiembre de 2026.
      </p>
      <form onSubmit={handleSubmit(() => setEnviado(true))} className="prosa-municipal mt-4 grid gap-4" noValidate>
        <p>
          <label htmlFor="r-nombre" className="font-bold">Tu nombre</label>
          <input id="r-nombre" {...register("nombre")} className="mt-1 w-full rounded border-2 border-primary px-3 py-2 text-base" aria-invalid={Boolean(errors.nombre)} aria-describedby={errors.nombre ? "e-nombre" : undefined} />
          {errors.nombre && <span id="e-nombre" role="alert" className="mt-1 block font-semibold text-error">{errors.nombre.message}</span>}
        </p>
        <p>
          <label htmlFor="r-correo" className="font-bold">Tu correo para responderte</label>
          <input id="r-correo" type="email" {...register("correo")} className="mt-1 w-full rounded border-2 border-primary px-3 py-2 text-base" aria-invalid={Boolean(errors.correo)} aria-describedby={errors.correo ? "e-correo" : undefined} />
          {errors.correo && <span id="e-correo" role="alert" className="mt-1 block font-semibold text-error">{errors.correo.message}</span>}
        </p>
        <p>
          <label htmlFor="r-pagina" className="font-bold">¿En qué página está el problema?</label>
          <input id="r-pagina" {...register("pagina")} placeholder="Ejemplo: la ficha de empadronarme" className="mt-1 w-full rounded border-2 border-primary px-3 py-2 text-base" aria-invalid={Boolean(errors.pagina)} aria-describedby={errors.pagina ? "e-pagina" : undefined} />
          {errors.pagina && <span id="e-pagina" role="alert" className="mt-1 block font-semibold text-error">{errors.pagina.message}</span>}
        </p>
        <p>
          <label htmlFor="r-mensaje" className="font-bold">¿Qué problema has encontrado?</label>
          <textarea id="r-mensaje" rows={5} {...register("mensaje")} className="mt-1 w-full rounded border-2 border-primary px-3 py-2 text-base" aria-invalid={Boolean(errors.mensaje)} aria-describedby={errors.mensaje ? "e-mensaje" : undefined} />
          {errors.mensaje && <span id="e-mensaje" role="alert" className="mt-1 block font-semibold text-error">{errors.mensaje.message}</span>}
        </p>
        <p>
          <button type="submit" className="rounded bg-primary px-6 py-3 text-lg font-bold text-white">
            Enviar mi aviso de accesibilidad
          </button>
        </p>
      </form>
    </div>
  );
}
