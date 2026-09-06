// Emits public/corpus.json: every help article as plain text, for the
// in-app help assistant in the main QuiroFlow app to answer questions from.
//
// Why a build script rather than a Nuxt server route: this site is
// `nitro: { preset: 'static' }` -- there is no server at runtime, so the
// corpus has to be a real file produced at build time and served off the
// CDN like any other asset. That also makes it trivially cacheable and
// keeps the help centre the single source of truth: nothing copies these
// articles into the app repo, where they'd immediately start drifting.
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://learn.quiroflow.com'

async function markdownFiles(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await markdownFiles(full)))
    else if (entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

// Deliberately hand-rolled instead of pulling in a YAML dependency: the
// frontmatter here is four flat scalar keys (title, description,
// collection, order), and this script runs in the build with no other
// deps of its own.
function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
  if (!match) return { data: {}, body: raw.trim() }
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^(\w+):\s*(.*)$/.exec(line)
    if (!kv) continue
    data[kv[1]] = kv[2].trim().replace(/^["'](.*)["']$/, '$1')
  }
  return { data, body: raw.slice(match[0].length).trim() }
}

// The assistant reads this as prose, so strip what only makes sense as
// rendered HTML -- ::image-carousel blocks and their YAML payload are pure
// screenshot scaffolding and would otherwise read as noise mid-sentence.
function toPlainText(body) {
  return body
    .replace(/^::\w[\w-]*\r?\n[\s\S]*?^::\s*$/gm, '')
    .replace(/^::\w[\w-]*\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const sources = [
  { lang: 'en', dir: join(root, 'content', 'articles'), urlPrefix: `${SITE}/articles` },
  { lang: 'es', dir: join(root, 'content', 'es', 'articles'), urlPrefix: `${SITE}/es/articles` },
]

const articles = []
for (const source of sources) {
  for (const file of await markdownFiles(source.dir)) {
    const raw = await readFile(file, 'utf8')
    const { data, body } = parseFrontmatter(raw)
    const slug = relative(source.dir, file).replace(/\.md$/, '').split(sep).join('/')
    articles.push({
      lang: source.lang,
      slug,
      url: `${source.urlPrefix}/${slug}`,
      title: data.title ?? slug,
      description: data.description ?? '',
      collection: data.collection ?? slug.split('/')[0],
      body: toPlainText(body),
    })
  }
}

articles.sort((a, b) => a.lang.localeCompare(b.lang) || a.slug.localeCompare(b.slug))

const outFile = join(root, 'public', 'corpus.json')
await mkdir(dirname(outFile), { recursive: true })
await writeFile(outFile, JSON.stringify({ generatedAt: new Date().toISOString(), articles }, null, 2))

const bytes = articles.reduce((n, a) => n + a.body.length, 0)
console.log(`corpus.json: ${articles.length} articles (${(bytes / 1024).toFixed(0)} KB of text)`)
