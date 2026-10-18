import { airtable, airtableReady, hmac } from '@/lib/airtable';

// Webhook de Cal.com (BOOKING_CREATED): vincula la reserva con su registro de aceptación.
export const dynamic = 'force-dynamic';

export async function POST(req) {
  const raw = await req.text();
  const sig = req.headers.get('x-cal-signature-256') || '';
  if (!process.env.CAL_WEBHOOK_SECRET || !sig || sig !== (await hmac(process.env.CAL_WEBHOOK_SECRET, raw))) {
    return new Response('Bad signature', { status: 401 });
  }
  if (!airtableReady()) return new Response('Registro no configurado', { status: 503 });

  const ev = JSON.parse(raw);
  if (ev.triggerEvent !== 'BOOKING_CREATED') return new Response('Ignored');
  const p = ev.payload || {};
  const consentId = p.metadata?.consent_id || '';
  if (!/^[0-9a-f-]{36}$/i.test(consentId)) return new Response('No consent id');

  const att = p.attendees?.[0] || {};
  // Casilla obligatoria del formulario de reserva de Cal.com (identificador: acepta-terminos)
  const r = p.responses?.['acepta-terminos'];
  const accepted = (r && typeof r === 'object' ? r.value : r) === true;
  const found = await airtable('GET', `?filterByFormula=${encodeURIComponent(`{consent_id}='${consentId}'`)}&maxRecords=1`);
  const rec = found.records?.[0];
  if (!rec) return new Response('Consent not found');

  await airtable('PATCH', '', { records: [{ id: rec.id, fields: {
    nombre: att.name || '',
    email: att.email || '',
    reserva_cal_uid: p.uid || '',
    reserva_inicio: p.startTime || '',
    acepta_en_cal: accepted,
    respuestas_cal: JSON.stringify(p.responses || {}),
    estado: accepted ? 'Aceptado en Cal.com y reservado' : 'Reservado sin casilla',
  } }], typecast: true });
  return new Response('OK');
}
