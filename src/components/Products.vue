<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ConfidentialBadge from './ConfidentialBadge.vue'

const router = useRouter()
const products = inject('products')

const props = defineProps({
  currentLang: String
})

const t = inject('t')

const selectedProduct = ref(null)
const currentImageIndex = ref(0)

const onKeydown = (event) => {
  if (event.key === 'Escape' && selectedProduct.value) {
    closeProduct()
  }
}

const getGallery = (product) => {
  if (product.images && product.images.length > 0) return product.images
  return []
}

const hasPreview = (product) => {
  return !product.confidential && product.images && product.images.length > 0
}

const getPreviewSrc = (product) => {
  if (product.images && product.images.length > 0) return product.images[0]
  return null
}

const openProduct = (product) => {
  if (product.hasDetailPage) {
    router.push({ name: 'product', params: { id: product.id } })
    return
  }
  selectedProduct.value = product
  currentImageIndex.value = 0
  document.body.style.overflow = 'hidden'
}

const closeProduct = () => {
  selectedProduct.value = null
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})

const nextImage = () => {
  if (selectedProduct.value) {
    const gallery = getGallery(selectedProduct.value)
    if (gallery.length > 1) {
      currentImageIndex.value = (currentImageIndex.value + 1) % gallery.length
    }
  }
}

const prevImage = () => {
  if (selectedProduct.value) {
    const gallery = getGallery(selectedProduct.value)
    if (gallery.length > 1) {
      currentImageIndex.value = (currentImageIndex.value - 1 + gallery.length) % gallery.length
    }
  }
}

const getDescription = (product) => product.description[props.currentLang] || product.description.pt
const getProblem = (product) => product.problemSolved[props.currentLang] || product.problemSolved.pt
const getTagline = (product) => product.tagline?.[props.currentLang] || product.tagline?.pt || getDescription(product)
const getKind = (product) => {
  if (product.confidential) return 'confidential'
  if (product.plans?.length) return 'saas'
  if (product.forFun) return 'lab'
  return 'case'
}

const getKindLabel = (product) => {
  const key = {
    saas: 'productsSaasLabel',
    confidential: 'productsConfidentialLabel',
    lab: 'productsLabLabel',
    case: 'productsCaseLabel'
  }[getKind(product)]

  return t(key)
}

const getKindBadgeClass = (product) => {
  const kind = getKind(product)
  if (kind === 'saas') return 'bg-cyan-500/14 text-cyan-300 border-cyan-500/20'
  if (kind === 'confidential') return 'bg-amber-500/14 text-amber-300 border-amber-500/20'
  if (kind === 'lab') return 'bg-fuchsia-500/14 text-fuchsia-300 border-fuchsia-500/20'
  return 'bg-brand-500/14 text-brand-300 border-brand-500/20'
}

const getKindCardClass = (product) => {
  const kind = getKind(product)
  if (kind === 'saas') return 'hover:border-cyan-400/20 hover:shadow-[0_20px_60px_-30px_rgba(34,211,238,0.35)]'
  if (kind === 'confidential') return 'hover:border-amber-400/20 hover:shadow-[0_20px_60px_-30px_rgba(245,158,11,0.3)]'
  if (kind === 'lab') return 'hover:border-fuchsia-400/20 hover:shadow-[0_20px_60px_-30px_rgba(217,70,239,0.28)]'
  return 'hover:border-brand-400/20 hover:shadow-[0_20px_60px_-30px_rgba(124,58,237,0.25)]'
}

const getMetaLine = (product) => {
  if (product.confidential) return t('productsMetaConfidential')
  if (product.plans?.length) return t('productsMetaSaas')
  if (product.forFun) return t('productsMetaLab')
  return t('productsMetaCase')
}

const getPrimaryAction = (product) => {
  if (product.hasDetailPage) return t('productViewSolution')
  if (product.confidential) return t('productSeeContext')
  return t('learnMore')
}

const whatsappForProduct = (product) => {
  const msg = props.currentLang === 'pt'
    ? `Olá! Vi o projeto "${product.name}" no site e gostaria de saber mais sobre uma solução similar.`
    : `Hello! I saw the project "${product.name}" on the website and would like to know more about a similar solution.`
  return 'https://wa.me/5565999448004?text=' + encodeURIComponent(msg)
}
</script>

