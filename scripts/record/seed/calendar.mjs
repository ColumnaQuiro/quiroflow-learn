// Extras for the calendar & scheduling clips (clips/calendar-appointments.mjs).
// Everything here is invented and safe to run again: patients are found by
// name before being created, and the visits this file owns are deleted and
// written again each run.
//
// Inés Ramos does not work on Tuesdays or Thursdays in the demo week, so her
// column is where the clips' own visits live: one per clip, each in a known
// stage, so a clip's prepare() can put "its" visit back the way it found it.
import { CLINIC_TZ, at, madridToday, addDays, weekday, CAL, stageColumns } from '../clips/calendar/shared.mjs'

async function findOrCreatePatient(ctx, p) {
  const { admin, accountId, clinicId } = ctx
  const { data: found } = await admin.from('patients').select('id').eq('account_id', accountId).eq('first_name', p.first).eq('last_name', p.last).limit(1)
  if (found?.length) {
    await admin.from('patients').update({ date_of_birth: p.dob ?? null, recall_snoozed_until: null, recall_status: p.dismissed ? 'dismissed' : 'active', recall_dismissed_at: p.dismissed ? new Date(Date.now() - 20 * 86400000).toISOString() : null }).eq('id', found[0].id)
    return found[0].id
  }
  const { data, error } = await admin
    .from('patients')
    .insert({ account_id: accountId, clinic_id: clinicId, first_name: p.first, last_name: p.last, date_of_birth: p.dob ?? null, preferred_language: 'es', confirmation_channel: 'whatsapp', reminder_channel: 'whatsapp', default_practitioner_id: p.practitionerId ?? null, recall_status: p.dismissed ? 'dismissed' : 'active', recall_dismissed_at: p.dismissed ? new Date(Date.now() - 20 * 86400000).toISOString() : null })
    .select('id')
    .single()
  if (error) throw new Error(`patient ${p.first}: ${error.message}`)
  await admin.from('patient_contact_numbers').insert({ account_id: accountId, patient_id: data.id, number: p.phone, country_code: 'ES', is_whatsapp: true })
  return data.id
}

