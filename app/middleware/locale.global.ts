// The [[locale]] optional catch-all segment matches ANY string in that
// position, not just 'es' -- without this, /fr/articles/... or /whatever/...
// would silently render English content under a nonsense URL instead of
// 404ing like it should.
export default defineNuxtRouteMiddleware((to) => {
  const raw = to.params.locale as string | string[] | undefined
  const seg = Array.isArray(raw) ? raw[0] : raw
  if (seg && seg !== 'es') {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }
})
