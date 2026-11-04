// Shared by clips/communications.mjs: the stubs that keep every clip away from
// Meta, WhatsApp, Instagram, Google and Stripe, and the small DB helpers the
// prepare() steps use to put the demo data back before each take. Lives in a
// sub-folder so record.mjs (which loads every clips/*.mjs) does not take it for
// a clip file. Everything here is local and invented.
import { demo } from '../calendar/shared.mjs'

export { demo }

export const must = (r, what) => {
  if (r.error) throw new Error(`${what}: ${r.error.message}`)
  return r.data
}

/** Where the clips' clock sits: today 10:18 Madrid (see record.mjs), or now if that is still ahead. */
export function clipNow() {
  const real = new Date()
  const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(real)
  const offset = new Intl.DateTimeFormat('en', { timeZone: 'Europe/Madrid', timeZoneName: 'longOffset' }).formatToParts(real).find((p) => p.type === 'timeZoneName').value.replace('GMT', '') || '+00:00'
  const morning = new Date(`${day}T10:18:00${offset}`)
  return morning < real ? morning : real
}

// What "Actualizar desde Meta" brings back: approved templates, all invented.
const T = (name, bodyText, variableCount = 1, extra = {}) => ({ name, language: 'es', category: 'UTILITY', status: 'APPROVED', bodyText, headerText: null, variableCount, urlButtonCount: 0, mediaHeaderFormat: null, buttons: [], ...extra })
export const TEMPLATES = [
  T('confirmacion_cita', 'Hola {{1}}, tu cita en Clínica Demo está confirmada. ¡Te esperamos!'),
  T('recordatorio_cita', 'Hola {{1}}, te recordamos tu cita en Clínica Demo. Si no puedes venir, respóndenos a este mensaje.'),
  T('revision_paciente', 'Hola {{1}}, hace tiempo que no te vemos por la clínica. ¿Te reservamos una revisión?'),
  T('seguimiento_tras_visita', 'Hola {{1}}, ¿cómo te has encontrado después de tu última visita? Cuéntanos si necesitas algo.'),
  T('aviso_reserva_equipo', 'Nueva reserva online en Clínica Demo: {{1}}.'),
  T('aviso_nuevo_lead', 'Nuevo contacto en Clínica Demo: {{1}}.'),
]

/**
 * Nothing leaves the machine. Meta (WhatsApp, Instagram, Messenger) and Google
 * are never called: every /api/whatsapp, /api/instagram, /api/messenger and
 * /api/webchat request is answered here. A send also records the message the
 * real server would have stored, so the thread shows it, tagged so prepare()
 * can sweep it away on the next take.
 */
export async function stubMeta(h, { connected = true } = {}) {
  const { admin, accountId } = await demo()
  const phoneOf = async (patientId) => {
    const { data } = await admin.from('patient_contact_numbers').select('number').eq('patient_id', patientId).limit(1)
    return data?.[0]?.number.replace(/\D/g, '') ?? null
  }
  await h.page.route('**/api/whatsapp/**', async (route) => {
    const req = route.request()
    const path = new URL(req.url()).pathname
    const json = (body) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })
    if (req.method() === 'GET' && path.endsWith('/templates')) return json({ templates: TEMPLATES })
    if (req.method() === 'GET' && path.endsWith('/tokens')) return json({ whatsapp: connected, instagram: connected, metaAds: false })
    if (req.method() === 'GET' && path.endsWith('/app-secret')) return json({ configured: connected })
    if (req.method() === 'POST' && (path.endsWith('/send') || path.endsWith('/inbox-send'))) {
      const b = req.postDataJSON() ?? {}
      const tpl = b.templateName ? TEMPLATES.find((t) => t.name === b.templateName) : null
      const text = tpl ? tpl.bodyText.replace(/\{\{(\d)\}\}/g, (_, n) => b.variables?.[Number(n) - 1] ?? '') : b.text
      const phone = b.phoneNumber ?? (b.patientId ? await phoneOf(b.patientId) : null)
      must(
        await admin.from('whatsapp_messages').insert({
          account_id: accountId,
          patient_id: b.patientId ?? null,
          lead_id: b.leadId ?? null,
          phone_number: phone,
          channel: 'whatsapp',
          direction: 'outbound',
          status: 'sent',
          sent_by_ai: false,
          template_name: tpl?.name ?? null,
          body_preview: text,
          wamid: `wamid.HELP-DEMO-${Date.now()}`,
          created_at: new Date(clipNow().getTime() + 45_000).toISOString(),
        }).select('id'),
        'stub send',
      )
      return json({ success: true })
    }
    return json({ success: true })
  })
  for (const family of ['instagram', 'messenger', 'webchat']) {
    await h.page.route(`**/api/${family}/**`, (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) }))
  }
}

/** Sweeps the messages a stubbed send recorded. */
export async function forgetStubbedSends() {
  const { admin, accountId } = await demo()
  await admin.from('whatsapp_messages').delete().eq('account_id', accountId).like('wamid', 'wamid.HELP-DEMO-%')
}

export async function patientByFirst(first, last) {
  const { admin, accountId } = await demo()
  let q = admin.from('patients').select('id, first_name, last_name').eq('account_id', accountId).eq('first_name', first)
  if (last) q = q.like('last_name', `${last}%`)
  const { data } = await q.limit(1)
  if (!data?.length) throw new Error(`No demo patient ${first}`)
  return data[0]
}

/** Navigates the clip's page to a path of the same app. */
export async function go(h, path) {
  await h.page.goto(new URL(path, h.page.url()).toString(), { waitUntil: 'networkidle' })
}

/** Waits until the page has no loading skeleton left. */
export async function settled(h) {
  await h.page.waitForFunction(() => !document.querySelector('.skeleton-shimmer'), null, { timeout: 20000 }).catch(() => {})
  await h.page.waitForTimeout(500)
}
