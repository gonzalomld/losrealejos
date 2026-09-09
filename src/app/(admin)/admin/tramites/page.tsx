import { TramitesClient } from "@/components/admin/TramitesClient";
import { leerParaGestor } from "@/lib/cms/almacen";

export const dynamic = "force-dynamic";

export default async function TramitesAdmin() {
  const regs = await leerParaGestor<Record<string, unknown>>("tramites" as never);
  return <TramitesClient iniciales={regs} />;
}
