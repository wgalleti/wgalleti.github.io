<script setup>
import { computed, inject, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const products = inject('products')
const currentLang = inject('currentLang')
const t = inject('t')

const lang = computed(() => currentLang.value || 'pt')

const localized = (obj) => {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  return obj[lang.value] || obj.pt || ''
}

const items = computed(() =>
  (products.value || []).map((p) => ({
    id: p.id,
    name: p.name,
    tagline: localized(p.tagline) || localized(p.description),
    url: p.url,
    isSaas: Boolean(p.plans?.length),
    technologies: (p.technologies || []).slice(0, 3),
  })),
)

let observer = null
onMounted(() => {
  window.scrollTo({ top: 0 })
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('is-visible')
        return
      }
      observer.observe(el)
    })
  }, 100)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <main class="flex-grow" style="padding-top: 110px;">
    <section class="container-shell flex flex-col" style="gap: 40px; padding-bottom: 90px;">
      <div class="reveal flex flex-col" style="gap: 14px;">
        <span class="eyebrow">{{ t('productsEyebrow') }}</span>
        <h1 class="h2-section">{{ t('productsTitle') }}</h1>
        <p class="text-muted m-0" style="font-size: 16.5px; line-height: 1.65; max-width: 620px;">
          {{ t('productsDesc') }}
        </p>
      </div>

      <div class="products-grid">
        <RouterLink
          v-for="item in items"
          :key="item.id"
          :to="{ name: 'product', params: { id: item.id } }"
          class="reveal knot-card no-underline group"
        >
          <div class="flex items-center justify-between" style="gap: 12px;">
            <span class="font-mono text-violet" style="font-size: 11.5px;">
              {{ item.isSaas ? (lang === 'pt' ? 'saas' : 'saas') : (lang === 'pt' ? 'projeto' : 'project') }}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </div>
          <h3 class="m-0" style="font-size: 19px; font-weight: 700; line-height: 1.3;">{{ item.name }}</h3>
          <p class="text-muted m-0" style="font-size: 14.5px; line-height: 1.55; flex: 1;">{{ item.tagline }}</p>
          <div v-if="item.technologies.length" class="flex flex-wrap" style="gap: 6px;">
            <span
              v-for="tech in item.technologies"
              :key="tech"
              class="font-mono text-faint"
              style="font-size: 11px;"
            >{{ tech }}{{ '·' }}</span>
          </div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}
</style>
