// Clips for the calendar & scheduling articles (calendar-appointments, the
// waitlist, recalls, check-in, team-roles/working-time-log and
// settings/scheduling-and-resources). See ../README.md.
//
// Needs `node scripts/record/seed.mjs calendar` first. Every clip that changes
// something puts "its" data back in prepare(), so each one can be re-recorded
// on its own as often as needed. The clips' own visits live in Inés Ramos's
// column (she has no demo visits on Tuesdays and Thursdays).
import { demo, resetToday, patientId, CAL, at, madridToday, addDays, weekday } from './calendar/shared.mjs'

// --- helpers ----------------------------------------------------------------

/** Opens the calendar on a view and practitioner tab, from a clean page. */
async function openCalendar(h, { view = 'day', who = 'ines' } = {}) {
  const d = await demo()
  // Put today back the way the seed left it: other clips move, cancel, book and block.
  for (const v of CAL.today) await resetToday(v.key)
  const { admin, accountId } = d
  const today = madridToday()
  for (const key of ['noa', 'julia', 'jorge']) {
    const pid = key === 'noa' ? (await admin.from('patients').select('id').eq('account_id', accountId).eq('first_name', CAL.newPatient.first).eq('last_name', CAL.newPatient.last)).data?.[0]?.id : await patientId(key)
    if (pid) await admin.from('appointments').delete().eq('patient_id', pid).gt('starts_at', at(today, key === 'jorge' ? '11:30' : '00:00').toISOString())
  }
  await admin.from('availability_blocks').delete().eq('account_id', accountId).in('note', CAL.blockNotes)
  await admin
    .from('waitlist_entries')
    .update({ status: 'waiting', claim_token: null, offered_at: null, offer_expires_at: null, offered_room_id: null, offered_practitioner_id: null, offered_appointment_type_id: null, offered_starts_at: null, offered_ends_at: null, booked_appointment_id: null })
    .neq('status', 'waiting')
  const tab = who === 'all' ? '__all' : d[who].id
  await h.page.evaluate(([v, p]) => {
    localStorage.setItem('quiroflow-calendar-view-mode', v)
    localStorage.setItem('quiroflow-calendar-practitioner', p)
  }, [view, tab])
  await h.page.reload({ waitUntil: 'networkidle' })
  await h.page.locator('[data-cy="calendar-grid"]').first().waitFor({ timeout: 30000 })
  await h.page.waitForTimeout(1200)
}

/**
 * A pointer target at a grid slot: the centre of `room`'s column at time `hm`
 * (dayIndex picks the day in week views). Returns a locator for an invisible
 * marker sitting there, so the helpers' paced click/hover land on the grid
 * underneath it.
 */
async function slot(h, room, hm, { dayIndex = 0, dy = 6 } = {}) {
  await h.page.evaluate(
    ([room, hm, dayIndex, dy]) => {
      const visible = (el) => el.getBoundingClientRect().width > 0
      const leaf = (text) => [...document.querySelectorAll('body *')].filter((el) => el.children.length === 0 && el.textContent.trim() === text && visible(el))
      const heads = leaf(room)
      const head = heads[dayIndex] ?? heads[0]
      const labels = leaf(hm)
      const label = labels.find((el) => el.getBoundingClientRect().left < 800) ?? labels[0]
      if (!head || !label) throw new Error(`no slot for ${room} ${hm}`)
      const hb = head.getBoundingClientRect()
      const lb = label.getBoundingClientRect()
      let m = document.getElementById('__slot')
      if (!m) {
        m = document.createElement('div')
        m.id = '__slot'
        Object.assign(m.style, { position: 'fixed', width: '4px', height: '4px', pointerEvents: 'none', zIndex: '2147483000' })
        document.body.appendChild(m)
      }
      m.style.left = `${hb.left + hb.width / 2 - 2}px`
      m.style.top = `${lb.top + lb.height / 2 + dy - 2}px`
    },
    [room, hm, dayIndex, dy],
  )
  return h.page.locator('#__slot')
}

/** Scrolls the calendar grid so `hm` sits near the top. */
async function scrollGridTo(h, hm) {
  await h.page.evaluate((hm) => {
    const scroller = document.querySelector('[data-cy="grid-scroller"]')
    if (!scroller) return
    const label = [...scroller.querySelectorAll('*')].find((el) => el.children.length === 0 && el.textContent.trim() === hm)
    if (label) scroller.scrollTop += label.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 60
  }, hm)
  await h.page.waitForTimeout(400)
}

/** Date and time inputs are segmented: click the field, then set the whole value at once. */
async function setField(h, loc, value) {
  await h.click(loc, { after: 250 })
  await loc.fill(value)
  await h.pause(450)
}

/** Parks the pointer on the page title: out of the way, and over nothing that reacts. */
async function rest(h) {
  const title = h.page.locator('h1').first()
  if (await title.isVisible().catch(() => false)) await h.hover(title)
  else await h.moveAway()
}

