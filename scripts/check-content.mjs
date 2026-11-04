// Checks the articles hang together before a deploy:
//   - every article has the four frontmatter keys and a known collection;
//   - Spanish and English hold the same set of articles;
//   - every internal link points at an article or collection that exists;
//   - nothing still points at the retired /screenshots images;
//   - with --clips, every ::help-video names a clip present in
//     scripts/record/out (i.e. one that has been recorded locally).
//
//   node scripts/check-content.mjs [--clips]
import { readdir, readFile, access } from 'node:fs/promises'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const checkClips = process.argv.includes('--clips')
const collections = [...(await readFile(join(root, 'app/utils/collections.ts'), 'utf8')).matchAll(/slug: '([a-z-]+)'/g)].map((m) => m[1])
const known = new Set(collections)

async function files(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const full = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await files(full)))
    else if (e.name.endsWith('.md')) out.push(full)
  }
  return out
}

const langs = { es: join(root, 'content/es/articles'), en: join(root, 'content/articles') }
const slugs = { es: new Set(), en: new Set() }
const docs = []
for (const [lang, dir] of Object.entries(langs)) {
  for (const f of await files(dir)) {
    const rel = relative(dir, f).replace(/\.md$/, '')
    slugs[lang].add(rel)
    docs.push({ lang, rel, file: relative(root, f), raw: await readFile(f, 'utf8') })
  }
}

const problems = []
const clipIds = new Set()
for (const d of docs) {
  const fm = /^---\n([\s\S]*?)\n---/.exec(d.raw)?.[1] ?? ''
  for (const key of ['title', 'description', 'collection', 'order']) {
    if (!new RegExp(`^${key}:`, 'm').test(fm)) problems.push(`${d.file}: missing frontmatter "${key}"`)
  }
  const col = /^collection:\s*(\S+)/m.exec(fm)?.[1]
  if (col && !known.has(col)) problems.push(`${d.file}: unknown collection "${col}"`)
  if (col && col !== d.rel.split('/')[0]) problems.push(`${d.file}: collection "${col}" but folder "${d.rel.split('/')[0]}"`)
  if (/\/screenshots\/|::image-carousel/.test(d.raw)) problems.push(`${d.file}: still uses screenshots`)

  const prefix = d.lang === 'es' ? '/es/articles/' : '/articles/'
  for (const m of d.raw.matchAll(/\]\((\/(?:es\/)?articles\/[^)#\s]+)/g)) {
    const link = m[1].replace(/\/$/, '')
    if (!link.startsWith(prefix)) {
      problems.push(`${d.file}: links to the other language (${link})`)
      continue
    }
    const target = link.slice(prefix.length)
    const ok = target.includes('/') ? slugs[d.lang].has(target) : known.has(target)
    if (!ok) problems.push(`${d.file}: broken link ${link}`)
  }
  for (const m of d.raw.matchAll(/::help-video\{[^}]*clip="([^"]+)"/g)) clipIds.add(m[1])
}

for (const s of slugs.es) if (!slugs.en.has(s)) problems.push(`no English article for es/${s}`)
for (const s of slugs.en) if (!slugs.es.has(s)) problems.push(`no Spanish article for ${s}`)

if (checkClips) {
  for (const id of clipIds) {
    try {
      await access(join(root, 'scripts/record/out', `${id}.mp4`))
    } catch {
      problems.push(`clip not recorded: ${id}`)
    }
  }
}

console.log(`${docs.length} articles, ${clipIds.size} clips referenced`)
if (problems.length) {
  console.log(problems.sort().join('\n'))
  console.log(`\n${problems.length} problem(s)`)
  process.exit(1)
}
console.log('OK')
