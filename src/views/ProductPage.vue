<script setup>
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ProductHero from '../components/product/ProductHero.vue'
import ProductGallery from '../components/product/ProductGallery.vue'
import ProductBulletColumns from '../components/product/ProductBulletColumns.vue'
import ProductIconGridSection from '../components/product/ProductIconGridSection.vue'
import ProductPricingSection from '../components/product/ProductPricingSection.vue'
import ProductTechStack from '../components/product/ProductTechStack.vue'
import ProductFaq from '../components/product/ProductFaq.vue'
import ProductFinalCta from '../components/product/ProductFinalCta.vue'
import ProductLightbox from '../components/product/ProductLightbox.vue'
import ProductProofSection from '../components/product/ProductProofSection.vue'
import ProductOnboardingSection from '../components/product/ProductOnboardingSection.vue'

const router = useRouter()

const products = inject('products')
const currentLang = inject('currentLang')

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const product = computed(() => products.value?.find((item) => item.id === props.id) || null)
const lang = computed(() => currentLang.value || 'pt')

const localized = (obj) => {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  return obj[lang.value] || obj.pt || ''
}

const getDescription = (item) => localized(item.description)
const getProblem = (item) => localized(item.problemSolved)
const getTagline = (item) => item.tagline ? localized(item.tagline) : getDescription(item)
const getAudience = (item) => item?.audience?.[lang.value] || item?.audience?.pt || []
const getIntegrations = (item) => item?.integrations?.[lang.value] || item?.integrations?.pt || []
const getResults = (item) => item?.results?.[lang.value] || item?.results?.pt || []
const getProof = (item) => item?.proof || []
const getOnboarding = (item) => item?.onboarding?.[lang.value] || item?.onboarding?.pt || []

const isSaas = computed(() => Boolean(product.value?.plans?.length))
const isConfidential = computed(() => Boolean(product.value?.confidential))

const faqItems = computed(() => {
  if (!product.value) return []

  if (isSaas.value) {
    return lang.value === 'pt'
      ? [
          { q: 'Esse produto ja esta em operacao?', a: 'Sim. A pagina apresenta um produto estruturado para uso real, com foco em operacao, recorrencia e evolucao continua.' },
          { q: 'E possivel adaptar algo parecido para outro segmento?', a: 'Sim. A base pode inspirar uma nova solucao, mas a recomendacao e sempre desenhar o produto ao redor do processo e modelo comercial do cliente.' },
          { q: 'Voces fazem so o software ou tambem a estrategia?', a: 'A atuacao combina diagnostico, arquitetura, implementacao e evolucao. O objetivo nao e so entregar tela, mas criar uma operacao digital utilizavel.' }
        ]
      : [
          { q: 'Is this product already in operation?', a: 'Yes. This page showcases a product shaped for real operation, recurring usage and continuous evolution.' },
          { q: 'Can something similar be adapted to another segment?', a: 'Yes. The product can inspire a new solution, but the recommendation is always to design it around the client process and business model.' },
          { q: 'Do you only build the software or also support strategy?', a: 'The work combines discovery, architecture, implementation and evolution. The goal is not only to deliver screens, but to create a usable digital operation.' }
        ]
  }

  return lang.value === 'pt'
    ? [
        { q: 'Esse projeto foi totalmente personalizado?', a: 'Sim. Os cases mostrados aqui representam solucoes desenhadas para contexto real, com stack, fluxo e experiencia definidos conforme a necessidade do cliente.' },
        { q: 'Voces podem criar algo na mesma linha para outra empresa?', a: 'Sim. O ponto de partida nao e copiar o case, e entender o problema para definir uma nova solucao sob medida.' }
      ]
    : [
        { q: 'Was this project fully customized?', a: 'Yes. The cases shown here represent solutions designed for real contexts, with stack, flow and experience defined around client needs.' },
        { q: 'Can you create something similar for another company?', a: 'Yes. The goal is not to copy the case, but to understand the problem and define a new custom solution.' }
      ]
})

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

