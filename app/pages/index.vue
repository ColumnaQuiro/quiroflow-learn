<script setup lang="ts">
import { collections } from '~/utils/collections'

// A hand-picked set rather than derived from view counts -- there's no
// analytics wired up yet, so "popular" just means "most likely to be useful
// first" until real usage data exists to base it on instead.
const POPULAR_PATHS = [
  '/articles/getting-started/welcome-to-quiroflow',
  '/articles/calendar-appointments/booking-an-appointment',
  '/articles/billing-payments/selling-a-package-bono',
  '/articles/billing-payments/adding-a-patients-card',
  '/articles/calendar-appointments/appointment-statuses-explained',
  '/articles/getting-started/inviting-your-team',
]

const { data: popular } = await useAsyncData('home-popular', async () => {
  const all = await queryCollection('articles').all()
  const byPath = new Map(all.map((a) => [a.path, a]))
  return POPULAR_PATHS.map((p) => byPath.get(p)).filter(Boolean)
})
</script>

<template>
  <main>
    <section class="hero">
      <div class="container">
        <h1>How can we help?</h1>
        <p>Guides and answers for using QuiroFlow -- your calendar, patients, billing, and communications, all in one place.</p>
      </div>
    </section>

    <section class="container section">
      <h2 class="section-title">Popular articles</h2>
      <ul class="popular-list">
        <li v-for="a in popular" :key="a.path">
          <NuxtLink :to="a.path">{{ a.title }}</NuxtLink>
        </li>
      </ul>
    </section>

    <section class="container section">
      <h2 class="section-title">Collections</h2>
      <div class="grid">
        <NuxtLink v-for="c in collections" :key="c.slug" :to="`/articles/${c.slug}`" class="card">
          <span class="card-icon">{{ c.icon }}</span>
          <span class="card-title">{{ c.title }}</span>
          <span class="card-desc">{{ c.description }}</span>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-line);
  padding: 56px 0 40px;
  text-align: center;
}
.hero h1 {
  font-size: 32px;
  font-weight: 650;
  letter-spacing: -0.014em;
  color: var(--color-ink-900);
  margin: 0 0 10px;
}
.hero p {
  color: var(--color-ink-muted);
  font-size: 15px;
  max-width: 520px;
  margin: 0 auto;
}
.section {
  padding: 36px 0;
}
.section-title {
  font-size: 13px;
  font-weight: 650;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--color-ink-muted2);
  margin: 0 0 14px;
}
.popular-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.popular-list a {
  display: block;
  padding: 12px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: 10px;
  color: var(--color-ink-700);
  font-size: 14px;
  font-weight: 550;
}
.popular-list a:hover {
  border-color: var(--color-brand);
  text-decoration: none;
  color: var(--color-brand-text);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: 12px;
  color: var(--color-ink-700);
}
.card:hover {
  border-color: var(--color-brand);
  text-decoration: none;
}
.card-icon {
  font-size: 22px;
  margin-bottom: 4px;
}
.card-title {
  font-size: 14.5px;
  font-weight: 620;
  color: var(--color-ink-900);
}
.card-desc {
  font-size: 12.5px;
  color: var(--color-ink-muted);
  line-height: 1.5;
}
</style>
