// Shared by seed/calendar.mjs and clips/calendar-appointments.mjs: the demo
// data the calendar clips rely on, and the small DB helpers their prepare()
// steps use to put that data back before each take. Lives in a sub-folder so
// record.mjs (which loads every clips/*.mjs) does not take it for a clip file.
import { createClient } from '@supabase/supabase-js'

export const CLINIC_TZ = 'Europe/Madrid'

function zoneOffset(day) {
  const probe = new Date(`${day}T12:00:00Z`)
  const name = new Intl.DateTimeFormat('en-US', { timeZone: CLINIC_TZ, timeZoneName: 'longOffset' }).formatToParts(probe).find((p) => p.type === 'timeZoneName').value
  return name.replace('GMT', '') || '+00:00'
}
/** Madrid wall-clock time on a day -> Date. */
export const at = (day, hm) => new Date(`${day}T${hm}:00${zoneOffset(day)}`)
export const madridToday = () => new Intl.DateTimeFormat('en-CA', { timeZone: CLINIC_TZ }).format(new Date())
export function addDays(day, n) {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10)
}
export const weekday = (day) => new Date(`${day}T12:00:00Z`).getUTCDay()

export const CAL = {
  classType: 'Pilates suelo',
  portalToken: 'c11a1c0de0e0a4b1d3f7a9c2e5b81f60', // the app only accepts 32-64 hex characters
  leaveNote: 'Semana de vacaciones con la familia',
  blockNotes: ['Formación', 'Ausencia imprevista · Inés Ramos'],
  newPatient: { first: 'Noa', last: 'Grau Esteve' },
  patients: [
    { key: 'teresa', first: 'Teresa', last: 'Llopis Marco' },
    { key: 'eva', first: 'Eva', last: 'Cortina Sanz' },
    { key: 'jorge', first: 'Jorge', last: 'Albert Ruiz' },
    { key: 'ruben', first: 'Rubén', last: 'Peris Mas' },
    { key: 'marina', first: 'Marina', last: 'Soler Gil' },
    { key: 'pau', first: 'Pau', last: 'Ferrer Climent' },
    { key: 'nerea', first: 'Nerea', last: 'Vidal Blasco', dob: '1985-03-07' },
    { key: 'laia', first: 'Laia', last: 'Montesinos Gil' },
    { key: 'iker', first: 'Iker', last: 'Sanchis Roig' },
    { key: 'lidia', first: 'Lidia', last: 'Escrivá Mora' },
    { key: 'oliver', first: 'Óliver', last: 'Gascó Pla' },
    { key: 'alicia', first: 'Alicia', last: 'Ventura Sáez' },
    { key: 'julia', first: 'Julia', last: 'Benlloch Ruiz' },
    { key: 'rosa', first: 'Rosa', last: 'Climent Vidal' },
    { key: 'gema', first: 'Gema', last: 'Alcañiz Puig' },
    { key: 'vera', first: 'Vera', last: 'Tormo Gil' },
    { key: 'mateo', first: 'Mateo', last: 'Rius Ortega' },
    { key: 'carla', first: 'Carla', last: 'Peiró Sanz' },
    { key: 'dani', first: 'Daniel', last: 'Roca Pons' },
    { key: 'sofia', first: 'Sofía', last: 'Mas Ribes' },
    { key: 'ainhoa', first: 'Ainhoa', last: 'Bru Llorca', dismissed: true },
  ],
  // Inés's day today. `state` is what each clip's prepare() restores.
  today: [
    { key: 'teresa', at: '09:45', type: 'Revisión', state: 'confirmed' },
    { key: 'eva', at: '10:15', type: 'Revisión', state: 'confirmed' },
    { key: 'jorge', at: '10:45', type: 'Revisión', state: 'arrived', arrivedAt: '10:12' },
    { key: 'ruben', at: '11:15', type: 'Osteopatía', state: 'arrived', arrivedAt: '10:14' },
    { key: 'marina', at: '12:00', type: 'Revisión', state: 'arrived', arrivedAt: '10:16' },
    { key: 'pau', at: '12:30', type: 'Osteopatía', state: 'pending' },
    { key: 'nerea', at: '13:15', type: 'Revisión', state: 'confirmed' },
    { key: 'iker', at: '16:30', type: 'Osteopatía', state: 'confirmed' },
    { key: 'laia', at: '17:15', type: 'Osteopatía', state: 'confirmed' },
    { key: 'lidia', at: '18:00', type: 'Revisión', state: 'confirmed' },
  ],
}

