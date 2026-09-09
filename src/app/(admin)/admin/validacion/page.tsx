import { ValidacionClient } from "@/components/admin/ValidacionClient";
import { leerParaGestor } from "@/lib/cms/almacen";
import type { RegistroEditorial } from "@/lib/cms/tipos-editoriales";

export const dynamic = "force-dynamic";

export default async function ValidacionAdmin() {
  const colecciones = ["tramites", "noticias", "eventos", "ayudas", "avisos", "servicios"] as const;
  const todo: RegistroEditorial<Record<string, unknown>>[] = [];
  for (const c of colecciones) todo.push(...((await leerParaGestor(c as never)) as RegistroEditorial<Record<string, unknown>>[]));
  return <ValidacionClient iniciales={todo} />;
}
