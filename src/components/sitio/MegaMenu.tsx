"use client";

import {
  BadgeEuro,
  BookOpen,
  Briefcase,
  Building2,
  Bus,
  CalendarDays,
  ChartColumn,
  ChevronDown,
  ChevronRight,
  Database,
  Droplets,
  FileCheck,
  FileText,
  Hammer,
  HandCoins,
  HeartHandshake,
  HousePlus,
  Landmark,
  Megaphone,
  Newspaper,
  PartyPopper,
  Phone,
  Plane,
  Scale,
  Trash2,
  TriangleAlert,
  Trophy,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { SeccionNav } from "@/data/navegacion";

const ICONOS: Record<string, LucideIcon> = {
  BadgeEuro, BookOpen, Briefcase, Building2, Bus, CalendarDays, ChartColumn,
  Database, Droplets, FileCheck, FileText, Hammer, HandCoins, HeartHandshake,
  HousePlus, Landmark, Megaphone, Newspaper, PartyPopper, Phone, Plane, Scale,
  Trash2, TriangleAlert, Trophy, Users, Waves,
};

/**
 * Panel del mega menú para una sección. Sin fotos: columnas de enlaces
 * reales con icono Lucide pequeño + título + 1 línea, + "ver todo" + ayuda.
 */
export function MegaMenuPanel({
  seccion,
  idPanel,
  alNavegar,
}: {
  seccion: SeccionNav;
  idPanel: string;
  alNavegar: () => void;
}) {
  return (
    <div id={idPanel} className="mega-panel">
      <div className="mx-auto max-w-6xl gap-8 px-4 py-6 md:grid md:grid-cols-[1fr_1fr_220px]">
        <p className="mb-4 md:col-span-3 md:mb-0">
          <a
            href={seccion.href}
            onClick={alNavegar}
            className="inline-flex items-center gap-1 text-xl font-extrabold text-primary underline underline-offset-4"
          >
            Ir a {seccion.texto}
            <ChevronDown aria-hidden="true" size={20} className="-rotate-90" />
          </a>
        </p>
        {[0, 1].map((col) => (
          <ul key={col} className="grid content-start gap-1">
            {seccion.destacados
              .filter((_, i) => i % 2 === col)
              .map((d) => {
                const Icono = ICONOS[d.icono] ?? ChevronRight;
                return (
                  <li key={d.titulo} className="mega-destino">
                    <a
                      href={d.href}
                      {...(d.externo ? { target: "_blank", rel: "noopener" } : {})}
                      onClick={alNavegar}
                      {...(d.externo
                        ? { "aria-label": `${d.titulo}: ${d.descripcion} (se abre otro sistema en pestaña nueva)` }
                        : {})}
                      className="flex items-start gap-2 rounded p-2"
                    >
                      <Icono aria-hidden="true" size={16} className="mt-1 shrink-0 text-primary" />
                      <span>
                        <span className="block font-bold text-primary">{d.titulo}</span>
                        <span className="block text-sm font-normal text-muted-foreground">{d.descripcion}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
          </ul>
        ))}
        <div className="h-fit rounded border bg-card p-4">
          <p>
            <a
              href={seccion.href}
              onClick={alNavegar}
              className="flex items-center gap-1 text-lg font-extrabold text-primary underline underline-offset-4"
            >
              {seccion.verTodo}
              <ChevronDown aria-hidden="true" size={18} className="-rotate-90" />
            </a>
          </p>
          <p className="mt-2 text-sm">
            ¿No sabes por dónde empezar? Llama al{" "}
            <a href="tel:+34922346234" className="font-bold text-primary underline">
              922 34 62 34
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
