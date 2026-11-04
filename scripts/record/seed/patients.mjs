// Extras for the patients, clinical and patient-app clips: visit notes and
// pain scores, form templates and forms, files, the exercise library and
// readings, a child to link to a tutor, a patient for the contact clips, a
// re-exam booked as the wrong type, and a satisfaction survey. Every name is
// invented. Safe to run again: each block checks before it writes.
import { randomUUID } from 'node:crypto'

const APP = '/Users/rcluis/Developer/Projects/quiroflow-help-recording'

// A one-page PDF with a few lines of text, so a file preview has something in it.
export function makePdf(lines) {
  const esc = (s) => s.replace(/[\\()]/g, (c) => '\\' + c).replace(/[^\x20-\x7e]/g, (c) => ({ á: '\\341', é: '\\351', í: '\\355', ó: '\\363', ú: '\\372', ñ: '\\361', Á: '\\301', É: '\\311', Ó: '\\323', '·': '\\267' })[c] ?? '?')
  const text = lines.map((l, i) => `BT /F1 ${i === 0 ? 18 : 12} Tf 60 ${760 - i * 26} Td (${esc(l)}) Tj ET`).join('\n')
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    `<< /Length ${Buffer.byteLength(text, 'latin1')} >>\nstream\n${text}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  ]
  let out = '%PDF-1.4\n'
  const offsets = []
  objs.forEach((o, i) => {
    offsets.push(Buffer.byteLength(out, 'latin1'))
    out += `${i + 1} 0 obj\n${o}\nendobj\n`
  })
  const xref = Buffer.byteLength(out, 'latin1')
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offsets.map((o) => String(o).padStart(10, '0') + ' 00000 n \n').join('')}`
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`
  return Buffer.from(out, 'latin1')
}

const field = (type, label, extra = {}) => ({ id: randomUUID(), type, label, ...extra })

export const TEMPLATES = [
  {
    title: 'Consentimiento informado',
    category: 'consent',
    valid_months: 12,
    fields: [
      field('heading', 'Consentimiento informado para el tratamiento'),
      field('text', 'He sido informado/a de la naturaleza del tratamiento quiropráctico, de sus beneficios esperados y de sus posibles efectos adversos, y he podido hacer todas las preguntas que he querido.'),
      field('short_text', 'Nombre', { required: true, patientField: 'first_name' }),
      field('short_text', 'Apellidos', { required: true, patientField: 'last_name' }),
      field('short_text', 'DNI/NIE', { patientField: 'national_id' }),
      field('checkbox', 'Doy mi consentimiento para recibir el tratamiento', { required: true }),
      field('date', 'Fecha', { required: true }),
      field('signature', 'Firma', { required: true }),
    ],
  },
  {
    title: 'Protección de datos',
    category: 'data_protection',
    valid_months: null,
    fields: [
      field('heading', 'Protección de datos'),
      field('text', 'Clínica Demo tratará tus datos para gestionar tu atención sanitaria. Puedes ejercer tus derechos de acceso, rectificación y supresión escribiendo a la clínica.'),
      field('checkbox', 'He leído y acepto la política de protección de datos', { required: true }),
      field('checkbox', 'Acepto recibir recordatorios de mis citas por WhatsApp'),
      field('signature', 'Firma', { required: true }),
    ],
  },
  {
    title: 'Historia clínica',
    category: null,
    valid_months: null,
    fields: [
      field('heading', 'Historia clínica'),
      field('short_text', 'Profesión', { patientField: 'occupation' }),
      field('long_text', '¿Qué te trae a la consulta?', { required: true }),
      field('scale', 'Dolor ahora mismo (0-10)'),
      field('choice', '¿Desde cuándo?', { options: ['Menos de 1 semana', 'De 1 a 6 semanas', 'Más de 6 semanas'] }),
      field('checkbox', 'Tomo medicación de forma habitual'),
      field('long_text', 'Operaciones, accidentes o enfermedades importantes'),
      field('signature', 'Firma', { required: true }),
    ],
  },
]

const SOAP = [
  ['Dolor lumbar 8/10 al levantarse, mejora al caminar. Trabaja 8 h sentada.', 'Restricción L4-L5, contractura paravertebral derecha. Lasègue negativo.', 'Ajuste L4-L5 y sacroilíaca derecha. Tejido blando paravertebral.', 'Plan de corrección 2 veces por semana. Pautar ejercicios en casa.'],
  ['Algo mejor, 6/10. Duerme mejor.', 'Menos tono paravertebral. L4-L5 todavía fija.', 'Ajuste L4-L5. Movilización pélvica.', 'Seguir plan. Revisar postura en el trabajo.'],
  ['5/10. Molestia al final de la jornada.', 'Movilidad lumbar mejorada en flexión.', 'Ajuste L5 y sacroilíaca derecha.', 'Seguir plan. Añadir puente de glúteo.'],
  ['5/10. Ha hecho los ejercicios casi todos los días.', 'Sin contractura. Flexión completa.', 'Ajuste L4-L5.', 'Seguir plan.'],
  ['4/10. Ha vuelto a caminar 30 minutos al día.', 'Buena movilidad global. Leve restricción L4.', 'Ajuste L4.', 'Seguir plan. Valorar revisión en la visita 6.'],
]
const noteBody = ([s, o, a, p]) => `Subjective: ${s}\n\nObjective: ${o}\n\nAction: ${a}\n\nPlan: ${p}`

async function one(q) {
  const { data, error } = await q
  if (error) throw new Error(error.message)
  return data
}

export default async function seed(ctx) {
  const { admin, accountId, clinicId, team } = ctx
  const sara = team.find((t) => t.full_name === 'Sara Molina')
  const ines = team.find((t) => t.full_name === 'Inés Ramos')
  const patient = async (first, last) => (await one(admin.from('patients').select('id, first_name, last_name, email').eq('account_id', accountId).eq('first_name', first).eq('last_name', last).limit(1)))[0]
  const types = Object.fromEntries((await one(admin.from('appointment_types').select('id, name').eq('account_id', accountId))).map((t) => [t.name, t.id]))

  const marta = await patient('Marta', 'Gil Herrero')
  const alba = await patient('Alba', 'Serrano Pastor')
  const daniel = await patient('Daniel', 'Ortega Ruiz')
  const sofia = await patient('Sofía', 'Romero Llorens')

  // --- Marta: ID, emergency contact, SOAP notes and pain on her visits
  await one(admin.from('patients').update({ national_id: '12345678Z', emergency_contact: 'Javier Gil (hermano) · 600 000 901' }).eq('id', marta.id).select('id'))
  const martaVisits = await one(admin.from('appointments').select('id, starts_at, status').eq('patient_id', marta.id).eq('status', 'completed').order('starts_at'))
  const pains = [8, 7, 6, 5, 5, 4, 3]
  const ids = martaVisits.map((a) => a.id)
  const noted = new Set((await one(admin.from('visit_notes').select('appointment_id').in('appointment_id', ids))).map((r) => r.appointment_id))
  const scored = new Set((await one(admin.from('visit_pain_scores').select('appointment_id').in('appointment_id', ids))).map((r) => r.appointment_id))
  const first = noteBody(['Primera visita. Dolor lumbar de 3 meses, peor por la mañana.', 'Exploración ortopédica y neurológica normal. Restricción L4-L5.', 'Exploración. Sin ajuste hoy.', 'Pedir informe de resonancia. Informe de resultados en la próxima visita.'])
  const notes = []
  const scores = []
  for (const [i, a] of martaVisits.entries()) {
    const soap = i < 2 ? null : SOAP[Math.min(i - 2, SOAP.length - 1)]
    if (!noted.has(a.id) && (soap || i === 0)) notes.push({ account_id: accountId, appointment_id: a.id, body: soap ? noteBody(soap) : first, created_by: sara.id, created_at: a.starts_at })
    if (!scored.has(a.id)) scores.push({ account_id: accountId, appointment_id: a.id, practitioner_score: pains[i] ?? 3, practitioner_id: sara.id, practitioner_scored_at: a.starts_at, patient_score: i % 3 === 2 ? (pains[i] ?? 3) : null, patient_scored_at: i % 3 === 2 ? a.starts_at : null })
  }
  if (notes.length) await one(admin.from('visit_notes').insert(notes))
  if (scores.length) await one(admin.from('visit_pain_scores').insert(scores))

  // --- form templates
  const tpl = {}
  for (const t of TEMPLATES) {
    let row = (await one(admin.from('doc_templates').select('id, fields').eq('account_id', accountId).eq('title', t.title).limit(1)))[0]
    if (!row) row = (await one(admin.from('doc_templates').insert({ account_id: accountId, title: t.title, category: t.category, valid_months: t.valid_months, fields: t.fields, created_by: sara.id }).select('id, fields')))[0]
    tpl[t.title] = row
  }
  const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString()
  const docFor = async (p, title, { completed = false, token } = {}) => {
    const exists = await one(admin.from('patient_docs').select('id').eq('patient_id', p.id).eq('title', title).limit(1))
    if (exists.length) return
    const fields = tpl[title].fields.map((f) => ({ ...f, value: f.patientField === 'first_name' ? p.first_name : f.patientField === 'last_name' ? p.last_name : f.patientField === 'national_id' && p.id === marta.id ? '12345678Z' : completed ? (f.type === 'checkbox' ? true : f.type === 'date' ? daysAgo(40).slice(0, 10) : null) : null }))
    await one(admin.from('patient_docs').insert({ account_id: accountId, patient_id: p.id, title, template_id: tpl[title].id, fields, created_by: sara.id, created_at: daysAgo(completed ? 41 : 3), completed_at: completed ? daysAgo(40) : null, ...(token ? { public_token: token } : {}) }))
  }
  await docFor(marta, 'Protección de datos', { completed: true })
  await docFor(marta, 'Consentimiento informado')
  // Sofía's intake form is the one the patient-side clip fills in.
  await docFor(sofia, 'Historia clínica', { token: '5e1a9c3e-0d6b-4c55-9a71-6f1d2b7e4c10' })

  // --- files: a report on Marta (clinic only), an exercise sheet shared with Alba
  const fileFor = async (p, name, lines, visibility) => {
    const exists = await one(admin.from('patient_files').select('id').eq('patient_id', p.id).eq('file_name', name).limit(1))
    if (exists.length) return
    const path = `${accountId}/${p.id}/seed-${name.replace(/[^a-z0-9.]+/gi, '-')}`
    const { error } = await admin.storage.from('patient-files').upload(path, makePdf(lines), { contentType: 'application/pdf', upsert: true })
    if (error) throw error
    await one(admin.from('patient_files').insert({ account_id: accountId, patient_id: p.id, storage_path: path, file_name: name, file_type: 'application/pdf', size_bytes: 1200, visibility }))
  }
  await fileFor(marta, 'Informe de resonancia lumbar.pdf', ['Informe de resonancia (ejemplo)', 'Paciente de demostración', 'Documento ficticio para la demo de Clínica Demo.'], 'generic')
  await fileFor(alba, 'Pautas para la ciática.pdf', ['Pautas para la ciática', 'Clínica Demo', 'Camina a diario 20-30 minutos.', 'Evita estar sentada más de una hora seguida.', 'Haz los ejercicios de tu app cada mañana.'], 'custom')

  // --- the exercise library: the low-back programme from the catalogue
  const { EXERCISE_CATALOG, EXERCISE_CATALOG_PROGRAMS } = await import(`${APP}/utils/exerciseCatalog.ts`)
  const addCatalog = async (slug) => {
    const item = EXERCISE_CATALOG.find((e) => e.slug === slug)
    const found = (await one(admin.from('exercises').select('id').eq('account_id', accountId).eq('starter_key', slug).limit(1)))[0]
    if (found) return { id: found.id, item }
    const [row] = await one(admin.from('exercises').insert({ account_id: accountId, name: item.name.es, instructions: item.instructions.es, starter_key: slug, created_by: sara.id }).select('id'))
    return { id: row.id, item }
  }
  const lowBack = EXERCISE_CATALOG_PROGRAMS.find((p) => p.slug === 'low-back-basics')
  const lowBackItems = []
  for (const slug of lowBack.items) lowBackItems.push(await addCatalog(slug))
  let program = (await one(admin.from('exercise_programs').select('id').eq('account_id', accountId).eq('name', lowBack.name.es).limit(1)))[0]
  if (!program) {
    ;[program] = await one(admin.from('exercise_programs').insert({ account_id: accountId, name: lowBack.name.es, description: lowBack.description.es, created_by: sara.id }).select('id'))
    await one(admin.from('exercise_program_items').insert(lowBackItems.map(({ id, item }, i) => ({ account_id: accountId, program_id: program.id, exercise_id: id, position: i, sets: item.sets, reps: item.reps.es, frequency: item.frequency.es }))))
  }
  // Alba does three of them, most days.
  const albaHas = await one(admin.from('patient_exercises').select('id').eq('patient_id', alba.id).is('ended_at', null))
  if (!albaHas.length) {
    const rows = await one(admin.from('patient_exercises').insert(lowBackItems.slice(0, 3).map(({ id, item }) => ({ account_id: accountId, patient_id: alba.id, exercise_id: id, sets: item.sets, reps: item.reps.es, frequency: item.frequency.es, assigned_by: ines.id, created_at: daysAgo(14) }))).select('id'))
    const logs = []
    for (const r of rows) for (const d of [1, 2, 4, 5, 6]) logs.push({ account_id: accountId, patient_exercise_id: r.id, done_on: daysAgo(d).slice(0, 10) })
    await one(admin.from('patient_exercise_logs').insert(logs))
  }

  // --- readings: QuiroFlow's starter articles, and one sent to Alba
  const { LEARN_STARTER } = await import(`${APP}/utils/learnStarter.ts`)
  const haveKeys = new Set((await one(admin.from('learn_articles').select('starter_key').eq('account_id', accountId))).map((r) => r.starter_key))
  const missing = LEARN_STARTER.filter((s) => !haveKeys.has(s.key))
  if (missing.length) await one(admin.from('learn_articles').insert(missing.map((s) => ({ account_id: accountId, title: s.title, summary: s.summary, body: s.body, tags: s.tags, minutes: s.minutes, starter_key: s.key, created_by: sara.id }))))
  const ciatica = (await one(admin.from('learn_articles').select('id').eq('account_id', accountId).eq('starter_key', 'ciatica-alarma').limit(1)))[0]
  const albaSent = await one(admin.from('learn_sends').select('id').eq('patient_id', alba.id).limit(1))
  if (!albaSent.length) await one(admin.from('learn_sends').insert({ account_id: accountId, patient_id: alba.id, article_id: ciatica.id, sent_by: ines.id, sent_at: daysAgo(2), channel: 'app' }))

  // --- Leo, Marta's son, not yet marked as a minor (the clip does that)
  if (!(await patient('Leo', 'Martínez Gil'))) {
    const [leo] = await one(admin.from('patients').insert({ account_id: accountId, clinic_id: clinicId, first_name: 'Leo', last_name: 'Martínez Gil', gender: 'male', date_of_birth: '2016-04-12', city: 'Valencia', chief_complaint: 'Dolor de espalda por la mochila', default_practitioner_id: sara.id, preferred_language: 'es', referral_source: 'Recomendación' }).select('id'))
    await one(admin.from('patient_contact_numbers').insert({ account_id: accountId, patient_id: leo.id, number: '+34 600 000 950', country_code: 'ES', is_whatsapp: false }))
  }

  // --- Bruno, for the contact and cancel-future clips: two visits booked
  let bruno = await patient('Bruno', 'Esteve Lara')
  if (!bruno) {
    ;[bruno] = await one(admin.from('patients').insert({ account_id: accountId, clinic_id: clinicId, first_name: 'Bruno', last_name: 'Esteve Lara', gender: 'male', date_of_birth: '1985-09-21', email: 'bruno.esteve@example.com', city: 'Valencia', occupation: 'Arquitecto', chief_complaint: 'Cervicalgia', default_practitioner_id: sara.id, preferred_language: 'es', referral_source: 'Google', reminder_channel: 'whatsapp', confirmation_channel: 'whatsapp' }).select('id, first_name, last_name, email'))
  }
  const brunoAppts = await one(admin.from('appointments').select('id').eq('patient_id', bruno.id))
  if (!brunoAppts.length) {
    const madrid = (d, hm) => {
      const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date(Date.now() + d * 86400000))
      const off = new Intl.DateTimeFormat('en', { timeZone: 'Europe/Madrid', timeZoneName: 'longOffset' }).formatToParts(new Date()).find((p) => p.type === 'timeZoneName').value.replace('GMT', '') || '+00:00'
      return new Date(`${day}T${hm}:00${off}`)
    }
    const rows = [
      [-21, '19:30', 'completed'],
      [-14, '19:30', 'completed'],
      [7, '19:30', 'booked'],
      [14, '19:30', 'booked'],
    ].map(([d, hm, status]) => {
      const s = madrid(d, hm)
      return { account_id: accountId, clinic_id: clinicId, patient_id: bruno.id, practitioner_id: sara.id, practitioner_name: 'Sara Molina', appointment_type_id: types['Ajuste quiropráctico'], starts_at: s.toISOString(), ends_at: new Date(s.getTime() + 30 * 60000).toISOString(), status, confirmation_status: status === 'booked' ? 'confirmed' : null, source: 'staff' }
    })
    await one(admin.from('appointments').insert(rows))
  }

  // --- an "appointment cancelled" automation, so cancelling a patient's future
  // visits offers to let them know. Dry run: it records what it would send and sends nothing.
  const cancelRule = (await one(admin.from('automation_rules').select('id').eq('account_id', accountId).eq('trigger_event', 'appointment.cancelled').limit(1)))[0]
  if (!cancelRule) await one(admin.from('automation_rules').insert({ account_id: accountId, name: 'Aviso de cita cancelada', trigger_event: 'appointment.cancelled', entry_mode: 'one_at_a_time', enabled: true, dry_run: true, is_marketing: false }).select('id'))

  // --- Daniel: a re-exam at visit 8 that is booked as an ordinary adjustment
  const plan = (await one(admin.from('care_plans').select('id, visit_markers, started_at').eq('patient_id', daniel.id).order('created_at', { ascending: false }).limit(1)))[0]
  if (plan && !(plan.visit_markers ?? []).length) {
    await one(admin.from('care_plans').update({ visit_markers: [{ at: 8, every: 4, appointment_type_id: types['Revisión'], label: 'Revisión' }] }).eq('id', plan.id).select('id'))
  }

  // --- a satisfaction survey on Alba's last visit, for the patient-side clip
  const albaLast = (await one(admin.from('appointments').select('id').eq('patient_id', alba.id).eq('status', 'completed').order('starts_at', { ascending: false }).limit(1)))[0]
  const survey = await one(admin.from('satisfaction_surveys').select('id').eq('token', 'demo-encuesta-alba').limit(1))
  if (!survey.length && albaLast) {
    // One survey per appointment, and the app may already have sent its own
    // for this visit (completing it in a clip does): take that one over
    // rather than inserting a second.
    const existing = await one(admin.from('satisfaction_surveys').select('id').eq('appointment_id', albaLast.id).limit(1))
    if (existing.length) await one(admin.from('satisfaction_surveys').update({ token: 'demo-encuesta-alba', sent_at: daysAgo(0), score: null, comment: null, answered_at: null, review_offered_at: null }).eq('id', existing[0].id).select('id'))
    else await one(admin.from('satisfaction_surveys').insert({ account_id: accountId, appointment_id: albaLast.id, token: 'demo-encuesta-alba', sent_at: daysAgo(0) }))
  }
}
