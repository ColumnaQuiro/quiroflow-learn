// Clips for the billing articles: billing-payments (the Billing page, taking a
// payment, credit, bonos, memberships, products, gift vouchers, third parties,
// the cash shift, stored cards), the Settings pages that feed them, and
// invoices-verifactu. See ../README.md.
//
// Needs `node scripts/record/seed.mjs billing` first. Every clip that consumes
// invented data creates it again in prepare(), so each can be re-recorded on its
// own as often as needed. Nothing reaches Stripe or the AEAT: prepare() fakes
// those requests with page.route().
import { demo, pid, makeReceipt, makePaidReceipt, clearUnpaid, openMoney, go, scrollMain, scrollToEl, wipeMoney, parkFacturas, issueFacturaFor, giveBono, makeVisit, openCalendarDay, optionLike, must, ejemplo, signInAsEjemplo } from './billing/shared.mjs'

export default [
  // the-billing-page ------------------------------------------------------------
  {
    id: 'billing--find-unpaid',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      await clearUnpaid(['nerea', 'unai', 'hector', 'olga'])
      const olga = await pid('olga')
      const hector = await pid('hector')
      const nerea = await pid('nerea')
      await makeReceipt(hector, [{ description: 'Informe clínico', price_cents: 6000 }], { hoursAgo: 72, ref: 'help-unpaid-1' })
      await makeReceipt(olga, [{ description: 'Revisión', price_cents: 3500 }], { hoursAgo: 48, ref: 'help-unpaid-2' })
      await makeReceipt(nerea, [{ description: 'Sesión de osteopatía', price_cents: 2500 }], { hoursAgo: 5, ref: 'help-unpaid-3' })
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="billing-row"]').first().waitFor({ timeout: 20000 })
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.getByRole('button', { name: /^Pagadas/ }), { after: 1100 })
      await h.click(h.page.getByRole('button', { name: /^Impagadas/ }), { after: 1000 })
      await h.select(h.page.locator('[data-cy="billing-sort"]'), { label: 'Mayor importe' })
      await h.pause(1800)
      await h.moveAway()
    },
  },

  {
    id: 'billing--quick-receipt',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      await clearUnpaid(['olga'])
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('+ Recibo rápido').first().waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: '+ Recibo rápido' }))
      await h.type(h.page.getByPlaceholder('Buscar pacientes…'), 'Olga Ferrer')
      await h.click(h.page.locator('li', { hasText: 'Olga Ferrer Zamora' }).first())
      await h.select(h.page.locator('select').first(), { label: 'Informe clínico' })
      await h.pause(500)
      await h.click(h.page.getByRole('button', { name: '+ Añadir línea' }))
      await h.type(h.page.getByPlaceholder('Descripción').nth(1), 'Copia del historial')
      await h.type(h.page.getByPlaceholder('0.00').nth(1), '15')
      await h.hover(h.page.getByText('Total:').first())
      await h.pause(900)
      await h.click(h.page.getByRole('button', { name: 'Crear recibo' }), { after: 500 })
      await h.page.getByText('Total a pagar').first().waitFor({ timeout: 20000 })
      await h.moveAway()
      await h.pause(1200)
    },
  },
  {
    id: 'billing--receipt-page',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      await clearUnpaid(['nerea'])
      const r = await makeReceipt(await pid('nerea'), [{ description: 'Sesión de osteopatía', price_cents: 4500 }], { hoursAgo: 1 })
      await go(h, `/billing/${r.id}`)
      await h.page.getByRole('button', { name: 'Registrar pago' }).waitFor({ timeout: 20000 })
      await scrollMain(h)
    },
    async run(h) {
      await h.pause(700)
      const amount = h.page.getByLabel('Importe (€)')
      await amount.fill('')
      await h.type(amount, '20')
      await h.select(h.page.getByLabel('Método'), { label: 'Efectivo' })
      await h.click(h.page.getByRole('button', { name: 'Registrar pago' }), { after: 1800 })
      await scrollMain(h)
      await h.pause(1400)
      await h.click(h.page.getByRole('button', { name: 'Marcar como pagada' }), { after: 1500 })
      await h.scroll(700, { at: h.page.getByText('Total a pagar').first() })
      await h.moveAway()
    },
  },

  // taking-a-payment -------------------------------------------------------------
  {
    id: 'billing--split-payment',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const hector = await pid('hector')
      await clearUnpaid(['hector'])
      await makeReceipt(hector, [{ description: 'Sesión de osteopatía', price_cents: 4500 }, { description: 'Crema de árnica', price_cents: 1200 }, { description: 'Revisión', price_cents: 2300 }], { hoursAgo: 1 })
      await openMoney(h, hector)
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.getByRole('button', { name: 'Registrar pago' }).first())
      const amount0 = h.page.locator('[id$="-amount-0"]')
      await amount0.fill('')
      await h.type(amount0, '50')
      await h.select(h.page.locator('[id$="-method-0"]'), { label: 'Efectivo' })
      await h.click(h.page.getByText('Dividir en otro método'))
      const amount1 = h.page.locator('[id$="-amount-1"]')
      await h.type(amount1, '30')
      await h.select(h.page.locator('[id$="-method-1"]'), { label: 'Tarjeta' })
      await h.hover(h.page.getByText('Total:').first())
      await h.pause(900)
      await h.click(h.page.getByRole('button', { name: 'Registrar pago' }).last(), { after: 1800 })
      await h.moveAway()
    },
  },

  // credit-and-statements ---------------------------------------------------------
  {
    id: 'billing--add-credit',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const olga = await pid('olga')
      await wipeMoney(olga, ['credits'])
      await clearUnpaid(['olga'])
      await openMoney(h, olga)
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.getByRole('button', { name: 'Añadir crédito' }).first())
      await h.type(h.page.getByLabel('Importe (€)'), '30')
      await h.select(h.page.getByLabel('Método'), { label: 'Tarjeta' })
      await h.type(h.page.getByPlaceholder(/regalo de cumpleaños/), 'Regalo de cumpleaños')
      await h.click(h.page.getByRole('button', { name: 'Añadir crédito' }).last(), { after: 600 })
      await h.page.getByText('30,00 €').first().waitFor({ timeout: 20000 })
      await h.moveAway()
      await h.pause(1200)
    },
  },
  {
    id: 'billing--write-off',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const sofia = await pid('sofia')
      await makePaidReceipt(sofia, [{ description: 'Sesión de osteopatía', price_cents: 4000 }], { paid: 3500, ref: 'help-writeoff' })
      await openMoney(h, sofia)
      h.page.on('dialog', (d) => d.accept())
      await scrollMain(h)
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.locator('tr', { hasText: 'Recibo' }).first())
      await h.click(h.page.getByRole('button', { name: /^Condonar/ }), { after: 600 })
      await h.page.getByRole('button', { name: /^Condonar/ }).waitFor({ state: 'hidden', timeout: 20000 })
      await h.pause(900)
      await h.scroll(-1200, { at: h.page.getByText('Libro de cuenta').last() })
      await h.moveAway()
      await h.pause(600)
    },
  },

  // invoices-verifactu: the documents ------------------------------------------------
  {
    id: 'invoices--facturas-tab',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const irene = await pid('irene')
      await parkFacturas(irene)
      await clearUnpaid(['irene'])
      await makePaidReceipt(irene, [{ description: 'Revisión', price_cents: 3500 }], { hoursAgo: 96, method: 'card', ref: 'help-fact-1' })
      await makePaidReceipt(irene, [{ description: 'Sesión de osteopatía', price_cents: 4500 }], { hoursAgo: 48, method: 'cash', ref: 'help-fact-2' })
      await makePaidReceipt(irene, [{ description: 'Programa de rehabilitación', price_cents: 42000 }], { hoursAgo: 24, method: 'transfer', ref: 'help-fact-3' })
      await openMoney(h, irene)
      await scrollMain(h)
    },
    async run(h) {
      await h.pause(1500)
      await h.click(h.page.getByRole('button', { name: 'Facturas y recibos' }), { after: 1500 })
      await h.scroll(420, { at: h.page.getByText('Una por cada pago recibido').first() })
      await h.pause(1200)
      await h.hover(h.page.getByRole('link', { name: 'PDF' }).first())
      await h.pause(1200)
      await h.hover(h.page.getByText('Enviar', { exact: true }).first())
      await h.pause(1200)
    },
    hold: 1600,
  },
  {
    id: 'invoices--refund',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const mario = await pid('mario')
      await parkFacturas(mario)
      const { admin } = await demo()
      const { data: old } = await admin.from('invoices').select('id').eq('patient_id', mario)
      for (const o of old ?? []) await admin.from('payments').delete().eq('invoice_id', o.id)
      for (const o of old ?? []) await admin.from('invoices').delete().eq('id', o.id)
      await makePaidReceipt(mario, [{ description: 'Sesión de osteopatía', price_cents: 4500 }], { hoursAgo: 4, method: 'cash', ref: 'help-refund' })
      await openMoney(h, mario)
      await scrollMain(h)
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.getByRole('button', { name: 'Reembolsar…' }).first())
      await h.pause(900)
      await h.select(h.page.getByLabel('Reembolsado vía'), { label: 'Efectivo' })
      await h.type(h.page.getByPlaceholder(/canceló el bono/), 'El paciente canceló el tratamiento')
      await h.click(h.page.getByRole('button', { name: 'Reembolso', exact: true }), { after: 1600 })
      await h.click(h.page.getByRole('button', { name: 'Facturas y recibos' }), { after: 1000 })
      await h.scroll(420, { at: h.page.getByText('Una por cada pago recibido').first() })
      await h.pause(1400)
    },
    hold: 1000,
  },
  {
    id: 'invoices--annul',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const ainara = await pid('ainara')
      await parkFacturas(ainara)
      const { admin } = await demo()
      const { data: old } = await admin.from('invoices').select('id').eq('patient_id', ainara)
      for (const o of old ?? []) await admin.from('payments').delete().eq('invoice_id', o.id)
      for (const o of old ?? []) await admin.from('invoices').delete().eq('id', o.id)
      await makePaidReceipt(ainara, [{ description: 'Sesión de osteopatía', price_cents: 4500 }], { hoursAgo: 4, method: 'cash', ref: 'help-annul' })
      await openMoney(h, ainara)
      h.page.on('dialog', (d) => d.accept())
      await scrollMain(h)
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.locator('tr', { hasText: 'Pago' }).first())
      await h.click(h.page.getByRole('button', { name: 'Eliminar pago' }), { after: 1600 })
      await h.click(h.page.getByRole('button', { name: 'Facturas y recibos' }), { after: 1000 })
      await h.scroll(420, { at: h.page.getByText('Una por cada pago recibido').first() })
      await h.click(h.page.locator('[data-cy="factura-annul"]'), { after: 1000 })
      await h.type(h.page.locator('[data-cy="factura-annul-reason"]'), 'Cobro registrado por error, no se cobró nada')
      await h.click(h.page.getByRole('button', { name: 'Anular factura' }), { after: 1800 })
      await h.moveAway()
    },
  },

  // the Settings pages that feed the money ---------------------------------------------
  {
    id: 'billing--bono-create',
    path: '/settings/packages',
    ready: '[data-cy="package-add"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('packages').delete().eq('account_id', accountId).eq('name', 'Bono espalda 10 sesiones')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="settings-list"][data-ready="true"]').waitFor({ timeout: 20000 })
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="package-add"]'))
      await h.type(h.page.locator('[data-cy="package-name-input"]'), 'Bono espalda 10 sesiones')
      const sessions = h.page.locator('[data-cy="package-sessions-input"]')
      await sessions.fill('')
      await h.type(sessions, '10')
      await h.type(h.page.locator('[data-cy="package-price-input"]'), '400')
      await h.hover(h.page.getByText('por sesión').last())
      await h.pause(900)
      await h.click(h.page.locator('[data-cy="package-save"]'), { after: 1600 })
      await h.moveAway()
    },
  },
  {
    id: 'billing--membership-plan',
    path: '/settings/memberships',
    ready: '[data-cy="membership-add"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('memberships').delete().eq('account_id', accountId).eq('name', 'Pilates terapéutico mensual')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="settings-list"]').waitFor({ timeout: 20000 })
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="membership-add"]'))
      await h.type(h.page.locator('[data-cy="membership-name-input"]'), 'Pilates terapéutico mensual')
      await h.type(h.page.locator('[data-cy="membership-price-input"]'), '59')
      await h.hover(h.page.locator('[data-cy="membership-period-input"]'))
      await h.pause(700)
      await h.click(h.page.locator('[data-cy="membership-save"]'), { after: 1600 })
      await h.moveAway()
    },
  },
  {
    id: 'billing--product-create',
    path: '/settings/products',
    ready: '[data-cy="product-new"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('services_products').delete().eq('account_id', accountId).eq('name', 'Plantillas de silicona')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="products-settings"][data-ready="true"]').waitFor({ timeout: 20000 })
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="product-new"]'))
      await h.type(h.page.locator('[data-cy="product-name"]'), 'Plantillas de silicona')
      await h.type(h.page.locator('[data-cy="product-price"]'), '18')
      const counted = h.page.locator('[data-cy="product-counted"]')
      if (!(await counted.isChecked())) await h.click(counted)
      await h.type(h.page.locator('[data-cy="product-min"]'), '3')
      await h.click(h.page.locator('[data-cy="product-save"]'), { after: 1400 })
      await h.select(h.page.locator('[data-cy="receive-product"]'), { label: 'Plantillas de silicona' })
      await h.type(h.page.locator('[data-cy="receive-units"]'), '10')
      await h.type(h.page.locator('[data-cy="receive-cost"]'), '7')
      await h.type(h.page.locator('[data-cy="receive-supplier"]'), 'Distribuciones Demo')
      await h.click(h.page.locator('[data-cy="receive-save"]'), { after: 1600 })
      await h.moveAway()
    },
  },
  {
    id: 'billing--payment-methods',
    path: '/settings/payments',
    ready: '[data-cy="payments-settings"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('payment_methods').delete().eq('account_id', accountId).eq('key', 'cheque')
      await admin.from('payment_methods').delete().eq('account_id', accountId).eq('name', 'Cheque')
      await admin.from('payment_methods').update({ is_active: true }).eq('account_id', accountId).eq('key', 'other')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="method-row"]').first().waitFor({ timeout: 20000 })
    },
    async run(h) {
      await h.pause(600)
      await h.type(h.page.locator('[data-cy="method-new-name"]'), 'Cheque')
      await h.click(h.page.locator('[data-cy="method-add"]'), { after: 1400 })
      const other = h.page.locator('[data-cy="method-row"]').filter({ hasText: 'Otro' }).locator('[data-cy="method-active"]')
      await h.click(other, { after: 1400 })
      await h.moveAway()
    },
  },
  {
    id: 'billing--gift-settings',
    path: '/settings/gift-vouchers',
    ready: '[data-cy="gift-settings-save"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('gift_voucher_settings').delete().eq('account_id', accountId)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="gift-settings"][data-ready="true"]').waitFor({ timeout: 20000 })
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="gift-enabled"]'), { after: 900 })
      await h.type(h.page.getByLabel('Importe en euros'), '75')
      await h.click(h.page.getByRole('button', { name: 'Añadir', exact: true }), { after: 800 })
      await h.click(h.page.getByLabel(/Permitir otro importe/), { after: 600 })
      await h.click(h.page.locator('label', { hasText: 'Bono 5 sesiones' }).locator('input'), { after: 600 })
      await h.select(h.page.locator('#valid'), { label: '12 meses' })
      await h.click(h.page.locator('[data-cy="gift-settings-save"]'), { after: 1600 })
      await h.moveAway()
    },
  },
  {
    id: 'billing--third-party-create',
    path: '/settings/third-parties',
    ready: '[data-cy="tp-new"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('third_parties').delete().eq('account_id', accountId).eq('name', 'Mutua Costa Azul Demo')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="settings-list"][data-ready="true"]').waitFor({ timeout: 20000 })
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="tp-new"]'))
      await h.type(h.page.locator('[data-cy="tp-name"]'), 'Mutua Costa Azul Demo')
      await h.type(h.page.locator('[data-cy="tp-tax-id"]'), 'A00000001')
      await h.click(h.page.locator('[data-cy="tp-save"]'), { after: 1500 })
      const row = h.page.locator('[data-cy="tp-row"]').filter({ hasText: 'Mutua Costa Azul Demo' })
      await h.select(row.getByLabel('Tipo de visita'), { label: 'Osteopatía' })
      await h.type(row.getByPlaceholder('Paga €'), '28')
      await h.type(row.getByPlaceholder('Copago €'), '17')
      await h.click(row.getByRole('button', { name: 'Añadir tarifa' }), { after: 1600 })
      await h.moveAway()
    },
  },

  // charging a visit and the patient's Money tab ----------------------------------------
  {
    id: 'billing--charge-visit',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      await makeVisit(await pid('pilar'), { ref: 'charge-visit', hm: '08:00', type: 'Revisión' })
      await openCalendarDay(h, '07:30')
    },
    async run(h) {
      await h.click(h.page.locator('[data-cy="appt-block"]').filter({ hasText: 'Navarro' }).first(), { after: 1200 })
      await h.click(h.page.getByRole('tab', { name: 'Cobro' }).or(h.page.getByRole('button', { name: 'Cobro', exact: true })).first(), { after: 1200 })
      await h.click(h.page.getByRole('button', { name: /^Cobrar \d/ }), { after: 1500 })
      await h.hover(h.page.getByText('Saldo pendiente:').first())
      await h.pause(700)
      await h.click(h.page.getByRole('button', { name: 'Procesar' }), { after: 1800 })
      await h.moveAway()
    },
  },
  {
    id: 'billing--sell-bono',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const lucas = await pid('lucas')
      await wipeMoney(lucas, ['bonos'])
      await clearUnpaid(['lucas'])
      await openMoney(h, lucas)
      await scrollToEl(h, h.page.getByText('Bonos', { exact: true }).first(), 110)
    },
    async run(h) {
      await h.pause(600)
      const sell = h.page.locator('[data-cy="sell-package-form"]')
      await h.select(sell.locator('select').first(), await optionLike(sell.locator('select').first(), 'Bono 10 sesiones'))
      const paidNow = sell.getByLabel('Pagado ahora (€)')
      await paidNow.fill('')
      await h.type(paidNow, '190')
      await h.select(sell.getByLabel('Método'), { label: 'Efectivo' })
      await h.click(sell.getByRole('button', { name: 'Vender' }), { after: 1800 })
      await h.click(h.page.getByRole('button', { name: 'Cobrar…' }), { after: 900 })
      const amount = h.page.locator('[id*="collectAmount"]').first()
      await amount.fill('')
      await h.type(amount, '100')
      await h.click(h.page.getByRole('button', { name: 'Registrar pago' }).last(), { after: 1800 })
      await h.moveAway()
    },
  },
  {
    id: 'billing--bono-log-session',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const carmen = await pid('carmen')
      await makeVisit(carmen, { ref: 'bono-log', hm: '08:30', type: 'Revisión' })
      await giveBono(carmen, { paidCents: 38000, used: 3 })
      await openMoney(h, carmen)
      await scrollToEl(h, h.page.getByText('Bonos', { exact: true }).first(), 110)
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.getByRole('button', { name: 'Registrar sesión…' }), { after: 1300 })
      await h.hover(h.page.locator('[data-cy="log-session-summary"]'))
      await h.pause(1000)
      await h.click(h.page.getByRole('button', { name: 'Registrar sesión', exact: true }), { after: 1800 })
      await h.moveAway()
    },
  },
  {
    id: 'billing--bono-share',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const nerea = await pid('nerea')
      await giveBono(nerea, { paidCents: 19000, used: 2 })
      await openMoney(h, nerea)
      await scrollToEl(h, h.page.getByText('Bonos', { exact: true }).first(), 110)
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.getByRole('button', { name: 'Compartir…' }), { after: 900 })
      await h.type(h.page.getByPlaceholder(/con quien compartir/), 'Unai')
      await h.click(h.page.locator('li', { hasText: 'Unai Galán Ortega' }).first(), { after: 1800 })
      await h.moveAway()
    },
  },
  {
    id: 'billing--autopay',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const nerea = await pid('nerea')
      const bono = await giveBono(nerea, { paidCents: 19000, used: 1 })
      const { admin, accountId } = await demo()
      // Nothing reaches Stripe: the card on file and the schedule are answered here.
      await h.page.route('**/api/stripe/card-details', (route) => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ card: { brand: 'visa', last4: '4242', expMonth: 12, expYear: 2030 } }) }))
      await h.page.route('**/api/stripe/create-schedule', async (route) => {
        const body = route.request().postDataJSON()
        const skip = body.installmentsAlreadyPaid ?? 0
        await admin.from('payment_schedules').insert({
          account_id: accountId,
          patient_id: body.patientId,
          package_purchase_id: body.packagePurchaseId,
          stripe_subscription_schedule_id: 'sub_sched_demo0001',
          interval: body.interval,
          interval_count: body.intervalCount,
          installments_total: body.installments,
          installments_paid: skip,
          status: 'active',
        })
        await route.fulfill({ contentType: 'application/json', body: JSON.stringify({ success: true, paymentScheduleId: 'demo', stripeScheduleId: 'sub_sched_demo0001' }) })
      })
      await openMoney(h, nerea)
      await scrollToEl(h, h.page.getByText('Bonos', { exact: true }).first(), 110)
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.getByRole('button', { name: 'Configurar pago automático' }), { after: 900 })
      const installments = h.page.locator('input[title="Plazos"]')
      await installments.fill('')
      await h.type(installments, '2')
      const paid = h.page.locator('input[title="Ya pagado"]')
      await paid.fill('')
      await h.type(paid, '1')
      await h.hover(h.page.locator('input[title="Cada"]'))
      await h.pause(700)
      await h.click(h.page.getByRole('button', { name: 'Iniciar' }), { after: 1800 })
      await h.moveAway()
    },
  },
  {
    id: 'billing--membership-activate',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const bea = await pid('bea')
      await wipeMoney(bea, ['memberships'])
      await openMoney(h, bea)
      await scrollToEl(h, h.page.getByText('Membresías', { exact: true }).first(), 110)
    },
    async run(h) {
      await h.pause(700)
      const form = h.page.locator('[data-cy="activate-membership-form"]')
      await h.select(form.locator('select').first(), await optionLike(form.locator('select').first(), 'Mantenimiento mensual'))
      const paidNow = form.getByLabel('Pagado ahora (€)')
      await paidNow.fill('')
      await h.type(paidNow, '49')
      await h.select(form.getByLabel('Método'), { label: 'Tarjeta' })
      await h.click(form.getByRole('button', { name: 'Activar' }), { after: 1800 })
      await h.moveAway()
    },
  },
  {
    id: 'billing--sell-product',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const dario = await pid('dario')
      const { admin, accountId } = await demo()
      await admin.from('services_products').update({ stock_units: 6 }).eq('account_id', accountId).eq('name', 'Almohada viscoelástica')
      await clearUnpaid(['dario'])
      await openMoney(h, dario)
      await h.page.evaluate(() => window.scrollTo(0, 0))
      await scrollMain(h, 0)
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.locator('[data-cy="sell-product-open"]'), { after: 1100 })
      await scrollToEl(h, h.page.locator('[data-cy="sell-product"]'), 100)
      await h.type(h.page.getByPlaceholder('Buscar producto'), 'Almohada')
      await h.click(h.page.locator('[data-cy="sell-product-add"]').first(), { after: 900 })
      await h.click(h.page.locator('[data-cy="sell-product-more"]').first(), { after: 700 })
      await h.select(h.page.locator('[data-cy="sell-product-method"]'), { label: 'Tarjeta' })
      await h.hover(h.page.locator('[data-cy="sell-product-total"]'))
      await h.pause(700)
      await h.click(h.page.locator('[data-cy="sell-product-submit"]'), { after: 1800 })
      await h.moveAway()
    },
  },

  {
    id: 'billing--gift-redeem',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const olga = await pid('olga')
      const { admin, accountId } = await demo()
      await wipeMoney(olga, ['credits'])
      await clearUnpaid(['olga'])
      await admin.from('gift_vouchers').delete().eq('code', 'REGALO-DEMO4K7Q')
      const [pkg] = (await admin.from('packages').select('id').eq('account_id', accountId).eq('name', 'Bono 5 sesiones')).data
      await admin.from('gift_vouchers').insert({
        account_id: accountId,
        code: 'REGALO-DEMO4K7Q',
        kind: 'amount',
        value_cents: 5000,
        item_name: 'Bono regalo de 50 €',
        to_name: 'Olga',
        from_name: 'Sus compañeras de trabajo',
        message: '¡Feliz cumpleaños!',
        deliver_to: 'buyer',
        buyer_email: 'comprador@example.com',
        status: 'paid',
        paid_at: new Date(Date.now() - 5 * 86400_000).toISOString(),
        expires_at: new Date(Date.now() + 360 * 86400_000).toISOString(),
        sent_at: new Date(Date.now() - 5 * 86400_000).toISOString(),
      })
      void pkg
      await openMoney(h, olga)
      await scrollMain(h, 0)
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.locator('[data-cy="redeem-gift-open"]'), { after: 1000 })
      await h.type(h.page.locator('[data-cy="redeem-gift-code"]'), 'REGALO-DEMO4K7Q')
      await h.click(h.page.locator('[data-cy="redeem-gift-submit"]'), { after: 1800 })
      await h.moveAway()
    },
  },
  {
    id: 'billing--cash-shift',
    path: '/calendar',
    ready: 'text=+ Nueva Cita',
    async prepare(h) {
      const { admin, accountId } = await demo()
      await admin.from('cash_movements').delete().eq('account_id', accountId).eq('note', 'Ingreso en el banco')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Turno de caja' }).first().waitFor({ timeout: 20000 })
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Turno de caja' }).first(), { after: 1500 })
      await h.hover(h.page.locator('[data-cy="shift-expected"]'))
      await h.pause(900)
      await h.select(h.page.getByLabel('Tipo'), { value: 'cash_out' })
      await h.type(h.page.getByLabel('Importe', { exact: true }), '150')
      await h.type(h.page.getByLabel('Nota', { exact: true }), 'Ingreso en el banco')
      await h.click(h.page.getByRole('button', { name: 'Añadir', exact: true }), { after: 1200 })
      await h.hover(h.page.locator('[data-cy="shift-expected"]'))
      await h.pause(1500)
    },
  },
  {
    id: 'billing--third-party-payment',
    path: '/billing/third-parties',
    ready: '[data-cy="tp-aged-row"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      const { data: tp } = await admin.from('third_parties').select('id').eq('account_id', accountId).eq('name', 'Mutua Levante Demo').single()
      await admin.from('third_party_payments').delete().eq('third_party_id', tp.id)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="tp-aged-row"]').first().waitFor({ timeout: 20000 })
    },
    async run(h) {
      await h.click(h.page.getByRole('link', { name: 'Mutua Levante Demo' }), { after: 1400 })
      await h.click(h.page.locator('[data-cy="tp-record-payment"]'), { after: 900 })
      const amount = h.page.locator('[data-cy="tp-payment-amount"]')
      await amount.fill('')
      await h.type(amount, '56')
      await h.type(h.page.getByLabel('Referencia'), 'TRF-2026-1142')
      await h.hover(h.page.locator('[data-cy="tp-payment-line"]').first())
      await h.pause(1100)
      await h.click(h.page.locator('[data-cy="tp-payment-save"]'), { after: 1600 })
      await h.scroll(700, { at: h.page.getByText('Cobros recibidos').first() })
      await h.pause(600)
      // The statement opens in a new tab in the app; here it opens in place so the clip can follow it.
      await h.page.locator('[data-cy="tp-statement-link"]').evaluate((a) => a.removeAttribute('target'))
      await h.click(h.page.locator('[data-cy="tp-statement-link"]'), { after: 2200 })
    },
    hold: 1200,
  },

  // invoices-verifactu / settings: the second practice (Clínica Ejemplo) ----------
  {
    id: 'invoices--fiscal-data',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const { admin, accountId, clinicId } = await ejemplo()
      must(await admin.from('clinics').update({ legal_name: null, tax_id: null, invoice_footer_text: null }).eq('id', clinicId).select('id'), 'clear fiscal data')
      must(await admin.from('accounts').update({ verifactu_mode: 'off', verifactu_production_from: null, verifactu_sender: 'own_certificate' }).eq('id', accountId).select('id'), 'verifactu off')
      await signInAsEjemplo(h, '/settings/invoicing', '[data-cy="fiscal-clinic"]')
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.locator('[data-cy="fiscal-clinic"]').first(), { after: 1300 })
      await h.type(h.page.locator('[data-cy="clinic-legal-name"]'), 'Clínica Ejemplo, S.L.')
      await h.type(h.page.locator('[data-cy="clinic-tax-id"]'), 'B12345674')
      await h.type(h.page.locator('[data-cy="clinic-footer"]'), 'Clínica Ejemplo, S.L. · Inscrita en el Registro Mercantil de Valencia')
      await h.click(h.page.locator('[data-cy="clinic-save"]'), { after: 1500 })
      await h.page.goBack({ waitUntil: 'networkidle' })
      await h.page.getByText('Completo').first().waitFor({ timeout: 15000 })
      await h.pause(600)
    },
    hold: 2200,
  },
  {
    id: 'invoices--receipt-content',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const { admin, accountId } = await ejemplo()
      must(await admin.from('accounts').update({ show_dob_on_invoices: false, show_ssn_on_invoices: false, show_taxes_on_invoices: true, hide_invoice_balance: false, hide_account_balance: false, hide_payments_on_invoices: false, hide_provider_on_invoices: false, hide_next_visit_on_invoices: false, hide_logo_on_invoices: false }).eq('id', accountId).select('id'), 'receipt defaults')
      await signInAsEjemplo(h, '/settings/invoicing', '[data-cy="receipt-show-dob"]')
      await scrollToEl(h, h.page.locator('#h-rec'), 70)
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.locator('[data-cy="receipt-show-dob"]'), { after: 900 })
      await h.click(h.page.locator('[data-cy="receipt-show-ssn"]'), { after: 900 })
      await h.click(h.page.locator('[data-cy="receipt-show-account"]'), { after: 900 })
      await h.click(h.page.locator('[data-cy="receipt-show-next"]'), { after: 1100 })
      await h.click(h.page.locator('[data-cy="invoice-settings-save"]'), { after: 1500 })
    },
    hold: 2200,
  },
  {
    id: 'invoices--verifactu-mode',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const { admin, accountId, clinicId } = await ejemplo()
      // A clinic with its NIF and QuiroFlow sending for it, so the page has nothing to warn about once a mode is on.
      must(await admin.from('clinics').update({ legal_name: 'Clínica Ejemplo, S.L.', tax_id: 'B12345674' }).eq('id', clinicId).select('id'), 'fiscal data')
      must(await admin.from('accounts').update({ verifactu_mode: 'off', verifactu_production_from: null, verifactu_sender: 'apoderamiento' }).eq('id', accountId).select('id'), 'verifactu off')
      must(await admin.from('verifactu_delegations').upsert({ account_id: accountId, route: 'apoderamiento', accepted_at: new Date().toISOString() }).select('account_id'), 'delegation')
      await signInAsEjemplo(h, '/settings/verifactu', '[data-cy="verifactu-settings"]')
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.locator('[data-cy="verifactu-mode-test"]'), { after: 1100 })
      await h.click(h.page.locator('[data-cy="verifactu-save"]'), { after: 1800 })
      await h.hover(h.page.locator('[data-cy="verifactu-facts"]'))
    },
    hold: 2400,
  },
  {
    id: 'invoices--verifactu-who-sends',
    path: '/billing',
    ready: 'text=+ Recibo rápido',
    async prepare(h) {
      const { admin, accountId, clinicId } = await ejemplo()
      must(await admin.from('clinics').update({ legal_name: 'Clínica Ejemplo, S.L.', tax_id: 'B12345674' }).eq('id', clinicId).select('id'), 'fiscal data')
      must(await admin.from('accounts').update({ verifactu_mode: 'test', verifactu_production_from: null, verifactu_sender: 'own_certificate' }).eq('id', accountId).select('id'), 'verifactu test')
      must(await admin.from('verifactu_delegations').delete().eq('account_id', accountId).select('account_id'), 'no delegation')
      await signInAsEjemplo(h, '/settings/verifactu', '[data-cy="verifactu-sender"]')
      await scrollToEl(h, h.page.locator('[data-cy="verifactu-sender"]'), 40)
    },
    async run(h) {
      await h.pause(700)
      await h.click(h.page.locator('[data-cy="verifactu-sender-apoderamiento"]'), { after: 1100 })
      await h.click(h.page.locator('[data-cy="verifactu-sender-save"]'), { after: 1800 })
      await scrollToEl(h, h.page.locator('[data-cy="verifactu-apoderamiento-steps"]'), 260)
      await h.hover(h.page.locator('[data-cy="verifactu-platform-identity"]'))
    },
    hold: 2600,
  },
]
