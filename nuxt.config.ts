// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  // Force plain static output regardless of host auto-detection (Netlify's
  // build otherwise swaps in its own "netlify" Nitro preset, which expects
  // serverless/edge function artifacts this site has no use for -- it's
  // pure Markdown-to-HTML with no server-side logic anywhere).
  nitro: { preset: 'static' },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'QuiroFlow Help Center',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
      meta: [{ name: 'description', content: 'Guides and answers for using QuiroFlow -- your calendar, patients, billing, and communications, all in one place.' }],
    },
  },
})
