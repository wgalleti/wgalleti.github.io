<script setup>
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const products = inject('products')
const t = inject('t')
const currentLang = inject('currentLang')

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const product = computed(() => {
  if (!products.value) return null
  return products.value.find((p) => p.id === props.id) || null
})

const lang = computed(() => currentLang.value || 'pt')

const localized = (obj) => {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  return obj[lang.value] || obj.pt || ''
}

const getDescription = (p) => localized(p.description)
const getProblem = (p) => localized(p.problemSolved)
const getTagline = (p) => {
  if (p.tagline) return localized(p.tagline)
  return getDescription(p)
}
const getAudience = (p) => p?.audience?.[lang.value] || p?.audience?.pt || []
const getIntegrations = (p) => p?.integrations?.[lang.value] || p?.integrations?.pt || []
const getResults = (p) => p?.results?.[lang.value] || p?.results?.pt || []
const isSaas = computed(() => Boolean(product.value?.plans?.length))
const isConfidential = computed(() => Boolean(product.value?.confidential))
const faqItems = computed(() => {
  if (!product.value) return []

  if (isSaas.value) {
    return lang.value === 'pt'
      ? [
          {
            q: 'Esse produto ja esta em operacao?',
            a: 'Sim. A pagina apresenta um produto estruturado para uso real, com foco em operacao, recorrencia e evolucao continua.'
          },
          {
            q: 'E possivel adaptar algo parecido para outro segmento?',
            a: 'Sim. A base pode inspirar uma nova solucao, mas a recomendacao e sempre desenhar o produto ao redor do processo e modelo comercial do cliente.'
          },
          {
            q: 'Vocês fazem so o software ou tambem a estrategia?',
            a: 'A atuacao combina diagnostico, arquitetura, implementacao e evolucao. O objetivo nao e so entregar tela, mas criar uma operacao digital utilizavel.'
          }
        ]
      : [
          {
            q: 'Is this product already in operation?',
            a: 'Yes. This page showcases a product shaped for real operation, recurring usage and continuous evolution.'
          },
          {
            q: 'Can something similar be adapted to another segment?',
            a: 'Yes. The product can inspire a new solution, but the recommendation is always to design it around the client process and business model.'
          },
          {
            q: 'Do you only build the software or also support strategy?',
            a: 'The work combines discovery, architecture, implementation and evolution. The goal is not only to deliver screens, but to create a usable digital operation.'
          }
        ]
  }

  return lang.value === 'pt'
    ? [
        {
          q: 'Esse projeto foi totalmente personalizado?',
          a: 'Sim. Os cases mostrados aqui representam solucoes desenhadas para contexto real, com stack, fluxo e experiencia definidos conforme a necessidade do cliente.'
        },
        {
          q: 'Vocês podem criar algo na mesma linha para outra empresa?',
          a: 'Sim. O ponto de partida nao e copiar o case, e entender o problema para definir uma nova solucao sob medida.'
        }
      ]
    : [
        {
          q: 'Was this project fully customized?',
          a: 'Yes. The cases shown here represent solutions designed for real contexts, with stack, flow and experience defined around client needs.'
        },
        {
          q: 'Can you create something similar for another company?',
          a: 'Yes. The goal is not to copy the case, but to understand the problem and define a new custom solution.'
        }
      ]
})
let jsonLdScript = null

const whatsappUrl = computed(() => {
  if (!product.value) return '#'
  const msg = lang.value === 'pt'
    ? `Olá! Vi o projeto "${product.value.name}" no site e gostaria de saber mais.`
    : `Hello! I saw the project "${product.value.name}" on the website and would like to know more.`
  return 'https://wa.me/5565999448004?text=' + encodeURIComponent(msg)
})

const goBack = () => {
  router.push({ name: 'home', hash: '#products' })
}

const setMetaTag = (selector, attrs) => {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    Object.entries(attrs).forEach(([key, value]) => {
      if (key !== 'content') tag.setAttribute(key, value)
    })
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', attrs.content)
}