let jsonLdScript = null
const updateSeo = () => {
  if (!product.value) return

  const title = `${product.value.name} | wGalleti Tech`
  const description = getTagline(product.value) || getDescription(product.value)
  const url = `https://wgalleti.tech/#/produto/${product.value.id}`
  const image = product.value.images?.[0] ? `https://wgalleti.tech${product.value.images[0]}` : 'https://wgalleti.tech/favicon.svg'

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
    schema.offers = product.value.plans?.map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      price: plan.price,
      priceCurrency: 'BRL'
    })) || []
  }

  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script')
    jsonLdScript.type = 'application/ld+json'
    document.head.appendChild(jsonLdScript)
  }
  jsonLdScript.textContent = JSON.stringify(schema)
}

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const gallery = computed(() => product.value?.images || [])

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
  if (gallery.value.length > 1) lightboxIndex.value = (lightboxIndex.value + 1) % gallery.value.length
}

const prevImage = () => {
  if (gallery.value.length > 1) lightboxIndex.value = (lightboxIndex.value - 1 + gallery.value.length) % gallery.value.length
}

const handleKeydown = (event) => {
  if (!lightboxOpen.value) return
  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'ArrowRight') nextImage()
  if (event.key === 'ArrowLeft') prevImage()
}

let observer = null
const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
}

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
  sparkles: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
}

const getIconPath = (iconName) => iconPaths[iconName] || iconPaths.sparkles
const defaultIcons = ['bolt', 'shield', 'chart', 'users', 'cog', 'globe', 'star', 'puzzle', 'bell', 'cash', 'calendar', 'lock']
const getDefaultIcon = (index) => defaultIcons[index % defaultIcons.length]

const mapItems = (items = []) => items.map((item, index) => ({
  label: item.label ? localized(item.label) : '',
  title: localized(item.title),
  description: localized(item.description),
  iconPath: getIconPath(item.icon || getDefaultIcon(index))
}))

const problemItems = computed(() => mapItems(product.value?.problems || []))
const featureItems = computed(() => mapItems(product.value?.features || []))
const moduleItems = computed(() => mapItems(product.value?.modules || []))
const proofItems = computed(() => mapItems(getProof(product.value)))
const onboardingSteps = computed(() => getOnboarding(product.value))
const bulletColumns = computed(() => [
  {
    label: lang.value === 'pt' ? 'Perfil ideal' : 'Ideal fit',
    items: getAudience(product.value),
    colorClass: 'text-brand-300',
    dotClass: 'bg-brand-400'
  },
  {
    label: lang.value === 'pt' ? 'Camadas da solucao' : 'Solution layers',
    items: getIntegrations(product.value),
    colorClass: 'text-accent-300',
    dotClass: 'bg-accent-400'
  },
  {
    label: lang.value === 'pt' ? 'Valor gerado' : 'Expected value',
    items: getResults(product.value),
    colorClass: 'text-emerald-300',
    dotClass: 'bg-emerald-400'
  }
])

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
})
</script>

