import { notFound } from "next/navigation";
import { AnonimizacionDetalle } from "@/components/admin/AnonimizacionDetalle";
import { leerRegistro } from "@/lib/cms/almacen";

export const dynamic = "force-dynamic";

export default async function AnonimizacionId({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const reg = await leerRegistro<Record<string, unknown>>("transparencia" as never, id);
  if (!reg) notFound();
  return <AnonimizacionDetalle registro={reg} />;
}
