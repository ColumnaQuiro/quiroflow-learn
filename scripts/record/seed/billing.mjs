// Extras for the money clips (billing-payments, invoices-verifactu, and the
// billing settings): a family with a shared bono and a card on file, a patient
// whose receipts the payment clips take, products with stock, a membership
// plan, a mutua, and a service for quick receipts. Every name is invented.
// Safe to run again: each block looks before it writes. Nothing here talks to
// Stripe or the AEAT -- the "card on file" is a made-up Stripe id that only
// the clips' intercepted requests ever read.

import { createClient } from '@supabase/supabase-js'

// A second, small practice of its own for the Settings clips that change how a
// whole account issues facturas (fiscal data, the receipt, VeriFactu), so the
// shared demo clinic's own settings never move. The clips sign in to it in
// their prepare().
export const BILLING_OWNER = { email: 'facturacion@clinica-ejemplo.test', password: 'Demo1234!', name: 'Marta Quirós' }
const ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

const ok = (r, what) => {
  if (r.error) throw new Error(`${what}: ${r.error.message}`)
  return r.data
}

// A valid Spanish DNI for a number, so a factura completa has a NIF to print.
export const dni = (n) => `${n}${'TRWAGMYFPDXBNJZSQVHLCKE'[n % 23]}`

export const PEOPLE = {
  // The family: Unai is Nerea's son (tutor, facturas in her name); she has a card on file.
  nerea: { first_name: 'Nerea', last_name: 'Galán Ortega', gender: 'female', date_of_birth: '1987-03-14', national_id: dni(48211035), email: 'nerea.galan@example.com', phone: '+34 600 410 101', city: 'Valencia' },
  unai: { first_name: 'Unai', last_name: 'Galán Ortega', gender: 'male', date_of_birth: '2015-09-02', city: 'Valencia' },
  hector: { first_name: 'Héctor', last_name: 'Robles Mena', gender: 'male', date_of_birth: '1979-11-23', national_id: dni(29384756), email: 'hector.robles@example.com', phone: '+34 600 410 102', city: 'Valencia' },
  olga: { first_name: 'Olga', last_name: 'Ferrer Zamora', gender: 'female', date_of_birth: '1991-06-08', national_id: dni(53920417), email: 'olga.ferrer@example.com', phone: '+34 600 410 103', city: 'Valencia' },
  // One person per clip that changes a patient's money, so a take never finds another's leftovers.
  sofia: { first_name: 'Sofía', last_name: 'Beltrán Ruiz', gender: 'female', date_of_birth: '1984-01-30', national_id: dni(21459873), email: 'sofia.beltran@example.com', phone: '+34 600 410 104', city: 'Valencia' },
  mario: { first_name: 'Mario', last_name: 'Cuesta Lara', gender: 'male', date_of_birth: '1976-05-19', national_id: dni(37215648), email: 'mario.cuesta@example.com', phone: '+34 600 410 105', city: 'Valencia' },
  ainara: { first_name: 'Ainara', last_name: 'Pons Vidal', gender: 'female', date_of_birth: '1993-10-12', national_id: dni(45873921), email: 'ainara.pons@example.com', phone: '+34 600 410 106', city: 'Valencia' },
  irene: { first_name: 'Irene', last_name: 'Calvo Pons', gender: 'female', date_of_birth: '1982-08-27', national_id: dni(52684173), email: 'irene.calvo@example.com', phone: '+34 600 410 107', city: 'Valencia' },
  dario: { first_name: 'Darío', last_name: 'Mora Sáez', gender: 'male', date_of_birth: '1988-12-04', national_id: dni(26481937), email: 'dario.mora@example.com', phone: '+34 600 410 108', city: 'Valencia' },
  lucas: { first_name: 'Lucas', last_name: 'Mena Ortiz', gender: 'male', date_of_birth: '1995-04-16', national_id: dni(49157283), email: 'lucas.mena@example.com', phone: '+34 600 410 109', city: 'Valencia' },
  carmen: { first_name: 'Carmen', last_name: 'Soler Lluch', gender: 'female', date_of_birth: '1971-02-09', national_id: dni(31942867), email: 'carmen.soler@example.com', phone: '+34 600 410 110', city: 'Valencia' },
  bea: { first_name: 'Bea', last_name: 'Lorente Vila', gender: 'female', date_of_birth: '1990-07-21', national_id: dni(54281697), email: 'bea.lorente@example.com', phone: '+34 600 410 111', city: 'Valencia' },
  pilar: { first_name: 'Pilar', last_name: 'Navarro Gil', gender: 'female', date_of_birth: '1968-03-03', national_id: dni(19375824), email: 'pilar.navarro@example.com', phone: '+34 600 410 112', city: 'Valencia' },
}

