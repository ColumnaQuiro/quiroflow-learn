<script setup lang="ts">
const router = useRouter()
const q = ref('')

function submitSearch() {
  const query = q.value.trim()
  if (!query) return
  router.push({ path: '/search', query: { q: query } })
}
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <NuxtLink to="/" class="brand">
        <img src="/logo/quiroflow-app-icon.svg" alt="" width="26" height="26" />
        <span>QuiroFlow Help Center</span>
      </NuxtLink>
      <form class="search" @submit.prevent="submitSearch">
        <input v-model="q" type="search" placeholder="Search articles…" aria-label="Search articles" />
      </form>
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
  height: 64px;
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
</style>
