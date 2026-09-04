<script setup lang="ts">
import { collectionsFor } from '~/utils/collections'

const route = useRoute()
const { locale, localePath } = useLocale()

const { data: allArticles } = await useAsyncData(
  () => `sidebar-articles-${locale.value}`,
  () => queryCollection(locale.value === 'es' ? 'articlesEs' : 'articles').select('path', 'title', 'collection', 'order').order('order', 'ASC').all(),
  { watch: [locale] },
)

const collections = computed(() => collectionsFor(locale.value))

function articlesFor(slug: string) {
  return (allArticles.value ?? []).filter((a) => a.collection === slug)
}

const currentCollection = computed(() => {
  const raw = route.params.collection as string | string[] | undefined
  return Array.isArray(raw) ? raw[0] : raw
})

// A collection is "open" if the reader is somewhere inside it, or if they
// clicked it themselves -- a Set (not a single active slug) so more than one
// section can be pinned open at once while browsing around.
const manuallyToggled = ref<Set<string>>(new Set())
function isOpen(slug: string) {
  if (manuallyToggled.value.has(slug)) return true
  if (manuallyToggled.value.has(`-${slug}`)) return false
  return slug === currentCollection.value
}
function toggle(slug: string) {
  const open = isOpen(slug)
  const next = new Set(manuallyToggled.value)
  next.delete(slug)
  next.delete(`-${slug}`)
  next.add(open ? `-${slug}` : slug)
  manuallyToggled.value = next
}

const mobileOpen = ref(false)
</script>

<template>
  <aside class="sidebar-wrap">
    <button type="button" class="mobile-toggle" :aria-expanded="mobileOpen" @click="mobileOpen = !mobileOpen">
      <span>{{ mobileOpen ? '✕' : '☰' }}</span>
      <span>Browse categories</span>
    </button>

    <nav class="sidebar" :class="{ 'mobile-open': mobileOpen }" aria-label="Categories">
      <NuxtLink :to="localePath('/')" class="home-link" :class="{ active: !currentCollection }" @click="mobileOpen = false">
        <span class="icon">🏠</span>
        <span class="label">Help Center</span>
      </NuxtLink>

      <div v-for="c in collections" :key="c.slug" class="group">
        <div class="group-row">
          <NuxtLink :to="localePath(`/articles/${c.slug}`)" class="group-link" :class="{ active: currentCollection === c.slug }" @click="mobileOpen = false">
            <span class="icon">{{ c.icon }}</span>
            <span class="label">{{ c.title }}</span>
          </NuxtLink>
          <button
            type="button"
            class="chevron"
            :class="{ open: isOpen(c.slug) }"
            :aria-expanded="isOpen(c.slug)"
            :aria-label="`Toggle ${c.title} articles`"
            @click="toggle(c.slug)"
          >
            <svg viewBox="0 0 20 20" width="14" height="14"><path d="m7 4.5 6 5.5-6 5.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
        </div>

        <ul v-if="isOpen(c.slug)" class="article-list">
          <li v-for="a in articlesFor(c.slug)" :key="a.path">
            <NuxtLink :to="a.path" :class="{ active: a.path === route.path }" @click="mobileOpen = false">{{ a.title }}</NuxtLink>
          </li>
          <li v-if="articlesFor(c.slug).length === 0" class="empty">Coming soon</li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.mobile-toggle {
  display: none;
}
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 4px 32px;
}
.home-link {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 620;
  color: var(--color-ink-700);
  margin-bottom: 6px;
}
.home-link:hover {
  background: var(--color-surface-subtle);
  text-decoration: none;
}
.home-link.active {
  background: var(--color-brand-tint);
  color: var(--color-brand-text);
}
.group {
  display: flex;
  flex-direction: column;
}
.group-row {
  display: flex;
  align-items: stretch;
}
.group-link {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  padding: 8px 4px 8px 10px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 610;
  color: var(--color-ink-700);
}
.group-link:hover {
  background: var(--color-surface-subtle);
  text-decoration: none;
}
.group-link.active {
  background: var(--color-brand-tint);
  color: var(--color-brand-text);
}
.group-link .label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.icon {
  font-size: 15px;
  line-height: 1;
  flex-shrink: 0;
}
.chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  border: none;
  background: none;
  color: var(--color-ink-faint);
  border-radius: 6px;
  cursor: pointer;
}
.chevron:hover {
  background: var(--color-surface-subtle);
  color: var(--color-ink-muted);
}
.chevron svg {
  transition: transform 0.15s ease;
}
.chevron.open svg {
  transform: rotate(90deg);
}
.article-list {
  list-style: none;
  margin: 2px 0 6px;
  padding: 0 0 0 33px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  border-left: 1px solid var(--color-line-divider);
  margin-left: 15px;
}
.article-list a {
  display: block;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12.5px;
  color: var(--color-ink-muted);
  line-height: 1.35;
}
.article-list a:hover {
  background: var(--color-surface-subtle);
  color: var(--color-ink-700);
  text-decoration: none;
}
.article-list a.active {
  color: var(--color-brand-text);
  font-weight: 620;
  background: var(--color-brand-tint);
}
.article-list .empty {
  padding: 6px 10px;
  font-size: 12px;
  color: var(--color-ink-faint);
  font-style: italic;
}

@media (max-width: 880px) {
  .mobile-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 11px 16px;
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 610;
    color: var(--color-ink-700);
    margin-bottom: 14px;
  }
  .sidebar {
    display: none;
  }
  .sidebar.mobile-open {
    display: flex;
    margin-bottom: 18px;
    padding: 10px;
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: 10px;
    max-height: 60vh;
    overflow-y: auto;
  }
}
</style>
