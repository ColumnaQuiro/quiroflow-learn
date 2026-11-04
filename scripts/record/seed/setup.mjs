// Setup, team, settings and security clips (clips/setup.mjs).
//
// These clips add clinics, invite people, deactivate them, change roles and
// switch two-factor on -- changes that would leak into every other writer's
// clips if they were made in the shared demo practice. So they get a practice
// of their own: a second, equally fictional "Clínica Demo" with one location,
// "Valencia", and a small invented team:
//
//   Alba Esteve   owner, sees patients            alba@equipo-demo.test
//   Jordi Mas     owner, two-factor enrolled      jordi@equipo-demo.test
//   Marc Soler    practitioner                    marc@equipo-demo.test
//   Nuria Vidal   practitioner                    nuria@equipo-demo.test
//   Lucía Pérez   front desk                      lucia@equipo-demo.test
//   Elena Ruiz    front desk (password-reset clip) elena@equipo-demo.test
//
// Every password is the local seed value below. Jordi's TOTP secret is
// written to .frames/setup-state.json (gitignored) so the clips can compute
// his code; if that file is lost the factor is replaced on the next run.
//
// Safe to re-run: everything is looked up before it is created, and the rows
// clips change (Sala 2, Nuria's future visits, the 2FA requirement...) are put
// back the way the clips expect to find them.
import { createHmac, randomBytes } from 'node:crypto'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { createClient } from '@supabase/supabase-js'
import ffmpegPath from 'ffmpeg-static'

const here = dirname(fileURLToPath(import.meta.url))
export const SUPABASE_URL = process.env.SUPABASE_URL || 'http://127.0.0.1:54921'
// The Supabase CLI's fixed local keys -- public, and useless anywhere else.
export const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
export const ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
if (!/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/.test(SUPABASE_URL)) throw new Error('Local Supabase only')

export const PASSWORD = 'Demo1234!'
export const DOMAIN = 'equipo-demo.test'
export const PEOPLE = {
  alba: { email: `alba@${DOMAIN}`, name: 'Alba Esteve', role: 'Owner', owner: true, practitioner: true, color: '#4f46e5' },
  jordi: { email: `jordi@${DOMAIN}`, name: 'Jordi Mas', role: 'Owner', owner: true, practitioner: false, color: '#64748b' },
  marc: { email: `marc@${DOMAIN}`, name: 'Marc Soler', role: 'Practitioner', owner: false, practitioner: true, color: '#14b8a6' },
  nuria: { email: `nuria@${DOMAIN}`, name: 'Nuria Vidal', role: 'Practitioner', owner: false, practitioner: true, color: '#ec4899' },
  lucia: { email: `lucia@${DOMAIN}`, name: 'Lucía Pérez', role: 'Front Desk', owner: false, practitioner: false, color: '#f59e0b' },
  elena: { email: `elena@${DOMAIN}`, name: 'Elena Ruiz', role: 'Front Desk', owner: false, practitioner: false, color: '#0ea5e9' },
}
// A second, brand-new practice for the first-steps clips: just signed up, nothing in it.
export const NEWCOMER = { email: `nueva@${DOMAIN}`, name: 'Carmen Ferrer' }
const STATE_FILE = join(here, '..', '.frames', 'setup-state.json')
const HOURS = { mon: [['09:00', '14:00'], ['16:00', '20:00']], tue: [['09:00', '14:00'], ['16:00', '20:00']], wed: [['09:00', '14:00'], ['16:00', '20:00']], thu: [['09:00', '14:00'], ['16:00', '20:00']], fri: [['09:00', '14:00']] }

export function adminClient() {
  return createClient(SUPABASE_URL, SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } })
}
export function userClient() {
  return createClient(SUPABASE_URL, ANON_KEY, { auth: { autoRefreshToken: false, persistSession: false } })
}

