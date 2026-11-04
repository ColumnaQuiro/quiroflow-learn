// Extras for the communications, growth and online-booking clips: saved
// replies, inbox labels and drafts, leads with their history, ad spend,
// Google reviews, satisfaction answers, a discount code, and a WhatsApp /
// Instagram / Messenger / web chat that LOOK connected.
//
// Nothing here can reach Meta, WhatsApp, Instagram or Google: the WhatsApp
// ids are stored without any access token (every send path refuses without
// one), no Meta Ads or Google credential is stored, and the clips stub the
// few calls that would go out (see clips/communications.mjs). Every name,
// phone and email is invented.
//
// Safe to re-run: everything it adds is tagged (lead references LEAD-DEMO-*,
// review external ids demo-*, survey tokens demo-*) and replaced each time.

const DAY = 86_400_000

export default async function seed({ admin, accountId, clinicId, team }) {
  const ok = (r, what) => {
    if (r.error) throw new Error(`${what}: ${r.error.message}`)
    return r.data
  }
  // A loaded machine drops the odd request; a short retry keeps a re-run cheap.
  const retry = async (make, what) => {
    for (let i = 0; ; i++) {
      const r = await make()
      if (!r.error || i === 3) return ok(r, what)
      await new Promise((done) => setTimeout(done, 2000))
    }
  }
  const owner = team.find((m) => m.is_owner)
  const alex = team.find((m) => m.full_name === 'Álex Prieto')
  const ines = team.find((m) => m.full_name === 'Inés Ramos')
  // "Now" is where the clips' clock sits (today 10:18 Madrid, see record.mjs),
  // so nothing seeded as "an hour ago" lies in the clip's future.
  const now = (() => {
    const real = new Date()
    const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(real)
    const offset = new Intl.DateTimeFormat('en', { timeZone: 'Europe/Madrid', timeZoneName: 'longOffset' }).formatToParts(real).find((p) => p.type === 'timeZoneName').value.replace('GMT', '') || '+00:00'
    const morning = new Date(`${day}T10:18:00${offset}`)
    return (morning < real ? morning : real).getTime()
  })()
  const ago = (ms) => new Date(now - ms).toISOString()
  const hours = (h) => h * 3_600_000

  const patients = ok(await admin.from('patients').select('id, first_name, last_name').eq('account_id', accountId), 'patients')
  const P = (first) => patients.find((p) => p.first_name === first)
  const phones = ok(await admin.from('patient_contact_numbers').select('patient_id, number').eq('account_id', accountId), 'phones')
  const phoneOf = (id) => phones.find((p) => p.patient_id === id)?.number.replace(/\D/g, '')

  // --- a channel that looks connected: ids only, never a token
  ok(
    await admin
      .from('accounts')
      .update({
        whatsapp_phone_number_id: '100200300400501',
        whatsapp_business_account_id: '200300400500601',
        whatsapp_access_token: null,
        whatsapp_confirmation_template_name: 'confirmacion_cita',
        whatsapp_confirmation_template_language: 'es',
        whatsapp_reminder_template_name: 'recordatorio_cita',
        whatsapp_reminder_template_language: 'es',
        whatsapp_recall_template_name: 'revision_paciente',
        whatsapp_recall_template_language: 'es',
        instagram_user_id: '17841400000000777',
        messenger_page_id: '100000000000777',
        webchat_enabled: true,
        webchat_greeting: '¡Hola! ¿En qué te podemos ayudar?',
        google_review_url: 'https://g.page/r/clinica-demo-ejemplo/review',
      })
      .eq('id', accountId)
      .select('id'),
    'account',
  )

  // --- the clinic takes online bookings (the public page and its settings)
  ok(await admin.from('clinics').update({ online_booking_enabled: true }).eq('account_id', accountId).select('id'), 'online booking')

  // --- saved replies
  await admin.from('saved_replies').delete().eq('account_id', accountId).in('title', ['Horario', 'Cómo llegar', 'Primera visita', 'Precios'])
  ok(
    await admin.from('saved_replies').insert([
      { account_id: accountId, title: 'Horario', body: 'Abrimos de lunes a viernes de 9:00 a 20:00 y los sábados de 9:00 a 14:00. ¡Te esperamos!' },
      { account_id: accountId, title: 'Cómo llegar', body: 'Estamos en la Calle Mayor 12, bajo. El metro más cercano es Plaza Mayor (líneas 3 y 5) y hay aparcamiento público a 100 m.' },
      { account_id: accountId, title: 'Primera visita', body: 'La primera visita dura unos 45 minutos: revisamos tu historial, hacemos una valoración postural y, si está indicado, el primer ajuste. Trae ropa cómoda y cualquier prueba que tengas.' },
      { account_id: accountId, title: 'Precios', body: 'La primera visita son 60 € y las sesiones de seguimiento 40 €. El bono de 10 sesiones sale a 38 € la sesión.' },
    ]).select('id'),
    'saved replies',
  )

  // --- inbox labels (the owner's own, as labels are per person)
  await admin.from('whatsapp_labels').delete().eq('account_id', accountId).in('name', ['Mutua', 'Factura pendiente', 'Primera visita'])
  const labels = ok(
    await admin.from('whatsapp_labels').insert([
      { account_id: accountId, name: 'Mutua', color: '#4C6FEB' },
      { account_id: accountId, name: 'Factura pendiente', color: '#E5A33B' },
      { account_id: accountId, name: 'Primera visita', color: '#2E9E6B' },
    ]).select('id, name'),
    'labels',
  )
  const andres = P('Andrés')
  if (andres) {
    ok(
      await admin.from('whatsapp_conversation_labels').insert({ account_id: accountId, team_member_id: owner.id, conversation_key: andres.id, label_id: labels.find((l) => l.name === 'Mutua').id }).select('label_id'),
      'conversation label',
    )
  }

  // --- a conversation whose 24-hour window has closed (Rosa: two days ago)
  const rosa = P('Rosa') ?? patients.find((p) => !['Carmen', 'Hugo', 'Irene', 'Andrés', 'Nuria', 'Lucía', 'Raúl'].includes(p.first_name))
  await admin.from('whatsapp_messages').delete().eq('account_id', accountId).eq('patient_id', rosa.id)
  ok(
    await admin.from('whatsapp_messages').insert([
      { account_id: accountId, patient_id: rosa.id, phone_number: phoneOf(rosa.id), channel: 'whatsapp', direction: 'outbound', status: 'read', purpose: 'recall', template_name: 'revision_paciente', body_preview: `Hola ${rosa.first_name}, hace unos meses de tu última visita. ¿Te reservamos una revisión?`, created_at: ago(DAY * 2 + hours(3)) },
      { account_id: accountId, patient_id: rosa.id, phone_number: phoneOf(rosa.id), channel: 'whatsapp', direction: 'inbound', status: 'received', body_preview: 'Ahora mismo no puedo, os escribo después de las vacaciones', created_at: ago(DAY * 2 + hours(1)) },
    ]).select('id'),
    'old thread',
  )

  // --- two threads whose patient wrote recently, so the 24-hour window is open
  // whenever the clips run (the base seed's messages are dated to its own day).
  const shiftThread = async (first, latestInboundAgoMs) => {
    const p = P(first)
    if (!p) return
    const msgs = ok(await admin.from('whatsapp_messages').select('id, direction, created_at').eq('account_id', accountId).eq('patient_id', p.id).order('created_at'), `thread ${first}`)
    const inbound = msgs.filter((m) => m.direction === 'inbound')
    if (!inbound.length) return
    const delta = now - latestInboundAgoMs - new Date(inbound.at(-1).created_at).getTime()
    // Idempotent: only shift when the newest inbound is not already in place.
    if (Math.abs(delta) < 60_000) return
    for (const m of msgs) await retry(() => admin.from('whatsapp_messages').update({ created_at: new Date(new Date(m.created_at).getTime() + delta).toISOString() }).eq('id', m.id).select('id'), 'shift')
  }
  await shiftThread('Hugo', hours(1.5))
  await shiftThread('Tomás', hours(2.5))

  // --- a reply the receptionist drafted for Hugo, waiting for approval
  const hugo = P('Hugo')
  if (hugo) {
    await admin.from('inbox_reply_drafts').delete().eq('account_id', accountId).eq('conversation_key', hugo.id)
    const { data: last } = await admin.from('whatsapp_messages').select('created_at').eq('account_id', accountId).eq('patient_id', hugo.id).order('created_at', { ascending: false }).limit(1).maybeSingle()
    ok(
      await admin.from('inbox_reply_drafts').insert({
        account_id: accountId,
        conversation_key: hugo.id,
        body: '¡Qué buena noticia lo del tobillo, Hugo! Este sábado tenemos hueco a las 10:00 o a las 11:30 con Inés. ¿Te reservo alguna de las dos?',
        drafted_through_at: last?.created_at ?? ago(hours(0.2)),
      }).select('conversation_key'),
      'reply draft',
    )
  }

  // --- leads
  const old = ok(await admin.from('leads').select('id').eq('account_id', accountId).like('reference', 'LEAD-DEMO-%'), 'old leads')
  if (old.length) {
    const ids = old.map((l) => l.id)
    await admin.from('whatsapp_messages').delete().eq('account_id', accountId).in('lead_id', ids)
    await admin.from('lead_events').delete().eq('account_id', accountId).in('lead_id', ids)
    await admin.from('lead_attribution').delete().eq('account_id', accountId).in('lead_id', ids)
    await admin.from('leads').delete().eq('account_id', accountId).in('id', ids)
  }
  // [name, stage, channel, source, created (ms ago), value €, ai]
  const THIS_MONTH = [
    ['Marina Esteve', 'new', 'facebook', 'Meta Ads · Dolor lumbar', hours(0.6), null, true],
    ['Jorge Llorens', 'new', 'facebook', 'Meta Ads · Dolor lumbar', hours(1.5), null, false],
    ['Visitante web 7F3A', 'new', 'webchat', 'Web', hours(2), null, true],
    ['Paula Ribes', 'new', 'instagram', 'Instagram', hours(5), null, false],
    ['Óscar Bernat', 'new', 'web', 'Google Ads', hours(20), null, false],
    ['Silvia Cano', 'contacted', 'whatsapp', 'Meta Ads · Primera visita', hours(26), null, true],
    ['Héctor Vidal', 'contacted', 'facebook', 'Meta Ads · Dolor lumbar', hours(30), null, false],
    ['Laura Peris', 'contacted', 'web', 'Google Ads', hours(40), null, false],
    ['Ainhoa Sanz', 'contacted', 'instagram', 'Instagram', hours(44), null, false],
    ['Rubén Ortiz', 'qualified', 'facebook', 'Meta Ads · Primera visita', hours(50), 240, false],
    ['Clara Monzó', 'qualified', 'whatsapp', 'Meta Ads · Dolor lumbar', hours(52), null, false],
    ['Iván Soler', 'booked', 'web', 'Google Ads', hours(55), null, false],
    ['Natalia Ferrer', 'booked', 'facebook', 'Meta Ads · Primera visita', hours(58), null, false],
    ['Diego Marco', 'showed', 'facebook', 'Meta Ads · Dolor lumbar', hours(60), null, false],
    ['Eva Climent', 'converted', 'web', 'Google Ads', hours(62), 480, false],
    ['Tomás Grau', 'lost', 'facebook', 'Meta Ads · Dolor lumbar', hours(64), null, false],
  ]
  const OLDER_STAGES = ['converted', 'converted', 'lost', 'showed', 'lost', 'converted', 'contacted', 'lost', 'booked', 'converted']
  const OLDER_FIRST = ['Alba', 'Bruno', 'Celia', 'Dani', 'Elena', 'Fran', 'Gloria', 'Hugo', 'Irene', 'Jaime', 'Lidia', 'Marcos', 'Noelia', 'Pau', 'Rocío', 'Sergio', 'Teresa', 'Unai', 'Vera', 'Xavi']
  const OLDER_LAST = ['Alcaraz', 'Belda', 'Castelló', 'Domènech', 'Escrivá', 'Fuster', 'Gimeno', 'Herrero', 'Ibáñez', 'Juan', 'Lloret', 'Mira', 'Navarro', 'Orts', 'Pons', 'Roig', 'Sala', 'Tormo', 'Úbeda', 'Vañó']
  const OLDER_SOURCES = ['Meta Ads · Dolor lumbar', 'Google Ads', 'Meta Ads · Primera visita', 'Instagram', 'Web']
  const older = []
  for (let i = 0; i < 34; i++) {
    const daysAgo = 4 + Math.round((i * 86) / 34) + (i % 3)
    older.push([`${OLDER_FIRST[i % 20]} ${OLDER_LAST[(i * 7 + Math.floor(i / 20)) % 20]}`, OLDER_STAGES[i % OLDER_STAGES.length], i % 4 === 0 ? 'web' : 'facebook', OLDER_SOURCES[i % 5], DAY * daysAgo, null, false])
  }
  const rows = [...THIS_MONTH, ...older].map(([name, stage, channel, source, created, value, ai], i) => {
    const n = String(i + 1).padStart(4, '0')
    const digits = `346110${String(200 + i).padStart(5, '0')}`
    const slug = name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]+/g, '.')
    const external = channel === 'instagram' ? `igsid-demo-${i}` : channel === 'webchat' ? `wc-demo-7f3a` : null
    return {
      account_id: accountId,
      clinic_id: clinicId,
      reference: `LEAD-DEMO-${n}`,
      full_name: name,
      phone: channel === 'instagram' || channel === 'webchat' ? null : digits,
      email: channel === 'facebook' || channel === 'web' ? `${slug}@example.com` : null,
      stage,
      furthest_stage: stage === 'lost' ? 'contacted' : stage,
      channel,
      source,
      estimated_value_cents: value === null ? null : value * 100,
      ai_handling: ai,
      ai_state: ai ? 'handling' : 'none',
      external_source: external ? (channel === 'webchat' ? 'webchat' : 'instagram') : channel === 'facebook' ? 'meta_lead_ads' : null,
      external_id: external ?? (channel === 'facebook' ? `fb-demo-${i}` : null),
      converted_at: stage === 'converted' ? new Date(now - created + DAY * 2).toISOString() : null,
      marketing_consent_at: channel === 'facebook' ? new Date(now - created).toISOString() : null,
      marketing_consent_source: channel === 'facebook' ? 'lead_form' : null,
      _created: created,
    }
  })
  const inserted = ok(
    await admin.from('leads').insert(rows.map(({ _created, ...r }) => r)).select('id, reference, full_name, stage, channel, phone, external_id'),
    'leads',
  )
  for (const [i, lead] of inserted.entries()) {
    const created = new Date(now - rows[i]._created).toISOString()
    const stageChanged = new Date(now - rows[i]._created / (lead.stage === 'new' ? 1 : 2)).toISOString()
    await retry(() => admin.from('leads').update({ created_at: created, stage_changed_at: stageChanged }).eq('id', lead.id).select('id'), 'lead dates')
  }
  const L = (name) => inserted.find((l) => l.full_name === name)

  // The one converted this month is a patient now (a background demo patient).
  const eva = L('Eva Climent')
  const evaPatient = patients.find((p) => p.first_name === 'Eva') ?? patients.at(-1)
  ok(await admin.from('leads').update({ patient_id: evaPatient.id }).eq('id', eva.id).select('id'), 'converted lead')

  // Attribution for the Meta form leads of this month.
  ok(
    await admin.from('lead_attribution').insert(
      inserted.slice(0, 16).filter((l) => l.channel === 'facebook').map((l) => ({
        lead_id: l.id,
        account_id: accountId,
        campaign: 'Captación otoño',
        ad: rows[inserted.indexOf(l)].source.includes('lumbar') ? 'Dolor lumbar · vídeo' : 'Primera visita 30 €',
        audience: 'Valencia 25-55',
        first_touch: 'Facebook',
        last_touch: 'Formulario de Meta',
      })),
    ).select('lead_id'),
    'attribution',
  )

  // A timeline for the leads the clips open.
  const ev = (lead, kind, title, detail, body, msAgo) => ({ account_id: accountId, lead_id: lead.id, kind, title, detail, body, occurred_at: ago(msAgo) })
  const silvia = L('Silvia Cano')
  const marina = L('Marina Esteve')
  const diego = L('Diego Marco')
  ok(
    await admin.from('lead_events').insert([
      ev(marina, 'form', 'Formulario de Meta Ads', '¿Desde cuándo tienes la molestia? Más de 3 meses · ¿Has ido antes a un quiropráctico? No', null, hours(0.6)),
      ev(marina, 'conversation', 'Conversación por WhatsApp', null, { messages: [{ from: 'ai', text: 'Hola Marina, soy Alba, de Clínica Demo. Hemos visto que te interesa una primera visita por tu espalda. ¿Te va mejor por la mañana o por la tarde?' }, { from: 'lead', text: 'Por la tarde, a partir de las 18:00' }] }, hours(0.5)),
      ev(silvia, 'form', 'Formulario de Meta Ads', '¿Qué te gustaría mejorar? Dolor cervical al trabajar', null, hours(26)),
      ev(silvia, 'stage_change', 'Pasa a Contactado', null, null, hours(25)),
      ev(silvia, 'conversation', 'Conversación por WhatsApp', null, { messages: [{ from: 'ai', text: 'Hola Silvia, gracias por escribirnos. ¿Desde cuándo notas el dolor cervical?' }, { from: 'lead', text: 'Unos dos meses, sobre todo al final del día' }] }, hours(24)),
      ev(silvia, 'qualification', 'Cualificación', 'Dolor cervical de 2 meses, trabaja sentada. Buena candidata para una primera visita.', { verdict: 'Merece una primera visita' }, hours(23.5)),
      ev(diego, 'form', 'Formulario de Meta Ads', '¿Desde cuándo tienes la molestia? 1-3 meses', null, hours(60)),
      ev(diego, 'stage_change', 'Pasa a Reservado', null, null, hours(48)),
      ev(diego, 'appointment', 'Cita reservada', null, { slot: 'Primera visita · hoy, 9:00', slotDetail: 'Con Álex Prieto · Clínica Demo' }, hours(48)),
      ev(diego, 'stage_change', 'Pasa a Asistió', null, null, hours(1)),
    ]).select('id'),
    'lead events',
  )

  // Lead conversations in the Inbox: WhatsApp, Instagram and the web chat.
  const paula = L('Paula Ribes')
  const visitor = L('Visitante web 7F3A')
  ok(
    await admin.from('whatsapp_messages').insert([
      { account_id: accountId, lead_id: silvia.id, phone_number: silvia.phone, channel: 'whatsapp', direction: 'outbound', status: 'read', sent_by_ai: true, body_preview: 'Hola Silvia, gracias por escribirnos. ¿Desde cuándo notas el dolor cervical?', created_at: ago(hours(24)) },
      { account_id: accountId, lead_id: silvia.id, phone_number: silvia.phone, channel: 'whatsapp', direction: 'inbound', status: 'received', sent_by_ai: false, body_preview: 'Unos dos meses, sobre todo al final del día', created_at: ago(hours(23.6)) },
      { account_id: accountId, lead_id: paula.id, external_contact_id: paula.external_id, channel: 'instagram', direction: 'inbound', status: 'received', sent_by_ai: false, body_preview: 'Hola! Vi vuestro post sobre la postura. ¿Atendéis a embarazadas?', created_at: ago(hours(5)) },
      { account_id: accountId, lead_id: visitor.id, external_contact_id: visitor.external_id, channel: 'webchat', direction: 'inbound', status: 'received', sent_by_ai: false, body_preview: 'Buenas, ¿cuánto cuesta la primera visita?', created_at: ago(hours(2)) },
      { account_id: accountId, lead_id: visitor.id, external_contact_id: visitor.external_id, channel: 'webchat', direction: 'outbound', status: 'sent', sent_by_ai: true, body_preview: 'Hola, la primera visita son 60 € y dura unos 45 minutos. ¿Quieres que te busque un hueco esta semana?', created_at: ago(hours(1.95)) },
    ]).select('id'),
    'lead messages',
  )

  // --- ad spend this month (Meta Ads is left for the clip to type in)
  const month = new Date(new Date(now).toISOString().slice(0, 7) + '-01T00:00:00Z').toISOString().slice(0, 10)
  await admin.from('channel_spend').delete().eq('account_id', accountId).eq('period_month', month).eq('channel', 'Google Ads')
  ok(await admin.from('channel_spend').insert({ account_id: accountId, channel: 'Google Ads', period_month: month, amount_cents: 9000, source: 'manual' }).select('id'), 'spend')

  // --- receptionist usage this month
  await admin.from('receptionist_replies').delete().eq('account_id', accountId)
  const usage = []
  for (let i = 0; i < 46; i++) usage.push({ account_id: accountId, conversation_key: i % 3 === 0 ? `lead:${marina.id}` : patients[i % patients.length].id, delivery: i % 4 === 0 ? 'draft' : 'sent', created_at: ago(hours(1 + i * 1.3)) })
  ok(await admin.from('receptionist_replies').insert(usage).select('id'), 'receptionist usage')

  // --- the receptionist knows a little already
  ok(
    await admin
      .from('receptionist_config')
      .update({
        persona_name: 'Alba',
        never_says: 'No da diagnósticos, no promete resultados y no dice nada sobre mutuas. Ante señales de alarma, pasa la conversación a un quiropráctico en la misma respuesta.',
        knowledge: [
          { id: '6f1c2a8e-0d3b-4c5e-9a7f-1b2c3d4e5f60', title: 'Qué tratamos', lines: ['Atendemos sobre todo dolor lumbar y cervical, ciática y cefaleas tensionales.', 'No hacemos masajes ni fisioterapia.'] },
        ],
        qualification_questions: ['¿Desde cuándo tienes la molestia?', '¿Has ido antes a un quiropráctico?'],
        escalation_rules: [{ rule: 'mencionan pérdida de fuerza en una pierna', action: 'pasar a un quiropráctico ya' }],
      })
      .eq('account_id', accountId)
      .select('account_id'),
    'receptionist config',
  )

  // --- Google reviews (never published anywhere: no external id, no Google connection)
  await admin.from('reviews').delete().eq('account_id', accountId)
  const REVIEWS = [
    ['Mercedes L.', 5, 'Llegué con una lumbalgia que no me dejaba ni sentarme y en tres sesiones noto muchísima mejoría. Álex explica todo con mucha paciencia.', 3, null, 'draft'],
    ['Joan P.', 4, 'Muy buen trato y puntuales. Le pongo cuatro estrellas solo porque es difícil aparcar cerca.', 9, null, 'draft'],
    ['Beatriz R.', 5, 'Inés es una crack. Me ha ayudado muchísimo con las cefaleas.', 16, '¡Gracias, Beatriz! Nos alegra mucho que las cefaleas hayan mejorado. Un abrazo de todo el equipo.', 'ai'],
    ['Carlos M.', 5, 'Profesionales de verdad. La primera visita fue muy completa.', 30, '¡Muchas gracias, Carlos! Te esperamos en la próxima revisión.', 'human'],
    ['Lorena G.', 3, 'El tratamiento bien, pero tuve que esperar 20 minutos en recepción.', 48, 'Hola Lorena, gracias por contárnoslo y perdona la espera. Hemos ajustado la agenda de la tarde para que no vuelva a pasar.', 'human'],
    ['Andrea V.', 5, 'Recomendable 100 %. Ambiente muy agradable.', 75, null, null],
    ['Pedro S.', 5, 'Me cambiaron la cita sin problema por WhatsApp. Muy cómodo.', 110, '¡Gracias, Pedro!', 'human'],
    ['Nerea F.', 4, 'Buena experiencia, volveré.', 160, null, null],
    ['Ramón T.', 5, 'Después de años con dolor de cuello, por fin he encontrado algo que funciona.', 220, '¡Qué alegría leerte, Ramón! Gracias por confiar en nosotros.', 'ai'],
    ['Sofía C.', 5, 'Todo el equipo es encantador.', 300, null, null],
  ]
  const reviewRows = REVIEWS.map(([author, rating, body, daysAgo, reply, kind]) => ({
    account_id: accountId,
    clinic_id: clinicId,
    platform: 'google',
    external_id: null,
    author_name: author,
    rating,
    body,
    posted_at: ago(DAY * daysAgo),
    replied_at: reply ? ago(DAY * daysAgo - hours(5)) : null,
    reply_body: reply,
    reply_was_ai_drafted: kind === 'ai',
    reply_by_team_member_id: reply ? owner.id : null,
    draft_body:
      kind === 'draft'
        ? author.startsWith('Mercedes')
          ? '¡Muchas gracias, Mercedes! Nos alegra mucho que la espalda vaya mejor. Álex y todo el equipo te esperamos en la próxima sesión.'
          : 'Gracias por tus palabras, Joan. Tomamos nota de lo del aparcamiento: hay un parking público a 100 metros, en la calle de al lado. ¡Hasta pronto!'
        : null,
    draft_created_at: kind === 'draft' ? ago(DAY * daysAgo - hours(1)) : null,
  }))
  const reviews = ok(await admin.from('reviews').insert(reviewRows).select('id, author_name'), 'reviews')

  // --- review requests over the last two months
  await admin.from('review_requests').delete().eq('account_id', accountId).like('token', 'demo-%')
  const requests = []
  for (let i = 0; i < 24; i++) {
    requests.push({
      account_id: accountId,
      patient_id: patients[(i * 3) % patients.length].id,
      token: `demo-review-${i}`,
      channel: 'whatsapp',
      sent_at: ago(DAY * (2 + i * 2)),
      opened_at: i % 2 === 0 ? ago(DAY * (2 + i * 2) - hours(3)) : null,
      review_id: i === 0 ? reviews[0].id : i === 4 ? reviews[2].id : i === 8 ? reviews[3].id : null,
    })
  }
  ok(await admin.from('review_requests').insert(requests).select('id'), 'review requests')

  // --- satisfaction answers from the last weeks' completed visits
  await admin.from('satisfaction_surveys').delete().eq('account_id', accountId).like('token', 'demo-%')
  const visits = ok(
    await admin
      .from('appointments')
      .select('id, patient_id, starts_at')
      .eq('account_id', accountId)
      .eq('status', 'completed')
      .gte('starts_at', ago(DAY * 28))
      .lte('starts_at', ago(hours(3)))
      .order('starts_at', { ascending: false })
      .limit(20),
    'visits',
  )
  const SCORES = [null, 5, 5, 2, 4, 5, null, 5, 4, 5, 3, 5, 5, null, 4, 5, 5, 4]
  const surveys = visits.slice(0, SCORES.length).map((v, i) => ({
    account_id: accountId,
    appointment_id: v.id,
    token: i === 0 ? 'demo-valorar' : `demo-sat-${i}`,
    sent_at: new Date(new Date(v.starts_at).getTime() + hours(2)).toISOString(),
    score: SCORES[i],
    comment: SCORES[i] === 2 ? 'La sesión bien, pero me cambiaron la hora dos veces y no me avisaron.' : SCORES[i] === 3 ? 'Esperé bastante en recepción.' : null,
    answered_at: SCORES[i] === null ? null : new Date(new Date(v.starts_at).getTime() + hours(5)).toISOString(),
    review_offered_at: SCORES[i] >= 4 ? new Date(new Date(v.starts_at).getTime() + hours(5)).toISOString() : null,
    resolved_at: SCORES[i] === 3 ? ago(DAY) : null,
  }))
  if (surveys.length) ok(await admin.from('satisfaction_surveys').insert(surveys).select('id'), 'surveys')

  // --- online booking: a discount code already in use
  await admin.from('online_booking_discount_codes').delete().eq('account_id', accountId).in('code', ['BIENVENIDA10', 'AMIGOS5'])
  ok(
    await admin.from('online_booking_discount_codes').insert({ account_id: accountId, code: 'BIENVENIDA10', percent_off: 10, max_uses: 50, times_used: 7, expires_at: new Date(now + DAY * 120).toISOString() }).select('id'),
    'discount code',
  )

  // --- a Facebook page that looks connected for lead ads (no token stored)
  await admin.from('lead_ad_pages').delete().eq('account_id', accountId)
  ok(
    await admin.from('lead_ad_pages').insert({ account_id: accountId, page_id: '100000000000777', page_name: 'Clínica Demo', connected_by: owner.id, last_lead_at: ago(hours(0.6)), last_synced_at: ago(hours(0.5)) }).select('id'),
    'lead ad page',
  )

  // --- an automation with people in it, for the Personas tab and the journey
  // of one patient: WhatsApp, wait two days, email. Rebuilt every run.
  const RULE_NAME = 'Seguimiento tras la visita'
  const oldRules = ok(await admin.from('automation_rules').select('id').eq('account_id', accountId).eq('name', RULE_NAME), 'old rule')
  if (oldRules.length) {
    await admin.from('whatsapp_messages').delete().eq('account_id', accountId).like('wamid', 'wamid.DEMO-AUTO-%')
    await admin.from('email_messages').delete().eq('account_id', accountId).like('provider_message_id', 'demo-auto-%')
    await admin.from('automation_rules').delete().in('id', oldRules.map((r) => r.id))
  }
  const [rule] = ok(
    await admin.from('automation_rules').insert({
      account_id: accountId,
      name: RULE_NAME,
      trigger_event: 'appointment.completed',
      enabled: true,
      entry_mode: 'one_at_a_time',
      filters: {},
      is_marketing: false,
      dry_run: false,
      exit_on: ['appointment.booked'],
      created_at: ago(DAY * 12),
    }).select('id'),
    'rule',
  )
  const steps = ok(
    await admin.from('automation_actions').insert([
      { account_id: accountId, rule_id: rule.id, action_type: 'whatsapp_template', position: 0, config: { template_name: 'seguimiento_tras_visita', template_language: 'es', variables: [{ source: 'first_name' }], doc_template_ids: [] } },
      { account_id: accountId, rule_id: rule.id, action_type: 'delay', position: 1, config: { delay_minutes: 2880 } },
      { account_id: accountId, rule_id: rule.id, action_type: 'email', position: 2, config: { subject: '¿Cómo te encuentras?', body: '<p>Hola {{first_name}},</p><p>Han pasado unos días desde tu visita. Si quieres comentarnos cómo te encuentras, responde a este correo.</p><p>{{clinic_name}}</p>' } },
    ]).select('id, position'),
    'steps',
  )
  const step = (pos) => steps.find((x) => x.position === pos)
  const used = new Set(['Hugo', 'Tomás', 'Rosa', 'Irene', 'Carmen', 'Andrés', 'Nuria', 'Lucía', 'Raúl'])
  const people = patients.filter((x) => !used.has(x.first_name) && phoneOf(x.id)).sort((a, b) => a.id.localeCompare(b.id)).slice(0, 9)
  // [status, stopped_reason, last_error, started (ms ago), step-1 message status, email opened]
  const PLAN = [
    ['done', null, null, DAY * 5, 'read', true],
    ['done', null, null, DAY * 6, 'delivered', false],
    ['done', null, null, DAY * 4, 'read', false],
    ['running', null, null, DAY * 1, 'read', false],
    ['running', null, null, hours(20), 'delivered', false],
    ['running', null, null, hours(9), 'sent', false],
    ['running', null, null, hours(3), 'sent', false],
    ['cancelled', 'no_contact', null, DAY * 3, 'delivered', false],
    ['failed', null, 'Este paciente no tiene correo electrónico.', DAY * 3, 'read', false],
  ]
  for (const [i, patient] of people.entries()) {
    const [status, stopped, lastError, started, waState, opened] = PLAN[i]
    const at = (offset) => ago(started - offset)
    const waiting = status === 'running' || status === 'failed' || status === 'done' || status === 'cancelled'
    const [run] = ok(
      await admin.from('automation_sequence_runs').insert({
        account_id: accountId,
        rule_id: rule.id,
        patient_id: patient.id,
        status,
        stopped_reason: stopped,
        last_error: lastError,
        attempts: status === 'failed' ? 3 : 0,
        next_position: status === 'done' ? 3 : status === 'cancelled' ? 1 : status === 'failed' ? 2 : 1,
        current_action_id: status === 'running' ? step(1).id : status === 'failed' ? step(2).id : null,
        resume_at: status === 'running' ? new Date(now + hours(48) - started).toISOString() : at(0),
        started_at: at(0),
        updated_at: status === 'running' ? at(60_000) : at(DAY * 2),
        context: { triggerBody: { patientId: patient.id, triggerEvent: 'appointment.completed' } },
      }).select('id'),
      'run',
    )
    const events = [
      ['started', null, null, null, 'appointment.completed', 0],
      ['sent', 0, 'whatsapp_template', 'WhatsApp · seguimiento_tras_visita', null, 60_000],
    ]
    if (waiting) events.push(['waiting', 1, 'delay', 'Wait 2 days', null, 120_000])
    if (status === 'done') events.push(['sent', 2, 'email', 'Email · ¿Cómo te encuentras?', null, DAY * 2 + 120_000], ['finished', null, null, null, null, DAY * 2 + 180_000])
    if (status === 'cancelled') events.push(['stopped', null, null, null, 'This person asked not to be contacted', DAY * 1])
    if (status === 'failed') events.push(['failed', 2, 'email', 'Email · ¿Cómo te encuentras?', lastError, DAY * 2 + 120_000])
    ok(
      await admin.from('automation_run_events').insert(
        events.map(([outcome, position, action_type, step_label, detail, offset]) => ({
          account_id: accountId,
          run_id: run.id,
          outcome,
          position,
          action_type,
          step_label,
          detail,
          action_id: position === null ? null : step(position).id,
          created_at: at(offset),
        })),
      ).select('id'),
      'run events',
    )
    ok(
      await admin.from('whatsapp_messages').insert({
        account_id: accountId,
        patient_id: patient.id,
        phone_number: phoneOf(patient.id),
        channel: 'whatsapp',
        direction: 'outbound',
        status: waState,
        sent_by_ai: false,
        template_name: 'seguimiento_tras_visita',
        automation_action_id: step(0).id,
        rule_id: rule.id,
        body_preview: `Hola ${patient.first_name}, ¿cómo te has encontrado después de tu última visita? Cuéntanos si necesitas algo.`,
        wamid: `wamid.DEMO-AUTO-${i}`,
        created_at: at(60_000),
        updated_at: at(90_000),
      }).select('id'),
      'automation message',
    )
    if (status === 'done') {
      ok(
        await admin.from('email_messages').insert({
          account_id: accountId,
          rule_id: rule.id,
          patient_id: patient.id,
          automation_action_id: step(2).id,
          provider_message_id: `demo-auto-${i}`,
          recipient_email: `paciente${i}@example.com`,
          subject: '¿Cómo te encuentras?',
          sent_at: at(DAY * 2 + 120_000),
          delivered_at: at(DAY * 2 + 125_000),
          first_opened_at: opened ? at(DAY * 2 + hours(3)) : null,
          open_count: opened ? 1 : 0,
        }).select('id'),
        'automation email',
      )
    }
  }

  void alex
  void ines
}