const block = (h, name) => h.page.locator('[data-cy="appt-block"]').filter({ hasText: name }).first()
const thursdayOf = (today) => addDays(today, (4 - weekday(today) + 7) % 7 || 7)
const dmy = (day) => day.split('-').reverse().join('')

// --- clips --------------------------------------------------------------------

export default [
  // the-calendar ---------------------------------------------------------------
  {
    id: 'calendar--views-and-tabs',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      await openCalendar(h, { view: 'workweek', who: 'all' })
      await scrollGridTo(h, '09:00')
    },
    async run(h) {
      await h.pause(500)
      await h.select(h.page.getByLabel('Vista').first(), 'day')
      await h.pause(1300)
      await h.click(h.page.locator('[data-testid="practitioner-tab"]').filter({ hasText: 'Sara Molina' }))
      await h.pause(1400)
      await h.select(h.page.getByLabel('Vista').first(), 'month')
      await h.pause(1800)
      await rest(h)
    },
  },
  {
    id: 'calendar--count-filter',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      await openCalendar(h, { view: 'day', who: 'all' })
      await scrollGridTo(h, '10:00')
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="day-filter-pending"]'))
      await h.pause(2000)
      await h.click(h.page.locator('[data-cy="day-filter-clear"]'))
      await h.pause(600)
    },
  },
  {
    id: 'calendar--hover-card',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      await resetToday('pau')
      await resetToday('ruben')
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '10:30')
    },
    async run(h) {
      await h.hover(block(h, 'Ferrer'))
      await h.pause(2400)
      await h.hover(block(h, 'Peris'))
      await h.pause(2200)
    },
    hold: 600,
  },
  {
    id: 'calendar--privacy-mode',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      await openCalendar(h, { view: 'day', who: 'all' })
      await scrollGridTo(h, '10:00')
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="display-privacyMode"]'))
      await h.pause(900)
      await rest(h)
      await h.pause(1200)
    },
  },

  // booking ----------------------------------------------------------------------
  {
    id: 'calendar--book-existing',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      const { admin } = await demo()
      await resetToday('iker')
      await admin.from('appointments').delete().eq('patient_id', await patientId('julia')).gte('starts_at', at(madridToday(), '00:00').toISOString())
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '15:00')
    },
    async run(h) {
      await h.click(await slot(h, 'Sala 3', '16:00'))
      await h.type(h.page.locator('[data-cy="create-patient-search"]'), 'Julia Benl')
      await h.click(h.page.locator('[data-cy="create-patient-result"]').first())
      await h.click(h.page.locator('[data-cy="create-type"]').filter({ hasText: 'Revisión' }).first())
      await h.hover(h.page.locator('[data-cy="create-free"]'))
      await h.pause(900)
      await h.click(h.page.locator('[data-cy="create-submit"]'), { after: 1500 })
      await rest(h)
    },
  },
  {
    id: 'calendar--book-new-patient',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      const { admin, accountId } = await demo()
      const { data } = await admin.from('patients').select('id').eq('account_id', accountId).eq('first_name', CAL.newPatient.first).eq('last_name', CAL.newPatient.last)
      for (const p of data ?? []) {
        await admin.from('appointments').delete().eq('patient_id', p.id)
        await admin.from('patients').delete().eq('id', p.id)
      }
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '16:30')
    },
    async run(h) {
      // A free slot in Inés's column (nothing after Lidia's visit), so the booking lands on screen.
      await h.click(await slot(h, 'Sala 3', '18:30'))
      await h.type(h.page.locator('[data-cy="create-patient-search"]'), `${CAL.newPatient.first} ${CAL.newPatient.last}`)
      await h.click(h.page.locator('[data-cy="create-new-patient"]'))
      const form = h.page.locator('[data-cy="create-new-patient-form"]')
      await h.type(form.locator('input[type="tel"]').first(), '611234567')
      await h.click(h.page.locator('[data-cy="create-type"]').filter({ hasText: 'Primera visita' }).first())
      await h.click(h.page.locator('[data-cy="create-practitioner"]').filter({ hasText: 'Inés' }).first())
      await h.hover(h.page.locator('[data-cy="create-free"]'))
      await h.click(h.page.locator('[data-cy="create-submit"]'), { after: 1500 })
      await rest(h)
    },
  },
  {
    id: 'calendar--book-clash',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      const { admin } = await demo()
      await resetToday('iker')
      await admin.from('appointments').delete().eq('patient_id', await patientId('julia')).gte('starts_at', at(madridToday(), '00:00').toISOString())
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '15:00')
    },
    async run(h) {
      await h.click(await slot(h, 'Sala 3', '16:00'))
      await h.type(h.page.locator('[data-cy="create-patient-search"]'), 'Julia Benl')
      await h.click(h.page.locator('[data-cy="create-patient-result"]').first())
      await h.click(h.page.locator('[data-cy="create-type"]').filter({ hasText: 'Osteopatía' }).first())
      await h.hover(h.page.locator('[data-cy="create-clash"]'))
      await h.pause(1500)
      // The first other time the app offers can itself be taken (a room, not the
      // practitioner, is busy); try them in order until one is free.
      const alts = h.page.locator('[data-cy="create-alternatives"] button')
      for (let i = 0; i < 6; i++) {
        await h.click(alts.first(), { after: 900 })
        if (await h.page.locator('[data-cy="create-free"]').isVisible().catch(() => false)) break
      }
      await h.hover(h.page.locator('[data-cy="create-free"]'))
      await h.pause(900)
      await h.hover(h.page.locator('[data-cy="create-submit"]'))
    },
  },

  // stages and the appointment panel ---------------------------------------------
  {
    id: 'calendar--check-in-to-checkout',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      await resetToday('eva')
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '09:30')
    },
    async run(h) {
      await h.click(block(h, 'Cortina'), { after: 1100 })
      const next = h.page.locator('[data-cy="advance-stage"]')
      await h.click(next, { after: 1200 }) // Registrar llegada
      await h.click(next, { after: 1200 }) // Pasa a consulta
      await h.click(next, { after: 1200 }) // Pasar a cobro
      await h.page.locator('[data-cy="advance-stage"][data-next="charge"]').waitFor()
      await h.pause(400)
      await h.click(h.page.locator('[data-cy="advance-stage"][data-next="charge"]'), { after: 1800 }) // Cobrar -> Cobro
      await rest(h)
    },
  },
  {
    id: 'calendar--mark-confirmed',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      await resetToday('pau')
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '10:30')
    },
    async run(h) {
      await h.click(block(h, 'Ferrer'), { after: 1100 })
      await h.hover(h.page.locator('[data-cy="stage-track"]'))
      await h.click(h.page.locator('[data-cy="mark-confirmed"]'), { after: 1300 })
      await h.press('Escape', 1000)
      await h.hover(block(h, 'Ferrer'))
      await h.pause(700)
    },
  },
  {
    id: 'calendar--undo-step',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      await resetToday('marina')
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '10:30')
    },
    async run(h) {
      await h.click(block(h, 'Soler'), { after: 1100 })
      await h.hover(h.page.locator('[data-cy="stage-track"]'))
      await h.click(h.page.locator('[data-cy="undo-stage"]'), { after: 1500 })
      await h.hover(h.page.locator('[data-cy="stage-track"]'))
    },
  },

  // moving and cancelling ---------------------------------------------------------
  {
    id: 'calendar--move-to-another-week',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      await resetToday('lidia')
      await openCalendar(h, { view: 'workweek', who: 'ines' })
      await scrollGridTo(h, '15:30')
    },
    async run(h) {
      await h.click(block(h, 'Escrivá'), { after: 1100 })
      await h.click(h.page.locator('[data-cy="move-appointment"]'), { after: 1100 })
      await h.hover(h.page.getByText('Reprogramando').first())
      await h.pause(800)
      await h.click(h.page.getByRole('button', { name: 'Siguiente', exact: true }), { after: 1400 })
      // Next week's Tuesday, Inés's room, 17:00.
      await h.click(await slot(h, 'Sala 3', '17:00', { dayIndex: 1 }), { after: 1300 })
      await h.click(h.page.getByRole('button', { name: 'Confirmar', exact: true }), { after: 1600 })
      await rest(h)
    },
  },
  {
    id: 'calendar--drag-reschedule',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      await resetToday('iker')
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '15:30')
    },
    async run(h) {
      await h.hover(block(h, 'Sanchis'))
      await h.page.mouse.down()
      // The pointer holds the block by its middle, so aim ~22 min below the start wanted (19:00).
      await h.hover(await slot(h, 'Sala 3', '19:00', { dy: 50 }))
      await h.page.mouse.up()
      await h.pause(1300)
      await h.select(h.page.getByLabel('Motivo', { exact: true }), { label: 'Petición del paciente' })
      await h.click(h.page.getByRole('button', { name: 'Confirmar', exact: true }), { after: 1700 })
      await h.hover(h.page.locator('[data-cy="moved-away-marker"]').first())
      await h.pause(900)
    },
  },
  {
    id: 'calendar--cancel-and-offer',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      const { admin } = await demo()
      await resetToday('laia')
      await admin.from('accounts').update({ waitlist_auto_offer: true, waitlist_offer_mode: 'one_by_one' }).eq('id', (await demo()).accountId)
      await admin
        .from('waitlist_entries')
        .update({ status: 'waiting', claim_token: null, offered_at: null, offer_expires_at: null, offered_room_id: null, offered_practitioner_id: null, offered_appointment_type_id: null, offered_starts_at: null, offered_ends_at: null, booked_appointment_id: null })
        .eq('patient_id', await patientId('oliver'))
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '15:30')
    },
    async run(h) {
      await h.click(block(h, 'Montesinos'), { after: 1100 })
      await h.click(h.page.locator('[data-cy="cancel-appointment"]'), { after: 1200 })
      await h.click(h.page.locator('[data-cy="cancel-fee-none"]'))
      await h.hover(h.page.locator('[data-cy="cancel-waitlist"]'))
      await h.pause(1000)
      await h.click(h.page.locator('[data-cy="cancel-offer"]'))
      await h.hover(h.page.locator('[data-cy="cancel-summary"]'))
      await h.pause(1100)
      await h.click(h.page.locator('[data-cy="confirm-cancel"]'), { after: 1800 })
      await h.hover(h.page.locator('[data-cy="freed-slot"]').first())
      await h.pause(900)
    },
  },
  {
    id: 'calendar--no-show-fee',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      const { admin } = await demo()
      await resetToday('teresa')
      await admin.from('invoices').delete().eq('patient_id', await patientId('teresa')).eq('status', 'unpaid')
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '09:00')
    },
    async run(h) {
      await h.click(block(h, 'Llopis'), { after: 1100 })
      await h.click(h.page.locator('[data-cy="mark-no-show"]'), { after: 1300 })
      await h.hover(h.page.locator('[data-cy="missed-fee"]'))
      await h.pause(700)
      await h.click(h.page.locator('[data-cy="missed-fee-balance"]'), { after: 1500 })
      await h.hover(h.page.locator('[data-cy="missed-fee-result"]'))
    },
  },

  // series, blocks, absences, classes -----------------------------------------------
  {
    id: 'calendar--book-series',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      const { admin } = await demo()
      await admin.from('appointments').delete().eq('patient_id', await patientId('jorge')).gt('starts_at', at(madridToday(), '23:59').toISOString())
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '15:30')
    },
    async run(h) {
      await h.click(await slot(h, 'Sala 3', '19:00'))
      await h.type(h.page.locator('[data-cy="create-patient-search"]'), 'Jorge Alb')
      await h.click(h.page.locator('[data-cy="create-patient-result"]').first())
      await h.click(h.page.locator('[data-cy="create-type"]').filter({ hasText: 'Revisión' }).first())
      await h.click(h.page.locator('[data-cy="create-more"]'))
      await h.select(h.page.locator('select').filter({ hasText: 'No se repite' }), { index: 4 })
      await h.pause(1000)
      await h.click(h.page.locator('[data-cy="create-submit"]'), { after: 1700 })
      const skip = h.page.locator('[data-cy="create-series-skip"]')
      if (await skip.isVisible().catch(() => false)) {
        await h.hover(h.page.locator('[data-cy="create-series-conflicts"]'))
        await h.pause(1000)
        await h.click(skip, { after: 1700 })
      }
      // The rest of the series: the same time a week on.
      const nextWeek = Number(addDays(madridToday(), 7).slice(8))
      const mini = h.page.getByRole('button', { name: String(nextWeek), exact: true }).first()
      if (await mini.isVisible().catch(() => false)) {
        await h.click(mini, { after: 1400 })
        await scrollGridTo(h, '17:30')
        await h.hover(block(h, 'Albert'))
        await h.pause(700)
      }
      await rest(h)
    },
  },
  {
    id: 'calendar--block-time',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('availability_blocks').delete().eq('account_id', accountId).eq('note', 'Formación')
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '16:00')
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Bloquear horario' }).first(), { after: 1000 })
      const dialog = h.page.getByRole('dialog').last()
      await h.select(dialog.getByLabel('Profesional'), { label: 'Inés Ramos' })
      const whole = dialog.getByLabel('Todo el día')
      if (await whole.isChecked()) await h.click(whole)
      await setField(h, dialog.getByLabel('Hora de inicio'), '19:00')
      await setField(h, dialog.getByLabel('Hora de fin'), '20:00')
      await h.type(dialog.getByLabel('Nota'), 'Formación')
      await h.click(dialog.getByRole('button', { name: 'Guardar' }), { after: 1600 })
      await h.hover(h.page.getByText('Formación', { exact: true }).first())
      await h.pause(700)
    },
  },
  {
    id: 'calendar--unplanned-absence',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      const { admin, accountId, ines } = await demo()
      const thursday = thursdayOf(madridToday())
      await admin.from('availability_blocks').delete().eq('account_id', accountId).like('note', 'Ausencia imprevista%')
      const { data: rooms } = await admin.from('calendar_resources').select('id').eq('account_id', accountId).eq('name', 'Sala 3')
      for (const key of ['teresa', 'pau', 'iker']) {
        await admin
          .from('appointments')
          .update({ practitioner_id: ines.id, practitioner_name: ines.full_name, status: 'booked', room_id: rooms[0].id })
          .eq('patient_id', await patientId(key))
          .gte('starts_at', at(thursday, '00:00').toISOString())
          .lt('starts_at', at(thursday, '23:59').toISOString())
      }
      this.thursday = thursday
      await openCalendar(h, { view: 'workweek', who: 'ines' })
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="absence-open"]'), { after: 1000 })
      await h.select(h.page.locator('[data-cy="absence-who"]'), { label: 'Inés Ramos' })
      await setField(h, h.page.locator('[data-cy="absence-from"]'), this.thursday)
      await setField(h, h.page.locator('[data-cy="absence-to"]'), this.thursday)
      await h.pause(1000)
      await h.click(h.page.locator('[data-cy="absence-action-move"]'))
      await h.select(h.page.locator('[data-cy="absence-substitute"]'), { label: 'Álex Prieto' })
      await h.click(h.page.locator('[data-cy="absence-apply"]'), { after: 2200 })
      await h.hover(h.page.locator('[data-cy="absence-result"]'))
      await h.pause(900)
    },
  },
  {
    id: 'calendar--new-class',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      const { admin, accountId } = await demo()
      const { data: t } = await admin.from('appointment_types').select('id').eq('account_id', accountId).eq('name', CAL.classType).single()
      const today = madridToday()
      const { data: sessions } = await admin.from('class_sessions').select('id').eq('appointment_type_id', t.id).gt('starts_at', at(today, '23:59').toISOString())
      for (const s of sessions ?? []) {
        await admin.from('appointments').delete().eq('class_session_id', s.id)
        await admin.from('class_sessions').delete().eq('id', s.id)
      }
      this.thursday = thursdayOf(today)
      await openCalendar(h, { view: 'workweek', who: 'ines' })
      await scrollGridTo(h, '15:30')
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="new-class-open"]'), { after: 1000 })
      await h.select(h.page.locator('[data-cy="new-class-type"]'), { label: `${CAL.classType} · 45 min` })
      await h.select(h.page.locator('[data-cy="new-class-practitioner"]'), { label: 'Inés Ramos' })
      await h.select(h.page.locator('[data-cy="new-class-room"]'), { label: 'Sala 3' })
      await setField(h, h.page.locator('[data-cy="new-class-date"]'), this.thursday)
      await setField(h, h.page.locator('[data-cy="new-class-time"]'), '19:00')
      await h.page.locator('[data-cy="new-class-weeks"]').fill('')
      await h.type(h.page.locator('[data-cy="new-class-weeks"]'), '8')
      await h.page.locator('[data-cy="new-class-capacity"]').fill('')
      await h.type(h.page.locator('[data-cy="new-class-capacity"]'), '8')
      await h.pause(800)
      await h.click(h.page.locator('[data-cy="new-class-create"]'), { after: 1700 })
      await h.hover(h.page.locator('[data-cy="class-block"]').last())
      await h.pause(700)
    },
  },
  {
    id: 'calendar--class-attendance',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      const { admin } = await demo()
      for (const key of ['rosa', 'gema']) {
        await admin.from('appointments').update({ status: 'booked', checked_in_at: null, flow_with_practitioner_at: null, flow_checkout_at: null }).eq('patient_id', await patientId(key)).not('class_session_id', 'is', null)
      }
      await admin.from('appointments').delete().eq('patient_id', await patientId('vera'))
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '08:30')
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="class-block"]').first(), { after: 1100 })
      await h.type(h.page.locator('[data-cy="class-add-search"]'), 'Vera Tor')
      await h.click(h.page.locator('[data-cy="class-add-result"]').first(), { after: 1200 })
      await h.click(h.page.locator('[data-cy="class-all-came"]'), { after: 1600 })
      await h.hover(h.page.locator('[data-cy="class-places"]'))
    },
  },

  // flow tracker -------------------------------------------------------------------
  {
    id: 'calendar--flow-tracker',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      for (const key of ['ruben', 'jorge', 'marina']) await resetToday(key)
      await openCalendar(h, { view: 'day', who: 'ines' })
      await scrollGridTo(h, '10:00')
    },
    async run(h) {
      const tracker = h.page.locator('[data-cy="flow-tracker"]')
      await h.hover(tracker.locator('[data-cy="flow-arrived"]'))
      await h.pause(800)
      const row = () => tracker.locator('[data-cy="flow-row"]').filter({ hasText: 'Rubén' }).first()
      await h.click(row().locator('[data-cy="flow-advance"]'), { after: 1400 })
      await h.click(row().locator('[data-cy="flow-advance"]'), { after: 1400 })
      await h.click(row().getByRole('button', { name: 'Cobrar' }), { after: 1600 })
      await rest(h)
    },
  },

  // the waitlist --------------------------------------------------------------------
  {
    id: 'calendar--waitlist-add',
    path: '/waitlist',
    ready: 'text=+ Añadir a la lista',
    async prepare(h) {
      const { admin } = await demo()
      await admin.from('waitlist_entries').delete().eq('patient_id', await patientId('julia'))
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('+ Añadir a la lista').first().waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: '+ Añadir a la lista' }), { after: 900 })
      const dialog = h.page.getByRole('dialog').last()
      await h.type(dialog.getByPlaceholder('Buscar por nombre…'), 'Julia Benl')
      await h.click(dialog.getByText(/Julia Benlloch/).first())
      await h.select(dialog.getByLabel('Tipo de cita'), { label: 'Ajuste quiropráctico' })
      await h.select(dialog.getByLabel('Profesional'), { label: 'Sara Molina' })
      await h.click(dialog.getByRole('button', { name: 'Añadir', exact: true }), { after: 1600 })
      await h.hover(h.page.getByText('Julia Benlloch').first())
    },
  },
  {
    id: 'calendar--waitlist-settings',
    path: '/waitlist',
    ready: 'text=Cuando se libera un hueco',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('accounts').update({ waitlist_auto_offer: false, waitlist_offer_mode: 'all_at_once' }).eq('id', accountId)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Cuando se libera un hueco').first().waitFor()
    },
    async run(h) {
      await h.click(h.page.getByText('Ofrecerlo a la lista de espera automáticamente').first())
      await h.pause(700)
      await h.click(h.page.getByText('Uno a uno, por orden').first())
      await h.click(h.page.getByRole('button', { name: 'Guardar', exact: true }), { after: 1500 })
      await rest(h)
    },
  },

  // recalls ---------------------------------------------------------------------------
  {
    id: 'calendar--recalls-work',
    path: '/recalls',
    ready: 'text=Por contactar',
    async prepare(h) {
      const { admin } = await demo()
      for (const key of ['mateo', 'carla']) {
        await admin.from('patients').update({ recall_snoozed_until: null, recall_dismissed_at: null, recall_status: 'active' }).eq('id', await patientId(key))
        await admin.from('contact_log').delete().eq('patient_id', await patientId(key)) // a previous take's call
      }
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Por contactar').first().waitFor()
    },
    async run(h) {
      await h.select(h.page.locator('[data-cy="recalls-weeks"]'), { label: 'Retraso: 4+ semanas' })
      await h.pause(1000)
      const row = h.page.locator('[data-cy="recall-row"]').filter({ hasText: 'Mateo Rius' }).first()
      await h.hover(row)
      await h.click(row.locator('[data-cy="recall-log"]'), { after: 800 })
      await h.click(row.locator('[data-cy="recall-log-no-answer"]'), { after: 1100 })
      await h.click(h.page.locator('[data-cy="recall-follow-up-2d"]'), { after: 1500 })
      await rest(h)
    },
  },
  {
    id: 'calendar--recalls-snooze',
    path: '/recalls',
    ready: 'text=Por contactar',
    async prepare(h) {
      const { admin } = await demo()
      for (const key of ['mateo', 'carla']) {
        await admin.from('patients').update({ recall_snoozed_until: null, recall_dismissed_at: null, recall_status: 'active' }).eq('id', await patientId(key))
        await admin.from('contact_log').delete().eq('patient_id', await patientId(key)) // a previous take's call
      }
      await admin.from('patients').update({ recall_snoozed_until: null, recall_status: 'dismissed', recall_dismissed_at: new Date(Date.now() - 20 * 86400000).toISOString() }).eq('id', await patientId('ainhoa'))
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Por contactar').first().waitFor()
    },
    async run(h) {
      const row = h.page.locator('[data-cy="recall-row"]').filter({ hasText: 'Carla Peiró' }).first()
      await h.hover(row)
      await h.click(row.locator('[data-cy="recall-more"]'), { after: 700 })
      await h.click(row.locator('[data-cy="recall-snooze"]'), { after: 900 })
      await h.click(h.page.locator('[data-cy="snooze-options"]').getByRole('radio', { name: /^1 mes/ }), { after: 900 })
      await h.click(h.page.getByRole('button', { name: /^Posponer hasta/ }), { after: 1400 })
      await h.click(h.page.locator('[data-cy="recalls-tab-dismissed"]'), { after: 1100 })
      const gone = h.page.locator('[data-cy="parked-row"]').filter({ hasText: 'Ainhoa Bru' }).first()
      await h.hover(gone)
      await h.click(gone.locator('[data-cy="parked-restore"]'), { after: 1500 })
      await h.click(h.page.locator('[data-cy="recalls-tab-queue"]'), { after: 1200 })
      await rest(h)
    },
  },

  // the dashboard -----------------------------------------------------------------------
  {
    id: 'calendar--dashboard-layout',
    path: '/dashboard',
    ready: 'text=Editar diseño',
    async prepare(h) {
      const { admin, sara } = await demo()
      await admin.from('team_members').update({ dashboard_layout: [] }).eq('id', sara.id)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Editar diseño').first().waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Editar diseño' }), { after: 900 })
      await h.click(h.page.getByRole('button', { name: '+ Planes de cuidados con retraso' }), { after: 1400 })
      await h.click(h.page.locator('button[title="Cambiar el ancho del widget"]').last(), { after: 1100 })
      await h.click(h.page.getByRole('button', { name: 'Hecho' }), { after: 1400 })
      await rest(h)
    },
  },

  // scheduling policies ---------------------------------------------------------------------
  {
    id: 'calendar--policies-fees',
    path: '/settings/reschedule-reasons',
    ready: 'text=Tarifas',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('accounts').update({ scheduling_policy_fee_cents: null }).eq('id', accountId)
      await admin.from('reschedule_reasons').delete().eq('account_id', accountId).eq('name', 'Llega tarde del trabajo')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Tarifas').first().waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('switch').nth(2))
      await h.pause(500)
      await h.type(h.page.getByLabel(/Tarifa de reprogramación/), '10')
      await h.click(h.page.getByRole('button', { name: 'Guardar tarifas' }), { after: 1200 })
      await h.type(h.page.getByPlaceholder('Añade un motivo, ej. Profesional de baja'), 'Llega tarde del trabajo')
      await h.click(h.page.getByRole('button', { name: 'Añadir', exact: true }), { after: 1400 })
      await rest(h)
    },
  },

  // Mi día ---------------------------------------------------------------------------------
  {
    id: 'myday--chart-and-sign',
    path: '/practitioner',
    ready: 'text=Mi Día',
    async prepare(h) {
      const { admin, ines } = await demo()
      const id = await resetToday('jorge')
      await admin.from('visit_notes').delete().eq('appointment_id', id)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('select').first().selectOption(ines.id)
      await h.page.waitForTimeout(1500)
    },
    async run(h) {
      await h.click(h.page.getByText('Jorge Albert Ruiz').first(), { after: 1500 })
      const note = h.page.locator('textarea, [contenteditable="true"]').first()
      await note.evaluate((el) => el.scrollIntoView({ block: 'center' }))
      await h.pause(400)
      await h.type(note, 'Mejor movilidad lumbar. Sin dolor al flexionar.', { delay: 35 })
      await h.click(h.page.locator('[data-cy="myday-sign"]'), { after: 600 })
      await h.page.getByText('Completada').first().waitFor({ timeout: 20000 })
      await h.pause(1400)
      await rest(h)
    },
  },
  {
    id: 'myday--needs-confirming',
    path: '/practitioner',
    ready: 'text=Mi Día',
    async prepare(h) {
      const { ines } = await demo()
      await resetToday('pau')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('select').first().selectOption(ines.id)
      await h.page.waitForTimeout(1500)
      await h.page.locator('[data-cy="needs-confirming"]').scrollIntoViewIfNeeded()
    },
    async run(h) {
      const card = h.page.locator('[data-cy="needs-confirming"]')
      await h.hover(card.locator('[data-cy="needs-confirming-count"]'))
      await h.pause(700)
      const row = card.locator('[data-cy="needs-confirming-row"]').filter({ hasText: 'Pau' }).first()
      await h.hover(row)
      await h.pause(500)
      await h.click(row.locator('[data-cy="needs-confirming-confirm"]'), { after: 1500 })
      await rest(h)
    },
  },

  // Registro de jornada ------------------------------------------------------------------------
  {
    id: 'jornada--clock-in',
    path: '/jornada?tab=mine',
    ready: 'text=Registro de jornada',
    async prepare(h) {
      const { admin, sara } = await demo()
      await admin.from('time_entries').delete().eq('team_member_id', sara.id).eq('work_date', madridToday())
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="clock-in"]').waitFor()
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="clock-in"]'), { after: 1500 })
      await h.click(h.page.locator('[data-cy="clock-break"]'), { after: 1500 })
      await h.click(h.page.locator('[data-cy="clock-back"]'), { after: 1500 })
      await h.hover(h.page.locator('[data-cy="clock-card"]'))
    },
  },
  {
    id: 'jornada--correction',
    path: '/jornada?tab=mine',
    ready: 'text=Registro de jornada',
    async prepare(h) {
      const { admin, sara } = await demo()
      await admin.from('time_corrections').delete().eq('team_member_id', sara.id)
      // Today's clock-in (from the clock-in clip) would be the first day listed, and "now" is no time to correct.
      await admin.from('time_entries').delete().eq('team_member_id', sara.id).eq('work_date', madridToday())
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="my-month"]').scrollIntoViewIfNeeded()
    },
    async run(h) {
      // The most recent working day: clocked in, never out.
      await h.click(h.page.locator('[data-cy="my-month-day"]').first(), { after: 900 })
      const form = h.page.locator('[data-cy="correction-form"]')
      await h.select(form.locator('[data-cy="correction-target"]'), 'add:out')
      await h.type(form.locator('[data-cy="correction-time"]'), '2000')
      await h.type(form.locator('[data-cy="correction-reason"]'), 'Olvidé fichar la salida')
      await h.click(form.locator('[data-cy="correction-send"]'), { after: 1600 })
      await h.hover(h.page.locator('[data-cy="correction-sent"]').or(h.page.locator('[data-cy="my-correction"]')).first())
    },
  },
  {
    id: 'jornada--approve-correction',
    path: '/jornada',
    ready: 'text=Registro de jornada',
    async prepare(h) {
      const { admin, alex } = await demo()
      const { data } = await admin.from('time_corrections').select('id').eq('team_member_id', alex.id)
      for (const c of data ?? []) {
        await admin.from('time_entries').update({ superseded_by: null }).eq('superseded_by', c.id)
        await admin.from('time_entries').delete().eq('correction_id', c.id)
        await admin.from('time_corrections').update({ status: 'pending', decided_by: null, decided_at: null }).eq('id', c.id)
      }
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="pending-corrections"]').waitFor()
    },
    async run(h) {
      await h.hover(h.page.locator('[data-cy="pending-correction"]').first())
      await h.pause(900)
      await h.click(h.page.locator('[data-cy="approve-correction"]').first(), { after: 1300 })
      await h.click(h.page.locator('[data-cy="team-month-row"]').filter({ hasText: 'Álex' }).first(), { after: 1400 })
      await h.hover(h.page.locator('[data-cy="team-month-detail"]'))
    },
  },
  {
    id: 'jornada--approve-leave',
    path: '/jornada?tab=shifts',
    ready: 'text=Registro de jornada',
    async prepare(h) {
      const { admin, alex } = await demo()
      const { data } = await admin.from('staff_absences').select('id, block_ids').eq('team_member_id', alex.id).eq('note', CAL.leaveNote)
      for (const a of data ?? []) {
        if (a.block_ids?.length) await admin.from('availability_blocks').delete().in('id', a.block_ids)
        await admin.from('staff_absences').update({ status: 'pending', decided_by: null, decided_at: null, block_ids: [] }).eq('id', a.id)
      }
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="leave-pending"]').scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.hover(h.page.locator('[data-cy="leave-pending-row"]').first())
      await h.pause(900)
      await h.click(h.page.locator('[data-cy="leave-approve"]').first(), { after: 1500 })
      await h.hover(h.page.locator('[data-cy="leave-visits"]'))
      await h.pause(700)
      await h.click(h.page.locator('[data-cy="leave-visits-move"]'), { after: 1500 })
      await h.hover(h.page.locator('[data-cy="absence"]'))
    },
  },

  // check-in ----------------------------------------------------------------------------------
  {
    id: 'checkin--enable-portal',
    path: '/settings/clinics',
    ready: 'text=Clínica Demo',
    async prepare(h) {
      const { admin, clinicId } = await demo()
      await admin.from('check_in_portals').delete().eq('clinic_id', clinicId)
      await h.page.goto(new URL(`/settings/clinics/${clinicId}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="clinic-check-in-portal"]').scrollIntoViewIfNeeded()
      await h.page.waitForTimeout(500)
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="clinic-check-in-portal-on"]'), { after: 1500 })
      await h.click(h.page.locator('[data-cy="clinic-check-in-portal-identify-birth_date"]'))
      await h.click(h.page.locator('[data-cy="clinic-check-in-portal-save"]'), { after: 1200 })
      await h.click(h.page.locator('[data-cy="clinic-check-in-portal-copy"]'), { after: 1200 })
      await h.hover(h.page.locator('[data-cy="clinic-check-in-portal-url"]'))
    },
  },
  {
    id: 'checkin--kiosk',
    path: `/check-in/${CAL.portalToken}`,
    as: 'anon',
    async prepare(h) {
      const { admin, accountId, clinicId } = await demo()
      await admin.from('check_in_portals').delete().eq('clinic_id', clinicId)
      await admin.from('check_in_portals').insert({ clinic_id: clinicId, account_id: accountId, token: CAL.portalToken, identify_by: 'birth_date', language: 'es' })
      // The tablet finds visits from 90 minutes before them, by the server's real clock.
      const start = new Date(Math.ceil((Date.now() + 25 * 60000) / (15 * 60000)) * 15 * 60000)
      await resetToday('nerea', { starts_at: start.toISOString(), ends_at: new Date(start.getTime() + 30 * 60000).toISOString() })
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="check-in-portal-welcome"]').waitFor()
    },
    async run(h) {
      for (const k of '070385') await h.click(h.page.locator(`[data-cy="check-in-portal-key-${k}"]`), { after: 260 })
      await h.pause(1800)
      await h.hover(h.page.locator('[data-cy="check-in-portal-done-text"]').or(h.page.locator('[data-cy="check-in-portal-done"]')).first())
    },
    hold: 2200,
  },
  {
    id: 'checkin--print-sign',
    path: '/settings/app',
    ready: 'text=Imprimir cartel de llegada',
    async prepare(h) {
      await h.page.context().addInitScript(() => { window.print = () => {} })
      await h.page.locator('[data-cy="app-check-in-sign"]').evaluate((a) => a.removeAttribute('target'))
      await h.page.locator('[data-cy="app-check-in-sign"]').scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="app-check-in-sign"]'), { after: 2200 })
      await h.hover(h.page.locator('[data-cy="check-in-sign-qr"]'))
    },
  },
]
