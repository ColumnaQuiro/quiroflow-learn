// Clips for the communications, growth and online-booking articles: the shared
// Inbox, saved replies, WhatsApp / web chat settings, automations, leads, the
// AI receptionist, reputation, and the public booking page with its settings.
// See ../README.md.
//
// Needs `node scripts/record/seed.mjs communications` first. Nothing reaches
// Meta, WhatsApp, Instagram, Google or Stripe: every clip's prepare() answers
// those requests itself (see communications/shared.mjs). Clips that change
// something put it back in prepare(), so each can be re-recorded on its own.
import { demo, must, stubMeta, forgetStubbedSends, patientByFirst, go, settled, clipNow } from './communications/shared.mjs'

/** The Inbox, loaded: stubs on, the notifications banner and the sidebar out of the way. */
async function openInbox(h) {
  await stubMeta(h)
  await forgetStubbedSends()
  await h.page.reload({ waitUntil: 'networkidle' })
  await h.page.locator('[data-cy="inbox-row"]').first().waitFor({ timeout: 20000 })
  const banner = h.page.locator('[data-cy="push-not-now"]')
  if (await banner.isVisible().catch(() => false)) await banner.click()
  await h.page.locator('[data-cy="sidebar-collapse"]').click().catch(() => {})
  await settled(h)
}
const row = (h, name) => h.page.locator('[data-cy="inbox-row"]', { hasText: name }).first()

/** Puts a conversation back as seeded: no notes, owner, snooze or sends of ours. */
async function resetConversation(first, last) {
  const { admin, accountId } = await demo()
  const p = await patientByFirst(first, last)
  await admin.from('inbox_notes').delete().eq('account_id', accountId).eq('conversation_key', p.id)
  await admin.from('inbox_assignments').delete().eq('account_id', accountId).eq('conversation_key', p.id)
  await admin.from('inbox_snoozes').delete().eq('account_id', accountId).eq('conversation_key', p.id)
  return p
}

