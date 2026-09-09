# Persistencia del gestor de contenidos

## Dónde viven los datos

1. **Base de datos Postgres (Supabase) en región europea** — vía prioritaria.
   Requisito del pliego: alojamiento en la Unión Europea. El proyecto Supabase
   está en región `eu-west-3` (París, Unión Europea); la migración
   `supabase/migrations/0001_cms_registros.sql` crea `cms_registros` y
   `cms_actividad` con RLS activado y sin políticas (deniega todo acceso por
   claves públicas; solo la clave de servicio opera). El modelo persistido es
   el de `src/lib/cms/tipos-editoriales.ts`, tal cual, en la columna
   `registro` (`jsonb`); `coleccion` + `id` son la clave primaria.
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

## Región de ejecución (Vercel)

Las funciones del despliegue ejecutan en `cdg1` (París, Unión Europea),
fijado en `vercel.json`, junto a la base de datos (`eu-west-3`, París).
Así los datos en tránsito y en reposo permanecen en la Unión Europea y se
evita latencia intercontinental entre funciones y base de datos. Al ser un
prototipo sin despliegue configurado todavía, esta es la configuración a
aplicar al crear el proyecto en Vercel; verificar entonces la cabecera
`x-vercel-id` de una respuesta (empieza por la región real, p. ej. `cdg1::…`).

## Copia de seguridad externa y restauración

Las copias automáticas de Supabase viven dentro de la plataforma y no cubren
los ficheros de almacenamiento. Procedimiento propio, fuera de la plataforma:

- **Exportación**: `SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run cms:backup`
  vuelca `cms_registros` + `cms_actividad` a `backups/cms-backup-<fecha>.json`
  (o a `CMS_BACKUP_DIR`). Al terminar imprime nº de registros por colección y
  el SHA-256 del fichero: anótalo en el parte. Copia ese directorio a
  almacenamiento externo (disco municipal, S3, etc.); el directorio `backups/`
  está en `.gitignore` y nunca entra en el repositorio. Periodicidad
  recomendada: diaria en producción (cron del servidor o tarea programada).
- **Restauración paso a paso**:
  1. `npm run cms:restore -- backups/<fichero>.json --dry-run` y comprobar que
     los conteos por colección coinciden con el parte.
  2. Sin `--dry-run` para ejecutar: vacía ambas tablas y resiembra desde la
     copia (idempotente por clave primaria), y al final relee conteos para
     verificar.
  3. Recargar el portal y el gestor y comprobar un registro de cada colección.
- **Verificación del procedimiento**: ejecutar trimestralmente un ciclo
  completo backup → restore en un proyecto de ensayo (nunca en producción
  directamente) y dejar constancia de fecha y SHA en el registro de actividad.

## Comprobación obligatoria en el entorno desplegado

1. Entrar en `/admin/tramites` como validador.
2. Marcar un trámite como **caducado**.
3. Recargar el portal público: la ficha ya no aparece en el catálogo
   (`estaPublicadoYVigente` la excluye) y `revalidatePath` invalida
   `/tramites`, `/tramites/[id]`, `/`, `/mapa-del-sitio` y `/buscar`.
4. Si el portal no lo refleja, la persistencia no está terminada.
5. Crear un contenido nuevo desde el gestor, recargar y comprobar que
   persiste (la fusión por id incluye los registros que no están en la
   semilla: ver comprobación B1.2 en el historial del proyecto).
6. Restablecer la demo y comprobar que vuelve al estado versionado de
   `data/cms/*.json` (nunca borra los ficheros).
7. Mirar el aviso superior del gestor: debe indicar el backend activo
   (`db` en desplegado con base, `fichero` en local, `lectura` en modo
   consulta). Sin base configurada —situación actual del prototipo— el
   aviso correcto es el de `fichero` en local.
8. Comprobación de RLS (con proyecto Supabase creado): una petición con la
   clave anónima a `/rest/v1/cms_registros?select=id&limit=1` debe recibir
   rechazo (401/403 o conjunto vacío por RLS + revoke), mientras el gestor
   con service_role opera con normalidad.