/** The columns that put a visit in a given stage. */
export function stageColumns(state, day, arrivedAt) {
  const base = { status: 'booked', checked_in_at: null, flow_with_practitioner_at: null, flow_checkout_at: null, deleted_at: null, rescheduled: false }
  if (state === 'pending') return { ...base, confirmation_status: 'pending', confirmation_sent_at: at(addDays(day, -1), '18:00').toISOString() }
  if (state === 'arrived') return { ...base, confirmation_status: 'confirmed', checked_in_at: at(day, arrivedAt).toISOString() }
  return { ...base, confirmation_status: 'confirmed' }
}

const URL = process.env.SUPABASE_URL || 'http://127.0.0.1:54921'
const KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
let cached
/** Service-role client plus the demo clinic's ids (local only). */
export async function demo() {
  if (cached) return cached
  if (!/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/.test(URL)) throw new Error('local Supabase only')
  const admin = createClient(URL, KEY, { auth: { autoRefreshToken: false, persistSession: false } })
  const { data: users } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const owner = users.users.find((u) => u.email === 'demo@clinica-demo.test')
  const { data: tm } = await admin.from('team_members').select('account_id').eq('user_id', owner.id).single()
  const accountId = tm.account_id
  const { data: clinics } = await admin.from('clinics').select('id').eq('account_id', accountId).order('created_at')
  const { data: team } = await admin.from('team_members').select('id, full_name').eq('account_id', accountId)
  const member = (n) => team.find((m) => m.full_name === n)
  cached = { admin, accountId, clinicId: clinics[0].id, sara: member('Sara Molina'), alex: member('Álex Prieto'), ines: member('Inés Ramos') }
  return cached
}

export async function patientId(key) {
  const { admin, accountId } = await demo()
  const p = CAL.patients.find((x) => x.key === key)
  const { data } = await admin.from('patients').select('id').eq('account_id', accountId).eq('first_name', p.first).eq('last_name', p.last).limit(1)
  if (!data?.length) throw new Error(`Run node scripts/record/seed.mjs calendar first (no ${p.first})`)
  return data[0].id
}

/** Puts today's visit for `key` back at its seeded time and stage, and forgets any moves. */
export async function resetToday(key, overrides = {}) {
  const { admin } = await demo()
  const v = CAL.today.find((x) => x.key === key)
  const day = madridToday()
  const pid = await patientId(key)
  const { data } = await admin.from('appointments').select('id, starts_at, ends_at').eq('patient_id', pid).gte('starts_at', at(day, '00:00').toISOString()).lt('starts_at', at(addDays(day, 21), '23:59').toISOString()).is('class_session_id', null).order('created_at').limit(1)
  if (!data?.length) throw new Error(`no visit for ${key}`)
  const a = data[0]
  const minutes = (new Date(a.ends_at) - new Date(a.starts_at)) / 60000
  const start = at(day, v.at)
  const { ines } = await demo()
  await admin.from('appointment_reschedules').delete().eq('appointment_id', a.id)
  const { error } = await admin
    .from('appointments')
    .update({ starts_at: start.toISOString(), ends_at: new Date(start.getTime() + minutes * 60000).toISOString(), practitioner_id: ines.id, practitioner_name: ines.full_name, ...stageColumns(v.state, day, v.arrivedAt), ...overrides })
    .eq('id', a.id)
  if (error) throw new Error(`reset ${key}: ${error.message}`)
  return a.id
}
