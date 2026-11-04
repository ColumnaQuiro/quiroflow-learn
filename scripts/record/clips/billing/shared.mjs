// Shared by clips/billing.mjs: the demo data the money clips rely on (seeded by
// seed/billing.mjs) and the small DB helpers their prepare() steps use to put
// that data back before each take. Lives in a sub-folder so record.mjs (which
// loads every clips/*.mjs) does not take it for a clip file.
//
// Everything is local and invented. Nothing here, and no clip, talks to Stripe
// or the AEAT: the clips intercept those requests in the browser.
import { demo, at, madridToday } from '../calendar/shared.mjs'
import { PEOPLE, BILLING_OWNER } from '../../seed/billing.mjs'

export { demo }

export async function pid(key) {
  const { admin, accountId } = await demo()
  const p = PEOPLE[key]
  const { data } = await admin.from('patients').select('id').eq('account_id', accountId).eq('first_name', p.first_name).eq('last_name', p.last_name).limit(1)
  if (!data?.length) throw new Error(`Run node scripts/record/seed.mjs billing first (no ${p.first_name})`)
  return data[0].id
}

export const euro = (c) => (c / 100).toFixed(2)

const must = (r, what) => {
  if (r.error) throw new Error(`${what}: ${r.error.message}`)
  return r.data
}
export { must }

/** A receipt (what the patient owes) with its lines. `paidCents` > 0 also records a payment of that much. */
export async function makeReceipt(patientId, lines, { status = 'unpaid', hoursAgo = 2, ref = null } = {}) {
  const { admin, accountId } = await demo()
  if (ref) {
    const old = must(await admin.from('invoices').select('id').eq('account_id', accountId).eq('external_reference', ref), 'find receipt')
    for (const o of old) await dropReceipt(o.id)
  }
  const number = must(await admin.rpc('next_invoice_number', { p_account_id: accountId, p_prefix: 'INV-' }), 'receipt number')
  const total = lines.reduce((s, l) => s + (l.quantity ?? 1) * l.price_cents, 0)
  const [inv] = must(
    await admin.from('invoices').insert({ account_id: accountId, patient_id: patientId, invoice_number: number, status, total_cents: total, created_at: new Date(Date.now() - hoursAgo * 3600_000).toISOString(), external_reference: ref }).select('id, invoice_number'),
    'insert receipt',
  )
  must(await admin.from('invoice_line_items').insert(lines.map((l) => ({ account_id: accountId, invoice_id: inv.id, quantity: 1, ...l }))).select('id'), 'receipt lines')
  return inv
}

/** Removes a receipt with its payments and lines (the facturas issued for them stay, as fiscal records do). */
export async function dropReceipt(id) {
  const { admin } = await demo()
  await admin.from('payments').delete().eq('invoice_id', id)
  await admin.from('invoice_line_items').delete().eq('invoice_id', id)
  await admin.from('invoices').delete().eq('id', id)
}

/** Deletes every unpaid receipt of these patients that nothing has been paid against, except the kept ones. */
export async function clearUnpaid(keys, keepRefs = []) {
  const { admin, accountId } = await demo()
  const ids = await Promise.all(keys.map(pid))
  const { data } = await admin.from('invoices').select('id, external_reference, status').eq('account_id', accountId).in('patient_id', ids).eq('status', 'unpaid')
  for (const r of data ?? []) {
    if (keepRefs.includes(r.external_reference)) continue
    const { count } = await admin.from('payments').select('id', { count: 'exact', head: true }).eq('invoice_id', r.id)
    if (!count) await dropReceipt(r.id)
  }
}

/** Navigates the clip's page to a path of the same app. */
export async function go(h, path) {
  await h.page.goto(new URL(path, h.page.url()).toString(), { waitUntil: 'networkidle' })
}

/** Opens a patient's Dinero tab, loaded. */
export async function openMoney(h, patientId) {
  await go(h, `/patients/${patientId}?tab=billing`)
  await h.page.getByText('Libro de cuenta').first().waitFor({ timeout: 30000 })
  await h.page.waitForTimeout(800)
}

