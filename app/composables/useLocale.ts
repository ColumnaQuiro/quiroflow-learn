import type { Locale } from '~/utils/collections'

const UI_STRINGS = {
  en: {
    siteTitle: 'QuiroFlow Help Center',
    searchPlaceholder: 'Search articles…',
    heroTitle: 'How can we help?',
    heroSubtitle: "Guides and answers for using QuiroFlow -- your calendar, patients, billing, and communications, all in one place.",
    popularArticles: 'Popular articles',
    collections: 'Collections',
    allCollections: '← All collections',
    helpCenter: 'Help Center',
    comingSoon: 'Articles for this collection are coming soon.',
    searchResultsFor: 'Search results for',
    noResults: (q: string) => `No articles matched "${q}". Try a different search, or browse the collections on the`,
    homePage: 'home page',
  },
  es: {
    siteTitle: 'Centro de ayuda de QuiroFlow',
    searchPlaceholder: 'Buscar artículos…',
    heroTitle: '¿En qué podemos ayudarte?',
    heroSubtitle: 'Guías y respuestas para usar QuiroFlow -- tu agenda, pacientes, facturación y comunicaciones, todo en un mismo lugar.',
    popularArticles: 'Artículos populares',
    collections: 'Colecciones',
    allCollections: '← Todas las colecciones',
    helpCenter: 'Centro de ayuda',
    comingSoon: 'Los artículos de esta colección estarán disponibles pronto.',
    searchResultsFor: 'Resultados de búsqueda para',
    noResults: (q: string) => `Ningún artículo coincide con "${q}". Prueba otra búsqueda, o explora las colecciones en la`,
    homePage: 'página de inicio',
  },
} as const

// One optional catch-all segment ([[locale]]) handles both /articles/... and
// /es/articles/... with a single set of page files. Rejecting anything other
// than 'es' in that segment (a stray /fr/...) happens once, in
// middleware/locale.global.ts -- not here, since this runs in every
// component that needs the current locale (including the header, mounted
// outside the page that owns the route error).
//
// locale/t are computed, not plain values: SiteHeader lives in app.vue,
// outside <NuxtPage>, so it never remounts between navigations -- a plain
// `const locale = ...` here would freeze it at whatever locale was active on
// first mount. Script-side code needs `.value`; templates auto-unwrap top-
// level refs, so `{{ t.siteTitle }}` and `:class="{ active: locale === 'en' }"`
// work unchanged.
export function useLocale() {
  const route = useRoute()

  const locale = computed<Locale>(() => {
    const raw = route.params.locale as string | string[] | undefined
    const seg = Array.isArray(raw) ? raw[0] : raw
    return seg === 'es' ? 'es' : 'en'
  })

  const t = computed(() => UI_STRINGS[locale.value])

  function localePath(path: string): string {
    return locale.value === 'es' ? `/es${path}` : path
  }

  function switchLocaleHref(target: Locale): string {
    const path = route.path
    if (target === 'es') return path.startsWith('/es') ? path : `/es${path === '/' ? '' : path}`
    return path.startsWith('/es') ? path.slice(3) || '/' : path
  }

  return { locale, t, localePath, switchLocaleHref }
}
