/**
 * ÄCOVERSO · Registro trazable de aceptaciones (Cloudflare Worker)
 *
 * Qué hace
 *  1. POST /consent   Recibe la aceptación desde acoverso.com, le añade la hora del servidor (UTC),
 *                     la IP real del visitante y el país, calcula una huella SHA-256 del registro
 *                     completo y lo guarda en Airtable. El navegador no puede falsear la IP ni la hora del servidor.
 *  2. POST /cal       Webhook de Cal.com (BOOKING_CREATED): busca el registro por consent_id y le añade
 *                     el nombre, el correo y el UID de la reserva, para vincular la aceptación con la persona.
 *
 * Variables (Settings > Variables and Secrets del Worker)
 *  AIRTABLE_TOKEN     secreto: token personal de Airtable con permiso data.records:read y data.records:write sobre la base
 *  AIRTABLE_BASE      ID de la base, p. ej. appXXXXXXXXXXXXXX
 *  AIRTABLE_TABLE     nombre o ID de la tabla, p. ej. ACEPTACIONES
 *  ALLOWED_ORIGIN     https://acoverso.com
 *  CAL_WEBHOOK_SECRET secreto configurado en el webhook de Cal.com
 *
 * Despliegue: Cloudflare > Workers & Pages > Create Worker > pegar este archivo > añadir variables >
 * asignar ruta registro.acoverso.com/* > poner esa URL + /consent en ACO.consentEndpoint de la web.
 */

const MAX_BODY = 16 * 1024;

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const origin = req.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': origin === env.ALLOWED_ORIGIN ? origin : env.ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

    try {
      if (url.pathname === '/consent') return await handleConsent(req, env, cors, origin);
      if (url.pathname === '/cal') return await handleCal(req, env);
      return new Response('Not found', { status: 404, headers: cors });
    } catch (e) {
      return new Response('Error', { status: 500, headers: cors });
    }
  },
};

async function handleConsent(req, env, cors, origin) {
  if (origin !== env.ALLOWED_ORIGIN) return new Response('Forbidden', { status: 403, headers: cors });
  const raw = await req.text();
  if (raw.length > MAX_BODY) return new Response('Too large', { status: 413, headers: cors });
  const c = JSON.parse(raw);

  // Validación mínima: ambas casillas aceptadas y documentos identificados
  const okId = /^[0-9a-f-]{36}$/i.test(c.consent_id || '');
  const okDocs = c.terms && c.privacy && /^[0-9a-f]{64}$/.test(c.terms.sha256 || '') && /^[0-9a-f]{64}$/.test(c.privacy.sha256 || '');
  if (!okId || !okDocs) return new Response('Invalid', { status: 400, headers: cors });

  const evidence = {
    ...c,
    server_time_utc: new Date().toISOString(),
    ip: req.headers.get('CF-Connecting-IP') || '',
    ip_country: (req.cf && req.cf.country) || '',
    server_user_agent: req.headers.get('User-Agent') || '',
    origin,
  };
  const canonical = JSON.stringify(evidence, Object.keys(evidence).sort());
  const fingerprint = await sha256(canonical);

  await airtable(env, 'POST', '', {
    records: [{
      fields: {
        consent_id: c.consent_id,
        fecha_hora_servidor_utc: evidence.server_time_utc,
        fecha_hora_cliente: c.client_time,
        zona_horaria_cliente: c.client_timezone,
        ip: evidence.ip,
        pais_ip: evidence.ip_country,
        navegador: evidence.server_user_agent,
        pagina: c.page_url,
        metodo: c.method,
        terminos_texto_aceptado: c.notice_text || c.terms.label || '',
        terminos_version: c.terms.version,
        terminos_sha256: c.terms.sha256,
        terminos_marcado_en: c.terms.checked_at || '',
        privacidad_texto_aceptado: c.notice_text || c.privacy.label || '',
        privacidad_version: c.privacy.version,
        privacidad_sha256: c.privacy.sha256,
        privacidad_marcado_en: c.privacy.checked_at || '',
        respuestas: JSON.stringify(c.answers || {}),
        evidencia_json: canonical,
        huella_registro_sha256: fingerprint,
        estado: 'Aviso mostrado',
      },
    }],
    typecast: true,
  });
  return new Response(JSON.stringify({ ok: true, consent_id: c.consent_id, fingerprint }), {
    status: 201, headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

async function handleCal(req, env) {
  const raw = await req.text();
  // Verificación de firma de Cal.com (cabecera x-cal-signature-256 = HMAC-SHA256 del cuerpo)
  const sig = req.headers.get('x-cal-signature-256') || '';
  const expected = await hmac(env.CAL_WEBHOOK_SECRET, raw);
  if (!sig || sig !== expected) return new Response('Bad signature', { status: 401 });

  const ev = JSON.parse(raw);
  if (ev.triggerEvent !== 'BOOKING_CREATED') return new Response('Ignored', { status: 200 });
  const p = ev.payload || {};
  const consentId = (p.metadata && p.metadata.consent_id) || '';
  if (!/^[0-9a-f-]{36}$/i.test(consentId)) return new Response('No consent id', { status: 200 });

  const att = (p.attendees && p.attendees[0]) || {};
  // Casilla obligatoria del formulario de reserva de Cal.com (identificador: acepta-terminos)
  const r = p.responses && p.responses['acepta-terminos'];
  const accepted = (r && typeof r === 'object' ? r.value : r) === true;
  const found = await airtable(env, 'GET', `?filterByFormula=${encodeURIComponent(`{consent_id}='${consentId}'`)}&maxRecords=1`);
  const rec = found.records && found.records[0];
  if (!rec) return new Response('Consent not found', { status: 200 });

  await airtable(env, 'PATCH', '', {
    records: [{ id: rec.id, fields: {
      nombre: att.name || '',
      email: att.email || '',
      reserva_cal_uid: p.uid || '',
      reserva_inicio: p.startTime || '',
      acepta_en_cal: accepted,
      respuestas_cal: JSON.stringify(p.responses || {}),
      estado: accepted ? 'Aceptado en Cal.com y reservado' : 'Reservado sin casilla',
    } }],
    typecast: true,
  });
  return new Response('OK', { status: 200 });
}

async function airtable(env, method, qs, body) {
  const r = await fetch(`https://api.airtable.com/v0/${env.AIRTABLE_BASE}/${encodeURIComponent(env.AIRTABLE_TABLE)}${qs}`, {
    method,
    headers: { Authorization: `Bearer ${env.AIRTABLE_TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error('Airtable ' + r.status);
  return r.json();
}

async function sha256(text) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hmac(secret, text) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret || ''), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const s = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(text));
  return [...new Uint8Array(s)].map(b => b.toString(16).padStart(2, '0')).join('');
}
