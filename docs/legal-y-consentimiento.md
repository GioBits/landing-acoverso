# acoverso.com · Paquete legal y de consentimiento

Contenido de la carpeta:

| Archivo | Qué es |
|---|---|
| index.html | La web. Muestra el diseño de PC en ordenador y el de móvil en teléfono |
| terminos.html | Términos y condiciones v2.0 (incluyen pagos, cancelación y reembolsos) |
| privacidad.html | Política de privacidad v1.0 |
| cookies.html | Política de cookies v1.0 |
| servidor/registro-consentimiento-worker.js | Servidor que guarda cada aceptación con IP y hora del servidor |

Todo se sube junto a la raíz del dominio. Las fuentes y el logo van dentro de cada archivo: la web no hace ninguna conexión a terceros hasta que el visitante acepta o reproduce algo.

---

## 1. Antes de publicar (obligatorio)

1. Completar los datos marcados en amarillo en las tres políticas: estado de constitución de la LLC, dirección, correos, proveedor de hosting, herramienta de videollamada, fecha de publicación y, en los Términos, los días del plazo de reembolso, la condición del reembolso, las cuotas, la garantía y la duración del acceso.
2. Que un abogado revise los tres textos. Son borradores sólidos, no asesoría legal.
3. Quitar el aviso amarillo de borrador de cada política.
4. Cada vez que cambies el texto de una política, sube su número de versión. La web guarda la versión y la huella SHA-256 que cada persona aceptó.
5. Sustituir las cifras marcadas como ejemplo y los casos por datos reales y comprobables (ver punto 5 de la revisión).

## 2. Configuración en index.html

Al inicio del script hay un bloque `ACO` con cinco valores:

| Valor | Qué poner |
|---|---|
| consentEndpoint | URL del servidor de registro, p. ej. `https://registro.acoverso.com/consent` |
| calLink | Ya configurado: `acoverso/educador-digital` |
| videos.hero | Enlace de YouTube (o Loom) del VSL y su portada en `/public/video` |
| metaPixelId | ID del píxel de Meta, si vais a usarlo |
| gaId | ID de Google Analytics (`G-XXXX`), si vais a usarlo |

Si metaPixelId o gaId tienen valor, aparece automáticamente el aviso de cookies con Aceptar, Rechazar y Configurar al mismo nivel. Si están vacíos, no aparece aviso porque no hay cookies opcionales que pedir.

## 3. Registro trazable de aceptaciones

### Cómo funciona

1. El visitante responde una pregunta (si ya vende un producto). Si responde Sí, se abre el calendario de Cal.com. Las casillas ya no están en el recuadro de la agenda.
2. Al final de la página hay un aviso legal fijo con enlace a los Términos y a la Política de privacidad.
3. Al abrirse el calendario, la web envía al servidor: ID único, hora del navegador y zona horaria, página, navegador, idioma, texto exacto del aviso, URL, versión y SHA-256 de cada documento y la respuesta. Estado en Airtable: Aviso mostrado.
4. El servidor añade lo que el navegador no puede falsear: hora del servidor en UTC, dirección IP y país, calcula una huella SHA-256 del registro completo y lo guarda en Airtable.
5. La aceptación expresa se hace en el formulario de reserva de Cal.com con una casilla obligatoria (ver configuración abajo). Al reservar, el webhook completa el registro con nombre, correo, reserva y si se marcó la casilla. Estado: Aceptado en Cal.com y reservado.

Resultado: cada fila de Airtable demuestra quién aceptó, qué versión exacta, cuándo, desde qué IP y con qué reserva.

### Tabla de Airtable: ACEPTACIONES

Crear en la base de ACOVERSO LLC con estos campos (los nombres deben coincidir):

| Campo | Tipo |
|---|---|
| consent_id | Texto de una línea (campo principal) |
| fecha_hora_servidor_utc | Texto de una línea |
| fecha_hora_cliente | Texto de una línea |
| zona_horaria_cliente | Texto de una línea |
| ip | Texto de una línea |
| pais_ip | Texto de una línea |
| navegador | Texto largo |
| pagina | URL |
| metodo | Texto de una línea |
| terminos_texto_aceptado | Texto largo |
| terminos_version | Texto de una línea |
| terminos_sha256 | Texto de una línea |
| terminos_marcado_en | Texto de una línea |
| privacidad_texto_aceptado | Texto largo |
| privacidad_version | Texto de una línea |
| privacidad_sha256 | Texto de una línea |
| privacidad_marcado_en | Texto de una línea |
| respuestas | Texto largo |
| evidencia_json | Texto largo |
| huella_registro_sha256 | Texto de una línea |
| nombre | Texto de una línea |
| email | Correo electrónico |
| reserva_cal_uid | Texto de una línea |
| reserva_inicio | Texto de una línea |
| acepta_en_cal | Casilla de verificación |
| respuestas_cal | Texto largo |
| estado | Selección única: Aviso mostrado, Aceptado en Cal.com y reservado, Reservado sin casilla |

