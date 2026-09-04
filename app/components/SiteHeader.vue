<script setup lang="ts">
const router = useRouter()
const { locale, t, localePath, switchLocaleHref } = useLocale()
const q = ref('')

function submitSearch() {
  const query = q.value.trim()
  if (!query) return
  router.push({ path: localePath('/search'), query: { q: query } })
}
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <NuxtLink :to="localePath('/')" class="brand" :aria-label="t.siteTitle">
        <img src="/logo/quiroflow-app-icon.svg" alt="" width="26" height="26" />
        <span class="brand-title">{{ t.siteTitle }}</span>
      </NuxtLink>
      <div class="right">
        <form class="search" @submit.prevent="submitSearch">
          <input v-model="q" type="search" :placeholder="t.searchPlaceholder" :aria-label="t.searchPlaceholder" />
        </form>
        <nav class="lang" aria-label="Language">
          <!-- Plain <a>, not NuxtLink: switching locale changes values (meta,
               page, siblings) computed once at page setup from route params
               read at mount time. Vue Router reuses this component instance
               across an SPA transition between the English and Spanish
               variant of the same page, so those never recompute -- only
               things wrapped in computed() (like the header's own t/locale)
               would update, leaving the page a stale mix of both languages.
               A full navigation re-mounts everything fresh; on a static site
               there's no real cost to that. -->
          <a :href="switchLocaleHref('en')" :class="{ active: locale === 'en' }">EN</a>
          <a :href="switchLocaleHref('es')" :class="{ active: locale === 'es' }">ES</a>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  border-bottom: 1px solid var(--color-line);
  background: var(--color-surface);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 64px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 620;
  font-size: 14.5px;
  color: var(--color-ink-900);
}
.brand:hover {
  text-decoration: none;
  color: var(--color-ink-900);
}
.right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.lang {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border-radius: 8px;
  background: var(--color-surface-subtle);
  border: 1px solid var(--color-line);
}
.lang a {
  padding: 4px 9px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 650;
  color: var(--color-ink-muted);
  letter-spacing: 0.02em;
}
.lang a:hover {
  text-decoration: none;
  color: var(--color-ink-700);
}
.lang a.active {
  background: var(--color-surface);
  color: var(--color-brand-text);
  box-shadow: 0 1px 2px rgba(20, 22, 30, 0.06);
}
.search input {
  width: 220px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--color-line);
  background: var(--color-surface-subtle);
  padding: 0 12px;
  font-size: 13.5px;
  font-family: inherit;
  color: var(--color-ink-700);
}
.search input:focus {
  outline: none;
  border-color: var(--color-brand);
  background: var(--color-surface);
}
@media (max-width: 560px) {
  .search input {
    width: 150px;
  }
}
@media (max-width: 460px) {
  /* "QuiroFlow Help Center" plus a search box and the EN/ES toggle doesn't
     fit one row this narrow -- it used to wrap the title across three
     lines while the header's fixed height clipped it. Icon-only branding
     (with the full title still read by screen readers via the link's
     aria-label) keeps everything on one line instead. */
  .brand-title {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
}
</style>
