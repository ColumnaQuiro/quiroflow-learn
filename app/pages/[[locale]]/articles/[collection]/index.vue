<script setup lang="ts">
import { collectionBySlug } from '~/utils/collections'

const route = useRoute()
const { locale, t, localePath } = useLocale()
const slug = route.params.collection as string
const meta = collectionBySlug(locale.value, slug)
if (!meta) {
  throw createError({ statusCode: 404, statusMessage: 'Collection not found', fatal: true })
}

const { data: articles } = await useAsyncData(`collection-${locale.value}-${slug}`, () =>
  queryCollection(locale.value === 'es' ? 'articlesEs' : 'articles').where('collection', '=', slug).order('order', 'ASC').all(),
)

useHead({ title: `${meta.title} - ${t.value.siteTitle}` })
</script>

<template>
  <main class="container page">
    <NuxtLink :to="localePath('/')" class="back">{{ t.allCollections }}</NuxtLink>
    <div class="head">
      <span class="icon">{{ meta.icon }}</span>
      <div>
        <h1>{{ meta.title }}</h1>
        <p>{{ meta.description }}</p>
      </div>
    </div>

    <ul v-if="articles && articles.length > 0" class="list">
      <li v-for="a in articles" :key="a.path">
        <NuxtLink :to="a.path">
          <span class="title">{{ a.title }}</span>
          <span class="desc">{{ a.description }}</span>
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="empty">{{ t.comingSoon }}</p>
  </main>
</template>

<style scoped>
.page {
  padding: 32px 0 64px;
}
.back {
  font-size: 13px;
  color: var(--color-ink-muted);
}
.head {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin: 18px 0 28px;
}
.icon {
  font-size: 30px;
  line-height: 1;
}
.head h1 {
  font-size: 24px;
  font-weight: 650;
  color: var(--color-ink-900);
  margin: 0 0 4px;
}
.head p {
  color: var(--color-ink-muted);
  margin: 0;
  font-size: 14px;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.list a {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 14px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: 10px;
}
.list a:hover {
  border-color: var(--color-brand);
  text-decoration: none;
}
.title {
  font-size: 14.5px;
  font-weight: 600;
  color: var(--color-ink-900);
}
.desc {
  font-size: 13px;
  color: var(--color-ink-muted);
}
.empty {
  color: var(--color-ink-muted);
  font-size: 14px;
  padding: 20px;
  background: var(--color-surface);
  border: 1px dashed var(--color-line);
  border-radius: 10px;
}
</style>
