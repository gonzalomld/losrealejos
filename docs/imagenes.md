# Imágenes del rediseño: qué foto sustituye a cada ilustración

Las ilustraciones SVG actuales son placeholders propios con la misma
proporción que la foto definitiva. Sustituir es cambiar `src` y `alt`
en `src/lib/medios.ts`, sin tocar componentes.

| Posición | Fichero actual | Proporción | Foto futura prevista | Alt previsto |
|---|---|---|---|---|
| Hero portada | `/fotos/hero-panoramica.jpg` (1920x1344, JPG optimizado) | 10:7, recorte panorámico por CSS | Integrada el 9-9-2026: plaza e iglesia de Realejo Bajo | Plaza empedrada con templete ante iglesia blanca con torre-campanario y reloj |
| Banda sobre el pie | `/fotos/banda-pie.png` (1920x1241, PNG) | 21:6, recorte por CSS | Integrada el 9-9-2026: panorámica facilitada por el Ayuntamiento | Vista panorámica del municipio de Los Realejos |
| Pie del portal | `/fotos/plaza-los-realejos.jpg` (1920x1344, JPG optimizado) | Tarjeta 660px, foto abajo + degradado blanco arriba | Integrada el 9-9-2026: plaza e iglesia de Realejo Bajo | Plaza empedrada con templete ante iglesia blanca con torre-campanario y reloj |
| Franja trámites | `/ilustraciones/franja-tramites.svg` | 21:4 | Calle del casco urbano | Describir la calle visible |
| Franja barrio | `/ilustraciones/franja-barrio.svg` | 21:4 | Calle de barrio con vida cotidiana | Describir la calle visible |
| Franja ayuntamiento | `/ilustraciones/franja-ayuntamiento.svg` | 21:4 | Fachada de la casa consistorial | Describir la fachada visible |
| Franja transparencia | `/ilustraciones/franja-transparencia.svg` | 21:4 | Motivo sobrio o fachada neutra | Describir lo visible |
| Franja actualidad | `/ilustraciones/franja-actualidad.svg` | 21:4 | Plaza con gente en un acto municipal | Describir la escena visible |

Reglas: fotos guardadas en el proyecto, nunca enlazadas desde fuera.
Alt descriptivo de lo que se ve, nunca genérico.
