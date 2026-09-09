import { definicionDe } from "@/lib/cms/colecciones";
import { ColeccionClient } from "@/components/admin/ColeccionClient";
import { leerParaGestor } from "@/lib/cms/almacen";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Pagina() {
  const definicion = definicionDe("empleo");
  if (!definicion) notFound();
  const regs = await leerParaGestor<Record<string, unknown>>("empleo" as never);
  return <ColeccionClient definicion={definicion} iniciales={regs} />;
}