/** Scrolls the page's main scroller to its bottom (or to `top` pixels). */
export async function scrollMain(h, top) {
  await h.page.evaluate((top) => {
    const el = [...document.querySelectorAll('div')].filter((d) => /auto|scroll/.test(getComputedStyle(d).overflowY) && d.scrollHeight > d.clientHeight + 20).sort((a, b) => b.clientHeight - a.clientHeight)[0]
    if (el) el.scrollTop = top ?? el.scrollHeight
  }, top)
  await h.page.waitForTimeout(400)
}

/**
 * A receipt that was paid in full (or `paid` cents of it), with the payment and
 * the factura the app would have issued for it (issue_factura is what every
 * payment screen calls). Returns { invoice, payment, factura }.
 */
export async function makePaidReceipt(patientId, lines, { method = 'cash', hoursAgo = 3, ref = null, purpose = 'visit', paid = null } = {}) {
  const { admin, accountId } = await demo()
  const total = lines.reduce((s, l) => s + (l.quantity ?? 1) * l.price_cents, 0)
  const amount = paid ?? total
  const invoice = await makeReceipt(patientId, lines, { status: amount >= total ? 'paid' : 'unpaid', hoursAgo, ref })
  const [payment] = must(
    await admin.from('payments').insert({ account_id: accountId, invoice_id: invoice.id, patient_id: patientId, amount_cents: amount, method, purpose, paid_at: new Date(Date.now() - (hoursAgo - 0.01) * 3600_000).toISOString() }).select('id'),
    'insert payment',
  )
  const factura = await issueFacturaFor(patientId, payment.id, amount, lines[0].description)
  return { invoice, payment, factura }
}

/** The factura the app issues for a payment, in the account's own tax treatment. */
export async function issueFacturaFor(patientId, paymentId, amountCents, description, { kind } = {}) {
  const { admin, accountId } = await demo()
  const { data: acc } = await admin.from('accounts').select('factura_tax_exemption_code').eq('id', accountId).single()
  const issued = must(
    await admin.rpc('issue_factura', {
      p_account_id: accountId,
      p_patient_id: patientId,
      p_payment_id: paymentId,
      p_kind: kind ?? (amountCents > 40000 ? 'full' : 'simplified'),
      p_description: description,
      p_amount_cents: amountCents,
      p_tax_base_cents: amountCents,
      p_tax_rate_bp: 0,
      p_tax_amount_cents: 0,
      p_tax_exemption_code: acc?.factura_tax_exemption_code ?? 'E1',
      p_rectifies_factura_id: null,
    }),
    'issue factura',
  )
  return Array.isArray(issued) ? issued[0] : issued
}

/** Forgets a patient's money so a clip can create it again: payments, credits, bonos, memberships, unpaid receipts. Facturas stay (they are fiscal records). */
export async function wipeMoney(patientId, what = ['credits']) {
  const { admin } = await demo()
  if (what.includes('credits')) {
    await admin.from('account_credits').delete().eq('patient_id', patientId)
    await admin.from('payments').delete().eq('patient_id', patientId).eq('purpose', 'on_account')
  }
  if (what.includes('bonos')) {
    const { data: bonos } = await admin.from('package_purchases').select('id').eq('patient_id', patientId)
    const ids = (bonos ?? []).map((b) => b.id)
    if (ids.length) {
      await admin.from('payment_schedules').delete().in('package_purchase_id', ids)
      await admin.from('payments').delete().in('package_purchase_id', ids)
      await admin.from('package_sessions').delete().in('package_purchase_id', ids)
      await admin.from('package_purchase_shares').delete().in('package_purchase_id', ids)
      await admin.from('package_purchases').delete().in('id', ids)
    }
  }
  if (what.includes('memberships')) {
    const { data: ms } = await admin.from('patient_memberships').select('id').eq('patient_id', patientId)
    const ids = (ms ?? []).map((m) => m.id)
    if (ids.length) {
      await admin.from('payment_schedules').delete().in('patient_membership_id', ids)
      await admin.from('membership_payments').delete().in('patient_membership_id', ids)
      await admin.from('patient_memberships').delete().in('id', ids)
    }
    await admin.from('payments').delete().eq('patient_id', patientId).eq('purpose', 'membership')
  }
}

