<script setup lang="ts">
import { collectionBySlug } from '~/utils/collections'

const route = useRoute()
const q = computed(() => (route.query.q as string) ?? '')

const { data: all } = await useAsyncData('search-all', () => queryCollection('articles').all())

const results = computed(() => {
  const needle = q.value.trim().toLowerCase()
  if (!needle || !all.value) return []
  return all.value.filter((a) => a.title.toLowerCase().includes(needle) || a.description.toLowerCase().includes(needle))
})

useHead({ title: `Search: ${q.value} - QuiroFlow Help Center` })
</script>

<template>
  <main class="container page">
    <h1>Search results for &ldquo;{{ q }}&rdquo;</h1>
    <ul v-if="results.length > 0" class="list">
      <li v-for="a in results" :key="a.path">
        <NuxtLink :to="a.path">
          <span class="tag">{{ collectionBySlug(a.collection)?.title }}</span>
          <span class="title">{{ a.title }}</span>
          <span class="desc">{{ a.description }}</span>
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="empty">No articles matched &ldquo;{{ q }}&rdquo;. Try a different search, or browse the collections on the <NuxtLink to="/">home page</NuxtLink>.</p>
  </main>
</template>

<style scoped>
.page {
  padding: 32px 0 64px;
}
h1 {
  font-size: 20px;
  font-weight: 620;
  color: var(--color-ink-900);
  margin: 0 0 20px;
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
  gap: 4px;
  padding: 14px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: 10px;
}
.list a:hover {
  border-color: var(--color-brand);
  text-decoration: none;
}
.tag {
  font-size: 11px;
  font-weight: 650;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--color-brand-text);
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
}
</style>
