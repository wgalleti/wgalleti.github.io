<script setup>
import { ref, onMounted, inject } from 'vue'

defineProps({
  currentLang: String
})

const t = inject('t')

const visible = ref(false)
const counterRefs = ref({ years: 0, projects: 0, techs: 0, clients: 0 })

const animateCounters = () => {
  const targets = { years: 15, projects: 50, techs: 12, clients: 30 }
  const duration = 2000
  const start = performance.now()

  const tick = (now) => {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)

    counterRefs.value.years = Math.floor(targets.years * ease)
    counterRefs.value.projects = Math.floor(targets.projects * ease)
    counterRefs.value.techs = Math.floor(targets.techs * ease)
    counterRefs.value.clients = Math.floor(targets.clients * ease)

    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  setTimeout(() => {
    visible.value = true
    animateCounters()
  }, 100)
})

const whatsappUrl = 'https://wa.me/5565999448004?text=' + encodeURIComponent('Olá! Vim pelo site da wGalleti Tech e gostaria de iniciar um projeto.')
</script>

<template>
  <section class="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
    <!-- Grid overlay -->
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px); background-size: 60px 60px;"></div>

    <!-- Floating shapes -->
    <div class="absolute top-20 right-[10%] w-72 h-72 opacity-10 animate-float hidden md:block">
      <svg viewBox="0 0 200 200" fill="none">
        <polygon points="100,10 190,60 190,140 100,190 10,140 10,60" stroke="url(#heroGrad)" stroke-width="1" fill="none"/>
        <polygon points="100,40 160,70 160,130 100,160 40,130 40,70" stroke="url(#heroGrad)" stroke-width="0.5" fill="none" opacity="0.5"/>
        <defs><linearGradient id="heroGrad" x1="0" y1="0" x2="200" y2="200"><stop offset="0%" stop-color="#7C3AED"/><stop offset="100%" stop-color="#0EA5E9"/></linearGradient></defs>
      </svg>
    </div>
    <div class="absolute bottom-32 left-[5%] w-48 h-48 opacity-10 animate-float-delayed hidden md:block">
      <svg viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" stroke="#7C3AED" stroke-width="0.5"/>
        <circle cx="50" cy="50" r="30" stroke="#0EA5E9" stroke-width="0.5"/>
        <circle cx="50" cy="50" r="15" stroke="#7C3AED" stroke-width="0.5"/>
      </svg>
    </div>

    <div class="container-section relative z-10">
      <div class="max-w-4xl">
        <div :class="['transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-8">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
            {{ t('heroTag') }}
          </span>
        </div>

        <h1 :class="['heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 transition-all duration-700 delay-150', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
          <span class="text-white">{{ t('heroTitle1') }}</span>
          <br>
          <span class="text-gradient">{{ t('heroTitle2') }}</span>
        </h1>

        <p :class="['text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10 font-body transition-all duration-700 delay-300', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
          {{ t('heroDescription') }}
        </p>

        <div :class="['flex flex-col sm:flex-row gap-4 mb-20 transition-all duration-700 delay-[450ms]', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
          <a :href="whatsappUrl" target="_blank" rel="noopener" class="btn-whatsapp text-base !py-4 !px-8">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {{ t('heroCta') }}
          </a>
          <button @click="document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })" class="btn-secondary text-base !py-4 !px-8">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            {{ t('heroCtaSecondary') }}
          </button>
        </div>

        <div :class="['grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 transition-all duration-700 delay-[600ms]', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
          <div class="text-center md:text-left">
            <div class="text-3xl md:text-4xl font-display font-extrabold text-gradient">{{ counterRefs.years }}+</div>
            <div class="text-sm text-slate-500 font-body mt-1">{{ t('heroStats1') }}</div>
          </div>
          <div class="text-center md:text-left">
            <div class="text-3xl md:text-4xl font-display font-extrabold text-gradient">{{ counterRefs.projects }}+</div>
            <div class="text-sm text-slate-500 font-body mt-1">{{ t('heroStats2') }}</div>
          </div>
          <div class="text-center md:text-left">
            <div class="text-3xl md:text-4xl font-display font-extrabold text-gradient">{{ counterRefs.techs }}+</div>
            <div class="text-sm text-slate-500 font-body mt-1">{{ t('heroStats3') }}</div>
          </div>
          <div class="text-center md:text-left">
            <div class="text-3xl md:text-4xl font-display font-extrabold text-gradient">{{ counterRefs.clients }}+</div>
            <div class="text-sm text-slate-500 font-body mt-1">{{ t('heroStats4') }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
      <div class="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
        <div class="w-1 h-2 bg-white/40 rounded-full animate-pulse"></div>
      </div>
    </div>
  </section>
</template>
