<script setup>
import { ref, computed, inject, watch } from 'vue'

const props = defineProps({
  product: { type: Object, default: null }
})

const emit = defineEmits(['save', 'cancel'])
const products = inject('products')
const technologies = inject('technologies')

const isEditing = computed(() => !!props.product)

const form = ref({
  id: '',
  name: '',
  description: { pt: '', en: '' },
  problemSolved: { pt: '', en: '' },
  technologies: [],
  images: [],
  url: '',
  featured: false,
  confidential: false,
  clientUrl: ''
})

const slugOverride = ref(false)
const techInput = ref('')
const imageInput = ref('')

// Auto-generate id from name
const autoId = computed(() => {
  return form.value.name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
})

watch(() => form.value.name, () => {
  if (!slugOverride.value && !isEditing.value) {
    form.value.id = autoId.value
  }
})

// Initialize from existing product
if (props.product) {
  form.value = {
    id: props.product.id || '',
    name: props.product.name || '',
    description: {
      pt: props.product.description?.pt || '',
      en: props.product.description?.en || ''
    },
    problemSolved: {
      pt: props.product.problemSolved?.pt || '',
      en: props.product.problemSolved?.en || ''
    },
    technologies: [...(props.product.technologies || [])],
    images: [...(props.product.images || [])],
    url: props.product.url || '',
    featured: props.product.featured ?? false,
    confidential: props.product.confidential ?? false,
    clientUrl: props.product.clientUrl || ''
  }
  slugOverride.value = true
}

const isDuplicate = computed(() => {
  if (isEditing.value) return false
  return products.value.some(p => p.id === form.value.id)
})

const isValid = computed(() => {
  return form.value.name.trim()
    && form.value.id.trim()
    && form.value.description.pt.trim()
    && form.value.description.en.trim()
    && !isDuplicate.value
})

// Tech chip input
const addTech = () => {
  const val = techInput.value.trim()
  if (val && !form.value.technologies.includes(val)) {
    form.value.technologies.push(val)
  }
  techInput.value = ''
}

const removeTech = (tech) => {
  form.value.technologies = form.value.technologies.filter(t => t !== tech)
}

// Image management
const addImage = () => {
  const val = imageInput.value.trim()
  if (val && !form.value.images.includes(val)) {
    form.value.images.push(val)
  }
  imageInput.value = ''
}

const removeImage = (img) => {
  form.value.images = form.value.images.filter(i => i !== img)
}

