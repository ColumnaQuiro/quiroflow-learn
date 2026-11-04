// Uploads scripts/record/out/* to the public `help-videos` bucket that
// HelpVideo.vue reads from, creating the bucket the first time.
//
//   SUPABASE_URL=https://oyaprkfurtuujdfafptw.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=... node scripts/record/upload.mjs [filter...]
//
// Clips keep stable names, so a re-record replaces the file in place and no
// article has to change. The hour of max-age is how long a replaced clip can
// still be served stale from the CDN.
import { readdir, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const OUT = join(here, 'out')
const BUCKET = 'help-videos'
const url = process.env.SUPABASE_URL || 'https://oyaprkfurtuujdfafptw.supabase.co'
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!key) {
  console.error('Set SUPABASE_SERVICE_ROLE_KEY (Supabase dashboard → Project settings → API keys).')
  process.exit(1)
}
const auth = { Authorization: `Bearer ${key}`, apikey: key }

async function ensureBucket() {
  const r = await fetch(`${url}/storage/v1/bucket/${BUCKET}`, { headers: auth })
  if (r.ok) return
  const created = await fetch(`${url}/storage/v1/bucket`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: true,
      file_size_limit: 20 * 1024 * 1024,
      allowed_mime_types: ['video/mp4', 'image/jpeg'],
    }),
  })
  if (!created.ok) throw new Error(`Creating bucket: ${created.status} ${await created.text()}`)
  console.log(`Created public bucket ${BUCKET}`)
}

const filters = process.argv.slice(2)
const files = (await readdir(OUT))
  .filter((f) => /\.(mp4|jpg)$/.test(f))
  .filter((f) => !filters.length || filters.some((x) => f.includes(x)))

await ensureBucket()
let bytes = 0
for (const f of files) {
  const body = await readFile(join(OUT, f))
  const r = await fetch(`${url}/storage/v1/object/${BUCKET}/${f}`, {
    method: 'POST',
    headers: {
      ...auth,
      'Content-Type': f.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg',
      'Cache-Control': 'max-age=3600',
      'x-upsert': 'true',
    },
    body,
  })
  if (!r.ok) throw new Error(`${f}: ${r.status} ${await r.text()}`)
  bytes += body.length
  console.log(`↑ ${f}`)
}
console.log(`${files.length} files, ${(bytes / 1024 / 1024).toFixed(1)} MB`)