export default async function seedCalendar(ctx) {
  const { admin, accountId, clinicId } = ctx
  const member = (name) => ctx.team.find((m) => m.full_name === name)
  const sara = member('Sara Molina')
  const alex = member('Álex Prieto')
  const ines = member('Inés Ramos')
  if (!sara || !alex || !ines) throw new Error('Demo practitioners not found')
  const { data: rooms } = await admin.from('calendar_resources').select('id, name').eq('account_id', accountId)
  const room = (n) => rooms.find((r) => r.name === n)?.id ?? null
  const { data: types } = await admin.from('appointment_types').select('id, name, duration_minutes').eq('account_id', accountId)
  const type = (n) => types.find((t) => t.name === n)

  // --- settings: fees, reschedule reasons, waitlist offers ------------------
  await admin.from('accounts').update({ cancellation_fee_cents: 1500, missed_appointment_fee_cents: 2000, waitlist_auto_offer: true, waitlist_offer_mode: 'one_by_one' }).eq('id', accountId)
  for (const name of ['Petición del paciente', 'Profesional de baja', 'Coincide con el trabajo']) {
    const { data } = await admin.from('reschedule_reasons').select('id').eq('account_id', accountId).eq('name', name)
    if (!data?.length) await admin.from('reschedule_reasons').insert({ account_id: accountId, name })
  }

  // --- a class type ---------------------------------------------------------
  let pilates = type(CAL.classType)
  if (!pilates) {
    const { data, error } = await admin.from('appointment_types').insert({ account_id: accountId, name: CAL.classType, duration_minutes: 45, default_price_cents: 1500, color: '#22c55e', class_capacity: 8, sort_order: 20, online_booking_enabled: true }).select('id, name, duration_minutes').single()
    if (error) throw new Error(`class type: ${error.message}`)
    pilates = data
    types.push(data)
  }

  // --- the clips' patients --------------------------------------------------
  const ids = {}
  for (const [i, p] of CAL.patients.entries()) {
    ids[p.key] = await findOrCreatePatient(ctx, { ...p, phone: `+34 611 200 ${String(300 + i).padStart(3, '0')}`, practitionerId: ines.id })
  }
  const allMine = Object.values(ids)

  // Start clean: every visit, class, block and waitlist entry this file owns.
  await admin.from('appointments').delete().in('patient_id', allMine)
  await admin.from('waitlist_entries').delete().in('patient_id', allMine)
  await admin.from('class_sessions').delete().eq('appointment_type_id', pilates.id)
  await admin.from('availability_blocks').delete().eq('account_id', accountId).in('note', CAL.blockNotes)

  const today = madridToday()
  // The demo clinic books Inés on some weekdays and not others, so which day
  // "today" is decides whether her column is empty. The clips need it empty
  // (a booking, block or move must never clash with a stranger's visit), so
  // clear the demo clinic's own visits from her column, today and for three
  // weeks ahead. Only Inés's; Sara's and Álex's days are left alone.
  {
    const { error: clearErr } = await admin
      .from('appointments')
      .delete()
      .eq('account_id', accountId)
      .eq('practitioner_id', ines.id)
      .is('class_session_id', null)
      .not('patient_id', 'in', `(${allMine.join(',')})`)
      .gte('starts_at', at(today, '00:00').toISOString())
      .lt('starts_at', at(addDays(today, 21), '23:59').toISOString())
    if (clearErr) throw new Error(`clearing Inés's column: ${clearErr.message}`)
  }
  const thursday =addDays(today, (4 - weekday(today) + 7) % 7 || 7)
  const visit = (key, day, hm, typeName, extra = {}, who = ines) => {
    const t = type(typeName)
    const start = at(day, hm)
    return {
      account_id: accountId,
      clinic_id: clinicId,
      patient_id: ids[key],
      practitioner_id: who.id,
      practitioner_name: who.full_name,
      appointment_type_id: t.id,
      room_id: who === ines ? room('Sala 3') : who === alex ? room('Sala 2') : room('Sala 1'),
      starts_at: start.toISOString(),
      ends_at: new Date(start.getTime() + t.duration_minutes * 60000).toISOString(),
      status: 'booked',
      confirmation_status: 'confirmed',
      source: 'staff',
      checked_in_at: null, flow_with_practitioner_at: null, flow_checkout_at: null, deleted_at: null, rescheduled: false, confirmation_sent_at: null,
      ...extra,
    }
  }
  const iso = (day, hm) => at(day, hm).toISOString()
  const rows = []
  // Today, Inés, one visit per clip (see CAL.today in calendar-shared.mjs).
  for (const v of CAL.today) rows.push(visit(v.key, today, v.at, v.type, stageColumns(v.state, today, v.arrivedAt)))
  // History, so the patients look real and Jorge's care plan has visits done.
  for (const [key, weeksAgo] of [['jorge', 5], ['jorge', 4], ['jorge', 3], ['julia', 4], ['teresa', 6], ['eva', 3], ['pau', 7], ['laia', 5], ['iker', 4], ['lidia', 6]]) {
    rows.push(visit(key, addDays(today, -7 * weeksAgo), '10:00', 'Osteopatía', { status: 'completed', confirmation_status: null, checked_in_at: iso(addDays(today, -7 * weeksAgo), '09:56') }))
  }
  // Lapsed patients for Recalls: seen weeks ago, nothing booked since.
  for (const [key, weeksAgo] of [['mateo', 6], ['carla', 9], ['ainhoa', 12]]) {
    rows.push(visit(key, addDays(today, -7 * weeksAgo), '17:00', 'Osteopatía', { status: 'completed', confirmation_status: null }))
  }
  // Unplanned absence: Inés on Thursday. Two visits at times Álex is free, one when he is not.
  const { data: alexThu } = await admin.from('appointments').select('starts_at, ends_at').eq('practitioner_id', alex.id).neq('status', 'cancelled').gte('starts_at', iso(thursday, '00:00')).lt('starts_at', iso(thursday, '23:59'))
  const alexFree = (hm) => {
    const s = at(thursday, hm).getTime()
    const e = s + 45 * 60000
    return !(alexThu ?? []).some((a) => new Date(a.starts_at).getTime() < e && new Date(a.ends_at).getTime() > s)
  }
  const slots = []
  for (let h = 9; h < 14; h++) for (const m of ['00', '15', '30', '45']) slots.push(`${String(h).padStart(2, '0')}:${m}`)
  const fits = (hm) => at(thursday, hm).getTime() + 45 * 60000 <= at(thursday, '14:00').getTime()
  const picked = []
  const clashFree = (hm) => picked.every((p) => Math.abs(at(thursday, p).getTime() - at(thursday, hm).getTime()) >= 45 * 60000)
  for (const hm of slots) if (picked.length < 2 && fits(hm) && alexFree(hm) && clashFree(hm)) picked.push(hm)
  const busy = slots.find((hm) => fits(hm) && !alexFree(hm) && clashFree(hm)) ?? '12:00'
  picked.push(busy)
  for (const [n, hm] of picked.entries()) rows.push(visit(['teresa', 'pau', 'iker'][n], thursday, hm, 'Osteopatía', { confirmation_status: 'pending' }))
  // Two of Álex's visits inside the leave he has asked for, two Mondays from now.
  const leaveDay = addDays(today, ((1 - weekday(today) + 7) % 7 || 7) + 7)
  rows.push(visit('dani', leaveDay, '10:00', 'Fisioterapia', {}, alex))
  rows.push(visit('sofia', leaveDay, '11:00', 'Fisioterapia', {}, alex))
  const { error: apptErr } = await admin.from('appointments').insert(rows)
  if (apptErr) throw new Error(`appointments: ${apptErr.message}`)

  // Jorge's care plan: 10 visits, 3 done, weekly.
  await admin.from('care_plans').delete().eq('patient_id', ids.jorge)
  await admin.from('care_plans').insert({ account_id: accountId, patient_id: ids.jorge, name: 'Plan de espalda', total_visits: 10, frequency_value: 1, frequency_unit: 'week', started_at: addDays(today, -36) })

  // Waitlist: one for Inés's Osteopatía (gets the cancel clip's slot), one for anything.
  await admin.from('waitlist_entries').insert([
    { account_id: accountId, clinic_id: clinicId, patient_id: ids.oliver, appointment_type_id: type('Osteopatía').id, practitioner_id: ines.id, created_at: iso(addDays(today, -6), '12:00') },
    { account_id: accountId, clinic_id: clinicId, patient_id: ids.alicia, appointment_type_id: null, practitioner_id: null, created_at: iso(addDays(today, -3), '17:30') },
  ])

  // A class this morning with two places taken, for the attendance clip.
  const { data: cls, error: clsErr } = await admin.from('class_sessions').insert({ account_id: accountId, clinic_id: clinicId, appointment_type_id: pilates.id, practitioner_id: ines.id, room_id: room('Sala 3'), starts_at: iso(today, '09:00'), ends_at: iso(today, '09:45'), capacity: 8 }).select('id').single()
  if (clsErr) throw new Error(`class: ${clsErr.message}`)
  for (const key of ['rosa', 'gema']) {
    const { error } = await admin.from('appointments').insert({ ...visit(key, today, '09:00', CAL.classType), class_session_id: cls.id })
    if (error) throw new Error(`class place: ${error.message}`)
  }

  // Check-in portal: on, by date of birth, with a fixed token the kiosk clip opens.
  await admin.from('check_in_portals').upsert({ clinic_id: clinicId, account_id: accountId, token: CAL.portalToken, identify_by: 'birth_date', language: 'es', welcome_message: null, success_message: null, not_found_message: null }, { onConflict: 'clinic_id' })

  // Working time: Sara's and Álex's last working days, one of Sara's without a clock-out,
  // a correction from Álex waiting, and a holiday request from him.
  await admin.from('time_entries').delete().in('team_member_id', [sara.id, alex.id])
  await admin.from('time_corrections').delete().in('team_member_id', [sara.id, alex.id])
  const entries = []
  let day = today
  const workDays = []
  while (workDays.length < 6) {
    day = addDays(day, -1)
    if (weekday(day) !== 0 && weekday(day) !== 6) workDays.push(day)
  }
  for (const [n, d] of workDays.entries()) {
    for (const who of [sara, alex]) {
      const missingOut = n === 0 // yesterday-ish: nobody clocked out
      entries.push({ account_id: accountId, team_member_id: who.id, work_date: d, kind: 'in', at: iso(d, who === sara ? '08:57' : '09:04') })
      entries.push({ account_id: accountId, team_member_id: who.id, work_date: d, kind: 'break_start', at: iso(d, '14:02') })
      entries.push({ account_id: accountId, team_member_id: who.id, work_date: d, kind: 'break_end', at: iso(d, '15:58') })
      if (!missingOut) entries.push({ account_id: accountId, team_member_id: who.id, work_date: d, kind: 'out', at: iso(d, who === sara ? '20:03' : '19:58') })
    }
  }
  const { error: teErr } = await admin.from('time_entries').insert(entries)
  if (teErr) throw new Error(`time_entries: ${teErr.message}`)
  const { error: tcErr } = await admin.from('time_corrections').insert({ account_id: accountId, team_member_id: alex.id, work_date: workDays[0], kind: 'out', at: iso(workDays[0], '20:00'), reason: 'Olvidé fichar la salida', status: 'pending', requested_at: iso(today, '08:40') })
  if (tcErr) throw new Error(`time_corrections: ${tcErr.message}`)
  await admin.from('staff_absences').delete().eq('team_member_id', alex.id).eq('note', CAL.leaveNote)
  const { error: absErr } = await admin.from('staff_absences').insert({ account_id: accountId, team_member_id: alex.id, kind: 'vacation', starts_on: leaveDay, ends_on: addDays(leaveDay, 1), note: CAL.leaveNote, status: 'pending', requested_at: iso(addDays(today, -2), '13:10') })
  if (absErr) throw new Error(`staff_absences: ${absErr.message}`)
  // Dashboard: everyone starts from the default layout.
  await admin.from('team_members').update({ dashboard_layout: [] }).eq('id', sara.id)
  console.log(`  calendar: ${rows.length + 2} visits, Thursday ${thursday} at ${picked.join(', ')}, leave ${leaveDay}`)
}

export { CLINIC_TZ }
