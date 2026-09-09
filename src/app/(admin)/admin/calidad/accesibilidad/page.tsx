import { AdminContenido, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { VerificadorPanel } from "@/components/admin/editor/VerificadorPanel";

export default function AccesibilidadAdmin() {
  return (
    <AdminContenido>
      <AdminPageHeader
        titulo="Accesibilidad"
        descripcion="Reglas que el verificador aplica en el editor. Solo bloquean la publicación las comprobables sin ambigüedad; el contraste aproximado es aviso."
      />
      <VerificadorPanel
        resultados={[
          { regla: "img-alt", mensaje: "Ejemplo de bloqueo: imagen informativa sin texto alternativo.", severidad: "bloqueo" },
          { regla: "jerarquia", mensaje: "Ejemplo de bloqueo: salto de h2 a h4.", severidad: "bloqueo" },
          { regla: "enlace", mensaje: "Ejemplo de bloqueo: «leer más» no describe el destino.", severidad: "bloqueo" },
          { regla: "contraste", mensaje: "Ejemplo de aviso: contraste calculado de forma aproximada (4,2:1). Revisar manualmente.", severidad: "aviso" },
        ]}
      />
    </AdminContenido>
  );
}
