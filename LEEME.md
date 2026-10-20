# acoverso.com · Landing en Next.js

Proyecto Next.js 15 (App Router) listo para Vercel. Separa contenido, diseño, comportamiento y servidor para que cada cambio se haga en un solo sitio.

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Textos de la página (hero, cifras, problema, sistema, modelos, proceso, FAQ, cierre, aviso legal) | `content/home.js` |
| Casos de éxito (añadir, quitar, cambiar cifras o textos) | `content/cases.js` + vídeo y portada en `public/casos/` |
| Textos legales | `content/legal/terminos.js`, `privacidad.js`, `cookies.js` |
| Fecha de vigencia y aviso de borrador de las políticas | `content/legal/index.js` |
| Cal.com, vídeo del hero (YouTube o Loom), píxel de Meta, Google Analytics | `config/site.js` → `integrations` |
| Nombre, dominio, descripción para Google, Instagram | `config/site.js` → `site` |
| Colores de marca, tipografías, medidas | `styles/01-tokens.css` |
| Diseño de una sección concreta | `styles/<número>-<sección>.css` |
| Orden de las secciones | `app/(landing)/page.jsx` |
| Estructura (HTML) de una sección | `components/sections/<Sección>.jsx` |
| Una animación o interacción | `lib/behaviors/` (ver tabla abajo) |

Para el contenido no hace falta tocar componentes: los componentes leen de `content/` y `config/`.

## Árbol del proyecto

```
app/
  layout.jsx                 Raíz: fuentes, variables y metadatos
  (landing)/layout.jsx       Carga los estilos de la landing en orden
  (landing)/page.jsx         La landing: lista de secciones en orden
  (legal)/[slug]/page.jsx    /terminos, /privacidad, /cookies
  api/consent/route.js       Registro de aceptaciones → Airtable
  api/cal/route.js           Webhook de Cal.com → completa el registro
components/
  layout/                    Fondo, header, menú móvil, aviso legal, pie, cookies, botón fijo
  sections/                  Hero, Agenda, Problem, System, Models, Process, Cases, Faq, Closing
  ui/                        Piezas reutilizables (Section, Counter, RichText) e iconos
  legal/LegalPage.jsx        Plantilla común de las políticas
  LandingBehaviors.jsx       Activa las interacciones en el navegador
content/                     Todo el texto editable
config/site.js               Integraciones y datos del sitio
lib/
  behaviors/                 Interacciones, un archivo por grupo
  legal.js                   Huella SHA-256 de cada política
  airtable.js                Conexión con Airtable
  format.js                  Formato de cifras (18.000)
styles/                      Un CSS por parte de la página, numerados en orden de cascada
public/                      Vídeos y portadas de casos, logo y fuentes
docs/                        Guía legal y de consentimiento, y el servidor alternativo de Cloudflare
```

## Interacciones (`lib/behaviors/`)

| Archivo | Qué hace |
|---|---|
| `visual.js` | Grano del fondo, secciones que se encienden al entrar en pantalla, cifras que suben de 0, brillo bajo el cursor |
| `scroll-effects.js` | Barra de lectura, header sólido, línea del proceso y foco que sigue al cursor |
| `navigation.js` | Enlace activo del menú, menú móvil y botón fijo inferior |
| `sections.js` | Diagrama del BOS, carrusel de casos, vídeos de casos y FAQ |
| `agenda.js` | Posición de la agenda (móvil/PC), pregunta, registro del aviso legal y Cal.com |
| `cookies.js` | Preferencias de cookies y vídeo del hero |
| `index.js` | Orden en que se activa todo |

## Políticas y huella

Cada política tiene versión y huella SHA-256. La huella se calcula sola a partir del texto, así que, si cambias un texto, sube su `version`. La versión y la huella que vio cada persona quedan guardadas en Airtable con su registro.

## Publicar en Vercel

1. Sube esta carpeta a un repositorio privado de GitHub.
2. En vercel.com, entra en **Add New → Project** e importa el repositorio. No cambies la configuración del build.
3. En **Environment Variables**, añade las de `.env.example`. Sin ellas la web funciona, pero no guarda registros.
4. Pulsa **Deploy**. En **Settings → Domains**, añade `acoverso.com` y `www.acoverso.com`.

Para probarla en local: `npm install` y `npm run dev` → http://localhost:3000

## Registro de aceptaciones

- **`/api/consent`:** al abrirse el calendario guarda el aviso legal mostrado, la versión y la huella de cada documento, la IP, el país y la hora del servidor. Estado: *Aviso mostrado*.
- **`/api/cal`:** es el webhook de Cal.com.
  - Configúralo en **Cal.com → Settings → Developer → Webhooks**: URL `https://acoverso.com/api/cal`, evento **Booking Created** y el mismo secreto que `CAL_WEBHOOK_SECRET`.
  - Completa el registro con el nombre, el correo y la reserva, y guarda si se marcó la casilla obligatoria `acepta-terminos` del formulario de reserva.
  - Esa casilla se crea en **Event Types → educador-digital → Advanced → Booking questions**: tipo Checkbox, identificador `acepta-terminos`, obligatoria.
- **Airtable:** el esquema de la tabla está en `docs/legal-y-consentimiento.md`, apartado 3.

## Pendiente antes de abrir al público

Completa los datos marcados en amarillo en las políticas y pide la revisión de un abogado. Además:

- respaldo de las cifras;
- autorización escrita de cada clienta para sus casos;
- respuesta de la FAQ sobre tiempo de implementación.

Lo tienes detallado en `docs/legal-y-consentimiento.md`.