const save = () => {
  if (!isValid.value) return

  const data = {
    id: form.value.id.trim(),
    name: form.value.name.trim(),
    description: {
      pt: form.value.description.pt.trim(),
      en: form.value.description.en.trim()
    },
    problemSolved: {
      pt: form.value.problemSolved.pt.trim(),
      en: form.value.problemSolved.en.trim()
    },
    technologies: [...form.value.technologies],
    images: [...form.value.images],
    url: form.value.url.trim() || null,
    featured: form.value.featured
  }

  if (form.value.confidential) {
    data.confidential = true
    data.clientUrl = form.value.clientUrl.trim() || undefined
  }

  if (isEditing.value) {
    const idx = products.value.findIndex(p => p.id === props.product.id)
    if (idx !== -1) {
      const arr = [...products.value]
      arr[idx] = data
      products.value = arr
    }
  } else {
    products.value = [...products.value, data]
  }

  emit('save')
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06]">
      <button @click="emit('cancel')" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <h3 class="text-sm font-display font-semibold text-white">{{ isEditing ? 'Edit Product' : 'Add Product' }}</h3>
    </div>

    <!-- Form -->
    <div class="flex-1 overflow-y-auto p-5 space-y-5">

      <!-- Name -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider">Name *</label>
        <input v-model="form.name" class="input-field" placeholder="e.g. Maison Mattos Perfumes" />
      </div>

      <!-- ID -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider">ID (slug)</label>
        <div class="flex gap-2">
          <input
            v-model="form.id"
            @input="slugOverride = true"
            class="input-field flex-1 font-mono text-sm"
            placeholder="e.g. maison-mattos"
            :disabled="isEditing"
          />
          <button
            v-if="slugOverride && form.name && !isEditing"
            @click="slugOverride = false; form.id = autoId"
            class="px-3 rounded-lg text-[10px] font-display text-slate-500 hover:text-brand-300 bg-white/[0.03] border border-white/[0.06] hover:border-brand-500/30 transition-colors whitespace-nowrap"
          >
            Auto
          </button>
        </div>
        <p v-if="isDuplicate" class="text-[10px] text-red-400 font-display">ID already exists</p>
      </div>

      <!-- Description PT/EN -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider">Description *</label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="text-xs">PT</span>
              <span class="text-[10px] text-slate-600 font-display">Portugues</span>
            </div>
            <textarea v-model="form.description.pt" class="input-field resize-none" rows="3" placeholder="Descricao em portugues..." />
          </div>
          <div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="text-xs">EN</span>
              <span class="text-[10px] text-slate-600 font-display">English</span>
            </div>
            <textarea v-model="form.description.en" class="input-field resize-none" rows="3" placeholder="Description in English..." />
          </div>
        </div>
      </div>

      <!-- Problem Solved PT/EN -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider">Problem Solved</label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="text-xs">PT</span>
              <span class="text-[10px] text-slate-600 font-display">Portugues</span>
            </div>
            <textarea v-model="form.problemSolved.pt" class="input-field resize-none" rows="3" placeholder="Problema resolvido..." />
          </div>
          <div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="text-xs">EN</span>
              <span class="text-[10px] text-slate-600 font-display">English</span>
            </div>
            <textarea v-model="form.problemSolved.en" class="input-field resize-none" rows="3" placeholder="Problem solved..." />
          </div>
        </div>
      </div>

      <!-- Technologies (chips) -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider">Technologies</label>
        <div class="min-h-[44px] w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] flex flex-wrap gap-2 focus-within:border-brand-400/40 transition-colors">
          <span
            v-for="tech in form.technologies"
            :key="tech"
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-display font-medium bg-brand-500/15 text-brand-300 border border-brand-500/20"
          >
            {{ tech }}
            <button @click.prevent="removeTech(tech)" class="text-brand-400/60 hover:text-red-400 transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </span>
          <input
            v-model="techInput"
            @keydown.enter.prevent="addTech"
            list="tech-suggestions"
            class="flex-1 min-w-[120px] bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none font-body"
            placeholder="Type + Enter..."
          />
          <datalist id="tech-suggestions">
            <option v-for="t in technologies" :key="t.slug" :value="t.name" />
          </datalist>
        </div>
      </div>

      <!-- Images -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider">Images</label>
        <div class="space-y-2">
          <div
            v-for="(img, idx) in form.images"
            :key="img"
            class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
          >
            <img :src="img" :alt="`Image ${idx + 1}`" class="w-8 h-8 rounded object-cover flex-shrink-0" @error="$event.target.style.display='none'" />
            <span class="flex-1 text-xs text-slate-400 font-mono truncate">{{ img }}</span>
            <button @click="removeImage(img)" class="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="flex gap-2">
            <input
              v-model="imageInput"
              @keydown.enter.prevent="addImage"
              class="input-field flex-1 font-mono text-xs"
              placeholder="/products/my-project/01.jpg"
            />
            <button @click="addImage" :disabled="!imageInput.trim()" class="px-3 rounded-lg text-xs font-display text-brand-300 bg-brand-500/15 border border-brand-500/20 hover:bg-brand-500/25 transition-colors disabled:opacity-30 disabled:pointer-events-none">
              Add
            </button>
          </div>
        </div>
      </div>

      <!-- URL -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider">Product URL</label>
        <input v-model="form.url" class="input-field font-mono text-sm" placeholder="https://www.example.com (leave empty for null)" />
      </div>

      <!-- Toggles -->
      <div class="space-y-1 rounded-xl bg-white/[0.02] border border-white/[0.06] divide-y divide-white/[0.04]">
        <!-- Featured -->
        <div class="flex items-center justify-between px-4 py-3">
          <div>
            <p class="text-sm font-display font-medium text-slate-200">Featured</p>
            <p class="text-[10px] text-slate-500 font-body">Highlight in the product grid</p>
          </div>
          <button
            type="button"
            @click="form.featured = !form.featured"
            :class="['relative w-10 h-5 rounded-full transition-colors duration-300', form.featured ? 'bg-brand-500' : 'bg-slate-700']"
          >
            <span :class="['absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300', form.featured ? 'translate-x-5' : 'translate-x-0']" />
          </button>
        </div>

        <!-- Confidential -->
        <div class="flex items-center justify-between px-4 py-3">
          <div>
            <p class="text-sm font-display font-medium text-slate-200">Confidential (NDA)</p>
            <p class="text-[10px] text-slate-500 font-body">Hide images and internal details</p>
          </div>
          <button
            type="button"
            @click="form.confidential = !form.confidential"
            :class="['relative w-10 h-5 rounded-full transition-colors duration-300', form.confidential ? 'bg-amber-500' : 'bg-slate-700']"
          >
            <span :class="['absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300', form.confidential ? 'translate-x-5' : 'translate-x-0']" />
          </button>
        </div>
      </div>

      <!-- Client URL (shown when confidential) -->
      <div v-if="form.confidential" class="space-y-1.5">
        <label class="block text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider">Client Website URL</label>
        <input v-model="form.clientUrl" class="input-field font-mono text-sm" placeholder="https://www.client.com" />
        <p class="text-[10px] text-slate-600 font-display">Public URL of the client (shown instead of product URL)</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-white/[0.06] p-4 flex items-center gap-3">
      <button @click="emit('cancel')" class="btn-secondary !py-2 !px-4 !text-xs flex-1 justify-center">Cancel</button>
      <button @click="save" :disabled="!isValid" class="btn-primary !py-2 !px-4 !text-xs flex-1 justify-center disabled:opacity-40 disabled:pointer-events-none">
        {{ isEditing ? 'Update' : 'Add' }}
      </button>
    </div>
  </div>
</template>
