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

const { data: siblings } = await useAsyncData(`siblings-${locale.value}-${collectionSlug}`, () =>
  queryCollection(collectionName).where('collection', '=', collectionSlug).order('order', 'ASC').all(),
)

useHead({ title: `${page.value.title} - ${t.value.siteTitle}`, meta: [{ name: 'description', content: page.value.description }] })
</script>

<template>
  <main class="container page">
    <nav class="breadcrumb">
      <NuxtLink :to="localePath('/')">{{ t.helpCenter }}</NuxtLink>
      <span>/</span>
      <NuxtLink :to="localePath(`/articles/${collectionSlug}`)">{{ meta.title }}</NuxtLink>
    </nav>

    <div class="layout">
      <article v-if="page" class="prose">
        <ContentRenderer :value="page" />
      </article>

      <aside class="sidebar">
        <p class="sidebar-title">{{ meta.title }}</p>
        <ul>
          <li v-for="a in siblings" :key="a.path">
            <NuxtLink :to="a.path" :class="{ active: a.path === route.path }">{{ a.title }}</NuxtLink>
          </li>
        </ul>
      </aside>
    </div>
  </main>
</template>

<style scoped>
.page {
  padding: 28px 0 64px;
}
.breadcrumb {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 12.5px;
  color: var(--color-ink-faint);
  margin-bottom: 20px;
}
.layout {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 40px;
  align-items: start;
}
@media (max-width: 760px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .sidebar {
    order: -1;
  }
}
.sidebar {
  position: sticky;
  top: 84px;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: 10px;
  padding: 14px;
}
.sidebar-title {
  font-size: 12px;
  font-weight: 650;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--color-ink-muted2);
  margin: 0 0 8px;
}
.sidebar ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 2px;
}
.sidebar a {
  display: block;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--color-ink-muted);
}
.sidebar a:hover {
  background: var(--color-surface-subtle);
  text-decoration: none;
}
.sidebar a.active {
  background: var(--color-brand-tint);
  color: var(--color-brand-text);
  font-weight: 600;
}
</style>
