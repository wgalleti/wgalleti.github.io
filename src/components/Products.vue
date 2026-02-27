<script setup>
import { ref, inject } from 'vue'
import ConfidentialBadge from './ConfidentialBadge.vue'

const products = inject('products')

const props = defineProps({
  currentLang: String
})

const t = inject('t')

const selectedProduct = ref(null)
const currentImageIndex = ref(0)

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
  selectedProduct.value = product
  currentImageIndex.value = 0
  document.body.style.overflow = 'hidden'
}

const closeProduct = () => {
  selectedProduct.value = null
  document.body.style.overflow = ''
}

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
      <!-- Section header -->
      <div class="text-center mb-16 reveal">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-6">
          {{ t('productsTag') }}
        </span>
        <h2 class="heading-section text-white mb-6">{{ t('productsTitle') }}</h2>
        <p class="text-lg text-slate-400 max-w-2xl mx-auto font-body">{{ t('productsDescription') }}</p>
      </div>

      <!-- Products grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(product, i) in products"
          :key="product.id"
          class="card-glass group cursor-pointer reveal"
          :class="['reveal-delay-' + Math.min(i + 1, 6)]"
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

            <!-- Featured badge -->
            <div v-if="product.featured" class="absolute top-3 right-3 z-10">
              <span class="px-2.5 py-1 rounded-md text-[10px] font-display font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 backdrop-blur-sm">
                Featured
              </span>
            </div>

            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
              <span class="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-display font-medium border border-white/20">
                {{ t('learnMore') }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-lg font-display font-bold text-white mb-2 group-hover:text-brand-300 transition-colors duration-300">{{ product.name }}</h3>
            <p class="text-sm text-slate-400 font-body leading-relaxed mb-4 line-clamp-2">{{ getDescription(product) }}</p>

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

          <div class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/[0.08] rounded-2xl shadow-2xl animate-scale-in">
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
                  {{ t('productWantSimilar') }}
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
</style>