export async function person(admin, accountId, clinicId, key, extra = {}) {
  const { phone, ...p } = PEOPLE[key]
  const found = ok(await admin.from('patients').select('id').eq('account_id', accountId).eq('first_name', p.first_name).eq('last_name', p.last_name).limit(1), `find ${key}`)
  if (found.length) return found[0].id
  const [row] = ok(await admin.from('patients').insert({ account_id: accountId, clinic_id: clinicId, preferred_language: 'es', ...p, ...extra }).select('id'), `insert ${key}`)
  if (phone) ok(await admin.from('patient_contact_numbers').insert({ account_id: accountId, patient_id: row.id, number: phone.replace(/\D/g, '').slice(2), country_code: 'ES', is_whatsapp: true }).select('id'), `phone ${key}`)
  return row.id
}

export default async function seed({ admin, accountId, clinicId, team }) {
  const practitioner = team.find((m) => m.is_practitioner) ?? team[0]

  // --- People
  const ids = {}
  for (const key of Object.keys(PEOPLE)) ids[key] = await person(admin, accountId, clinicId, key, { default_practitioner_id: practitioner.id })
  const { nerea, unai } = ids
  // Unai is Nerea's son: tutor, and facturas in her name.
  ok(await admin.from('patients').update({ tutor_patient_id: nerea, bill_to_tutor: true }).eq('id', unai).select('id'), 'unai tutor')

  // --- Service for quick receipts
  const sp = ok(await admin.from('services_products').select('id, name, kind').eq('account_id', accountId), 'services_products')
  if (!sp.find((s) => s.name === 'Informe clínico')) {
    ok(await admin.from('services_products').insert({ account_id: accountId, name: 'Informe clínico', price_cents: 6000, kind: 'service', tax_rate: 0 }), 'service')
  }
  // --- Products with stock (one running low)
  const products = [
    { name: 'Crema de árnica', price_cents: 1200, tax_rate: 21, stock_units: 2, min_stock: 3, cost_cents: 550 },
    { name: 'Almohada viscoelástica', price_cents: 4500, tax_rate: 21, stock_units: 6, min_stock: 2, cost_cents: 2100 },
  ]
  for (const p of products) {
    if (!sp.find((s) => s.name === p.name)) {
      const [row] = ok(await admin.from('services_products').insert({ account_id: accountId, kind: 'product', ...p }).select('id'), `product ${p.name}`)
      ok(await admin.from('product_stock_movements').insert({ account_id: accountId, product_id: row.id, kind: 'receive', delta: p.stock_units, unit_cost_cents: p.cost_cents, supplier: 'Distribuciones Demo' }).select('id'), `stock ${p.name}`)
    }
  }

  // --- Membership plan
  const plans = ok(await admin.from('memberships').select('id, name').eq('account_id', accountId), 'memberships')
  if (!plans.find((m) => m.name === 'Mantenimiento mensual')) {
    ok(await admin.from('memberships').insert({ account_id: accountId, name: 'Mantenimiento mensual', price_cents: 4900, billing_interval: 'month', billing_interval_count: 1 }), 'membership plan')
  }

  // --- A mutua with a rate and two covered patients
  const tps = ok(await admin.from('third_parties').select('id, name').eq('account_id', accountId), 'third_parties')
  let mutua = tps.find((t) => t.name === 'Mutua Levante Demo')
  if (!mutua) {
    ;[mutua] = ok(await admin.from('third_parties').insert({ account_id: accountId, name: 'Mutua Levante Demo', kind: 'insurer', tax_id: 'A00000000', email: 'liquidaciones@mutua-demo.example', active: true }).select('id, name'), 'mutua')
  }

  // --- The mutua: a rate, coverage for two patients, and visits it still owes
  const { data: types } = await admin.from('appointment_types').select('id, name').eq('account_id', accountId)
  const osteo = types.find((t) => t.name === 'Osteopatía') ?? types[0]
  const rates = ok(await admin.from('third_party_rates').select('id').eq('third_party_id', mutua.id).eq('appointment_type_id', osteo.id), 'rates')
  if (!rates.length) ok(await admin.from('third_party_rates').insert({ account_id: accountId, third_party_id: mutua.id, appointment_type_id: osteo.id, pays_cents: 2800, copay_cents: 1700 }).select('id'), 'rate')
  const cover = {}
  for (const [key, policy] of [['nerea', 'LEV-100231'], ['hector', 'LEV-100244']]) {
    const found = ok(await admin.from('patient_third_parties').select('id').eq('third_party_id', mutua.id).eq('patient_id', ids[key]), 'coverage')
    cover[key] = found[0]?.id ?? ok(await admin.from('patient_third_parties').insert({ account_id: accountId, patient_id: ids[key], third_party_id: mutua.id, policy_number: policy, authorized_sessions: 10, active: true }).select('id'), 'coverage insert')[0].id
  }
  const day = (back) => new Date(Date.now() - back * 86400_000).toISOString().slice(0, 10)
  const owed = [
    ['nerea', 21, 'HELP-TP-1'],
    ['hector', 18, 'HELP-TP-2'],
    ['nerea', 14, 'HELP-TP-3'],
    ['hector', 9, 'HELP-TP-4'],
  ]
  for (const [key, back, auth] of owed) {
    const found = ok(await admin.from('third_party_charges').select('id').eq('third_party_id', mutua.id).eq('authorization_number', auth), 'charge')
    if (found.length) continue
    ok(
      await admin.from('third_party_charges').insert({ account_id: accountId, third_party_id: mutua.id, patient_id: ids[key], patient_third_party_id: cover[key], service_date: day(back), description: 'Osteopatía', amount_cents: 2800, list_price_cents: 4500, authorization_number: auth, policy_number: key === 'nerea' ? 'LEV-100231' : 'LEV-100244', status: 'pending' }).select('id'),
      'charge insert',
    )
  }

  // --- Nerea: a card on file (made up -- only the clips' intercepted requests ever read it)
  const cust = ok(await admin.from('patient_stripe_customers').select('id').eq('patient_id', nerea).limit(1), 'stripe customer')
  if (!cust.length) {
    ok(await admin.from('patient_stripe_customers').insert({ account_id: accountId, patient_id: nerea, stripe_customer_id: 'cus_demoNerea0001', default_payment_method_id: 'pm_demoNerea0001' }), 'stripe customer insert')
  }

  // --- VeriFactu: "Who sends" only shows when the platform exists. The demo clinic stands in for it.
  ok(await admin.from('verifactu_platform').upsert({ singleton: true, account_id: accountId }).select('singleton'), 'verifactu platform')

  // --- The small practice for the account-wide billing Settings clips
  const url = process.env.SUPABASE_URL || 'http://127.0.0.1:54921'
  let user = null
  for (let page = 1; page < 20 && !user; page++) {
    const { data } = await admin.auth.admin.listUsers({ page, perPage: 200 })
    user = data.users.find((u) => u.email === BILLING_OWNER.email) ?? null
    if (data.users.length < 200) break
  }
  if (user) await admin.auth.admin.updateUserById(user.id, { password: BILLING_OWNER.password })
  else user = ok(await admin.auth.admin.createUser({ email: BILLING_OWNER.email, password: BILLING_OWNER.password, email_confirm: true }), 'billing owner user').user
  let member = ok(await admin.from('team_members').select('account_id').eq('user_id', user.id).maybeSingle(), 'billing owner member')
  if (!member) {
    const c = createClient(url, ANON_KEY, { auth: { autoRefreshToken: false, persistSession: false } })
    ok(await c.auth.signInWithPassword({ email: BILLING_OWNER.email, password: BILLING_OWNER.password }), 'billing owner sign-in')
    ok(await c.rpc('create_account_with_owner', { p_account_name: 'Clínica Ejemplo', p_clinic_name: 'Sede Centro', p_owner_name: BILLING_OWNER.name }), 'create billing account')
    member = ok(await admin.from('team_members').select('account_id').eq('user_id', user.id).single(), 'billing owner member')
  }
  ok(await admin.from('team_members').update({ language_preference: 'es' }).eq('user_id', user.id).select('id'), 'billing owner language')
  ok(await admin.from('clinics').update({ address: 'Calle Ejemplo 8, 46002 Valencia' }).eq('account_id', member.account_id).select('id'), 'billing clinic')
}
