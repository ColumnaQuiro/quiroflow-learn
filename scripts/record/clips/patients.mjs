// Clips for content/**/articles/{patients,clinical,patient-app}. See ../README.md.
// Demo data comes from QuiroFlow's seed-demo-clinic.ts plus seed/patients.mjs.
// A clip that changes something puts it back (or makes a fresh invented
// record) in `prepare`, so every clip can be recorded again.
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || 'http://127.0.0.1:54921'
// The Supabase CLI's fixed local service key -- public, and useless anywhere else.
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
if (!/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/.test(SUPABASE_URL)) throw new Error('Local Supabase only')
const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } })

async function q(query) {
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data
}
let account
async function accountId() {
  // Other collections' seeds make their own "Clínica Demo" accounts, so go through the owner, as seed.mjs does.
  if (!account) {
    const { data } = await db.auth.admin.listUsers({ perPage: 1000 })
    const owner = data.users.find((u) => u.email === 'demo@clinica-demo.test')
    account = (await q(db.from('team_members').select('account_id').eq('user_id', owner.id).limit(1)))[0].account_id
  }
  return account
}
async function patientId(first, last) {
  const rows = await q(db.from('patients').select('id').eq('account_id', await accountId()).eq('first_name', first).eq('last_name', last).limit(1))
  if (!rows.length) throw new Error(`No demo patient ${first} ${last} -- run node scripts/record/seed.mjs patients`)
  return rows[0].id
}
async function teamMember(name) {
  return (await q(db.from('team_members').select('id').eq('account_id', await accountId()).eq('full_name', name).limit(1)))[0].id
}
/** A patient made for one clip, replacing any left from an earlier take. */
async function freshPatient(first, last, extra = {}) {
  const acc = await accountId()
  const old = await q(db.from('patients').select('id').eq('account_id', acc).eq('first_name', first).eq('last_name', last))
  for (const o of old) await q(db.from('patients').delete().eq('id', o.id).select('id'))
  const [row] = await q(db.from('patients').insert({ account_id: acc, first_name: first, last_name: last, preferred_language: 'es', ...extra }).select('id'))
  return row.id
}
const madridDay = (offsetDays = 0) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date(Date.now() + offsetDays * 86400000))
function madrid(offsetDays, hm) {
  const off = new Intl.DateTimeFormat('en', { timeZone: 'Europe/Madrid', timeZoneName: 'longOffset' }).formatToParts(new Date()).find((p) => p.type === 'timeZoneName').value.replace('GMT', '') || '+00:00'
  return new Date(`${madridDay(offsetDays)}T${hm}:00${off}`)
}
const record = async (first, last) => `/patients/${await patientId(first, last)}`

/** Signs Alba (the demo's patient-app login) in to the portal, off camera. */
async function portalLogin(h, to = '/portal') {
  const page = h.page
  await page.goto(new URL('/portal/login', page.url()).toString(), { waitUntil: 'networkidle' })
  await page.locator('input[type=email]').fill('alba.serrano@clinica-demo.test')
  await page.locator('input[type=password]').fill('Demo1234!')
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await page.waitForURL((u) => !u.pathname.startsWith('/portal/login'), { timeout: 30000 })
  if (to !== '/portal') await page.goto(new URL(to, page.url()).toString(), { waitUntil: 'networkidle' })
  await page.waitForLoadState('networkidle')
}
const tab = (h, name) => h.page.getByRole('tab', { name, exact: true })
const moreActions = (h) => h.page.getByRole('button', { name: 'Más acciones' })

