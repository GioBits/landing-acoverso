import { airtable, airtableReady, canonicalJson, sha256 } from '@/lib/airtable';

// Registro trazable de aceptaciones: añade hora del servidor (UTC), IP real y país,
// calcula una huella SHA-256 del registro completo y lo guarda en Airtable.
export const dynamic = 'force-dynamic';
const MAX_BODY = 16 * 1024;

function allowedOrigin(req) {
  const origin = req.headers.get('origin') || '';
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
  const allowed = (process.env.ALLOWED_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
  const sameHost = origin && new URL(origin).host === host;
  return { origin, ok: sameHost || allowed.includes(origin) };
}

export async function POST(req) {
  const { origin, ok } = allowedOrigin(req);
  if (!ok) return new Response('Forbidden', { status: 403 });
  if (!airtableReady()) return new Response('Registro no configurado', { status: 503 });

  const raw = await req.text();
  if (raw.length > MAX_BODY) return new Response('Too large', { status: 413 });
  let c;
  try { c = JSON.parse(raw); } catch { return new Response('Invalid', { status: 400 }); }

  const okId = /^[0-9a-f-]{36}$/i.test(c.consent_id || '');
  const okDocs = /^[0-9a-f]{64}$/.test(c.terms?.sha256 || '') && /^[0-9a-f]{64}$/.test(c.privacy?.sha256 || '');
  if (!okId || !okDocs) return new Response('Invalid', { status: 400 });

  const fwd = req.headers.get('x-forwarded-for') || '';
  const evidence = {
    ...c,
    server_time_utc: new Date().toISOString(),
    ip: req.headers.get('x-real-ip') || fwd.split(',')[0].trim(),
    ip_country: req.headers.get('x-vercel-ip-country') || '',
    server_user_agent: req.headers.get('user-agent') || '',
    origin,
  };
  const canonical = canonicalJson(evidence);
  const fingerprint = await sha256(canonical);

  try {
    await airtable('POST', '', {
      records: [{ fields: {
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
      } }],
      typecast: true,
    });
  } catch {
    return new Response('Error', { status: 502 });
  }
  return Response.json({ ok: true, consent_id: c.consent_id, fingerprint }, { status: 201 });
}
