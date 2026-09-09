-- Persistencia del gestor de contenidos (pliego: alojamiento en Unión Europea).
-- Proyecto Supabase creado en región europea (p. ej. eu-west-1 / eu-central-1).
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
