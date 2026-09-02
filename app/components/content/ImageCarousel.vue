<script setup lang="ts">
type Slide = { src: string; alt?: string; caption?: string }

const props = defineProps<{ images: Slide[] }>()

const active = ref(0)
const count = computed(() => props.images.length)

function go(i: number) {
  active.value = ((i % count.value) + count.value) % count.value
}
function next() {
  go(active.value + 1)
}
function prev() {
  go(active.value - 1)
}

// Swipe support -- the same "step through a flow" gesture people expect from
// a phone photo carousel, so this doesn't feel like a slideshow bolted onto
// a docs page.
let touchStartX = 0
function onTouchStart(e: TouchEvent) {
  touchStartX = e.changedTouches[0]!.clientX
}
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0]!.clientX - touchStartX
  if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
}
</script>

<template>
  <figure v-if="count" class="carousel" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
    <div class="viewport">
      <div class="track" :style="{ transform: `translateX(-${active * 100}%)` }">
        <img v-for="(slide, i) in images" :key="slide.src" :src="slide.src" :alt="slide.alt || ''" loading="lazy" :aria-hidden="i !== active" />
      </div>

      <button v-if="count > 1" type="button" class="nav prev" aria-label="Previous step" @click="prev">
        <svg viewBox="0 0 20 20" width="18" height="18"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
      <button v-if="count > 1" type="button" class="nav next" aria-label="Next step" @click="next">
        <svg viewBox="0 0 20 20" width="18" height="18"><path d="m7.5 4.5 5.5 5.5-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>

      <div v-if="count > 1" class="step-badge">{{ active + 1 }} / {{ count }}</div>
    </div>

    <figcaption v-if="images[active]?.caption" class="caption">{{ images[active]!.caption }}</figcaption>

    <div v-if="count > 1" class="dots" role="tablist">
      <button
        v-for="(slide, i) in images"
        :key="slide.src"
        type="button"
        class="dot"
        role="tab"
        :aria-selected="i === active"
        :aria-label="`Step ${i + 1}`"
        :class="{ active: i === active }"
        @click="go(i)"
      />
    </div>
  </figure>
</template>

<style scoped>
.carousel {
  margin: 0 0 8px;
}
.viewport {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid var(--color-line);
  background: var(--color-surface-subtle);
}
.track {
  display: flex;
  transition: transform 0.28s ease;
}
.track img {
  flex: 0 0 100%;
  width: 100%;
  display: block;
}
.nav {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid var(--color-line);
  background: rgba(255, 255, 255, 0.92);
  color: var(--color-ink-700);
  cursor: pointer;
  backdrop-filter: blur(2px);
}
.nav:hover {
  background: #fff;
  color: var(--color-brand-text);
  border-color: var(--color-brand-tint-border);
}
.nav.prev {
  left: 10px;
}
.nav.next {
  right: 10px;
}
.step-badge {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(21, 23, 30, 0.66);
  color: #fff;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
}
.caption {
  margin-top: 8px;
  font-size: 13px;
  color: var(--color-ink-muted);
  text-align: center;
}
.dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 10px;
}
.dot {
  width: 7px;
  height: 7px;
  padding: 0;
  border-radius: 999px;
  border: none;
  background: var(--color-line);
  cursor: pointer;
}
.dot.active {
  background: var(--color-brand);
  width: 18px;
  border-radius: 999px;
  transition: width 0.2s ease;
}
</style>
