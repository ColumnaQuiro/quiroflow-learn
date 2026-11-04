// Records the help centre's clips against a locally running QuiroFlow seeded
// with the fictional "Clínica Demo". See scripts/record/README.md.
//
//   BASE_URL=http://localhost:3961 node scripts/record/record.mjs [filter...]
//
// With filters, only clips whose id contains one of them are recorded.
import { readdir, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from 'playwright-core'
import { LAUNCH_ARGS, newContext, recordClip } from './lib/recorder.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const BASE_URL = process.env.BASE_URL || 'http://localhost:3961'
const OUT = join(here, 'out')
const TMP = join(here, '.frames')
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

// The demo seed's owner (quiroflow scripts/seed-demo-clinic.ts). Local only.
const LOGINS = {
  owner: { email: 'demo@clinica-demo.test', password: 'Demo1234!' },
  // Writer A's own practice (seed/setup.mjs), so team and settings changes stay out of the shared demo.
  setupOwner: { email: 'alba@equipo-demo.test', password: 'Demo1234!' },
  setupMarc: { email: 'marc@equipo-demo.test', password: 'Demo1234!' },
  setupReception: { email: 'lucia@equipo-demo.test', password: 'Demo1234!' },
  setupNew: { email: 'nueva@equipo-demo.test', password: 'Demo1234!' },
}

const refuse = !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(BASE_URL)
if (refuse) {
  console.error(`Refusing to record ${BASE_URL}: clips are only ever recorded from a local demo clinic.`)
  process.exit(1)
}

async function loadClips() {
  const dir = join(here, 'clips')
  const all = []
  for (const f of (await readdir(dir)).filter((n) => n.endsWith('.mjs')).sort()) {
    const mod = await import(pathToFileURL(join(dir, f)).href)
    all.push(...mod.default)
  }
  const ids = new Set()
  for (const c of all) {
    if (ids.has(c.id)) throw new Error(`Duplicate clip id ${c.id}`)
    ids.add(c.id)
  }
  return all
}

async function signIn(browser, who) {
  const { email, password } = LOGINS[who]
  const context = await newContext(browser)
  const page = await context.newPage()
  await page.goto(new URL('/login', BASE_URL).toString(), { waitUntil: 'networkidle' })
  await page.locator('input[type=email]').fill(email)
  await page.locator('input[type=password]').fill(password)
  await page.locator('button[type=submit]').click()
  await page.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 30000 })
  await page.waitForLoadState('networkidle')
  const state = await context.storageState()
  await context.close()
  return state
}

// "Now" in the clips: today at 10:18 Madrid time, a working morning, as long
// as that is already in the past. A clock set ahead of real time would make
// the session token look expired.
function clockAt() {
  const now = new Date()
  const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(now)
  const offset = new Intl.DateTimeFormat('en', { timeZone: 'Europe/Madrid', timeZoneName: 'longOffset' })
    .formatToParts(now).find((p) => p.type === 'timeZoneName').value.replace('GMT', '') || '+00:00'
  const morning = new Date(`${day}T10:18:00${offset}`)
  return morning < now ? morning : undefined
}

const filters = process.argv.slice(2)
const clips = (await loadClips()).filter((c) => !filters.length || filters.some((f) => c.id.includes(f)))
if (!clips.length) {
  console.error('No clips match.')
  process.exit(1)
}

// One recording at a time, machine-wide. Several running together starved the
// local Supabase stack until its auth server timed out every sign-in, so a
// second run waits here for the first to finish. A lock whose process has
// died is taken over.
const LOCK = join(here, '.lock')
async function acquireLock() {
  for (let waited = 0; ; waited++) {
    try {
      await mkdir(LOCK)
      await writeFile(join(LOCK, 'pid'), String(process.pid))
      return
    } catch {
      const pid = Number(await readFile(join(LOCK, 'pid'), 'utf8').catch(() => '0'))
      let alive = false
      try {
        process.kill(pid, 0)
        alive = pid > 0
      } catch {}
      if (!alive && waited > 2) await rm(LOCK, { recursive: true, force: true })
      else {
        if (waited % 12 === 0) console.log(`Waiting for another recording (pid ${pid}) to finish…`)
        await new Promise((r) => setTimeout(r, 5000))
      }
    }
  }
}
await acquireLock()
const releaseLock = () => rmSync(LOCK, { recursive: true, force: true })
process.on('exit', releaseLock)
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => process.exit(130))

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: LAUNCH_ARGS })
const states = {}
const failed = []
try {
  for (const clip of clips) {
    const who = clip.as ?? 'owner'
    if (who !== 'anon') states[who] ??= await signIn(browser, who)
    const context = await newContext(browser, { storageState: who === 'anon' ? undefined : states[who], clockAt: clip.realClock ? undefined : clockAt() })
    try {
      const r = await recordClip(context, clip, { baseUrl: BASE_URL, outDir: OUT, tmpDir: TMP })
      console.log(`✓ ${r.id}  ${r.seconds}s  ${r.frames} frames`)
    } catch (e) {
      failed.push(clip.id)
      console.error(`✗ ${clip.id}: ${e.message.split('\n').slice(0, process.env.CLIP_DEBUG ? 4 : 1).join(' | ')}`)
      const page = context.pages()[0]
      if (page) await page.screenshot({ path: join(TMP, `${clip.id}-failure.png`) }).catch(() => {})
    } finally {
      await context.close()
    }
  }
} finally {
  await browser.close()
}
if (failed.length) {
  console.error(`\n${failed.length} failed: ${failed.join(' ')}`)
  process.exit(1)
}
