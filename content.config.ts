import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  collection: z.string(),
  order: z.number().default(0),
})

export default defineContentConfig({
  collections: {
    // English (default, no path prefix) and Spanish (under /es) are two
    // separate collections rather than one with a `locale` field -- Nuxt
    // Content derives `path` from each collection's own `source` glob, so
    // this is what gives Spanish articles their /es/articles/... paths for
    // free instead of having to compute them by hand everywhere.
    articles: defineCollection({
      type: 'page',
      source: 'articles/**/*.md',
      schema: articleSchema,
    }),
    articlesEs: defineCollection({
      type: 'page',
      source: 'es/articles/**/*.md',
      schema: articleSchema,
    }),
  },
})