const clips = [
  // the-shared-inbox ---------------------------------------------------------------
  {
    id: 'inbox--reply-saved-reply',
    path: '/inbox',
    ready: '[data-cy="inbox-row"]',
    async prepare(h) {
      await openInbox(h)
      await h.click(row(h, 'Tomás Reyes'), { after: 300 })
      await h.page.locator('[data-cy="thread-message"]').first().waitFor({ timeout: 15000 })
      await settled(h)
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.getByTitle('Respuestas guardadas'))
      await h.pause(600)
      await h.click(h.page.getByRole('button', { name: /Horario/ }).first(), { after: 900 })
      await h.hover(h.page.getByPlaceholder('Escribe un mensaje…'))
      await h.pause(900)
      await h.click(h.page.locator('[data-cy="thread-send"]'), { after: 300 })
      await h.page.locator('[data-cy="thread-message"]', { hasText: 'Abrimos de lunes a viernes' }).waitFor({ timeout: 15000 })
      await h.moveAway()
    },
    hold: 2200,
  },

  {
    id: 'inbox--send-template',
    path: '/inbox',
    ready: '[data-cy="inbox-row"]',
    async prepare(h) {
      await openInbox(h)
      await h.click(row(h, 'Rosa Climent'), { after: 300 })
      await h.page.getByRole('button', { name: 'Enviar plantilla' }).waitFor({ timeout: 15000 })
      await settled(h)
    },
    async run(h) {
      await h.pause(900)
      await h.click(h.page.getByRole('button', { name: 'Enviar plantilla' }))
      await h.page.locator('[data-cy="whatsapp-template-card"]').first().waitFor({ timeout: 15000 })
      await h.pause(800)
      await h.click(h.page.locator('[data-cy="whatsapp-template-card"]', { hasText: 'Revision paciente' }), { after: 1100 })
      await h.click(h.page.getByRole('dialog').getByRole('button', { name: 'Enviar', exact: true }), { after: 400 })
      await h.page.locator('[data-cy="thread-message"]', { hasText: 'te reservamos una revisión' }).last().waitFor({ timeout: 15000 })
      await h.moveAway()
    },
    hold: 2200,
  },

  {
    id: 'inbox--note-assign-snooze',
    path: '/inbox',
    ready: '[data-cy="inbox-row"]',
    async prepare(h) {
      await resetConversation('Irene', 'Lozano')
      await h.page.route('**/api/inbox/note-mentions', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }))
      await openInbox(h)
      await h.click(row(h, 'Irene Lozano'), { after: 300 })
      await h.page.locator('[data-cy="thread-message"]').first().waitFor({ timeout: 15000 })
      await settled(h)
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.locator('[data-cy="thread-note-open"]'))
      await h.type(h.page.locator('[data-cy="note-text"]'), 'Ya le confirmé la cita del lunes. @Ál')
      await h.click(h.page.locator('[data-cy="note-mention-option"]').first(), { after: 500 })
      await h.type(h.page.locator('[data-cy="note-text"]'), '¿puedes mirar el informe de la mutua?', { after: 500 })
      await h.click(h.page.locator('[data-cy="note-save"]'), { after: 1200 })
      await h.click(h.page.locator('[data-cy="thread-assign"]'))
      await h.click(h.page.locator('[data-cy="thread-assign-menu"]').getByText('Inés Ramos'), { after: 1200 })
      await h.click(h.page.locator('[data-cy="thread-snooze"]'))
      await h.pause(500)
      await h.click(h.page.locator('[data-cy="thread-snooze-tomorrow"]'), { after: 600 })
      await h.moveAway()
    },
    hold: 1800,
  },

  // automations ---------------------------------------------------------------------
  {
    id: 'automations--from-template',
    path: '/automations',
    ready: 'text=Nueva automatización',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('automation_rules').delete().eq('account_id', accountId).eq('name', 'Recordatorio 24 h')
      await stubMeta(h)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Plantillas' }).waitFor({ timeout: 20000 })
      await settled(h)
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.getByRole('button', { name: 'Plantillas' }))
      await h.pause(900)
      await h.click(h.page.locator('[data-test="template-reminder-24h"]'), { after: 600 })
      await h.page.locator('[data-test="automation-name"]').waitFor({ timeout: 20000 })
      await settled(h)
      await h.pause(700)
      await h.click(h.page.locator('[data-test^="node-"]', { hasText: 'WhatsApp' }).first(), { after: 700 })
      await h.select(h.page.locator('[data-test="template-select"]'), { label: 'recordatorio_cita · es · Servicio' })
      await h.pause(900)
      await h.click(h.page.locator('[data-test="save"]'), { after: 1200 })
      await h.click(h.page.locator('[data-test="automation-enabled"]'), { after: 1500 })
      await h.moveAway()
    },
    hold: 2200,
  },

  {
    id: 'automations--group-message',
    path: '/automations',
    ready: 'text=Nueva automatización',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('automation_rules').delete().eq('account_id', accountId).eq('name', 'Pacientes que no vienen')
      await stubMeta(h)
      await h.page.route('**/api/automations/send-now', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }))
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Nueva automatización', { exact: true }).first().waitFor({ timeout: 20000 })
      await settled(h)
    },
    async run(h) {
      await h.click(h.page.getByText('Nueva automatización', { exact: true }).first(), { after: 400 })
      await h.page.locator('[data-test="automation-name"]').waitFor({ timeout: 20000 })
      await settled(h)
      const name = h.page.locator('[data-test="automation-name"]')
      await name.fill('')
      await h.type(name, 'Pacientes que no vienen', { delay: 30, after: 200 })
      await h.select(h.page.locator('[data-test="trigger-select"]'), { label: 'Un grupo de pacientes, una vez o con un horario' })
      await h.click(h.page.getByRole('button', { name: 'Una vez', exact: true }))
      await h.select(h.page.locator('[data-test="segment-filter-add"]'), { label: 'Última visita' })
      await h.select(h.page.locator('[data-test="segment-filter-add"]'), { label: 'Cita futura' })
      await h.hover(h.page.locator('[data-test="segment-count"]'))
      await h.pause(500)
      await h.click(h.page.locator('[data-test="insert-root-root-0"]'), { after: 500 })
      await h.click(h.page.locator('[data-test="add-step-email"]'), { after: 700 })
      await h.type(h.page.locator('[data-test="email-subject"]'), 'Te echamos de menos', { delay: 30, after: 200 })
      await h.type(h.page.locator('[data-test="email-body"]').first(), 'Hace tiempo que no te vemos. Reserva tu revisión cuando quieras.', { delay: 12, after: 200 })
      await h.click(h.page.locator('[data-test="save"]'), { after: 600 })
      await h.page.getByText('Guardado ahora').waitFor({ timeout: 15000 })
      await h.pause(500)
      await h.click(h.page.locator('[data-test="automation-enabled"]'), { after: 600 })
      await h.page.locator('[data-test="segment-activate"]').waitFor({ timeout: 15000 })
      await h.pause(1400)
      await h.click(h.page.locator('[data-test="segment-activate-test"]'), { after: 1400 })
      await h.moveAway()
    },
    hold: 1800,
  },

  {
    id: 'automations--person-journey',
    path: '/automations',
    ready: 'text=Nueva automatización',
    async prepare(h) {
      const { admin, accountId } = await demo()
      const { data: rule } = await admin.from('automation_rules').select('id').eq('account_id', accountId).eq('name', 'Seguimiento tras la visita').single()
      const { data: run } = await admin.from('automation_sequence_runs').select('id, patients(first_name, last_name)').eq('rule_id', rule.id).eq('status', 'done').order('started_at').limit(1).single()
      h.who = `${run.patients.first_name} ${run.patients.last_name}`
      await stubMeta(h)
      await go(h, `/automations/${rule.id}`)
      await h.page.locator('[data-test="tab-people"]').waitFor({ timeout: 20000 })
      await settled(h)
    },
    async run(h) {
      await h.click(h.page.locator('[data-test="tab-people"]'), { after: 900 })
      await settled(h)
      await h.pause(700)
      await h.click(h.page.locator('[data-test="people-tab-done"]'), { after: 1000 })
      await h.click(h.page.locator('[data-test^="run-"]').filter({ hasText: h.who }).first(), { after: 900 })
      await h.page.locator('[data-test="run-detail"]').waitFor({ timeout: 15000 })
      await settled(h)
      await h.pause(1400)
      await h.click(h.page.locator('[data-test^="node-"]', { hasText: 'WhatsApp' }).first(), { after: 1800 })
      await h.moveAway()
    },
    hold: 2400,
  },

  {
    id: 'automations--send-test',
    path: '/automations',
    ready: 'text=Nueva automatización',
    async prepare(h) {
      const { admin, accountId } = await demo()
      const { data: rule } = await admin.from('automation_rules').select('id').eq('account_id', accountId).eq('name', 'Seguimiento tras la visita').single()
      await stubMeta(h)
      await h.page.route('**/api/automations/send-test', async (route) => {
        const b = route.request().postDataJSON() ?? {}
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ email: 'demo@clinica-demo.test', whatsappNumber: b.whatsappNumber ?? b.phone ?? null }) })
      })
      await go(h, `/automations/${rule.id}`)
      await h.page.locator('[data-test="send-test"]').waitFor({ timeout: 20000 })
      await settled(h)
    },
    async run(h) {
      await h.pause(800)
      await h.click(h.page.locator('[data-test="send-test"]'))
      await h.type(h.page.locator('[data-test="test-whatsapp-number"]'), '600 000 999')
      await h.pause(600)
      await h.click(h.page.getByRole('dialog').getByRole('button', { name: 'Enviar', exact: true }), { after: 600 })
      await h.page.locator('[data-test="test-result"]').waitFor({ timeout: 15000 })
      await h.moveAway()
    },
    hold: 3400,
  },

  // settings: messages, saved replies, WhatsApp ---------------------------------------
  {
    id: 'comms--reminder-settings',
    path: '/settings/messages',
    ready: '[data-cy="messages-reminder"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      must(await admin.from('accounts').update({ appointment_reminder_hours_before: 24, appointment_reminder_channels: ['whatsapp'], email_reminder_subject: null, email_reminder_body: null }).eq('id', accountId).select('id'), 'reset reminder')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="messages-reminder"]').waitFor({ timeout: 20000 })
      await settled(h)
      await h.page.locator('[data-cy="messages-reminder"]').scrollIntoViewIfNeeded()
    },
    async run(h) {
      const card = h.page.locator('[data-cy="messages-reminder"]')
      const hours = card.locator('[data-cy="reminder-hours"]')
      await h.pause(600)
      await hours.fill('')
      await h.type(hours, '48', { after: 500 })
      await h.click(card.locator('[data-cy="channel-email"]'), { after: 700 })
      await h.type(card.getByPlaceholder(/Ej\./).first(), 'Recordatorio de tu cita', { delay: 35 })
      const body = card.locator('[contenteditable="true"]').first()
      await h.type(body, 'Hola ', { delay: 35, after: 200 })
      await h.click(card.getByRole('button', { name: 'Nombre', exact: true }).first(), { after: 300 })
      await h.type(body, ', te esperamos el ', { delay: 35, after: 200 })
      await h.click(card.getByRole('button', { name: 'Fecha de la cita', exact: true }).first(), { after: 900 })
      await h.click(h.page.locator('[data-cy="messages-save"]'), { after: 1800 })
      await h.moveAway()
    },
    hold: 2200,
  },

  {
    id: 'comms--saved-reply-create',
    path: '/settings/saved-replies',
    ready: '[data-cy="reply-new"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('saved_replies').delete().eq('account_id', accountId).in('title', ['Respuesta sin título', 'Reservar online'])
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="reply-new"]').waitFor({ timeout: 20000 })
      await settled(h)
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.locator('[data-cy="reply-new"]'), { after: 700 })
      const title = h.page.locator('[data-cy="reply-title"]')
      await title.fill('')
      await h.type(title, 'Reservar online', { delay: 45 })
      await h.type(h.page.locator('[data-cy="reply-body"]'), 'Puedes reservar tu cita online cuando quieras desde el enlace de nuestra web. ¡Te esperamos!', { delay: 25 })
      await h.pause(700)
      await h.click(h.page.locator('[data-cy="reply-save"]'), { after: 1500 })
      await h.moveAway()
    },
    hold: 2200,
  },

  {
    id: 'comms--web-chat',
    path: '/settings/whatsapp',
    ready: 'text=Chat en tu web',
    async prepare(h) {
      const { admin, accountId } = await demo()
      must(await admin.from('accounts').update({ webchat_enabled: false, webchat_greeting: null }).eq('id', accountId).select('id'), 'reset chat')
      await stubMeta(h)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('#h-webchat').waitFor({ timeout: 20000 })
      await settled(h)
      await h.page.locator('#h-webchat').scrollIntoViewIfNeeded()
      await h.page.evaluate(() => { document.querySelector('#h-webchat')?.scrollIntoView({ block: 'start' }) })
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.getByText('Mostrar el chat en mi web').locator('xpath=ancestor::*[self::label or self::div][1]'), { after: 900 })
      const greeting = h.page.locator('[data-cy="webchat-greeting"]')
      await greeting.fill('')
      await h.type(greeting, '¡Hola! ¿En qué te podemos ayudar?', { delay: 35 })
      await h.pause(500)
      await h.click(h.page.locator('[data-cy="webchat-copy"]'), { after: 700 })
      await h.click(h.page.locator('[data-cy="whatsapp-save"]'), { after: 1500 })
      await h.moveAway()
    },
    hold: 2200,
  },

  {
    id: 'comms--whatsapp-templates',
    path: '/settings/whatsapp',
    ready: 'text=Plantillas de mensaje',
    async prepare(h) {
      const { admin, accountId } = await demo()
      must(await admin.from('accounts').update({ whatsapp_confirmation_template_name: 'confirmacion_cita', whatsapp_reminder_template_name: 'recordatorio_cita', whatsapp_recall_template_name: 'revision_paciente', online_booking_notify_whatsapp_template_name: null, new_lead_notify_whatsapp_template_name: null }).eq('id', accountId).select('id'), 'reset templates')
      await stubMeta(h)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('#h-templates').waitFor({ timeout: 20000 })
      await settled(h)
      await h.page.evaluate(() => { document.querySelector('#h-templates')?.scrollIntoView({ block: 'start' }) })
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.getByRole('button', { name: 'Actualizar desde Meta' }), { after: 1200 })
      const pick = (title) => h.page.getByText(title, { exact: true }).locator('xpath=ancestor::div[.//select][1]').locator('select')
      await h.select(pick('Aviso de reserva (al personal)'), { label: 'aviso_reserva_equipo · es · UTILITY' })
      await h.select(pick('Aviso de lead (al personal)'), { label: 'aviso_nuevo_lead · es · UTILITY' })
      await h.click(h.page.locator('[data-cy="whatsapp-save"]'), { after: 1600 })
      await h.page.evaluate(() => { document.querySelector('[data-cy="whatsapp-status"]')?.scrollIntoView({ block: 'center' }) })
      await h.pause(1400)
    },
    hold: 2400,
  },

  // growth ---------------------------------------------------------------------------
  {
    id: 'growth--overview-spend',
    path: '/growth',
    ready: '[data-test="funnel-stage-new"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      const month = new Date(clipNow().toISOString().slice(0, 7) + '-01T00:00:00Z').toISOString().slice(0, 10)
      await admin.from('channel_spend').delete().eq('account_id', accountId).eq('period_month', month).eq('channel', 'Meta Ads')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-test="spend-cell-Meta Ads"]').waitFor({ timeout: 20000 })
      await settled(h)
      await h.page.locator('[data-test="spend-cell-Meta Ads"]').scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.pause(800)
      await h.click(h.page.locator('[data-test="spend-cell-Meta Ads"]'), { after: 500 })
      await h.page.keyboard.type('250', { delay: 140 })
      await h.pause(500)
      await h.press('Enter', 1800)
      await h.moveAway()
    },
    hold: 3600,
  },

  {
    id: 'growth--leads-move-open',
    path: '/growth/leads',
    ready: '[data-test="lead-card"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      must(await admin.from('leads').update({ stage: 'new', furthest_stage: 'new' }).eq('account_id', accountId).eq('full_name', 'Jorge Llorens').select('id'), 'reset lead')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-test="lead-card"]').first().waitFor({ timeout: 20000 })
      await settled(h)
    },
    async run(h) {
      const card = h.page.locator('[data-test="lead-card"]', { hasText: 'Jorge Llorens' }).first()
      const target = h.page.locator('[data-test="lead-column-contacted"]')
      await card.waitFor()
      const a = await card.boundingBox()
      const b = await target.boundingBox()
      await h.hover(card)
      await h.page.mouse.down()
      for (let i = 1; i <= 24; i++) {
        await h.page.mouse.move(a.x + a.width / 2 + ((b.x + b.width / 2 - a.x - a.width / 2) * i) / 24, a.y + a.height / 2 + ((b.y + 260 - a.y - a.height / 2) * i) / 24)
        await h.pause(30)
      }
      await h.pause(300)
      await h.page.mouse.up()
      await h.pause(1400)
      await h.click(h.page.locator('[data-test="lead-card"]', { hasText: 'Silvia Cano' }).first(), { after: 1000 })
      await settled(h)
      await h.pause(1800)
    },
    hold: 3400,
  },

  {
    id: 'growth--lead-convert',
    path: '/growth/leads',
    ready: '[data-test="lead-card"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      const { data: lead } = await admin.from('leads').select('id, patient_id').eq('account_id', accountId).eq('full_name', 'Clara Monzó').single()
      await admin.from('leads').update({ patient_id: null, stage: 'qualified', furthest_stage: 'qualified', converted_at: null }).eq('id', lead.id)
      await admin.from('patients').delete().eq('account_id', accountId).eq('first_name', 'Clara').eq('last_name', 'Monzó')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-test="lead-card"]').first().waitFor({ timeout: 20000 })
      await settled(h)
    },
    async run(h) {
      await h.click(h.page.locator('[data-test="lead-card"]', { hasText: 'Clara Monzó' }).first(), { after: 900 })
      await settled(h)
      await h.click(h.page.getByRole('button', { name: 'Convertir en paciente' }).first(), { after: 1500 })
      await h.page.getByText('Reservar ahora su primera cita', { exact: false }).or(h.page.getByText('¿Reservar ahora su primera cita?')).first().waitFor({ timeout: 15000 }).catch(() => {})
      await h.pause(1800)
      await h.click(h.page.getByRole('button', { name: 'Reservar cita' }).last(), { after: 1500 })
      await settled(h)
      await h.moveAway()
    },
    hold: 2200,
  },

  {
    id: 'growth--lead-settings',
    path: '/settings/leads',
    ready: '[data-cy="lead-stages"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      must(await admin.from('accounts').update({ lead_convert_after_visits: null, lead_convert_appointment_type_id: null, new_lead_notify_email: null }).eq('id', accountId).select('id'), 'reset lead settings')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="lead-stages"]').waitFor({ timeout: 20000 })
      await settled(h)
      await h.page.evaluate(() => { document.querySelector('#h-conv')?.scrollIntoView({ block: 'start' }) })
    },
    async run(h) {
      await h.pause(800)
      await h.click(h.page.locator('[role="switch"]').nth(1), { after: 900 })
      const after = h.page.locator('[data-test="convert-after"]')
      await after.fill('')
      await h.type(after, '2', { after: 700 })
      await h.pause(600)
      await h.click(h.page.locator('[data-cy="lead-notify-email"]'), { after: 200 })
      await h.type(h.page.locator('[data-cy="lead-notify-email"]'), 'recepcion@clinica-demo.test', { delay: 40 })
      await h.pause(500)
      await h.click(h.page.locator('[data-test="save-lead-settings"]'), { after: 1600 })
      await h.moveAway()
    },
    hold: 2200,
  },

  {
    id: 'growth--receptionist-mode',
    path: '/growth/receptionist',
    ready: 'text=Redacta y tú apruebas',
    async prepare(h) {
      const { admin, accountId } = await demo()
      must(await admin.from('receptionist_config').update({ enabled: true, answer_during_hours: false }).eq('account_id', accountId).select('account_id'), 'reset mode')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Redacta y tú apruebas').first().waitFor({ timeout: 20000 })
      await settled(h)
      await h.page.evaluate(() => { for (const e of document.querySelectorAll('h2, h3, div')) if (e.textContent?.trim() === 'Respuestas') { e.scrollIntoView({ block: 'start' }); break } })
    },
    async run(h) {
      await h.pause(900)
      await h.click(h.page.getByText('Contesta sola', { exact: true }).first(), { after: 1800 })
      await h.click(h.page.getByText('Redacta y tú apruebas', { exact: true }).first(), { after: 1200 })
      await h.moveAway()
    },
    hold: 2400,
  },

  {
    id: 'growth--receptionist-knowledge',
    path: '/growth/receptionist',
    ready: 'text=Lo que sabe',
    async prepare(h) {
      const { admin, accountId } = await demo()
      must(await admin.from('receptionist_config').update({ knowledge: [{ id: '6f1c2a8e-0d3b-4c5e-9a7f-1b2c3d4e5f60', title: 'Qué tratamos', lines: ['Atendemos sobre todo dolor lumbar y cervical, ciática y cefaleas tensionales.', 'No hacemos masajes ni fisioterapia.'] }] }).eq('account_id', accountId).select('account_id'), 'reset knowledge')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Lo que sabe', { exact: true }).first().waitFor({ timeout: 20000 })
      await settled(h)
      await h.page.getByText('Lo que sabe', { exact: true }).first().click()
      await h.page.getByText('Lo que sabe de la clínica').waitFor({ timeout: 15000 })
      await h.page.evaluate(() => { for (const e of document.querySelectorAll('h2, h3')) if (e.textContent?.trim() === 'Lo que sabe de la clínica') { e.scrollIntoView({ block: 'start' }); break } })
      await h.page.waitForTimeout(600)
    },
    async run(h) {
      await h.pause(800)
      await h.click(h.page.getByRole('button', { name: 'La primera visita' }), { after: 900 })
      const lines = h.page.locator('[data-test="card-lines"]')
      await lines.fill('')
      await h.type(lines, 'Incluye historial, valoración postural y el primer ajuste.\nDura unos 45 minutos.', { delay: 22 })
      await h.pause(600)
      await h.click(h.page.getByRole('button', { name: 'Añadir tarjeta' }), { after: 1600 })
      await h.moveAway()
    },
    hold: 2400,
  },

  {
    id: 'growth--receptionist-approve-draft',
    path: '/inbox',
    ready: '[data-cy="inbox-row"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      const hugo = await patientByFirst('Hugo', 'Castillo')
      must(await admin.from('receptionist_config').update({ enabled: true, answer_during_hours: false }).eq('account_id', accountId).select('account_id'), 'reset mode')
      await admin.from('inbox_reply_drafts').delete().eq('account_id', accountId).eq('conversation_key', hugo.id)
      const { data: last } = await admin.from('whatsapp_messages').select('created_at').eq('account_id', accountId).eq('patient_id', hugo.id).eq('direction', 'inbound').order('created_at', { ascending: false }).limit(1).single()
      must(await admin.from('inbox_reply_drafts').insert({ account_id: accountId, conversation_key: hugo.id, body: '¡Qué buena noticia lo del tobillo, Hugo! Este sábado tenemos hueco a las 10:00 o a las 11:30 con Inés. ¿Te reservo alguna de las dos?', drafted_through_at: last.created_at }).select('conversation_key'), 'draft')
      await openInbox(h)
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.locator('[data-cy="inbox-row"]', { hasText: 'Hugo Castillo' }).first(), { after: 300 })
      await h.page.locator('[data-cy="reply-draft"]').first().waitFor({ timeout: 15000 })
      await settled(h)
      await h.pause(1800)
      await h.click(h.page.getByRole('button', { name: 'Aprobar y enviar' }), { after: 400 })
      await h.page.locator('[data-cy="thread-message"]', { hasText: 'Qué buena noticia' }).last().waitFor({ timeout: 15000 })
      await h.moveAway()
    },
    hold: 3400,
  },

  {
    id: 'growth--reputation-approve',
    path: '/growth/reputation',
    ready: 'text=Requiere aprobación',
    async prepare(h) {
      const { admin, accountId } = await demo()
      must(await admin.from('reviews').update({ replied_at: null, reply_body: null, reply_was_ai_drafted: false, reply_by_team_member_id: null, draft_body: '¡Muchas gracias, Mercedes! Nos alegra mucho que la espalda vaya mejor. Álex y todo el equipo te esperamos en la próxima sesión.', draft_created_at: new Date(clipNow().getTime() - 3 * 86_400_000).toISOString() }).eq('account_id', accountId).eq('author_name', 'Mercedes L.').select('id'), 'reset review')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Aprobar' }).first().waitFor({ timeout: 20000 })
      await settled(h)
    },
    async run(h) {
      await h.pause(1000)
      await h.click(h.page.getByRole('button', { name: 'Editar' }).first(), { after: 700 })
      const box = h.page.locator('textarea').first()
      await h.click(box, { after: 200 })
      await h.page.keyboard.press('Control+End')
      await h.page.keyboard.type(' ¡Un abrazo!', { delay: 60 })
      await h.pause(700)
      await h.click(h.page.getByRole('button', { name: 'Aprobar' }).first(), { after: 1800 })
      await h.moveAway()
    },
    hold: 2400,
  },

  {
    id: 'growth--satisfaction-survey',
    path: '/valorar/demo-valorar',
    as: 'anon',
    ready: '[data-cy="satisfaction-page"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      must(await admin.from('satisfaction_surveys').update({ score: null, comment: null, answered_at: null, review_offered_at: null, resolved_at: null }).eq('account_id', accountId).eq('token', 'demo-valorar').select('id'), 'reset survey')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="satisfaction-score-5"]').waitFor({ timeout: 20000 })
    },
    async run(h) {
      await h.pause(1200)
      await h.hover(h.page.locator('[data-cy="satisfaction-score-3"]'))
      await h.click(h.page.locator('[data-cy="satisfaction-score-5"]'), { after: 1400 })
      await h.page.locator('[data-cy="satisfaction-thanks"]').first().waitFor({ timeout: 15000 })
      await h.moveAway()
    },
    hold: 3800,
  },

  // online booking -------------------------------------------------------------------
  {
    id: 'booking--copy-link-open',
    path: '/settings/online-booking',
    ready: '[data-cy="booking-status"]',
    async prepare(h) {
      await bookingSettings(h)
      // The address a clinic shares is its own subdomain, which a local demo
      // cannot serve: show the production host and make "Abrir página" open
      // the same page here, in this tab, so the clip can follow it.
      await h.page.evaluate(() => {
        const fix = () => {
          for (const code of document.querySelectorAll('code')) if (code.textContent?.includes('.localtest.me')) code.textContent = code.textContent.replace(/http:\/\/([a-z0-9-]+)\.localtest\.me:\d+\//, 'https://$1.quiroflow.com/')
          for (const a of document.querySelectorAll('a[target="_blank"]')) if (a.textContent?.includes('Abrir página')) { a.setAttribute('target', '_self'); a.setAttribute('href', '/book/clinica-demo') }
        }
        fix()
        setInterval(fix, 150)
      })
    },
    async run(h) {
      await h.pause(800)
      await h.click(h.page.getByRole('button', { name: 'Copiar' }).first(), { after: 1200 })
      await h.click(h.page.getByRole('link', { name: /Abrir página/ }), { after: 600 })
      await h.page.getByText('Elija un profesional').waitFor({ timeout: 20000 })
      await settled(h)
      await h.moveAway()
    },
    hold: 4400,
  },

  {
    id: 'booking--book-as-patient',
    path: '/settings/online-booking',
    as: 'anon',
    ready: 'body',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('patients').delete().eq('account_id', accountId).eq('email', 'noa.bellver@example.com')
      must(await admin.from('accounts').update({ online_booking_primary_color: null, online_booking_secondary_color: null, online_booking_background_color: null, online_booking_hide_heading: false }).eq('id', accountId).select('id'), 'reset look')
      // A phone-sized window on the real public page: the clip is a patient's
      // view on a mobile, and the recording window is a desktop one. The
      // frame lives in a same-origin document so the screencast follows it.
      await h.page.goto(new URL('/embed.js', h.page.url()).toString())
      await h.page.evaluate(() => {
        document.documentElement.innerHTML = '<head><meta charset="utf-8"></head><body style="margin:0;height:100vh;background:#e9ebf0;display:flex;align-items:center;justify-content:center"><iframe src="/book/clinica-demo" style="width:390px;height:760px;border:10px solid #15171e;border-radius:34px;background:#fff"></iframe></body>'
      })
      await h.page.addStyleTag({ content: '#__help_cursor{display:none!important}' })
      await h.page.frameLocator('iframe').getByText('Elija un profesional').waitFor({ timeout: 30000 })
      await h.page.waitForTimeout(1500)
    },
    async run(h) {
      const f = h.page.frameLocator('iframe')
      await h.pause(800)
      await h.select(f.locator('select').first(), { label: 'Primera visita — 45 min' })
      await h.click(f.getByRole('button', { name: /Cualquier profesional/ }), { after: 900 })
      await h.click(f.getByRole('button', { name: '9', exact: true }), { after: 800 })
      await h.click(f.getByRole('button', { name: '10:30' }), { after: 900 })
      await h.type(f.getByPlaceholder('Su nombre'), 'Noa', { delay: 60 })
      await h.type(f.getByPlaceholder('Sus apellidos'), 'Bellver Sanz', { delay: 40 })
      await h.type(f.getByPlaceholder('Su dirección de correo'), 'noa.bellver@example.com', { delay: 30 })
      await h.type(f.getByPlaceholder('Su número de móvil'), '600000321', { delay: 50 })
      await h.click(f.getByRole('button', { name: 'Reservar cita' }), { after: 800 })
      await f.getByText('¡Cita reservada!').waitFor({ timeout: 20000 })
    },
    hold: 3200,
  },

  {
    id: 'booking--appearance',
    path: '/settings/online-booking',
    ready: '[data-cy="booking-status"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      must(await admin.from('accounts').update({ online_booking_primary_color: null, online_booking_secondary_color: null, online_booking_background_color: null, online_booking_hide_heading: false }).eq('id', accountId).select('id'), 'reset look')
      await bookingSettings(h)
      await h.page.evaluate(() => { document.querySelector('#h-look')?.scrollIntoView({ block: 'start' }) })
      await h.page.waitForTimeout(500)
    },
    async run(h) {
      await h.pause(800)
      const main = h.page.locator('[data-cy="booking-color-primary"]')
      await h.type(main, '#0F766E', { delay: 70 })
      const soft = h.page.locator('[data-cy="booking-color-secondary"]')
      await h.type(soft, '#CCFBF1', { delay: 50 })
      await h.pause(800)
      await h.click(h.page.locator('[data-cy="booking-show-heading"]'), { after: 1100 })
      await h.click(h.page.locator('[data-cy="booking-save"]'), { after: 1600 })
      await h.moveAway()
    },
    hold: 2800,
  },

  {
    id: 'booking--discount-code',
    path: '/settings/online-booking',
    ready: '[data-cy="booking-status"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('online_booking_discount_codes').delete().eq('account_id', accountId).eq('code', 'AMIGOS5')
      await bookingSettings(h)
      await h.page.evaluate(() => { document.querySelector('#h-codes')?.scrollIntoView({ block: 'start' }) })
      await h.page.waitForTimeout(500)
    },
    async run(h) {
      const form = h.page.locator('form').filter({ has: h.page.getByRole('button', { name: 'Añadir', exact: true }) })
      await h.pause(900)
      await h.type(form.locator('input[type="text"]').first(), 'AMIGOS5', { delay: 80 })
      await h.type(form.locator('input[type="number"]').first(), '5', { delay: 80 })
      await h.pause(500)
      await h.click(form.getByRole('button', { name: 'Añadir', exact: true }), { after: 1400 })
      // typing in the last fields pans the narrow form sideways: bring the list of codes back into view
      await h.page.evaluate(() => {
        for (const e of document.querySelectorAll('*')) if (e.scrollLeft) e.scrollLeft = 0
        document.querySelector('#h-codes')?.scrollIntoView({ block: 'start' })
      })
      await h.moveAway()
      await h.pause(600)
    },
    hold: 2800,
  },

  {
    id: 'booking--referral-programme',
    path: '/settings/online-booking',
    ready: '[data-cy="booking-status"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      must(await admin.from('accounts').update({ referral_program_enabled: false, referral_reward_text: null }).eq('id', accountId).select('id'), 'reset referral')
      await bookingSettings(h)
      await h.page.evaluate(() => { document.querySelector('#h-referrals')?.scrollIntoView({ block: 'start' }) })
      await h.page.waitForTimeout(500)
    },
    async run(h) {
      await h.pause(900)
      await h.click(h.page.locator('[data-cy="settings-referrals-toggle"]'), { after: 900 })
      await h.type(h.page.locator('[data-cy="settings-referrals-reward"]'), 'Una sesión gratis cuando tu amigo venga a su primera visita', { delay: 28 })
      await h.pause(600)
      await h.click(h.page.locator('[data-cy="booking-save"]'), { after: 1600 })
      await h.moveAway()
    },
    hold: 2600,
  },
]

/** Settings > Reserva online, loaded. */
async function bookingSettings(h) {
  await h.page.reload({ waitUntil: 'networkidle' })
  await h.page.locator('[data-cy="booking-status"]').waitFor({ timeout: 20000 })
  await settled(h)
}

/**
 * The screencast only emits a frame when something repaints, so a final screen
 * that sits still would be cut short and the hold lost. Each clip therefore
 * rests on its result by nudging the pointer, which keeps frames coming.
 */
async function rest(h, ms) {
  const end = Date.now() + ms
  let flip = 0
  while (Date.now() < end) {
    await h.page.mouse.move(1218 + (flip % 2) * 4, 738)
    // a change nobody can see, for pages whose pointer is hidden or still
    await h.page.evaluate((n) => { document.documentElement.style.opacity = n % 2 ? '0.998' : '1' }, flip++).catch(() => {})
    await h.page.waitForTimeout(110)
  }
}

export default clips.map((c) => ({
  ...c,
  async run(h) {
    await c.run(h)
    await rest(h, c.hold ?? 1600)
  },
  hold: 150,
}))