// --- TOTP (RFC 6238: SHA-1, 30 s, 6 digits) ----------------------------------
function base32Decode(s) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let bits = ''
  for (const ch of s.replace(/=+$/, '').toUpperCase().replace(/\s/g, '')) bits += alphabet.indexOf(ch).toString(2).padStart(5, '0')
  const bytes = []
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2))
  return Buffer.from(bytes)
}
export function totp(secret, at = Date.now()) {
  const counter = Buffer.alloc(8)
  counter.writeBigUInt64BE(BigInt(Math.floor(at / 1000 / 30)))
  const h = createHmac('sha1', base32Decode(secret)).update(counter).digest()
  const o = h[h.length - 1] & 0xf
  return String(((h.readUInt32BE(o) & 0x7fffffff) % 1_000_000)).padStart(6, '0')
}
/** A code with at least `margin` ms of life left, so it is still valid once typed. */
export async function freshTotp(secret, margin = 8000) {
  const left = 30000 - (Date.now() % 30000)
  if (left < margin) await new Promise((r) => setTimeout(r, left + 300))
  return totp(secret)
}
export async function readState() {
  try {
    return JSON.parse(await readFile(STATE_FILE, 'utf8'))
  } catch {
    return {}
  }
}

// --- helpers -----------------------------------------------------------------
function ok(r, what) {
  if (r.error) throw new Error(`${what}: ${r.error.message}`)
  return r.data
}
async function findUser(admin, email) {
  for (let page = 1; page < 20; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 })
    if (error) throw error
    const u = data.users.find((x) => x.email === email)
    if (u) return u
    if (data.users.length < 200) return null
  }
  return null
}
async function ensureUser(admin, email) {
  const found = await findUser(admin, email)
  if (found) {
    await admin.auth.admin.updateUserById(found.id, { password: PASSWORD })
    return found
  }
  const { data, error } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true })
  if (error) throw error
  return data.user
}
function dayAt(base, addDays, hhmm) {
  // Madrid wall clock -> ISO. Good enough for a demo: use the offset of that day.
  const d = new Date(base)
  d.setUTCDate(d.getUTCDate() + addDays)
  const day = d.toISOString().slice(0, 10)
  const offset = new Intl.DateTimeFormat('en', { timeZone: 'Europe/Madrid', timeZoneName: 'longOffset' })
    .formatToParts(new Date(`${day}T12:00:00Z`)).find((p) => p.type === 'timeZoneName').value.replace('GMT', '') || '+00:00'
  return new Date(`${day}T${hhmm}:00${offset}`)
}
function nextMonday(from = new Date()) {
  const d = new Date(from)
  const dow = d.getUTCDay() // 0 Sun
  d.setUTCDate(d.getUTCDate() + ((8 - dow) % 7 || 7))
  return d
}

/** The setup practice's ids, for clips. */
export async function setupContext(admin = adminClient()) {
  const accountId = (await readState()).accountId
  if (!accountId) throw new Error('Run node scripts/record/seed.mjs setup first')
  const clinics = ok(await admin.from('clinics').select('id, name, archived_at').eq('account_id', accountId).order('created_at'), 'clinics')
  const team = ok(await admin.from('team_members').select('id, full_name, user_id, is_owner, is_practitioner, deleted_at').eq('account_id', accountId), 'team')
  const roles = ok(await admin.from('account_roles').select('id, name').eq('account_id', accountId), 'roles')
  const member = (key) => team.find((m) => m.full_name === PEOPLE[key].name)
  return { admin, accountId, clinicId: clinics[0].id, clinics, team, roles, member }
}

/** Nuria back on the team with three visits ahead, as the deactivate clip expects. */
export async function resetNuria(admin = adminClient()) {
  const ctx = await setupContext(admin)
  const nuria = ctx.member('nuria')
  ok(await admin.from('team_members').update({ deleted_at: null, is_practitioner: true }).eq('id', nuria.id), 'nuria back')
  const { data: user } = await admin.auth.admin.getUserById(nuria.user_id)
  if (user?.user?.banned_until) await admin.auth.admin.updateUserById(nuria.user_id, { ban_duration: 'none' })
  ok(await admin.from('appointments').delete().eq('account_id', ctx.accountId).like('external_reference', 'setup-nuria-%'), 'old nuria visits')
  const patients = ok(await admin.from('patients').select('id').eq('account_id', ctx.accountId).is('anonymized_at', null).order('created_at').limit(12), 'patients')
  const type = ok(await admin.from('appointment_types').select('id, duration_minutes').eq('account_id', ctx.accountId).eq('name', 'Ajuste').single(), 'type')
  const mon = nextMonday()
  const rows = [[1, '10:00', 3], [2, '17:00', 4], [3, '11:30', 5]].map(([d, t, pi], i) => {
    const s = dayAt(mon, d, t)
    return { account_id: ctx.accountId, clinic_id: ctx.clinicId, patient_id: patients[pi].id, practitioner_id: nuria.id, practitioner_name: PEOPLE.nuria.name, appointment_type_id: type.id, starts_at: s.toISOString(), ends_at: new Date(s.getTime() + type.duration_minutes * 60000).toISOString(), status: 'booked', source: 'staff', external_reference: `setup-nuria-${i}` }
  })
  ok(await admin.from('appointments').insert(rows), 'nuria visits')
}