const updateSeo = () => {
  if (!product.value) return

  const title = `${product.value.name} | wGalleti Tech`
  const description = getTagline(product.value) || getDescription(product.value)
  const url = `https://wgalleti.tech/#/produto/${product.value.id}`
  const image = product.value.images?.[0]
    ? `https://wgalleti.tech${product.value.images[0]}`
    : 'https://wgalleti.tech/favicon.svg'

  document.title = title
  setMetaTag('meta[name="description"]', { name: 'description', content: description })
  setMetaTag('meta[property="og:title"]', { property: 'og:title', content: title })
  setMetaTag('meta[property="og:description"]', { property: 'og:description', content: description })
  setMetaTag('meta[property="og:url"]', { property: 'og:url', content: url })
  setMetaTag('meta[property="og:image"]', { property: 'og:image', content: image })
  setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
  setMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
  setMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: image })

  const schema = {
    '@context': 'https://schema.org',
    '@type': isSaas.value ? 'SoftwareApplication' : 'CreativeWork',
    name: product.value.name,
    description,
    url,
    image,
    inLanguage: lang.value === 'pt' ? 'pt-BR' : 'en',
    author: {
      '@type': 'Organization',
      name: 'wGalleti Tech',
      url: 'https://wgalleti.tech'
    }
  }

  if (isSaas.value) {
    schema.applicationCategory = 'BusinessApplication'
    schema.operatingSystem = product.value.technologies.includes('Flutter') ? 'Web, iOS, Android' : 'Web'
    if (product.value.plans?.length) {
      schema.offers = product.value.plans.map((plan) => ({
        '@type': 'Offer',
        name: plan.name,
        price: plan.price,
        priceCurrency: 'BRL'
      }))
    }
  }

  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script')
    jsonLdScript.type = 'application/ld+json'
    document.head.appendChild(jsonLdScript)
  }
  jsonLdScript.textContent = JSON.stringify(schema)
}

// Gallery state
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const gallery = computed(() => {
  if (!product.value) return []
  return product.value.images || []
})

const openLightbox = (index) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (gallery.value.length > 1) {
    lightboxIndex.value = (lightboxIndex.value + 1) % gallery.value.length
  }
}

const prevImage = () => {
  if (gallery.value.length > 1) {
    lightboxIndex.value = (lightboxIndex.value - 1 + gallery.value.length) % gallery.value.length
  }
}

// Keyboard navigation for lightbox
const handleKeydown = (e) => {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

// Scroll reveal observer
let observer = null

const setupObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  window.addEventListener('keydown', handleKeydown)
  setupObserver()
  updateSeo()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (observer) observer.disconnect()
  document.body.style.overflow = ''
  if (jsonLdScript) {
    jsonLdScript.remove()
    jsonLdScript = null
  }
})

watch([product, lang], () => {
  updateSeo()
}, { immediate: false })

// Icon SVG path mapping for feature/module/problem cards
const iconPaths = {
  clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  bolt: 'M13 10V3L4 14h7v7l9-11h-7z',
  globe: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-5 0a9 9 0 019 9',
  cog: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  cash: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
  bell: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  puzzle: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
  star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  phone: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  chat: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  trophy: 'M12 15l-2 5h4l-2-5zm0 0a6 6 0 006-6V4H6v5a6 6 0 006 6zm-8-6H2v2a4 4 0 004 4h1m9-6h2v2a4 4 0 01-4 4h-1',
  lock: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  sparkles: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  link: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
  database: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
  refresh: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  'document-text': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'trending-up': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
}

const getIconPath = (iconName) => {
  if (!iconName) return iconPaths.sparkles
  return iconPaths[iconName] || iconPaths.sparkles
}

const defaultIcons = ['bolt', 'shield', 'chart', 'users', 'cog', 'globe', 'star', 'puzzle', 'bell', 'cash', 'calendar', 'lock']
const getDefaultIcon = (index) => defaultIcons[index % defaultIcons.length]
</script>