Recomendaciones:
- Dar acceso de edición a esta tabla solo a 1 o 2 personas. La huella SHA-256 permite detectar si alguien modificó un registro: se recalcula sobre `evidencia_json` y debe coincidir.
- Exportar la tabla a CSV una vez al mes y guardarla en Drive como copia inalterable.

### Desplegar el servidor (Cloudflare Workers, plan gratuito)

1. Cloudflare > Workers & Pages > Create > Worker. Pegar `servidor/registro-consentimiento-worker.js`.
2. Settings > Variables and Secrets: `AIRTABLE_TOKEN` (secreto), `AIRTABLE_BASE`, `AIRTABLE_TABLE` = ACEPTACIONES, `ALLOWED_ORIGIN` = https://acoverso.com, `CAL_WEBHOOK_SECRET` (secreto).
3. Asignarle la ruta `registro.acoverso.com/*` (requiere que el dominio esté en Cloudflare) o usar la URL `*.workers.dev` que da Cloudflare.
4. Poner `https://registro.acoverso.com/consent` en `consentEndpoint`.
5. En Cal.com > Settings > Developer > Webhooks: URL `https://registro.acoverso.com/cal`, evento Booking Created, y el mismo secreto que `CAL_WEBHOOK_SECRET`.
6. Prueba: responder Sí en la web y comprobar que aparece la fila en Airtable con IP y hora del servidor; reservar y comprobar que se completan nombre y correo.

Comprobar en la documentación de Cal.com el nombre exacto de la cabecera de firma del webhook antes de activar la verificación; el código usa `x-cal-signature-256`.

## 4. Datos que pide la web (minimización)

La web solo pide una respuesta sí o no. Los datos de contacto los pide Cal.com. Configurar el formulario del evento de Cal.com así:

| Campo | Estado | Motivo |
|---|---|---|
| Nombre | Obligatorio | Identificar a la persona en la llamada |
| Correo electrónico | Obligatorio | Confirmación y recordatorio de la reserva |
| WhatsApp | Obligatorio | Contacto del equipo para preparar la llamada |
| Usuario de Instagram | Opcional | Revisar la marca antes de la llamada |
| Casilla de aceptación (tipo Checkbox, identificador `acepta-terminos`) | Obligatoria | Aceptación expresa. Etiqueta: "He leído y acepto los [Términos y condiciones](https://acoverso.com/terminos) y la [Política de privacidad](https://acoverso.com/privacidad)" |
| Cualquier otro campo | Eliminar | No es necesario para el diagnóstico |

No pedir facturación, ingresos, dirección, fecha de nacimiento ni documentos de identidad. Si en el futuro se añade un campo, hay que añadirlo también a la Política de privacidad y subir su versión.

---

## 5. Revisión legal

No soy abogado y esto no es asesoría legal. Es una revisión técnica para preparar la reunión con vuestro abogado.

### Leyes que aplican y estado

