<script setup lang="ts">
import { collectionBySlug } from '~/utils/collections'

const route = useRoute()
const { locale, t, localePath } = useLocale()
const collectionSlug = route.params.collection as string
const meta = collectionBySlug(locale.value, collectionSlug)
if (!meta) {
  throw createError({ statusCode: 404, statusMessage: 'Collection not found', fatal: true })
}

const collectionName = locale.value === 'es' ? 'articlesEs' : 'articles'
const { data: page } = await useAsyncData(`article-${route.path}`, () => queryCollection(collectionName).path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

// Only fetched for prev/next -- the full collection listing itself now lives
// in the persistent CategorySidebar, so this page doesn't need to repeat it.
const { data: siblings } = await useAsyncData(`siblings-${locale.value}-${collectionSlug}`, () =>
  queryCollection(collectionName).where('collection', '=', collectionSlug).order('order', 'ASC').all(),
)
const prev = computed(() => {
  const list = siblings.value ?? []
  const i = list.findIndex((a) => a.path === route.path)
  return i > 0 ? list[i - 1] : null
})
const next = computed(() => {
  const list = siblings.value ?? []
  const i = list.findIndex((a) => a.path === route.path)
  return i >= 0 && i < list.length - 1 ? list[i + 1] : null
})

useHead({ title: `${page.value.title} - ${t.value.siteTitle}`, meta: [{ name: 'description', content: page.value.description }] })
</script>

<template>
  <main class="container page">
    <nav class="breadcrumb">
      <NuxtLink :to="localePath('/')">{{ t.helpCenter }}</NuxtLink>
      <span>/</span>
      <NuxtLink :to="localePath(`/articles/${collectionSlug}`)">{{ meta.title }}</NuxtLink>
    </nav>

    <article v-if="page" class="prose">
      <ContentRenderer :value="page" />
    </article>

    <nav v-if="prev || next" class="prev-next">
      <NuxtLink v-if="prev" :to="prev.path" class="pn prev">
        <span class="pn-label">{{ t.previous }}</span>
        <span class="pn-title">{{ prev.title }}</span>
      </NuxtLink>
      <span v-else />
      <NuxtLink v-if="next" :to="next.path" class="pn next">
        <span class="pn-label">{{ t.next }}</span>
        <span class="pn-title">{{ next.title }}</span>
      </NuxtLink>
    </nav>
  </main>
</template>

<style scoped>
.page {
  padding: 28px 0 64px;
  max-width: 760px;
}
.breadcrumb {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 12.5px;
  color: var(--color-ink-faint);
  margin-bottom: 20px;
}
.prev-next {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--color-line-divider);
}
.pn {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px 14px;
  border: 1px solid var(--color-line);
  border-radius: 10px;
  background: var(--color-surface);
  min-width: 0;
}
.pn:hover {
  border-color: var(--color-brand);
  text-decoration: none;
}
.pn.next {
  text-align: right;
  grid-column: 2;
}
.pn-label {
  font-size: 11px;
  font-weight: 650;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--color-ink-faint);
}
.pn-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-ink-900);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media (max-width: 560px) {
  .prev-next {
    grid-template-columns: 1fr;
  }
  .pn.next {
    grid-column: 1;
    text-align: left;
  }
}
</style>
