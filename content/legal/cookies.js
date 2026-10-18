// Política de cookies
// Edita el texto dentro de body (HTML). Si cambias el contenido, sube la versión:
// la huella SHA-256 se recalcula sola y queda registrada en cada aceptación.
// Los datos pendientes van marcados con <mark class="pend">[...]</mark>.

export const cookies = {
  slug: 'cookies',
  title: "Política de cookies",
  version: '1.0',
  intro: "Qué cookies y tecnologías similares usa acoverso.com, cuáles están activas por defecto y cómo cambiar tu elección.",
  body: `
<h2 id="c1">1. Qué son</h2>
<p>Las cookies y el almacenamiento local son pequeños archivos que un sitio guarda en tu navegador para recordar información, como tus preferencias, o para medir visitas.</p>

<h2 id="c2">2. Lo que está activo por defecto</h2>
<p>Al entrar en acoverso.com solo se usa lo estrictamente necesario. Las tipografías se sirven desde nuestro propio sitio, sin conexiones a Google. Las cookies de medición y publicidad están desactivadas hasta que las aceptas, y los vídeos de Loom no se cargan hasta que pulsas reproducir.</p>

<h2 id="c3">3. Lista de cookies</h2>
<div class="tbl"><table>
<thead><tr><th>Nombre</th><th>Proveedor</th><th>Tipo</th><th>Para qué</th><th>Duración</th></tr></thead>
<tbody>
<tr><td>aco_cookie_prefs</td><td>ÄCOVERSO (almacenamiento local)</td><td>Necesaria</td><td>Recordar tus preferencias de cookies</td><td>12 meses</td></tr>
<tr><td>aco_consent_id</td><td>ÄCOVERSO (almacenamiento de sesión)</td><td>Necesaria</td><td>Vincular tu aceptación con tu reserva</td><td>Hasta cerrar el navegador</td></tr>
<tr><td>Cookies de Cal.com</td><td>Cal.com</td><td>Necesaria al agendar</td><td>Mostrar el calendario y completar la reserva que pides</td><td>Según Cal.com</td></tr>
<tr><td>Cookies de Loom</td><td>Loom</td><td>Contenido externo</td><td>Reproducir los vídeos; solo al pulsar reproducir</td><td>Según Loom</td></tr>
<tr><td>_fbp</td><td>Meta</td><td>Publicidad</td><td>Medir campañas y mostrarte anuncios; solo si la aceptas</td><td>90 días</td></tr>
<tr><td>_ga, _ga_*</td><td>Google Analytics</td><td>Medición</td><td>Contar visitas de forma agregada; solo si la aceptas</td><td>Hasta 2 años</td></tr>
</tbody></table></div>
<p>Las cookies de Meta y Google solo se usarán cuando las activemos en el sitio; mientras tanto no se cargan aunque las aceptes.</p>

<h2 id="c4">4. Cómo cambiar tu elección</h2>
<p>Puedes cambiarla cuando quieras desde el enlace Preferencias de cookies al pie de cada página, o borrar las cookies desde la configuración de tu navegador. Retirar el consentimiento no afecta a lo tratado antes.</p>

<h2 id="c5">5. Más información</h2>
<p>Para saber cómo tratamos los datos que recogen estas tecnologías, consulta la <a href="/privacidad">Política de privacidad</a>. Para cualquier duda: <mark class="pend">[CORREO DE PRIVACIDAD]</mark>.</p>
`,
};
