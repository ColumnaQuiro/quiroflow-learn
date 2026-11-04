// Adds what the clips need on top of the demo clinic that QuiroFlow's own
// scripts/seed-demo-clinic.ts creates (practitioners, patients, nine months
// of visits and receipts). Each file in seed/ adds one collection's extras --
// a waitlist entry, saved replies, leads -- and must be safe to run again.
//
//   SUPABASE_URL=http://127.0.0.1:54921 node scripts/record/seed.mjs [name...]
//
// Local only: it refuses any URL that is not localhost.
import { readdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const here = dirname(fileURLToPath(import.meta.url))
const url = process.env.SUPABASE_URL || 'http://127.0.0.1:54921'
// The Supabase CLI's fixed local service key -- public, and useless anywhere else.
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
if (!/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/.test(url)) {
  console.error(`Refusing to seed ${url}: local Supabase only.`)
  process.exit(1)
}
const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })

export async function demoContext() {
  const { data: users, error } = await admin.auth.admin.listUsers({ perPage: 1000 })
  if (error) throw error
  const owner = users.users.find((u) => u.email === 'demo@clinica-demo.test')
  if (!owner) throw new Error('No demo clinic -- run QuiroFlow scripts/seed-demo-clinic.ts first')
  const { data: tm } = await admin.from('team_members').select('account_id').eq('user_id', owner.id).single()
  const accountId = tm.account_id
  const { data: clinics } = await admin.from('clinics').select('id, name').eq('account_id', accountId).order('created_at')
  const { data: team } = await admin.from('team_members').select('id, full_name, user_id, is_practitioner, is_owner').eq('account_id', accountId)
  const { data: patients } = await admin.from('patients').select('id, first_name, last_name').eq('account_id', accountId)
  return { admin, accountId, ownerUserId: owner.id, clinicId: clinics[0].id, clinics, team, patients }
}

const wanted = process.argv.slice(2)
const files = (await readdir(join(here, 'seed'))).filter((f) => f.endsWith('.mjs')).sort()
const ctx = await demoContext()
for (const f of files) {
  if (wanted.length && !wanted.some((w) => f.includes(w))) continue
  const mod = await import(pathToFileURL(join(here, 'seed', f)).href)
  await mod.default(ctx)
  console.log(`✓ seed/${f}`)
}