/** The newcomer's practice as the first-steps clips need it: 'type' = empty, 'patient' = one type, 'book' = a type and a patient. */
export async function resetNewcomer(stage, admin = adminClient()) {
  const accountId = (await readState()).newcomerAccountId
  if (!accountId) throw new Error('Run the setup seed first')
  ok(await admin.from('appointments').delete().eq('account_id', accountId), 'newcomer appts')
  ok(await admin.from('patients').delete().eq('account_id', accountId), 'newcomer patients')
  ok(await admin.from('appointment_types').delete().eq('account_id', accountId), 'newcomer types')
  if (stage === 'patient' || stage === 'book') {
    ok(await admin.from('appointment_types').insert({ account_id: accountId, name: 'Primera visita', duration_minutes: 45, default_price_cents: 6000, stage: 'first_visit', color: '#8b5cf6', sort_order: 1 }), 'newcomer type')
  }
  if (stage === 'book') {
    const { data: clinic } = await admin.from('clinics').select('id').eq('account_id', accountId).limit(1).single()
    const np = ok(await admin.from('patients').insert({ account_id: accountId, clinic_id: clinic.id, first_name: 'Raquel', last_name: 'Domènech' }).select('id').single(), 'newcomer patient')
    ok(await admin.from('patient_contact_numbers').insert({ account_id: accountId, patient_id: np.id, number: '+34 600 300 401', country_code: 'ES', is_whatsapp: true }), 'newcomer phone')
  }
  return accountId
}

/**
 * Four large phone-style photos on patients that have not been compressed yet,
 * as the Settings > Files clip expects. Compressing rewrites the stored file,
 * so each run puts the originals back.
 */
export async function resetFiles(admin = adminClient()) {
  const { accountId } = await setupContext(admin)
  // Recent patients only: a file counts as activity, and the three old records must stay untouched for the privacy review.
  const patients = ok(await admin.from('patients').select('id').eq('account_id', accountId).in('first_name', ['Laura', 'Sergio', 'Marina', 'Héctor']).order('first_name'), 'patients')
  const names = ['Foto postural frontal.jpg', 'Foto postural lateral.jpg', 'Foto de la espalda.jpg', 'Foto de la marcha.jpg']
  ok(await admin.from('patient_files').delete().eq('account_id', accountId).like('storage_path', '%/seed-setup-%'), 'old files')
  for (const [i, p] of patients.entries()) {
    // Photographic-looking noise at a size no phone would shrink on its own.
    const r = spawnSync(ffmpegPath, ['-v', 'error', '-f', 'lavfi', '-i', `testsrc2=size=2400x1800:rate=1,hue=h=${i * 60}`, '-vf', 'noise=alls=28:allf=t', '-frames:v', '1', '-q:v', '1', '-f', 'image2pipe', '-c:v', 'mjpeg', '-'], { maxBuffer: 64 * 1024 * 1024 })
    if (r.status !== 0 || !r.stdout.length) throw new Error(`ffmpeg: ${r.stderr}`)
    const path = `${accountId}/${p.id}/seed-setup-${i}.jpg`
    const up = await admin.storage.from('patient-files').upload(path, r.stdout, { contentType: 'image/jpeg', upsert: true })
    if (up.error) throw up.error
    ok(await admin.from('patient_files').insert({ account_id: accountId, patient_id: p.id, storage_path: path, file_name: names[i], file_type: 'image/jpeg', size_bytes: r.stdout.length, visibility: 'generic' }), 'file row')
  }
}