const clips = [
  // ---------------------------------------------------------------- patients
  {
    id: 'patients--list-filter',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async run(h) {
      await h.type(h.page.getByPlaceholder('Nombre, teléfono, correo o DNI'), 'Molina')
      await h.pause(1200)
      await h.page.getByPlaceholder('Nombre, teléfono, correo o DNI').fill('')
      await h.pause(800)
      await h.select(h.page.locator('select').filter({ hasText: 'Saldo: cualquiera' }), { label: 'A favor' })
      await h.pause(900)
      await h.click(h.page.getByRole('button', { name: /Más filtros/ }))
      await h.select(h.page.locator('select').filter({ hasText: 'Sin cita futura' }), { label: 'Con cita futura' })
      await h.pause(900)
      await h.moveAway()
    },
  },
  {
    id: 'patients--list-segment',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare() {
      await q(db.from('patient_segments').delete().eq('account_id', await accountId()).eq('name', 'Bono casi gastado'))
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: /Más filtros/ }))
      await h.select(h.page.locator('select').filter({ hasText: 'Con bono activo' }), { label: 'Con bono activo' })
      await h.pause(900)
      await h.click(h.page.getByRole('button', { name: 'Guardar como segmento' }))
      await h.type(h.page.getByPlaceholder('p. ej. Bono casi gastado'), 'Bono casi gastado')
      await h.click(h.page.getByRole('dialog').getByRole('button', { name: 'Guardar', exact: true }))
      await h.pause(1200)
      await h.moveAway()
    },
  },
  {
    id: 'patients--add-patient',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare() {
      const acc = await accountId()
      const old = await q(db.from('patients').select('id').eq('account_id', acc).eq('first_name', 'Noa').eq('last_name', 'Beltrán Ríos'))
      for (const o of old) await q(db.from('patients').delete().eq('id', o.id).select('id'))
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Nuevo paciente' }))
      await h.type(h.page.locator('#first-name'), 'Noa')
      await h.type(h.page.locator('#last-name'), 'Beltrán Ríos')
      await h.click(h.page.locator('#dob'))
      await h.page.locator('#dob').fill('1992-06-14')
      await h.pause(700)
      await h.type(h.page.getByRole('dialog').locator('input[type=email]'), 'noa.beltran@example.com')
      await h.type(h.page.getByRole('dialog').locator('input[type=tel]'), '600 000 777')
      await h.click(h.page.getByText('Este número tiene WhatsApp'))
      await h.click(h.page.getByRole('dialog').getByRole('button', { name: 'Añadir paciente' }))
      await h.page.waitForURL(/\/patients\/[0-9a-f-]{36}/, { timeout: 20000 })
      await h.page.waitForLoadState('networkidle')
      await h.moveAway()
    },
    hold: 2200,
  },
  {
    id: 'patients--record-tour',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      await h.page.goto(new URL(await record('Marta', 'Gil Herrero'), h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('tab', { name: 'Resumen' }).waitFor()
    },
    async run(h) {
      for (const name of ['Clínico', 'Progreso', 'Citas', 'Dinero', 'Comunicaciones', 'Adjuntos', 'Resumen']) {
        await h.click(tab(h, name), { after: 1300 })
      }
      await h.click(moreActions(h), { after: 1600 })
    },
  },
  {
    id: 'patients--record-attention',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      await h.page.goto(new URL(await record('Marta', 'Gil Herrero'), h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByText('Requiere atención').waitFor()
    },
    async run(h) {
      await h.hover(h.page.getByText('Requiere atención'))
      await h.pause(600)
      await h.click(h.page.getByRole('button', { name: 'Reenviar' }).first(), { after: 1500 })
      await h.moveAway()
    },
  },
  {
    id: 'patients--edit-details',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Bruno', 'Esteve Lara')
      await q(db.from('patients').update({ national_id: null, occupation: 'Arquitecto' }).eq('id', id).select('id'))
      await h.page.goto(new URL(`/patients/${id}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Editar todos los datos' }).waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Editar todos los datos' }), { after: 900 })
      const dni = h.page.locator('[data-cy=patient-national-id]')
      await h.type(dni, '12345678A', { after: 1400 })
      await dni.fill('')
      await h.type(dni, '12345678Z', { after: 900 })
      await h.click(h.page.getByRole('dialog').getByRole('button', { name: 'Guardar', exact: true }), { after: 1400 })
      await h.moveAway()
    },
  },
  {
    id: 'patients--phones',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Bruno', 'Esteve Lara')
      await q(db.from('patient_contact_numbers').delete().eq('patient_id', id))
      await q(db.from('patient_contact_numbers').insert({ account_id: await accountId(), patient_id: id, number: '+34 963 000 444', country_code: 'ES', is_whatsapp: false }))
      await h.page.goto(new URL(`/patients/${id}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Editar todos los datos' }).waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Editar todos los datos' }), { after: 900 })
      await h.type(h.page.getByPlaceholder('612 34 56 78'), '600 000 912')
      await h.click(h.page.getByPlaceholder('612 34 56 78').locator('xpath=..').getByText('WhatsApp'))
      await h.click(h.page.locator('[data-cy=add-contact-number]'), { after: 1500 })
      await h.moveAway()
    },
  },
  {
    id: 'patients--do-not-contact',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Bruno', 'Esteve Lara')
      await q(db.from('patients').update({ do_not_contact: false }).eq('id', id).select('id'))
      await h.page.goto(new URL(`/patients/${id}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Editar todos los datos' }).waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Editar todos los datos' }), { after: 900 })
      await h.click(h.page.getByText('No contactar (bloquea todas las comunicaciones y recordatorios)'))
      await h.click(h.page.getByRole('dialog').getByRole('button', { name: 'Guardar', exact: true }), { after: 900 })
      await h.page.keyboard.press('Escape')
      await h.pause(900)
      await h.hover(h.page.getByText('No contactar', { exact: true }).first())
    },
  },
  {
    id: 'patients--minor-tutor',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Leo', 'Martínez Gil')
      await q(db.from('patients').update({ is_minor: false, tutor_patient_id: null, bill_to_tutor: false }).eq('id', id).select('id'))
      await h.page.goto(new URL(`/patients/${id}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Editar todos los datos' }).waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Editar todos los datos' }), { after: 900 })
      await h.click(h.page.getByText('Este paciente es menor de edad', { exact: true }))
      const search = h.page.getByRole('dialog').getByPlaceholder('Buscar paciente por nombre…').last()
      await h.type(search, 'Marta Gil')
      await h.click(h.page.getByRole('dialog').getByRole('button', { name: /Marta Gil Herrero/ }).first())
      await h.click(h.page.locator('[data-cy=patient-bill-to-tutor]'))
      await h.click(h.page.getByRole('dialog').getByRole('button', { name: 'Guardar', exact: true }), { after: 900 })
      await h.page.keyboard.press('Escape')
      await h.pause(700)
      await h.hover(h.page.getByText('Los mensajes van a', { exact: false }).first())
    },
  },
  {
    id: 'patients--family',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Leo', 'Martínez Gil')
      await q(db.from('patient_relations').delete().or(`patient_id.eq.${id},related_patient_id.eq.${id}`))
      await h.page.goto(new URL(`/patients/${id}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.locator('[data-cy=patient-family]').waitFor()
      await h.page.locator('[data-cy=patient-family]').scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy=family-add]'))
      await h.type(h.page.locator('[data-cy=family-search]'), 'Marta Gil')
      await h.click(h.page.locator('[data-cy=family-result]').first())
      await h.select(h.page.locator('[data-cy=family-relation]'), 'parent')
      await h.click(h.page.locator('[data-cy=family-save]'), { after: 1200 })
      await h.moveAway()
    },
  },
  {
    id: 'patients--merge',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const acc = await accountId()
      const sara = await teamMember('Sara Molina')
      const keep = await freshPatient('Ignacio', 'Beltrán Soria', { email: 'ignacio.beltran@example.com', date_of_birth: '1979-03-02', city: 'Valencia', referral_source: 'Google' })
      const dup = await freshPatient('Nacho', 'Beltrán', { date_of_birth: '1979-03-02' })
      const types = await q(db.from('appointment_types').select('id').eq('account_id', acc).eq('name', 'Ajuste quiropráctico'))
      const [clinic] = await q(db.from('clinics').select('id').eq('account_id', acc).order('created_at').limit(1))
      const appt = (pid, d) => {
        const s = madrid(d, '19:00')
        return { account_id: acc, clinic_id: clinic.id, patient_id: pid, practitioner_id: sara, practitioner_name: 'Sara Molina', appointment_type_id: types[0].id, starts_at: s.toISOString(), ends_at: new Date(s.getTime() + 1800000).toISOString(), status: 'completed', source: 'staff' }
      }
      await q(db.from('appointments').insert([appt(keep, -60), appt(keep, -45), appt(dup, -20)]))
      await q(db.from('patient_contact_numbers').insert({ account_id: acc, patient_id: dup, number: '+34 600 000 931', country_code: 'ES', is_whatsapp: true }))
      h.page.on('dialog', (d) => d.accept())
      await h.page.goto(new URL(`/patients/${dup}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await moreActions(h).waitFor()
    },
    async run(h) {
      await h.click(moreActions(h))
      await h.click(h.page.getByRole('menuitem', { name: 'Fusionar con otra ficha' }).or(h.page.getByRole('button', { name: 'Fusionar con otra ficha' })).first())
      await h.type(h.page.locator('#merge-search'), 'Beltrán')
      await h.click(h.page.getByRole('dialog').getByText('Ignacio Beltrán Soria').first(), { after: 1000 })
      await h.click(h.page.getByRole('dialog').getByText('Ignacio Beltrán Soria').last(), { after: 1400 })
      await h.click(h.page.getByRole('dialog').getByRole('button', { name: 'Fusionar', exact: true }))
      await h.page.waitForURL((u) => true)
      await h.pause(2000)
      await h.moveAway()
    },
  },
  {
    id: 'patients--delete',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await freshPatient('Ficha', 'De Prueba')
      await h.page.goto(new URL(`/patients/${id}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await moreActions(h).waitFor()
    },
    async run(h) {
      await h.click(moreActions(h))
      await h.click(h.page.getByText('Eliminar paciente', { exact: true }).last())
      await h.type(h.page.getByRole('dialog').locator('input'), 'Ficha De Prueba')
      await h.click(h.page.getByRole('button', { name: 'Eliminar permanentemente' }))
      await h.page.waitForURL(/\/patients\/?$/, { timeout: 20000 })
      await h.pause(800)
      await h.moveAway()
    },
  },
  {
    id: 'patients--delete-refused',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const acc = await accountId()
      let id
      try {
        id = await patientId('Ramón', 'Alcaraz Prieto')
      } catch {
        id = await freshPatient('Ramón', 'Alcaraz Prieto', { date_of_birth: '1964-11-30', city: 'Valencia' })
      }
      await q(db.from('patients').update({ status: 'active' }).eq('id', id).select('id'))
      const charges = await q(db.from('third_party_charges').select('id').eq('patient_id', id).limit(1))
      if (!charges.length) {
        let tp = (await q(db.from('third_parties').select('id').eq('account_id', acc).limit(1)))[0]
        if (!tp) [tp] = await q(db.from('third_parties').insert({ account_id: acc, name: 'Mutua Ejemplo Salud', kind: 'insurer' }).select('id'))
        await q(db.from('third_party_charges').insert({ account_id: acc, third_party_id: tp.id, patient_id: id, service_date: madridDay(-30), description: 'Sesión de fisioterapia', amount_cents: 3500 }))
      }
      await h.page.goto(new URL(`/patients/${id}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await moreActions(h).waitFor()
    },
    async run(h) {
      await h.click(moreActions(h))
      await h.click(h.page.getByText('Eliminar paciente', { exact: true }).last(), { after: 1800 })
      await h.click(h.page.getByRole('button', { name: 'Archivar en su lugar' }), { after: 1200 })
      await h.hover(h.page.getByText('Archivado', { exact: true }).first())
    },
  },
  {
    id: 'patients--cancel-future',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Bruno', 'Esteve Lara')
      // The "notify the patient" choice only exists for someone who can be contacted.
      await q(db.from('patients').update({ do_not_contact: false }).eq('id', id).select('id'))
      await q(db.from('appointments').update({ status: 'booked', cancelled_at: null }).eq('patient_id', id).gt('starts_at', new Date().toISOString()).select('id')).catch(async () =>
        q(db.from('appointments').update({ status: 'booked' }).eq('patient_id', id).gt('starts_at', new Date().toISOString()).select('id')),
      )
      await h.page.goto(new URL(`/patients/${id}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await moreActions(h).waitFor()
    },
    async run(h) {
      await h.click(moreActions(h))
      await h.click(h.page.getByText('Anular citas futuras', { exact: true }).last(), { after: 1200 })
      await h.click(h.page.locator('[data-cy=cancel-future-notify]'))
      await h.click(h.page.getByRole('button', { name: /^Anular \d+ citas?$/ }), { after: 1600 })
      await h.moveAway()
    },
  },
  {
    id: 'patients--send-form',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Lucía', 'Navarro Ferrer')
      await q(db.from('patient_docs').delete().eq('patient_id', id))
      await h.page.goto(new URL(`/patients/${id}?tab=attachments`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Enviar un formulario' }).waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Enviar un formulario' }))
      await h.click(h.page.getByText('Consentimiento informado', { exact: true }).last(), { after: 1500 })
      await h.scroll(300)
      await h.scroll(-300)
      await h.click(h.page.getByRole('button', { name: /Documentos/ }).first(), { after: 1200 })
      await h.hover(h.page.getByText('Pendiente del paciente').first())
      await h.hover(h.page.getByRole('button', { name: 'Reenviar' }).first())
    },
  },
  {
    id: 'patients--form-patient-side',
    path: '/doc/5e1a9c3e-0d6b-4c55-9a71-6f1d2b7e4c10',
    as: 'anon',
    async prepare(h) {
      const acc = await accountId()
      const [doc] = await q(db.from('patient_docs').select('id, fields').eq('account_id', acc).eq('public_token', '5e1a9c3e-0d6b-4c55-9a71-6f1d2b7e4c10'))
      await q(db.from('patient_docs').update({ completed_at: null, fields: doc.fields.map((f) => (f.patientField ? f : { ...f, value: null })) }).eq('id', doc.id).select('id'))
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Enviar' }).waitFor()
    },
    async run(h) {
      const p = h.page
      await h.type(p.locator('textarea').first(), 'Dolor en la zona lumbar desde hace unas semanas.')
      await h.click(p.getByText('De 1 a 6 semanas', { exact: true }))
      await h.scroll(380)
      const canvas = p.locator('canvas').first()
      await canvas.scrollIntoViewIfNeeded()
      const box = await canvas.boundingBox()
      await p.mouse.move(box.x + 40, box.y + box.height * 0.6)
      await p.mouse.down()
      for (let i = 0; i <= 24; i++) await p.mouse.move(box.x + 40 + i * 9, box.y + box.height * 0.6 - Math.sin(i / 3) * 18, { steps: 2 })
      await p.mouse.up()
      await h.pause(500)
      await h.click(p.getByRole('button', { name: 'Enviar', exact: true }), { after: 1500 })
      await h.moveAway()
    },
  },
  {
    id: 'patients--doc-template',
    path: '/settings/docs',
    ready: 'text=Nueva plantilla',
    async prepare() {
      await q(db.from('doc_templates').delete().eq('account_id', await accountId()).in('title', ['Consentimiento de punción seca', 'Plantilla sin títuloConsentimiento de punción seca']))
    },
    async run(h) {
      const p = h.page
      await h.click(p.getByRole('button', { name: 'Nueva plantilla' }), { after: 900 })
      const title = p.getByPlaceholder('Plantilla sin título').or(p.getByLabel('Nombre')).first()
      await title.fill('')
      await h.type(title, 'Consentimiento de punción seca')
      await h.select(p.getByLabel('Categoría'), { label: 'Consentimiento' })
      await h.type(p.getByLabel('Válido durante (meses)'), '12')
      await h.click(p.getByRole('button', { name: 'Añadir bloque' }).last())
      await h.click(p.getByRole('menuitem', { name: 'Texto' }).or(p.getByRole('button', { name: 'Texto', exact: true })).first())
      await h.type(p.getByPlaceholder('Contenido de texto…').last(), 'Me han explicado en qué consiste la punción seca y sus posibles molestias.', { delay: 25 })
      await h.click(p.getByRole('button', { name: 'Añadir bloque' }).last())
      await h.click(p.getByRole('menuitem', { name: 'Firma' }).or(p.getByRole('button', { name: 'Firma', exact: true })).first())
      await h.click(p.getByRole('button', { name: 'Guardar', exact: true }).first(), { after: 1400 })
      await h.moveAway()
    },
  },
  {
    id: 'patients--letter',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Marta', 'Gil Herrero')
      await q(db.from('patient_letters').delete().eq('patient_id', id))
      await h.page.goto(new URL(`/patients/${id}?tab=attachments`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Nueva carta' }).waitFor()
      await h.page.getByRole('button', { name: 'Nueva carta' }).scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Nueva carta' }))
      await h.click(h.page.getByText('Informe para su médico', { exact: true }).last(), { after: 1600 })
      await h.scroll(250)
      await h.click(h.page.getByRole('button', { name: 'Guardar carta' }), { after: 1400 })
      await h.moveAway()
    },
  },
  {
    id: 'patients--upload-file',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Marta', 'Gil Herrero')
      await q(db.from('patient_files').delete().eq('patient_id', id).eq('file_name', 'Pautas de higiene postural.pdf'))
      await h.page.goto(new URL(`/patients/${id}?tab=attachments`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByText('Archivos subidos por la clínica').waitFor()
      await h.page.getByText('Archivos subidos por la clínica').scrollIntoViewIfNeeded()
    },
    async run(h) {
      const { makePdf } = await import('../seed/patients.mjs')
      await h.hover(h.page.getByText('Suelta archivos aquí, o haz clic para elegir'))
      await h.page.locator('input[type=file]:not([accept="image/*"])').first().setInputFiles({ name: 'Pautas de higiene postural.pdf', mimeType: 'application/pdf', buffer: makePdf(['Pautas de higiene postural', 'Clínica Demo', 'Pantalla a la altura de los ojos.', 'Levántate cada 45 minutos.']) })
      await h.page.getByText('Pautas de higiene postural.pdf').first().waitFor({ timeout: 20000 })
      await h.pause(900)
      const row = h.page.locator('li, tr, div').filter({ hasText: 'Pautas de higiene postural.pdf' }).filter({ has: h.page.locator('select') }).last()
      await h.select(row.locator('select').first(), 'custom')
      await h.pause(900)
      await h.moveAway()
    },
  },
  {
    id: 'patients--profile-photo',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      await h.page.goto(new URL(await record('Bruno', 'Esteve Lara'), h.page.url()).toString(), { waitUntil: 'networkidle' })
      await moreActions(h).waitFor()
    },
    async run(h) {
      await h.click(h.page.locator('button[title="Cambiar foto de perfil"]'))
      await h.click(h.page.getByText('Usar tu móvil (QR)'), { after: 1800 })
    },
    hold: 2400,
  },

  // ---------------------------------------------------------------- clinical
  {
    id: 'clinical--summary',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Marta', 'Gil Herrero')
      await q(db.from('patients').update({ yellow_flags: null }).eq('id', id).select('id'))
      await h.page.goto(new URL(`/patients/${id}?tab=clinical`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Editar datos clínicos' }).waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Editar datos clínicos' }), { after: 900 })
      await h.click(h.page.getByRole('dialog').getByRole('button', { name: 'Editar', exact: true }), { after: 700 })
      const yellow = h.page.getByPlaceholder('Factores psicosociales o de riesgo a tener en cuenta')
      await h.type(yellow, 'Trabajo sedentario y estrés laboral')
      await h.click(h.page.getByRole('button', { name: 'Listo' }).last(), { after: 1400 })
      await h.moveAway()
    },
  },
  {
    id: 'clinical--visit-note-myday',
    path: '/practitioner',
    ready: 'text=Mi día',
    async prepare(h) {
      // The owner's next booked visit today; last week's note is what "Visita anterior" shows.
      const acc = await accountId()
      const sara = await teamMember('Sara Molina')
      const now = madrid(0, '10:18')
      const [next] = await q(db.from('appointments').select('id, patient_id, patients(first_name, last_name)').eq('account_id', acc).eq('practitioner_id', sara).eq('status', 'booked').is('deleted_at', null).gte('starts_at', now.toISOString()).lte('starts_at', madrid(0, '14:00').toISOString()).order('starts_at').limit(1))
      await q(db.from('visit_notes').delete().eq('appointment_id', next.id))
      await q(db.from('visit_pain_scores').delete().eq('appointment_id', next.id))
      const [prev] = await q(db.from('appointments').select('id').eq('patient_id', next.patient_id).eq('status', 'completed').lt('starts_at', now.toISOString()).order('starts_at', { ascending: false }).limit(1))
      if (prev && !(await q(db.from('visit_notes').select('id').eq('appointment_id', prev.id))).length) {
        await q(db.from('visit_notes').insert({ account_id: acc, appointment_id: prev.id, created_by: sara, body: 'Subjective: Dolor cervical 6/10, peor al final del día delante del ordenador.\n\nObjective: Restricción C5-C6 derecha. Trapecio superior tenso.\n\nAction: Ajuste C5-C6. Tejido blando en trapecio.\n\nPlan: Seguir 1 vez por semana. Retracción cervical en casa.' }))
      }
      this.who = `${next.patients.first_name} ${next.patients.last_name}`
      await h.page.getByText(this.who).first().waitFor()
    },
    async run(h) {
      await h.click(h.page.getByText(this.who).first(), { after: 1500 })
      await h.click(h.page.locator('[data-cy=pain-score-4]'))
      const subj = h.page.locator('[data-cy=soap-subjective]')
      await h.type(subj, 'Mejor que la semana pasada, 4/10. Ha hecho los ejercicios.')
      await h.click(h.page.locator('[data-cy=previous-visit-bring-Plan], [data-cy^=previous-visit-bring-]').last(), { after: 900 })
      await h.click(h.page.getByRole('button', { name: 'Guardar nota' }), { after: 1400 })
      await h.moveAway()
    },
  },
  {
    id: 'clinical--visit-notes-history',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      await h.page.goto(new URL(`${await record('Marta', 'Gil Herrero')}?tab=clinical`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByText('Notas de visita').first().waitFor()
      await h.page.getByText('Notas de visita').first().scrollIntoViewIfNeeded()
    },
    async run(h) {
      const notes = h.page.getByRole('button', { name: /Abrir|Cerrar/ })
      await h.scroll(250)
      await h.click(notes.nth(1), { after: 1500 })
      await h.click(notes.nth(2), { after: 1500 })
      await h.moveAway()
    },
  },
  {
    id: 'clinical--care-plan-create',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Lucía', 'Navarro Ferrer')
      await q(db.from('care_plans').delete().eq('patient_id', id))
      await h.page.goto(new URL(`/patients/${id}?tab=clinical`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: '+ Añadir plan' }).waitFor()
    },
    async run(h) {
      const p = h.page
      await h.click(p.getByRole('button', { name: '+ Añadir plan' }), { after: 900 })
      const dialog = p.getByRole('dialog')
      const name = dialog.getByLabel('Nombre')
      await name.fill('')
      await h.type(name, 'Fase correctiva')
      const perPeriod = dialog.locator('[data-cy=plan-visits-per-period]')
      await perPeriod.fill('')
      await h.type(perPeriod, '2', { after: 300 })
      const total = dialog.getByLabel('Visitas totales en el plan')
      await total.fill('')
      await h.type(total, '12', { after: 300 })
      await h.click(dialog.getByRole('button', { name: '+ Añadir visita de revisión' }))
      await h.pause(900)
      await h.scroll(250, { at: dialog.getByText('Cómo se paga') })
      await h.click(dialog.getByRole('button', { name: 'Guardar', exact: true }), { after: 1600 })
      await h.moveAway()
    },
  },
  {
    id: 'clinical--care-plan-progress',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      await h.page.goto(new URL(await record('Marta', 'Gil Herrero'), h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.locator('ol[aria-label="Periodos del plan"]').waitFor()
    },
    async run(h) {
      await h.scroll(300)
      await h.hover(h.page.getByText(/Este periodo/))
      await h.pause(900)
      await h.hover(h.page.locator('ol[aria-label="Periodos del plan"] li').nth(2))
      await h.pause(900)
      await h.hover(h.page.locator('ol[aria-label="Periodos del plan"] li').last())
      await h.pause(900)
      await h.moveAway()
    },
  },
  {
    id: 'clinical--care-plan-alerts',
    path: '/care-plan-alerts',
    ready: 'text=Revisiones reservadas con otro tipo',
    async prepare(h) {
      // Daniel's next visit is his plan's re-exam (visit 8); booked as an adjustment.
      const acc = await accountId()
      const daniel = await patientId('Daniel', 'Ortega Ruiz')
      const types = Object.fromEntries((await q(db.from('appointment_types').select('id, name').eq('account_id', acc))).map((t) => [t.name, t.id]))
      const [next] = await q(db.from('appointments').select('id').eq('patient_id', daniel).eq('status', 'booked').is('deleted_at', null).gt('starts_at', new Date().toISOString()).order('starts_at').limit(1))
      if (next) await q(db.from('appointments').update({ appointment_type_id: types['Ajuste quiropráctico'] }).eq('id', next.id).select('id'))
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: /Cambiar a/ }).first().waitFor()
    },
    async run(h) {
      await h.scroll(300)
      await h.hover(h.page.getByText('Revisiones reservadas con otro tipo'))
      await h.click(h.page.getByRole('button', { name: /Cambiar a/ }).first(), { after: 1600 })
      await h.moveAway()
    },
  },
  {
    id: 'clinical--pain-progress',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      await h.page.goto(new URL(`${await record('Marta', 'Gil Herrero')}?tab=progress`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByText('Dolor por visita').waitFor()
    },
    async run(h) {
      await h.hover(h.page.getByText('Dolor ahora'))
      await h.hover(h.page.getByText('Dolor por visita'))
      await h.scroll(380)
      await h.pause(800)
      await h.scroll(-380)
      await h.click(h.page.getByRole('button', { name: 'Informe de revisión' }), { after: 2500 })
      await h.moveAway()
    },
  },
  {
    id: 'clinical--posture',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Daniel', 'Ortega Ruiz')
      await h.page.goto(new URL(`/patients/${id}?tab=progress`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.locator('[data-cy=posture-new]').waitFor()
      await h.page.locator('[data-cy=posture-new]').scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.pause(1200)
      await h.scroll(420)
      await h.pause(900)
      await h.hover(h.page.getByText('Lo ve el paciente').first())
      await h.pause(1200)
      await h.scroll(450)
      await h.pause(900)
      await h.click(h.page.getByRole('group', { name: 'Medida' }).getByRole('button', { name: 'Hombros' }), { after: 1400 })
      await h.click(h.page.getByRole('group', { name: 'Medida' }).getByRole('button', { name: 'Pelvis' }), { after: 1800 })
    },
  },
  {
    id: 'clinical--exercise-library',
    path: '/settings/exercises',
    ready: 'text=Catálogo de QuiroFlow',
    async prepare(h) {
      // Take the shoulder programme back out of the library, if an earlier take added it.
      const acc = await accountId()
      await q(db.from('exercise_programs').delete().eq('account_id', acc).eq('name', 'Movilidad de hombro'))
      const slugs = ['pendulum', 'cross-body-stretch', 'shoulder-external-rotation', 'wall-angels', 'scapular-retraction']
      const ex = await q(db.from('exercises').select('id').eq('account_id', acc).in('starter_key', slugs))
      for (const e of ex) {
        const used = await q(db.from('patient_exercises').select('id').eq('exercise_id', e.id).limit(1))
        const inProgram = await q(db.from('exercise_program_items').select('id').eq('exercise_id', e.id).limit(1))
        if (!used.length && !inProgram.length) await q(db.from('exercises').delete().eq('id', e.id))
      }
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Catálogo de QuiroFlow').scrollIntoViewIfNeeded()
    },
    async run(h) {
      const card = h.page.locator('li, article, div').filter({ hasText: 'Movilidad de hombro' }).filter({ has: h.page.getByRole('button', { name: 'Añadir programa' }) }).last()
      await card.scrollIntoViewIfNeeded()
      await h.click(card.getByRole('button', { name: 'Añadir programa' }), { after: 2000 })
      await h.moveAway()
    },
  },
  {
    id: 'clinical--exercise-assign',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Marta', 'Gil Herrero')
      await q(db.from('patient_exercises').delete().eq('patient_id', id))
      await h.page.goto(new URL(`/patients/${id}?tab=clinical`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Asignar ejercicios' }).scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Asignar ejercicios' }), { after: 900 })
      await h.type(h.page.getByPlaceholder('Buscar ejercicios o programas'), 'Lumbalgia')
      await h.click(h.page.locator('[data-cy=exercise-group]').filter({ hasText: 'Lumbalgia básica' }).first(), { after: 1200 })
      await h.scroll(250)
      await h.click(h.page.getByRole('button', { name: /^Asignar \d+$/ }), { after: 1600 })
      await h.moveAway()
    },
  },
  {
    id: 'clinical--education-library',
    path: '/settings/education',
    ready: 'text=Nueva lectura',
    async prepare(h) {
      // Two starter readings, never sent, taken back out so "Añadir las 2" shows.
      const acc = await accountId()
      const rows = await q(db.from('learn_articles').select('id').eq('account_id', acc).in('starter_key', ['frio-o-calor', 'levantar-peso']))
      for (const r of rows) {
        const sent = await q(db.from('learn_sends').select('id').eq('article_id', r.id).limit(1))
        if (!sent.length) await q(db.from('learn_articles').delete().eq('id', r.id))
      }
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: /^Añadir las \d+$/ }).waitFor()
    },
    async run(h) {
      await h.hover(h.page.getByText(/Empieza con \d+ lecturas de QuiroFlow/))
      await h.click(h.page.getByRole('button', { name: /^Añadir las \d+$/ }), { after: 1600 })
      await h.scroll(350)
      await h.moveAway()
    },
  },
  {
    id: 'clinical--education-send',
    path: '/patients',
    ready: 'text=Nuevo paciente',
    async prepare(h) {
      const id = await patientId('Gonzalo', 'Lara Bosch')
      await q(db.from('patients').update({ chief_complaint: 'Lumbalgia' }).eq('id', id).select('id'))
      await q(db.from('learn_sends').delete().eq('patient_id', id))
      await h.page.goto(new URL(`/patients/${id}?tab=clinical`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: '+ Enviar' }).scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: '+ Enviar' }), { after: 900 })
      await h.select(h.page.getByLabel('Lectura'), { index: 1 })
      await h.click(h.page.getByRole('button', { name: 'Enviar', exact: true }), { after: 1800 })
      await h.moveAway()
    },
  },

  // ---------------------------------------------------------------- patient app & portal
  {
    id: 'portal--app-settings',
    path: '/settings/app',
    ready: 'text=Compartir la app',
    async run(h) {
      await h.hover(h.page.getByText('Código de la clínica'))
      await h.click(h.page.getByRole('button', { name: 'Copiar código' }), { after: 900 })
      await h.scroll(400)
      await h.hover(h.page.getByText('Qué pueden hacer los pacientes'))
      await h.scroll(300)
      await h.moveAway()
    },
  },
  {
    id: 'portal--app-announcement',
    path: '/settings/app',
    ready: 'text=Enviar un aviso',
    async prepare(h) {
      await h.page.getByText('Enviar un aviso').scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.type(h.page.getByPlaceholder('Tu título').or(h.page.getByLabel('Título')).first(), 'Cerrado el lunes 8 por festivo')
      await h.type(h.page.getByLabel('Mensaje').first(), 'El lunes 8 la clínica estará cerrada. Si tenías cita, te escribimos para cambiarla.', { delay: 30 })
      await h.pause(600)
      await h.hover(h.page.getByRole('button', { name: /^Enviar a \d+ paciente/ }))
    },
  },
  {
    id: 'portal--login',
    path: '/portal/login',
    as: 'anon',
    ready: 'text=Entra como paciente',
    async run(h) {
      await h.type(h.page.getByLabel('Código de tu clínica'), 'clinica-demo')
      await h.type(h.page.locator('input[type=email]'), 'alba.serrano@clinica-demo.test')
      await h.type(h.page.locator('input[type=password]'), 'Demo1234!')
      await h.click(h.page.getByRole('button', { name: 'Entrar', exact: true }))
      await h.page.waitForURL((u) => !u.pathname.startsWith('/portal/login'), { timeout: 30000 })
      await h.page.waitForLoadState('networkidle')
      await h.moveAway()
    },
    hold: 2200,
  },
  {
    id: 'portal--tour',
    path: '/portal/login',
    as: 'anon',
    async prepare(h) {
      await portalLogin(h)
    },
    async run(h) {
      await h.scroll(500)
      await h.scroll(-500)
      for (const name of ['Citas', 'Progreso', 'Facturación', 'Ejercicios', 'Documentos', 'Mensajes']) {
        await h.click(h.page.getByRole('link', { name, exact: true }).first(), { after: 1400 })
      }
    },
  },
  {
    id: 'portal--wallet',
    path: '/portal/login',
    as: 'anon',
    async prepare(h) {
      // Wallet is not configured on a local server; answer as production does.
      await h.page.route('**/api/wallet/status', (r) => r.fulfill({ json: { apple: false, google: true } }))
      await portalLogin(h, '/portal/billing')
      await h.page.locator('[data-cy=wallet-add-google]').waitFor()
      await h.page.locator('[data-cy=wallet-add-google]').scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.hover(h.page.getByRole('heading', { name: 'Tus bonos' }))
      await h.pause(600)
      await h.hover(h.page.locator('[data-cy=wallet-add-google]'))
      await h.pause(1200)
    },
  },
  {
    id: 'portal--survey',
    path: '/valorar/demo-encuesta-alba',
    as: 'anon',
    async prepare(h) {
      // The thank-you offers a Google review link only when the clinic has one; an invented address.
      await q(db.from('accounts').update({ google_review_url: 'https://g.page/r/clinica-demo/review' }).eq('id', await accountId()).select('id'))
      await q(db.from('satisfaction_surveys').update({ score: null, comment: null, answered_at: null, review_offered_at: null }).eq('token', 'demo-encuesta-alba').select('id'))
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy=satisfaction-score-5]').waitFor()
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy=satisfaction-score-5]'), { after: 1600 })
      await h.hover(h.page.getByText('Dejar reseña en Google'))
    },
  },
]

export default clips
