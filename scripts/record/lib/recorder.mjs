// Records one help clip: drives the real app in headless Chrome, captures it
// through the DevTools screencast and encodes an H.264 MP4 plus a poster.
//
// Why the screencast rather than Playwright's own recordVideo: that one
// encodes VP8 at a fixed low bitrate and scales the page to fit 800x800, so
// 13px UI text comes out smeared. The screencast hands over every repaint as
// a full-resolution JPEG with its own timestamp, and ffmpeg turns those into
// a constant-rate video at whatever quality we ask for.
import { mkdir, rm, writeFile, copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import ffmpegPath from 'ffmpeg-static'

export const VIEWPORT = { width: 1280, height: 800 }
// 1.5x keeps text sharp on a retina screen without the files tripling in size.
const SCALE = 1.5
const OUT_SIZE = '1920:1200'

// The screencast films the real window, not Playwright's emulated viewport:
// with an emulated 1280x800 it still sent 1280x713 frames, which the encoder
// then stretched. So the window itself is sized and scaled, and contexts use
// viewport: null. Headless Chrome keeps 87px of the window for its (unseen)
// toolbar, hence the taller window for an 800px page.
export const LAUNCH_ARGS = [`--window-size=${VIEWPORT.width},${VIEWPORT.height + 87}`, `--force-device-scale-factor=${SCALE}`]

// A visible pointer. Headless Chrome paints no cursor, and a silent clip where
// things change with nothing moving is hard to follow. It follows the real
// mouse events Playwright dispatches, so every click lands where it is drawn.
const CURSOR_SCRIPT = `
(() => {
  const install = () => {
    if (document.getElementById('__help_cursor')) return
    const c = document.createElement('div')
    c.id = '__help_cursor'
    c.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 2l14 8.2-6.1 1.3L8 17.6z" fill="#15171e" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>'
    Object.assign(c.style, { position: 'fixed', left: '0', top: '0', zIndex: '2147483647', pointerEvents: 'none', transform: 'translate(-100px,-100px)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.35))' })
    document.documentElement.appendChild(c)
    const ripple = (x, y) => {
      const r = document.createElement('div')
      Object.assign(r.style, { position: 'fixed', left: (x - 18) + 'px', top: (y - 18) + 'px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(79,70,229,.35)', zIndex: '2147483646', pointerEvents: 'none', transition: 'transform .45s ease-out, opacity .45s ease-out', transform: 'scale(.3)', opacity: '1' })
      document.documentElement.appendChild(r)
      requestAnimationFrame(() => { r.style.transform = 'scale(1.4)'; r.style.opacity = '0' })
      setTimeout(() => r.remove(), 500)
    }
    addEventListener('mousemove', (e) => { c.style.transform = 'translate(' + (e.clientX - 3) + 'px,' + (e.clientY - 2) + 'px)' }, true)
    addEventListener('mousedown', (e) => ripple(e.clientX, e.clientY), true)
  }
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', install)
  else install()
})()
`

// Pages that print the app's own address (the check-in tablet link, booking
// widget snippets, invite links) would show the local recording server. Swap
// it for the real address wherever it is drawn, in text and in input values.
const HOST_SCRIPT = `
(() => {
  // Only the page's own origin, and never inside <script>/<style>: Nuxt's
  // payload carries the local Supabase URL, and rewriting it signs nobody in.
  const local = location.origin
  const real = 'https://app.quiroflow.com'
  const skip = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'])
  const fix = () => {
    if (!document.body) return
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    for (let n; (n = walker.nextNode()); ) {
      if (n.nodeValue.includes(local) && !skip.has(n.parentNode?.nodeName)) n.nodeValue = n.nodeValue.split(local).join(real)
    }
    for (const el of document.querySelectorAll('input, textarea')) if (el.value.includes(local)) el.value = el.value.split(local).join(real)
  }
  setInterval(fix, 150)
})()
`

// Hides what only exists because this is a dev build or a test environment,
// so it never ends up in a clip people watch: Nuxt devtools, the Vite error
// overlay, cookie banners for third-party scripts that aren't loaded here.
const CHROME_CSS = `
  nuxt-devtools-frame, #nuxt-devtools-container, .nuxt-devtools-anchor, vite-error-overlay { display: none !important; }
  * { caret-color: #4f46e5; }
`

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] })
    let err = ''
    p.stderr.on('data', (d) => (err += d))
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}\n${err.slice(-2000)}`))))
  })
}

function ease(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

/** The verbs a clip script is written in. Each one is paced for a person watching. */
export function helpers(page) {
  let pos = { x: VIEWPORT.width * 0.6, y: VIEWPORT.height * 0.55 }

  async function moveTo(x, y, ms = 550) {
    const steps = Math.max(8, Math.round(ms / 16))
    const from = { ...pos }
    for (let i = 1; i <= steps; i++) {
      const t = ease(i / steps)
      await page.mouse.move(from.x + (x - from.x) * t, from.y + (y - from.y) * t)
      await page.waitForTimeout(ms / steps)
    }
    pos = { x, y }
  }

  function loc(target) {
    return typeof target === 'string' ? page.getByText(target, { exact: true }).first() : target
  }

  async function pointAt(target) {
    const l = loc(target)
    await l.waitFor({ state: 'visible', timeout: 15000 })
    await l.scrollIntoViewIfNeeded()
    const box = await l.boundingBox()
    if (!box) throw new Error(`No box for ${target}`)
    await moveTo(box.x + box.width / 2, box.y + box.height / 2)
    return l
  }

  return {
    page,
    loc,
    pause: (ms = 700) => page.waitForTimeout(ms),
    async hover(target) {
      await pointAt(target)
      await page.waitForTimeout(500)
    },
    async click(target, { after = 650 } = {}) {
      await pointAt(target)
      await page.waitForTimeout(180)
      await page.mouse.down()
      await page.waitForTimeout(70)
      await page.mouse.up()
      await page.waitForTimeout(after)
    },
    async type(target, text, { delay = 55, after = 400 } = {}) {
      const l = await pointAt(target)
      await page.waitForTimeout(150)
      await page.mouse.down()
      await page.mouse.up()
      await l.pressSequentially(text, { delay })
      await page.waitForTimeout(after)
    },
    async select(target, option) {
      await pointAt(target)
      await loc(target).selectOption(option)
      await page.waitForTimeout(500)
    },
    async press(key, after = 500) {
      await page.keyboard.press(key)
      await page.waitForTimeout(after)
    },
    /** Scrolls the page (or the scroller under the pointer) smoothly by dy pixels. */
    async scroll(dy, { at } = {}) {
      if (at) await pointAt(at)
      const step = dy > 0 ? 40 : -40
      for (let done = 0; Math.abs(done) < Math.abs(dy); done += step) {
        await page.mouse.wheel(0, step)
        await page.waitForTimeout(16)
      }
      await page.waitForTimeout(500)
    },
    async moveAway() {
      await moveTo(VIEWPORT.width - 60, VIEWPORT.height - 60, 400)
    },
  }
}

export async function newContext(browser, { storageState, clockAt } = {}) {
  const context = await browser.newContext({
    viewport: null,
    colorScheme: 'light',
    locale: 'es-ES',
    timezoneId: 'Europe/Madrid',
    storageState,
  })
  await context.addInitScript(CURSOR_SCRIPT)
  await context.addInitScript(HOST_SCRIPT)
  await context.addInitScript(`addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = ${JSON.stringify(CHROME_CSS)}; document.head.appendChild(s) })`)
  if (clockAt) await context.clock.install({ time: clockAt })
  return context
}

/**
 * Records clip.run(helpers) into <outDir>/<clip.id>.mp4 and .jpg.
 * clip.prepare (optional) runs before capture starts, for navigation and any
 * state the viewer shouldn't sit through.
 */
export async function recordClip(context, clip, { baseUrl, outDir, tmpDir }) {
  const page = await context.newPage()
  const h = helpers(page)
  const size = await page.evaluate(() => [innerWidth, innerHeight])
  if (size[0] !== VIEWPORT.width || size[1] !== VIEWPORT.height) {
    throw new Error(`Page is ${size.join('x')}, not ${VIEWPORT.width}x${VIEWPORT.height}: launch Chrome with LAUNCH_ARGS`)
  }
  await page.goto(new URL(clip.path, baseUrl).toString(), { waitUntil: 'networkidle' })
  if (clip.ready) await page.locator(clip.ready).first().waitFor({ timeout: 20000 })
  if (clip.prepare) await clip.prepare(h)
  // Let skeletons, fades and late requests settle before the first frame.
  await page.waitForTimeout(900)
  await page.mouse.move(VIEWPORT.width * 0.6, VIEWPORT.height * 0.55)

  const framesDir = join(tmpDir, clip.id)
  await rm(framesDir, { recursive: true, force: true })
  await mkdir(framesDir, { recursive: true })
  const frames = []
  const cdp = await context.newCDPSession(page)
  cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
    const file = join(framesDir, `${String(frames.length).padStart(5, '0')}.jpg`)
    frames.push({ file, t: metadata.timestamp })
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {})
    await writeFile(file, Buffer.from(data, 'base64'))
  })
  await cdp.send('Page.startScreencast', {
    format: 'jpeg',
    quality: 92,
    maxWidth: VIEWPORT.width * SCALE,
    maxHeight: VIEWPORT.height * SCALE,
    everyNthFrame: 1,
  })
  // The screencast only sends a frame when something repaints. Nudge one out
  // now so the clip has a first frame even if the page is perfectly still.
  await page.mouse.move(VIEWPORT.width * 0.6 + 1, VIEWPORT.height * 0.55)
  await page.waitForTimeout(600)

  let endT
  try {
    await clip.run(h)
    await page.waitForTimeout(clip.hold ?? 1600)
  } finally {
    // The screencast's timestamps are epoch seconds. A page that sits still
    // during the hold sends no frames, so the last one has to be stretched to
    // here explicitly or the clip skips its rest on the result.
    endT = Date.now() / 1000
    await cdp.send('Page.stopScreencast').catch(() => {})
    await page.waitForTimeout(200)
  }
  await page.close()
  if (frames.length < 2) throw new Error(`${clip.id}: only ${frames.length} frames captured`)

  // A concat list where each frame lasts until the next one arrived. The last
  // frame gets the hold so the clip rests on its result before looping.
  const lines = []
  for (let i = 0; i < frames.length; i++) {
    const next = frames[i + 1]?.t ?? Math.max(endT, frames[i].t + 0.5)
    lines.push(`file '${frames[i].file}'`, `duration ${Math.max(0.001, next - frames[i].t).toFixed(4)}`)
  }
  lines.push(`file '${frames.at(-1).file}'`)
  const list = join(framesDir, 'frames.txt')
  await writeFile(list, lines.join('\n'))

  await mkdir(outDir, { recursive: true })
  const mp4 = join(outDir, `${clip.id}.mp4`)
  await run(ffmpegPath, [
    '-y', '-f', 'concat', '-safe', '0', '-i', list,
    '-vf', `fps=30,scale=${OUT_SIZE}:flags=lanczos,format=yuv420p`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-tune', 'stillimage',
    '-movflags', '+faststart', '-an', mp4,
  ])
  // The poster is the first frame: it's what the loop starts from, so the
  // switch from poster to playing video is seamless.
  const poster = join(outDir, `${clip.id}.jpg`)
  await run(ffmpegPath, ['-y', '-i', frames[0].file, '-vf', `scale=${OUT_SIZE}:flags=lanczos`, '-q:v', '4', poster])
  const seconds = frames.at(-1).t - frames[0].t + (clip.hold ?? 1600) / 1000
  return { id: clip.id, frames: frames.length, seconds: Math.round(seconds * 10) / 10 }
}

export { copyFile }