export default async function seedSetup() {
  const admin = adminClient()
  // --- the newcomer's empty practice
  const newcomer = await ensureUser(admin, NEWCOMER.email)
  const { data: ntm } = await admin.from('team_members').select('account_id').eq('user_id', newcomer.id).maybeSingle()
  if (!ntm) {
    const c = userClient()
    ok(await c.auth.signInWithPassword({ email: NEWCOMER.email, password: PASSWORD }), 'newcomer sign-in')
    ok(await c.rpc('create_account_with_owner', { p_account_name: 'Clínica Demo', p_clinic_name: 'Valencia', p_owner_name: NEWCOMER.name }), 'newcomer account')
    const { data: m } = await admin.from('team_members').select('id').eq('user_id', newcomer.id).single()
    ok(await admin.from('team_members').update({ is_practitioner: true, language_preference: 'es' }).eq('id', m.id), 'newcomer practitioner')
  }
  {
    const { data: m } = await admin.from('team_members').select('account_id').eq('user_id', newcomer.id).single()
    const st = await readState()
    st.newcomerAccountId = m.account_id
    await mkdir(dirname(STATE_FILE), { recursive: true })
    await writeFile(STATE_FILE, JSON.stringify(st, null, 2))
  }
  await resetNewcomer('type', admin)
  // The practice a new account gets names its first room in English.
  await admin.from('calendar_resources').update({ name: 'Sala 1' }).eq('account_id', (await readState()).newcomerAccountId).eq('name', 'Room 1')

  // --- people and the practice
  const users = {}
  for (const [k, p] of Object.entries(PEOPLE)) users[k] = await ensureUser(admin, p.email)

  let { data: tm } = await admin.from('team_members').select('account_id').eq('user_id', users.alba.id).maybeSingle()
  if (!tm) {
    const c = userClient()
    ok(await c.auth.signInWithPassword({ email: PEOPLE.alba.email, password: PASSWORD }), 'alba sign-in')
    ok(await c.rpc('create_account_with_owner', { p_account_name: 'Clínica Demo', p_clinic_name: 'Valencia', p_owner_name: PEOPLE.alba.name }), 'create account')
    tm = ok(await admin.from('team_members').select('account_id').eq('user_id', users.alba.id).single(), 'tm')
  }
  const accountId = tm.account_id
  {
    const st = await readState()
    st.accountId = accountId
    await mkdir(dirname(STATE_FILE), { recursive: true })
    await writeFile(STATE_FILE, JSON.stringify(st, null, 2))
  }
  ok(await admin.from('accounts').update({ name: 'Clínica Demo', default_phone_country: 'ES', require_two_factor: false, clinical_retention_years: 5 }).eq('id', accountId), 'account')
  // A paid plan, as the main demo has: otherwise every clip from this practice
  // carries a "Quedan N días de prueba" banner across the top. The newcomer's
  // practice keeps its trial -- that is what a brand-new clinic really sees.
  ok(await admin.from('subscriptions').update({ plan_id: 'pro', status: 'active', comped: true, extra_professionals: 4, trial_ends_at: null }).eq('account_id', accountId), 'subscription')
  const clinics = ok(await admin.from('clinics').select('id, name').eq('account_id', accountId).order('created_at'), 'clinics')
  const clinicId = clinics[0].id
  ok(await admin.from('clinics').update({
    name: 'Valencia', address: 'Calle Ejemplo 24, 46004 Valencia', phone: '+34 960 111 222', email: `hola@${DOMAIN}`,
    business_hours: HOURS, timezone: 'Europe/Madrid', slot_duration_minutes: 15,
    legal_name: 'Clínica Demo Equipo S.L.', tax_id: 'B00000000', holiday_region: null, holidays_auto: false, archived_at: null,
  }).eq('id', clinicId), 'clinic')
  // Clips add "Alicante"; take it away again so "Añadir sede" can be filmed again.
  for (const c of clinics.slice(1)) {
    const { count } = await admin.from('appointments').select('id', { count: 'exact', head: true }).eq('clinic_id', c.id)
    if (!count) {
      await admin.from('team_member_clinics').delete().eq('clinic_id', c.id)
      await admin.from('calendar_resources').delete().eq('clinic_id', c.id)
      await admin.from('clinics').delete().eq('id', c.id)
    }
  }
  // Closures added by the holidays clip.
  await admin.from('availability_blocks').delete().eq('clinic_id', clinicId).is('practitioner_id', null).is('room_id', null)

  const roles = ok(await admin.from('account_roles').select('id, name').eq('account_id', accountId), 'roles')
  const roleId = (n) => roles.find((r) => r.name === n)?.id
  // The clip's "Profesional sénior" role is created on camera; drop it so it can be again.
  for (const r of roles.filter((r) => r.name === 'Profesional sénior')) {
    await admin.from('team_members').update({ role_id: roleId('Practitioner') }).eq('role_id', r.id)
    await admin.from('account_roles').delete().eq('id', r.id)
  }

  const team = ok(await admin.from('team_members').select('id, full_name, user_id').eq('account_id', accountId), 'team')
  for (const [k, p] of Object.entries(PEOPLE)) {
    let m = team.find((t) => t.user_id === users[k].id)
    if (!m) {
      m = ok(await admin.from('team_members').insert({ account_id: accountId, user_id: users[k].id, full_name: p.name, role: p.practitioner ? 'practitioner' : 'front_desk', role_id: roleId(p.role), is_owner: p.owner, is_practitioner: p.practitioner }).select('id, full_name, user_id').single(), `member ${k}`)
      team.push(m)
    }
    ok(await admin.from('team_members').update({ full_name: p.name, role_id: roleId(p.role), is_owner: p.owner, is_practitioner: p.practitioner, color: p.color, language_preference: 'es', deleted_at: null, business_hours: null, online_booking_enabled: p.practitioner }).eq('id', m.id), `update ${k}`)
    const { data: link } = await admin.from('team_member_clinics').select('clinic_id').eq('team_member_id', m.id).eq('clinic_id', clinicId)
    if (!link?.length) ok(await admin.from('team_member_clinics').insert({ team_member_id: m.id, clinic_id: clinicId }), `clinic ${k}`)
    p.memberId = m.id
  }
  // Absences the clips record, and invites they create.
  await admin.from('staff_absences').delete().eq('account_id', accountId)
  await admin.from('account_invites').delete().eq('account_id', accountId).is('accepted_at', null)
  // One pending invite shared by link, so the list is not empty.
  ok(await admin.from('account_invites').insert({ account_id: accountId, email: null, full_name: 'Pau Ribas', role: 'practitioner', role_id: roleId('Practitioner'), is_practitioner: true, clinic_ids: [clinicId], token: randomBytes(16).toString('hex') }), 'invite')

  // --- rooms, types
  const rooms = ok(await admin.from('calendar_resources').select('id, name').eq('account_id', accountId), 'rooms')
  if (!rooms.find((r) => r.name === 'Sala 1')) {
    if (rooms[0]) ok(await admin.from('calendar_resources').update({ name: 'Sala 1' }).eq('id', rooms[0].id), 'sala 1')
    else ok(await admin.from('calendar_resources').insert({ account_id: accountId, clinic_id: clinicId, name: 'Sala 1' }), 'sala 1')
  }
  await admin.from('calendar_resources').delete().eq('account_id', accountId).eq('name', 'Sala 2')

  const TYPES = [
    { name: 'Primera visita', duration_minutes: 45, default_price_cents: 6000, stage: 'first_visit', color: '#8b5cf6', online_booking_enabled: true, sort_order: 1 },
    { name: 'Ajuste', duration_minutes: 30, default_price_cents: 4000, stage: 'adjustment', color: '#4f46e5', online_booking_enabled: true, sort_order: 2 },
    { name: 'Revisión', duration_minutes: 30, default_price_cents: 4000, stage: null, color: '#f59e0b', online_booking_enabled: false, sort_order: 3 },
  ]
  const types = ok(await admin.from('appointment_types').select('id, name').eq('account_id', accountId), 'types')
  for (const t of TYPES) {
    const found = types.find((x) => x.name === t.name)
    if (found) ok(await admin.from('appointment_types').update({ ...t, archived_at: null, online_payment_required: false, online_deposit_cents: null, online_bookable_by: 'all', online_bypass_practitioner: false, practitioner_ids: [] }).eq('id', found.id), t.name)
    else ok(await admin.from('appointment_types').insert({ account_id: accountId, ...t }), t.name)
  }
  // The clip creates "Masaje deportivo"; remove it (and anything booked with it) so it can be created again.
  for (const t of types.filter((x) => x.name === 'Masaje deportivo')) await admin.from('appointment_types').delete().eq('id', t.id)
  await admin.from('appointment_type_overrides').delete().in('appointment_type_id', types.map((t) => t.id))
  const typeIds = Object.fromEntries(ok(await admin.from('appointment_types').select('id, name').eq('account_id', accountId), 'types').map((t) => [t.name, t.id]))

  // --- patients
  const PATIENTS = [
    ['Laura', 'Gil Romero', '+34 600 100 201'], ['Sergio', 'Navarro Ruiz', '+34 600 100 202'], ['Marina', 'Costa Ferrer', '+34 600 100 203'],
    ['Héctor', 'Llorens Mas', '+34 600 100 204'], ['Rosa', 'Peris Vila', '+34 600 100 205'], ['Iván', 'Sanchis Bou', '+34 600 100 206'],
    ['Clara', 'Ortiz Martí', '+34 600 100 207'], ['Tomás', 'Benet Soria', '+34 600 100 208'], ['Eva', 'Roig Calvo', '+34 600 100 209'],
    ['Diego', 'Moll Pastor', '+34 600 100 210'], ['Noelia', 'Gascó Puig', '+34 600 100 211'], ['Rubén', 'Aguilar Sanz', '+34 600 100 212'],
  ]
  const existing = ok(await admin.from('patients').select('id, first_name, last_name').eq('account_id', accountId), 'patients')
  for (const [first, last, phone] of PATIENTS) {
    if (existing.find((p) => p.first_name === first && p.last_name === last)) continue
    const created = ok(await admin.from('patients').insert({ account_id: accountId, clinic_id: clinicId, first_name: first, last_name: last, email: `${first.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()}.${last.split(' ')[0].normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()}@example.com`, city: 'Valencia', country: 'España', default_practitioner_id: PEOPLE.marc.memberId }).select('id').single(), first)
    ok(await admin.from('patient_contact_numbers').insert({ account_id: accountId, patient_id: created.id, number: phone, country_code: 'ES', is_whatsapp: true }), `${first} phone`)
  }
  // Three records nobody has touched in over five years: the privacy review lists them.
  const OLD = [['Amparo', 'Ibáñez Lull', 7], ['Vicente', 'Ferri Cano', 6], ['Pilar', 'Tormo Sáez', 8]]
  for (const [first, last, years] of OLD) {
    const when = new Date(Date.now() - years * 365 * 86400000).toISOString()
    let p = existing.find((x) => x.first_name === first && x.last_name === last)
    if (!p) p = ok(await admin.from('patients').insert({ account_id: accountId, clinic_id: clinicId, first_name: first, last_name: last, city: 'Valencia', country: 'España' }).select('id').single(), first)
    ok(await admin.from('patients').update({ created_at: when, retention_kept_until: null, retention_kept_reason: null }).eq('id', p.id), `old ${first}`)
  }
  const patients = ok(await admin.from('patients').select('id, first_name').eq('account_id', accountId).is('anonymized_at', null).order('created_at', { ascending: false }), 'patients')
  const recent = patients.filter((p) => !OLD.some(([f]) => f === p.first_name))

  // --- appointments: Marc's week, and visits imported under a name nobody claims yet
  ok(await admin.from('appointments').delete().eq('account_id', accountId).like('external_reference', 'setup-marc-%'), 'marc reset')
  const mon = nextMonday()
  const marcRows = [[0, '09:30', 0], [1, '16:30', 1], [3, '10:00', 2]].map(([d, t, pi], i) => {
    const s = dayAt(mon, d, t)
    return { account_id: accountId, clinic_id: clinicId, patient_id: recent[pi].id, practitioner_id: PEOPLE.marc.memberId, practitioner_name: PEOPLE.marc.name, appointment_type_id: typeIds['Ajuste'], starts_at: s.toISOString(), ends_at: new Date(s.getTime() + 30 * 60000).toISOString(), status: 'booked', source: 'staff', external_reference: `setup-marc-${i}` }
  })
  ok(await admin.from('appointments').insert(marcRows), 'marc visits')
  const { count: imported } = await admin.from('appointments').select('id', { count: 'exact', head: true }).eq('account_id', accountId).like('external_reference', 'setup-import-%')
  if (!imported) {
    const rows = [40, 33, 26, 19].map((daysAgo, i) => {
      const s = dayAt(new Date(Date.now() - daysAgo * 86400000), 0, '11:00')
      return { account_id: accountId, clinic_id: clinicId, patient_id: recent[4 + i].id, practitioner_id: null, practitioner_name: 'Dr. Ejemplo', appointment_type_id: typeIds['Ajuste'], starts_at: s.toISOString(), ends_at: new Date(s.getTime() + 30 * 60000).toISOString(), status: 'completed', source: 'staff', external_reference: `setup-import-${i}` }
    })
    ok(await admin.from('appointments').insert(rows), 'imported visits')
  }
  await resetNuria(admin)

  // --- Jordi's two-factor
  const state = await readState()
  const { data: factors } = await admin.auth.admin.mfa.listFactors({ userId: users.jordi.id })
  const verified = (factors?.factors ?? []).filter((f) => f.status === 'verified')
  if (!state.jordiSecret || !verified.length) {
    for (const f of factors?.factors ?? []) await admin.auth.admin.mfa.deleteFactor({ userId: users.jordi.id, id: f.id })
    const c = userClient()
    ok(await c.auth.signInWithPassword({ email: PEOPLE.jordi.email, password: PASSWORD }), 'jordi sign-in')
    const enrolled = ok(await c.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'Móvil' }), 'enroll')
    ok(await c.auth.mfa.challengeAndVerify({ factorId: enrolled.id, code: totp(enrolled.totp.secret) }), 'verify')
    state.jordiSecret = enrolled.totp.secret
    await mkdir(dirname(STATE_FILE), { recursive: true })
    await writeFile(STATE_FILE, JSON.stringify(state, null, 2))
  }
  // Nobody else has two-factor: the clips enrol Lucía on camera.
  for (const k of ['alba', 'marc', 'nuria', 'lucia', 'elena']) {
    const { data } = await admin.auth.admin.mfa.listFactors({ userId: users[k].id })
    for (const f of data?.factors ?? []) await admin.auth.admin.mfa.deleteFactor({ userId: users[k].id, id: f.id })
  }

  // --- some history for the activity log, done as Lucía so it is hers
  const { count: logged } = await admin.from('audit_logs').select('id', { count: 'exact', head: true }).eq('account_id', accountId).eq('team_member_id', PEOPLE.lucia.memberId)
  if (!logged) {
    const c = userClient()
    ok(await c.auth.signInWithPassword({ email: PEOPLE.lucia.email, password: PASSWORD }), 'lucia sign-in')
    const s = dayAt(new Date(Date.now() - 2 * 86400000), 0, '12:00')
    const appt = ok(await admin.from('appointments').insert({ account_id: accountId, clinic_id: clinicId, patient_id: recent[8].id, practitioner_id: PEOPLE.alba.memberId, practitioner_name: PEOPLE.alba.name, appointment_type_id: typeIds['Ajuste'], starts_at: dayAt(mon, 2, '12:00').toISOString(), ends_at: dayAt(mon, 2, '12:30').toISOString(), status: 'booked', source: 'staff', external_reference: 'setup-audit-0' }).select('id').single(), 'audit appt')
    void s
    ok(await c.from('appointments').update({ starts_at: dayAt(mon, 2, '17:00').toISOString(), ends_at: dayAt(mon, 2, '17:30').toISOString(), rescheduled: true }).eq('id', appt.id), 'move')
    ok(await c.from('appointments').update({ deleted_at: new Date().toISOString() }).eq('id', appt.id), 'delete')
    ok(await c.from('patients').update({ occupation: 'Profesora' }).eq('id', recent[9].id), 'edit patient')
    await c.rpc('log_patient_access', { p_account_id: accountId, p_kind: 'record_opened', p_patient_id: recent[8].id })
    await c.rpc('log_patient_access', { p_account_id: accountId, p_kind: 'record_opened', p_patient_id: recent[9].id })
  }
  await resetFiles(admin)
}