<template>
  <div v-if="!product" class="min-h-screen flex items-center justify-center">
    <div class="text-center px-6">
      <div class="w-24 h-24 mx-auto mb-8 rounded-2xl bg-brand-500/10 flex items-center justify-center">
        <svg class="w-12 h-12 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <h1 class="text-3xl font-display font-bold text-white mb-4">{{ lang === 'pt' ? 'Produto não encontrado' : 'Product not found' }}</h1>
      <p class="text-slate-400 font-body mb-8 max-w-md mx-auto">{{ lang === 'pt' ? 'O produto que você procura não existe ou foi removido.' : 'The product you are looking for does not exist or has been removed.' }}</p>
      <button @click="goBack" class="btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        {{ lang === 'pt' ? 'Voltar aos produtos' : 'Back to products' }}
      </button>
    </div>
  </div>

  <div v-else>
    <div class="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div class="container-section flex items-center justify-between h-16">
        <button @click="goBack" class="inline-flex items-center gap-2 text-sm font-display font-medium text-slate-400 hover:text-white transition-colors duration-300 group">
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          {{ lang === 'pt' ? 'Voltar' : 'Back' }}
        </button>
        <span class="max-w-[200px] truncate text-sm font-display font-semibold text-white/60 sm:max-w-none">{{ product.name }}</span>
        <div class="w-16"></div>
      </div>
    </div>

    <div id="product-overview">
      <ProductHero
        :product="product"
        :gallery="gallery"
        :is-saas="isSaas"
        :is-confidential="isConfidential"
        :tagline="getTagline(product)"
        :whatsapp-url="whatsappUrl"
        :lang="lang"
        @open-lightbox="openLightbox"
      />
    </div>

    <div id="product-gallery">
      <ProductGallery :gallery="gallery" :product-name="product.name" :lang="lang" @open-lightbox="openLightbox" />
    </div>

    <ProductBulletColumns :columns="bulletColumns" />

    <div id="product-challenge">
      <ProductIconGridSection
        :badge="lang === 'pt' ? 'O Desafio' : 'The Challenge'"
        :title="lang === 'pt' ? 'O problema operacional por trás do produto' : 'The operational problem behind the product'"
        badge-class="bg-red-500/10 text-red-300 border-red-500/20"
        icon-wrap-class="bg-red-500/10"
        icon-color-class="text-red-400"
        :items="problemItems"
        layout="split"
        :leading="getProblem(product)"
      />
    </div>

    <div id="product-features">
      <ProductIconGridSection
        :badge="lang === 'pt' ? 'Funcionalidades' : 'Features'"
        :title="lang === 'pt' ? 'O que a plataforma entrega na pratica' : 'What the platform delivers in practice'"
        badge-class="bg-brand-500/10 text-brand-300 border-brand-500/20"
        icon-wrap-class="bg-gradient-to-br from-brand-500/20 to-accent-500/10"
        icon-color-class="text-brand-300"
        :items="featureItems"
      />
    </div>

    <ProductIconGridSection
      v-if="moduleItems.length"
      :badge="lang === 'pt' ? 'Módulos' : 'Modules'"
      :title="lang === 'pt' ? 'Estrutura modular da solução' : 'Modular structure of the solution'"
      badge-class="bg-accent-500/10 text-accent-300 border-accent-500/20"
      icon-wrap-class="bg-gradient-to-br from-accent-500/15 to-brand-500/10"
      icon-color-class="text-accent-300"
      :items="moduleItems"
    />

    <div id="product-pricing">
      <ProductPricingSection :plans="product.plans || []" :lang="lang" :whatsapp-url="whatsappUrl" />
    </div>
    <ProductProofSection v-if="isSaas" :items="proofItems" :lang="lang" />
    <ProductOnboardingSection v-if="isSaas" :steps="onboardingSteps" :lang="lang" />
    <div id="product-stack">
      <ProductTechStack :technologies="product.technologies" :lang="lang" />
    </div>
    <div id="product-faq">
      <ProductFaq :items="faqItems" :lang="lang" />
    </div>
    <div id="product-contact">
      <ProductFinalCta :product="product" :whatsapp-url="whatsappUrl" :lang="lang" />
    </div>

    <ProductLightbox
      :open="lightboxOpen"
      :gallery="gallery"
      :product-name="product.name"
      :current-index="lightboxIndex"
      @close="closeLightbox"
      @prev="prevImage"
      @next="nextImage"
    />

    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener"
      class="fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-display font-semibold text-white shadow-lg shadow-emerald-500/30 md:hidden"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      {{ lang === 'pt' ? 'Conversar sobre uma solucao' : "Let's discuss a solution" }}
    </a>
  </div>
</template>
