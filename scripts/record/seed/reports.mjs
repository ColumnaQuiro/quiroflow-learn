// Extras for the reports clips, on top of the demo clinic's nine months of
// visits, receipts and payments:
//
//   - facturas for every payment since 1 August, dated the day of the payment,
//     so Facturas emitidas and Gestoría have a quarter to show (VeriFactu is
//     off in the demo, so nothing is ever sent anywhere)
//   - one refund yesterday, with its REF- receipt and rectificativa
//   - three part-paid bonos (Deudores)
//   - three memberships with monthly payments, one failed (Membresías)
//   - a pay plan for one practitioner (Comisiones)
//   - referrals, reasons patients stopped, win-back contacts, a recall
//     automation's sends and replies, and a month of WhatsApp delivery
//     statuses (Recomendaciones, Retención, Recuperaciones, Recordatorios
//     programados, Comunicaciones)
//
// Every name is the demo clinic's own invented patients. Safe to re-run:
// rows are tagged (external_reference / wamid / note "demo-reports-*") and
// skipped or replaced when present.

const DAY = 86_400_000
const TAG = 'demo-reports'

export default async function seed({ admin, accountId, team }) {
  const ok = (r, what) => {
    if (r.error) throw new Error(`${what}: ${r.error.message}`)
    return r.data
  }
  const now = Date.now()
  const iso = (ms) => new Date(ms).toISOString()
  const alex = team.find((m) => m.full_name === 'Álex Prieto')
  const ines = team.find((m) => m.full_name === 'Inés Ramos')
  const owner = team.find((m) => m.is_owner)

  const patients = ok(
    await admin.from('patients').select('id, first_name, last_name, default_practitioner_id, created_at').eq('account_id', accountId).order('created_at'),
    'patients',
  )
  const byName = (full) => patients.find((p) => `${p.first_name} ${p.last_name ?? ''}`.trim() === full)
  const pick = (i) => patients[i % patients.length]

  // ---- Bonos part-paid (Deudores) -------------------------------------------
  const packages = ok(await admin.from('packages').select('id, name, session_count, price_cents').eq('account_id', accountId), 'packages')
  const bono10 = packages.find((p) => p.session_count === 10) ?? packages[0]
  const bono5 = packages.find((p) => p.session_count === 5) ?? packages[0]
  const bonoPlan = [
    { ref: `${TAG}-bono-1`, patient: pick(5), pkg: bono10, paid: 15000, daysAgo: 24, method: 'card' },
    { ref: `${TAG}-bono-2`, patient: pick(11), pkg: bono5, paid: 10000, daysAgo: 12, method: 'bizum' },
    { ref: `${TAG}-bono-3`, patient: pick(17), pkg: bono10, paid: 0, daysAgo: 5, method: 'cash' },
  ]
  for (const b of bonoPlan) {
    if (!b.pkg) break
    const existing = ok(await admin.from('package_purchases').select('id').eq('account_id', accountId).eq('external_reference', b.ref).maybeSingle(), 'bono lookup')
    if (existing) continue
    const at = iso(now - b.daysAgo * DAY)
    const purchase = ok(
      await admin
        .from('package_purchases')
        .insert({ account_id: accountId, patient_id: b.patient.id, package_id: b.pkg.id, package_name: b.pkg.name, sessions_total: b.pkg.session_count, sessions_used: 1, price_cents: b.pkg.price_cents, owed_cents: b.pkg.price_cents, purchased_at: at, created_by: ines?.id ?? null, external_reference: b.ref })
        .select('id')
        .single(),
      'bono',
    )
    if (b.paid > 0) {
      ok(await admin.from('payments').insert({ account_id: accountId, patient_id: b.patient.id, invoice_id: null, package_purchase_id: purchase.id, amount_cents: b.paid, method: b.method, purpose: 'bono', paid_at: at, external_reference: b.ref, created_by: ines?.id ?? null }), 'bono payment')
    }
  }

  // ---- Memberships (Membresías) ---------------------------------------------
  let plan = ok(await admin.from('memberships').select('id, name, price_cents').eq('account_id', accountId).eq('name', 'Mantenimiento mensual').maybeSingle(), 'membership plan')
  if (!plan) plan = ok(await admin.from('memberships').insert({ account_id: accountId, name: 'Mantenimiento mensual', price_cents: 4900 }).select('id, name, price_cents').single(), 'membership plan insert')
  const monthStart = (offset) => {
    const d = new Date()
    d.setDate(1)
    d.setMonth(d.getMonth() + offset)
    return d.toISOString().slice(0, 10)
  }
  const memberPlan = [
    { patient: pick(3), status: 'active', months: 5, failed: [] },
    { patient: pick(8), status: 'active', months: 3, failed: [1] },
    { patient: pick(14), status: 'paused', months: 4, failed: [], stopBefore: 1 },
  ]
  for (const m of memberPlan) {
    const existing = ok(await admin.from('patient_memberships').select('id').eq('account_id', accountId).eq('patient_id', m.patient.id).eq('membership_name', plan.name).maybeSingle(), 'membership lookup')
    if (existing) continue
    const started = monthStart(-(m.months - 1))
    const pm = ok(
      await admin.from('patient_memberships').insert({ account_id: accountId, patient_id: m.patient.id, membership_id: plan.id, membership_name: plan.name, price_cents: plan.price_cents, status: m.status, started_at: `${started}T09:00:00Z`, created_by: alex?.id ?? null }).select('id').single(),
      'membership',
    )
    const rows = []
    for (let i = m.months - 1; i >= (m.stopBefore ?? 0); i--) {
      rows.push({ account_id: accountId, patient_membership_id: pm.id, period_start: monthStart(-i), amount_cents: plan.price_cents, status: m.failed.includes(i) ? 'failed' : 'paid' })
    }
    ok(await admin.from('membership_payments').insert(rows), 'membership payments')
  }

  // ---- Refund yesterday, with its rectificativa ------------------------------
  const yesterday = new Date(now - DAY)
  yesterday.setHours(17, 40, 0, 0)
  const refundDone = ok(await admin.from('payments').select('id').eq('account_id', accountId).eq('external_reference', `${TAG}-refund`).maybeSingle(), 'refund lookup')
  let refundPaymentId = refundDone?.id ?? null
  let refundOf = null
  if (!refundDone) {
    const from = new Date(yesterday)
    from.setHours(0, 0, 0, 0)
    const candidates = ok(
      await admin.from('payments').select('id, patient_id, invoice_id, amount_cents, method, paid_at').eq('account_id', accountId).eq('method', 'card').gt('amount_cents', 0).not('invoice_id', 'is', null).gte('paid_at', iso(from.getTime())).lt('paid_at', iso(yesterday.getTime())).order('paid_at').limit(1),
      'refund candidate',
    )
    refundOf = candidates[0] ?? null
    if (refundOf) {
      const number = ok(await admin.rpc('next_invoice_number', { p_account_id: accountId, p_prefix: 'REF-' }), 'REF number')
      const original = ok(await admin.from('invoices').select('invoice_number').eq('id', refundOf.invoice_id).single(), 'original receipt')
      const amount = 2000
      const inv = ok(
        await admin
          .from('invoices')
          .insert({ account_id: accountId, patient_id: refundOf.patient_id, invoice_number: number, status: 'paid', total_cents: -amount, is_refund: true, refunds_invoice_id: refundOf.invoice_id, refunds_payment_id: refundOf.id, created_at: iso(yesterday.getTime()), external_reference: `${TAG}-refund` })
          .select('id')
          .single(),
        'refund receipt',
      )
      ok(await admin.from('invoice_line_items').insert({ account_id: accountId, invoice_id: inv.id, description: `Reembolso de ${original.invoice_number}`, quantity: 1, price_cents: -amount }), 'refund line')
      const pay = ok(await admin.from('payments').insert({ account_id: accountId, patient_id: refundOf.patient_id, invoice_id: inv.id, amount_cents: -amount, method: 'card', paid_at: iso(yesterday.getTime()), external_reference: `${TAG}-refund`, created_by: owner?.id ?? null }).select('id').single(), 'refund payment')
      refundPaymentId = pay.id
    }
  }

  // ---- Facturas since 1 August, one per payment received ---------------------
  // Dated the day the money came in, in order, as the app would have issued
  // them. Spending credit and write-offs issue none, and nor does a refund
  // (its rectificativa is written below).
  const since = `${new Date().getFullYear()}-08-01T00:00:00Z`
  const pays = ok(
    await admin.from('payments').select('id, patient_id, amount_cents, method, paid_at, purpose, package_purchase_id, invoice_id').eq('account_id', accountId).gte('paid_at', since).gt('amount_cents', 0).not('method', 'in', '(credit,write_off)').order('paid_at').order('id').limit(5000),
    'payments',
  )
  const issued = ok(await admin.from('facturas').select('payment_id').eq('account_id', accountId).not('payment_id', 'is', null).limit(10000), 'facturas')
  const has = new Set(issued.map((f) => f.payment_id))
  const purchases = new Map(ok(await admin.from('package_purchases').select('id, package_name, price_cents, sessions_total').eq('account_id', accountId), 'purchases').map((p) => [p.id, p]))
  const eur = (c) => (c / 100).toFixed(2).replace('.', ',')
  let made = 0
  for (const p of pays) {
    if (has.has(p.id)) continue
    const bono = p.package_purchase_id ? purchases.get(p.package_purchase_id) : null
    const purpose = p.purpose ?? 'visit'
    const description = bono
      ? `${bono.package_name}: pago de ${eur(p.amount_cents)} € de ${eur(bono.price_cents)} € (${bono.sessions_total} sesiones)`
      : purpose === 'on_account'
        ? 'Saldo a cuenta para servicios en la clínica'
        : purpose === 'membership'
          ? 'Mantenimiento mensual'
          : 'Consulta'
    const kind = purpose === 'bono' || purpose === 'membership' || p.amount_cents > 40000 ? 'full' : 'simplified'
    const number = ok(await admin.rpc('next_factura_number', { p_account_id: accountId, p_series: 'F' }), 'factura number')
    ok(await admin.from('facturas').insert({ account_id: accountId, patient_id: p.patient_id, payment_id: p.id, number, kind, description, amount_cents: p.amount_cents, issued_at: p.paid_at }), `factura for ${p.id}`)
    made++
  }

  // The rectificativa for the refund, once its original has a factura.
  if (refundPaymentId) {
    const already = ok(await admin.from('facturas').select('id').eq('account_id', accountId).eq('payment_id', refundPaymentId).maybeSingle(), 'rectificativa lookup')
    if (!already) {
      const refundPay = ok(await admin.from('payments').select('patient_id, amount_cents, paid_at, invoice_id').eq('id', refundPaymentId).single(), 'refund payment')
      const refundInv = ok(await admin.from('invoices').select('refunds_payment_id').eq('id', refundPay.invoice_id).single(), 'refund receipt')
      const original = ok(await admin.from('facturas').select('id, number').eq('payment_id', refundInv.refunds_payment_id).maybeSingle(), 'original factura')
      if (original) {
        const number = ok(await admin.rpc('next_factura_number', { p_account_id: accountId, p_series: 'R' }), 'R number')
        ok(
          await admin.from('facturas').insert({ account_id: accountId, patient_id: refundPay.patient_id, payment_id: refundPaymentId, number, kind: 'rectificativa', description: `Rectifica la factura ${original.number}: devolución`, amount_cents: refundPay.amount_cents, issued_at: refundPay.paid_at, rectifies_factura_id: original.id }),
          'rectificativa',
        )
      }
    }
  }

  // ---- Pay plan (Comisiones) -------------------------------------------------
  // Álex has one; Inés is left without, for the clip that sets hers up.
  if (alex) {
    ok(
      await admin.from('pay_plans').upsert({ team_member_id: alex.id, account_id: accountId, base_cents: 80000, payments_pct: 10, visit_cents: 0, tier_mode: 'reached', tiers: [], new_patient_cents: 2000, sales_pct: 5 }, { onConflict: 'team_member_id' }),
      'pay plan',
    )
  }
  if (ines) ok(await admin.from('pay_plans').delete().eq('team_member_id', ines.id), 'pay plan reset')

  // ---- Referrals (Recomendaciones) -------------------------------------------
  const referrals = [
    { friend: pick(40), by: pick(2), rewarded: true },
    { friend: pick(44), by: pick(2), rewarded: false },
    { friend: pick(47), by: pick(9), rewarded: false },
    { friend: pick(51), by: pick(20), rewarded: false },
  ]
  for (const r of referrals) {
    if (r.friend.id === r.by.id) continue
    ok(
      await admin
        .from('patients')
        .update({ referred_by_patient_id: r.by.id, referral_rewarded_at: r.rewarded ? iso(now - 9 * DAY) : null })
        .eq('id', r.friend.id)
        .is('referred_by_patient_id', null),
      'referral',
    )
  }

  // ---- Why patients stopped (Retención) --------------------------------------
  const reasons = ok(await admin.from('care_stop_reasons').select('id, name').eq('account_id', accountId), 'reasons')
  const reason = (name) => reasons.find((r) => r.name === name)?.id ?? reasons[0]?.id ?? null
  ok(await admin.from('patient_care_stops').delete().eq('account_id', accountId).like('note', `${TAG}%`), 'stops reset')
  const stops = [
    ['Mejoró', 20, alex], ['Mejoró', 45, ines], ['Precio', 33, alex], ['Sin tiempo', 61, ines], ['Verano / vacaciones', 95, alex], ['Se mudó', 120, ines], ['Mejoró', 150, alex],
  ]
  ok(
    await admin.from('patient_care_stops').insert(
      stops.map(([name, daysAgo, who], i) => ({ account_id: accountId, patient_id: pick(25 + i).id, reason_id: reason(name), practitioner_id: who?.id ?? null, recorded_by: owner?.id ?? null, recorded_at: iso(now - daysAgo * DAY), note: `${TAG}-stop-${i}` })),
    ),
    'stops',
  )

  // ---- Win-back contacts (Retención › Recuperación) --------------------------
  ok(await admin.from('contact_log').delete().eq('account_id', accountId).like('external_reference', `${TAG}%`), 'contacts reset')
  ok(
    await admin.from('contact_log').insert(
      [0, 1, 2, 3, 4, 5].map((i) => ({ account_id: accountId, patient_id: pick(30 + i).id, action: i % 3 === 2 ? 'called_left_message' : 'sent_whatsapp', note: 'Te echamos de menos', created_by: owner?.id ?? null, created_at: iso(now - (40 - i * 6) * DAY), external_reference: `${TAG}-contact-${i}` })),
    ),
    'contacts',
  )

  // ---- A recall automation and what it sent (Recuperaciones) ------------------
  // Switched off: it exists only so the report has a rule to read.
  let rule = ok(await admin.from('automation_rules').select('id').eq('account_id', accountId).eq('name', 'Te echamos de menos').maybeSingle(), 'rule lookup')
  if (!rule) rule = ok(await admin.from('automation_rules').insert({ account_id: accountId, name: 'Te echamos de menos', trigger_event: 'segment', entry_mode: 'one_at_a_time', enabled: false, dry_run: false, is_marketing: false }).select('id').single(), 'rule')
  ok(await admin.from('whatsapp_messages').delete().eq('account_id', accountId).like('wamid', `${TAG}%`), 'wa reset')
  const phoneOf = new Map(ok(await admin.from('patient_contact_numbers').select('patient_id, country_code, number').eq('account_id', accountId), 'phones').map((r) => [r.patient_id, `${(r.country_code ?? '+34').replace('+', '')}${r.number}`]))
  const wa = []
  for (let i = 0; i < 10; i++) {
    const p = pick(36 + i)
    const at = now - (2 + i * 2.5) * DAY
    wa.push({ account_id: accountId, patient_id: p.id, wamid: `${TAG}-recall-${i}`, direction: 'outbound', purpose: 'recall', template_name: 'te_echamos_de_menos', status: i % 4 === 0 ? 'delivered' : 'read', body_preview: `Hola ${p.first_name}, hace tiempo que no te vemos por la clínica. ¿Te reservamos una visita?`, created_at: iso(at), phone_number: phoneOf.get(p.id) ?? null, channel: 'whatsapp', rule_id: rule.id })
    if (i % 2 === 0) wa.push({ account_id: accountId, patient_id: p.id, wamid: `${TAG}-recall-reply-${i}`, direction: 'inbound', status: 'received', body_preview: i % 4 === 0 ? 'Sí, ¿tenéis hueco la semana que viene?' : 'Gracias, os escribo cuando pueda', created_at: iso(at + 3 * 3_600_000), phone_number: phoneOf.get(p.id) ?? null, channel: 'whatsapp' })
  }
  // ---- A month of reminder and confirmation deliveries (Recordatorios programados)
  const statuses = [...Array(18).fill('read'), ...Array(7).fill('delivered'), 'sent', 'sent', 'failed', 'failed']
  const monthFirst = new Date()
  monthFirst.setDate(1)
  monthFirst.setHours(8, 0, 0, 0)
  const span = Math.max(DAY, now - 3_600_000 - monthFirst.getTime())
  statuses.forEach((status, i) => {
    const p = pick(i * 2 + 1)
    const purpose = i % 3 === 0 ? 'confirmation' : 'reminder'
    wa.push({
      account_id: accountId,
      patient_id: p.id,
      wamid: `${TAG}-wa-${i}`,
      direction: 'outbound',
      purpose,
      template_name: purpose === 'confirmation' ? 'confirmacion_cita' : 'recordatorio_cita',
      status,
      error_code: status === 'failed' ? (i % 2 ? '131026' : '131049') : null,
      body_preview: purpose === 'confirmation' ? `Hola ${p.first_name}, te esperamos en Clínica Demo. ¿Confirmas tu cita?` : `Hola ${p.first_name}, te recordamos tu cita de mañana en Clínica Demo.`,
      created_at: iso(monthFirst.getTime() + (span * i) / statuses.length),
      phone_number: phoneOf.get(p.id) ?? null,
      channel: 'whatsapp',
    })
  })
  ok(await admin.from('whatsapp_messages').insert(wa), 'whatsapp')

  console.log(`  reports: ${made} facturas issued${refundOf ? ', refund added' : ''}`)
}
