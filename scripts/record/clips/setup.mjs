// Clips for getting-started, team-roles, settings and security-privacy
// (writer A). See ../README.md.
//
// Most run in the setup practice from ../seed/setup.mjs -- a second, equally
// fictional "Clínica Demo" -- because they add clinics, invite, deactivate and
// switch two-factor on, which would leak into everyone else's clips in the
// shared demo practice. Run `node scripts/record/seed.mjs setup` first.
//
// Order matters a little: Lucía's password clip runs before she enrols in
// two-factor, and the clip that makes two-factor compulsory comes last.
import { writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { adminClient, userClient, setupContext, resetNuria, resetNewcomer, resetFiles, readState, freshTotp, totp, PEOPLE, NEWCOMER, PASSWORD } from '../seed/setup.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const admin = adminClient()

function ok(r, what) {
  if (r.error) throw new Error(`${what}: ${r.error.message}`)
  return r.data
}
/** Two-factor is never left compulsory: every owner clip would land on the code screen. */
async function twoFactorOptional() {
  const { accountId } = await setupContext(admin)
  ok(await admin.from('accounts').update({ require_two_factor: false }).eq('id', accountId), 'optional 2fa')
  // What the own-hours and absence clips leave on Marc would show in every later team screen.
  await admin.from('team_members').update({ business_hours: null }).eq('account_id', accountId)
  await admin.from('staff_absences').delete().eq('account_id', accountId)
  // The "Alicante" clinic the add-clinic clip makes would otherwise show in every later clip's clinic switcher.
  const { data: extra } = await admin.from('clinics').select('id').eq('account_id', accountId).eq('name', 'Alicante')
  for (const c of extra ?? []) {
    await admin.from('team_member_clinics').delete().eq('clinic_id', c.id)
    await admin.from('calendar_resources').delete().eq('clinic_id', c.id)
    await admin.from('clinics').delete().eq('id', c.id)
  }
}
/** Signs in through the real form, off camera. */
async function loginUI(page, email, password = PASSWORD, secret) {
  await page.goto(new URL('/login', page.url()).toString(), { waitUntil: 'networkidle' })
  await page.locator('input[type=email]').fill(email)
  await page.locator('input[type=password]').fill(password)
  await page.locator('button[type=submit]').click()
  if (secret) {
    await page.getByLabel('Código de verificación').waitFor({ timeout: 30000 })
    await page.getByLabel('Código de verificación').fill(await freshTotp(secret))
  }
  await page.waitForURL((u) => !/\/(login|two-factor)/.test(u.pathname), { timeout: 30000 })
  await page.waitForLoadState('networkidle')
}
async function openMember(h, name) {
  await h.page.getByRole('link', { name: new RegExp(name) }).first().click()
  await h.page.getByRole('heading', { name }).first().waitFor({ timeout: 20000 })
  await h.page.waitForLoadState('networkidle')
}
/**
 * A practice created in the browser starts with English as its language (the
 * database default), so the preferences step would open in English. These
 * clips are recorded in Spanish: once the account exists, set the new owner's
 * language to Spanish before the app reads it back.
 */
async function spanishOnceCreated(page, userId) {
  await page.route('**/rest/v1/rpc/create_account_with_owner', async (route) => {
    const response = await route.fetch()
    if (response.ok()) await admin.from('team_members').update({ language_preference: 'es' }).eq('user_id', userId)
    await route.fulfill({ response })
  })
}
/** A time field: point at it, then set it whole (typing into one lands in whichever segment was clicked). */
async function setTime(h, label, value) {
  const field = h.page.getByLabel(label)
  await h.click(field)
  await field.fill(value)
  await h.pause(500)
}
const stamp = () => new Date().toISOString().replace(/\D/g, '').slice(0, 14)

export default [
  // --- getting started: signing up ------------------------------------------
  {
    id: 'setup--signup',
    path: '/signup',
    as: 'anon',
    ready: 'text=Crea tu cuenta de QuiroFlow',
    // This stack has email confirmation off, so a real signup would skip the
    // "check your email" step every clinic sees. Answer the signup call the
    // way production does -- a user, no session -- and nothing is created.
    async prepare(h) {
      await h.page.route('**/auth/v1/signup**', (route) =>
        route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: '00000000-0000-4000-8000-000000000001', aud: 'authenticated', role: '', email: 'carmen.ferrer@example.com', identities: [{ id: 'x', provider: 'email' }], created_at: new Date().toISOString(), user_metadata: {}, app_metadata: { provider: 'email' } }) }),
      )
    },
    async run(h) {
      await h.type(h.page.locator('input[type=email]'), 'carmen.ferrer@example.com')
      await h.type(h.page.locator('input[type=password]'), 'Valencia-2026')
      await h.click(h.page.getByRole('button', { name: 'Crear cuenta' }))
      await h.page.getByText('Revisa tu correo').first().waitFor({ timeout: 20000 })
      await h.moveAway()
    },
    hold: 2600,
  },
  {
    id: 'setup--onboarding-practice',
    path: '/login',
    as: 'anon',
    ready: 'input[type=email]',
    async prepare(h) {
      const email = `alta-${stamp()}@nueva-clinica.test`
      const created = ok(await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true }), 'signup user')
      await spanishOnceCreated(h.page, created.user.id)
      await loginUI(h.page, email)
      if (!h.page.url().includes('/onboarding')) await h.page.goto(new URL('/onboarding', h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByText('Configura tu consulta').first().waitFor({ timeout: 20000 })
    },
    async run(h) {
      await h.type(h.page.getByLabel('Tu nombre'), 'Carmen Ferrer')
      await h.click(h.page.getByText('Sí, atiendo pacientes'))
      await h.type(h.page.getByLabel('Nombre de la consulta'), 'Clínica Demo')
      await h.type(h.page.getByLabel('Primera clínica'), 'Valencia')
      await h.hover(h.page.getByText('Página de reservas online', { exact: true }))
      await h.pause(900)
      await h.click(h.page.getByRole('button', { name: 'Crear consulta' }))
      await h.page.getByText('Haz tuyo QuiroFlow').first().waitFor({ timeout: 30000 })
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'setup--onboarding-preferences',
    path: '/login',
    as: 'anon',
    ready: 'input[type=email]',
    async prepare(h) {
      const email = `alta-${stamp()}@nueva-clinica.test`
      const created = ok(await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true }), 'signup user')
      await spanishOnceCreated(h.page, created.user.id)
      await loginUI(h.page, email)
      if (!h.page.url().includes('/onboarding')) await h.page.goto(new URL('/onboarding', h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByLabel('Tu nombre').fill('Carmen Ferrer')
      await h.page.getByText('Sí, atiendo pacientes').click()
      await h.page.getByLabel('Nombre de la consulta').fill('Clínica Demo')
      await h.page.getByLabel('Primera clínica').fill('Valencia')
      await h.page.getByRole('button', { name: 'Crear consulta' }).click()
      await h.page.getByText('Haz tuyo QuiroFlow').first().waitFor({ timeout: 30000 })
    },
    async run(h) {
      await h.click(h.page.getByText('Clara', { exact: true }).first())
      await h.click(h.page.getByText('Español', { exact: true }).first())
      await h.click(h.page.getByRole('button', { name: 'Continuar' }))
      await h.page.getByText('Agenda y reservas online').first().waitFor({ timeout: 20000 })
      await h.pause(1800)
      await h.click(h.page.getByRole('button', { name: 'Empezar' }).or(h.page.getByRole('link', { name: 'Empezar' })).first())
      await h.page.waitForURL(/\/dashboard/, { timeout: 30000 })
      await h.page.getByText('Tu primera visita, a tres pasos').first().waitFor({ timeout: 20000 })
      await h.moveAway()
    },
    hold: 2200,
  },
  // --- first steps (the newcomer's empty practice) --------------------------
  {
    id: 'setup--first-steps-type',
    path: '/dashboard',
    as: 'setupNew',
    ready: 'text=Tu primera visita, a tres pasos',
    async prepare(h) {
      await resetNewcomer('type', admin)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Tu primera visita, a tres pasos').first().waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('link', { name: 'Añadir tipo' }).or(h.page.getByRole('button', { name: 'Añadir tipo' })).first())
      const dialog = h.page.getByRole('dialog')
      await dialog.waitFor({ timeout: 20000 })
      await h.type(dialog.getByLabel('Nombre'), 'Primera visita')
      await dialog.getByLabel('Duración (min)').fill('')
      await h.type(dialog.getByLabel('Duración (min)'), '45')
      await dialog.getByLabel('Precio (€)').fill('')
      await h.type(dialog.getByLabel('Precio (€)'), '60')
      await h.click(dialog.getByRole('button', { name: 'Crear y completar' }))
      await h.page.waitForURL(/appointment-types\/[0-9a-f-]+/, { timeout: 20000 })
      await h.page.waitForLoadState('networkidle')
      await h.pause(900)
      await h.click(h.page.getByRole('link', { name: 'Panel' }).first())
      await h.page.getByText('Tu primera visita, a tres pasos').first().waitFor({ timeout: 20000 })
      await h.moveAway()
    },
    hold: 2200,
  },
  {
    id: 'setup--first-steps-patient',
    path: '/dashboard',
    as: 'setupNew',
    ready: 'text=Tu primera visita, a tres pasos',
    async prepare(h) {
      await resetNewcomer('patient', admin)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Tu primera visita, a tres pasos').first().waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('link', { name: 'Nuevo paciente' }).or(h.page.getByRole('button', { name: 'Nuevo paciente' })).first())
      const dialog = h.page.getByRole('dialog')
      await dialog.waitFor({ timeout: 20000 })
      await h.type(dialog.getByLabel('Nombre', { exact: true }), 'Raquel')
      await h.type(dialog.getByLabel('Apellidos'), 'Domènech')
      await h.type(dialog.getByPlaceholder('612 34 56 7'), '600300401')
      await h.click(dialog.getByRole('button', { name: 'Añadir paciente' }))
      await h.pause(1500)
      await h.page.goto(new URL('/dashboard', h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByText('Tu primera visita, a tres pasos').first().waitFor({ timeout: 20000 })
      await h.moveAway()
    },
    hold: 2200,
  },
  {
    id: 'setup--first-steps-book',
    path: '/dashboard',
    as: 'setupNew',
    ready: 'text=Tu primera visita, a tres pasos',
    async prepare(h) {
      await resetNewcomer('book', admin)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Tu primera visita, a tres pasos').first().waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('link', { name: 'Abrir la agenda' }).or(h.page.getByRole('button', { name: 'Abrir la agenda' })).first())
      await h.page.waitForURL(/\/calendar/, { timeout: 20000 })
      await h.page.waitForLoadState('networkidle')
      await h.pause(1500)
    },
    hold: 2000,
  },
  // --- signing in -----------------------------------------------------------
  {
    id: 'setup--sign-in',
    path: '/login',
    as: 'anon',
    ready: 'input[type=email]',
    async prepare() {
      await twoFactorOptional()
    },
    async run(h) {
      await h.type(h.page.locator('input[type=email]'), PEOPLE.alba.email)
      await h.type(h.page.locator('input[type=password]'), PASSWORD)
      await h.click(h.page.getByRole('button', { name: 'Entrar' }))
      await h.page.waitForURL(/\/dashboard/, { timeout: 30000 })
      await h.page.waitForLoadState('networkidle')
      // End on the dashboard with its widgets filled in, not on their skeletons.
      await h.page.waitForFunction(() => !document.querySelector('.skeleton-shimmer, [class*="animate-pulse"]'), null, { timeout: 15000 }).catch(() => {})
      await h.moveAway()
    },
    hold: 2000,
  },
  {
    id: 'setup--forgot-password',
    path: '/login',
    as: 'anon',
    ready: 'input[type=email]',
    async prepare(h) {
      const ctx = await setupContext(admin)
      ok(await admin.auth.admin.updateUserById(ctx.member('elena').user_id, { password: PASSWORD }), 'elena password')
      // The local mail server allows two emails an hour; the reset email
      // itself is not on camera, so answer that call here.
      await h.page.route('**/auth/v1/recover**', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }))
    },
    async run(h) {
      await h.click(h.page.getByRole('link', { name: '¿La has olvidado?' }))
      await h.page.getByText('Recupera tu contraseña').first().waitFor({ timeout: 20000 })
      await h.type(h.page.locator('input[type=email]'), PEOPLE.elena.email)
      await h.click(h.page.getByRole('button', { name: 'Enviar enlace' }))
      await h.pause(2200)
      // "Opens the link in the email": the same token the email carries.
      const { data, error } = await admin.auth.admin.generateLink({ type: 'recovery', email: PEOPLE.elena.email })
      if (error) throw error
      await h.page.goto(new URL(`/reset-password#token_hash=${data.properties.hashed_token}&type=recovery`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByText('Elige una contraseña nueva').first().waitFor({ timeout: 20000 })
      await h.type(h.page.getByLabel('Contraseña nueva', { exact: true }), 'Valencia-Ruzafa-26')
      await h.type(h.page.getByLabel('Repite la contraseña nueva', { exact: true }), 'Valencia-Ruzafa-26')
      await h.click(h.page.getByRole('button', { name: 'Cambiar contraseña' }))
      await h.page.waitForURL((u) => !u.pathname.startsWith('/reset-password'), { timeout: 30000 })
      await h.page.waitForLoadState('networkidle')
      await h.moveAway()
    },
    hold: 2000,
  },
  {
    id: 'setup--two-factor-code',
    path: '/login',
    as: 'anon',
    ready: 'input[type=email]',
    async prepare() {
      await twoFactorOptional()
    },
    async run(h) {
      const { jordiSecret } = await readState()
      await h.type(h.page.locator('input[type=email]'), PEOPLE.jordi.email)
      await h.type(h.page.locator('input[type=password]'), PASSWORD)
      await h.click(h.page.getByRole('button', { name: 'Entrar' }))
      const code = h.page.getByLabel('Código de verificación')
      await code.waitFor({ timeout: 30000 })
      await h.pause(900)
      await h.type(code, await freshTotp(jordiSecret, 5500), { delay: 140 })
      await h.page.waitForURL(/\/dashboard/, { timeout: 30000 })
      await h.page.waitForLoadState('networkidle')
      // End on the dashboard with its widgets filled in, not on their skeletons.
      await h.page.waitForFunction(() => !document.querySelector('.skeleton-shimmer, [class*="animate-pulse"]'), null, { timeout: 15000 }).catch(() => {})
      await h.moveAway()
    },
    hold: 2000,
  },
  // --- your account ---------------------------------------------------------
  {
    id: 'setup--account-profile',
    path: '/dashboard',
    as: 'setupMarc',
    ready: 'nav',
    async prepare(h) {
      const ctx = await setupContext(admin)
      ok(await admin.from('team_members').update({ full_name: PEOPLE.marc.name, color: PEOPLE.marc.color }).eq('id', ctx.member('marc').id), 'marc')
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: /Marc Soler|Cuenta|Menú de la cuenta/ }).last())
      await h.click(h.page.getByRole('menuitem', { name: 'Ajustes de la cuenta' }).or(h.page.getByRole('link', { name: 'Ajustes de la cuenta' })).first())
      await h.page.getByRole('heading', { name: 'Mi cuenta' }).waitFor({ timeout: 20000 })
      await h.page.waitForLoadState('networkidle')
      const name = h.page.getByLabel('Nombre completo')
      await h.click(name)
      await h.press('End')
      await h.type(name, ' Puig')
      await h.scroll(380)
      await h.click(h.page.getByRole('radio').nth(3).or(h.page.locator('[aria-label^="Color"]').nth(3)).first())
      await h.pause(700)
      await h.click(h.page.getByRole('button', { name: 'Guardar', exact: true }))
      await h.pause(900)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'setup--account-password',
    path: '/account',
    as: 'setupReception',
    ready: 'text=Mi cuenta',
    async prepare(h) {
      await h.page.getByText('Otros dispositivos').first().scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Cambiar…' }))
      await h.type(h.page.getByLabel('Nueva contraseña'), 'Valencia-Ruzafa-27')
      await h.type(h.page.getByLabel('Repítela'), 'Valencia-Ruzafa-27')
      await h.click(h.page.getByRole('button', { name: 'Cambiar contraseña' }))
      await h.pause(1200)
      await h.click(h.page.getByRole('button', { name: 'Cerrar las demás' }))
      await h.pause(900)
      await h.moveAway()
      // Back to the seed password, for the clips that sign Lucía in.
      const ctx = await setupContext(admin)
      ok(await admin.auth.admin.updateUserById(ctx.member('lucia').user_id, { password: PASSWORD }), 'lucia password back')
    },
    hold: 1800,
  },
  // --- getting help ---------------------------------------------------------
  {
    id: 'setup--help-assistant',
    path: '/dashboard',
    as: 'setupOwner',
    ready: 'nav',
    async prepare(h) {
      await twoFactorOptional()
      // The assistant needs the model and the published help centre, neither
      // of which this local stack has: answer as it does, from these articles.
      await h.page.route('**/api/support/ask', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            available: true,
            answer: 'Ve a Ajustes › Equipo y pulsa «Invitar». Escribe su email, elige el rol «Recepción» y desmarca «Atenderá pacientes»: así no ocupa una plaza de profesional. Pulsa «Crear invitación» y le llegará un enlace para crear su usuario y entrar en tu clínica.',
            sources: ['https://learn.quiroflow.com/es/articles/team-roles/inviting-your-team'],
          }),
        }),
      )
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Soporte' }).first())
      await h.type(h.page.getByPlaceholder('Haz una pregunta…'), '¿Cómo invito a una recepcionista?')
      await h.click(h.page.getByRole('button', { name: 'Enviar' }).first())
      await h.page.getByText('Ve a Ajustes › Equipo').first().waitFor({ timeout: 20000 })
      await h.pause(800)
      await h.hover(h.page.getByRole('link', { name: /↗/ }).first())
    },
    hold: 2600,
  },
  // --- team -----------------------------------------------------------------
  {
    id: 'team--invite',
    path: '/settings/team',
    as: 'setupOwner',
    ready: 'text=Invitaciones pendientes',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      await admin.from('account_invites').delete().eq('account_id', accountId).eq('full_name', 'Sonia Gil')
      // No mail provider locally; the dialog only needs to hear it was sent.
      await h.page.route('**/api/invites/send', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '{"sent":true}' }))
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Invitar' }).first())
      const dialog = h.page.getByRole('dialog')
      await dialog.waitFor()
      await h.type(dialog.getByLabel('Email'), 'sonia.gil@example.com')
      await h.type(dialog.getByLabel('Nombre (opcional)'), 'Sonia Gil')
      await h.select(dialog.getByLabel('Rol'), { label: 'Recepción' })
      await h.click(dialog.getByText('Atenderá pacientes').first())
      await h.click(dialog.getByRole('button', { name: 'Crear invitación' }))
      await h.page.getByText('Invitación creada').first().waitFor({ timeout: 20000 })
      await h.moveAway()
    },
    hold: 2600,
  },
  {
    id: 'team--link-imported',
    path: '/settings/team',
    as: 'setupOwner',
    // No `ready` on the imported-names section: a previous run linked them,
    // so it only reappears once prepare() has unlinked them again.
    ready: 'text=Elena Ruiz',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      ok(await admin.from('appointments').update({ practitioner_id: null }).eq('account_id', accountId).like('external_reference', 'setup-import-%'), 'unlink')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByText('Nombres importados sin vincular').first().waitFor({ timeout: 20000 })
      await h.page.getByText('Nombres importados sin vincular').first().scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.select(h.page.getByLabel(/Vincular Dr\. Ejemplo a/), { label: PEOPLE.marc.name })
      await h.click(h.page.getByRole('button', { name: 'Vincular', exact: true }).first())
      const dialog = h.page.getByRole('dialog')
      await dialog.waitFor()
      await h.pause(900)
      await h.click(dialog.getByRole('button', { name: 'Vincular', exact: true }))
      await h.pause(1500)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'team--change-role',
    path: '/settings/team',
    as: 'setupOwner',
    ready: 'text=Elena Ruiz',
    async prepare() {
      await twoFactorOptional()
      const ctx = await setupContext(admin)
      const frontDesk = ctx.roles.find((r) => r.name === 'Front Desk')
      ok(await admin.from('team_members').update({ role_id: frontDesk.id }).eq('id', ctx.member('elena').id), 'elena role')
    },
    async run(h) {
      await h.click(h.page.getByRole('link', { name: /Elena Ruiz/ }).first())
      await h.page.getByRole('heading', { name: 'Elena Ruiz' }).first().waitFor({ timeout: 20000 })
      await h.page.waitForLoadState('networkidle')
      await h.select(h.page.locator('[data-cy="member-role"]'), { label: 'Profesional' })
      await h.click(h.page.getByRole('button', { name: 'Guardar cambios' }))
      await h.pause(1200)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'team--own-hours',
    path: '/settings/team',
    as: 'setupOwner',
    ready: 'text=Marc Soler',
    async prepare() {
      await twoFactorOptional()
      const ctx = await setupContext(admin)
      ok(await admin.from('team_members').update({ business_hours: null }).eq('id', ctx.member('marc').id), 'marc hours')
    },
    async run(h) {
      await openMemberFilmed(h, 'Marc Soler')
      await h.click(h.page.getByRole('button', { name: 'Poner horario propio' }))
      // Start from a week with nothing on, then Tuesday morning and Thursday afternoon.
      for (const day of ['lunes', 'miércoles', 'viernes']) {
        const sw = h.page.getByRole('switch', { name: `Abierto el ${day}` })
        if ((await sw.getAttribute('aria-checked')) === 'true') await h.click(sw, { after: 250 })
      }
      for (const day of ['martes', 'jueves']) {
        const sw = h.page.getByRole('switch', { name: `Abierto el ${day}` })
        if ((await sw.getAttribute('aria-checked')) !== 'true') await h.click(sw, { after: 300 })
      }
      await setTime(h, 'Jueves, tramo 1, abre', '16:00')
      await setTime(h, 'Jueves, tramo 1, cierra', '20:00')
      await h.click(h.page.getByRole('button', { name: 'Guardar cambios' }))
      await h.pause(1200)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'team--absence',
    path: '/settings/team',
    as: 'setupOwner',
    ready: 'text=Marc Soler',
    async prepare() {
      await twoFactorOptional()
      const ctx = await setupContext(admin)
      ok(await admin.from('staff_absences').delete().eq('team_member_id', ctx.member('marc').id), 'absences')
      await admin.from('availability_blocks').delete().eq('practitioner_id', ctx.member('marc').id)
    },
    async run(h) {
      await openMemberFilmed(h, 'Marc Soler')
      await h.click(h.page.getByRole('button', { name: 'Poner a Marc Soler en ausencia' }))
      await h.click(h.page.getByRole('button', { name: 'Baja médica' }))
      await h.type(h.page.getByLabel('Nota para el equipo (opcional)'), 'Lesión de espalda. Sus pacientes, con Alba.')
      await h.click(h.page.getByRole('button', { name: 'Guardar', exact: true }))
      await h.page.getByText(/Aún tiene \d+ citas/).first().waitFor({ timeout: 20000 })
      await h.hover(h.page.getByRole('button', { name: 'Mover o cancelar sus citas' }))
    },
    hold: 2400,
  },
  {
    id: 'team--deactivate',
    path: '/settings/team',
    as: 'setupOwner',
    ready: 'text=Nuria Vidal',
    async prepare(h) {
      await twoFactorOptional()
      await resetNuria(admin)
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      await openMemberFilmed(h, 'Nuria Vidal')
      await h.click(h.page.getByRole('button', { name: 'Desactivar a Nuria Vidal' }))
      const dialog = h.page.getByRole('dialog')
      await dialog.waitFor()
      await h.select(dialog.getByLabel('Pasar sus citas a'), { label: PEOPLE.marc.name })
      await h.click(dialog.getByRole('button', { name: 'Desactivar', exact: true }))
      await h.page.getByText(/Desactivado el/).first().waitFor({ timeout: 30000 })
      await h.moveAway()
    },
    hold: 2200,
  },
  {
    id: 'team--make-owner',
    path: '/settings/team',
    as: 'setupOwner',
    ready: 'text=Lucía Pérez',
    async prepare() {
      await twoFactorOptional()
      const ctx = await setupContext(admin)
      ok(await admin.from('team_members').update({ is_owner: false }).eq('id', ctx.member('lucia').id), 'lucia not owner')
    },
    async run(h) {
      await openMemberFilmed(h, 'Lucía Pérez')
      await h.click(h.page.getByRole('switch', { name: 'Propietario' }).first())
      const dialog = h.page.getByRole('dialog')
      await dialog.waitFor()
      await h.pause(900)
      await h.click(dialog.getByRole('button', { name: 'Hacer propietario' }))
      await h.pause(1400)
      await h.moveAway()
      // Put her back for the clips that show her as front desk.
      const ctx = await setupContext(admin)
      ok(await admin.from('team_members').update({ is_owner: false }).eq('id', ctx.member('lucia').id), 'lucia not owner')
    },
    hold: 1600,
  },
  {
    id: 'team--new-role',
    path: '/settings/roles',
    as: 'setupOwner',
    ready: 'text=Comparar roles',
    async prepare(h) {
      await twoFactorOptional()
      const ctx = await setupContext(admin)
      for (const r of ctx.roles.filter((x) => x.name === 'Profesional sénior')) await admin.from('account_roles').delete().eq('id', r.id)
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Nuevo rol' }).first())
      const dialog = h.page.getByRole('dialog')
      await dialog.waitFor()
      await h.type(dialog.getByLabel('Nombre'), 'Profesional sénior')
      await h.select(dialog.getByLabel('Empezar con los permisos de'), { label: 'Profesional' })
      await h.click(dialog.getByRole('button', { name: 'Crear y editar' }))
      await h.page.waitForURL(/\/settings\/roles\/[0-9a-f-]+/, { timeout: 20000 })
      await h.page.waitForLoadState('networkidle')
      await h.click(h.page.getByRole('radio', { name: 'Todos' }).or(h.page.getByRole('button', { name: 'Todos', exact: true })).first())
      await h.click(h.page.getByRole('switch', { name: /Bandeja de entrada/ }).first())
      await h.click(h.page.getByRole('button', { name: 'Guardar cambios' }))
      await h.pause(1200)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'team--compare-roles',
    path: '/settings/roles',
    as: 'setupOwner',
    ready: 'text=Comparar roles',
    async prepare() {
      await twoFactorOptional()
    },
    async run(h) {
      await h.click(h.page.getByRole('link', { name: 'Comparar roles' }).or(h.page.getByRole('button', { name: 'Comparar roles' })).first())
      await h.page.getByText('Cada permiso, rol por rol.').first().waitFor({ timeout: 20000 })
      await h.pause(1200)
      await h.scroll(700, { at: h.page.getByRole('table').first() })
      await h.pause(800)
      await h.scroll(-400)
    },
    hold: 1600,
  },
  // --- settings -------------------------------------------------------------
  {
    id: 'settings--add-clinic',
    path: '/settings/clinics',
    as: 'setupOwner',
    ready: 'text=Añadir sede',
    async prepare(h) {
      await twoFactorOptional()
      const ctx = await setupContext(admin)
      for (const c of ctx.clinics.filter((x) => x.name === 'Alicante')) {
        await admin.from('team_member_clinics').delete().eq('clinic_id', c.id)
        await admin.from('calendar_resources').delete().eq('clinic_id', c.id)
        await admin.from('clinics').delete().eq('id', c.id)
      }
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Añadir sede' }).first())
      const dialog = h.page.getByRole('dialog')
      await dialog.waitFor()
      await h.type(dialog.getByLabel('Nombre'), 'Alicante')
      await h.click(dialog.getByRole('button', { name: 'Añadir sede' }))
      await h.page.waitForURL(/\/settings\/clinics\/[0-9a-f-]+/, { timeout: 20000 })
      await h.page.waitForLoadState('networkidle')
      await h.type(h.page.getByLabel('Dirección'), 'Avenida Inventada 8, 03001 Alicante')
      await h.type(h.page.getByLabel('Teléfono'), '965 000 111')
      await h.click(h.page.getByRole('button', { name: 'Guardar cambios' }))
      await h.pause(1200)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'settings--clinic-hours',
    path: '/settings/clinics',
    as: 'setupOwner',
    ready: 'text=Añadir sede',
    async prepare(h) {
      await twoFactorOptional()
      const ctx = await setupContext(admin)
      ok(await admin.from('clinics').update({ business_hours: { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] } }).eq('id', ctx.clinicId), 'no hours')
      await h.page.goto(new URL(`/settings/clinics/${ctx.clinicId}#horario`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('switch', { name: 'Abierto el lunes' }).scrollIntoViewIfNeeded()
      await h.page.mouse.wheel(0, -120)
    },
    async run(h) {
      await h.click(h.page.getByRole('switch', { name: 'Abierto el lunes' }))
      await h.click(h.page.locator('[data-day="mon"] [data-cy="hours-add-range"]'))
      await setTime(h, 'Lunes, tramo 2, abre', '16:00')
      await h.click(h.page.getByRole('button', { name: 'Copiar el lunes a martes–viernes' }))
      await h.pause(700)
      await h.click(h.page.getByRole('button', { name: 'Guardar cambios' }))
      await h.pause(1200)
      await h.moveAway()
      // Leave the clinic open as the seed has it.
      ok(await admin.from('clinics').update({ business_hours: { mon: [['09:00', '14:00'], ['16:00', '20:00']], tue: [['09:00', '14:00'], ['16:00', '20:00']], wed: [['09:00', '14:00'], ['16:00', '20:00']], thu: [['09:00', '14:00'], ['16:00', '20:00']], fri: [['09:00', '14:00']] } }).eq('id', (await setupContext(admin)).clinicId), 'hours back')
    },
    hold: 1600,
  },
  {
    id: 'settings--holidays',
    path: '/settings/clinics',
    as: 'setupOwner',
    ready: 'text=Añadir sede',
    async prepare(h) {
      await twoFactorOptional()
      const ctx = await setupContext(admin)
      ok(await admin.from('clinics').update({ holiday_region: null, holidays_auto: false, holidays_loaded_through: null }).eq('id', ctx.clinicId), 'holidays off')
      await admin.from('availability_blocks').delete().eq('clinic_id', ctx.clinicId).is('practitioner_id', null).is('room_id', null)
      await h.page.goto(new URL(`/settings/clinics/${ctx.clinicId}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByLabel('Comunidad autónoma').scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.select(h.page.getByLabel('Comunidad autónoma'), { label: 'Comunitat Valenciana' })
      await h.click(h.page.getByRole('switch', { name: /Cerrar en los festivos oficiales/ }).first())
      await h.page.getByText('Festivo oficial').first().waitFor({ timeout: 20000 })
      await h.pause(600)
      await h.scroll(300)
    },
    hold: 2000,
  },
  {
    id: 'settings--closure',
    path: '/settings/clinics',
    as: 'setupOwner',
    ready: 'text=Añadir sede',
    async prepare(h) {
      await twoFactorOptional()
      const ctx = await setupContext(admin)
      // No official holidays here: the closure should be the only row, and 19 March is one of them in Valencia.
      ok(await admin.from('clinics').update({ holiday_region: null, holidays_auto: false, holidays_loaded_through: null }).eq('id', ctx.clinicId), 'holidays off')
      await admin.from('availability_blocks').delete().eq('clinic_id', ctx.clinicId).is('practitioner_id', null).is('room_id', null)
      await h.page.goto(new URL(`/settings/clinics/${ctx.clinicId}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Añadir un día festivo o cierre…' }).scrollIntoViewIfNeeded()
    },
    async run(h) {
      const y = new Date().getFullYear() + (new Date().getMonth() > 2 ? 1 : 0)
      await h.click(h.page.getByRole('button', { name: 'Añadir un día festivo o cierre…' }))
      await h.click(h.page.getByLabel('Desde'))
      await h.page.getByLabel('Desde').fill(`${y}-03-19`)
      await h.pause(400)
      await h.click(h.page.getByLabel('Hasta (incluido)'))
      await h.page.getByLabel('Hasta (incluido)').fill(`${y}-03-19`)
      await h.pause(400)
      await h.type(h.page.getByLabel('Motivo (opcional)'), 'Fallas: San José')
      await h.click(h.page.getByRole('button', { name: 'Añadir cierre' }))
      await h.page.getByText('Fallas: San José').first().waitFor({ timeout: 20000 })
      await h.pause(600)
      await h.moveAway()
    },
    hold: 2000,
  },
  {
    id: 'settings--new-type',
    path: '/settings/appointment-types',
    as: 'setupOwner',
    ready: 'text=Nuevo tipo',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      await admin.from('appointment_types').delete().eq('account_id', accountId).eq('name', 'Masaje deportivo')
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Nuevo tipo' }).first())
      const dialog = h.page.getByRole('dialog')
      await dialog.waitFor()
      await h.type(dialog.getByLabel('Nombre'), 'Masaje deportivo')
      await dialog.getByLabel('Duración (min)').fill('')
      await h.type(dialog.getByLabel('Duración (min)'), '45')
      await dialog.getByLabel('Precio (€)').fill('')
      await h.type(dialog.getByLabel('Precio (€)'), '50')
      await h.click(dialog.getByRole('button', { name: 'Crear y completar' }))
      await h.page.waitForURL(/appointment-types\/[0-9a-f-]+/, { timeout: 20000 })
      await h.page.waitForLoadState('networkidle')
      await h.select(h.page.getByLabel('Etapa del tratamiento'), { index: 6 })
      await h.click(h.page.getByRole('button', { name: 'Guardar cambios' }))
      await h.pause(1200)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'settings--type-online',
    path: '/settings/appointment-types',
    as: 'setupOwner',
    ready: 'text=Nuevo tipo',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      ok(await admin.from('appointment_types').update({ online_booking_enabled: false, online_bookable_by: 'all', online_bypass_practitioner: false }).eq('account_id', accountId).eq('name', 'Primera visita'), 'reset type')
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByRole('link', { name: /Primera visita/ }).first().click()
      await h.page.waitForURL(/appointment-types\/[0-9a-f-]+/)
      await h.page.waitForLoadState('networkidle')
      await h.page.getByRole('switch', { name: /Se puede reservar online/ }).first().scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.click(h.page.getByRole('switch', { name: /Se puede reservar online/ }).first())
      await h.click(h.page.getByRole('button', { name: 'Solo pacientes nuevos' }).or(h.page.getByRole('radio', { name: 'Solo pacientes nuevos' })).first())
      await h.click(h.page.getByRole('switch', { name: /El paciente no elige profesional/ }).first())
      await h.click(h.page.getByRole('button', { name: 'Guardar cambios' }))
      await h.pause(1200)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'settings--type-per-practitioner',
    path: '/settings/appointment-types',
    as: 'setupOwner',
    ready: 'text=Nuevo tipo',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      const { data: t } = await admin.from('appointment_types').select('id').eq('account_id', accountId).eq('name', 'Ajuste').single()
      await admin.from('appointment_type_overrides').delete().eq('appointment_type_id', t.id)
      await h.page.goto(new URL(`/settings/appointment-types/${t.id}`, h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByLabel('Duración de Marc Soler').scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.type(h.page.getByLabel('Duración de Marc Soler'), '45')
      await h.type(h.page.getByLabel('Precio de Marc Soler'), '50')
      await h.click(h.page.getByRole('button', { name: 'Guardar cambios' }))
      await h.pause(1200)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'settings--rooms',
    path: '/settings/rooms',
    as: 'setupOwner',
    ready: 'text=Recursos del Calendario',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      await admin.from('calendar_resources').delete().eq('account_id', accountId).eq('name', 'Sala 2')
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Añadir sala' }).first())
      await h.type(h.page.getByLabel('Nombre de la nueva sala'), 'Sala 2')
      await h.click(h.page.getByRole('button', { name: 'Añadir sala' }).last())
      await h.pause(1200)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'settings--new-patient-fields',
    path: '/settings/new-patient-fields',
    as: 'setupOwner',
    ready: 'text=Cómo se ve Añadir paciente',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      ok(await admin.from('accounts').update({ new_patient_field_config: {} }).eq('id', accountId), 'fields reset')
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      const row = (label) => h.page.locator('[data-cy="field-row"], li, tr, div').filter({ has: h.page.getByText(label, { exact: true }) }).filter({ has: h.page.getByRole('button', { name: 'Obligatorio' }).or(h.page.getByRole('radio', { name: 'Obligatorio' })) }).last()
      await h.click(row('Correo electrónico').getByRole('button', { name: 'Obligatorio' }).or(row('Correo electrónico').getByRole('radio', { name: 'Obligatorio' })).first())
      await h.click(row('Ocupación').getByRole('button', { name: 'Oculto' }).or(row('Ocupación').getByRole('radio', { name: 'Oculto' })).first())
      await h.pause(700)
      await h.click(h.page.getByRole('button', { name: 'Guardar cambios' }))
      await h.pause(1200)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'settings--referral-sources',
    path: '/settings/referral-sources',
    as: 'setupOwner',
    ready: 'text=Fuentes de Referencia',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      await admin.from('referral_sources').delete().eq('account_id', accountId).eq('name', 'TikTok')
      for (const name of ['Google', 'Instagram', 'Recomendación de un paciente', 'Pasaba por la calle']) {
        const { data: found } = await admin.from('referral_sources').select('id').eq('account_id', accountId).eq('name', name)
        if (!found?.length) ok(await admin.from('referral_sources').insert({ account_id: accountId, name }), `source ${name}`)
      }
      await admin.from('referral_sources').update({ status: 'active' }).eq('account_id', accountId)
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      await h.type(h.page.getByPlaceholder('Añade una fuente, ej. TikTok'), 'TikTok')
      await h.click(h.page.getByRole('button', { name: 'Añadir', exact: true }))
      await h.pause(900)
      await h.click(h.page.getByRole('button', { name: 'Dejar de ofrecer Pasaba por la calle' }))
      await h.pause(1200)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'settings--custom-field',
    path: '/settings/custom-fields',
    as: 'setupOwner',
    ready: 'text=Añadir campo',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      await admin.from('patient_attributes').delete().eq('account_id', accountId).eq('label', 'Deporte que practica')
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Añadir campo' }).first())
      const dialog = h.page.getByRole('dialog')
      await dialog.waitFor()
      await h.type(dialog.getByLabel('Nombre'), 'Deporte que practica')
      await h.select(dialog.getByLabel('Sección'), { index: 1 })
      await h.select(dialog.getByLabel('Tipo'), { label: 'Selección única' })
      await h.type(dialog.getByLabel('Opciones, una por línea'), 'Running\nPádel\nNatación\nNinguno')
      await h.click(dialog.getByRole('button', { name: 'Guardar' }))
      await h.pause(1200)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'settings--import-csv',
    path: '/settings/import',
    as: 'setupOwner',
    ready: 'text=Otro sistema',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      const rows = [
        ['Nombre', 'Apellidos', 'Teléfono', 'Email', 'Fecha nacimiento'],
        ['Andrea', 'Sanz Mora', '600400101', 'andrea.sanz@example.com', '1988-04-12'],
        ['Bruno', 'Catalá Ríos', '600400102', 'bruno.catala@example.com', '1975-09-30'],
        ['Celia', 'Ferrando Gil', '600400103', 'celia.ferrando@example.com', '1992-01-05'],
        ['Daniel', 'Monzó Vera', '600400104', 'daniel.monzo@example.com', '1969-11-21'],
        ['Elisa', 'Pons Arnau', '600400105', 'elisa.pons@example.com', '2001-06-17'],
        ['Fermín', 'Gimeno Sala', '600400106', 'fermin.gimeno@example.com', '1983-02-08'],
      ]
      for (const [first, last] of rows.slice(1)) await admin.from('patients').delete().eq('account_id', accountId).eq('first_name', first).eq('last_name', last)
      h.csv = join(here, '..', '.frames', 'pacientes-demo.csv')
      await writeFile(h.csv, rows.map((r) => r.join(',')).join('\n') + '\n')
    },
    async run(h) {
      await h.click(h.page.getByText('Otro sistema').first())
      await h.pause(600)
      const chooser = h.page.waitForEvent('filechooser')
      await h.click(h.page.getByText('busca un archivo').first())
      await (await chooser).setFiles(h.csv)
      await h.page.getByText('Campo de QuiroFlow').first().waitFor({ timeout: 20000 })
      await h.pause(1500)
      await h.scroll(400)
      await h.click(h.page.getByRole('button', { name: 'Continuar' }))
      await h.page.getByText('Filas totales').first().waitFor({ timeout: 20000 })
      await h.pause(1200)
      await h.click(h.page.getByRole('button', { name: /^Importar \d+, actualizar \d+/ }))
      await h.page.getByText(/Se importaron \d+ pacientes/).first().waitFor({ timeout: 30000 })
      await h.pause(1200)
      // See them where they landed.
      await h.click(h.page.getByRole('link', { name: 'Pacientes', exact: true }).first())
      await h.page.getByText('Andrea Sanz Mora').first().waitFor({ timeout: 20000 })
      await h.moveAway()
    },
    hold: 2000,
  },
  {
    id: 'settings--files',
    path: '/settings/files',
    as: 'setupOwner',
    ready: 'text=Archivos en pacientes',
    async prepare(h) {
      await twoFactorOptional()
      await resetFiles(admin)
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.locator('[data-cy="files-compress-start"]').waitFor()
    },
    async run(h) {
      await h.hover(h.page.locator('[data-cy="files-compress-progress"]'))
      await h.pause(900)
      await h.click(h.page.locator('[data-cy="files-compress-start"]'))
      await h.page.locator('[data-cy="files-compress-run"]').waitFor({ timeout: 90000 })
      await h.page.getByText('Nada que comprimir').first().waitFor({ timeout: 90000 })
      await h.moveAway()
    },
    hold: 2400,
  },
  {
    id: 'settings--api-token',
    path: '/settings/developers',
    as: 'setupOwner',
    ready: 'text=Nuevo token',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      await admin.from('api_tokens').delete().eq('account_id', accountId).eq('name', 'Widget de reservas')
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Nuevo token' }).first())
      await h.type(h.page.getByLabel('Nombre', { exact: true }), 'Widget de reservas')
      await h.select(h.page.getByLabel('Caduca'), { label: 'En 90 días' })
      await h.click(h.page.getByText('Leer clínicas, profesionales, tipos de cita y servicios'))
      await h.click(h.page.getByText('Leer citas y disponibilidad'))
      await h.click(h.page.getByText('Reservar, reprogramar y cancelar citas'))
      await h.click(h.page.getByRole('button', { name: 'Crear token' }))
      await h.page.getByText('Copia el token ahora; no se vuelve a mostrar.').first().waitFor({ timeout: 20000 })
      await h.moveAway()
    },
    hold: 2400,
  },
  {
    id: 'settings--webhook',
    path: '/settings/webhooks',
    as: 'setupOwner',
    ready: 'text=Webhooks',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      await admin.from('webhooks').delete().eq('account_id', accountId)
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Añadir endpoint' }).first())
      await h.type(h.page.getByLabel('Dirección'), 'https://hooks.example.com/quiroflow')
      await h.click(h.page.getByRole('checkbox', { name: 'Creada' }).first())
      await h.click(h.page.getByRole('button', { name: 'Añadir endpoint' }).last())
      await h.page.getByText('Secreto de firma').first().waitFor({ timeout: 20000 })
      await h.moveAway()
    },
    hold: 2000,
  },
  // --- security & privacy ---------------------------------------------------
  {
    id: 'security--activity-log',
    path: '/settings/activity',
    as: 'setupOwner',
    ready: 'text=Registro de actividad',
    async prepare() {
      await twoFactorOptional()
    },
    async run(h) {
      await h.select(h.page.getByLabel('Área'), { label: 'Citas' })
      await h.select(h.page.getByLabel('Persona'), { label: PEOPLE.lucia.name })
      await h.pause(900)
      await h.click(h.page.getByText(/eliminad|modificad/).first())
      await h.pause(1600)
      await h.click(h.page.getByRole('tab', { name: 'Acceso a pacientes' }).or(h.page.getByRole('button', { name: 'Acceso a pacientes' })).first())
      await h.pause(1500)
      await h.click(h.page.getByRole('tab', { name: 'Inicios de sesión' }).or(h.page.getByRole('button', { name: 'Inicios de sesión' })).first())
      await h.pause(1200)
      await h.moveAway()
    },
    hold: 1800,
  },
  {
    id: 'security--retention',
    path: '/settings/privacy',
    as: 'setupOwner',
    ready: 'text=Plazo de conservación',
    async prepare(h) {
      await twoFactorOptional()
      const { accountId } = await setupContext(admin)
      ok(await admin.from('accounts').update({ clinical_retention_years: 6 }).eq('id', accountId), 'years')
      ok(await admin.from('patients').update({ retention_kept_until: null, retention_kept_reason: null }).eq('account_id', accountId), 'kept')
      await h.page.reload({ waitUntil: 'networkidle' })
    },
    async run(h) {
      const years = h.page.getByLabel('Años desde la última visita, nota, archivo o pago')
      await years.fill('')
      await h.type(years, '5')
      await h.click(h.page.getByRole('button', { name: 'Guardar', exact: true }).first())
      await h.page.getByText('Amparo').first().waitFor({ timeout: 20000 })
      await h.pause(900)
      await h.click(h.page.getByRole('checkbox').nth(1))
      await h.click(h.page.getByRole('button', { name: /^Conservar 1/ }))
      const dialog = h.page.getByRole('dialog')
      await dialog.waitFor()
      await h.type(dialog.getByLabel('Motivo'), 'Tratamiento previsible')
      await h.click(dialog.getByRole('button', { name: 'Conservar', exact: true }))
      await h.page.getByText('Se conservan').first().waitFor({ timeout: 20000 })
      await h.moveAway()
    },
    hold: 2000,
  },
  {
    id: 'security--enable-2fa',
    path: '/account',
    as: 'setupReception',
    ready: 'text=Mi cuenta',
    async prepare(h) {
      const ctx = await setupContext(admin)
      const uid = ctx.member('lucia').user_id
      const { data } = await admin.auth.admin.mfa.listFactors({ userId: uid })
      for (const f of data?.factors ?? []) await admin.auth.admin.mfa.deleteFactor({ userId: uid, id: f.id })
      await h.page.reload({ waitUntil: 'networkidle' })
      await h.page.getByRole('button', { name: 'Configurar verificación en dos pasos' }).scrollIntoViewIfNeeded()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: 'Configurar verificación en dos pasos' }))
      await h.page.getByText('¿No puedes escanearlo? Introduce esta clave:').first().waitFor({ timeout: 20000 })
      await h.pause(1800)
      // The key the screen shows, as the app would read it from the QR.
      const text = await h.page.locator('body').innerText()
      const secret = text.split('Introduce esta clave:')[1].match(/(?:[A-Z2-7]{4}\s?){8,}/)[0].replace(/\s/g, '')
      await h.type(h.page.getByLabel('Código de la app'), await freshTotp(secret, 5500), { delay: 120 })
      await h.click(h.page.getByRole('button', { name: 'Activar verificación en dos pasos' }))
      await h.page.getByText('Activada', { exact: true }).first().waitFor({ timeout: 20000 })
      await h.moveAway()
    },
    hold: 2000,
  },
  {
    // Last: it makes two-factor compulsory, and every other owner clip resets that.
    id: 'security--require-2fa',
    path: '/login',
    as: 'anon',
    ready: 'input[type=email]',
    async prepare(h) {
      await twoFactorOptional()
      const ctx = await setupContext(admin)
      for (const k of ['marc', 'elena']) {
        const uid = ctx.member(k).user_id
        const { data } = await admin.auth.admin.mfa.listFactors({ userId: uid })
        for (const f of data?.factors ?? []) await admin.auth.admin.mfa.deleteFactor({ userId: uid, id: f.id })
      }
      const { jordiSecret } = await readState()
      await loginUI(h.page, PEOPLE.jordi.email, PASSWORD, jordiSecret)
      await h.page.goto(new URL('/settings/team', h.page.url()).toString(), { waitUntil: 'networkidle' })
      await h.page.getByText('Exigir verificación en dos pasos').first().waitFor()
    },
    async run(h) {
      await h.click(h.page.getByRole('button', { name: /^Sin verificación en dos pasos/ }).first())
      await h.pause(1200)
      await h.click(h.page.getByRole('switch', { name: /Exigir verificación en dos pasos/ }).first())
      const dialog = h.page.getByRole('dialog')
      await dialog.waitFor()
      await h.pause(1200)
      await h.click(dialog.getByRole('button', { name: 'Exigirla' }))
      await h.pause(1500)
      await h.moveAway()
      await twoFactorOptional()
    },
    hold: 1600,
  },
]

async function openMemberFilmed(h, name) {
  await h.click(h.page.getByRole('link', { name: new RegExp(name) }).first())
  await h.page.getByRole('heading', { name }).first().waitFor({ timeout: 20000 })
  await h.page.waitForLoadState('networkidle')
  await h.pause(500)
}
void openMember
void totp
void userClient
void NEWCOMER