/**
 * Facturas are fiscal records: they cannot be deleted, and every take of a clip
 * that pays something issues one. So a clip that SHOWS a patient's facturas first
 * moves the old ones to a parked, inactive patient (the person is the same as far
 * as the hash chain goes: the patient is not among the hashed fields), and the
 * list it films holds only what that take made.
 */
export async function parkFacturas(patientId) {
  const { admin, accountId, clinicId } = await demo()
  let { data: park } = await admin.from('patients').select('id').eq('account_id', accountId).eq('first_name', 'Archivo').eq('last_name', 'de facturas demo').limit(1)
  if (!park?.length) {
    park = must(await admin.from('patients').insert({ account_id: accountId, clinic_id: clinicId, first_name: 'Archivo', last_name: 'de facturas demo', status: 'inactive', preferred_language: 'es' }).select('id'), 'park patient')
  }
  const r = await admin.from('facturas').update({ patient_id: park[0].id }).eq('patient_id', patientId).select('id')
  if (r.error) throw new Error(`park facturas: ${r.error.message}`)
}

/** A bono the patient owns, `paidCents` of it paid (a payment and its factura), `used` sessions already gone. Replaces any bono they have. */
export async function giveBono(patientId, { name = 'Bono 10 sesiones', paidCents = 0, used = 0 } = {}) {
  const { admin, accountId } = await demo()
  await wipeMoney(patientId, ['bonos'])
  const [tpl] = must(await admin.from('packages').select('id, name, session_count, price_cents').eq('account_id', accountId).eq('name', name), 'package')
  const [bono] = must(
    await admin.from('package_purchases').insert({ account_id: accountId, patient_id: patientId, package_id: tpl.id, package_name: tpl.name, sessions_total: tpl.session_count, sessions_used: used, price_cents: tpl.price_cents, owed_cents: tpl.price_cents, invoice_id: null, purchased_at: new Date(Date.now() - 6 * 86400_000).toISOString() }).select('id'),
    'bono',
  )
  if (paidCents > 0) {
    const [pay] = must(
      await admin.from('payments').insert({ account_id: accountId, patient_id: patientId, package_purchase_id: bono.id, amount_cents: paidCents, method: 'cash', purpose: 'bono', paid_at: new Date(Date.now() - 6 * 86400_000).toISOString() }).select('id'),
      'bono payment',
    )
    await issueFacturaFor(patientId, pay.id, paidCents, `${tpl.name} (pago parcial)`, { kind: 'full' })
  }
  return bono.id
}

/** Scrolls the main scroller so `locator`'s element sits `above` pixels below the top of the page content. */
export async function scrollToEl(h, locator, above = 150) {
  const handle = await locator.first().elementHandle()
  if (!handle) throw new Error('scrollToEl: nothing to scroll to')
  await h.page.evaluate(
    ([el, above]) => {
      const scroller = [...document.querySelectorAll('div')].filter((d) => /auto|scroll/.test(getComputedStyle(d).overflowY) && d.scrollHeight > d.clientHeight + 20 && d.contains(el)).sort((a, b) => a.clientHeight - b.clientHeight)[0]
      if (!scroller) return
      scroller.scrollTop += el.getBoundingClientRect().top - scroller.getBoundingClientRect().top - above
    },
    [handle, above],
  )
  await h.page.waitForTimeout(400)
}

/**
 * Today's visit for a patient, already over by 10:18 (the clock the clips run
 * at), so it can be charged. Replaces the one this helper made last time,
 * with its receipt. Returns the appointment id.
 */