<template>
  <!-- ═══════════════════════════════════════════
       404 State
       ═══════════════════════════════════════════ -->
  <div v-if="!product" class="min-h-screen flex items-center justify-center">
    <div class="text-center px-6">
      <div class="w-24 h-24 mx-auto mb-8 rounded-2xl bg-brand-500/10 flex items-center justify-center">
        <svg class="w-12 h-12 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h1 class="text-3xl font-display font-bold text-white mb-4">
        {{ lang === 'pt' ? 'Produto não encontrado' : 'Product not found' }}
      </h1>
      <p class="text-slate-400 font-body mb-8 max-w-md mx-auto">
        {{ lang === 'pt' ? 'O produto que você procura não existe ou foi removido.' : 'The product you are looking for does not exist or has been removed.' }}
      </p>
      <button @click="goBack" class="btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        {{ lang === 'pt' ? 'Voltar aos produtos' : 'Back to products' }}
      </button>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════
       Product Page
       ═══════════════════════════════════════════ -->
  <div v-else>
    <!-- Fixed top navigation bar -->
    <div class="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div class="container-section flex items-center justify-between h-16">
        <button
          @click="goBack"
          class="inline-flex items-center gap-2 text-sm font-display font-medium text-slate-400 hover:text-white transition-colors duration-300 group"
        >
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          {{ lang === 'pt' ? 'Voltar' : 'Back' }}
        </button>

        <span class="text-sm font-display font-semibold text-white/60 truncate max-w-[200px] sm:max-w-none">{{ product.name }}</span>

        <div class="w-16"></div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════
         Hero Section
         ═══════════════════════════════════════════ -->
    <section class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden" :class="isConfidential ? 'confidential-theme' : isSaas ? 'saas-theme' : ''">
      <!-- Background layers -->
      <div class="absolute inset-0 bg-gradient-to-b from-brand-950/40 via-slate-950 to-slate-950"></div>
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px); background-size: 60px 60px;"></div>

      <!-- Floating gradient orbs -->
      <div class="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-brand-700/[0.08] blur-[120px] pointer-events-none"></div>
      <div class="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-accent-500/[0.06] blur-[100px] pointer-events-none"></div>

      <div class="container-section relative z-10">
        <div class="grid lg:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-16 items-center">
          <!-- Content side -->
          <div class="order-2 lg:order-1">
            <!-- Status badge -->
            <div class="mb-6 animate-fade-in">
              <span v-if="product.highlight" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-display font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {{ lang === 'pt' ? 'Projeto atual' : 'Current project' }}
              </span>
              <span v-else-if="isConfidential" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-display font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {{ lang === 'pt' ? 'Case confidencial' : 'Confidential case' }}
              </span>
              <span v-else-if="isSaas" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-display font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {{ lang === 'pt' ? 'Produto SaaS' : 'SaaS product' }}
              </span>
              <span v-else-if="product.featured" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-display font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Featured
              </span>
              <span v-else-if="product.forFun" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-display font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                For Fun
              </span>
            </div>

            <h1 class="heading-display text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6 animate-slide-up">
              <span class="text-gradient">{{ product.name }}</span>
            </h1>

            <p class="text-lg md:text-xl text-slate-300 font-body leading-relaxed mb-8 animate-slide-up" style="animation-delay: 0.1s">
              {{ getTagline(product) }}
            </p>

            <div class="grid gap-4 sm:grid-cols-3 mb-10 animate-slide-up" style="animation-delay: 0.16s">
              <div class="rounded-[1.5rem] border border-white/[0.06] bg-white/[0.03] p-4">
                <p class="text-[11px] font-display font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2">
                  {{ lang === 'pt' ? 'Tipo' : 'Type' }}
                </p>
                <p class="text-sm font-display font-semibold text-white">
                  {{ product.hasDetailPage ? (lang === 'pt' ? 'Produto SaaS' : 'SaaS product') : (lang === 'pt' ? 'Case entregue' : 'Delivered case') }}
                </p>
              </div>
              <div class="rounded-[1.5rem] border border-white/[0.06] bg-white/[0.03] p-4">
                <p class="text-[11px] font-display font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2">
                  {{ lang === 'pt' ? 'Entrega' : 'Delivery' }}
                </p>
                <p class="text-sm font-display font-semibold text-white">
                  {{ product.technologies.includes('Flutter') ? 'Web + Mobile' : 'Web Platform' }}
                </p>
              </div>
              <div class="rounded-[1.5rem] border border-white/[0.06] bg-white/[0.03] p-4">
                <p class="text-[11px] font-display font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2">
                  {{ lang === 'pt' ? 'Stack base' : 'Core stack' }}
                </p>
                <p class="text-sm font-display font-semibold text-white">
                  {{ product.technologies.slice(0, 2).join(' + ') }}
                </p>
              </div>
            </div>

            <!-- Tech badges -->
            <div class="flex flex-wrap gap-2 mb-10 animate-slide-up" style="animation-delay: 0.2s">
              <span
                v-for="tech in product.technologies"
                :key="tech"
                class="badge-tech !text-xs !px-3 !py-1.5"
              >
                {{ tech }}
              </span>
            </div>

            <!-- CTA buttons -->
            <div class="flex flex-col sm:flex-row gap-4 animate-slide-up" style="animation-delay: 0.3s">
              <a
                v-if="product.url && !product.confidential"
                :href="product.url"
                target="_blank"
                rel="noopener"
                class="btn-primary text-base !py-4 !px-8"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                {{ lang === 'pt' ? 'Visitar Site' : 'Visit Site' }}
              </a>
              <a
                v-if="product.confidential && product.clientUrl"
                :href="product.clientUrl"
                target="_blank"
                rel="noopener"
                class="btn-secondary text-base !py-4 !px-8"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
                {{ lang === 'pt' ? 'Site do cliente' : 'Client website' }}
              </a>
              <a
                :href="whatsappUrl"
                target="_blank"
                rel="noopener"
                class="btn-whatsapp text-base !py-4 !px-8"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {{ lang === 'pt' ? 'Falar no WhatsApp' : 'Chat on WhatsApp' }}
              </a>
            </div>
          </div>

          <!-- Product screenshot mockup -->
          <div class="order-1 lg:order-2 animate-fade-in" style="animation-delay: 0.2s">
            <div v-if="gallery.length > 0" class="relative group">
              <!-- Browser mockup frame -->
              <div class="relative rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-brand-500/10">
                <!-- Browser chrome bar -->
                <div class="bg-slate-800/80 backdrop-blur-sm border-b border-white/[0.06] px-4 py-3 flex items-center gap-3">
                  <div class="flex items-center gap-1.5">
                    <div class="w-3 h-3 rounded-full bg-red-500/60"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500/60"></div>
                  </div>
                  <div class="flex-1 mx-4">
                    <div class="bg-slate-900/60 rounded-md px-3 py-1 text-[11px] text-slate-500 font-mono truncate">
                      {{ product.url || `${product.name.toLowerCase().replace(/\s+/g, '')}.app` }}
                    </div>
                  </div>
                </div>
                <!-- Screenshot image -->
                <div class="relative aspect-video bg-gradient-to-br from-brand-950 to-slate-900 overflow-hidden cursor-pointer" @click="openLightbox(0)">
                  <img
                    :src="gallery[0]"
                    :alt="product.name"
                    class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  <!-- Hover overlay -->
                  <div class="absolute inset-0 bg-brand-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span class="px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm font-display font-medium border border-white/20">
                      <svg class="w-4 h-4 inline-block mr-2 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                      {{ lang === 'pt' ? 'Ampliar' : 'Enlarge' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Decorative glow behind mockup -->
              <div class="absolute -inset-4 rounded-2xl bg-gradient-to-r from-brand-500/20 via-accent-500/10 to-brand-500/20 blur-2xl -z-10 opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
            </div>

            <!-- Placeholder when no images -->
            <div v-else class="relative rounded-xl overflow-hidden border border-white/[0.08] aspect-video bg-gradient-to-br from-brand-950 to-slate-900 flex items-center justify-center">
              <div class="text-center">
                <div class="w-20 h-20 mx-auto rounded-2xl bg-brand-500/10 flex items-center justify-center mb-4">
                  <svg class="w-10 h-10 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <p class="text-sm text-slate-500 font-body">
                  {{ product.confidential
                    ? (lang === 'pt' ? 'Projeto confidencial' : 'Confidential project')
                    : (lang === 'pt' ? 'Preview em breve' : 'Preview coming soon')
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom gradient fade -->
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
    </section>

    <!-- ═══════════════════════════════════════════
         Gallery Section (multiple images)
         ═══════════════════════════════════════════ -->
    <section v-if="gallery.length > 1" class="py-12 md:py-16 relative">
      <div class="container-section">
        <div class="reveal">
          <div class="mb-6 flex items-end justify-between gap-4">
            <div>
              <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2">
                {{ lang === 'pt' ? 'Interface' : 'Interface' }}
              </p>
              <h2 class="text-lg font-display font-semibold text-white flex items-center gap-2">
                <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                {{ lang === 'pt' ? 'Galeria do produto' : 'Product gallery' }}
              </h2>
            </div>
            <span class="text-xs text-slate-500 font-body">{{ gallery.length }} {{ lang === 'pt' ? 'telas' : 'screens' }}</span>
          </div>

          <!-- Horizontal scrollable gallery -->
          <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
            <button
              v-for="(img, idx) in gallery"
              :key="idx"
              class="flex-shrink-0 snap-start relative rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer group"
              :class="[idx === 0 ? 'border-brand-400/40' : 'border-white/[0.08] hover:border-brand-400/30']"
              @click="openLightbox(idx)"
            >
              <img
                :src="img"
                :alt="`${product.name} - ${idx + 1}`"
                class="w-64 h-40 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         Problem Section
         ═══════════════════════════════════════════ -->
    <section v-if="getAudience(product).length || getIntegrations(product).length || getResults(product).length" class="section-padding relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none"></div>

      <div class="container-section relative z-10">
        <div class="grid gap-6 lg:grid-cols-3">
          <div v-if="getAudience(product).length" class="reveal rounded-[1.75rem] border border-white/[0.06] bg-white/[0.035] p-6">
            <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-brand-300 mb-4">
              {{ lang === 'pt' ? 'Para quem e' : 'Who it is for' }}
            </p>
            <ul class="space-y-3">
              <li v-for="item in getAudience(product)" :key="item" class="flex gap-3 text-sm text-slate-300 font-body leading-relaxed">
                <span class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400"></span>
                {{ item }}
              </li>
            </ul>
          </div>

          <div v-if="getIntegrations(product).length" class="reveal reveal-delay-1 rounded-[1.75rem] border border-white/[0.06] bg-white/[0.035] p-6">
            <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-accent-300 mb-4">
              {{ lang === 'pt' ? 'Camadas da solucao' : 'Solution layers' }}
            </p>
            <ul class="space-y-3">
              <li v-for="item in getIntegrations(product)" :key="item" class="flex gap-3 text-sm text-slate-300 font-body leading-relaxed">
                <span class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-400"></span>
                {{ item }}
              </li>
            </ul>
          </div>

          <div v-if="getResults(product).length" class="reveal reveal-delay-2 rounded-[1.75rem] border border-white/[0.06] bg-white/[0.035] p-6">
            <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-emerald-300 mb-4">
              {{ lang === 'pt' ? 'Impacto esperado' : 'Expected impact' }}
            </p>
            <ul class="space-y-3">
              <li v-for="item in getResults(product)" :key="item" class="flex gap-3 text-sm text-slate-300 font-body leading-relaxed">
                <span class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400"></span>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/10 to-transparent pointer-events-none"></div>

      <div class="container-section relative z-10">
        <div class="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div class="reveal">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-red-500/10 text-red-300 border border-red-500/20 mb-6">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              {{ lang === 'pt' ? 'O Desafio' : 'The Challenge' }}
            </span>
            <h2 class="heading-section text-white mb-6">
              {{ lang === 'pt' ? 'O problema operacional por trás do produto' : 'The operational problem behind the product' }}
            </h2>
            <p class="text-base md:text-lg text-slate-300 font-body leading-relaxed">
              {{ getProblem(product) }}
            </p>
          </div>

          <div v-if="product.problems && product.problems.length" class="grid sm:grid-cols-2 gap-6">
            <div
              v-for="(problem, i) in product.problems"
              :key="i"
              class="rounded-[1.75rem] border border-white/[0.06] bg-white/[0.035] p-6 reveal"
              :class="['reveal-delay-' + Math.min(i + 1, 6)]"
            >
              <div class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path :d="getIconPath(problem.icon || getDefaultIcon(i))"/>
                </svg>
              </div>
              <h3 class="text-base font-display font-semibold text-white mb-2">{{ localized(problem.title) }}</h3>
              <p class="text-sm text-slate-400 font-body leading-relaxed">{{ localized(problem.description) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         Features Section
         ═══════════════════════════════════════════ -->
    <section v-if="product.features && product.features.length" class="section-padding relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/[0.03] to-transparent pointer-events-none"></div>

      <div class="container-section relative z-10">
        <div class="text-center mb-16 reveal">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-6">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
            {{ lang === 'pt' ? 'Funcionalidades' : 'Features' }}
          </span>
          <h2 class="heading-section text-white mb-6">
            {{ lang === 'pt' ? 'O que a plataforma entrega na pratica' : 'What the platform delivers in practice' }}
          </h2>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(feature, i) in product.features"
            :key="i"
            class="group reveal rounded-[1.75rem] border border-white/[0.06] bg-white/[0.035] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.05]"
            :class="['reveal-delay-' + Math.min(i + 1, 6)]"
          >
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/10 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <svg class="w-6 h-6 text-brand-300" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path :d="getIconPath(feature.icon || getDefaultIcon(i))"/>
              </svg>
            </div>

            <h3 class="text-base font-display font-semibold text-white mb-2 group-hover:text-brand-300 transition-colors duration-300">
              {{ localized(feature.title) }}
            </h3>
            <p class="text-sm text-slate-400 font-body leading-relaxed">
              {{ localized(feature.description) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         Modules Section
         ═══════════════════════════════════════════ -->
    <section v-if="product.modules && product.modules.length" class="section-padding relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/15 to-transparent pointer-events-none"></div>

      <div class="container-section relative z-10">
        <div class="text-center mb-16 reveal">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-accent-500/10 text-accent-300 border border-accent-500/20 mb-6">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>
            {{ lang === 'pt' ? 'Módulos' : 'Modules' }}
          </span>
          <h2 class="heading-section text-white mb-6">
            {{ lang === 'pt' ? 'Estrutura modular da solução' : 'Modular structure of the solution' }}
          </h2>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(mod, i) in product.modules"
            :key="i"
            class="group relative reveal"
            :class="['reveal-delay-' + Math.min(i + 1, 6)]"
          >
            <!-- Animated glow border on hover -->
            <div class="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-accent-500/0 via-accent-500/0 to-accent-500/0 group-hover:from-accent-500/20 group-hover:via-brand-500/20 group-hover:to-accent-500/20 transition-all duration-500 blur-[1px]"></div>

            <div class="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 transition-all duration-500 group-hover:bg-white/[0.06] group-hover:border-accent-400/20 h-full">
              <!-- Module number -->
              <div class="absolute top-4 right-4 text-[10px] font-display font-bold text-slate-600">
                {{ String(i + 1).padStart(2, '0') }}
              </div>

              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/15 to-brand-500/10 flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110">
                <svg class="w-6 h-6 text-accent-300" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path :d="getIconPath(mod.icon || getDefaultIcon(i))"/>
                </svg>
              </div>

              <h3 class="text-base font-display font-semibold text-white mb-2 group-hover:text-accent-300 transition-colors duration-300">
                {{ localized(mod.title) }}
              </h3>
              <p class="text-sm text-slate-400 font-body leading-relaxed">
                {{ localized(mod.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         Pricing Section
         ═══════════════════════════════════════════ -->
    <section v-if="product.plans && product.plans.length" class="section-padding relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none"></div>

      <div class="container-section relative z-10">
        <div class="text-center mb-16 reveal">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-6">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            {{ lang === 'pt' ? 'Planos' : 'Pricing' }}
          </span>
          <h2 class="heading-section text-white mb-6">
            {{ lang === 'pt' ? 'Modelo comercial do produto' : 'Product pricing model' }}
          </h2>
        </div>

        <div
          class="grid gap-6 max-w-5xl mx-auto"
          :class="product.plans.length === 1 ? 'max-w-md' : product.plans.length === 2 ? 'sm:grid-cols-2 max-w-3xl' : 'sm:grid-cols-2 lg:grid-cols-3'"
        >
          <div
            v-for="(plan, i) in product.plans"
            :key="i"
            class="relative reveal"
            :class="['reveal-delay-' + Math.min(i + 1, 6)]"
          >
            <!-- Popular plan animated glow -->
            <div v-if="plan.popular" class="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500 opacity-40 blur-[2px] pricing-glow"></div>

            <div
              class="relative h-full rounded-2xl border overflow-hidden transition-all duration-500"
              :class="plan.popular
                ? 'bg-slate-900 border-brand-400/30'
                : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-brand-400/20'"
            >
              <!-- Popular banner -->
              <div v-if="plan.popular" class="bg-gradient-to-r from-brand-500 to-accent-500 text-center py-2">
                <span class="text-xs font-display font-bold text-white uppercase tracking-wider">
                  {{ lang === 'pt' ? 'Mais Popular' : 'Most Popular' }}
                </span>
              </div>

              <div class="p-6 sm:p-8">
                <h3 class="text-xl font-display font-bold text-white mb-2">{{ plan.name }}</h3>
                <div class="mb-6">
                  <span class="text-3xl md:text-4xl font-display font-extrabold text-gradient break-words">{{ plan.price }}</span>
                </div>

                <p class="text-xs uppercase tracking-[0.22em] text-slate-500 font-display font-semibold mb-5">
                  {{ lang === 'pt' ? 'Inclui' : 'Includes' }}
                </p>

                <ul class="space-y-3 mb-8">
                  <li
                    v-for="(feat, fi) in plan.features"
                    :key="fi"
                    class="flex items-start gap-3 text-sm text-slate-300 font-body"
                  >
                    <svg class="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    {{ feat }}
                  </li>
                </ul>

                <a
                  :href="whatsappUrl"
                  target="_blank"
                  rel="noopener"
                  class="block w-full text-center text-sm sm:text-base"
                  :class="plan.popular ? 'btn-primary justify-center' : 'btn-secondary justify-center'"
                >
                  {{ lang === 'pt' ? 'Começar agora' : 'Get started' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         Technologies Section
         ═══════════════════════════════════════════ -->
    <section class="py-16 md:py-20 relative">
      <div class="container-section">
        <div class="reveal">
          <div class="rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 md:p-10">
            <div class="flex flex-col gap-6 md:flex-row md:items-center">
              <div class="flex-1">
                <h3 class="text-lg font-display font-semibold text-white mb-2">
                  {{ lang === 'pt' ? 'Construído com' : 'Built with' }}
                </h3>
                <p class="text-sm text-slate-400 font-body">
                  {{ lang === 'pt' ? 'As tecnologias que tornam isso possível' : 'The technologies that make it possible' }}
                </p>
              </div>
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="tech in product.technologies"
                  :key="tech"
                  class="px-5 py-2.5 rounded-xl text-sm font-display font-medium bg-brand-500/10 text-brand-200 border border-brand-500/20 hover:bg-brand-500/20 hover:border-brand-400/30 transition-all duration-300"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="faqItems.length" class="py-16 md:py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none"></div>
      <div class="container-section relative z-10">
        <div class="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div class="reveal">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-white/5 text-slate-300 border border-white/10 mb-6">
              {{ lang === 'pt' ? 'FAQ' : 'FAQ' }}
            </span>
            <h2 class="heading-section text-white mb-6">
              {{ lang === 'pt' ? 'Perguntas que costumam aparecer antes de um projeto' : 'Questions that usually come up before a project starts' }}
            </h2>
          </div>

          <div class="grid gap-4">
            <article v-for="item in faqItems" :key="item.q" class="reveal rounded-[1.5rem] border border-white/[0.06] bg-white/[0.035] p-6">
              <h3 class="text-base font-display font-semibold text-white mb-3">{{ item.q }}</h3>
              <p class="text-sm text-slate-400 font-body leading-relaxed">{{ item.a }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         Final CTA Section
         ═══════════════════════════════════════════ -->
    <section class="section-padding relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/30 to-transparent pointer-events-none"></div>

      <!-- Floating decorative shape -->
      <div class="absolute top-20 right-[10%] w-48 h-48 opacity-10 animate-float hidden md:block pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 190,60 190,140 100,190 10,140 10,60" stroke="url(#ctaGrad)" stroke-width="1" fill="none"/>
          <defs><linearGradient id="ctaGrad" x1="0" y1="0" x2="200" y2="200"><stop offset="0%" stop-color="#7C3AED"/><stop offset="100%" stop-color="#0EA5E9"/></linearGradient></defs>
        </svg>
      </div>
      <div class="absolute bottom-32 left-[5%] w-32 h-32 opacity-10 animate-float-delayed hidden md:block pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="#7C3AED" stroke-width="0.5"/>
          <circle cx="50" cy="50" r="30" stroke="#0EA5E9" stroke-width="0.5"/>
          <circle cx="50" cy="50" r="15" stroke="#7C3AED" stroke-width="0.5"/>
        </svg>
      </div>

      <div class="container-section relative z-10">
        <div class="max-w-3xl mx-auto text-center reveal">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/10 flex items-center justify-center mb-8">
            <svg class="w-8 h-8 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </div>

          <h2 class="heading-section text-white mb-6">
            {{ lang === 'pt' ? 'Quer algo como o' : 'Want something like' }}
            <span class="text-gradient"> {{ product.name }}</span>{{ lang === 'pt' ? '?' : '?' }}
          </h2>

          <p class="text-lg text-slate-400 font-body leading-relaxed mb-10 max-w-2xl mx-auto">
            {{ lang === 'pt'
              ? 'Entre em contato e vamos discutir como podemos criar uma solução personalizada para o seu negócio.'
              : 'Get in touch and let us discuss how we can create a custom solution for your business.'
            }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              v-if="product.url && !product.confidential"
              :href="product.url"
              target="_blank"
              rel="noopener"
              class="btn-primary text-base !py-4 !px-8"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              {{ lang === 'pt' ? 'Visitar Site' : 'Visit Site' }}
            </a>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener"
              class="btn-whatsapp text-base !py-4 !px-8"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {{ lang === 'pt' ? 'Falar no WhatsApp' : 'Chat on WhatsApp' }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         Lightbox Modal
         ═══════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          @click.self="closeLightbox"
        >
          <div class="absolute inset-0 bg-slate-950/95 backdrop-blur-sm" @click="closeLightbox"></div>

          <div class="relative w-full max-w-5xl animate-scale-in">
            <!-- Close button -->
            <button
              @click="closeLightbox"
              class="absolute -top-12 right-0 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/20 transition-all z-20"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <!-- Image -->
            <div class="relative rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl">
              <img
                :src="gallery[lightboxIndex]"
                :alt="`${product.name} - ${lightboxIndex + 1}`"
                class="w-full h-auto max-h-[80vh] object-contain bg-slate-900"
              />
            </div>

            <!-- Counter -->
            <div v-if="gallery.length > 1" class="absolute -bottom-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/70 font-display">
              {{ lightboxIndex + 1 }} / {{ gallery.length }}
            </div>

            <!-- Navigation arrows -->
            <button
              v-if="gallery.length > 1"
              @click.stop="prevImage"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all z-10"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              v-if="gallery.length > 1"
              @click.stop="nextImage"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all z-10"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>

  <a
    v-if="product"
    :href="whatsappUrl"
    target="_blank"
    rel="noopener"
    class="fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-display font-semibold text-white shadow-lg shadow-emerald-500/30 md:hidden"
  >
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    {{ lang === 'pt' ? 'Quero conversar sobre um projeto' : 'Let\'s discuss a project' }}
  </a>
</template>

<style scoped>
.saas-theme::before,
.confidential-theme::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.saas-theme::before {
  background: radial-gradient(circle at top right, rgba(14, 165, 233, 0.12), transparent 28%);
}

.confidential-theme::before {
  background: radial-gradient(circle at top right, rgba(245, 158, 11, 0.12), transparent 28%);
}

/* Gallery horizontal scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.5);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(124, 58, 237, 0.3);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(124, 58, 237, 0.5);
}

/* Animated gradient glow for popular pricing card */
.pricing-glow {
  background-size: 200% 100%;
  animation: pricingShift 4s ease-in-out infinite;
}

@keyframes pricingShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>
