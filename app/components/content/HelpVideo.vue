<script setup lang="ts">
// A short, silent screen recording of one task, used in place of a static
// screenshot. The clips are recorded by scripts/record against a fictional
// demo clinic and live in the public `help-videos` bucket on Supabase
// Storage, not in this repo: every re-record would otherwise grow git
// history, and serving video off Netlify spends deploy credits per GB.
//
// They behave like an animated screenshot rather than a video player: muted,
// looping, playing only while on screen. preload="none" plus the poster means
// a long article downloads nothing until someone scrolls to a clip.
const props = defineProps<{ clip: string; alt?: string; caption?: string }>()

const base = useRuntimeConfig().public.helpVideoBase as string
const src = computed(() => `${base}/${props.clip}.mp4`)
const poster = computed(() => `${base}/${props.clip}.jpg`)

const video = ref<HTMLVideoElement | null>(null)
const playing = ref(false)
// Someone who paused a clip by hand shouldn't have it restart the moment it
// scrolls back into view.
const pausedByHand = ref(false)
let observer: IntersectionObserver | null = null

function play() {
  video.value?.play().catch(() => {
    // Autoplay can still be refused (Low Power Mode on iOS). The poster and
    // the play button stay up, which is exactly the fallback we want.
  })
}

function toggle() {
  const v = video.value
  if (!v) return
  if (v.paused) {
    pausedByHand.value = false
    play()
  } else {
    pausedByHand.value = true
    v.pause()
  }
}

onMounted(() => {
  const v = video.value
  if (!v) return
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) pausedByHand.value = true
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry!.isIntersecting && !pausedByHand.value) play()
      else if (!entry!.isIntersecting) v.pause()
    },
    { threshold: 0.5 },
  )
  observer.observe(v)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <figure class="help-video">
    <div class="frame" @click="toggle">
      <video
        ref="video"
        :src="src"
        :poster="poster"
        :aria-label="alt"
        muted
        loop
        playsinline
        preload="none"
        @play="playing = true"
        @pause="playing = false"
      />
      <button
        type="button"
        class="toggle"
        :class="{ visible: !playing }"
        :aria-label="playing ? 'Pause' : 'Play'"
        @click.stop="toggle"
      >
        <svg v-if="playing" viewBox="0 0 20 20" width="16" height="16"><path d="M6.5 4.5v11M13.5 4.5v11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" /></svg>
        <svg v-else viewBox="0 0 20 20" width="18" height="18"><path d="M6.5 4.2v11.6L15.8 10z" fill="currentColor" /></svg>
      </button>
    </div>
    <figcaption v-if="caption" class="caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.help-video {
  margin: 0 0 18px;
}
.frame {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid var(--color-line);
  background: var(--color-surface-subtle);
  aspect-ratio: 16 / 10;
  cursor: pointer;
}
.frame video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.toggle {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: none;
  background: rgba(21, 23, 30, 0.66);
  color: #fff;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease;
}
.toggle.visible,
.frame:hover .toggle,
.toggle:focus-visible {
  opacity: 1;
}
.caption {
  margin-top: 8px;
  font-size: 13px;
  color: var(--color-ink-muted);
  text-align: center;
}
</style>
