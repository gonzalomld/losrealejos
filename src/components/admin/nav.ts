import type { LucideIcon } from "lucide-react";
import {
  FileText, Newspaper, CalendarDays, HandCoins, Briefcase, Megaphone,
  LayoutGrid, Globe, FolderOpen, Scale, ShieldCheck, CheckSquare,
  Handshake, ScrollText, Gauge, Accessibility, Menu as MenuIcon,
  BookOpen, Users, Plug,
} from "lucide-react";
import type { Coleccion } from "@/lib/cms/tipos-editoriales";

export type ItemNav = { id: string; titulo: string; href: string; coleccion: string; Icono: LucideIcon };
export type GrupoNav = { titulo: string; items: ItemNav[] };

export const NAV_ADMIN: GrupoNav[] = [
  {
    titulo: "Contenido",
    items: [
      { id: "tramites", titulo: "Trámites", href: "/admin/tramites", coleccion: "tramites" satisfies Coleccion, Icono: FileText },
      { id: "servicios", titulo: "Servicios del día a día", href: "/admin/servicios", coleccion: "servicios" satisfies Coleccion, Icono: LayoutGrid },
      { id: "noticias", titulo: "Noticias", href: "/admin/noticias", coleccion: "noticias" satisfies Coleccion, Icono: Newspaper },
      { id: "agenda", titulo: "Agenda de eventos", href: "/admin/agenda", coleccion: "eventos" satisfies Coleccion, Icono: CalendarDays },
      { id: "ayudas", titulo: "Ayudas y subvenciones", href: "/admin/ayudas", coleccion: "ayudas" satisfies Coleccion, Icono: HandCoins },
      { id: "empleo", titulo: "Empleo público", href: "/admin/empleo", coleccion: "empleo" satisfies Coleccion, Icono: Briefcase },
      { id: "avisos", titulo: "Avisos y plazos", href: "/admin/avisos", coleccion: "avisos" satisfies Coleccion, Icono: Megaphone },
      { id: "paginas", titulo: "Páginas y campañas", href: "/admin/paginas", coleccion: "paginas" satisfies Coleccion, Icono: Globe },
      { id: "areas", titulo: "Áreas municipales", href: "/admin/areas", coleccion: "areas" satisfies Coleccion, Icono: LayoutGrid },
    ],
  },
  {
    titulo: "Documentos",
    items: [
      { id: "documentos", titulo: "Biblioteca de documentos", href: "/admin/documentos", coleccion: "documentos" satisfies Coleccion, Icono: FolderOpen },
      { id: "transparencia", titulo: "Transparencia", href: "/admin/transparencia", coleccion: "transparencia" satisfies Coleccion, Icono: Scale },
      { id: "anonimizacion", titulo: "Cola de anonimización", href: "/admin/anonimizacion", coleccion: "documentos" satisfies Coleccion, Icono: ShieldCheck },
    ],
  },
  {
    titulo: "Gobernanza",
    items: [
      { id: "validacion", titulo: "Flujo de validación", href: "/admin/validacion", coleccion: "validacion", Icono: CheckSquare },
      { id: "acuerdos", titulo: "Acuerdos por área", href: "/admin/acuerdos", coleccion: "acuerdos", Icono: Handshake },
      { id: "actividad", titulo: "Registro de actividad", href: "/admin/actividad", coleccion: "actividad", Icono: ScrollText },
    ],
  },
  {
    titulo: "Calidad",
    items: [
      { id: "calidad", titulo: "Calidad del portal", href: "/admin/calidad", coleccion: "calidad", Icono: Gauge },
      { id: "accesibilidad", titulo: "Accesibilidad", href: "/admin/calidad/accesibilidad", coleccion: "calidad", Icono: Accessibility },
    ],
  },
  {
    titulo: "Configuración",
    items: [
      { id: "menus", titulo: "Menús y navegación", href: "/admin/menus", coleccion: "menus", Icono: MenuIcon },
      { id: "vocabularios", titulo: "Vocabularios", href: "/admin/vocabularios", coleccion: "vocabularios", Icono: BookOpen },
      { id: "usuarios", titulo: "Usuarios y permisos", href: "/admin/usuarios", coleccion: "usuarios", Icono: Users },
      { id: "enlaces", titulo: "Sistemas externos", href: "/admin/enlaces", coleccion: "enlaces", Icono: Plug },
    ],
  },
];
