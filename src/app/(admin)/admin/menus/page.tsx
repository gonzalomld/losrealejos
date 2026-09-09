import { MenusClient } from "@/components/admin/MenusClient";
import { NAV_MEGAMENU } from "@/data/navegacion";

export const dynamic = "force-dynamic";

export default function MenusAdmin() {
  return <MenusClient iniciales={NAV_MEGAMENU} />;
}
