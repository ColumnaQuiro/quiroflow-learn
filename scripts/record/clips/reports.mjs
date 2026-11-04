// Clips for the Reports articles (understanding-your-reports, income-and-payments,
// appointment-reports, commissions, daily-transactions, debtors-and-memberships,
// facturas-and-gestoria, data-exports, retention-and-recalls, statistics,
// referrals, communications, scheduled reminders, report-pages). See ../README.md.
//
// Needs `node scripts/record/seed.mjs reports` first. Reports are read-only, so
// nearly every clip just opens a report, changes the period or a filter, hovers
// a chart and opens a breakdown. The three that change something put their data
// back in prepare(): the pay plan (commissions), a referral's detail (referrals)
// and the report pages (index tour, create, add a block).
import { demo } from './calendar/shared.mjs'

// --- helpers ----------------------------------------------------------------

/** Waits until every loading skeleton on the page is gone, then lets the figures settle. */
async function settle(h, extra = 500) {
  await h.page.waitForTimeout(300)
  await h.page.locator('.skeleton-shimmer').first().waitFor({ state: 'detached', timeout: 30000 }).catch(() => {})
  await h.page.waitForTimeout(extra)
}

/** Opens the period menu (the button showing the current period) and picks a preset. */
async function period(h, from, to) {
  await h.click(h.page.getByRole('button', { name: from, exact: true }).first())
  await h.click(h.page.getByRole('button', { name: to, exact: true }).first(), { after: 400 })
  await settle(h)
}

/** Opens the period menu and fills in a custom range. Dates are YYYY-MM-DD. */
async function customRange(h, from, fromDate, toDate) {
  await h.click(h.page.getByRole('button', { name: from, exact: true }).first())
  const inputs = h.page.locator('input[type="date"]')
  await inputs.nth(0).fill(fromDate)
  await h.pause(500)
  await inputs.nth(1).fill(toDate)
  await h.pause(500)
  await h.click(h.page.getByRole('button', { name: 'Aplicar', exact: true }), { after: 400 })
  await settle(h)
}

/** Picks a practitioner in the report's filter. */
async function practitioner(h, name) {
  await h.select(h.page.locator('[data-cy="report-practitioner-filter"]'), { label: name })
  await settle(h)
}

/** Glides the pointer across a chart so its tooltip follows. */
async function sweep(h, canvas, xs = [0.12, 0.3, 0.5, 0.7, 0.88], { y = 0.5, rest = 750 } = {}) {
  await canvas.scrollIntoViewIfNeeded()
  const box = await canvas.boundingBox()
  if (!box) throw new Error('no chart to hover')
  for (const x of xs) {
    await h.page.mouse.move(box.x + box.width * x, box.y + box.height * y, { steps: 18 })
    await h.page.waitForTimeout(rest)
  }
}

/** Scrolls the page's own scroller a little, from over the content. */
async function scrollMain(h, dy) {
  await h.page.mouse.move(760, 460, { steps: 6 })
  await h.scroll(dy)
}

/** The report pages the clips make. Gone before each clip that needs them fresh. */
const PAGE_NAMES = ['Gestión mensual', 'Rendimiento por profesional', 'Resumen del mes']
async function dropReportPages() {
  const { admin, accountId } = await demo()
  await admin.from('report_pages').delete().eq('account_id', accountId).in('name', PAGE_NAMES)
  // The block clip saves its report to the library too (the box is ticked by default).
  await admin.from('custom_reports').delete().eq('account_id', accountId).eq('name', 'Ingresos cobrados por profesional')
}