<template>
  <section id="products" class="section-padding relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none"></div>

    <div class="container-section relative z-10">
      <div class="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end mb-16">
        <div class="reveal">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-6">
            {{ t('productsTag') }}
          </span>
          <h2 class="heading-section text-white mb-6 max-w-3xl">{{ t('productsTitle') }}</h2>
          <p class="text-lg text-slate-400 max-w-2xl font-body leading-relaxed">{{ t('productsDescription') }}</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-3 reveal reveal-delay-1">
          <div class="rounded-[1.75rem] border border-white/[0.06] bg-white/[0.03] p-5">
            <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2">{{ t('productsStat1Label') }}</p>
            <p class="text-2xl font-display font-bold text-white">{{ t('productsStat1Value') }}</p>
          </div>
          <div class="rounded-[1.75rem] border border-white/[0.06] bg-white/[0.03] p-5">
            <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2">{{ t('productsStat2Label') }}</p>
            <p class="text-2xl font-display font-bold text-white">{{ t('productsStat2Value') }}</p>
          </div>
          <div class="rounded-[1.75rem] border border-white/[0.06] bg-white/[0.03] p-5">
            <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2">{{ t('productsStat3Label') }}</p>
            <p class="text-2xl font-display font-bold text-white">{{ t('productsStat3Value') }}</p>
          </div>
        </div>
      </div>

      <!-- Highlight product (full-width hero card) -->
      <template v-for="product in products" :key="'hl-' + product.id">
        <div
          v-if="product.highlight"
          class="relative mb-10 rounded-2xl overflow-hidden cursor-pointer group reveal highlight-card"
          @click="openProduct(product)"
        >
          <!-- Animated glow border -->
          <div class="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500 opacity-30 group-hover:opacity-60 transition-opacity duration-500 blur-[1px] highlight-glow"></div>

          <div class="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/[0.06]">
            <div class="grid md:grid-cols-2">
              <!-- Image side -->
              <div class="relative aspect-video md:aspect-auto md:min-h-[360px] bg-gradient-to-br from-brand-950 to-slate-900 overflow-hidden">
                <img
                  v-if="hasPreview(product)"
                  :src="getPreviewSrc(product)"
                  :alt="product.name"
                  class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/80 hidden md:block"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent md:hidden"></div>

                <!-- Active / launching badge -->
                <div class="absolute top-4 left-4 z-10">
                  <span class="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-display font-bold backdrop-blur-sm" :class="getKindBadgeClass(product)">
                    <span class="h-1.5 w-1.5 rounded-full animate-pulse" :class="getKind(product) === 'saas' ? 'bg-cyan-400' : getKind(product) === 'confidential' ? 'bg-amber-400' : 'bg-brand-400'"></span>
                    {{ getKindLabel(product) }}
                  </span>
                </div>
              </div>

              <!-- Content side -->
              <div class="p-8 md:p-10 flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-[11px] font-display font-semibold tracking-[0.22em] uppercase text-slate-500">{{ t('productsFeaturedLabel') }}</span>
                  <div class="h-px w-10 bg-white/10"></div>
                </div>
                <h3 class="text-2xl md:text-3xl font-display font-bold text-white mb-4 group-hover:text-brand-300 transition-colors duration-300">{{ product.name }}</h3>
                <p class="text-base md:text-lg text-slate-300 font-body leading-relaxed mb-4">{{ getTagline(product) }}</p>
                <p class="mb-3 text-[11px] font-display font-semibold uppercase tracking-[0.22em] text-slate-500">{{ getMetaLine(product) }}</p>
                <p class="text-sm md:text-base text-slate-400 font-body leading-relaxed mb-6">{{ getDescription(product) }}</p>

                <!-- Problem solved inline -->
                <div class="rounded-[1.5rem] bg-white/[0.03] border border-white/[0.06] p-5 mb-6">
                  <h4 class="text-xs font-display font-semibold text-brand-400 mb-1.5 uppercase tracking-wider">{{ t('productProblem') }}</h4>
                  <p class="text-xs text-slate-500 font-body leading-relaxed">{{ getProblem(product) }}</p>
                </div>

                <!-- Tech badges -->
                <div class="flex flex-wrap gap-2 mb-6">
                  <span v-for="tech in product.technologies" :key="tech" class="badge-tech !text-xs !px-3 !py-1">{{ tech }}</span>
                </div>

                <!-- CTA -->
                <div class="flex flex-wrap gap-3">
                  <button v-if="product.hasDetailPage" class="btn-primary !text-sm" @click.stop="openProduct(product)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                    {{ t('productViewSolution') }}
                  </button>
                  <a v-if="product.url" :href="product.url" target="_blank" rel="noopener" class="btn-secondary !text-sm" @click.stop>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    {{ t('productVisit') }}
                  </a>
                  <a :href="whatsappForProduct(product)" target="_blank" rel="noopener" class="btn-whatsapp !text-sm" @click.stop>
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {{ t('productWantSimilar') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Products grid (remaining) -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(product, i) in products.filter(p => !p.highlight)"
          :key="product.id"
          class="group cursor-pointer reveal rounded-[2rem] border border-white/[0.06] bg-white/[0.035] overflow-hidden transition-all duration-500 hover:-translate-y-1"
          :class="['reveal-delay-' + Math.min(i + 1, 6), getKindCardClass(product)]"
          :data-kind="getKind(product)"
          @click="openProduct(product)"
        >
          <!-- Image area -->
          <div class="relative aspect-video bg-gradient-to-br from-brand-950 to-slate-900 overflow-hidden">
            <!-- Real image (non-confidential with images) -->
            <img
              v-if="hasPreview(product)"
              :src="getPreviewSrc(product)"
              :alt="product.name"
              class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              @error="$event.target.style.display='none'"
            />

            <!-- Confidential animated badge -->
            <ConfidentialBadge v-if="product.confidential" size="sm">
              <template #label>{{ t('productConfidential') }}</template>
            </ConfidentialBadge>

            <!-- Non-confidential fallback icon (no images yet) -->
            <div v-if="!product.confidential && !hasPreview(product)" class="absolute inset-0 flex items-center justify-center">
              <div class="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center">
                <svg class="w-8 h-8 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>

            <div class="absolute top-3 right-3 z-10 flex flex-wrap justify-end gap-2">
              <span class="rounded-md border px-2.5 py-1 text-[10px] font-display font-semibold backdrop-blur-sm" :class="getKindBadgeClass(product)">
                {{ getKindLabel(product) }}
              </span>
              <span v-if="product.featured && !product.forFun" class="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] font-display font-semibold text-white/80 backdrop-blur-sm">
                {{ t('productsFeaturedMini') }}
              </span>
            </div>

            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
              <span class="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-display font-medium border border-white/20">
                {{ getPrimaryAction(product) }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-[11px] font-display font-semibold tracking-[0.22em] uppercase text-slate-500">
                {{ getKindLabel(product) }}
              </span>
              <div class="h-px flex-1 bg-white/10"></div>
            </div>

            <h3 class="text-lg font-display font-bold text-white mb-2 group-hover:text-brand-300 transition-colors duration-300">{{ product.name }}</h3>
            <p class="text-sm text-slate-300 font-body leading-relaxed mb-3 line-clamp-2">{{ getTagline(product) }}</p>
            <p class="mb-4 text-[11px] font-display font-semibold uppercase tracking-[0.22em] text-slate-500">{{ getMetaLine(product) }}</p>
            <p class="text-sm text-slate-500 font-body leading-relaxed mb-5 line-clamp-3">{{ getProblem(product) }}</p>

            <!-- Tech badges -->
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tech in product.technologies"
                :key="tech"
                class="badge-tech"
              >
                {{ tech }}
              </span>
            </div>

            <div class="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
              <span class="text-xs font-body text-slate-500">{{ getPrimaryAction(product) }}</span>
              <svg class="h-4 w-4 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="selectedProduct" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" @click.self="closeProduct">
          <div class="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" @click="closeProduct"></div>

          <div class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/[0.08] rounded-2xl shadow-2xl animate-scale-in" role="dialog" aria-modal="true" :aria-label="selectedProduct.name">
            <!-- Close -->
            <button @click="closeProduct" class="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white hover:bg-black/60 transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <!-- Image gallery / Confidential header -->
            <div class="relative aspect-video bg-gradient-to-br from-brand-950 to-slate-900 overflow-hidden">
              <!-- Gallery image -->
              <img
                v-if="!selectedProduct.confidential && getGallery(selectedProduct).length"
                :src="getGallery(selectedProduct)[currentImageIndex]"
                :alt="selectedProduct.name"
                class="absolute inset-0 w-full h-full object-cover object-top"
                @error="$event.target.style.display='none'"
              />

              <!-- Confidential animated badge (modal) -->
              <ConfidentialBadge v-if="selectedProduct.confidential" size="lg">
                <template #label>
                  <span class="block text-sm">{{ t('productConfidential') }}</span>
                  <span class="block text-[10px] text-slate-500 font-body font-normal mt-1">{{ t('productConfidentialDesc') }}</span>
                </template>
              </ConfidentialBadge>

              <!-- Non-confidential fallback -->
              <div v-if="!selectedProduct.confidential && !getGallery(selectedProduct).length" class="absolute inset-0 flex items-center justify-center">
                <div class="w-20 h-20 rounded-2xl bg-brand-500/10 flex items-center justify-center">
                  <svg class="w-10 h-10 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>

              <!-- Gallery counter -->
              <div v-if="!selectedProduct.confidential && getGallery(selectedProduct).length > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white/70 font-display z-10">
                {{ currentImageIndex + 1 }} / {{ getGallery(selectedProduct).length }}
              </div>

              <!-- Nav arrows -->
              <button v-if="!selectedProduct.confidential && getGallery(selectedProduct).length > 1" @click.stop="prevImage" class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all z-10">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button v-if="!selectedProduct.confidential && getGallery(selectedProduct).length > 1" @click.stop="nextImage" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all z-10">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>

            <!-- Content -->
            <div class="p-6 sm:p-8">
              <h2 class="text-2xl font-display font-bold text-white mb-4">{{ selectedProduct.name }}</h2>
              <div class="mb-4">
                <span class="inline-flex rounded-md border px-2.5 py-1 text-[10px] font-display font-semibold uppercase tracking-[0.18em]" :class="getKindBadgeClass(selectedProduct)">
                  {{ getKindLabel(selectedProduct) }}
                </span>
              </div>

              <p class="text-slate-400 font-body leading-relaxed mb-6">{{ getDescription(selectedProduct) }}</p>

              <!-- Problem solved -->
              <div class="card-glass p-5 mb-6">
                <h4 class="text-sm font-display font-semibold text-brand-400 mb-2">{{ t('productProblem') }}</h4>
                <p class="text-sm text-slate-400 font-body leading-relaxed">{{ getProblem(selectedProduct) }}</p>
              </div>

              <!-- Tech -->
              <div class="mb-6">
                <h4 class="text-sm font-display font-semibold text-white mb-3">{{ t('productTech') }}</h4>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in selectedProduct.technologies" :key="tech" class="badge-tech">{{ tech }}</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-3">
                <!-- Visit product (non-confidential with url) -->
                <a v-if="selectedProduct.url && !selectedProduct.confidential" :href="selectedProduct.url" target="_blank" rel="noopener" class="btn-primary justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  {{ t('productVisit') }}
                </a>
                <!-- Visit client site (confidential) -->
                <a v-if="selectedProduct.confidential && selectedProduct.clientUrl" :href="selectedProduct.clientUrl" target="_blank" rel="noopener" class="btn-secondary justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
                  {{ t('productClientSite') }}
                </a>
                <!-- WhatsApp -->
                <a :href="whatsappForProduct(selectedProduct)" target="_blank" rel="noopener" class="btn-whatsapp justify-center">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {{ currentLang === 'pt' ? 'Conversar sobre uma solucao parecida' : 'Discuss a similar solution' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animated gradient glow for highlight card */
.highlight-glow {
  background-size: 200% 100%;
  animation: glowShift 4s ease-in-out infinite;
}

@keyframes glowShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.highlight-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.highlight-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px -15px rgba(124, 58, 237, 0.15);
}
</style>