| Ley | Por qué aplica | Estado |
|---|---|---|
| FTC Act, sección 5 (EE. UU.) | ACOVERSO LLC es empresa estadounidense; prohíbe publicidad engañosa | Pendiente: cifras de resultados deben ser reales y demostrables |
| Regla de reseñas y testimonios de la FTC (16 CFR 465, vigente desde oct. 2024) | Prohíbe testimonios falsos o que tergiversen la experiencia; multas de hasta 53.088 USD por infracción | Pendiente: casos reales con autorización escrita |
| ESIGN Act (EE. UU.) | Validez de la aceptación electrónica | Cumple: casillas, versión y registro |
| CalOPPA (California) | Exige política de privacidad visible a cualquier web comercial que recoja datos de residentes en California | Cumple: política enlazada y mención a Do Not Track |
| CAN-SPAM y TCPA (EE. UU.) | Correos comerciales y mensajes o llamadas a números de EE. UU. | Atención: no enviar comunicaciones comerciales ni mensajes automáticos sin consentimiento previo |
| LFPDPPP 2025 (México) | Aviso de privacidad integral y simplificado; derechos ARCO | Cumple: aviso simplificado junto a las casillas y política completa |
| Ley 1581 de 2012 y Decreto 1377 de 2013 (Colombia) | Autorización previa, expresa e informada, y obligación de conservar su prueba | Cumple con el registro trazable, una vez conectado el servidor |
| Ley 25.326 (Argentina) | Consentimiento libre, expreso e informado | Cumple |
| Ley 29733 y nuevo reglamento DS 016-2024-JUS (Perú, vigente desde marzo de 2025) | Aplica a empresas extranjeras que ofrecen servicios a personas en Perú; consentimiento expreso para publicidad y transferencias | Atención: el reglamento exige designar un representante domiciliado en Perú si se dirige la oferta a ese país |
| Ley 21.719 (Chile, vigente desde el 1 de diciembre de 2026) | Aplica a tratamientos dirigidos a personas en Chile; multas de hasta 20.000 UTM | Cumple en lo básico; revisar si se publicita activamente en Chile |
| RGPD y directiva ePrivacy (UE/España) | Solo si se dirige la oferta a la UE | Cumple: cookies opcionales desactivadas por defecto, fuentes locales y vídeos bajo demanda |
| Leyes de consumo de cada país | Derechos de retracto (5 días hábiles en México y Colombia, 14 días en la UE) | Cubierto en el apartado 6.5 de los Términos; el abogado debe confirmar si aplican a clientes que compran como empresa |
| Grabación de llamadas | Varios estados de EE. UU. exigen consentimiento de todas las partes | Los Términos obligan a pedir permiso al inicio de cada llamada grabada |

### Cookies: ¿necesito pedir consentimiento?

Hoy no. La web solo guarda en el navegador la preferencia de cookies, que es estrictamente necesaria. Las fuentes ya no se cargan desde Google (un tribunal alemán en 2022 consideró ilegal enviar la IP del visitante a Google Fonts sin consentimiento), y los vídeos de YouTube no se cargan hasta que la persona pulsa reproducir y acepta.

En cuanto añadáis el píxel de Meta o Google Analytics, sí: para visitantes de la UE y Reino Unido es obligatorio el consentimiento previo, y en Latinoamérica la tendencia es la misma (Perú exige consentimiento expreso para publicidad). La web ya está preparada: al rellenar `metaPixelId` o `gaId` aparece el aviso y esos scripts no se cargan hasta que la persona acepta.

### Derechos de las imágenes y recursos

| Recurso | Titular | Estado |
|---|---|---|
| Logo ÄCO | ACOVERSO LLC | Verificar que el diseñador cedió los derechos por escrito; valorar registro de marca en la USPTO |
| Tipografías Anton, Antonio, IBM Plex Mono | Sus autores, licencia SIL Open Font License 1.1 | Cumple: uso comercial permitido, incluida la inserción en la web |
| Cuadrícula, grano, iconos y diagramas | Creados en código para esta web | Cumple: sin derechos de terceros |
| Foto de Alexander Acosta | Pendiente | Si la tomó un fotógrafo, conseguir licencia o cesión por escrito |
| Fotos o vídeos de los casos | Pendiente | Autorización escrita de cada cliente para usar su nombre, imagen y resultados |
| Vídeos de YouTube | ACOVERSO | Revisar que no incluyan música, imágenes o capturas de terceros sin licencia |

Hoy la web no usa ninguna fotografía ni imagen de terceros.

### Riesgos principales

1. **Afirmaciones de resultados.** El +100K facturados para clientes y las cifras de los casos son afirmaciones de ingresos. Necesitáis prueba documental de cada una (facturas, capturas de pasarela) y no deben presentarse como típicas si no lo son. La FTC tiene en trámite una regla que extendería a programas de coaching la obligación de tener esa prueba por escrito y entregarla a quien la pida.
2. **Cifras de ejemplo.** Las cifras marcadas como ejemplo no pueden publicarse. Publicarlas sería exactamente lo que prohíbe la regla de testimonios.
3. **Reembolsos y garantía (Términos, apartados 6 y 7).** Una garantía con condiciones imposibles de cumplir se considera engañosa (la FTC demandó a Publishing.com por garantías ilusorias). Si ofrecéis garantía, sus condiciones deben ser concretas y alcanzables.
4. **Perú.** Si vais a hacer anuncios dirigidos a Perú, hay que resolver la designación de representante.
