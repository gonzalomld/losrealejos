-- Persistencia del gestor de contenidos (pliego: alojamiento en Unión Europea).
-- Proyecto Supabase en región eu-west-3 (París, Unión Europea).
-- Aplicar desde el panel SQL de Supabase o con `supabase db push`.
-- El modelo es el de tipos-editoriales.ts, persistido tal cual en `registro`.

create table if not exists cms_registros (
  coleccion text not null,
  id text not null,
  registro jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (coleccion, id)
);

create table if not exists cms_actividad (
  id bigint generated always as identity primary key,
  fecha date not null,
  usuario text not null,
  accion text not null,
  elemento text not null,
  detalle text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists idx_actividad_fecha on cms_actividad (fecha desc);

-- Seguridad a nivel de fila: las tablas del esquema público quedan expuestas
-- por PostgREST y la clave anónima del proyecto es pública. Sin RLS, cualquiera
-- con esa clave podría leer y escribir el contenido del gestor saltándose la
-- aplicación y el modelo de permisos. Sin políticas definidas, RLS deniega todo
-- acceso por claves públicas; la clave de servicio (service_role) ignora RLS
-- por diseño, así que el gestor —que solo usa service_role en servidor— sigue
-- operando con normalidad.
alter table cms_registros enable row level security;
alter table cms_actividad enable row level security;

-- Defensa en profundidad: no depender solo de RLS. Se revocan los permisos por
-- defecto sobre estas tablas para los roles públicos.
revoke all on table cms_registros from anon, authenticated;
revoke all on table cms_actividad from anon, authenticated;