export async function makeVisit(patientId, { ref, hm = '08:00', minutes = 30, type = 'Revisión', practitioner = 'sara' } = {}) {
  const { admin, accountId, clinicId, sara, alex, ines } = await demo()
  const old = must(await admin.from('appointments').select('id').eq('account_id', accountId).eq('external_reference', `help-${ref}`), 'old visit')
  for (const o of old) {
    const inv = must(await admin.from('invoices').select('id').eq('appointment_id', o.id), 'old visit receipts')
    for (const i of inv) await dropReceipt(i.id)
    await admin.from('package_sessions').delete().eq('appointment_id', o.id)
    await admin.from('appointments').delete().eq('id', o.id)
  }
  const [t] = must(await admin.from('appointment_types').select('id, name').eq('account_id', accountId).eq('name', type), 'appointment type')
  const who = { sara, alex, ines }[practitioner]
  const start = at(madridToday(), hm)
  const [a] = must(
    await admin
      .from('appointments')
      .insert({ account_id: accountId, clinic_id: clinicId, patient_id: patientId, practitioner_id: who.id, practitioner_name: who.full_name, appointment_type_id: t.id, starts_at: start.toISOString(), ends_at: new Date(start.getTime() + minutes * 60000).toISOString(), status: 'completed', source: 'staff', external_reference: `help-${ref}` })
      .select('id'),
    'visit',
  )
  return a.id
}

/** The calendar on today's day view, every practitioner, scrolled so `hm` sits near the top. */
export async function openCalendarDay(h, hm = '07:30') {
  await h.page.evaluate(() => {
    localStorage.setItem('quiroflow-calendar-view-mode', 'day')
    localStorage.setItem('quiroflow-calendar-practitioner', '__all')
  })
  await h.page.reload({ waitUntil: 'networkidle' })
  await h.page.locator('[data-cy="calendar-grid"]').first().waitFor({ timeout: 30000 })
  await h.page.waitForTimeout(1200)
  await h.page.evaluate((hm) => {
    const scroller = document.querySelector('[data-cy="grid-scroller"]')
    if (!scroller) return
    const label = [...scroller.querySelectorAll('*')].find((el) => el.children.length === 0 && el.textContent.trim() === hm)
    if (label) scroller.scrollTop += label.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 60
  }, hm)
  await h.page.waitForTimeout(400)
}

/** The `{ value }` of the option whose text contains `text` (option labels carry non-breaking spaces, so exact labels miss). */
export async function optionLike(select, text) {
  const value = await select.locator('option', { hasText: text }).first().getAttribute('value')
  if (value === null) throw new Error(`no option like ${text}`)
  return { value }
}

// --- The small practice for the account-wide billing Settings clips ----------

/** The second practice's ids (Clínica Ejemplo), for resetting its settings between takes. */
export async function ejemplo() {
  const { admin } = await demo()
  const { data: users } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const user = users.users.find((u) => u.email === BILLING_OWNER.email)
  if (!user) throw new Error('Run node scripts/record/seed.mjs billing first (no Clínica Ejemplo owner)')
  const tm = must(await admin.from('team_members').select('account_id').eq('user_id', user.id).single(), 'ejemplo member')
  const clinic = must(await admin.from('clinics').select('id').eq('account_id', tm.account_id).order('created_at').limit(1).single(), 'ejemplo clinic')
  return { admin, accountId: tm.account_id, clinicId: clinic.id }
}

/** Replaces the recording's sign-in (the demo owner) with the second practice's owner, and opens `path`. */
export async function signInAsEjemplo(h, path, ready) {
  await h.page.context().clearCookies()
  await h.page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear() } catch {} })
  // The practice is in its trial: put the banner away, as its own button does, so it is not in the clip.
  await h.page.context().addCookies([{ name: 'qf_trial_banner_hidden', value: 'true', url: new URL(h.page.url()).origin }])
  await h.page.goto(new URL('/login', h.page.url()).toString(), { waitUntil: 'networkidle' })
  await h.page.locator('input[type=email]').fill(BILLING_OWNER.email)
  await h.page.locator('input[type=password]').fill(BILLING_OWNER.password)
  await h.page.locator('button[type=submit]').click()
  await h.page.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 30000 })
  await h.page.waitForLoadState('networkidle')
  await go(h, path)
  await h.page.locator(ready).first().waitFor({ timeout: 30000 })
  await h.page.waitForTimeout(800)
}