/** Makes a report page through the real dialog (not recorded), leaving the browser on /reports. */
async function makePage(h, name, templateKey) {
  await h.page.goto(new URL('/reports', h.page.url()).toString(), { waitUntil: 'networkidle' })
  await h.page.locator('[data-cy="report-page-new"]').click()
  await h.page.locator('[data-cy="report-page-create-name"]').fill(name)
  await h.page.locator('[data-cy="report-page-create-template"]').selectOption(templateKey)
  await h.page.getByRole('button', { name: 'Crear', exact: true }).click()
  await h.page.waitForURL(/\/reports\/pages\//, { timeout: 20000 })
  await h.page.locator('[data-cy="report-page-grid"]').waitFor({ timeout: 20000 })
  await settle(h, 300)
}

// --- the clips ----------------------------------------------------------------

export default [
  // understanding-your-reports -----------------------------------------------
  {
    id: 'reports--index-tour',
    path: '/reports',
    ready: 'text=Informes estándar',
    async prepare(h) {
      await dropReportPages()
      await makePage(h, 'Gestión mensual', 'monthly')
      await h.page.goto(new URL('/reports', h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="report-page-card"]').first().waitFor({ timeout: 20000 })
      await settle(h)
    },
    async run(h) {
      await h.pause(600)
      await h.hover(h.page.locator('[data-cy="report-page-card"]').first())
      await h.pause(700)
      await scrollMain(h, 520)
      await h.hover(h.page.getByText('Rendimiento de ingresos', { exact: true }).first())
      await scrollMain(h, 520)
      await h.hover(h.page.getByText('Ingresos y pagos', { exact: true }).first())
      await scrollMain(h, 560)
      await h.hover(h.page.getByText('Facturas emitidas', { exact: true }).first())
      await h.pause(900)
    },
    hold: 1800,
  },

  {
    id: 'reports--period-and-filters',
    path: '/reports/statistics',
    ready: 'text=Primeras visitas',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.getByRole('button', { name: 'Este mes', exact: true }).first())
      await h.pause(500)
      await h.click(h.page.getByRole('button', { name: 'Mes pasado', exact: true }).first(), { after: 400 })
      await settle(h, 900)
      await h.click(h.page.getByRole('button', { name: 'Mes pasado', exact: true }).first())
      const inputs = h.page.locator('input[type="date"]')
      await inputs.nth(0).fill('2026-09-01')
      await h.pause(500)
      await inputs.nth(1).fill('2026-10-15')
      await h.pause(600)
      await h.click(h.page.getByRole('button', { name: 'Aplicar', exact: true }), { after: 400 })
      await settle(h, 900)
      await practitioner(h, 'Álex Prieto')
      await h.moveAway()
      await h.pause(1000)
    },
    hold: 1800,
  },

  // income-and-payments -------------------------------------------------------
  {
    id: 'reports--income',
    path: '/reports/income',
    ready: 'text=Total facturado',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(500)
      await period(h, 'Este mes', 'Mes pasado')
      await h.hover(h.page.getByText('Total pagado', { exact: true }).first())
      await h.pause(600)
      await practitioner(h, 'Álex Prieto')
      await h.hover(h.page.getByText('Total pagado', { exact: true }).first())
      await h.pause(600)
      await scrollMain(h, 480)
      const canvases = h.page.locator('main canvas')
      await sweep(h, canvases.nth(1), [0.2, 0.4, 0.6, 0.8], { rest: 700 })
      await h.pause(800)
    },
    hold: 1800,
  },

  {
    id: 'reports--income-performance',
    path: '/reports/income-performance',
    ready: 'text=Ingresos por profesional, por mes',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(500)
      await customRange(h, 'Este mes', '2026-05-01', '2026-11-04')
      await h.pause(600)
      await sweep(h, h.page.locator('main canvas').first(), [0.1, 0.28, 0.46, 0.64, 0.82, 0.95], { rest: 800 })
      await scrollMain(h, 360)
      await h.pause(1200)
    },
    hold: 1800,
  },

  // appointment-reports -------------------------------------------------------
  {
    id: 'reports--upcoming-visits',
    path: '/reports/upcoming-visits',
    ready: 'text=Total este mes',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(600)
      await sweep(h, h.page.locator('main canvas').first(), [0.15, 0.4, 0.65, 0.88], { rest: 650 })
      await h.click(h.page.getByRole('button', { name: 'Mes siguiente' }), { after: 300 })
      await settle(h, 900)
      await sweep(h, h.page.locator('main canvas').first(), [0.2, 0.5, 0.8], { rest: 650 })
      await h.click(h.page.locator('#main-content').getByRole('button', { name: 'Hoy', exact: true }), { after: 300 })
      await settle(h, 600)
      await scrollMain(h, 420)
      await sweep(h, h.page.locator('main canvas').nth(1), [0.2, 0.4, 0.6, 0.8], { rest: 650 })
      await h.pause(600)
    },
    hold: 1800,
  },

  {
    id: 'reports--patient-flow',
    path: '/reports/patient-flow',
    ready: 'text=Visitas registradas',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(500)
      await period(h, 'Este mes', 'Mes pasado')
      await h.hover(h.page.getByText('Espera media', { exact: true }).first())
      await h.hover(h.page.getByText('Consulta media', { exact: true }).first())
      await scrollMain(h, 420)
      await h.hover(h.page.getByText('La visita, etapa por etapa', { exact: true }).first())
      await scrollMain(h, 520)
      await h.hover(h.page.getByText('Por profesional', { exact: true }).first())
      await h.pause(1200)
    },
    hold: 1800,
  },

  {
    id: 'reports--appointment-distribution',
    path: '/reports/appointment-distribution',
    ready: 'text=Por turno, por resultado',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(500)
      await period(h, 'Este mes', 'Mes pasado')
      await h.hover(h.page.getByText(/^Mañana/).first())
      await h.hover(h.page.getByText(/^Tarde/).first())
      await scrollMain(h, 420)
      await sweep(h, h.page.locator('main canvas').first(), [0.25, 0.5, 0.75], { rest: 700 })
      await scrollMain(h, 420)
      await sweep(h, h.page.locator('main canvas').nth(1), [0.1, 0.3, 0.5, 0.7, 0.9], { rest: 600 })
      await h.pause(600)
    },
    hold: 1800,
  },

  // commissions -----------------------------------------------------------------
  {
    id: 'reports--commissions-setup',
    path: '/reports/commissions',
    ready: '[data-cy="commissions-row"]',
    async prepare(h) {
      const { admin, ines } = await demo()
      await admin.from('pay_plans').delete().eq('team_member_id', ines.id)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="commissions-row"]').first().waitFor({ timeout: 20000 })
      await settle(h)
    },
    async run(h) {
      const row = h.page.locator('[data-cy="commissions-row"]').filter({ hasText: 'Inés Ramos' })
      await h.pause(500)
      await h.click(row.locator('[data-cy="commissions-edit"]'))
      await h.type(h.page.locator('[data-cy="pay-base"]'), '600')
      await h.type(h.page.locator('[data-cy="pay-payments-pct"]'), '10')
      await h.type(h.page.locator('[data-cy="pay-new-patient"]'), '25')
      await h.type(h.page.locator('[data-cy="pay-sales-pct"]'), '5')
      await h.click(h.page.locator('[data-cy="pay-save"]'), { after: 400 })
      await h.page.locator('[data-cy="pay-plan-editor"]').waitFor({ state: 'detached', timeout: 15000 })
      await settle(h, 700)
      await h.click(row)
      await h.page.locator('[data-cy="commissions-detail"]').waitFor({ timeout: 10000 })
      await h.moveAway()
      await h.pause(1200)
    },
    hold: 1800,
  },

  // daily-transactions ----------------------------------------------------------
  {
    id: 'reports--daily-transactions',
    path: '/reports/daily-transactions',
    ready: 'text=Neto cobrado',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(500)
      await h.hover(h.page.getByText('Neto cobrado', { exact: true }).first())
      await h.pause(500)
      await scrollMain(h, 300)
      await h.pause(600)
      await scrollMain(h, -300)
      await h.click(h.page.getByRole('button', { name: 'Día anterior' }), { after: 300 })
      await settle(h, 800)
      await h.hover(h.page.getByText('Neto cobrado', { exact: true }).first())
      await h.pause(700)
      await scrollMain(h, 300)
      await h.pause(800)
    },
    hold: 1800,
  },

  // statistics ------------------------------------------------------------------
  {
    id: 'reports--statistics',
    path: '/reports/statistics',
    ready: 'text=Primeras visitas',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(500)
      await period(h, 'Este mes', 'Mes pasado')
      await h.hover(h.page.getByText('Total de visitas completadas', { exact: true }).first())
      await h.hover(h.page.getByText('PVA (visitas / paciente nuevo)', { exact: true }).first())
      await scrollMain(h, 560)
      await h.hover(h.page.getByText('Mes a mes', { exact: true }).first())
      await sweep(h, h.page.locator('main canvas').first(), [0.1, 0.28, 0.46, 0.64, 0.82, 0.95], { rest: 750 })
      await h.pause(800)
    },
    hold: 1800,
  },

  // referrals -------------------------------------------------------------------
  {
    id: 'reports--referrals',
    path: '/reports/referrals',
    ready: '[data-cy="referrals-row"]',
    async prepare(h) {
      const { admin, accountId } = await demo()
      for (const [first, last] of [['Clara', 'Iglesias Rubio'], ['Fernando', 'Mateu Sáez'], ['Samuel', 'Climent Pascual']]) {
        await admin.from('patients').update({ referral_rewarded_at: null }).eq('account_id', accountId).eq('first_name', first).eq('last_name', last)
      }
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="referrals-row"]').first().waitFor({ timeout: 20000 })
      await settle(h)
    },
    async run(h) {
      await h.pause(500)
      await h.hover(h.page.locator('[data-cy="referrals-top"]'))
      await h.pause(600)
      await h.hover(h.page.locator('[data-cy="referrals-owed"]'))
      await h.pause(500)
      await h.click(h.page.locator('[data-cy="referrals-mark"]').first(), { after: 400 })
      await settle(h, 600)
      await h.hover(h.page.locator('[data-cy="referrals-owed"]'))
      await h.moveAway()
      await h.pause(1200)
    },
    hold: 1800,
  },

  // communications --------------------------------------------------------------
  {
    id: 'reports--communications',
    path: '/reports/communications',
    ready: '[data-cy="comms-row"]',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(600)
      await h.type(h.page.locator('[data-cy="comms-search"]'), 'Víctor')
      await settle(h, 700)
      await h.select(h.page.locator('[data-cy="comms-channel"]'), { label: 'WhatsApp' })
      await settle(h, 500)
      await h.select(h.page.locator('[data-cy="comms-status"]'), { label: 'Fallido' })
      await settle(h, 900)
      await h.hover(h.page.locator('[data-cy="comms-row"]').first())
      await h.moveAway()
      await h.pause(1200)
    },
    hold: 1800,
  },

  // debtors & memberships -------------------------------------------------------
  {
    id: 'reports--debtors',
    path: '/reports/debtors',
    ready: 'text=Total pendiente',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(600)
      await h.hover(h.page.getByText('Total pendiente', { exact: false }).first())
      await h.pause(600)
      const rows = h.page.locator('main tbody tr')
      await h.hover(rows.nth(1))
      await h.pause(500)
      await h.click(rows.nth(1).locator('a').first(), { after: 300 })
      await h.page.waitForURL(/\/patients\//, { timeout: 20000 })
      await settle(h, 900)
      await h.click(h.page.locator('#main-content').getByText('Dinero', { exact: true }).first(), { after: 300 })
      await settle(h, 1000)
      await h.moveAway()
      await h.pause(1000)
    },
    hold: 1800,
  },

  {
    id: 'reports--memberships',
    path: '/reports/memberships',
    ready: 'text=Membresías activas',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(600)
      await h.hover(h.page.getByText('Membresías activas', { exact: true }).first())
      await h.hover(h.page.getByText('Ingresos este mes (pagado)', { exact: true }).first())
      await h.hover(h.page.getByText('Pagos fallidos (histórico)', { exact: true }).first())
      await h.pause(500)
      const rows = h.page.locator('main tbody tr')
      await h.hover(rows.nth(0))
      await h.pause(500)
      await h.hover(rows.nth(2))
      await h.pause(500)
      await h.click(rows.nth(1).locator('a').first(), { after: 300 })
      await h.page.waitForURL(/\/patients\//, { timeout: 20000 })
      await settle(h, 900)
      await h.moveAway()
      await h.pause(1200)
    },
    hold: 1800,
  },

  // facturas & gestoría ---------------------------------------------------------
  {
    id: 'reports--facturas',
    path: '/reports/facturas',
    ready: '[data-cy="facturas-row"]',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(500)
      await period(h, 'Este mes', 'Mes pasado')
      await h.hover(h.page.locator('[data-cy="facturas-total"]'))
      await h.pause(500)
      await h.click(h.page.getByRole('button', { name: /^Completa · / }), { after: 300 })
      await settle(h, 700)
      await h.click(h.page.getByRole('button', { name: /^Todas · / }), { after: 300 })
      await settle(h, 500)
      await h.type(h.page.locator('[data-cy="facturas-search"]'), 'Sancho')
      await settle(h, 800)
      await h.click(h.page.locator('[data-cy="facturas-csv"]'), { after: 1400 })
      await h.moveAway()
      await h.pause(800)
    },
    hold: 1800,
  },

  {
    id: 'reports--gestoria',
    path: '/reports/gestoria',
    ready: '[data-cy="gestoria-count"]',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.locator('[data-cy="gestoria-q3"]'), { after: 300 })
      await settle(h, 900)
      await h.hover(h.page.locator('[data-cy="gestoria-iva-total"]'))
      await h.pause(600)
      await h.hover(h.page.locator('[data-cy="gestoria-methods"]'))
      await h.pause(600)
      await scrollMain(h, 420)
      await h.click(h.page.locator('[data-cy="gestoria-download"]'), { after: 1800 })
      await h.moveAway()
      await h.pause(800)
    },
    hold: 1800,
  },

  // data-exports ----------------------------------------------------------------
  {
    id: 'reports--data-exports',
    path: '/reports/data-exports',
    ready: 'text=Generar nueva exportación',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.getByLabel('Sin próxima cita'), { after: 500 })
      await h.hover(h.page.getByText(/pacientes coinciden ahora mismo/).first())
      await h.pause(700)
      await h.click(h.page.getByRole('button', { name: 'Generar exportación' }), { after: 1200 })
      await h.page.getByText('Generado en esta sesión').waitFor({ timeout: 15000 })
      await scrollMain(h, 320)
      await h.hover(h.page.getByText('Descargar CSV', { exact: true }).first())
      await h.pause(1000)
    },
    hold: 1800,
  },

  // retention & recalls ---------------------------------------------------------
  {
    id: 'reports--retention',
    path: '/reports/retention',
    ready: '[data-cy="retention-new"]',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(600)
      await h.hover(h.page.locator('[data-cy="retention-new"]'))
      await h.hover(h.page.locator('[data-cy="retention-came-back"]'))
      await h.hover(h.page.locator('[data-cy="retention-90"]'))
      await h.hover(h.page.locator('[data-cy="retention-rebooked"]'))
      await scrollMain(h, 620)
      await h.hover(h.page.locator('[data-cy="retention-stops"]'))
      await scrollMain(h, 620)
      await h.hover(h.page.locator('[data-cy="retention-cohorts"]'))
      await h.pause(500)
      await h.hover(h.page.locator('[data-cy="retention-cohort-row"]').nth(1))
      await h.pause(900)
    },
    hold: 1800,
  },

  {
    id: 'reports--recalls',
    path: '/reports/recalls',
    ready: '[data-cy="recalls-report"]',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(500)
      await period(h, 'Este mes', 'Últimos 30 días')
      await h.hover(h.page.locator('[data-cy="recalls-contacted"]'))
      await h.hover(h.page.locator('[data-cy="recalls-replied"]'))
      await h.hover(h.page.locator('[data-cy="recalls-booked"]'))
      await scrollMain(h, 420)
      await h.hover(h.page.locator('[data-cy="recalls-by-rule"]'))
      await h.pause(500)
      await h.click(h.page.getByRole('button', { name: /^Reservó · / }), { after: 300 })
      await settle(h, 800)
      await h.moveAway()
      await h.pause(900)
    },
    hold: 1800,
  },

  // scheduled reminders ---------------------------------------------------------
  {
    id: 'reports--scheduled-reminders',
    path: '/reports/scheduled-reminders',
    ready: 'text=Estado de entrega de WhatsApp',
    async prepare(h) {
      await settle(h)
    },
    async run(h) {
      await h.pause(600)
      await h.hover(h.page.getByText('Leídos', { exact: true }).first())
      await h.hover(h.page.getByText('Fallidos', { exact: true }).first())
      await h.pause(500)
      await scrollMain(h, 380)
      await h.hover(h.page.getByText('Confirmaciones de citas', { exact: true }).first())
      await h.pause(600)
      await h.click(h.page.locator('#main-content a[href*="/patients/"]').first(), { after: 300 })
      await h.page.waitForURL(/\/patients\//, { timeout: 20000 })
      await settle(h, 900)
      await h.moveAway()
      await h.pause(1000)
    },
    hold: 1800,
  },

  // report pages ----------------------------------------------------------------
  {
    id: 'reports--report-page-create',
    path: '/reports',
    ready: '[data-cy="report-page-new"]',
    async prepare(h) {
      await dropReportPages()
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="report-page-new"]').waitFor()
      await settle(h)
    },
    async run(h) {
      await h.pause(500)
      await h.click(h.page.locator('[data-cy="report-page-new"]'))
      await h.select(h.page.locator('[data-cy="report-page-create-template"]'), { value: 'monthly' })
      await h.pause(700)
      await h.click(h.page.getByText('Todos en la clínica con acceso a informes'), { after: 500 })
      await h.click(h.page.getByRole('button', { name: 'Crear', exact: true }), { after: 400 })
      await h.page.waitForURL(/\/reports\/pages\//, { timeout: 20000 })
      await h.page.locator('[data-cy="report-page-grid"]').waitFor({ timeout: 20000 })
      await settle(h, 1200)
      await h.moveAway()
      await h.pause(800)
    },
    hold: 1800,
  },

  {
    id: 'reports--report-page-block',
    path: '/reports',
    ready: '[data-cy="report-page-new"]',
    async prepare(h) {
      await dropReportPages()
      await makePage(h, 'Resumen del mes', 'practitioners')
    },
    async run(h) {
      await h.pause(600)
      await h.click(h.page.locator('[data-cy="report-page-edit"]'))
      await h.click(h.page.locator('[data-cy="report-page-add"]'), { after: 500 })
      await h.click(h.page.locator('[data-cy="report-add-new"]'), { after: 500 })
      await h.type(h.page.locator('[data-cy="report-builder-search"]'), 'ingresos')
      await h.click(h.page.locator('[data-cy="report-metric-income_paid"]'), { after: 400 })
      await h.click(h.page.locator('[data-cy="report-split-practitioner"]'), { after: 400 })
      await h.click(h.page.locator('[data-cy="report-chart-bar"]'), { after: 900 })
      await h.click(h.page.locator('[data-cy="report-builder-add"]'), { after: 600 })
      await settle(h, 1000)
      await h.click(h.page.locator('[data-cy="report-page-done"]'), { after: 600 })
      await settle(h, 800)
      await h.moveAway()
      await h.pause(800)
    },
    hold: 1800,
  },
]
