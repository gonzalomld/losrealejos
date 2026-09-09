# Persistencia del gestor de contenidos

## Dónde viven los datos

1. **Base de datos Postgres (Supabase) en región europea** — vía prioritaria.
   Requisito del pliego: alojamiento en la Unión Europea. El proyecto Supabase
   se crea en región UE (p. ej. `eu-west-1` o `eu-central-1`); la migración
   `supabase/migrations/0001_cms_registros.sql` crea `cms_registros` y
   `cms_actividad`. El modelo persistido es el de
   `src/lib/cms/tipos-editoriales.ts`, tal cual, en la columna `registro`
   (`jsonb`); `coleccion` + `id` son la clave primaria.
2. **Ficheros `data/cms/*.json`** — semilla versionada en el repositorio y
   reserva de escritura en desarrollo local.
3. **Memoria de la semilla** — lectura de reserva cuando no hay ni base ni
   fichero escribible.

## Cómo decide el almacén (`src/lib/cms/almacen.ts`)

- `dbDisponible()`: sondeo real contra PostgREST (SELECT mínimo con timeout),
  nunca inferido de variables de entorno. Caché de 30 s.
- `tipoBackend()`: `db` si la base responde; si no, `fichero` si el probe de
  escritura local funciona; si no, `lectura` (modo consulta).
- **Siembra al arrancar**: si la tabla está vacía, se siembra desde los
  ficheros `data/cms/*.json` (idempotente por upsert).
- **Restablecer demo**: borra y vuelve a sembrar desde esos ficheros (en base
  o en fichero según el backend activo). Nunca borra los ficheros versionados.

## Configuración (Vercel → Production)

`SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` como variables de entorno del
proyecto. La clave de servicio es solo servidor: nunca `NEXT_PUBLIC_`, nunca
en el código. Ver `.env.example`.

## Comprobación obligatoria en el entorno desplegado

1. Entrar en `/admin/tramites` como validador.
2. Marcar un trámite como **caducado**.
3. Recargar el portal público: la ficha ya no aparece en el catálogo
   (`estaPublicadoYVigente` la excluye) y `revalidatePath` invalida
   `/tramites`, `/tramites/[id]`, `/`, `/mapa-del-sitio` y `/buscar`.
4. Si el portal no lo refleja, la persistencia no está terminada.
